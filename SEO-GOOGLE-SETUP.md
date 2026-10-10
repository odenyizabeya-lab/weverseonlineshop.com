# Weverse Online Shop — Google Setup Guide

Everything here is already deployed-infrastructure: unique `/product/<id>` URLs,
per-product SEO meta + JSON-LD `Product` schema, a server-rendered product page
(price/hero/description in the initial HTML), an XML sitemap listing every
product, and a Google Merchant Center product feed. The remaining steps need
**your Google account** — the agent cannot do them for you.

---

## 1. Generate the SEO files (done automatically on every `npm run build`)

`scripts/generate-seo.mjs` runs as the first step of `npm run build`. It queries
the live Supabase `showroom_listings` table (active rows only) and writes:

| File | Purpose |
|------|---------|
| `public/sitemap.xml` | All static pages + category/country hub pages + every `https://weverseonlineshop.com/product/<id>` URL, each with a `lastmod` |
| `public/merchant-feed.xml` | Google Merchant Center product feed (282 products, prices in USD, stock status, condition, category, brand) |
| `public/products-index.json` | Lightweight product index for tooling / fallbacks |

The sitemap now also lists the keyword landing pages Google needs to connect
search queries to products (`/category/houses`, `/category/cars`, `/category/
trucks`, `/category/phones`, `/category/electronics`) and every country hub
with at least one listing (e.g. `/country/united-states`).

On a machine without network (or with the catalog unavailable) it keeps the
previous generated files so a build never ships an empty sitemap. Verify
locally with:

```
node scripts/generate-seo.mjs
```

You can also review the current output at:
- https://weverseonlineshop.com/sitemap.xml
- https://weverseonlineshop.com/merchant-feed.xml

---

## 2. Verify your site in Google Search Console

1. Go to https://search.google.com/search-console → **Add property** →
   **URL prefix** → enter `https://weverseonlineshop.com`.
2. Choose the **HTML tag** verification method. Google gives you a token that
   goes inside a meta tag.
3. In this repo, replace the placeholder in these three files:

   ```html
   <meta name="google-site-verification" content="REPLACE_WITH_YOUR_GOOGLE_SITE_VERIFICATION_TOKEN">
   ```

   - `index.html`
   - `contact.html`
   - `details.html`

   (replace `REPLACE_WITH_YOUR_GOOGLE_SITE_VERIFICATION_TOKEN` with the token
   Google gives you), then commit and deploy. Alternative verify methods that
   need **no code change**: upload an HTML file to the site root, or add a DNS
   TXT record (recommended if you manage DNS).
4. Click **Verify**. Then submit the sitemap:

   - Go to **Sitemaps**.
   - Submit `https://weverseonlineshop.com/sitemap.xml`.
   - Expect ~297 URLs (10 static + 5 category hubs + 1+ country hubs + 282 products).

5. While there, check **URL Inspection** for a few products:
   - `https://weverseonlineshop.com/product/KCO-000018`
   - `https://weverseonlineshop.com/product/KCO-IMP-0135`
   - `https://weverseonlineshop.com/product/KCO-PX0006`

   Each should show "URL is available to Google", the JSON-LD Product +
   BreadcrumbList schema, and the product image. Also inspect a hub page
   (`/category/houses`, `/category/cars`) and run **Request Indexing** on those
   first — indexing the hubs is what gets Google to crawl every product they
   link to. No page is blocked to Googlebot (`robots.txt` allows `/product`,
   `/category`, `/country`, `/showroom`, `/details.html`; `*` is allowed).

---

## 3. Product listings in Google Shopping (Merchant Center)

1. Go to https://merchants.google.com → **Get started** → create an account
   with the store name **Weverse Online Shop** and
   `https://weverseonlineshop.com` as the website. Merchant Center requires a
   **business address** and a contact email — you must provide these.
2. Verify the website domain inside Merchant Center too (Step 2's meta tag or
   DNS method works here as well).
3. **Products → All products → Add products** → choose **Scheduled fetch** (or
   "fetch now") and point it at:

   ```
   https://weverseonlineshop.com/merchant-feed.xml
   ```

   The feed already contains `id`, `title`, `description`, `link`, `image_link`,
   `price` (USD), `availability`, `condition`, `brand`, `mpn`,
   `google_product_category` and `identifier_exists=FALSE` for every active
   product.
4. Run the **Products** review after the first fetch. Typical warnings to expect
   (and why they are safe):
   - **Missing GTIN**: correct — these are marketplace listings without UPC/EAN
     barcodes; `identifier_exists=FALSE` tells Google not to expect one.
   - **Brand / category mismatches**: the feed maps categories by keyword; you
     can refine `googleCategory()` in `scripts/generate-seo.mjs` and rebuild.

---

## 4. Optional but recommended

- **Request indexing for hubs first**: after verification, URL-inspect and
  request indexing for `/category/houses`, `/category/cars`,
  `/country/united-states`, then a handful of products. Hub pages are the
  fastest crawl path into all 282 product URLs, because every hub page links
  directly to each product and hubs interlink with each other.
- **Landing pages serve legitimately on purpose**: `/category/*` and
  `/country/*` are server-rendered from the live catalog and return `noindex`
  + 404 when empty (so Google never indexes a dead hub). Unknown product ids
  return a real 404 with `noindex,follow`, and the empty `/details.html` shell
  is `noindex` with canonical → `/showroom.html` — no soft-404s, no duplicate
  pages. Extensionless static pages (`/about`, `/privacy`, `/terms`, …) are now
  routed to their `.html` files instead of 404ing.
- **preconnect**: product pages already preconnect to `images.pexels.com`.
- **Rich result test**: paste a product URL into the Rich Results test
  (https://search.google.com/test/rich-results) to confirm the Product schema
  parses.
- **Mobile-friendly check**: product pages are served from the same responsive
  `details` template used by the app; verify in Chrome DevTools device mode.
- **Keep titles/descriptions actionable**: the search description is generated
  from each product's `description` field plus price + availability + location,
  and the `<title>` is `<product> — <location> | Weverse Online Shop`, so keep
  DB descriptions written for customers (they are).

---

## 5. Re-deploy after changes

After editing any SEO or source file, rebuild and re-upload:

```
npm run build          # regenerates sitemap/feed + fresh dist
vercel --prod          # (or push to your Vercel Git integration)
```

Then re-check https://weverseonlineshop.com/sitemap.xml and
`/merchant-feed.xml` in the browser, and hit a product URL to confirm the
SSR content + canonical are intact.