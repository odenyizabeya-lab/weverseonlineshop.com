// shared/supabase-env.mjs — single source of truth for Supabase credentials.
// The whole app runs on ONE free-tier Supabase project (the main/app database).
// Reads the clean SUPABASE_MAIN_* names first, then falls back to the legacy
// SUPABASE_* / VITE_SUPABASE_* / WEVERSE_SERVICE_ROLE_KEY names so existing
// deployments and GitHub Actions secrets keep working unchanged.
//
// Works in BOTH Node (Vercel functions / build scripts) and Cloudflare Workers
// (Pages Functions): `process` is guarded so a Worker without nodejs_compat can
// import this module. The hardcoded defaults below are PUBLIC values (the anon
// key is shipped in the browser bundle), so Cloudflare needs no env vars.

const MAIN_URL_DEFAULT = 'https://mzgrjwvwzgqgivwmlkno.supabase.co';
const MAIN_ANON_DEFAULT = 'sb_publishable_SqmJ1R-a-_0CYzuVbS1c7w_FSSIfEsX';

const ENV = (typeof process !== 'undefined' && process && process.env) ? process.env : {};

function first(...values) {
  for (const v of values) {
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return '';
}

export const MAIN_URL = first(
  ENV.SUPABASE_MAIN_URL,
  ENV.SUPABASE_URL,
  ENV.VITE_SUPABASE_MAIN_URL,
  ENV.VITE_SUPABASE_URL,
  MAIN_URL_DEFAULT,
);

export const MAIN_ANON_KEY = first(
  ENV.SUPABASE_MAIN_ANON_KEY,
  ENV.SUPABASE_ANON_KEY,
  ENV.VITE_SUPABASE_MAIN_ANON_KEY,
  ENV.VITE_SUPABASE_ANON_KEY,
  MAIN_ANON_DEFAULT,
);

// Server-side only. NEVER expose this to the browser.
export const MAIN_SERVICE_ROLE_KEY = first(
  ENV.SUPABASE_MAIN_SERVICE_ROLE_KEY,
  ENV.SUPABASE_SERVICE_ROLE_KEY,
  ENV.WEVERSE_SERVICE_ROLE_KEY,
  '',
);
