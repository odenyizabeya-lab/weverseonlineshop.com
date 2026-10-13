// src/dynamic-form.js — AI-generated dynamic listing forms.
//
// Pure, dependency-free logic shared by the Admin Video Scanner. It knows how to
//   - normalise the form schema the AI returns,
//   - validate a generated form before saving/publishing,
//   - map arbitrary generated fields onto real `showroom_listings` columns
//     (unknown fields are preserved in the `specifications` jsonb column),
//   - build the JSONB "form schema" record so a saved listing can be reopened
//     and edited later with the exact same fields.
//
// This module must stay free of DOM/network access so it can be unit-tested in
// Node (`scripts/test-video-scanner.mjs`).

// Supported input types the renderer understands.
export const FIELD_TYPES = [
  { type: 'text', label: 'Text' },
  { type: 'textarea', label: 'Long text' },
  { type: 'number', label: 'Number' },
  { type: 'price', label: 'Price' },
  { type: 'select', label: 'Dropdown' },
  { type: 'multiselect', label: 'Multi-select' },
  { type: 'date', label: 'Date' },
  { type: 'boolean', label: 'Yes / No' },
  { type: 'url', label: 'Link (URL)' },
  { type: 'email', label: 'Email' },
  { type: 'phone', label: 'Phone' },
];

const FIELD_TYPE_SET = new Set(FIELD_TYPES.map((f) => f.type));
const LISTING_TYPES = ['product', 'vehicle', 'property', 'service'];

// Fields that already exist as real columns on showroom_listings. Everything
// else a generated form contains is preserved in `specifications`.
export const COLUMN_FIELDS = {
  title: 'title',
  description: 'description',
  price: 'price',
  currency: 'currency',
  brand: 'brand',
  color: 'color',
  size: 'size',
  condition: 'condition',
  warranty: 'warranty',
  availability_status: 'availability_status',
  stock_quantity: 'stock_quantity',
  sku: 'sku',
  category: 'category',
  subcategory: 'subcategory',
  listing_type: 'listing_type',
  bedrooms: 'bedrooms',
  bathrooms: 'bathrooms',
  half_bathrooms: 'half_bathrooms',
  building_size: 'building_size',
  land_size: 'land_size',
  parking_spaces: 'parking_spaces',
  property_type: 'property_type',
  furnished: 'furnished',
  listing_status: 'listing_status',
  country: 'country',
  state: 'state',
  city: 'city',
  town: 'town',
  product_location: 'product_location',
  address: 'address',
  zip_code: 'zip_code',
  year_built: 'year_built',
  year_renovated: 'year_renovated',
  floors: 'floors',
  garage: 'garage',
  landmarks: 'landmarks',
  interior_features: 'interior_features',
  exterior_features: 'exterior_features',
  home_systems: 'home_systems',
  legal_info: 'legal_info',
  floor_plan: 'floor_plan',
  nearby_area: 'nearby_area',
  risk_notes: 'risk_notes',
  latitude: 'latitude',
  longitude: 'longitude',
  weight: 'weight',
  dimensions: 'dimensions',
  shipping_info: 'shipping_info',
  delivery_estimate: 'delivery_estimate',
  language_info: 'language_info',
  price_period: 'price_period',
};

const NUMERIC_FIELDS = new Set([
  'price', 'stock_quantity', 'bedrooms', 'bathrooms', 'half_bathrooms',
  'parking_spaces', 'floors', 'garage', 'year_built', 'year_renovated',
  'latitude', 'longitude',
]);

// Generated fields that map to jsonb array columns.
const ARRAY_FIELDS = new Set(['features', 'highlights', 'seo_keywords', 'tags', 'storage_options', 'ram_options', 'color_options']);

export const CATEGORY_VALUES = [
  'Women', 'Men', 'Kids', 'Home', 'Cars', 'Trucks', 'Fashion', 'Jewelry', 'Beauty',
  'Sports', 'Electronics', 'Phones', 'Computers', 'Gaming', 'Motorcycles', 'Bicycles',
  'Houses', 'Land', 'Furniture', 'Kitchen', 'Home Appliances', 'Food & Groceries',
  'Baby', 'Pets', 'Agriculture', 'Books', 'Office', 'Business & Industrial', 'Auto Parts',
  'Health & Medical', 'Musical Instruments', 'Arts & Crafts', 'Toys & Hobbies',
  'Travel & Luggage', 'Watches & Accessories', 'Garden & Outdoor', 'Party & Event Supplies',
  'Cameras & Photography', 'Software & Digital Products', 'Jewellery Making Supplies',
  'Collectibles & Memorabilia', 'Safety & Security', 'Fitness Equipment', 'Camping & Hiking',
  'Pool & Spa', 'Industrial Tools & Equipment', 'Packaging & Shipping Supplies',
  'Cleaning Supplies', 'Religious & Spiritual Items', 'Flowers & Gifts', 'Luxury Goods',
  'Wedding Supplies', 'Costumes & Cosplay', 'Coins & Bullion', 'Fireplace & Heating',
  'Marine & Boating', 'RV & Camper Accessories', 'Educational Supplies',
  'Funeral & Memorial Supplies',
];

export function slugifyKey(raw) {
  return String(raw || '')
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();
}

function asArray(v) {
  if (Array.isArray(v)) return v.map((x) => String(x ?? '').trim()).filter(Boolean);
  if (typeof v === 'string') return v.split(',').map((s) => s.trim()).filter(Boolean);
  return [];
}

// Values that mean "the AI could not actually read this" — never store them.
function isGuessMarker(v) {
  const s = String(v || '').trim();
  if (!s) return false;
  if (s === '?') return true;
  return /^(unknown|n\/?a|none|not (visible|readable|known|clear|available)|approximately|approx\.?|about|maybe|probably|likely)\b/i.test(s);
}

// --- Normalisation -----------------------------------------------------------

export function normalizeField(input, usedKeys = new Set()) {
  if (!input || typeof input !== 'object') return null;
  let key = slugifyKey(input.key || input.label || '');
  if (!key) return null;
  let n = 1;
  const base = key;
  while (usedKeys.has(key)) key = `${base}_${n++}`;
  usedKeys.add(key);

  let type = String(input.type || 'text').toLowerCase().trim();
  if (!FIELD_TYPE_SET.has(type)) type = 'text';
  const options = asArray(input.options);
  // A single-select with no options is useless — degrade it so the UI can render.
  if (type === 'select' && options.length === 0) type = 'text';

  let value = input.value;
  if (type === 'boolean') {
    value = value === true || value === 'true' || value === 'yes' || value === 'on' || value === 1;
  } else if (type === 'multiselect') {
    value = asArray(value);
  } else if (value == null) {
    value = '';
  } else if (typeof value === 'object') {
    value = '';
  } else {
    value = String(value);
    if (isGuessMarker(value)) value = '';
  }

  return {
    key,
    label: String(input.label || key).slice(0, 120),
    type,
    value,
    options,
    required: !!input.required,
    group: String(input.group || '').slice(0, 60),
    help: String(input.help || '').slice(0, 200),
    removed: false,
  };
}

// Builds an editable item from the AI result (or from a stored schema row).
export function normalizeItem(raw, index = 0) {
  const it = raw && typeof raw === 'object' ? raw : {};
  let listingType = String(it.listing_type || 'product').toLowerCase().trim();
  if (!LISTING_TYPES.includes(listingType)) listingType = 'product';

  const used = new Set();
  let fields = (Array.isArray(it.fields) ? it.fields : [])
    .map((f) => normalizeField(f, used))
    .filter(Boolean);

  if (!fields.some((f) => f.key === 'title')) {
    fields.unshift(normalizeField({ key: 'title', label: 'Title', type: 'text', value: it.title || '', required: true }, used));
  }
  if (!fields.some((f) => f.key === 'description')) {
    fields.push(normalizeField({ key: 'description', label: 'Description', type: 'textarea', value: it.description || '' }, used));
  }

  // Item-level lists (features/highlights/keywords) become editable fields so
  // the owner can change them just like any other generated field.
  for (const [arrKey, label] of [['features', 'Features'], ['highlights', 'Highlights'], ['seo_keywords', 'SEO keywords']]) {
    const arr = asArray(it[arrKey]);
    if (arr.length && !fields.some((f) => f.key === arrKey)) {
      fields.push(normalizeField({ key: arrKey, label, type: 'multiselect', value: arr, required: false }, used));
    }
  }

  return {
    id: it.id || `item-${index + 1}`,
    title: String(it.title || '').slice(0, 300),
    listing_type: listingType,
    category: String(it.category || ''),
    subcategory: String(it.subcategory || ''),
    description: String(it.description || ''),
    features: asArray(it.features),
    highlights: asArray(it.highlights),
    seo_keywords: asArray(it.seo_keywords),
    image_hints: Array.isArray(it.image_hints) ? it.image_hints.slice(0, 20) : [],
    fields,
    images: asArray(it.images),
  };
}

export function normalizeItems(result, { fallbackLabel = '' } = {}) {
  const arr = Array.isArray(result?.items) ? result.items : [];
  let items = arr.map((it, i) => normalizeItem(it, i));
  if (items.length === 0) {
    items = [normalizeItem({ title: fallbackLabel || 'New listing', fields: [] }, 0)];
  }
  return items.slice(0, 8);
}

export function blankField(key = '') {
  return {
    key: key || `field_${Date.now().toString(36)}`,
    label: key ? key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'New field',
    type: 'text', value: '', options: [], required: false, group: '', help: '', removed: false,
  };
}

export function activeFields(item) {
  return (item?.fields || []).filter((f) => f && !f.removed);
}

// --- Validation --------------------------------------------------------------

// A generated form is valid to PUBLISH when: it has a title, a positive price
// (unless the listing type legitimately has no price set by the admin), and any
// field the AI/owner marked required is filled.
export function validateItem(item, { requirePrice = true } = {}) {
  const errors = [];
  const fields = activeFields(item);
  const byKey = Object.fromEntries(fields.map((f) => [f.key, f]));

  const title = String(byKey.title?.value ?? item?.title ?? '').trim();
  if (!title) errors.push({ key: 'title', message: 'A title is required.' });

  const priceField = byKey.price;
  const rawPrice = priceField ? priceField.value : '';
  if (requirePrice) {
    const price = Number(String(rawPrice).replace(/[^0-9.]/g, ''));
    if (!Number.isFinite(price) || price <= 0) {
      errors.push({ key: 'price', message: 'A valid price is required before publishing.' });
    }
  }

  for (const f of fields) {
    if (!f.required) continue;
    if (f.key === 'title') continue;
    const v = f.value;
    const empty = f.type === 'boolean' ? false : (Array.isArray(v) ? v.length === 0 : String(v ?? '').trim() === '');
    if (empty) errors.push({ key: f.key, message: `${f.label || f.key} is required.` });
  }
  return { ok: errors.length === 0, errors };
}

// --- Payload building --------------------------------------------------------

function coerceNumber(v) {
  if (v == null || v === '') return null;
  const n = Number(String(v).replace(/[^0-9.\-]/g, ''));
  return Number.isFinite(n) ? n : null;
}

function cleanText(v) {
  if (v == null) return '';
  if (Array.isArray(v)) return v.join(', ');
  return String(v).trim();
}

// Maps a generated item + its (possibly edited) field values to a
// showroom_listings payload. `values` is keyed by field.key; when omitted the
// field's own `value` is used.
export function buildListingPayload(item, values = {}, options = {}) {
  const {
    propertyId = '',
    images = [],
    videoUrl = null,
    isActive = false,
    isFeatured = false,
    approvalStatus = 'draft',
    report = null,
    currency = 'USD',
    extra = {},
  } = options;

  const fields = activeFields(item);
  const specifications = {};
  const generatedFieldKeys = [];
  const payload = {
    listing_type: item.listing_type || 'product',
    category: item.category || null,
    subcategory: item.subcategory || null,
    currency,
    images: images.filter(Boolean),
    video_url: videoUrl || null,
    features: asArray(item.features),
    highlights: asArray(item.highlights),
    seo_keywords: asArray(item.seo_keywords),
    is_active: isActive,
    is_featured: isFeatured,
    is_ai_generated: true,
    approval_status: approvalStatus,
    availability_status: 'In Stock',
    listing_status: 'sale',
  };

  for (const f of fields) {
    const value = Object.prototype.hasOwnProperty.call(values, f.key) ? values[f.key] : f.value;
    generatedFieldKeys.push(f.key);

    if (f.key === 'title') { payload.title = cleanText(value); continue; }
    if (f.key === 'description') { payload.description = cleanText(value); continue; }
    if (f.key === 'category' && cleanText(value)) { payload.category = cleanText(value); continue; }
    if (f.key === 'subcategory' && cleanText(value)) { payload.subcategory = cleanText(value); continue; }
    if (f.key === 'listing_type' && cleanText(value)) { payload.listing_type = cleanText(value); continue; }
    if (ARRAY_FIELDS.has(f.key)) {
      const list = asArray(value);
      if (list.length) payload[f.key] = list;
      continue;
    }
    if (COLUMN_FIELDS[f.key]) {
      const col = COLUMN_FIELDS[f.key];
      if (NUMERIC_FIELDS.has(f.key)) {
        payload[col] = coerceNumber(value);
      } else {
        payload[col] = cleanText(value) || null;
      }
      continue;
    }
    // Unknown field -> preserve it in specifications so nothing is lost.
    const v = Array.isArray(value) ? value : cleanText(value);
    specifications[f.key] = (v === '' || v == null) ? null : v;
  }

  if (!payload.title) payload.title = item.title || 'Untitled listing';
  if (cleanText(item.description) && !payload.description) payload.description = cleanText(item.description);
  if (item.subcategory && !payload.subcategory) payload.subcategory = item.subcategory;
  if (item.category && !payload.category) payload.category = item.category;

  // A price field is required to publish; store null when blank so validation can
  // surface it instead of silently publishing a $0 listing.
  if (payload.price === undefined) payload.price = null;
  if (payload.price != null && payload.price <= 0) payload.price = null;

  payload.specifications = specifications;

  // The saved form schema lets the exact form be reconstructed on reopen.
  payload.ai_form_schema = buildFormSchema(item, values);

  if (report) payload.ai_video_scan = report;
  payload.ai_generated_fields = generatedFieldKeys;
  if (propertyId) payload.property_id = propertyId;

  Object.assign(payload, extra);
  return payload;
}

// The persisted description of the generated form (structure + which fields the
// AI supplied), so a draft can be reopened with identical fields.
export function buildFormSchema(item, values = {}, meta = {}) {
  const fields = activeFields(item).map((f) => {
    const value = Object.prototype.hasOwnProperty.call(values, f.key) ? values[f.key] : f.value;
    return {
      key: f.key,
      label: f.label,
      type: f.type,
      options: f.options || [],
      required: !!f.required,
      group: f.group || '',
      help: f.help || '',
      value: Array.isArray(value) ? value : (value == null ? '' : value),
    };
  });
  return {
    version: 1,
    generated_at: meta.generatedAt || new Date().toISOString(),
    listing_type: item.listing_type || 'product',
    category: item.category || '',
    subcategory: item.subcategory || '',
    title: item.title || '',
    description: item.description || '',
    features: asArray(item.features),
    highlights: asArray(item.highlights),
    seo_keywords: asArray(item.seo_keywords),
    fields,
  };
}

// Rebuilds an editable item from a stored `ai_form_schema` value.
export function itemFromSchema(schema, fallback = {}) {
  if (!schema || typeof schema !== 'object') return normalizeItem(fallback, 0);
  const item = {
    id: 'stored',
    title: schema.title || fallback.title || '',
    listing_type: schema.listing_type || fallback.listing_type || 'product',
    category: schema.category || fallback.category || '',
    subcategory: schema.subcategory || fallback.subcategory || '',
    description: schema.description || fallback.description || '',
    features: schema.features || [],
    highlights: schema.highlights || [],
    seo_keywords: schema.seo_keywords || [],
    image_hints: [],
    fields: Array.isArray(schema.fields)
      ? schema.fields.map((f) => ({ ...f, value: f.value, removed: false }))
      : [],
    images: Array.isArray(fallback.images) ? fallback.images : [],
  };
  return normalizeItem(item, 0);
}

export function listingTypeLabel(t) {
  return ({ product: 'Product', vehicle: 'Vehicle', property: 'Property', service: 'Service' })[t] || 'Product';
}

export { asArray };
