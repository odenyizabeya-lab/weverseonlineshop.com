// functions/sitemap.xml.js — Cloudflare Pages Function for /sitemap.xml.
// Live sitemap built from the active catalog (mirrors api/sitemap.xml.js).

import { buildSitemap, collectHubs, rowId } from '../shared/seo-builders.mjs';
import { fetchCatalog } from '../shared/cf/supabase-rest.mjs';

const HEADERS = {
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control': 'public, max-age=600, s-maxage=600, stale-while-revalidate=3600',
  'X-Robots-Tag': 'index,follow',
};

export async function onRequest() {
  let body;
  try {
    const rows = await fetchCatalog('property_id,title,category,subcategory,listing_type,country,updated_at');
    const listings = (rows || []).filter((r) => rowId(r));
    body = buildSitemap(listings, collectHubs(listings));
  } catch (err) {
    console.error('[sitemap] error — fallback static pages only:', err && err.message ? err.message : err);
    body = buildSitemap([]);
  }
  return new Response(body, { status: 200, headers: HEADERS });
}
