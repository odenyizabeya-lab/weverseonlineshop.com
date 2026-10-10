// Publish engine — the real server-side posting workflow.
// Handles: dedupe, queueing, scheduler ticks, token refresh, rate limits,
// retries with backoff, logging, and per-platform daily counters.
import { getServiceClient } from './db.mjs';
import { decryptToken, encryptToken, sha256 } from './crypto.mjs';
import { getAdapter, isPlatform } from './registry.mjs';

export const POST_STATUS = ['draft', 'scheduled', 'queued', 'publishing', 'published', 'failed', 'cancelled'];

export function dedupeHash({ platform, contentType, sourceType, sourceId, caption }) {
  const stableCaption = String(caption || '').trim().slice(0, 400);
  return sha256(`${platform}|${contentType}|${sourceType || ''}|${sourceId || ''}|${stableCaption}`);
}

export async function logPost(sb, { postId, platform, level = 'info', message, detail = {} }) {
  try {
    await sb.from('social_post_logs').insert({
      post_id: postId || null,
      platform: platform || null,
      level,
      message: String(message || '').slice(0, 2000),
      detail,
    });
  } catch (err) {
    // logging must never break the pipeline
  }
}

export async function loadAccount(sb, accountId) {
  if (!accountId) return null;
  const { data } = await sb.from('social_accounts').select('*').eq('id', accountId).maybeSingle();
  if (!data) return null;
  return {
    ...data,
    accessToken: decryptToken(data.access_token_enc),
    refreshToken: decryptToken(data.refresh_token_enc),
  };
}

export async function saveTokens(sb, accountId, tokenBundle) {
  const patch = {};
  if (tokenBundle.accessToken !== undefined) patch.access_token_enc = encryptToken(tokenBundle.accessToken);
  if (tokenBundle.refreshToken !== undefined) patch.refresh_token_enc = encryptToken(tokenBundle.refreshToken);
  if (tokenBundle.tokenExpiresAt !== undefined) patch.token_expires_at = tokenBundle.tokenExpiresAt;
  if (tokenBundle.refreshTokenExpiresAt !== undefined) patch.refresh_token_expires_at = tokenBundle.refreshTokenExpiresAt;
  if (tokenBundle.scopes !== undefined) patch.scopes = tokenBundle.scopes;
  if (Object.keys(patch).length) {
    await sb.from('social_accounts').update(patch).eq('id', accountId);
  }
}

// Returns a valid plaintext access token, refreshing when needed/possible.
async function freshToken(sb, adapter, account) {
  let token = account.accessToken;
  const nearExpiry = account.token_expires_at && new Date(account.token_expires_at).getTime() - Date.now() < 5 * 60 * 1000;
  if ((!token || nearExpiry) && account.refreshToken && typeof adapter.refreshToken === 'function') {
    const bundle = await adapter.refreshToken(account.refreshToken);
    if (bundle?.accessToken) {
      token = bundle.accessToken;
      await saveTokens(sb, account.id, bundle);
    }
  }
  if (!token) {
    const err = new Error(`No valid access token for ${account.platform}. Reconnect the account.`);
    err.code = 'TOKEN_MISSING';
    throw err;
  }
  return token;
}

async function ensurePublishState(sb, platform) {
  const { data } = await sb.from('social_publish_state').select('*').eq('platform', platform).maybeSingle();
  if (data) return data;
  const { data: created } = await sb.from('social_publish_state')
    .insert({ platform, today_date: todayStr(), posts_today: 0 })
    .select('*')
    .maybeSingle();
  return created;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

async function countPublishedToday(sb, platform) {
  const { data, count } = await sb
    .from('social_posts')
    .select('id', { count: 'exact', head: true })
    .eq('platform', platform)
    .eq('status', 'published')
    .gte('published_at', `${todayStr()}T00:00:00.000Z`);
  return count || 0;
}

// Public entrypoint: publish a single post row.
export async function runPublish({ postId, post, by = 'scheduler' }) {
  const sb = getServiceClient();
  let row = post;
  if (!row && postId) {
    const { data } = await sb.from('social_posts').select('*').eq('id', postId).maybeSingle();
    row = data;
  }
  if (!row) throw new Error(`Post ${postId || '?'} not found.`);
  if (!isPlatform(row.platform)) throw new Error(`Unsupported platform ${row.platform}.`);

  const adapter = getAdapter(row.platform);

  // Lock + state
  const state = await ensurePublishState(sb, row.platform);
  if (new Date(state.lock_acquired_at || 0).getTime() > Date.now() - 10 * 60 * 1000 && state.lock) {
    throw new Error(`Another ${row.platform} job is running. Lock held.`);
  }
  await sb.from('social_publish_state').update({
    lock: true,
    lock_acquired_at: new Date().toISOString(),
    lock_owner: `post-${row.id}`,
    last_run_at: new Date().toISOString(),
  }).eq('id', state.id);

  const finish = async () => {
    await sb.from('social_publish_state').update({
      lock: false,
      lock_owner: null,
      today_date: todayStr(),
      posts_today: await countPublishedToday(sb, row.platform),
    }).eq('id', state.id);
  };

  try {
    await sb.from('social_posts').update({ status: 'publishing', updated_at: new Date().toISOString() }).eq('id', row.id);
    await logPost(sb, { postId: row.id, platform: row.platform, level: 'info', message: `Publishing ${by}.` });

    // Guard: only post when the account is connected (user authorization).
    const account = await loadAccount(sb, row.platform_account_id);
    if (!account || account.status !== 'connected') {
      throw Object.assign(new Error(`No connected ${row.platform} account. Connect the account before posting.`), { code: 'ACCOUNT_NOT_CONNECTED' });
    }

    let token = account.accessToken;
    if (adapter.metadata.usesOAuth) {
      token = await freshToken(sb, adapter, account);
    }

    const platformSettings = await getPlatformSettings(sb, row.platform);

    // Respect platform rates.
    await enforceRateLimit(sb, row.platform, platformSettings);

    const result = await adapter.publish({
      post: row,
      account,
      settings: platformSettings?.config ? platformSettings : undefined,
      token,
    });

    const publishedAt = new Date().toISOString();
    await sb.from('social_posts').update({
      status: 'published',
      published_at: publishedAt,
      platform_post_id: result?.platformPostId || row.platform_post_id,
      platform_post_url: result?.platformPostUrl || row.platform_post_url,
      retry_count: 0,
      last_error: null,
      updated_at: publishedAt,
    }).eq('id', row.id);
    await logPost(sb, {
      postId: row.id,
      platform: row.platform,
      level: 'info',
      message: `Published successfully${result?.platformPostId ? ` (${result.platformPostId})` : ''}.`,
      detail: { result: summarize(result) },
    });
    await finish();
    return { ok: true, postId: row.id, status: 'published', result };
  } catch (err) {
    await handleFailure(sb, row, adapter, err);
    await finish();
    throw err;
  }
}

function summarize(result) {
  if (!result || typeof result !== 'object') return {};
  const out = {};
  if (result.platformPostId) out.platformPostId = result.platformPostId;
  if (result.platformPostUrl) out.platformPostUrl = result.platformPostUrl;
  return out;
}

function isRetryable(code, message) {
  const m = String(message || '').toLowerCase();
  const c = String(code || '').toLowerCase();
  const retryable = ['timeout', 'rate', '429', 'network', 'failed to fetch', 'processing', 'temporarily', 'try again', 'ecosystem', '500', '502', '503', '504', 'still processing'];
  return retryable.some((k) => m.includes(k) || c.includes(k));
}

async function handleFailure(sb, row, adapter, err) {
  const code = err.code || 'PLATFORM_ERROR';
  const message = String(err.message || 'Unknown error').slice(0, 2000);
  const retryable = isRetryable(code, message);
  const maxRetries = Math.max(0, row.max_retries ?? 3);
  const retryCount = (row.retry_count || 0) + 1;

  if (retryable && retryCount <= maxRetries) {
    const backoffMinutes = Math.min(30 * Math.pow(2, retryCount - 1), 480);
    const nextRetryAt = new Date(Date.now() + backoffMinutes * 60 * 1000).toISOString();
    await sb.from('social_posts').update({
      status: 'failed',
      retry_count: retryCount,
      next_retry_at: nextRetryAt,
      last_error: message,
      error_detail: { ...(row.error_detail || {}), [String(Date.now())]: { code, message, retryable } },
      updated_at: new Date().toISOString(),
    }).eq('id', row.id);
    await logPost(sb, {
      postId: row.id,
      platform: row.platform,
      level: 'warn',
      message: `Attempt ${retryCount}/${maxRetries} failed (${code}). Retrying after ${backoffMinutes} min.`,
      detail: { code, message },
    });
  } else {
    await sb.from('social_posts').update({
      status: 'failed',
      retry_count: retryCount,
      next_retry_at: null,
      last_error: message,
      error_detail: { ...(row.error_detail || {}), [String(Date.now())]: { code, message, retryable } },
      updated_at: new Date().toISOString(),
    }).eq('id', row.id);
    await logPost(sb, {
      postId: row.id,
      platform: row.platform,
      level: 'error',
      message: `Post failed${retryable ? ' (no more retries left)' : ''}: ${message}`,
      detail: { code, message },
    });
  }
}

async function getPlatformSettings(sb, platform) {
  const { data } = await sb.from('social_platform_settings').select('*').eq('platform', platform).maybeSingle();
  return data || null;
}

async function enforceRateLimit(sb, platform, platformSettings) {
  const capPerDay = platformSettings?.max_posts_per_day ?? 5;
  if (capPerDay > 0) {
    const publishedToday = await countPublishedToday(sb, platform);
    if (publishedToday >= capPerDay) {
      const err = new Error(`Daily posting limit reached for ${platform} (${capPerDay}).`);
      err.code = 'DAILY_LIMIT';
      throw err;
    }
  }
  const minIntervalMin = Number(platformSettings?.min_interval_minutes) || 0;
  if (minIntervalMin > 0) {
    const { data: lastPost } = await sb
      .from('social_posts')
      .select('published_at')
      .eq('platform', platform)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (lastPost?.published_at) {
      const elapsedMin = (Date.now() - new Date(lastPost.published_at).getTime()) / 60000;
      if (elapsedMin < minIntervalMin) {
        const err = new Error(`Minimum interval between ${platform} posts not met (need ${minIntervalMin} min, only ${Math.max(0, elapsedMin).toFixed(1)} since last).`);
        err.code = 'MIN_INTERVAL';
        throw err;
      }
    }
  }
}

// Create a queued/scheduled post with duplicate protection. Returns the row or throws DUPLICATE.
export async function createPost({ platform, platformAccountId, contentType = 'manual', sourceType, sourceId, caption, hashtags, media = [], scheduledFor = null, autoGenerated = false, dedupeHashOverride, metadata = {}, linkUrl, maxRetries = 3, draft = false }) {
  const sb = getServiceClient();
  const hash = dedupeHashOverride ? null : dedupeHash({ platform, contentType, sourceType, sourceId, caption });
  if (hash) {
    const { data: existing } = await sb.from('social_posts').select('id').eq('platform', platform).eq('dedupe_hash', hash).maybeSingle();
    if (existing) {
      const err = new Error('This content was already posted to this platform (duplicate-post protection). Use "allow duplicate" to override.');
      err.code = 'DUPLICATE';
      throw err;
    }
  }
  const status = draft ? 'draft' : (scheduledFor ? 'scheduled' : 'queued');
  const mediaArr = Array.isArray(media) ? media.filter((m) => m && m.url).map((m, i) => ({ url: String(m.url), type: m.type === 'video' ? 'video' : 'image', order: m.order ?? i })) : [];
  const payload = {
    platform,
    platform_account_id: platformAccountId || null,
    content_type: contentType,
    source_type: sourceType || null,
    source_id: sourceId ? String(sourceId) : null,
    status,
    caption: caption != null ? String(caption).slice(0, 60000) : caption,
    hashtags: Array.isArray(hashtags) ? hashtags.join(' ') : String(hashtags || ''),
    media: mediaArr,
    scheduled_for: scheduledFor ? new Date(scheduledFor).toISOString() : null,
    auto_generated: Boolean(autoGenerated),
    dedupe_hash: hash,
    max_retries: maxRetries,
    metadata: metadata || {},
    ...(linkUrl ? { metadata: { ...(metadata || {}), link_url: linkUrl } } : {}),
  };
  const { data, error } = await sb.from('social_posts').insert(payload).select('*').maybeSingle();
  if (error) {
    if (error.code === '23505' || /duplicate/i.test(error.message)) {
      const dup = new Error('This content was already posted to this platform (duplicate-post protection).');
      dup.code = 'DUPLICATE';
      throw dup;
    }
    throw error;
  }
  await logPost(sb, { postId: data.id, platform, level: 'info', message: `Post ${status === 'scheduled' ? 'scheduled' : status === 'draft' ? 'saved for approval' : 'queued'}${autoGenerated ? ' (automatic).' : '.'}` });
  return data;
}

// Enqueue points-to-publish for scheduled posts that are due.
export async function enqueueDueScheduled(sb) {
  const now = new Date().toISOString();
  const { data: due } = await sb
    .from('social_posts')
    .select('*')
    .eq('status', 'scheduled')
    .lte('scheduled_for', now)
    .limit(50);
  let enqueued = 0;
  for (const post of due || []) {
    await sb.from('social_posts').update({ status: 'queued', updated_at: now }).eq('id', post.id);
    enqueued += 1;
  }
  return enqueued;
}

// Requeue failed posts whose backoff window elapsed.
export async function requeueRetryable(sb) {
  const now = new Date().toISOString();
  const { data: due } = await sb
    .from('social_posts')
    .select('*')
    .eq('status', 'failed')
    .lte('next_retry_at', now)
    .limit(50);
  let requeued = 0;
  for (const post of due || []) {
    await sb.from('social_posts').update({ status: 'queued', updated_at: now }).eq('id', post.id);
    requeued += 1;
  }
  return requeued;
}

// Manual "publish now" for an existing draft/scheduled/failed post.
export async function triggerPost(postId) {
  const sb = getServiceClient();
  const { data } = await sb.from('social_posts').select('*').eq('id', postId).maybeSingle();
  if (!data) throw new Error('Post not found.');
  const now = new Date().toISOString();
  if (data.status === 'draft') {
    await sb.from('social_posts').update({ status: 'queued', scheduled_for: null, updated_at: now }).eq('id', postId);
  } else if (data.status === 'scheduled') {
    await sb.from('social_posts').update({ status: 'queued', scheduled_for: null, updated_at: now }).eq('id', postId);
  } else if (data.status === 'failed') {
    await sb.from('social_posts').update({ status: 'queued', next_retry_at: null, updated_at: now }).eq('id', postId);
  } else if (data.status === 'queued') {
    // already queued; no-op
  } else {
    throw new Error(`Cannot re-publish a ${data.status} post.`);
  }
  await runPublish({ postId, by: data.auto_generated ? 'retry' : 'manual' });
  return postId;
}