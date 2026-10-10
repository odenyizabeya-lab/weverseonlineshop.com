import { findListingById, formatPrice, flagEmoji, loadFullListingById, videoCoverOf } from './showroom-data.js';
import { getTruckById } from './truck-data.js';
import { getMotorhomeById } from './motorhome-data.js';
import { getCarById } from './car-data.js';
import { getPhoneById } from './phone-data.js';
import { PRODUCT_LISTINGS } from './products-data.js';
import { PRODUCT_EXTRA_LISTINGS } from './products-extra.js';
import { getCurrentUser } from './auth.js';
import { trackEvent } from './analytics.js';
import { supabase } from './supabase-client.js';
import { detectCurrency, getCountryByCode, SUPPORTED_CURRENCIES } from './country-data.js';
import { buildFallbackNotice, getActiveBankAccounts, getPaymentInstructions, getSupportedCurrenciesFromAccounts, loadPaymentSettings, resolveAccountForCountry } from './payment-settings.js';
import { convertFromUSD, fmtLocal, preloadFx } from './fx.js';

const PRODUCT_LOOKUP = [...PRODUCT_LISTINGS, ...PRODUCT_EXTRA_LISTINGS];
function findProductById(id) {
  return PRODUCT_LOOKUP.find(l => l.property_id === id) || null;
}
let paymentSettings = null;
let manualPaymentAccounts = [];
let manualPaymentInstructions = '';
let autoDetectedCurrency = '';

/* ── Order progress tracker steps ─────────────────────────── */
const ORDER_STEPS = [
  { id: 'placed', label: 'Order Placed', icon: 'shopping-bag', color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'submitted', label: 'Payment Submitted', icon: 'upload', color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { id: 'verification', label: 'Pending Verification', icon: 'loader', color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 'approved', label: 'Approved', icon: 'check-circle', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'processing', label: 'Processing', icon: 'package', color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'shipped', label: 'Shipped', icon: 'truck', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 'delivered', label: 'Delivered', icon: 'package-check', color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

/* ── Helpers ───────────────────────────────────────────────── */
function getListingId() {
  return new URLSearchParams(window.location.search).get('id');
}

function getStoredCountry() {
  return localStorage.getItem('kco_country') || 'US';
}

function generateOrderNumber() {
  const ts = Date.now().toString(36).toUpperCase().slice(-6);
  const rnd = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `W-${ts}${rnd}`;
}

function copyToClipboard(text, btnEl) {
  const fallback = () => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).catch(() => fallback());
  } else {
    fallback();
  }
  if (btnEl) {
    const orig = btnEl.innerHTML;
    btnEl.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600"></i>';
    if (window.lucide) lucide.createIcons();
    setTimeout(() => { btnEl.innerHTML = orig; if (window.lucide) lucide.createIcons(); }, 1500);
  }
  showToast('Copied Successfully.');
}

function showToast(msg) {
  let toast = document.getElementById('payment-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'payment-toast';
    toast.className = 'fixed bottom-5 right-5 z-[100] transform translate-y-20 opacity-0 bg-gray-900 border border-blue-500/30 text-white px-5 py-3 rounded-xl shadow-xl text-xs flex items-center gap-2 font-medium transition-all duration-300';
    toast.innerHTML = '<i data-lucide="info" class="w-4 h-4 text-blue-600"></i><span id="payment-toast-msg">Action</span>';
    document.body.appendChild(toast);
  }
  toast.querySelector('#payment-toast-msg').textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3000);
  if (window.lucide) lucide.createIcons();
}

function getResolvedPayment(countryCode, selectedCurrency) {
  const result = resolveAccountForCountry(manualPaymentAccounts, countryCode, selectedCurrency);
  return {
    ...result,
    fallbackNotice: result.isFallback ? buildFallbackNotice(result.account, countryCode, selectedCurrency, manualPaymentInstructions) : null,
  };
}

/* ── Particles ────────────────────────────────────────────── */
function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 14; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    p.className = 'particle';
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = '-10px';
    p.style.background = Math.random() > 0.5 ? 'rgba(59,130,246,.4)' : 'rgba(251,191,36,.3)';
    p.style.animationDuration = (Math.random() * 20 + 15) + 's';
    p.style.animationDelay = (Math.random() * 20) + 's';
    container.appendChild(p);
  }
}
spawnParticles();

/* ── Render: Order summary card ────────────────────────────── */
function renderOrderSummary(listing, isProperty, selectedCurrency) {
  const price = fmtLocal(convertFromUSD(listing.price, selectedCurrency), selectedCurrency);
  return `
    <div class="glass border border-blue-200 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-center gap-2 mb-4">
        <div class="p-2 bg-blue-50 rounded-lg"><i data-lucide="shopping-bag" class="w-4 h-4 text-blue-600"></i></div>
        <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">Order Summary</h3>
      </div>
      <div class="flex gap-4">
        <div class="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0 ring-1 ring-blue-500/10">
          ${(() => { const v = videoCoverOf(listing); return v ? `<video src="${v}" class="w-full h-full object-cover" muted playsinline preload="metadata"></video>` : `<div class="w-full h-full flex items-center justify-center bg-gray-50"><i data-lucide="video-off" class="w-6 h-6 text-gray-300"></i></div>`; })()}
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-bold text-gray-900 truncate">${listing.title}</h4>
          <p class="text-gray-500 text-xs mt-0.5">ID: <span class="text-blue-600 font-mono">${listing.property_id}</span></p>
          ${isProperty && listing.city ? `<p class="text-gray-600 text-xs mt-0.5">${flagEmoji(listing.country_code)} ${listing.city}, ${listing.country}</p>` : ''}
          <p class="text-2xl font-black text-blue-600 mt-2">${price}</p>
        </div>
      </div>
    </div>
  `;
}

/* ── Render: Bank account card ─────────────────────────────── */
function renderBankAccount(account, fallbackNotice, instructions, opts = {}) {
  const group = [
    { label: 'Beneficiary Name', value: account.beneficiary },
    { label: 'Bank Name', value: account.bankName },
    { label: 'Transfer Type', value: account.transferType },
  ];
  const fields = [
    { label: 'Account Number', value: account.accountNumber },
    { label: 'Account Type', value: account.accountType },
    { label: 'IBAN', value: account.iban },
    { label: 'SWIFT / BIC Code', value: account.swift },
    { label: 'Routing (ABA)', value: account.routing },
    { label: 'Sort Code', value: account.sortCode },
    { label: 'Bank Code', value: account.bankCode },
    { label: 'Branch Code', value: account.branchCode },
    { label: 'Institution Number', value: account.institutionNumber },
    { label: 'Transit Number', value: account.transitNumber },
    { label: 'BSB Code', value: account.bsbCode },
    { label: 'Bank Address', value: account.address },
  ].filter(f => f.value && f.value.trim() !== '');

  const allCopyFields = [...group, ...fields];
  const copyAllText = allCopyFields.map(f => `${f.label}: ${f.value}`).join('\n');
  const amountLabel = opts.amountLabel || '';
  const orderNumber = opts.orderNumber || '';

  return `
    <div class="glass border border-blue-200 rounded-2xl p-5 mb-5 slide-up">
      ${fallbackNotice ? `<div class="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">${fallbackNotice.message}</div>` : ''}
      <div class="flex items-center gap-3 mb-3">
        <div class="p-2.5 bg-blue-50 rounded-lg"><i data-lucide="landmark" class="w-5 h-5 text-blue-600"></i></div>
        <div class="flex-1">
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">Business Receiving Account</h3>
          <p class="text-gray-500 text-xs">${account.flag} ${account.currencyName} (${account.currency})</p>
        </div>
        <span class="inline-flex items-center gap-1 bg-blue-50 text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-200">
          <i data-lucide="building-2" class="w-3 h-3"></i> Official Business
        </span>
      </div>

      <div class="bg-blue-600 text-white rounded-2xl p-4 mb-4 overflow-hidden relative">
        <div class="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full"></div>
        <div class="absolute -bottom-8 -left-4 w-28 h-28 bg-white/10 rounded-full"></div>
        <div class="relative">
          <div class="text-[10px] uppercase tracking-widest text-blue-100">Amount to transfer (${account.currency})</div>
          <div class="text-2xl font-bold mt-0.5" id="bank-amount">${amountLabel}</div>
          <div class="mt-3 flex items-center justify-between gap-2 flex-wrap">
            <div>
              <div class="text-[10px] uppercase tracking-widest text-blue-100">Your order/reference number</div>
              <div class="text-sm font-bold font-mono mt-0.5" id="bank-ref">${orderNumber}</div>
            </div>
            <button onclick="copyToClipboard('${orderNumber}')" class="shrink-0 flex items-center gap-1.5 bg-white/20 hover:bg-white/30 rounded-lg px-3 py-1.5 text-xs font-bold transition">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy reference
            </button>
          </div>
          <p class="text-[11px] text-blue-100 mt-2">Include this reference in your transfer so our team can match your payment instantly.</p>
        </div>
      </div>

      <div class="flex items-center justify-between gap-3 mb-2">
        <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wide">Transfer to</h4>
        <button onclick="copyToClipboard(this.getAttribute('data-copy'))" data-copy="${copyAllText.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/\n/g, '&#10;')}" class="shrink-0 text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"><i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy all details</button>
      </div>
      <div class="space-y-2">
        ${allCopyFields.map(f => `
          <div class="flex items-center justify-between gap-3 bg-gray-50 border border-blue-100 rounded-xl px-4 py-2.5">
            <div class="min-w-0 flex-1">
              <div class="text-gray-500 text-[11px] uppercase tracking-wide">${f.label}</div>
              <div class="text-gray-900 text-sm font-medium font-mono break-all">${f.value}</div>
            </div>
            <button onclick="copyToClipboard('${f.value.replace(/'/g, "\\'")}', this)" class="shrink-0 p-2 bg-gray-100 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 rounded-lg transition" title="Copy ${f.label}">
              <i data-lucide="copy" class="w-4 h-4 text-gray-600"></i>
            </button>
          </div>
        `).join('')}
      </div>
      <div class="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-gray-700 leading-relaxed">${instructions || 'After payment, upload your receipt for verification so your goods can be shipped immediately.'}</div>
    </div>
  `;
}

/* ── Render: Unsupported currency message ─────────────────── */
function renderUnsupportedCurrency(notice) {
  return `
    <div class="glass border border-amber-200 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-start gap-3 mb-4">
        <div class="p-2.5 bg-amber-50 rounded-lg shrink-0"><i data-lucide="info" class="w-5 h-5 text-amber-600"></i></div>
        <div class="text-sm text-gray-700 leading-relaxed">
          <p class="font-bold text-amber-600 mb-2">Hello Customer,</p>
          <p class="mb-2">${notice?.message || 'Your local currency is not currently supported by our Manual Bank Transfer system.'}</p>
          <p class="font-bold text-amber-600">Thank you for choosing Weverse Online Shop.</p>
        </div>
      </div>
    </div>
    ${renderBankAccount(notice.account, null, notice.instructions)}
  `;
}

/* ── Render: Currency selector ─────────────────────────────── */
function renderCurrencySelector(selectedCurrency, countryName, countryCode) {
  const currencies = getSupportedCurrenciesFromAccounts(manualPaymentAccounts);
  const country = countryCode ? getCountryByCode(countryCode) : null;
  return `
    <div class="glass border border-blue-200 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-center gap-3 mb-4">
        <div class="p-2.5 bg-blue-50 rounded-lg"><i data-lucide="globe" class="w-5 h-5 text-blue-600"></i></div>
        <div class="flex-1">
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">Payment Currency</h3>
          <p class="text-gray-500 text-xs">${country ? country.flag + ' ' + countryName : countryName || 'Select currency'} ${selectedCurrency ? '→ ' + selectedCurrency : '→ USD (default)'}</p>
        </div>
      </div>
      <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
        ${currencies.map(c => {
          const acc = manualPaymentAccounts.find(account => account.currency === c);
          const active = c === selectedCurrency;
          return `
            <button onclick="selectCurrency('${c}')" class="btn-press flex flex-col items-center gap-1 p-3 rounded-xl border transition relative overflow-hidden ${active ? 'bg-blue-50 border-blue-300 text-blue-600 pulse-glow' : 'bg-gray-50 border-blue-100 text-gray-600 hover:border-blue-200 hover:text-gray-900'}">
              <span class="text-2xl">${acc.flag}</span>
              <span class="text-xs font-bold">${c}</span>
              <span class="text-[10px] text-gray-500">${acc.currencyName}</span>
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

/* ── Render: Manual bank transfer method card ──────────────── */
function renderBankTransferMethod() {
  return `
    <div class="glass border border-blue-200 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-center justify-between flex-wrap gap-3">
        <div class="flex items-center gap-3">
          <div class="p-2.5 bg-blue-50 rounded-lg"><i data-lucide="landmark" class="w-6 h-6 text-blue-600"></i></div>
          <div>
            <h3 class="text-sm font-bold text-gray-900">Manual Bank Transfer</h3>
            <p class="text-gray-500 text-xs">Pay directly to our bank account</p>
          </div>
        </div>
        <span class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
          <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Available
        </span>
      </div>
    </div>
  `;
}

/* ── Render: Order progress tracker ────────────────────────── */
function renderOrderTracker(currentStep) {
  const stepIndex = ORDER_STEPS.findIndex(s => s.id === currentStep);
  return `
    <div class="glass border border-blue-200 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-center gap-2 mb-5">
        <div class="p-2 bg-blue-50 rounded-lg"><i data-lucide="git-branch" class="w-4 h-4 text-blue-600"></i></div>
        <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">Order Progress</h3>
      </div>
      <div class="relative">
        <!-- Progress line -->
        <div class="absolute left-4 top-4 bottom-4 w-0.5 bg-blue-50"></div>
        <div class="absolute left-4 top-4 w-0.5 bg-blue-500 transition-all duration-500" style="height: ${stepIndex >= 0 ? (stepIndex / (ORDER_STEPS.length - 1)) * 100 : 0}%; min-height: 0; max-height: calc(100% - 2rem)"></div>
        <div class="space-y-4">
          ${ORDER_STEPS.map((step, i) => {
            const done = i <= stepIndex;
            const active = i === stepIndex;
            return `
              <div class="flex items-center gap-3 relative">
                <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-300 ${done ? step.bg + ' border border-blue-200' : 'bg-gray-50 border border-blue-100'} ${active ? 'pulse-glow' : ''}">
                  <i data-lucide="${step.icon}" class="w-4 h-4 ${done ? step.color : 'text-gray-600'} ${active ? 'animate-pulse' : ''}"></i>
                </div>
                <div class="flex-1">
                  <div class="text-sm font-medium ${done ? 'text-gray-900' : 'text-gray-600'}">${step.label}</div>
                </div>
                ${done && !active ? '<i data-lucide="check" class="w-4 h-4 text-emerald-600 shrink-0"></i>' : ''}
                ${active ? '<span class="text-[10px] text-blue-600 font-bold uppercase shrink-0">Current</span>' : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

/* ── Render: Upload receipt form ───────────────────────────── */
function renderUploadForm(orderNumber, listing, amount, currency, isGuest, amountLabel = '') {
  const guestShippingBlock = isGuest ? `
        <div class="glass-soft border border-blue-100 rounded-xl p-4">
          <div class="flex items-center gap-2 mb-4">
            <div class="p-2 bg-blue-50 rounded-lg"><i data-lucide="truck" class="w-4 h-4 text-blue-600"></i></div>
            <h4 class="text-xs font-bold text-gray-900 uppercase tracking-wide">Shipping Information</h4>
            <span class="ml-auto bg-amber-50 text-amber-600 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">Guest Checkout</span>
          </div>
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Full Name *</label>
              <input type="text" id="form-full-name" required placeholder="John Doe" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Email Address *</label>
                <input type="email" id="form-email" required placeholder="you@example.com" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Phone Number *</label>
                <input type="tel" id="form-phone" required placeholder="+1 234 567 890" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Shipping Address *</label>
              <input type="text" id="form-shipping-address" required placeholder="123 Main Street, Apt 4B" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Country *</label>
                <input type="text" id="form-guest-country" required placeholder="United States" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">State / Province *</label>
                <input type="text" id="form-guest-state" required placeholder="New York" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">City *</label>
                <input type="text" id="form-guest-city" required placeholder="New York City" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Postal Code *</label>
                <input type="text" id="form-guest-postal" required placeholder="10001" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          </div>
        </div>
  ` : '';

  const contactBlock = isGuest ? '' : `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Full Name *</label>
            <input type="text" id="form-full-name" required placeholder="John Doe" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Phone Number *</label>
            <input type="tel" id="form-phone" required placeholder="+1 234 567 890" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Email Address *</label>
          <input type="email" id="form-email" required placeholder="you@example.com" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
        </div>
  `;

  return `
    <div class="glass border border-blue-200 rounded-2xl p-5 mb-5 slide-up" id="upload-section">
      <div class="flex items-center gap-3 mb-5">
        <div class="p-2.5 bg-blue-50 rounded-lg"><i data-lucide="upload-cloud" class="w-5 h-5 text-blue-600"></i></div>
        <div>
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">Upload Payment Receipt</h3>
          <p class="text-gray-500 text-xs">After making your payment, upload your receipt for verification.</p>
        </div>
      </div>

      <form id="receipt-form" class="space-y-4">
        <input type="hidden" id="form-order-number" value="${orderNumber}">
        <input type="hidden" id="form-listing-id" value="${listing.property_id}">
        <input type="hidden" id="form-listing-title" value="${listing.title}">
        <input type="hidden" id="form-amount" value="${amount}">
        <input type="hidden" id="form-currency" value="${currency}">
        <input type="hidden" id="form-is-guest" value="${isGuest ? '1' : '0'}">

        <div class="bg-blue-600 text-white rounded-2xl p-4 overflow-hidden relative">
          <div class="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full"></div>
          <div class="absolute -bottom-8 -left-4 w-28 h-28 bg-white/10 rounded-full"></div>
          <div class="relative">
            <div class="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <div class="text-[10px] uppercase tracking-widest text-blue-100">Amount to transfer (${currency})</div>
                <div class="text-2xl font-bold mt-0.5" id="transfer-amount-display">${amountLabel}</div>
              </div>
              <div class="text-right">
                <div class="text-[10px] uppercase tracking-widest text-blue-100">Order / Reference number</div>
                <div class="text-sm font-bold font-mono mt-0.5">${orderNumber}</div>
              </div>
            </div>
            <p class="text-[11px] text-blue-100 mt-2">Transfer the exact amount above to the business account, then upload your receipt below.</p>
          </div>
        </div>

        <div class="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed">
          <p class="font-bold flex items-center gap-1.5"><i data-lucide="shield-alert" class="w-4 h-4"></i> Payment status: Documentation Pending</p>
          <p class="mt-1">Once you upload your receipt, our finance team will verify the payment against our business bank account before your order is approved. Your order stays pending until the payment is confirmed.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Order Number</label>
            <input type="text" value="${orderNumber}" disabled class="w-full bg-white/80 border border-blue-100 rounded-xl px-4 py-2.5 text-sm text-blue-600 font-mono font-bold">
          </div>
          <div class="flex items-end">
            <div class="text-xs text-gray-500 pb-2">Save your order number to track your payment status.</div>
          </div>
        </div>

        ${guestShippingBlock}
        ${contactBlock}

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Selected Currency</label>
            <input type="text" id="form-currency-display" value="${currency}" disabled class="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 font-mono">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Amount Paid *</label>
            <input type="number" id="form-amount-paid" required step="0.01" value="${amount}" placeholder="0.00" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Payment Date *</label>
            <input type="date" id="form-payment-date" required value="${new Date().toISOString().slice(0,10)}" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Transaction Reference *</label>
          <input type="text" id="form-tx-ref" required placeholder="Bank transfer reference / confirmation number" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
        </div>

        <div>
          <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Additional Notes</label>
          <textarea id="form-notes" rows="2" placeholder="Any additional information about your payment (optional)" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 resize-none"></textarea>
        </div>

        <div>
          <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Upload Receipt *</label>
          <div id="file-drop-zone" class="border-2 border-dashed border-blue-200 hover:border-blue-300 rounded-2xl p-8 text-center cursor-pointer transition group">
            <input type="file" id="form-receipt-file" accept="image/*,.jpg,.jpeg,.png,.webp,.pdf" class="hidden">
            <div id="file-prompt">
              <div class="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-2xl mb-3 group-hover:bg-blue-100 transition">
                <i data-lucide="upload-cloud" class="w-7 h-7 text-blue-600 group-hover:scale-110 transition"></i>
              </div>
              <p class="text-sm text-gray-700 font-medium">Click to open Gallery, take a photo, or drag and drop</p>
              <p class="text-xs text-gray-600 mt-1">Photo or PDF receipt — Max 20 MB</p>
              <div class="flex items-center justify-center gap-2 mt-3 flex-wrap">
                <button type="button" id="btn-open-gallery" class="btn-press text-xs font-bold px-4 py-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition flex items-center gap-1.5">
                  <i data-lucide="images" class="w-4 h-4"></i> Open Gallery
                </button>
                <button type="button" id="btn-take-photo" class="btn-press text-xs font-bold px-4 py-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition flex items-center gap-1.5">
                  <i data-lucide="camera" class="w-4 h-4"></i> Take Photo
                </button>
                <button type="button" id="btn-choose-pdf" class="btn-press text-xs font-bold px-4 py-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition flex items-center gap-1.5">
                  <i data-lucide="file-text" class="w-4 h-4"></i> Choose PDF
                </button>
              </div>
            </div>
            <div id="file-info" class="hidden">
              <div class="flex flex-col items-center gap-3">
                <div id="file-preview-container" class="hidden">
                  <img id="file-preview-img" class="max-h-40 rounded-xl border border-blue-200 object-contain" alt="Receipt preview">
                </div>
                <div class="flex items-center justify-center gap-3">
                  <div class="inline-flex items-center justify-center w-12 h-12 bg-emerald-50 rounded-xl check-pop">
                    <i data-lucide="file-text" class="w-6 h-6 text-emerald-600"></i>
                  </div>
                  <div class="text-left">
                    <p id="file-name-display" class="text-sm text-gray-900 font-medium truncate max-w-[200px]"></p>
                    <p id="file-size-display" class="text-xs text-gray-500"></p>
                  </div>
                  <button type="button" onclick="removeReceiptFile()" class="p-2 bg-gray-100 hover:bg-red-100 rounded-lg transition">
                    <i data-lucide="trash-2" class="w-4 h-4 text-gray-600 hover:text-red-600"></i>
                  </button>
                </div>
                <button type="button" onclick="removeReceiptFile();document.getElementById('form-receipt-file').click()" class="text-[11px] text-blue-600 hover:text-blue-700 font-bold uppercase tracking-wide flex items-center gap-1.5 transition">
                  <i data-lucide="refresh-cw" class="w-3 h-3"></i> Replace Receipt
                </button>
              </div>
            </div>
          </div>
          <div id="file-error" class="hidden text-xs text-red-600 mt-1.5"></div>
        </div>

        <div id="upload-progress" class="hidden">
          <div class="flex items-center gap-3 mb-2">
            <i data-lucide="loader-2" class="w-4 h-4 text-blue-600 animate-spin"></i>
            <span class="text-xs text-gray-600" id="upload-progress-text">Uploading receipt...</span>
          </div>
          <div class="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div id="upload-progress-bar" class="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300" style="width:0%"></div>
          </div>
        </div>

        <button type="submit" id="submit-receipt-btn" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3.5 rounded-xl uppercase text-sm tracking-wider transition shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden">
          <i data-lucide="send" class="w-5 h-5"></i> Submit Payment
        </button>
      </form>
    </div>
  `;
}

/* ── Render: Pending verification state ────────────────────── */
function renderPendingVerification(orderNumber, listing, amount, currency) {
  const price = fmtLocal(convertFromUSD(listing.price, currency), currency);
  return `
    <div class="fade-in text-center py-8">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 rounded-full mb-6 check-pop">
        <i data-lucide="check-circle" class="w-12 h-12 text-emerald-600"></i>
      </div>
      <h1 class="text-2xl font-black text-gray-900 mb-2">Receipt Submitted</h1>
      <p class="text-gray-600 text-sm mb-6">Your payment receipt has been received successfully.</p>

      <div class="glass border border-blue-200 rounded-2xl p-5 max-w-md mx-auto mb-5 text-left">
        <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Order Number</span><span class="text-blue-600 font-mono font-bold">${orderNumber}</span></div>
        <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Item</span><span class="text-gray-900 font-bold truncate ml-2">${listing.title}</span></div>
        <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Amount</span><span class="text-gray-900 font-bold">${price}</span></div>
        <div class="flex justify-between text-sm mb-4"><span class="text-gray-500">Currency</span><span class="text-gray-900 font-bold">${currency}</span></div>
        <div class="border-t border-blue-100 pt-3">
          <div class="flex items-center gap-2 text-sm">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span class="text-amber-600 font-bold">Pending Verification</span>
          </div>
        </div>
      </div>

      ${renderOrderTracker('verification')}

      <div class="glass border border-blue-200 rounded-2xl p-5 max-w-md mx-auto mb-6 text-left">
        <div class="flex items-start gap-2.5">
          <i data-lucide="info" class="w-5 h-5 text-blue-600 shrink-0 mt-0.5"></i>
          <div class="text-sm text-gray-600 leading-relaxed">
            <p class="mb-2">Our finance team will verify your payment.</p>
            <p class="mb-2">Verification usually takes between a few minutes and 24 hours.</p>
            <p>You will receive a notification once your payment has been approved.</p>
          </div>
        </div>
      </div>

      <a href="/" class="btn-press inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-xl uppercase text-sm tracking-wider transition shadow-lg shadow-blue-600/30">Back to Marketplace</a>
    </div>
  `;
}

/* ── Main init ─────────────────────────────────────────────── */
async function init() {
  const root = document.getElementById('payment-content');
  const params = new URLSearchParams(window.location.search);
  const isGuest = params.get('guest') === '1';
  const user = isGuest ? null : await getCurrentUser();
  if (!user && !isGuest) { window.location.href = '/'; return; }

  const id = getListingId();
  let listing = await loadFullListingById(id) || findListingById(id) || getTruckById(id) || getMotorhomeById(id) || getCarById(id) || getPhoneById(id) || findProductById(id);
  if (!listing) {
    const [{ generateListingById }, { loadHiddenCatalogIds }] = await Promise.all([
      import('./catalog.js'),
      import('./catalog-hidden-store.js'),
    ]);
    await loadHiddenCatalogIds();
    listing = generateListingById(id);
  }
  if (!listing) {
    listing = findListingById(id);
  }
  if (!listing) {
    root.innerHTML = `
      <div class="text-center py-20 text-gray-500 fade-in">
        <i data-lucide="shopping-bag" class="w-12 h-12 text-gray-300 mx-auto mb-4"></i>
        <h2 class="text-xl font-bold text-gray-800 mb-2">No order selected</h2>
        <p class="text-sm mb-6 max-w-sm mx-auto">This page completes payment for a checkout. Please add a product to your cart and place your order first.</p>
        <a href="/" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30">
          <i data-lucide="arrow-left" class="w-4 h-4"></i> Browse Marketplace
        </a>
      </div>`;
    if (window.lucide) lucide.createIcons();
    return;
  }

  const isProperty = listing.listing_type === 'property';

  // Load saved country from profile or localStorage
  let countryCode = getStoredCountry();
  if (user && !isGuest) {
    const { data: profile } = await supabase.from('profiles').select('country_code').eq('user_id', user.id).maybeSingle();
    if (profile?.country_code) {
      countryCode = profile.country_code;
      localStorage.setItem('kco_country', countryCode);
    }
  }
  const country = getCountryByCode(countryCode);
  const countryName = country ? country.name : countryCode;
  const detectedCurrency = detectCurrency(countryCode);
  const urlOrderNumber = new URLSearchParams(window.location.search).get('order');
  const orderNumber = urlOrderNumber || generateOrderNumber();
  const baseAmount = listing.price;
  paymentSettings = await loadPaymentSettings();
  manualPaymentAccounts = await getActiveBankAccounts();
  manualPaymentInstructions = getPaymentInstructions(paymentSettings);

  // Live exchange rates so the amount paid matches the selected currency
  // (cached for 24h; falls back to USD numbers offline).
  await preloadFx();

  autoDetectedCurrency = detectedCurrency || '';
  let selectedCurrency = autoDetectedCurrency || 'USD';
  if (!getSupportedCurrenciesFromAccounts(manualPaymentAccounts).includes(selectedCurrency)) selectedCurrency = 'USD';
  const resolved = getResolvedPayment(countryCode, autoDetectedCurrency || '');
  const localAmount = convertFromUSD(baseAmount, selectedCurrency);

  root.innerHTML = `
    <div class="fade-in">
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <a href="/" class="hover:text-blue-600 transition">Home</a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span>Checkout</span>
      </div>

      <h1 class="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Secure Checkout</h1>
      <p class="text-gray-500 text-sm mb-6">Complete your purchase using manual bank transfer. Upload your receipt after payment for verification.</p>

      ${renderOrderSummary(listing, isProperty, selectedCurrency)}

      ${renderBankTransferMethod()}

      <div id="currency-selector-container">${renderCurrencySelector(selectedCurrency, countryName, countryCode)}</div>

      <div id="bank-account-container">${resolved.isFallback ? renderUnsupportedCurrency(resolved.fallbackNotice) : renderBankAccount(resolved.account, null, manualPaymentInstructions, { amountLabel: fmtLocal(localAmount, selectedCurrency), orderNumber })}</div>

      <div id="upload-form-container">${renderUploadForm(orderNumber, listing, localAmount, selectedCurrency, isGuest, fmtLocal(localAmount, selectedCurrency))}</div>

      ${renderOrderTracker('submitted')}

      <p class="text-center text-xs text-gray-500 mb-6 flex items-center justify-center gap-1.5">
        <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i> Your payment is secured with SSL encryption. Manual verification by our finance team.
      </p>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
  attachEventHandlers(listing, baseAmount, orderNumber, user, isGuest);
}

/* ── Event handlers ────────────────────────────────────────── */
function attachEventHandlers(listing, baseAmount, orderNumber, user, isGuest) {
  // Ripple on buttons
  document.querySelectorAll('.btn-press').forEach(btn => {
    btn.addEventListener('click', function (e) {
      if (this.disabled) return;
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  window.selectCurrency = (currency) => {
    const container = document.getElementById('bank-account-container');
    const next = getResolvedPayment(countryCode, currency);
    container.innerHTML = next.isFallback ? renderUnsupportedCurrency(next.fallbackNotice) : renderBankAccount(next.account, null, manualPaymentInstructions);
    document.querySelectorAll('#currency-selector-container button').forEach(btn => {
      if (btn.getAttribute('onclick')?.includes(`'${currency}'`)) {
        btn.className = btn.className.replace('bg-gray-50 border-blue-100 text-gray-600 hover:border-blue-200 hover:text-gray-900', 'bg-blue-50 border-blue-300 text-blue-600 pulse-glow');
      } else {
        btn.className = btn.className.replace('bg-blue-50 border-blue-300 text-blue-600 pulse-glow', 'bg-gray-50 border-blue-100 text-gray-600 hover:border-blue-200 hover:text-gray-900');
      }
    });
    const currencyDisplay = document.getElementById('form-currency-display');
    if (currencyDisplay) currencyDisplay.value = currency;
    const currencyHidden = document.getElementById('form-currency');
    if (currencyHidden) currencyHidden.value = currency;
    const amountPaid = document.getElementById('form-amount-paid');
    if (amountPaid) amountPaid.value = convertFromUSD(listing.price, currency);
    const newAmount = fmtLocal(convertFromUSD(listing.price, currency), currency);
    const bankAmount = document.getElementById('bank-amount');
    if (bankAmount) bankAmount.textContent = newAmount;
    const transferAmount = document.getElementById('transfer-amount-display');
    if (transferAmount) transferAmount.textContent = newAmount;
    if (window.lucide) lucide.createIcons();
  };

  window.copyAllDetails = (fields) => {
    const text = fields.map(f => `${f.label}: ${f.value}`).join('\n');
    copyToClipboard(text);
  };

  window.copyToClipboard = copyToClipboard;

  // File upload
  const dropZone = document.getElementById('file-drop-zone');
  const fileInput = document.getElementById('form-receipt-file');
  const filePrompt = document.getElementById('file-prompt');
  const fileInfo = document.getElementById('file-info');
  const fileNameDisplay = document.getElementById('file-name-display');
  const fileSizeDisplay = document.getElementById('file-size-display');
  const fileError = document.getElementById('file-error');

  window.removeReceiptFile = () => {
    fileInput.value = '';
    filePrompt.classList.remove('hidden');
    fileInfo.classList.add('hidden');
    fileError.classList.add('hidden');
    filePreviewContainer.classList.add('hidden');
  };

  const filePreviewImg = document.getElementById('file-preview-img');
  const filePreviewContainer = document.getElementById('file-preview-container');

  const handleFile = (file) => {
    fileError.classList.add('hidden');
    if (!file) return;
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    const ext = file.name.split('.').pop()?.toLowerCase();
    const extAllowed = ['jpg', 'jpeg', 'png', 'webp', 'pdf'].includes(ext);
    if (!allowed.includes(file.type) || !extAllowed) {
      fileError.textContent = 'Please upload a JPG, JPEG, PNG, WEBP, or PDF file.';
      fileError.classList.remove('hidden');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      fileError.textContent = 'File size must be 20 MB or less.';
      fileError.classList.remove('hidden');
      return;
    }
    fileNameDisplay.textContent = file.name;
    fileSizeDisplay.textContent = (file.size / 1024 / 1024).toFixed(2) + ' MB';
    filePrompt.classList.add('hidden');
    fileInfo.classList.remove('hidden');
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        filePreviewImg.src = e.target.result;
        filePreviewContainer.classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    } else {
      filePreviewContainer.classList.add('hidden');
    }
    if (window.lucide) lucide.createIcons();
  };

  const btnOpenGallery = document.getElementById('btn-open-gallery');
  const btnTakePhoto = document.getElementById('btn-take-photo');
  const btnChoosePdf = document.getElementById('btn-choose-pdf');

  const isNative = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());

  // Opens the device photo gallery (system Photo Picker on the native app, the
  // gallery chooser on web) so customers upload a receipt photo from their
  // Gallery — exactly like reviewing a bank receipt.
  const openGallery = async (e) => {
    if (e) e.stopPropagation();
    if (isNative) {
      try {
        const { Camera, MediaTypeSelection } = await import('@capacitor/camera');
        const { results } = await Camera.chooseFromGallery({
          mediaType: MediaTypeSelection.Images,
          allowMultipleSelection: false,
        });
        const r = results && results[0];
        if (!r || !r.webPath) return;
        const blob = await fetch(r.webPath).then(x => x.blob());
        const fmt = (((r.metadata && r.metadata.format) || 'jpg') + '').toLowerCase().replace(/^jpeg$/, 'jpg');
        const file = new File([blob], `receipt-${Date.now()}.${fmt}`, { type: blob.type || 'image/jpeg' });
        handleFile(file);
      } catch (err) {
        console.warn('Native gallery picker unavailable:', err);
        fileInput.setAttribute('accept', 'image/*');
        fileInput.removeAttribute('capture');
        fileInput.click();
      }
      return;
    }
    fileInput.setAttribute('accept', 'image/*,.jpg,.jpeg,.png,.webp');
    fileInput.removeAttribute('capture');
    fileInput.click();
  };

  dropZone.addEventListener('click', (e) => {
    if (e.target.closest('#btn-open-gallery') || e.target.closest('#btn-take-photo') || e.target.closest('#btn-choose-pdf') || e.target.closest('#file-info')) return;
    openGallery(e);
  });
  if (btnOpenGallery) btnOpenGallery.addEventListener('click', (e) => openGallery(e));
  if (btnTakePhoto) btnTakePhoto.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isNative) {
      import('@capacitor/camera').then(async ({ Camera, CameraSource }) => {
        const photo = await Camera.getPhoto({ source: CameraSource.Camera, quality: 90, allowEditing: false });
        if (photo && photo.webPath) {
          const blob = await fetch(photo.webPath).then(x => x.blob());
          handleFile(new File([blob], `receipt-${Date.now()}.jpg`, { type: blob.type || 'image/jpeg' }));
        }
      }).catch(() => {
        fileInput.setAttribute('capture', 'environment');
        fileInput.setAttribute('accept', 'image/*');
        fileInput.click();
      });
    } else {
      fileInput.setAttribute('capture', 'environment');
      fileInput.setAttribute('accept', 'image/*');
      fileInput.click();
    }
  });
  if (btnChoosePdf) btnChoosePdf.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.setAttribute('accept', '.pdf,application/pdf');
    fileInput.removeAttribute('capture');
    fileInput.click();
  });
  fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-blue-300', 'bg-blue-50');
  });
  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('border-blue-300', 'bg-blue-50');
  });
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-blue-300', 'bg-blue-50');
    if (e.dataTransfer.files.length) {
      const dt = new DataTransfer();
      dt.items.add(e.dataTransfer.files[0]);
      fileInput.files = dt.files;
      handleFile(e.dataTransfer.files[0]);
    }
  });

  // Form submission
  const form = document.getElementById('receipt-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('submit-receipt-btn');
    const file = fileInput.files[0];
    if (!file) {
      fileError.textContent = 'Please upload your payment receipt.';
      fileError.classList.remove('hidden');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Submitting...';
    if (window.lucide) lucide.createIcons();

    const progressContainer = document.getElementById('upload-progress');
    const progressBar = document.getElementById('upload-progress-bar');
    const progressText = document.getElementById('upload-progress-text');
    progressContainer.classList.remove('hidden');

    try {
      const fileExt = file.name.split('.').pop();
      const folderPrefix = isGuest ? 'guest' : user.id;
      const filePath = `${folderPrefix}/${orderNumber}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('payment-receipts')
        .upload(filePath, file, {
          onUploadProgress: (ev) => {
            const pct = Math.round((ev.loaded / ev.total) * 100);
            progressBar.style.width = pct + '%';
            progressText.textContent = `Uploading receipt... ${pct}%`;
          },
        });

      if (uploadError) throw new Error('Failed to upload receipt: ' + uploadError.message);

      progressBar.style.width = '100%';
      progressText.textContent = 'Saving payment record...';

      const receiptData = {
        order_number: orderNumber,
        listing_id: document.getElementById('form-listing-id').value,
        listing_title: document.getElementById('form-listing-title').value,
        amount: parseFloat(document.getElementById('form-amount-paid').value),
        currency: document.getElementById('form-currency').value,
        full_name: document.getElementById('form-full-name').value,
        email: document.getElementById('form-email').value,
        phone: document.getElementById('form-phone').value,
        payment_date: document.getElementById('form-payment-date').value,
        transaction_reference: document.getElementById('form-tx-ref').value,
        receipt_file_path: filePath,
        receipt_file_name: file.name,
        additional_notes: document.getElementById('form-notes').value || null,
        status: 'pending_verification',
      };

      if (isGuest) {
        receiptData.is_guest = true;
        receiptData.user_id = null;
        receiptData.guest_shipping_address = document.getElementById('form-shipping-address')?.value || null;
        receiptData.guest_country = document.getElementById('form-guest-country')?.value || null;
        receiptData.guest_state = document.getElementById('form-guest-state')?.value || null;
        receiptData.guest_city = document.getElementById('form-guest-city')?.value || null;
        receiptData.guest_postal_code = document.getElementById('form-guest-postal')?.value || null;
      } else {
        receiptData.user_id = user.id;
      }

      // Update the order row that checkout already created (matched by order
      // number) so one order never produces TWO rows in payment_receipts. When
      // no row exists yet (e.g. the customer opened the payment page directly),
      // fall back to inserting a fresh one.
      const { data: existingOrder } = await supabase
        .from('payment_receipts')
        .select('id')
        .eq('order_number', orderNumber)
        .limit(1);

      let dbError = null;
      if (existingOrder && existingOrder.length) {
        const { error: upErr } = await supabase
          .from('payment_receipts')
          .update(receiptData)
          .eq('id', existingOrder[0].id);
        dbError = upErr || null;
      } else {
        const { error: insErr } = await supabase
          .from('payment_receipts')
          .insert(receiptData);
        dbError = insErr || null;
      }

      if (dbError) throw new Error('Failed to save payment: ' + dbError.message);

      // Trigger notification emails (fire-and-forget — the DB trigger already queued them)
      try {
        const fnUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-order-notification`;
        fetch(fnUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ order_number: orderNumber }),
        }).catch(() => {});
      } catch (e) { /* non-blocking */ }

      const root = document.getElementById('payment-content');
      const listingRef = listing;
      root.innerHTML = renderPendingVerification(orderNumber, listingRef, parseFloat(document.getElementById('form-amount-paid').value), document.getElementById('form-currency').value);
      if (window.lucide) lucide.createIcons();
      showToast('Payment receipt submitted successfully.');
    } catch (err) {
      progressContainer.classList.add('hidden');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i data-lucide="send" class="w-5 h-5"></i> Submit Payment';
      if (window.lucide) lucide.createIcons();
      fileError.textContent = err.message || 'Something went wrong. Please try again.';
      fileError.classList.remove('hidden');
    }
  });
}

init();
