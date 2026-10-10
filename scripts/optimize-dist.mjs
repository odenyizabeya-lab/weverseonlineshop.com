import { readFileSync, writeFileSync, copyFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const file = join(root, 'dist', 'index.html');
let html = readFileSync(file, 'utf8');

// Stylesheet is render-blocking: fetch it first.
html = html.replace(
  /<link rel="stylesheet"([^>]*)\/?>/,
  '<link rel="stylesheet"$1 fetchpriority="high">'
);

// Heavy data chunks are needed only after first paint / for the below-fold
// sections: deprioritize them so CSS + critical JS win bandwidth first.
html = html.replace(
  /<link rel="modulepreload"[^>]*href="([^"]*)"[^>]*>/g,
  (match, href) => {
    if (/showroom-data-|phone-data-|catalog-/.test(href) && !/catalog-hidden-store/.test(href)) {
      return match.includes('fetchpriority') ? match : match.replace(/>\s*$/, ' fetchpriority="low">');
    }
    return match;
  }
);

writeFileSync(file, html, 'utf8');

// The api/og.js serverless function serves the built details page with
// per-product Open Graph tags injected. Copy the built details.html next to
// the function so it is guaranteed to be present in the deployment's bundle
// (the og:image baked into index.html rides along in dist/ itself).
try {
  copyFileSync(join(root, 'dist', 'details.html'), join(root, 'api', 'details-static.html'));
} catch {}

// ─────────────────────────────────────────────────────────────────────────────
// Optional: serve product/showroom videos from an external host instead of
// shipping ~280 MB of .mp4 files with the Vercel deployment (that bandwidth is
// the #1 reason a free Vercel project gets paused).
//
// Resolution order:
//   1. VIDEO_PUBLIC_BASE from the environment (set it in Vercel/host env), else
//   2. video-hosting.json in the repo root (written automatically by
//      scripts/upload-videos-b2.mjs) — so a brand-new deploy works with no env.
//
// Set it to the public base URL of where the clips live — e.g. Backblaze B2,
// Supabase Storage, Cloudflare R2, Bunny, DigitalOcean Spaces or Mux. Examples:
//   VIDEO_PUBLIC_BASE=https://s3.us-west-004.backblazeb2.com/<bucket>   (B2 S3 URL)
//   VIDEO_PUBLIC_BASE=https://<ref>.supabase.co/storage/v1/object/public/videos
//   VIDEO_PUBLIC_BASE=https://cdn.yourdomain.com
//
// When neither source is set this block does nothing and relative /videos/...
// paths keep working exactly as before — it is a safe no-op by default.
let configuredBase = process.env.VIDEO_PUBLIC_BASE || '';
if (!configuredBase) {
  try {
    configuredBase = JSON.parse(readFileSync(join(root, 'video-hosting.json'), 'utf8')).publicBase || '';
  } catch {}
}
const VIDEO_BASE = configuredBase.replace(/\/+$/, '');
if (VIDEO_BASE) {
  const distDir = join(root, 'dist');
  const walk = (dir) =>
    readdirSync(dir).flatMap((name) => {
      const p = join(dir, name);
      return statSync(p).isDirectory() ? walk(p) : [p];
    });

  const rewrite = (src) =>
    src
      .replace(/(")\/videos\//g, `$1${VIDEO_BASE}/videos/`)
      .replace(/(')\/videos\//g, `$1${VIDEO_BASE}/videos/`)
      .replace(/(\()\/videos\//g, `$1${VIDEO_BASE}/videos/`)
      .replace(/(=)\/videos\//g, `$1${VIDEO_BASE}/videos/`);

  let changed = 0;
  for (const f of walk(distDir)) {
    if (!/\.(html|js|css|json|xml)$/.test(f)) continue;
    const src = readFileSync(f, 'utf8');
    if (!src.includes('/videos/')) continue;
    const out = rewrite(src);
    if (out !== src) {
      writeFileSync(f, out, 'utf8');
      changed++;
    }
  }
  console.log(`optimize-dist: rewrote /videos/ -> ${VIDEO_BASE}/videos/ in ${changed} file(s)`);
} else {
  console.log('optimize-dist: VIDEO_PUBLIC_BASE unset — videos stay relative (served by Vercel)');
}

console.log('optimize-dist ok — stylesheet high, heavy chunks low');