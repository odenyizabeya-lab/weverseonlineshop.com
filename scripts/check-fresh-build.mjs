#!/usr/bin/env node
// STALE-BUILD GUARD.
// Fails when any source file is NEWER than the built dist output - i.e. someone
// edited src but did not rebuild before deploying. This is exactly the bug that
// previously shipped a months-old page bundle while src had moved on.
// Runs automatically at the end of `npm run build` and manually anytime via
// `npm run guard:fresh`.
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const SRC_DIRS = ['src'];
const ROOT_HTML = ['index.html', 'admin.html', 'admin-video-scanner.html'];

let newestSrc = { t: 0, f: '' };
const walk = (dir) => {
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(js|mjs|cjs|ts|tsx|jsx|css|html|json)$/.test(e.name)) {
      let t; try { t = statSync(p).mtimeMs; } catch { continue; }
      if (t > newestSrc.t) newestSrc = { t, f: p };
    }
  }
};
for (const d of SRC_DIRS) walk(join(root, d));
for (const f of ROOT_HTML) {
  const p = join(root, f);
  try { const t = statSync(p).mtimeMs; if (t > newestSrc.t) newestSrc = { t, f: p }; } catch {}
}

let newestDist = { t: 0, f: '' };
try {
  const assetsDir = join(root, 'dist', 'assets');
  for (const e of readdirSync(assetsDir)) {
    if (!/\.js$/.test(e)) continue;
    const p = join(assetsDir, e);
    const t = statSync(p).mtimeMs;
    if (t > newestDist.t) newestDist = { t, f: p };
  }
} catch {}

if (!newestDist.t) {
  console.error('[guard:fresh] FAIL - no dist/assets/*.js found. Run `npm run build` first.');
  process.exit(1);
}
if (newestSrc.t > newestDist.t) {
  console.error('[guard:fresh] FAIL - STALE BUILD DETECTED.');
  console.error(`  newest source file : ${newestSrc.f}`);
  console.error(`  newest dist bundle : ${newestDist.f}`);
  console.error('  Source changed AFTER the last build. Run `npm run build`, then commit and redeploy the new dist/.');
  process.exit(1);
}
console.log(`[guard:fresh] OK - dist bundles are newer than every source file (last source change: ${newestSrc.f || 'none'}).`);
