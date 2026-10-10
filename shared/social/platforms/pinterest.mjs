// Pinterest adapter — official Pinterest API v5 only.
// https://developers.pinterest.com/docs/api/v5/pins/
// App review required for pins:write / board:write:secret scopes in production.

import { fetchJson, postErr } from './_utils.mjs';

export const metadata = {
  id: 'pinterest',
  label: 'Pinterest',
  capability: 'image',
  usesOAuth: true,
  officialDocs: 'https://developers.pinterest.com/docs/api/v5',
};

export function getCredentials() {
  return {
    clientId: process.env.PINTEREST_CLIENT_ID || '',
    clientSecret: process.env.PINTEREST_CLIENT_SECRET || '',
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
    note: 'Pinterest requires app review to grant board:write:secret and pins:write.',
  };
}

const PIN_SCOPES = ['boards:read', 'boards:write:secret', 'pins:read', 'pins:write', 'user_accounts:read'];

export function buildAuthUrl({ redirectUri, state }) {
  const { clientId } = getCredentials();
  const params = new URLSearchParams();
  params.set('client_id', clientId);
  params.set('redirect_uri', redirectUri);
  params.set('response_type', 'code');
  params.set('scope', PIN_SCOPES.join(','));
  params.set('state', state);
  return `https://www.pinterest.com/oauth/?${params.toString()}`;
}

export async function exchangeCode({ code, redirectUri }) {
  const { clientId, clientSecret } = getCredentials();
  const body = new URLSearchParams();
  body.set('grant_type', 'authorization_code');
  body.set('client_id', clientId);
  body.set('client_secret', clientSecret);
  body.set('code', code);
  body.set('redirect_uri', redirectUri);
  const { status, ok, body: json } = await fetchJson('https://api.pinterest.com/v5/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!ok) throw postErr(json?.message || `Pinterest token exchange failed (HTTP ${status})`, 'PIN_TOKEN_EXCHANGE', status);
  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token || null,
    tokenExpiresAt: json.expires_in ? new Date(Date.now() + json.expires_in * 1000).toISOString() : null,
  };
}

export async function refreshToken(refreshToken) {
  const { clientId, clientSecret } = getCredentials();
  const body = new URLSearchParams();
  body.set('grant_type', 'refresh_token');
  body.set('client_id', clientId);
  body.set('client_secret', clientSecret);
  body.set('refresh_token', refreshToken);
  const { status, ok, body: json } = await fetchJson('https://api.pinterest.com/v5/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!ok) throw postErr(json?.message || `Pinterest token refresh failed (HTTP ${status})`, 'PIN_REFRESH_FAILED', status);
  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token || refreshToken,
    tokenExpiresAt: json.expires_in ? new Date(Date.now() + json.expires_in * 1000).toISOString() : null,
  };
}

async function pin(path, token, options = {}) {
  const { status, ok, body } = await fetchJson(`https://api.pinterest.com/v5${path}`, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    ...options,
  });
  if (!ok) throw postErr(body?.message || body?.code || `Pinterest API error (HTTP ${status})`, 'PIN_API_ERROR', status);
  return body;
}

export async function connectFromToken({ token }) {
  const me = await pin('/user_account', token, { method: 'GET' }).catch(() => null);
  return {
    ok: true,
    profile: {
      platformUserId: me?.username || 'pinterest',
      displayName: me?.username || 'Pinterest account',
      avatarUrl: null,
    },
    note: 'Connected to Pinterest via official OAuth.',
  };
}

export async function validateConnection() {
  return { ok: true, note: 'Pinterest connection stored. Posting needs an approved app and a board id in Platform Settings.' };
}

async function listBoards(token) {
  const res = await pin('/boards?page_size=100', token, { method: 'GET' }).catch(() => null);
  return res?.items || [];
}

export async function publish({ post, account, token, settings }) {
  const media = Array.isArray(post.media) ? post.media.filter((m) => m && m.url) : [];
  const image = media.find((m) => (m.type || 'image') !== 'video');
  if (!image) throw postErr('Pinterest pins require an image.', 'PIN_NO_IMAGE');
  let boardId = settings?.config?.['pinterest_board_id'] || account?.extra?.['selected_board_id'] || post?.metadata?.['board_id'];
  if (!boardId) {
    const boards = await listBoards(token);
    boardId = boards[0]?.id || '';
  }
  if (!boardId) throw postErr('No Pinterest board available. Create a board on Pinterest and select it in Platform Settings.', 'PIN_NO_BOARD');
  const caption = String(post.caption || '').trim();
  const description = [caption, Array.isArray(post.hashtags) ? post.hashtags.join(' ') : ''].filter(Boolean).join('\n').slice(0, 500) || 'New arrival';
  const res = await pin('/pins', token, {
    method: 'POST',
    body: JSON.stringify({
      board_id: boardId,
      media_source: { source_type: 'image_url', url: image.url },
      title: caption.split('\n')[0].slice(0, 100) || 'New arrival',
      description,
      link: post?.link_url || post?.metadata?.['link_url'] || undefined,
      alt_text: caption.slice(0, 60) || 'Marketplace product',
    }).replace(/,\s*"link":undefined/, ''),
  });
  return { platformPostId: res?.id || '', platformPostUrl: res?.link || null, raw: res };
}