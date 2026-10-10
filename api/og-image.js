// api/og-image.js — Vercel serverless function.
//
// Generates a big, properly-sized Open Graph image (1200x630) for a shared
// showroom product using the product's REAL main photo.
//
// Why: Facebook renders shared-link previews as a fixed 1.91:1 landscape card
// (1200x630). The actual product photos are portrait (e.g. 736x981), so handing
// Facebook the raw photo makes it center-crop and look small/attractive-less.
// This endpoint composites the real product main photo, fitted LARGE and UNCROPPED,
// onto a 1200x630 canvas whose background is a darkened, blurred version of the
// same product photo — clearly the product, never a website banner or a fake.
//
// Usage: /api/og-image?id=<property_id|uuid>

import sharp from 'sharp';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { writeFile, readFile, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import ffmpegPath from 'ffmpeg-static';
import { resolveFromDb } from '../shared/listing-lookup.mjs';
import { productPoster, productVideo } from '../shared/product-media.mjs';

const W = 1200;
const H = 630;
// Foreground box the product is fitted into (uncropped, centered). Sized to
// fill the ENTIRE card so the shared product shows BIG — as large as a native
// image/video post — with only a small safe margin to keep edges clean.
const FG_W = 1140;
const FG_H = 590;

function withTimeoutMs(promise, ms) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve('__timeout__'), ms);
    promise.then(
      (v) => { clearTimeout(timer); resolve(v); },
      () => { clearTimeout(timer); resolve('__timeout__'); },
    );
  });
}

function absUrl(src, origin) {
  if (!src) return '';
  if (/^(https?:|data:)/i.test(src)) return src;
  return origin + src;
}

async function fetchImageBytes(url, timeout = 12000) {
  const result = await withTimeoutMs(
    (async () => {
      const r = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'weverseonlineshop-og/1.0' } });
      if (!r.ok) throw new Error('image HTTP ' + r.status);
      const buf = Buffer.from(await r.arrayBuffer());
      if (!buf || buf.length === 0) throw new Error('empty image');
      return buf;
    })(),
    timeout,
  );
  return result === '__timeout__' ? null : result;
}

const pexec = promisify(execFile);

// Video-only products have no poster photo at all, so we extract one real
// frame from the video and use it as the share-card poster — the preview then
// shows the actual product (not the brand logo). Returns a JPEG Buffer, or null
// on any failure so the caller can fall back to the branded card safely.
async function extractVideoPoster(videoUrl, origin) {
  const url = absUrl(videoUrl, origin);
  if (!url) return null;
  try {
    const buf = await fetchImageBytes(url, 15000);
    if (!buf) return null;
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const dir = tmpdir();
    const srcP = path.join(dir, `ogvid-${id}.mp4`);
    const outP = path.join(dir, `ogframe-${id}.jpg`);
    try {
      await writeFile(srcP, buf);
      await pexec(ffmpegPath, ['-y', '-i', srcP, '-ss', '1', '-frames:v', '1', '-q:v', '3', outP], { timeout: 60000 });
      const out = await readFile(outP);
      return out && out.length ? out : null;
    } finally {
      try { await unlink(srcP); } catch {}
      try { await unlink(outP); } catch {}
    }
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  try {
    const rawId = req.query?.id || new URL(req.url || '', 'https://x').searchParams.get('id') || '';
    const id = String(Array.isArray(rawId) ? rawId[0] : rawId).trim();
    if (!id) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('missing id');
      return;
    }

    const listing = await resolveFromDb(id);
    // The poster must be a REAL photo — never an .mp4 (a video stored inside
    // images[] is handled separately, and sharp cannot decode it into a card).
    const rawImage = listing ? productPoster(listing) : '';
    const origin = 'https://' + (req.headers?.host || 'weverseonlineshop.com');
    const imgUrl = rawImage ? absUrl(rawImage, origin) : '';

    let src = null;
    if (imgUrl) {
      src = await fetchImageBytes(imgUrl);
      if (src) {
        let meta;
        try { meta = await sharp(src).metadata(); } catch { meta = null; }
        if (!meta || !meta.width || !meta.height) src = null;
      }
    }

    // Video-only products have no poster photo — extract a real frame from the
    // video so the share card shows the actual product instead of the brand logo.
    if (!src) {
      const videoUrl = listing ? productVideo(listing) : '';
      if (videoUrl) {
        src = await extractVideoPoster(videoUrl, origin);
        if (src) {
          let meta;
          try { meta = await sharp(src).metadata(); } catch { meta = null; }
          if (!meta || !meta.width || !meta.height) src = null;
        }
      }
    }

    // No usable photo OR extractable video frame (unresolvable product, broken
    // video, ffmpeg unavailable): render a bright, smooth branded poster using
    // the site brand logo instead of a blank/white frame. og:video (from og.js)
    // still lets the card play.
    if (!src) {
      let logo;
      try { logo = await fetchImageBytes(absUrl('/brand-logo.jpeg', origin)); } catch { logo = null; }
      const bg = sharp({ create: { width: W, height: H, channels: 3, background: { r: 255, g: 255, b: 255 } } })
        .flatten({ background: '#ffffff' });
      const comps = [];
      if (logo) {
        const lg = await sharp(logo).resize(FG_W, FG_H, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }).png().toBuffer();
        comps.push({ input: lg, gravity: 'center' });
      }
      const out = await bg.composite(comps).jpeg({ quality: 88, mozjpeg: true }).toBuffer();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=3600');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.end(out);
      return;
    }

    // Background: the same product photo, blurred + darkened to Cover the full
    // 1200x630 card. Keeps the preview fully product-focused (no banner).
    const bgBuff = await sharp(src)
      .resize(W, H, { fit: 'cover' })
      .blur(38)
      .modulate({ brightness: 0.76, saturation: 1.15 })
      .jpeg({ quality: 70 })
      .toBuffer();

    // Foreground: the real product image fitted (contain — neither cropped nor
    // distorted) into the centered box, as large as that box allows.
    const fg = sharp(src).resize(FG_W, FG_H, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });

    const out = await sharp(bgBuff)
      .composite([{ input: await fg.png().toBuffer(), gravity: 'center' }])
      .jpeg({ quality: 84, mozjpeg: true })
      .toBuffer();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=3600');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.end(out);
  } catch (err) {
    console.error('[og-image] error:', err && err.stack ? err.stack : err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('image generation failed');
  }
}
