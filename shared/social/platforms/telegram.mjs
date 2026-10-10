// Telegram adapter — official Telegram Bot API only.
// https://core.telegram.org/bots/api
// No OAuth: connects with a Bot token stored in a server env var +
// the destination channel/chat id stored in Platform Settings.

import { fetchJson, postErr } from './_utils.mjs';

const API = 'https://api.telegram.org/bot';

export const metadata = {
  id: 'telegram',
  label: 'Telegram',
  capability: 'all',
  usesOAuth: false,
  officialDocs: 'https://core.telegram.org/bots/api',
};

export function getBotToken() {
  return process.env.TELEGRAM_BOT_TOKEN || '';
}

export function oauthAvailable() {
  return Boolean(getBotToken());
}

export function requirements() {
  const configured = oauthAvailable();
  return {
    configured,
    requiresApproval: false,
    note: configured
      ? 'Connected by bot token. Set the destination chat/channel id in Platform Settings → Telegram.'
      : 'Set TELEGRAM_BOT_TOKEN (server env var), then connect. No app review needed for basic posting.',
  };
}

export function buildAuthUrl() {
  // No OAuth flow for Telegram — connection happens via token.
  return null;
}

async function botCall(method, payload = {}, timeoutMs = 30000) {
  const token = getBotToken();
  if (!token) throw postErr('TELEGRAM_BOT_TOKEN is not configured.', 'TELEGRAM_NOT_CONFIGURED', 501);
  const { status, ok, body } = await fetchJson(`${API}${token}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }, timeoutMs);
  if (!ok) {
    throw postErr(body?.description || `Telegram API error (HTTP ${status})`, 'TELEGRAM_API_ERROR', status);
  }
  return body?.result;
}

async function getMe() {
  const me = await botCall('getMe');
  return {
    platformUserId: String(me?.id || ''),
    displayName: me?.username ? `@${me.username}` : (me?.first_name || 'Telegram bot'),
    avatarUrl: null,
    extra: { username: me?.username, first_name: me?.first_name },
  };
}

export async function connectFromSettings(settings) {
  const profile = await getMe();
  const chatTarget = settings?.config?.['telegram_chat_id'] || settings?.config?.['chat_id'] || process.env.TELEGRAM_CHAT_ID || '';
  return {
    ok: true,
    profile,
    extra: { chat_id: String(chatTarget || '') },
    note: chatTarget
      ? `Connected via official Bot API. Posts go to chat ${chatTarget}.`
      : 'Connected via official Bot API. Set a destination chat/channel id in Platform Settings → Telegram before posting.',
  };
}

export async function validateConnection() {
  const me = await getMe();
  return {
    ok: true,
    profile: me,
    note: 'Telegram bot is reachable and healthy.',
  };
}

function chatId(account, settings) {
  return pickChat(account?.extra?.['chat_id'], settings?.config?.['telegram_chat_id'], settings?.config?.['chat_id'], process.env.TELEGRAM_CHAT_ID);
}

function pickChat(...values) {
  for (const v of values) {
    if (v !== undefined && v !== null && String(v).trim() !== '') return String(v).trim();
  }
  return '';
}

export async function publish({ post, account, settings }) {
  const target = chatId(account, settings);
  if (!target) throw postErr('No Telegram chat/channel destination configured.', 'TELEGRAM_NO_CHAT');
  const text = buildMessage(post);
  const media = Array.isArray(post.media) ? post.media.filter((m) => m && m.url) : [];
  const video = media.find((m) => (m.type || '') === 'video');
  const firstImage = media.find((m) => (m.type || 'image') !== 'video');

  const common = {
    chat_id: target,
    disable_web_page_preview: false,
  };

  if (video) {
    const r = await botCall('sendVideo', {
      ...common,
      video: video.url,
      caption: text,
      supports_streaming: true,
      has_spoiler: false,
    });
    return { platformPostId: String(r?.message_id || ''), platformPostUrl: `https://t.me/${target.replace('@', '')}`, raw: r };
  }
  if (firstImage) {
    const r = await botCall('sendPhoto', {
      ...common,
      photo: firstImage.url,
      caption: text,
    });
    return { platformPostId: String(r?.message_id || ''), platformPostUrl: `https://t.me/${target.replace('@', '')}`, raw: r };
  }
  const buttonUrl = post?.link_url || post?.metadata?.['link_url'];
  const replyMarkup = buttonUrl && /^https?:\/\//i.test(buttonUrl)
    ? { inline_keyboard: [[{ text: 'View', url: buttonUrl }]] }
    : undefined;
  const r = await botCall('sendMessage', {
    ...common,
    text,
    parse_mode: 'HTML',
    ...(replyMarkup ? { reply_markup: replyMarkup } : {}),
  });
  return { platformPostId: String(r?.message_id || ''), platformPostUrl: `https://t.me/${target.replace('@', '')}`, raw: r };
}

function buildMessage(post) {
  const caption = String(post.caption || '').trim();
  const hashtags = Array.isArray(post.hashtags) ? post.hashtags.join(' ') : String(post.hashtags || '');
  const link = post?.link_url || post?.metadata?.['link_url'];
  const parts = [];
  if (caption) parts.push(caption);
  if (link && /^https?:\/\//i.test(link)) parts.push(link);
  if (hashtags) parts.push(hashtags);
  return (parts.filter(Boolean).join('\n') || 'New arrival').slice(0, 4096);
}