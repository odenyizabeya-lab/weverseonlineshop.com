// Special Order / Product Request module
// Handles the full customer flow: sign-in check, request form, delivery info, review, submit to Supabase.
import { getSupabase } from './supabase-lazy.js';

const COUNTRY_LIST = [
  'United States','United Kingdom','Canada','Australia','Germany','France','Spain','Italy','Netherlands','Belgium',
  'Sweden','Norway','Denmark','Finland','Switzerland','Austria','Ireland','Portugal','Greece','Poland',
  'Czech Republic','Hungary','Romania','Bulgaria','Croatia','Slovenia','Slovakia','Estonia','Latvia','Lithuania',
  'Russia','Ukraine','Turkey','Israel','Saudi Arabia','UAE','Qatar','Kuwait','Bahrain','Oman',
  'Egypt','South Africa','Nigeria','Kenya','Ghana','Ethiopia','Morocco','Algeria','Tunisia','Tanzania',
  'Japan','South Korea','China','Hong Kong','Taiwan','Singapore','Malaysia','Indonesia','Thailand','Vietnam',
  'Philippines','India','Pakistan','Bangladesh','Sri Lanka','Nepal','Cambodia','Mongolia','Kazakhstan','Uzbekistan',
  'Brazil','Argentina','Mexico','Colombia','Chile','Peru','Ecuador','Venezuela','Uruguay','Paraguay',
  'Bolivia','Costa Rica','Panama','Dominican Republic','Jamaica','Trinidad and Tobago','Guatemala','Honduras','El Salvador','Nicaragua',
  'New Zealand','Fiji','Papua New Guinea','Iceland','Luxembourg','Malta','Cyprus','Andorra','Monaco','Liechtenstein',
];

let currentQuery = '';
let prefilledData = null;

async function getCurrentUser() {
  const supabase = await getSupabase();
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
}

function showToast(msg) {
  if (window._showToast) { window._showToast(msg); return; }
  if (window.showToast) { window.showToast(msg); return; }
  const t = document.createElement('div');
  t.className = 'fixed top-6 right-6 z-[100] bg-gray-900 border border-blue-500/30 text-white px-4 py-3 rounded-xl shadow-lg text-sm';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function escapeAttr(s) { return escapeHtml(s); }

export function openSpecialOrderModal(query) {
  currentQuery = query || '';
  prefilledData = null;
  openSpecialOrderModalAsync();
}

export function openSpecialOrderFromSearch(title, brand, category, price, currency) {
  prefilledData = { title, brand, category, price, currency };
  currentQuery = title || '';
  openSpecialOrderModalAsync();
}

async function openSpecialOrderModalAsync() {
  const user = await getCurrentUser();
  if (!user) {
    sessionStorage.setItem('kco_auth_redirect', window.location.pathname);
    sessionStorage.setItem('kco_special_order_query', currentQuery);
    showToast('Please sign in to place a Special Order.');
    setTimeout(() => { window.location.href = '/auth.html'; }, 800);
    return;
  }
  renderSpecialOrderForm(user);
}

function renderSpecialOrderForm(user) {
  let panel = document.getElementById('special-order-overlay');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'special-order-overlay';
    panel.className = 'fixed inset-0 z-[60] bg-black/85 backdrop-blur-md overflow-y-auto';
    document.body.appendChild(panel);
  }

  const preTitle = prefilledData?.title || currentQuery || '';
  const preBrand = prefilledData?.brand || '';
  const preCategory = prefilledData?.category || '';
  const prePrice = prefilledData?.price || '';
  const preCurrency = prefilledData?.currency || 'USD';

  const countryOptions = COUNTRY_LIST.map(c => `<option value="${c}">${c}</option>`).join('');

  panel.innerHTML = `
    <div class="max-w-2xl mx-auto px-4 py-6 sm:py-10">
      <div class="glass bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
        <div class="flex items-center justify-between p-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-transparent">
          <div class="flex items-center gap-3">
            <div class="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
              <i data-lucide="package-plus" class="w-5 h-5 text-blue-600"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-900">Special Order Request</h3>
              <p class="text-xs text-gray-600">We'll source this item for you</p>
            </div>
          </div>
          <button onclick="closeSpecialOrderModal()" class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition text-[10px] font-bold uppercase tracking-wide">
            🔙 Back
          </button>
        </div>

        <div class="flex items-center gap-2 px-5 pt-4">
          <div id="so-step-1" class="flex items-center gap-2 text-blue-600 text-xs font-bold">
            <span class="so-step-dot w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[11px] font-bold">1</span>
            <span>Product Details</span>
          </div>
          <div class="flex-1 h-px bg-gray-200"></div>
          <div id="so-step-2" class="flex items-center gap-2 text-gray-500 text-xs font-bold">
            <span class="so-step-dot w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-[11px] font-bold">2</span>
            <span>Delivery Info</span>
          </div>
          <div class="flex-1 h-px bg-gray-200"></div>
          <div id="so-step-3" class="flex items-center gap-2 text-gray-500 text-xs font-bold">
            <span class="so-step-dot w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-[11px] font-bold">3</span>
            <span>Review & Submit</span>
          </div>
        </div>

        <div id="so-panel-1" class="p-5 space-y-4">
          <div>
            <label class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Product Name *</label>
            <input id="so-title" type="text" value="${escapeAttr(preTitle)}" placeholder="What are you looking for?"
              class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition">
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Description / Specifications</label>
            <textarea id="so-desc" rows="3" placeholder="Describe the item, model, size, color, features..."
              class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition"></textarea>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Category</label>
              <input id="so-category" type="text" value="${escapeAttr(preCategory)}" placeholder="e.g. Electronics, Fashion"
                class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition">
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Preferred Brand</label>
              <input id="so-brand" type="text" value="${escapeAttr(preBrand)}" placeholder="e.g. Apple, Nike"
                class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition">
            </div>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Target Price</label>
              <input id="so-price" type="number" min="0" step="0.01" value="${prePrice || ''}" placeholder="0.00"
                class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition">
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Currency</label>
              <select id="so-currency" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none transition">
                <option value="USD" ${preCurrency==='USD'?'selected':''}>USD</option><option value="EUR" ${preCurrency==='EUR'?'selected':''}>EUR</option><option value="GBP" ${preCurrency==='GBP'?'selected':''}>GBP</option>
                <option value="NGN" ${preCurrency==='NGN'?'selected':''}>NGN</option><option value="KES" ${preCurrency==='KES'?'selected':''}>KES</option><option value="GHS" ${preCurrency==='GHS'?'selected':''}>GHS</option>
                <option value="ZAR" ${preCurrency==='ZAR'?'selected':''}>ZAR</option><option value="JPY" ${preCurrency==='JPY'?'selected':''}>JPY</option><option value="CNY" ${preCurrency==='CNY'?'selected':''}>CNY</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Quantity</label>
              <input id="so-qty" type="number" min="1" value="1"
                class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition">
            </div>
          </div>
          <button onclick="specialOrderNext()" class="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
            Continue to Delivery <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>

        <div id="so-panel-2" class="p-5 space-y-4 hidden">
          <div>
            <label class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Full Name *</label>
            <input id="so-delivery-name" type="text" placeholder="Recipient full name"
              class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition">
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Street Address *</label>
            <input id="so-delivery-address" type="text" placeholder="House number, street name"
              class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">City *</label>
              <input id="so-delivery-city" type="text" placeholder="City"
                class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition">
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">State / Province</label>
              <input id="so-delivery-state" type="text" placeholder="State or province"
                class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Country *</label>
              <select id="so-delivery-country" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none transition">
                ${countryOptions}
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Postal Code</label>
              <input id="so-delivery-postal" type="text" placeholder="ZIP / postal code"
                class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition">
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Phone Number *</label>
            <input id="so-delivery-phone" type="tel" placeholder="+1 234 567 890"
              class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition">
          </div>
          <div class="flex gap-3">
            <button onclick="specialOrderBack()" class="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl text-sm uppercase tracking-wide transition flex items-center gap-2">
              <i data-lucide="arrow-left" class="w-4 h-4"></i> Back
            </button>
            <button onclick="specialOrderNext()" class="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
              Review Request <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </div>
        </div>

        <div id="so-panel-3" class="p-5 space-y-4 hidden">
          <div id="so-review-content" class="space-y-3"></div>
          <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div class="flex items-start gap-3">
              <i data-lucide="info" class="w-4 h-4 text-blue-600 mt-0.5 shrink-0"></i>
              <p class="text-xs text-gray-600 leading-relaxed">By submitting, you agree that our team will review your request and provide a quote. No payment is required until your request is approved and a price is confirmed. You'll receive status updates via your account dashboard.</p>
            </div>
          </div>
          <div class="flex gap-3">
            <button onclick="specialOrderBack()" class="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl text-sm uppercase tracking-wide transition flex items-center gap-2">
              <i data-lucide="arrow-left" class="w-4 h-4"></i> Back
            </button>
            <button id="so-submit-btn" onclick="submitSpecialOrder()" class="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
              <i data-lucide="send" class="w-4 h-4"></i> Submit Request
            </button>
          </div>
        </div>

        <div id="so-panel-success" class="p-8 text-center hidden">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
            <i data-lucide="check-circle" class="w-8 h-8 text-emerald-600"></i>
          </div>
          <h4 class="text-lg font-bold text-gray-900 mb-2">Request Submitted!</h4>
          <p class="text-sm text-gray-600 mb-5">Your Special Order request has been sent to our team. You'll receive updates in your account dashboard as we review and source your item.</p>
          <div class="flex gap-3 justify-center">
            <button onclick="closeSpecialOrderModal()" class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl text-sm uppercase tracking-wide transition">Close</button>
            <a href="/account.html" class="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-500/30 flex items-center gap-2">
              <i data-lucide="layout-dashboard" class="w-4 h-4"></i> View My Requests
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  panel.style.display = 'block';
  document.body.style.overflow = 'hidden';
  if (window.lucide) lucide.createIcons();
}

let currentStep = 1;

function goToStep(step) {
  currentStep = step;
  for (let i = 1; i <= 3; i++) {
    const p = document.getElementById(`so-panel-${i}`);
    if (p) p.classList.toggle('hidden', i !== step);
  }
  for (let i = 1; i <= 3; i++) {
    const indicator = document.getElementById(`so-step-${i}`);
    if (!indicator) continue;
    const dot = indicator.querySelector('.so-step-dot');
    if (i < step) {
      indicator.className = 'flex items-center gap-2 text-emerald-600 text-xs font-bold';
      dot.className = 'so-step-dot w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[11px] font-bold';
      dot.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5"></i>';
    } else if (i === step) {
      indicator.className = 'flex items-center gap-2 text-blue-600 text-xs font-bold';
      dot.className = 'so-step-dot w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[11px] font-bold';
      dot.textContent = String(i);
    } else {
      indicator.className = 'flex items-center gap-2 text-gray-500 text-xs font-bold';
      dot.className = 'so-step-dot w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-[11px] font-bold';
      dot.textContent = String(i);
    }
  }
  if (window.lucide) lucide.createIcons();
  const overlay = document.getElementById('special-order-overlay');
  if (overlay) overlay.scrollTo({ top: 0, behavior: 'smooth' });
}

function specialOrderNext() {
  if (currentStep === 1) {
    const title = document.getElementById('so-title').value.trim();
    if (!title) { showToast('Please enter a product name.'); return; }
    goToStep(2);
  } else if (currentStep === 2) {
    const name = document.getElementById('so-delivery-name').value.trim();
    const address = document.getElementById('so-delivery-address').value.trim();
    const city = document.getElementById('so-delivery-city').value.trim();
    const phone = document.getElementById('so-delivery-phone').value.trim();
    if (!name) { showToast('Please enter recipient name.'); return; }
    if (!address) { showToast('Please enter delivery address.'); return; }
    if (!city) { showToast('Please enter city.'); return; }
    if (!phone) { showToast('Please enter phone number.'); return; }
    renderReview();
    goToStep(3);
  }
}

function specialOrderBack() {
  if (currentStep > 1) goToStep(currentStep - 1);
}

function renderReview() {
  const get = (id) => (document.getElementById(id)?.value || '').trim() || '—';
  const review = document.getElementById('so-review-content');
  if (!review) return;
  review.innerHTML = `
    <div class="bg-gray-50 rounded-xl p-4 space-y-2.5 border border-gray-200">
      <div class="flex justify-between items-start"><span class="text-xs text-gray-500 uppercase font-bold">Product</span><span class="text-sm text-gray-900 font-semibold text-right">${escapeHtml(get('so-title'))}</span></div>
      <div class="flex justify-between items-start"><span class="text-xs text-gray-500 uppercase font-bold">Category</span><span class="text-sm text-gray-700 text-right">${escapeHtml(get('so-category'))}</span></div>
      <div class="flex justify-between items-start"><span class="text-xs text-gray-500 uppercase font-bold">Brand</span><span class="text-sm text-gray-700 text-right">${escapeHtml(get('so-brand'))}</span></div>
      <div class="flex justify-between items-start"><span class="text-xs text-gray-500 uppercase font-bold">Target Price</span><span class="text-sm text-blue-600 font-bold text-right">${escapeHtml(get('so-currency'))} ${escapeHtml(get('so-price'))}</span></div>
      <div class="flex justify-between items-start"><span class="text-xs text-gray-500 uppercase font-bold">Quantity</span><span class="text-sm text-gray-700 text-right">${escapeHtml(get('so-qty'))}</span></div>
      ${get('so-desc') !== '—' ? `<div class="pt-2 border-t border-gray-200"><span class="text-xs text-gray-500 uppercase font-bold block mb-1">Description</span><p class="text-sm text-gray-700">${escapeHtml(get('so-desc'))}</p></div>` : ''}
    </div>
    <div class="bg-gray-50 rounded-xl p-4 space-y-2.5 border border-gray-200">
      <p class="text-xs text-gray-500 uppercase font-bold mb-1">Delivery To</p>
      <p class="text-sm text-gray-900 font-semibold">${escapeHtml(get('so-delivery-name'))}</p>
      <p class="text-sm text-gray-600">${escapeHtml(get('so-delivery-address'))}</p>
      <p class="text-sm text-gray-600">${escapeHtml(get('so-delivery-city'))}, ${escapeHtml(get('so-delivery-state'))}</p>
      <p class="text-sm text-gray-600">${escapeHtml(get('so-delivery-postal'))} ${escapeHtml(get('so-delivery-country'))}</p>
      <p class="text-sm text-gray-600"><i data-lucide="phone" class="w-3.5 h-3.5 inline mr-1"></i>${escapeHtml(get('so-delivery-phone'))}</p>
    </div>
  `;
  if (window.lucide) lucide.createIcons();
}

async function submitSpecialOrder() {
  const btn = document.getElementById('so-submit-btn');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Submitting...'; if (window.lucide) lucide.createIcons(); }

  const payload = {
    request_title: document.getElementById('so-title').value.trim(),
    request_description: document.getElementById('so-desc').value.trim() || null,
    category: document.getElementById('so-category').value.trim() || null,
    brand: document.getElementById('so-brand').value.trim() || null,
    target_price: parseFloat(document.getElementById('so-price').value) || null,
    currency: document.getElementById('so-currency').value,
    quantity: parseInt(document.getElementById('so-qty').value) || 1,
    delivery_full_name: document.getElementById('so-delivery-name').value.trim(),
    delivery_address: document.getElementById('so-delivery-address').value.trim(),
    delivery_city: document.getElementById('so-delivery-city').value.trim(),
    delivery_state: document.getElementById('so-delivery-state').value.trim() || null,
    delivery_country: document.getElementById('so-delivery-country').value,
    delivery_postal_code: document.getElementById('so-delivery-postal').value.trim() || null,
    delivery_phone: document.getElementById('so-delivery-phone').value.trim(),
  };

  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase.from('product_requests').insert(payload).select().single();
    if (error) throw error;
    if (data) {
      await supabase.from('product_request_status_updates').insert({
        request_id: data.id, status: 'pending_review',
        message: 'Your request has been received and is awaiting review.',
      });
    }
    [1,2,3].forEach(i => document.getElementById(`so-panel-${i}`)?.classList.add('hidden'));
    document.getElementById('so-panel-success')?.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
    showToast('Special Order submitted successfully!');
  } catch (err) {
    showToast('Failed to submit request: ' + (err.message || 'Unknown error'));
    if (btn) { btn.disabled = false; btn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> Submit Request'; if (window.lucide) lucide.createIcons(); }
  }
}

function closeSpecialOrderModal() {
  const panel = document.getElementById('special-order-overlay');
  if (panel) panel.style.display = 'none';
  document.body.style.overflow = '';
}

window.openSpecialOrderModal = openSpecialOrderModal;
window.openSpecialOrderFromSearch = openSpecialOrderFromSearch;
window.closeSpecialOrderModal = closeSpecialOrderModal;
window.specialOrderNext = specialOrderNext;
window.specialOrderBack = specialOrderBack;
window.submitSpecialOrder = submitSpecialOrder;
window._openSpecialOrderFromSearch = openSpecialOrderFromSearch;

(async () => {
  const pendingQuery = sessionStorage.getItem('kco_special_order_query');
  if (pendingQuery) {
    sessionStorage.removeItem('kco_special_order_query');
    const user = await getCurrentUser();
    if (user) { currentQuery = pendingQuery; renderSpecialOrderForm(user); }
  }
})();
