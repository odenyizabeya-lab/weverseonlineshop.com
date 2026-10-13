// functions/seo-audit.js — Cloudflare Pages Function for /seo-audit.
// Mirrors the Vercel route: ^/seo-audit$ -> /api/seo-audit
import { runVercel } from '../shared/cf/vercel-handler.mjs';

export async function onRequest(context) {
  return runVercel(() => import('../api/seo-audit.js'), context);
}