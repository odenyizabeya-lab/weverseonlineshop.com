// functions/country/[[slug]].js — Cloudflare Pages Function for /country/<slug>.
// Mirrors the Vercel route: ^/country/([^/]+)$ -> /api/hub?type=country&slug=$1

import { renderHubPage } from '../../shared/cf/hub-page.mjs';

const SITE_URL = 'https://weverseonlineshop.com';

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const match = /^\/country\/([^/]+)\/?$/.exec(url.pathname);
  if (!match) {
    return Response.redirect(new URL('/showroom', url.origin).toString(), 301);
  }
  const result = await renderHubPage({
    type: 'country',
    slug: decodeURIComponent(match[1]),
    page: url.searchParams.get('page'),
    siteUrl: SITE_URL,
  });
  return new Response(result.body, {
    status: result.status,
    headers: {
      'Content-Type': result.contentType || 'text/html; charset=utf-8',
      ...(result.cacheControl ? { 'Cache-Control': result.cacheControl } : {}),
    },
  });
}
