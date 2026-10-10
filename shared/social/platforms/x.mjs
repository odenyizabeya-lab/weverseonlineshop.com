// X (Twitter) adapter — official X API v2 (and v1.1 media upload) only.
// https://developer.x.com/en/docs/x-api/tweets
// Requires a developer app with OAuth2 + write. App review needed for most
// production posting.

import { fetchJson, postErr } from './_utils.mjs';

export const metadata = {
  id: 'x',
  label: 'X (Twitter)',
  capability: 'all',
  usesOAuth: true,
  officialDocs: 'https://developer.x.com/docs',
};

export function getCredentials() {
  return {
    clientId: process.env.X_CLIENT_ID || process.env.TWITTER_CLIENT_ID || '',
    clientSecret: process.env.X_CLIENT_SECRET || process.env.TWITTER_CLIENT_SECRET || '',
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
    note: 'X developer apps need app review before production posting is available to the public.',
  };
}

const X_SCOPES = ['tweet.read', 'tweet.write', 'users.read', 'offline.access'];

export function buildAuthUrl({ redirectUri, state }) {
  const { clientId } = getCredentials();
  const params = new URLSearchParams();
  params.set('client_id', clientId);
  params.set('redirect_uri', redirectUri);
  params.set('response_type', 'code');
  params.set('scope', X_SCOPES.join(' '));
  params.set('state', state);
  params.set('code_challenge', 'challenge');
  params.set('code_challenge_method', 'plain');
  return `https://x.com/i/oauth2/authorize?${params.toString()}`;
}

// NOTE: X requires PKCE. Clients using a public/confidential client code flow
// send code_verifier. We use 'plain' challenge + matching verifier here so the
// flow works without extra state. For production you should use S256 verifier.
async function oauthToken(params) {
  const { clientId, clientSecret } = getCredentials();
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const body = new URLSearchParams(params);
  const { status, ok, body: json } = await fetchJson('https://api.x.com/2/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`,
    },
    body: body.toString(),
  });
  if (!ok) throw postErr(json?.error_description || json?.error || `X token error (HTTP ${status})`, 'X_TOKEN_EXCHANGE', status);
  return json;
}

export async function exchangeCode({ code, redirectUri }) {
  const json = await oauthToken({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    code_verifier: 'challenge',
  });
  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token || null,
    tokenExpiresAt: json.expires_in ? new Date(Date.now() + json.expires_in * 1000).toISOString() : null,
  };
}

export async function refreshToken(refreshToken) {
  const json = await oauthToken({ grant_type: 'refresh_token', refresh_token: refreshToken });
  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token || refreshToken,
    tokenExpiresAt: json.expires_in ? new Date(Date.now() + json.expires_in * 1000).toISOString() : null,
  };
}

async function xApi(path, token, options = {}) {
  const { status, ok, body } = await fetchJson(`https://api.x.com/2${path}`, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    ...options,
  });
  if (!ok) throw postErr(body?.detail || body?.title || `X API error (HTTP ${status})`, 'X_API_ERROR', status);
  return body;
}

export async function getMe(accessToken) {
  const res = await xApi('/users/me', accessToken, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  }).catch(async () => {
    // /users/me lives under v2 with Bearer token attached; fallback to default.
    const r = await fetchJson('https://api.x.com/2/users/me', { headers: { Authorization: `Bearer ${accessToken}` } });
    if (!r.ok) throw postErr('Could not fetch the X profile.', 'X_PROFILE');
    return r.body;
  });
  const u = res?.data;
  return {
    platformUserId: u?.id || null,
    displayName: u?.username ? `@${u.username}` : 'X account',
    avatarUrl: null,
    extra: { name: u?.name, username: u?.username },
  };
}

export async function connectFromToken({ token }) {
  const profile = await getMe(token);
  return { ok: true, profile, note: 'Connected to X via official OAuth2.' };
}

export async function validateConnection(account) {
  return { ok: true, note: 'X connection stored. Posting requires X app approval for production.' };
}

function buildText(post, link) {
  const caption = String(post.caption || '').trim();
  const hashtags = Array.isArray(post.hashtags) ? post.hashtags.join(' ') : String(post.hashtags || '');
  const parts = [];
  if (textPart(caption)) parts.push(caption);
  if (textPart(hashtags)) parts.push(hashtags);
  if (link && /^https?:\/\//i.test(link)) parts.push(shortLink(link));
  return parts.join('\n').slice(0, 279) || 'New arrival from our store';
}

function textPart(v) {
  return v !== undefined && v !== null && String(v).trim() !== '';
}

function shortLink(url) {
  return String(url).replace(/^https?:\/\//, '').slice(0, 60);
}

export async function publish({ post, account, token }) {
  const link = post?.link_url || post?.metadata?.['link_url'];
  const text = buildText(post, link);
  const media = Array.isArray(post.media) ? post.media.filter((m) => m && m.url) : [];

  let mediaIds = [];
  if (media.length) {
    mediaIds = (await uploadMedia(media[0].url, token)).filter(Boolean);
  }

  const payload = mediaIds.length ? { text, media: { media_ids: mediaIds } } : { text };
  const res = await xApi('/tweets', token, { method: 'POST', body: JSON.stringify(payload) });
  const tweetId = res?.data?.id;
  return {
    platformPostId: tweetId,
    platformPostUrl: tweetId ? `https://x.com/i/status/${tweetId}` : null,
    raw: res,
  };
}

async function uploadMedia(url, token) {
  try {
    const srcRes = await fetch(url, { signal: AbortSignal.timeout(60000) });
    if (!srcRes.ok) return [];
    const buffer = Buffer.from(await srcRes.arrayBuffer());
    const mime = srcRes.headers.get('content-type') || (url.match(/\.(mp4|webm|mov)/i) ? 'video/mp4' : 'image/jpeg');
    const form = new FormData();
    form.append('media', new Blob([new Uint8Array(buffer)], { type: mime }), 'media');
    form.append('media_category', mime.startsWith('video') ? 'tweet_video' : 'tweet_image');
    const { status, ok, body } = await fetchJson('https://upload.twitter.com/1.1/media/upload.json', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    }, 120000);
    if (!ok || !body?.media_id_string) return [];
    return [body.media_id_string];
  } catch (err) {
    return [];
  }
}