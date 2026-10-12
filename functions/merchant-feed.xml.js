// functions/merchant-feed.xml.js — Cloudflare Pages Function for /merchant-feed.xml.
// Live Google Merchant Center feed (mirrors api/merchant-feed.xml.js).

import { buildFeed, rowId } from '../shared/seo-builders.mjs';
import { fetchCatalog } from '../shared/cf/supabase-rest.mjs';

const HEADERS = {
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control': 'public, max-age=600, s-maxage=600, stale-while-revalidate=3600',
  'X-Robots-Tag': 'index,follow',
};

export async function onRequest() {
  let body;
  try {
    const rows = await fetchCatalog('id,property_id,title,description,price,currency,availability_status,stock_quantity,images,category,brand,condition,updated_at,listing_type,sku');
    const listings = (rows || []).filter((r) => rowId(r));
    body = buildFeed(listings);
  } catch (err) {
    console.error('[merchant-feed] error — empty feed:', err && err.message ? err.message : err);
    body = buildFeed([]);
  }
  return new Response(body, { status: 200, headers: HEADERS });
}
