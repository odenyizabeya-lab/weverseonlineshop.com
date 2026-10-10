// ═══════════════════════════════════════════════════════════════════════════
// live-promo-alerts.js — "Featured Product Alerts" / "Live Product Promotions".
//
// Small, professional notification toasts that appear now and then at the
// bottom corner of EVERY page. Each alert shows a REAL product from the store
// (actual image, actual name, current price) with a "View Product →" action
// that opens that product's details page. Clicking the card works too.
//
// Rules (kept deliberately strict):
//   • Only real, visible products are ever shown — never fake "someone just
//     bought this" claims or invented numbers.
//   • The owner can choose which products appear (live_promo_product_ids in
//     site_settings, managed from the Admin → Content Manager). When no
//     products are chosen, real products are picked automatically.
//   • Each alert has a close (×) button and disappears on its own.
//   • Not shown too frequently (default: first after ~12s, then every 60s)
//     and stays small so it never covers the product or the page content.
// ═══════════════════════════════════════════════════════════════════════════

import {
  loadPromoPool,
  getPromoPool,
  esc,
  mediaThumbHtml,
  priceHtml,
  pickPromoProducts,
  loadPromoSettings,
  DEFAULT_PROMO_SETTINGS,
} from './promo-pool.js';

const HOST = () => document.getElementById('live-promo-alerts');
const DISMISSED_KEY = 'kco_live_promo_dismissed_v1';

function readDismissed() {
  try { return JSON.parse(localStorage.getItem(DISMISSED_KEY) || '{}'); }
  catch { return {}; }
}
function isDismissed(id) {
  const d = readDismissed();
  const t = d[id];
  if (!t) return false;
  // Stay dismissed for 2 hours, then it may appear again naturally.
  return Date.now() - t < 2 * 60 * 60 * 1000;
}
function markDismissed(id) {
  try {
    const d = readDismissed();
    d[id] = Date.now();
    localStorage.setItem(DISMISSED_KEY, JSON.stringify(d));
  } catch { /* ignore */ }
}

// Build one toast. `emoji`/`label` are a polite, real headline — never a fake
// "X people bought this" claim.
function toastHtml(l) {
  const title = esc(l.title || l.name || 'Featured product');
  const label = l.listing_type === 'vehicle'
    ? (l.category || 'Featured Vehicle')
    : l.listing_type === 'property' ? 'Featured Property'
    : (l.subcategory || l.category || 'Featured Product');
  return `
    <div class="live-promo-toast pointer-events-auto flex items-center gap-3 bg-white border border-gray-200 rounded-2xl shadow-2xl shadow-black/15 p-3 pr-4 cursor-pointer hover:shadow-black/25 transition" data-promo-id="${esc(l.property_id || l.id || '')}">
      <div class="shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
        ${mediaThumbHtml(l, 'w-full h-full object-cover')}
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-[9px] font-black uppercase tracking-wider text-blue-600 flex items-center gap-1">
          <i data-lucide="star" class="w-3 h-3"></i> ${esc(label)}
        </p>
        <p class="text-[12px] font-bold text-gray-900 leading-snug truncate mt-0.5">${title}</p>
        <div class="flex items-center justify-between mt-1">
          <span class="text-[12px] font-black text-blue-600">${priceHtml(l)}</span>
          <span class="text-[10px] font-black text-emerald-600 inline-flex items-center gap-0.5">View Product <i data-lucide="arrow-right" class="w-3 h-3"></i></span>
        </div>
      </div>
      <button class="live-promo-close shrink-0 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition" aria-label="Close">
        <i data-lucide="x" class="w-3.5 h-3.5"></i>
      </button>
    </div>`;
}

function showToast(l) {
  const host = HOST();
  if (!host) return;
  const id = l.property_id || l.id;
  if (isDismissed(id)) return;

  // Remove any toast currently visible so only one is ever on screen.
  host.querySelectorAll('.live-promo-toast').forEach(el => el.remove());

  host.insertAdjacentHTML('beforeend', toastHtml(l));
  const el = host.querySelector('.live-promo-toast');
  if (!el) return;
  el.style.opacity = '0';
  el.style.transform = 'translateY(14px)';

  const href = `/details.html?id=${encodeURIComponent(id)}`;
  const close = el.querySelector('.live-promo-close');

  const open = (e) => {
    e.preventDefault(); e.stopPropagation();
    el.style.transform = 'translateY(12px)'; el.style.opacity = '0';
    setTimeout(() => { el.remove(); }, 220);
    window.location.href = href;
  };
  close.addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
    if (id) markDismissed(id);
    el.style.transform = 'translateY(12px)'; el.style.opacity = '0';
    setTimeout(() => el.remove(), 220);
  });
  el.addEventListener('click', open);

  if (window.lucide) { try { lucide.createIcons(); } catch { /* ignore */ } }

  // Entry animation.
  requestAnimationFrame(() => {
    el.style.transition = 'transform .35s ease, opacity .35s ease';
    el.style.transform = 'translateY(0)';
    el.style.opacity = '1';
  });

  // Auto-hide after ~7 seconds (or when dismissed earlier).
  setTimeout(() => {
    if (el.isConnected) {
      el.style.transform = 'translateY(12px)';
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 260);
    }
  }, 7000);
}

async function init() {
  const host = HOST();
  if (!host) return;

  let settings = { ...DEFAULT_PROMO_SETTINGS };
  try { settings = await loadPromoSettings(); } catch { /* keep defaults */ }
  if (settings.live_promo_enabled === false) return;

  let pool = [];
  try {
    await loadPromoPool();
    pool = getPromoPool() || [];
  } catch { /* continue */ }
  if (!pool.length) return;

  const queue = pickPromoProducts(pool, settings, 10);
  if (!queue.length) return;

  let idx = 0;
  const firstDelay = Math.max(3, Number(settings.live_promo_first_delay_seconds) || 12) * 1000;
  const interval = Math.max(20, Number(settings.live_promo_interval_seconds) || 60) * 1000;

  const tick = () => {
    if (HOST() && getPromoPool().length) {
      const l = queue[idx % queue.length];
      showToast(l);
      idx += 1;
    }
  };

  setTimeout(() => {
    tick();
    setInterval(tick, interval);
  }, firstDelay);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();