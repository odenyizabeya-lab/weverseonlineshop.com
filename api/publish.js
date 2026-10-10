// api/publish.js — Optional token-gated publish trigger.
// Guards all writes behind a shared secret so anonymous traffic can never
// publish rows. The primary automation is the GitHub Actions hourly workflow
// (which runs node scripts/publish.mjs --live with the Service Role key); this
// endpoint is an alternative for cron/CRON triggers carrying the publish key.
//
//   curl -X POST https://weverseonlineshop.com/api/publish \
//     -H "x-publish-key: <WEVERSE_PUBLISH_KEY>" \
//     -H "content-type: application/json" \
//     -d '{"batch":8}'

import { runPublish } from '../scripts/publish.mjs';

export default async function handler(req, res) {
  const key = req.headers?.['x-publish-key'] || '';
  const expected = process.env.WEVERSE_PUBLISH_KEY || '';
  if (!expected || key !== expected) {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ ok: false, error: 'Forbidden: missing or invalid x-publish-key.' }));
    return;
  }
  try {
    let batch = 8;
    if (req.method === 'POST' && req.body) {
      const n = Number(req.body.batch);
      if (Number.isFinite(n) && n > 0 && n <= 50) batch = n;
    } else if (req.query?.batch) {
      const n = Number(req.query.batch);
      if (Number.isFinite(n) && n > 0 && n <= 50) batch = n;
    }
    const summary = await runPublish({ live: true, batch });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ ok: true, ...summary }));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ ok: false, error: err && err.message ? err.message : String(err) }));
  }
}