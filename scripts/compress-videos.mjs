// Shrink public/videos/** so they cost far less storage and egress.
//
// Uses the ffmpeg binary already bundled by the `ffmpeg-static` dependency —
// no extra install, no account, no cost. Shrinking the clips is what keeps the
// free B2 tier (10 GB storage + 3x free egress) comfortably under its limits.
//
// Usage:
//   node scripts/compress-videos.mjs            # compress in place (backs up first)
//   node scripts/compress-videos.mjs --dry      # report sizes only, change nothing
//   node scripts/compress-videos.mjs --crf=30 --height=1080
//
// Original files are copied to .video-originals/ (git-ignored) before being
// replaced, so nothing is destroyed. Re-encoding is lossy: higher --crf = smaller
// file / lower quality (default 28 is a good web balance).

import { readdirSync, statSync, mkdirSync, existsSync, copyFileSync, renameSync, unlinkSync } from 'fs';
import { join, dirname, relative, extname } from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const VIDEOS_DIR = join(root, 'public', 'videos');
const BACKUP_DIR = join(root, '.video-originals');

const arg = (name, def) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split('=')[1] : def;
};
const DRY = process.argv.includes('--dry');
const CRF = arg('crf', '28');
const HEIGHT = arg('height', '720');

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

if (!existsSync(VIDEOS_DIR)) {
  console.error(`No videos found at ${VIDEOS_DIR}.`);
  process.exit(1);
}
if (!ffmpegPath) {
  console.error('ffmpeg-static binary not found. Run: npm install');
  process.exit(1);
}

const files = walk(VIDEOS_DIR).filter((f) => /\.(mp4|mov|webm)$/i.test(f));
let before = 0;
let after = 0;

for (const f of files) {
  const size = statSync(f).size;
  before += size;
  if (DRY) {
    console.log(`  ${relative(VIDEOS_DIR, f)}  ${(size / 1048576).toFixed(2)} MB`);
    continue;
  }

  if (!existsSync(BACKUP_DIR)) mkdirSync(BACKUP_DIR, { recursive: true });
  const backup = join(BACKUP_DIR, relative(VIDEOS_DIR, f));
  if (!existsSync(backup)) {
    mkdirSync(dirname(backup), { recursive: true });
    copyFileSync(f, backup);
  }

  const out = f + '.tmp.mp4';
  const res = spawnSync(
    ffmpegPath,
    [
      '-hide_banner', '-loglevel', 'error', '-y',
      '-i', f,
      '-c:v', 'libx264', '-crf', String(CRF), '-preset', 'veryfast',
      '-vf', `scale='min(${HEIGHT},iw)':-2`,
      '-c:a', 'aac', '-b:a', '128k',
      '-movflags', '+faststart',
      out,
    ],
    { stdio: 'inherit' }
  );
  if (res.status !== 0 || !existsSync(out)) {
    console.error(`  ! failed: ${relative(VIDEOS_DIR, f)} (left original untouched)`);
    continue;
  }
  const newSize = statSync(out).size;
  if (newSize >= size) {
    console.log(`  = kept original (re-encode not smaller): ${relative(VIDEOS_DIR, f)}`);
    try { unlinkSync(out); } catch {}
    after += size;
    continue;
  }
  renameSync(out, f);
  after += newSize;
  console.log(
    `  ✓ ${relative(VIDEOS_DIR, f)}  ${(size / 1048576).toFixed(2)} -> ${(newSize / 1048576).toFixed(2)} MB`
  );
}

if (!DRY) {
  if (before > 0) {
    console.log(
      `\nTotal: ${(before / 1048576).toFixed(2)} -> ${(after / 1048576).toFixed(2)} MB` +
        ` (-${(100 - (after / before) * 100).toFixed(0)}%)`
    );
  }
  console.log(`Originals backed up in ${relative(root, BACKUP_DIR)} (git-ignored).`);
}
