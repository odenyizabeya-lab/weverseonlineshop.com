// TikTok adapter — official TikTok for Business / TikTok Web OAuth API only.
// https://developers.tiktok.com  |  https://developers.tiktok.com/doc/web-oauth2
//
// - OAuth2 authorization_code + refresh_token (user access tokens)
// - user.info.basic profile read
// - Content Posting API: video publish (init -> upload -> fetch -> status)
// - Photo Mode: photo publish (init -> fetch -> status)
// - No password collection, no scraping, no unofficial bots.

import { fetchJson, pick, postErr } from './_utils.mjs';

const BASE = 'https://open.tiktokapis.com';
const AUTH_URL = 'https://www.tiktok.com/v2/auth/authorize/';

export const metadata = {
  id: 'tiktok',
  label: 'TikTok',
  capability: 'video',
  usesOAuth: true,
  officialDocs: 'https://developers.tiktok.com/doc/web-oauth2',
};

export function getCredentials() {
  return {
    clientKey: process.env.TIKTOK_CLIENT_KEY || process.env.TIKTOK_CLIENT_ID || '',
    clientSecret: process.env.TIKTOK_CLIENT_SECRET || '',
  };
}

export function oauthAvailable() {
  const { clientKey, clientSecret } = getCredentials();
  return Boolean(clientKey && clientSecret);
}

export function requirements() {
  const konfigured = oauthAvailable();
  return {
    configured: konfigured,
    requiresApproval: false,
    note: konfigured
      ? 'Posting permissions are granted through the official TikTok Developer Portal when your app is approved.'
      : 'Set TIKTOK_CLIENT_KEY and TIKTOK_CLIENT_SECRET server environment variables, then connect below.',
  };
}

const DEFAULT_SCOPES = ['user.info.basic', 'video.upload', 'video.publish'];

export function buildAuthUrl({ redirectUri, state }) {
  const { clientKey } = getCredentials();
  const params = new URLSearchParams();
  params.set('client_key', clientKey);
  params.set('scope', DEFAULT_SCOPES.join(','));
  params.set('response_type', 'code');
  params.set('redirect_uri', redirectUri);
  params.set('state', state);
  return `${AUTH_URL}?${params.toString()}`;
}

export async function exchangeCode({ code, redirectUri }) {
  const { clientKey, clientSecret } = getCredentials();
  const body = new URLSearchParams();
  body.set('client_key', clientKey);
  body.set('client_secret', clientSecret);
  body.set('code', code);
  body.set('grant_type', 'authorization_code');
  body.set('redirect_uri', redirectUri);
  const { status, ok, body: json } = await fetchJson(`${BASE}/v2/oauth/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!ok) {
    const msg = json?.error ? `${json.error}: ${json.error_description || ''}` : `TikTok token exchange failed (HTTP ${status})`;
    throw postErr(msg, 'TIKTOK_TOKEN_EXCHANGE', status);
  }
  if (!json.access_token) throw postErr('TikTok did not return an access token.', 'TIKTOK_NO_TOKEN');
  return normalizeToken(json);
}

export async function refreshToken(refreshToken) {
  if (!refreshToken) throw postErr('No refresh token available for TikTok.', 'TIKTOK_NO_REFRESH');
  const { clientKey, clientSecret } = getCredentials();
  const body = new URLSearchParams();
  body.set('client_key', clientKey);
  body.set('client_secret', clientSecret);
  body.set('grant_type', 'refresh_token');
  body.set('refresh_token', refreshToken);
  const { status, ok, body: json } = await fetchJson(`${BASE}/v2/oauth/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!ok) {
    const msg = json?.error ? `${json.error}: ${json.error_description || ''}` : `TikTok token refresh failed (HTTP ${status})`;
    throw postErr(msg, 'TIKTOK_REFRESH_FAILED', status);
  }
  return normalizeToken(json);
}

function normalizeToken(token) {
  const scope = String(token.scope || '').split(',').filter(Boolean);
  const now = Date.now();
  return {
    accessToken: token.access_token,
    refreshToken: token.refresh_token || null,
    tokenExpiresAt: token.expires_in ? new Date(now + token.expires_in * 1000).toISOString() : null,
    refreshTokenExpiresAt: token.refresh_expires_in ? new Date(now + token.refresh_expires_in * 1000).toISOString() : null,
    openId: token.open_id || null,
    scopes: scope,
  };
}

export async function getProfile(accessToken) {
  const { status, ok, body } = await fetchJson(
    `${BASE}/v2/user/info/?fields=open_id,union_id,avatar_url,display_name,avatar_url_100`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  if (!ok) {
    const msg = body?.error?.code === 'ok' ? 'TikTok profile request failed.' : (body?.error?.message || `TikTok profile request failed (HTTP ${status}).`);
    throw postErr(msg, 'TIKTOK_PROFILE', status);
  }
  const user = body?.data?.user || {};
  return {
    platformUserId: user.open_id || null,
    displayName: user.display_name || 'TikTok account',
    avatarUrl: user.avatar_url || user.avatar_url_100 || null,
    scopes: [],
  };
}

export async function validateConnection(accessToken) {
  const profile = await getProfile(accessToken);
  return {
    ok: true,
    profile,
    note: 'Connected to TikTok through the official OAuth flow.',
  };
}

function privacyLevel(settings, post) {
  const override = post?.metadata?.['tiktok_privacy_level'];
  const fromCfg = settings?.config?.['tiktok_privacy_level'];
  return pick(fromCfg, override, 'SELF_ONLY');
}

// Publish one post. post.media is [{url,type}]. Video requires a single video URL.
export async function publish({ post, account, settings, token }) {
  const media = Array.isArray(post.media) ? post.media.filter((m) => m && m.url) : [];
  const video = media.find((m) => (m.type || '') === 'video') || (media.length === 1 && media[0].type === 'video' ? media[0] : null);
  const photos = media.filter((m) => (m.type || 'image') !== 'video');
  const title = buildTitle(post);
  const privacy = privacyLevel(settings, post);

  if (video) {
    return publishVideo({ title, videoUrl: video.url, token, privacy });
  }
  if (photos.length) {
    return publishPhotos({ title, imageUrls: photos.map((p) => p.url), token, privacy });
  }
  throw postErr('TikTok posts require at least one video or photo.', 'TIKTOK_NO_MEDIA');
}

function buildTitle(post) {
  const caption = String(post.caption || '').trim();
  const hashtags = Array.isArray(post.hashtags) ? post.hashtags.join(' ') : String(post.hashtags || '');
  return [caption, hashtags].filter(Boolean).join('\n').trim().slice(0, 2200) || 'New arrival';
}

async function publishVideo({ title, videoUrl, token, privacy }) {
  // Step 1: init
  const initBody = {
    post_info: { title, privacy_level: privacy, is_aigc: false, disable_duet: false, disable_comment: false, disable_stitch: false },
    source_info: { source: 'PULL_FROM_URL', video_url: videoUrl, video_cover_timestamp_ms: 0 },
  };
  const init = await callPosting(`${BASE}/v2/post/publish/video/init/`, initBody, token);
  const publishId = init?.publish_id;
  if (!publishId) throw postErr('TikTok did not return a publish_id.', 'TIKTOK_NO_PUBLISH_ID');

  // Step 2: trigger processing
  await callPosting(`${BASE}/v2/post/publish/video/fetch/`, { publish_id: publishId }, token);
  await sleep(3000);

  // Step 3: poll status
  const finalStatus = await pollStatus(publishId, token, 'TIKTOK');
  if (finalStatus.status !== 'PUBLISH_COMPLETE') {
    throw postErr(finalStatus.fail_reason || `TikTok publish failed: ${finalStatus.status}`, 'TIKTOK_PUBLISH_FAILED');
  }
  return {
    platformPostId: publishId,
    platformPostUrl: null,
    raw: finalStatus,
  };
}

async function publishPhotos({ title, imageUrls, token, privacy }) {
  if (imageUrls.length > 35) imageUrls = imageUrls.slice(0, 35);
  const initBody = {
    post_info: { title, privacy_level: privacy },
    photo_cover_index: 0,
    source_info: { source: 'PULL_FROM_URL', image_urls: imageUrls },
  };
  const init = await callPosting(`${BASE}/v2/post/publish/photo/init/`, initBody, token);
  const publishId = init?.publish_id;
  if (!publishId) throw postErr('TikTok did not return a publish_id.', 'TIKTOK_NO_PUBLISH_ID');

  await callPosting(`${BASE}/v2/post/publish/photo/fetch/`, { publish_id: publishId }, token);
  await sleep(3000);

  const finalStatus = await pollStatus(publishId, token, 'TIKTOK');
  if (finalStatus.status !== 'PUBLISH_COMPLETE') {
    throw postErr(finalStatus.fail_reason || `TikTok publish failed: ${finalStatus.status}`, 'TIKTOK_PUBLISH_FAILED');
  }
  return {
    platformPostId: publishId,
    platformPostUrl: null,
    raw: finalStatus,
  };
}

async function callPosting(url, body, token) {
  const { status, ok, body: json } = await fetchJson(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const apiError = json?.error;
  if (!ok || (apiError && apiError.code !== 'ok')) {
    throw postErr(apiError?.message || `TikTok API error (HTTP ${status})`, 'TIKTOK_API_ERROR', status);
  }
  return json?.data || json || {};
}

async function pollStatus(publishId, token, platform) {
  for (let attempt = 0; attempt < 12; attempt += 1) {
    await sleep(5000); // TikTok recommends polling after a few seconds
    let json;
    try {
      json = await callPosting(`${BASE}/v2/post/publish/status/fetch/`, { publish_id: publishId }, token);
    } catch (err) {
      // transient network/logic errors: keep polling
      continue;
    }
    const status = json?.status;
    if (status === 'PUBLISH_COMPLETE') return { status, fail_reason: null };
    if (status === 'FAILED' || status === 'PUBLISH_FAILED') {
      return { status: 'FAILED', fail_reason: json?.fail_reason || json?.fail_code || 'TikTok rejected the post.' };
    }
    // PROCESSING_UPLOAD / PROCESSING_DOWNLOAD / PROCESSING_OTHER etc → keep polling
  }
  throw postErr('TikTok still processing after 60s.', 'TIKTOK_TIMEOUT');
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}