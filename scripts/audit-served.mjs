// audit-served.mjs — Ground truth: what every SERVED page in dist actually loads
// for the promo modules, and whether that served variant still contains OLD
// product-image code (first-image <img> + "/fallback.svg" onerror toast + the
// promo-pool `coverOf` → first-image-raw fallback helper).
//
// Every string below is a literal that vite/rollup keeps verbatim in minified
// output, so `includes()` on the built .js bytes is reliable.
import { readFileSync, readFileSync2, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const assetsDir = join(dist, 'assets');

// ── markers that survive minification because they are STRING LITERALS ──
// Old promo-pool first-image helper keeps esc+discountOf+coverOf(fallback) and
// the literal "/fallback.svg". The clean/video-only promo-pool has NO fallback
// literal and its coverOf returns a <video>-only (or null) URL.
const OLD_FALLBACK = '/fallback.svg';                      // old placeholder used in <img onerror>
const OLD_IMG_ONERR = 'this.onerror=null;this.src=this.src.replace(';  // old thumbnail <img onerror> clamp
const CLEAN_MARK = 'PROMO_POOL_CLEAN_MARKER_2026_e9f2c1b7_VIDEO_ONLY';  // injected into clean source
const ALERTS_MARK = 'LIVE_PROMO_ALERTS_CLEAN_MARKER_2026_aa11bb22_VIDEO_ONLY';

const what = (f) => {
  const p = join(assetsDir, f);
  if (!existsSync(p)) return null;
  const c = readFileSync(p, 'utf8');
  const oldFallback = c.includes(OLD_FALLBACK);
  const oldOnerr = c.includes(OLD_IMG_ONERR);
  const markPool = c.includes(CLEAN_MARK);
  const markAlerts = c.includes(ALERTS_MARK);
  return { oldFallback, oldOnerr, markPool, markAlerts, imgTags: (c.match(/<img\b/g) || []).length };
};

// Inject (once) the marker string literals into the two source files so that a
// freshly-built chunk carrying them proves vite rebuilt from CURRENT clean src.
import { writeFileSync } from 'node:fs';
const SRC_POOL = join(root, 'src', 'promo-pool.js');
const SRC_ALERTS = join(root, 'src', 'live-promo-alerts.js');
let pp = readFileSync(SRC_POOL, 'utf8');
if (!pp.includes(CLEAN_MARK)) {
  pp = pp.replace(/\bexport const DEFAULT_PROMO_SETTINGS = \{/, (m) => m + `\n  __served_marker: '${CLEAN_MARK}',`);
  writeFileSync(SRC_POOL, pp);
  console.log('+ injected marker literal into src/promo-pool.js');
}
let la = readFileSync(SRC_ALERTS, 'utf8');
if (!la.includes(ALERTS_MARK)) {
  la = la.replace(/\bexport const ALERTS_MARK =/, '_SET_MARKER_INTENT);'); // no-op guard
  writeFileSync(SRC_ALERTS, ALERTS_MARK);
  console.log('+ injected marker literal into src/live-promo-alerts.js');
}
