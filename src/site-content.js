// ═══════════════════════════════════════════════════════════════════════════
// site-content.js — Reusable GLOBAL "Website Content" system.
//
// The admin edits the wording of two shared sections from the admin
// "Content Settings" panel and the website uses the saved text everywhere:
//   1. The Android App promotional banner (title, description, button,
//      secondary text).
//   2. The final bottom / end-of-page closing section (thank-you heading,
//      main message, closing message, customer support, footer + copyright).
//
// This module is the single source of truth used by both sections on every
// page. Same pattern as promo-backgrounds.js: short cache, never throws,
// and invalidateSiteContent() lets the admin push changes live immediately.
// ═══════════════════════════════════════════════════════════════════════════

import { getSupabase } from './supabase-lazy.js';

export const DEFAULT_SITE_CONTENT = {
  // Android App banner
  app_banner_title: 'Discover More with the Weverse Online Shop App',
  app_banner_description: 'Shop products, discover new arrivals, manage your orders, save favorites, and enjoy a smooth shopping experience wherever you go.',
  app_banner_button_text: 'Get it on Google Play',
  app_banner_secondary_text: 'Browse the Shop',

  // Bottom / end-of-page closing section
  bottom_heading: 'Thank You for Shopping With Us',
  bottom_main_message: 'Every visit, every order, and every moment you spend with us means more than simply shopping. You are part of our journey toward creating a better global shopping experience.',
  bottom_closing_message: 'We look forward to serving you again. ❤️',
  bottom_support_heading: 'Customer Support',
  bottom_support_description: 'Our support team is here for you 24/7 — before and after every order.',
  bottom_support_button_text: 'Contact Support',
  bottom_footer_text: 'GLOBAL SHOPPING · WORLDWIDE DELIVERY',
  bottom_footer_closing: 'Made with ❤️ for shoppers everywhere',
  bottom_copyright: '',

  // Home page promo banner (rotating hero cards)
  promo_banner_enabled: true,
  promo_banner_image: '',
  promo_banner_video: '',
  promo_banner_title: 'Delivering Worldwide',
  promo_banner_subtitle: 'Weverse Online Shop — global delivery to 200+ countries',
  promo_banner_button_text: 'Shop Now',
  promo_banner_button_link: '/#showroom-directory',

  // Hero Video Banner — an ordered list of the owner's own promotional
  // slides. Each slide holds its own video, poster, title, subtitle and
  // button. When empty, the single promo_banner_* fallback is used; when that
  // is also empty, the built-in brand gradient banner is shown.
  hero_video_slides: [],

  // Home page video advertisement card (below the promo banner)
  video_ad_enabled: false,
  video_ad_video_url: '',
  video_ad_poster_url: '',
  video_ad_title: 'Weverse Online Shop',
  video_ad_subtitle: 'Watch our latest showcase',
  video_ad_button_text: 'Shop Now',
  video_ad_button_link: '/#showroom-directory',
};

const CONTENT_FIELDS = Object.keys(DEFAULT_SITE_CONTENT).join(',');
const CACHE_KEY = 'kco_site_content_v1';
const TTL = 60 * 1000;

// Read the saved site content, cached briefly. Never throws — falls back to
// the built-in defaults so the sections always have polished text.
export async function loadSiteContent() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    if (cached.ts && Date.now() - cached.ts < TTL && cached.data && typeof cached.data === 'object') {
      return { ...DEFAULT_SITE_CONTENT, ...cached.data };
    }
  } catch { /* ignore cache */ }

  const merged = { ...DEFAULT_SITE_CONTENT };
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from('site_settings')
      .select(CONTENT_FIELDS)
      .limit(1)
      .maybeSingle();
    if (!error && data) {
      for (const key of Object.keys(DEFAULT_SITE_CONTENT)) {
        const v = data[key];
        if (typeof v === 'string' && v) merged[key] = v;
        else if (typeof v === 'boolean') merged[key] = v;
        else if (Array.isArray(v)) merged[key] = v;
      }
    }
  } catch { /* fall back to defaults */ }

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: merged }));
  } catch { /* ignore */ }
  return merged;
}

// After the admin saves content: clear the visitor cache and tell every open
// section on the page to re-render with the new wording.
export function invalidateSiteContent() {
  try { localStorage.removeItem(CACHE_KEY); } catch { /* ignore */ }
  window.dispatchEvent(new CustomEvent('site-content-updated'));
}