import { getSupabase } from './supabase-lazy.js';
import { isVideoUrl } from './showroom-data.js';

// ── Session key ────────────────────────────────────────────────
function getSessionKey() {
  let key = localStorage.getItem('kco_search_session');
  if (!key) {
    key = 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2);
    localStorage.setItem('kco_search_session', key);
  }
  return key;
}

// ── LRU cache (TTL: 3 min, max 300 entries) ───────────────────
const CACHE_TTL = 180000;
const _cache = new Map();
function cacheGet(key) {
  const entry = _cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) { _cache.delete(key); return null; }
  // Move to end (most recently used)
  _cache.delete(key);
  _cache.set(key, entry);
  return entry.data;
}
function cacheSet(key, data) {
  if (_cache.size > 300) {
    const oldest = _cache.keys().next().value;
    _cache.delete(oldest);
  }
  _cache.set(key, { data, ts: Date.now() });
}

// ── Request deduplication ─────────────────────────────────────
const _inflight = new Map();
function dedupe(key, fn) {
  if (_inflight.has(key)) return _inflight.get(key);
  const promise = fn().finally(() => _inflight.delete(key));
  _inflight.set(key, promise);
  return promise;
}

// ── Synonyms for query expansion ──────────────────────────────
// Property-focussed so a house search can never surface vehicle/product terms.
const SYNONYMS = {
  house: ['home', 'property', 'residence'],
  home: ['house', 'property', 'residence'],
  property: ['house', 'home', 'real estate'],
  apartment: ['condo', 'flat', 'studio', 'loft', 'townhouse'],
  villa: ['mansion', 'luxury home', 'estate'],
  mansion: ['villa', 'estate', 'luxury home'],
  condo: ['apartment', 'flat', 'condominium'],
  lease: ['rent', 'rental'],
  rent: ['lease', 'rental'],
  land: ['plot', 'acreage', 'parcel', 'lot'],
  beach: ['coastal', 'waterfront', 'seaside', 'lakefront'],
  waterfront: ['beach', 'coastal', 'seaside'],
  commercial: ['office', 'retail', 'business property'],
};

function expandQuery(query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const expanded = [...words];
  for (const word of words) {
    const singular = word.endsWith('s') ? word.slice(0, -1) : word;
    if (SYNONYMS[word]) expanded.push(...SYNONYMS[word].slice(0, 3));
    if (SYNONYMS[singular] && singular !== word) expanded.push(...SYNONYMS[singular].slice(0, 2));
    if (singular !== word) expanded.push(singular);
  }
  return [...new Set(expanded)].join(' ');
}

// Houses-only gate: the customer marketplace sells real estate, so vehicles,
// special orders and products never appear in search results or suggestions.
function isPropertyResult(r) {
  if (!r) return false;
  const et = String(r.entity_type || r.listing_type || '').toLowerCase();
  if (et === 'property') return true;
  if (et === 'vehicle' || et === 'special_order' || et === 'product') return false;
  const hay = [r.category, r.subcategory, r.title].filter(Boolean).join(' ').toLowerCase();
  return /(real estate|houses?|homes?|apartment|condo|villa|mansion|townhouse|duplex|penthouse|bungalow|cottage|chalet|loft|studio|farm house|beach house|commercial property|hotel|resort|land for sale)/.test(hay);
}

// ── Local catalog search ─────────────────────────────────────────
// The marketplace RPC only searches database rows, but most of the
// showroom is the built-in catalog (products, trucks, motorhomes, homes),
// so we also search it locally and merge the matches. This makes search
// feel instant and complete — every product on the site is findable.
let _catalogIndex = null;
let _catalogIndexPromise = null;

function catalogHaystack(p) {
  return [
    p.title || '', p.brand || '', p.category || '', p.subcategory || '',
    Array.isArray(p.features) ? p.features.join(' ') : '',
    Array.isArray(p.tags) ? p.tags.join(' ') : '',
    (p.description || '').slice(0, 300),
  ].join(' ').toLowerCase();
}

function getCatalogIndex() {
  if (_catalogIndex) return Promise.resolve(_catalogIndex);
  if (_catalogIndexPromise) return _catalogIndexPromise;
  _catalogIndexPromise = Promise.all([
    import('./showroom-data.js'),
    import('./products-data.js'),
    import('./products-extra.js'),
    import('./truck-data.js'),
    import('./motorhome-data.js'),
  ]).then(([sd, pd, pe, td, md]) => {
    // Houses only — vehicles and products stay out of the search index.
    _catalogIndex = [...(sd.SHOWROOM_LISTINGS || []), ...(pd.PRODUCT_LISTINGS || []), ...(pe.PRODUCT_EXTRA_LISTINGS || []), ...(td.TRUCK_LISTINGS || []), ...(md.MOTORHOME_LISTINGS || [])]
      .filter(p => p && p.property_id)
      .filter(p => isPropertyResult({ ...p, listing_type: p.listing_type || (p.product ? 'product' : undefined) }))
      .map(p => ({ p, hay: catalogHaystack(p) }));
    return _catalogIndex;
  }).catch(() => { _catalogIndex = []; return _catalogIndex; });
  return _catalogIndexPromise;
}

// Warm up the catalog index in the background so the first search/suggestion
// feels instant instead of waiting for the large data chunks to download.
export function preloadCatalogIndex() {
  getCatalogIndex().catch(() => {});
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((resolve) => setTimeout(() => resolve(null), ms)),
  ]);
}

function toCatalogResult(p) {
  const images = Array.isArray(p.images) ? p.images : [];
  const video = (Array.isArray(p.images) ? p.images.find(u => isVideoUrl(u)) : '') || p.video || p.video_url || '';
  return {
    listing_id: p.property_id,
    property_id: p.property_id,
    title: p.title || 'Untitled',
    brand: p.brand,
    description: p.description,
    category: p.category,
    subcategory: p.subcategory,
    images,
    thumbnail: video || null,
    price: Number(p.price) || 0,
    currency: p.currency || 'USD',
    entity_type: p.listing_type || 'product',
    is_special_order: false,
  };
}

function localCatalogSearch(query, limit) {
  if (!_catalogIndex || _catalogIndex.length === 0) return [];
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/).filter(Boolean);
  const scored = [];
  for (const { p, hay } of _catalogIndex) {
    const title = (p.title || '').toLowerCase();
    const matchTitle = title.includes(q);
    const matchAny = hay.includes(q);
    const allWords = words.every(w => title.includes(w) || hay.includes(w));
    const someWords = words.some(w => title.includes(w) || hay.includes(w));
    let s = 0;
    if (title === q) s += 200;
    if (title.startsWith(q)) s += 150;
    if (matchTitle) s += 100;
    if (matchAny) s += 60;
    if (allWords) s += 50;
    else if (someWords) s += 25;
    if (s > 0) scored.push({ s, r: toCatalogResult(p) });
  }
  scored.sort((a, b) => b.s - a.s);
  return scored.slice(0, limit).map(x => x.r);
}

// ── Core search: fast marketplace + background supplier ──────
export async function smartSearch(query, limit = 30, onPartialResults) {
  if (!query || query.trim().length < 1) return { results: [], count: 0, marketplaceCount: 0, supplierCount: 0 };

  const trimmed = query.trim();
  const cacheKey = `search:${trimmed}:${limit}`;
  const cached = cacheGet(cacheKey);
  if (cached) {
    if (onPartialResults) onPartialResults(cached.results, cached);
    return cached;
  }

  return dedupe(cacheKey, async () => {
    const supabase = await getSupabase();
    const searchQuery = expandQuery(trimmed);
    const fuzzyQuery = trimmed.toLowerCase();

    // INSTANT built-in catalog matches — rendered immediately while the
    // database query is still in flight, so typing feels instant.
    getCatalogIndex().then(() => {
      const instant = localCatalogSearch(trimmed, limit);
      if (instant.length > 0 && onPartialResults) {
        onPartialResults(instant, { count: instant.length, marketplaceCount: instant.length, supplierCount: 0 });
      }
    }).catch(() => {});

    // Single fast RPC call: FTS + fuzzy + partial combined
    const { data: marketplaceResults, error } = await supabase.rpc('smart_search_quick', {
      p_query: searchQuery, p_limit: limit,
    });

    let results = [];
    if (!error && marketplaceResults && marketplaceResults.length > 0) {
      results = marketplaceResults.filter(isPropertyResult);
    }

    // Merge built-in catalog matches (site homes not stored in the DB).
    // Database rows win on duplicate ids.
    await getCatalogIndex().catch(() => {});
    const local = localCatalogSearch(trimmed, limit);
    const seenIds = new Set(results.map(r => r.property_id || r.listing_id));
    for (const r of local) {
      if (!seenIds.has(r.property_id)) { seenIds.add(r.property_id); results.push(r); }
    }

    // Deliver marketplace results immediately if callback provided
    if (onPartialResults && results.length > 0) {
      onPartialResults(results, { count: results.length, marketplaceCount: results.length, supplierCount: 0 });
    }

    // Record analytics (fire-and-forget)
    try {
      const sessionKey = getSessionKey();
      supabase.rpc('record_search', {
        p_query: trimmed,
        p_result_count: results.length,
        p_session_key: sessionKey,
      }).then(() => {}, () => {});
    } catch {}

    const result = {
      results,
      count: results.length,
      marketplaceCount: results.length,
      supplierCount: 0,
      _final: true,
    };
    cacheSet(cacheKey, result);

    // Preload likely next searches (fire-and-forget)
    preloadRelatedSearches(trimmed, limit);

    return result;
  });
}

// ── Preload related searches in background ────────────────────
async function preloadRelatedSearches(query, limit) {
  const supabase = await getSupabase();
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length < 2) return;
  // Preload singular/plural variant
  const variants = new Set();
  for (const word of words) {
    if (word.endsWith('s')) variants.add(word.slice(0, -1));
    else variants.add(word + 's');
  }
  for (const v of variants) {
    const key = `search:${v}:${limit}`;
    if (!cacheGet(key) && !_inflight.has(key)) {
      dedupe(key, () =>
        supabase.rpc('smart_search_quick', { p_query: v, p_limit: limit })
          .then(({ data, error }) => { if (!error && data) cacheSet(key, data); })
          .catch(() => {})
      );
    }
  }
}

// ── Live suggestions (cached, deduped, fast) ────────────────
export async function getLiveSuggestions(query, limit = 8) {
  if (!query || query.trim().length < 1) return [];
  const trimmed = query.trim();
  const cacheKey = `sugg:${trimmed}:${limit}`;
  const cached = cacheGet(cacheKey);
  if (cached) return cached;

  return dedupe(cacheKey, async () => {
    const supabase = await getSupabase();
    const searchQuery = expandQuery(trimmed);

    // Merge built-in catalog suggestions first so every site product is
    // suggestable even if the database RPC is slow or empty.
    await getCatalogIndex().catch(() => {});
    const mapped = localCatalogSearch(trimmed, limit).map(r => ({
      id: r.property_id,
      title: r.title,
      category: r.category,
      price: r.price,
      currency: r.currency,
      entity_type: r.entity_type,
      thumbnail: r.thumbnail,
    }));
    const seenIds = new Set(mapped.map(m => m.id || m.title));

    // Database suggestions via RPC, but never block on a slow DB — local
    // catalog results are already ready.
    const rpc = await withTimeout(supabase.rpc('smart_search_quick', {
      p_query: searchQuery, p_limit: limit,
    }), 2000);

    let results = [];
    if (rpc && !rpc.error && rpc.data && rpc.data.length > 0) {
      results = rpc.data.filter(isPropertyResult);
    } else if (rpc && rpc.error) {
      // Fallback to fuzzy
      const fuzzy = await withTimeout(supabase.rpc('smart_search_fuzzy', {
        p_query: trimmed.toLowerCase(), p_limit: limit,
      }), 1500);
      if (fuzzy && fuzzy.data) results = fuzzy.data.filter(isPropertyResult);
    }

    for (const r of results) {
      if (!seenIds.has(r.listing_id) && !seenIds.has(r.title)) {
        seenIds.add(r.listing_id);
        mapped.push({
          id: r.listing_id,
          title: r.title,
          category: r.category,
          price: r.price,
          currency: r.currency,
          entity_type: r.entity_type,
          thumbnail: r.thumbnail,
        });
      }
    }
    cacheSet(cacheKey, mapped);
    return mapped;
  });
}

// ── Recent searches ───────────────────────────────────────────
export async function getRecentSearches(limit = 5) {
  const sessionKey = getSessionKey();
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from('search_history')
      .select('query, created_at')
      .eq('session_key', sessionKey)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (!error && data) {
      const seen = new Set();
      return data.filter(d => {
        if (seen.has(d.query.toLowerCase())) return false;
        seen.add(d.query.toLowerCase());
        return true;
      });
    }
  } catch {}
  const local = JSON.parse(localStorage.getItem('kco_recent_searches') || '[]');
  return local.map(q => ({ query: q, created_at: null }));
}

export async function saveRecentSearch(query) {
  if (!query || query.trim().length < 1) return;
  const trimmed = query.trim();
  const sessionKey = getSessionKey();
  try {
    const supabase = await getSupabase();
    supabase.from('search_history').insert({ session_key: sessionKey, query: trimmed }).then(() => {}, () => {});
  } catch {}
  const local = JSON.parse(localStorage.getItem('kco_recent_searches') || '[]');
  const filtered = local.filter(q => q.toLowerCase() !== trimmed.toLowerCase());
  filtered.unshift(trimmed);
  localStorage.setItem('kco_recent_searches', JSON.stringify(filtered.slice(0, 10)));
}

export async function clearRecentSearches() {
  const sessionKey = getSessionKey();
  try {
    const supabase = await getSupabase();
    await supabase.from('search_history').delete().eq('session_key', sessionKey);
  } catch {}
  localStorage.removeItem('kco_recent_searches');
}

// ── Trending searches ────────────────────────────────────────
export async function getTrendingSearches(limit = 8) {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase.rpc('smart_search_trending', { p_limit: limit });
    if (!error && data) return data.map(d => d.query);
  } catch {}
  return ['Real Estate', 'Beach House', 'Villa', 'Luxury House', 'Apartment', 'Mansion', 'House for Sale', 'Land for Sale'];
}

// ── Voice search ─────────────────────────────────────────────
let voiceRecognition = null;
let isListening = false;

export function toggleVoiceSearch(onResult, onStateChange) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return { supported: false };
  if (isListening && voiceRecognition) { voiceRecognition.stop(); return { supported: true }; }
  voiceRecognition = new SR();
  voiceRecognition.continuous = false;
  voiceRecognition.interimResults = true;
  voiceRecognition.lang = 'en-US';
  voiceRecognition.onstart = () => { isListening = true; onStateChange?.(true); };
  voiceRecognition.onresult = (e) => {
    let transcript = '';
    for (let i = 0; i < e.results.length; i++) transcript += e.results[i][0].transcript;
    onResult?.(transcript);
  };
  voiceRecognition.onerror = () => { onStateChange?.(false); };
  voiceRecognition.onend = () => { isListening = false; onStateChange?.(false); };
  voiceRecognition.start();
  return { supported: true };
}

export function isVoiceListening() { return isListening; }

export { getSessionKey };
