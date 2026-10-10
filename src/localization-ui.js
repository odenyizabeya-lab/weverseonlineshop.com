/* ================================================================
   Weverse Online Shop — Localization UI
   ================================================================
   Floating location/language/currency selector. Appears on every
   page. Shows current country flag + language. Opens a modal to
   change country, language, currency, timezone. Shows VPN notice.
   ================================================================ */

import { COUNTRIES } from './country-data.js';
import {
  LANGUAGES, ALL_CURRENCIES, getAllTimezones,
  getLocale, setCountry, setLanguage, setCurrency, setTimezone,
  isVPN, onLocaleChange, getLanguageInfo, getCurrencyInfo,
} from './localization.js';

let modalOpen = false;

// ── Inject styles ──────────────────────────────────────────────
function injectStyles() {
  if (document.getElementById('kco-loc-styles')) return;
  const style = document.createElement('style');
  style.id = 'kco-loc-styles';
  style.textContent = `
    @keyframes kcoLocPulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
    @keyframes kcoLocSlideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes kcoLocFadeIn { from { opacity:0; } to { opacity:1; } }
    .kco-loc-fab { animation: kcoLocFadeIn 0.4s ease; }
    .kco-loc-modal { animation: kcoLocSlideUp 0.3s ease; }
    .kco-loc-overlay { animation: kcoLocFadeIn 0.2s ease; }
    .kco-loc-dot { animation: kcoLocPulse 2s ease-in-out infinite; }
    .kco-loc-search:focus { border-color: rgba(59,130,246,0.5); box-shadow: 0 0 0 2px rgba(59,130,246,0.15); }
    .kco-loc-list::-webkit-scrollbar { width: 6px; }
    .kco-loc-list::-webkit-scrollbar-track { background: transparent; }
    .kco-loc-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
    .kco-loc-list::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.25); }
    .kco-loc-item:hover { background: rgba(59,130,246,0.1); }
    .kco-loc-tab { transition: all 0.2s ease; }
    .kco-loc-tab.active { background: rgba(59,130,246,0.15); border-color: rgba(59,130,246,0.4); color: #60a5fa; }
  `;
  document.head.appendChild(style);
}

// ── Build the floating selector button ────────────────────────
function buildFab() {
  if (document.getElementById('kco-loc-fab')) return;

  const fab = document.createElement('button');
  fab.id = 'kco-loc-fab';
  fab.className = 'kco-loc-fab fixed bottom-5 left-5 z-[55] flex items-center gap-2 px-3 py-2.5 rounded-xl text-white text-xs font-semibold shadow-lg transition-all hover:scale-105';
  fab.style.background = '#1e293b';
  fab.style.border = '1px solid rgba(255,255,255,0.12)';
  fab.setAttribute('aria-label', 'Change location, language, or currency');
  fab.innerHTML = `<span id="kco-loc-flag" class="text-base leading-none">🇺🇸</span><span id="kco-loc-lang" class="text-[11px] uppercase tracking-wide text-gray-300">EN</span><i data-lucide="chevron-up" class="w-3.5 h-3.5 text-gray-500"></i>`;
  fab.onclick = openModal;
  document.body.appendChild(fab);
  if (window.lucide) lucide.createIcons();
}

function updateFab() {
  const loc = getLocale();
  const flagEl = document.getElementById('kco-loc-flag');
  const langEl = document.getElementById('kco-loc-lang');
  if (flagEl) flagEl.textContent = loc.flag;
  if (langEl) langEl.textContent = loc.language.toUpperCase();
}

// ── Build the modal ────────────────────────────────────────────
function buildModal() {
  if (document.getElementById('kco-loc-modal')) return;

  const overlay = document.createElement('div');
  overlay.id = 'kco-loc-modal';
  overlay.className = 'kco-loc-overlay fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4';
  overlay.style.display = 'none';
  overlay.innerHTML = `
    <div class="kco-loc-modal w-full sm:max-w-md bg-slate-900 border border-blue-500/20 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
      <!-- Header -->
      <div class="flex items-center justify-between px-4 py-3 border-b border-white/10" style="background:linear-gradient(135deg,#1e1e2e 0%,#1a1a2e 50%,#16213e 100%)">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:rgba(59,130,246,0.15)">
            <i data-lucide="globe" class="w-4 h-4 text-blue-400"></i>
          </div>
          <h3 class="text-sm font-bold text-white">Your Location</h3>
        </div>
        <button id="kco-loc-close" class="h-8 px-2 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition text-[10px] font-bold uppercase tracking-wide" aria-label="Close">
          🔙 Back
        </button>
      </div>

      <!-- VPN notice -->
      <div id="kco-loc-vpn" class="px-4 py-2.5 bg-amber-500/10 border-b border-amber-500/20 hidden">
        <div class="flex items-start gap-2">
          <i data-lucide="shield-alert" class="w-4 h-4 text-amber-400 shrink-0 mt-0.5"></i>
          <p class="text-[11px] text-amber-200 leading-relaxed">We detected you may be using a VPN or proxy. Your detected location may differ from your actual location. Please confirm or manually select your preferred country, language, timezone, and currency.</p>
        </div>
      </div>

      <!-- Detected location info -->
      <div id="kco-loc-detected" class="px-4 py-3 border-b border-white/10">
        <div class="flex items-center gap-2 text-xs text-gray-400">
          <i data-lucide="map-pin" class="w-3.5 h-3.5 text-blue-400"></i>
          <span id="kco-loc-detected-text">Detecting your location…</span>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-1.5 px-4 py-3 border-b border-white/10">
        <button class="kco-loc-tab active flex-1 text-[11px] font-semibold py-2 px-2 rounded-lg border border-blue-500/20 text-gray-300 flex items-center justify-center gap-1.5" data-tab="country"><i data-lucide="flag" class="w-3.5 h-3.5"></i>Country</button>
        <button class="kco-loc-tab flex-1 text-[11px] font-semibold py-2 px-2 rounded-lg border border-white/10 text-gray-300 flex items-center justify-center gap-1.5" data-tab="language"><i data-lucide="languages" class="w-3.5 h-3.5"></i>Language</button>
        <button class="kco-loc-tab flex-1 text-[11px] font-semibold py-2 px-2 rounded-lg border border-white/10 text-gray-300 flex items-center justify-center gap-1.5" data-tab="currency"><i data-lucide="dollar-sign" class="w-3.5 h-3.5"></i>Currency</button>
        <button class="kco-loc-tab flex-1 text-[11px] font-semibold py-2 px-2 rounded-lg border border-white/10 text-gray-300 flex items-center justify-center gap-1.5" data-tab="timezone"><i data-lucide="clock" class="w-3.5 h-3.5"></i>Timezone</button>
      </div>

      <!-- Search -->
      <div class="px-4 py-2.5 border-b border-white/10">
        <div class="relative">
          <i data-lucide="search" class="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2"></i>
          <input id="kco-loc-search" type="text" placeholder="Search…" class="kco-loc-search w-full bg-slate-800/80 text-sm text-gray-200 placeholder-gray-500 rounded-lg pl-9 pr-3 py-2 border border-white/10 focus:outline-none transition">
        </div>
      </div>

      <!-- List -->
      <div id="kco-loc-list" class="kco-loc-list flex-1 overflow-y-auto px-2 py-2">
      </div>

      <!-- Live clock footer (hidden — kept in the code, not shown) -->
      <div class="hidden px-4 py-2.5 border-t border-white/10 bg-slate-900/80">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="kco-loc-dot w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
            <span id="kco-loc-clock" class="text-[11px] text-gray-400 font-mono"></span>
          </div>
          <span id="kco-loc-tz" class="text-[10px] text-gray-600"></span>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  if (window.lucide) lucide.createIcons();

  document.getElementById('kco-loc-close').onclick = closeModal;
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

  // Tab switching
  document.querySelectorAll('.kco-loc-tab').forEach(tab => {
    tab.onclick = () => switchTab(tab.dataset.tab);
  });

  // Search
  const searchInput = document.getElementById('kco-loc-search');
  searchInput.addEventListener('input', () => renderList(currentTab, searchInput.value));
}

// ── Current tab state ──────────────────────────────────────────
let currentTab = 'country';

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.kco-loc-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  const searchInput = document.getElementById('kco-loc-search');
  if (searchInput) { searchInput.value = ''; }
  renderList(tab, '');
  if (window.lucide) lucide.createIcons();
}

// ── Render list based on tab ───────────────────────────────────
function renderList(tab, query) {
  const list = document.getElementById('kco-loc-list');
  if (!list) return;
  const loc = getLocale();
  const q = query.toLowerCase().trim();
  list.innerHTML = '';

  let items = [];

  if (tab === 'country') {
    items = COUNTRIES.map(c => ({
      id: c.code,
      label: `${c.flag} ${c.name}`,
      sub: c.code,
      active: c.code === loc.country,
    }));
    if (q) items = items.filter(i => i.label.toLowerCase().includes(q) || i.sub.toLowerCase().includes(q));
  } else if (tab === 'language') {
    items = LANGUAGES.map(l => ({
      id: l.code,
      label: l.native,
      sub: l.name,
      active: l.code === loc.language,
    }));
    if (q) items = items.filter(i => i.label.toLowerCase().includes(q) || i.sub.toLowerCase().includes(q));
  } else if (tab === 'currency') {
    items = ALL_CURRENCIES.map(c => {
      const info = getCurrencyInfo(c);
      return {
        id: c,
        label: `${info.symbol || c} ${c}`,
        sub: info.locale || '',
        active: c === loc.currency,
      };
    });
    if (q) items = items.filter(i => i.id.toLowerCase().includes(q) || i.label.toLowerCase().includes(q));
  } else if (tab === 'timezone') {
    const zones = getAllTimezones();
    items = zones.map(tz => ({
      id: tz,
      label: tz.replace(/_/g, ' '),
      sub: '',
      active: tz === loc.timezone,
    }));
    if (q) items = items.filter(i => i.label.toLowerCase().includes(q));
  }

  items.forEach(item => {
    const el = document.createElement('button');
    el.className = `kco-loc-item w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition ${item.active ? 'bg-blue-500/15 border border-blue-500/30' : 'border border-transparent'}`;
    el.innerHTML = `
      <div class="min-w-0">
        <p class="text-sm text-gray-200 truncate">${item.label}</p>
        ${item.sub ? `<p class="text-[10px] text-gray-500 truncate">${item.sub}</p>` : ''}
      </div>
      ${item.active ? '<i data-lucide="check" class="w-4 h-4 text-blue-400 shrink-0"></i>' : ''}
    `;
    el.onclick = () => selectItem(tab, item.id);
    list.appendChild(el);
  });

  if (!items.length) {
    list.innerHTML = `<p class="text-center text-xs text-gray-500 py-8">No results found</p>`;
  }

  if (window.lucide) lucide.createIcons();
}

function selectItem(tab, id) {
  if (tab === 'country') setCountry(id);
  else if (tab === 'language') setLanguage(id);
  else if (tab === 'currency') setCurrency(id);
  else if (tab === 'timezone') setTimezone(id);
  renderList(tab, document.getElementById('kco-loc-search')?.value || '');
  updateDetectedInfo();
}

// ── Update detected location display ──────────────────────────
function updateDetectedInfo() {
  const loc = getLocale();
  const textEl = document.getElementById('kco-loc-detected-text');
  const vpnEl = document.getElementById('kco-loc-vpn');
  const tzEl = document.getElementById('kco-loc-tz');

  if (textEl) {
    // Only ever present the visitor's country at an approximate level.
    // Never show city/region/street or claim an exact physical location.
    const approx = loc.detectionSource && loc.detectionSource !== 'default'
      ? 'Approximate location (detected from your connection): '
      : '';
    textEl.textContent = `${approx}${loc.flag} ${loc.countryName}`;
  }

  if (vpnEl) {
    vpnEl.classList.toggle('hidden', !loc.isVPN);
  }

  if (tzEl) {
    tzEl.textContent = loc.timezone?.replace(/_/g, ' ') || '';
  }
}

// ── Live clock in modal ───────────────────────────────────────
let modalClockInterval = null;

function startModalClock() {
  const el = document.getElementById('kco-loc-clock');
  if (!el) return;
  function update() {
    const loc = getLocale();
    try {
      el.textContent = new Intl.DateTimeFormat(loc.language, {
        timeZone: loc.timezone,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(new Date());
    } catch (e) {
      el.textContent = new Date().toLocaleString();
    }
  }
  update();
  if (modalClockInterval) clearInterval(modalClockInterval);
  modalClockInterval = setInterval(update, 1000);
}

function stopModalClock() {
  if (modalClockInterval) { clearInterval(modalClockInterval); modalClockInterval = null; }
}

// ── Open / close ───────────────────────────────────────────────
function openModal() {
  buildModal();
  const modal = document.getElementById('kco-loc-modal');
  modal.style.display = 'flex';
  modalOpen = true;
  switchTab('country');
  updateDetectedInfo();
  startModalClock();
  setTimeout(() => document.getElementById('kco-loc-search')?.focus(), 200);
}

function closeModal() {
  const modal = document.getElementById('kco-loc-modal');
  if (modal) modal.style.display = 'none';
  modalOpen = false;
  stopModalClock();
}

// ── Initialize ────────────────────────────────────────────────
export function initLocalizationUI() {
  injectStyles();
  buildFab();
  updateFab();

  // Update FAB when locale changes
  onLocaleChange(() => {
    updateFab();
    if (modalOpen) {
      updateDetectedInfo();
      renderList(currentTab, document.getElementById('kco-loc-search')?.value || '');
    }
  });
}
