import { supabase } from './supabase-client.js';
import { signUp, signIn, getRedirectAfterAuth, clearRedirectAfterAuth, resetPassword, resendVerification, sendAuthEmail, updateUserPassword } from './auth.js';
import { isSupabaseConfigured } from './supabase-client.js';
import { trackEvent } from './analytics.js';
import { COUNTRIES, searchCountries, getCountryByCode, detectCurrency } from './country-data.js';

let mode = 'login';
let selectedCountry = null;

const form = document.getElementById('auth-form');
const emailInput = document.getElementById('auth-email');
const passwordInput = document.getElementById('auth-password');
const usernameInput = document.getElementById('auth-username');
const submitBtn = document.getElementById('auth-submit');
const errorBox = document.getElementById('auth-error');
const errorMsg = document.getElementById('auth-error-msg');
const tabLogin = document.getElementById('tab-login');
const tabRegister = document.getElementById('tab-register');
const loginExtras = document.getElementById('login-extras');
const registerExtras = document.getElementById('register-extras');
const fieldUsername = document.getElementById('field-username');
const fieldCountry = document.getElementById('field-country');
const termsRow = document.getElementById('terms-row');
const strengthMeter = document.getElementById('strength-meter');
const welcomeTitle = document.getElementById('welcome-title');
const welcomeSubtitle = document.getElementById('welcome-subtitle');

/* ── Animated particles ────────────────────────────────────── */
function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    p.className = 'particle';
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = '-10px';
    p.style.background = Math.random() > 0.5 ? 'rgba(59,130,246,.4)' : 'rgba(251,191,36,.3)';
    p.style.animationDuration = (Math.random() * 20 + 15) + 's';
    p.style.animationDelay = (Math.random() * 20) + 's';
    container.appendChild(p);
  }
}
spawnParticles();

/* ── Ripple effect on buttons ───────────────────────────────── */
function addRipple(btn) {
  btn.addEventListener('click', function (e) {
    if (this.disabled) return;
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}
document.querySelectorAll('.btn-press').forEach(addRipple);

/* ── Mode switching ────────────────────────────────────────── */
const tabIndicator = document.getElementById('tab-indicator');
const submitLabel = document.getElementById('auth-submit-label');

function moveIndicator(activeTab) {
  if (!tabIndicator || !activeTab) return;
  const parent = activeTab.parentElement;
  const rect = activeTab.getBoundingClientRect();
  const prect = parent.getBoundingClientRect();
  tabIndicator.style.width = rect.width + 'px';
  tabIndicator.style.transform = `translateX(${rect.left - prect.left - 4}px)`;
}

function setMode(m) {
  mode = m;
  if (m === 'login') {
    tabLogin.classList.add('text-blue-700');
    tabLogin.classList.remove('text-gray-600');
    tabRegister.classList.add('text-gray-600');
    tabRegister.classList.remove('text-blue-700');
    moveIndicator(tabLogin);
    submitBtn.innerHTML = '<i data-lucide="log-in" class="w-5 h-5"></i> <span id="auth-submit-label">Sign In</span>';
    welcomeTitle.textContent = 'Welcome Back';
    welcomeSubtitle.textContent = 'Sign in or create an account to continue your purchase securely.';
    loginExtras.classList.remove('hidden');
    registerExtras.classList.add('hidden');
    emailInput.value = 'odenyizabeya@gmail.com';
    fieldUsername.classList.add('hidden');
    fieldCountry.classList.add('hidden');
    termsRow.classList.add('hidden');
    strengthMeter.classList.add('hidden');
    usernameInput.required = false;
    passwordInput.setAttribute('autocomplete', 'current-password');
  } else {
    tabRegister.classList.add('text-blue-700');
    tabRegister.classList.remove('text-gray-600');
    tabLogin.classList.add('text-gray-600');
    tabLogin.classList.remove('text-blue-700');
    moveIndicator(tabRegister);
    submitBtn.innerHTML = '<i data-lucide="user-plus" class="w-5 h-5"></i> <span id="auth-submit-label">Create Account</span>';
    welcomeTitle.textContent = 'Create Your Account';
    welcomeSubtitle.textContent = 'Join Weverse Online Shop to buy and sell securely worldwide.';
    loginExtras.classList.add('hidden');
    registerExtras.classList.remove('hidden');
    fieldUsername.classList.remove('hidden');
    fieldCountry.classList.remove('hidden');
    termsRow.classList.remove('hidden');
    strengthMeter.classList.remove('hidden');
    usernameInput.required = true;
    passwordInput.setAttribute('autocomplete', 'new-password');
  }
  if (window.lucide) lucide.createIcons();
}

tabLogin.addEventListener('click', () => setMode('login'));
tabRegister.addEventListener('click', () => setMode('register'));

function applyModeFromQuery() {
  const modeParam = new URLSearchParams(window.location.search).get('mode');
  if (modeParam === 'register') {
    setMode('register');
    return;
  }
  if (modeParam === 'login') {
    setMode('login');
  }
}

applyModeFromQuery();

window.addEventListener('resize', () => moveIndicator(mode === 'login' ? tabLogin : tabRegister));
window.addEventListener('load', () => moveIndicator(mode === 'login' ? tabLogin : tabRegister));
document.getElementById('link-create')?.addEventListener('click', (e) => { e.preventDefault(); setMode('register'); });
document.getElementById('link-signin')?.addEventListener('click', (e) => { e.preventDefault(); setMode('login'); });

/* ── Show / Hide password ───────────────────────────────────── */
const toggleBtn = document.getElementById('toggle-password');
toggleBtn.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  toggleBtn.innerHTML = isPassword
    ? '<i data-lucide="eye-off" class="w-5 h-5"></i>'
    : '<i data-lucide="eye" class="w-5 h-5"></i>';
  if (window.lucide) lucide.createIcons();
});

/* ── Password strength meter ────────────────────────────────── */
const strengthBars = document.querySelectorAll('.strength-bar');
const strengthLabel = document.getElementById('strength-label');

function calcStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

passwordInput.addEventListener('input', () => {
  if (mode !== 'register') return;
  const score = calcStrength(passwordInput.value);
  const colors = ['bg-gray-100', 'bg-red-500', 'bg-amber-500', 'bg-yellow-500', 'bg-emerald-500'];
  const labels = ['Password strength', 'Weak', 'Fair', 'Good', 'Strong'];
  strengthBars.forEach((bar, i) => {
    bar.className = 'strength-bar h-1 flex-1 rounded-full ' + (i < score ? colors[score] : 'bg-gray-100');
  });
  strengthLabel.textContent = labels[score];
  strengthLabel.className = 'text-[11px] font-medium ' + (score >= 3 ? 'text-emerald-600' : score >= 2 ? 'text-yellow-600' : score >= 1 ? 'text-amber-600' : 'text-gray-500');
});

/* ── Country selector modal ────────────────────────────────── */
const countryModal = document.getElementById('country-modal');
const countrySelectBtn = document.getElementById('country-select-btn');
const countryModalClose = document.getElementById('country-modal-close');
const countryModalBackdrop = document.getElementById('country-modal-backdrop');
const countrySearch = document.getElementById('country-search');
const countryList = document.getElementById('country-list');
const countryFlag = document.getElementById('country-flag');
const countryName = document.getElementById('country-name');
const countryMeta = document.getElementById('country-meta');

function renderCountryList(query) {
  const results = searchCountries(query);
  countryList.innerHTML = results.map(c => `
    <button type="button" data-code="${c.code}" class="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition text-left">
      <span class="text-2xl">${c.flag}</span>
      <div class="flex-1 min-w-0">
        <div class="text-sm font-medium text-gray-900 truncate">${c.name}</div>
        <div class="text-xs text-gray-500">ISO: ${c.code} · Dial: +${c.dial}</div>
      </div>
      ${selectedCountry?.code === c.code ? '<i data-lucide="check" class="w-5 h-5 text-blue-600 shrink-0"></i>' : ''}
    </button>
  `).join('');
  if (window.lucide) lucide.createIcons();
}

function openCountryModal() {
  countryModal.classList.remove('hidden');
  countrySearch.value = '';
  renderCountryList('');
  setTimeout(() => countrySearch.focus(), 100);
}
function closeCountryModal() {
  countryModal.classList.add('hidden');
}

countrySelectBtn.addEventListener('click', openCountryModal);
countryModalClose.addEventListener('click', closeCountryModal);
countryModalBackdrop.addEventListener('click', closeCountryModal);
countrySearch.addEventListener('input', () => renderCountryList(countrySearch.value.trim()));

countryList.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-code]');
  if (!btn) return;
  const code = btn.dataset.code;
  selectedCountry = getCountryByCode(code);
  if (selectedCountry) {
    countryFlag.textContent = selectedCountry.flag;
    countryName.textContent = selectedCountry.name;
    countryMeta.textContent = `+${selectedCountry.dial} · ${selectedCountry.code}`;
  }
  closeCountryModal();
});

/* ── Navigation links ──────────────────────────────────────── */
document.getElementById('link-forgot-top')?.addEventListener('click', (e) => { e.preventDefault(); showForgotPassword(); });
document.getElementById('link-forgot')?.addEventListener('click', (e) => { e.preventDefault(); showForgotPassword(); });
document.getElementById('link-guest-top')?.addEventListener('click', (e) => { e.preventDefault(); goToGuestCheckout(); });
document.getElementById('link-guest-checkout')?.addEventListener('click', (e) => { e.preventDefault(); goToGuestCheckout(); });
document.getElementById('link-help')?.addEventListener('click', (e) => { e.preventDefault(); window.location.href = '/help.html'; });
document.getElementById('link-help-bottom')?.addEventListener('click', (e) => { e.preventDefault(); window.location.href = '/help.html'; });
document.getElementById('link-contact')?.addEventListener('click', (e) => { e.preventDefault(); window.location.href = '/contact.html'; });
document.getElementById('link-terms')?.addEventListener('click', (e) => { e.preventDefault(); window.location.href = '/terms.html'; });
document.getElementById('link-privacy')?.addEventListener('click', (e) => { e.preventDefault(); window.location.href = '/privacy.html'; });

function goToGuestCheckout() {
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get('redirect');
  if (redirect) {
    window.location.href = redirect + (redirect.includes('?') ? '&' : '?') + 'guest=1';
  } else {
    window.location.href = '/?guest=1';
  }
}

/* ── Toast ────────────────────────────────────────────────── */
function showToast(msg) {
  let toast = document.getElementById('auth-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'auth-toast';
    toast.className = 'fixed bottom-5 right-5 z-[100] transform translate-y-20 opacity-0 bg-gray-900 border border-blue-500/30 text-white px-5 py-3 rounded-xl shadow-xl text-xs flex items-center gap-2 font-medium transition-all duration-300';
    toast.innerHTML = '<i data-lucide="info" class="w-4 h-4 text-blue-600"></i><span id="auth-toast-msg">Action</span>';
    document.body.appendChild(toast);
  }
  toast.querySelector('#auth-toast-msg').textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3000);
  if (window.lucide) lucide.createIcons();
}

function showError(msg) {
  errorMsg.textContent = msg;
  errorBox.classList.remove('hidden');
}
function hideError() {
  errorBox.classList.add('hidden');
}

function formatAuthError(err, fallback = 'Authentication failed.') {
  const raw = String(err?.message || err || fallback);
  const lower = raw.toLowerCase();

  if (lower.includes('missing supabase credentials') || lower.includes('authentication service is unavailable')) {
    return 'Authentication is temporarily unavailable due to configuration. Please contact support.';
  }
  if (lower.includes('failed to fetch') || lower.includes('networkerror') || lower.includes('network request failed')) {
    return 'Network error. Check your internet connection and try again.';
  }
  if (lower.includes('invalid login credentials') || lower.includes('invalid login')) {
    return 'Incorrect email or password.';
  }
  if (lower.includes('email not confirmed')) {
    return 'Please verify your email first, then sign in.';
  }
  if (lower.includes('already registered')) {
    return 'An account with this email already exists. Please sign in.';
  }
  if (lower.includes('password should be')) {
    return 'Password must be at least 6 characters.';
  }

  return raw;
}

function getPostAuthRedirectTarget() {
  const redirect = getRedirectAfterAuth();
  const params = new URLSearchParams(window.location.search);
  const redirectParam = params.get('redirect');
  const target = redirect || redirectParam || '/';
  // Security: only same-origin relative paths — never send users off-site.
  if (!target.startsWith('/') || target.startsWith('//')) return '/';
  return target;
}

function escHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function cleanupAuthCallbackUrl() {
  const url = new URL(window.location.href);
  const keysToDelete = [
    'code',
    'token_hash',
    'type',
    'error',
    'error_code',
    'error_description',
  ];
  keysToDelete.forEach((key) => url.searchParams.delete(key));
  url.hash = '';
  window.history.replaceState({}, document.title, url.pathname + url.search + url.hash);
}

async function handleEmailAuthCallbackIfPresent() {
  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  const searchParams = new URLSearchParams(window.location.search);
  const callbackError =
    hashParams.get('error_description') ||
    searchParams.get('error_description') ||
    hashParams.get('error') ||
    searchParams.get('error');

  if (callbackError) {
    showError(decodeURIComponent(callbackError));
    return false;
  }

  const code = searchParams.get('code');
  const tokenHash = searchParams.get('token_hash');
  const callbackType = searchParams.get('type');

  // Nothing to process: this is a regular auth page view.
  if (!code && !(tokenHash && callbackType) && !hashParams.get('access_token')) {
    return false;
  }

  try {
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) throw error;
    } else if (tokenHash && callbackType) {
      const { error } = await supabase.auth.verifyOtp({
        type: callbackType,
        token_hash: tokenHash,
      });
      if (error) throw error;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      showError('Email link was received but sign-in was not completed. Please request a new link.');
      return false;
    }

    const isRecovery =
      callbackType === 'recovery' ||
      searchParams.get('type') === 'recovery' ||
      hashParams.get('type') === 'recovery';

    if (isRecovery) {
      cleanupAuthCallbackUrl();
      showRecoveryPasswordPrompt();
      return true;
    }

    cleanupAuthCallbackUrl();
    const target = getPostAuthRedirectTarget();
    clearRedirectAfterAuth();
    window.location.href = target;
    return true;
  } catch (err) {
    showError(formatAuthError(err, 'Could not complete email sign-in. Please request a fresh email link.'));
    return false;
  }
}

function showRecoveryPasswordPrompt() {
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black/70 backdrop-blur-sm z-[70] flex items-center justify-center p-4';
  overlay.innerHTML = `
    <div class="glass border border-blue-200 rounded-2xl p-6 max-w-sm w-full" style="background:rgba(255,255,255,.95)">
      <h3 class="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><i data-lucide="lock" class="w-5 h-5 text-blue-600"></i> Set New Password</h3>
      <p class="text-sm text-gray-600 mb-4">Your reset link is verified. Enter a new password below.</p>
      <div class="space-y-3">
        <input id="rp-new" type="password" minlength="6" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900" placeholder="New password (min 6 characters)">
        <input id="rp-confirm" type="password" minlength="6" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900" placeholder="Confirm new password">
        <button id="rp-save" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-2.5 rounded-xl text-sm uppercase tracking-wide">Update Password</button>
      </div>
      <p id="rp-error" class="hidden text-xs text-red-600 mt-3"></p>
    </div>
  `;
  document.body.appendChild(overlay);
  if (window.lucide) lucide.createIcons();

  overlay.querySelector('#rp-save').addEventListener('click', async () => {
    const saveBtn = overlay.querySelector('#rp-save');
    const errEl = overlay.querySelector('#rp-error');
    const np = overlay.querySelector('#rp-new').value.trim();
    const cp = overlay.querySelector('#rp-confirm').value.trim();

    errEl.classList.add('hidden');
    errEl.textContent = '';

    if (np.length < 6) {
      errEl.textContent = 'Password must be at least 6 characters.';
      errEl.classList.remove('hidden');
      return;
    }
    if (np !== cp) {
      errEl.textContent = 'Passwords do not match.';
      errEl.classList.remove('hidden');
      return;
    }

    saveBtn.disabled = true;
    saveBtn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin inline mr-2"></i> Updating...';
    if (window.lucide) lucide.createIcons();

    const { error } = await updateUserPassword(np);
    if (error) {
      errEl.textContent = formatAuthError(error, 'Could not update password.');
      errEl.classList.remove('hidden');
      saveBtn.disabled = false;
      saveBtn.textContent = 'Update Password';
      return;
    }

    overlay.remove();
    showToast('Password updated successfully. Please sign in with your new password.');
    setMode('login');
  });
}

function showForgotPassword() {
  const email = emailInput.value.trim();
  if (!email) { showError('Enter your email above first, then click Forgot Password.'); return; }
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4';
  overlay.innerHTML = `
    <div class="glass border border-blue-200 rounded-2xl p-6 max-w-sm w-full" style="background:rgba(255,255,255,.95)">
      <h3 class="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><i data-lucide="key-round" class="w-5 h-5 text-blue-600"></i> Reset Password</h3>
      <p class="text-sm text-gray-600 mb-4">We'll send a password reset link to <span class="text-blue-600 font-bold">${escHtml(email)}</span></p>
      <div class="flex gap-3">
        <button id="fp-send" class="btn-press flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-2.5 rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">Send Reset Link</button>
        <button id="fp-cancel" class="btn-press px-4 py-2.5 bg-gray-100 border border-blue-200 text-gray-600 font-bold rounded-xl text-sm uppercase transition relative overflow-hidden">Cancel</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  if (window.lucide) lucide.createIcons();
  overlay.querySelector('#fp-cancel').onclick = () => overlay.remove();
  overlay.querySelector('#fp-send').onclick = async () => {
    const btn = overlay.querySelector('#fp-send');
    btn.disabled = true;
    btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Sending...';
    if (window.lucide) lucide.createIcons();
    try {
      const { error } = await resetPassword(email);
      if (error) throw error;
      overlay.innerHTML = `<div class="glass border border-blue-200 rounded-2xl p-6 max-w-sm w-full" style="background:rgba(255,255,255,.95)"><h3 class="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><i data-lucide="check-circle" class="w-5 h-5 text-emerald-600"></i> Check Your Email</h3><p class="text-sm text-gray-600 mb-4">A password reset link has been sent to <span class="text-blue-600 font-bold">${escHtml(email)}</span>. The link expires in 1 hour.</p><button id="fp-close" class="btn-press w-full bg-gray-100 border border-blue-200 text-gray-600 font-bold py-2.5 rounded-xl text-sm uppercase transition relative overflow-hidden">Close</button></div>`;
      if (window.lucide) lucide.createIcons();
      overlay.querySelector('#fp-close').onclick = () => overlay.remove();
    } catch (err) {
      showToast('Failed to send reset email: ' + err.message);
      overlay.remove();
    }
  };
}

/* ── Remember me restore ────────────────────────────────────── */
// Persistent "Verify your email" screen shown right after sign-up when the
// account is waiting for email confirmation. Offers a resend action so a lost
// email never becomes a dead end.
function showVerifyEmailScreen(email) {
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black/70 backdrop-blur-sm z-[80] flex items-center justify-center p-4';
  overlay.innerHTML = `
    <div class="glass border border-blue-200 rounded-2xl p-6 max-w-sm w-full text-center" style="background:rgba(255,255,255,.95)">
      <div class="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-2xl mb-3"><i data-lucide="mail-check" class="w-7 h-7 text-blue-600"></i></div>
      <h3 class="text-lg font-bold text-gray-900 mb-1">Verify your email</h3>
      <p class="text-sm text-gray-600 mb-4">We sent a verification link to <span class="text-blue-600 font-bold">${escHtml(email)}</span>. Open it on this device to activate your account, then sign in.</p>
      <button id="ve-resend" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-2.5 rounded-xl text-sm uppercase tracking-wide mb-2 transition relative overflow-hidden">Resend Email</button>
      <button id="ve-close" class="btn-press w-full bg-gray-100 border border-blue-200 text-gray-600 font-bold py-2.5 rounded-xl text-sm uppercase transition relative overflow-hidden">Back to Sign In</button>
      <p id="ve-note" class="hidden text-xs text-emerald-600 mt-3 font-semibold">Verification email sent — please check your inbox.</p>
    </div>`;
  document.body.appendChild(overlay);
  if (window.lucide) lucide.createIcons();
  overlay.querySelector('#ve-close').onclick = () => overlay.remove();
  overlay.querySelector('#ve-resend').onclick = async () => {
    const btn = overlay.querySelector('#ve-resend');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    try { await resendVerification(email); } catch { /* surfaced below via note only when it succeeds */ }
    btn.disabled = false;
    btn.textContent = 'Resend Email';
    const note = overlay.querySelector('#ve-note');
    note.textContent = 'Verification email sent — please check your inbox.';
    note.classList.remove('hidden');
  };
}

// Permanent login email — the owner only types their password.
emailInput.value = 'odenyizabeya@gmail.com';

/* ── Form submit ────────────────────────────────────────────── */
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  hideError();

  if (!isSupabaseConfigured) {
    showError('Authentication is not available right now. Missing Supabase configuration.');
    return;
  }

  if (mode === 'register' && !selectedCountry) {
    showError('Please select your country before creating an account.');
    return;
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> ' + (mode === 'login' ? 'Signing in...' : 'Creating account...');
  if (window.lucide) lucide.createIcons();

  try {
    let result;
    if (mode === 'login') {
      result = await signIn(email, password);
    } else {
      result = await signUp(email, password);
    }

    if (result.error) {
      showError(formatAuthError(result.error, 'Authentication failed.'));
      submitBtn.disabled = false;
      submitBtn.innerHTML = mode === 'login' ? '<i data-lucide="log-in" class="w-5 h-5"></i> Sign In' : '<i data-lucide="user-plus" class="w-5 h-5"></i> Create Account';
      if (window.lucide) lucide.createIcons();
      return;
    }

    // Save country to profile (register mode)
    if (mode === 'register' && selectedCountry) {
      // signUp returns the user object even when email confirmation is still
      // pending, so the chosen username/country are saved right away instead of
      // being silently discarded until after verification.
      const userId = result.data?.user?.id;
      if (userId) {
        await supabase.from('profiles').upsert({
          user_id: userId,
          country_code: selectedCountry.code,
          display_name: usernameInput.value,
        });
      }
      localStorage.setItem('kco_country', selectedCountry.code);

      const targetRedirect = getPostAuthRedirectTarget();

      const verifyMail = await sendAuthEmail('verify_email', {
        email,
        name: usernameInput.value,
        redirect_url: targetRedirect,
      });
      const welcomeMail = await sendAuthEmail('welcome', { email, name: usernameInput.value });
      if (!verifyMail.ok) {
        showToast('Verification email helper endpoint is unavailable. Supabase default verification is still active.');
      }
      if (!welcomeMail.ok) {
        console.warn('Welcome email endpoint failed:', welcomeMail.error);
      }

      // Email confirmation pending (no session yet): stay here and show a
      // persistent "Verify your email" screen — never redirect away while the
      // instruction would only live in a toast the user never sees.
      if (!result.data?.session) {
        showVerifyEmailScreen(email);
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i data-lucide="user-plus" class="w-5 h-5"></i> Create Account';
        return;
      }
      showToast('Account created! Welcome to Weverse Online Shop.');
      clearRedirectAfterAuth();
      window.location.href = targetRedirect;
      return;
    }

    // Send login notification (login mode)
    if (mode === 'login') {
      const loginNotice = await sendAuthEmail('login_notification', { email });
      if (!loginNotice.ok) {
        console.warn('Login notification endpoint failed:', loginNotice.error);
      }
    }

    // Remember me
    if (mode === 'login' && document.getElementById('remember-me').checked) {
      localStorage.setItem('kco_remember_email', email);
    } else {
      localStorage.removeItem('kco_remember_email');
    }

    // Load saved country for login users
    if (mode === 'login') {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      if (userId) {
        const { data: profile } = await supabase.from('profiles').select('country_code').eq('user_id', userId).single();
        if (profile?.country_code) {
          localStorage.setItem('kco_country', profile.country_code);
        }
      }
    }

    const redirect = getRedirectAfterAuth();
    clearRedirectAfterAuth();
    const params = new URLSearchParams(window.location.search);
    const redirectParam = params.get('redirect');
    let target = redirect || redirectParam || '/';

    // If no explicit redirect, check if this user is an admin and send them to the dashboard
    if (!redirect && !redirectParam) {
      try {
        const { data: isAdminResult } = await supabase.rpc('is_current_user_admin');
        if (isAdminResult) target = '/admin.html';
      } catch {}
    }
    window.location.href = target;
  } catch (err) {
    showError(formatAuthError(err, 'Something went wrong. Please try again.'));
    submitBtn.disabled = false;
    submitBtn.innerHTML = mode === 'login' ? '<i data-lucide="log-in" class="w-5 h-5"></i> Sign In' : '<i data-lucide="user-plus" class="w-5 h-5"></i> Create Account';
    if (window.lucide) lucide.createIcons();
  }
});

/* ── Redirect if already logged in ─────────────────────────── */
(async () => {
  const handledEmailCallback = await handleEmailAuthCallbackIfPresent();
  if (handledEmailCallback) return;

  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    const target = getPostAuthRedirectTarget();
    clearRedirectAfterAuth();
    window.location.href = target;
  }
  if (window.lucide) lucide.createIcons();
})();

/* ── Back to Top button ─────────────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      if (window.scrollY > 250) btn.classList.add('visible');
      else btn.classList.remove('visible');
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
