// functions/api/social/oauth/[[step]].js — Cloudflare Pages Function for
// /api/social/oauth/start and /api/social/oauth/callback.
// Mirrors the Vercel rewrites: ^/api/social/oauth/<step> -> /api/social/oauth?__path=...
import { runVercel } from '../../../../shared/cf/vercel-handler.mjs';

export async function onRequest(context) {
  const segs = context.params.step || [];
  const __path = `/api/social/oauth/${segs.join('/')}`;
  return runVercel(() => import('../../../../api/social/oauth.js'), context, { __path });
}