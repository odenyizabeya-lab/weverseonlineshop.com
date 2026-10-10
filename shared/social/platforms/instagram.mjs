// Instagram adapter — official Meta Graph API only.
// https://developers.facebook.com/docs/instagram-api/
// Requires: Meta app, a connected Instagram Business/Creator account linked to
// a Facebook Page, and the scopes instagram_basic + instagram_content_publish.
// App review / business verification may be required.

import { fetchJson, postErr } from './_utils.mjs';

const GRAPH = 'https://graph.facebook.com';
const V = 'v20.0';

export const metadata = {
  id: 'instagram',
  label: 'Instagram',
  capability: 'image',
  usesOAuth: true,
  officialDocs: 'https://developers.facebook.com/docs/instagram-api',
};

export function getCredentials() {
  return {
    clientId: process.env.INSTAGRAM_CLIENT_ID || process.env.FB_CLIENT_ID || '',
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || process.env.FB_CLIENT_SECRET || '',
  };
}

export function oauthAvailable() {
  const { clientId, clientSecret } = getCredentials();
  return Boolean(clientId && clientSecret);
}

export function requirements() {
  return {
    configured: oauthAvailable(),
    requiresApproval: true,
    note: 'Instagram content publishing requires a Meta app with instagram_basic + instagram_content_publish, a connected Instagram Business account and Meta review/business verification.',
  };
}

const IG_SCOPES = ['instagram_basic', 'instagram_content_publish', 'pages_show_list', 'pages_read_engagement'];

export function buildAuthUrl({ redirectUri, state }) {
  const { clientId } = getCredentials();
  const params = new URLSearchParams();
  params.set('client_id', clientId);
  params.set('redirect_uri', redirectUri);
  params.set('state', state);
  params.set('scope', IG_SCOPES.join(','));
  params.set('response_type', 'code');
  return `https://www.facebook.com/${V}/dialog/oauth?${params.toString()}`;
}

export async function exchangeCode({ code, redirectUri }) {
  const { clientId, clientSecret } = getCredentials();
  const params = new URLSearchParams();
  params.set('client_id', clientId);
  params.set('client_secret', clientSecret);
  params.set('redirect_uri', redirectUri);
  params.set('code', code);
  const { status, ok, body } = await fetchJson(`${GRAPH}/${V}/oauth/access_token?${params.toString()}`);
  if (!ok) throw postErr(body?.error?.message || `Instagram token exchange failed (HTTP ${status})`, 'IG_TOKEN_EXCHANGE', status);
  return {
    accessToken: body.access_token,
    refreshToken: null,
    tokenExpiresAt: body.expires_in ? new Date(Date.now() + body.expires_in * 1000).toISOString() : null,
  };
}

export async function refreshToken() {
  return null; // long-lived tokens via fb_exchange_token (handled in connect)
}

async function graph(path, params, token, method = 'GET', body) {
  const query = new URLSearchParams();
  if (method === 'GET' && params) for (const [k, v] of Object.entries(params)) query.set(k, String(v));
  query.set('access_token', token);
  const { status, ok, body: json } = await fetchJson(`${GRAPH}/${V}/${path}${method === 'GET' ? `?${query.toString()}` : ''}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: method === 'POST' ? JSON.stringify({ ...(body || {}), access_token: token }) : undefined,
  });
  if (!ok) throw postErr(json?.error?.message || `Instagram API error (HTTP ${status})`, 'IG_API_ERROR', status);
  return json;
}

export async function connectFromToken({ token }) {
  if (!token) throw postErr('Instagram connection requires an access token.', 'IG_NO_TOKEN');
  const pages = await graph('me/accounts', { fields: 'id,name,access_token' }, token);
  const instaPages = [];
  for (const page of pages?.data || []) {
    const bio = await graph(`/${page.id}`, { fields: 'instagram_business_account{id,username,profile_picture_url}' }, token).catch(() => null);
    if (bio?.instagram_business_account) instaPages.push({
      pageId: page.id,
      pageName: page.name,
      igUserId: bio.instagram_business_account.id,
      username: bio.instagram_business_account.username,
      avatarUrl: bio.instagram_business_account.profile_picture_url || null,
      accessToken: page.access_token,
    });
  }
  if (!instaPages.length) {
    throw postErr('No Instagram Business/Creator accounts linked to your Facebook Pages were found. Link an IG business account to a Page first.', 'IG_NO_BUSINESS');
  }
  return {
    ok: true,
    profile: {
      platformUserId: instaPages[0].igUserId,
      displayName: `@${instaPages[0].username}`,
      avatarUrl: instaPages[0].avatarUrl,
    },
    extra: { pages: instaPages },
    note: 'Connected. Choose the Instagram account under Platform Settings → Instagram before posting.',
  };
}

export async function validateConnection(account) {
  const target = pickTarget(account);
  if (!target?.igUserId) return { ok: false, note: 'No Instagram business account selected. Re-connect.' };
  const bio = await graph(`/${target.igUserId}`, { fields: 'id,username' }, target.token).catch(() => null);
  return { ok: Boolean(bio?.id), note: bio?.username ? `Connected as @${bio.username}.` : 'Token invalid — reconnect.' };
}

function pickTarget(account, settings) {
  const pages = Array.isArray(account?.extra?.['pages']) ? account.extra.pages : [];
  const chosenId = settings?.config?.['instagram_ig_user_id'] || account?.extra?.['selected_ig_user_id'];
  const chosen = pages.find((p) => String(p.igUserId) === String(chosenId)) || pages[0];
  return chosen || null;
}

function buildCaption(post) {
  const caption = String(post.caption || '').trim();
  const hashtags = Array.isArray(post.hashtags) ? post.hashtags.join(' ') : String(post.hashtags || '');
  return [caption, hashtags].filter(Boolean).join('\n').slice(0, 2200) || 'New arrival';
}

export async function publish({ post, account, settings }) {
  const target = pickTarget(account, settings);
  if (!target) throw postErr('Select an Instagram account under Platform Settings → Instagram.', 'IG_NO_ACCOUNT');
  const caption = buildCaption(post);
  const media = Array.isArray(post.media) ? post.media.filter((m) => m && m.url) : [];
  const image = media.find((m) => (m.type || 'image') !== 'video');
  if (!image) throw postErr('Instagram posts require at least one image.', 'IG_NO_IMAGE');

  const container = await graph(`/${target.igUserId}/media`, null, target.token, 'POST', {
    image_url: image.url,
    caption,
  });
  const creationId = container?.id;
  if (!creationId) throw postErr('Instagram did not return a creation_id.', 'IG_NO_CONTAINER');
  const pub = await graph(`/${target.igUserId}/media_publish`, null, target.token, 'POST', { creation_id: creationId });
  return {
    platformPostId: pub?.id || creationId,
    platformPostUrl: `https://www.instagram.com/p/${pub?.id || creationId}/`,
    raw: pub,
  };
}