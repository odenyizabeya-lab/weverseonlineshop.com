// ═══════════════════════════════════════════════════════════════════════════
// homepage-promo.js — Home page hero Promo Banner (video + image).
//
// The owner uploads their own promotional videos (and optional poster
// thumbnails) plus their own title, subtitle and button for EACH slide from
// the admin "Content Settings → Hero Video Banner" manager. This module reads
// those saved slides, builds a list of hero carousel slides and tells app.js
// to place them first in the rotating hero banner.
//
//   • Multiple slides -> one rotating hero slide per saved slide.
//   • If no multi-slide videos are saved, it falls back to the single
//     legacy promo_banner_* upload (image or video).
//   • If that is empty too, app.js shows the clean brand gradient banner.
//
// Nothing here is fabricated and nothing in the showroom is touched — only
// the owner's own uploads and words are shown.
// ═══════════════════════════════════════════════════════════════════════════

import { loadSiteContent, DEFAULT_SITE_CONTENT } from './site-content.js';

// The common banner button choices offered in the admin presets.
export const HERO_BTN_PRESETS = [
  'SHOP NOW', 'EXPLORE DEALS', 'VIEW PRODUCTS',
  'DISCOVER MORE', 'SEE OFFERS', 'SHOP THE LOOK',
];

// Build one premium hero slide from a saved video-entry object.
function buildHeroSlide(s, fallback) {
  const video = String((s && s.video) || '').trim();
  const poster = String((s && s.poster) || fallback.promo_banner_image || '').trim();
  const title = String((s && s.title) || 'Weverse Online Shop').trim();
  const subtitle = String((s && s.subtitle) || fallback.promo_banner_subtitle || '').trim();
  const slide = {
    adId: (s && s.id) || ('hero-' + (video || poster || Math.random().toString(36).slice(2))),
    promoBanner: true,
    badge: title || 'Feature',
    title: title || 'Weverse Online Shop',
    subtitle,
    buttonText: String((s && s.buttonText) || fallback.promo_banner_button_text || 'SHOP NOW').trim(),
    buttonLink: String((s && s.buttonLink) || fallback.promo_banner_button_link || '/#showroom-directory').trim(),
  };
  if (video) {
    slide.video = video;
    if (poster) slide.poster = poster;
  } else if (poster) {
    slide.image = poster; // poster doubles as the slide image
  }
  return slide;
}

// Multi-slide manager: every enabled saved slide becomes a rotating hero slide.
function buildHeroSlides(content) {
  const c = { ...DEFAULT_SITE_CONTENT, ...(content || {}) };
  const raw = Array.isArray(c.hero_video_slides) ? c.hero_video_slides : [];
  const slides = [];
  for (const s of raw) {
    if (!s || s.enabled === false) continue;
    const hasVideo = String((s.video || '')).trim();
    const hasPoster = String((s.poster || '')).trim();
    if (!hasVideo && !hasPoster) continue;
    slides.push(buildHeroSlide(s, c));
  }
  return slides;
}

// Legacy single-promo-banner fallback (image or video) kept for compatibility.
function buildLegacyPromoSlide(content) {
  const c = { ...DEFAULT_SITE_CONTENT, ...(content || {}) };
  if (c.promo_banner_enabled === false) return null;
  const image = (c.promo_banner_image || '').trim();
  const video = (c.promo_banner_video || '').trim();
  if (!image && !video) return null;
  const slide = {
    promoBanner: true,
    badge: (c.promo_banner_title || 'Promo Banner').trim(),
    title: (c.promo_banner_title || 'Weverse Online Shop').trim(),
    subtitle: (c.promo_banner_subtitle || '').trim(),
    buttonText: (c.promo_banner_button_text || '').trim(),
    buttonLink: (c.promo_banner_button_link || '/#showroom-directory').trim(),
  };
  if (video) {
    slide.video = video;
    if (image) slide.poster = image;
  } else if (image) {
    slide.image = image;
  }
  return slide;
}

function pushPromoBanner(content) {
  const heroSlides = buildHeroSlides(content);
  const legacy = buildLegacyPromoSlide(content);
  const slides = heroSlides.length ? heroSlides : (legacy ? [legacy] : []);
  const first = slides[0] || null;
  window._promoBannerSlide = first;
  // New event: the full ordered list of hero slides (multi-video rotation).
  window.dispatchEvent(new CustomEvent('hero-videos-updated', { detail: { slides } }));
  // Legacy single-slide event kept so nothing else breaks.
  window.dispatchEvent(new CustomEvent('promo-banner-updated', { detail: first }));
}

async function pushPromoBannerSafe() {
  try {
    const content = await loadSiteContent();
    pushPromoBanner(content);
  } catch {
    pushPromoBanner({});
  }
}

function init() {
  pushPromoBannerSafe();
  window.addEventListener('site-content-updated', () => {
    pushPromoBannerSafe();
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
