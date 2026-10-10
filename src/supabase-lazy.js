// Lazy bridge to supabase-client.js: keeps @supabase/supabase-js out of
// the homepage's initial module graph. The real client is only fetched on
// first use (ads, live state, auth, search, widgets, etc.).
let _supabase = null;
export function getSupabase() {
  if (_supabase) return Promise.resolve(_supabase);
  return import('./supabase-client.js').then((m) => {
    _supabase = m.supabase;
    return _supabase;
  });
}
