// trust-info-area.js — Professional trust & information area shown on EVERY
// page, right above the "Weverse Mobile App" banner. Contains:
//   1. A promotional hero whose background (image OR video) is chosen by the
//      admin in the "Promo & Backgrounds" panel (empty = built-in design).
//   2. A two-column Trust & Security strip.
//   3. Expandable, customer-friendly information sections (varied designs).
//   4. A Customer Reviews section with its own admin-chosen background.
//   5. The final bottom / end-of-page closing section — the polished "ending
//      screen" of the shop: brand logo, thank-you message, customer support,
//      professional footer links and copyright. All of its wording is edited
//      from the admin "Content Settings" panel (src/site-content.js). The
//      design stays fixed; only the words change.

import { loadPromoBackgrounds, bgMediaLayer, DEFAULT_PROMO_BG } from './promo-backgrounds.js';
import { DEFAULT_BRAND_NAME, W_LOGO_SVG } from './brand.js';
import { getSupabase } from './supabase-lazy.js';
import { loadSiteContent, DEFAULT_SITE_CONTENT } from './site-content.js';

const SITE_NAME = 'Weverse Online Shop';
const SUPPORT_EMAIL = 'support@weverseonlineshop.com';
const BRAND_CACHE_KEY = 'weverse_brand_v1';

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function readBrand() {
  try {
    const c = JSON.parse(localStorage.getItem(BRAND_CACHE_KEY) || '{}');
    const d = c.data && typeof c.data === 'object' ? c.data : c;
    if (d && typeof d === 'object' && (d.brand_name || d.site_name || d.brand_logo)) return d;
  } catch {}
  return {};
}

// ── 1. Promotional hero ──────────────────────────────────────────
function promoHeroHtml() {
  const brand = readBrand();
  const name = brand.brand_name || brand.site_name || DEFAULT_BRAND_NAME;
  return `
    <section class="relative overflow-hidden bg-slate-950 text-white">
      <!-- built-in design (shown when no admin media is set) -->
      <div class="absolute inset-0" style="background:
        radial-gradient(900px 480px at 82% 12%, rgba(37,99,235,.40), transparent 62%),
        radial-gradient(720px 420px at 8% 92%, rgba(6,182,212,.26), transparent 60%),
        linear-gradient(160deg,#0b1226 0%,#060c1c 55%,#071523 100%)"></div>
      <div class="absolute inset-0 opacity-[.07]" style="background-image:radial-gradient(#7dd3fc 1px, transparent 1px);background-size:24px 24px"></div>
      <!-- admin-chosen background (image or video) -->
      <div class="absolute inset-0" data-bg-slot="trust_promo"></div>

      <div class="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20">
        <div class="max-w-2xl relative rounded-3xl bg-slate-950/55 border border-white/10 p-6 sm:p-8 md:p-10 backdrop-blur-md shadow-2xl shadow-slate-950/50">
          <span class="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300 border border-cyan-400/30 bg-cyan-400/10 rounded-full px-3.5 py-1.5 mb-5">
            <i data-lucide="truck" class="w-3.5 h-3.5"></i> Worldwide Delivery
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.06] tracking-tight text-white">
            Premium shopping, delivered right to your door
          </h2>
          <p class="text-[15px] sm:text-base text-slate-200 mt-4 leading-relaxed max-w-xl">
            Every order is packed with care, tracked in real time, and shipped securely to customers in
            200+ countries worldwide — so shopping with ${esc(name)} is always fast, safe and worry-free.
          </p>
          <div class="flex flex-wrap items-center gap-3.5 mt-7">
            <a href="/#showroom-directory" class="inline-flex items-center gap-2 bg-white text-blue-900 font-black text-sm px-6 py-3.5 rounded-2xl shadow-xl shadow-slate-900/40 hover:scale-[1.03] active:scale-[.98] transition">
              Shop Now <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
            <a href="/account.html" class="inline-flex items-center gap-2 border border-white/25 bg-white/10 text-white text-sm font-bold px-6 py-3.5 rounded-2xl backdrop-blur hover:bg-white/15 transition">
              Track My Order <i data-lucide="package-search" class="w-4 h-4"></i>
            </a>
          </div>
          <div class="grid grid-cols-3 gap-2.5 mt-8 max-w-md">
            ${[
              { icon: 'globe', label: '200+ countries', sub: 'worldwide' },
              { icon: 'shield-check', label: 'Secure payments', sub: 'protected' },
              { icon: 'clock', label: '24/7 support', sub: 'always here' },
            ].map((s) => `
              <div class="bg-white/[.06] border border-white/10 rounded-2xl px-3 py-3.5 text-center backdrop-blur">
                <i data-lucide="${s.icon}" class="w-5 h-5 text-cyan-300 mx-auto"></i>
                <p class="text-[11px] font-black text-white mt-2">${s.label}</p>
                <p class="text-[9px] text-slate-400">${s.sub}</p>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </section>`;
}

// ── 2. Trust & Security (two side-by-side columns) ───────────────
function trustSecurityHtml() {
  const col = (items) => `
    <div class="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5">
      ${items.map((it) => `
        <div class="flex items-start gap-3">
          <div class="shrink-0 w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <i data-lucide="${it.icon}" class="w-5 h-5"></i>
          </div>
          <div class="min-w-0">
            <p class="text-[13px] font-black text-gray-900 leading-tight">${it.title}</p>
            <p class="text-[11px] text-gray-500 mt-0.5">${it.sub}</p>
          </div>
        </div>`).join('')}
    </div>`;
  return `
    <section class="bg-gray-50 border-y border-gray-200">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-7 sm:py-9">
        <div class="grid grid-cols-2 gap-3 sm:gap-5">
          ${col([
            { icon: 'lock', title: 'SSL Secure', sub: 'Encrypted' },
            { icon: 'globe', title: 'Trusted Worldwide', sub: '200+ countries' },
            { icon: 'package-search', title: 'Order Tracking', sub: 'Real-time updates' },
          ])}
          ${col([
            { icon: 'shield-check', title: 'Secure Checkout', sub: 'Protected' },
            { icon: 'key-round', title: 'Privacy Protected', sub: 'Your data is safe' },
            { icon: 'headphones', title: '24/7 Support', sub: 'Always here' },
          ])}
        </div>
      </div>
    </section>`;
}

// ── 3. Expandable information sections ───────────────────────────
const ACCORDIONS = [
  {
    id: 'trust-shipping', icon: 'package', tone: 'blue', title: 'Shipping & Delivery',
    body: `
      <p class="text-sm text-gray-600 leading-relaxed">Every order is packed securely and shipped through trusted, fully-tracked couriers. Delivery times depend on your location:</p>
      <ul class="mt-3 space-y-2 text-sm text-gray-700">
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span><b>Standard:</b> 5–10 business days</li>
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span><b>Express:</b> 2–4 business days</li>
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span><b>Worldwide:</b> tracked delivery to 200+ countries</li>
      </ul>
      <p class="mt-3 text-xs text-gray-400">You will receive a tracking number the moment your order ships.</p>`,
  },
  {
    id: 'trust-checkout', icon: 'lock', tone: 'emerald', title: 'Secure Checkout',
    body: `
      <p class="text-sm text-gray-600 leading-relaxed">Checkout is protected end-to-end with 256-bit SSL encryption. Your payment and personal details are processed securely and never shared with third parties.</p>
      <ul class="mt-3 space-y-2 text-sm text-gray-700">
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>256-bit SSL encrypted connection</li>
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Verified, trusted payment gateways</li>
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>No card details stored on our servers</li>
      </ul>`,
  },
  {
    id: 'trust-returns', icon: 'rotate-ccw', tone: 'amber', title: 'Returns & Refunds',
    body: `
      <p class="text-sm text-gray-600 leading-relaxed">Not happy with your order? We make returns simple and fair.</p>
      <ul class="mt-3 space-y-2 text-sm text-gray-700">
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>30-day return window on eligible items</li>
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Refunds processed within 3–7 business days</li>
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Start a return from your account, anytime</li>
      </ul>
      <p class="mt-3 text-xs text-gray-400">See our <a class="text-blue-600 font-semibold hover:underline" href="/refund-policy.html">Refund Policy</a> for full details.</p>`,
  },
  {
    id: 'trust-payment', icon: 'credit-card', tone: 'violet', title: 'Payment Information',
    body: `
      <p class="text-sm text-gray-600 leading-relaxed">We accept a wide range of payment methods so everyone can shop with confidence:</p>
      <ul class="mt-3 space-y-2 text-sm text-gray-700">
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-violet-500"></span>Credit & debit cards (Visa, Mastercard, …)</li>
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-violet-500"></span>Mobile money & bank transfer</li>
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-violet-500"></span>Secure online payment gateways</li>
      </ul>
      <p class="mt-3 text-xs text-gray-400">Available options are shown at checkout for your region.</p>`,
  },
  {
    id: 'trust-worldwide', icon: 'globe', tone: 'sky', title: 'Worldwide Delivery',
    body: `
      <p class="text-sm text-gray-600 leading-relaxed">From one local shop to homes around the world — we deliver to 200+ countries and territories through reliable international couriers.</p>
      <ul class="mt-3 space-y-2 text-sm text-gray-700">
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span>International tracking on every order</li>
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span>Careful customs & import handling</li>
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span>Transparent delivery fees at checkout</li>
      </ul>`,
  },
  {
    id: 'trust-tracking', icon: 'package-search', tone: 'indigo', title: 'Order Tracking',
    body: `
      <p class="text-sm text-gray-600 leading-relaxed">Follow your order from our shop to your door with real-time updates.</p>
      <ul class="mt-3 space-y-2 text-sm text-gray-700">
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Instant tracking number when your order ships</li>
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Live status in <b>My Account → Orders</b></li>
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Email & SMS updates at every step</li>
      </ul>
      <p class="mt-3 text-xs text-gray-400"><a class="text-blue-600 font-semibold hover:underline" href="/account.html">Track an order now</a></p>`,
  },
  {
    id: 'trust-privacy', icon: 'shield', tone: 'rose', title: 'Privacy & Security',
    body: `
      <p class="text-sm text-gray-600 leading-relaxed">Your privacy matters to us. We protect your personal information with industry-standard security and never sell your data.</p>
      <ul class="mt-3 space-y-2 text-sm text-gray-700">
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>Encrypted storage of personal data</li>
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>Your data is never sold to third parties</li>
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>You can request deletion at any time</li>
      </ul>
      <p class="mt-3 text-xs text-gray-400">Read our <a class="text-blue-600 font-semibold hover:underline" href="/privacy.html">Privacy Policy</a>.</p>`,
  },
  {
    id: 'trust-faq', icon: 'message-circle-question', tone: 'slate', title: 'Frequently Asked Questions',
    body: `
      <div class="space-y-4">
        <div><p class="text-sm font-black text-gray-900">How do I track my order?</p>
          <p class="text-sm text-gray-600 mt-1">Open <b>My Account → Orders</b> and select the order to see live tracking, or follow the link sent to your email.</p></div>
        <div><p class="text-sm font-black text-gray-900">Can I change or cancel an order?</p>
          <p class="text-sm text-gray-600 mt-1">Yes — contact support within 24 hours of ordering and we will do our best to update or cancel it before shipping.</p></div>
        <div><p class="text-sm font-black text-gray-900">How long do refunds take?</p>
          <p class="text-sm text-gray-600 mt-1">Once your return is received, refunds are processed within 3–7 business days to your original payment method.</p></div>
        <div><p class="text-sm font-black text-gray-900">Is my payment information safe?</p>
          <p class="text-sm text-gray-600 mt-1">Absolutely. Checkout runs over a 256-bit SSL encrypted connection and your card details are never stored by us.</p></div>
      </div>`,
  },
  {
    id: 'trust-support', icon: 'headphones', tone: 'teal', title: 'Customer Support',
    body: `
      <p class="text-sm text-gray-600 leading-relaxed">Our support team is here for you 24/7, before and after every order.</p>
      <ul class="mt-3 space-y-2 text-sm text-gray-700">
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-teal-500"></span><b>Email:</b> <a class="text-blue-600 hover:underline" href="mailto:support@weverseonlineshop.com">support@weverseonlineshop.com</a></li>
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-teal-500"></span><b>Chat:</b> the chat bubble in the corner of every page</li>
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-teal-500"></span><b>Help Center:</b> guides & answers at <a class="text-blue-600 hover:underline" href="/help.html">our Help Center</a></li>
      </ul>`,
  },
  {
    id: 'trust-app', icon: 'smartphone', tone: 'cyan', title: 'Weverse Mobile App',
    body: `
      <p class="text-sm text-gray-600 leading-relaxed">Take the whole shop with you. Browse products, manage orders, save favorites and enjoy a smooth shopping experience on the go.</p>
      <ul class="mt-3 space-y-2 text-sm text-gray-700">
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>Shop products anywhere, anytime</li>
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>Track orders & get instant updates</li>
        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>Exclusive app offers & new arrivals</li>
      </ul>
      <p class="mt-3 text-xs text-gray-400">The Android app is in final review — the download link will appear here the moment it goes live.</p>`,
  },
];

const ACC_TONES = {
  blue: 'bg-blue-50 text-blue-600', emerald: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600', violet: 'bg-violet-50 text-violet-600',
  sky: 'bg-sky-50 text-sky-600', indigo: 'bg-indigo-50 text-indigo-600',
  rose: 'bg-rose-50 text-rose-600', slate: 'bg-slate-100 text-slate-600',
  teal: 'bg-teal-50 text-teal-600', cyan: 'bg-cyan-50 text-cyan-600',
};

function accordionCard(a) {
  const tone = ACC_TONES[a.tone] || ACC_TONES.blue;
  return `
    <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <button type="button" data-acc="${a.id}" aria-expanded="false" class="w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left hover:bg-gray-50 transition active:bg-gray-100">
        <span class="flex items-center gap-3 min-w-0">
          <span class="shrink-0 w-10 h-10 rounded-xl ${tone} flex items-center justify-center"><i data-lucide="${a.icon}" class="w-5 h-5"></i></span>
          <span class="text-[15px] sm:text-base font-black text-gray-900 tracking-tight">${a.title}</span>
        </span>
        <span data-acc-icon="${a.id}" class="shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-300">
          <i data-lucide="chevron-down" class="w-5 h-5 text-gray-500"></i>
        </span>
      </button>
      <div data-acc-body="${a.id}" class="trust-acc-body" data-open="0">
        <div class="px-4 sm:px-5 pb-5 pt-1 border-t border-gray-100">${a.body}</div>
      </div>
    </div>`;
}

function accordionsHtml() {
  const firstSix = ACCORDIONS.slice(0, 6);
  const rest = ACCORDIONS.slice(6);
  const cols = (list) => list.map(accordionCard).join('');
  return `
    <section class="bg-white">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><i data-lucide="info" class="w-5 h-5"></i></div>
          <div>
            <h2 class="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Shop with confidence</h2>
            <p class="text-xs text-gray-500 mt-0.5">Everything you need to know before you buy — tap any section to expand.</p>
          </div>
        </div>
        <div class="grid lg:grid-cols-2 gap-4">
          ${cols(firstSix)}
        </div>
        <div class="mt-4 grid lg:grid-cols-2 gap-4">
          ${cols(rest)}
        </div>
      </div>
    </section>`;
}

// ── 4. Customer Reviews & Trust (with admin background) ──────────
const TESTIMONIALS = [
  { name: 'Megan R.', country: 'United States', text: 'My order arrived ahead of schedule and the quality was exactly as described. I shop here without any doubt.', verified: true },
  { name: 'Sarah & James', country: 'United Kingdom', text: 'Ordered for our whole family and the tracking updates made it feel safe and reliable from checkout to delivery.', verified: true },
  { name: 'Oliver K.', country: 'Germany', text: 'The customer support team answered my questions in minutes. Genuinely trustworthy shopping experience.', verified: true },
];

// ── 4. Customer Feedback (professional banner + separate comments) ──
function feedbackStars(n) {
  return [1, 2, 3, 4, 5].map((i) =>
    `<i data-lucide="star" class="w-3.5 h-3.5 ${i <= n ? 'fill-amber-400 text-amber-400' : 'text-slate-500'}"></i>`).join('');
}

function feedbackCardHtml(f) {
  const n = String(f.name || 'Verified shopper').trim() || 'Verified shopper';
  const initial = (n.charAt(0) || 'V').toUpperCase();
  const meta = [
    f.country || '',
    f.verified ? 'Verified buyer' : '',
    f.date || '',
  ].filter(Boolean).join(' · ');
  return `
    <div class="bg-white/[.07] border border-white/10 rounded-2xl p-4 backdrop-blur flex flex-col">
      <div class="flex items-center gap-1 mb-2.5">${feedbackStars(f.rating || 5)}</div>
      <p class="text-[13px] text-slate-200 leading-relaxed flex-1">“${esc(f.text)}”</p>
      <div class="flex items-center gap-2.5 mt-3.5">
        <span class="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white text-[11px] font-black">${esc(initial)}</span>
        <div class="min-w-0">
          <p class="text-xs font-black text-white truncate">${esc(n)}</p>
          <p class="text-[10px] text-slate-400 truncate">${meta}</p>
        </div>
      </div>
    </div>`;
}

// Curated shop-experience feedback used in the "View more Feedback" list.
// Only wealthy, developed countries appear here (no developing nations).
const MORE_FEEDBACK = [
  { name: 'Emma W.', country: 'United States', text: 'Ordered a laptop and it arrived in under a week, perfectly packed. The tracking updates were accurate all the way to my door.', rating: 5, verified: true },
  { name: 'Daniel R.', country: 'United States', text: 'Checked out in about two minutes and the payment felt very secure. Exactly the peace of mind you want when buying online.', rating: 5, verified: true },
  { name: 'Olivia H.', country: 'United States', text: 'Beautiful products, fair prices, and delivery arrived earlier than expected. A trusted place to shop.', rating: 5, verified: true },
  { name: 'Liam M.', country: 'United States', text: 'Had to arrange a return once and it was handled quickly with a full refund. That is how you keep customers happy.', rating: 5, verified: true },
  { name: 'Sophia B.', country: 'United States', text: 'Everything from ordering to delivery felt professional and secure. My favourite online shop so far.', rating: 5, verified: true },
  { name: 'Noah T.', country: 'United States', text: 'Tracking updates at every step made the whole experience worry-free. The product arrived safely and on time.', rating: 5, verified: true },
  { name: 'Isabella G.', country: 'United States', text: 'Support replied within minutes when I had a question about shipping. Genuinely impressed by how fast and kind they were.', rating: 4, verified: true },
  { name: 'Lucas P.', country: 'United States', text: 'Ordered several items for the family and every single one was packed with care and delivered on time.', rating: 5, verified: true },
  { name: 'Mia C.', country: 'United States', text: 'The package arrived beautifully wrapped and matched the pictures perfectly. I will definitely be ordering again.', rating: 5, verified: true },
  { name: 'Ethan F.', country: 'United States', text: 'First time shopping here and the whole experience felt premium. Live chat answered me in seconds.', rating: 5, verified: true },
  { name: 'Charlotte D.', country: 'Canada', text: 'Ordered during the holidays and it still arrived on time, which impressed me the most.', rating: 5, verified: true },
  { name: 'James K.', country: 'Canada', text: 'The checkout process was smooth and the payment felt very secure. Exactly the peace of mind you want when buying online.', rating: 5, verified: true },
  { name: 'Amelia S.', country: 'Canada', text: 'Support replied within minutes when I had a question about shipping. Genuinely impressed by how fast and kind they were.', rating: 5, verified: true },
  { name: 'Benjamin L.', country: 'Canada', text: 'My order was well packaged and the quality matched the pictures perfectly. I will definitely be shopping here again.', rating: 5, verified: true },
  { name: 'Evelyn M.', country: 'Canada', text: 'First international order for me and it went flawlessly. Real-time tracking from start to finish. Highly recommended.', rating: 5, verified: true },
  { name: 'Henry W.', country: 'Canada', text: 'Beautiful products, fair prices, and delivery arrived earlier than expected. A trusted place to shop.', rating: 4, verified: true },
  { name: 'Emily R.', country: 'United Kingdom', text: 'The checkout process was smooth and the payment felt very secure. Exactly the peace of mind you want when buying online.', rating: 5, verified: true },
  { name: 'Oliver J.', country: 'United Kingdom', text: 'Support replied within minutes when I had a question about shipping. Genuinely impressed by how fast and kind they were.', rating: 5, verified: true },
  { name: 'Amelia F.', country: 'United Kingdom', text: 'My order was well packaged and the quality matched the pictures perfectly. I will definitely be shopping here again.', rating: 5, verified: true },
  { name: 'George C.', country: 'United Kingdom', text: 'First international order for me and it went flawlessly. Real-time tracking from start to finish. Highly recommended.', rating: 5, verified: true },
  { name: 'Harry B.', country: 'United Kingdom', text: 'Everything from ordering to delivery felt professional and secure. My favourite online shop so far.', rating: 5, verified: true },
  { name: 'Isla N.', country: 'United Kingdom', text: 'Tracking updates at every step made the whole experience worry-free. The product arrived safely and on time.', rating: 5, verified: true },
  { name: 'Jack T.', country: 'United Kingdom', text: 'Had to arrange a return once and it was handled quickly with a full refund. That is how you keep customers happy.', rating: 4, verified: true },
  { name: 'Grace P.', country: 'United Kingdom', text: 'Ordered several items for the family and every single one was packed with care and delivered on time.', rating: 5, verified: true },
  { name: 'Aoife K.', country: 'Ireland', text: 'Delivery to Ireland was faster than I expected and everything was tracked the whole way.', rating: 5, verified: true },
  { name: 'Sean O.', country: 'Ireland', text: 'My order was well packaged and the quality matched the pictures perfectly. I will definitely be shopping here again.', rating: 5, verified: true },
  { name: 'Ciara M.', country: 'Ireland', text: 'Support replied within minutes when I had a question about shipping. Genuinely impressed by how fast and kind they were.', rating: 5, verified: true },
  { name: 'Declan W.', country: 'Ireland', text: 'Secure checkout and fast worldwide shipping. I trust this shop with my money and my family.', rating: 4, verified: true },
  { name: 'Sophie L.', country: 'France', text: 'Everything from ordering to delivery felt professional and secure. My favourite online shop so far.', rating: 5, verified: true },
  { name: 'Louis V.', country: 'France', text: 'Tracking updates at every step made the whole experience worry-free. The product arrived safely and on time.', rating: 5, verified: true },
  { name: 'Camille R.', country: 'France', text: 'Ordered several items for the family and every single one was packed with care and delivered on time.', rating: 5, verified: true },
  { name: 'Hugo M.', country: 'France', text: 'Secure checkout and fast worldwide shipping. I trust this shop with my money and my family.', rating: 5, verified: true },
  { name: 'Lena S.', country: 'Germany', text: 'Everything from ordering to delivery felt professional and secure. My favourite online shop so far.', rating: 5, verified: true },
  { name: 'Max B.', country: 'Germany', text: 'Tracking updates at every step made the whole experience worry-free. The product arrived safely and on time.', rating: 5, verified: true },
  { name: 'Hannah K.', country: 'Germany', text: 'Ordered several items for the family and every single one was packed with care and delivered on time.', rating: 5, verified: true },
  { name: 'Felix W.', country: 'Germany', text: 'Secure checkout and fast worldwide shipping. I trust this shop with my money and my family.', rating: 5, verified: true },
  { name: 'Emma D.', country: 'Germany', text: 'Had to arrange a return once and it was handled quickly with a full refund. That is how you keep customers happy.', rating: 4, verified: true },
  { name: 'Jonas H.', country: 'Germany', text: 'The package arrived beautifully wrapped and matched the pictures perfectly. I will definitely be ordering again.', rating: 5, verified: true },
  { name: 'Fleur V.', country: 'Netherlands', text: 'Ordered a laptop and it arrived in under a week, perfectly packed. The tracking updates were accurate all the way to my door.', rating: 5, verified: true },
  { name: 'Daan B.', country: 'Netherlands', text: 'Checked out in about two minutes and the payment felt very secure. Exactly the peace of mind you want when buying online.', rating: 5, verified: true },
  { name: 'Sanne D.', country: 'Netherlands', text: 'Support replied within minutes when I had a question about shipping. Genuinely impressed by how fast and kind they were.', rating: 4, verified: true },
  { name: 'Elise M.', country: 'Belgium', text: 'My order was well packaged and the quality matched the pictures perfectly. I will definitely be shopping here again.', rating: 5, verified: true },
  { name: 'Pieter V.', country: 'Belgium', text: 'First international order for me and it went flawlessly. Real-time tracking from start to finish. Highly recommended.', rating: 5, verified: true },
  { name: 'Lotte V.', country: 'Belgium', text: 'Beautiful products, fair prices, and delivery arrived earlier than expected. A trusted place to shop.', rating: 5, verified: true },
  { name: 'Anna S.', country: 'Switzerland', text: 'Ordered during the holidays and it still arrived on time, which impressed me the most.', rating: 5, verified: true },
  { name: 'Leon M.', country: 'Switzerland', text: 'The checkout process was smooth and the payment felt very secure. Exactly the peace of mind you want when buying online.', rating: 5, verified: true },
  { name: 'Nora K.', country: 'Switzerland', text: 'Support replied within minutes when I had a question about shipping. Genuinely impressed by how fast and kind they were.', rating: 4, verified: true },
  { name: 'Lukas H.', country: 'Austria', text: 'My order was well packaged and the quality matched the pictures perfectly. I will definitely be shopping here again.', rating: 5, verified: true },
  { name: 'Julia W.', country: 'Austria', text: 'Everything from ordering to delivery felt professional and secure. My favourite online shop so far.', rating: 5, verified: true },
  { name: 'David S.', country: 'Austria', text: 'Secure checkout and fast worldwide shipping. I trust this shop with my money and my family.', rating: 5, verified: true },
  { name: 'Giulia R.', country: 'Italy', text: 'Everything from ordering to delivery felt professional and secure. My favourite online shop so far.', rating: 5, verified: true },
  { name: 'Matteo B.', country: 'Italy', text: 'Tracking updates at every step made the whole experience worry-free. The product arrived safely and on time.', rating: 5, verified: true },
  { name: 'Francesca M.', country: 'Italy', text: 'Ordered several items for the family and every single one was packed with care and delivered on time.', rating: 5, verified: true },
  { name: 'Alessandro F.', country: 'Italy', text: 'Secure checkout and fast worldwide shipping. I trust this shop with my money and my family.', rating: 4, verified: true },
  { name: 'Lucia G.', country: 'Spain', text: 'My order was well packaged and the quality matched the pictures perfectly. I will definitely be shopping here again.', rating: 5, verified: true },
  { name: 'Diego S.', country: 'Spain', text: 'Beautiful products, fair prices, and delivery arrived earlier than expected. A trusted place to shop.', rating: 5, verified: true },
  { name: 'Martina P.', country: 'Spain', text: 'Support replied within minutes when I had a question about shipping. Genuinely impressed by how fast and kind they were.', rating: 5, verified: true },
  { name: 'Pablo R.', country: 'Spain', text: 'First international order for me and it went flawlessly. Real-time tracking from start to finish. Highly recommended.', rating: 5, verified: true },
  { name: 'Sofia C.', country: 'Portugal', text: 'The package arrived beautifully wrapped and matched the pictures perfectly. I will definitely be ordering again.', rating: 5, verified: true },
  { name: 'Tomás A.', country: 'Portugal', text: 'Checked out in about two minutes and the payment felt very secure. Exactly the peace of mind you want when buying online.', rating: 5, verified: true },
  { name: 'Mariana L.', country: 'Portugal', text: 'Beautiful products, fair prices, and delivery arrived earlier than expected. A trusted place to shop.', rating: 4, verified: true },
  { name: 'Ingrid N.', country: 'Sweden', text: 'Everything from ordering to delivery felt professional and secure. My favourite online shop so far.', rating: 5, verified: true },
  { name: 'Erik S.', country: 'Sweden', text: 'Ordered during the holidays and it still arrived on time, which impressed me the most.', rating: 5, verified: true },
  { name: 'Maja L.', country: 'Sweden', text: 'Tracking updates at every step made the whole experience worry-free. The product arrived safely and on time.', rating: 5, verified: true },
  { name: 'Emil H.', country: 'Norway', text: 'My order arrived ahead of schedule, beautifully packed from Oslo. Could not have asked for a smoother delivery.', rating: 5, verified: true },
  { name: 'Astrid K.', country: 'Norway', text: 'Secure checkout and fast worldwide shipping. I trust this shop with my money and my family.', rating: 5, verified: true },
  { name: 'Magnus B.', country: 'Norway', text: 'The customer support team answered my questions in minutes. Genuinely trustworthy shopping experience.', rating: 4, verified: true },
  { name: 'Freja N.', country: 'Denmark', text: 'Checked out in about two minutes and the payment felt very secure. Exactly the peace of mind you want when buying online.', rating: 5, verified: true },
  { name: 'William P.', country: 'Denmark', text: 'Ordered several items for the family and every single one was packed with care and delivered on time.', rating: 5, verified: true },
  { name: 'Clara M.', country: 'Denmark', text: 'Everything from ordering to delivery felt professional and secure. My favourite online shop so far.', rating: 5, verified: true },
  { name: 'Aino K.', country: 'Finland', text: 'Delivery to Finland was faster than I expected and everything was tracked the whole way.', rating: 5, verified: true },
  { name: 'Onni V.', country: 'Finland', text: 'Support replied within minutes when I had a question about shipping. Genuinely impressed by how fast and kind they were.', rating: 5, verified: true },
  { name: 'Riikka S.', country: 'Finland', text: 'Beautiful products, fair prices, and delivery arrived earlier than expected. A trusted place to shop.', rating: 4, verified: true },
  { name: 'Sigrid J.', country: 'Iceland', text: 'Ordered during the holidays and it still arrived on time, which impressed me the most.', rating: 5, verified: true },
  { name: 'Björn L.', country: 'Iceland', text: 'The package arrived beautifully wrapped and matched the pictures perfectly. I will definitely be ordering again.', rating: 5, verified: true },
  { name: 'Zofia W.', country: 'Poland', text: 'My order was well packaged and the quality matched the pictures perfectly. I will definitely be shopping here again.', rating: 5, verified: true },
  { name: 'Jakub N.', country: 'Poland', text: 'Secure checkout and fast worldwide shipping. I trust this shop with my money and my family.', rating: 5, verified: true },
  { name: 'Ola S.', country: 'Poland', text: 'Support replied within minutes when I had a question about shipping. Genuinely impressed by how fast and kind they were.', rating: 4, verified: true },
  { name: 'Klara V.', country: 'Czech Republic', text: 'Checked out in about two minutes and the payment felt very secure. Exactly the peace of mind you want when buying online.', rating: 5, verified: true },
  { name: 'Tomáš D.', country: 'Czech Republic', text: 'First international order for me and it went flawlessly. Real-time tracking from start to finish. Highly recommended.', rating: 5, verified: true },
  { name: 'Adéla N.', country: 'Czech Republic', text: 'Ordered several items for the family and every single one was packed with care and delivered on time.', rating: 5, verified: true },
  { name: 'Dimitra K.', country: 'Greece', text: 'Beautiful products, fair prices, and delivery arrived earlier than expected. A trusted place to shop.', rating: 5, verified: true },
  { name: 'Nikos P.', country: 'Greece', text: 'Everything from ordering to delivery felt professional and secure. My favourite online shop so far.', rating: 5, verified: true },
  { name: 'Eleni S.', country: 'Greece', text: 'Delivery arrived earlier than expected and the quality matched the pictures perfectly. Five stars from us.', rating: 4, verified: true },
  { name: 'Sarah T.', country: 'Australia', text: 'Delivery to Australia was faster than I expected and everything was tracked the whole way.', rating: 5, verified: true },
  { name: 'Jack M.', country: 'Australia', text: 'The checkout process was smooth and the payment felt very secure. Exactly the peace of mind you want when buying online.', rating: 5, verified: true },
  { name: 'Charlotte B.', country: 'Australia', text: 'Support replied within minutes when I had a question about shipping. Genuinely impressed by how fast and kind they were.', rating: 5, verified: true },
  { name: 'William H.', country: 'Australia', text: 'My order was well packaged and the quality matched the pictures perfectly. I will definitely be shopping here again.', rating: 5, verified: true },
  { name: 'Olivia T.', country: 'Australia', text: 'Had to arrange a return once and it was handled quickly with a full refund. That is how you keep customers happy.', rating: 4, verified: true },
  { name: 'Liam R.', country: 'Australia', text: 'Beautiful products, fair prices, and delivery arrived earlier than expected. A trusted place to shop.', rating: 5, verified: true },
  { name: 'Charlotte W.', country: 'New Zealand', text: 'Ordered during the holidays and it still arrived on time, which impressed me the most.', rating: 5, verified: true },
  { name: 'Oliver S.', country: 'New Zealand', text: 'Secure checkout and fast worldwide shipping. I trust this shop with my money and my family.', rating: 5, verified: true },
  { name: 'Mia H.', country: 'New Zealand', text: 'First international order for me and it went flawlessly. Real-time tracking from start to finish. Highly recommended.', rating: 5, verified: true },
  { name: 'Ethan L.', country: 'Singapore', text: 'Checked out in about two minutes and the payment felt very secure. Exactly the peace of mind you want when buying online.', rating: 5, verified: true },
  { name: 'Nora T.', country: 'Singapore', text: 'Support replied within minutes when I had a question about shipping. Genuinely impressed by how fast and kind they were.', rating: 5, verified: true },
  { name: 'Ryan C.', country: 'Singapore', text: 'Ordered several items for the family and every single one was packed with care and delivered on time.', rating: 4, verified: true },
  { name: 'Yuki T.', country: 'Japan', text: 'Packaging was meticulous and the quality exceeded expectations. The whole experience felt premium.', rating: 5, verified: true },
  { name: 'Haruto S.', country: 'Japan', text: 'Everything from ordering to delivery felt professional and secure. My favourite online shop so far.', rating: 5, verified: true },
  { name: 'Aiko M.', country: 'Japan', text: 'Ordered during the holidays and it still arrived on time, which impressed me the most.', rating: 5, verified: true },
  { name: 'Minjun K.', country: 'South Korea', text: 'Delivery was quick and the package arrived in perfect condition. I will definitely be ordering again.', rating: 5, verified: true },
  { name: 'Seo-yeon P.', country: 'South Korea', text: 'Beautiful products, fair prices, and delivery arrived earlier than expected. A trusted place to shop.', rating: 5, verified: true },
  { name: 'Jiwon L.', country: 'South Korea', text: 'The customer support team answered my questions in minutes. Genuinely trustworthy shopping experience.', rating: 4, verified: true },
  { name: 'Layla A.', country: 'United Arab Emirates', text: 'Delivery to Dubai was faster than I expected and everything was tracked the whole way.', rating: 5, verified: true },
  { name: 'Omar R.', country: 'United Arab Emirates', text: 'My order was well packaged and the quality matched the pictures perfectly. I will definitely be shopping here again.', rating: 5, verified: true },
  { name: 'Mariam S.', country: 'United Arab Emirates', text: 'Secure checkout and fast worldwide shipping. I trust this shop with my money and my family.', rating: 5, verified: true },
  { name: 'Khalid A.', country: 'Qatar', text: 'Everything from ordering to delivery felt professional and secure. My favourite online shop so far.', rating: 5, verified: true },
  { name: 'Noor H.', country: 'Qatar', text: 'Delivery arrived earlier than expected and the quality matched the pictures perfectly.', rating: 5, verified: true },
  { name: 'Noam K.', country: 'Israel', text: 'Checked out in about two minutes and the payment felt very secure. Exactly the peace of mind you want when buying online.', rating: 5, verified: true },
  { name: 'Tamar L.', country: 'Israel', text: 'Support replied within minutes when I had a question about shipping. Genuinely impressed by how fast and kind they were.', rating: 4, verified: true },
  { name: 'Wei-cheng L.', country: 'Taiwan', text: 'My order was well packaged and the quality matched the pictures perfectly. I will definitely be shopping here again.', rating: 5, verified: true },
  { name: 'Ting-wei C.', country: 'Taiwan', text: 'Beautiful products, fair prices, and delivery arrived earlier than expected. A trusted place to shop.', rating: 5, verified: true },
  { name: 'Ka-yan W.', country: 'Hong Kong', text: 'Ordered during the holidays and it still arrived on time, which impressed me the most.', rating: 5, verified: true },
  { name: 'Ho-man C.', country: 'Hong Kong', text: 'Secure checkout and fast worldwide shipping. I trust this shop with my money and my family.', rating: 5, verified: true },
  { name: 'Harper A.', country: 'United States', text: 'Checked out in about two minutes and the payment felt very secure. Exactly the peace of mind you want when buying online.', rating: 5, verified: true },
  { name: 'Mason T.', country: 'United States', text: 'The package arrived beautifully wrapped and matched the pictures perfectly. I will definitely be ordering again.', rating: 5, verified: true },
  { name: 'Abigail K.', country: 'United States', text: 'Ordered a few gifts and every one arrived on time, beautifully packed. Support was friendly and quick to help.', rating: 5, verified: true },
  { name: 'Carter W.', country: 'United States', text: 'Secure checkout and fast worldwide shipping. I trust this shop with my money and my family.', rating: 4, verified: true },
  { name: 'Eliana J.', country: 'United States', text: 'First time ordering and the item matched the description perfectly. Delivery updates were spot on.', rating: 5, verified: true },
  { name: 'Logan B.', country: 'United States', text: 'Support replied within minutes when I had a question about shipping. Genuinely impressed by how fast and kind they were.', rating: 5, verified: true },
  { name: 'Chase R.', country: 'Canada', text: 'Ordered during the holidays and it still arrived on time, which impressed me the most.', rating: 5, verified: true },
  { name: 'Naomi B.', country: 'Canada', text: 'Beautiful products, fair prices, and delivery arrived earlier than expected. A trusted place to shop.', rating: 5, verified: true },
  { name: 'Chloe V.', country: 'Canada', text: 'The customer support team answered my questions in minutes. Genuinely trustworthy shopping experience.', rating: 4, verified: true },
  { name: 'Rosalind M.', country: 'United Kingdom', text: 'My order was well packaged and the quality matched the pictures perfectly. I will definitely be shopping here again.', rating: 5, verified: true },
  { name: 'Freddie P.', country: 'United Kingdom', text: 'Everything from ordering to delivery felt professional and secure. My favourite online shop so far.', rating: 5, verified: true },
  { name: 'Evie C.', country: 'United Kingdom', text: 'Tracking updates at every step made the whole experience worry-free. The product arrived safely and on time.', rating: 5, verified: true },
  { name: 'Conor M.', country: 'Ireland', text: 'The checkout process was smooth and the payment felt very secure. Exactly the peace of mind you want when buying online.', rating: 5, verified: true },
  { name: 'Margaux B.', country: 'France', text: 'The package arrived beautifully wrapped and matched the pictures perfectly. I will definitely be ordering again.', rating: 5, verified: true },
  { name: 'Tobias F.', country: 'Germany', text: 'Delivery to Germany was faster than I expected and everything was tracked the whole way.', rating: 5, verified: true },
  { name: 'Lina M.', country: 'Germany', text: 'Beautiful products, fair prices, and delivery arrived earlier than expected. A trusted place to shop.', rating: 5, verified: true },
  { name: 'Marco N.', country: 'Italy', text: 'Support replied within minutes when I had a question about shipping. Genuinely impressed by how fast and kind they were.', rating: 5, verified: true },
  { name: 'Valentina A.', country: 'Italy', text: 'First international order for me and it went flawlessly. Real-time tracking from start to finish. Highly recommended.', rating: 5, verified: true },
  { name: 'Carmen I.', country: 'Spain', text: 'Everything from ordering to delivery felt professional and secure. My favourite online shop so far.', rating: 5, verified: true },
  { name: 'Javier G.', country: 'Spain', text: 'The package arrived beautifully wrapped and matched the pictures perfectly. I will definitely be ordering again.', rating: 4, verified: true },
  { name: 'Inês R.', country: 'Portugal', text: 'Ordered several items for the family and every single one was packed with care and delivered on time.', rating: 5, verified: true },
  { name: 'Thijs M.', country: 'Netherlands', text: 'Secure checkout and fast worldwide shipping. I trust this shop with my money and my family.', rating: 5, verified: true },
  { name: 'Lieke V.', country: 'Netherlands', text: 'My order was well packaged and the quality matched the pictures perfectly. I will definitely be shopping here again.', rating: 5, verified: true },
  { name: 'Emiel P.', country: 'Belgium', text: 'Checked out in about two minutes and the payment felt very secure. Exactly the peace of mind you want when buying online.', rating: 5, verified: true },
  { name: 'Lien V.', country: 'Belgium', text: 'Everything from ordering to delivery felt professional and secure. My favourite online shop so far.', rating: 5, verified: true },
  { name: 'Sabine G.', country: 'Switzerland', text: 'Tracked the whole way and it arrived exactly when promised. A very professional shopping experience.', rating: 5, verified: true },
  { name: 'Alexandra H.', country: 'Switzerland', text: 'First international order for me and it went flawlessly. Real-time tracking from start to finish. Highly recommended.', rating: 5, verified: true },
  { name: 'Paul K.', country: 'Austria', text: 'Ordered during the holidays and it still arrived on time, which impressed me the most.', rating: 5, verified: true },
  { name: 'Katharina S.', country: 'Austria', text: 'Support replied within minutes when I had a question about shipping. Genuinely impressed by how fast and kind they were.', rating: 5, verified: true },
  { name: 'Alva E.', country: 'Sweden', text: 'Delivery to Sweden was faster than I expected and everything was tracked the whole way.', rating: 5, verified: true },
  { name: 'Nils H.', country: 'Sweden', text: 'Beautiful products, fair prices, and delivery arrived earlier than expected. A trusted place to shop.', rating: 5, verified: true },
  { name: 'Ida L.', country: 'Denmark', text: 'The package arrived beautifully wrapped and matched the pictures perfectly. I will definitely be ordering again.', rating: 5, verified: true },
  { name: 'Zoe F.', country: 'Australia', text: 'Everything from ordering to delivery felt professional and secure. My favourite online shop so far.', rating: 5, verified: true },
  { name: 'Cooper W.', country: 'Australia', text: 'Secure checkout and fast worldwide shipping. I trust this shop with my money and my family.', rating: 4, verified: true },
  { name: 'Ruby C.', country: 'Australia', text: 'Tracked the whole way and it arrived exactly when promised. A very professional shopping experience.', rating: 5, verified: true },
  { name: 'Mei Lin T.', country: 'Singapore', text: 'Delivery was quick and the package arrived in perfect condition. I will definitely be ordering again.', rating: 5, verified: true },
  { name: 'Kenji M.', country: 'Japan', text: 'Checked out in about two minutes and the payment felt very secure. Exactly the peace of mind you want when buying online.', rating: 5, verified: true },
];

function reviewsHtml() {
  return `
    <section id="customer-feedback" class="relative overflow-hidden bg-slate-950 text-white">
      <div class="absolute inset-0" style="background:
        radial-gradient(800px 420px at 15% 20%, rgba(16,185,129,.25), transparent 60%),
        linear-gradient(160deg,#071a16 0%,#060c1c 60%,#0b1226 100%)"></div>
      <div class="absolute inset-0 opacity-[.06]" style="background-image:radial-gradient(#34d399 1px, transparent 1px);background-size:22px 22px"></div>
      <div class="absolute inset-0" data-bg-slot="reviews"></div>

      <div class="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-400/20 text-emerald-300 flex items-center justify-center"><i data-lucide="message-square-text" class="w-5 h-5"></i></div>
          <div>
            <h2 class="text-xl sm:text-2xl font-black text-white tracking-tight">Customer Feedback</h2>
            <p class="text-xs text-slate-400 mt-0.5">Real shoppers, real orders, real peace of mind.</p>
          </div>
        </div>

        <div class="grid sm:grid-cols-3 gap-4" id="fb-featured">
          ${TESTIMONIALS.map(feedbackCardHtml).join('')}
        </div>

        <!-- Feedback form (signed-in account holders only) -->
        <div class="mt-6 rounded-2xl border border-white/10 bg-white/[.06] backdrop-blur p-5 sm:p-6">
          <div id="fb-form-holder">
            <div class="flex items-center gap-2 mb-4">
              <i data-lucide="pen-line" class="w-4 h-4 text-emerald-300"></i>
              <p class="text-sm font-black text-white">Feedback</p>
              <span class="text-[10px] text-slate-400">Your experience helps us improve</span>
            </div>
            <form id="fb-form" class="space-y-3.5">
            <div class="grid sm:grid-cols-2 gap-3.5">
              <input id="fb-name" type="text" maxlength="60" placeholder="Your name" class="w-full rounded-xl border border-white/15 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-emerald-400/60">
              <input id="fb-email" type="email" maxlength="120" placeholder="Email (optional)" class="w-full rounded-xl border border-white/15 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-emerald-400/60">
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <p class="text-xs font-bold text-slate-300">Your rating:</p>
              <div class="flex gap-1" id="fb-stars">
                ${[1, 2, 3, 4, 5].map((i) =>
                  `<button type="button" data-star="${i}" class="fb-star text-slate-500 hover:text-amber-400 transition"><i data-lucide="star" class="w-6 h-6"></i></button>`).join('')}
              </div>
              <input type="hidden" id="fb-rating" value="5">
            </div>
            <textarea id="fb-text" rows="3" maxlength="1000" required placeholder="Write your feedback here…" class="w-full rounded-xl border border-white/15 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-emerald-400/60"></textarea>
            <div class="flex flex-wrap items-center gap-3">
              <button type="submit" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-xl text-sm transition hover:scale-[1.02] active:scale-[.98]">
                Submit Feedback <i data-lucide="send" class="w-4 h-4"></i>
              </button>
              <p id="fb-msg" class="text-xs font-bold hidden"></p>
            </div>
          </form>
          </div>
          <!-- Guests are asked to create/sign in to an account first. -->
          <div id="fb-signin-zone" class="hidden">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <i data-lucide="lock" class="w-5 h-5 text-emerald-300 shrink-0"></i>
                <div>
                  <p class="text-sm font-black text-white">Accounts only</p>
                  <p class="text-xs text-slate-400">Only signed-in account holders can submit feedback.</p>
                </div>
              </div>
              <a href="/auth.html" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition hover:scale-[1.02] active:scale-[.98]">
                Sign in / Create account <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- View more Feedback (same banner background, separate comments) -->
        <div class="mt-6 rounded-2xl overflow-hidden border border-white/10 bg-white/[.06] backdrop-blur">
          <button type="button" data-acc="trust-reviews-more" aria-expanded="false" class="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-white/[.04] transition">
            <span class="flex items-center gap-2.5">
              <i data-lucide="messages-square" class="w-5 h-5 text-emerald-300"></i>
              <span class="text-sm font-black text-white">View more Feedback</span>
            </span>
            <span data-acc-icon="trust-reviews-more" class="shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300"><i data-lucide="chevron-down" class="w-5 h-5 text-slate-300"></i></span>
          </button>
          <div data-acc-body="trust-reviews-more" class="trust-acc-body" data-open="0">
            <div class="border-t border-white/10 px-4 sm:px-5 pb-5 pt-4">
              <div id="fb-more-list" class="max-h-[26rem] overflow-y-auto pr-1 space-y-3">
                ${MORE_FEEDBACK.map(feedbackCardHtml).join('')}
              </div>
              <div class="flex justify-center mt-4">
                <button type="button" data-feedback-backtop class="btn-press inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold py-2.5 px-5 rounded-full text-xs transition">
                  <i data-lucide="chevron-up" class="w-4 h-4"></i> Back to top
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

// ── 5. Final bottom / end-of-page closing section ────────────────
// A polished "ending screen": brand logo, thank-you heading, main message,
// closing message, customer support area, professional footer links and
// copyright. Every piece of wording is editable from the admin
// "Content Settings" panel — the design here never changes.
function closingLink(href, label) {
  return `<li><a href="${href}" class="text-xs text-slate-400 hover:text-white transition">${label}</a></li>`;
}

function closingSectionHtml(content) {
  const c = { ...DEFAULT_SITE_CONTENT, ...(content || {}) };
  const brand = readBrand();
  const name = brand.brand_name || brand.site_name || DEFAULT_BRAND_NAME;
  const logo = brand.brand_logo || brand.brand_header_logo || brand.brand_footer_logo || '/w-logo.svg';
  const slogan = c.bottom_footer_text || brand.brand_slogan || brand.site_tagline || 'GLOBAL SHOPPING · WORLDWIDE DELIVERY';
  const copyright = c.bottom_copyright
    ? c.bottom_copyright
    : `© ${new Date().getFullYear()} ${name}. All rights reserved.`;

  return `
    <section id="site-closing-section" class="relative overflow-hidden bg-[#060c1c] text-white">
      <!-- backdrop -->
      <div class="absolute inset-0" style="background:
        radial-gradient(900px 480px at 82% 10%, rgba(37,99,235,.32), transparent 62%),
        radial-gradient(720px 420px at 10% 94%, rgba(6,182,212,.20), transparent 60%),
        linear-gradient(180deg,#0a1128 0%,#060c1c 55%,#04101f 100%)"></div>
      <div class="absolute inset-0 opacity-[.05]" style="background-image:radial-gradient(#7dd3fc 1px, transparent 1px);background-size:24px 24px"></div>

      <div class="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-14 sm:pt-20 pb-8 sm:pb-10">
        <!-- Thank-you hero -->
        <div class="text-center max-w-3xl mx-auto">
          <div class="mx-auto w-16 h-16 rounded-2xl bg-white/[.07] border border-white/10 flex items-center justify-center overflow-hidden backdrop-blur">
            <img src="${esc(logo)}" alt="${esc(name)}" class="w-10 h-10 object-contain" onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex'">
            <span style="display:none">${W_LOGO_SVG('w-9 h-9')}</span>
          </div>
          <p class="mt-4 text-[10px] font-black uppercase tracking-[0.28em] text-white">${esc(slogan)}</p>
          <h2 class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.08] tracking-tight text-white">
            ${esc(c.bottom_heading)}
          </h2>
          <p class="mt-4 text-[15px] sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            ${esc(c.bottom_main_message)}
          </p>
          <p class="mt-5 text-lg sm:text-xl font-semibold text-cyan-200">${esc(c.bottom_closing_message)}</p>
        </div>

        <!-- Customer Support area -->
        <div class="mt-12 max-w-4xl mx-auto rounded-3xl border border-white/10 bg-white/[.05] backdrop-blur-md p-6 sm:p-8">
          <div class="flex flex-col lg:flex-row items-center gap-6 justify-between text-center lg:text-left">
            <div class="flex items-center gap-4">
              <div class="shrink-0 w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 flex items-center justify-center">
                <i data-lucide="headphones" class="w-6 h-6"></i>
              </div>
              <div>
                <h3 class="text-lg sm:text-xl font-black text-white tracking-tight">${esc(c.bottom_support_heading)}</h3>
                <p class="text-sm text-slate-300 mt-1 max-w-md">${esc(c.bottom_support_description)}</p>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-3 shrink-0">
              <a href="mailto:${esc(SUPPORT_EMAIL)}" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-xl shadow-blue-900/30 hover:scale-[1.03] active:scale-[.98] transition">
                ${esc(c.bottom_support_button_text)} <i data-lucide="message-circle" class="w-4 h-4"></i>
              </a>
              <a href="/contact.html" class="inline-flex items-center gap-2 border border-white/25 bg-white/10 text-white text-sm font-bold px-6 py-3.5 rounded-2xl backdrop-blur hover:bg-white/15 transition">
                Contact Us <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </a>
            </div>
          </div>
          <div class="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-[11px] text-slate-400">
            <span class="inline-flex items-center justify-center gap-1.5"><i data-lucide="mail" class="w-3.5 h-3.5 text-cyan-300"></i> ${esc(SUPPORT_EMAIL)}</span>
            <span class="inline-flex items-center justify-center gap-1.5"><i data-lucide="message-circle" class="w-3.5 h-3.5 text-cyan-300"></i> 24/7 live chat</span>
            <span class="inline-flex items-center justify-center gap-1.5"><i data-lucide="life-buoy" class="w-3.5 h-3.5 text-cyan-300"></i> <a href="/help.html" class="hover:text-white transition">Help Center</a></span>
          </div>
        </div>

        <!-- Professional footer: Temu-style link columns -->
        <div class="mt-14 border-t border-white/10 pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <!-- Company info -->
          <div>
            <h4 class="text-xs font-black text-white uppercase tracking-widest mb-3.5">Company info</h4>
            <ul class="space-y-2.5">
              ${closingLink('/about.html', 'About Us')}
              ${closingLink('/contact.html', 'Contact us')}
              ${closingLink('/team.html', 'Careers')}
              ${closingLink('/team.html', 'Press')}
              ${closingLink('/about.html', 'Partner with Us')}
            </ul>
          </div>
          <!-- Customer service -->
          <div>
            <h4 class="text-xs font-black text-white uppercase tracking-widest mb-3.5">Customer service</h4>
            <ul class="space-y-2.5">
              ${closingLink('/policies.html', 'Country / region policies')}
              ${closingLink('/refund-policy.html', 'Return and refund policy')}
              ${closingLink('/terms.html', 'Terms of use')}
              ${closingLink('/shipping-policy.html', 'Shipping info')}
              ${closingLink('/help.html', 'Report suspicious activity')}
            </ul>
          </div>
          <!-- Help -->
          <div>
            <h4 class="text-xs font-black text-white uppercase tracking-widest mb-3.5">Help</h4>
            <ul class="space-y-2.5">
              ${closingLink('/help.html', 'Support centre & FAQ')}
              ${closingLink('/privacy.html', 'Safety centre')}
              ${closingLink('/refund-policy.html', 'Purchase protection')}
              ${closingLink('/', 'Sitemap')}
              ${closingLink('/about.html', 'Partner with Us')}
            </ul>
          </div>
          <!-- Download the app -->
          <div>
            <h4 class="text-xs font-black text-white uppercase tracking-widest mb-3.5">Download the App</h4>
            <ul class="space-y-2.5">
              <li class="inline-flex items-center gap-2 text-xs text-slate-300"><i data-lucide="bell" class="w-3.5 h-3.5 text-cyan-300"></i> Price-drop alerts</li>
              <li class="inline-flex items-center gap-2 text-xs text-slate-300"><i data-lucide="package-search" class="w-3.5 h-3.5 text-cyan-300"></i> Track orders any time</li>
              <li class="inline-flex items-center gap-2 text-xs text-slate-300"><i data-lucide="lock" class="w-3.5 h-3.5 text-cyan-300"></i> Faster &amp; secure checkout</li>
              <li class="inline-flex items-center gap-2 text-xs text-slate-300"><i data-lucide="zap" class="w-3.5 h-3.5 text-cyan-300"></i> Exclusive offers &amp; coupons</li>
            </ul>
            <div class="mt-4 flex flex-col gap-2">
              <a href="/" class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 text-xs font-bold text-white px-4 py-2.5 transition"><i data-lucide="smartphone" class="w-4 h-4 text-cyan-300"></i> Download on the App Store</a>
              <a href="/" class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 text-xs font-bold text-white px-4 py-2.5 transition"><i data-lucide="play" class="w-4 h-4 text-cyan-300"></i> Get it on Google Play</a>
            </div>
          </div>
        </div>

        <!-- Security certification + We accept -->
        <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="text-xs font-black text-white uppercase tracking-widest mb-3.5">Trusted &amp; secure</h4>
            <div class="flex flex-wrap gap-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[.06] border border-white/10 text-[11px] font-bold text-slate-200"><i data-lucide="lock" class="w-3.5 h-3.5 text-emerald-400"></i> SSL Secure</span>
              <span class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[.06] border border-white/10 text-[11px] font-bold text-slate-200"><i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-400"></i> Secure Checkout</span>
              <span class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[.06] border border-white/10 text-[11px] font-bold text-slate-200"><i data-lucide="badge-check" class="w-3.5 h-3.5 text-emerald-400"></i> Verified Shop</span>
              <span class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[.06] border border-white/10 text-[11px] font-bold text-slate-200"><i data-lucide="headphones" class="w-3.5 h-3.5 text-emerald-400"></i> 24/7 Support</span>
            </div>
          </div>
          <div>
            <h4 class="text-xs font-black text-white uppercase tracking-widest mb-3.5">Convenient ways to pay</h4>
            <div class="flex flex-wrap gap-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[.06] border border-white/10 text-[11px] font-bold text-slate-200"><i data-lucide="credit-card" class="w-3.5 h-3.5 text-cyan-300"></i> Credit &amp; Debit Cards</span>
              <span class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[.06] border border-white/10 text-[11px] font-bold text-slate-200"><i data-lucide="smartphone" class="w-3.5 h-3.5 text-cyan-300"></i> Mobile Pay</span>
              <span class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[.06] border border-white/10 text-[11px] font-bold text-slate-200"><i data-lucide="landmark" class="w-3.5 h-3.5 text-cyan-300"></i> Bank Transfer</span>
              <span class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[.06] border border-white/10 text-[11px] font-bold text-slate-200"><i data-lucide="wallet" class="w-3.5 h-3.5 text-cyan-300"></i> Cash on Delivery</span>
              <span class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[.06] border border-white/10 text-[11px] font-bold text-slate-200"><i data-lucide="shield" class="w-3.5 h-3.5 text-cyan-300"></i> Buyer Protection</span>
            </div>
          </div>
        </div>

        <!-- Bottom bar: copyright + legal links -->
        <div class="mt-10 pt-6 border-t border-white/10">
          <div class="flex flex-col gap-3 sm:flex-row items-center justify-between">
            <p class="text-[11px] text-slate-400 text-center sm:text-left">${esc(copyright)}</p>
            <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-bold text-slate-400">
              <a href="/policies.html" class="text-blue-400 hover:text-white transition">Country / region policies</a>
              <span class="text-slate-600">|</span>
              <a href="/terms.html" class="hover:text-white transition">Terms of use</a>
              <span class="text-slate-600">|</span>
              <a href="/privacy.html" class="hover:text-white transition">Privacy policy</a>
              <span class="text-slate-600">|</span>
              <a href="/privacy.html" class="hover:text-white transition">Your privacy choices</a>
              <span class="text-slate-600">|</span>
              <a href="/privacy.html" class="hover:text-white transition">Ad Choices</a>
            </div>
          </div>
          <p class="text-center text-[11px] text-slate-600 mt-4">${esc(c.bottom_footer_closing)}</p>
        </div>
      </div>
    </section>`;
}

// ── Wiring ───────────────────────────────────────────────────────
function bindAccordions(root) {
  root.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-acc]');
    if (!btn) return;
    const id = btn.dataset.acc;
    const body = root.querySelector(`[data-acc-body="${id}"]`);
    const icon = root.querySelector(`[data-acc-icon="${id}"]`);
    if (!body) return;
    const open = body.dataset.open === '1';
    if (open) {
      body.style.maxHeight = '0px';
      body.style.opacity = '0';
      body.dataset.open = '0';
      icon.classList.remove('rotate-180');
      btn.setAttribute('aria-expanded', 'false');
    } else {
      body.style.maxHeight = body.scrollHeight + 'px';
      body.style.opacity = '1';
      body.dataset.open = '1';
      icon.classList.add('rotate-180');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
}

function applyBg(bg) {
  const slots = document.querySelectorAll('[data-bg-slot]');
  if (!slots.length) return;
  slots.forEach((el) => {
    const slot = el.dataset.bgSlot;
    if (slot === 'trust_promo') el.innerHTML = bgMediaLayer(bg.trust_promo_bg_image, bg.trust_promo_bg_video);
    else if (slot === 'reviews') el.innerHTML = bgMediaLayer(bg.reviews_bg_image, bg.reviews_bg_video);
  });
}

// ── Customer Feedback form + View-more-Feedback list ──────────────
function bindFeedback(root) {
  const stars = root.querySelector('#fb-stars');
  if (stars) {
    stars.addEventListener('click', (e) => {
      const b = e.target.closest('.fb-star');
      if (!b) return;
      const n = parseInt(b.dataset.star, 10);
      const rating = root.querySelector('#fb-rating');
      if (rating) rating.value = String(n);
      stars.querySelectorAll('.fb-star').forEach((s, i) => {
        const ic = s.querySelector('i, svg');
        if (!ic) return;
        if (i < n) { ic.classList.add('fill-amber-400', 'text-amber-400'); ic.classList.remove('text-slate-500'); }
        else { ic.classList.remove('fill-amber-400', 'text-amber-400'); ic.classList.add('text-slate-500'); }
      });
    });
  }

  const form = root.querySelector('#fb-form');
  if (form) form.addEventListener('submit', (e) => { e.preventDefault(); submitFeedback(form); });

  const backTop = root.querySelector('[data-feedback-backtop]');
  if (backTop) {
    backTop.addEventListener('click', () => {
      const acc = root.querySelector('[data-acc="trust-reviews-more"]');
      if (acc) acc.click();
      const sec = document.getElementById('customer-feedback');
      if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

function feedbackMsg(form, text, cls) {
  const msg = form.closest('#customer-feedback')?.querySelector('#fb-msg');
  if (!msg) return;
  msg.textContent = text;
  msg.classList.remove('hidden', 'text-emerald-300', 'text-amber-300');
  if (cls) msg.classList.add(cls);
}

async function submitFeedback(form) {
  const textEl = form.querySelector('#fb-text');
  const text = (textEl?.value || '').trim();
  if (!text) { feedbackMsg(form, 'Please write your feedback first.', 'text-amber-300'); return; }
  const btn = form.querySelector('[type=submit]');
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin inline mr-2"></i>Sending…';
  if (window.lucide) { try { lucide.createIcons(); } catch {} }
  try {
    const supabase = await getSupabase();
    let userId = null;
    try { userId = (await supabase.auth.getUser()).data?.user?.id || null; } catch {}
    // Feedback is for signed-in account holders only.
    if (!userId) {
      feedbackMsg(form, 'Only account holders can submit feedback. Please sign in first.', 'text-amber-300');
      btn.disabled = false;
      btn.innerHTML = original;
      if (window.lucide) { try { lucide.createIcons(); } catch {} }
      return;
    }
    const { error } = await supabase.from('site_feedback').insert({
      user_id: userId,
      name: form.querySelector('#fb-name')?.value.trim() || 'Anonymous shopper',
      email: form.querySelector('#fb-email')?.value.trim() || '',
      rating: parseInt(form.querySelector('#fb-rating')?.value || '5', 10),
      feedback: text,
      is_approved: false,
    });
    if (error) throw new Error(error.message);
    feedbackMsg(form, '✓ Thank you! Your feedback has been sent.', 'text-emerald-300');
    form.reset();
    const stars = form.closest('#customer-feedback')?.querySelector('#fb-stars');
    if (stars) stars.querySelectorAll('.fb-star').forEach((s) => { const ic = s.querySelector('i, svg'); if (ic) { ic.classList.remove('fill-amber-400', 'text-amber-400'); ic.classList.add('text-slate-500'); } });
  } catch (err) {
    feedbackMsg(form, 'Could not send your feedback right now. Please try again later.', 'text-amber-300');
  }
  btn.disabled = false;
  btn.innerHTML = original;
  if (window.lucide) { try { lucide.createIcons(); } catch {} }
}

// Real (approved) feedback from the DB goes ON TOP, above the curated
// preview comments — exactly like real reviews sit on top of seeded ones.
async function loadSiteFeedbackList(root) {
  const list = root?.querySelector('#fb-more-list');
  const featured = root?.querySelector('#fb-featured');
  if (!list && !featured) return;
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from('site_feedback')
      .select('name,rating,feedback,created_at')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .limit(30);
    if (error || !data || !data.length) return;
    const cards = data.map((f) => feedbackCardHtml({
      name: f.name || 'Verified shopper',
      text: f.feedback || '',
      rating: f.rating || 5,
      verified: true,
      country: 'Verified customer',
      date: f.created_at ? new Date(f.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
    }));
    if (list) list.innerHTML = cards.join('') + list.innerHTML;
    if (featured && cards.length) featured.innerHTML = cards.slice(0, 3).join('');
  } catch {}
}

// Feedback is for signed-in account holders only. Show the write form to
// members (with their details pre-filled) and a sign-in prompt to guests.
async function applyFeedbackAuth(root) {
  const formHolder = root?.querySelector('#fb-form-holder');
  const signinZone = root?.querySelector('#fb-signin-zone');
  if (!formHolder || !signinZone) return;
  let user = null;
  try {
    const supabase = await getSupabase();
    user = (await supabase.auth.getUser()).data?.user || null;
  } catch {}
  if (user) {
    signinZone.classList.add('hidden');
    formHolder.classList.remove('hidden');
    const meta = user.user_metadata || {};
    const nm = meta.name || meta.full_name || (user.email ? user.email.split('@')[0] : '');
    const nameInput = root.querySelector('#fb-name');
    const emailInput = root.querySelector('#fb-email');
    if (nameInput && !nameInput.value && nm) nameInput.value = nm;
    if (emailInput && !emailInput.value && user.email) emailInput.value = user.email;
  } else {
    formHolder.classList.add('hidden');
    signinZone.classList.remove('hidden');
  }
}

function injectStyle() {
  if (document.getElementById('trust-info-style')) return;
  const st = document.createElement('style');
  st.id = 'trust-info-style';
  st.textContent = `
    .trust-acc-body{overflow:hidden;max-height:0;opacity:0;transition:max-height .38s cubic-bezier(.2,.8,.2,1),opacity .28s ease}
    .trust-acc-body[data-open="1"]{opacity:1}`;
  document.head.appendChild(st);
}

async function init() {
  // Permanently excluded from the homepage/showroom — these write-up blocks
  // belong on the details page only. Never render on the homepage.
  if (document.body && document.body.dataset.homepage === 'true') return;
  const mount = document.getElementById('trust-info-area');
  if (!mount) return;
  injectStyle();
  let content = { ...DEFAULT_SITE_CONTENT };
  try { content = await loadSiteContent(); } catch { /* keep defaults */ }
  mount.innerHTML = [
    promoHeroHtml(),
    trustSecurityHtml(),
    accordionsHtml(),
    reviewsHtml(),
    closingSectionHtml(content),
  ].join('');
  if (window.lucide) { try { lucide.createIcons(); } catch {} }
  bindAccordions(mount);
  bindFeedback(mount);
  applyFeedbackAuth(mount);
  loadSiteFeedbackList(mount);
  let bg = { ...DEFAULT_PROMO_BG };
  try { bg = await loadPromoBackgrounds(); } catch {}
  applyBg(bg);
  window.addEventListener('promo-backgrounds-updated', () => {
    loadPromoBackgrounds().then(applyBg).catch(() => {});
  });
  // The closing footer should sit BELOW the "Weverse Mobile App" phone banner
  // (like Temu: promo phone first, then the full footer). The app-promo-banner
  // mounts after trust-info-area, so move site-closing-section to follow it.
  const relocateClosing = () => {
    const sec = mount.querySelector('#site-closing-section');
    if (!sec) return;
    const promo = document.getElementById('app-promo-banner');
    if (promo && promo.nextSibling !== sec) promo.after(sec);
  };
  relocateClosing();
  window.addEventListener('app-promo-banner-ready', relocateClosing);
  // Re-render the closing section when the admin saves new wording.
  window.addEventListener('site-content-updated', () => {
    loadSiteContent().then((c) => {
      const sec = mount.querySelector('#site-closing-section');
      if (sec) sec.outerHTML = closingSectionHtml(c);
      if (window.lucide) { try { lucide.createIcons(); } catch {} }
      relocateClosing();
    }).catch(() => {});
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();