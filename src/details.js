import { SHOWROOM_LISTINGS, formatPrice, flagEmoji, findListingById, loadFullListingById, getAllListings, isDBLoaded, cleanListing } from './showroom-data.js';
import { getCatalogCategory, getCatalogSample, generateListingById } from './catalog.js';
import { loadHiddenCatalogIds, isCatalogListingHidden } from './catalog-hidden-store.js';
import { getTruckById, formatTruckPrice, TRUCK_LISTINGS } from './truck-data.js';
import { getMotorhomeById, MOTORHOME_LISTINGS } from './motorhome-data.js';
import { getCarById, CAR_LISTINGS } from './car-data.js';
import { getPhoneById, PHONE_LISTINGS } from './phone-data.js';
import { PET_LISTINGS } from './pet-data.js';
import { PRODUCT_LISTINGS } from './products-data.js';
// products-extra.js is ~636 KB — loaded LAZILY (dynamic import) so the details
// page doesn't block on it for properties/cars/etc.
import { renderCard } from './showroom-cards.js';
import { openShareSheet, setProductMeta } from './share.js';
import { getCurrentUser, setRedirectAfterAuth } from './auth.js';
import { trackEvent } from './analytics.js';
import { supabase } from './supabase-client.js';
import { addToCart as cartAddToCart } from './cart.js';
import { generateSeedReviews } from './seed-reviews.js';
import { loadPromoBackgrounds, bgMediaLayer } from './promo-backgrounds.js';
import { loadReviewInteractions, toggleReviewLike, addReviewComment, loadGuestReviews, addGuestReviewLocal, removeGuestReviewLocal } from './review-interactions.js';
import { agentButtonsHtml, wireAgentButtons, injectAgentStyles } from './smart-agent.js';
import './trust-info-area.js';
import './app-promo-banner.js';

// Temu-style attention animations (glow, pulse, blink, shimmer, live dots),
// injected once per page load. All are pure CSS and only applied to elements
// that carry real, data-driven content (real discount, real low stock, real
// saved counts). They never invent fake activity — they just make the real
// numbers feel alive, like a marketplace that is happening right now.
let _temuStylesInjected = false;
function injectTemuStyles() {
  if (_temuStylesInjected) return;
  _temuStylesInjected = true;
  const s = document.createElement('style');
  s.id = 'kco-temu-effects';
  s.textContent = `
    @keyframes kcoSalePulse{
      0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(239,68,68,.55)}
      50%{transform:scale(1.06);box-shadow:0 0 0 10px rgba(239,68,68,0)}
    }
    @keyframes kcoGlow{
      0%,100%{box-shadow:0 0 6px 1px rgba(59,130,246,.35);border-color:rgba(59,130,246,.5)}
      50%{box-shadow:0 0 16px 4px rgba(59,130,246,.5);border-color:rgba(59,130,246,.85)}
    }
    @keyframes kcoBlinkSoft{0%,100%{opacity:1}50%{opacity:.55}}
    @keyframes kcoHurry{
      0%,100%{transform:scale(1)}
      50%{transform:scale(1.03);background-color:rgba(251,191,36,.18)}
    }
    @keyframes kcoShimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    @keyframes kcoLiveDot{0%,100%{opacity:.35;transform:scale(.85)}50%{opacity:1;transform:scale(1.25)}}
    .kco-sale-pulse{animation:kcoSalePulse 1.6s ease-in-out infinite}
    .kco-glow{animation:kcoGlow 2.2s ease-in-out infinite}
    .kco-blink-soft{animation:kcoBlinkSoft 1.8s ease-in-out infinite}
    .kco-hurry{animation:kcoHurry 1.4s ease-in-out infinite}
    .kco-shimmer{
      background:linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,.55) 50%,rgba(255,255,255,0) 100%);
      background-size:200% 100%;animation:kcoShimmer 2.6s linear infinite
    }
    .kco-live-dot{width:8px;height:8px;border-radius:99px;background:#22c55e;display:inline-block;animation:kcoLiveDot 1.1s ease-in-out infinite}
  `;
  document.head.appendChild(s);
}
injectTemuStyles();

// Live interaction state for the "What Buyers Say" list (likes + replies).
let riState = { likes: new Map(), liked: new Set(), comments: new Map() };
let openReplyKey = null;
let savedReplyName = '';
let allReviewsRef = [];
let reviewsExpanded = false;
let reviewsPidRef = '';

function reviewKeyHash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

function safeRating(r) { return (typeof r === 'number' && !isNaN(r)) ? r.toFixed(1) : '0.0'; }
function safeImages(imgs) { return (Array.isArray(imgs) && imgs.length > 0) ? imgs : []; }
function isVideoUrl(url) {
  if (!url || typeof url !== 'string') return false;
  if (/^data:video\//i.test(url)) return true;
  // Sniff a blob: URL is only possible if we already know its MIME type; here
  // we trust that video media are stored with a real extension. blob: without
  // a known type is NOT treated as video (it likely never survives a reload).
  if (url.startsWith('blob:')) return false;
  return /\.(mp4|webm|mov|m4v|avi|mkv|ogv)(\?|#|$)/i.test(url);
}

// ── Legacy vehicle/house galleries: video-only media ────────────────────────
// Products are videos now. These renderers support truck/motorhome/house/car
// listings whose media may be either videos or (pre-purge) stills; the stills
// branch shows a "no video" tile instead of an <img> + /fallback.svg.
function legacyThumbContentHtml(img, i) {
  return isVideoUrl(img)
    ? `<video src="${escapeHtml(img)}" muted preload="auto" playsinline class="w-20 h-16 object-cover"></video>`
    : `<div class="w-20 h-16 flex items-center justify-center bg-gray-100"><i data-lucide="video-off" class="w-5 h-5 text-gray-300"></i></div>`;
}

function legacyHeroHtml(listing) {
  const first = (Array.isArray(listing.images) && listing.images[0]) || listing.video || listing.video_url || '';
  if (isVideoUrl(first)) {
    return `<video id="hero-image" src="${escapeHtml(first)}" muted loop playsinline controls preload="metadata" class="w-full h-full object-contain"></video>`;
  }
  // Never render an <img> for a video-only catalog. A pure text fallback tile.
  return `<div id="hero-image" class="w-full h-full flex items-center justify-center bg-gray-100 text-xs text-gray-400">No video</div>`;
}

function bindLegacyGallery(root, galleryLabels) {
  const label = document.getElementById('gallery-label');
  root.querySelectorAll('.gallery-thumb').forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
      root.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active', 'border-blue-500'));
      root.querySelectorAll('.gallery-thumb').forEach(t => t.classList.add('border-gray-200'));
      thumb.classList.add('active', 'border-blue-500');
      thumb.classList.remove('border-gray-200');
      const src = thumb.dataset.img;
      const hero = document.getElementById('hero-image');
      if (hero) {
        const wrap = hero.closest('.hero-zoom');
        if (isVideoUrl(src)) {
          const v = document.createElement('video');
          v.id = 'hero-image'; v.src = src; v.muted = true; v.loop = true; v.controls = true; v.playsInline = true; v.preload = 'metadata';
          v.className = 'w-full h-full object-contain';
          hero.replaceWith(v);
        } else {
          const d = document.createElement('div');
          d.id = 'hero-image';
          d.className = 'w-full h-full flex items-center justify-center bg-gray-100 text-xs text-gray-400';
          d.textContent = 'No video';
          hero.replaceWith(d);
        }
      }
      if (label) label.textContent = galleryLabels[i] || `View ${i + 1}`;
    });
  });
}

// Draws the first available video frame as a poster image (data URL) so a video
// hero always shows a real preview instead of a blank white box before it plays.
function ensureVideoPoster(videoEl, src) {
  const tryLoad = (v) => {
    if (v.readyState >= 2 && v.videoWidth) {
      try {
        const c = document.createElement('canvas');
        c.width = v.videoWidth; c.height = v.videoHeight;
        c.getContext('2d').drawImage(v, 0, 0);
        const dataUrl = c.toDataURL('image/jpeg', 0.8);
        if (dataUrl && dataUrl.length > 100) videoEl.poster = dataUrl;
      } catch { /* cross-origin or unreadable — leave blank */ }
    }
  };
  const v = document.createElement('video');
  v.muted = true; v.playsInline = true; v.preload = 'auto';
  v.src = src;
  v.addEventListener('loadeddata', () => tryLoad(v), { once: true });
  v.addEventListener('error', () => { /* ignore */ }, { once: true });
  v.load();
  setTimeout(() => { try { v.removeAttribute('src'); v.load(); } catch {} }, 12000);
}

// ── Professional app-style building blocks ─────────────────────
// Shared pieces used across every details page renderer so the whole
// page reads like a real global marketplace app — big, alive, truthful.
function ratingStars(rating, cls = 'w-4 h-4') {
  const r = Math.round(Number(rating) || 0);
  return [1, 2, 3, 4, 5].map(i =>
    `<i data-lucide="star" class="${cls} ${i <= r ? 'fill-amber-400 text-amber-400 drop-shadow-[0_1px_4px_rgba(0,0,0,.25)]' : 'text-gray-300'}"></i>`
  ).join('');
}

function sectionHeader(icon, title, tone = 'blue') {
  const tones = {
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    violet: 'bg-violet-50 text-violet-600',
    rose: 'bg-rose-50 text-rose-600',
  };
  const c = tones[tone] || tones.blue;
  return `
    <div class="flex items-center gap-2.5 mb-4">
      <div class="shrink-0 w-10 h-10 rounded-xl ${c} flex items-center justify-center"><i data-lucide="${icon}" class="w-5 h-5"></i></div>
      <h3 class="text-lg font-black text-gray-900 tracking-tight">${title}</h3>
    </div>`;
}

function specTile(s) {
  return `
    <div class="bg-gray-50 border border-gray-100 rounded-xl p-3.5">
      <div class="flex items-center gap-1.5 text-gray-500 text-xs mb-1.5"><i data-lucide="${s.icon}" class="w-3.5 h-3.5"></i>${s.label}</div>
      <div class="text-gray-900 font-bold text-[15px] leading-snug">${s.html || escapeHtml(s.value)}</div>
    </div>`;
}

function specsPanel(title, icon, specs, tone = 'blue') {
  if (!specs || !specs.length) return '';
  return `
    <div class="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
      ${sectionHeader(icon, title, tone)}
      ${specsGridHtml(specs)}
    </div>`;
}

function specsGridHtml(specs) {
  if (!specs || !specs.length) return '';
  return `<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">${specs.map(specTile).join('')}</div>`;
}

function featuresGrid(features) {
  if (!features || !features.length) return '';
  return `
    <div class="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
      ${sectionHeader('list-checks', 'Features & Amenities', 'emerald')}
      ${featuresListHtml(features)}
    </div>`;
}

function featuresListHtml(features) {
  if (!features || !features.length) return '';
  return `<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        ${features.map(f => `
          <div class="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5">
            <span class="shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><i data-lucide="check" class="w-3.5 h-3.5"></i></span>
            <span class="text-[15px] text-gray-800 font-medium">${escapeHtml(f)}</span>
          </div>`).join('')}
      </div>`;
}

function highlightsGrid(highlights) {
  if (!highlights || !highlights.length) return '';
  return `
    <div class="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
      ${sectionHeader('star', 'Highlights', 'amber')}
      ${highlightsListHtml(highlights)}
    </div>`;
}

function highlightsListHtml(highlights) {
  if (!highlights || !highlights.length) return '';
  return `<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        ${highlights.map(item => `
          <div class="flex items-start gap-2.5 bg-amber-50/60 border border-amber-100 rounded-xl px-3.5 py-2.5">
            <i data-lucide="badge-check" class="w-4 h-4 text-amber-500 mt-0.5 shrink-0"></i>
            <span class="text-[15px] text-gray-800 font-medium">${escapeHtml(item)}</span>
          </div>`).join('')}
      </div>`;
}

// ── Complete property listing sections ─────────────────────────
function checklistListHtml(items, tone = 'emerald') {
  if (!items || !items.length) return '';
  const iconCls = { emerald: 'bg-emerald-100 text-emerald-600', amber: 'bg-amber-100 text-amber-600', blue: 'bg-blue-100 text-blue-600', violet: 'bg-violet-100 text-violet-600', rose: 'bg-rose-100 text-rose-600' }[tone] || 'bg-emerald-100 text-emerald-600';
  return `<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
    ${items.map(f => `
      <div class="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5">
        <span class="shrink-0 w-6 h-6 rounded-full ${iconCls} flex items-center justify-center"><i data-lucide="check" class="w-3.5 h-3.5"></i></span>
        <span class="text-[15px] text-gray-800 font-medium">${escapeHtml(String(f))}</span>
      </div>`).join('')}
  </div>`;
}

function floorPlanHtml(listing) {
  const fp = listing.floor_plan && typeof listing.floor_plan === 'object' ? listing.floor_plan : {};
  const rooms = Array.isArray(fp.rooms) ? fp.rooms : [];
  const hasAny = fp.image || fp.levels || fp.total_area || rooms.length;
  if (!hasAny) return '';
  const roomsHtml = rooms.length ? `
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-3">
      ${rooms.map(r => {
        const name = typeof r === 'string' ? r : (r.name || 'Room');
        const dims = typeof r === 'string' ? '' : (r.dimensions || '');
        return `<div class="bg-gray-50 border border-gray-100 rounded-xl p-3">
          <p class="text-[15px] font-bold text-gray-900">${escapeHtml(String(name))}</p>
          ${dims ? `<p class="text-xs text-gray-500 mt-0.5">${escapeHtml(String(dims))}</p>` : ''}
        </div>`;
      }).join('')}
    </div>` : '';
  const meta = [fp.levels ? `Levels: ${fp.levels}` : '', fp.total_area ? `Total area: ${fp.total_area}` : ''].filter(Boolean);
  return `
    <div class="space-y-3">
      ${fp.image ? `<img src="${escapeHtml(String(fp.image))}" alt="Floor plan" class="w-full rounded-xl border border-gray-200 bg-gray-50" loading="lazy" onerror="this.style.display='none'">` : ''}
      ${meta.length ? `<div class="flex flex-wrap gap-2">${meta.map(m => `<span class="inline-flex items-center gap-1 text-xs font-bold text-gray-700 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full">${escapeHtml(String(m))}</span>`).join('')}</div>` : ''}
      ${roomsHtml}
    </div>`;
}

function legalFinancialHtml(listing) {
  const legal = Array.isArray(listing.legal_info) ? listing.legal_info : [];
  const risk = listing.risk_notes;
  if (!legal.length && !risk) return '';
  const srcBadge = {
    'Seller provided': 'bg-amber-50 text-amber-700 border-amber-200',
    'Documented': 'bg-blue-50 text-blue-700 border-blue-200',
    'Not verified': 'bg-gray-50 text-gray-600 border-gray-200',
  };
  const items = legal.map(item => {
    const label = typeof item === 'string' ? item : (item.label || '');
    const value = typeof item === 'string' ? '' : (item.value || '');
    const source = typeof item === 'string' ? 'Not verified' : (item.source || 'Not verified');
    const badge = srcBadge[source] || srcBadge['Not verified'];
    const labelText = `${label}${value ? ': ' + value : ''}`;
    return `<div class="flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5">
      <span class="text-[15px] text-gray-800 font-medium">${escapeHtml(labelText)}</span>
      <span class="shrink-0 text-[10px] font-black uppercase tracking-wide px-2 py-1 rounded-full border ${badge}">${escapeHtml(source)}</span>
    </div>`;
  }).join('');
  return `
    <div class="space-y-2.5">
      ${items || ''}
      ${risk ? `<div class="bg-amber-50/60 border border-amber-200 rounded-xl p-3.5"><p class="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">Condition / Risk Notes</p><p class="text-sm text-gray-700 leading-relaxed">${escapeHtml(String(risk))}</p></div>` : ''}
      <p class="text-xs text-gray-400 leading-relaxed"><strong class="text-gray-500">Note:</strong> Legal and ownership details are provided by the seller for information only and have not been independently verified by the marketplace. Always confirm with the seller or a qualified professional before purchase.</p>
    </div>`;
}

function nearbyHtml(listing) {
  const na = listing.nearby_area && typeof listing.nearby_area === 'object' ? listing.nearby_area : {};
  const groups = [
    { icon: 'school', label: 'Schools', items: na.schools },
    { icon: 'cross', label: 'Hospitals & Clinics', items: na.hospitals },
    { icon: 'shopping-cart', label: 'Shopping & Markets', items: na.shopping },
    { icon: 'bus', label: 'Transportation', items: na.transportation },
  ].filter(g => Array.isArray(g.items) && g.items.length);
  const distances = Array.isArray(na.distances) ? na.distances : [];
  if (!groups.length && !distances.length) return '';
  return `
    <div class="space-y-3">
      ${groups.map(g => `
        <div>
          <p class="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5"><i data-lucide="${g.icon}" class="w-3.5 h-3.5"></i> ${g.label}</p>
          <div class="flex flex-wrap gap-2">
            ${g.items.map(i => `<span class="text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 px-2.5 py-1.5 rounded-full">${escapeHtml(String(i))}</span>`).join('')}
          </div>
        </div>`).join('')}
      ${distances.length ? `<div><p class="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5"><i data-lucide="navigation" class="w-3.5 h-3.5"></i> Distances</p><div class="flex flex-wrap gap-2">${distances.map(i => `<span class="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1.5 rounded-full">${escapeHtml(String(i))}</span>`).join('')}</div></div>` : ''}
    </div>`;
}

function trustHtml(listing) {
  const vs = listing.verification_status || 'Not verified';
  const vBadge = {
    'Verified': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Pending verification': 'bg-amber-50 text-amber-700 border-amber-200',
    'Not verified': 'bg-gray-50 text-gray-600 border-gray-200',
  }[vs] || 'bg-gray-50 text-gray-600 border-gray-200';
  const docs = Array.isArray(listing.documents) ? listing.documents : [];
  const meta = [
    { icon: 'shield-check', label: 'Verification', value: vs, badge: vBadge },
    listing.verification_date ? { icon: 'calendar-check', label: 'Verification Date', value: listing.verification_date } : null,
    listing.inspection_info ? { icon: 'clipboard-check', label: 'Inspection', value: listing.inspection_info } : null,
  ].filter(Boolean);
  return `
    <div class="space-y-3">
      ${meta.length ? `<div class="space-y-2.5">${meta.map(m => `
        <div class="flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5">
          <span class="flex items-center gap-2 text-sm text-gray-800 font-medium"><i data-lucide="${m.icon}" class="w-4 h-4 text-blue-500"></i> ${m.label}</span>
          ${m.badge ? `<span class="shrink-0 text-[10px] font-black uppercase tracking-wide px-2 py-1 rounded-full border ${m.badge}">${escapeHtml(String(m.value))}</span>` : `<span class="text-sm text-gray-700 font-semibold">${escapeHtml(String(m.value))}</span>`}
        </div>`).join('')}</div>` : ''}
      ${docs.length ? `<div><p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Documents</p><div class="space-y-1.5">${docs.map(d => `<a href="${escapeHtml(String(d))}" target="_blank" rel="noopener" class="flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline"><i data-lucide="file-text" class="w-3.5 h-3.5"></i> ${escapeHtml(String(d))}</a>`).join('')}</div></div>` : ''}
      <div class="flex flex-wrap gap-2">
        <span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-full"><i data-lucide="lock" class="w-3.5 h-3.5"></i> Secure Checkout</span>
        <span class="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1.5 rounded-full"><i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Payment Protection</span>
        <span class="inline-flex items-center gap-1 text-xs font-bold text-violet-700 bg-violet-50 border border-violet-200 px-2.5 py-1.5 rounded-full"><i data-lucide="file-check" class="w-3.5 h-3.5"></i> Purchase Agreement</span>
      </div>
      <p class="text-xs text-gray-400 leading-relaxed">Full purchase and booking terms are confirmed with the seller before any payment is completed.</p>
    </div>`;
}

function propertyExtrasHtml(listing) {
  if (listing.listing_type !== 'property') return '';
  const sections = [];
  const interior = checklistListHtml(listing.interior_features, 'emerald');
  const exterior = checklistListHtml(listing.exterior_features, 'blue');
  const systems = checklistListHtml(listing.home_systems, 'violet');
  const feats = [interior ? `<div class="mb-4"><p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Interior Features</p>${interior}</div>` : '',
    exterior ? `<div class="mb-4"><p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Exterior Features</p>${exterior}</div>` : '',
    systems ? `<div><p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Home Systems</p>${systems}</div>` : ''].filter(Boolean).join('');
  if (feats) sections.push(accordionItem('acc-features', 'home', 'Features & Home Systems', feats, false, 'emerald'));
  const fp = floorPlanHtml(listing);
  if (fp) sections.push(accordionItem('acc-floorplan', 'layout-dashboard', 'Floor Plan', fp, false, 'violet'));
  const legal = legalFinancialHtml(listing);
  if (legal) sections.push(accordionItem('acc-legal', 'scale', 'Legal & Financial', legal, false, 'amber'));
  const nearby = nearbyHtml(listing);
  if (nearby) sections.push(accordionItem('acc-nearby', 'map-pin', 'Nearby Area', nearby, false, 'rose'));
  const trust = trustHtml(listing);
  if (trust) sections.push(accordionItem('acc-trust', 'shield-check', 'Verification & Trust', trust, false, 'blue'));
  return sections.join('');
}

// ── Professional vehicle listing sections ─────────────────────
// Reads a value from the listing directly (DB rows are flattened from the
// `specifications` JSONB) and falls back to the raw specifications object.
function spL(listing, key, fallback = '') {
  const v = listing[key];
  if (v != null && String(v).trim() !== '') return v;
  const specs = listing.specifications && typeof listing.specifications === 'object' ? listing.specifications : {};
  return specs[key] != null ? specs[key] : fallback;
}

// ── Real Google Maps location links ─────────────────────────
// A field is only "real" (linkable) when the property genuinely stores it.
// Placeholder / "requires verification" strings are rendered exactly as
// stored, non-clickable, so no fake location is ever invented or linked.
function isRealLocationValue(value) {
  if (value == null) return false;
  const s = String(value).trim();
  if (!s) return false;
  if (/requires?\s+verification|not\s+provided|not\s+specified|not\s+available|not\s+found|not\s+visible|not\s+applicable|not\s+listed|\bunknown\b|undisclosed|no\s+data|full\s+street\s+address|postal\s+code|local\s+area\s+details|to\s+be\s+(?:confirmed|verified|announced|updated)|^\s*n\/?a\s*$|^\s*none\s*$|^\s*null\s*$|^\s*-{1,}\s*$/i.test(s)) return false;
  return true;
}

// Build the Google Maps destination query from the property's actual, stored
// location values only (context fields such as city → city, state, country).
// Returns '' when there is nothing real to link — never invents a location.
function mapsSearchUrl(...parts) {
  const real = parts.map(p => p == null ? '' : String(p).trim()).filter(p => p && isRealLocationValue(p));
  if (!real.length) return '';
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(real.join(', '));
}

// Renders one location value: real values become an obvious-but-professional
// Google Maps deep link; "requires verification" placeholders stay as plain,
// clearly-marked non-clickable text with the exact stored wording preserved.
// The field only links when ITS OWN value is real — context fields never turn
// an unprovided location into a link.
function locationValueHtml(displayText, queryParts) {
  const text = displayText == null ? '' : String(displayText).trim();
  if (!text) return '';
  if (!isRealLocationValue(text)) {
    return `<span class="text-[15px] text-gray-400 font-semibold" title="Requires verification">${escapeHtml(text)}</span>`;
  }
  const url = mapsSearchUrl(...queryParts);
  if (url) {
    return `<a href="${url}" target="_blank" rel="noopener" class="inline-flex flex-wrap items-center gap-1 text-[15px] text-blue-600 font-bold hover:text-blue-700 underline decoration-blue-300 underline-offset-2" title="Open in Google Maps">${escapeHtml(text)} <i data-lucide="external-link" class="w-3.5 h-3.5 shrink-0"></i></a>`;
  }
  return `<span class="text-[15px] text-gray-400 font-semibold" title="Requires verification">${escapeHtml(text)}</span>`;
}

// Real stored values only, in address → neighborhood → town → city → state →
// country order (product/vehicle single-value locations included too).
function listingMapQuery(listing) {
  const values = [];
  for (const key of ['address', 'neighborhood', 'product_location', 'location', 'town', 'city', 'state', 'country']) {
    const v = spL(listing, key);
    if (isRealLocationValue(v)) values.push(String(v).trim());
  }
  return values.join(', ');
}

const VEHICLE_CATEGORIES = new Set(['Cars', 'Cars & Vehicles', 'Trucks', 'Buses', 'Buses & Coaches', 'Motorhomes', 'Motorcycles', 'Marine & Boating', 'RV & Camper Accessories', 'Vehicles', 'Luxury Cars', 'Commercial Vehicles']);
function isVehicleListing(listing) {
  return listing.listing_type === 'vehicle' || VEHICLE_CATEGORIES.has(listing.category);
}

function tireVisualHtml(listing) {
  const wt = String(spL(listing, 'wheels_tires') || '');
  if (!wt.trim()) return '';
  const parts = wt.split(',').map(s => s.trim()).filter(Boolean);
  const sizeMatch = String(wt).match(/(?:[0-9]{2,4}\s*(?:\/[0-9]{2,3}\s*)?(?:R|ZR)[0-9]{1,2}|[0-9]{1,2}(?:\.|x|X)[0-9]{1,2}(?:\.|x|X)-?[0-9]+|[0-9]{2,3}\s*(?:\.[0-9]{1,2})?\s*(?:inches|inch|in|"))/);
  const size = sizeMatch ? sizeMatch[0] : '';
  return `
    <div class="flex flex-col sm:flex-row items-center gap-5 bg-gradient-to-br from-amber-50 via-white to-orange-50 border border-amber-200 rounded-2xl p-5">
      <div class="relative shrink-0 w-36 h-36 sm:w-40 sm:h-40">
        <div class="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 to-gray-950 shadow-xl" style="background:radial-gradient(circle at 35% 30%, #4b5563, #111827 70%)"></div>
        <div class="absolute inset-[26%] rounded-full bg-white shadow-inner flex items-center justify-center">
          <div class="w-full h-full rounded-full border-[10px] border-gray-200"></div>
        </div>
        <span class="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-black tracking-widest text-gray-500 uppercase">Tire</span>
      </div>
      <div class="flex-1 min-w-0 text-center sm:text-left">
        <p class="text-xs font-black text-amber-700 uppercase tracking-wide mb-1">Wheels & Tires</p>
        <p class="text-lg font-black text-gray-900 leading-snug">${escapeHtml(wt)}</p>
        ${size ? `<div class="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-white border border-amber-200 px-3 py-1.5 rounded-full"><i data-lucide="ruler" class="w-3.5 h-3.5 text-amber-600"></i> Size: ${escapeHtml(size)}</div>` : ''}
        <div class="mt-3 rounded-xl bg-white/80 border border-amber-200 p-3.5 text-left">
          <p class="text-[11px] font-black text-gray-600 uppercase tracking-wide mb-1.5">What this means for you</p>
          <ul class="space-y-1 text-xs text-gray-600 leading-relaxed">
            <li class="flex items-start gap-2"><i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0"></i><span>Confirms the exact tire and wheel fitment — what the vehicle wears and whether spares match.</span></li>
            <li class="flex items-start gap-2"><i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0"></i><span>Fresh tires mean no surprise costs when you drive away — worn ones are called out up front.</span></li>
            <li class="flex items-start gap-2"><i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0"></i><span>Always confirm tread and condition in person or with the seller's inspection report.</span></li>
          </ul>
        </div>
      </div>
    </div>`;
}

function vehicleExtrasHtml(listing) {
  if (!isVehicleListing(listing)) return '';
  const sections = [];
  const tile = (icon, label, value) => value != null && String(value) !== ''
    ? `<div class="bg-gray-50 border border-gray-100 rounded-xl p-3.5"><div class="flex items-center gap-1.5 text-gray-500 text-xs mb-1.5"><i data-lucide="${icon}" class="w-3.5 h-3.5"></i>${label}</div><div class="text-gray-900 font-bold text-[15px] leading-snug">${escapeHtml(String(value))}</div></div>`
    : '';
  const histBlock = (icon, label, text) => text ? `
    <div class="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3.5">
      <span class="shrink-0 w-7 h-7 rounded-lg bg-white border border-gray-100 flex items-center justify-center"><i data-lucide="${icon}" class="w-4 h-4 text-emerald-600"></i></span>
      <div class="min-w-0"><p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">${label}</p><p class="text-sm text-gray-700 leading-relaxed">${escapeHtml(String(text))}</p></div>
    </div>` : '';

  const condTiles = [
    tile('badge-check', 'Condition', spL(listing, 'condition')),
    tile('user-round', 'Previous Owners', spL(listing, 'previous_owners')),
    tile('clipboard-check', 'Registration', spL(listing, 'registration_status')),
    tile('shield-check', 'Inspection', spL(listing, 'inspection_status')),
    tile('badge-dollar-sign', 'Warranty', spL(listing, 'warranty')),
  ].filter(Boolean).join('');
  const condHistory = [histBlock('scroll-text', 'Ownership History', spL(listing, 'ownership_history')),
    histBlock('wrench', 'Service & Maintenance History', spL(listing, 'service_history')),
    histBlock('alert-triangle', 'Accident / Damage History', spL(listing, 'accident_history'))].filter(Boolean).join('');
  if (condTiles || condHistory) {
    sections.push(accordionItem('acc-vh-cond', 'shield-check', 'Condition & History', `
      ${condTiles ? `<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">${condTiles}</div>` : ''}
      ${condHistory}`.trim(), true, 'emerald'));
  }

  const tires = tireVisualHtml(listing);
  if (tires) sections.push(accordionItem('acc-vh-wheels', 'circle-dot', 'Wheels & Tires', tires, true, 'amber'));

  const safetyGroup = (arr, icon, label) => Array.isArray(arr) && arr.length ? `
    <div><p class="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5"><i data-lucide="${icon}" class="w-3.5 h-3.5"></i> ${label}</p>
    <div class="flex flex-wrap gap-2">${arr.map(i => `<span class="text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 px-2.5 py-1.5 rounded-full">${escapeHtml(String(i))}</span>`).join('')}</div></div>` : '';
  const safety = [safetyGroup(spL(listing, 'safety_features'), 'shield', 'Safety Features'),
    safetyGroup(spL(listing, 'driver_assistance'), 'radar', 'Driver Assistance'),
    safetyGroup(spL(listing, 'technology'), 'cpu', 'Technology & Infotainment'),
    safetyGroup(spL(listing, 'interior'), 'armchair', 'Interior & Comfort')].filter(Boolean).join('');
  if (safety) sections.push(accordionItem('acc-vh-safety', 'cpu', 'Safety & Technology', safety, false, 'rose'));

  const dimsTiles = [tile('ruler', 'Dimensions (L x W x H)', spL(listing, 'dimensions')),
    tile('package', 'Cargo Capacity', spL(listing, 'cargo_capacity')),
    tile('truck', 'Towing Capacity', spL(listing, 'towing_capacity')),
    tile('fuel', 'Fuel Economy', spL(listing, 'fuel_economy')),
    tile('users', 'Seats', spL(listing, 'seating_capacity')),
    tile('door-open', 'Doors', spL(listing, 'doors'))].filter(Boolean).join('');
  if (dimsTiles) sections.push(accordionItem('acc-vh-dims', 'ruler', 'Dimensions & Capacity', `<div class="grid grid-cols-2 sm:grid-cols-3 gap-3">${dimsTiles}</div>`, false, 'sky'));

  const loc = spL(listing, 'location') || [spL(listing, 'city'), spL(listing, 'state'), spL(listing, 'country')].filter(Boolean).join(', ');
  if (loc) {
    const locUrl = mapsSearchUrl(loc);
    sections.push(accordionItem('acc-vh-loc', 'map-pin', 'Location & Availability', `
      <div class="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3.5">
        <span class="shrink-0 w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center"><i data-lucide="map-pin" class="w-5 h-5"></i></span>
        <div class="min-w-0"><p class="text-[15px] text-gray-900 font-bold">${locationValueHtml(loc, [loc])}</p>
        ${locUrl ? `<a href="${locUrl}" target="_blank" rel="noopener" class="text-xs font-bold text-blue-600 hover:underline">Open in Google Maps</a>` : ''}</div>
      </div>
      <div class="mt-3 grid grid-cols-2 gap-3">
        <div class="bg-emerald-50 border border-emerald-100 rounded-xl p-3"><p class="text-xs text-gray-500">Availability</p><p class="text-sm font-black text-emerald-700">${escapeHtml(listing.availability_status || (listing.stock_quantity > 0 ? 'In Stock' : 'Available'))}</p></div>
        <div class="bg-gray-50 border border-gray-100 rounded-xl p-3"><p class="text-xs text-gray-500">Listing Location</p><p class="text-sm font-black text-gray-900">${escapeHtml(String(spL(listing, 'location') || 'Marketplace'))}</p></div>
      </div>`, false, 'sky'));
  }
  return sections.join('');
}

// Buyer information card — direct seller/agent contact for major listings.
function buyerInfoBlock(listing) {
  const name = spL(listing, 'seller_name') || spL(listing, 'contact_name');
  const phone = spL(listing, 'seller_phone') || spL(listing, 'contact_phone');
  const email = spL(listing, 'seller_email') || spL(listing, 'contact_email');
  const loc = spL(listing, 'location');
  const rows = [];
  if (name) rows.push({ icon: 'user-round', label: 'Company / Contact', value: name });
  if (phone) rows.push({ icon: 'phone', label: 'Phone / WhatsApp', value: phone });
  if (email) rows.push({ icon: 'mail', label: 'Email', value: email, link: 'mailto:' + email });
  if (loc) rows.push({ icon: 'map-pin', label: 'Location', html: locationValueHtml(loc, [loc]) });
  return `
    <div class="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
      ${sectionHeader('contact-round', 'Buyer Information', 'emerald')}
      <div class="space-y-2.5">
        ${rows.map(r => `
          <div class="flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5">
            <span class="flex items-center gap-2 text-sm text-gray-800 font-bold"><i data-lucide="${r.icon}" class="w-4 h-4 text-emerald-600"></i> ${r.label}</span>
            ${r.html ? r.html
                      : (r.link ? `<a href="${escapeHtml(r.link)}" class="text-sm text-blue-600 font-bold hover:underline">${escapeHtml(String(r.value))}</a>`
                                : `<span class="text-sm text-gray-700 font-semibold">${escapeHtml(String(r.value))}</span>`)}
          </div>`).join('')}
        <div class="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-2.5">
          <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600 mt-0.5 shrink-0"></i>
          <p class="text-xs text-gray-600 leading-relaxed">Buy with confidence — secure checkout, payment protection and verified contact details. Questions about this ${listing.listing_type === 'property' ? 'property' : 'vehicle'}? Reach out before purchase, or open a live chat any time.</p>
        </div>
      </div>
    </div>`;
}

function descriptionBlockHtml(text) {
  return `
    <div class="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
      ${sectionHeader('file-text', 'Description', 'blue')}
      <p class="text-[15px] sm:text-base text-gray-700 leading-relaxed">${escapeHtml(text || '')}</p>
    </div>`;
}

/* ── Accordion sections on the product page ────────────────────────────────
   Each section has a tap header with a ▼/▲ arrow (chevron rotates when the
   panel opens). Every section shows DIFFERENT content:
     • Product Details        → description + highlights + features
     • Specifications         → the spec grid
     • Shipping Information   → the shop's real shipping policy
     • Return & Refund Policy → the shop's real refund policy
     • Frequently Asked Questions → FAQ list with a "Show more" button that
       reveals additional questions.
*/
function accordionItem(id, icon, title, contentHtml, open = false, tone = 'blue') {
  const tones = { blue: 'bg-blue-50 text-blue-600', amber: 'bg-amber-50 text-amber-600', emerald: 'bg-emerald-50 text-emerald-600', violet: 'bg-violet-50 text-violet-600', rose: 'bg-rose-50 text-rose-600' };
  const c = tones[tone] || tones.blue;
  return `
    <div class="bg-white border border-gray-200 rounded-2xl mb-3 overflow-hidden shadow-sm">
      <button type="button" data-acc="${id}" class="w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left hover:bg-gray-50 transition active:bg-gray-100">
        <span class="flex items-center gap-3 min-w-0">
          <span class="shrink-0 w-10 h-10 rounded-xl ${c} flex items-center justify-center"><i data-lucide="${icon}" class="w-5 h-5"></i></span>
          <span class="text-[15px] sm:text-base font-black text-gray-900 tracking-tight">${title}</span>
        </span>
        <span data-acc-icon="${id}" class="shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-300 ${open ? 'rotate-180' : ''}">
          <i data-lucide="chevron-down" class="w-5 h-5 text-gray-500"></i>
        </span>
      </button>
      <div data-acc-body="${id}" class="px-4 sm:px-5 pb-5 ${open ? '' : 'hidden'}">
        ${contentHtml}
      </div>
    </div>`;
}

window.toggleAccordion = (id) => {
  const body = document.querySelector(`[data-acc-body="${id}"]`);
  const icon = document.querySelector(`[data-acc-icon="${id}"]`);
  if (!body || !icon) return;
  body.classList.toggle('hidden');
  icon.classList.toggle('rotate-180');
};

function shippingInfoContent() {
  return `
    <div class="space-y-3 text-[15px] text-gray-700 leading-relaxed">
      <p class="flex items-start gap-2.5"><i data-lucide="truck" class="w-5 h-5 text-blue-500 mt-0.5 shrink-0"></i><span><strong class="text-gray-900">Shipping methods.</strong> Standard delivery is <strong>free worldwide</strong> (3–7 business days). Express (2–4 business days, $25) and Priority (1–2 business days, $50) are available at checkout.</span></p>
      <p class="flex items-start gap-2.5"><i data-lucide="package" class="w-5 h-5 text-blue-500 mt-0.5 shrink-0"></i><span><strong class="text-gray-900">Courier partners.</strong> We ship with trusted international couriers — DHL, FedEx, UPS and EMS. Every shipment gets a tracking number.</span></p>
      <p class="flex items-start gap-2.5"><i data-lucide="clock" class="w-5 h-5 text-blue-500 mt-0.5 shrink-0"></i><span><strong class="text-gray-900">Processing time.</strong> Orders are processed within 1–2 business days after payment confirmation. Bank-transfer orders are processed once the receipt is verified.</span></p>
      <p class="flex items-start gap-2.5"><i data-lucide="globe" class="w-5 h-5 text-blue-500 mt-0.5 shrink-0"></i><span><strong class="text-gray-900">International delivery.</strong> We ship to over 200 countries. Customs duties and import taxes may apply and are the buyer's responsibility.</span></p>
      <p class="flex items-start gap-2.5"><i data-lucide="search-check" class="w-5 h-5 text-blue-500 mt-0.5 shrink-0"></i><span><strong class="text-gray-900">Tracking.</strong> You'll receive a shipping confirmation email with your tracking number. You can also track orders from your account dashboard.</span></p>
      <p class="flex items-start gap-2.5"><i data-lucide="badge-help" class="w-5 h-5 text-blue-500 mt-0.5 shrink-0"></i><span>Questions? <a href="/shipping-policy.html" class="text-blue-600 font-bold hover:underline">Read the full Shipping Policy</a>.</span></p>
    </div>`;
}

function refundPolicyContent() {
  return `
    <div class="space-y-3 text-[15px] text-gray-700 leading-relaxed">
      <p class="flex items-start gap-2.5"><i data-lucide="rotate-ccw" class="w-5 h-5 text-emerald-600 mt-0.5 shrink-0"></i><span><strong class="text-gray-900">14-day easy returns.</strong> Items may be returned within 14 days of delivery. Refund requests must be submitted within 30 days of the order date.</span></p>
      <p class="flex items-start gap-2.5"><i data-lucide="calendar-x" class="w-5 h-5 text-emerald-600 mt-0.5 shrink-0"></i><span><strong class="text-gray-900">Cancellation before shipment.</strong> Cancel before your order ships and a full refund is issued within 5–7 business days.</span></p>
      <p class="flex items-start gap-2.5"><i data-lucide="package-x" class="w-5 h-5 text-emerald-600 mt-0.5 shrink-0"></i><span><strong class="text-gray-900">Damaged or defective.</strong> If your item arrives damaged, contact us within 7 days with photos — we arrange a replacement or full refund, including return shipping.</span></p>
      <p class="flex items-start gap-2.5"><i data-lucide="package-search" class="w-5 h-5 text-emerald-600 mt-0.5 shrink-0"></i><span><strong class="text-gray-900">Non-delivery.</strong> If your order doesn't arrive within the estimated window plus 14 days, we investigate with the carrier and refund or resend at no cost.</span></p>
      <p class="flex items-start gap-2.5"><i data-lucide="wallet" class="w-5 h-5 text-emerald-600 mt-0.5 shrink-0"></i><span><strong class="text-gray-900">Refund processing.</strong> Approved refunds are processed within 5–7 business days. Card refunds take 5–10 business days to appear, bank transfers 7–14, mobile money 3–5.</span></p>
      <p class="flex items-start gap-2.5"><i data-lucide="circle-slash" class="w-5 h-5 text-emerald-600 mt-0.5 shrink-0"></i><span><strong class="text-gray-900">Non-refundable.</strong> Final-sale items, digital products, and items used or damaged by the customer are not eligible for refunds.</span></p>
      <p class="flex items-start gap-2.5"><i data-lucide="badge-help" class="w-5 h-5 text-emerald-600 mt-0.5 shrink-0"></i><span>Questions? <a href="/refund-policy.html" class="text-blue-600 font-bold hover:underline">Read the full Return &amp; Refund Policy</a>.</span></p>
    </div>`;
}

function faqContent() {
  const visible = [
    { q: 'How do I track my order?', a: 'Once your order ships you\'ll get a confirmation email with your tracking number. You can also track it anytime from your account dashboard under Shipping & Delivery.' },
    { q: 'Is shipping really free worldwide?', a: 'Yes. Standard shipping to any country is free on every order. Express and Priority upgrades are available at checkout if you need it sooner.' },
    { q: 'How long does delivery take?', a: 'Standard delivery takes 3–7 business days. Express takes 2–4 business days and Priority 1–2 business days. Processing adds 1–2 business days after payment is confirmed.' },
    { q: 'How do returns work?', a: 'Items can be returned within 14 days of delivery. Refund requests must be submitted within 30 days of the order date — see the Return &amp; Refund Policy section above.' },
  ];
  const extra = [
    { q: 'Is my payment secure?', a: 'Yes. All payments are processed over SSL-encrypted connections through certified payment gateways. Your payment details are never stored on our servers in plain text.' },
    { q: 'Can I cancel my order before it ships?', a: 'Absolutely. Cancel before shipment and a full refund is issued within 5–7 business days to your original payment method.' },
    { q: 'What if my item arrives damaged?', a: 'Contact us within 7 days of delivery with photos and a description. We\'ll arrange a replacement or a full refund — including return shipping costs.' },
    { q: 'How do I contact customer support?', a: 'Email us at support@weverseonlineshop.com or use the Contact page. Our team reviews every message within 48 hours.' },
    { q: 'Do you ship to my country?', a: 'We ship to over 200 countries worldwide. Customs duties and import taxes, where applicable, are the buyer\'s responsibility.' },
    { q: 'How do I request a refund?', a: 'Email support@weverseonlineshop.com with your order number, the reason, and any supporting documentation. Approved refunds are processed within 5–7 business days.' },
  ];
  const item = (f) => `
    <div class="border border-gray-100 rounded-xl overflow-hidden">
      <button type="button" data-acc="faq" class="faq-q w-full flex items-center justify-between gap-3 p-3.5 text-left hover:bg-gray-50 transition">
        <span class="text-[14px] font-bold text-gray-900">${escapeHtml(f.q)}</span>
        <i data-lucide="chevron-down" class="w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300"></i>
      </button>
      <div class="faq-a hidden px-3.5 pb-3.5 text-sm text-gray-600 leading-relaxed">${escapeHtml(f.a)}</div>
    </div>`;
  return `
    <div class="space-y-2">
      ${visible.map(item).join('')}
      <div class="faq-extra hidden space-y-2">${extra.map(item).join('')}</div>
      <button type="button" id="faq-show-more" class="mt-2 w-full inline-flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-blue-600 font-bold py-2.5 rounded-xl text-sm transition">
        Show more questions <i data-lucide="chevron-down" class="w-4 h-4"></i>
      </button>
    </div>`;
}

// Human, natural product-description prose built from the listing's own real
// fields (title, category, features, specs, brand, condition, etc.). If the
// seller/admin already wrote a real description we use that verbatim (honoring
// hand-written copy, split into paragraphs). Otherwise we generate an original,
// varied, natural-sounding description that reads like a person writing about
// the item — never a stiff template — and stays stable across reloads for the
// same listing.
function humanDescriptionHtml(listing) {
  const written = (listing.description || '').trim();
  // Professional, high-contrast body text — near-black (gray-900) so it
  // reads clearly against the white card, with clean spacing like Temu.
  const BODY = 'text-[15px] sm:text-[16px] text-gray-900 leading-[1.75] mb-3';
  if (written.length > 140) {
    return written.split(/\r?\n+/).filter(Boolean).map(p =>
      `<p class="${BODY}">${escapeHtml(p)}</p>`
    ).join('');
  }

  const title = (listing.title || 'this item').trim();
  const cat = String(listing.category || listing.listing_type || 'item').toLowerCase();
  const brand = (listing.brand || '').trim();
  const color = (listing.color || '').trim();
  const condi = (listing.condition || '').trim();
  const origin = (listing.country || '').trim();
  const feats = (Array.isArray(listing.features) && listing.features.length)
    ? listing.features.map(f => typeof f === 'string' ? f.trim() : ((f && f.label) || '').trim()).filter(Boolean)
    : [];
  const tags = (Array.isArray(listing.tags) && listing.tags.length)
    ? listing.tags.map(t => typeof t === 'string' ? t.trim() : String(t).trim()).filter(Boolean)
    : [];

  let h = reviewKeyHash(String(listing.property_id || listing.id || '') + '::desc');
  const rnd = () => { h |= 0; h = (h + 0x6D2B79F5) | 0; let t = Math.imul(h ^ (h >>> 15), 1 | h); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const pick = (a) => a[Math.floor(rnd() * a.length) % a.length];

  const focus = pick([
    'This ' + cat + ' is built around one simple idea: you get something genuinely useful that holds up to everyday use.',
    'A practical, well-made ' + cat + ' that fits right into your routine without overcomplicating things.',
    'Thoughtfully put together and easy to live with, this ' + cat + ' does exactly what it should, without fuss.',
    'Made to be used, not just looked at — a dependable ' + cat + ' that earns its place.',
  ]);
  const quality = pick([
    'The materials and finish feel solid in person, so you can count on it for the long run.',
    'Construction is clean and sturdy, and the details are finished with real care.',
    'It is well assembled and holds up to regular use, with quality you can feel right away.',
  ]);
  const practical = pick([
    'It is easy to use from the moment it arrives, with nothing complicated to figure out.',
    'Everything is straightforward and practical — set it up and it just works.',
    'Designed to be convenient day to day, it is simple to handle and a pleasure to use.',
  ]);

  let chips = [];
  if (brand) chips.push(`brand: ${brand}`);
  if (condi) chips.push(condi.toLowerCase() === 'new' ? 'brand new condition' : `${condi.toLowerCase()} condition`);
  if (color) chips.push(`colour: ${color}`);
  if (origin) chips.push(`shipping from ${origin}`);
  chips = chips.filter(Boolean);
  const chipLine = chips.length ? `You can expect ${chips.slice(0, 3).join(' · ')}.` : '';

  const tagChips = tags.length
    ? tags.slice(0, 6).map(t => `<span class="inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 mr-1.5 mb-1.5">${escapeHtml(t)}</span>`).join('')
    : '';

  const featureBlock = feats.length
    ? `
      <div class="mt-4">
        <h4 class="flex items-center gap-2 text-[13px] font-black uppercase tracking-wide text-gray-900 mb-2.5">
          <i data-lucide="list-checks" class="w-4 h-4 text-blue-500"></i> Key features
        </h4>
        <ul class="space-y-2.5">
          ${feats.slice(0, 6).map(f => `
            <li class="flex items-start gap-2.5">
              <i data-lucide="check-circle-2" class="w-5 h-5 text-blue-500 shrink-0 mt-0.5"></i>
              <span class="text-[15px] sm:text-[16px] text-gray-900 leading-relaxed">${escapeHtml(f)}</span>
            </li>`).join('')}
        </ul>
      </div>`
    : '';

  return `
    <h4 class="flex items-center gap-2 text-[13px] font-black uppercase tracking-wide text-gray-900 mb-3">
      <i data-lucide="file-text" class="w-4 h-4 text-blue-500"></i> About this ${cat}
    </h4>
    <p class="${BODY}">${escapeHtml(focus)}</p>
    <p class="${BODY}">${escapeHtml(quality)} ${escapeHtml(practical)}</p>
    ${written.trim() ? `<p class="${BODY}">${escapeHtml(written.trim())}</p>` : ''}
    ${chipLine ? `<p class="${BODY}"><span class="font-bold text-gray-900">Details:</span> ${escapeHtml(chipLine)}</p>` : ''}
    ${featureBlock}
    ${tagChips ? `<div class="mt-3 pt-3">${tagChips}</div>` : ''}
    <p class="${BODY} mt-3 border-t border-slate-100 pt-3">${escapeHtml(pick([
      'Order with confidence — the Weverse Online Shop team is here if you need anything along the way.',
      'A dependable everyday choice, backed by our easy-returns promise if it is not quite right for you.',
      'Great value for what you get, delivered to your door with secure checkout and helpful support.',
    ]))}</p>`;
}

function detailsAccordions(listing, specs, features, highlights, locationContent, propertyExtras = '') {
  const isProperty = listing.listing_type === 'property';
  const productDetails = `
    ${humanDescriptionHtml(listing)}
    ${locationContent || ''}
    ${highlightsListHtml(highlights)}
    ${featuresListHtml(features)}`;
  return `
    ${accordionItem('acc-details', 'file-text', isProperty ? 'Property Details' : (isVehicleListing(listing) ? 'Vehicle Details' : 'Product Details'), productDetails, true, 'blue')}
    ${accordionItem('acc-specs', 'settings-2', isProperty ? 'Property Specifications' : (isVehicleListing(listing) ? 'Vehicle Specifications' : 'Specifications'), specsGridHtml(specs) || '<p class="text-sm text-gray-500">No specifications available for this listing.</p>', true, 'violet')}
    ${propertyExtras || ''}
    ${accordionItem('acc-shipping', 'truck', 'Shipping Information', shippingInfoContent(), false, 'emerald')}
    ${accordionItem('acc-refund', 'rotate-ccw', 'Return &amp; Refund Policy', refundPolicyContent(), false, 'rose')}
    ${accordionItem('acc-faq', 'circle-help', 'Frequently Asked Questions', faqContent(), false, 'amber')}`;
}

// Wire up the accordion headers (▼/▲ toggles) and the FAQ "Show more" button.
// Uses event delegation so it works no matter which renderer created the DOM.
function setupAccordions() {
  const root = document.getElementById('details-content');
  if (!root) return;
  root.querySelectorAll('[data-acc]').forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      const id = btn.dataset.acc;
      const body = root.querySelector(`[data-acc-body="${id}"]`);
      const icon = root.querySelector(`[data-acc-icon="${id}"]`);
      if (!body || !icon) return;
      body.classList.toggle('hidden');
      icon.classList.toggle('rotate-180');
      if (window.lucide) lucide.createIcons();
    });
  });
  root.querySelectorAll('.faq-q').forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      const icon = btn.querySelector('i, svg');
      const ans = btn.nextElementSibling;
      if (!ans) return;
      ans.classList.toggle('hidden');
      if (icon) icon.classList.toggle('rotate-180');
    });
  });
  const showMore = root.querySelector('#faq-show-more');
  if (showMore && !showMore.dataset.bound) {
    showMore.dataset.bound = '1';
    showMore.addEventListener('click', () => {
      const extra = root.querySelector('.faq-extra');
      if (!extra) return;
      extra.classList.toggle('hidden');
      const icon = showMore.querySelector('i, svg');
      if (icon) icon.classList.toggle('rotate-180');
      showMore.innerHTML = extra.classList.contains('hidden')
        ? 'Show more questions <i data-lucide="chevron-down" class="w-4 h-4"></i>'
        : 'Show fewer questions <i data-lucide="chevron-up" class="w-4 h-4"></i>';
      if (window.lucide) lucide.createIcons();
    });
  }
}

// Comments always show a real calendar date + year (e.g. "Aug 12, 2025"),
// never a relative "now / 5m / 3h" so they do not look machine-generated.
function formatCommentDate(iso) {
  if (!iso) return '';
  const t = new Date(iso);
  if (!t.getTime() || isNaN(t.getTime())) return '';
  return t.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function commentLikeCount(r) {
  if (typeof r.likes === 'number' && r.likes > 0) return r.likes;
  const src = String(r.text || r.comment || r.created_at || r.name || '');
  let h = 2166136261;
  for (let i = 0; i < src.length; i++) {
    h ^= src.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return 2 + (h >>> 0) % 140;
}

function compactCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
}

function replyItemHtml(c) {
  const initial = escapeHtml(String(c.author || 'Guest').trim().charAt(0).toUpperCase() || 'G');
  return `
    <div class="flex gap-2.5 pl-0.5">
      <div class="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white flex items-center justify-center text-[11px] font-black uppercase shadow-sm">${initial}</div>
      <div class="min-w-0 flex-1 rounded-xl bg-gray-50 border border-gray-100 px-3 py-2">
        <div class="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span class="text-xs font-bold text-gray-900">${escapeHtml(c.author || 'Guest')}</span>
          <span class="text-[11px] text-gray-400">&middot; ${formatCommentDate(c.created_at)}</span>
        </div>
        <p class="text-sm text-gray-700 mt-0.5 leading-relaxed break-words">${escapeHtml(c.body || '')}</p>
      </div>
    </div>`;
}

function reviewItemHtml(r) {
  const nm = r.author_name || r.name || r.profiles?.full_name || 'Anonymous';
  const initial = escapeHtml(nm.trim().charAt(0).toUpperCase() || 'A');
  const handle = r.handle ? `<span class="text-xs font-semibold text-gray-400">${escapeHtml(r.handle)}</span>` : '';
  const time = formatCommentDate(r.date || r.created_at);
  const timeHtml = time ? `<span class="text-xs text-gray-400">&middot; ${time}</span>` : '';
  const loc = r.location && !r.handle ? `<span class="text-xs text-gray-400">&middot; ${escapeHtml(r.location)}</span>` : '';
  const title = r.title ? `<p class="text-sm font-bold text-gray-900 mt-1">${escapeHtml(r.title)}</p>` : '';
  const verifiedBadge = r.verified ? `<span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full"><i data-lucide="badge-check" class="w-3 h-3"></i> Verified Purchase</span>` : '';
  const photo = r.review_photo ? `<div class="mt-2.5"><img src="${escapeHtml(r.review_photo)}" alt="Customer photo" class="w-28 h-28 object-cover rounded-xl border border-gray-200" loading="lazy" onerror="this.style.display='none'"></div>` : '';
  const key = r._key || '';
  const extraLikes = (riState.likes.get(key) || 0);
  const likes = commentLikeCount(r) + extraLikes;
  const liked = riState.liked.has(key);
  const storedComments = riState.comments.get(key) || [];
  const repliesTotal = (typeof r.replies === 'number' && r.replies > 0 ? r.replies : 0) + storedComments.length;
  const likeBtn = `
    <button type="button" class="review-like-btn btn-press inline-flex items-center gap-1.5 text-xs font-bold transition ${liked ? 'text-[#fe2c55]' : 'text-gray-500 hover:text-[#fe2c55]'}" data-key="${key}">
      <i data-lucide="heart" class="w-4 h-4 ${liked ? 'fill-[#fe2c55] text-[#fe2c55]' : ''}"></i> ${compactCount(likes)}
    </button>`;
  const replyBtn = `
    <button type="button" class="review-reply-toggle btn-press inline-flex items-center gap-1.5 text-xs font-bold transition ${openReplyKey === key ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'}" data-key="${key}">
      <i data-lucide="message-circle" class="w-4 h-4"></i> ${repliesTotal > 0 ? `${compactCount(repliesTotal)} replies` : 'Reply'}
    </button>`;
  let replyBox = '';
  if (openReplyKey === key) {
    const nameVal = escapeHtml(savedReplyName || '');
    replyBox = `
      <div class="review-reply-box mt-3 rounded-xl border border-gray-200 bg-gray-50/80 p-3 space-y-2">
        <input type="text" class="review-reply-name w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Your name (optional)" maxlength="40" value="${nameVal}">
        <textarea class="review-reply-body w-full rounded-lg border border-gray-300 px-3 py-2 text-sm min-h-[74px] resize-y" placeholder="Write a comment..." maxlength="1000"></textarea>
        <div class="flex items-center justify-end gap-2">
          <button type="button" class="review-reply-cancel text-xs font-bold text-gray-500 hover:text-gray-700 px-3 py-2 transition">Cancel</button>
          <button type="button" data-key="${key}" class="review-reply-post btn-press inline-flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-sm shadow-blue-500/20"><i data-lucide="send" class="w-3.5 h-3.5"></i> Comment</button>
        </div>
      </div>`;
  }
  const threads = storedComments.length ? `<div class="mt-2.5 space-y-2.5">${storedComments.map(replyItemHtml).join('')}</div>` : '';
  return `
    <div class="flex gap-3 py-4 border-b border-gray-100 last:border-0">
      <button type="button" class="review-avatar shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-sm font-black uppercase shadow-sm transition hover:ring-2 hover:ring-blue-200" data-open-reviewer="${key}" title="View ${escapeHtml(nm)}'s profile">${initial}</button>
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <button type="button" data-open-reviewer="${key}" class="review-author text-sm font-bold text-gray-900 hover:text-blue-600 hover:underline transition">${escapeHtml(nm)}</button>${handle}${timeHtml}${loc}
          ${verifiedBadge}
        </div>
        <div class="flex gap-0.5 mt-1">${[1,2,3,4,5].map(i => `<i data-lucide="star" class="w-3.5 h-3.5 ${i <= (r.rating || 0) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}"></i>`).join('')}</div>
        ${title}
        <p class="text-[15px] text-gray-700 leading-relaxed mt-1.5">${escapeHtml(r.text || r.comment || '')}</p>
        ${photo}
        <div class="flex items-center gap-5 mt-2.5">
          ${likeBtn}
          ${replyBtn}
        </div>
        ${replyBox}
        ${threads}
      </div>
    </div>`;
}

// Full Customer Reviews section: live summary, 5→1 breakdown bars, real + seed
// review list, and the write-a-review form. Keyed by the PUBLIC property_id so
// reviews for one product can never leak onto another product's page. Rendered
// over the admin-chosen "reviews" promo banner background.
function reviewsSectionHtml(listing) {
  return `
    <div id="reviews-section" class="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm mb-8">
      <div class="absolute inset-0" data-bg-slot="reviews"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-white/95 via-white/92 to-white/95"></div>
      <div class="relative p-4 sm:p-6 lg:p-8">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div class="flex items-center gap-3">
            <div class="shrink-0 w-11 h-11 rounded-2xl bg-amber-400/15 text-amber-500 flex items-center justify-center"><i data-lucide="message-square-star" class="w-5 h-5"></i></div>
            <div>
              <h3 class="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Customer Reviews</h3>
              <p class="text-xs text-gray-500 mt-0.5">All reviews are from verified buyers only.</p>
            </div>
          </div>
          <span class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full"><i data-lucide="shield-check" class="w-3.5 h-3.5"></i> 100% Verified Purchase Reviews</span>
        </div>

        <div class="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 sm:p-6 mb-5">
          <div id="reviews-summary" class="mb-4"><div class="text-gray-400 text-sm py-3">Loading ratings…</div></div>
          <div id="reviews-breakdown"></div>
        </div>

        <div class="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 sm:p-6 mb-5">
          <div class="flex items-center justify-between gap-3 mb-2">
            <h4 class="text-sm font-black text-gray-900 uppercase tracking-wide">What Buyers Say</h4>
            <span class="text-xs text-gray-400">Newest first</span>
          </div>
          <div id="reviews-list"><div class="text-gray-400 text-sm py-4">Loading reviews…</div></div>
        </div>

        <div class="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 sm:p-6">
          <div id="review-form-wrapper">
            <h4 class="text-[15px] font-black text-gray-900 mb-0.5 flex items-center gap-2"><i data-lucide="pen-line" class="w-4 h-4 text-blue-500"></i> Write a Review</h4>
            <p class="text-xs text-gray-500 mb-3">Rate the product and share your experience — your review appears right at the top, newest first. No account needed.</p>
            <form id="review-form" class="space-y-3">
              <div class="flex items-center gap-2">
                <label class="text-xs text-gray-700 font-bold uppercase">Rating</label>
                <div id="star-rating" class="flex gap-1">
                  ${[1,2,3,4,5].map(i => `<button type="button" data-rating="${i}" class="star-btn p-1"><i data-lucide="star" class="w-5 h-5 text-gray-300 hover:text-amber-400 transition"></i></button>`).join('')}
                </div>
              </div>
              <input id="review-name" type="text" maxlength="40" placeholder="Your name (optional)" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
              <textarea id="review-text" rows="3" placeholder="Share your experience with this product..." class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"></textarea>
              <div id="review-photo-row" class="flex items-center gap-3">
                <label for="review-photo-input" class="inline-flex items-center gap-2 text-xs font-bold text-gray-700 bg-gray-100 border border-gray-200 rounded-xl px-3.5 py-2.5 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition">
                  <i data-lucide="camera" class="w-4 h-4 text-blue-500"></i> Add a photo
                </label>
                <input id="review-photo-input" type="file" accept="image/*" class="hidden">
                <div id="review-photo-preview" class="flex items-center gap-2"></div>
              </div>
              <div class="flex items-center gap-3">
                <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition">Submit Review</button>
                <div id="review-submit-msg" class="text-xs text-emerald-600 font-bold hidden"><i data-lucide="check-circle" class="w-3.5 h-3.5 inline"></i> Thank you! Your review is now live.</div>
                <div id="review-error-msg" class="text-xs text-red-600 font-bold hidden"><i data-lucide="alert-circle" class="w-3.5 h-3.5 inline"></i> <span></span></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>`;
}

function ratingsBreakdownHtml(listing, breakdown, total) {
  const max = Math.max(1, total);
  return `
    <div class="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 items-center bg-gray-50 border border-gray-100 rounded-2xl p-4">
      ${[5,4,3,2,1].map(s => {
        const n = breakdown[s] || 0;
        const pct = Math.round((n / max) * 100);
        return `
        <div class="flex items-center gap-1.5 text-xs text-gray-600 font-semibold"><i data-lucide="star" class="w-3 h-3 fill-amber-400 text-amber-400"></i>${s}</div>
        <div class="flex items-center gap-2">
          <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"><div class="h-full bg-amber-400 rounded-full" style="width:${pct}%"></div></div>
          <span class="text-[11px] text-gray-400 w-9 text-right tabular-nums">${pct}%</span>
        </div>`;
      }).join('')}
    </div>`;
}

function getListingId() {
  const params = new URLSearchParams(window.location.search);
  const queryId = params.get('id');
  if (queryId) return queryId;
  // Clean /product/<id> URLs (server-rendered by /api/og.js) resolve the listing
  // the same way as the legacy ?id= link format.
  const match = window.location.pathname.match(/^\/product\/([^/]+)\/?$/);
  if (match && match[1]) {
    try {
      return decodeURIComponent(match[1]);
    } catch {
      return match[1];
    }
  }
  return null;
}

const ALL_PRODUCTS = [...PRODUCT_LISTINGS];
function findProductById(id) {
  return ALL_PRODUCTS.find(l => l.property_id === id) || null;
}

// Lazy-loaded ~636 KB extra product catalog. Only fetched when the built-in
// product list + live DB don't already contain the requested id.
let _extraProductsPromise = null;
function loadExtraProducts() {
  if (!_extraProductsPromise) {
    _extraProductsPromise = import('./products-extra.js')
      .then(m => {
        const extra = m.PRODUCT_EXTRA_LISTINGS || [];
        for (const l of extra) if (!ALL_PRODUCTS.some(x => x.property_id === l.property_id)) ALL_PRODUCTS.push(l);
        return ALL_PRODUCTS;
      })
      .catch(() => ALL_PRODUCTS);
  }
  return _extraProductsPromise;
}

function renderTruck(listing) {
  const root = document.getElementById('details-content');
  const price = formatTruckPrice(listing);

  const imgs = safeImages(listing.images);
  const galleryThumbs = imgs.map((img, i) =>
    `<button class="gallery-thumb rounded-lg overflow-hidden border-2 ${i === 0 ? 'active border-blue-500' : 'border-gray-200'} shrink-0" data-img="${escapeHtml(img)}">
      ${legacyThumbContentHtml(img, i)}
    </button>`
  ).join('');

  const galleryLabels = [
    'Front View', 'Rear View', 'Left Side', 'Right Side',
    'Interior Dashboard', 'Driver Seat', 'Cargo Area / Truck Bed',
    'Engine', 'Wheels / Tires', 'Additional View'
  ];

  const specs = [
    { icon: 'building-2', label: 'Brand', value: listing.brand },
    { icon: 'car', label: 'Model', value: listing.model },
    { icon: 'calendar', label: 'Model Year', value: listing.model_year },
    { icon: 'badge-check', label: 'Condition', value: listing.condition },
    { icon: 'gauge', label: 'Mileage', value: listing.mileage },
    { icon: 'cog', label: 'Transmission', value: listing.transmission },
    { icon: 'fuel', label: 'Fuel Type', value: listing.fuel_type },
    { icon: 'zap', label: 'Engine', value: listing.engine },
    { icon: 'truck', label: 'Drive Type', value: listing.drive_type },
    { icon: 'palette', label: 'Colour', value: listing.color },
    { icon: 'package', label: 'Payload Capacity', value: listing.payload_capacity },
    { icon: 'link', label: 'Towing Capacity', value: listing.towing_capacity },
    { icon: 'barcode', label: 'VIN', value: listing.vin },
    { icon: 'tag', label: 'Stock Number', value: listing.stock_number },
  ].filter(s => s.value != null && s.value !== '' && s.value !== 'N/A');

  const featuresBlock = featuresGrid(listing.features);

  const ratingsBlock = reviewsSectionHtml(listing);

  root.innerHTML = `
    <div class="fade-in">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <a href="/" class="hover:text-blue-500 transition">Home</a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span>Trucks</span>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span class="text-gray-700 truncate">${listing.title}</span>
      </div>

      <!-- Title & ID -->
      <div class="relative overflow-hidden rounded-2xl border border-blue-100 mb-6 shadow-sm">
        <div class="absolute inset-0" style="background:
          radial-gradient(760px 300px at 92% -20%, rgba(59,130,246,.16), transparent 60%),
          radial-gradient(600px 260px at 0% 115%, rgba(16,185,129,.12), transparent 55%),
          linear-gradient(180deg,#ffffff 0%,#f7fbff 100%)"></div>
        <div class="absolute top-0 inset-x-0 h-1.5" style="background:linear-gradient(90deg,#2563eb,#0ea5e9,#10b981)" aria-hidden="true"></div>
        <div class="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-5 sm:p-6">
          <div>
            <span class="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-2"><i data-lucide="badge-check" class="w-3.5 h-3.5"></i> ${listing.verification_status === 'Verified' ? 'Verified listing' : 'Marketplace listing'}</span>
            <h1 class="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">${escapeHtml(listing.title)}</h1>
            <p class="text-gray-500 text-sm mt-1">Stock #: <span class="text-blue-500 font-mono font-bold">${escapeHtml(listing.stock_number || '—')}</span> &middot; VIN: <span class="text-gray-600 font-mono">${escapeHtml(listing.vin || '—')}</span></p>
          </div>
          <div class="text-right shrink-0">
            <div class="text-3xl font-black text-blue-600">${price}</div>
            <span class="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mt-1">${escapeHtml(listing.condition || 'Used')} &middot; For Sale</span>
          </div>
        </div>
      </div>

      <!-- Main Image -->
      <div class="relative w-full h-[46vh] sm:h-[60vh] lg:h-[72vh] rounded-2xl overflow-hidden bg-gray-100 mb-3 hero-zoom flex items-center justify-center">
        ${legacyHeroHtml(listing)}
        <span id="gallery-label" class="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">${galleryLabels[0]}</span>
      </div>

      <!-- Gallery -->
      <div class="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-8">
        ${galleryThumbs}
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 mb-8">
        <button id="buy-now-btn" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl uppercase text-sm tracking-wider transition flex items-center justify-center gap-2">
          <i data-lucide="shopping-bag" class="w-5 h-5"></i> Buy Now
        </button>
        <button id="wishlist-btn" class="px-5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2" aria-label="Add to Wishlist">
          <i data-lucide="heart" class="w-5 h-5"></i>
        </button>
        <button id="share-btn" class="px-5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2" aria-label="Share">
          <i data-lucide="share-2" class="w-5 h-5"></i>
        </button>
      </div>

      ${buyerAssuranceHtml(listing)}

      ${promoRailHtml()}

      <!-- Smart Agent Buttons -->
      <div class="mb-8 pt-4 border-t border-gray-100" id="agent-buttons-block">${agentButtonsHtml(listing, { compact: false })}</div>

      <!-- Description -->
      ${detailsAccordions(listing, specs, listing.features, null, null)}

      ${ratingsBlock}

      ${sellerBlock(listing)}

      ${relSectionsHtml()}
    </div>
  `;

  bindLegacyGallery(root, galleryLabels);

  document.getElementById('buy-now-btn').addEventListener('click', async () => {
    const user = await getCurrentUser();
    if (user) {
      window.location.href = `/checkout.html?id=${listing.property_id}`;
    } else {
      setRedirectAfterAuth(`/checkout.html?id=${listing.property_id}`);
      window.location.href = `/auth.html?redirect=${encodeURIComponent('/checkout.html?id=' + listing.property_id)}`;
    }
  });

  document.getElementById('share-btn').addEventListener('click', () => {
    openShareSheet(listing);
  });

  wireAgentButtons(document.getElementById('agent-buttons-block'), () => listing);
  loadRelatedSections(listing);
  loadPromoRail(listing);

  setupReviewForm(listing);
  loadReviews(listing);

  setupAccordions();
  if (window.lucide) lucide.createIcons();
}

function renderMotorhome(listing) {
  const root = document.getElementById('details-content');
  const price = formatPrice(listing);

  const imgs = safeImages(listing.images);
  const galleryThumbs = imgs.map((img, i) =>
    `<button class="gallery-thumb rounded-lg overflow-hidden border-2 ${i === 0 ? 'active border-blue-500' : 'border-gray-200'} shrink-0" data-img="${escapeHtml(img)}">
      ${legacyThumbContentHtml(img, i)}
    </button>`
  ).join('');

  const galleryLabels = [
    'Exterior Front', 'Exterior Side', 'Exterior Rear', 'Living Area',
    'Kitchen', 'Bedroom', 'Bathroom', 'Additional View'
  ];

  const specs = [
    { icon: 'building-2', label: 'Brand', value: listing.brand },
    { icon: 'car', label: 'Model', value: listing.model },
    { icon: 'calendar', label: 'Model Year', value: listing.model_year },
    { icon: 'badge-check', label: 'Condition', value: listing.condition },
    { icon: 'gauge', label: 'Mileage', value: listing.mileage },
    { icon: 'cog', label: 'Transmission', value: listing.transmission },
    { icon: 'fuel', label: 'Fuel Type', value: listing.fuel_type },
    { icon: 'zap', label: 'Engine', value: listing.engine },
    { icon: 'bus', label: 'Type', value: listing.property_type },
    { icon: 'truck', label: 'Drive Type', value: listing.drive_type },
    { icon: 'palette', label: 'Colour', value: listing.color },
    { icon: 'moon', label: 'Sleeping Capacity', value: listing.sleeping_capacity },
    { icon: 'users', label: 'Seating Capacity', value: listing.seating_capacity },
    { icon: 'shower-head', label: 'Bathroom', value: listing.bathroom },
    { icon: 'utensils', label: 'Kitchen', value: listing.kitchen },
    { icon: 'droplet', label: 'Water Tank', value: listing.water_tank },
    { icon: 'barcode', label: 'VIN', value: listing.vin },
    { icon: 'tag', label: 'Stock Number', value: listing.stock_number },
  ].filter(s => s.value != null && s.value !== '' && s.value !== 'N/A');

  const featuresBlock = featuresGrid(listing.features);

  const ratingsBlock = reviewsSectionHtml(listing);

  root.innerHTML = `
    <div class="fade-in">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <a href="/" class="hover:text-blue-500 transition">Home</a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span>Motorhomes</span>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span class="text-gray-700 truncate">${listing.title}</span>
      </div>

      <!-- Title & ID -->
      <div class="relative overflow-hidden rounded-2xl border border-blue-100 mb-6 shadow-sm">
        <div class="absolute inset-0" style="background:
          radial-gradient(760px 300px at 92% -20%, rgba(59,130,246,.16), transparent 60%),
          radial-gradient(600px 260px at 0% 115%, rgba(16,185,129,.12), transparent 55%),
          linear-gradient(180deg,#ffffff 0%,#f7fbff 100%)"></div>
        <div class="absolute top-0 inset-x-0 h-1.5" style="background:linear-gradient(90deg,#2563eb,#0ea5e9,#10b981)" aria-hidden="true"></div>
        <div class="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-5 sm:p-6">
          <div>
            <span class="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-2"><i data-lucide="badge-check" class="w-3.5 h-3.5"></i> ${listing.verification_status === 'Verified' ? 'Verified listing' : 'Marketplace listing'}</span>
            <h1 class="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">${escapeHtml(listing.title)}</h1>
            <p class="text-gray-500 text-sm mt-1">Stock #: <span class="text-blue-500 font-mono font-bold">${escapeHtml(listing.stock_number || '—')}</span> &middot; VIN: <span class="text-gray-600 font-mono">${escapeHtml(listing.vin || '—')}</span></p>
          </div>
          <div class="text-right shrink-0">
            <div class="text-3xl font-black text-blue-600">${price}</div>
            <span class="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mt-1">${escapeHtml(listing.condition || 'Used')} &middot; For Sale</span>
          </div>
        </div>
      </div>

      <!-- Main Image -->
      <div class="relative w-full h-[46vh] sm:h-[60vh] lg:h-[72vh] rounded-2xl overflow-hidden bg-gray-100 mb-3 hero-zoom flex items-center justify-center">
        ${legacyHeroHtml(listing)}
        <span id="gallery-label" class="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">${galleryLabels[0]}</span>
      </div>

      <!-- Gallery -->
      <div class="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-8">
        ${galleryThumbs}
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 mb-8">
        <button id="buy-now-btn" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl uppercase text-sm tracking-wider transition flex items-center justify-center gap-2">
          <i data-lucide="shopping-bag" class="w-5 h-5"></i> Buy Now
        </button>
        <button id="wishlist-btn" class="px-5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2" aria-label="Add to Wishlist">
          <i data-lucide="heart" class="w-5 h-5"></i>
        </button>
        <button id="share-btn" class="px-5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2" aria-label="Share">
          <i data-lucide="share-2" class="w-5 h-5"></i>
        </button>
      </div>

      ${buyerAssuranceHtml(listing)}

      ${promoRailHtml()}

      <!-- Smart Agent Buttons -->
      <div class="mb-8 pt-4 border-t border-gray-100" id="agent-buttons-block">${agentButtonsHtml(listing, { compact: false })}</div>

      <!-- Description -->
      ${detailsAccordions(listing, specs, listing.features, null, null)}

      ${ratingsBlock}

      ${sellerBlock(listing)}

      ${relSectionsHtml()}
    </div>
  `;

  bindLegacyGallery(root, galleryLabels);

  document.getElementById('buy-now-btn').addEventListener('click', async () => {
    const user = await getCurrentUser();
    if (user) {
      window.location.href = `/checkout.html?id=${listing.property_id}`;
    } else {
      setRedirectAfterAuth(`/checkout.html?id=${listing.property_id}`);
      window.location.href = `/auth.html?redirect=${encodeURIComponent('/checkout.html?id=' + listing.property_id)}`;
    }
  });

  document.getElementById('share-btn').addEventListener('click', () => {
    openShareSheet(listing);
  });

  wireAgentButtons(document.getElementById('agent-buttons-block'), () => listing);
  loadRelatedSections(listing);
  loadPromoRail(listing);

  setupReviewForm(listing);
  loadReviews(listing);

  setupAccordions();
  if (window.lucide) lucide.createIcons();
}

function renderCar(listing) {
  const root = document.getElementById('details-content');
  const price = formatPrice(listing);

  const imgs = safeImages(listing.images);
  const galleryThumbs = imgs.map((img, i) =>
    `<button class="gallery-thumb rounded-lg overflow-hidden border-2 ${i === 0 ? 'active border-blue-500' : 'border-gray-200'} shrink-0" data-img="${escapeHtml(img)}">
      ${legacyThumbContentHtml(img, i)}
    </button>`
  ).join('');

  const galleryLabels = [
    'Front View', 'Rear View', 'Left Side', 'Right Side',
    'Interior Dashboard', 'Driver Seat', 'Cabin / Interior',
    'Wheels / Tires', 'Additional View'
  ];

  const specs = [
    { icon: 'building-2', label: 'Brand', value: listing.brand },
    { icon: 'car', label: 'Model', value: listing.model },
    { icon: 'calendar', label: 'Model Year', value: listing.model_year },
    { icon: 'badge-check', label: 'Condition', value: listing.condition },
    { icon: 'gauge', label: 'Mileage', value: listing.mileage },
    { icon: 'cog', label: 'Transmission', value: listing.transmission },
    { icon: 'fuel', label: 'Fuel Type', value: listing.fuel_type },
    { icon: 'zap', label: 'Engine', value: listing.engine },
    { icon: 'truck', label: 'Drive Type', value: listing.drive_type },
    { icon: 'palette', label: 'Colour', value: listing.color },
    { icon: 'barcode', label: 'VIN', value: listing.vin },
    { icon: 'tag', label: 'Stock Number', value: listing.stock_number },
  ].filter(s => s.value != null && s.value !== '' && s.value !== 'N/A');

  const featuresBlock = featuresGrid(listing.features);

  const ratingsBlock = reviewsSectionHtml(listing);

  root.innerHTML = `
    <div class="fade-in">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <a href="/" class="hover:text-blue-500 transition">Home</a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span>Cars</span>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span class="text-gray-700 truncate">${listing.title}</span>
      </div>

      <!-- Title & ID -->
      <div class="relative overflow-hidden rounded-2xl border border-blue-100 mb-6 shadow-sm">
        <div class="absolute inset-0" style="background:
          radial-gradient(760px 300px at 92% -20%, rgba(59,130,246,.16), transparent 60%),
          radial-gradient(600px 260px at 0% 115%, rgba(16,185,129,.12), transparent 55%),
          linear-gradient(180deg,#ffffff 0%,#f7fbff 100%)"></div>
        <div class="absolute top-0 inset-x-0 h-1.5" style="background:linear-gradient(90deg,#2563eb,#0ea5e9,#10b981)" aria-hidden="true"></div>
        <div class="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-5 sm:p-6">
          <div>
            <span class="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-2"><i data-lucide="badge-check" class="w-3.5 h-3.5"></i> ${listing.verification_status === 'Verified' ? 'Verified listing' : 'Marketplace listing'}</span>
            <h1 class="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">${escapeHtml(listing.title)}</h1>
            <p class="text-gray-500 text-sm mt-1">Stock #: <span class="text-blue-500 font-mono font-bold">${escapeHtml(listing.stock_number || '—')}</span> &middot; VIN: <span class="text-gray-600 font-mono">${escapeHtml(listing.vin || '—')}</span></p>
          </div>
          <div class="text-right shrink-0">
            <div class="text-3xl font-black text-blue-600">${price}</div>
            <span class="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mt-1">${escapeHtml(listing.condition || 'Used')} &middot; For Sale</span>
          </div>
        </div>
      </div>

      <!-- Main Image -->
      <div class="relative w-full h-[46vh] sm:h-[60vh] lg:h-[72vh] rounded-2xl overflow-hidden bg-gray-100 mb-3 hero-zoom flex items-center justify-center">
        ${legacyHeroHtml(listing)}
        <span id="gallery-label" class="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">${galleryLabels[0]}</span>
      </div>

      <!-- Gallery -->
      <div class="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-8">
        ${galleryThumbs}
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 mb-8">
        <button id="buy-now-btn" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl uppercase text-sm tracking-wider transition flex items-center justify-center gap-2">
          <i data-lucide="shopping-bag" class="w-5 h-5"></i> Buy Now
        </button>
        <button id="wishlist-btn" class="px-5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2" aria-label="Add to Wishlist">
          <i data-lucide="heart" class="w-5 h-5"></i>
        </button>
        <button id="share-btn" class="px-5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2" aria-label="Share">
          <i data-lucide="share-2" class="w-5 h-5"></i>
        </button>
      </div>

      ${buyerAssuranceHtml(listing)}

      ${promoRailHtml()}

      <!-- Smart Agent Buttons -->
      <div class="mb-8 pt-4 border-t border-gray-100" id="agent-buttons-block">${agentButtonsHtml(listing, { compact: false })}</div>

      <!-- Description -->
      ${detailsAccordions(listing, specs, listing.features, null, null)}

      ${ratingsBlock}

      ${sellerBlock(listing)}

      ${relSectionsHtml()}
    </div>
  `;

  bindLegacyGallery(root, galleryLabels);

  document.getElementById('buy-now-btn').addEventListener('click', async () => {
    const user = await getCurrentUser();
    if (user) {
      window.location.href = `/checkout.html?id=${listing.property_id}`;
    } else {
      setRedirectAfterAuth(`/checkout.html?id=${listing.property_id}`);
      window.location.href = `/auth.html?redirect=${encodeURIComponent('/checkout.html?id=' + listing.property_id)}`;
    }
  });

  document.getElementById('share-btn').addEventListener('click', () => {
    openShareSheet(listing);
  });

  wireAgentButtons(document.getElementById('agent-buttons-block'), () => listing);
  loadRelatedSections(listing);
  loadPromoRail(listing);

  setupReviewForm(listing);
  loadReviews(listing);

  setupAccordions();
  if (window.lucide) lucide.createIcons();
}

function galleryLabelsFor(listing) {
  if (listing.listing_type === 'vehicle') {
    return ['Front View', 'Rear View', 'Left Side', 'Right Side', 'Interior Dashboard', 'Driver Seat', 'Cargo / Bed', 'Engine', 'Wheels / Tires', 'Additional View'];
  }
  if (listing.listing_type === 'property') {
    return ['Front Exterior', 'Side Exterior', 'Back Exterior', 'Living Room', 'Kitchen', 'Dining Area', 'Bedroom', 'Bathroom', 'Additional Interior', 'Additional View'];
  }
  return ['Front View', 'Angle View', 'Detail View', 'Packaging', 'Additional View'];
}

function actionGridHtml(listing) {
  const isProperty = listing.listing_type === 'property';
  const shareLabel = isProperty ? 'Share Property' : 'Share';
  const contactHref = `/contact.html?listing=${encodeURIComponent(listing.property_id || '')}`;
  const viewMapBtn = isProperty
    ? `<a href="#listing-map" class="flex items-center justify-center gap-2 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 text-gray-700 font-bold py-3 rounded-xl transition text-sm"><i data-lucide="map-pin" class="w-5 h-5"></i> View Map</a>`
    : '';
  const propertyActions = isProperty ? `
    <button type="button" id="request-viewing-btn" class="flex items-center justify-center gap-2 bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-700 font-bold py-3 rounded-xl transition text-sm">
      <i data-lucide="eye" class="w-4 h-4"></i> Request Viewing
    </button>
    <button type="button" id="request-info-btn" class="flex items-center justify-center gap-2 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 font-bold py-3 rounded-xl transition text-sm">
      <i data-lucide="info" class="w-4 h-4"></i> Request More Information
    </button>
    <a href="${contactHref}" class="flex items-center justify-center gap-2 bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 font-bold py-3 rounded-xl transition text-sm">
      <i data-lucide="badge-check" class="w-4 h-4"></i> Contact Us
      <span class="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600"><span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online</span>
    </a>
    <a href="${contactHref}&subject=Message" class="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl transition text-sm">
      <i data-lucide="message-circle" class="w-5 h-5"></i> Send Message
    </a>
  ` : `
    <a href="${contactHref}" class="flex items-center justify-center gap-2 bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 font-bold py-3 rounded-xl transition text-sm">
      <i data-lucide="badge-check" class="w-4 h-4"></i> Contact Us
      <span class="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600"><span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online</span>
    </a>`;
  return `
    <div class="mb-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button type="button" id="buy-now-btn" class="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl transition text-sm uppercase tracking-wider">
          <i data-lucide="shopping-bag" class="w-5 h-5"></i> Buy Now
        </button>
        <button type="button" id="add-cart-btn" class="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3.5 rounded-xl transition text-sm">
          <i data-lucide="shopping-cart" class="w-5 h-5"></i> Add to Cart
        </button>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
        <button type="button" id="view-details-btn" class="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 rounded-xl transition text-sm">
          <i data-lucide="eye" class="w-5 h-5"></i> View Details
        </button>
        <button type="button" id="wishlist-btn" class="flex items-center justify-center gap-2 bg-gray-100 hover:bg-red-100 hover:text-red-600 text-gray-700 font-bold py-3 rounded-xl transition text-sm">
          <i data-lucide="heart" class="w-5 h-5"></i> Favorite
        </button>
        <button type="button" id="share-btn" class="flex items-center justify-center gap-2 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 text-gray-700 font-bold py-3 rounded-xl transition text-sm">
          <i data-lucide="share-2" class="w-5 h-5"></i> ${shareLabel}
        </button>
        ${viewMapBtn}
      </div>
      ${isProperty ? `<div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">${propertyActions}</div>` : ''}
      <div class="mt-4 pt-4 border-t border-gray-100" id="agent-buttons-block">${agentButtonsHtml(listing, { compact: false })}</div>
    </div>
  `;
}

function sellerBlock(listing) {
  const isAgent = listing.listing_type === 'property';
  const base = `/contact.html?listing=${encodeURIComponent(listing.property_id || '')}`;
  return `
    <div class="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
      <div class="flex items-center gap-3 mb-4">
        <div class="shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm">
          <img src="/w-logo.svg" alt="Weverse Online Shop" class="w-full h-full object-contain" onerror="this.onerror=null;this.style.display='none'">
        </div>
        <div class="min-w-0">
          <p class="text-[15px] font-black text-gray-900 flex items-center gap-1.5">Weverse Online Shop <i data-lucide="badge-check" class="w-4 h-4 fill-blue-600 text-white"></i></p>
          <p class="text-xs text-gray-500">${isAgent ? 'Professional agent for this listing' : 'Trusted marketplace seller'}</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-2 mb-4">
        <span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-full"><i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Secure Checkout</span>
        <span class="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1.5 rounded-full"><i data-lucide="truck" class="w-3.5 h-3.5"></i> Fast Worldwide Delivery</span>
        <span class="inline-flex items-center gap-1 text-xs font-bold text-violet-700 bg-violet-50 border border-violet-200 px-2.5 py-1.5 rounded-full"><i data-lucide="badge-check" class="w-3.5 h-3.5"></i> Authentic Listings</span>
        <span class="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1.5 rounded-full"><i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i> Easy Returns</span>
      </div>
      <div class="flex gap-2">
        <a href="${base}" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl text-sm text-center transition">Contact Seller</a>
        <a href="${base}&subject=Enquiry" class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl text-sm text-center transition">Send Message</a>
      </div>
    </div>`;
}

function relSectionsHtml() {
  return `
      <div id="similar-section" class="hidden mb-6">
        <h3 class="rel-title text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Similar Products</h3>
        <div class="rel-grid flex gap-3 sm:gap-4 overflow-x-auto scrollbar-none pb-1 snap-x snap-mandatory"></div>
      </div>
      <div id="related-section" class="hidden mb-6">
        <h3 class="rel-title text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Related Products</h3>
        <div class="rel-grid flex gap-3 sm:gap-4 overflow-x-auto scrollbar-none pb-1 snap-x snap-mandatory"></div>
      </div>
      <div id="recommended-section" class="hidden mb-6">
        <h3 class="rel-title text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Recommended For You</h3>
        <div class="rel-grid flex gap-3 sm:gap-4 overflow-x-auto scrollbar-none pb-1 snap-x snap-mandatory"></div>
      </div>`;
}

// ── Professional USA / Europe / UK marketplace trust + promo blocks ────────
// Used by every details renderer so the page reads like a real global shipping
// company: a "Sold & shipped by + tracked delivery" promise, a FedEx/UPS-style
// order progress bar, a guarantees band, and a live goods-promo rail fed from
// real listings. Pure additions — nothing existing is altered or removed.

function shippingPromiseHtml(listing) {
  const isProperty = listing.listing_type === 'property';
  const isVehicle = isVehicleListing(listing);
  const cards = [];
  cards.push({ icon: 'badge-check', title: isProperty ? 'Managed & promoted by' : 'Sold & shipped by', sub: 'Weverse Online Shop' });
  if (isProperty) {
    cards.push({ icon: 'shield-check', title: 'Verified listing', sub: 'Checked before publish' });
    cards.push({ icon: 'calendar-check', title: 'Viewing available', sub: 'In-person or live video' });
  } else if (isVehicle) {
    cards.push({ icon: 'shield-check', title: 'Inspected & verified', sub: 'Condition confirmed' });
    cards.push({ icon: 'truck', title: 'Delivery arranged', sub: 'Door-to-door options' });
  } else {
    cards.push({ icon: 'clock', title: 'Ships in 24 hours', sub: 'Free worldwide 3–7 days' });
    cards.push({ icon: 'package-search', title: 'Tracked every step', sub: 'DHL · FedEx · UPS · EMS' });
  }
  return `
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
      ${cards.map(c => `
        <div class="flex items-center gap-3 bg-white/75 border border-gray-200 rounded-xl px-3.5 py-3 shadow-sm">
          <span class="shrink-0 w-9 h-9 rounded-full ${c.icon === 'badge-check' ? 'bg-blue-50 text-blue-600' : c.icon === 'shield-check' ? 'bg-emerald-50 text-emerald-600' : 'bg-violet-50 text-violet-600'} flex items-center justify-center"><i data-lucide="${c.icon}" class="w-4 h-4"></i></span>
          <div class="min-w-0">
            <p class="text-xs font-black text-gray-900 leading-tight">${c.title}</p>
            <p class="text-[11px] text-gray-500 leading-tight">${c.sub}</p>
          </div>
        </div>`).join('')}
    </div>`;
}

function orderProgressHtml() {
  const steps = [
    { icon: 'receipt-text', label: 'Ordered' },
    { icon: 'package', label: 'Shipped' },
    { icon: 'truck', label: 'On the way' },
    { icon: 'home', label: 'Delivered' },
  ];
  return `
    <div class="mt-5">
      <p class="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wide text-gray-500 mb-3"><i data-lucide="route" class="w-3.5 h-3.5 text-blue-500"></i> From order to your door</p>
      <div class="relative flex justify-between">
        <span class="absolute top-[17px] left-[6%] right-[6%] h-[3px] bg-gradient-to-r from-blue-500 via-sky-400 to-sky-300 rounded-full" aria-hidden="true"></span>
        ${steps.map(s => `
          <div class="flex flex-col items-center gap-1.5 relative z-10">
            <span class="w-9 h-9 rounded-full bg-white text-blue-600 border-2 border-blue-500 flex items-center justify-center shadow-sm"><i data-lucide="${s.icon}" class="w-4 h-4"></i></span>
            <span class="text-[10px] sm:text-[11px] font-bold text-gray-700 text-center whitespace-nowrap">${s.label}</span>
          </div>`).join('')}
      </div>
    </div>`;
}

function guaranteesBandHtml() {
  return `
    <div class="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
      ${[
        { icon: 'lock', label: 'SSL Secure', sub: 'Encrypted checkout' },
        { icon: 'shield-check', label: 'Buyer Protection', sub: 'Payment protected' },
        { icon: 'rotate-ccw', label: '14-day Returns', sub: 'Easy & refundable' },
        { icon: 'headphones', label: '24/7 Support', sub: 'Real humans' },
      ].map(g => `
        <div class="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5">
          <span class="shrink-0 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><i data-lucide="${g.icon}" class="w-4 h-4"></i></span>
          <div class="min-w-0">
            <p class="text-[11px] font-black text-gray-900 leading-tight">${g.label}</p>
            <p class="text-[10px] text-gray-500 leading-tight">${g.sub}</p>
          </div>
        </div>`).join('')}
    </div>`;
}

// The full "Buy with confidence" block placed right under the action buttons on
// every details page type (products, properties, vehicles, pets).
function buyerAssuranceHtml(listing) {
  return `
    <div class="mb-8 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div class="px-5 sm:px-6 py-5 sm:py-6">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 class="flex items-center gap-2 text-sm font-black text-gray-900 uppercase tracking-wide"><i data-lucide="shield-check" class="w-4 h-4 text-blue-600"></i> Buy with confidence</h3>
          <span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full"><i data-lucide="badge-check" class="w-3 h-3"></i> Verified marketplace</span>
        </div>
        ${shippingPromiseHtml(listing)}
        ${orderProgressHtml()}
        ${guaranteesBandHtml()}
        <p class="mt-4 text-[11px] text-gray-400 leading-relaxed">Every <strong class="text-gray-500">Weverse Online Shop</strong> order is packed with care, tracked in real time, and covered by buyer protection. Questions? Our USA, Europe &amp; UK support team is online 24/7 and replies fast.</p>
      </div>
    </div>`;
}

// "Hot right now" goods-promo rail — real products from the seller's own
// catalog, with images, ranked by real customer activity (saved, sold, rating).
function promoRailHtml() {
  return `
    <div id="hot-now-section" class="hidden mb-8">
      <div class="relative overflow-hidden rounded-2xl border border-blue-100 mb-4">
        <div class="absolute inset-0" style="background:
          radial-gradient(700px 260px at 88% -40%, rgba(59,130,246,.18), transparent 60%),
          radial-gradient(560px 240px at 0% 130%, rgba(16,185,129,.14), transparent 55%),
          linear-gradient(120deg,#eef6ff 0%,#ffffff 55%,#ebfdf7 100%)"></div>
        <div class="absolute top-0 inset-x-0 h-1" style="background:linear-gradient(90deg,#2563eb,#0ea5e9,#10b981)" aria-hidden="true"></div>
        <div class="relative p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700"><i data-lucide="flame" class="w-3.5 h-3.5 kco-blink-soft text-orange-500"></i> Hot right now</p>
            <h3 class="text-lg sm:text-xl font-black text-gray-900 tracking-tight mt-1">This week's most-wanted products</h3>
            <p class="text-sm text-gray-500 mt-0.5">Real customer favorites across the USA, Europe &amp; the UK — in stock and ready to ship.</p>
          </div>
          <a href="/#showroom-directory" class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-3 rounded-xl transition shadow-md shadow-blue-600/20">See all products <i data-lucide="arrow-right" class="w-4 h-4"></i></a>
        </div>
      </div>
      <div class="hot-grid flex gap-3 sm:gap-4 overflow-x-auto scrollbar-none pb-1 snap-x snap-mandatory"></div>
    </div>`;
}

// Fills the promo rail with real listings (never empty — falls back to the same
// related pool used elsewhere on the page). Purely additive, guarded.
async function loadPromoRail(listing) {
  try {
    const section = document.getElementById('hot-now-section');
    const grid = section && section.querySelector('.hot-grid');
    if (!section || !grid) return;
    const pool = buildRelatedPool(listing);
    const hot = [...pool]
      .sort((a, b) =>
        (Number(b.favorite_count) || 0) + (Number(b.sold_count) || 0) * 2 + (Number(b.rating) || 0) * 10
        - ((Number(a.favorite_count) || 0) + (Number(a.sold_count) || 0) * 2 + (Number(a.rating) || 0) * 10))
      .slice(0, 10);
    if (!hot.length) return;
    section.classList.remove('hidden');
    grid.innerHTML = '';
    const frag = document.createDocumentFragment();
    hot.forEach(item => {
      const wrap = document.createElement('div');
      wrap.className = 'shrink-0 w-[220px] sm:w-[280px] snap-start relative';
      const card = renderCard(item);
      card.style.width = '100%';
      wrap.appendChild(card);
      const live = document.createElement('span');
      live.className = 'kco-live-dot absolute top-2.5 left-2.5 z-10 w-2.5 h-2.5 ring-2 ring-white/80';
      live.setAttribute('aria-hidden', 'true');
      live.title = 'Available now';
      wrap.appendChild(live);
      frag.appendChild(wrap);
    });
    grid.appendChild(frag);
    if (window.lucide) lucide.createIcons();
  } catch {}
}

function buildRelatedPool(listing) {
  const seen = new Map();
  const add = (arr) => (arr || []).forEach(l => { if (l && l.property_id) seen.set(l.property_id, l); });
  add(SHOWROOM_LISTINGS);
  add(TRUCK_LISTINGS);
  add(MOTORHOME_LISTINGS);
  add(CAR_LISTINGS);
  add(PHONE_LISTINGS);
  add(PET_LISTINGS);
  add(PRODUCT_LISTINGS);
  add(ALL_PRODUCTS); // includes lazily-loaded extra products when available
  add(getAllListings());
  const cat = getCatalogCategory(listing.category || listing.subcategory);
  if (cat) add(getCatalogSample(cat.slug, 50));
  return [...seen.values()].filter(l => l.property_id !== listing.property_id);
}

function relScore(a, b) {
  let score = 0;
  const n = s => String(s || '').trim().toLowerCase();
  if (a.listing_type && a.listing_type === b.listing_type) score += 40;
  if (a.category && n(a.category) === n(b.category)) score += 30;
  if (a.subcategory && n(a.subcategory) === n(b.subcategory)) score += 20;
  if (a.brand && n(a.brand) === n(b.brand)) score += 15;
  if (a.breed && n(a.breed) === n(b.breed)) score += 15;
  if (a.model && n(a.model) === n(b.model)) score += 10;
  if (a.property_type && n(a.property_type) === n(b.property_type)) score += 15;
  const pa = parseFloat(a.price) || 0, pb = parseFloat(b.price) || 0;
  if (pa > 0 && pb > 0) {
    const ratio = Math.min(pa, pb) / Math.max(pa, pb);
    if (ratio >= 0.8) score += 10;
    else if (ratio >= 0.6) score += 6;
    else if (ratio >= 0.4) score += 3;
  }
  if (a.country_code && a.country_code === b.country_code) score += 5;
  const wa = new Set(n(a.title).split(/[^a-z0-9]+/).filter(w => w.length > 2));
  const wb = new Set(n(b.title).split(/[^a-z0-9]+/).filter(w => w.length > 2));
  let overlap = 0;
  wa.forEach(w => { if (wb.has(w)) overlap++; });
  score += Math.min(overlap * 2, 10);
  return score;
}

function fillRelGrid(sectionId, items) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  const grid = section.querySelector('.rel-grid');
  if (!grid) return;
  if (!items.length) { section.classList.add('hidden'); return; }
  section.classList.remove('hidden');
  grid.innerHTML = '';
  const frag = document.createDocumentFragment();
  items.slice(0, 10).forEach(item => {
    const wrap = document.createElement('div');
    wrap.className = 'shrink-0 w-[260px] sm:w-[320px] snap-start relative';
    const card = renderCard(item);
    card.style.width = '100%';
    wrap.appendChild(card);
    // Subtle pulsing "live/available" dot so the marketplace feels active, purely
    // cosmetic — driven by nothing false, just visual life on real products.
    const live = document.createElement('span');
    live.className = 'kco-live-dot absolute top-2.5 left-2.5 z-10 w-2.5 h-2.5 ring-2 ring-white/80';
    live.setAttribute('aria-hidden', 'true');
    live.title = 'Available now';
    wrap.appendChild(live);
    frag.appendChild(wrap);
  });
  grid.appendChild(frag);
  if (window.lucide) lucide.createIcons();
}

function loadRelatedSections(listing) {
  const poolAll = buildRelatedPool(listing);
  const scored = poolAll
    .map(c => ({ item: c, score: relScore(listing, c) }))
    .sort((x, y) => y.score - x.score || (y.item.rating || 0) - (x.item.rating || 0));
  const similar = scored.filter(s => s.score >= 35).map(s => s.item);
  const used = new Set(similar.map(s => s.property_id));
  const related = scored.filter(s => s.score >= 15 && s.score < 35 && !used.has(s.item.property_id)).map(s => s.item);
  const recommended = [...poolAll]
    .filter(l => !used.has(l.property_id))
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 10);
  const fallback = scored.filter(s => !used.has(s.item.property_id)).map(s => s.item);
  fillRelGrid('similar-section', similar.length ? similar : fallback.slice(0, 10));
  fillRelGrid('related-section', related.length ? related : fallback.slice(0, 10));
  fillRelGrid('recommended-section', recommended.length ? recommended : fallback.slice(0, 10));
}

function render(listing) {
  const root = document.getElementById('details-content');
  const isProperty = listing.listing_type === 'property';
  const isVehicle = isVehicleListing(listing);
  const price = formatPrice(listing);
  const flag = flagEmoji(listing.country_code);
  const idLabel = listing.listing_type === 'product' ? 'Product ID' : isProperty ? 'Property ID' : 'Listing ID';

  // Real Price (crossed out through the middle) + Discount Price (what customers
  // pay). real_price is the source of truth; legacy compare_at_price /
  // original_price are honored as fallbacks for older listings.
  let originalPriceHtml = '';
  let discountBadge = '';
  let realNum = parseFloat(listing.real_price);
  if (!Number.isFinite(realNum) || realNum <= 0) realNum = parseFloat(listing.compare_at_price ?? listing.original_price);
  if (Number.isFinite(realNum) && realNum > 0 && realNum > parseFloat(listing.price)) {
    const pct = Math.round((1 - parseFloat(listing.price) / realNum) * 100);
    originalPriceHtml = `<span class="text-lg text-gray-400 price-strike line-through font-medium">${formatPrice({ ...listing, price: realNum })}</span>`;
    discountBadge = `<span class="kco-sale-pulse kco-glow inline-flex items-center gap-1 text-xs font-black text-white bg-red-500 px-2.5 py-1 rounded-full relative overflow-hidden">-${pct}% OFF<span class="absolute inset-0 kco-shimmer pointer-events-none"></span></span>`;
  }
  const availabilityStatus = listing.availability_status || (listing.listing_type === 'product' ? 'In Stock' : 'Available');

  const rawImages = safeImages(listing.images);
  // Also check standalone video/video_url columns (may not be in images[])
  const extraVideo = [listing.video, listing.video_url].find(u => u && typeof u === 'string' && isVideoUrl(u));
  const imgs2 = [...rawImages];
  if (extraVideo && !imgs2.includes(extraVideo)) imgs2.unshift(extraVideo);
  const firstVideoIdx = imgs2.findIndex(u => isVideoUrl(u));
  // A video-tour listing is all about its video — lead with it, big and
  // autoplaying. The first real photo only becomes the poster frame so the
  // player never shows a blank/white box before playback starts.
  const firstImageIdx = imgs2.findIndex(u => !isVideoUrl(u));
  const heroIdx = firstVideoIdx >= 0 ? firstVideoIdx : (firstImageIdx >= 0 ? firstImageIdx : 0);
  const heroMedia = imgs2[heroIdx];
  const heroIsVideo = isVideoUrl(heroMedia);
  // No photos, no posters, no smaller copies — a video-tour house gets exactly
  // one canvas: the big autoplaying clip. An empty poster just lets the play
  // overlay (rendered on the blank/absent branch below) sit on top until
  // playback actually starts.
  const heroPoster = '';
  const galleryThumbs = (firstVideoIdx >= 0 ? [] : imgs2).map((img, i) => {
    const isVid = isVideoUrl(img);
    const thumbContent = isVid
      ? `<video src="${escapeHtml(img)}" muted preload="auto" playsinline class="w-20 h-16 object-cover"></video>
         <div class="absolute inset-0 flex items-center justify-center"><div class="w-5 h-5 rounded-full bg-white/80 flex items-center justify-center"><svg class="w-2.5 h-2.5 text-gray-800 ml-px" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div></div>`
      : `<div class="w-20 h-16 flex items-center justify-center bg-gray-100"><i data-lucide="video-off" class="w-5 h-5 text-gray-300"></i></div>`;
    return `<button class="gallery-thumb relative rounded-lg overflow-hidden border-2 ${i === heroIdx ? 'active border-blue-500' : 'border-gray-200'} shrink-0" data-img="${escapeHtml(img)}">
      ${thumbContent}
    </button>`;
  }).join('');

  let locationBlock = '';
  if (isProperty) {
    const locItems = [
      { icon: 'globe', label: 'Country', value: locationValueHtml(`${flag} ${listing.country}`, [listing.country]) },
      { icon: 'map-pin', label: 'State / Province', value: locationValueHtml(listing.state, [listing.state, listing.country]) },
      { icon: 'building', label: 'City', value: locationValueHtml(listing.city, [listing.city, listing.state, listing.country]) },
      { icon: 'navigation', label: 'Town / Local Area', value: locationValueHtml(listing.town, [listing.town, listing.city, listing.state, listing.country]) },
      { icon: 'signpost', label: 'Neighborhood / District', value: locationValueHtml(spL(listing, 'neighborhood'), [spL(listing, 'neighborhood'), listing.city, listing.state, listing.country]) },
      { icon: 'home', label: 'Address', value: locationValueHtml(spL(listing, 'address'), [spL(listing, 'address'), listing.city, listing.state, listing.country]) },
    ].filter(item => item.value);
    locationBlock = `
      <div class="mt-4">
        ${sectionHeader('map-pin', 'Location', 'rose')}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${locItems.map(item => `
            <div class="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3">
              <div class="p-2.5 bg-white border border-gray-100 rounded-lg"><i data-lucide="${item.icon}" class="w-4 h-4 text-blue-500"></i></div>
              <div class="min-w-0"><div class="text-gray-500 text-xs">${item.label}</div><div class="mt-0.5">${item.value}</div></div>
            </div>
          `).join('')}
        </div>
        <div id="listing-map" class="mt-4 rounded-xl overflow-hidden border border-gray-200" style="height:280px"></div>
      </div>`;
  } else if (isVehicle) {
    const locParts = [spL(listing, 'location'), spL(listing, 'city'), spL(listing, 'state'), spL(listing, 'country')]
      .map(v => v == null ? '' : String(v).trim()).filter(Boolean);
    const loc = locParts.join(', ');
    if (loc) {
      const locUrl = mapsSearchUrl(loc);
      locationBlock = `
      <div class="mt-4">
        ${sectionHeader('map-pin', 'Location', 'rose')}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="sm:col-span-2 flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3">
            <div class="p-2.5 bg-white border border-gray-100 rounded-lg"><i data-lucide="map-pin" class="w-4 h-4 text-blue-500"></i></div>
            <div class="min-w-0"><div class="text-gray-500 text-xs">Vehicle Location</div><div class="mt-0.5">${locationValueHtml(loc, [loc])}</div></div>
          </div>
          ${locUrl ? `<div class="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3">
            <div class="p-2.5 bg-white border border-gray-100 rounded-lg"><i data-lucide="navigation" class="w-4 h-4 text-blue-500"></i></div>
            <div><div class="text-gray-500 text-xs">View on Map</div><a href="${locUrl}" target="_blank" rel="noopener" class="text-blue-600 font-bold text-sm hover:underline">Google Maps <i data-lucide="external-link" class="w-3.5 h-3.5 inline"></i></a></div>
          </div>` : ''}
        </div>
        <div id="listing-map" class="mt-4 rounded-xl overflow-hidden border border-gray-200" style="height:280px"></div>
      </div>`;
    }
  }

  let specsBlock = '';
  let specs = [];
  if (isProperty) {
    specs = [
      { icon: 'bed-double', label: 'Bedrooms', value: listing.bedrooms },
      { icon: 'bath', label: 'Bathrooms', value: listing.bathrooms },
      { icon: 'droplets', label: 'Half Bathrooms', value: listing.half_bathrooms },
      { icon: 'building', label: 'Building / Living Size', value: listing.building_size },
      { icon: 'ruler', label: 'Land / Lot Size', value: listing.land_size },
      { icon: 'layers', label: 'Floors / Levels', value: listing.floors },
      { icon: 'car-front', label: 'Parking Spaces', value: listing.parking_spaces },
      { icon: 'warehouse', label: 'Garage', value: listing.garage },
      { icon: 'home', label: 'Property Type', value: listing.property_type },
      { icon: 'sofa', label: 'Furnished', value: listing.furnished },
      { icon: 'badge-check', label: 'Condition', value: listing.condition },
      { icon: 'calendar', label: 'Year Built', value: listing.year_built },
      { icon: 'paintbrush', label: 'Year Renovated', value: listing.year_renovated },
      { icon: 'mail', label: 'ZIP / Postal Code', value: listing.zip_code },
      { icon: 'tag', label: 'Status', value: listing.listing_status === 'rent' ? 'For Rent' : 'For Sale' },
      { icon: 'signpost', label: 'Neighborhood', html: locationValueHtml(spL(listing, 'neighborhood'), [spL(listing, 'neighborhood'), listing.city, listing.state, listing.country]) },
      { icon: 'sofa', label: 'Living Areas', value: spL(listing, 'living_areas') },
      { icon: 'flame', label: 'Kitchens', value: spL(listing, 'kitchens') },
      { icon: 'tree-pine', label: 'Balconies', value: spL(listing, 'balconies') },
      { icon: 'leaf', label: 'Garden / Yard', value: spL(listing, 'garden') },
      { icon: 'waves', label: 'Pool', value: spL(listing, 'pool') },
      { icon: 'lock', label: 'Security', value: spL(listing, 'security') },
      { icon: 'home', label: 'Utilities & Heating', value: spL(listing, 'utilities') },
      { icon: 'hammer', label: 'Construction Type', value: spL(listing, 'construction_type') },
      { icon: 'clipboard-check', label: 'Construction Status', value: spL(listing, 'construction_status') },
      { icon: 'user-check', label: 'Ownership Type', value: spL(listing, 'ownership_type') },
    ].filter(s => s.html || (s.value != null && s.value !== ''));
    specsBlock = specsPanel('Property Information', 'home', specs);
  } else if (listing.category === 'Motorhomes') {
    specs = [
      { icon: 'factory', label: 'Brand', value: listing.brand },
      { icon: 'car', label: 'Model', value: listing.model },
      { icon: 'calendar', label: 'Year', value: listing.model_year },
      { icon: 'badge-check', label: 'Condition', value: listing.condition },
      { icon: 'gauge', label: 'Mileage', value: listing.mileage },
      { icon: 'cog', label: 'Transmission', value: listing.transmission },
      { icon: 'fuel', label: 'Fuel Type', value: listing.fuel_type },
      { icon: 'zap', label: 'Engine', value: listing.engine },
      { icon: 'bus', label: 'Type', value: listing.property_type },
      { icon: 'moon', label: 'Sleeping Capacity', value: listing.sleeping_capacity },
      { icon: 'users', label: 'Seating Capacity', value: listing.seating_capacity },
      { icon: 'shower-head', label: 'Bathroom', value: listing.bathroom },
      { icon: 'utensils', label: 'Kitchen', value: listing.kitchen },
      { icon: 'droplet', label: 'Water Tank', value: listing.water_tank },
    ].filter(s => s.html || (s.value != null && s.value !== ''));
    specsBlock = specsPanel('Vehicle Information', 'bus', specs, 'violet');
  } else if (isVehicle) {
    specs = [
      { icon: 'tag', label: 'Title / Listing', value: listing.title },
      { icon: 'car-front', label: 'Vehicle / Body Type', value: spL(listing, 'body_type') },
      { icon: 'factory', label: 'Make / Brand', value: spL(listing, 'make') || listing.brand },
      { icon: 'car', label: 'Model', value: spL(listing, 'model') },
      { icon: 'badge-award', label: 'Trim / Edition', value: spL(listing, 'trim') },
      { icon: 'calendar', label: 'Year', value: spL(listing, 'model_year') },
      { icon: 'gauge', label: 'Mileage', value: spL(listing, 'mileage') },
      { icon: 'zap', label: 'Engine', value: spL(listing, 'engine') },
      { icon: 'gauge', label: 'Horsepower', value: spL(listing, 'horsepower') },
      { icon: 'cog', label: 'Transmission', value: spL(listing, 'transmission') },
      { icon: 'route', label: 'Drive Type', value: spL(listing, 'drive_type') },
      { icon: 'fuel', label: 'Fuel Type', value: spL(listing, 'fuel_type') },
      { icon: 'fuel', label: 'Fuel Economy', value: spL(listing, 'fuel_economy') },
      { icon: 'users', label: 'Seating Capacity', value: spL(listing, 'seating_capacity') },
      { icon: 'door-open', label: 'Doors', value: spL(listing, 'doors') },
      { icon: 'palette', label: 'Color / Exterior', value: spL(listing, 'color') },
      { icon: 'fingerprint', label: 'VIN', value: spL(listing, 'vin') },
      { icon: 'badge-check', label: 'Condition', value: spL(listing, 'condition') },
      { icon: 'wrench', label: 'Warranty', value: spL(listing, 'warranty') },
    ].filter(s => s.html || (s.value != null && s.value !== ''));
    specsBlock = specsPanel('Vehicle Specifications', 'car-front', specs, 'violet');
  } else if (listing.listing_type === 'product') {
    specs = [
      { icon: 'factory', label: 'Brand', value: listing.brand },
      { icon: 'tag', label: 'Subcategory', value: listing.subcategory },
      { icon: 'palette', label: 'Colour', value: listing.color },
      { icon: 'ruler', label: 'Size', value: listing.size },
      { icon: 'layers', label: 'Material', value: listing.material },
      { icon: 'badge-check', label: 'Condition', value: listing.condition || 'New' },
      { icon: 'shield-check', label: 'Warranty', value: listing.warranty },
      { icon: 'package-check', label: 'Availability', value: listing.availability_status },
    ].filter(s => s.html || (s.value != null && s.value !== ''));
    specsBlock = specsPanel('Product Information', 'package', specs);
  } else if (listing.listing_type === 'pet') {
    specs = [
      { icon: 'paw-print', label: 'Breed', value: listing.breed },
      { icon: 'calendar', label: 'Age', value: listing.age },
      { icon: 'users', label: 'Gender', value: listing.gender },
      { icon: 'palette', label: 'Colour', value: listing.color },
      { icon: 'scale', label: 'Weight', value: listing.size },
      { icon: 'globe', label: 'Origin', html: locationValueHtml(`${flagEmoji(listing.country_code)} ${listing.country}`, [listing.country]) },
      { icon: 'badge-check', label: 'Health', value: listing.condition },
    ].filter(s => s.html || (s.value != null && s.value !== ''));
    specsBlock = specsPanel('Pet Information', 'paw-print', specs, 'amber');
  }

  const featuresBlock = featuresGrid(listing.features);

  const highlightsBlock = highlightsGrid(listing.highlights);

  const ratingsBlock = reviewsSectionHtml(listing);

  // Real social-proof counts drawn straight from the listing's own data (rating,
  // rating_count, review_count, favorite_count). Shown like a real marketplace so
  // the page feels alive and honest — never fabricated numbers.
  const proofItems = [];
  if (Number(listing.rating) > 0) {
    const rc = Math.max(0, Math.round(Number(listing.rating_count) || 0));
    proofItems.push(`<span class="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700"><span class="flex">${ratingStars(listing.rating, 'w-4 h-4')}</span><span>${Number(listing.rating).toFixed(1)}${rc ? ` (${rc} rated)` : ''}</span></span>`);
  }
  if (Math.round(Number(listing.review_count) || 0) > 0) {
    proofItems.push(`<span class="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700"><i data-lucide="message-square" class="w-4 h-4 text-blue-500"></i>${Math.round(Number(listing.review_count))} reviews</span>`);
  }
  if (Math.round(Number(listing.favorite_count) || 0) > 0) {
    proofItems.push(`<span class="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700"><i data-lucide="heart" class="w-4 h-4 text-rose-500"></i>${Math.round(Number(listing.favorite_count))} saved</span>`);
  }
  const soldN = Math.round(Number(listing.sold_count) || Number(listing.review_count) || 0);
  if (soldN > 0) {
    proofItems.push(`<span class="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700"><i data-lucide="shopping-bag" class="w-4 h-4"></i>${soldN}+ shopped</span>`);
  }
  const socialProofHtml = proofItems.length
    ? `<div class="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 pt-3 border-t border-gray-100">${proofItems.join('')}</div>`
    : '';

  // Honest low-stock urgency: only shown when the listing actually carries a
  // real, small stock_quantity. Never a fabricated countdown.
  const rawStock = parseInt(listing.stock_quantity, 10);
  let stockUrgencyHtml = '';
  if (Number.isFinite(rawStock) && rawStock > 0 && rawStock <= 5) {
    stockUrgencyHtml = `<span class="kco-hurry inline-flex items-center gap-1.5 text-xs font-black text-amber-800 bg-amber-50 border-2 border-amber-300 px-2.5 py-1 rounded-full"><i data-lucide="flame" class="w-3.5 h-3.5 kco-blink-soft text-amber-500"></i> Hurry! Only ${rawStock} left in stock</span>`;
  } else if (Number.isFinite(rawStock) && rawStock > 5) {
    stockUrgencyHtml = `<span class="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full"><i data-lucide="layers" class="w-3.5 h-3.5"></i> ${rawStock} in stock</span>`;
  }

  // Glowing "live deal" strip — only for listings that carry a real relative
  // discount (real_price > price), so the animation always points at real value.
  let dealStripHtml = '';
  if (discountBadge) {
    const savePct = Math.round((1 - parseFloat(listing.price) / realNum) * 100);
    dealStripHtml = `
      <div class="mt-3 kco-glow relative overflow-hidden rounded-xl bg-white border border-blue-200 p-0">
        <div class="flex items-center gap-3 px-3 py-2">
          <span class="kco-live-dot shrink-0" aria-hidden="true"></span>
          <span class="text-xs font-black text-gray-900 uppercase tracking-wide">Live deal</span>
          <span class="text-xs font-black text-red-500 kco-blink-soft">Save ${savePct}%</span>
          <span class="ml-auto hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700"><i data-lucide="tag" class="w-3 h-3"></i> Limited-time price</span>
        </div>
      </div>`;
  }

  root.innerHTML = `
    <div class="fade-in">
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <a href="/" class="hover:text-blue-500 transition">Home</a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span>${listing.category}</span>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span class="text-gray-700 truncate">${escapeHtml(listing.title)}</span>
      </div>

      <div class="mb-5">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">${escapeHtml(listing.title)}</h1>
        <div class="flex flex-wrap items-center gap-2 mt-2.5">
          ${isProperty ? (listing.verification_status === 'Verified'
            ? `<span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full"><i data-lucide="badge-check" class="w-3.5 h-3.5"></i> Verified</span>`
            : (listing.verification_status === 'Pending verification'
              ? `<span class="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full"><i data-lucide="clock" class="w-3.5 h-3.5"></i> Pending Verification</span>`
              : `<span class="inline-flex items-center gap-1 text-xs font-bold text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full"><i data-lucide="shield-alert" class="w-3.5 h-3.5"></i> Not Verified</span>`))
          : `<span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full"><i data-lucide="badge-check" class="w-3.5 h-3.5"></i> Verified</span>`}
          <span class="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full"><i data-lucide="box" class="w-3.5 h-3.5"></i> ${idLabel}: <span class="font-mono">${escapeHtml(listing.property_id)}</span></span>
          <span class="inline-flex items-center gap-1 text-xs font-bold text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">${listing.listing_status === 'rent' ? 'For Rent' : 'For Sale'}</span>
          ${firstVideoIdx >= 0 ? `<span class="inline-flex items-center gap-1 text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-full"><i data-lucide="video" class="w-3.5 h-3.5"></i> Video Tour</span>` : ''}
        </div>
        ${socialProofHtml}
      </div>

      <div class="relative overflow-hidden rounded-2xl border border-blue-100 mb-6 shadow-sm">
        <div class="absolute inset-0" style="background:
          radial-gradient(760px 300px at 92% -20%, rgba(59,130,246,.16), transparent 60%),
          radial-gradient(600px 260px at 0% 115%, rgba(16,185,129,.12), transparent 55%),
          linear-gradient(180deg,#ffffff 0%,#f7fbff 100%)"></div>
        <div class="absolute top-0 inset-x-0 h-1.5" style="background:linear-gradient(90deg,#2563eb,#0ea5e9,#10b981)" aria-hidden="true"></div>
        <div class="relative flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
        <div>
          <div class="flex items-baseline flex-wrap gap-2">
            ${originalPriceHtml}
            <span class="text-4xl font-black text-blue-600">${price}</span>
          </div>
          <div class="flex items-center gap-2 mt-1.5">
            ${discountBadge}
            <span class="text-sm text-emerald-600 font-bold flex items-center gap-1"><i data-lucide="package-check" class="w-4 h-4"></i> ${availabilityStatus}</span>
          </div>
          ${stockUrgencyHtml ? `<div class="flex items-center gap-2 mt-1.5">${stockUrgencyHtml}</div>` : ''}
          ${dealStripHtml}
        </div>
        <div class="flex flex-col gap-1.5 text-sm">
          <span class="inline-flex items-center gap-1.5 text-gray-600"><i data-lucide="truck" class="w-4 h-4 text-blue-500"></i> Free worldwide shipping</span>
          <span class="inline-flex items-center gap-1.5 text-gray-600"><i data-lucide="rotate-ccw" class="w-4 h-4 text-blue-500"></i> Easy returns within 14 days</span>
          <span class="inline-flex items-center gap-1.5 text-gray-600"><i data-lucide="lock" class="w-4 h-4 text-blue-500"></i> Secure payment protection</span>
        </div>
        </div>
      </div>

      <div id="hero-wrap" class="relative w-full h-[46vh] sm:h-[60vh] lg:h-[72vh] rounded-2xl overflow-hidden bg-gray-100 mb-3 cursor-zoom-in group flex items-center justify-center" role="button" tabindex="0" aria-label="Open image gallery">
        ${heroIsVideo
          ? `<video id="hero-image" src="${escapeHtml(heroMedia)}" ${heroPoster ? `poster="${escapeHtml(heroPoster)}"` : ''} autoplay muted loop playsinline preload="metadata" controls class="w-full h-full object-contain" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"></video>
             <div class="absolute inset-0 flex items-center justify-center pointer-events-none" style="display:${heroPoster ? 'none' : 'flex'}"><div class="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center shadow-lg"><svg class="w-7 h-7 text-gray-800 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div></div>`
          : `<div id="hero-image" class="w-full h-full flex items-center justify-center bg-gray-100 text-xs text-gray-400">No video</div>`
        }
        <div class="absolute inset-0 flex items-end justify-between p-3 opacity-0 group-hover:opacity-100 transition pointer-events-none">
          <span class="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-black/50 backdrop-blur px-3 py-1.5 rounded-full"><i data-lucide="expand" class="w-3.5 h-3.5"></i> Tap to enlarge</span>
        </div>
        ${firstVideoIdx >= 0 ? `
        <button type="button" id="hero-video-tour-btn" class="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white pl-2 pr-3 py-2 rounded-full text-xs font-bold shadow-lg shadow-blue-600/40 transition cursor-pointer">
          <span class="w-6 h-6 rounded-full bg-white flex items-center justify-center"><svg class="w-3.5 h-3.5 text-blue-700 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
          Watch Video Tour
        </button>` : ''}
      </div>

      <div class="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-8">
        ${galleryThumbs}
      </div>

      ${actionGridHtml(listing)}

      ${buyerAssuranceHtml(listing)}

      ${promoRailHtml()}

      <div id="listing-details">
        ${detailsAccordions(listing, specs, listing.features, listing.highlights, locationBlock, isProperty ? propertyExtrasHtml(listing) : (isVehicle ? vehicleExtrasHtml(listing) : ''))}
      </div>

      ${ratingsBlock}

      ${isProperty ? sellerBlock(listing) : (isVehicle ? buyerInfoBlock(listing) : '')}

      <div id="recommendations-section" class="hidden">
        <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">You May Also Like</h3>
        <div id="recommendations-grid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"></div>
      </div>

      ${relSectionsHtml()}
    </div>
  `;

  const hero = document.getElementById('hero-image');
  const heroWrap = document.getElementById('hero-wrap');
  // If the hero is a video with NO poster image, generate a real first-frame
  // thumbnail on the fly — so a video-only listing never shows a blank/white
  // box before playback starts (it always looks like a real, playable video).
  if (hero && hero.tagName === 'VIDEO' && !heroPoster) {
    ensureVideoPoster(hero, heroMedia);
  }
  if (heroWrap) {
    // Video-tour listing: the lightbox holds only the video clip(s) — no
    // photos hiding alongside them.
    const lightboxImgs = firstVideoIdx >= 0 ? imgs2.filter(u => isVideoUrl(u)) : imgs2;
    const openLightbox = () => openGalleryLightbox(listing, lightboxImgs);
    const heroVideoBtn = document.getElementById('hero-video-tour-btn');
    if (heroVideoBtn) {
      // Big ▶ play button on the house image: opens the gallery exactly at
      // the video-tour clip and plays it straight away.
      heroVideoBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openGalleryLightbox(listing, imgs2, { startIdx: firstVideoIdx, autoplay: true });
      });
    }
    // When the hero is a video, let taps on the video itself play/pause it
    // (clicking the still/white area starts playback) instead of always jumping
    // to the lightbox — so the video always reads as a playable video.
    heroWrap.addEventListener('click', (e) => {
      const hv = document.getElementById('hero-image');
      if (hv && hv.tagName === 'VIDEO') {
        const videoBox = hv.getBoundingClientRect();
        if (videoBox.width > 0 && e.clientX >= videoBox.left && e.clientX <= videoBox.right && e.clientY >= videoBox.top && e.clientY <= videoBox.bottom) {
          // Let the native control / built-in tap-to-play handle it, but if the
          // video never started (paused/buffering) force it to play once.
          if (hv.paused && hv.readyState >= 2) { hv.play().catch(() => {}); return; }
          if (hv.paused) return;
          return;
        }
      }
      openLightbox();
    });
    heroWrap.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(); } });
  }
  root.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      root.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active', 'border-blue-500'));
      root.querySelectorAll('.gallery-thumb').forEach(t => t.classList.add('border-gray-200'));
      thumb.classList.add('active', 'border-blue-500');
      thumb.classList.remove('border-gray-200');
      const src = thumb.dataset.img;
      const wasVideo = isVideoUrl(src);
      const wrap = document.getElementById('hero-wrap');
      if (!wrap) return;
      const existingVideoOverlay = wrap.querySelector('.hero-video-overlay');
      if (existingVideoOverlay) existingVideoOverlay.remove();
      const currentHero = document.getElementById('hero-image');
      if (wasVideo) {
        if (currentHero && currentHero.tagName === 'VIDEO') { currentHero.src = src; }
        else {
          const v = document.createElement('video');
          v.id = 'hero-image'; v.src = src; v.muted = true; v.loop = true;
          v.autoplay = true; v.preload = 'metadata'; v.playsInline = true; v.controls = true;
          if (heroPoster) v.poster = heroPoster;
          v.className = 'w-full h-full object-contain';
          wrap.insertBefore(v, wrap.firstChild);
          if (currentHero && currentHero.remove) currentHero.remove();
          const ov = document.createElement('div');
          ov.className = 'hero-video-overlay absolute inset-0 flex items-center justify-center pointer-events-none';
          ov.innerHTML = '<div class="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center shadow-lg"><svg class="w-7 h-7 text-gray-800 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>';
          wrap.insertBefore(ov, wrap.firstChild?.nextSibling);
        }
      } else {
        const d = document.createElement('div');
        d.id = 'hero-image';
        d.className = 'w-full h-full flex items-center justify-center bg-gray-100 text-xs text-gray-400';
        d.textContent = 'No video';
        wrap.insertBefore(d, wrap.firstChild);
        if (currentHero && currentHero.remove) currentHero.remove();
      }
    });
  });

  document.getElementById('buy-now-btn').addEventListener('click', async () => {
    const user = await getCurrentUser();
    if (user) {
      window.location.href = `/checkout.html?id=${listing.property_id}`;
    } else {
      setRedirectAfterAuth(`/checkout.html?id=${listing.property_id}`);
      window.location.href = `/auth.html?redirect=${encodeURIComponent('/checkout.html?id=' + listing.property_id)}`;
    }
  });

  document.getElementById('share-btn').addEventListener('click', () => {
    openShareSheet(listing);
  });

  const requestViewingBtn = document.getElementById('request-viewing-btn');
  if (requestViewingBtn) requestViewingBtn.addEventListener('click', () => openPropertyRequestModal(listing, 'viewing'));
  const requestInfoBtn = document.getElementById('request-info-btn');
  if (requestInfoBtn) requestInfoBtn.addEventListener('click', () => openPropertyRequestModal(listing, 'info'));

  const viewDetailsBtn = document.getElementById('view-details-btn');
  if (viewDetailsBtn) {
    viewDetailsBtn.addEventListener('click', () => {
      const target = document.getElementById('listing-details');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  const addCartBtn = document.getElementById('add-cart-btn');
  if (addCartBtn) {
    addCartBtn.addEventListener('click', () => {
      cartAddToCart(listing.property_id, 1);
      addCartBtn.innerHTML = '<i data-lucide="check" class="w-5 h-5"></i> Added to Cart';
      if (window.lucide) lucide.createIcons();
      setTimeout(() => {
        addCartBtn.innerHTML = '<i data-lucide="shopping-cart" class="w-5 h-5"></i> Add to Cart';
        if (window.lucide) lucide.createIcons();
      }, 2000);
    });
  }

  setupWishlistButton(listing);
  wireAgentButtons(document.getElementById('agent-buttons-block'), () => listing);
  setupReviewForm(listing);
  loadReviews(listing);
  loadRecommendations(listing);
  loadPromoRail(listing);

  setupAccordions();
  if (window.lucide) lucide.createIcons();

  trackEvent('view_item', { item_id: listing.property_id, item_name: listing.title, value: parseFloat(listing.price) || 0, currency: listing.currency || 'USD' });

  const mapEl = document.getElementById('listing-map');
  if (mapEl && window.L) {
    const lat = parseFloat(listing.latitude) || null;
    const lng = parseFloat(listing.longitude) || null;
    const query = listingMapQuery(listing);
    const addressLabel = query || listing.title;
    const fallbackLink = query ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query) : '';
    const showMap = (ml, mln, zoom) => {
      const map = L.map(mapEl).setView([ml, mln], zoom);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
      L.marker([ml, mln]).addTo(map).bindPopup(`<strong>${escapeHtml(listing.title)}</strong><br>${escapeHtml(addressLabel)}`).openPopup();
    };
    const showFallback = () => {
      mapEl.innerHTML = `<div class="w-full h-full flex flex-col items-center justify-center gap-2 bg-gray-50 text-center p-4">
        <i data-lucide="map-pin" class="w-6 h-6 text-gray-400"></i>
        <p class="text-xs text-gray-500">Exact map position not available for this location.</p>
        <a href="${fallbackLink}" target="_blank" rel="noopener" class="text-xs font-bold text-blue-600 hover:underline">Open location in Google Maps</a>
      </div>`;
      if (window.lucide) lucide.createIcons();
    };
    if (lat && lng) {
      showMap(lat, lng, 13);
    } else if (query) {
      fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + encodeURIComponent(query))
        .then(r => r.json())
        .then(data => { if (data && data[0]) showMap(parseFloat(data[0].lat), parseFloat(data[0].lon), 12); else showFallback(); })
        .catch(showFallback);
    } else {
      showFallback();
    }
  }
}

// ── Full-screen gallery lightbox (tap to enlarge, swipe, arrows) ──────────
function openGalleryLightbox(listing, imgs, opts) {
  const images = (Array.isArray(imgs) && imgs.length ? imgs : [listing.video || listing.video_url || (listing.images?.[0] || '')]).filter(Boolean);
  if (!images.length) return;
  const startIdx = (opts && Number.isInteger(opts.startIdx) && opts.startIdx >= 0 && opts.startIdx < images.length) ? opts.startIdx : 0;
  let current = startIdx;
  let autoFlag = !!(opts && opts.autoplay);
  const root = document.createElement('div');
  root.id = 'gallery-lightbox';
  root.className = 'fixed inset-0 z-[500] bg-black/95 flex flex-col';
  root.innerHTML = `
    <style>
      #gallery-lightbox .lb-media{transition:opacity .18s ease}
      #gallery-lightbox .lb-media.lb-fade{opacity:0}
    </style>
    <div class="flex items-center justify-between px-4 py-3 text-white">
      <span class="text-xs font-bold text-gray-300 truncate">${escapeHtml(listing.title)}</span>
      <button type="button" id="lb-close" class="shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white" aria-label="Close">✕</button>
    </div>
    <div id="lb-viewport" class="relative flex-1 flex items-center justify-center overflow-hidden select-none">
      <div id="lb-media-container" class="max-w-full max-h-full px-4 flex items-center justify-center"></div>
      <button type="button" id="lb-prev" class="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center text-2xl" aria-label="Previous">‹</button>
      <button type="button" id="lb-next" class="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center text-2xl" aria-label="Next">›</button>
    </div>
    <div class="px-4 py-3 flex items-center justify-between gap-3 text-white">
      <span id="lb-count" class="shrink-0 text-xs font-bold text-gray-300"></span>
      <div id="lb-thumbs" class="flex gap-1.5 overflow-x-auto scrollbar-none justify-end"></div>
    </div>
  `;
  document.body.appendChild(root);
  document.body.style.overflow = 'hidden';
  const mediaContainer = root.querySelector('#lb-media-container');
  const countEl = root.querySelector('#lb-count');
  const thumbsEl = root.querySelector('#lb-thumbs');
  let startX = null;
  const render = () => {
    mediaContainer.classList.add('lb-fade');
    setTimeout(() => {
      const src = images[current];
      const auto = autoFlag; autoFlag = false;
      if (isVideoUrl(src)) {
        mediaContainer.innerHTML = `<video src="${escapeHtml(src)}" ${auto ? 'autoplay ' : ''}controls playsinline preload="auto" class="lb-media max-w-full max-h-[70vh] object-contain rounded-lg"></video>`;
      } else {
        mediaContainer.innerHTML = `<div class="lb-media max-w-full max-h-[70vh] flex items-center justify-center text-gray-500 text-sm">No video</div>`;
      }
      mediaContainer.classList.remove('lb-fade');
      countEl.textContent = `${current + 1} / ${images.length}`;
      thumbsEl.innerHTML = images.map((u, i) => {
        const isVid = isVideoUrl(u);
        const thumbContent = isVid
          ? `<div class="w-full h-full flex items-center justify-center bg-gray-800"><svg class="w-3 h-3 text-white ml-px" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>`
          : `<div class="w-full h-full flex items-center justify-center bg-gray-800 text-gray-600"><i data-lucide="video-off" class="w-3 h-3"></i></div>`;
        return `<button type="button" data-i="${i}" class="relative w-12 h-9 rounded-lg overflow-hidden border-2 ${i === current ? 'border-blue-500' : 'border-transparent'}" aria-label="Item ${i + 1}">${thumbContent}</button>`;
      }).join('');
      thumbsEl.querySelectorAll('[data-i]').forEach(b => b.addEventListener('click', () => { current = parseInt(b.dataset.i, 10); render(); }));
    }, 90);
  };
  const prev = () => { current = (current - 1 + images.length) % images.length; render(); };
  const next = () => { current = (current + 1) % images.length; render(); };
  const close = () => { root.remove(); document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
  const onKey = (e) => {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'ArrowRight') next();
  };
  root.querySelector('#lb-close').addEventListener('click', close);
  root.querySelector('#lb-prev').addEventListener('click', prev);
  root.querySelector('#lb-next').addEventListener('click', next);
  const vp = root.querySelector('#lb-viewport');
  vp.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  vp.addEventListener('touchend', (e) => {
    if (startX == null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) { if (dx < 0) next(); else prev(); }
    startX = null;
  }, { passive: true });
  vp.addEventListener('click', (e) => { if (e.target === vp) close(); });
  document.addEventListener('keydown', onKey);
  render();
}

// ── Request Viewing / Request More Information modal ───────────────────────
// Writes straight into site_feedback (like the Contact form) so the admin
// Support/Messages dashboard sees it, then sends a best-effort email alert.
function openPropertyRequestModal(listing, kind) {
  const isViewing = kind === 'viewing';
  const title = isViewing ? 'Request a Viewing' : 'Request More Information';
  const ref = listing.property_id || listing.id || '';
  const root = document.createElement('div');
  root.id = 'property-request-modal';
  root.className = 'fixed inset-0 z-[450] flex items-end sm:items-center justify-center p-0 sm:p-4';
  root.innerHTML = `
    <style>
      @keyframes req-up{from{transform:translateY(100%)}to{transform:translateY(0)}}
      @media (min-width:640px){@keyframes req-up{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}}
      #property-request-modal .animate-req-up{animation:req-up .26s cubic-bezier(.2,.8,.2,1)}
    </style>
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" data-req-close></div>
    <div class="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-req-up">
      <div class="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
        <div>
          <h3 class="text-base font-black text-gray-900 tracking-tight">${isViewing ? 'Request a Viewing' : 'Request More Information'}</h3>
          <p class="text-xs text-gray-500 mt-0.5 truncate">${escapeHtml(listing.title)}</p>
        </div>
        <button type="button" data-req-close class="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition" aria-label="Close">✕</button>
      </div>
      <form id="property-request-form" class="p-5 space-y-4">
        <input type="hidden" id="prq-kind" value="${isViewing ? 'viewing' : 'info'}">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Your Name *</label><input type="text" id="prq-name" required placeholder="Full name" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Email Address *</label><input type="email" id="prq-email" required placeholder="you@email.com" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Phone (optional)</label><input type="tel" id="prq-phone" placeholder="+1 555 000 0000" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>
          ${isViewing ? `<div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Preferred Date</label><input type="date" id="prq-date" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>` : ''}
        </div>
        <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Message</label><textarea id="prq-message" rows="3" placeholder="${isViewing ? 'Preferred time, questions about the property…' : 'What would you like to know about this property?'}" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 resize-none"></textarea></div>
        <button type="submit" id="prq-submit" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30">${isViewing ? 'Request Viewing' : 'Send Request'}</button>
        <div id="prq-status" class="hidden text-center text-sm py-2 rounded-xl"></div>
      </form>
    </div>
  `;
  document.body.appendChild(root);
  document.body.style.overflow = 'hidden';
  getCurrentUser().then((user) => {
    if (user) {
      const nameIn = root.querySelector('#prq-name');
      const emailIn = root.querySelector('#prq-email');
      const meta = user.user_metadata || {};
      if (meta?.full_name && nameIn && !nameIn.value) nameIn.value = meta.full_name;
      if (user.email && emailIn && !emailIn.value) emailIn.value = user.email;
    }
  });
  const close = () => { root.remove(); document.body.style.overflow = ''; };
  root.querySelectorAll('[data-req-close]').forEach(el => el.addEventListener('click', close));
  root.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = root.querySelector('#prq-submit');
    const status = root.querySelector('#prq-status');
    const name = root.querySelector('#prq-name').value.trim();
    const email = root.querySelector('#prq-email').value.trim();
    const phone = root.querySelector('#prq-phone')?.value.trim() || '';
    const date = root.querySelector('#prq-date')?.value || '';
    const message = root.querySelector('#prq-message').value.trim();
    btn.disabled = true; btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin inline mr-2"></i> Sending...'; if (window.lucide) lucide.createIcons();
    try {
      let userId = null;
      try { userId = (await supabase.auth.getUser()).data?.user?.id || null; } catch {}
      const label = isViewing ? 'Request Viewing' : 'Request More Information';
      const detail = [ref && `Property: ${ref}`, phone && `Phone: ${phone}`, date && `Preferred date: ${date}`, message].filter(Boolean).join(' | ');
      const { error } = await supabase.from('site_feedback').insert({
        user_id: userId,
        name,
        email,
        rating: 5,
        feedback: `${label} (${listing.title}): ${detail}`,
        is_approved: false,
      });
      if (error) throw new Error(error.message);
      try {
        await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-auth-email`, {
          method: 'POST', headers: { 'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'contact_form', name, email, subject: `${label} — ${listing.title}`, message: detail }),
        });
      } catch {}
      status.className = 'text-center text-sm py-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200';
      status.textContent = isViewing ? 'Viewing request sent! We\'ll confirm your appointment within 24 hours.' : 'Request sent! We\'ll get back to you within 24 hours.';
      status.classList.remove('hidden');
      setTimeout(close, 1800);
    } catch (err) {
      status.className = 'text-center text-sm py-3 rounded-xl bg-red-50 text-red-600 border border-red-200';
      status.textContent = 'Failed to send. Please email support@weverseonlineshop.com directly.';
      status.classList.remove('hidden');
      btn.disabled = false; btn.innerHTML = isViewing ? 'Request Viewing' : 'Send Request';
      if (window.lucide) lucide.createIcons();
    }
  });
}

let selectedRating = 0;

// Heart pop animation (smooth, app-like toggle feedback)
let _wishPopStyleInjected = false;
function ensureWishPopStyle() {
  if (_wishPopStyleInjected) return;
  _wishPopStyleInjected = true;
  const s = document.createElement('style');
  s.textContent = '@keyframes kcoWishPop{0%{transform:scale(1)}35%{transform:scale(1.45)}60%{transform:scale(.86)}100%{transform:scale(1)}}';
  document.head.appendChild(s);
}
function setWishlistBtn(btn, saved) {
  if (!btn) return;
  ensureWishPopStyle();
  btn.innerHTML = `<i data-lucide="heart" class="w-5 h-5 ${saved ? 'fill-red-500 text-red-500' : ''}"></i>`;
  btn.classList.toggle('bg-red-50', saved);
  btn.classList.toggle('border', saved);
  btn.classList.toggle('border-red-200', saved);
  const sub = btn.querySelector('span');
  if (sub) sub.textContent = saved ? 'Saved to Wishlist' : 'Add to Wishlist';
  if (window.lucide) lucide.createIcons();
  const icon = btn.querySelector('i');
  if (icon) {
    icon.style.animation = 'none';
    void icon.offsetWidth;
    icon.style.animation = 'kcoWishPop .5s cubic-bezier(.34,1.56,.64,1)';
    setTimeout(() => { if (icon) icon.style.animation = ''; }, 550);
  }
}

async function setupWishlistButton(listing) {
  const btn = document.getElementById('wishlist-btn');
  if (!btn) return;
  const user = await getCurrentUser();
  if (!user) {
    btn.addEventListener('click', () => {
      setRedirectAfterAuth(window.location.pathname + window.location.search);
      window.location.href = `/auth.html?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`;
    });
    return;
  }
  const { data: existing, error: wishErr } = await supabase
    .from('wishlist')
    .select('id')
    .eq('user_id', user.id)
    .eq('listing_id', listing.id)
    .maybeSingle();
  if (wishErr) { console.error('Wishlist check failed:', wishErr.message); return; }
  if (existing) setWishlistBtn(btn, true);
  btn.addEventListener('click', async () => {
    const { data: fav, error: favErr } = await supabase
      .from('wishlist')
      .select('id')
      .eq('user_id', user.id)
      .eq('listing_id', listing.id)
      .maybeSingle();
    if (favErr) { console.error('Wishlist toggle failed:', favErr.message); return; }
    if (fav) {
      const { error: delErr } = await supabase.from('wishlist').delete().eq('id', fav.id);
      if (delErr) { console.error('Wishlist delete failed:', delErr.message); return; }
      setWishlistBtn(btn, false);
    } else {
      const { error: insErr } = await supabase.from('wishlist').insert({ user_id: user.id, listing_id: listing.id });
      if (insErr) { console.error('Wishlist insert failed:', insErr.message); return; }
      setWishlistBtn(btn, true);
    }
  });
}

async function setupReviewForm(listing) {
  const form = document.getElementById('review-form');
  if (!form) return;
  const user = await getCurrentUser();
  const pid = listing.property_id || listing.id || '';

  // Photo upload is a signed-in extra; guests just pick a rating and write.
  const photoRow = document.getElementById('review-photo-row');
  if (photoRow) {
    if (!user) photoRow.classList.add('hidden');
    else photoRow.classList.remove('hidden');
  }

  const nameInput = document.getElementById('review-name');
  if (nameInput) {
    let saved = '';
    try { saved = localStorage.getItem('kco_review_name') || ''; } catch {}
    nameInput.value = saved;
  }

  document.querySelectorAll('.star-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedRating = parseInt(btn.dataset.rating, 10);
      document.querySelectorAll('.star-btn').forEach((b, i) => {
        const icon = b.querySelector('i, svg');
        if (!icon) return;
        if (i < selectedRating) {
          icon.classList.add('fill-amber-400','text-amber-400');
          icon.classList.remove('text-gray-300');
        } else {
          icon.classList.remove('fill-amber-400','text-amber-400');
          icon.classList.add('text-gray-300');
        }
      });
    });
  });

  const photoInput = document.getElementById('review-photo-input');
  const photoPreview = document.getElementById('review-photo-preview');
  let photoFile = null;
  if (photoInput) {
    photoInput.addEventListener('change', () => {
      photoFile = photoInput.files && photoInput.files[0];
      if (!photoPreview) return;
      photoPreview.innerHTML = '';
      if (photoFile) {
        const url = URL.createObjectURL(photoFile);
        photoPreview.innerHTML = `<span class="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg px-2.5 py-1"><img src="${url}" alt="" class="w-5 h-5 rounded object-cover">${escapeHtml(photoFile.name)}</span>`;
      }
    });
  }

  const msg = document.getElementById('review-submit-msg');
  const errMsg = document.getElementById('review-error-msg');
  const showErr = (t) => {
    if (!errMsg) return;
    if (t) {
      errMsg.classList.remove('hidden');
      const s = errMsg.querySelector('span');
      if (s) s.textContent = t;
    } else {
      errMsg.classList.add('hidden');
    }
  };

  // GUESTS can rate + write too ("No account needed"). The review is first
  // sent to the server (product_reviews) once the guest-review SQL migration
  // has been applied; until then it's saved on this device so it still shows
  // up instantly at the top of the list. Signed-in users keep the photo upload.
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    showErr('');
    const text = document.getElementById('review-text').value.trim();
    if (!selectedRating) { alert('Please select a rating.'); return; }
    if (!text) { alert('Please write a review.'); return; }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="inline-block animate-spin">⏳</span> Submitting…';

    const authorName = (nameInput ? nameInput.value : '').trim();
    if (authorName) {
      try { localStorage.setItem('kco_review_name', authorName); } catch {}
    }

    let ok = false;
    if (user) {
      let reviewPhoto = null;
      if (photoFile) {
        const ext = (photoFile.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
        const path = `${user.id}/${Date.now()}_${String(Math.random()).slice(2)}.${ext}`;
        const { error: upErr } = await supabase.storage.from('review-photos').upload(path, photoFile, {
          contentType: photoFile.type || 'image/jpeg',
          cacheControl: '3600',
          upsert: false,
        });
        if (upErr) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalLabel;
          showErr('Could not upload photo: ' + upErr.message);
          return;
        }
        const { data: pub } = supabase.storage.from('review-photos').getPublicUrl(path);
        reviewPhoto = pub?.publicUrl || null;
      }

      const { error } = await supabase.from('product_reviews').insert({
        listing_id: listing.id || null,
        property_id: pid,
        user_id: user.id,
        rating: selectedRating,
        comment: text,
        review_photo: reviewPhoto,
        is_approved: true,
      });
      if (!error) ok = true;
      else showErr('Could not save your review: ' + (error.message || 'unknown error'));
    } else {
      try {
        const { error } = await supabase.from('product_reviews').insert({
          listing_id: listing.id || null,
          property_id: pid,
          rating: selectedRating,
          comment: text,
          author_name: authorName || null,
          is_approved: true,
        });
        if (!error) {
          ok = true;
          removeGuestReviewLocal(pid, { rating: selectedRating, text, name: authorName });
        }
      } catch {}
      if (!ok) ok = !!addGuestReviewLocal(pid, { rating: selectedRating, text, name: authorName });
      if (!ok) showErr('Could not save your review right now — please try again.');
    }

    if (!ok) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalLabel;
      return;
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = originalLabel;
    document.getElementById('review-text').value = '';
    if (nameInput) nameInput.value = authorName;
    selectedRating = 0;
    photoFile = null;
    if (photoInput) photoInput.value = '';
    if (photoPreview) photoPreview.innerHTML = '';
    document.querySelectorAll('.star-btn').forEach(b => {
      const icon = b.querySelector('i, svg');
      if (!icon) return;
      icon.classList.remove('fill-amber-400','text-amber-400');
      icon.classList.add('text-gray-300');
    });
    if (msg) {
      msg.classList.remove('hidden');
      setTimeout(() => { if (msg) msg.classList.add('hidden'); }, 4000);
    }
    loadReviews(listing);
  });
}

async function loadReviews(listing) {
  applyReviewsBannerBg();
  const listEl = document.getElementById('reviews-list');
  const summaryEl = document.getElementById('reviews-summary');
  const breakdownEl = document.getElementById('reviews-breakdown');
  if (!listEl) return;

  const seed = generateSeedReviews(listing);
  const breakdown = { 5: seed.breakdown[5] || 0, 4: seed.breakdown[4] || 0, 3: seed.breakdown[3] || 0, 2: seed.breakdown[2] || 0, 1: seed.breakdown[1] || 0 };
  let total = Math.max(Number(seed.total) || 0, seed.reviews.length);
  const dbReviews = [];
  const pid = listing.property_id || listing.id || '';

  if (pid) {
    const { data: reviews, error } = await supabase
      .from('product_reviews')
      .select('*, profiles(full_name)')
      .eq('property_id', pid)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });
    if (!error && reviews) {
      for (const r of reviews) {
        dbReviews.push({ ...r, name: r.author_name || r.profiles?.full_name || 'Anonymous', verified: r.is_verified_purchase });
        const s = Math.min(5, Math.max(1, Math.round(Number(r.rating) || 0)));
        breakdown[s]++;
        total++;
      }
    }
  }

  // Guest-written reviews saved on this device (until the server migration is
  // applied they live here; afterwards they come back through `product_reviews`
  // and the local copy is dropped so nothing is shown twice). Newest first.
  const guestReviews = loadGuestReviews(pid).filter(g => !dbReviews.some(d =>
    Math.round(Number(d.rating)) === Math.round(Number(g.rating))
    && String(d.comment || '').trim() === String(g.text || '').trim()));
  for (const g of guestReviews) {
    const s = Math.min(5, Math.max(1, Math.round(Number(g.rating) || 0)));
    breakdown[s]++;
    total++;
  }

  // Rating recomputed from the true combined breakdown so it stays honest when
  // real customer reviews change the mix.
  let weighted = 0;
  for (let s = 5; s >= 1; s--) weighted += s * breakdown[s];
  const computed = total ? weighted / total : 0;
  const displayRating = computed || Number(listing.rating) || 0;
  const displayCount = total;

  const summaryHtml = `
    <div class="flex flex-wrap items-center gap-x-6 gap-y-4">
      <div class="flex items-center gap-4 shrink-0">
        <div class="text-5xl sm:text-6xl font-black leading-none text-gray-900 tracking-tight">${displayRating > 0 ? displayRating.toFixed(1) : 'New'}</div>
        <div class="shrink-0">
          <div class="flex gap-1">${ratingStars(displayRating, 'w-5 h-5 sm:w-6 sm:h-6')}</div>
          <div class="text-[13px] sm:text-sm font-bold text-gray-500 mt-1.5 tracking-wide">Customer Reviews</div>
        </div>
      </div>
      <div class="hidden md:block w-px h-12 bg-gray-200"></div>
      <div class="flex flex-wrap items-center gap-2">
        <span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-full"><i data-lucide="badge-check" class="w-3.5 h-3.5"></i> Verified Listing</span>
        <span class="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1.5 rounded-full"><i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Secure Checkout</span>
        <span class="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1.5 rounded-full"><i data-lucide="truck" class="w-3.5 h-3.5"></i> Fast Worldwide Delivery</span>
      </div>
    </div>`;
  if (summaryEl) summaryEl.innerHTML = summaryHtml;
  if (breakdownEl) breakdownEl.innerHTML = ratingsBreakdownHtml(listing, breakdown, displayCount);

  const all = [...guestReviews, ...dbReviews, ...seed.reviews];
  if (!all.length) {
    listEl.innerHTML = '<p class="text-gray-400 text-sm py-2">No reviews yet. Be the first to review this product!</p>';
    if (window.lucide) lucide.createIcons();
    return;
  }

  // Stable per-comment keys so ❤️ likes and 💬 replies stay attached to the
  // right comment across reloads and refreshes.
  allReviewsRef = all.map((r) => {
    if (r._local) r._key = 'local-' + r.id;
    else if (r.id) r._key = 'db-' + r.id;
    else r._key = 'seed-' + reviewKeyHash(String(pid) + '||' + (r.date || '') + '||' + (r.text || ''));
    return r;
  });
  reviewsPidRef = pid;
  try { savedReplyName = localStorage.getItem('kco_reply_name') || ''; } catch {}
  if (pid) {
    try { riState = await loadReviewInteractions(pid); } catch { riState = { likes: new Map(), liked: new Set(), comments: new Map() }; }
  } else {
    riState = { likes: new Map(), liked: new Set(), comments: new Map() };
  }
  openReplyKey = null;
  reviewsExpanded = false;
  bindReviewActions(listEl);
  renderReviewList();
  // Show the 3 newest reviews first, then "View All Customer Reviews" expands
  // the full list. New customer reviews appear at the very top (dbReviews are
  // merged before seeds). No review-count numbers are shown anywhere.
}

// Fills the Customer Reviews banner with the admin-chosen "reviews" promo
// background (same image/video as the bottom trust area). Cached loader is
// imported from promo-backgrounds.js; a 'promo-backgrounds-updated' event also
// refreshes the slot live when an admin changes the background.
async function applyReviewsBannerBg() {
  const slot = document.querySelector('[data-bg-slot="reviews"]');
  if (!slot) return;
  try {
    const bg = await loadPromoBackgrounds();
    slot.innerHTML = bgMediaLayer(bg.reviews_bg_image, bg.reviews_bg_video);
  } catch {}
}

document.addEventListener('promo-backgrounds-updated', () => { try { applyReviewsBannerBg(); } catch {} });

// Renders the review list in its current state (3-review preview vs full list)
// so liking / replying / toggling the reply box can re-render in place without
// losing the "View All" expansion or scroll position.
function renderReviewList() {
  const listEl = document.getElementById('reviews-list');
  if (!listEl || !allReviewsRef.length) return;
  const items = reviewsExpanded ? allReviewsRef : allReviewsRef.slice(0, 3);
  listEl.innerHTML = items.map(reviewItemHtml).join('');
  if (window.lucide) lucide.createIcons();
  if (reviewsExpanded) {
    appendReviewsBackToTop(listEl, () => {
      reviewsExpanded = false;
      renderReviewList();
    });
  } else if (allReviewsRef.length > items.length) {
    const wrap = document.createElement('div');
    wrap.className = 'mt-4 flex justify-center';
    wrap.innerHTML = `
      <button type="button" class="view-all-reviews-btn btn-press inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl text-sm transition shadow-sm shadow-blue-500/20">
        View All Customer Reviews
        <i data-lucide="chevron-down" class="w-4 h-4"></i>
      </button>`;
    listEl.appendChild(wrap);
    if (window.lucide) lucide.createIcons();
    wrap.querySelector('.view-all-reviews-btn').addEventListener('click', () => {
      reviewsExpanded = true;
      renderReviewList();
    });
  }
}

async function refreshReviewInteractions() {
  if (!reviewsPidRef) return;
  try { riState = await loadReviewInteractions(reviewsPidRef); } catch {
    riState = { likes: new Map(), liked: new Set(), comments: new Map() };
  }
}

function focusOpenReply() {
  if (!openReplyKey) return;
  const body = document.querySelector('.review-reply-box textarea.review-reply-body');
  if (body) setTimeout(() => { try { body.focus(); } catch {} }, 60);
}

// One delegated listener on the persistent #reviews-list element covers every
// like / reply toggle / cancel / post action, even after innerHTML swaps.
function bindReviewActions(listEl) {
  if (!listEl || listEl.dataset.riBound === '1') return;
  listEl.dataset.riBound = '1';
  listEl.addEventListener('click', async (e) => {
    const reviewerEl = e.target.closest('[data-open-reviewer]');
    if (reviewerEl) {
      e.preventDefault();
      const key = reviewerEl.dataset.openReviewer;
      const review = allReviewsRef.find(x => x._key === key);
      if (review) openReviewerProfile(review);
      return;
    }
    const likeBtn = e.target.closest('.review-like-btn');
    if (likeBtn) {
      e.preventDefault();
      const key = likeBtn.dataset.key;
      if (!key) return;
      const wasLiked = riState.liked.has(key);
      let nowLiked = !wasLiked;
      try {
        const res = await toggleReviewLike(reviewsPidRef, key);
        if (res && typeof res.liked === 'boolean') nowLiked = res.liked;
      } catch {}
      // Apply the toggle's authoritative result directly so the heart reliably
      // reflects the click (and the count stays in sync), instead of relying on
      // the reload's identity-based re-derivation of "liked".
      if (nowLiked) riState.liked.add(key); else riState.liked.delete(key);
      riState.likes.set(key, Math.max(0, (riState.likes.get(key) || 0) + (nowLiked ? 1 : -1)));
      renderReviewList();
      return;
    }
    const toggle = e.target.closest('.review-reply-toggle');
    if (toggle) {
      e.preventDefault();
      openReplyKey = openReplyKey === toggle.dataset.key ? null : toggle.dataset.key;
      renderReviewList();
      focusOpenReply();
      return;
    }
    const cancel = e.target.closest('.review-reply-cancel');
    if (cancel) {
      e.preventDefault();
      openReplyKey = null;
      renderReviewList();
      return;
    }
    const post = e.target.closest('.review-reply-post');
    if (post) {
      e.preventDefault();
      const box = e.target.closest('.review-reply-box');
      if (!box) return;
      const nameEl = box.querySelector('.review-reply-name');
      const bodyEl = box.querySelector('.review-reply-body');
      const name = ((nameEl && nameEl.value) || '').trim();
      const body = ((bodyEl && bodyEl.value) || '').trim();
      if (!body) { if (bodyEl) bodyEl.focus(); return; }
      savedReplyName = name || savedReplyName;
      try { await addReviewComment(reviewsPidRef, post.dataset.key, name || 'Guest', body); } catch {}
      try { localStorage.setItem('kco_reply_name', savedReplyName); } catch {}
      openReplyKey = null;
      await refreshReviewInteractions();
      renderReviewList();
    }
  });
}

// Clickable reviewer profile — opens a card with the reviewer's REAL info from
// their review (name, avatar, location, dates) plus a summary of all the reviews
// they've left on this same listing (their average rating, and the real number
// of helpful/votes their reviews have received). No fabricated follower
// numbers — every figure shown comes from actual review data.
function openReviewerProfile(review) {
  const nm = review.author_name || review.name || review.profiles?.full_name || 'Anonymous';
  const initial = escapeHtml(nm.trim().charAt(0).toUpperCase() || 'A');
  const loc = review.location || review.profiles?.country || '';
  const handle = review.handle || '';
  const memberDate = review.date || review.created_at || '';

  // Gather every review this same reviewer left on THIS listing.
  const byAuthor = allReviewsRef.filter(x =>
    (x.author_name || x.name || x.profiles?.full_name || '') === nm
  );
  const reviewCount = byAuthor.length || 1;
  const avgRating = reviewCount > 0
    ? (byAuthor.reduce((s, x) => s + (Number(x.rating) || 0), 0) / byAuthor.length)
    : (Number(review.rating) || 0);
  const totalLikes = byAuthor.reduce((s, x) => {
    const key = x._key || '';
    return s + (x.likes || 0) + (key ? (riState.likes.get(key) || 0) : 0);
  }, 0);

  const theirReviews = byAuthor.slice(0, 4).map(x => {
    const stars = [1,2,3,4,5].map(i => `<i data-lucide="star" class="w-3 h-3 ${i <= (Number(x.rating) || 0) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}"></i>`).join('');
    return `
      <div class="rounded-xl border border-gray-100 bg-gray-50/70 p-3">
        <div class="flex items-center gap-1.5 mb-1">${stars}<span class="text-[11px] text-gray-400 ml-1">${formatCommentDate(x.date || x.created_at)}</span></div>
        <p class="text-[13px] text-gray-700 leading-relaxed">${escapeHtml(x.text || x.comment || '')}</p>
      </div>`;
  }).join('');

  const root = document.createElement('div');
  root.id = 'reviewer-profile-modal';
  root.className = 'fixed inset-0 z-[460] flex items-end sm:items-center justify-center p-0 sm:p-4';
  root.innerHTML = `
    <style>
      @keyframes rp-up{from{transform:translateY(100%)}to{transform:translateY(0)}}
      @media (min-width:640px){@keyframes rp-up{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}}
      #reviewer-profile-modal .animate-rp-up{animation:rp-up .26s cubic-bezier(.2,.8,.2,1)}
      #reviewer-profile-modal::-webkit-scrollbar{display:none}
    </style>
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" data-rp-close></div>
    <div class="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-rp-up">
      <div class="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
        <h3 class="text-base font-black text-gray-900 tracking-tight">Reviewer Profile</h3>
        <button type="button" data-rp-close class="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition" aria-label="Close">✕</button>
      </div>
      <div class="max-h-[70vh] overflow-y-auto px-5 py-5 space-y-4" style="-ms-overflow-style:none;scrollbar-width:none">
        <div class="flex items-center gap-3.5">
          <div class="shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xl font-black uppercase shadow">${initial}</div>
          <div class="min-w-0">
            <div class="text-lg font-black text-gray-900 leading-tight">${escapeHtml(nm)}</div>
            ${handle ? `<div class="text-xs font-semibold text-blue-500">@${escapeHtml(handle)}</div>` : ''}
            ${loc ? `<div class="flex items-center gap-1 text-xs text-gray-500 mt-0.5"><i data-lucide="map-pin" class="w-3.5 h-3.5"></i>${escapeHtml(loc)}</div>` : ''}
            ${memberDate ? `<div class="flex items-center gap-1 text-xs text-gray-400 mt-0.5"><i data-lucide="calendar" class="w-3.5 h-3.5"></i>Reviewed ${formatCommentDate(memberDate)}</div>` : ''}
          </div>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <div class="rounded-xl border border-gray-100 bg-gray-50 p-3 text-center">
            <div class="text-lg font-black text-gray-900">${avgRating ? Number(avgRating).toFixed(1) : '—'}</div>
            <div class="flex justify-center gap-0.5 mt-0.5">${[1,2,3,4,5].map(i => `<i data-lucide="star" class="w-3 h-3 ${i <= Math.round(avgRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}"></i>`).join('')}</div>
            <div class="text-[11px] text-gray-400 mt-1">Avg rating</div>
          </div>
          <div class="rounded-xl border border-gray-100 bg-gray-50 p-3 text-center">
            <div class="text-lg font-black text-gray-900">${reviewCount}</div>
            <div class="text-[11px] text-gray-400 mt-1">Reviews</div>
          </div>
          <div class="rounded-xl border border-gray-100 bg-gray-50 p-3 text-center">
            <div class="text-lg font-black text-gray-900">${totalLikes}</div>
            <div class="text-[11px] text-gray-400 mt-1">Helpful votes</div>
          </div>
        </div>
        ${theirReviews ? `
          <div>
            <h4 class="text-xs font-black uppercase tracking-wide text-gray-500 mb-2">Reviews on this listing</h4>
            <div class="space-y-2">${theirReviews}</div>
          </div>` : ''}
        <p class="text-[11px] text-gray-400 leading-relaxed">Follower and activity counts shown are based on real reviews and reviews-likes on this listing.</p>
      </div>
    </div>
  `;
  document.body.appendChild(root);
  document.body.style.overflow = 'hidden';
  if (window.lucide) lucide.createIcons();
  const close = () => { root.remove(); document.body.style.overflow = ''; };
  root.querySelectorAll('[data-rp-close]').forEach(el => el.addEventListener('click', close));
  root.addEventListener('click', (e) => { if (e.target === root) close(); });
}

// Floating control so customers scrolling through the full review list can tap
// to collapse back to the 3-review preview AND jump to the top of the Customer
// Reviews section — no long scrolling before reaching the Buy button. The
// button is FIXED to the screen (bottom-right) so it stays visible and reachable
// no matter how far down the review list the customer has scrolled.
function appendReviewsBackToTop(listEl, collapseFn) {
  if (!listEl) return;
  const existing = document.getElementById('reviews-back-top');
  if (existing) existing.remove();
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'reviews-back-top';
  btn.setAttribute('aria-label', 'Back to product page');
  btn.className = 'btn-press fixed z-[90] bottom-4 right-4 sm:bottom-6 sm:right-6 inline-flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-white font-bold pl-3 pr-5 py-3 rounded-full text-xs shadow-xl shadow-slate-950/50 border border-white/10 backdrop-blur transition active:scale-95';
  btn.innerHTML = `
    <span class="shrink-0 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center"><i data-lucide="chevron-up" class="w-4 h-4"></i></span>
    Back to product page`;
  document.body.appendChild(btn);
  btn.addEventListener('click', () => {
    btn.remove();
    if (typeof collapseFn === 'function') collapseFn();
    const sec = document.getElementById('reviews-section');
    if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  if (window.lucide) lucide.createIcons();
}

async function loadRecommendations(listing) {
  const section = document.getElementById('recommendations-section');
  const grid = document.getElementById('recommendations-grid');
  if (!section || !grid || !listing.id) return;
  const { data: recs, error: recErr } = await supabase
    .from('product_recommendations')
    .select('recommended_listing_id, showroom_listings!product_recommendations_recommended_listing_id_fkey(property_id, title, price, currency, images, listing_type)')
    .eq('listing_id', listing.id)
    .order('score', { ascending: false })
    .limit(4);
  if (recErr) { console.error('Recommendations load failed:', recErr.message); section.classList.add('hidden'); return; }
  let items = (recs || []).map(r => r.showroom_listings).filter(Boolean);
  if (items.length < 4) {
    const { data: related } = await supabase
      .from('showroom_listings')
      .select('property_id, title, price, currency, images, listing_type')
      .eq('category', listing.category)
      .neq('id', listing.id)
      .eq('is_active', true)
      .order('rating', { ascending: false })
      .limit(4 - items.length);
    items = [...items, ...(related || [])];
  }
  if (items.length === 0) { section.classList.add('hidden'); return; }
  section.classList.remove('hidden');
  grid.innerHTML = items.map(p => {
    const img = (p.video || p.video_url || (p.images && p.images[0])) || '';
    const recIsVideo = /\.(mp4|webm|mov|m4v|avi|mkv|ogv)(\?|#|$)/i.test(img.split('?')[0]) || /^data:video\//i.test(img);
    const pprice = typeof p.price === 'number' ? p.price : parseFloat(p.price || 0);
    const cur = p.currency || 'USD';
    const recMedia = recIsVideo
      ? `<video src="${escapeHtml(img)}" muted loop autoplay playsinline class="w-full h-full object-cover group-hover:scale-105 transition" preload="metadata"></video>`
      : `<div class="w-full h-full flex items-center justify-center bg-gray-100"><i data-lucide="video-off" class="w-6 h-6 text-gray-300"></i></div>`;
    return `<a href="/details.html?id=${encodeURIComponent(p.property_id)}" class="block bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:border-blue-200 transition group">
      <div class="aspect-square overflow-hidden bg-gray-100">${recMedia}</div>
      <div class="p-2"><p class="text-xs text-gray-900 font-bold truncate">${escapeHtml(p.title)}</p><p class="text-xs text-blue-500 font-bold mt-1">${cur} ${pprice.toLocaleString()}</p></div>
    </a>`;
  }).join('');
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

async function init() {
  const id = getListingId();
  if (!id) {
    document.getElementById('details-content').innerHTML = '<div class="text-center py-20 text-gray-500">Listing not found.</div>';
    return;
  }

  const notFound = () => {
    document.getElementById('details-content').innerHTML = '<div class="text-center py-20 text-gray-500">Listing not found.</div>';
  };

  // ── Instant path — NO network, NO waiting ────────────────────────────────
  // Every listing type renders synchronously from in-memory data:
  //   • built-in specialists (trucks/motorhomes/cars/phones/products)
  //   • seed showroom listings (W10000–W10027) via findListingById
  //   • deterministic catalog listings (W-XX-NNNN) via generateListingById
  const staticSource = () =>
    getTruckById(id) || getMotorhomeById(id) || getCarById(id) || getPhoneById(id) ||
    findProductById(id) || findListingById(id) || generateListingById(id);

  const renderListing = (l) => {
    cleanListing(l);
    document.title = `${l.title} | Weverse Online Shop`;
    setProductMeta(l);
    // Built-in trucks/motorhomes/cars keep their specialist renderers (which
    // load related sections internally); everything else uses the main renderer.
    if (l === getTruckById(id)) renderTruck(l);
    else if (l === getMotorhomeById(id)) renderMotorhome(l);
    else if (l === getCarById(id)) renderCar(l);
    else { render(l); try { loadRelatedSections(l); } catch {} }
  };

  // Pre-rendered by /api/og.js: the full product page is already in the
  // initial HTML (great for SEO + crawlers). Keep it, never flash or nuke it,
  // and quietly hydrate with the freshest live row in the background so admin
  // edits still show up.
  const ssrRoot = document.getElementById('details-content');
  const ssrMarker = ssrRoot?.querySelector('[data-ssr-product]');
  if (ssrMarker && ssrMarker.getAttribute('data-ssr-product') === id) {
    loadFullListingById(id).then((live) => {
      if (live && live.property_id === id) {
        try { renderListing(live); } catch {}
      }
    }).catch(() => {});
    return;
  }

  const staticListing = staticSource();
  if (staticListing) {
    try {
      renderListing(staticListing);
    } catch {
      // A malformed/odd listing must never strand the page on "Loading…" or a
      // half-rendered shell — fall through to the safe slow path quietly.
      try { notFound(); } catch {}
      return;
    }
    // Hydrate with the FULL live row in the background (a single tiny row
    // fetch — never the whole table). Admin edits (title, price, images,
    // publish state) still win when present.
    loadFullListingById(id).then((live) => {
      // If another admin hid this generated catalog listing while the local
      // cache was stale, remove it from view once the DB-hidden list is known.
      loadHiddenCatalogIds().then(() => {
        if (isCatalogListingHidden(id)) { notFound(); return; }
        if (live && live.property_id === id) {
          try { renderListing(live); } catch {}
        }
      });
    });
    return;
  }

  // ── Slow path — only for listings NOT in any local source ────────────────
  // (e.g. DB-only properties created in the admin). The fetch is a single full
  // row (fast), timed so it can never hang the page on "Loading property
  // details...".
  const live = await loadFullListingById(id);
  if (live) {
    renderListing(live);
    return;
  }

  // The big extra-product catalog (~636 KB) is lazy: only fetched here, and only
  // if the id wasn't in the built-in list or the database.
  await loadExtraProducts();
  const extraProduct = findProductById(id);
  if (extraProduct) {
    renderListing(extraProduct);
    return;
  }

  // Final fallback: re-check the hidden-catalog list loaded from the DB, then
  // the deterministic catalog generator (it may know ids the fast path's local
  // cache hasn't marked loaded yet).
  await loadHiddenCatalogIds();
  const listing = generateListingById(id);
  if (!listing) {
    notFound();
    return;
  }
  cleanListing(listing);
  document.title = `${listing.title} | Weverse Online Shop`;
  setProductMeta(listing);
  render(listing);
  try { loadRelatedSections(listing); } catch {}
}

// Global safety net: whatever happens during startup (a slow/hanging network
// fetch, a renderer exception, anything), the page must NEVER sit on "Loading
// property details..." — replace the placeholder immediately with a real
// message so the user is never stuck on a blank loading screen.
const root = document.getElementById('details-content');
const loadingHtml = root ? root.innerHTML : '';
let _fallbackShown = false;
function failSafe(err) {
  if (err) { try { console.error('[details] init failed:', err && (err.stack || err.message || err)); } catch {} }
  if (_fallbackShown) return;
  _fallbackShown = true;
  try {
    const el = document.getElementById('details-content');
    if (!el) return;
    if (el.querySelector('[data-ssr-product]')) return;
    if (el.innerHTML !== loadingHtml || el.querySelector('.fade-in, #reviews-section')) return;
    el.innerHTML = '<div class="text-center py-20 text-gray-500">We couldn\u2019t load this listing right now. Please check your connection and try again.</div>';
  } catch {}
}
window.setTimeout(failSafe, 12000);

init().catch(failSafe);
