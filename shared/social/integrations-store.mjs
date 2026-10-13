// shared/social/integrations-store.mjs
// Secure storage + runtime hydration for integration credentials.
//
// Design:
//  • Credentials are AES-256-GCM encrypted (shared/social/crypto.mjs) with the
//    master key SOCIAL_TOKEN_ENC_KEY, which lives ONLY as a Cloudflare Pages
//    deployment secret. Plaintext never touches the database, API responses,
//    URLs or logs.
//  • The ciphertext blob is stored as an opaque value inside the EXISTING
//    public.social_platform_settings.config jsonb column (no schema change).
//  • At request time the server decrypts the blob and injects each value into
//    process.env under its canonical variable name, so the platform adapters
//    (which read process.env) pick them up with zero changes. Database-managed
//    values take precedence over any legacy environment variables.
//
// Infrastructure secrets that CANNOT be managed from a web form
// (SOCIAL_TOKEN_ENC_KEY, SCHEDULER_CRON_SECRET, SUPABASE_MAIN_SERVICE_ROLE_KEY)
// are intentionally listed as "deployment" categories and are set through the
// Cloudflare dashboard — see listCategoryStatus().
import { encryptToken, decryptToken } from './crypto.mjs';

const STORE_KEY = '__creds_enc';

// Cloudflare account/project used to deep-link the deployment-secret page.
export const CF_ACCOUNT_ID = 'b12106cb60e5364577dd87abf2f99fcd';
export const CF_PROJECT = 'weverseonlineshop-com';
export const CF_SECRETS_URL = `https://dash.cloudflare.com/${CF_ACCOUNT_ID}/pages/projects/${CF_PROJECT}/settings/environment-variables`;

// Whitelisted fields per category. `secret:true` => rendered as a masked
// password input; `optional:true` => may be left blank.
export const CATEGORIES = {
  security: {
    kind: 'deployment',
    label: 'Security & Encryption',
    icon: 'shield-check',
    description: 'Server-side keys that protect stored tokens. These are Cloudflare Pages deployment secrets and are never editable from a web form.',
    secrets: [
      { name: 'SOCIAL_TOKEN_ENC_KEY', label: 'Token encryption key', note: 'AES-256-GCM master key for social access/refresh tokens and integration credentials. Rotating it invalidates already-stored encrypted values.' },
      { name: 'SUPABASE_MAIN_SERVICE_ROLE_KEY', label: 'Supabase service-role key', note: 'Required for all server-side database writes.' },
    ],
  },
  scheduler: {
    kind: 'deployment',
    label: 'Scheduler',
    icon: 'calendar-clock',
    description: 'The publisher runs from Supabase pg_cron every 15 minutes and authenticates with this shared secret.',
    secrets: [
      { name: 'SCHEDULER_CRON_SECRET', label: 'Scheduler cron secret', note: 'Sent by pg_cron as the x-cron-secret header to /api/social/scheduler.' },
    ],
  },
  facebook: {
    kind: 'platform',
    label: 'Facebook',
    icon: 'thumbs-up',
    fields: [
      { name: 'FB_CLIENT_ID', label: 'App ID', secret: false, max: 200 },
      { name: 'FB_CLIENT_SECRET', label: 'App Secret', secret: true, max: 400 },
    ],
  },
  instagram: {
    kind: 'platform',
    label: 'Instagram',
    icon: 'camera',
    fields: [
      { name: 'INSTAGRAM_CLIENT_ID', label: 'App ID', secret: false, max: 200, optional: true },
      { name: 'INSTAGRAM_CLIENT_SECRET', label: 'App Secret', secret: true, max: 400, optional: true },
    ],
  },
  telegram: {
    kind: 'platform',
    label: 'Telegram',
    icon: 'send',
    fields: [
      { name: 'TELEGRAM_BOT_TOKEN', label: 'Bot Token', secret: true, max: 400 },
      { name: 'TELEGRAM_CHAT_ID', label: 'Default chat / channel ID', secret: false, max: 200, optional: true },
    ],
  },
  tiktok: {
    kind: 'platform',
    label: 'TikTok',
    icon: 'music-2',
    fields: [
      { name: 'TIKTOK_CLIENT_KEY', label: 'Client Key', secret: false, max: 200 },
      { name: 'TIKTOK_CLIENT_SECRET', label: 'Client Secret', secret: true, max: 400 },
    ],
  },
  'google-youtube': {
    kind: 'platform',
    label: 'Google & YouTube',
    icon: 'youtube',
    fields: [
      { name: 'GOOGLE_CLIENT_ID', label: 'Client ID', secret: false, max: 300 },
      { name: 'GOOGLE_CLIENT_SECRET', label: 'Client Secret', secret: true, max: 400 },
    ],
  },
  x: {
    kind: 'platform',
    label: 'X (Twitter)',
    icon: 'twitter',
    fields: [
      { name: 'X_CLIENT_ID', label: 'Client ID', secret: false, max: 200 },
      { name: 'X_CLIENT_SECRET', label: 'Client Secret', secret: true, max: 400 },
    ],
  },
  pinterest: {
    kind: 'platform',
    label: 'Pinterest',
    icon: 'pinterest',
    fields: [
      { name: 'PINTEREST_CLIENT_ID', label: 'App ID', secret: false, max: 200 },
      { name: 'PINTEREST_CLIENT_SECRET', label: 'App Secret', secret: true, max: 400 },
    ],
  },
  linkedin: {
    kind: 'platform',
    label: 'LinkedIn',
    icon: 'linkedin',
    fields: [
      { name: 'LINKEDIN_CLIENT_ID', label: 'Client ID', secret: false, max: 200 },
      { name: 'LINKEDIN_CLIENT_SECRET', label: 'Client Secret', secret: true, max: 400 },
    ],
  },
  whatsapp: {
    kind: 'platform',
    label: 'WhatsApp',
    icon: 'message-circle',
    fields: [
      { name: 'WHATSAPP_ACCESS_TOKEN', label: 'Access Token', secret: true, max: 800 },
      { name: 'WHATSAPP_PHONE_ID', label: 'Phone Number ID', secret: false, max: 200, optional: true },
      { name: 'WHATSAPP_RECIPIENT', label: 'Default recipient', secret: false, max: 60, optional: true },
    ],
  },
};

export const CATEGORY_ORDER = ['security', 'scheduler', 'facebook', 'instagram', 'telegram', 'tiktok', 'google-youtube', 'x', 'pinterest', 'linkedin', 'whatsapp'];
export const PLATFORM_CATEGORIES = CATEGORY_ORDER.filter((k) => CATEGORIES[k].kind === 'platform');

// Adapter id for a category (google-youtube maps to the 'youtube' adapter).
export function adapterIdFor(category) {
  return category === 'google-youtube' ? 'youtube' : category;
}

export function categoryFields(name) { return CATEGORIES[name]?.fields || []; }
export function isCategory(name) { return Object.prototype.hasOwnProperty.call(CATEGORIES, name); }

// Validate + reduce arbitrary input to the whitelist. Returns { values, errors }.
export function sanitizeValues(category, input) {
  const fields = categoryFields(category);
  const values = {};
  const errors = [];
  for (const f of fields) {
    const raw = input ? input[f.name] : undefined;
    if (raw === undefined || raw === null || String(raw).trim() === '') {
      if (!f.optional) errors.push(`${f.label} is required.`);
      continue;
    }
    const val = String(raw).trim();
    if (val.length > (f.max || 400)) { errors.push(`${f.label} is too long (max ${f.max || 400} characters).`); continue; }
    if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(val)) { errors.push(`${f.label} contains invalid characters.`); continue; }
    values[f.name] = val;
  }
  return { values, errors };
}

// ── encrypted blob I/O ──────────────────────────────────────────────
export async function readBlob(config) {
  const blob = config ? config[STORE_KEY] : null;
  if (!blob || typeof blob !== 'string') return null;
  try {
    const obj = JSON.parse((await decryptToken(blob)) || 'null');
    if (obj && typeof obj === 'object' && obj.v && typeof obj.v === 'object') {
      return { values: obj.v, updatedAt: obj.at || null };
    }
    return null;
  } catch {
    return null;
  }
}

async function readConfigRow(sb, platform) {
  const { data } = await sb.from('social_platform_settings').select('config').eq('platform', platform).maybeSingle();
  return data ? (data.config || {}) : {};
}

export async function loadCreds(sb, platform) {
  const config = await readConfigRow(sb, platform);
  const blob = await readBlob(config);
  return blob ? blob.values : null;
}

export async function saveCreds(sb, platform, values) {
  const config = { ...(await readConfigRow(sb, platform)) };
  config[STORE_KEY] = await encryptToken(JSON.stringify({ v: values, at: new Date().toISOString() }));
  const { error } = await sb.from('social_platform_settings').update({ config }).eq('platform', platform);
  if (error) throw new Error(error.message);
}

export async function removeCreds(sb, platform) {
  const config = { ...(await readConfigRow(sb, platform)) };
  delete config[STORE_KEY];
  const { error } = await sb.from('social_platform_settings').update({ config }).eq('platform', platform);
  if (error) throw new Error(error.message);
}

// All env var names that the dashboard can manage (platform categories only;
// deployment secrets are never touched).
const MANAGED_KEYS = new Set();
for (const id of CATEGORY_ORDER) {
  const cat = CATEGORIES[id];
  if (cat.kind === 'platform') for (const f of cat.fields) MANAGED_KEYS.add(f.name);
}
// Baseline env values captured before the first injection, so a removed
// dashboard credential stops taking effect even inside a reused isolate.
const envBaseline = {};
let baselineCaptured = false;

// Decrypt every stored credential set and inject into process.env so the
// platform adapters (which read process.env) use the dashboard-managed values.
// DB-managed values intentionally OVERRIDE any legacy environment variables.
export async function hydrateEnv(sb) {
  if (!baselineCaptured) {
    for (const k of MANAGED_KEYS) envBaseline[k] = process.env[k];
    baselineCaptured = true;
  }
  // Reset managed keys to their original (deployment) state so credentials
  // deleted from the dashboard do not persist in a long-lived isolate.
  // NOTE: `delete process.env[k]` is a no-op in workerd, so reset to the
  // baseline value or an empty string instead.
  for (const k of MANAGED_KEYS) {
    const b = envBaseline[k];
    try { process.env[k] = b === undefined ? '' : b; } catch { /* read-only env in some runtimes */ }
  }

  let applied = 0;
  const { data } = await sb.from('social_platform_settings').select('platform,config');
  for (const row of data || []) {
    const blob = await readBlob(row.config);
    if (!blob) continue;
    for (const [k, v] of Object.entries(blob.values)) {
      if (typeof v === 'string' && v && MANAGED_KEYS.has(k)) {
        try { process.env[k] = v; applied += 1; } catch { /* read-only env in some runtimes */ }
      }
    }
  }
  return applied;
}

// ── status reporting (never returns secret values) ──────────────────
function requiredEnvPresent(category) {
  return categoryFields(category).filter((f) => !f.optional).every((f) => Boolean(process.env[f.name]));
}

export async function listCategoryStatus(sb) {
  const { data } = await sb.from('social_platform_settings').select('platform,config');
  const configByPlatform = {};
  for (const row of data || []) configByPlatform[row.platform] = row.config || {};

  const statuses = [];
  for (const id of CATEGORY_ORDER) {
    const cat = CATEGORIES[id];
    if (cat.kind === 'deployment') {
      const secrets = cat.secrets.map((s) => ({
        name: s.name,
        label: s.label,
        note: s.note,
        configured: Boolean(process.env[s.name]),
      }));
      statuses.push({
        id,
        kind: 'deployment',
        label: cat.label,
        icon: cat.icon,
        description: cat.description,
        secrets,
        configured: secrets.every((s) => s.configured),
        dashboardUrl: CF_SECRETS_URL,
      });
      continue;
    }

    const platform = adapterIdFor(id);
    const blob = await readBlob(configByPlatform[platform]);
    const storedValues = blob ? blob.values : null;
    const fields = cat.fields.map((f) => ({
      name: f.name,
      label: f.label,
      secret: !!f.secret,
      optional: !!f.optional,
      max: f.max || 400,
      configured: Boolean((storedValues && storedValues[f.name]) || process.env[f.name]),
      source: storedValues && storedValues[f.name] ? 'dashboard' : (process.env[f.name] ? 'environment' : 'none'),
    }));
    const storedConfigured = Boolean(blob) || requiredEnvPresent(id);
    statuses.push({
      id,
      kind: 'platform',
      adapter: platform,
      label: cat.label,
      icon: cat.icon,
      fields,
      configured: storedConfigured,
      source: blob ? 'dashboard' : (requiredEnvPresent(id) ? 'environment' : 'none'),
      updatedAt: blob ? blob.updatedAt : null,
    });
  }
  return statuses;
}
