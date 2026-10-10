// scripts/generate-seo.mjs — Build-time SEO artifact generator.
// Fetches the live active catalog from Supabase and writes:
//   public/sitemap.xml          — every static page + every /product/<id> URL
//   public/merchant-feed.xml    — Google Merchant Center product feed
//   public/products-index.json  — lightweight id/title/price index
// The builders live in shared/seo-builders.mjs and are shared verbatim with
// the live /sitemap.xml and /merchant-feed.xml endpoints so both can never
// drift apart. On total failure it keeps the previous generated files so a
// build can never ship an empty feed.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSitemap, buildFeed, buildIndex, collectHubs } from '../shared/seo-builders.mjs';
import { rowId } from '../shared/seo-builders.mjs';
import { MAIN_URL, MAIN_ANON_KEY } from '../shared/supabase-env.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');

async function fetchFromDb() {
  const { createClient } = await import('@supabase/supabase-js');
  const client = createClient(MAIN_URL, MAIN_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await client
    .from('showroom_listings')
    .select('id, property_id, title, description, price, currency, availability_status, stock_quantity, images, category, subcategory, brand, condition, rating, rating_count, review_count, updated_at, listing_type, sku, city, state, country, product_location')
    .eq('is_active', true)
    .order('updated_at', { ascending: false })
    .limit(5000);
  if (error) throw new Error(error.message);
  return (data || []).filter((r) => rowId(r));
}

async function main() {
  let listings = null;
  try {
    listings = await fetchFromDb();
  } catch (err) {
    console.warn('[generate-seo] DB fetch failed:', err && err.message ? err.message : err);
  }
  if (!listings || listings.length === 0) {
    console.warn('[generate-seo] no catalog available — keeping previous generated files');
    return;
  }

  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), buildSitemap(listings, collectHubs(listings)), 'utf8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'merchant-feed.xml'), buildFeed(listings), 'utf8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'products-index.json'), JSON.stringify(buildIndex(listings), null, 2), 'utf8');
  console.log(`[generate-seo] ok — ${listings.length} products → sitemap.xml, merchant-feed.xml, products-index.json`);
}

main().catch((err) => {
  console.error('[generate-seo] failed:', err && err.message ? err.message : err);
  process.exit(0);
});