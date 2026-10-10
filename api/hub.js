// api/hub.js — Server-rendered collection pages for keyword & location search.
//
//   /category/<slug>   e.g. /category/cars, /category/houses, /category/trucks
//   /country/<slug>    e.g. /country/united-states, /country/germany
//
// Collection pages give Google a fast, indexable, keyword-rich entry point for
// the exact queries people type ("cars for sale", "houses in the USA") and a
// permanent internal-link hub into every /product/<id> page. They are rendered
// live from the active catalog so they stay correct as the hourly auto-
// publisher adds listings across all 120 non-African countries.

import { CATEGORY_HUBS, slugify, cleanText, escAttr } from '../shared/seo-builders.mjs';
import { hubCategoryFor, hubCountryFor } from '../shared/seo-builders.mjs';
import { MAIN_URL, MAIN_ANON_KEY } from '../shared/supabase-env.mjs';

let cache = { at: 0, rows: null };

async function fetchRows() {
  const now = Date.now();
  if (cache.rows && now - cache.at < 10 * 60 * 1000) return cache.rows;
  const { createClient } = await import('@supabase/supabase-js');
  const client = createClient(MAIN_URL, MAIN_ANON_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await client
    .from('showroom_listings')
    .select('id, property_id, title, price, currency, availability_status, images, category, subcategory, listing_type, city, state, country, zip_code, updated_at')
    .eq('is_active', true)
    .order('updated_at', { ascending: false })
    .limit(5000);
  if (error) throw new Error(error.message);
  cache = { at: now, rows: data || [] };
  return cache.rows;
}

function money(n) {
  if (n == null || Number.isNaN(Number(n))) return '—';
  return '$' + Number(n).toLocaleString('en-US');
}

function mediaUrl(row) {
  const imgs = Array.isArray(row.images) ? row.images : [];
  const video = (typeof row.video_url === 'string' && row.video_url) || (typeof row.video === 'string' && row.video) || imgs.find((u) => typeof u === 'string' && /\.(mp4|webm|mov|avi|mkv|m4v|3gp)(\?|#|$)/i.test(u)) || '';
  if (video) return video;
  return imgs.find((u) => typeof u === 'string' && u.startsWith('http')) || '';
}

function location(row) {
  return [row.city, row.state, row.country].filter(Boolean).join(', ');
}

function card(row, siteUrl) {
  const id = row.property_id || row.id || row.sku || '';
  if (!id) return '';
  const media = mediaUrl(row);
  const thumb = media ? (/\.(mp4|webm|mov|avi|mkv|m4v|3gp)(\?|#|$)/i.test(media) ? `<video src="${escAttr(media)}" muted loop autoplay playsinline preload="metadata" width="1200" height="900"></video>` : `<img src="${escAttr(media)}" alt="${escAttr(cleanText(row.title, 200))}" loading="lazy" decoding="async" width="1200" height="900">`) : `<div class="thumb-empty"><i data-lucide="video-off" class="w-8 h-8 text-gray-400"></i></div>`;
  return `<a class="card" href="${siteUrl}/product/${encodeURIComponent(id)}">
  <div class="thumb">${thumb}</div>
  <div class="card-body">
    <div class="price">${escAttr(money(row.price))}</div>
    <h3 class="title">${escAttr(cleanText(row.title, 200))}</h3>
    <div class="loc">${escAttr(location(row))}${row.zip_code ? ` &middot; ${escAttr(row.zip_code)}` : ''}</div>
    <div class="chips">
      <span class="chip chip-cat">${escAttr(row.category || row.listing_type || 'Product')}</span>
      <span class="chip chip-avl">${escAttr(row.availability_status || 'In Stock')}</span>
    </div>
  </div>
</a>`;
}

function categoryNoun(label) {
  return label.replace(/\s*for Sale$/i, '').replace(/\s*game*\b/i, 'Games');
}

function pageHtml(opts) {
  const { canonical, title, desc, h1, sub, cards, breadcrumbs, jsonLd, related, relPrev, relNext, pager } = opts;
  const crumbs = breadcrumbs.map((b, i) =>
    i === breadcrumbs.length - 1
      ? `<li aria-current="page" class="crumb-cur">${escAttr(b.label)}</li>`
      : `<li><a href="${escAttr(b.url)}">${escAttr(b.label)}</a></li>`
  ).join('<li class="crumb-sep">/</li>');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escAttr(title)}</title>
<meta name="description" content="${escAttr(desc)}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${escAttr(canonical)}">
${relPrev ? `<link rel="prev" href="${escAttr(relPrev)}">` : ''}
${relNext ? `<link rel="next" href="${escAttr(relNext)}">` : ''}
<meta property="og:type" content="website">
<meta property="og:site_name" content="Weverse Online Shop">
<meta property="og:title" content="${escAttr(title)}">
<meta property="og:description" content="${escAttr(desc)}">
<meta property="og:url" content="${escAttr(canonical)}">
<meta property="og:image" content="${escAttr('https://weverseonlineshop.com/brand-logo.jpeg')}">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${jsonLd}</script>
<style>
  :root{--bg:#f6f7f9;--card:#fff;--line:#e5e7eb;--ink:#111827;--muted:#6b7280;--brand:#1d4ed8;--brand2:#2563eb}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;background:var(--bg);color:var(--ink);line-height:1.5}
  header{background:#fff;border-bottom:1px solid var(--line);position:sticky;top:0;z-index:10}
  .wrap{max-width:1200px;margin:0 auto;padding:0 20px}
  .bar{display:flex;align-items:center;justify-content:space-between;height:64px}
  .logo{font-weight:900;font-size:20px;color:var(--ink);text-decoration:none}
  .logo span{color:var(--brand)}
  .bar a.nav{font-weight:700;font-size:14px;color:var(--brand);text-decoration:none;padding:8px 14px;border:2px solid var(--brand);border-radius:10px}
  main{padding:28px 20px 48px}
  nav.crumbs{font-size:13px;color:var(--muted);margin-bottom:20px}
  .crumbs ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;align-items:center}
  .crumbs a{color:var(--brand);text-decoration:none}
  .crumb-sep{color:#9ca3af}
  .crumb-cur{color:var(--ink);font-weight:800}
  h1{font-size:30px;font-weight:900;letter-spacing:-.02em}
  p.sub{color:var(--muted);margin-top:8px;max-width:760px;font-size:15px}
  .meta{display:flex;gap:10px;align-items:center;margin-top:14px;flex-wrap:wrap}
  .count{background:var(--brand);color:#fff;font-size:12px;font-weight:800;border-radius:999px;padding:4px 12px}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;margin-top:26px}
  .card{background:var(--card);border:1px solid var(--line);border-radius:16px;overflow:hidden;text-decoration:none;color:inherit;transition:transform .15s ease,box-shadow .15s ease;display:block}
  .card:hover{transform:translateY(-3px);box-shadow:0 12px 28px rgba(0,0,0,.08)}
  .thumb{aspect-ratio:4/3;background:#eef0f3;overflow:hidden;display:flex;align-items:center;justify-content:center}
  .thumb img,.thumb video{width:100%;height:100%;object-fit:cover;display:block}
  .card-body{padding:14px 16px 16px}
  .price{font-size:20px;font-weight:900}
  .title{font-size:14px;font-weight:700;margin-top:6px;line-height:1.35}
  .loc{font-size:12px;color:var(--muted);margin-top:8px;font-weight:600}
  .chips{display:flex;gap:6px;margin-top:10px;flex-wrap:wrap}
  .chip{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;border-radius:999px;padding:3px 9px;border:1px solid var(--line)}
  .chip-cat{background:#eff6ff;color:var(--brand2);border-color:#bfdbfe}
  .chip-avl{background:#ecfdf5;color:#047857;border-color:#a7f3d0}
  section.related{margin-top:44px}
  section.related h2{font-size:16px;font-weight:900;margin-bottom:12px}
  .rel{display:flex;flex-wrap:wrap;gap:10px}
  .rel a{text-decoration:none;color:var(--brand);font-size:13px;font-weight:700;border:1px solid #bfdbfe;background:#eff6ff;padding:8px 14px;border-radius:999px}
  footer{border-top:1px solid var(--line);padding:22px 0;margin-top:48px;color:var(--muted);font-size:13px}
  .empty{background:#fff;border:1px dashed #d1d5db;border-radius:16px;padding:48px 24px;text-align:center;color:var(--muted);margin-top:24px}
  .pager{display:flex;align-items:center;justify-content:center;gap:16px;margin-top:28px;flex-wrap:wrap}
  .pager a{text-decoration:none;color:var(--brand);font-size:14px;font-weight:800;border:2px solid var(--brand);border-radius:12px;padding:9px 18px}
  .pager a:hover{background:#eff6ff}
  .pager .pg-num{font-size:13px;font-weight:700;color:var(--muted)}
  @media(max-width:640px){h1{font-size:24px}.grid{grid-template-columns:1fr}}
</style>
</head>
<body>
<header>
  <div class="wrap bar">
    <a class="logo" href="/">Weverse<span> Online Shop</span></a>
    <a class="nav" href="/showroom">Showroom</a>
  </div>
</header>
<main class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><ol>${crumbs}</ol></nav>
  <h1>${escAttr(h1)}</h1>
  ${sub ? `<p class="sub">${escAttr(sub)}</p>` : ''}
  ${cards ? `<div class="grid">${cards}</div>` : `<div class="empty">No products here yet — <a href="/showroom" style="color:#1d4ed8;font-weight:700">browse the showroom</a> while more inventory is listed.</div>`}
  ${pager || ''}
  ${related ? `<section class="related"><h2>Explore more</h2><div class="rel">${related}</div></section>` : ''}
</main>
<footer>
  <div class="wrap">Weverse Online Shop — worldwide marketplace. Prices in USD. Secure checkout, buyer protection, tracked delivery worldwide.</div>
</footer>
<script>(function(){try{if(window.__wv_tracked){return}window.__wv_tracked=true;var t=new Date().toISOString().slice(0,10);var d=(window.screen&&window.screen.width<768)?'mobile':'desktop';setTimeout(function(){fetch('${MAIN_URL}/rest/v1/visitor_analytics',{method:'POST',headers:{'apikey':'${MAIN_ANON_KEY}','Authorization':'Bearer ${MAIN_ANON_KEY}','Content-Type':'application/json','Prefer':'return=minimal'},body:JSON.stringify({visit_date:t,page_views:1,unique_visitors:1,device_type:d})}).catch(function(){})},1200)}catch(e){}})();</script>
</body>
</html>
`;
}

export default async function handler(req, res) {
  try {
    const url = new URL(req.url || '', 'https://x');
    const type = url.searchParams.get('type') || '';
    const slug = decodeURIComponent(url.searchParams.get('slug') || '').toLowerCase();
    const host = req.headers?.host || 'weverseonlineshop.com';
    const siteUrl = `https://${host}`;

    if ((type !== 'category' && type !== 'country') || !slug) {
      return notFound(res, siteUrl);
    }

    const rows = await fetchRows();
    let match;
    let label;
    let kind = type;
    if (type === 'category') {
      match = CATEGORY_HUBS.find((h) => h.slug === slug);
      if (!match) return notFound(res, siteUrl);
      label = match.label;
    } else {
      const byCountry = rows.map((r) => r.country).filter(Boolean);
      const slugs = new Set(byCountry.map(slugify));
      if (!slugs.has(slug)) return notFound(res, siteUrl);
      label = byCountry.find((c) => slugify(c) === slug) || slug;
    }

    const filtered = rows.filter((r) =>
      type === 'category'
        ? hubCategoryFor(r)?.slug === slug
        : slugify(r.country || '') === slug
    );
    const total = filtered.length;
    if (total === 0) return notFound(res, siteUrl);

    const pageRaw = Number.parseInt(url.searchParams.get('page') || '1', 10);
    const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;
    const perPage = 36;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    if (page > totalPages) return notFound(res, siteUrl);
    const startIdx = (page - 1) * perPage;
    const cap = filtered.slice(startIdx, startIdx + perPage);

    let h1 = label;
    let title;
    let desc;
    const pageSuffix = page > 1 ? ` — Page ${page}` : '';
    if (type === 'category') {
      title = `${label} — Worldwide | Weverse Online Shop${pageSuffix}`;
      desc = `Browse ${label.toLowerCase()} from around the world on Weverse Online Shop — ${total} listings and growing, all priced in USD with secure checkout, buyer protection and tracked worldwide delivery.`;
      h1 = `${label} worldwide`;
    } else {
      const cats = [];
      const seen = new Set();
      for (const r of filtered) {
        const c = hubCategoryFor(r);
        if (c && !seen.has(c.slug)) { seen.add(c.slug); cats.push(categoryNoun(c.label)); }
        if (seen.size >= 3) break;
      }
      const nouns = cats.length ? `${cats.join(' & ')} in ` : 'Marketplace in ';
      title = `${nouns}${label} | Weverse Online Shop${pageSuffix}`;
      desc = `Shop ${nouns.toLowerCase()}${label} on Weverse Online Shop — ${total} active listings, priced in USD, with secure checkout, buyer protection and tracked worldwide delivery.`;
      h1 = `${nouns}${label}`;
    }
    if (page > 1) desc = `${desc} Page ${page} of ${totalPages}.`;

    const baseCanonical = `${siteUrl}/${type === 'category' ? 'category' : 'country'}/${encodeURIComponent(slug)}`;
    const canonical = page > 1 ? `${baseCanonical}?page=${page}` : baseCanonical;
    const relPrev = page > 1 ? (page === 2 ? baseCanonical : `${baseCanonical}?page=${page - 1}`) : null;
    const relNext = page < totalPages ? `${baseCanonical}?page=${page + 1}` : null;
    const pager = totalPages > 1
      ? `<nav class="pager" aria-label="Pagination">${relPrev ? `<a rel="prev" href="${escAttr(relPrev)}">&#8592; Previous</a>` : ''}<span class="pg-num">Page ${page} of ${totalPages}</span>${relNext ? `<a rel="next" href="${escAttr(relNext)}">Next &#8594;</a>` : ''}</nav>`
      : '';
    const cards = cap.map((r) => card(r, siteUrl)).join('\n');
    const jsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: title,
          description: desc,
          url: canonical,
        },
        {
          '@type': 'ItemList',
          name: title,
          numberOfItems: cap.length,
          itemListElement: cap.slice(0, 100).map((r, i) => {
            const id = r.property_id || r.id || r.sku || '';
            return { '@type': 'ListItem', position: i + 1, name: cleanText(r.title, 200), url: `${siteUrl}/product/${encodeURIComponent(id)}` };
          }),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl + '/' },
            { '@type': 'ListItem', position: 2, name: 'Showroom', item: siteUrl + '/showroom' },
            { '@type': 'ListItem', position: 3, name: label, item: canonical },
          ],
        },
      ],
    }).replace(/<\/script/g, '<\\/script').replace(/</g, '\\u003c');

    const related = [];
    const cats = [];
    for (const h of CATEGORY_HUBS) {
      const n = rows.filter((r) => hubCategoryFor(r)?.slug === h.slug).length;
      if (n > 0) {
        cats.push(h);
        if (type === 'category' && h.slug !== slug) related.push(`<a href="${siteUrl}/category/${h.slug}">${h.label}</a>`);
        if (type === 'country') related.push(`<a href="${siteUrl}/category/${h.slug}">${h.label}</a>`);
      }
    }
    const countrySlugs = [...new Set(rows.map((r) => r.country).filter(Boolean).map((c) => slugify(c)))].sort();
    if (type === 'category') {
      const chunk = countrySlugs.slice(0, 12);
      if (countrySlugs.length > chunk.length) related.push(`<a href="${siteUrl}/showroom">All countries</a>`);
      for (const cs of chunk) related.push(`<a href="${siteUrl}/country/${encodeURIComponent(cs)}">Products in ${cs.replace(/-/g, ' ')}</a>`);
    }
    if (type === 'country') {
      for (const h of cats) related.push(`<a href="${siteUrl}/category/${h.slug}">${h.label}</a>`);
      related.push(`<a href="${siteUrl}/showroom">Full showroom</a>`);
    }

    const body = pageHtml({
      canonical,
      title,
      desc,
      h1,
      sub: total > perPage
        ? `Showing ${startIdx + 1}&#8211;${Math.min(startIdx + perPage, total)} of ${total} active listings &middot; prices in USD &middot; illustrative entries are clearly labeled`
        : `${total} active listing${total === 1 ? '' : 's'} &middot; prices in USD &middot; illustrative entries are clearly labeled`,
      cards,
      breadcrumbs: [
        { label: 'Home', url: siteUrl + '/' },
        { label: 'Showroom', url: siteUrl + '/showroom' },
        { label: page > 1 ? `${label} · Page ${page}` : label, url: canonical },
      ],
      jsonLd,
      related: related.join(''),
      relPrev,
      relNext,
      pager,
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300, stale-while-revalidate=3600');
    res.end(body);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Server error: ' + (err && err.message ? err.message : err));
  }
}

function notFound(res, siteUrl) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Robots-Tag', 'noindex');
  res.end(`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Not found | Weverse Online Shop</title></head><body style="font-family:system-ui;padding:60px 20px;text-align:center"><h1>Collection not found</h1><p>The category or country you requested has no listings yet.</p><p><a href="${escAttr(siteUrl + '/showroom')}" style="color:#1d4ed8;font-weight:700">Browse the showroom</a></p></body></html>`);
}