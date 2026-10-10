// api/og.js — Vercel serverless function (Node.js).
// Serves the details page as a TRUE product page for search engines and
// social platforms. On every request it injects:
//   • per-product <title> + meta description (title, price, availability)
//   • clean canonical URL — https://weverseonlineshop.com/product/<id>
//   • Open Graph / Twitter cards (exact product image via /api/og-image)
//   • JSON-LD Product schema (name, image, sku, brand, offers, aggregateRating)
//   • a server-rendered product body inside #details-content, so the price,
//     hero image, description and Buy button are in the INITIAL HTML
//     (crawlers and no-JS clients see the real product immediately).
//
// Routing: vercel.json uses the legacy `routes` array with `handle: "filesystem"`
// so /details.html, /details, /product and /product/:id hit this function
// BEFORE the static file is served (rewrites cannot intercept existing files).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { findListingById } from '../src/showroom-data.js';
import { getTruckById } from '../src/truck-data.js';
import { getMotorhomeById } from '../src/motorhome-data.js';
import { getCarById } from '../src/car-data.js';
import { getPhoneById } from '../src/phone-data.js';
import { PRODUCT_LISTINGS } from '../src/products-data.js';
import { PRODUCT_EXTRA_LISTINGS } from '../src/products-extra.js';
import { generateListingById } from '../src/catalog.js';
import { productVideo, productPoster } from '../shared/product-media.mjs';
import { findRelatedListings } from '../shared/listing-lookup.mjs';
import { MAIN_URL, MAIN_ANON_KEY } from '../shared/supabase-env.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_NAME = 'Weverse Online Shop';

// Invisible visitor beacon — writes one row per page load to Supabase
// visitor_analytics with the anon key (INSERT policy is public; SELECT is
// admin-only, so counts are visible solely in the admin Analytics panel).
const VISITOR_BEACON = `<script>(function(){try{if(window.__wv_tracked){return}window.__wv_tracked=true;var t=new Date().toISOString().slice(0,10);var d=(window.screen&&window.screen.width<768)?'mobile':'desktop';setTimeout(function(){fetch('${MAIN_URL}/rest/v1/visitor_analytics',{method:'POST',headers:{'apikey':'${MAIN_ANON_KEY}','Authorization':'Bearer ${MAIN_ANON_KEY}','Content-Type':'application/json','Prefer':'return=minimal'},body:JSON.stringify({visit_date:t,page_views:1,unique_visitors:1,device_type:d})}).catch(function(){})},1200)}catch(e){}})();</script>`;

let cachedHtml = null;

function findHtmlPath() {
  const candidates = [
    path.join(process.cwd(), 'dist', 'details.html'),
    path.join(__dirname, 'details-static.html'),
    path.join(__dirname, '..', 'dist', 'details.html'),
    path.join(__dirname, '..', '..', 'dist', 'details.html'),
  ];
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) return p;
    } catch {}
  }
  return null;
}

function readDetailsHtml() {
  if (cachedHtml) return cachedHtml;
  const p = findHtmlPath();
  if (!p) return null;
  cachedHtml = fs.readFileSync(p, 'utf8');
  return cachedHtml;
}

function absUrl(src, origin) {
  if (!src) return '';
  if (/^(https?:|data:)/i.test(src)) return src;
  return origin + src;
}

function formatSharePrice(listing) {
  const raw = listing?.price;
  const n = Number(raw && typeof raw === 'object' ? raw.price : raw) || 0;
  const cur = listing?.currency || 'USD';
  let s;
  try {
    s = n.toLocaleString('en-US', { style: 'currency', currency: cur, maximumFractionDigits: 0 });
  } catch {
    s = '$' + n.toLocaleString('en-US');
  }
  if (listing?.price_period) s += '/' + listing.price_period;
  return s;
}

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function resolveListingSync(id) {
  return (
    getTruckById(id) ||
    getMotorhomeById(id) ||
    getCarById(id) ||
    getPhoneById(id) ||
    PRODUCT_LISTINGS.find((l) => l.property_id === id) ||
    PRODUCT_EXTRA_LISTINGS.find((l) => l.property_id === id) ||
    findListingById(id) ||
    generateListingById(id)
  );
}

async function withTimeoutMs(promise, ms) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve('__timeout__'), ms);
    promise.then(
      (v) => { clearTimeout(timer); resolve(v); },
      () => { clearTimeout(timer); resolve('__timeout__'); },
    );
  });
}

// Direct, targeted lookup of a single DB listing (created in the admin).
//
// Previously this went through the browser-side full-table loader
// (loadDBListings() -> findListingById()), which fetches the ENTIRE
// showroom_listings table (~440 rows) and raced a hard timeout. On a cold
// serverless start that full-table fetch routinely exceeded the cap, so the
// crawler got the generic fallback preview (brand-logo + "Property Details")
// instead of the real product. A targeted single-row query by property_id is
// ~0.9s and always wins, so Facebook/WhatsApp reliably show the real product.
// Shared with the /api/og-image generator (fast, persistSession:false).
async function resolveFromDb(id) {
  const result = await withTimeoutMs(
    import('../shared/listing-lookup.mjs').then((m) => m.resolveFromDb(id)),
    4000,
  );
  return result === '__timeout__' ? null : result;
}

function stripMetaTag(html, attr, key) {
  const re = new RegExp(`\\s*<meta[^>]+${attr}="${key}"[^>]*>`, 'gi');
  return html.replace(re, '');
}

function injectMeta(html, tag) {
  const attrMatch = tag.match(/(?:property|name)="([^"]+)"/);
  if (attrMatch) {
    html = stripMetaTag(html, 'property', attrMatch[1]);
    html = stripMetaTag(html, 'name', attrMatch[1]);
  }
  return html.replace('</head>', `  ${tag}\n</head>`);
}

// ── Availability / condition helpers (schema.org + display) ──────────────
function availabilityParts(listing) {
  const raw = String(listing?.availability_status || '').trim();
  const stock = Number(listing?.stock_quantity);
  let label;
  let schema = 'https://schema.org/InStock';
  if (/out\s*of\s*stock|sold\s*out/i.test(raw)) {
    label = 'Out of Stock';
    schema = 'https://schema.org/OutOfStock';
  } else if (/discontinued|obsolete|no\s*longer\s*(available|manufactured)/i.test(raw)) {
    label = 'Discontinued';
    schema = 'https://schema.org/OutOfStock';
  } else if (/pre-?order|reservation|coming\s*soon/i.test(raw)) {
    label = 'Pre-Order';
    schema = 'https://schema.org/PreOrder';
  } else if (/limited|few\s*left|low\s*stock/i.test(raw)) {
    label = 'Limited Stock';
    schema = 'https://schema.org/LimitedAvailability';
  } else if (raw) {
    label = raw;
  } else if (Number.isFinite(stock) && stock > 0) {
    label = 'In Stock';
  } else {
    label = 'In Stock';
  }
  if (Number.isFinite(stock) && stock > 0) schema = 'https://schema.org/InStock';
  return { label, schema };
}

function conditionSchema(listing) {
  const raw = String(listing?.condition || listing?.listing_status || '').toLowerCase();
  if (/used|pre-?owned|refurbished|second\s*hand/i.test(raw)) return 'https://schema.org/UsedCondition';
  if (/new/i.test(raw)) return 'https://schema.org/NewCondition';
  return 'https://schema.org/NewCondition';
}

function productPhotos(listing, origin) {
  const imgs = Array.isArray(listing?.images) ? listing.images : [];
  return imgs
    .filter((u) => typeof u === 'string' && u.startsWith('http') && !productVideo({ images: [u] }))
    .map((u) => absUrl(u, origin))
    .filter(Boolean);
}

function productVideos(listing, origin) {
  const imgs = Array.isArray(listing?.images) ? listing.images : [];
  const vids = [];
  if (typeof listing?.video_url === 'string' && listing.video_url) vids.push(listing.video_url);
  if (typeof listing?.video === 'string' && listing.video) vids.push(listing.video);
  vids.push(...imgs);
  return vids
    .map((u) => (typeof u === 'string' && /\.(mp4|webm|mov|avi|mkv|m4v|3gp)(\?|#|$)/i.test(u) ? absUrl(u, origin) : ''))
    .filter((u, i, arr) => u && arr.indexOf(u) === i);
}

function cleanText(s, max) {
  const t = String(s || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return max && t.length > max ? t.slice(0, max).replace(/\s+\S*$/, '') + '…' : t;
}

function productJsonLd(listing, opts) {
  const { canonical, origin, priceNum, photoUrls } = opts;
  const title = String(listing.title || '').trim();
  const avail = availabilityParts(listing);
  const offers = {
    '@type': 'Offer',
    priceCurrency: listing.currency || 'USD',
    price: priceNum,
    url: canonical,
    priceValidUntil: '2030-12-31',
    itemCondition: conditionSchema(listing),
    availability: avail.schema,
    seller: { '@type': 'Organization', name: SITE_NAME },
  };
  if (listing.warranty) offers.warranty = String(listing.warranty);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    description: cleanText(listing.description, 4000) || `Shop ${title} at ${SITE_NAME}.`,
    sku: listing.property_id || listing.sku || listing.id,
    mpn: listing.property_id || listing.sku || listing.id,
    url: canonical,
    image: photoUrls.length ? photoUrls : [absUrl(productPoster(listing) || '/brand-logo.jpeg', origin)],
    brand: listing.brand ? { '@type': 'Brand', name: listing.brand } : { '@type': 'Brand', name: SITE_NAME },
    offers,
  };
  const rating = Number(listing.rating);
  const reviews = Number(listing.rating_count || listing.review_count || 0);
  if (Math.min(rating, 5) > 0 && reviews > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: Math.min(rating, 5).toFixed(1),
      reviewCount: reviews,
    };
  }
  if (listing.category) schema.category = listing.category;
  if (opts.location) {
    schema.additionalProperty = [
      { '@type': 'PropertyValue', name: 'Location', value: opts.location },
    ];
  }
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}

// ── Server-rendered product body (SEO / no-JS) ───────────────────────────
function isIllustrativeListing(listing) {
  return listing?.verification_status === 'Illustrative'
    || /illustrative/i.test(String(listing?.availability_status || ''))
    || /^WS-[ACPT]-/.test(String(listing?.property_id || ''));
}

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'x';
}

const HUB_CATEGORIES = [
  { slug: 'motorhomes', label: 'Motorhomes', match: /motor\s*home|rv\b|camper|caravan/i },
  { slug: 'houses', label: 'Houses', match: /house|villa|townhouse|apartment|duplex|cottage|estate|mansion|penthouse|bungalow|home\b/i },
  { slug: 'trucks', label: 'Trucks', match: /truck|pickup/i },
  { slug: 'cars', label: 'Cars', match: /car\b|vehicle|sedan|suv|coupe|hatchback|convertible|wagon/i },
  { slug: 'phones', label: 'Mobile Phones', match: /phone|smartphone|pixel|galaxy|iphone|xiaomi|tablet/i },
  { slug: 'electronics', label: 'Electronics', match: /laptop|computer|macbook|notebook|headphone|audio|speaker|camera|television|tv\b|console|gaming|watch|wearable/i },
  { slug: 'appliances', label: 'Appliances', match: /appliance|fridge|refrigerator|refrigerant|washer|washing\s*machine|dryer|kitchen|oven|microwave|espresso|blender|vacuum|air\s*fryer|grill/i },
  { slug: 'pets', label: 'Dogs & Pets', match: /dog|puppy|cat|kitten|pet\b/i },
];

function hubCategory(listing) {
  const text = `${listing?.category || ''} ${listing?.subcategory || ''} ${listing?.title || ''} ${listing?.listing_type || ''}`;
  for (const h of HUB_CATEGORIES) if (h.match.test(text)) return h;
  return null;
}

function hubCountry(listing) {
  const name = String(listing?.country || '').trim();
  if (!name) return null;
  return { slug: slugify(name), label: name };
}

function locationOf(listing) {
  return [listing?.city, listing?.state, listing?.country].filter(Boolean).join(', ') || listing?.product_location || '';
}

function renderSsrBody(listing, opts) {
  const { canonical, origin, priceLabel, availLabel, related } = opts;
  const id = listing.property_id || listing.id || '';
  const title = cleanText(listing.title, 300) || SITE_NAME;
  const description = cleanText(listing.description, 4000) || '';
  const heroVideo = productVideo(listing);
  const heroPoster = absUrl(productPoster(listing) || '', origin);
  const hero = heroVideo
    ? `<video src="${escapeAttr(absUrl(heroVideo, origin))}"${heroPoster ? ` poster="${escapeAttr(heroPoster)}"` : ''} muted loop autoplay playsinline preload="metadata" class="w-full h-full object-cover" onerror="this.style.display='none'"></video>`
    : `<div class="w-full h-full flex items-center justify-center bg-gray-100"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-12 h-12 text-gray-300"><path d="M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196"/><path d="M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"/><path d="m2 2 20 20"/></svg></div>`;
  const breadcrumbTitle = cleanText(title, 40);
  const cat = hubCategory(listing);
  const cty = hubCountry(listing);
  const loc = locationOf(listing);
  const crumbsMid = [
    cat ? `<li><a class="hover:text-blue-600" href="/category/${escapeAttr(cat.slug)}">${escapeAttr(cat.label)}</a></li><li aria-hidden="true">/</li>` : '',
    cty ? `<li><a class="hover:text-blue-600" href="/country/${escapeAttr(cty.slug)}">${escapeAttr(cty.label)}</a></li><li aria-hidden="true">/</li>` : '',
  ].join('');
  const thumbVideos = productVideos(listing, origin).slice(1, 6);
  const thumbnails = thumbVideos.map(
    (u, i) => `<video src="${escapeAttr(u)}" muted loop playsinline preload="metadata" class="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-gray-200" onerror="this.style.display='none'"></video>`
  ).join('');
  const thumbRow = thumbnails
    ? `<div class="flex flex-wrap gap-2 mt-3">${thumbnails}</div>`
    : '';

  const specs = [];
  const specsObj = (listing.specifications && typeof listing.specifications === 'object') ? listing.specifications : {};
  if (listing.brand) specs.push(['Brand', listing.brand]);
  if (listing.condition) specs.push(['Condition', listing.condition]);
  if (listing.sku) specs.push(['SKU', listing.sku]);
  if (listing.warranty) specs.push(['Warranty', listing.warranty]);
  if (listing.shipping_info) specs.push(['Shipping', listing.shipping_info]);
  if (listing.delivery_estimate) specs.push(['Delivery', listing.delivery_estimate]);
  if (listing.product_location) specs.push(['Location', listing.product_location]);
  if (listing.dimensions) specs.push(['Dimensions', listing.dimensions]);
  if (listing.weight) specs.push(['Weight', `${listing.weight}${listing.weight_unit || ''}`.trim()]);
  if (listing.color) specs.push(['Color', listing.color]);
  if (listing.size) specs.push(['Size', listing.size]);
  if (listing.model_year || specsObj.model_year) specs.push(['Model Year', listing.model_year || specsObj.model_year]);
  if (listing.mileage || specsObj.mileage) specs.push(['Mileage', listing.mileage || specsObj.mileage]);
  if (listing.fuel_type || specsObj.fuel_type) specs.push(['Fuel Type', listing.fuel_type || specsObj.fuel_type]);
  if (listing.bedrooms != null) specs.push(['Bedrooms', listing.bedrooms]);
  if (listing.bathrooms != null) specs.push(['Bathrooms', listing.bathrooms]);
  if (listing.land_size) specs.push(['Land Size', listing.land_size]);
  if (listing.building_size) specs.push(['Building Size', listing.building_size]);
  if (listing.property_type) specs.push(['Property Type', listing.property_type]);
  if (listing.furnished) specs.push(['Furnished', listing.furnished]);
  if (listing.city) specs.push(['Location', [listing.city, listing.state, listing.country].filter(Boolean).join(', ')]);
  const rating = Math.min(5, Number(listing.rating) || 0);
  const reviews = Number(listing.rating_count || listing.review_count || 0);
  const ratingHtml = rating > 0 && reviews > 0
    ? `<span class="inline-flex items-center gap-1 text-amber-500 font-bold text-sm">★ ${rating.toFixed(1)} <span class="text-gray-400 font-semibold">(${reviews})</span></span>`
    : '';
  const badgeColor = availLabel.toLowerCase().includes('out') || availLabel.toLowerCase().includes('discontinue') ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700';
  const highlightsList = (Array.isArray(listing.highlights) && listing.highlights.length ? listing.highlights : [])
    .concat(Array.isArray(listing.features) && listing.features.length ? listing.features : [])
    .filter((x) => typeof x === 'string' && x.trim())
    .slice(0, 6);
  const highlightsHtml = highlightsList.length
    ? `<div class="mt-5">
        <h3 class="text-sm font-black text-gray-900 mb-2">Highlights</h3>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 list-disc pl-5 text-sm text-gray-600">
          ${highlightsList.map((h) => `<li>${escapeAttr(cleanText(h, 140))}</li>`).join('')}
        </ul>
      </div>`
    : '';
  const specsHtml = specs.length
    ? `<section class="mt-10">
        <h2 class="text-lg font-black text-gray-900 mb-3">Key Details</h2>
        <h3 class="text-sm font-black text-gray-500 uppercase tracking-wide mb-3">Specifications</h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-5">
          ${specs.map(([k, v]) => `<div class="flex flex-col gap-0.5"><dt class="text-[11px] font-bold uppercase tracking-wide text-gray-400">${escapeAttr(k)}</dt><dd class="text-sm font-semibold text-gray-800 break-words">${escapeAttr(v)}</dd></div>`).join('')}
        </dl>
        ${highlightsHtml}
      </section>` : highlightsHtml ? `<section class="mt-10"><h2 class="text-lg font-black text-gray-900 mb-3">Key Details</h2>${highlightsHtml}</section>` : '';
  const descHtml = description
    ? `<div class="text-[15px] leading-relaxed text-gray-700 whitespace-pre-line">${escapeAttr(description)}</div>`
    : `<p class="text-gray-500 text-sm">Full product details are available on the checkout page.</p>`;

  const relatedLinks = [];
  if (cat) relatedLinks.push(`<a class="hover:text-blue-600" href="/category/${escapeAttr(cat.slug)}">More ${escapeAttr(cat.label.toLowerCase())}</a>`);
  if (cty) relatedLinks.push(`<a class="hover:text-blue-600" href="/country/${escapeAttr(cty.slug)}">More in ${escapeAttr(cty.label)}</a>`);
  if (loc) relatedLinks.push(`<a class="hover:text-blue-600" href="/showroom">Browse the global showroom</a>`);
  const relCards = (related && related.length)
    ? `<section class="mt-10">
        <h2 class="text-lg font-black text-gray-900 mb-3">Related products</h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          ${related.map((r) => `<a href="${escapeAttr(r.url)}" class="group block rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition">
            <div class="aspect-[4/3] bg-gray-100 overflow-hidden">${r.image ? (/\.(mp4|webm|mov|avi|mkv|m4v|3gp)(\?|#|$)/i.test(r.image) ? `<video src="${escapeAttr(absUrl(r.image, origin))}" muted loop autoplay playsinline preload="metadata" class="w-full h-full object-cover" onerror="this.style.display='none'"></video>` : `<img src="${escapeAttr(absUrl(r.image, origin))}" alt="${escapeAttr(cleanText(r.title, 90))}" loading="lazy" decoding="async" class="w-full h-full object-cover">`) : ''}</div>
            <div class="p-3">
              <p class="text-xs font-bold text-gray-800 line-clamp-2 leading-snug">${escapeAttr(cleanText(r.title, 90))}</p>
              <p class="mt-1 text-sm font-black text-blue-600">${Number(r.price) > 0 ? formatSharePrice({ price: Number(r.price), currency: r.currency }) : 'Contact us'}</p>
            </div>
          </a>`).join('')}
        </div>
      </section>`
    : '';
  const relatedHtml = relatedLinks.length
    ? `<section class="mt-10">
        <h2 class="text-lg font-black text-gray-900 mb-3">Explore more</h2>
        <div class="flex flex-wrap gap-2.5">
          ${relatedLinks.map((l) => `<span class="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-4 py-2 text-sm font-bold">${l}</span>`).join('')}
        </div>
      </section>`
    : '';

  return `<nav role="navigation" aria-label="Breadcrumb" class="text-xs text-gray-500 mb-4">
    <ol class="flex flex-wrap items-center gap-1.5">
      <li><a class="hover:text-blue-600" href="/">Home</a></li>
      <li aria-hidden="true">/</li>
      <li><a class="hover:text-blue-600" href="/showroom">Showroom</a></li>
      <li aria-hidden="true">/</li>
      ${crumbsMid}
      <li><span class="text-gray-700 font-bold">${escapeAttr(breadcrumbTitle)}</span></li>
    </ol>
  </nav>
  <div class="fade-in" data-ssr-product="${escapeAttr(id)}">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
      <div>
        <div class="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 ring-1 ring-gray-200">
          ${hero}
        </div>
        ${thumbRow}
      </div>
      <div>
        <h1 class="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">${escapeAttr(title)}</h1>
        <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          ${ratingHtml}
          ${availLabel ? `<span class="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wide px-3 py-1.5 rounded-full ${badgeColor}"><span class="w-1.5 h-1.5 rounded-full bg-current"></span>${escapeAttr(availLabel)}</span>` : ''}
          ${listing.is_featured === true ? `<span class="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-300">★ Priority</span>` : ''}
          ${isIllustrativeListing(listing) ? `<span class="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200">Illustrative Listing</span>` : ''}
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">ID: ${escapeAttr(id)}</span>
        </div>
        <div class="mt-4 flex items-baseline flex-wrap gap-x-3">
          <span class="text-3xl sm:text-4xl font-black text-blue-600">${escapeAttr(priceLabel)}</span>
          <span class="text-xs font-semibold text-gray-400">USD · taxes & duties may apply</span>
        </div>
        <div class="mt-7 flex flex-col sm:flex-row gap-3">
          <a href="/checkout.html?id=${escapeAttr(encodeURIComponent(id))}" class="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:scale-[0.98] text-white text-sm font-black py-3.5 rounded-xl shadow-lg shadow-blue-500/30">Buy Now — Secure Checkout</a>
          <a href="/cart.html" class="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 text-emerald-600 text-sm font-black py-3.5 rounded-xl border-2 border-emerald-400 transition">View Cart</a>
        </div>
        <ul class="mt-6 space-y-2 text-sm text-gray-600">
          <li class="flex items-center gap-2"><span class="text-emerald-500">✓</span> Secure payments — card, PayPal &amp; mobile money</li>
          <li class="flex items-center gap-2"><span class="text-emerald-500">✓</span> Tracked worldwide delivery</li>
          <li class="flex items-center gap-2"><span class="text-emerald-500">✓</span> Buyer protection &amp; money-back guarantee</li>
        </ul>
      </div>
    </div>
    <section class="mt-10">
      <h2 class="text-lg font-black text-gray-900 mb-3">About this Product</h2>
      ${isIllustrativeListing(listing) ? '<p class="mb-3 text-[12px] font-bold text-orange-600 bg-orange-50 border border-orange-200 rounded-xl px-3 py-2">Illustrative Listing — this is a demonstration listing for the worldwide marketplace showcase; the photo and price are illustrative and are not a verified live offer.</p>' : ''}
      ${descHtml}
    </section>
    ${specsHtml}
    ${relCards}
    ${relatedHtml}
    <p class="mt-8 text-xs text-gray-400">Prices in USD. Availability and price are updated live from the store database.</p>
  </div>`;
}

// ── Request handler ──────────────────────────────────────────────────────
export default async function handler(req, res) {
  try {
    const url = new URL(req.url || '', 'https://x');
    const pathName = url.pathname;
    const qId = req.query?.id || url.searchParams.get('id') || '';
    const rawId = String(Array.isArray(qId) ? qId[0] : qId).trim();
    const pathMatch = /^\/product\/([^/?]+)\/?$/.exec(pathName);
    const id = rawId || (pathMatch ? decodeURIComponent(pathMatch[1]) : '');
    const host = req.headers?.host || 'weverseonlineshop.com';
    const origin = 'https://' + host;
    const siteUrl = (process.env.VITE_SITE_URL || origin).replace(/\/+$/, '');
    const isProductPath = /^\/product\/.+/.test(pathName);

    const html = readDetailsHtml();
    if (!html) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('details.html not found');
      return;
    }

    // ── Real-browser fast path ─────────────────────────────────────────────
    // Real visitors must get the product page the instant they click. Serving
    // the static client-side shell here (no database, no SSR, no blocking
    // work) lets the bundled details.js resolve the id from the URL and render
    // the full product in milliseconds from in-memory data. Crawlers and
    // social platforms fall through to the full server-rendered page below so
    // SEO / link previews keep the per-product meta, JSON-LD and body.
    const ua = String(req.headers?.['user-agent'] || '');
    // Bot detection for the FAST PATH ONLY. It must give real human browsers
    // the instant static shell and reserve full SSR for actual link scrapers.
    // IMPORTANT: brand words (facebook, instagram, whatsapp, telegram,
    // pinterest, ...) are NOT bot markers — those phones use in-app browsers
    // that embed the brand in their UA and are real users who must get the
    // fast shell. Only explicit crawler tokens are treated as bots.
    const BOT_RE = /(facebookexternalhit|twitterbot|pinterestbot|pinterest\/|linkedinbot|telegrambot|discordbot|slackbot|skypeuripreview|vkshare|vkShare|baiduspider|bingbot|googlebot|ahrefsbot|adsbotgoogle|mediapartners|duckduckbot|uptimerobot|semrushbot|mj12bot|dotbot|petalbot|slurp|tiktokbot|yandex\b|facebookcatalog|headlesschrome|phantomjs|puppeteer|wget|curl|python-requests|python-urllib|node-fetch|axios|okhttp|w3m|lynx|httpclient|bot[^a-z])/i;
    const isRealBrowser = /mozilla/i.test(ua) && !BOT_RE.test(ua);
    if (isRealBrowser) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=3600');
      let fastOut = html;
      if (fastOut.includes('</body>')) fastOut = fastOut.replace('</body>', `${VISITOR_BEACON}\n</body>`);
      res.end(fastOut);
      return;
    }

    let listing = null;
    let fromDb = false;
    if (id) {
      const sync = resolveListingSync(id);
      if (sync) {
        listing = sync;
      } else {
        listing = await resolveFromDb(id);
        fromDb = !!listing;
      }
    }

    let out = html;
    let status = 200;
    if (listing) {
      const title = String(listing.title || '').trim() || SITE_NAME;
      const loc = locationOf(listing);
      const cat = hubCategory(listing);
      const cty = hubCountry(listing);
      let seoTitle = String(listing.seo_title || '').trim() || title;
      if (loc && !seoTitle.toLowerCase().includes(loc.split(',')[0].trim().toLowerCase()) && !String(listing.seo_title || '').trim()) {
        seoTitle = `${seoTitle} — ${loc}`;
      }
      const price = formatSharePrice(listing);
      const priceNum = Number(listing.price && typeof listing.price === 'object' ? listing.price.price : listing.price) || 0;
      const avail = availabilityParts(listing);
      const descCore = cleanText(listing.description, 170);
      const locPart = loc ? ` Located in ${loc}.` : '';
      const customDesc = String(listing.meta_description || '').trim();
      const desc = customDesc
        ? cleanText(customDesc, 235)
        : `${seoTitle}${price ? ` for ${price}` : ''} — ${avail.label || 'Available'}.${locPart} ${descCore || `Available now at ${SITE_NAME} with secure checkout and tracked worldwide delivery.`}`;
      const canonical = isProductPath || id
        ? `${siteUrl}/product/${encodeURIComponent(id)}`
        : `${siteUrl}/details.html?id=${encodeURIComponent(id)}`;
      // For DB showroom products use the 1200x630 OG-image generator (large,
      // uncropped product preview) — only when the product has a REAL photo
      // (never a video/mp4, which the image generator cannot decode). The
      // poster is always a real photo; standalone video fields or an mp4 inside
      // images[] are emitted separately as og:video so the card can play it.
      const posterPhoto = productPoster(listing);
      const useSized = fromDb;
      const ogImage = useSized
        ? `${siteUrl}/api/og-image?id=${encodeURIComponent(id)}`
        : absUrl(posterPhoto || '/brand-logo.jpeg', siteUrl);
      const videoUrl = productVideo(listing);
      const videoTags = videoUrl
        ? [
            `<meta property="og:video" content="${escapeAttr(absUrl(videoUrl, siteUrl))}">`,
            `<meta property="og:video:secure_url" content="${escapeAttr(absUrl(videoUrl, siteUrl))}">`,
            `<meta property="og:video:type" content="video/mp4">`,
            `<meta property="og:video:width" content="1280">`,
            `<meta property="og:video:height" content="720">`,
          ]
        : [];
      const tags = [
        `<title>${escapeAttr(seoTitle)} | ${SITE_NAME}</title>`,
        `<meta name="description" content="${escapeAttr(desc)}">`,
        `<meta name="robots" content="index,follow,max-image-preview:large">`,
        ...(listing.country_code ? [`<meta name="geo.country" content="${escapeAttr(listing.country_code)}">`] : []),
        ...(loc ? [`<meta name="geo.placename" content="${escapeAttr(loc)}">`] : []),
        `<meta property="og:type" content="product">`,
        `<meta property="og:title" content="${escapeAttr(seoTitle)}">`,
        `<meta property="og:description" content="${escapeAttr(desc)}">`,
        `<meta property="og:image" content="${escapeAttr(ogImage)}">`,
        `<meta property="og:image:secure_url" content="${escapeAttr(ogImage)}">`,
        ...(useSized ? [
          `<meta property="og:image:width" content="1200">`,
          `<meta property="og:image:height" content="630">`,
          `<meta property="og:image:type" content="image/jpeg">`,
        ] : []),
        `<meta property="og:image:alt" content="${escapeAttr(title)} — ${SITE_NAME}">`,
        `<meta property="og:url" content="${escapeAttr(canonical)}">`,
        ...videoTags,
        `<meta name="twitter:card" content="summary_large_image">`,
        `<meta name="twitter:title" content="${escapeAttr(seoTitle)}">`,
        `<meta name="twitter:description" content="${escapeAttr(desc)}">`,
        `<meta name="twitter:image" content="${escapeAttr(ogImage)}">`,
        `<link rel="canonical" href="${escapeAttr(canonical)}">`,
      ];
      out = html.replace(/<title>[\s\S]*?<\/title>/, tags[0]);
      out = out.replace(/<link rel="canonical"[^>]*>/, tags[tags.length - 1]);
      for (const t of tags.slice(1, -1)) out = injectMeta(out, t);

      // JSON-LD Product schema for Google / Merchant Center rich results.
      const jsonLd = `<script type="application/ld+json">${productJsonLd(listing, { canonical, origin: siteUrl, priceNum, photoUrls: productPhotos(listing, siteUrl), location: loc })}</script>`;
      out = out.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');
      out = out.replace('</head>', `  ${jsonLd}\n</head>`);

      // BreadcrumbList structured data ties the product into the hub hierarchy
      // (Home > Showroom > [Category] > [Country] > Product).
      const crumbs = [
        { name: 'Home', item: `${siteUrl}/` },
        { name: 'Showroom', item: `${siteUrl}/showroom` },
        ...(cat ? [{ name: cat.label, item: `${siteUrl}/category/${cat.slug}` }] : []),
        ...(cty ? [{ name: cty.label, item: `${siteUrl}/country/${cty.slug}` }] : []),
        { name: cleanText(title, 60), item: canonical },
      ];
      const breadcrumbJsonLd = `<script type="application/ld+json">${JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.item })),
      }).replace(/</g, '\\u003c')}</script>`;
      out = out.replace('</head>', `  ${breadcrumbJsonLd}\n</head>`);

      // Server-render the product body into the initial HTML.
      const relatedProducts = await findRelatedListings(listing, 4);
      const body = renderSsrBody(listing, {
        canonical,
        origin: siteUrl,
        priceLabel: price,
        availLabel: avail.label,
        heroImage: posterPhoto || ogImage,
        related: relatedProducts,
      });
      out = out.replace(/(<div id="details-content"[^>]*>)[\s\S]*?(<\/div>\s*<\/main>)/, (m, open, close) => `${open}\n        ${body}\n      ${close}`);
    } else if (id) {
      // Product id couldn't be resolved (legacy/removed/never-in-DB). Still emit a
      // proper branded card with the site brand logo as og:image so NO shared link
      // ever previews without a picture — never a bare page with a missing image.
      const canonical = `${siteUrl}/product/${encodeURIComponent(id)}`;
      const logo = absUrl('/brand-logo.jpeg', siteUrl);
      const genericDesc = `${SITE_NAME} — premium products, secure payments, worldwide delivery.`;
      const tags = [
        `<title>${SITE_NAME}</title>`,
        `<meta name="description" content="${escapeAttr(genericDesc)}">`,
        `<meta name="robots" content="noindex,follow">`,
        `<meta property="og:type" content="website">`,
        `<meta property="og:title" content="${escapeAttr(SITE_NAME)}">`,
        `<meta property="og:description" content="${escapeAttr(genericDesc)}">`,
        `<meta property="og:image" content="${escapeAttr(logo)}">`,
        `<meta property="og:image:secure_url" content="${escapeAttr(logo)}">`,
        `<meta property="og:url" content="${escapeAttr(canonical)}">`,
        `<meta name="twitter:card" content="summary_large_image">`,
        `<meta name="twitter:title" content="${escapeAttr(SITE_NAME)}">`,
        `<meta name="twitter:description" content="${escapeAttr(genericDesc)}">`,
        `<meta name="twitter:image" content="${escapeAttr(logo)}">`,
        `<link rel="canonical" href="${escapeAttr(canonical)}">`,
      ];
      out = html.replace(/<title>[\s\S]*?<\/title>/, tags[0]);
      out = out.replace(/<link rel="canonical"[^>]*>/, tags[tags.length - 1]);
      for (const t of tags.slice(1, -1)) out = injectMeta(out, t);
      status = 404;
    } else {
      // /details.html or /details shell with no product id — an empty duplicate
      // page. Keep it crawlable-routed but out of the index (canonical → showroom).
      const shellCanonical = `${siteUrl}/showroom.html`;
      out = out.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${escapeAttr(shellCanonical)}">`);
      out = out.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${escapeAttr(shellCanonical)}">`);
      out = injectMeta(out, `<meta name="robots" content="noindex,follow">`);
    }

    res.statusCode = status;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300');
    if (out.includes('</body>')) out = out.replace('</body>', `${VISITOR_BEACON}\n</body>`);
    res.end(out);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Server error: ' + (err && err.message ? err.message : err));
  }
}