// ═══════════════════════════════════════════════════════════════════════════
// PROMO_POOL_CLEAN_MARKER_2026_SOURCE promo-pool.js — Shared "real products" pool for the App Promotion banner. UNIQUE SOURCE MARKER: "SOURCE_PROMO_POOL_IS_VIDEO_ONLY_7d3f9c2b"
// and the Live Product Promotions (Featured Product Alerts).
//
// Only REAL, currently-visible products are ever used:
//   • live showroom_listings rows from the database,
//   • the seed showroom listings.
// Hidden catalog IDs are excluded. Everything is deduplicated by property_id.
// ═══════════════════════════════════════════════════════════════════════════

import {
  loadDBListings,
  getDBListings,
  getAllListings,
  cleanListing,
  formatPrice,
} from './showroom-data.js';
import { getSupabase } from './supabase-lazy.js';

export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export function isVideoUrl(url) {
  if (!url || typeof url !== 'string') return false;
  if (/^data:video\//i.test(url)) return true;
  if (url.startsWith('blob:')) return false;
  return /\.(mp4|webm|mov|m4v|avi|mkv|ogv)(\?|#|$)/i.test(url);
}

export function asImages(listing) {
  if (Array.isArray(listing.images)) return listing.images.filter(Boolean);
  if (typeof listing.images === 'string') return [listing.images];
  return [];
}

export const PROMO_POOL_CFG_VERSION = 'SRC_PROMO_POOL_CFG_V9_2026_VIDEO_ONLY_MARKER_9f2c1b7e';

// Video-only cover: products are videos only, so the cover is the first video
// URL (or null). Never returns an image file / fallback placeholder.
export function coverOf(listing) {
  const vids = asImages(listing).filter(isVideoUrl);
  if (vids.length) return vids[0];
  const videoUrl = listing.video || listing.video_url;
  if (isVideoUrl(videoUrl)) return videoUrl;
  return null;
}

// Shared video-only thumbnail markup. If the listing has a video, a <video> is
// rendered; otherwise an empty "no video" tile. No <img>, no /fallback.svg.
export function mediaThumbHtml(listing, className) {
  const src = coverOf(listing);
  if (src) {
    return `<video src="${esc(src)}" muted playsinline preload="metadata" class="${esc(className)}"></video>`;
  }
  return `<div class="${esc(className || 'w-full h-full')} flex items-center justify-center bg-white/5"><i data-lucide="video-off" class="w-5 h-5 text-gray-500"></i></div>`;
}

// Real discount = the listing carries a higher real_price than its price.
export function discountOf(listing) {
  const real = parseFloat(listing.real_price);
  const price = parseFloat(listing.price);
  if (!(real > 0) || !(price > 0) || real <= price) return null;
  return { real, price, pct: Math.round((1 - price / real) * 100) };
}

export function priceHtml(listing) {
  const d = discountOf(listing);
  const price = formatPrice(listing);
  const real = d ? formatPrice({ price: d.real, currency: listing.currency, price_period: listing.price_period }) : '';
  const strike = d ? `<span class="text-gray-400 line-through">${real}</span> ` : '';
  const badge = d ? `<span class="inline-block bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">-${d.pct}%</span>` : '';
  return `${strike}<span class="font-black">${price}</span> ${badge}`;
}

let _pool = [];
let _poolLoaded = false;

function dedupe(listings) {
  const seen = new Set();
  const out = [];
  for (const l of listings) {
    if (!l) continue;
    const id = l.property_id || l.id;
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push(l);
  }
  return out;
}

// Merge all real catalogs + DB rows into one pool. DB wins on duplicate IDs.
export async function loadPromoPool() {
  if (_poolLoaded && _pool.length) return _pool;
  try {
    let dbRows = [];
    try {
      await loadDBListings();
      dbRows = getDBListings() || [];
    } catch { /* keep empty */ }

    let pool = dedupe([...dbRows, ...(getAllListings() || [])]);

    // Clean AI-ish text so the promo copy reads like the real marketplace.
    pool = pool.map((l) => {
      try { return cleanListing({ ...l }); } catch { return l; }
    });

    // Exclude hidden catalog ids.
    try {
      const { isCatalogListingHidden } = await import('./catalog-hidden-store.js');
      pool = pool.filter((l) => {
        const id = l.property_id || l.id;
        if (!id) return false;
        try { return !isCatalogListingHidden(id); } catch { return true; }
      });
    } catch { /* keep all */ }

    _pool = pool.filter((l) => asImages(l).length > 0 && (l.title || l.name));
    _poolLoaded = true;
    return _pool;
  } catch {
    _poolLoaded = true;
    return _pool;
  }
}

export function getPromoPool() {
  return _pool;
}

// ── Live Promotions / App Banner settings (site_settings) ──────────────────
const SETTINGS_CACHE_KEY = 'kco_promo_settings_v1';

export const DEFAULT_PROMO_SETTINGS = {
  app_banner_enabled: true,
  app_play_store_url: '',
  app_banner_headline: 'Discover More with the Weverse Online Shop App',
  live_promo_enabled: true,
  live_promo_interval_seconds: 60,
  live_promo_first_delay_seconds: 12,
  live_promo_product_ids: [],
  live_promo_use_owned_only: false,
};

// Read promo/app settings, cached briefly. Never throws — falls back to defaults.
export async function loadPromoSettings() {
  try {
    const cached = JSON.parse(localStorage.getItem(SETTINGS_CACHE_KEY) || '{}');
    if (cached.ts && Date.now() - cached.ts < 60 * 1000 && cached.data) {
      return { ...DEFAULT_PROMO_SETTINGS, ...cached.data };
    }
  } catch { /* ignore cache */ }

  const s = { ...DEFAULT_PROMO_SETTINGS };
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from('site_settings')
      .select('app_banner_enabled,app_play_store_url,app_banner_headline,'
        + 'live_promo_enabled,live_promo_interval_seconds,live_promo_first_delay_seconds,'
        + 'live_promo_product_ids,live_promo_use_owned_only')
      .limit(1)
      .maybeSingle();
    if (!error && data) {
      if (typeof data.app_banner_enabled === 'boolean') s.app_banner_enabled = data.app_banner_enabled;
      if (typeof data.app_play_store_url === 'string') s.app_play_store_url = data.app_play_store_url.trim();
      if (typeof data.app_banner_headline === 'string' && data.app_banner_headline.trim()) s.app_banner_headline = data.app_banner_headline.trim();
      if (typeof data.live_promo_enabled === 'boolean') s.live_promo_enabled = data.live_promo_enabled;
      const interval = parseInt(data.live_promo_interval_seconds, 10);
      if (interval > 0) s.live_promo_interval_seconds = interval;
      const first = parseInt(data.live_promo_first_delay_seconds, 10);
      if (first >= 0) s.live_promo_first_delay_seconds = first;
      if (Array.isArray(data.live_promo_product_ids)) s.live_promo_product_ids = data.live_promo_product_ids.filter(Boolean);
      if (typeof data.live_promo_use_owned_only === 'boolean') s.live_promo_use_owned_only = data.live_promo_use_owned_only;
    }
  } catch { /* fall back to defaults */ }

  try {
    localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify({ ts: Date.now(), data: s }));
  } catch { /* ignore */ }
  return s;
}

// Product rotation helper: admin-picked ids first (when set), else everything.
export function pickPromoProducts(pool, settings, limit = 12) {
  const ids = (settings && Array.isArray(settings.live_promo_product_ids) && settings.live_promo_product_ids.length)
    ? new Set(settings.live_promo_product_ids)
    : null;
  let items = ids ? pool.filter((l) => ids.has(l.property_id || l.id)) : pool.slice();
  if (!items.length) items = pool.slice();
  return items.slice(0, limit);
}