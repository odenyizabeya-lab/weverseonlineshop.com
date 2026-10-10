import { getSupabase } from './supabase-lazy.js';

// Shared navigation auth state — uses the real Supabase session, not localStorage.
// Updates the header sign-in/account button, the mobile drawer user strip,
// and the "more" menu sign-out row across every page that imports it.

let currentUser = null;
let currentProfile = null;

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text == null ? '' : String(text);
  return div.innerHTML;
}

async function fetchProfile(user) {
  if (!user) return null;
  const supabase = await getSupabase();
  const { data } = await supabase
    .from('profiles')
    .select('display_name, first_name, last_name, avatar_url')
    .eq('user_id', user.id)
    .maybeSingle();
  return data;
}

function displayName(user, profile) {
  if (!user) return 'Guest User';
  if (profile?.display_name) return profile.display_name;
  if (profile?.first_name || profile?.last_name) return `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
  return user.email.split('@')[0];
}

function renderNavAuth(user, profile) {
  // Header (desktop + tablet) sign-in / account button
  const signinBtn = document.getElementById('hdr-signin-btn');
  const accountBtn = document.getElementById('hdr-account-btn');
  const accountLabel = document.getElementById('hdr-account-label');
  if (signinBtn && accountBtn) {
    if (user) {
      signinBtn.classList.add('hidden');
      accountBtn.classList.remove('hidden');
      if (accountLabel) accountLabel.textContent = displayName(user, profile);
    } else {
      signinBtn.classList.remove('hidden');
      accountBtn.classList.add('hidden');
    }
  }

  // Mobile drawer user strip + sign-in button
  const nameEl = document.getElementById('nav-user-name');
  const subEl = document.getElementById('nav-user-sub');
  const signOutRow = document.getElementById('nav-signout-row');
  const signInBtn = document.getElementById('nav-signin-btn');
  const userStrip = document.getElementById('nav-user-strip');
  if (user) {
    if (nameEl) nameEl.textContent = displayName(user, profile);
    if (subEl) subEl.textContent = user.email;
    if (signOutRow) signOutRow.classList.remove('hidden');
    if (signInBtn) signInBtn.classList.add('hidden');
    if (userStrip) userStrip.classList.remove('hidden');
  } else {
    if (nameEl) nameEl.textContent = 'Guest User';
    if (subEl) subEl.textContent = 'Tap to sign in';
    if (signOutRow) signOutRow.classList.add('hidden');
    if (signInBtn) signInBtn.classList.remove('hidden');
    if (userStrip) userStrip.classList.add('hidden');
  }

  // More menu sign-out row
  const moreSignOut = document.getElementById('more-signout');
  if (moreSignOut) moreSignOut.classList.toggle('hidden', !user);

  // More menu account card (guest vs signed-in)
  const moreAccount = document.getElementById('more-account-card');
  if (moreAccount) {
    if (user) {
      const name = displayName(user, profile);
      const initials = (name.replace(/[^a-zA-Z0-9 ]/g, '').trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('') || '?').toUpperCase();
      moreAccount.innerHTML = `
        <button onclick="closeMoreMenu();window.location.href='/account.html'"
                class="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-blue-500/40 transition text-left">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0 text-white text-sm font-black">${escapeHtml(initials)}</div>
          <div class="flex-1 min-w-0">
            <p class="text-[13px] font-bold text-gray-900 leading-none truncate">${escapeHtml(name)}</p>
            <p class="text-[11px] text-gray-600 mt-0.5 leading-none truncate">${escapeHtml(user.email || '')}</p>
          </div>
          <span class="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 shrink-0"><i data-lucide="shield-check" class="w-3 h-3"></i>Account</span>
        </button>`;
    } else {
      moreAccount.innerHTML = `
        <button onclick="closeMoreMenu();openAuthModal();"
                class="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-200 hover:border-blue-400/60 hover:bg-blue-100 transition text-left active:scale-[0.99]">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/30">
            <i data-lucide="user-round" class="w-5 h-5 text-white"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-[13px] font-bold text-gray-900 leading-none">Sign In / Create Account</p>
            <p class="text-[11px] text-gray-600 mt-0.5 leading-none">Orders, wishlist &amp; more</p>
          </div>
          <i data-lucide="chevron-right" class="w-4 h-4 text-gray-500 shrink-0"></i>
        </button>`;
    }
  }

  if (window.lucide) lucide.createIcons();
}

async function refreshNavUserState() {
  const supabase = await getSupabase();
  const { data: { session } } = await supabase.auth.getSession();
  currentUser = session?.user || null;
  currentProfile = currentUser ? await fetchProfile(currentUser) : null;
  renderNavAuth(currentUser, currentProfile);
}

async function signOutUser() {
  const supabase = await getSupabase();
  await supabase.auth.signOut();
  currentUser = null;
  currentProfile = null;
  renderNavAuth(null, null);
  window.location.href = '/';
}

// Listen for auth state changes so login/logout in other tabs or the auth
// page reflect instantly. Wrapped in async IIFE to avoid the onAuthStateChange
// deadlock documented in the bolt-database skill.
(async () => {
  const supabase = await getSupabase();
  supabase.auth.onAuthStateChange((_event, session) => {
  (async () => {
    currentUser = session?.user || null;
    currentProfile = currentUser ? await fetchProfile(currentUser) : null;
    renderNavAuth(currentUser, currentProfile);
  })();
  });
})();
window.refreshNavUserState = refreshNavUserState;
window.signOutUser = signOutUser;

// Initial render on page load
refreshNavUserState();
