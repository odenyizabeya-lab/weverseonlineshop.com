// Lazy bridge to auth.js: keeps the auth/supabase chunk out of the
// homepage's initial module graph. auth.js is only fetched when a
// wishlist or buy-now action actually needs the current user.
let _authPromise = null;
function loadAuth() {
  if (!_authPromise) _authPromise = import('./auth.js');
  return _authPromise;
}

export async function getCurrentUser() {
  const m = await loadAuth();
  return m.getCurrentUser();
}

export async function setRedirectAfterAuth(path) {
  const m = await loadAuth();
  return m.setRedirectAfterAuth(path);
}
