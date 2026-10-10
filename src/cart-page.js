import { getAllListings, loadDBListings, findListingById, formatPrice, cleanListing, videoThumbHtml } from './showroom-data.js';
import { getTruckById, formatTruckPrice } from './truck-data.js';
import { getMotorhomeById } from './motorhome-data.js';
import { getCarById } from './car-data.js';
import { getPhoneById } from './phone-data.js';
import { PRODUCT_LISTINGS } from './products-data.js';
import { PRODUCT_EXTRA_LISTINGS } from './products-extra.js';
import { getCurrentUser, setRedirectAfterAuth } from './auth.js';
import { trackEvent } from './analytics.js';
import { readCart, setCartQty, removeFromCart, clearCart, emitCartChanged } from './cart.js';

function findProductById(id) {
  return PRODUCT_LISTINGS.find((p) => p.id === id || p.property_id === id)
    || PRODUCT_EXTRA_LISTINGS.find((p) => p.id === id || p.property_id === id);
}

function findListing(id) {
  return findListingById(id)
    || getTruckById(id)
    || getMotorhomeById(id)
    || getCarById(id)
    || getPhoneById(id)
    || findProductById(id);
}

function fmtMoney(amount, currency) {
  const n = parseFloat(amount) || 0;
  return `${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
}

// Discount price with the real (original) price crossed out through the middle
// when a discount is active — matches the showroom/details/checkout display.
function priceCellHtml(listing) {
  const pay = fmtMoney(listing.price, listing.currency || 'USD');
  const real = parseFloat(listing.real_price);
  if (Number.isFinite(real) && real > 0 && real > parseFloat(listing.price)) {
    return `<span class="price-strike line-through text-gray-400 mr-1 text-xs">${fmtMoney(real, listing.currency || 'USD')}</span><span class="text-amber-600 font-bold">${pay}</span>`;
  }
  return `<span class="text-amber-600 font-bold">${pay}</span>`;
}

function showToast(msg) {
  const el = document.getElementById('toast-msg');
  const toast = document.getElementById('toast');
  if (!el || !toast) return;
  el.textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');
  clearTimeout(window.__cartToastT);
  window.__cartToastT = setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 2000);
}

function renderEmpty() {
  return `
    <div class="max-w-md mx-auto text-center py-16">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-5">
        <i data-lucide="shopping-cart" class="w-7 h-7 text-gray-400"></i>
      </div>
      <h1 class="text-2xl font-black text-gray-900 tracking-tight">Your cart is empty</h1>
      <p class="text-sm text-gray-500 mt-2 mb-6">Browse the marketplace and tap "Add to Cart" on items you love.</p>
      <a href="/" class="btn-press inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-3 px-6 rounded-xl transition"><i data-lucide="shopping-bag" class="w-4 h-4"></i> Browse Marketplace</a>
    </div>
  `;
}

function renderCart(items) {
  const subtotal = items.reduce((sum, it) => sum + ((parseFloat(it.listing.price) || 0) * it.qty), 0);

  const rows = items.map((it) => {
    const listing = it.listing;
    return `
      <div class="flex flex-wrap items-center gap-x-4 gap-y-3 p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-xl" data-cart-row="${listing.property_id}">
        <a href="/details.html?id=${encodeURIComponent(listing.property_id)}" class="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100 ring-1 ring-gray-200">
          ${videoThumbHtml(listing, 'w-full h-full object-cover')}
        </a>
        <div class="flex-1 min-w-[160px] flex flex-col gap-1.5">
          <a href="/details.html?id=${encodeURIComponent(listing.property_id)}" class="text-sm font-bold text-gray-900 break-words hover:text-blue-600 transition">${listing.title}</a>
          <p class="text-[10px] text-gray-400">${listing.property_id}</p>
          <div class="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-sm leading-snug">${priceCellHtml(listing)}</div>
        </div>
        <div class="flex items-center gap-3 sm:gap-2 shrink-0 ml-auto sm:ml-0">
          <div class="flex items-center gap-2">
            <button onclick="cartPageChangeQty('${listing.property_id}', -1)" class="w-9 h-9 bg-white hover:bg-blue-100 border border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 transition flex items-center justify-center shrink-0" aria-label="Decrease quantity"><i data-lucide="minus" class="w-4 h-4"></i></button>
            <span class="text-sm font-bold text-gray-900 w-8 text-center" data-qty="${listing.property_id}">${it.qty}</span>
            <button onclick="cartPageChangeQty('${listing.property_id}', 1)" class="w-9 h-9 bg-white hover:bg-blue-100 border border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 transition flex items-center justify-center shrink-0" aria-label="Increase quantity"><i data-lucide="plus" class="w-4 h-4"></i></button>
          </div>
          <div class="text-right shrink-0 w-20 sm:w-24">
            <p class="text-sm font-black text-amber-600 whitespace-nowrap">${fmtMoney((parseFloat(listing.price) || 0) * it.qty, listing.currency || 'USD')}</p>
          </div>
          <button onclick="cartPageRemove('${listing.property_id}')" class="p-2 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-red-600 transition shrink-0" aria-label="Remove item"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Shopping Cart</h1>
      <span class="text-xs text-gray-500">${items.length} item${items.length === 1 ? '' : 's'}</span>
    </div>
    <div class="grid lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-3">
        ${rows}
        <button onclick="cartPageClear()" class="text-xs text-red-500 hover:text-red-700 font-semibold transition flex items-center gap-1.5 mt-2"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Clear Cart</button>
      </div>
      <div class="lg:col-span-1">
        <div class="bg-gray-50 border border-gray-200 rounded-2xl p-5 sticky top-20">
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Order Summary</h3>
          <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Subtotal</span><span class="text-gray-900 font-bold">${fmtMoney(subtotal, items[0].listing.currency || 'USD')}</span></div>
          <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Shipping</span><span class="text-emerald-600 font-bold">Calculated at checkout</span></div>
          <div class="flex justify-between text-sm mb-4"><span class="text-gray-500">Total</span><span class="text-amber-600 text-lg font-black">${fmtMoney(subtotal, items[0].listing.currency || 'USD')}</span></div>
          <button onclick="cartPageCheckout()" class="btn-press w-full bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-sm font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"><i data-lucide="lock" class="w-4 h-4"></i> Proceed to Checkout</button>
          <a href="/" class="block text-center text-xs text-gray-500 hover:text-gray-900 transition mt-3">Continue Shopping</a>
        </div>
      </div>
    </div>
  `;
}

async function init() {
  const root = document.getElementById('cart-content');
  await loadDBListings();
  const cart = readCart();
  if (cart.length === 0) {
    root.innerHTML = renderEmpty();
    if (window.lucide) lucide.createIcons();
    return;
  }
  const items = cart
    .map((entry) => {
      const listing = findListing(entry.id);
      if (!listing) return null;
      cleanListing(listing);
      return { listing, qty: entry.qty };
    })
    .filter(Boolean);
  if (items.length === 0) {
    root.innerHTML = renderEmpty();
    if (window.lucide) lucide.createIcons();
    return;
  }
  root.innerHTML = renderCart(items);
  if (window.lucide) lucide.createIcons();
}

window.cartPageChangeQty = (id, delta) => {
  const cart = readCart();
  const entry = cart.find((c) => c.id === id);
  if (!entry) return;
  setCartQty(id, entry.qty + delta);
  emitCartChanged();
  init();
};

window.cartPageRemove = (id) => {
  removeFromCart(id);
  emitCartChanged();
  init();
  showToast('Removed from cart.');
};

window.cartPageClear = () => {
  clearCart();
  emitCartChanged();
  init();
  showToast('Cart cleared.');
};

window.cartPageCheckout = async () => {
  const user = await getCurrentUser();
  if (user) {
    trackEvent('begin_checkout', {});
    window.location.href = '/checkout.html';
  } else {
    setRedirectAfterAuth('/checkout.html');
    window.location.href = '/auth.html?redirect=/checkout.html';
  }
};

init();