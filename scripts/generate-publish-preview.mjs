import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const plan = JSON.parse(readFileSync(join(ROOT, '.publish-plan.json'), 'utf8'));
const rows = (plan.rows || []).slice(0, 60);

const CATEGORY_LABEL = { property: 'Houses', vehicle: 'Vehicles', product: 'Products' };
const TYPE_STYLE = {
  property: 'bg-blue-100 text-blue-700 border-blue-300',
  vehicle: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  product: 'bg-purple-100 text-purple-700 border-purple-300',
};

function money(n) {
  if (n == null || Number.isNaN(Number(n))) return '—';
  return '$' + Number(n).toLocaleString('en-US');
}

function specsLine(row) {
  const parts = [];
  if (row.listing_type === 'property') {
    if (row.bedrooms) parts.push(`${row.bedrooms} bd`);
    if (row.bathrooms) parts.push(`${row.bathrooms} ba`);
    if (row.building_size) parts.push(row.building_size);
  } else if (row.listing_type === 'vehicle') {
    if (row.year_make && row.model) parts.push(`${row.year_make} ${row.make} ${row.model}`);
    else if (row.make && row.model) parts.push(`${row.make} ${row.model}`);
    if (row.condition) parts.push(row.condition);
    if (row.mileage_miles) parts.push(`${Number(row.mileage_miles).toLocaleString('en-US')} mi`);
  }
  return parts.join(' · ');
}

const cards = rows.map((r) => {
  const media = (Array.isArray(r.images) && r.images[0]) || (r.photos && r.photos[0]) || r.video || r.video_url || '';
  const isVid = /\.(mp4|webm|mov|avi|mkv|m4v|3gp)(\?|#|$)/i.test(media || '');
  const loc = r.product_location || [r.city, r.state, r.country].filter(Boolean).join(', ');
  const url = `https://weverseonlineshop.com/product/${r.property_id || r.sku || r.id}`;
  const type = r.listing_type || 'product';
  return `<a href="${url}" target="_blank" rel="noopener" class="group block bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden">
  <div class="aspect-[4/3] w-full overflow-hidden bg-gray-100">${media ? (isVid ? `<video src="${media}" muted loop autoplay playsinline preload="metadata" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.style.display='none'"></video>` : `<img src="${media}" alt="${ (r.title || '').replace(/"/g, '&quot;') }" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">`) : ''}</div>
  <div class="p-4">
    <div class="flex items-start justify-between gap-3">
      <span class="text-xl font-black text-gray-900">${money(r.price)}</span>
      <span class="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide border ${TYPE_STYLE[type] || TYPE_STYLE.product}">${CATEGORY_LABEL[type] || r.category}</span>
    </div>
    <h3 class="mt-2 text-sm font-bold text-gray-800 leading-snug group-hover:text-blue-700">${ (r.title || 'Untitled').replace(/</g, '&lt;') }</h3>
    <p class="mt-1 text-xs font-semibold text-blue-600">${ (specsLine(r) || '—').replace(/</g, '&lt;') }</p>
    <div class="mt-3 flex items-center gap-1.5 text-xs font-semibold text-gray-500">
      <svg class="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd"/></svg>
      <span class="truncate">${loc.replace(/</g, '&lt;')}</span>
      ${r.zip_code ? `<span class="shrink-0 text-gray-400">${r.zip_code}</span>` : ''}
    </div>
    <div class="mt-3 flex flex-wrap gap-1.5">
      <span class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide bg-orange-50 text-orange-600 border border-orange-200">Illustrative Listing</span>
      <span class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide bg-amber-50 text-amber-600 border border-amber-200">Priority</span>
    </div>
    <p class="mt-3 font-mono text-[10px] text-gray-400 truncate">${r.property_id || r.sku} &middot; ${url.replace('https://', '')}</p>
  </div>
</a>`;
}).join('\n');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Marketplace Publishing Preview — Weverse Online Shop</title>
<meta name="robots" content="noindex, nofollow">
<script src="https://cdn.tailwindcss.com"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap" rel="stylesheet">
<style>body{font-family:'Inter',system-ui,sans-serif}</style>
</head>
<body class="bg-gray-50 text-gray-900 antialiased">
<header class="bg-white border-b border-gray-200">
  <div class="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between gap-4">
    <div>
      <h1 class="text-lg font-black tracking-tight">Weverse Online Shop <span class="text-blue-600">· Publishing Preview</span></h1>
      <p class="text-sm text-gray-500 mt-0.5">First automated marketplace batch — generated ${plan.generatedAt ? new Date(plan.generatedAt).toUTCString() : ''} · ${rows.length} listings planned</p>
    </div>
    <a href="/" class="shrink-0 px-4 py-2 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors">Visit the Shop</a>
  </div>
</header>
<main class="max-w-7xl mx-auto px-4 py-8">
  <div class="rounded-2xl border-2 border-orange-300 bg-orange-50 p-5 mb-8">
    <p class="font-black text-orange-800 uppercase tracking-wide text-xs mb-1">Preview only — nothing published yet</p>
    <p class="text-sm font-medium text-orange-900">These listing cards show exactly what the hourly auto-publisher will insert: real country / state / city / area / postal locations, USD prices, houses before cars before trucks. Each card links to the live product page it will have after the first publish run <span class="underline decoration-orange-400">(those pages return a not-found page until the database rows are written).</span> Every entry is an <span class="font-black">Illustrative Listing</span> — real location, illustrative photo and price, no verified on-site inventory.</p>
  </div>
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
${cards}
  </div>
</main>
<footer class="max-w-7xl mx-auto px-4 pb-10 text-xs text-gray-400 font-medium">
  Weverse Online Shop — automated worldwide marketplace publishing. Locations from a real non-African country/state/city/area dataset. Rows are generated by <code class="bg-gray-100 px-1 rounded">scripts/publish.mjs</code> and published hourly via GitHub Actions.
</footer>
</body>
</html>
`;

writeFileSync(join(ROOT, 'public', 'publish-preview.html'), html, 'utf8');
console.log(`[publish-preview] wrote public/publish-preview.html with ${rows.length} cards`);