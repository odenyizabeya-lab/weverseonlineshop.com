// api/lib/seo-builders.mjs — Shared sitemap / merchant-feed / index builders.
// Used by BOTH the build-time generator (scripts/generate-seo.mjs) and the
// live endpoints (api/sitemap.xml.js, api/merchant-feed.xml.js) so the static
// fallback and the live feed can never drift apart.

export const SITE_URL = 'https://weverseonlineshop.com';

export const STATIC_PAGES = [
  { url: '/', changefreq: 'daily', priority: '1.0' },
  { url: '/about', changefreq: 'monthly', priority: '0.8' },
  { url: '/contact', changefreq: 'monthly', priority: '0.8' },
  { url: '/team', changefreq: 'monthly', priority: '0.5' },
  { url: '/showroom', changefreq: 'daily', priority: '0.8' },
  { url: '/help', changefreq: 'monthly', priority: '0.6' },
  { url: '/privacy', changefreq: 'monthly', priority: '0.4' },
  { url: '/terms', changefreq: 'monthly', priority: '0.4' },
  { url: '/shipping-policy', changefreq: 'monthly', priority: '0.4' },
  { url: '/refund-policy', changefreq: 'monthly', priority: '0.4' },
];

export function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'x';
}

// Keyword landing-page tunnels (internal links + sitemap entries). Each
// category hub matches rows BY KEYWORD so the regexes stay useful for any
// catalog layout. Order matters: motorhomes must precede houses (motorhome
// ends in "home") and vehicles, trucks before generic cars.
export const CATEGORY_HUBS = [
  { slug: 'motorhomes', label: 'Motorhomes for Sale', match: /motor\s*home|rv\b|camper|caravan/i, listingTypes: ['vehicle'] },
  { slug: 'houses', label: 'Houses for Sale', match: /house|villa|townhouse|apartment|duplex|cottage|estate|mansion|penthouse|bungalow|home\b/i, listingTypes: ['property'] },
  { slug: 'trucks', label: 'Trucks for Sale', match: /truck|pickup/i, listingTypes: ['vehicle'] },
  { slug: 'cars', label: 'Cars for Sale', match: /car\b|vehicle|sedan|suv|coupe|hatchback|convertible|wagon/i, listingTypes: ['vehicle'] },
  { slug: 'phones', label: 'Mobile Phones', match: /phone|smartphone|pixel|galaxy|iphone|xiaomi|tablet/i, listingTypes: ['product'] },
  { slug: 'electronics', label: 'Electronics', match: /laptop|computer|macbook|notebook|headphone|audio|speaker|camera|television|tv\b|console|gaming|watch|wearable/i, listingTypes: ['product'] },
  { slug: 'appliances', label: 'Appliances', match: /appliance|fridge|refrigerator|refrigerant|washer|washing\s*machine|dryer|kitchen|oven|microwave|espresso|blender|vacuum|air\s*fryer|grill/i, listingTypes: ['product'] },
  { slug: 'pets', label: 'Dogs & Pets', match: /dog|puppy|cat|kitten|pet\b/i, listingTypes: ['product'] },
];

export function hubCategoryFor(row) {
  const text = `${row?.category || ''} ${row?.subcategory || ''} ${row?.title || ''} ${row?.listing_type || ''}`;
  for (const hub of CATEGORY_HUBS) {
    if (hub.match.test(text)) return { slug: hub.slug, label: hub.label };
  }
  return null;
}

export function hubCountryFor(row) {
  const name = String(row?.country || '').trim();
  if (!name) return null;
  return { slug: slugify(name), label: name };
}

// Deterministic, stable hub list (categories in catalog order first, then
// countries alphabetically) from the live row set — used by the sitemap so
// it can never advertise a hub that has no products behind it.
export function collectHubs(listings) {
  const cats = [];
  const seenCats = new Set();
  const countries = new Map();
  for (const row of listings) {
    const cat = hubCategoryFor(row);
    if (cat && !seenCats.has(cat.slug)) {
      seenCats.add(cat.slug);
      let count = 0;
      for (const r2 of listings) if (hubCategoryFor(r2)?.slug === cat.slug) count++;
      cats.push({ type: 'category', slug: cat.slug, label: cat.label, count });
    }
    const cty = hubCountryFor(row);
    if (cty) countries.set(cty.slug, cty.label);
  }
  const countriesList = [...countries.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([slug, label]) => ({ type: 'country', slug, label, count: 0 }));
  return [...cats, ...countriesList];
}

export function escXml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function escAttr(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function cleanText(s, max) {
  const t = String(s || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return max && t.length > max ? t.slice(0, max).replace(/\s+\S*$/, '') : t;
}

export function rowPriceNum(row) {
  const p = row?.price && typeof row.price === 'object' ? row.price.price : row?.price;
  const n = Number(p);
  return Number.isFinite(n) ? n : 0;
}

export function rowId(row) {
  return row?.property_id || row?.id || row?.sku || '';
}

export function rowImages(row) {
  const imgs = Array.isArray(row?.images) ? row.images : [];
  return imgs.filter((u) => typeof u === 'string' && u.startsWith('http') && !/\.(mp4|webm|mov|avi|mkv|m4v|3gp)(\?|#|$)/i.test(u));
}

export function isoDate(v) {
  const d = v ? new Date(v) : null;
  if (d && !Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  return new Date().toISOString().slice(0, 10);
}

export function feedAvailability(row) {
  const raw = String(row?.availability_status || '').toLowerCase();
  const stock = Number(row?.stock_quantity);
  if (/pre-?order|reservation/i.test(raw)) return 'preorder';
  if (/\bbackorder\b|back\s*order/i.test(raw)) return 'backorder';
  if (/out\s*of\s*stock|sold\s*out/i.test(raw)) return 'out of stock';
  if (/illustrative/i.test(raw)) return 'in stock';
  if (/in\s*stock|limited|available/i.test(raw)) return 'in stock';
  return Number.isFinite(stock) && stock > 0 ? 'in stock' : 'out of stock';
}

export function feedCondition(row) {
  const raw = String(row?.condition || '').toLowerCase();
  if (/illustrative/i.test(raw)) return 'new';
  if (/refurbished/i.test(raw)) return 'refurbished';
  if (/used|pre-?owned|second\s*hand/i.test(raw)) return 'used';
  return 'new';
}

export function googleCategory(row) {
  const cat = String(row?.category || '');
  const title = String(row?.title || '');
  const c = `${cat} ${title}`.toLowerCase();
  if (/truck/i.test(c)) return 'Vehicles & Parts > Vehicles > Commercial & Fleet Vehicles > Trucks';
  if (/house|villa|apartment|townhouse|home|duplex|cottage|estate|mansion|penthouse/i.test(c)) return 'Real Estate > Homes';
  if (/car|vehicle|sedan|suv|coupe|hatchback|pickup/i.test(c)) return 'Vehicles & Parts > Vehicles';
  if (/phone|smartphone|tablet|pixel|iphone|samsung|xiaomi/i.test(c)) return 'Electronics > Communications > Telephony > Mobile Phones';
  if (/computer|laptop|macbook|chromebook|desktop|pc\b/i.test(c)) return 'Electronics > Computers > Computers & Tablets';
  if (/game|playstation|xbox|nintendo|gaming/i.test(c)) return 'Electronics > Video Game Consoles > Video Game Systems';
  if (/watch|wearable/i.test(c)) return 'Jewelry > Watches > Wristwatches';
  if (/jewelry|jewellery|ring|necklace|bracelet/i.test(c)) return 'Jewelry';
  if (/fashion|shoes|sneaker|dress|apparel|clothing/i.test(c)) return 'Apparel & Accessories';
  if (/baby|kids|toddler|child|diaper|stroller/i.test(c)) return 'Baby & Toddler';
  if (/washer|washing|dryer|laundry|kitchen|fridge|refrigerator|appliance|oven|microwave|espresso|blender|vacuum|air fryer|grill/i.test(c)) return 'Home & Garden > Appliances > Household Appliance Accessories';
  if (/electric|electronics|audio|headphone|speaker|camera|tv\b|television/i.test(c)) return 'Electronics';
  if (/tool|hardware|drill|saw|hammer/i.test(c)) return 'Hardware > Power Tools';
  if (/home|decor|rug|furniture|chair|mirror|couch|lamp|storage|furnish/i.test(c)) return 'Home & Garden > Decor';
  if (/toy|lego|figure/i.test(c)) return 'Toys & Games';
  if (/book|novel|reading/i.test(c)) return 'Media > Books';
  return 'Other';
}

export function buildSitemap(listings, hubs = []) {
  const urls = [];
  for (const p of STATIC_PAGES) {
    urls.push(`  <url>\n    <loc>${SITE_URL}${p.url}</loc>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`);
  }
  for (const h of hubs) {
    urls.push(`  <url>\n    <loc>${SITE_URL}/${h.type === 'category' ? 'category' : 'country'}/${escXml(h.slug)}</loc>\n    <lastmod>${isoDate()}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>`);
  }
  for (const l of listings) {
    const id = rowId(l);
    if (!id) continue;
    urls.push(`  <url>\n    <loc>${SITE_URL}/product/${escXml(encodeURIComponent(id))}</loc>\n    <lastmod>${isoDate(l.updated_at)}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

export function buildFeed(listings) {
  const entries = [];
  for (const l of listings) {
    const id = rowId(l);
    const title = cleanText(l.title, 150);
    if (!id || !title) continue;
    const price = rowPriceNum(l);
    const imgs = rowImages(l);
    const desc = cleanText(l.description, 3500);
    const specs = [
      'id', id,
      'item_group_id', id,
      'title', title,
      'description', desc || `Shop ${title} at ${SITE_URL}.`,
      'link', `${SITE_URL}/product/${encodeURIComponent(id)}`,
      'image_link', imgs[0] || `${SITE_URL}/brand-logo.jpeg`,
      'availability', feedAvailability(l),
      'price', `${price.toFixed(2)} USD`,
      'condition', feedCondition(l),
      'brand', cleanText(l.brand, 70) || 'Weverse Online Shop',
      'mpn', cleanText(id, 70),
      'google_product_category', googleCategory(l),
      'identifier_exists', 'FALSE',
    ];
    let xml = '  <item>\n';
    for (let i = 0; i < specs.length; i += 2) {
      xml += `    <g:${specs[i]}>${escXml(specs[i + 1])}</g:${specs[i]}>\n`;
    }
    xml += '  </item>';
    entries.push(xml);
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Weverse Online Shop</title>
    <link>${SITE_URL}</link>
    <description>Weverse Online Shop product catalog — prices in USD.</description>
${entries.join('\n')}
  </channel>
</rss>
`;
}

export function buildIndex(listings) {
  return listings.map((l) => {
    const id = rowId(l);
    const imgs = rowImages(l);
    return {
      id,
      title: cleanText(l.title, 200),
      price: rowPriceNum(l),
      currency: l.currency || 'USD',
      availability: l.availability_status || null,
      category: l.category || null,
      image: imgs[0] || null,
      url: `${SITE_URL}/product/${encodeURIComponent(id)}`,
    };
  });
}