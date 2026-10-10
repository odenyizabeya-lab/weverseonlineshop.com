// src/categories.js — THE single source of truth for marketplace categories.
//
// Used by every category-facing system so they can never drift apart:
//   - Customer showroom category bar + filtering  (showroom-cards.js)
//   - Admin Products Manager category list        (admin-page.js)
//   - General AI Scanner category matching        (admin-page.js)
//   - The classic app.js script reads the same list via window.MARKETPLACE_CATEGORIES
//
// `keywords` are used to match a product's stored `category` / row label to its
// canonical marketplace category. New product categories found in data that are
// not in this list are appended to the category bar automatically.

export const MARKETPLACE_CATEGORIES = [
  { name: 'Women', icon: 'shopping-bag', color: 'pink', keywords: ['women', 'woman'] },
  { name: 'Men', icon: 'shirt', color: 'blue', keywords: ['men', 'man'] },
  { name: 'Kids', icon: 'baby', color: 'amber', keywords: ['kids', 'kid', 'child'] },
  { name: 'Home', icon: 'home', color: 'emerald', keywords: ['home & kitchen', 'home decor', 'home organization', 'houseware', 'bedroom', 'bathroom', 'storage', 'living'] },
  { name: 'Cars', icon: 'car', color: 'red', keywords: ['car'] },
  { name: 'Trucks', icon: 'truck', color: 'yellow', keywords: ['truck'] },
  { name: 'Fashion', icon: 'scissors', color: 'fuchsia', keywords: ['fashion', 'style', 'clothing', 'apparel', 'shoe', 'handbag', 'dress', 'shirt', 'jeans', 'sneaker'] },
  { name: 'Jewelry', icon: 'gem', color: 'cyan', keywords: ['jewel', 'jewellery', 'ring', 'bangle', 'gem', 'necklace', 'earring', 'bracelet'] },
  { name: 'Beauty', icon: 'flower', color: 'rose', keywords: ['beauty', 'cosmetic', 'makeup', 'skincare', 'hair care', 'perfume'] },
  { name: 'Sports', icon: 'dumbbell', color: 'lime', keywords: ['sport', 'fitness', 'gym', 'athletic'] },
  { name: 'Electronics', icon: 'circuit-board', color: 'sky', keywords: ['electronic', 'gadget', 'circuit', 'television', 'tv', 'audio', 'speaker', 'headphone', 'charger', 'tech'] },
  { name: 'Phones', icon: 'smartphone', color: 'violet', keywords: ['phone', 'smartphone', 'mobile', 'iphone'] },
  { name: 'Computers', icon: 'laptop', color: 'indigo', keywords: ['computer', 'laptop', 'pc', 'monitor', 'tablet', 'keyboard', 'desktop'] },
  { name: 'Gaming', icon: 'gamepad-2', color: 'purple', keywords: ['gaming', 'console', 'game', 'controller'] },
  { name: 'Motorcycles', icon: 'motorcycle', color: 'blue', keywords: ['motorcycle', 'motorbike'] },
  { name: 'Bicycles', icon: 'bike', color: 'green', keywords: ['bicycle', 'bike', 'cycling'] },
  { name: 'Houses', icon: 'building-2', color: 'slate', keywords: ['real estate', 'apartment', 'villa', 'mansion', 'condo', 'estate', 'farm house', 'international home', 'beach house', 'property'] },
  { name: 'Land', icon: 'map-pin', color: 'lime', keywords: ['land', 'plot', 'acreage', 'commercial property'] },
  { name: 'Furniture', icon: 'armchair', color: 'teal', keywords: ['furniture', 'armchair', 'chair', 'table', 'sofa', 'mattress', 'bed', 'desk'] },
  { name: 'Kitchen', icon: 'cooking-pot', color: 'blue', keywords: ['home & kitchen', 'kitchen', 'cooking', 'food preparation', 'refriger', 'air fryer', 'espresso', 'blender', 'mixer', 'coffee machine', 'dishwasher', 'cookware', 'utensil', 'toaster', 'stand mixer', 'refrigeration'] },
  { name: 'Home Appliances', icon: 'washing-machine', color: 'emerald', keywords: ['home appliance', 'appliance', 'washing machine', 'washer', 'dryer', 'laundry', 'vacuum', 'fan', 'air conditioner', 'air purifier', 'water dispenser', 'water heater', 'iron', 'refrigerator', 'robot vacuum', 'cordless vacuum'] },
  { name: 'Food & Groceries', icon: 'shopping-basket', color: 'emerald', keywords: ['food', 'grocer', 'grocery', 'snack', 'beverage'] },
  { name: 'Baby', icon: 'baby', color: 'pink', keywords: ['baby', 'infant', 'family & baby', 'stroller', 'diaper'] },
  { name: 'Pets', icon: 'paw-print', color: 'brown', keywords: ['pet', 'dog', 'cat', 'puppy', 'kitten', 'animal'] },
  { name: 'Agriculture', icon: 'wheat', color: 'amber', keywords: ['agriculture', 'farming', 'crop', 'seed', 'livestock', 'tractor', 'harvest'] },
  { name: 'Books', icon: 'book-open', color: 'blue', keywords: ['book'] },
  { name: 'Office', icon: 'pen-tool', color: 'slate', keywords: ['office', 'stationery', 'printer', 'paper', 'pen', 'desk'] },
  { name: 'Business & Industrial', icon: 'factory', color: 'gray', keywords: ['business', 'industrial', 'machinery', 'warehouse', 'enterprise'] },
  { name: 'Auto Parts', icon: 'car-front', color: 'red', keywords: ['auto part', 'car part', 'spare part', 'automotive', 'accessory'] },
  { name: 'Health & Medical', icon: 'stethoscope', color: 'emerald', keywords: ['health', 'medical', 'pharmacy', 'medicine', 'wellness'] },
  { name: 'Musical Instruments', icon: 'music', color: 'violet', keywords: ['musical', 'instrument', 'piano', 'guitar', 'drum'] },
  { name: 'Arts & Crafts', icon: 'palette', color: 'rose', keywords: ['art', 'craft', 'painting', 'diy', 'handmade', 'canvas', 'palette'] },
  { name: 'Toys & Hobbies', icon: 'puzzle', color: 'purple', keywords: ['toy', 'hobby', 'doll', 'puzzle', 'model'] },
  { name: 'Travel & Luggage', icon: 'luggage', color: 'blue', keywords: ['travel', 'luggage', 'suitcase', 'backpack'] },
  { name: 'Watches & Accessories', icon: 'watch', color: 'amber', keywords: ['watch', 'timepiece'] },
  { name: 'Garden & Outdoor', icon: 'flower-2', color: 'green', keywords: ['garden', 'outdoor', 'plant', 'lawn', 'patio', 'grill'] },
  { name: 'Party & Event Supplies', icon: 'party-popper', color: 'fuchsia', keywords: ['party', 'event', 'celebration', 'decoration', 'balloon'] },
  { name: 'Cameras & Photography', icon: 'camera', color: 'indigo', keywords: ['camera', 'photography', 'photo', 'lens'] },
  { name: 'Software & Digital Products', icon: 'file-code-2', color: 'sky', keywords: ['software', 'digital', 'app', 'license', 'download'] },
  { name: 'Jewellery Making Supplies', icon: 'gem', color: 'cyan', keywords: ['jewellery making', 'jewelry making', 'bead', 'craft bead'] },
  { name: 'Collectibles & Memorabilia', icon: 'archive', color: 'amber', keywords: ['collectible', 'memorabilia', 'figurine'] },
  { name: 'Safety & Security', icon: 'shield', color: 'gray', keywords: ['safety', 'security', 'home security', 'cctv', 'alarm', 'lock', 'surveillance'] },
  { name: 'Fitness Equipment', icon: 'dumbbell', color: 'lime', keywords: ['fitness', 'dumbbell', 'treadmill', 'weight', 'exercise', 'yoga'] },
  { name: 'Camping & Hiking', icon: 'tent', color: 'green', keywords: ['camping', 'hiking', 'tent', 'camp'] },
  { name: 'Pool & Spa', icon: 'waves', color: 'cyan', keywords: ['pool', 'spa', 'hot tub', 'jacuzzi'] },
  { name: 'Industrial Tools & Equipment', icon: 'wrench', color: 'slate', keywords: ['industrial', 'tool', 'tools & maintenance', 'machinery', 'hardware', 'drill', 'wrench', 'workbench', 'equipment'] },
  { name: 'Packaging & Shipping Supplies', icon: 'package', color: 'gray', keywords: ['packaging', 'shipping', 'box', 'mailer', 'packing'] },
  { name: 'Cleaning Supplies', icon: 'spray-can', color: 'cyan', keywords: ['cleaning', 'detergent', 'mop', 'broom', 'disinfectant', 'bleach'] },
  { name: 'Religious & Spiritual Items', icon: 'church', color: 'amber', keywords: ['religious', 'spiritual', 'faith', 'rosary', 'incense', 'prayer'] },
  { name: 'Flowers & Gifts', icon: 'flower', color: 'pink', keywords: ['flower', 'gift', 'bouquet', 'floral'] },
  { name: 'Luxury Goods', icon: 'crown', color: 'yellow', keywords: ['luxury', 'designer', 'premium', 'exclusive'] },
  { name: 'Wedding Supplies', icon: 'rings', color: 'pink', keywords: ['wedding', 'bridal', 'bride'] },
  { name: 'Costumes & Cosplay', icon: 'mask', color: 'purple', keywords: ['costume', 'cosplay', 'mask', 'halloween'] },
  { name: 'Coins & Bullion', icon: 'coins', color: 'yellow', keywords: ['coin', 'bullion', 'silver', 'gold'] },
  { name: 'Fireplace & Heating', icon: 'flame', color: 'red', keywords: ['fireplace', 'heating', 'heater', 'stove', 'radiator', 'furnace'] },
  { name: 'Marine & Boating', icon: 'ship', color: 'blue', keywords: ['marine', 'boat', 'boating', 'yacht', 'sailing', 'kayak'] },
  { name: 'RV & Camper Accessories', icon: 'bus', color: 'teal', keywords: ['rv', 'camper', 'motorhome', 'caravan'] },
  { name: 'Educational Supplies', icon: 'graduation-cap', color: 'indigo', keywords: ['educational', 'school', 'learning', 'classroom', 'teaching', 'student'] },
  { name: 'Funeral & Memorial Supplies', icon: 'cross', color: 'gray', keywords: ['funeral', 'memorial', 'casket', 'urn', 'burial'] },
];

export const MARKETPLACE_CATEGORY_NAMES = MARKETPLACE_CATEGORIES.map(c => c.name);

// The automotive set drives the admin product form (24 images etc.).
export const MARKETPLACE_AUTOMOTIVE = ['Cars', 'Trucks', 'Motorcycles', 'Marine & Boating', 'RV & Camper Accessories'];

// Which canonical marketplace categories does a stored product category / row
// label belong to? Matches a product's `category` value (e.g. "Fans", "Food
// Preparation", "Home & Kitchen") to the canonical bar names it should show under.
export function canonicalCategoriesForLabel(label) {
  const n = String(label || '').toLowerCase().trim();
  const out = [];
  if (!n) return out;
  for (const cat of MARKETPLACE_CATEGORIES) {
    if (cat.keywords.some(k => n.includes(k))) out.push(cat.name.toLowerCase());
  }
  if (!out.includes(n)) out.push(n);
  return out;
}

// Normalize any product/scan category string to a canonical marketplace name
// (returns the closest canonical name, or the original string when unmatched).
export function normalizeToMarketplaceCategory(raw) {
  const s = String(raw || '').trim();
  if (!s) return '';
  const lower = s.toLowerCase();
  const exact = MARKETPLACE_CATEGORY_NAMES.find(c => c.toLowerCase() === lower);
  if (exact) return exact;
  const matched = canonicalCategoriesForLabel(lower);
  for (const cat of MARKETPLACE_CATEGORIES) {
    if (matched.includes(cat.name.toLowerCase())) return cat.name;
  }
  return s;
}

// ── Customer-facing real estate marketplace ────────────────────────────
// The customer homepage, showroom grid, category bar and search all show
// HOUSES ONLY. These property chips drive the homepage category bar and the
// card-level filtering in showroom-cards.js. The original MARKETPLACE_CATEGORIES
// list above is NOT touched because the admin Products Manager
// still needs it for product/vehicle listings.
export const PROPERTY_CATEGORIES = [
  { name: 'All Houses', icon: 'home', color: 'blue', keywords: ['house', 'home', 'real estate', 'property', 'villa', 'apartment', 'condo', 'mansion', 'townhouse', 'duplex', 'penthouse', 'bungalow', 'cottage', 'chalet', 'loft', 'studio', 'farm house', 'beach house', 'land', 'commercial property', 'hotel', 'resort', 'waterfront'] },
  { name: 'For Sale', icon: 'tag', color: 'emerald', keywords: ['for sale'] },
  { name: 'For Rent', icon: 'key', color: 'amber', keywords: ['for rent', 'rental', 'lease'] },
  { name: 'Villas', icon: 'castle', color: 'violet', keywords: ['villa', 'villas'] },
  { name: 'Apartments', icon: 'building-2', color: 'sky', keywords: ['apartment', 'apartments', 'condo', 'condominium', 'townhouse', 'duplex', 'flat', 'penthouse', 'studio', 'loft'] },
  { name: 'Mansions', icon: 'landmark', color: 'indigo', keywords: ['mansion', 'mansions', 'estate'] },
  { name: 'Beach Houses', icon: 'waves', color: 'cyan', keywords: ['beach house', 'coastal', 'waterfront', 'seaside', 'lakefront', 'vacation home'] },
  { name: 'Luxury Homes', icon: 'gem', color: 'rose', keywords: ['luxury', 'luxury home', 'modern home', 'executive', 'premium'] },
  { name: 'Commercial Property', icon: 'store', color: 'slate', keywords: ['commercial', 'office', 'retail', 'business building', 'hotel', 'hospitality', 'resort', 'shopping mall'] },
  { name: 'Land', icon: 'map-pin', color: 'lime', keywords: ['land', 'plot', 'acreage', 'lot', 'parcel'] },
];

export const PROPERTY_CATEGORY_NAMES = PROPERTY_CATEGORIES.map(c => c.name);

function _listingHaystack(listing) {
  return [listing.category, listing.subcategory, listing.property_type, listing.title, listing.highlights && Array.isArray(listing.highlights) ? listing.highlights.join(' ') : '']
    .filter(Boolean).join(' ').toLowerCase();
}

export function isPropertyListing(listing) {
  if (!listing) return false;
  if (listing.listing_type === 'property') return true;
  const cat = String(listing.category || '').toLowerCase();
  if (cat === 'houses & real estate' || cat === 'real estate') return true;
  const hay = _listingHaystack(listing);
  return /(real estate|houses?|homes?|apartment|condo|villa|mansion|townhouse|duplex|penthouse|bungalow|cottage|chalet|loft|studio|farm house|beach house|commercial property|hotel|resort|land for sale)/.test(hay);
}

// The property chips a listing belongs to. 'For Sale' covers everything that
// is not explicitly 'For Rent'. Walking order matches PROPERTY_CATEGORIES.
export function propertyCategoryForListing(listing) {
  if (!isPropertyListing(listing)) return [];
  const isRent = String(listing.listing_status || '').toLowerCase() === 'rent';
  const out = ['All Houses', isRent ? 'For Rent' : 'For Sale'];
  const hay = _listingHaystack(listing);
  for (const cat of PROPERTY_CATEGORIES) {
    if (cat.name === 'All Houses' || cat.name === 'For Sale' || cat.name === 'For Rent') continue;
    if (cat.keywords.some(k => hay.includes(k)) && !out.includes(cat.name)) out.push(cat.name);
  }
  return out;
}

// Does a property listing belong under this chip? Called by the card-level
// filter. Returns true for 'All' / 'All Houses' / 'Houses' / 'Real Estate'.
export function propertyMatchesCategory(catName, listing) {
  const n = String(catName || '').toLowerCase();
  if (!n || n === 'all' || n === 'all houses' || n === 'houses' || n === 'homes' || n === 'home' || n === 'real estate') return true;
  return propertyCategoryForListing(listing).some(c => c.toLowerCase() === n);
}

// Register for the classic app.js script (homepage category bar). The
// customer-facing bar now shows the property chips — the admin still imports
// the original MARKETPLACE_CATEGORIES constant directly, so it is unaffected.
if (typeof window !== 'undefined') {
  window.MARKETPLACE_CATEGORIES = PROPERTY_CATEGORIES;
  window.MARKETPLACE_CATEGORY_NAMES = PROPERTY_CATEGORY_NAMES;
  window.normalizeToMarketplaceCategory = normalizeToMarketplaceCategory;
  // Signal the classic app.js category bar to re-render with full icons once
  // this shared module is live (it may have rendered the fallback list first).
  queueMicrotask(() => window.dispatchEvent(new Event('marketplace-categories-ready')));
}