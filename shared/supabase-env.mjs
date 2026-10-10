// shared/supabase-env.mjs — single source of truth for Supabase credentials.
// The whole app runs on ONE free-tier Supabase project (the main/app database).
// Reads the clean SUPABASE_MAIN_* names first, then falls back to the legacy
// SUPABASE_* / VITE_SUPABASE_* / WEVERSE_SERVICE_ROLE_KEY names so existing
// deployments and GitHub Actions secrets keep working unchanged.

const MAIN_URL_DEFAULT = 'https://mzgrjwvwzgqgivwmlkno.supabase.co';
const MAIN_ANON_DEFAULT = 'sb_publishable_SqmJ1R-a-_0CYzuVbS1c7w_FSSIfEsX';

function first(...values) {
  for (const v of values) {
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return '';
}

export const MAIN_URL = first(
  process.env.SUPABASE_MAIN_URL,
  process.env.SUPABASE_URL,
  process.env.VITE_SUPABASE_MAIN_URL,
  process.env.VITE_SUPABASE_URL,
  MAIN_URL_DEFAULT,
);

export const MAIN_ANON_KEY = first(
  process.env.SUPABASE_MAIN_ANON_KEY,
  process.env.SUPABASE_ANON_KEY,
  process.env.VITE_SUPABASE_MAIN_ANON_KEY,
  process.env.VITE_SUPABASE_ANON_KEY,
  MAIN_ANON_DEFAULT,
);

// Server-side only. NEVER expose this to the browser.
export const MAIN_SERVICE_ROLE_KEY = first(
  process.env.SUPABASE_MAIN_SERVICE_ROLE_KEY,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  process.env.WEVERSE_SERVICE_ROLE_KEY,
  '',
);