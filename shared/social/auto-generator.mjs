// Auto-generator — converts automation rules into concrete post rows.
// Runs inside the scheduler. Only engages when the global automation switch is
// on, the rule is enabled+not-paused, and a connected account exists.
import { getServiceClient } from './db.mjs';
import { createPost, dedupeHash } from './publish-engine.mjs';
import { getAdapter, isPlatform } from './registry.mjs';
import { siteUrl } from './db.mjs';

export async function getGlobalSettings(sb) {
  const { data } = await sb.from('social_settings').select('*').eq('id', 1).maybeSingle();
  return data || { auto_posting_enabled: false, automation_paused: false };
}

// days-of-week index for the rule (monday=0 ... sunday=6), matching JS getDay()
function ruleWeekIndexes(days) {
  if (!Array.isArray(days) || !days.length) return [1, 2, 3, 4, 5, 6, 0]; // all days
  const map = { mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 0 };
  const out = [];
  for (const d of days) {
    const idx = map[String(d).toLowerCase().slice(0, 3)];
    if (idx !== undefined) out.push(idx);
  }
  return out.length ? out : [1, 2, 3, 4, 5, 6, 0];
}

function parseTime(value, fallback = '09:00') {
  const [h, m] = String(value || fallback).split(':').map(Number);
  return { h: (Number.isFinite(h) ? h : 9) % 24, m: (Number.isFinite(m) ? m : 0) % 60 };
}

export function computeNextRun(rule) {
  const now = new Date();
  const type = rule.schedule_type || 'daily';

  if (type === 'hourly') {
    return new Date(now.getTime() + 60 * 60 * 1000);
  }
  if (type === 'interval') {
    const hours = Math.max(1, Number(rule.interval_hours) || 24);
    return new Date(now.getTime() + hours * 60 * 60 * 1000);
  }
  if (type === 'custom') {
    // custom: same time, span of N hours (default 12h window)
    const hours = Math.max(1, Number(rule.interval_hours) || 12);
    return new Date(now.getTime() + hours * 60 * 60 * 1000);
  }
  if (type === 'weekly') {
    const { h, m } = parseTime(rule.schedule_time, '08:00');
    const indexes = ruleWeekIndexes(rule.schedule_days);
    const next = nextMatchingWeekday(now, indexes, h, m, 14);
    return next;
  }
  // daily
  const { h, m } = parseTime(rule.schedule_time, '09:00');
  const indexes = ruleWeekIndexes(rule.schedule_days);
  return nextMatchingWeekday(now, indexes, h, m, 14);
}

function nextMatchingWeekday(from, indexes, h, m, maxDays) {
  const next = new Date(from);
  // If the day is allowed and the time today is still ahead, use today's slot.
  if (indexes.includes(next.getDay())) {
    const candidate = new Date(next);
    candidate.setHours(h, m, 0, 0);
    if (candidate.getTime() > from.getTime()) return candidate;
  }
  for (let i = 1; i <= (maxDays || 14); i++) {
    const d = new Date(next);
    d.setDate(next.getDate() + i);
    if (indexes.includes(d.getDay())) {
      const candidate = new Date(d);
      candidate.setHours(h, m, 0, 0);
      return candidate;
    }
  }
  // fallback: default to the same time tomorrow
  const fallback = new Date(next);
  fallback.setDate(next.getDate() + 1);
  fallback.setHours(h, m, 0, 0);
  return fallback;
}

// Check duplicate for a specific source against a platform (fresh, so the
// auto-generator can pick a new product if the current one was already posted).
async function alreadyPosted(sb, platform, contentType, sourceType, sourceId, caption) {
  const hash = dedupeHash({ platform, contentType, sourceType, sourceId, caption });
  const { data } = await sb.from('social_posts').select('id').eq('platform', platform).eq('dedupe_hash', hash).maybeSingle();
  return Boolean(data);
}

async function connectedAccount(sb, platform) {
  const { data } = await sb.from('social_accounts')
    .select('*')
    .eq('platform', platform)
    .eq('status', 'connected')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  return data || null;
}

function applyCaptionTemplate(template, context) {
  if (!template) return '';
  return String(template)
    .replace(/\{\{\s*title\s*\}\}/gi, context.title || '')
    .replace(/\{\{\s*price\s*\}\}/gi, context.price || '')
    .replace(/\{\{\s*category\s*\}\}/gi, context.category || '')
    .replace(/\{\{\s*brand\s*\}\}/gi, context.brand || '')
    .replace(/\{\{\s*site\s*\}\}/gi, context.site || '');
}

export async function runRule(rule, { sb = getServiceClient(), req } = {}) {
  const results = { generated: 0, skipped: 0, errors: [] };
  const global = await getGlobalSettings(sb);
  if (!global.auto_posting_enabled || global.automation_paused) {
    return { ...results, skipped: results.skipped + 1, reason: 'automation paused or disabled' };
  }
  if (!rule.enabled || rule.paused) {
    return { ...results, skipped: results.skipped + 1, reason: 'rule disabled/paused' };
  }

  const platforms = Array.isArray(rule.platforms) && rule.platforms.length ? rule.platforms : [];
  const baseUrl = siteUrl(req);

  // 1. resolve candidate content
  let candidate = null;
  if (rule.content_type === 'selected_products') {
    const ids = Array.isArray(rule.selected_ids) ? rule.selected_ids.slice(0, 20) : [];
    if (ids.length) {
      const { data } = await sb.from('showroom_listings').select('*').in('property_id', ids).eq('is_active', true);
      candidate = data && data.length ? data[0] : null;
      if (!candidate) return { ...results, skipped: results.skipped + 1, reason: 'no active selected product' };
    } else {
      return { ...results, skipped: results.skipped + 1, reason: 'rule has no selected products' };
    }
  } else if (rule.content_type === 'promotions') {
    const { data } = await sb.from('promotions').select('*').eq('is_active', true).order('sort_order', { ascending: true }).limit(1);
    candidate = data && data.length ? data[0] : null;
    if (!candidate) return { ...results, skipped: results.skipped + 1, reason: 'no active promotion' };
  } else if (rule.content_type === 'content_items') {
    const { data } = await sb.from('social_content_items').select('*').eq('is_active', true).order('created_at', { ascending: false }).limit(1);
    candidate = data && data.length ? data[0] : null;
    if (!candidate) return { ...results, skipped: results.skipped + 1, reason: 'no content items published yet' };
  } else {
    // products (new arrivals)
    const { data } = await sb.from('showroom_listings')
      .select('*')
      .eq('is_active', true)
      .neq('listing_type', 'property')
      .order('created_at', { ascending: false })
      .limit(30);
    candidate = (data || []).find((p) => p.images && Array.isArray(p.images) && p.images.length) || (data && data[0]) || null;
    if (!candidate) return { ...results, skipped: results.skipped + 1, reason: 'no products to post' };
  }

  for (const platform of platforms) {
    if (!isPlatform(platform)) continue;
    const adapter = getAdapter(platform);
    const account = await connectedAccount(sb, platform);
    if (!account) {
      results.errors.push(`${platform}: no connected account`);
      continue;
    }
    const ps = await getPlatformSettings(sb, platform);
    if (!ps?.enabled) {
      results.errors.push(`${platform}: platform disabled in settings`);
      continue;
    }

    const context = buildContext(candidate, rule.content_type, baseUrl);
    const sourceType = mapSourceType(rule.content_type);
    const sourceId = context.sourceId;
    const caption = rule.caption_template
      ? applyCaptionTemplate(rule.caption_template, context)
      : defaultCaption(context, rule);
    const hashtags = String(rule.hashtags || ps?.default_hashtags || '').trim();

    const dup = await alreadyPosted(sb, platform, rule.content_type, sourceType, sourceId, caption);
    if (dup) {
      results.skipped += 1;
      results.errors.push(`${platform}: content already posted (dedupe)`);
      continue;
    }

    try {
      const needsApproval = global.require_approval || String(rule.approval_mode || 'auto') === 'manual';
      await createPost({
        platform,
        platformAccountId: account.id,
        contentType: rule.content_type,
        sourceType,
        sourceId,
        caption,
        hashtags,
        media: context.media,
        autoGenerated: true,
        metadata: { rule_id: rule.id, link_url: context.linkUrl },
        linkUrl: context.linkUrl,
        maxRetries: 3,
        scheduledFor: null,
        draft: needsApproval,
      });
      results.generated += 1;
    } catch (err) {
      if (err.code === 'DUPLICATE') {
        results.skipped += 1;
        results.errors.push(`${platform}: ${err.message}`);
      } else {
        results.errors.push(`${platform}: ${err.message}`);
      }
    }
  }

  // 3. update rule bookkeeping
  const next = computeNextRun(rule);
  await sb.from('social_automation_rules').update({
    next_run_at: next.toISOString(),
    last_run_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }).eq('id', rule.id);

  return results;
}

function mapSourceType(contentType) {
  if (contentType === 'selected_products') return 'showroom_listing';
  if (contentType === 'promotions') return 'promotions';
  if (contentType === 'content_items') return 'social_content_item';
  return 'showroom_listing';
}

function buildContext(candidate, contentType, baseUrl) {
  if (contentType === 'promotions') {
    const images = [];
    if (candidate.image_url) images.push({ url: candidate.image_url, type: 'image' });
    if (candidate.video_url) images.push({ url: candidate.video_url, type: 'video' });
    return {
      sourceId: String(candidate.id || candidate.title || 'promo'),
      title: candidate.title || candidate.headline || 'Special offer',
      category: '',
      brand: '',
      price: '',
      linkUrl: '',
      media: images.filter((m) => /^https?:\/\//i.test(m.url)),
    };
  }
  if (contentType === 'content_items') {
    const images = [];
    if (candidate.image_url) images.push({ url: candidate.image_url, type: 'image' });
    if (candidate.video_url) images.push({ url: candidate.video_url, type: 'video' });
    return {
      sourceId: candidate.id,
      title: candidate.title,
      category: candidate.category || 'News',
      brand: '',
      price: '',
      linkUrl: candidate.link_url || '',
      media: images.filter((m) => /^https?:\/\//i.test(m.url)),
    };
  }
  // product
  const images = Array.isArray(candidate.images) ? candidate.images.slice(0, 8).map((url) => ({ url, type: 'image' })) : [];
  if (candidate.video_url && /^https?:\/\//i.test(candidate.video_url)) {
    images.push({ url: candidate.video_url, type: 'video' });
  }
  const currency = candidate.currency || 'USD';
  const price = candidate.price != null ? `${Number(candidate.price).toLocaleString('en-US', { maximumFractionDigits: 2 })} ${currency}` : '';
  return {
    sourceId: candidate.property_id,
    title: candidate.title || 'New arrival',
    category: candidate.category || '',
    brand: candidate.brand || '',
    price,
    linkUrl: `${baseUrl}/product/${encodeURIComponent(candidate.property_id)}`,
    media: images.filter((m) => /^https?:\/\//i.test(m.url)),
  };
}

function defaultCaption(context, rule) {
  const parts = [];
  parts.push(String(context.title || 'New arrival').trim());
  if (rule.include_price && context.price) parts.push(context.price);
  if (rule.include_link && context.linkUrl) parts.push(context.linkUrl);
  return parts.filter(Boolean).join('\n');
}

async function getPlatformSettings(sb, platform) {
  const { data } = await sb.from('social_platform_settings').select('*').eq('platform', platform).maybeSingle();
  return data || null;
}