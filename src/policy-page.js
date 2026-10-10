// Weverse policy page renderer.
// Reads the region key from <body data-region-key="..."> and renders that
// region's Privacy / Terms / Refund / Shipping policies with a tab switcher
// and a region picker. Content lives in policy-data.js.
import { REGIONS, POLICY_DATA, POLICY_TYPES } from './policy-data.js';

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function sectionHtml(section) {
  return `
    <section class="mb-6">
      <h2 class="text-lg sm:text-xl font-black text-gray-900 mb-2 flex items-center gap-2">
        <span class="w-2 h-6 rounded-full bg-blue-500 shrink-0"></span>${esc(section.h)}
      </h2>
      <div class="text-[15px] sm:text-base text-gray-800 leading-[1.8]">${section.b}</div>
    </section>`;
}

function pickerHtml(currentKey) {
  return `
    <div class="flex flex-wrap gap-2 items-center justify-center">
      ${REGIONS.map(r => {
        const active = r.key === currentKey;
        return `<a href="/policies-${r.key}.html" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-bold border transition ${active ? 'bg-blue-600 text-white border-blue-600 shadow' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-700'}">
          <span aria-hidden="true">${r.flag}</span>${esc(r.name)}
        </a>`;
      }).join('')}
    </div>`;
}

function tabsHtml(currentType, currentKey) {
  return `
    <div class="relative rounded-2xl bg-white border border-gray-200 p-1.5 flex gap-1 overflow-x-auto" role="tablist" aria-label="Policy type">
      ${Object.values(POLICY_TYPES).map(t => {
        const active = t.key === currentType;
        return `<a href="/policies-${currentKey}.html#${t.key}" role="tab" aria-selected="${active}" class="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition ${active ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-100'}">
          <i data-lucide="${t.icon}" class="w-4 h-4"></i>${esc(t.label)}
        </a>`;
      }).join('')}
    </div>`;
}

function render() {
  const root = document.getElementById('policy-root');
  if (!root) return;

  const regionKey = document.body.dataset.regionKey || 'usa';
  const region = POLICY_DATA[regionKey] || POLICY_DATA.usa;
  const meta = REGIONS.find(r => r.key === regionKey) || REGIONS[0];

  let type = (location.hash || '').replace('#', '');
  if (!POLICY_TYPES[type]) type = 'privacy';

  const doc = region[type] || region.privacy;
  const typeMeta = POLICY_TYPES[type] || POLICY_TYPES.privacy;

  root.innerHTML = `
    <div class="fade-in-up">
      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4">
          <i data-lucide="${typeMeta.icon}" class="w-8 h-8 text-blue-600"></i>
        </div>
        <h1 class="text-3xl sm:text-4xl font-black text-gray-900 mb-2 flex items-center justify-center gap-2">
          <span aria-hidden="true">${meta.flag}</span> ${esc(region.name)} &middot; ${esc(typeMeta.label)}
        </h1>
        <p class="text-gray-500">Last updated: 2026 &middot; Weverse Online Shop</p>
      </div>

      <div class="mb-8">${pickerHtml(regionKey)}</div>
      <div class="mb-8">${tabsHtml(type, regionKey)}</div>

      <div class="mb-8 rounded-2xl border border-blue-200 bg-blue-50/60 p-4 sm:p-5 text-sm text-blue-900 leading-relaxed">
        <span class="font-bold flex items-center gap-1.5"><i data-lucide="info" class="w-4 h-4 shrink-0"></i> Laws that apply to ${esc(region.name)}</span>
        <div class="mt-1.5 text-blue-800">${region.lawNote || ''}</div>
      </div>

      <div class="glass border border-blue-200 rounded-2xl p-6 sm:p-8 slide-up">
        ${doc.map(sectionHtml).join('')}
        <hr class="my-6 border-gray-200">
        <p class="text-sm text-gray-500 leading-relaxed">
          <strong class="text-gray-700">Weverse Online Shop</strong> &middot; Elementary Innovation Pte. Ltd.
          &middot; Questions? <a class="text-blue-600 font-semibold hover:underline" href="mailto:${esc('support@weverseonlineshop.com')}">support@weverseonlineshop.com</a>
        </p>
      </div>
    </div>`;

  if (window.lucide) window.lucide.createIcons();
}

window.addEventListener('hashchange', render);
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', render);
} else {
  render();
}
