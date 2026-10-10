import { supabase } from './supabase-client.js';
import { getCurrentUser } from './auth.js';
import { trackEvent } from './analytics.js';
import { SHOWROOM_LISTINGS, findListingById, formatPrice, flagEmoji, getAllListings, loadDBListings, loadFullListingById, videoCoverOf } from './showroom-data.js';
import { getTruckById } from './truck-data.js';
import { getMotorhomeById } from './motorhome-data.js';
import { getCarById } from './car-data.js';
import { getPhoneById } from './phone-data.js';
import { PRODUCT_LISTINGS } from './products-data.js';
import { PRODUCT_EXTRA_LISTINGS } from './products-extra.js';
import { detectCurrency, getCountryByCode, COUNTRIES, SUPPORTED_CURRENCIES } from './country-data.js';
import { buildFallbackNotice, getActiveBankAccounts, getPaymentInstructions, getSupportedCurrenciesFromAccounts, isManualTransferRequired, loadPaymentSettings, resolveAccountForCountry } from './payment-settings.js';
import { convertFromUSD, fmtLocal, flwSupportedCurrency, preloadFx } from './fx.js';

const PRODUCT_LOOKUP = [...PRODUCT_LISTINGS, ...PRODUCT_EXTRA_LISTINGS];
function findProductById(id) {
  return PRODUCT_LOOKUP.find(l => l.property_id === id) || null;
}

function videoThumbSrcHtml(listing) {
  const src = videoCoverOf(listing);
  return src ? `<video src="${String(src).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}" class="w-full h-full object-cover" muted playsinline preload="metadata"></video>`
    : `<div class="w-full h-full flex items-center justify-center bg-gray-50"><i data-lucide="video-off" class="w-5 h-5 text-gray-300"></i></div>`;
}

/* ── State ──────────────────────────────────────────────────── */
let state = {
  user: null,
  isGuest: false,
  listing: null,
  quantity: 1,
  selectedCurrency: 'USD',
  countryCode: 'US',
  cartItems: [],
  step: 1, // 1=cart/review, 2=shipping/billing, 3=payment
  paymentMethod: 'flutterwave', // 'flutterwave' | 'manual_bank_transfer'
  addresses: [],
  selectedAddressId: null,
  billingSame: true,
  billingAddress: '',
  fullName: '',
  email: '',
  phone: '',
  shippingAddr1: '',
  shippingAddr2: '',
  shippingCity: '',
  shippingState: '',
  shippingPostal: '',
  shippingCountry: 'US',
  orderNumber: '',
  processing: false,
  paymentSettings: null,
  manualPaymentAccounts: [],
  manualPaymentInstructions: '',
  paymentGateway: 'both',
  supportEmail: '',
  autoDetectedCurrency: '',
  currencyManuallySelected: false,
};

/* ── Helpers ────────────────────────────────────────────────── */
function generateOrderNumber() {
  const ts = Date.now().toString(36).toUpperCase().slice(-6);
  const rnd = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `W-${ts}${rnd}`;
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3000);
  if (window.lucide) lucide.createIcons();
}

function ripple(btn) {
  btn.addEventListener('click', function (e) {
    if (this.disabled) return;
    const r = this.getBoundingClientRect();
    const rip = document.createElement('span');
    rip.className = 'ripple';
    const s = Math.max(r.width, r.height);
    rip.style.width = rip.style.height = s + 'px';
    rip.style.left = (e.clientX - r.left - s / 2) + 'px';
    rip.style.top = (e.clientY - r.top - s / 2) + 'px';
    this.appendChild(rip);
    setTimeout(() => rip.remove(), 600);
  });
}

function fmtMoney(amount, currency) {
  const n = parseFloat(amount) || 0;
  return `${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
}

// Discount price with the real (original) price crossed out through the middle
// when a discount is active — matches the showroom/details display.
function priceCellHtml(listing) {
  const pay = fmtMoney(listing.price, listing.currency || 'USD');
  const real = parseFloat(listing.real_price);
  if (Number.isFinite(real) && real > 0 && real > parseFloat(listing.price)) {
    return `<span class="price-strike line-through text-gray-400 mr-1 text-xs">${fmtMoney(real, listing.currency || 'USD')}</span><span class="text-amber-600 font-bold">${pay}</span>`;
  }
  return pay;
}

function copyToClipboard(text) {
  const fb = () => { const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(t); };
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).catch(() => fb()); else fb();
  showToast('Copied to clipboard.');
}

function getResolvedManualPayment() {
  const requestedCurrency = state.selectedCurrency === 'USD' && !state.autoDetectedCurrency ? '' : state.selectedCurrency;
  const result = resolveAccountForCountry(state.manualPaymentAccounts, state.countryCode, requestedCurrency);
  return {
    ...result,
    fallbackNotice: result.isFallback ? buildFallbackNotice(result.account, state.countryCode, state.selectedCurrency, state.manualPaymentInstructions) : null,
  };
}

/* ── Particles ──────────────────────────────────────────────── */
function spawnParticles() {
  const c = document.getElementById('particles');
  if (!c) return;
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    const s = Math.random() * 3 + 1;
    p.className = 'particle';
    p.style.width = p.style.height = s + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = '-10px';
    p.style.background = Math.random() > 0.5 ? 'rgba(59,130,246,.4)' : 'rgba(251,191,36,.3)';
    p.style.animationDuration = (Math.random() * 20 + 15) + 's';
    p.style.animationDelay = (Math.random() * 20) + 's';
    c.appendChild(p);
  }
}
spawnParticles();

/* ── Init ───────────────────────────────────────────────────── */
async function init() {
  const root = document.getElementById('checkout-root');
  const params = new URLSearchParams(window.location.search);

  // Check for Flutterwave redirect (verification)
  const status = params.get('status');
  const txId = params.get('transaction_id');
  const txRef = params.get('tx_ref');
  const orderNum = params.get('order_number');

  if (status === 'verify' && txId) {
    await handleFlwVerify(txId, txRef, orderNum || localStorage.getItem('kco_pending_order'));
    return;
  }

  state.isGuest = params.get('guest') === '1';
  if (!state.isGuest) {
    state.user = await getCurrentUser();
    if (!state.user) { window.location.href = '/auth.html?redirect=/checkout.html'; return; }
  }

  // Load listing from URL param or cart
  const listingId = params.get('id');
  if (listingId) {
    let l = await loadFullListingById(listingId);
    state.listing = l || findListingById(listingId) || getTruckById(listingId) || getMotorhomeById(listingId) || getCarById(listingId) || getPhoneById(listingId) || findProductById(listingId);
    if (!state.listing) {
      const [{ generateListingById }, { loadHiddenCatalogIds }] = await Promise.all([
        import('./catalog.js'),
        import('./catalog-hidden-store.js'),
      ]);
      await loadHiddenCatalogIds();
      state.listing = generateListingById(listingId);
    }
    if (!state.listing) {
      state.listing = findListingById(listingId);
    }
    if (!state.listing) {
      root.innerHTML = `
        <div class="text-center py-20 text-gray-500 fade-in">
          <i data-lucide="shopping-bag" class="w-12 h-12 text-gray-300 mx-auto mb-4"></i>
          <h2 class="text-xl font-bold text-gray-800 mb-2">No order selected</h2>
          <p class="text-sm mb-6 max-w-sm mx-auto">This page completes checkout for a product. Please add an item to your cart first.</p>
          <a href="/" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30">
            <i data-lucide="arrow-left" class="w-4 h-4"></i> Browse Marketplace
          </a>
        </div>`;
      if (window.lucide) lucide.createIcons();
      return;
    }
    state.cartItems = [{ listing: state.listing, quantity: 1 }];
  } else {
    // Load from cart
    const cart = JSON.parse(localStorage.getItem('kco_cart') || '[]');
    await loadDBListings();
    const listings = getAllListings();
    const [{ generateListingById }, { loadHiddenCatalogIds }] = await Promise.all([
      import('./catalog.js'),
      import('./catalog-hidden-store.js'),
    ]);
    await loadHiddenCatalogIds();
    state.cartItems = cart.map(entry => {
      const id = typeof entry === 'string' ? entry : (entry && entry.id);
      if (!id) return null;
      const qty = (entry && typeof entry === 'object' && entry.qty) ? Math.max(1, parseInt(entry.qty, 10) || 1) : 1;
      const l = listings.find(x => x.property_id === id) || getTruckById(id) || getMotorhomeById(id) || getCarById(id) || getPhoneById(id) || findProductById(id) || generateListingById(id);
      return l ? { listing: l, quantity: qty } : null;
    }).filter(Boolean);
    if (state.cartItems.length === 0) {
      root.innerHTML = renderEmptyCart();
      if (window.lucide) lucide.createIcons();
      return;
    }
    state.listing = state.cartItems[0].listing;
  }

  // Currency detection
  state.countryCode = localStorage.getItem('kco_country') || 'US';
  if (state.user && !state.isGuest) {
    const { data: profile } = await supabase.from('profiles').select('country_code').eq('user_id', state.user.id).maybeSingle();
    if (profile?.country_code) state.countryCode = profile.country_code;
  }
  state.autoDetectedCurrency = detectCurrency(state.countryCode) || '';
  state.selectedCurrency = state.autoDetectedCurrency || 'USD';
  state.shippingCountry = state.countryCode;
  state.paymentSettings = await loadPaymentSettings();
  state.manualPaymentAccounts = await getActiveBankAccounts();
  state.manualPaymentInstructions = getPaymentInstructions(state.paymentSettings);
  state.paymentGateway = state.paymentSettings.payment_gateway || 'both';
  state.supportEmail = state.paymentSettings.contact_email || state.paymentSettings.brand_email || '';
  if (state.paymentGateway === 'manual' || isManualTransferRequired(getTotal())) state.paymentMethod = 'manual_bank_transfer';
  if (state.paymentGateway === 'flutterwave' && !isManualTransferRequired(getTotal())) state.paymentMethod = 'flutterwave';
  if (!getSupportedCurrenciesFromAccounts(state.manualPaymentAccounts).includes(state.selectedCurrency)) state.selectedCurrency = 'USD';

  // Preload live exchange rates so every amount below is shown in the visitor's
  // real currency (cached for 24h; falls back to USD numbers offline).
  await preloadFx();

  // Load saved addresses
  if (state.user && !state.isGuest) {
    const { data: addrs } = await supabase.from('shipping_addresses').select('*').eq('user_id', state.user.id).order('created_at', { ascending: false });
    state.addresses = addrs || [];
    const def = state.addresses.find(a => a.is_default);
    if (def) state.selectedAddressId = def.id;
    // Pre-fill from profile
    const { data: profile } = await supabase.from('profiles').select('*').eq('user_id', state.user.id).maybeSingle();
    if (profile) {
      state.fullName = profile.display_name || `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
      state.email = state.user.email;
      state.phone = profile.phone_code && profile.phone_number ? `+${profile.phone_code} ${profile.phone_number}` : '';
      state.shippingCountry = profile.country_code || state.countryCode;
    }
  }

  state.orderNumber = generateOrderNumber();
  render();
}

/* ── Calculations ───────────────────────────────────────────── */
function getSubtotal() {
  return state.cartItems.reduce((sum, item) => sum + (item.listing.price * item.quantity), 0);
}

function getShippingCost() {
  return 0;
}

// Large/bulk goods (houses, land, vehicles, etc.) are delivered or collected on
// an individual, quoted basis — never advertised as "Free" shipping.
function isBulkItem(listing) {
  if (!listing) return false;
  const lt = String(listing.listing_type || listing.type || '').toLowerCase();
  if (['property', 'land', 'house', 'vehicle', 'car', 'truck', 'motorhome', 'fitting'].includes(lt)) return true;
  const hay = String(listing.category || listing.subcategory || listing.title || '').toLowerCase();
  return /real estate|house|land|villa|apartment|penthouse|duplex|compound|farm|warehouse|plaza|shop|cinema|truck|car\b|vehicle|motorhome|inverter|generator/.test(hay);
}

function getTaxRate() {
  return 0;
}

function getTaxAmount() {
  return Math.round(getSubtotal() * getTaxRate() * 100) / 100;
}

function getTotal() {
  return getSubtotal() + getShippingCost() + getTaxAmount();
}

// The total shown to the customer, converted from USD to the selected currency
// using live rates. Falls back to the USD figure when rates are unavailable.
function getTotalLocal() {
  return convertFromUSD(getTotal(), state.selectedCurrency);
}

function fmtLocalTotal() {
  return fmtLocal(getTotalLocal(), state.selectedCurrency);
}

// Re-resolve the customer's currency/account when the shipping country changes,
// unless they picked a currency themselves in step 3.
function syncRegionFromShippingCountry() {
  const cc = (state.shippingCountry || '').toUpperCase();
  if (!cc) return;
  state.countryCode = cc;
  localStorage.setItem('kco_country', cc);
  if (!state.currencyManuallySelected) {
    state.autoDetectedCurrency = detectCurrency(cc) || '';
    const supported = getSupportedCurrenciesFromAccounts(state.manualPaymentAccounts);
    state.selectedCurrency = state.autoDetectedCurrency && supported.includes(state.autoDetectedCurrency)
      ? state.autoDetectedCurrency
      : 'USD';
  }
}

/* ── Render ──────────────────────────────────────────────────── */
function render() {
  const root = document.getElementById('checkout-root');
  root.innerHTML = `
    <div class="fade-in">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <a href="/" class="hover:text-blue-600 transition">Home</a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span class="text-blue-600">Checkout</span>
      </div>

      <!-- Step indicator -->
      ${renderStepIndicator()}

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
        <div class="lg:col-span-2 space-y-5">
          ${state.step === 1 ? renderStep1() : ''}
          ${state.step === 2 ? renderStep2() : ''}
          ${state.step === 3 ? renderStep3() : ''}
        </div>
        <div class="lg:col-span-1">
          ${renderOrderSummary()}
        </div>
      </div>
    </div>
  `;
  if (window.lucide) lucide.createIcons();
  document.querySelectorAll('.btn-press').forEach(ripple);
  attachHandlers();
}

function renderStepIndicator() {
  const steps = [
    { num: 1, label: 'Review Cart', icon: 'shopping-cart' },
    { num: 2, label: 'Shipping & Billing', icon: 'map-pin' },
    { num: 3, label: 'Payment', icon: 'credit-card' },
  ];
  return `
    <div class="flex items-center justify-center gap-2 sm:gap-4 mb-6">
      ${steps.map((s, i) => `
        <div class="flex items-center gap-2 sm:gap-4">
          <div class="flex items-center gap-2">
            <div class="step-bar w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${state.step >= s.num ? 'bg-blue-100 border border-blue-300 text-blue-600' : 'bg-gray-50 border border-blue-100 text-gray-600'} ${state.step === s.num ? 'pulse-glow' : ''}">
              ${state.step > s.num ? '<i data-lucide="check" class="w-4 h-4 text-emerald-600"></i>' : `<i data-lucide="${s.icon}" class="w-4 h-4"></i>`}
            </div>
            <span class="text-xs font-bold ${state.step >= s.num ? 'text-gray-900' : 'text-gray-600'} hidden sm:inline">${s.label}</span>
          </div>
          ${i < steps.length - 1 ? `<div class="step-bar w-8 sm:w-16 h-0.5 ${state.step > s.num ? 'bg-blue-500' : 'bg-blue-50'}"></div>` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

/* ── Step 1: Cart Review ────────────────────────────────────── */
function renderStep1() {
  return `
    <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
      <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="shopping-cart" class="w-4 h-4 text-blue-600"></i> Shopping Cart (${state.cartItems.length})
      </h3>
      <div class="space-y-3">
        ${state.cartItems.map((item, i) => {
          return `
            <div class="flex items-center gap-3 p-3 bg-gray-50 border border-blue-100 rounded-xl">
              <div class="w-16 h-16 rounded-lg bg-gray-50 overflow-hidden shrink-0 ring-1 ring-blue-500/10">
                ${videoThumbSrcHtml(item.listing)}
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-bold text-gray-900 truncate">${item.listing.title}</h4>
                <p class="text-xs text-gray-500">${item.listing.property_id}</p>
                <p class="text-sm font-bold text-amber-600 mt-1">${priceCellHtml(item.listing)}</p>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <button onclick="changeQty(${i}, -1)" class="w-9 h-9 bg-gray-100 hover:bg-blue-100 border border-blue-200 rounded-lg text-gray-600 hover:text-gray-900 transition flex items-center justify-center"><i data-lucide="minus" class="w-4 h-4"></i></button>
                <span class="text-sm font-bold text-gray-900 w-8 text-center">${item.quantity}</span>
                <button onclick="changeQty(${i}, 1)" class="w-9 h-9 bg-gray-100 hover:bg-blue-100 border border-blue-200 rounded-lg text-gray-600 hover:text-gray-900 transition flex items-center justify-center"><i data-lucide="plus" class="w-4 h-4"></i></button>
              </div>
              <button onclick="removeCartItem(${i})" class="p-2 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-red-600 transition shrink-0"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <div class="flex justify-end">
      <button onclick="goToStep(2)" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
        Continue to Shipping <i data-lucide="arrow-right" class="w-4 h-4"></i>
      </button>
    </div>
  `;
}

/* ── Step 2: Shipping & Billing ──────────────────────────────── */
function renderStep2() {
  const savedAddresses = state.addresses.length > 0 && !state.isGuest ? `
    <div class="mb-5">
      <h4 class="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">Saved Addresses</h4>
      <div class="space-y-2">
        ${state.addresses.map(a => {
          const c = getCountryByCode(a.country_code);
          return `
            <div onclick="selectAddress('${a.id}')" class="cursor-pointer p-3 border rounded-xl transition ${state.selectedAddressId === a.id ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-blue-100 hover:border-blue-200'}">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-sm font-bold text-gray-900">${a.label}</span>
                ${a.is_default ? '<span class="text-[10px] text-emerald-600 font-bold uppercase">Default</span>' : ''}
              </div>
              <p class="text-xs text-gray-600">${a.full_name} · ${a.address_line1}, ${a.city}, ${a.state} ${a.postal_code} · ${c ? c.flag + ' ' + c.name : a.country_code}</p>
              <p class="text-xs text-gray-500 mt-0.5">${a.phone}</p>
            </div>
          `;
        }).join('')}
        <button onclick="selectAddress('')" class="w-full text-left p-3 border border-dashed border-blue-200 hover:border-blue-300 rounded-xl text-sm text-blue-600 font-bold transition flex items-center gap-2">
          <i data-lucide="plus" class="w-4 h-4"></i> Enter a new address
        </button>
      </div>
    </div>
  ` : '';

  const isNewAddress = !state.selectedAddressId || state.isGuest;

  return `
    <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
      <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="map-pin" class="w-4 h-4 text-blue-600"></i> Shipping Address
      </h3>
      ${savedAddresses}
      ${isNewAddress ? `
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Full Name *</label>
              <input type="text" id="ship-name" value="${state.fullName}" required class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Phone *</label>
              <input type="tel" id="ship-phone" value="${state.phone}" required class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
            </div>
          </div>
          ${state.isGuest ? `
            <div>
              <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Email *</label>
              <input type="email" id="ship-email" value="${state.email}" required class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
            </div>
          ` : ''}
          <div>
            <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Address Line 1 *</label>
            <input type="text" id="ship-addr1" value="${state.shippingAddr1}" required class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Address Line 2 (Optional)</label>
            <input type="text" id="ship-addr2" value="${state.shippingAddr2}" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">City *</label><input type="text" id="ship-city" value="${state.shippingCity}" required class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>
            <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">State *</label><input type="text" id="ship-state" value="${state.shippingState}" required class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>
            <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Postal *</label><input type="text" id="ship-postal" value="${state.shippingPostal}" required class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Country *</label>
            <select id="ship-country" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
              ${COUNTRIES.map(c => `<option value="${c.code}" ${state.shippingCountry === c.code ? 'selected' : ''}>${c.flag} ${c.name}</option>`).join('')}
            </select>
          </div>
        </div>
      ` : ''}
    </div>

    <!-- Billing -->
    <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
      <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="file-text" class="w-4 h-4 text-blue-600"></i> Billing Information
      </h3>
      <label class="flex items-center gap-2 cursor-pointer mb-4">
        <input type="checkbox" id="billing-same" ${state.billingSame ? 'checked' : ''} onchange="toggleBilling()" class="w-4 h-4 rounded border-gray-300 bg-white text-blue-500 focus:ring-blue-500">
        <span class="text-sm text-gray-700">Billing address is the same as shipping address</span>
      </label>
      <div id="billing-fields" class="${state.billingSame ? 'hidden' : ''}">
        <textarea id="billing-address" rows="3" placeholder="Enter full billing address..." class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 resize-none">${state.billingAddress}</textarea>
      </div>
    </div>

    <div class="flex justify-between">
      <button onclick="goToStep(1)" class="btn-press inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-100 border border-blue-200 text-gray-600 font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">
        <i data-lucide="arrow-left" class="w-4 h-4"></i> Back
      </button>
      <button onclick="goToStep(3)" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
        Continue to Payment <i data-lucide="arrow-right" class="w-4 h-4"></i>
      </button>
    </div>
  `;
}

/* ── Step 3: Payment ─────────────────────────────────────────── */
function renderStep3() {
  const supportedCurrencies = getSupportedCurrenciesFromAccounts(state.manualPaymentAccounts);
  const manualPayment = getResolvedManualPayment();
  const isHighValue = isManualTransferRequired(getTotal());
  const noAccounts = state.manualPaymentAccounts.length === 0;
  const showFlutterwave = (state.paymentGateway === 'both' || state.paymentGateway === 'flutterwave') && !isHighValue;
  const showManual = (state.paymentGateway === 'both' || state.paymentGateway === 'manual') && !noAccounts;
  const canPlaceOrder = state.paymentMethod === 'manual_bank_transfer'
    ? !!(manualPayment.account && state.paymentSettings)
    : showFlutterwave;
  return `
    <!-- High-value: manual transfer is mandatory -->
    ${isHighValue ? `
    <div class="glass border-2 border-amber-300 rounded-2xl p-5 slide-up">
      <div class="flex items-start gap-3">
        <div class="p-2.5 bg-amber-100 rounded-xl shrink-0"><i data-lucide="shield-alert" class="w-5 h-5 text-amber-600"></i></div>
        <div class="flex-1 min-w-0">
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">Manual Bank Transfer Required for High-Value Orders</h3>
          <p class="text-xs text-gray-600 leading-relaxed mt-2">For purchases of 1,000 USD, EUR, GBP, or more, manual bank transfer is required for security and order verification. This allows us to confirm the payment directly through our business bank account and properly verify the customer's delivery or collection information.</p>
          <p class="text-xs text-gray-600 leading-relaxed mt-2">After completing the transfer, upload your payment receipt and provide your correct delivery address or collection details. Our team will verify the payment before the order is approved.</p>
          <p class="text-xs text-gray-600 leading-relaxed mt-2">Your order will remain pending until the payment has been confirmed by our bank.</p>
        </div>
      </div>
    </div>
    ` : ''}

    <!-- No bank accounts configured yet -->
    ${noAccounts ? `
    <div class="glass border border-amber-300 rounded-2xl p-5 slide-up">
      <div class="flex items-start gap-3">
        <div class="p-2.5 bg-amber-100 rounded-xl"><i data-lucide="alert-triangle" class="w-5 h-5 text-amber-600"></i></div>
        <div class="flex-1">
          <h3 class="text-sm font-bold text-gray-900">Bank transfer is temporarily unavailable</h3>
          <p class="text-xs text-gray-600 mt-1">Our bank transfer channels are being configured. Please contact support at ${state.supportEmail ? `<a class="text-blue-600 underline" href="mailto:${state.supportEmail}">${state.supportEmail}</a>` : '<a class="text-blue-600 underline" href="/contact.html">our contact page</a>'} to complete your order securely.</p>
        </div>
      </div>
    </div>
    ` : ''}

    <!-- Payment method selection -->
    <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
      <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="credit-card" class="w-4 h-4 text-blue-600"></i> Payment Method
      </h3>
      <div class="space-y-3">
        <!-- Flutterwave (card/ATM) — only for orders below the high-value threshold -->
        ${showFlutterwave ? `<div onclick="selectPaymentMethod('flutterwave')" class="pay-method cursor-pointer p-4 border rounded-xl transition ${state.paymentMethod === 'flutterwave' ? 'selected' : 'bg-gray-50 border-blue-100 hover:border-blue-200'}">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center"><i data-lucide="credit-card" class="w-5 h-5 text-blue-600"></i></div>
            <div class="flex-1">
              <h4 class="text-sm font-bold text-gray-900">Card / ATM / Bank Transfer</h4>
              <p class="text-xs text-gray-500">Pay instantly by card, ATM, or mobile money (Flutterwave)</p>
            </div>
            <div class="w-5 h-5 rounded-full border-2 ${state.paymentMethod === 'flutterwave' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'} flex items-center justify-center">
              ${state.paymentMethod === 'flutterwave' ? '<div class="w-2 h-2 bg-white rounded-full"></div>' : ''}
            </div>
          </div>
        </div>` : ''}

        <!-- Manual Bank Transfer -->
        ${showManual ? `<div onclick="selectPaymentMethod('manual_bank_transfer')" class="pay-method cursor-pointer p-4 border rounded-xl transition ${state.paymentMethod === 'manual_bank_transfer' ? 'selected' : 'bg-gray-50 border-blue-100 hover:border-blue-200'}">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center"><i data-lucide="landmark" class="w-5 h-5 text-blue-600"></i></div>
            <div class="flex-1">
              <h4 class="text-sm font-bold text-gray-900">Manual Bank Transfer ${isHighValue ? '<span class="ml-1 text-[9px] align-middle bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full border border-amber-300">REQUIRED</span>' : ''}</h4>
              <p class="text-xs text-gray-500">Pay the exact amount to the matched account below, then upload your receipt</p>
            </div>
            <div class="w-5 h-5 rounded-full border-2 ${state.paymentMethod === 'manual_bank_transfer' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'} flex items-center justify-center">
              ${state.paymentMethod === 'manual_bank_transfer' ? '<div class="w-2 h-2 bg-white rounded-full"></div>' : ''}
            </div>
          </div>
        </div>` : ''}
      </div>
    </div>

    <!-- Currency selector -->
    <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
      <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-3">
        <i data-lucide="globe" class="w-4 h-4 text-blue-600"></i> Payment Currency
      </h3>
      <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
        ${supportedCurrencies.map(c => {
          const acc = state.manualPaymentAccounts.find(account => account.currency === c);
          if (!acc) return '';
          return `<button onclick="selectCurrency('${c}')" class="btn-press flex flex-col items-center gap-1 p-2.5 rounded-xl border transition relative overflow-hidden ${c === state.selectedCurrency ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-gray-50 border-blue-100 text-gray-600 hover:border-blue-200'}">
            <span class="text-xl">${acc.flag}</span><span class="text-xs font-bold">${c}</span>
          </button>`;
        }).join('')}
      </div>
    </div>

    <!-- Bank account details (if manual) -->
    ${state.paymentMethod === 'manual_bank_transfer' && manualPayment.account ? renderBankDetails(manualPayment.account, manualPayment.fallbackNotice, state.manualPaymentInstructions, { isHighValue }) : ''}

    <!-- Place order button -->
    <div class="space-y-3">
      ${state.paymentMethod === 'flutterwave' ? `
        <button onclick="payWithFlutterwave()" id="flw-pay-btn" class="btn-press w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden">
          <i data-lucide="credit-card" class="w-5 h-5"></i> Pay ${fmtLocalTotal()} with Card / ATM
        </button>
      ` : `
        <button onclick="placeOrderManual()" id="manual-pay-btn" ${canPlaceOrder ? '' : 'disabled'} class="btn-press w-full ${canPlaceOrder ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-600/30' : 'bg-gray-300 text-gray-500 cursor-not-allowed'} text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wide transition flex items-center justify-center gap-2 relative overflow-hidden">
          <i data-lucide="landmark" class="w-5 h-5"></i> ${isHighValue ? `Pay ${fmtLocalTotal()} by Bank Transfer` : 'Place Order & Upload Receipt'}
        </button>
      `}
      <button onclick="goToStep(2)" class="btn-press w-full bg-gray-100 hover:bg-gray-100 border border-blue-200 text-gray-600 font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">
        <i data-lucide="arrow-left" class="w-4 h-4 inline mr-2"></i> Back to Shipping
      </button>
    </div>

    <p class="text-center text-xs text-gray-500 flex items-center justify-center gap-1.5 mt-3">
      <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i> Your payment is secured with SSL encryption.
    </p>
  `;
}

function renderBankDetails(acc, fallbackNotice, instructions, opts = {}) {
  const group = [
    { label: 'Beneficiary Name', value: acc.beneficiary },
    { label: 'Bank Name', value: acc.bankName },
  ];
  const fields = [
    { label: 'Account Number', value: acc.accountNumber },
    { label: 'Account Type', value: acc.accountType },
    { label: 'IBAN', value: acc.iban },
    { label: 'SWIFT / BIC', value: acc.swift },
    { label: 'Routing (ABA)', value: acc.routing },
    { label: 'Sort Code', value: acc.sortCode },
    { label: 'Bank Code', value: acc.bankCode },
    { label: 'Branch Code', value: acc.branchCode },
    { label: 'Institution Number', value: acc.institutionNumber },
    { label: 'Transit Number', value: acc.transitNumber },
    { label: 'BSB Code', value: acc.bsbCode },
    { label: 'Bank Address', value: acc.address },
  ].filter(f => f.value && f.value.trim() !== '');

  const allCopyFields = [...group, ...fields];
  const copyAllText = allCopyFields.map(f => `${f.label}: ${f.value}`).join('\n');

  return `
    <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
      ${fallbackNotice ? `<div class="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">${fallbackNotice.message}</div>` : ''}
      <div class="flex items-center gap-3 mb-3">
        <div class="p-2.5 bg-blue-50 rounded-lg"><i data-lucide="landmark" class="w-5 h-5 text-blue-600"></i></div>
        <div class="flex-1">
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">Business Receiving Account</h3>
          <p class="text-gray-500 text-xs">${acc.flag} ${acc.currencyName} (${acc.currency})</p>
        </div>
        <span class="inline-flex items-center gap-1 bg-blue-50 text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-200"><i data-lucide="building-2" class="w-3 h-3"></i> Official Business</span>
      </div>

      <div class="bg-blue-600 text-white rounded-2xl p-4 mb-4 overflow-hidden relative">
        <div class="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full"></div>
        <div class="absolute -bottom-8 -left-4 w-28 h-28 bg-white/10 rounded-full"></div>
        <div class="relative">
          <div class="text-[10px] uppercase tracking-widest text-blue-100">Amount to transfer (${acc.currency})</div>
          <div class="text-2xl font-bold mt-0.5">${fmtLocalTotal()}</div>
          <div class="mt-3 flex items-center justify-between gap-2 flex-wrap">
            <div>
              <div class="text-[10px] uppercase tracking-widest text-blue-100">Your order/reference number</div>
              <div class="text-sm font-bold font-mono mt-0.5">${state.orderNumber}</div>
            </div>
            <button onclick="copyToClipboard('${state.orderNumber}')" class="shrink-0 flex items-center gap-1.5 bg-white/20 hover:bg-white/30 rounded-lg px-3 py-1.5 text-xs font-bold transition">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy reference
            </button>
          </div>
          <p class="text-[11px] text-blue-100 mt-2">Include this reference when you transfer so our team can match your payment instantly.</p>
        </div>
      </div>

      <div class="flex items-center justify-between gap-3 mb-2">
        <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wide">Transfer to</h4>
        <button onclick="copyToClipboard(this.getAttribute('data-copy'))" data-copy="${copyAllText.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/\n/g, '&#10;')}" class="shrink-0 text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"><i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy all details</button>
      </div>
      <div class="space-y-2">
        ${allCopyFields.map((f, i) => `
          <div class="flex items-center justify-between gap-3 bg-gray-50 border border-blue-100 rounded-xl px-4 py-2.5">
            <div class="min-w-0 flex-1"><div class="text-gray-500 text-[11px] uppercase tracking-wide">${f.label}</div><div class="text-gray-900 text-sm font-medium font-mono break-all">${f.value}</div></div>
            <button onclick="copyToClipboard('${f.value.replace(/'/g, "\\'")}')" class="shrink-0 p-2 bg-gray-100 hover:bg-blue-100 border border-blue-200 rounded-lg transition"><i data-lucide="copy" class="w-4 h-4 text-gray-600"></i></button>
          </div>
        `).join('')}
      </div>
      <div class="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-gray-700 leading-relaxed">${instructions || 'After payment, upload your receipt for verification so your goods can be shipped immediately.'}</div>
    </div>
  `;
}

/* ── Order summary sidebar ──────────────────────────────────── */
function renderOrderSummary() {
  const subtotal = getSubtotal();
  const total = getTotal();
  return `
    <div class="glass border border-blue-200 rounded-2xl p-5 slide-up lg:sticky lg:top-20">
      <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="receipt" class="w-4 h-4 text-blue-600"></i> Order Summary
      </h3>
      <div class="space-y-3 mb-4">
        ${state.cartItems.map(item => {
          return `
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-lg bg-gray-50 overflow-hidden shrink-0 ring-1 ring-blue-500/10">
                ${videoThumbSrcHtml(item.listing)}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-gray-900 truncate">${item.listing.title}</p>
                <p class="text-xs text-gray-500">Qty: ${item.quantity}</p>
              </div>
              <p class="text-xs font-bold text-amber-600 shrink-0">${fmtMoney(item.listing.price * item.quantity, item.listing.currency || 'USD')}</p>
            </div>
          `;
        }).join('')}
      </div>
      <div class="space-y-2 pt-4 border-t border-blue-100">
        <div class="flex justify-between text-sm"><span class="text-gray-500">Subtotal</span><span class="text-gray-900 font-bold">${fmtLocal(convertFromUSD(subtotal, state.selectedCurrency), state.selectedCurrency)}</span></div>
        <div class="flex justify-between text-sm"><span class="text-gray-500">Shipping</span><span class="text-emerald-600 font-bold">${getShippingCost() === 0 ? (isBulkItem(state.listing) ? 'To be quoted' : 'Free') : fmtLocal(convertFromUSD(getShippingCost(), state.selectedCurrency), state.selectedCurrency)}</span></div>
        ${getTaxAmount() > 0 ? `<div class="flex justify-between text-sm"><span class="text-gray-500">Tax</span><span class="text-gray-900 font-bold">${fmtLocal(convertFromUSD(getTaxAmount(), state.selectedCurrency), state.selectedCurrency)}</span></div>` : ''}
        <div class="flex justify-between text-lg pt-2 border-t border-blue-100"><span class="text-gray-900 font-bold">Total</span><span class="text-amber-600 font-black">${fmtLocalTotal()}</span></div>
      </div>
      <div class="mt-4 p-3 bg-gray-50 border border-blue-100 rounded-xl">
        <div class="flex items-center gap-2 text-xs text-gray-600">
          <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i>
          <span>Secured with SSL encryption</span>
        </div>
      </div>
      <div class="mt-3 p-3 bg-gray-50 border border-blue-100 rounded-xl">
        <div class="flex items-center gap-2 text-xs text-gray-600">
          <i data-lucide="package" class="w-4 h-4 text-blue-600"></i>
          <span>Order #: <span class="text-blue-600 font-mono font-bold">${state.orderNumber}</span></span>
        </div>
      </div>
      ${state.step < 3 ? `
        <button onclick="goToStep(${state.step + 1})" class="btn-press w-full mt-4 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3.5 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
          ${state.step === 1 ? 'Proceed to Checkout' : 'Continue to Payment'} <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </button>
      ` : ''}
    </div>
  `;
}

function renderEmptyCart() {
  return `
    <div class="glass border border-blue-200 rounded-2xl p-10 text-center slide-up">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4"><i data-lucide="shopping-cart" class="w-8 h-8 text-blue-600"></i></div>
      <h3 class="text-lg font-bold text-gray-900 mb-2">Your Cart is Empty</h3>
      <p class="text-sm text-gray-500 mb-6">Add items to your cart before checking out.</p>
      <a href="/" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl uppercase text-sm tracking-wider transition shadow-lg shadow-blue-600/30 relative overflow-hidden"><i data-lucide="shopping-bag" class="w-4 h-4"></i> Browse Marketplace</a>
    </div>
  `;
}

/* ── Handlers ───────────────────────────────────────────────── */
function attachHandlers() {}

window.changeQty = (i, delta) => {
  state.cartItems[i].quantity = Math.max(1, state.cartItems[i].quantity + delta);
  // Keep the shared cart in sync (qty-aware format).
  try {
    const cart = JSON.parse(localStorage.getItem('kco_cart') || '[]');
    if (!Array.isArray(cart)) return render();
    const id = state.cartItems[i].listing.property_id;
    const entry = cart.find(c => (typeof c === 'string' ? c : c && c.id) === id);
    if (entry && typeof entry === 'object' && entry.id) entry.qty = state.cartItems[i].quantity;
    localStorage.setItem('kco_cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('kco-cart-changed'));
  } catch (e) {}
  render();
};

window.removeCartItem = (i) => {
  const id = state.cartItems[i].listing.property_id;
  state.cartItems.splice(i, 1);
  // Remove from the shared cart too.
  try {
    const cart = JSON.parse(localStorage.getItem('kco_cart') || '[]');
    if (Array.isArray(cart)) {
      const next = cart.filter(c => (typeof c === 'string' ? c : c && c.id) !== id);
      localStorage.setItem('kco_cart', JSON.stringify(next));
      window.dispatchEvent(new CustomEvent('kco-cart-changed'));
    }
  } catch (e) {}
  if (state.cartItems.length === 0) {
    document.getElementById('checkout-root').innerHTML = renderEmptyCart();
    if (window.lucide) lucide.createIcons();
    return;
  }
  render();
};

window.goToStep = (step) => {
  if (step === 3 && !validateStep2()) return;
  if (step === 2) saveStep2Data();
  if (step === 3 && isManualTransferRequired(getTotal())) state.paymentMethod = 'manual_bank_transfer';
  state.step = step;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function saveStep2Data() {
  if (state.isGuest || !state.selectedAddressId) {
    state.fullName = document.getElementById('ship-name')?.value || state.fullName;
    state.phone = document.getElementById('ship-phone')?.value || state.phone;
    state.email = document.getElementById('ship-email')?.value || state.email || (state.user?.email || '');
    state.shippingAddr1 = document.getElementById('ship-addr1')?.value || '';
    state.shippingAddr2 = document.getElementById('ship-addr2')?.value || '';
    state.shippingCity = document.getElementById('ship-city')?.value || '';
    state.shippingState = document.getElementById('ship-state')?.value || '';
    state.shippingPostal = document.getElementById('ship-postal')?.value || '';
    state.shippingCountry = document.getElementById('ship-country')?.value || state.shippingCountry;
    syncRegionFromShippingCountry();
  }
  state.billingSame = document.getElementById('billing-same')?.checked ?? true;
  if (!state.billingSame) state.billingAddress = document.getElementById('billing-address')?.value || '';
}

function validateStep2() {
  saveStep2Data();
  if (state.selectedAddressId && !state.isGuest) return true;
  if (!state.fullName || !state.phone || !state.shippingAddr1 || !state.shippingCity || !state.shippingState || !state.shippingPostal) {
    showToast('Please fill in all required shipping fields.');
    return false;
  }
  if (state.isGuest && !state.email) { showToast('Please enter your email address.'); return false; }
  return true;
}

window.selectAddress = (id) => {
  state.selectedAddressId = id || null;
  if (id) {
    const a = state.addresses.find(x => x.id === id);
    if (a) {
      state.fullName = a.full_name;
      state.phone = a.phone;
      state.shippingAddr1 = a.address_line1;
      state.shippingAddr2 = a.address_line2 || '';
      state.shippingCity = a.city;
      state.shippingState = a.state;
      state.shippingPostal = a.postal_code;
      state.shippingCountry = a.country_code;
      syncRegionFromShippingCountry();
    }
  }
  render();
};

window.toggleBilling = () => {
  state.billingSame = document.getElementById('billing-same').checked;
  document.getElementById('billing-fields').classList.toggle('hidden', state.billingSame);
};

window.selectPaymentMethod = (method) => {
  if (method === 'flutterwave' && isManualTransferRequired(getTotal())) { showToast('High-value orders must be paid by manual bank transfer.'); return; }
  state.paymentMethod = method;
  render();
};
window.selectCurrency = (currency) => { state.currencyManuallySelected = true; state.selectedCurrency = currency; render(); };
window.copyToClipboard = copyToClipboard;

/* ── Create order in DB ─────────────────────────────────────── */
async function createOrder(paymentMethod, extraData = {}) {
  const subtotal = getSubtotal();
  const total = getTotal();
  const shippingAddrText = state.selectedAddressId && state.addresses.length
    ? (() => { const a = state.addresses.find(x => x.id === state.selectedAddressId); return a ? `${a.address_line1}, ${a.city}, ${a.state} ${a.postal_code}, ${a.country_code}` : ''; })()
    : `${state.shippingAddr1}${state.shippingAddr2 ? ', ' + state.shippingAddr2 : ''}, ${state.shippingCity}, ${state.shippingState} ${state.shippingPostal}, ${state.shippingCountry}`;

  const billingAddr = state.billingSame ? shippingAddrText : (state.billingAddress || shippingAddrText);

  const orderData = {
    order_number: state.orderNumber,
    listing_id: state.listing.property_id,
    listing_title: state.listing.title,
    amount: getTotalLocal(),
    currency: state.selectedCurrency,
    full_name: state.fullName,
    email: state.email || state.user?.email || '',
    phone: state.phone,
    status: 'order_placed',
    payment_method: paymentMethod,
    subtotal: convertFromUSD(getSubtotal(), state.selectedCurrency),
    quantity: state.cartItems.reduce((s, i) => s + i.quantity, 0),
    billing_address: billingAddr,
    ...extraData,
  };

  if (state.isGuest) {
    orderData.is_guest = true;
    orderData.user_id = null;
    orderData.guest_shipping_address = shippingAddrText;
    orderData.guest_country = state.shippingCountry;
    orderData.guest_state = state.shippingState;
    orderData.guest_city = state.shippingCity;
    orderData.guest_postal_code = state.shippingPostal;
  } else {
    orderData.user_id = state.user.id;
    if (state.selectedAddressId) orderData.shipping_address_id = state.selectedAddressId;
  }

  const { error } = await supabase.from('payment_receipts').insert(orderData);
  if (error) throw new Error('Failed to create order: ' + error.message);

  return orderData;
}

/* ── Flutterwave payment ────────────────────────────────────── */
window.payWithFlutterwave = async () => {
  const btn = document.getElementById('flw-pay-btn');
  btn.disabled = true;
  btn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Initializing payment...';
  if (window.lucide) lucide.createIcons();

  try {
    // Create order first
    await createOrder('flutterwave');
    localStorage.setItem('kco_pending_order', state.orderNumber);

    // Initialize Flutterwave via edge function
    // Flutterwave only supports a fixed set of currencies (NGN/USD/GBP/EUR/GHS/
    // KES/ZAR/ZMW/TZS/UGX/XAF/XOF); charge in a supported one so ATM/card
    // payments are never declined for an unsupported currency.
    const flwCurrency = flwSupportedCurrency(state.selectedCurrency);
    const flwAmount = convertFromUSD(getTotal(), flwCurrency);
    const fnUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/flutterwave-payment?action=initialize`;
    const res = await fetch(fnUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: flwAmount,
        currency: flwCurrency,
        customer_name: state.fullName,
        customer_email: state.email || state.user?.email,
        customer_phone: state.phone,
        order_number: state.orderNumber,
        redirect_url: `${window.location.origin}/checkout.html?status=verify&order_number=${state.orderNumber}`,
      }),
    });

    const data = await res.json();
    if (!res.ok || data.error) throw new Error(data.error || 'Failed to initialize payment');

    // Redirect to Flutterwave payment page
    window.location.href = data.payment_link;
  } catch (err) {
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="zap" class="w-5 h-5"></i> Pay with Flutterwave';
    if (window.lucide) lucide.createIcons();
    showToast(err.message || 'Payment initialization failed.');
  }
};

/* ── Handle Flutterwave redirect ────────────────────────────── */
async function handleFlwVerify(txId, txRef, orderNum) {
  const root = document.getElementById('checkout-root');
  root.innerHTML = `
    <div class="flex flex-col items-center justify-center py-20 fade-in">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6 pulse-glow">
        <i data-lucide="loader-2" class="w-10 h-10 text-blue-600 animate-spin"></i>
      </div>
      <h1 class="text-2xl font-black text-gray-900 mb-2">Verifying Payment...</h1>
      <p class="text-gray-600 text-sm">Please wait while we confirm your payment.</p>
    </div>
  `;
  if (window.lucide) lucide.createIcons();

  try {
    const fnUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/flutterwave-payment?action=verify`;
    const res = await fetch(fnUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transaction_id: txId, tx_ref: txRef, order_number: orderNum }),
    });
    const data = await res.json();

    if (!res.ok || data.error || data.status === 'failed') {
      root.innerHTML = renderPaymentFailed(data.message || data.error || 'Payment verification failed.');
      if (window.lucide) lucide.createIcons();
      return;
    }

    root.innerHTML = renderPaymentSuccess(orderNum);
    if (window.lucide) lucide.createIcons();
    document.querySelectorAll('.btn-press').forEach(ripple);
    localStorage.removeItem('kco_pending_order');
    localStorage.removeItem('kco_cart');
  } catch (err) {
    root.innerHTML = renderPaymentFailed(err.message);
    if (window.lucide) lucide.createIcons();
  }
}

function renderPaymentSuccess(orderNum) {
  return `
    <div class="fade-in text-center py-8 max-w-lg mx-auto">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 rounded-full mb-6 check-pop">
        <i data-lucide="check-circle" class="w-12 h-12 text-emerald-600"></i>
      </div>
      <h1 class="text-2xl font-black text-gray-900 mb-2">Payment Successful!</h1>
      <p class="text-gray-600 text-sm mb-6">Your order has been confirmed and an email receipt has been sent.</p>
      <div class="glass border border-blue-200 rounded-2xl p-5 mb-5 text-left">
        <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Order Number</span><span class="text-blue-600 font-mono font-bold">${orderNum}</span></div>
        <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Status</span><span class="text-emerald-600 font-bold">Payment Received</span></div>
        <div class="border-t border-blue-100 pt-3 mt-3">
          <p class="text-xs text-gray-600">You will receive email notifications at each stage: processing, shipping, and delivery.</p>
        </div>
      </div>
      <div class="flex gap-3 justify-center">
        <a href="/account.html" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
          <i data-lucide="package" class="w-4 h-4"></i> Track Order
        </a>
        <a href="/" class="btn-press inline-flex items-center gap-2 bg-gray-100 border border-blue-200 text-gray-600 font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">
          Continue Shopping
        </a>
      </div>
    </div>
  `;
}

function renderPaymentFailed(msg) {
  return `
    <div class="fade-in text-center py-8 max-w-lg mx-auto">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-red-50 rounded-full mb-6 check-pop">
        <i data-lucide="x-circle" class="w-12 h-12 text-red-600"></i>
      </div>
      <h1 class="text-2xl font-black text-gray-900 mb-2">Payment Failed</h1>
      <p class="text-gray-600 text-sm mb-2">${msg}</p>
      <p class="text-gray-500 text-xs mb-6">Your order has been saved. You can retry payment from your account dashboard.</p>
      <div class="flex gap-3 justify-center">
        <a href="/checkout.html" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
          <i data-lucide="refresh-cw" class="w-4 h-4"></i> Try Again
        </a>
        <a href="/account.html" class="btn-press inline-flex items-center gap-2 bg-gray-100 border border-blue-200 text-gray-600 font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">
          View Orders
        </a>
      </div>
    </div>
  `;
}

/* ── Manual bank transfer ───────────────────────────────────── */
window.placeOrderManual = async () => {
  const btn = document.getElementById('manual-pay-btn');
  btn.disabled = true;
  btn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Creating order...';
  if (window.lucide) lucide.createIcons();

  try {
    await createOrder('manual_bank_transfer');

    // Trigger notification
    try {
      await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-order-notification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ order_number: state.orderNumber }),
      });
    } catch (e) { /* non-blocking */ }

    // Redirect to payment page for receipt upload
    const params = new URLSearchParams({ id: state.listing.property_id, order: state.orderNumber });
    if (state.isGuest) params.set('guest', '1');
    window.location.href = `/payment.html?${params.toString()}`;
  } catch (err) {
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="check-circle" class="w-5 h-5"></i> Place Order & Upload Receipt';
    if (window.lucide) lucide.createIcons();
    showToast(err.message || 'Failed to create order.');
  }
};

init();
