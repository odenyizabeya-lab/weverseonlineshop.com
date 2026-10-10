// catalog-hidden-store.js — Hiding generated catalog listings site-wide.
//
// Generated catalog listings (src/catalog.js) are deterministic: they are
// regenerated on every page load, so a DB "is_active: false" row cannot hide
// them (loadDBListings only loads active rows). Instead the admin toggles a
// list of hidden catalog ids that is persisted in site_settings.hidden_catalog_ids
// and cached in localStorage for fast synchronous reads on every page.

const CACHE_KEY = 'kco_hidden_catalog_ids_v1';

function readLocalCache() {
  try {
    const raw = JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
    return Array.isArray(raw) ? raw.filter(x => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function writeLocalCache(list) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(list));
  } catch {}
}

let _cache = readLocalCache();
let _loaded = false;

function normalize(list) {
  const seen = new Set();
  const out = [];
  for (const id of Array.isArray(list) ? list : []) {
    if (typeof id === 'string' && !seen.has(id)) { seen.add(id); out.push(id); }
  }
  return out;
}

function setCache(list) {
  _cache = normalize(list);
  writeLocalCache(_cache);
}

export function getHiddenCatalogIds() {
  return _cache.slice();
}

export function isCatalogListingHidden(id) {
  return _cache.includes(id);
}

export function isHiddenCatalogLoaded() {
  return _loaded;
}

async function fetchFromDb() {
  const { supabase } = await import('./supabase-client.js');
  const { data } = await supabase
    .from('site_settings')
    .select('hidden_catalog_ids')
    .limit(1)
    .maybeSingle();
  return Array.isArray(data?.hidden_catalog_ids) ? data.hidden_catalog_ids : [];
}

async function writeToDb(list) {
  const { supabase } = await import('./supabase-client.js');
  const payload = { hidden_catalog_ids: normalize(list) };
  const { data: existing } = await supabase.from('site_settings').select('id').limit(1).maybeSingle();
  if (existing?.id) {
    const { error } = await supabase.from('site_settings').update(payload).eq('id', existing.id);
    return { ok: !error, error };
  }
  const { error } = await supabase.from('site_settings').insert(payload);
  return { ok: !error, error };
}

// Load hidden ids from the database and refresh the local cache.
// Merges the DB list with any local-only ids (e.g. toggles made while offline)
// so nothing the admin already hid suddenly reappears.
export async function loadHiddenCatalogIds() {
  try {
    const dbList = await fetchFromDb();
    const merged = normalize([...dbList, ..._cache]);
    setCache(merged);
    _loaded = true;
    return merged;
  } catch {
    _loaded = true;
    return _cache.slice();
  }
}

// Toggle a single catalog id. Always updates the local cache so the current
// browser reacts instantly; the database write is attempted and its success
// is returned for the UI to report.
export async function saveCatalogHidden(id, hidden) {
  const next = new Set(_cache);
  if (hidden) next.add(id); else next.delete(id);
  const list = normalize([...next]);
  setCache(list);
  const res = await writeToDb(list);
  return res;
}

// Unhide every catalog id (local + database).
export async function resetHiddenCatalogIds() {
  setCache([]);
  const res = await writeToDb([]);
  return res;
}
