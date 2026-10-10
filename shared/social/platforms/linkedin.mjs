// LinkedIn adapter — official LinkedIn API (rest/posts) only.
// https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/
// Requires a LinkedIn app with w_member_social (and Organization API for pages).
// Approval may be required for broader access.

import { fetchJson, postErr } from './_utils.mjs';

export const metadata = {
  id: 'linkedin',
  label: 'LinkedIn',
  capability: 'all',
  usesOAuth: true,
  officialDocs: 'https://learn.microsoft.com/en-us/linkedin/',
};

export function getCredentials() {
  return {
    clientId: process.env.LINKEDIN_CLIENT_ID || '',
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
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
    note: 'LinkedIn may require app review/verification for full w_member_social production access.',
  };
}

const LI_SCOPES = ['w_member_social', 'r_liteprofile'];

export function buildAuthUrl({ redirectUri, state }) {
  const { clientId } = getCredentials();
  const params = new URLSearchParams();
  params.set('response_type', 'code');
  params.set('client_id', clientId);
  params.set('redirect_uri', redirectUri);
  params.set('state', state);
  params.set('scope', LI_SCOPES.join(' '));
  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
}

export async function exchangeCode({ code, redirectUri }) {
  const { clientId, clientSecret } = getCredentials();
  const body = new URLSearchParams();
  body.set('grant_type', 'authorization_code');
  body.set('code', code);
  body.set('redirect_uri', redirectUri);
  body.set('client_id', clientId);
  body.set('client_secret', clientSecret);
  const { status, ok, body: json } = await fetchJson('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!ok) throw postErr(json?.error_description || json?.error || `LinkedIn token exchange failed (HTTP ${status})`, 'LI_TOKEN_EXCHANGE', status);
  return {
    accessToken: json.access_token,
    refreshToken: null,
    tokenExpiresAt: json.expires_in ? new Date(Date.now() + json.expires_in * 1000).toISOString() : null,
  };
}

export async function refreshToken() {
  return null;
}

async function liGet(path, token) {
  const { status, ok, body } = await fetchJson(`https://api.linkedin.com/v2${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!ok) throw postErr(body?.message || `LinkedIn API error (HTTP ${status})`, 'LI_API_ERROR', status);
  return body;
}

export async function connectFromToken({ token }) {
  const me = await liGet('/userinfo', token).catch(async () => liGet('/me', token));
  const sub = me?.sub || me?.id || 'linkedin';
  return {
    ok: true,
    profile: {
      platformUserId: sub,
      displayName: me?.name || 'LinkedIn account',
      avatarUrl: me?.picture || null,
      extra: { person_urn: `urn:li:person:${sub}` },
    },
    note: 'Connected to LinkedIn via official OAuth.',
  };
}

export async function validateConnection() {
  return { ok: true, note: 'LinkedIn connection stored.' };
}

function buildCommentary(post) {
  const caption = String(post.caption || '').trim();
  const hashtags = Array.isArray(post.hashtags) ? post.hashtags.join(' ') : String(post.hashtags || '');
  return [caption, hashtags].filter(Boolean).join('\n').slice(0, 2200) || 'New arrival from our store';
}

export async function publish({ post, account, token }) {
  const authorUrn = account?.extra?.['person_urn'] || 'urn:li:person:' + (account?.platform_user_id || '');
  const commentary = buildCommentary(post);
  const link = post?.link_url || post?.metadata?.['link_url'];
  const media = Array.isArray(post.media) ? post.media.filter((m) => m && m.url) : [];
  const firstImage = media.find((m) => (m.type || 'image') !== 'video');

  let content = {};
  if (link && /^https?:\/\//i.test(link) && firstImage) {
    content = {
      contentEntities: [{ entityLocation: link, thumbnails: [{ image: 'urn:li:vector:(image)' }] }],
      shareMediaCategory: 'CONTENT',
    };
  } else if (firstImage) {
    const asset = await registerImageAsset(token, authorUrn, firstImage.url);
    if (asset) content = { media: [{ status: 'READY', media: asset, title: { text: 'Image' } }] };
  } else if (link && /^https?:\/\//i.test(link)) {
    content = {
      contentEntities: [{ entityLocation: link }],
      shareMediaCategory: 'CONTENT',
    };
  }

  const payload = {
    author: authorUrn,
    commentary,
    visibility: 'PUBLIC',
    distribution: { feedDistribution: 'MAIN_FEED', targetEntities: [], thirdPartyDistributionChannels: [] },
    ...(content && Object.keys(content).length ? content : { shareMediaCategory: 'NONE' }),
  };

  const { status, ok, body } = await fetchJson('https://api.linkedin.com/rest/posts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'LinkedIn-Version': '202407',
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify(payload),
  });
  if (!ok) throw postErr(body?.message || body?.serviceErrorCode || `LinkedIn API error (HTTP ${status})`, 'LI_API_ERROR', status);
  const linkId = body?.id || '';
  return {
    platformPostId: linkId || String(status),
    platformPostUrl: `https://www.linkedin.com/feed/update/${linkId}/`,
    raw: body,
  };
}

async function registerImageAsset(token, authorUrn, imageUrl) {
  try {
    const register = await fetchJson('https://api.linkedin.com/rest/assets?action=registerUpload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'X-Restli-Protocol-Version': '2.0.0' },
      body: JSON.stringify({ registerUploadRequest: { owner: authorUrn, recipes: ['urn:li:digitalmediaRecipe:feedshare-image'], serviceRelationships: [{ relationshipType: 'OWNER', identifier: 'urn:li:userGeneratedContent' }] } }),
    });
    const uploadUrl = register?.body?.value?.uploadMechanism?.['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest']?.uploadUrl;
    const asset = register?.body?.value?.asset;
    if (!uploadUrl || !asset) return null;
    const imgRes = await fetch(imageUrl, { signal: AbortSignal.timeout(60000) });
    if (!imgRes.ok) return null;
    const buffer = Buffer.from(await imgRes.arrayBuffer());
    const done = await fetch(uploadUrl, { method: 'PUT', body: buffer, signal: AbortSignal.timeout(90000) });
    done.ok && done; // HTTP 201 marks upload complete
    return asset;
  } catch (err) {
    return null;
  }
}