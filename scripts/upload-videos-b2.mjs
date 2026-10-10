// Upload public/videos/** to Backblaze B2 and record the public base URL.
//
// No npm dependencies — talks to Backblaze's native B2 API with global fetch.
//
// Why: the repo ships ~270 MB of .mp4 clips in public/videos. Serving them from
// a free web host (Vercel/Netlify) is the #1 reason a project gets paused for
// bandwidth.
//
// ⚠️ VERIFIED LIMITATION (2026): a Backblaze B2 bucket can only be made PUBLIC
// once the account has a payment history — b2_update_bucket returns:
//   401 {"code":"no_payment_history","message":"Account has no payment history.
//        Please make a payment before making a public bucket."}
// Private buckets only work with expiring signed URLs, which is impractical for
// a video site. So this script is usable only AFTER you have added a payment
// method to B2. The project's actual free path is Cloudflare Pages — see
// .env.example (VIDEO HOSTING section).
//
// ── One-time setup (all free, no card) ───────────────────────────────────────
//   1. Create a B2 account ...... https://www.backblaze.com/cloud-storage
//   2. Create a Bucket. Set it to PUBLIC. Copy the bucket's unique NAME and ID.
//   3. Create an Application Key with read+write access to that bucket.
//      Copy the keyID and applicationKey (shown once).
//   4. Put these in .env (git-ignored) or your shell env:
//        B2_KEY_ID=...
//        B2_APPLICATION_KEY=...
//        B2_BUCKET_ID=...
//        B2_BUCKET_NAME=...
//   5. Upload:   node scripts/upload-videos-b2.mjs
//      Then:     node scripts/upload-videos-b2.mjs --remove-local
//      (--remove-local deletes public/videos after a fully successful upload so
//       the videos stop shipping with the site. Originals remain in git history
//       and in B2, so nothing is lost.)
//
// On success it writes video-hosting.json. scripts/optimize-dist.mjs reads that
// file automatically, so a brand-new deploy serves the clips from B2 with NO
// environment variable required.

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, rmSync } from 'fs';
import { join, dirname, relative, extname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function loadEnvFile() {
  const p = join(root, '.env');
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, 'utf8').split(/\r?\n/)) {
    const m = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line);
    if (!m || process.env[m[1]] !== undefined) continue;
    let val = m[2];
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[m[1]] = val;
  }
}
loadEnvFile();

const KEY_ID = process.env.B2_KEY_ID || process.env.B2_APPLICATION_KEY_ID || '';
const APP_KEY = process.env.B2_APPLICATION_KEY || '';
const BUCKET_ID = process.env.B2_BUCKET_ID || '';
const BUCKET_NAME = process.env.B2_BUCKET_NAME || '';

const missing = [
  ['B2_KEY_ID', KEY_ID],
  ['B2_APPLICATION_KEY', APP_KEY],
  ['B2_BUCKET_ID', BUCKET_ID],
  ['B2_BUCKET_NAME', BUCKET_NAME],
].filter(([, v]) => !v).map(([k]) => k);

if (missing.length) {
  console.error('\nMissing B2 credentials: ' + missing.join(', '));
  console.error('Add them to .env (see the header of this file for setup steps).\n');
  process.exit(1);
}

const REMOVE_LOCAL = process.argv.includes('--remove-local');
const VIDEOS_DIR = join(root, 'public', 'videos');
const PUBLIC_DIR = join(root, 'public');
const CONFIG_FILE = join(root, 'video-hosting.json');

const CONTENT_TYPES = {
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

async function authorize() {
  const basic = Buffer.from(`${KEY_ID}:${APP_KEY}`).toString('base64');
  const res = await fetch('https://api.backblazeb2.com/b2api/v2/b2_authorize_account', {
    headers: { Authorization: `Basic ${basic}` },
  });
  if (!res.ok) throw new Error(`authorize failed ${res.status}: ${await res.text()}`);
  return res.json();
}

async function getUploadUrl(apiUrl, token) {
  const res = await fetch(`${apiUrl}/b2api/v2/b2_get_upload_url`, {
    method: 'POST',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ bucketId: BUCKET_ID }),
  });
  if (!res.ok) throw new Error(`get_upload_url failed ${res.status}: ${await res.text()}`);
  return res.json();
}

async function uploadFile(uploadUrl, token, key, filePath) {
  const data = readFileSync(filePath);
  const res = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      Authorization: token,
      'X-Bz-File-Name': key.split('/').map(encodeURIComponent).join('/'),
      'Content-Type': CONTENT_TYPES[extname(filePath).toLowerCase()] || 'application/octet-stream',
      'X-Bz-Content-Sha1': createHash('sha1').update(data).digest('hex'),
    },
    body: data,
  });
  if (!res.ok) throw new Error(`upload failed for ${key}: ${res.status} ${await res.text()}`);
  return res.json();
}

async function main() {
  if (!existsSync(VIDEOS_DIR)) {
    console.error(`No videos found at ${VIDEOS_DIR}. Nothing to upload.`);
    process.exit(1);
  }
  const files = walk(VIDEOS_DIR);
  if (!files.length) {
    console.error('public/videos is empty. Nothing to upload.');
    process.exit(1);
  }

  console.log(`Uploading ${files.length} file(s) to B2 bucket "${BUCKET_NAME}"...`);
  const auth = await authorize();

  let ok = 0;
  for (const f of files) {
    const key = relative(PUBLIC_DIR, f).split('\\').join('/');
    const { uploadUrl, authorizationToken } = await getUploadUrl(auth.apiUrl, auth.authorizationToken);
    await uploadFile(uploadUrl, authorizationToken, key, f);
    ok++;
    console.log(`  ↑ [${ok}/${files.length}] ${key}`);
  }

  const publicBase = `${auth.downloadUrl}/file/${BUCKET_NAME}`;
  writeFileSync(
    CONFIG_FILE,
    JSON.stringify(
      { provider: 'backblaze-b2', bucket: BUCKET_NAME, publicBase, updatedAt: new Date().toISOString() },
      null,
      2
    ) + '\n'
  );

  console.log(`\nDone. Uploaded ${ok}/${files.length} file(s).`);
  console.log(`Wrote ${relative(root, CONFIG_FILE)} — the build reads it automatically.\n`);
  console.log('Next:');
  console.log(`  1. (optional) set this in your host's env too: VIDEO_PUBLIC_BASE=${publicBase}`);
  console.log('  2. Rebuild:  npm run build');
  console.log('  3. Stop shipping the clips with the site:  git rm -r --cached public/videos');
  console.log('     (and add "public/videos/" to .gitignore)\n');

  if (REMOVE_LOCAL) {
    rmSync(VIDEOS_DIR, { recursive: true, force: true });
    console.log('Removed local public/videos (originals still in git history and in B2).');
  }
}

main().catch((err) => {
  console.error('\nUpload failed: ' + err.message);
  process.exit(1);
});
