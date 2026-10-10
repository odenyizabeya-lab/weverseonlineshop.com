// WhatsApp adapter — official WhatsApp Business Cloud API only.
// https://developers.facebook.com/docs/whatsapp/cloud-api
// Requires a Meta Business portfolio + WABA approved for the Cloud API and, for
// Channels, the Channels feature. Posting to individual users requires an
// accepted message template or a user-initiated session.

import { fetchJson, postErr } from './_utils.mjs';

export const metadata = {
  id: 'whatsapp',
  label: 'WhatsApp Channels',
  capability: 'all',
  usesOAuth: false,
  officialDocs: 'https://developers.facebook.com/docs/whatsapp/cloud-api',
};

export function oauthAvailable() {
  return Boolean(process.env.WHATSAPP_ACCESS_TOKEN || process.env.META_ACCESS_TOKEN);
}

export function requirements() {
  const configured = oauthAvailable();
  return {
    configured,
    requiresApproval: true,
    note: 'WhatsApp Business Cloud API requires Meta business verification and app approval. Set WHATSAPP_ACCESS_TOKEN (server env var).',
  };
}

export function buildAuthUrl() {
  return null;
}

function target(account, settings) {
  return {
    phoneId: settings?.config?.['whatsapp_phone_id'] || account?.extra?.['phone_id'] || process.env.WHATSAPP_PHONE_ID || '',
    channelId: settings?.config?.['whatsapp_channel_id'] || account?.extra?.['channel_id'] || '',
    toNumber: settings?.config?.['whatsapp_recipient'] || process.env.WHATSAPP_RECIPIENT || '',
  };
}

export async function validateConnection() {
  const token = process.env.WHATSAPP_ACCESS_TOKEN || process.env.META_ACCESS_TOKEN;
  if (!token) return { ok: false, note: 'WHATSAPP_ACCESS_TOKEN not configured.' };
  return { ok: true, note: 'WhatsApp Cloud API token configured. Requires approved phone number + templates for unsolicited messaging.' };
}

export async function publish({ post, account, settings }) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN || process.env.META_ACCESS_TOKEN;
  if (!token) throw postErr('WHATSAPP_ACCESS_TOKEN is not configured.', 'WA_NOT_CONFIGURED', 501);
  const { phoneId, channelId, toNumber } = target(account, settings);

  // WhatsApp Channels broadcast (official graph message endpoint for a channel).
  if (channelId) {
    const url = `https://graph.facebook.com/v20.0/${channelId}/message`;
    const { status, ok, body } = await fetchJson(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: buildText(post) }),
    });
    if (!ok) throw postErr(body?.error?.message || `WhatsApp Channels error (HTTP ${status})`, 'WA_CHANNEL_ERROR', status);
    return { platformPostId: String(body?.id || ''), platformPostUrl: null, raw: body };
  }

  // Cloud API message to a recipient (template-based commerce flows).
  if (!phoneId) throw postErr('WhatsApp phone id is not configured (Platform Settings → WhatsApp).', 'WA_NO_PHONE_ID');
  if (!toNumber) throw postErr('WhatsApp recipient number is not configured (Platform Settings → WhatsApp).', 'WA_NO_RECIPIENT');

  const media = Array.isArray(post.media) ? post.media.filter((m) => m && m.url) : [];
  const image = media.find((m) => (m.type || 'image') !== 'video');
  const msg = image
    ? { type: 'image', image: { link: image.url, caption: buildText(post) } }
    : { type: 'text', text: { body: buildText(post).slice(0, 4096), preview_url: true } };

  const body = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: toNumber,
    ...msg,
  };
  const { status, ok, body: json } = await fetchJson(`https://graph.facebook.com/v20.0/${phoneId}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!ok) throw postErr(json?.error?.message || `WhatsApp API error (HTTP ${status})`, 'WA_API_ERROR', status);
  return { platformPostId: String(json?.messages?.[0]?.id || ''), platformPostUrl: null, raw: json };
}

function buildText(post) {
  const caption = String(post.caption || '').trim();
  const hashtags = Array.isArray(post.hashtags) ? post.hashtags.join(' ') : String(post.hashtags || '');
  const link = post?.link_url || post?.metadata?.['link_url'];
  return [caption, hashtags, link && /^https?:\/\//i.test(link) ? link : undefined].filter(Boolean).join('\n') || 'New arrival from our store';
}