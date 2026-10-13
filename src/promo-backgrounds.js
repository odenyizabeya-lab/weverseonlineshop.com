// promo-backgrounds.js — Admin-managed promotional section backgrounds.
// Every slot can hold an IMAGE URL and/or a VIDEO URL (both optional). The
// admin uploads them from the "Promo & Backgrounds" panel; visitors see the
// chosen media on every page. Empty slots fall back to the built-in design.
//
// Slots:
//   trust_promo_*  — the trust/info promotional hero (family receiving orders)
//   app_banner_*   — the Weverse Mobile App banner
//   reviews_*      — the Customer Reviews section

import { getSupabase } from './supabase-lazy.js';

export const DEFAULT_PROMO_BG = {
  trust_promo_bg_image: '',
  trust_promo_bg_video: '',
  app_banner_bg_image: '',
  app_banner_bg_video: '',
  reviews_bg_image: '',
  reviews_bg_video: '',
};

const BG_FIELDS = Object.keys(DEFAULT_PROMO_BG).join(',');
const CACHE_KEY = 'kco_promo_backgrounds_v1';
const TTL = 60 * 1000;

function readCache() {
  try {
    const c = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    if (c.ts && Date.now() - c.ts < TTL && c.data && typeof c.data === 'object') return c.data;
  } catch {}
  return null;
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch {}
}

// Loads the current promo backgrounds (DB with localStorage cache + live event
// refresh). Never throws — always returns a complete settings object.
export async function loadPromoBackgrounds() {
  const cached = readCache();
  if (cached) return { ...DEFAULT_PROMO_BG, ...cached };
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from('site_settings')
      .select(BG_FIELDS)
      .limit(1)
      .maybeSingle();
    const merged = { ...DEFAULT_PROMO_BG, ...(error || !data ? {} : data) };
    writeCache(merged);
    return merged;
  } catch {
    return { ...DEFAULT_PROMO_BG };
  }
}

// Admin publishes new backgrounds → drop the stale cache so visitors pick up
// the change (same event is also fired by the save helper in admin-page.js).
export function invalidatePromoBackgrounds() {
  try { localStorage.removeItem(CACHE_KEY); } catch {}
  window.dispatchEvent(new CustomEvent('promo-backgrounds-updated'));
}

// ── Rendering helpers ─────────────────────────────────────────────

// A background media layer for a section: video first (if present), else image.
// Returns an HTML string used inside a `relative overflow-hidden` section.
// opts.overlay === 'strong' adds a heavier scrim + colour glow so floating cards
// and white comments stay crisp on top of a bright photo (used by Customer Reviews).
export function bgMediaLayer(bgImage, bgVideo, opts = {}) {
  const img = (bgImage || '').trim();
  const vid = (bgVideo || '').trim();
  const strong = opts.overlay === 'strong';
  const parts = [];
  if (vid) {
    parts.push(
      `<video class="absolute inset-0 w-full h-full object-cover" autoplay muted loop playsinline webkit-playsinline preload="metadata" poster="${escAttr(img)}">` +
      `<source src="${escAttr(vid)}" type="video/mp4">` +
      `</video>`
    );
  }
  if (img) {
    parts.push(
      `<div class="absolute inset-0 bg-cover bg-center" style="background-image:url('${escCssUrl(img)}')"></div>`
    );
  }
  // Overlay keeps the text readable on any media.
  if (vid || img) {
    parts.push(
      strong
        ? `<div class="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/72 to-slate-950/90"></div>`
        : `<div class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/70 to-slate-900/45"></div>`
    );
    if (strong) {
      parts.push(
        `<div class="absolute inset-0" style="background:
          radial-gradient(1100px 560px at 20% 6%, rgba(16,185,129,.22), transparent 60%),
          radial-gradient(900px 520px at 88% 100%, rgba(6,182,212,.16), transparent 60%)"></div>`
      );
    }
  }
  return parts.join('');
}

export function hasBg(bgImage, bgVideo) {
  return Boolean((bgImage || '').trim() || (bgVideo || '').trim());
}

function escAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escCssUrl(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

export { escAttr };