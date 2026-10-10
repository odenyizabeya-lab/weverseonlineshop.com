// Shared Supabase listing lookup for the serverless OG/image functions.
// Uses a fast, targeted single-row query by property_id (with a UUID `id`
// fallback) and `persistSession:false` so it never touches localStorage and
// never loads the whole table on a crawler request.

import { MAIN_URL, MAIN_ANON_KEY } from './supabase-env.mjs';

const SITE_URL = 'https://weverseonlineshop.com';

let client = null;

export async function getDbClient() {
  if (client) return client;
  const { createClient } = await import('@supabase/supabase-js');
  client = createClient(MAIN_URL, MAIN_ANON_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  return client;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isUuid(id) { return UUID_RE.test(String(id)); }

export function normalizeRow(row) {
  return {
    ...row,
    price: Number(row.price) || 0,
    images: Array.isArray(row.images) ? row.images : [],
  };
}

export async function resolveFromDb(id) {
  try {
    const c = await getDbClient();
    const byProperty = await c.from('showroom_listings')
      .select('*')
      .eq('is_active', true)
      .eq('property_id', id)
      .maybeSingle();
    if (byProperty && !byProperty.error && byProperty.data) return normalizeRow(byProperty.data);
    if (isUuid(id)) {
      const byId = await c.from('showroom_listings')
        .select('*')
        .eq('is_active', true)
        .eq('id', id)
        .maybeSingle();
      if (byId && !byId.error && byId.data) return normalizeRow(byId.data);
    }
    return null;
  } catch (err) {
    console.error('[og-lookup] resolveFromDb failed:', err && err.message ? err.message : err);
    return null;
  }
}

// ── Related-product internal links (SSR, crawler-visible) ───────────────
// Fetches a slim, cached catalog snapshot and ranks siblings by real shared
// category / country / listing type, so product pages cross-link to genuinely
// relevant products (never invented neighbours).
let relatedCache = { at: 0, rows: null, busy: null };

function relRowId(r) { return r?.property_id || r?.id || r?.sku || ''; }

const VIDEO_EXT_RE = /\.(mp4|webm|mov|avi|mkv|m4v|3gp)(\?|#|$)/i;
function relMediaUrl(r) {
  const imgs = Array.isArray(r?.images) ? r.images : [];
  const video = (typeof r.video_url === 'string' && r.video_url) || (typeof r.video === 'string' && r.video) || imgs.find((u) => typeof u === 'string' && VIDEO_EXT_RE.test(u)) || '';
  return video || imgs.find((u) => typeof u === 'string' && u.startsWith('http')) || '';
}

async function fetchRelatedIndex() {
  const now = Date.now();
  if (relatedCache.rows && now - relatedCache.at < 10 * 60 * 1000) return relatedCache.rows;
  if (relatedCache.busy) return relatedCache.busy;
  relatedCache.busy = (async () => {
    const c = await getDbClient();
    const { data, error } = await c
      .from('showroom_listings')
      .select('id, property_id, title, price, currency, category, subcategory, listing_type, country, images, availability_status, stock_quantity')
      .eq('is_active', true)
      .order('updated_at', { ascending: false })
      .limit(6000);
    if (error) throw new Error(error.message);
    const rows = (data || []).filter((r) => relRowId(r));
    relatedCache = { at: Date.now(), rows, busy: null };
    return rows;
  })();
  try {
    return await relatedCache.busy;
  } catch (err) {
    relatedCache.busy = null;
    console.error('[og-lookup] related index failed:', err && err.message ? err.message : err);
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
    console.error('[og-lookup] findRelatedListings failed:', err && err.message ? err.message : err);
    return [];
  }
}
