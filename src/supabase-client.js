// src/supabase-client.js — the single real Supabase client.
// The app runs on ONE free-tier Supabase project (the main/app database):
// application data, auth, RLS, storage and edge functions all live there.
// No Turso, no local drop-in gateway.
//
// Export surface (kept for every page): SUPABASE_URL, ANON_KEY,
// isSupabaseConfigured, supabase, getSessionKey.

import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://mzgrjwvwzgqgivwmlkno.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_SqmJ1R-a-_0CYzuVbS1c7w_FSSIfEsX';

function pickFirstNonEmpty(...values) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

const runtimeConfig = globalThis?.__KCO_RUNTIME_CONFIG__ || {};
const env = import.meta.env || {};

export const SUPABASE_URL = pickFirstNonEmpty(
  env.VITE_SUPABASE_MAIN_URL,
  env.VITE_SUPABASE_URL,
  runtimeConfig.VITE_SUPABASE_MAIN_URL,
  runtimeConfig.VITE_SUPABASE_URL,
  globalThis?.VITE_SUPABASE_MAIN_URL,
  globalThis?.VITE_SUPABASE_URL,
  DEFAULT_SUPABASE_URL,
);

export const ANON_KEY = pickFirstNonEmpty(
  env.VITE_SUPABASE_MAIN_ANON_KEY,
  env.VITE_SUPABASE_ANON_KEY,
  runtimeConfig.VITE_SUPABASE_MAIN_ANON_KEY,
  runtimeConfig.VITE_SUPABASE_ANON_KEY,
  globalThis?.VITE_SUPABASE_MAIN_ANON_KEY,
  globalThis?.VITE_SUPABASE_ANON_KEY,
  DEFAULT_SUPABASE_ANON_KEY,
);

export const isSupabaseConfigured = Boolean(SUPABASE_URL && ANON_KEY);

const CONFIG_ERROR_MESSAGE = 'Authentication service is unavailable. Missing Supabase credentials.';

// Guard: createClient throws if URL is missing (e.g. no .env file).
// Return a no-op proxy so the rest of the app can still load safely.
function createSafeClient() {
  if (!isSupabaseConfigured) {
    const noop = () => Promise.resolve({ data: null, error: { message: CONFIG_ERROR_MESSAGE } });
    const chainable = () => ({ select: chainable, insert: noop, update: noop, delete: noop, eq: chainable, neq: chainable, order: chainable, limit: chainable, maybeSingle: noop, single: noop, then: (resolve) => resolve({ data: null, error: { message: CONFIG_ERROR_MESSAGE } }) });

    console.error('[Supabase] Missing configuration. Set VITE_SUPABASE_MAIN_URL and VITE_SUPABASE_MAIN_ANON_KEY (or VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).');

    return {
      from: () => chainable(),
      rpc: noop,
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signUp: noop, signInWithPassword: noop, signOut: noop,
        resetPasswordForEmail: noop, updateUser: noop,
        resend: noop,
        exchangeCodeForSession: noop,
        verifyOtp: noop,
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      channel: () => ({ on: () => ({ subscribe: () => {} }) }),
      removeChannel: () => {},
      storage: { from: () => ({ upload: noop, getPublicUrl: () => ({ data: { publicUrl: '' } }) }) },
    };
  }
  return createClient(SUPABASE_URL, ANON_KEY, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
}

export const supabase = createSafeClient();

export function getSessionKey() {
  let key = localStorage.getItem('kco_session_key');
  if (!key) {
    key = 'kco-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('kco_session_key', key);
  }
  return key;
}

export function getSupabase() { return supabase; }