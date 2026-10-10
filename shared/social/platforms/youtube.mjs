// YouTube adapter — official Google YouTube Data API v3 (upload) only.
// https://developers.google.com/youtube/v3/docs/videos/insert
// Requires a Google Cloud project with YouTube Data API v3 enabled + OAuth
// consent (scopes: youtube.upload, youtube.readonly). Verification may be
// required for large uploads / full verification warnings.

import { fetchJson, postErr } from './_utils.mjs';

export const metadata = {
  id: 'youtube',
  label: 'YouTube',
  capability: 'video',
  usesOAuth: true,
  officialDocs: 'https://developers.google.com/youtube/v3',
};

export function getCredentials() {
  return {
    clientId: process.env.GOOGLE_CLIENT_ID || process.env.YT_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || process.env.YT_CLIENT_SECRET || '',
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
    note: 'Requires a Google Cloud project with the YouTube Data API v3 enabled. Google may require access verification depending on account status.',
  };
}

const YT_SCOPES = ['https://www.googleapis.com/auth/youtube.upload', 'https://www.googleapis.com/auth/youtube.readonly'];

export function buildAuthUrl({ redirectUri, state }) {
  const { clientId } = getCredentials();
  const params = new URLSearchParams();
  params.set('client_id', clientId);
  params.set('redirect_uri', redirectUri);
  params.set('response_type', 'code');
  params.set('scope', YT_SCOPES.join(' '));
  params.set('state', state);
  params.set('access_type', 'offline');
  params.set('prompt', 'consent');
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function exchangeCode({ code, redirectUri }) {
  const { clientId, clientSecret } = getCredentials();
  const body = new URLSearchParams();
  body.set('client_id', clientId);
  body.set('client_secret', clientSecret);
  body.set('code', code);
  body.set('grant_type', 'authorization_code');
  body.set('redirect_uri', redirectUri);
  const { status, ok, body: json } = await fetchJson('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!ok) throw postErr(json?.error_description || `YouTube token exchange failed (HTTP ${status})`, 'YT_TOKEN_EXCHANGE', status);
  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token || null,
    tokenExpiresAt: json.expires_in ? new Date(Date.now() + json.expires_in * 1000).toISOString() : null,
  };
}

export async function refreshToken(refreshToken) {
  if (!refreshToken) throw postErr('No YouTube refresh token stored.', 'YT_NO_REFRESH');
  const { clientId, clientSecret } = getCredentials();
  const body = new URLSearchParams();
  body.set('client_id', clientId);
  body.set('client_secret', clientSecret);
  body.set('refresh_token', refreshToken);
  body.set('grant_type', 'refresh_token');
  const { status, ok, body: json } = await fetchJson('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!ok) throw postErr(json?.error_description || `YouTube token refresh failed (HTTP ${status})`, 'YT_REFRESH_FAILED', status);
  return {
    accessToken: json.access_token,
    refreshToken,
    tokenExpiresAt: json.expires_in ? new Date(Date.now() + json.expires_in * 1000).toISOString() : null,
  };
}

async function yt(path, token, options = {}) {
  const { status, ok, body } = await fetchJson(`https://youtube.googleapis.com/youtube/v3/${path}`, {
    headers: { Authorization: `Bearer ${token}`, ...(options.headers || {}) },
    ...options,
  }, 120000);
  if (!ok) throw postErr(body?.error?.message || `YouTube API error (HTTP ${status})`, 'YT_API_ERROR', status);
  return body;
}

export async function getChannel(accessToken) {
  const res = await yt('channels?part=snippet&mine=true', accessToken);
  const ch = res?.items?.[0];
  if (!ch) throw postErr('No YouTube channel found on this account.', 'YT_NO_CHANNEL');
  return {
    platformUserId: ch.id,
    displayName: ch.snippet?.title || 'YouTube channel',
    avatarUrl: ch.snippet?.thumbnails?.default?.url || null,
  };
}

export async function connectFromToken({ token }) {
  const channel = await getChannel(token);
  return { ok: true, profile: channel, note: 'Connected to YouTube via official OAuth.' };
}

function fullCaption(post) {
  const caption = String(post.caption || '').trim();
  const hashtags = Array.isArray(post.hashtags) ? post.hashtags.join(' ') : String(post.hashtags || '');
  return [caption, hashtags].filter(Boolean).join('\n').slice(0, 5000) || 'New arrival';
}

export async function publish({ post, account, token, settings }) {
  const media = Array.isArray(post.media) ? post.media.filter((m) => m && m.url) : [];
  const video = media.find((m) => (m.type || '') === 'video');
  if (!video) throw postErr('YouTube posts require a video.', 'YT_NO_VIDEO');
  const link = post?.link_url || post?.metadata?.['link_url'];
  const description = [fullCaption(post), link && /^https?:\/\//i.test(link) ? link : undefined].filter(Boolean).join('\n');
  const title = String(post.caption || '').trim().split('\n')[0].slice(0, 100) || 'New arrival';
  const privacy = ['public', 'private', 'unlisted'].includes(settings?.config?.['youtube_privacy']) ? settings.config.youtube_privacy : 'private';

  const metadataPayload = {
    snippet: { title, description },
    status: { privacyStatus: privacy, selfDeclaredMadeForKids: false },
  };

  // Download the source video, then simple upload (official uploadType=media).
  const srcRes = await fetch(video.url, { signal: AbortSignal.timeout(120000) });
  if (!srcRes.ok) throw postErr('Could not download the source video for upload.', 'YT_MEDIA_DOWNLOAD');
  const buffer = Buffer.from(await srcRes.arrayBuffer());

  const uploadUrl = `https://youtube.googleapis.com/upload/youtube/v3/videos?uploadType=media&part=snippet,status`;
  const res = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/octet-stream',
      'Content-Length': String(buffer.length),
    },
    body: buffer,
    signal: AbortSignal.timeout(150000),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw postErr(json?.error?.message || `YouTube upload failed (HTTP ${res.status})`, 'YT_UPLOAD_FAILED', res.status);
  const videoId = json?.id;
  return {
    platformPostId: videoId,
    platformPostUrl: videoId ? `https://www.youtube.com/watch?v=${videoId}` : null,
    raw: json,
  };
}