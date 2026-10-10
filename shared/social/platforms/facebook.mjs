// Facebook Pages adapter — official Meta Graph API only.
// https://developers.facebook.com/docs/pages-api  |  https://developers.facebook.com/docs/graph-api
// Requires a Meta app. Publishing to a Page needs pages_manage_posts.
// Business verification may be required for larger apps.

import { fetchJson, postErr } from './_utils.mjs';

const GRAPH = 'https://graph.facebook.com';
const DIALOG = 'https://www.facebook.com/dialog/oauth';
const V = 'v20.0';

export const metadata = {
  id: 'facebook',
  label: 'Facebook Pages',
  capability: 'all',
  usesOAuth: true,
  officialDocs: 'https://developers.facebook.com/docs/graph-api',
};

export function getCredentials() {
  return {
    clientId: process.env.FB_CLIENT_ID || process.env.FACEBOOK_CLIENT_ID || '',
    clientSecret: process.env.FB_CLIENT_SECRET || process.env.FACEBOOK_CLIENT_SECRET || '',
  };
}

export function oauthAvailable() {
  const { clientId, clientSecret } = getCredentials();
  return Boolean(clientId && clientSecret);
}

export function requirements() {
  const configured = oauthAvailable();
  return {
    configured,
    requiresApproval: true,
    note: configured
      ? 'Apps publishing to Pages may need Meta review / business verification before production traffic is allowed.'
      : 'Set FB_CLIENT_ID and FB_CLIENT_SECRET server environment variables, then connect below.',
  };
}

const FB_SCOPES = ['pages_manage_posts', 'pages_read_engagement', 'public_profile'];

export function buildAuthUrl({ redirectUri, state }) {
  const { clientId } = getCredentials();
  const params = new URLSearchParams();
  params.set('client_id', clientId);
  params.set('redirect_uri', redirectUri);
  params.set('state', state);
  params.set('scope', FB_SCOPES.join(','));
  return `${DIALOG}?${params.toString()}`;
}

export async function exchangeCode({ code, redirectUri }) {
  const { clientId, clientSecret } = getCredentials();
  const params = new URLSearchParams();
  params.set('client_id', clientId);
  params.set('client_secret', clientSecret);
  params.set('redirect_uri', redirectUri);
  params.set('code', code);
  const { status, ok, body } = await fetchJson(`${GRAPH}/${V}/oauth/access_token?${params.toString()}`);
  if (!ok) throw postErr(body?.error?.message || `Facebook token exchange failed (HTTP ${status})`, 'FB_TOKEN_EXCHANGE', status);
  return {
    accessToken: body.access_token,
    refreshToken: null,
    tokenExpiresAt: body.expires_in ? new Date(Date.now() + body.expires_in * 1000).toISOString() : null,
  };
}

// Meta does not provide refresh_token; exchange the short-lived for a long-lived token.
export async function makeLongLived(shortToken) {
  const { clientId, clientSecret } = getCredentials();
  const params = new URLSearchParams();
  params.set('grant_type', 'fb_exchange_token');
  params.set('client_id', clientId);
  params.set('client_secret', clientSecret);
  params.set('fb_exchange_token', shortToken);
  const { status, ok, body } = await fetchJson(`${GRAPH}/${V}/oauth/access_token?${params.toString()}`);
  if (!ok) throw postErr(body?.error?.message || `Facebook long-lived token failed (HTTP ${status})`, 'FB_LONG_LIVED', status);
  return {
    accessToken: body.access_token,
    refreshToken: null,
    tokenExpiresAt: body.expires_in ? new Date(Date.now() + body.expires_in * 1000).toISOString() : null,
  };
}

export async function refreshToken() {
  // Long-lived tokens are renewed by re-running connectFromSettings on request
  // or by re-connecting. Page tokens refresh implicitly per Graph API v6+ TTL.
  return null;
}

async function graph(path, params, token, method = 'GET', body) {
  const query = new URLSearchParams();
  if (method === 'GET') {
    for (const [k, v] of Object.entries(params || {})) query.set(k, String(v));
  }
  query.set('access_token', token);
  const { status, ok, body: json } = await fetchJson(`${GRAPH}/${V}/${path}${method === 'GET' ? `?${query.toString()}` : ''}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: method === 'POST' ? JSON.stringify({ ...(body || {}), access_token: token }) : undefined,
  });
  if (!ok) throw postErr(json?.error?.message || `Facebook API error (HTTP ${status})`, 'FB_API_ERROR', status);
  return json;
}

// After OAuth, pull the list of Pages managed by the user. We keep the FIRST
// page (admin picks in the UI before first publish via settings.extra.page_id).
export async function listPages(accessToken) {
  const res = await graph('me/accounts', { fields: 'id,name,access_token,picture,link,tasks' }, accessToken);
  const pages = (res?.data || []).map((p) => ({
    id: p.id,
    name: p.name,
    link: p.link || null,
    picture: p.picture?.data?.url || null,
    accessToken: p.access_token || null,
  }));
  return pages;
}

export async function connectFromCode({ token } = {}) {
  if (!token) throw postErr('Facebook connection requires a token.', 'FB_NO_TOKEN');
  const pages = await listPages(token);
  if (!pages.length) throw postErr('No Pages available on this Facebook account. You must be an admin of at least one Page.', 'FB_NO_PAGES');
  const me = await graph('me', { fields: 'id,name,picture' }, token).catch(() => null);
  return {
    ok: true,
    profile: {
      platformUserId: me?.id || 'facebook',
      displayName: me?.name || 'Facebook account',
      avatarUrl: me?.picture?.data?.url || null,
    },
    extra: { pages },
    note: 'Connected. Choose a Page under Platform Settings → Facebook before posting.',
  };
}

export async function validateConnection(account) {
  const token = account?.extra?.['page_access_token'];
  if (!token) return { ok: false, note: 'No Page access token stored. Re-connect and pick a Page.' };
  const me = await graph('me', { fields: 'id,name' }, token).catch(() => null);
  return { ok: Boolean(me?.id), note: me?.name ? `Connected as Page "${me.name}".` : 'Page token no longer valid — reconnect.' };
}

function pageToken(account, settings) {
  const pageId = settings?.config?.['facebook_page_id'] || account?.extra?.['selected_page_id'];
  const page = Array.isArray(account?.extra?.['pages']) ? account.extra.pages.find((p) => String(p.id) === String(pageId)) : null;
  if (page?.accessToken) return { pageId: page.id, token: page.accessToken };
  // Fall back to the user token (rarely has page posting permission).
  return { pageId: pageId || account?.extra?.['selected_page_id'], token: null };
}

function buildText(post, link) {
  const caption = String(post.caption || '').trim();
  const hashtags = Array.isArray(post.hashtags) ? post.hashtags.join(' ') : String(post.hashtags || '');
  const parts = [];
  if (caption) parts.push(caption);
  if (hashtags) parts.push(hashtags);
  if (link && /^https?:\/\//i.test(link)) parts.push(link);
  return (parts.filter(Boolean).join('\n') || '').slice(0, 60000);
}

export async function publish({ post, account, settings, token }) {
  const { pageId, token: pageTok } = pageToken(account, settings);
  const accessToken = pageTok || token;
  if (!pageId) throw postErr('Select a Facebook Page under Platform Settings → Facebook.', 'FB_NO_PAGE');
  const link = post?.link_url || post?.metadata?.['link_url'];
  const text = buildText(post, link);
  const media = Array.isArray(post.media) ? post.media.filter((m) => m && m.url) : [];
  const video = media.find((m) => (m.type || '') === 'video');
  const firstImage = media.find((m) => (m.type || 'image') !== 'video');

  let result;
  if (video) {
    result = await graph(`${pageId}/videos`, null, accessToken, 'POST', {
      description: text,
      file_url: video.url,
      published: true,
    });
  } else if (firstImage) {
    result = await graph(`${pageId}/photos`, null, accessToken, 'POST', {
      url: firstImage.url,
      message: text,
      published: true,
    });
  } else {
    result = await graph(`${pageId}/feed`, null, accessToken, 'POST', {
      message: text,
    });
  }
  const postId = result?.id || '';
  return {
    platformPostId: postId,
    platformPostUrl: `https://www.facebook.com/${postId}`,
    raw: result,
  };
}