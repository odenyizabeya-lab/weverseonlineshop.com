// brand.js — Auto-applies brand settings (name, logo, slogan, badge)
// to every page without touching HTML. Loads from Supabase, caches locally.

import { getSupabase } from './supabase-lazy.js';

// Single source of truth for the verified badge — change here to update everywhere
export const DEFAULT_BADGE = '/verified-badge.svg';
export const DEFAULT_BRAND_NAME = 'Weverse Online Shop';
export const DEFAULT_BRAND_SLOGAN = 'GLOBAL SHOPPING • WORLDWIDE DELIVERY';
export const DEFAULT_BRAND_LOGO = '/w-logo.svg';

// Centralized inline verified badge — identical design to the homepage badge.
// #3b82f6 blue circle + white check. Injected beside every brand-name element.
const BADGE_SVG = (cls = 'weverse-badge w-4 h-4 sm:w-[18px] sm:h-[18px] lg:w-5 lg:h-5 shrink-0') =>
  `<svg viewBox="0 0 24 24" class="${cls}" aria-label="Verified" role="img" data-weverse-badge="true"><circle cx="12" cy="12" r="11" fill="#3b82f6"/><path d="M10.8 15.6 7.4 12.2l1.5-1.5 1.9 1.9 3.9-3.9 1.5 1.5-5.4 5.4z" fill="#fff"/></svg>`;

// Centralized W logo — identical to the homepage logo box.
export const W_LOGO_SVG = (cls = 'w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8') =>
  `  <svg viewBox="0 0 24 24" class="${cls}" fill="none" aria-hidden="true"><path d="M3 5l4.5 14L12 8l4.5 11L21 5" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// Centralized one-line tagline markup — single neutral, letter-spaced line.
export function taglineHtml() {
  return `<span class="flex items-baseline whitespace-nowrap gap-x-[0.2em] mt-1.5 text-[9px] sm:text-[11px] font-bold tracking-[0.04em] sm:tracking-[0.08em] uppercase leading-snug antialiased text-gray-500"><span class="brand-tagline-1">GLOBAL SHOPPING</span><span class="text-gray-400" aria-hidden="true">•</span><span class="brand-tagline-2">WORLDWIDE DELIVERY</span></span>`;
}

const CACHE_KEY = 'weverse_brand_v1';

// ── Brand-name + tagline auto-contrast ─────────────────────
// Sharp deep black on light surfaces, clean white on dark/hero surfaces —
// the professional, trusted marketplace look (no blue rainbow gradients on
// the wordmark). The single verified-blue accent lives only in the badge.
const BRAND_INK = '#0a0a0a';      // sharp deep black
const BRAND_LIGHT = '#ffffff';    // clean white (on dark surfaces)

// Neutral base so the old blue-gradient styling is fully removed and the
// brand name always has a solid, readable color even before JS contrast runs.
(function injectBrandBase() {
  if (document.getElementById('wv-brand-base')) return;
  const s = document.createElement('style');
  s.id = 'wv-brand-base';
  s.textContent =
    '.brand-name{background:none!important;background-image:none!important;' +
    '-webkit-background-clip:initial!important;background-clip:initial!important;' +
    '-webkit-text-fill-color:#0a0a0a!important;color:#0a0a0a!important}';
  (document.head || document.documentElement).appendChild(s);
})();

function parseRgb(str) {
  const m = (str || '').toString().match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(',').map(x => parseFloat(x));
  if (parts.length < 3) return null;
  return { r: parts[0], g: parts[1], b: parts[2] };
}
function parseColorAlpha(str) {
  const m = (str || '').toString().match(/rgba?\(([^)]+)\)/);
  if (!m) return 0;
  const parts = m[1].split(',').map(x => parseFloat(x));
  return parts.length >= 4 ? parts[3] : 1;
}

// Effective background luminance (0=black … 1=white) behind an element.
function bgLuminance(el) {
  const cs = [];
  let cur = el;
  while (cur) {
    let style;
    try { style = getComputedStyle(cur); } catch { break; }
    cs.push(style);
    if (parseColorAlpha(style.backgroundColor) > 0.03) break;
    cur = cur.parentElement;
  }
  const bg = cs.length ? cs[cs.length - 1].backgroundColor : '';
  const rgb = parseRgb(bg);
  if (rgb) return (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
  return 1; // gradient/unknown → default to light (white page)
}

// Picks the most readable brand color for each background: white on dark,
// sharp deep black on light. Applied to the brand name and the tagline.
function applyAutoContrast() {
  document.querySelectorAll('.brand-name, .brand-tagline-1, .brand-tagline-2').forEach(el => {
    const ink = bgLuminance(el) < 0.5 ? BRAND_LIGHT : BRAND_INK;
    el.style.setProperty('color', ink, 'important');
    el.style.setProperty('-webkit-text-fill-color', ink, 'important');
    el.style.background = 'none';
    el.style.webkitBackgroundClip = 'initial';
    el.style.backgroundClip = 'initial';
  });
}
const OVERRIDE_KEY = 'weverse_brand_override_v1';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// ── Load brand from DB (with localStorage cache) ──────────
async function loadBrand() {
  try {
    const override = JSON.parse(localStorage.getItem(OVERRIDE_KEY) || 'null');
    if (override && typeof override === 'object') {
      return override;
    }
  } catch {}
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    if (cached.ts && Date.now() - cached.ts < CACHE_TTL && cached.data) {
      return cached.data;
    }
  } catch {}
  try {
    const supabase = await getSupabase();
    const { data } = await supabase.from('site_settings').select(
      'brand_name,brand_slogan,brand_logo,brand_badge,brand_favicon,' +
      'brand_mobile_logo,brand_header_logo,brand_footer_logo,' +
      'brand_primary_color,brand_secondary_color,brand_tagline_color1,brand_tagline_color2,' +
      'brand_font,brand_custom_font,' +
      'brand_website_url,brand_email,site_name,site_tagline,' +
      'homepage_banner_image,homepage_banner_alt'
    ).limit(1).maybeSingle();
    const brand = data || {};
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: brand }));
    return brand;
  } catch {
    return {};
  }
}

// ── Apply brand to the current page ───────────────────────
function applyBrand(b) {
  if (!b) return;

  const name    = b.brand_name    || b.site_name    || DEFAULT_BRAND_NAME;
  const slogan  = b.brand_slogan  || b.site_tagline || DEFAULT_BRAND_SLOGAN;
  const logo    = b.brand_logo    || b.brand_header_logo || DEFAULT_BRAND_LOGO;
  const badge   = b.brand_badge   || DEFAULT_BADGE;   // always show badge — custom or default
  const favicon = b.brand_favicon || '';
  const font    = b.brand_custom_font || b.brand_font || '';
  const primary = b.brand_primary_color || '';
  const secondary = b.brand_secondary_color || '';
  const tagline1 = b.brand_tagline_color1 || '';
  const tagline2 = b.brand_tagline_color2 || '';

  injectHomepageBanner(b.homepage_banner_image || '', b.homepage_banner_alt || 'Homepage header banner');

  // ── 0. Tagline colors (split two-color tagline) ──────────
  if (tagline1 || tagline2) {
    document.querySelectorAll('.brand-tagline-1').forEach(el => { if (tagline1) el.style.color = tagline1; });
    document.querySelectorAll('.brand-tagline-2').forEach(el => { if (tagline2) el.style.color = tagline2; });
  }

  // ── 1. Page title (prepend brand name) ──────────────────
  if (name && document.title && !document.title.startsWith(name)) {
    document.title = document.title.replace(/^[^|]+\|/, name + ' |').replace(/^[^–]+–/, name + ' – ');
  }

  // ── 2. Favicon ───────────────────────────────────────────
  if (favicon) {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
    link.href = favicon;
  }

  // ── 3. CSS Variables (colors + font) ────────────────────
  if (primary || secondary || font) {
    const fontName = font ? `'${font}'` : null;
    const style = document.getElementById('brand-css-vars') || (() => {
      const s = document.createElement('style'); s.id = 'brand-css-vars'; document.head.appendChild(s); return s;
    })();
    style.textContent = `:root {
      ${primary   ? `--brand-primary: ${primary};` : ''}
      ${secondary ? `--brand-secondary: ${secondary};` : ''}
      ${fontName  ? `--brand-font: ${fontName}, system-ui, sans-serif;` : ''}
    }`;
    if (font) {
      const gfId = 'brand-gf-link';
      if (!document.getElementById(gfId)) {
        const l = document.createElement('link');
        l.id = gfId; l.rel = 'stylesheet';
        l.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@400;600;700;900&display=swap`;
        document.head.appendChild(l);
      }
    }
  }

  // ── 4. Explicit data-brand attributes ────────────────────
  document.querySelectorAll('[data-brand]').forEach(el => {
    const role = el.dataset.brand;
    if (role === 'name') {
      el.textContent = name;
      // Ensure the centralized verified badge sits immediately beside the name
      if (!el.querySelector('[data-weverse-badge]') && !el.parentElement?.querySelector('[data-weverse-badge]')) {
        el.appendChild(Object.assign(document.createElement('span'), { className: 'inline-flex items-center ml-1 align-middle' , innerHTML: BADGE_SVG('weverse-badge w-4 h-4 sm:w-[18px] sm:h-[18px] lg:w-5 lg:h-5 shrink-0') }));
      }
    }
    if (role === 'slogan')  { el.textContent = slogan; }
    if (role === 'logo')    { if (logo) { el.src = logo; el.alt = name; el.style.display = ''; } else { el.style.display = 'none'; } }
    if (role === 'badge')   { if (badge) { el.src = badge; el.alt = 'Verified'; el.style.display = ''; } else if (el.tagName === 'IMG') { el.style.display = 'none'; } }
    if (role === 'tagline') { el.textContent = slogan; }
    if (role === 'footer-logo') { if (b.brand_footer_logo) { el.src = b.brand_footer_logo; el.alt = name; } else if (logo) { el.src = logo; el.alt = name; } }
    if (role === 'mobile-logo') { if (b.brand_mobile_logo) { el.src = b.brand_mobile_logo; el.alt = name; } else if (logo) { el.src = logo; el.alt = name; } }
  });

  if (logo) {
    document.querySelectorAll('img[data-brand="logo"]').forEach(img => {
      const wrapper = img.closest('.text-center');
      const title = wrapper?.querySelector('h1[data-brand="name"]');
      if (title) title.style.display = 'none';
    });
  }

  // ── 5. Smart header injection (works on ALL pages) ───────
  injectHeaderBrand(name, slogan, logo, badge, primary);

  // ── 6. Footer brand ──────────────────────────────────────
  injectFooterBrand(name, slogan, logo);

  syncHomepageLayout();

  // ── 7. Brand-name + tagline auto-contrast (last, so it wins) ──
  applyAutoContrast();
}

function injectHomepageBanner(imageUrl, altText) {
  const bannerShell = document.getElementById('homepage-banner-shell');
  const bannerImage = document.getElementById('homepage-banner-image');
  if (!bannerShell || !bannerImage) return;

  if (!imageUrl) {
    bannerImage.removeAttribute('src');
    bannerImage.alt = altText || 'Homepage header banner';
    bannerShell.classList.add('hidden');
    return;
  }

  bannerImage.alt = altText || 'Homepage header banner';
  bannerImage.onload = () => syncHomepageLayout();
  bannerImage.onerror = () => {
    bannerShell.classList.add('hidden');
    syncHomepageLayout();
  };
  if (bannerImage.src !== imageUrl) bannerImage.src = imageUrl;
  bannerShell.classList.remove('hidden');
}

function syncHomepageLayout() {
  const header = document.getElementById('site-header');
  const categories = document.getElementById('site-categories-nav');
  const main = document.querySelector('main');
  if (!header || !categories || !main) return;

  const headerHeight = Math.ceil(header.getBoundingClientRect().height || header.offsetHeight || 0);
  const categoriesHeight = Math.ceil(categories.getBoundingClientRect().height || categories.offsetHeight || 0);
  categories.style.top = `${headerHeight}px`;
  const gap = window.innerWidth < 640 ? 20 : 12;
  main.style.paddingTop = `${headerHeight + categoriesHeight + gap}px`;
}

function injectHeaderBrand(name, slogan, logo, badge, primary) {
  // Find the brand name spans in headers (existing markup)
  // Try common patterns: the hardcoded text nodes or spans holding the brand name
  const headerLinks = document.querySelectorAll('header a[href="/"], header a[href="./"], header a[href="index.html"], .brand-link, #brand-link');
  headerLinks.forEach(link => {
    // Update any text node that has the old brand name
    updateTextNodes(link, name, slogan);
    // If link has a brand logo img, update it
    link.querySelectorAll('img.brand-logo, img[data-brand="logo"]').forEach(img => {
      if (logo) { img.src = logo; img.alt = name; }
    });
  });

  // Update specific span patterns we know exist in our HTML
  // Brand name span (large text in header)
  document.querySelectorAll('header span').forEach(span => {
    if (span.classList.contains('brand-tagline-1') || span.classList.contains('brand-tagline-2')) return;
    const t = span.textContent.trim();
    if (t === 'Weverse Online Shop' || t === 'KCO Global Online Marketplace' || span.classList.contains('brand-name')) {
      span.textContent = name;
    }
    if (t === 'Your Trusted Global Shop' || t.includes('Globally') || t.includes('Worldwide') || span.classList.contains('brand-slogan')) {
      span.textContent = slogan;
    }
  });

  // Handle the verified badge area — add real badge image if set
  if (badge) {
    document.querySelectorAll('[data-brand="badge"], .brand-badge, #brand-badge').forEach(el => {
      if (el.tagName === 'IMG') { el.src = badge; el.alt = 'Verified'; el.style.display = ''; }
    });
    // NOTE: the blue verified badge is intentionally ONLY added next to the
    // brand name ([data-brand="name"]) above. It is NOT injected into every
    // span that merely contains the word "Verified" — that previously created
    // stray, mispositioned blue checks after product titles that sometimes
    // disappeared. Green "Verified" pills and other trust badges stay untouched.
  }

  // Replace the blue gradient icon block with logo image if logo is set
  if (logo) {
    document.querySelectorAll('header a[href="/"] .relative.shrink-0, header a .relative.w-7').forEach(iconWrap => {
      if (!iconWrap.querySelector('img.injected-logo')) {
        const img = document.createElement('img');
        img.src = logo; img.alt = name;
        img.className = 'injected-logo w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-lg';
        img.onerror = () => img.style.display = 'none';
        iconWrap.style.display = 'flex';
        iconWrap.style.alignItems = 'center';
        iconWrap.innerHTML = '';
        iconWrap.appendChild(img);
      }
    });
  }
}

function injectFooterBrand(name, slogan, logo) {
  document.querySelectorAll('footer').forEach(footer => {
    // Replace brand name text nodes in footer
    updateTextNodes(footer, name, slogan);
    // Update footer logo images
    footer.querySelectorAll('img.brand-logo, img[data-brand], .footer-logo img').forEach(img => {
      if (logo) { img.src = logo; img.alt = name; }
    });
  });
}

function updateTextNodes(root, name, slogan) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodesToUpdate = [];
  let node;
  while ((node = walker.nextNode())) {
    const t = node.textContent.trim();
    if (t === 'Weverse Online Shop' || t === 'KCO Global Online Marketplace') nodesToUpdate.push({ node, value: name });
    if (t === 'Your Trusted Global Shop' || t === 'Global Shopping • Worldwide Delivery') nodesToUpdate.push({ node, value: slogan });
  }
  nodesToUpdate.forEach(({ node: n, value: v }) => { n.textContent = n.textContent.replace(n.textContent.trim(), v); });
}

// ── Public API: force reload from DB (called by admin after save) ──
export function clearBrandCache() {
  localStorage.removeItem(CACHE_KEY);
}

export function clearBrandOverride() {
  localStorage.removeItem(OVERRIDE_KEY);
  window.dispatchEvent(new StorageEvent('storage', { key: OVERRIDE_KEY }));
}

export function refreshBrand() {
  localStorage.removeItem(CACHE_KEY);
  return loadBrand().then(applyBrand);
}

// ── Auto-run ────────────────────────────────────────────────
loadBrand().then(applyBrand);

// Re-apply after dynamic content loads (for SPAs)
window.addEventListener('load', () => loadBrand().then(applyBrand));
window.addEventListener('resize', () => { syncHomepageLayout(); applyAutoContrast(); });
window.addEventListener('storage', (event) => {
  if (event.key === CACHE_KEY) loadBrand().then(applyBrand);
});

// Re-run contrast for brand/tagline elements rendered asynchronously.
let contrastTries = 0;
function retryContrast() {
  applyAutoContrast();
  if (++contrastTries < 12) setTimeout(retryContrast, 600);
}
retryContrast();
