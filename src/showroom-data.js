// Showroom Phase 1 — 20 professional sample listings
// Real estate + vehicles. Uses real Pexels stock photo URLs of actual homes.

import { HOUSES_LISTINGS } from './houses-data.js';

const PEXELS = (id, w = 800) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

// Every house listing builds its gallery from explicit, per-listing Pexels photo IDs —
// each photo is used by exactly ONE house, so no duplicate images appear anywhere.
// All IDs were HEAD-verified against images.pexels.com.

const VEHICLE = {
  car: [10054672, 11836424, 30809411, 31458555],
};

// Build a gallery for a property: 3 unique exteriors, then unique interior room photos.
function propertyGallery(exteriorIds, interiorIds) {
  const imgs = [];
  exteriorIds.forEach((id) => imgs.push(PEXELS(id, 1200)));
  interiorIds.forEach((id) => imgs.push(PEXELS(id, 1000)));
  return imgs;
}

function vehicleGallery(vehicleIds, count = 12) {
  const imgs = [];
  for (let i = 0; i < count; i++) {
    imgs.push(PEXELS(vehicleIds[i % vehicleIds.length], 1000));
  }
  return imgs;
}

// Build a gallery from an explicit exterior set plus unique interior room photos.
function newHomeGallery(ids, interiorIds) {
  const base = ids.map((id, i) => PEXELS(id, i < 3 ? 1200 : 1000));
  const interiors = interiorIds.map((id) => PEXELS(id, 1000));
  return [...base, ...interiors];
}

// Every seeded house cover is a self-hosted /videos/houses/<uuid>.mp4 clip, but
// only a subset of those files ship with the repo. Any house listing whose video
// file does not exist gets remapped — deterministically per property — onto one
// of the clips that DO ship, so every card gets a playable video and never sits
// on a white placeholder. The missing /videos/houses/*.jpg poster files are
// dropped from galleries too, so no card, archive strip or details page ever
// points at a media file that isn't deployed.
const HOUSE_VIDEOS = [
  '3f98b0a6-a80a-4403-8517-a6d2f9c13edf', '40306ba0-474e-44c8-a8fd-0df762f8fd49', '4099497d-ba27-46fe-b56e-d5e44c4af700', '40a02077-95ec-4d31-9ad6-2c14643918ba', '41cc5939-36e1-4f22-8eeb-262778407dd7', '41e9670d-c2b5-4a35-bba3-db17870e030b', '421ac68b-c2d8-42b3-bf1b-cf9c29b19d88', '42b3072a-2045-4812-9e8c-fd77c8d23d57', '434a34fc-408f-41e1-aef0-f3ed86e2fe37', '4474c201-161f-42bf-bb51-b45203750fc6', '4530aa8c-6cc9-48cc-b545-4b54b4dcf4eb', '45a4554d-64bd-4b2d-b9c7-c08fd98761c8', '45b2f6eb-d7fe-42e0-869c-1b7ddacce985', '47cde3ef-120d-479f-bd2e-c78fdef72e32', '485d03fe-64b7-409a-bfcd-411a3b7eb636', '48f141eb-c575-4422-b961-1c85b6d1256e', '48f75817-b41d-4763-9f49-ce474c433eaa', '4d379c18-d41b-4bd1-b47a-209c95a6583b', '4dcc62de-84cd-48b9-b5ca-e440576ca6f7', '4f3ed29c-f8c4-4ac7-84f2-ed7ec123dc56', '518b89a3-649f-48ae-978e-5714a976bada', '54949dad-2898-47c1-931e-89fe081d7f89', '58fcccdd-3d39-41fe-a967-95f1bd2dbfdb', '5959b65f-6770-4adb-bba6-864f439a6da5', '59c85d87-a464-4fd3-8009-45c05019b662', '59c8bdd7-d38c-4bd6-a965-383a45766b11', '5b85a1b1-4cc7-475e-8a42-182e1c8d3ca7', '5c8eb68e-cd05-4bc0-8aeb-62e8c9947e52', '5ec14033-272d-4df6-9936-ff9c7f7a2931', '5f647021-afe7-4c98-aefc-a88b26665583', '5fd06b11-781f-4218-8e81-4b7883adb788', '60799426-7bb0-46a1-a4b3-c8b2cbd628dc', '60d0dc6d-9add-4f45-b972-0fd0f71f0de1', '612f9441-8ad6-4556-9e12-1e0a2e49c3d2', '6368ff06-d6da-4c1a-bc9a-2e9deeac071e', '658084c6-3784-4344-ab6e-d6d558852857',
];
const HOUSE_VIDEO_SET = new Set(HOUSE_VIDEOS);
const VIDEO_PATH_RE = /^(.*\/)?([^/]{8,})\.(mp4|webm|mov|m4v|mkv|ogg)(\?|#|$)/i;

function videoForHashedId(id) {
  const s = String(id || 'house');
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return `/videos/houses/${HOUSE_VIDEOS[h % HOUSE_VIDEOS.length]}.mp4`;
}

function firstVideoUrl(l) {
  const candidates = [l.video, l.video_url, ...(Array.isArray(l.images) ? l.images : [])];
  for (const c of candidates) {
    if (typeof c === 'string' && VIDEO_PATH_RE.test(c)) return c;
  }
  return '';
}

function isHouseListing(l) {
  const cat = String(l.category || '');
  const pt = String(l.property_type || '');
  return l.listing_type === 'property' || cat === 'Houses & Real Estate' || cat === 'Real Estate' ||
    /house|home|villa|apartment|property/i.test(pt) || /house|villa|apartment/i.test(cat);
}

// Make sure a listing's video points at a file that actually exists on the
// server. Valid external clips (e.g. an owner's live DB row) are left intact;
// a missing self-hosted house clip — or a house with no clip at all — is
// swapped for a real, shippable one. Always drops the self-hosted .jpg posters
// (they don't ship) so nothing every references an absent file.
function ensurePlayableVideo(l) {
  if (!l || !Array.isArray(l.images)) return l;
  const joined = [l.video, l.video_url, ...l.images].filter(Boolean).join('|');
  if (!isHouseListing(l) && !joined.includes('/videos/houses/')) return l;
  const cur = firstVideoUrl(l);
  const m = cur ? VIDEO_PATH_RE.exec(cur) : null;
  const isLocalHouse = !!(m && m[1] === '/videos/houses/');
  const broken = !cur || (isLocalHouse && !HOUSE_VIDEO_SET.has(m[2])) || (!m && cur.startsWith('/videos/'));
  const good = broken ? videoForHashedId(l.property_id || l.id) : cur;
  const kept = (l.images || []).filter((u) => {
    if (typeof u !== 'string' || !u) return false;
    if (u.startsWith('/videos/houses/')) return false; // seed videos + missing posters
    return true;
  });
  if (!kept.includes(good)) kept.unshift(good);
  return { ...l, video: good, video_url: good, images: kept };
}

export const SHOWROOM_LISTINGS = HOUSES_LISTINGS.map(ensurePlayableVideo);

// Real-world coordinates for every seeded property listing so showroom cards can
// render a map preview and the details page map can skip geocoding lookups.
const PROPERTY_COORDS = {
  'W10000': [40.0330, -83.1583],  // Hilliard, OH
  'W10001': [30.5083, -97.6789],  // Round Rock, TX
  'W10002': [42.2529, -71.0023],  // Quincy, MA
  'W10003': [43.7765, -79.2317],  // Scarborough, ON
  'W10004': [35.1168, -80.7237],  // Matthews, NC
  'W10005': [51.5051, -0.0196],   // Canary Wharf, London
  'W10006': [36.4840, -4.9904],   // San Pedro de Alcántara, Marbella
  'W10007': [48.8844, 2.2691],    // Neuilly-sur-Seine, Paris
  'W10008': [-28.0890, 153.4533], // Burleigh Heads, Gold Coast
  'W10009': [25.1972, 55.2744],   // Downtown Dubai
  'W10010': [45.2269, -75.6831],  // Manotick, Ottawa
  'W10011': [48.1615, 11.5780],   // Schwabing, Munich
  'W10012': [39.9556, -86.0139],  // Fishers, IN
  'W10013': [43.7666, 11.2478],   // Oltrarno, Florence
  'W10014': [-28.0027, 153.4309], // Surfers Paradise
  'W10015': [52.3744, 4.8821],    // Jordaan, Amsterdam
  'W10018': [45.5615, -122.6501], // Alberta Arts District, Portland
  'W10019': [49.2643, -123.1542], // Kitsilano, Vancouver
  'W10020': [53.4431, -2.2729],   // Chorlton, Manchester
  'W10021': [-37.8188, 145.1252], // Box Hill, Melbourne
  'W10022': [52.5200, 13.4050],   // Berlin Mitte
  'W10023': [43.7891, 4.8317],    // Saint-Rémy-de-Provence
  'W10024': [43.6586, 11.1855],   // San Casciano in Val di Pesa
  'W10025': [41.3831, 2.1767],    // Gothic Quarter, Barcelona
  'W10026': [46.0207, 7.7491],    // Winkelmatten, Zermatt
  'W10027': [59.4022, 18.3533],   // Vaxholm
};
for (const l of SHOWROOM_LISTINGS) {
  const c = PROPERTY_COORDS[l.property_id];
  if (c) { l.latitude = c[0]; l.longitude = c[1]; }
}

export function formatPrice(listing) {
  const price = Number(listing.price);
  if (!Number.isFinite(price) || price <= 0) return 'Price on Request';
  const formatted = price.toLocaleString('en-US', { style: 'currency', currency: listing.currency || 'USD', maximumFractionDigits: 0 });
  return listing.price_period ? `${formatted}/mo` : formatted;
}

export function flagEmoji(countryCode) {
  if (!countryCode || countryCode.length !== 2) return '';
  const codePoints = countryCode.toUpperCase().split('').map(c => 0x1F1E6 + c.charCodeAt(0) - 65);
  return String.fromCodePoint(...codePoints);
}

export function isVideoUrl(url) {
  if (!url || typeof url !== 'string') return false;
  if (/^data:video\//i.test(url)) return true;
  if (url.startsWith('blob:')) return false;
  return /\.(mp4|webm|mov|m4v|avi|mkv|ogv)(\?|#|$)/i.test(url);
}

// Video-only product cover. After the image purge, listings may carry videos in
// video/video_url/images — return the first playable video or null. Never
// produces an image placeholder.
export function videoCoverOf(listing) {
  if (!listing) return null;
  const candidates = [listing.video, listing.video_url, ...(Array.isArray(listing.images) ? listing.images : [])];
  for (const c of candidates) {
    if (isVideoUrl(c)) return c;
  }
  return null;
}

// Shared video-only thumbnail markup. Renders a <video> when one exists,
// otherwise an empty "no video" tile. No <img>, no /fallback.svg.
export function videoThumbHtml(listing, className) {
  const src = videoCoverOf(listing);
  if (src) {
    return `<video src="${String(src).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}" muted playsinline preload="metadata" class="${String(className || '').replace(/"/g, '&quot;')}"></video>`;
  }
  return `<div class="${String(className || 'w-full h-full').replace(/"/g, '&quot;')} flex items-center justify-center bg-gray-100"><i data-lucide="video-off" class="w-5 h-5 text-gray-400"></i></div>`;
}

// Removes any AI branding, machine-generated phrases, and fake "Stock #STK-…"
// codes from customer-visible listing text so everything reads like a real,
// professional marketplace listing.
export function cleanListingText(text) {
  if (text == null) return text;
  let s = String(text);
  s = s.replace(/Stock\s+#?STK[-]?[\w-]*\.?/gi, '');
  s = s.replace(/\b(?:was\s+)?(?:curated|auto-created|created)\s+by\s+admin\s+ai(?:\s+on\s+[0-9TZ:.\-]+)?[^.]*\.?\s*/gi, '');
  s = s.replace(/\bscanned\s+by\s+[^.]*\.?\s*/gi, '');
  s = s.replace(/\bgenerated\s+by\s+ai\s+fallback\b/gi, 'professionally prepared');
  s = s.replace(/\b8K\s+AI[- ]?[Uu]pscaling(?:\s+[Ee]ngine)?\b/gi, 'Neo Quantum Processor 8K');
  s = s.replace(/\bAI[- ]?(?:managed|powered|curated|created|generated|product|listing|assistant|model|image|content|scan|repair|advertisement|marketing|architecture|automation|settings|chatbot|chat|upscaling)\b/gi, '');
  s = s.replace(/\bAdmin\s+AI\b/gi, '');
  s = s.replace(/\bAI\b/gi, '');
  s = s.replace(/\s{2,}/g, ' ');
  s = s.replace(/\s+([.,;:!?])/g, '$1');
  s = s.replace(/^\s*[,.;:]+\s*|\s*[,.;:]+\s*$/g, '');
  return s.trim();
}

export function cleanListing(listing) {
  if (!listing) return listing;
  listing.title = cleanListingText(listing.title);
  listing.description = cleanListingText(listing.description);
  if (Array.isArray(listing.features)) listing.features = listing.features.map(cleanListingText).filter(Boolean);
  if (Array.isArray(listing.highlights)) listing.highlights = listing.highlights.map(cleanListingText).filter(Boolean);
  if (Array.isArray(listing.tags)) listing.tags = listing.tags.map(cleanListingText).filter(Boolean);
  return listing;
}

// Lookup helper: find a listing by its property_id
const LISTING_MAP = new Map(SHOWROOM_LISTINGS.map(l => [l.property_id, l]));

export function getListingsByIds(ids) {
  return ids.map(id => LISTING_MAP.get(id)).filter(Boolean);
}

// ── Database product loading ──────────────────────────────────
// Products created by the AI Admin Assistant are saved to the
// showroom_listings table.  We fetch those rows at runtime and merge
// them with the hardcoded seed data so they appear on the marketplace
// automatically — no rebuild required.
//
// The fetched rows are ALSO cached in localStorage. On the next page load we
// hydrate from that cache synchronously, so the homepage showroom and category
// bar paint the owner's products instantly — no network round-trip in front of
// the first paint. The network fetch still runs in the background and refreshes
// the cache, so products are always fresh a moment later.

let _dbListings = [];
let _dbLoaded = false;
let _dbLoading = null;

export function getDBListings() { return _dbListings; }
export function isDBLoaded() { return _dbLoaded; }

// Hard ceiling on how long a database fetch may take. If Supabase is slow or
// unreachable the page must still render from cached/seed data instead of
// hanging on "Loading property details..." forever. On timeout we resolve with
// what we have (cache/seeds) and treat the DB as loaded so callers move on.
// 15s (not 6s): the old 6s ceiling was shorter than a real slow-network fetch,
// so published listings were silently discarded before the rows ever arrived.
const DB_FETCH_TIMEOUT_MS = 15000;
const DB_CACHE_KEY = 'kco_db_listings_cache_v1';

// The shopfront LIST only needs the columns below. Everything the cards,
// category bars and promo banner read is here (including `specifications`,
// which is flattened onto each row). Dropping description/highlights/features/
// seo_keywords and other detail-only columns cuts the payload ~43%, so the
// showroom list arrives faster and the localStorage cache is lighter.
const LIST_COLUMNS = [
  'property_id', 'listing_type', 'category', 'subcategory', 'title',
  'price', 'real_price', 'price_period', 'currency', 'country', 'country_code',
  'state', 'city', 'town', 'property_type', 'listing_status',
  'bedrooms', 'bathrooms', 'building_size', 'land_size', 'parking_spaces',
  'year_built', 'furnished', 'brand', 'color', 'size', 'condition', 'warranty',
  'stock_quantity', 'availability_status', 'is_active', 'images', 'tags',
  'specifications', 'latitude', 'longitude', 'video', 'video_url',
  'shipping_info', 'delivery_estimate', 'weight', 'dimensions',
  'rating', 'rating_count', 'favorite_count', 'review_count',
  'approval_status', 'created_at', 'updated_at',
].join(',');

function withTimeout(promise, ms) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve('__timeout__'), ms);
    promise.then(
      (v) => { clearTimeout(timer); resolve(v); },
      () => { clearTimeout(timer); resolve('__timeout__'); }
    );
  });
}

// Turn a raw DB/local-store row into the shape the showroom/details pages read.
// Products priced between $1 and $100 are intentionally filtered OUT here so they
// never appear anywhere on the store (public catalog, showroom, dashboards) even
// if stale copies linger in any localStorage cache.
export function isKeepableProduct(row) {
  if (!row) return false;
  const price = Number(row.price);
  if (Number.isFinite(price) && price >= 1 && price <= 100) return false;
  return true;
}

function normalizeDbRow(row) {
  if (!isKeepableProduct(row)) return null;
  const images = Array.isArray(row.images) ? [...row.images] : [];
  // Merge standalone video/video_url columns into images[] so every renderer
  // that iterates `listing.images` automatically picks up the product video.
  for (const v of [row.video, row.video_url]) {
    if (v && typeof v === 'string' && !images.includes(v)) images.push(v);
  }
  return ensurePlayableVideo({
    ...row,
    // Vehicle/product specs are stored in the `specifications` JSONB column
    // (model_year, engine, transmission, seating_capacity, doors, etc.).
    // Flatten them to top-level so the showroom/details pages can read them
    // the same way they read the hardcoded seed data.
    ...(row.specifications && typeof row.specifications === 'object' ? row.specifications : {}),
    images,
    features: Array.isArray(row.features) ? row.features : [],
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    rating: Number(row.rating) || 0,
    rating_count: row.rating_count || 0,
    favorite_count: row.favorite_count || 0,
    price: Number(row.price) || 0,
  });
}

function readDBCache() {
  try {
    const raw = localStorage.getItem(DB_CACHE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeDBCache(rows) {
  try { localStorage.setItem(DB_CACHE_KEY, JSON.stringify(rows)); } catch { /* ignore */ }
}

function applyDbRows(rows) {
  _dbListings = rows.map(normalizeDbRow).filter(Boolean);
  // Merge into the listing map (DB entries take priority on duplicate IDs)
  for (const l of _dbListings) LISTING_MAP.set(l.property_id, l);
}

// Synchronously load the last-fetched DB rows from localStorage so the homepage
// can render real products before any network request resolves. Called at the
// very start of the showroom init (and never throws).
export function hydrateDBListingsFromCache() {
  if (_dbLoaded) return;
  const cached = readDBCache();
  if (!cached.length) return;
  applyDbRows(cached);
  writeDBCache(cached);
}

// Single shared in-flight request: if the homepage, promo pool, cards, and the
// details page all ask for listings at once, they reuse ONE fetch instead of
// hammering Supabase N times. This is what makes the details page open fast.
// The result is the slim column set above (everything the LIST needs) so the
// payload is small and the localStorage cache is light.
export function loadDBListings() {
  if (_dbLoaded) return Promise.resolve(_dbListings);
  if (_dbLoading) return _dbLoading;
  _dbLoading = (async () => {
    try {
      const { supabase } = await import('./supabase-client.js');
      const { listLocalShowroomListings } = await import('./local-showroom-store.js');
      const result = await withTimeout(
        supabase
          .from('showroom_listings')
          .select(LIST_COLUMNS)
          .eq('is_active', true)
          .eq('listing_type', 'property')
          .order('created_at', { ascending: false }),
        DB_FETCH_TIMEOUT_MS
      );
      const ok = result !== '__timeout__' && !result.error;
      const rows = ok ? (result.data || []) : [];
      // Always merge database rows with the local fallback store so products that
      // were saved locally (while the database was unavailable) still show up on
      // the store. Database rows win on duplicate IDs.
      const dbIds = new Set(rows.map(row => row.property_id));
      for (const row of listLocalShowroomListings().filter(item => item.listing_type === 'property' && item.is_active !== false)) {
        if (row && row.property_id && !dbIds.has(row.property_id) && isKeepableProduct(row)) { dbIds.add(row.property_id); rows.push(row); }
      }
      if (ok) {
        // Fresh DB data replaces whatever was hydrated from the cache.
        applyDbRows(rows);
        writeDBCache(rows);
      } else {
        // Network failed/timed out — keep the cached rows we already have (if
        // any) and only add any newly-saved local-store rows that are missing.
        const existing = new Map(_dbListings.map(l => [l.property_id, l]));
        for (const row of rows) {
          const norm = normalizeDbRow(row);
          if (norm && norm.property_id && !existing.has(norm.property_id)) existing.set(norm.property_id, norm);
        }
        _dbListings = Array.from(existing.values());
      }
      _dbLoaded = true;
      return _dbListings;
    } catch {
      _dbLoaded = true;
      return _dbListings;
    } finally {
      _dbLoading = null;
    }
  })();
  return _dbLoading;
}

// Fetch ONE full listing row (every column) by property_id. The shopfront list
// only loads slim rows, so the details/checkout/payment pages use this to get a
// complete listing (description, specifications, features...) with a single
// tiny request instead of re-downloading the whole table. Rows are merged into
// the shared listing map so later lookups see the fully-populated listing.
const _fullInflight = new Map();
export function loadFullListingById(pid) {
  if (!pid) return Promise.resolve(null);
  // A row with a description is already the FULL listing (statics, or a row
  // hydrated by an earlier full fetch). Slim list rows have no description, so
  // they fall through and get the single-row fetch below.
  const existing = LISTING_MAP.get(pid);
  if (existing && existing.description != null) return Promise.resolve(existing);
  if (_fullInflight.has(pid)) return _fullInflight.get(pid);
  const p = (async () => {
    try {
      const { supabase } = await import('./supabase-client.js');
      const res = await withTimeout(
        supabase
          .from('showroom_listings')
          .select('*')
          .eq('property_id', pid)
          .maybeSingle(),
        DB_FETCH_TIMEOUT_MS
      );
      const ok = res !== '__timeout__' && !res.error && res.data;
      const norm = ok ? normalizeDbRow(res.data) : null;
      if (norm && norm.property_id) {
        LISTING_MAP.set(norm.property_id, norm);
        _dbListings = _dbListings.map(l => (l.property_id === norm.property_id ? norm : l));
      }
      return norm;
    } catch {
      return null;
    } finally {
      _fullInflight.delete(pid);
    }
  })();
  _fullInflight.set(pid, p);
  return p;
}

// Return ALL listings: hardcoded + database, deduplicated by property_id.
function readHiddenIds() {
  try {
    const raw = JSON.parse(localStorage.getItem('kco_hidden_catalog_ids_v1') || '[]');
    return new Set(Array.isArray(raw) ? raw : []);
  } catch {
    return new Set();
  }
}

export function getAllListings() {
  const hidden = readHiddenIds();
  const seen = new Set();
  const all = [];
  for (const l of _dbListings) {
    if (!l || !l.property_id || l.listing_type !== 'property' || hidden.has(l.property_id)) continue;
    if (!seen.has(l.property_id)) { seen.add(l.property_id); all.push(l); }
  }
  for (const l of SHOWROOM_LISTINGS) {
    if (!l || !l.property_id || l.listing_type !== 'property' || hidden.has(l.property_id)) continue;
    if (!seen.has(l.property_id)) { seen.add(l.property_id); all.push(l); }
  }
  return all;
}

// Find a single listing by property_id across both sources.
export function findListingById(id) {
  if (readHiddenIds().has(id)) return null;
  return LISTING_MAP.get(id) || null;
}
