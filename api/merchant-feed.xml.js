// api/merchant-feed.xml.js — Live Google Merchant Center feed
// (visible at /merchant-feed.xml). Serves the current active catalog verbatim
// from Supabase so every newly auto-published listing is in the feed within
// minutes. Illustrative listings are labeled in their description / title.

import { buildFeed } from '../shared/seo-builders.mjs';
import { rowId } from '../shared/seo-builders.mjs';
import { MAIN_URL, MAIN_ANON_KEY } from '../shared/supabase-env.mjs';

let cache = { at: 0, body: null };

export default async function handler(req, res) {
  try {
    const now = Date.now();
    if (cache.body && now - cache.at < 10 * 60 * 1000) {
      return send(res, cache.body);
    }
    const { createClient } = await import('@supabase/supabase-js');
    const client = createClient(MAIN_URL, MAIN_ANON_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data, error } = await client
      .from('showroom_listings')
      .select('id, property_id, title, description, price, currency, availability_status, stock_quantity, images, category, brand, condition, updated_at, listing_type, sku')
      .eq('is_active', true)
      .order('updated_at', { ascending: false })
      .limit(5000);
    if (error) throw new Error(error.message);
    const listings = (data || []).filter((r) => rowId(r));
    const body = buildFeed(listings);
    cache = { at: now, body };
    return send(res, body);
  } catch (err) {
    console.error('[merchant-feed] error — empty feed:', err && err.message ? err.message : err);
    return send(res, buildFeed([]));
  }
}

function send(res, body) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=600, stale-while-revalidate=3600');
  res.setHeader('X-Robots-Tag', 'index,follow');
  res.statusCode = 200;
  res.end(body);
}