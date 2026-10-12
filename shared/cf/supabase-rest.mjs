// shared/cf/supabase-rest.mjs — Worker-safe Supabase access via plain fetch.
// Replaces @supabase/supabase-js inside Cloudflare Pages Functions so the
// bundle stays small and needs no Node compatibility flags. Uses the same
// public anon key the browser already ships (see shared/supabase-env.mjs).

import { MAIN_URL, MAIN_ANON_KEY } from '../supabase-env.mjs';

const SITE_URL = 'https://weverseonlineshop.com';

// Minimal PostgREST GET. `query` maps directly to PostgREST params, e.g.
// { select: '*', is_active: 'eq.true', property_id: 'eq.ABC', limit: '1' }.
export async function sbGet(table, query = {}) {
  const u = new URL(`/rest/v1/${table}`, MAIN_URL);
  for (const [k, v] of Object.entries(query)) {
    if (v != null) u.searchParams.set(k, String(v));
  }
  const res = await fetch(u.toString(), {
    headers: {
      apikey: MAIN_ANON_KEY,
      Authorization: `Bearer ${MAIN_ANON_KEY}`,
      Accept: 'application/json',
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Supabase ${res.status}: ${text.slice(0, 300)}`);
  }
  return res.json();
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isUuid(id) {
  return UUID_RE.test(String(id));
}

function normalizeRow(row) {
  return {
    ...row,
    price: Number(row.price) || 0,
    images: Array.isArray(row.images) ? row.images : [],
  };
}

// Targeted single-row lookup by property_id (with a UUID `id` fallback).
export async function resolveFromDb(id) {
  try {
    const byProperty = await sbGet('showroom_listings', {
      select: '*',
      is_active: 'eq.true',
      property_id: `eq.${id}`,
      limit: '1',
    });
    if (Array.isArray(byProperty) && byProperty[0]) return normalizeRow(byProperty[0]);
    if (isUuid(id)) {
      const byId = await sbGet('showroom_listings', {
        select: '*',
        is_active: 'eq.true',
        id: `eq.${id}`,
        limit: '1',
      });
      if (Array.isArray(byId) && byId[0]) return normalizeRow(byId[0]);
    }
    return null;
  } catch (err) {
    console.error('[cf-supabase] resolveFromDb failed:', err && err.message ? err.message : err);
    return null;
  }
}

// ── Related-product internal links (SSR, crawler-visible) ───────────────
let relatedCache = { at: 0, rows: null, busy: null };

function relRowId(r) {
  return r?.property_id || r?.id || r?.sku || '';
}

const VIDEO_EXT_RE = /\.(mp4|webm|mov|avi|mkv|m4v|3gp)(\?|#|$)/i;
function relMediaUrl(r) {
  const imgs = Array.isArray(r?.images) ? r.images : [];
  const video = (typeof r.video_url === 'string' && r.video_url)
    || (typeof r.video === 'string' && r.video)
    || imgs.find((u) => typeof u === 'string' && VIDEO_EXT_RE.test(u))
    || '';
  return video || imgs.find((u) => typeof u === 'string' && u.startsWith('http')) || '';
}

async function fetchRelatedIndex() {
  const now = Date.now();
  if (relatedCache.rows && now - relatedCache.at < 10 * 60 * 1000) return relatedCache.rows;
  if (relatedCache.busy) return relatedCache.busy;
  relatedCache.busy = (async () => {
    const rows = await sbGet('showroom_listings', {
      select: 'id,property_id,title,price,currency,category,subcategory,listing_type,country,images,availability_status,stock_quantity',
      is_active: 'eq.true',
      order: 'updated_at.desc',
      limit: '6000',
    });
    const list = (Array.isArray(rows) ? rows : []).filter((r) => relRowId(r));
    relatedCache = { at: Date.now(), rows: list, busy: null };
    return list;
  })();
  try {
    return await relatedCache.busy;
  } catch (err) {
    relatedCache.busy = null;
    console.error('[cf-supabase] related index failed:', err && err.message ? err.message : err);
    return [];
  }
}

export async function findRelatedListings(listing, limit = 4) {
  try {
    const rows = await fetchRelatedIndex();
    if (!rows.length) return [];
    const selfId = relRowId(listing);
    const cat = String(listing?.category || listing?.subcategory || '').toLowerCase().trim();
    const country = String(listing?.country || '').toLowerCase().trim();
    const type = String(listing?.listing_type || '').toLowerCase().trim();

    const scored = rows
      .map((r) => {
        const id = relRowId(r);
        if (!id || id === selfId) return null;
        let s = 0;
        const rc = String(r.category || '').toLowerCase().trim();
        const rsub = String(r.subcategory || '').toLowerCase().trim();
        const rco = String(r.country || '').toLowerCase().trim();
        if (cat && (rc === cat || rsub === cat)) s += 3;
        else if (cat && (rc.includes(cat) || cat.includes(rc))) s += 2;
        if (country && rco === country) s += 2;
        if (type && String(r.listing_type || '').toLowerCase().trim() === type) s += 1;
        return { r, s };
      })
      .filter((x) => x && x.s > 0)
      .sort((a, b) => b.s - a.s);

    const picked = scored.slice(0, limit).map((x) => x.r);
    if (picked.length < limit) {
      const have = new Set(picked.map(relRowId));
      for (const r of rows) {
        if (picked.length >= limit) break;
        const id = relRowId(r);
        if (!id || id === selfId || have.has(id)) continue;
        picked.push(r);
        have.add(id);
      }
    }
    return picked.map((r) => {
      const id = relRowId(r);
      return {
        id,
        title: String(r.title || ''),
        price: Number(r.price) || 0,
        currency: r.currency || 'USD',
        image: relMediaUrl(r),
        url: `${SITE_URL}/product/${encodeURIComponent(id)}`,
        category: r.category || null,
        country: r.country || null,
      };
    });
  } catch (err) {
    console.error('[cf-supabase] findRelatedListings failed:', err && err.message ? err.message : err);
    return [];
  }
}

// Full active-catalog snapshot used by the sitemap / merchant-feed / hub pages.
// Module-scope cache (10 min) keeps Supabase traffic low across warm requests.
const catalogCaches = new Map();
export async function fetchCatalog(select, { ttlMs = 10 * 60 * 1000, limit = 5000 } = {}) {
  const key = select;
  const now = Date.now();
  const hit = catalogCaches.get(key);
  if (hit && now - hit.at < ttlMs) return hit.rows;
  const rows = await sbGet('showroom_listings', {
    select,
    is_active: 'eq.true',
    order: 'updated_at.desc',
    limit: String(limit),
  });
  const list = Array.isArray(rows) ? rows : [];
  catalogCaches.set(key, { at: now, rows: list });
  return list;
}
