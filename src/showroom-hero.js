import { SHOWROOM_LISTINGS, formatPrice, flagEmoji, getDBListings, loadDBListings, hydrateDBListingsFromCache, cleanListing } from './showroom-data.js';
import { TRUCK_LISTINGS, formatTruckPrice } from './truck-data.js';
import { MOTORHOME_LISTINGS } from './motorhome-data.js';
import { PRODUCT_LISTINGS } from './products-data.js';
import { PRODUCT_EXTRA_LISTINGS } from './products-extra.js';
import { isCatalogListingHidden } from './catalog-hidden-store.js';

const CONTAINER_ID = 'kco-hero-rows';

const VEHICLE_CATEGORIES = new Set([
  'Cars', 'Cars & Vehicles', 'Trucks', 'Buses', 'Buses & Coaches', 'Motorhomes',
  'Motorcycles', 'Marine & Boating', 'RV & Camper Accessories', 'Vehicles',
]);

const HOUSE_TYPES = new Set([
  'Single-Family Home', 'Apartment', 'Condo', 'Townhouse', 'Villa', 'Mansion',
  'Beach House', 'Farm House', 'House', 'Homes', 'Duplex', 'Penthouse',
  'Bungalow', 'Cottage', 'Chalet', 'Studio', 'Loft',
]);

const HOUSE_ORDER = [
  'Single-Family Home', 'Apartment', 'Condo', 'Townhouse', 'Villa', 'Mansion',
  'Beach House', 'Farm House', 'House', 'Homes', 'Duplex', 'Penthouse',
  'Bungalow', 'Cottage', 'Chalet', 'Studio', 'Loft',
];

function sp(listing, key) {
  return listing.specifications && typeof listing.specifications === 'object' && listing.specifications[key] != null
    ? listing.specifications[key]
    : listing[key];
}

function isVehicle(listing) {
  return listing.listing_type === 'vehicle' || VEHICLE_CATEGORIES.has(listing.category);
}

function isHouse(listing) {
  if (listing.listing_type === 'property') {
    if (!listing.property_type && listing.category === 'Houses & Real Estate') return true;
    return HOUSE_TYPES.has(listing.property_type) || HOUSE_TYPES.has(listing.subcategory);
  }
  if (listing.listing_type === 'product') {
    return listing.category === 'Houses & Real Estate' || listing.category === 'Real Estate'
      || HOUSE_TYPES.has(listing.property_type || listing.subcategory);
  }
  return false;
}

// ── Property Video Tours ─────────────────────────────────────────────
// A single full-width horizontal section that shows every property that
// has a video (house, land, apartment, villa, mansion, etc.), each as one
// large prominent video card — NOT a small card or two-column grid.
function isVideoUrl(url) {
  if (!url || typeof url !== 'string') return false;
  if (/^data:video\//i.test(url)) return true;
  if (url.startsWith('blob:')) return false;
  return /\.(mp4|webm|mov|m4v|avi|mkv|ogv)(\?|#|$)/i.test(url);
}

// The FIRST valid video URL for a property, from the standalone video fields
// or from a video merged into the images gallery. Returns null if none.
function listingVideoUrl(listing) {
  if (!listing) return null;
  for (const v of [listing.video, listing.video_url]) {
    if (isVideoUrl(v)) return v;
  }
  if (Array.isArray(listing.images)) {
    for (const img of listing.images) if (isVideoUrl(img)) return img;
  }
  return null;
}

// The best poster frame (a real image, never a video) for a video card.
function listingPoster(listing) {
  if (Array.isArray(listing.images)) {
    const photo = listing.images.find((u) => !isVideoUrl(u));
    if (photo) return photo;
  }
  return '';
}

// Every property listing that has a video, deduplicated by property_id AND by
// video URL — one card per DISTINCT video. This guarantees a clean single row
// with no duplicate videos: if two property rows point at the same video file
// (common when a listing was duplicated in the DB), only the first is shown.
function getAllPropertyVideos() {
  const seenIds = new Set();
  const seenVideos = new Set();
  const out = [];
  for (const l of getAllShowcaseProperties()) {
    if (!l) continue;
    const id = l.property_id || l.id;
    if (!id || seenIds.has(id)) continue;
    const video = listingVideoUrl(l);
    if (!video) continue;
    if (seenVideos.has(video)) continue;
    seenIds.add(id);
    seenVideos.add(video);
    out.push(l);
  }
  return out;
}

function videoCardHtml(listing) {
  cleanListing(listing);
  const pid = escapeHtmlAttr(listing.property_id || listing.id);
  const video = listingVideoUrl(listing);
  const poster = listingPoster(listing);
  const posterAttr = poster ? ` poster="${esc(poster)}"` : '';
  const priceHtml = formatPrice(listing);
  const type = houseTypeLabel(listing);
  const flag = flagEmoji(listing.country_code);
  const place = [listing.city, listing.state].filter(Boolean).join(', ') || listing.country || '';
  const loc = place
    ? `<span class="kco-video-loc"><i data-lucide="map-pin" class="w-3 h-3 shrink-0"></i>${esc(flag ? flag + ' ' + place : place)}</span>`
    : '';
  const isRent = listing.listing_status === 'rent';
  const statusCls = isRent ? 'kco-sale-rent' : 'kco-sale-buy';
  const statusLabel = isRent ? 'For Rent' : 'For Sale';

  const beds = sp(listing, 'bedrooms') != null ? `<span class="kco-hero-chip"><i data-lucide="bed-double" class="w-3.5 h-3.5"></i>${esc(sp(listing, 'bedrooms'))} Bed${Number(sp(listing, 'bedrooms')) === 1 ? '' : 's'}</span>` : '';
  const baths = sp(listing, 'bathrooms') != null ? `<span class="kco-hero-chip"><i data-lucide="bath" class="w-3.5 h-3.5"></i>${esc(sp(listing, 'bathrooms'))} Bath${Number(sp(listing, 'bathrooms')) === 1 ? '' : 's'}</span>` : '';
  const build = sp(listing, 'building_size') ? `<span class="kco-hero-chip"><i data-lucide="building-2" class="w-3.5 h-3.5"></i>${esc(sp(listing, 'building_size'))}</span>` : '';
  const land = listing.land_size ? `<span class="kco-hero-chip"><i data-lucide="ruler" class="w-3.5 h-3.5"></i>${esc(listing.land_size)}</span>` : '';

  return `
    <a href="/details.html?id=${escapeHtmlAttr(pid)}" class="kco-video-card">
      <div class="kco-video-media">
        <video src="${esc(video)}"${posterAttr} muted loop autoplay playsinline webkit-playsinline preload="metadata" class="kco-video-el" data-detail-href="/details.html?id=${escapeHtmlAttr(pid)}" aria-label="${esc(listing.title || '')}">
          <source src="${esc(video)}">
        </video>
        <div class="kco-video-bigplay"><span class="kco-video-playcircle"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span></div>
        <span class="kco-hero-type"><i data-lucide="home" class="w-3 h-3"></i>${esc(type)}</span>
        <span class="kco-video-badge ${statusCls}">${statusLabel}</span>
        ${loc}
      </div>
      <div class="kco-video-body">
        <div class="kco-hero-price"><b>${priceHtml}</b><span>${isRent ? 'per month · for rent' : 'for sale'}</span></div>
        <p class="kco-hero-title">${esc(listing.title || '')}</p>
        ${(beds || baths || build || land) ? `<div class="kco-hero-chips">${beds}${baths}${build}${land}</div>` : ''}
        <span class="kco-hero-btn">View Home &amp; Watch Tour <i data-lucide="arrow-right" class="w-4 h-4"></i></span>
      </div>
    </a>`;
}

// Keep every video-tour card playing forever (muted + loop are set on the
// tag itself). No pause-on-exit, no scroll-stopping: a clip that finishes
// simply restarts.
function wireVideoCards(section) {
  section.querySelectorAll('.kco-video-el').forEach((vd) => {
    vd.muted = true;
    vd.loop = true;
    vd.autoplay = true;
    vd.playsInline = true;
    vd.play().catch(() => {});
  });
}

function videoSection() {
  const listings = getAllPropertyVideos();
  if (!listings.length) return document.createDocumentFragment();

  const sec = document.createElement('section');
  sec.className = 'kco-hero-section kco-video-section';
  sec.setAttribute('aria-label', 'Houses For Sale & Rent — Video Tours');
  sec.setAttribute('data-property-videos', 'true');

  const head = `
    <div class="kco-hero-panel kco-video-panel">
      <div class="kco-video-promo">
        <div class="kco-video-copy">
          <span class="kco-video-eyebrow"><i data-lucide="home" class="w-3 h-3"></i> Real Estate</span>
          <h3 class="kco-video-h3">HOUSES FOR SALE &amp; RENT</h3>
          <p>Find homes, apartments, and villas available for sale or rent directly from us. Many listings include a video tour so you can see the property clearly.</p>
        </div>
        <div class="kco-video-actions">
          <span class="kco-hero-count"><b>${listings.length}</b> Listing${listings.length === 1 ? '' : 's'}</span>
          <a class="kco-hero-seeall" href="/showroom.html?cat=real-estate">SEE MORE HOMES <i data-lucide="arrow-up-right" class="w-4 h-4"></i></a>
        </div>
      </div>
      <div class="kco-video-carousel">
        <div class="kco-video-hscroll">
          ${listings.map(l => videoCardHtml(l)).join('')}
        </div>
        <button class="kco-hero-arrow left" aria-label="Scroll Houses For Sale left">${SVG_CH_L}</button>
        <button class="kco-hero-arrow right" aria-label="Scroll Houses For Sale right">${SVG_CH_R}</button>
      </div>
    </div>`;

  sec.innerHTML = head;

  const track = sec.querySelector('.kco-video-hscroll');
  wireDrag(track);
  const left = sec.querySelector('.kco-hero-arrow.left');
  const right = sec.querySelector('.kco-hero-arrow.right');
  const update = () => {
    const max = track.scrollWidth - track.clientWidth - 2;
    left.disabled = track.scrollLeft <= 2;
    right.disabled = track.scrollLeft >= max;
  };
  left.addEventListener('click', () => track.scrollBy({ left: -track.clientWidth * 0.8, behavior: 'smooth' }));
  right.addEventListener('click', () => track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' }));
  track.addEventListener('scroll', update, { passive: true });
  update();

  // Pause sidebar work whenever the whole page is hidden so background scans
  // never keep playing hidden videos.
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) sec.querySelectorAll('.kco-video-el').forEach(v => { try { v.play().catch(() => {}); } catch {} });
  });

  requestAnimationFrame(() => wireVideoCards(sec));
  if (window.lucide) lucide.createIcons();
  return sec;
}

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

function visible(listings) {
  return dedupe(listings)
    .filter(l => {
      if (isCatalogListingHidden && isCatalogListingHidden(l.property_id)) return false;
      if (l.property_id && String(l.property_id).startsWith('W')) return true;
      return l.is_active !== false;
    })
    .sort((a, b) => {
      const ap = Number.isFinite(parseFloat(a.price)) ? parseFloat(a.price) : 0;
      const bp = Number.isFinite(parseFloat(b.price)) ? parseFloat(b.price) : 0;
      return bp - ap;
    });
}

export function houseTypeLabel(listing) {
  const t = listing.property_type || listing.subcategory || listing.category;
  if (t && !HouseTypeLabelCache.has(t)) {
    const l = String(t).toLowerCase();
    for (const h of HOUSE_ORDER) if (l === h.toLowerCase() || l.includes(h.toLowerCase())) { HouseTypeLabelCache.set(t, h); break; }
    if (!HouseTypeLabelCache.has(t)) HouseTypeLabelCache.set(t, String(t));
  }
  return t ? HouseTypeLabelCache.get(t) : 'Homes';
}
const HouseTypeLabelCache = new Map();

export function getAllShowcaseProperties() {
  const db = getDBListings() || [];
  const dbProps = db.filter(l =>
    l.listing_type === 'property' ||
    l.category === 'Real Estate' || l.category === 'Houses & Real Estate' ||
    HOUSE_TYPES.has(l.property_type) || HOUSE_TYPES.has(l.subcategory)
  );
  const statics = [...PRODUCT_LISTINGS, ...PRODUCT_EXTRA_LISTINGS, ...SHOWROOM_LISTINGS]
    .filter(l => l && (l.category === 'Houses & Real Estate' || l.category === 'Real Estate' || HOUSE_TYPES.has(l.property_type || l.subcategory)));
  return visible([...dbProps, ...statics]);
}

function getAllHeroVehicles() {
  const db = getDBListings() || [];
  const dbVehicles = db.filter(l => isVehicle(l));
  const staticVehicles = [...TRUCK_LISTINGS, ...MOTORHOME_LISTINGS, ...PRODUCT_LISTINGS, ...PRODUCT_EXTRA_LISTINGS]
    .filter(l => l && isVehicle(l));
  return visible([...dbVehicles, ...staticVehicles]);
}

export { getAllHeroVehicles, heroStyles, sp, isVehicle, vehicleKindLabel, videoSection };

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function heroStyles() {
  if (document.getElementById('kco-hero-styles')) return;
  const st = document.createElement('style');
  st.id = 'kco-hero-styles';
  st.textContent = `
#kco-hero-rows{display:block}
.kco-hero-section{position:relative;border-radius:1.25rem;overflow:hidden;background:#ffffff;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(15,23,42,.05)}
.kco-hero-section+.kco-hero-section{margin-top:1.25rem}
.kco-hero-section::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#3b82f6,#60a5fa)}
.kco-hero-veh::before{background:linear-gradient(90deg,#475569,#94a3b8)}
.kco-video-section::before{background:linear-gradient(90deg,#059669,#34d399)}
.kco-hero-panel{position:relative;padding:1.35rem 1rem 1.5rem}
@media(min-width:640px){.kco-hero-panel{padding:1.6rem 1.5rem 1.7rem}}
.kco-hero-head{display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:1.1rem}
.kco-hero-headleft{display:flex;align-items:center;gap:.7rem;min-width:0}
.kco-hero-ic{flex:0 0 auto;width:2.5rem;height:2.5rem;border-radius:.75rem;display:flex;align-items:center;justify-content:center;background:#eff6ff;border:1px solid #bfdbfe}
.kco-hero-ic [data-lucide]{color:#2563eb !important}
.kco-hero-head h3{color:#0f172a;font-size:1.05rem;font-weight:900;letter-spacing:-.01em;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.kco-hero-head p{color:#64748b;font-size:.78rem;font-weight:600;margin:.18rem 0 0}
.kco-hero-count{font-size:.66rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;padding:.34rem .7rem;border-radius:999px;background:#f1f5f9;border:1px solid #e2e8f0;color:#475569;white-space:nowrap;display:none;align-items:center;gap:.3rem}
@media(min-width:640px){.kco-hero-count{display:inline-flex}}
.kco-hero-count b,.kco-hero-count strong{color:#0f172a}
.kco-hero-seeall{flex:0 0 auto;display:inline-flex;align-items:center;gap:.4rem;padding:.5rem .95rem;border-radius:.75rem;background:#eff6ff;border:1px solid #bfdbfe;color:#2563eb;font-size:.78rem;font-weight:800;text-decoration:none;transition:background .15s ease,border-color .15s ease;white-space:nowrap}
.kco-hero-seeall:hover{background:#dbeafe;border-color:#93c5fd}
.kco-video-section{background:#ffffff;border-color:#e2e8f0;box-shadow:0 1px 2px rgba(15,23,42,.05)}
.kco-video-panel{padding:1.35rem 1rem 1.5rem}
@media(min-width:640px){.kco-video-panel{padding:1.6rem 1.5rem 1.7rem}}
.kco-video-promo{display:flex;align-items:flex-end;justify-content:space-between;gap:1rem 1.5rem;flex-wrap:wrap}
.kco-video-copy{flex:1 1 auto;min-width:0}
.kco-video-eyebrow{display:inline-flex;align-items:center;gap:.35rem;font-size:.66rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#047857;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:999px;padding:.3rem .7rem;margin-bottom:.55rem}
.kco-video-eyebrow [data-lucide]{width:.75rem;height:.75rem;color:#047857}
.kco-video-section .kco-video-h3{color:#0f172a;font-size:clamp(1.3rem,3vw,1.85rem);font-weight:900;letter-spacing:-.015em;line-height:1.15;margin:0}
.kco-video-copy p{color:#64748b;font-size:.85rem;font-weight:600;line-height:1.45;margin:.4rem 0 0}
.kco-video-actions{flex:0 0 auto;display:flex;flex-direction:row;align-items:center;gap:.6rem;padding-top:.1rem;flex-wrap:wrap}
.kco-video-carousel{position:relative;margin-top:1.25rem}
@media(max-width:380px){.kco-video-promo{flex-direction:column;align-items:stretch;gap:1rem}.kco-video-copy{max-width:none}}
.kco-hero-hscroll,.kco-video-hscroll{display:flex;gap:.85rem;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding:.4rem 2px .7rem;cursor:grab}
.kco-hero-hscroll::-webkit-scrollbar,.kco-video-hscroll::-webkit-scrollbar{display:none}
.kco-hero-hscroll.dragging,.kco-video-hscroll.dragging{cursor:grabbing;scroll-snap-type:none;-webkit-user-select:none;user-select:none}
.kco-hero-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:5;width:2.25rem;height:2.25rem;border-radius:999px;display:none;align-items:center;justify-content:center;background:#ffffff;color:#0f172a;border:1px solid #e2e8f0;box-shadow:0 4px 12px -2px rgba(15,23,42,.18);cursor:pointer;transition:background .15s ease,border-color .15s ease}
.kco-hero-arrow:hover{background:#f1f5f9;border-color:#cbd5e1}
.kco-hero-arrow svg{width:1.1rem;height:1.1rem}
@media(min-width:1024px){.kco-hero-arrow{display:flex}}
.kco-hero-arrow.left{left:.7rem}.kco-hero-arrow.right{right:.7rem}
.kco-hero-arrow:disabled{opacity:.35;pointer-events:none}
.kco-video-card,.kco-hero-card{flex:0 0 auto;scroll-snap-align:start;width:272px;min-width:272px;border-radius:1rem;overflow:hidden;background:#ffffff;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(15,23,42,.06);transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease;text-decoration:none;display:flex;flex-direction:column}
@media(min-width:640px){.kco-video-card,.kco-hero-card{width:360px;min-width:360px}}
@media(min-width:1024px){.kco-video-card,.kco-hero-card{width:420px;min-width:420px}}
.kco-video-card:hover,.kco-hero-card:hover{transform:translateY(-2px);box-shadow:0 12px 26px -12px rgba(2,6,23,.2);border-color:#bfdbfe}
.kco-video-media,.kco-hero-media{position:relative;aspect-ratio:16/10;background:#f1f5f9;overflow:hidden}
.kco-video-media img,.kco-video-media video,.kco-hero-media img,.kco-hero-media video{width:100%;height:100%;object-fit:cover;display:block;transition:transform .35s ease}
.kco-video-card:hover .kco-video-media img,.kco-video-card:hover .kco-video-media video,.kco-hero-card:hover .kco-hero-media img,.kco-hero-card:hover .kco-hero-media video{transform:scale(1.03)}
.kco-hero-type{position:absolute;top:.65rem;left:.65rem;display:inline-flex;align-items:center;gap:.3rem;background:rgba(255,255,255,.96);backdrop-filter:blur(6px);color:#0f172a;font-size:10px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;padding:.28rem .6rem;border-radius:999px;border:1px solid #e2e8f0;box-shadow:0 2px 6px rgba(15,23,42,.12)}
.kco-hero-type svg{width:.8rem;height:.8rem;color:#475569}
.kco-hero-video-badge{position:absolute;top:.65rem;right:.65rem;display:inline-flex;align-items:center;gap:.3rem;background:rgba(239,68,68,.92);backdrop-filter:blur(6px);color:#ffffff;font-size:10px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;padding:.3rem .6rem;border-radius:999px;box-shadow:0 2px 8px rgba(239,68,68,.45)}
.kco-hero-video-badge svg{width:.75rem;height:.75rem}
.kco-hero-loc,.kco-video-loc{position:absolute;bottom:.65rem;left:.65rem;right:.65rem;display:flex;align-items:center;gap:.35rem;background:rgba(15,23,42,.62);backdrop-filter:blur(6px);color:#ffffff;font-size:11px;font-weight:600;padding:.32rem .65rem;border-radius:.7rem}
.kco-hero-loc svg,.kco-video-loc svg{width:.85rem;height:.85rem}
.kco-video-badge{position:absolute;top:.65rem;right:.65rem;display:inline-flex;align-items:center;gap:.3rem;font-size:10px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;padding:.28rem .6rem;border-radius:999px;box-shadow:0 2px 8px -2px rgba(0,0,0,.25)}
.kco-video-badge.kco-sale-buy{background:#059669;color:#ffffff}
.kco-video-badge.kco-sale-rent{background:#d97706;color:#ffffff}
.kco-video-badge svg{width:.8rem;height:.8rem}
.kco-video-bigplay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;opacity:1;transition:opacity .2s ease}
.kco-video-playcircle{width:2.75rem;height:2.75rem;border-radius:999px;background:rgba(255,255,255,.92);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;box-shadow:0 6px 16px -4px rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.8);transition:transform .18s ease}
.kco-video-playcircle svg{width:1.1rem;height:1.1rem;color:#2563eb;margin-left:.1rem}
.kco-video-card:hover .kco-video-bigplay,.kco-video-media.video-playing .kco-video-bigplay{opacity:0}
.kco-video-card:hover .kco-video-playcircle{transform:scale(1.08)}
.kco-video-body,.kco-hero-body{display:flex;flex-direction:column;gap:.5rem;padding:.85rem .9rem .95rem}
.kco-hero-price{display:flex;align-items:baseline;gap:.45rem;flex-wrap:wrap}
.kco-hero-price b{font-size:1.25rem;font-weight:900;color:#0f172a;line-height:1}
@media(min-width:640px){.kco-hero-price b{font-size:1.4rem}}
.kco-hero-price span{font-size:.72rem;font-weight:700;color:#64748b}
.kco-hero-title{font-size:.95rem;line-height:1.3;font-weight:700;color:#0f172a;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
@media(min-width:640px){.kco-hero-title{font-size:1.02rem}}
.kco-hero-chips{display:flex;flex-wrap:wrap;gap:.35rem}
.kco-hero-chip{display:inline-flex;align-items:center;gap:.3rem;font-size:10.5px;font-weight:700;color:#475569;background:#f8fafc;border:1px solid #e2e8f0;border-radius:.55rem;padding:.26rem .5rem}
.kco-hero-chip svg{width:.8rem;height:.8rem}
.kco-hero-btn{margin-top:.1rem;display:inline-flex;align-items:center;gap:.4rem;font-size:.8rem;font-weight:800;color:#2563eb;letter-spacing:.01em;text-decoration:none;align-self:flex-start;transition:color .15s ease}
.kco-hero-btn:hover{color:#1d4ed8}
.kco-hero-btn svg{width:.9rem;height:.9rem}
.kco-video-section .kco-video-body .kco-hero-price span{color:#059669;font-weight:800}
.kco-hero-empty{padding:1.2rem;text-align:center;color:#64748b;font-size:.85rem;font-weight:600;background:#f8fafc;border:1px dashed #cbd5e1;border-radius:1rem}
/* Explicit icon sizing — works even on pages without Tailwind (e.g. showroom.html) */
.kco-hero-section [data-lucide].w-3,.kco-video-section [data-lucide].w-3{width:.75rem;height:.75rem}
.kco-hero-section [data-lucide].w-3\.5,.kco-video-section [data-lucide].w-3\.5{width:.875rem;height:.875rem}
.kco-hero-section [data-lucide].w-4,.kco-video-section [data-lucide].w-4{width:1rem;height:1rem}
.kco-hero-section [data-lucide].w-5,.kco-video-section [data-lucide].w-5{width:1.25rem;height:1.25rem}
.kco-hero-section [data-lucide].shrink-0,.kco-video-section [data-lucide].shrink-0{flex-shrink:0}
`;
  document.head.appendChild(st);
}

export function heroCardHtml(listing, kind, cardCls) {
  cleanListing(listing);
  const cls = cardCls || 'kco-hero-card';
  const cover = listingVideoUrl(listing) || '';
  const poster = listingPoster(listing);
  const posterAttr = poster ? ` poster="${esc(poster)}"` : '';
  const pid = escapeHtmlAttr(listing.property_id || listing.id);
  const priceHtml = kind === 'vehicle' && listing.category === 'Trucks'
    ? formatTruckPrice(listing)
    : formatPrice(listing);

  let chips = '';
  let loc = '';
  if (kind === 'house') {
    const flag = flagEmoji(listing.country_code);
    const place = [listing.city, listing.state].filter(Boolean).join(', ') || listing.country || '';
    if (place) loc = `<span class="kco-hero-loc"><i data-lucide="map-pin" class="w-3 h-3 shrink-0"></i>${esc(flag + ' ' + place)}</span>`;
    const c = [];
    if (sp(listing, 'bedrooms') != null) c.push(`<span class="kco-hero-chip"><i data-lucide="bed-double" class="w-3.5 h-3.5"></i>${esc(sp(listing, 'bedrooms'))} Beds</span>`);
    if (sp(listing, 'bathrooms') != null) c.push(`<span class="kco-hero-chip"><i data-lucide="bath" class="w-3.5 h-3.5"></i>${esc(sp(listing, 'bathrooms'))} Baths</span>`);
    if (listing.land_size) c.push(`<span class="kco-hero-chip"><i data-lucide="ruler" class="w-3.5 h-3.5"></i>${esc(listing.land_size)}</span>`);
    if (sp(listing, 'building_size')) c.push(`<span class="kco-hero-chip"><i data-lucide="building-2" class="w-3.5 h-3.5"></i>${esc(sp(listing, 'building_size'))}</span>`);
    if (sp(listing, 'year_built')) c.push(`<span class="kco-hero-chip"><i data-lucide="calendar" class="w-3.5 h-3.5"></i>${esc(sp(listing, 'year_built'))}</span>`);
    const t = houseTypeLabel(listing);
    chips = c.join('');
    if (!loc) loc = '';
    const markup = `
      <a href="/details.html?id=${escapeHtmlAttr(pid)}" class="${cls}">
        <div class="kco-hero-media">
          ${isVideoUrl(cover)
            ? `<video src="${esc(cover)}"${posterAttr} muted loop autoplay playsinline preload="metadata" class="kco-hero-media-video"></video><span class="kco-hero-video-badge"><i data-lucide="play" class="w-3 h-3"></i>Video Tour</span>`
            : `<div class="w-full h-full flex items-center justify-center bg-gray-100"><i data-lucide="video-off" class="w-8 h-8 text-gray-300"></i></div>`}
          <span class="kco-hero-type"><i data-lucide="home" class="w-3 h-3"></i>${esc(t)}</span>
          ${loc}
        </div>
        <div class="kco-hero-body">
          <div class="kco-hero-price"><b>${priceHtml}</b><span>${(listing.listing_status === 'rent') ? 'per month · for rent' : 'for sale'}</span></div>
          <p class="kco-hero-title">${esc(listing.title || '')}</p>
          ${chips ? `<div class="kco-hero-chips">${chips}</div>` : ''}
          <span class="kco-hero-btn">View Property <i data-lucide="arrow-right" class="w-4 h-4"></i></span>
        </div>
      </a>`;
    return markup;
  }

  const c = [];
  if (sp(listing, 'model_year')) c.push(`<span class="kco-hero-chip"><i data-lucide="calendar" class="w-3.5 h-3.5"></i>${esc(sp(listing, 'model_year'))}</span>`);
  if (sp(listing, 'mileage')) c.push(`<span class="kco-hero-chip"><i data-lucide="gauge" class="w-3.5 h-3.5"></i>${esc(sp(listing, 'mileage'))}</span>`);
  if (sp(listing, 'fuel_type')) c.push(`<span class="kco-hero-chip"><i data-lucide="fuel" class="w-3.5 h-3.5"></i>${esc(sp(listing, 'fuel_type'))}</span>`);
  if (sp(listing, 'transmission')) c.push(`<span class="kco-hero-chip"><i data-lucide="cog" class="w-3.5 h-3.5"></i>${esc(sp(listing, 'transmission'))}</span>`);
  if (sp(listing, 'body_type')) c.push(`<span class="kco-hero-chip"><i data-lucide="car-front" class="w-3.5 h-3.5"></i>${esc(sp(listing, 'body_type'))}</span>`);
  chips = c.join('');
  const mediaHtml = isVideoUrl(cover)
    ? `<video src="${esc(cover)}"${posterAttr} muted loop autoplay playsinline preload="metadata" class="kco-hero-media-video"></video><span class="kco-hero-video-badge"><i data-lucide="play" class="w-3 h-3"></i>Video Tour</span>`
    : `<div class="w-full h-full flex items-center justify-center bg-gray-100"><i data-lucide="video-off" class="w-8 h-8 text-gray-300"></i></div>`;
  return `
      <a href="/details.html?id=${escapeHtmlAttr(pid)}" class="${cls}">
        <div class="kco-hero-media">
          ${mediaHtml}
          <span class="kco-hero-type"><i data-lucide="car-front" class="w-3 h-3"></i>${esc(vehicleKindLabel(listing))}</span>
        </div>
        <div class="kco-hero-body">
          <div class="kco-hero-price"><b>${priceHtml}</b><span>· ${esc(sp(listing, 'condition') || 'ready')}</span></div>
          <p class="kco-hero-title">${esc(listing.title || '')}</p>
          ${chips ? `<div class="kco-hero-chips">${chips}</div>` : ''}
          <span class="kco-hero-btn">View Vehicle <i data-lucide="arrow-right" class="w-4 h-4"></i></span>
        </div>
      </a>`;
}

function escapeHtmlAttr(value) {
  return String(value ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function vehicleKindLabel(listing) {
  const cat = String(listing.category || '');
  const map = { 'Cars': 'Car', 'Cars & Vehicles': 'Car', 'Trucks': 'Truck', 'Buses': 'Bus', 'Buses & Coaches': 'Bus', 'Motorhomes': 'Motorhome / RV', 'Motorcycles': 'Motorcycle', 'Marine & Boating': 'Boat / Marine' };
  if (map[cat]) return map[cat];
  const bt = sp(listing, 'body_type');
  return bt || (cat || 'Vehicle');
}

function icon(name) {
  return `<i data-lucide="${name}" class="w-5 h-5"></i>`;
}

function wireDrag(track) {
  let down = false, dragged = false, startX = 0, startScroll = 0;
  track.addEventListener('pointerdown', (e) => {
    down = true; dragged = false;
    startX = e.clientX; startScroll = track.scrollLeft;
    track.classList.add('dragging');
    try { track.setPointerCapture(e.pointerId); } catch {}
  });
  track.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    track.scrollLeft = startScroll - dx;
  });
  const end = (e) => {
    down = false;
    track.classList.remove('dragging');
    // Only a real swipe (the track actually scrolled well past tap-jitter)
    // suppresses the click so the browser navigates the tapped card instead.
    if (e && Math.abs(track.scrollLeft - startScroll) > 20) dragged = true;
  };
  track.addEventListener('pointerup', end);
  track.addEventListener('pointercancel', end);
  track.addEventListener('pointerleave', end);
  track.addEventListener('click', (e) => {
    if (dragged) { e.preventDefault(); e.stopPropagation(); }
  }, true);
}

function heroSection(opts) {
  const sec = document.createElement('section');
  sec.className = `kco-hero-section ${opts.kindCls}`;
  sec.setAttribute('aria-label', opts.title);

  const arrows = `
    <button class="kco-hero-arrow left" aria-label="Scroll ${opts.title} left">${SVG_CH_L}</button>
    <button class="kco-hero-arrow right" aria-label="Scroll ${opts.title} right">${SVG_CH_R}</button>`;

  const head = `
    <div class="kco-hero-panel">
      <div class="kco-hero-head">
        <div class="kco-hero-headleft">
          ${opts.icon ? `<span class="kco-hero-ic">${icon(opts.icon)}</span>` : ''}
          <div class="min-w-0">
            <h3>${esc(opts.title)}</h3>
            <p>${esc(opts.subtitle)}</p>
          </div>
        </div>
        <span class="kco-hero-count">${opts.listings.length} Listing${opts.listings.length === 1 ? '' : 's'}</span>
        ${opts.seeAll ? `<a class="kco-hero-seeall" href="/showroom.html?cat=${opts.cat}">${esc(opts.seeAllLabel || 'See All')} <i data-lucide="arrow-up-right" class="w-4 h-4"></i></a>` : ''}
      </div>
      <div class="kco-hero-hscroll">
        ${opts.listings.length
          ? opts.listings.map(l => opts.card(l)).join('')
          : '<div class="kco-hero-empty">New listings will appear here as soon as they are published.</div>'}
      </div>
      ${arrows}
    </div>`;

  sec.innerHTML = head;

  const track = sec.querySelector('.kco-hero-hscroll');
  wireDrag(track);
  const left = sec.querySelector('.kco-hero-arrow.left');
  const right = sec.querySelector('.kco-hero-arrow.right');
  const update = () => {
    const max = track.scrollWidth - track.clientWidth - 2;
    left.disabled = track.scrollLeft <= 2;
    right.disabled = track.scrollLeft >= max;
  };
  left.addEventListener('click', () => track.scrollBy({ left: -track.clientWidth * 0.8, behavior: 'smooth' }));
  right.addEventListener('click', () => track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' }));
  track.addEventListener('scroll', update, { passive: true });
  update();

  return sec;
}

const SVG_CH_L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>';
const SVG_CH_R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';

function renderHeroRows() {
  const container = document.getElementById(CONTAINER_ID);
  if (!container) return;
  heroStyles();
  const frag = document.createDocumentFragment();
  // The video-tour row and the Houses For Sale & Rent gallery were removed by
  // request — the storefront falls straight through to the listings below.
  container.replaceChildren(frag);
  if (window.lucide) lucide.createIcons();
}

let _bootstrapped = false;
function bootstrap() {
  if (_bootstrapped) return;
  _bootstrapped = true;
  if (!document.getElementById(CONTAINER_ID)) return;
  hydrateDBListingsFromCache();
  renderHeroRows();
  loadDBListings().then(() => renderHeroRows()).catch(() => {});
  window.addEventListener('showroom-categories-ready', () => renderHeroRows());
  window.addEventListener('kco-db-refresh', () => renderHeroRows());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}