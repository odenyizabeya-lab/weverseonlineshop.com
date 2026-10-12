// functions/product/[[id]].js — Cloudflare Pages Function for /product/<id>.
// Mirrors the Vercel route: ^/product/([^/]+)$ -> /api/og?id=$1
// Real browsers get the fast static shell; crawlers/social get full SSR.

import { renderProductPage } from '../../shared/cf/product-page.mjs';

const SITE_URL = 'https://weverseonlineshop.com';

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const match = /^\/product\/([^/]+)\/?$/.exec(url.pathname);
  if (!match) {
    return Response.redirect(new URL('/showroom', url.origin).toString(), 301);
  }
  const id = decodeURIComponent(match[1]);

  const result = await renderProductPage({
    id,
    isProductPath: true,
    origin: url.origin,
    siteUrl: SITE_URL,
    userAgent: request.headers.get('user-agent') || '',
    assets: env.ASSETS,
  });

  return new Response(result.body, {
    status: result.status,
    headers: {
      'Content-Type': result.contentType || 'text/html; charset=utf-8',
      ...(result.cacheControl ? { 'Cache-Control': result.cacheControl } : {}),
    },
  });
}
