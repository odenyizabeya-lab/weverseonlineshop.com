// functions/api/social/[[path]].js — Cloudflare Pages Function for the
// /api/social/* admin group: publish, posts, accounts, status, scheduler.
// Mirrors the Vercel rewrites: ^/api/social/<x> -> /api/social/admin?__path=...
import { runVercel } from '../../../shared/cf/vercel-handler.mjs';

export async function onRequest(context) {
  const segs = context.params.path || [];
  const __path = `/api/social/${segs.join('/')}`;
  return runVercel(() => import('../../../api/social/admin.js'), context, { __path });
}