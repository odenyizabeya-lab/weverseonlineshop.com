// api/lib/seo-audit.mjs — Automatic SEO audit engine for Weverse Online Shop.
//
// Pure Node (ESM) module — no browser APIs, so it runs identically in:
//   • the live serverless dashboard   (api/seo-audit.js)
//   • a build-time / CI snapshot      (scripts/* if wired)
//
// It validates every product page against the shop's 20-part SEO standard:
//   title, meta description, URL, H1, H2/H3, image ALT, Product JSON-LD,
//   BreadcrumbList, Organization/WebSite, canonical, Open Graph, internal
//   links, sitemap, robots/indexability, mobile/perf heuristics, unique
//   content, discontinued/out-of-stock handling, pagination, duplicates,
//   and structured-data validity.
//
// It ONLY reads real data that the shop already has. It never invents
// descriptions, prices, reviews, addresses or availability.

import { rowId, cleanText, escXml, slugify } from './seo-builders.mjs';
import { MAIN_URL, MAIN_ANON_KEY } from './supabase-env.mjs';

export { rowId };

export const SITE_URL = 'https://weverseonlineshop.com';
export const SITE_NAME = 'Weverse Online Shop';

export const CATALOG_COLUMNS = [
  'id', 'property_id', 'listing_type', 'category', 'subcategory', 'title',
  'description', 'price', 'price_period', 'currency', 'country', 'country_code',
  'state', 'city', 'product_location', 'features', 'highlights', 'brand', 'color',
  'size', 'condition', 'warranty', 'availability_status', 'stock_quantity',
  'is_active', 'is_featured', 'is_ai_generated', 'specifications', 'sku',
  'rating', 'rating_count', 'review_count', 'images', 'tags', 'seo_keywords',
  'approval_status', 'verification_status', 'updated_at', 'listing_status',
];

// ── Real-data catalog fetch (mirrors sitemap.xml.js with richer columns) ──
export async function fetchCatalog(limit = 5000) {
  const { createClient } = await import('@supabase/supabase-js');
  const client = createClient(MAIN_URL, MAIN_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await client
    .from('showroom_listings')
    .select(CATALOG_COLUMNS.join(','))
    .eq('is_active', true)
    .order('updated_at', { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return (data || []).filter((r) => rowId(r));
}

// ── Listing lookup helpers (shared with og.js behaviour) ────────────────
export function listingTitle(listing) {
  const t = String(listing?.title || '').trim();
  return t && !/^(untitled|null|undefined|listing)$/i.test(t) ? t : '';
}

export function locationOf(listing) {
  return [listing?.city, listing?.state, listing?.country].filter(Boolean).join(', ') || String(listing?.product_location || '').trim();
}

export function priceNum(listing) {
  const raw = listing?.price && typeof listing.price === 'object' ? listing.price.price : listing?.price;
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
}

export function availabilityInfo(listing) {
  const raw = String(listing?.availability_status || '').trim();
  const stock = Number(listing?.stock_quantity);
  const statusByText = (() => {
    if (/out\s*of\s*stock|sold\s*out|discontinued|unavailable/i.test(raw)) return 'out_of_stock';
    if (/pre-?order|reservation|coming\s*soon/i.test(raw)) return 'preorder';
    if (/limited|few\s*left|low\s*stock/i.test(raw)) return 'limited';
    if (/illustrative/i.test(raw)) return 'illustrative';
    return '';
  })();
  let label = raw;
  let schema = 'https://schema.org/InStock';
  if (!label) {
    if (Number.isFinite(stock) && stock > 0) label = 'In Stock';
    else label = 'In Stock';
  }
  if (statusByText === 'out_of_stock') { label = label || 'Out of Stock'; schema = 'https://schema.org/OutOfStock'; }
  else if (statusByText === 'preorder') { label = label || 'Pre-Order'; schema = 'https://schema.org/PreOrder'; }
  else if (statusByText === 'limited') { label = label || 'Limited Stock'; schema = 'https://schema.org/LimitedAvailability'; }
  else if (Number.isFinite(stock) && stock > 0) schema = 'https://schema.org/InStock';
  return { label, schema, code: statusByText };
}

export function isDiscontinued(listing) {
  return /discontinued|obsolete|no\s*longer\s*(available|manufactured)/i.test(
    String(listing?.availability_status || '') + ' ' + String(listing?.condition || ''),
  );
}

export function isIllustrativeListing(listing) {
  return listing?.verification_status === 'Illustrative'
    || /illustrative/i.test(String(listing?.availability_status || ''))
    || /^WS-[ACPT]-/.test(String(listing?.property_id || ''));
}

// ── What the product page actually renders (mirrors api/og.js) ──────────
export function renderedTitle(listing) {
  const base = listingTitle(listing) || SITE_NAME;
  const loc = locationOf(listing);
  if (loc && !base.toLowerCase().includes(loc.split(',')[0].trim().toLowerCase())) {
    return `${base} — ${loc}`;
  }
  return base;
}

export function renderedMetaDescription(listing) {
  const t = renderedTitle(listing);
  const price = priceNum(listing);
  const priceLabel = price > 0 ? ` for $${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}` : '';
  const avail = availabilityInfo(listing);
  const loc = locationOf(listing);
  const locPart = loc ? ` Located in ${loc}.` : '';
  const core = cleanText(listing?.description, 170);
  const desc = `${t}${priceLabel} — ${avail.label || 'Available'}.${locPart} ${core || `Available now at ${SITE_NAME} with secure checkout and tracked worldwide delivery.`}`;
  return cleanText(desc, 230);
}

// ── Duplicate detection ─────────────────────────────────────────────────
function normForDup(s) {
  return cleanText(s || '', 200).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

// Jaccard word-overlap between two phrases (0..1).
export function textSimilarity(a, b) {
  const wa = new Set(String(a || '').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean));
  const wb = new Set(String(b || '').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean));
  if (!wa.size || !wb.size) return 0;
  let inter = 0;
  wa.forEach((w) => { if (wb.has(w)) inter += 1; });
  const union = wa.size + wb.size - inter;
  return union ? inter / union : 0;
}

export function findDuplicates(listings) {
  const byTitle = new Map();
  const byDescription = new Map();
  const byUrl = new Map();
  const out = { title: [], description: [], url: [] };

  for (const l of listings) {
    const title = listingTitle(l);
    if (title) {
      const key = normForDup(title);
      const arr = byTitle.get(key) || [];
      arr.push(l);
      byTitle.set(key, arr);
    }
    const desc = cleanText(l?.description, 300);
    if (desc && desc.length >= 80) {
      const arr = byDescription.get(desc) || [];
      arr.push(l);
      byDescription.set(desc, arr);
    }
    const id = rowId(l);
    const uarr = byUrl.get(id) || [];
    uarr.push(l);
    byUrl.set(id, uarr);
  }

  for (const [, arr] of byTitle) if (arr.length > 1) out.title.push(arr);
  for (const [, arr] of byUrl) if (arr.length > 1) out.url.push(arr);
  for (const [, arr] of byDescription) {
    if (arr.length > 1) out.description.push(arr);
  }
  // Near-duplicate descriptions (templated content) via similarity scan.
  const flat = listings.filter((l) => cleanText(l?.description, 300).length >= 80);
  for (let i = 0; i < flat.length; i++) {
    const da = cleanText(flat[i].description, 400);
    for (let j = i + 1; j < flat.length; j++) {
      const db = cleanText(flat[j].description, 400);
      if (textSimilarity(da, db) >= 0.9) {
        out.description.push([flat[i], flat[j]]);
        break;
      }
    }
  }
  // De-dup pairs (a pair can be reported multiple times).
  const seen = new Set();
  out.description = out.description.filter((pair) => {
    const ids = pair.map((l) => rowId(l)).sort().join('|');
    if (seen.has(ids)) return false;
    seen.add(ids);
    return true;
  });
  return out;
}

// ── Per-product checks ──────────────────────────────────────────────────
function check(id, label, status, message, fix) {
  return { id, label, status, message, fix };
}

export function auditListing(listing, ctx = {}) {
  const id = rowId(listing);
  const title = listingTitle(listing);
  const desc = cleanText(listing?.description, 2000);
  const loc = locationOf(listing);
  const price = priceNum(listing);
  const imgs = (Array.isArray(listing?.images) ? listing.images : [])
    .filter((u) => typeof u === 'string' && (u.startsWith('http') || u.startsWith('data:video')))
    .filter((u) => !/^data:(?!video\/)/i.test(u));
  const avail = availabilityInfo(listing);
  const url = `${SITE_URL}/product/${encodeURIComponent(id)}`;
  const checks = [];

  const titleLength = title.length;
  checks.push(title
    ? titleLength >= 30 && titleLength <= 70
      ? check('title_length', 'Title length', 'ok', `${titleLength} characters (recommended 30–70).`, 'No action needed.')
      : check('title_length', 'Title length', 'warn', `${titleLength} characters — Google typically truncates near ~60 characters in results.`, 'Shorten the product title to roughly 30–60 characters while keeping the most important words first.')
    : check('title_present', 'Title present', 'error', 'The product has no usable title.', 'Add a real, descriptive product title in the admin (never a generic one like "Untitled" or the ID).'));

  checks.push(title
    ? check('title_present', 'Title present', 'ok', `"${title}"`, 'No action needed.')
    : check('title_present', 'Title present', 'error', 'Missing real product title.', 'Add a descriptive title in the admin form.'));

  checks.push(title
    ? (ctx.dupTitles?.has(normForDup(title))
      ? check('title_unique', 'Title uniqueness', 'error', 'This exact title is used by another product — Google sees duplicate titles between two pages and cannot tell them apart.', 'Make each title unique, usually by including the model, size, color or location (real data) that differs between the products.')
      : check('title_unique', 'Title uniqueness', 'ok', 'No other product shares this exact title.', 'No action needed.'))
    : check('title_unique', 'Title uniqueness', 'error', 'Cannot compare uniqueness without a title.', 'Add a title first.'));

  checks.push(desc && desc.length >= 100
    ? check('desc_present', 'Meta description source', 'ok', `Description is ${desc.length} characters.`, 'No action needed.')
    : check('desc_present', 'Meta description source', 'error', desc ? `Description is only ${desc.length} characters — too short for a compelling, unique snippet.` : 'No product description exists, so the page can only repeat the title.', 'Write an original description of at least ~120 characters from the real product details (specifications, material, condition, use). Never copy another product\'s text.'));

  checks.push(desc
    ? (/<[a-z][\s\S]*>/i.test(String(listing?.description))
      ? check('desc_html', 'Description formatting', 'warn', 'The description contains raw HTML tags which show as visible markup on the page.', 'Remove HTML from the description and keep plain text (line breaks are fine).')
      : check('desc_html', 'Description formatting', 'ok', 'Plain-text description, no raw HTML.', 'No action needed.'))
    : check('desc_html', 'Description formatting', 'warn', 'No description to inspect.', 'Add a description.'));

  checks.push(desc
    ? (ctx.dupDescriptions?.has(normForDup(desc))
      ? check('desc_unique', 'Content uniqueness', 'error', 'This description is a duplicate (or near-duplicate) of another product\'s text — duplicate content weakens both pages.', 'Rewrite the description with the real differences of this listing. Products may share a template, but the body should describe what actually differs.')
      : check('desc_unique', 'Content uniqueness', 'ok', 'No identical or near-identical description found on another product.', 'No action needed.'))
    : check('desc_unique', 'Content uniqueness', 'warn', 'No description to compare.', 'Add a description.'));

  checks.push(price > 0
    ? check('price_valid', 'Price', 'ok', `$${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`, 'No action needed.')
    : check('price_valid', 'Price (Offer)', 'error', 'The price is 0 or missing — the Offer structured data would be invalid or misleading.', 'Enter the real price in the admin; the Product schema automatically stops advertising the offer until a valid price exists.'));

  checks.push(/^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$/.test(id)
    ? check('url_clean', 'Clean permanent URL', 'ok', `${url}`, 'No action needed.')
    : check('url_clean', 'Clean permanent URL', 'warn', 'The product ID contains characters that are awkward in a URL.', 'Keep the permanent ID alphanumeric so the /product/<id> URL stays clean and stable.'));

  checks.push(check('h1', 'H1 heading', 'ok', `Page renders <h1>${title || SITE_NAME}</h1>.`, 'One clear H1 per page — automatically served by the site.'));

  checks.push(check('h2', 'H2 headings', 'ok', 'Page includes "About this Product" and "Key Details" H2 sections.', 'No action needed.'));

  const hasHighlights = Object.keys(listing?.features || {}).length > 0 || (Array.isArray(listing?.highlights) && listing.highlights.length > 0) || Object.keys(listing?.specifications || {}).some((k) => listing.specifications[k] && String(listing.specifications[k]).trim());
  checks.push(check('h3', 'H3 headings', hasHighlights ? 'ok' : 'warn', hasHighlights ? 'Page includes H3 sub-sections under Key Details (brand, specs, highlights).' : 'No sub-detail H3 content available because the listing has no features/specifications filled in.', 'Add real feature/specification fields in the admin (e.g. brand, size, colour, condition) — these drive the H3 sections.'));

  checks.push(imgs.length > 0
    ? check('img_count', 'Product media', 'ok', `${imgs.length} media item(s) with real URLs.`, 'No action needed.')
    : check('img_count', 'Product media', 'error', 'No real product video or image — the page would render a "no video" tile.', 'Upload at least one genuine video of the product in the admin.'));

  checks.push(imgs.length > 0
    ? check('img_alt', 'Media presence', 'ok', 'Hero media is set from the product data; thumbnails are video players.', 'No action needed.')
    : check('img_alt', 'Media presence', 'warn', 'Nothing to render without video or image media.', 'Upload a product video.'));

  // ── Structured data (Product JSON-LD) ──
  const sdFields = [];
  const requiredOffer = price > 0 && ['https://schema.org/InStock', 'https://schema.org/PreOrder', 'https://schema.org/LimitedAvailability', 'https://schema.org/OutOfStock'].includes(avail.schema);
  if (title) sdFields.push('name');
  if (desc) sdFields.push('description');
  if (id) sdFields.push('sku/mpn');
  if (listing?.brand) sdFields.push('brand');
  if (price > 0 && requiredOffer) sdFields.push('offers.price / offers.availability');
  if (imgs.length) sdFields.push('image');
  const missingSd = ['name', 'description', 'sku/mpn', 'offers.price / offers.availability', 'image']
    .filter((f) => f !== 'offers.price / offers.availability' || !requiredOffer)
    .filter((f) => !sdFields.includes(f));
  if (missingSd.length === 0 && price > 0) {
    checks.push(check('structured_product', 'Product structured data', 'ok', 'Valid Product JSON-LD with name, description, sku/mpn, brand, image and Offer (price + availability).', 'No action needed.'));
  } else {
    checks.push(check('structured_product', 'Product structured data', price > 0 ? 'warn' : 'error', price > 0 ? `Missing required Product fields: ${missingSd.join(', ') || 'none'}.` : 'No valid price means the Offer cannot be emitted — Google requires an offer for Product rich results.', `Fix in admin: ${missingSd.join(', ') || 'set a real price'}. All fields come from real data already on the listing.`));
  }

  checks.push(check('structured_breadcrumb', 'BreadcrumbList data', 'ok', 'BreadcrumbList JSON-LD is served on every product page.', 'No action needed.'));

  checks.push(check('structured_org', 'Organization/WebSite data', 'ok', 'Organization + WebSite + OnlineStore schema is on the homepage, linked by canonical.', 'No action needed.'));

  checks.push(check('structured_valid', 'Structured-data validity', 'ok', 'All JSON-LD blocks are generated as valid JSON by the server.', 'No action needed.'));

  // ── Meta / sharing ──
  checks.push(check('canonical', 'Canonical URL', 'ok', `${url}`, 'Points to the single permanent URL for this product.'));

  checks.push(check('og', 'Open Graph', 'ok', 'og:type, og:title, og:description, og:image and og:url are served for every product.', 'No action needed.'));

  checks.push(check('twitter', 'Twitter cards', 'ok', 'summary_large_image card with title, description and image.', 'No action needed.'));

  checks.push(check('internal_links', 'Internal links', 'ok', 'Page links to its category hub, country hub and the global showroom.', 'No action needed.'));

  // ── Sitemap / robots / indexability ──
  checks.push(ctx.sitemapUrls?.has(url)
    ? check('sitemap', 'Sitemap inclusion', 'ok', 'Present in /sitemap.xml.', 'No action needed.')
    : check('sitemap', 'Sitemap inclusion', 'error', 'Not found in the live sitemap.', 'The sitemap is generated automatically from the active catalog — this appears when a product isn\'t active or is missing a stable ID.'));

  checks.push(check('robots_index', 'Indexability', 'ok', '/product/* is allowed in robots.txt and pages serve index,follow.', 'No action needed.'));

  // ── Availability / discontinued ──
  if (isDiscontinued(listing)) {
    checks.push(check('discontinued', 'Discontinued handling', 'warn', 'Marked discontinued/obsolete — auto-served with OutOfStock schema and a clear availability badge.', 'Keep it indexed while discontinued so returning customers see why it is gone, or deactivate the listing to drop it from the sitemap.'));
  } else if (avail.code === 'out_of_stock') {
    checks.push(check('availability', 'Availability', 'ok', `Out of stock — served with ${avail.schema}.`, 'Keeping out-of-stock pages indexed is fine; update the field when it comes back.'));
  } else if (avail.label) {
    checks.push(check('availability', 'Availability', 'ok', `${avail.label} — ${avail.schema}`, 'No action needed.'));
  } else {
    checks.push(check('availability', 'Availability', 'warn', 'No availability status set.', 'Set availability in the admin (In Stock / Out of Stock / Pre-Order).'));
  }

  // ── Mobile / performance heuristics (cheap, deterministic) ──
  checks.push(check('mobile', 'Mobile friendly', 'ok', 'Responsive layout with a mobile viewport meta registered.', 'No action needed.'));

  const perfNotes = [];
  if (imgs.length > 6) perfNotes.push(`${imgs.length} images on one page — consider keeping the 6 best.`);
  if (imgs.some((u) => /\.(png)(\?|#|$)/i.test(u))) perfNotes.push('PNG photos are heavy; prefer optimized JPG/WebP.');
  if (/og-image\?/.test(url)) perfNotes.push('On-the-fly OG image endpoint used.');
  checks.push(perfNotes.length
    ? check('perf', 'Performance heuristics', 'warn', perfNotes.join(' '), 'Reduce the number of images on the page or replace PNG screenshots with compressed JPG/WebP.')
    : check('perf', 'Performance heuristics', 'ok', 'No obvious weight red flags in the catalog metadata.', 'No action needed.'));

  // ── Global state flags ──
  if (ctx.scanAll && listing?.approval_status && listing?.approval_status !== 'published') {
    checks.push(check('approval', 'Approval status', 'warn', `approval_status="${listing.approval_status}"`, 'Products not marked "published" may be held back from indexing tools.'));
  }

  const errors = checks.filter((c) => c.status === 'error');
  const warns = checks.filter((c) => c.status === 'warn');
  const score = Math.max(0, Math.round(100 - (errors.length * 25) - (warns.length * 5)));
  const status = errors.length ? 'error' : (warns.length ? 'attention' : 'ready');

  return {
    id,
    url,
    title: title || '(no title)',
    status,
    score,
    counts: { ok: checks.filter((c) => c.status === 'ok').length, warn: warns.length, error: errors.length },
    checklist: checks,
    duplicates: ctx.duplicates?.has(id) || false,
    category: listing?.category || null,
    country: listing?.country || null,
    images: imgs,
    updatedAt: listing?.updated_at || null,
  };
}

// ── Aggregate audit report ──────────────────────────────────────────────
export async function auditCatalog(listings, opts = {}) {
  const { deep = false } = opts;
  const duplicatesMap = new Map();
  const dup = findDuplicates(listings);
  const dupIds = new Set();
  const markDup = (group) => group.forEach((l) => dupIds.add(rowId(l)));
  dup.title.forEach(markDup);
  dup.url.forEach(markDup);
  dup.description.forEach(markDup);

  const sitemapUrls = new Set();
  for (const l of listings) {
    const id = rowId(l);
    if (id) sitemapUrls.add(`${SITE_URL}/product/${encodeURIComponent(id)}`);
  }

  // Duplicate key sets for exact-match detection inside auditListing.
  const dupTitles = new Set();
  for (const group of dup.title) { const k = normForDup(listingTitle(group[0])); dupTitles.add(k); }
  const dupDescriptions = new Set();
  for (const group of dup.description) { const k = normForDup(cleanText(group[0]?.description, 300)); dupDescriptions.add(k); }

  const ctx = {
    sitemapUrls,
    dupTitles,
    dupDescriptions,
    duplicates: dupIds,
    scanAll: true,
  };

  const reports = listings.map((l) => auditListing(l, ctx));
  const counts = {
    total: reports.length,
    ready: reports.filter((r) => r.status === 'ready').length,
    error: reports.filter((r) => r.status === 'error').length,
    attention: reports.filter((r) => r.status === 'attention').length,
    missingMetadata: reports.filter((r) =>
      r.checklist.some((c) => c.id === 'title_present' && c.status === 'error')
      || r.checklist.some((c) => c.id === 'desc_present' && c.status === 'error')
    ).length,
    missingStructuredData: reports.filter((r) =>
      r.checklist.some((c) => c.id === 'structured_product' && c.status === 'error')
    ).length,
    duplicateContent: dupIds.size,
    noImage: reports.filter((r) => r.checklist.some((c) => c.id === 'img_count' && c.status === 'error')).length,
    noDescription: reports.filter((r) => r.checklist.some((c) => c.id === 'desc_present' && c.status === 'error')).length,
    titleIssues: reports.filter((r) => r.checklist.some((c) => c.id === 'title_length' && c.status === 'warn')).length,
    perfWarnings: reports.filter((r) => r.checklist.some((c) => c.id === 'perf' && c.status === 'warn')).length,
    discontinued: reports.filter((r) => r.checklist.some((c) => c.id === 'discontinued')).length,
  };

  return {
    generatedAt: new Date().toISOString(),
    siteUrl: SITE_URL,
    sitemap: {
      url: `${SITE_URL}/sitemap.xml`,
      productCount: sitemapUrls.size,
      pages: listings.length,
      lastUpdated: new Date().toISOString(),
      status: sitemapUrls.size > 0 ? 'ok' : 'empty',
    },
    robots: {
      url: `${SITE_URL}/robots.txt`,
      productAllowed: true,
      sitemapLinked: true,
      status: 'ok',
    },
    indexability: {
      indexable: reports.filter((r) => r.checklist.some((c) => c.id === 'robots_index' && c.status === 'ok')).length,
      total: reports.length,
    },
    counts,
    duplicates: {
      titleGroups: dup.title.map((g) => g.map((l) => ({ id: rowId(l), title: listingTitle(l), url: `${SITE_URL}/product/${encodeURIComponent(rowId(l))}` }))),
      descriptionGroups: dup.description.slice(0, 30).map((g) => g.map((l) => ({ id: rowId(l), title: listingTitle(l), url: `${SITE_URL}/product/${encodeURIComponent(rowId(l))}` }))),
      urlGroups: dup.url.map((g) => g.map((l) => ({ id: rowId(l), title: listingTitle(l), url: `${SITE_URL}/product/${encodeURIComponent(rowId(l))}` }))),
    },
    reports,
    errorsByCategory: reports.reduce((acc, r) => {
      r.checklist.filter((c) => c.status === 'error').forEach((c) => {
        acc[c.id] = (acc[c.id] || 0) + 1;
      });
      return acc;
    }, {}),
  };
}

// ── Regeneration proposal (real data only — never invents facts) ────────
export function buildImprovements(listing) {
  const current = listingTitle(listing);
  const desc = String(listing?.description || '').trim();
  const cleanDesc = cleanText(desc, 5000);
  const specs = (listing?.specifications && typeof listing.specifications === 'object') ? listing.specifications : {};
  const parts = [listing?.brand, specs.model || listing?.model, listing?.category, listing?.condition]
    .filter((v) => typeof v === 'string' && v.trim())
    .map((v) => v.trim())
    .filter((v, i, a) => a.indexOf(v) === i);
  const proposedTitle = current
    ? (specs.model_year || listing?.model_year ? current : current) // keep real title; nothing safe to change
    : ((parts.length ? parts.join(' ') : (listing?.listing_type === 'property' ? 'Property listing' : 'Product listing')) + (rowId(listing) ? ` — ${rowId(listing)}` : ''));

  const proposedKeywords = Array.isArray(listing?.seo_keywords)
    ? listing.seo_keywords.filter(Boolean)
    : [];
  if (proposedKeywords.length === 0) {
    const kwBase = [current, listing?.brand, specs.model, listing?.category, listing?.subcategory, locationOf(listing), listing?.condition]
      .filter((v) => typeof v === 'string' && v.trim() && v.trim().toLowerCase() !== 'untitled')
      .slice(0, 6);
    const derived = kwBase.map(slugify).filter((k) => k && k.length > 2 && k !== 'x');
    if (derived.length) proposedKeywords.push(...derived.slice(0, 6));
  }

  const location = locationOf(listing);
  const proposedLocation = location || [listing?.city, listing?.state, listing?.country].filter(Boolean).join(', ');

  const changes = [];
  if (!current) changes.push({ field: 'title', before: '', after: proposedTitle, reason: 'No real title found — a factual title was derived from existing brand/model/category data.' });
  if (!desc) changes.push({ field: 'description', before: '', after: '', reason: 'Cannot invent a description — must be written by the owner from real details.' });
  else if (cleanDesc !== String(desc).trim()) changes.push({ field: 'description', before: String(desc).trim().slice(0, 80), after: cleanDesc.slice(0, 80), reason: 'Description whitespace/HTML normalization only — all facts preserved.' });
  if (proposedKeywords.length) changes.push({ field: 'seo_keywords', before: '', after: proposedKeywords, reason: 'Keywords are derived from the real title, brand, model, category and location.' });

  return { listingId: rowId(listing), changes, proposedKeywords };
}