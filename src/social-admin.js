// ═══════════════════════════════════════════════════════════════════
//  SOCIAL MEDIA PUBLISHING — ADMIN DASHBOARD (Marketing / Social Media
//  Automation + Settings → Social Media Integrations)
//
//  Real integration only: official platform APIs, server-side secrets,
//  encrypted token storage, automatic + manual posting, scheduling,
//  content queue, history, logs, retries and duplicate protection.
//  No fake dashboards, no password collection, no scraping/bots.
// ═══════════════════════════════════════════════════════════════════
import { supabase } from './supabase-client.js';

const API_BASE = (import.meta.env.VITE_SOCIAL_API_BASE || '').replace(/\/$/, '');

const TABS = [
  { id: 'overview', label: 'Overview', icon: 'layout-dashboard' },
  { id: 'accounts', label: 'Connected Accounts', icon: 'link-2' },
  { id: 'auto', label: 'Automatic Posting', icon: 'bot' },
  { id: 'manual', label: 'Manual Posting', icon: 'pen-line' },
  { id: 'schedule', label: 'Posting Schedule', icon: 'calendar-clock' },
  { id: 'queue', label: 'Content Queue', icon: 'list-checks' },
  { id: 'published', label: 'Published Posts', icon: 'check-circle-2' },
  { id: 'failed', label: 'Failed Posts', icon: 'alert-triangle' },
  { id: 'logs', label: 'Post Logs', icon: 'scroll-text' },
  { id: 'platforms', label: 'Platform Settings', icon: 'settings-2' },
  { id: 'apistatus', label: 'API Connection Status', icon: 'server' },
];

let tab = 'overview';

// ── tiny helpers ───────────────────────────────────────────────────
function esc(t) {
  if (t == null) return '';
  const d = document.createElement('div'); d.textContent = String(t); return d.innerHTML;
}
function toast(msg, type = 'success') {
  const t = document.getElementById('toast'); const m = document.getElementById('toast-msg');
  if (!t || !m) { alert(msg); return; }
  m.textContent = msg;
  const icon = t.querySelector('i[data-lucide]');
  const iconMap = { success: 'check-circle', error: 'alert-circle', info: 'info' };
  const colorMap = { success: 'text-emerald-400', error: 'text-red-400', info: 'text-blue-400' };
  if (icon) { icon.setAttribute('data-lucide', iconMap[type] || 'info'); icon.className = `w-4 h-4 shrink-0 ${colorMap[type] || 'text-blue-400'}`; }
  t.style.transform = 'translateY(0)'; t.style.opacity = '1';
  if (window.lucide) lucide.createIcons();
  clearTimeout(t._t);
  t._t = setTimeout(() => { t.style.transform = 'translateY(20px)'; t.style.opacity = '0'; }, 3200);
}
function loading() { return '<div class="flex items-center justify-center py-28"><div class="flex items-center gap-3 text-gray-400 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading…</div></div>'; }
function empty(msg, icon = 'inbox') {
  return `<div class="flex flex-col items-center justify-center py-16 text-center"><div class="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4"><i data-lucide="${icon}" class="w-8 h-8 text-blue-400"></i></div><p class="text-sm text-gray-500 max-w-xs">${esc(msg)}</p></div>`;
}
function icons() { if (window.lucide) { try { lucide.createIcons(); } catch (e) {} } }
function fmtDT(d) { return d ? new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'; }

async function sessionToken() {
  const { data } = await supabase.auth.getSession();
  return data?.session?.access_token || '';
}

async function api(path, opts = {}) {
  const token = await sessionToken();
  const headers = {
    'authorization': `Bearer ${token}`,
    'content-type': 'application/json',
    ...(opts.headers || {}),
  };
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  let body = {};
  try { body = await res.json(); } catch (e) { body = {}; }
  if (!res.ok) throw Object.assign(new Error(body?.error || `Request failed (HTTP ${res.status})`), { status: res.status, code: body.code });
  return body;
}

async function uploadSocialFile(file) {
  const ext = (file.name.split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '');
  const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from('social-posts').upload(path, file, { contentType: file.type, upsert: false, cacheControl: '3600' });
  if (error) throw error;
  const { data } = supabase.storage.from('social-posts').getPublicUrl(path);
  const isVideo = (file.type || '').startsWith('video/') || /\.(mp4|webm|mov|m4v)$/i.test(file.name);
  return { url: data.publicUrl, type: isVideo ? 'video' : 'image' };
}

const PLATFORM_META = {
  tiktok: { label: 'TikTok', icon: 'music-2', tone: 'text-white' },
  telegram: { label: 'Telegram', icon: 'send', tone: 'text-sky-400' },
  facebook: { label: 'Facebook Pages', icon: 'thumbs-up', tone: 'text-blue-400' },
  instagram: { label: 'Instagram', icon: 'camera', tone: 'text-pink-400' },
  youtube: { label: 'YouTube', icon: 'youtube', tone: 'text-red-400' },
  x: { label: 'X (Twitter)', icon: 'twitter', tone: 'text-gray-300' },
  pinterest: { label: 'Pinterest', icon: 'pinterest', tone: 'text-red-500' },
  linkedin: { label: 'LinkedIn', icon: 'linkedin', tone: 'text-sky-500' },
  whatsapp: { label: 'WhatsApp Channels', icon: 'message-circle', tone: 'text-emerald-400' },
};
function platformIcon(p) { return PLATFORM_META[p]?.icon || 'share-2'; }
function platformName(p) { return PLATFORM_META[p]?.label || p; }

function badge(status) {
  const map = {
    connected: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    disconnected: 'bg-gray-500/15 text-gray-300 border-gray-500/30',
    error: 'bg-red-500/15 text-red-300 border-red-500/30',
    revoked: 'bg-red-500/15 text-red-300 border-red-500/30',
    requires_approval: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    expired: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    not_connected: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    draft: 'bg-gray-500/15 text-gray-300 border-gray-500/30',
    scheduled: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    queued: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    publishing: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    published: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    failed: 'bg-red-500/15 text-red-300 border-red-500/30',
    cancelled: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    paused: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    enabled: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    disabled: 'bg-gray-500/15 text-gray-400 border-gray-500/25',
  };
  return map[status] || map.not_connected;
}
function pill(status) { return `<span class="badge ${badge(status)}">${esc(status.replace(/_/g, ' '))}</span>`; }

// ── entry ──────────────────────────────────────────────────────────
export function renderSocialMedia(initialTab = 'overview') {
  tab = TABS.find((t) => t.id === initialTab) ? initialTab : 'overview';
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="space-y-4 fade-in">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 class="text-xl font-black text-white flex items-center gap-2"><i data-lucide="share-2" class="w-5 h-5 text-blue-400"></i> Social Media Automation</h2>
          <p class="text-xs text-gray-500 mt-1">Automatic posting runs from the server. Connect official accounts below — nothing posts until you authorize and connect.</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="window.socialRunScheduler()" class="btn-press px-3 py-2 rounded-xl text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition"><i data-lucide="zap" class="w-3.5 h-3.5 inline mr-1"></i>Run now</button>
        </div>
      </div>
      <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        ${TABS.map((t) => `<button onclick="window.socialNav('${t.id}')" class="tab-btn ${tab === t.id ? 'active' : ''}">${t.label}</button>`).join('')}
      </div>
      <div id="social-body"></div>
    </div>`;
  icons();
  loadTab(tab);
}

window.socialNav = async function (id) {
  tab = id;
  document.querySelectorAll('#content .tab-btn').forEach((b, i) => b.classList.toggle('active', TABS[i]?.id === id));
  await loadTab(id);
};

async function loadTab(id) {
  const body = document.getElementById('social-body');
  if (!body) return;
  body.innerHTML = loading(); icons();
  const loaders = {
    overview: loadOverview,
    accounts: loadAccounts,
    auto: loadAuto,
    manual: loadManual,
    schedule: loadSchedule,
    queue: loadQueue,
    published: loadPublished,
    failed: loadFailed,
    logs: loadLogs,
    platforms: loadPlatforms,
    apistatus: loadApiStatus,
  };
  await (loaders[id] || loadOverview)(body);
}

async function fetchStatus() {
  const data = await api('/api/social/status');
  return data;
}

// ══════════════ OVERVIEW ══════════════
let _lastStatus = null;
async function loadOverview(body) {
  try {
    const statusData = await fetchStatus();
    _lastStatus = statusData;
    const s = statusData.settings || {};
    const rules = await supabase.from('social_automation_rules').select('*').order('created_at', { ascending: false });
    const posts = await supabase.from('social_posts').select('*').order('created_at', { ascending: false }).limit(300);
    const nextPosts = (posts.data || []).filter((p) => p.status === 'scheduled' || (p.status === 'queued' && p.created_at)).sort((a, b) => new Date(a.scheduled_for || a.created_at) - new Date(b.scheduled_for || b.created_at));
    const next = nextPosts[0] || null;
    const counts = (posts.data || []).reduce((a, p) => { a[p.status] = (a[p.status] || 0) + 1; return a; }, {});
    const connected = (statusData.accounts || []).filter((a) => a.status === 'connected');
    const requireApproval = Boolean((rules.data || []).some((r) => r.approval_mode === 'manual' || (r.enabled && s.require_approval)));

    body.innerHTML = `
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        ${statCard('bot', s.auto_posting_enabled ? 'ON' : 'OFF', 'Automatic Posting', s.auto_posting_enabled ? 'text-emerald-300' : 'text-gray-300')}
        ${statCard('power', s.automation_paused ? 'Paused' : 'Running', 'Automation Status', s.automation_paused ? 'text-amber-300' : 'text-emerald-300')}
        ${statCard('link-2', String(connected.length), 'Connected Accounts', 'text-blue-300')}
        ${statCard('share-2', String(counts.published || 0), 'Published Posts', 'text-emerald-300')}
        ${statCard('calendar-clock', String(counts.scheduled || 0), 'Scheduled', 'text-amber-300')}
        ${statCard('list-checks', String(counts.queued || 0), 'In Queue', 'text-sky-300')}
        ${statCard('alert-triangle', String(counts.failed || 0), 'Failed', 'text-red-300')}
        ${statCard('hourglass', String(counts.draft || 0), 'Awaiting Approval', requireApproval ? 'text-violet-300' : 'text-gray-300')}
      </div>

      <div class="grid lg:grid-cols-3 gap-4">
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3 lg:col-span-2">
          <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="share-2" class="w-4 h-4 text-blue-400"></i> Platform Connection Status</h3>
          ${(statusData.platforms || []).map((p) => `
            <div class="flex items-center gap-3 p-3 bg-white/[.03] border border-white/5 rounded-xl">
              <div class="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0"><i data-lucide="${platformIcon(p.id)}" class="w-4 h-4 ${PLATFORM_META[p.id]?.tone || 'text-gray-300'}"></i></div>
              <div class="min-w-0 flex-1">
                <p class="text-xs font-bold text-white">${platformName(p.id)}</p>
                <p class="text-[11px] text-gray-500 truncate">${p.connected ? (p.accountName || 'connected') : (p.configured ? (p.requiresApproval ? 'Requires approval' : 'Not connected') : 'API not configured')}</p>
              </div>
              <div class="flex items-center gap-2">
                ${!p.configured ? '<span class="badge bg-amber-500/15 text-amber-300 border-amber-500/30">setup needed</span>' : p.connected ? pill('connected') : p.requiresApproval ? '<span class="badge bg-amber-500/15 text-amber-300 border-amber-500/30">approval</span>' : pill('not_connected')}
                <button onclick="window.socialNav('accounts')" class="btn-press text-[11px] font-bold text-blue-300 hover:text-white transition px-2 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">Manage</button>
              </div>
            </div>`).join('') || empty('No platforms available.')}
        </div>

        <div class="space-y-4">
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-5">
            <h3 class="text-sm font-black text-white flex items-center gap-2 mb-3"><i data-lucide="calendar-clock" class="w-4 h-4 text-amber-300"></i> Next Scheduled Post</h3>
            ${next ? `
              <p class="text-xs text-gray-400 mb-1">${fmtDT(next.scheduled_for || next.created_at)}</p>
              <p class="text-sm text-white font-bold mb-2">${platformName(next.platform)}${next.caption ? ' · ' + esc(next.caption.slice(0, 60)) : ''}</p>
              <div class="flex gap-1 flex-wrap">${pill(next.status)}</div>` : empty('No upcoming posts. Create one under Manual Posting or enable an automation rule.', 'hourglass')}
          </div>
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-5">
            <h3 class="text-sm font-black text-white mb-3">Quick Actions</h3>
            <div class="grid grid-cols-2 gap-2">
              ${[
                { icon: 'bot', label: 'Automatic Posting', fn: "window.socialNav('auto')" },
                { icon: 'pen-line', label: 'Manual Posting', fn: "window.socialNav('manual')" },
                { icon: 'list-checks', label: 'Content Queue', fn: "window.socialNav('queue')" },
                { icon: 'settings-2', label: 'Platform Settings', fn: "window.socialNav('platforms')" },
              ].map((b) => `<button onclick="${b.fn}" class="btn-press p-3 bg-white/[.03] border border-white/10 rounded-xl text-left hover:border-blue-500/40 transition"><i data-lucide="${b.icon}" class="w-4 h-4 text-blue-400 mb-1.5 inline-block"></i><p class="text-[11px] font-bold text-white">${b.label}</p></button>`).join('')}
            </div>
          </div>
        </div>
      </div>`;
    icons();
    body.querySelectorAll('#social-body'); // noop keep linter happy
  } catch (err) {
    body.innerHTML = `<div class="glass-soft border border-red-500/20 rounded-2xl p-5 text-sm text-red-300">Could not load overview: ${esc(err.message)}</div>`;
  }
}

function statCard(icon, value, label, colorClass) {
  return `<div class="stat-card glass-soft border border-blue-500/15 rounded-3xl p-5">
    <div class="flex items-center gap-3 mb-2"><i data-lucide="${icon}" class="w-5 h-5 ${colorClass}"></i></div>
    <p class="text-3xl font-black text-white">${esc(value)}</p>
    <p class="text-xs text-gray-500 uppercase tracking-wide mt-1 font-bold">${esc(label)}</p>
  </div>`;
}

// ══════════════ CONNECTED ACCOUNTS ══════════════
async function loadAccounts(body) {
  try {
    const data = await api('/api/social/accounts');
    const st = await fetchStatus();
    const platformMeta = st.platforms || [];
    const accounts = data.accounts || [];

    body.innerHTML = `
      <div class="space-y-3">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <p class="text-xs text-gray-500">Official OAuth connections only. Accounts are stored server-side with encrypted tokens. No passwords are ever requested.</p>
          <div class="flex gap-2">
            <select id="acct-filter" onchange="window.socialAccountsFilter()" class="input-field !w-44 !py-2 !px-3 !text-xs">
              <option value="">All platforms</option>
              ${platformMeta.map((p) => `<option value="${p.id}">${esc(p.label)}</option>`).join('')}
            </select>
            <button onclick="window.socialRefresh()" class="btn-press px-3 py-2 rounded-xl text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition"><i data-lucide="refresh-cw" class="w-3.5 h-3.5 inline mr-1"></i>Refresh</button>
          </div>
        </div>
        <div id="acct-grid" class="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
          ${platformMeta.map((p) => accountCard(p, accounts.find((a) => a.platform === p.id))).join('')}
        </div>
      </div>`;
    icons();
  } catch (err) {
    body.innerHTML = `<div class="glass-soft border border-red-500/20 rounded-2xl p-5 text-sm text-red-300">${esc(err.message)}</div>`;
  }
}

window.socialAccountsFilter = function () {
  const f = document.getElementById('acct-filter')?.value || '';
  document.querySelectorAll('#acct-grid > [data-platform]').forEach((el) => { el.style.display = !f || el.dataset.platform === f ? '' : 'none'; });
};
window.socialRefresh = () => { loadAccounts(document.getElementById('social-body')); };

function accountCard(meta, account) {
  const connected = account?.status === 'connected';
  return `
    <div data-platform="${meta.id}" class="glass-soft border ${connected ? 'border-emerald-500/25' : 'border-blue-500/15'} rounded-2xl p-4 space-y-3">
      <div class="flex items-start justify-between gap-2">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0"><i data-lucide="${platformIcon(meta.id)}" class="w-5 h-5 ${PLATFORM_META[meta.id]?.tone || 'text-gray-300'}"></i></div>
          <div class="min-w-0">
            <p class="text-xs font-black text-white truncate">${esc(meta.label)}</p>
            <p class="text-[11px] text-gray-500 truncate">${connected ? esc(account.accountName || account.display_name || 'Connected') : 'Not connected'}</p>
          </div>
        </div>
        ${connected ? pill('connected') : meta.configured ? pill('not_connected') : '<span class="badge bg-amber-500/15 text-amber-300 border-amber-500/30">setup needed</span>'}
      </div>

      <p class="text-[11px] text-gray-500 leading-relaxed">${esc(meta.requirements?.note || meta.approvalNote || '')}</p>

      ${meta.requiresApproval ? `<div class="flex items-start gap-2 p-2.5 bg-amber-500/10 border border-amber-500/25 rounded-xl"><i data-lucide="alert-circle" class="w-4 h-4 text-amber-300 shrink-0 mt-0.5"></i><p class="text-[11px] text-amber-200 leading-relaxed">${esc(meta.approvalNote || meta.requirements?.note || 'This platform may require app review / business verification / paid access before posting.')}</p></div>` : ''}

      ${connected ? `
        <div class="grid grid-cols-2 gap-2">
          <button onclick="window.socialValidate('${account.id}')" class="btn-press py-2 rounded-xl text-[11px] font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition"><i data-lucide="shield-check" class="w-3.5 h-3.5 inline mr-1"></i>Validate</button>
          <button onclick="window.socialDisconnect('${account.id}','${meta.id}')" class="btn-press py-2 rounded-xl text-[11px] font-bold bg-red-500/10 text-red-300 border border-red-500/25 hover:bg-red-500/20 transition"><i data-lucide="unplug" class="w-3.5 h-3.5 inline mr-1"></i>Disconnect</button>
          <button onclick="window.socialReconnect('${meta.id}')" class="btn-press py-2 rounded-xl text-[11px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/25 hover:bg-amber-500/20 transition col-span-2"><i data-lucide="rotate-cw" class="w-3.5 h-3.5 inline mr-1"></i>Reconnect</button>
        </div>
        ${account.last_error ? `<p class="text-[11px] text-red-300 truncate" title="${esc(account.last_error)}">Last error: ${esc(account.last_error)}</p>` : ''}`
    : `
        <button onclick="window.socialConnect('${meta.id}')" class="btn-press w-full py-2.5 rounded-xl text-[11px] font-bold ${meta.configured ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500' : 'bg-gray-500/15 text-gray-400 border border-gray-500/25 cursor-not-allowed'} transition" ${!meta.configured ? 'disabled' : ''}><i data-lucide="plug" class="w-3.5 h-3.5 inline mr-1"></i>Connect ${esc(meta.label)}</button>
        ${!meta.configured ? `<p class="text-[10px] text-amber-300/80">Set the server environment variables first (see .env.example).</p>` : ''}`}
    </div>`;
}

window.socialConnect = async function (platform) {
  try {
    const st = await fetchStatus();
    const meta = (st.platforms || []).find((p) => p.id === platform);
    if (!meta?.configured) { toast('API credentials are not configured server-side.', 'error'); return; }
    if (meta.usesOAuth) {
      window.location.href = `${API_BASE}/api/social/oauth/start?platform=${encodeURIComponent(platform)}`;
      return;
    }
    await api('/api/social/accounts', { method: 'POST', body: JSON.stringify({ action: 'connect', platform }) });
    toast(`${platformName(platform)} connected.`);
    loadAccounts(document.getElementById('social-body'));
  } catch (err) {
    toast(err.message, 'error');
  }
};

window.socialValidate = async function (accountId) {
  try {
    const r = await api('/api/social/accounts', { method: 'POST', body: JSON.stringify({ action: 'validate', account_id: accountId }) });
    toast(r.note || 'Connection is valid.');
    loadAccounts(document.getElementById('social-body'));
  } catch (err) { toast(err.message, 'error'); }
};

window.socialDisconnect = async function (accountId, platform) {
  if (!confirm(`Disconnect your ${platformName(platform)} account? Tokens will be wiped from the server.`)) return;
  try {
    await api('/api/social/accounts', { method: 'POST', body: JSON.stringify({ action: 'disconnect', account_id: accountId }) });
    toast(`${platformName(platform)} disconnected.`);
    loadAccounts(document.getElementById('social-body'));
  } catch (err) { toast(err.message, 'error'); }
};

window.socialReconnect = async function (platform) {
  window.socialConnect(platform);
};

window.socialRunScheduler = async function () {
  try {
    const token = await sessionToken();
    const key = localStorage.getItem('kco_cron_secret') || '';
    const res = await fetch(`${API_BASE}/api/social/scheduler`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...(key ? { 'x-cron-secret': key } : {}) },
      body: JSON.stringify({}),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      toast(body?.error || 'Scheduler requires the admin secret (set SCHEDULER_CRON_SECRET).', 'error');
      return;
    }
    toast(`Scheduler tick complete · ${body.published ?? 0} published · ${body.scheduledEnqueued ?? 0} enqueued`);
    loadTab('overview');
  } catch (err) { toast(err.message, 'error'); }
};

// ══════════════ AUTOMATIC POSTING ══════════════
let _rules = [];
let _ruleSourceCache = { products: [], content: [], promos: [] };

async function loadAuto(body) {
  try {
    const s = await fetchStatus();
    const settings = s.settings || {};
    const rules = await supabase.from('social_automation_rules').select('*').order('created_at', { ascending: false });
    _rules = rules.data || [];

    const globalCard = `
      <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3">
        <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="settings" class="w-4 h-4 text-blue-400"></i> Global Automation Controls</h3>
        <div class="grid sm:grid-cols-2 gap-3">
          ${toggleRow('Master switch', 'When ON, the server picks content and posts automatically to connected accounts.', 'auto_posting_enabled', settings.auto_posting_enabled, `window.socialToggleGlobal('auto_posting_enabled')`)}
          ${toggleRow('Pause all automation', 'Temporarily stops ALL automatic and scheduled publishing. Resume anytime.', 'automation_paused', settings.automation_paused, `window.socialToggleGlobal('automation_paused')`)}
          ${toggleRow('Approve posts before publishing', 'Auto-generated posts stay in the Content Queue as drafts until you approve them.', 'require_approval', settings.require_approval, `window.socialToggleGlobal('require_approval')`)}
          <div class="p-3 rounded-xl bg-white/[.03] border border-white/10 flex items-center justify-between gap-3">
            <div><p class="text-xs font-bold text-white">Schedule heartbeat</p><p class="text-[11px] text-gray-500">The server-side scheduler wakes every 15 minutes (Vercel Cron).</p></div>
            <span class="badge bg-sky-500/15 text-sky-300 border-sky-500/30">*/15 * * * *</span>
          </div>
        </div>
      </div>`;

    const rulesList = `
      <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="bot" class="w-4 h-4 text-blue-400"></i> Automation Rules</h3>
          <button onclick="window.socialRuleForm()" class="btn-press px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 transition"><i data-lucide="plus" class="w-3.5 h-3.5 inline mr-1"></i>New Rule</button>
        </div>
        ${(_rules.length ? _rules.map(ruleCard).join('') : empty('No automation rules yet. Create one to automatically publish products, promotions or news on a schedule.', 'bot'))}
      </div>`;

    body.innerHTML = `${globalCard}<div class="grid gap-4">${rulesList}</div>`;
    icons();
  } catch (err) {
    body.innerHTML = `<div class="glass-soft border border-red-500/20 rounded-2xl p-5 text-sm text-red-300">${esc(err.message)}</div>`;
  }
}

function toggleRow(label, desc, key, value, onclick) {
  return `<div class="p-3 rounded-xl bg-white/[.03] border border-white/10 flex items-center justify-between gap-3">
    <div><p class="text-xs font-bold text-white">${esc(label)}</p><p class="text-[11px] text-gray-500">${esc(desc)}</p></div>
    <label class="toggle-switch"><input type="checkbox" ${value ? 'checked' : ''} onchange="${onclick}"><span class="toggle-slider"></span></label>
  </div>`;
}

window.socialToggleGlobal = async function (key) {
  try {
    const s = _lastStatus?.settings || {};
    const next = { ...s, [key]: !s[key] };
    const { error } = await supabase.from('social_settings').upsert({ id: 1, ...next });
    if (error) throw error;
    toast(key === 'automation_paused' ? (next[key] ? 'Automation paused.' : 'Automation resumed.') : 'Saved.');
    loadAuto(document.getElementById('social-body'));
  } catch (err) { toast(err.message, 'error'); }
};

function ruleCard(r) {
  const p = (r.enabled && !r.paused) ? 'enabled' : (r.paused ? 'paused' : 'disabled');
  const contentTypes = {
    products: 'New products (auto-pick new arrivals)',
    selected_products: 'Selected products',
    promotions: 'Promotions',
    content_items: 'News / articles (Content Items)',
  };
  const dayMap = { mon: 'M', tue: 'T', wed: 'W', thu: 'T', fri: 'F', sat: 'S', sun: 'S' };
  const runInfo = r.next_run_at ? `Next run ${fmtDT(r.next_run_at)}` : 'First run pending';
  return `
    <div data-rule="${r.id}" class="p-4 rounded-2xl bg-white/[.03] border border-white/10 space-y-3">
      <div class="flex items-start justify-between gap-2 flex-wrap">
        <div class="min-w-0">
          <p class="text-sm font-black text-white">${esc(r.name)}</p>
          <p class="text-[11px] text-gray-500 mt-0.5">${esc(contentTypes[r.content_type] || r.content_type)} · ${esc((r.platforms || []).map(platformName).join(', '))}</p>
        </div>
        <div class="flex items-center gap-2">${pill(p)} <span class="badge bg-blue-500/10 text-blue-300 border-blue-500/20">${esc(scheduleLabel(r))}</span></div>
      </div>
      <div class="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-500">
        <span><i data-lucide="zap" class="w-3 h-3 inline mr-1 text-amber-300"></i>${esc(r.max_posts_per_day ?? 1)} /day max</span>
        <span><i data-lucide="send" class="w-3 h-3 inline mr-1 text-sky-300"></i>${r.approval_mode === 'manual' ? 'Approval required' : 'Auto-publish'}</span>
        <span><i data-lucide="calendar-clock" class="w-3 h-3 inline mr-1 text-emerald-300"></i>${esc(runInfo)}</span>
        <span>${esc((r.schedule_days || []).length ? (r.schedule_days || []).map((d) => dayMap[d] || d).join(' ') : 'daily')} ${esc(r.schedule_time || '')}</span>
      </div>
      <div class="flex gap-2 flex-wrap">
        <button onclick="window.socialRuleForm('${r.id}')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition"><i data-lucide="pencil" class="w-3 h-3 inline mr-1"></i>Edit</button>
        <button onclick="window.socialToggleRule('${r.id}')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold ${r.paused ? 'bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25' : 'bg-amber-500/10 text-amber-300 border border-amber-500/25 hover:bg-amber-500/20'} transition">${r.paused ? '<i data-lucide="play" class="w-3 h-3 inline mr-1"></i>Resume' : r.enabled ? '<i data-lucide="pause" class="w-3 h-3 inline mr-1"></i>Pause' : '<i data-lucide="play" class="w-3 h-3 inline mr-1"></i>Enable'}</button>
        <button onclick="window.socialDeleteRule('${r.id}')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-red-500/10 text-red-300 border border-red-500/25 hover:bg-red-500/20 transition"><i data-lucide="trash-2" class="w-3 h-3 inline mr-1"></i>Delete</button>
      </div>
    </div>`;
}

function scheduleLabel(r) {
  const t = r.schedule_time || '';
  if (r.schedule_type === 'hourly') return `hourly`;
  if (r.schedule_type === 'interval') return `every ${r.interval_hours || 24}h`;
  if (r.schedule_type === 'weekly') return `weekly`;
  if (r.schedule_type === 'custom') return `custom`;
  return `daily ${t}`;
}

window.socialToggleRule = async function (id) {
  const r = _rules.find((x) => x.id === id); if (!r) return;
  let patch;
  if (r.paused) patch = { paused: false, enabled: true };
  else if (r.enabled) patch = { enabled: false };
  else patch = { enabled: true, paused: false };
  await supabase.from('social_automation_rules').update(patch).eq('id', id);
  toast('Rule updated.');
  loadAuto(document.getElementById('social-body'));
};

window.socialDeleteRule = async function (id) {
  if (!confirm('Delete this automation rule?')) return;
  await supabase.from('social_automation_rules').delete().eq('id', id);
  toast('Rule deleted.');
  loadAuto(document.getElementById('social-body'));
};

window.socialRuleForm = async function (id) {
  let r = _rules.find((x) => x.id === id);
  if (!r) r = { id: '', name: '', enabled: false, platforms: [], content_type: 'products', selected_ids: [], schedule_type: 'daily', schedule_time: '09:00', schedule_days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'], interval_hours: 24, max_posts_per_day: 1, approval_mode: 'auto', caption_template: '{{title}}\n{{price}}\n{{link}}', include_price: true, include_link: true, hashtags: '', paused: false };

  let productsHtml = '';
  try {
    const { data: prods } = await supabase.from('showroom_listings').select('property_id,title,listing_type,is_active').eq('is_active', true).limit(400);
    _ruleSourceCache.products = prods || [];
    productsHtml = prods.map((p) => `<div class="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5"><label class="flex items-center gap-2 text-xs text-gray-300 flex-1"><input type="checkbox" class="rule-sel" value="${esc(p.property_id)}" ${(r.selected_ids || []).includes(p.property_id) ? 'checked' : ''}><span class="truncate">${esc(p.title)} ${p.listing_type === 'property' ? '<span class="text-amber-300">(property)</span>' : ''}</span></label></div>`).join('');
  } catch (e) { productsHtml = ''; }

  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-box wide">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-base font-black text-white">${r.id ? 'Edit Automation Rule' : 'New Automation Rule'}</h3>
        <button onclick="document.querySelector('.modal-overlay').remove()" class="p-2 rounded-lg text-gray-400 hover:bg-white/5 transition"><i data-lucide="x" class="w-4 h-4"></i></button>
      </div>
      <div class="space-y-4 text-left max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="md:col-span-2"><label class="lbl">Rule name</label><input id="rule-name" class="input-field" value="${esc(r.name || '')}" placeholder="e.g. Daily new arrivals → TikTok & Telegram"></div>
          <div><label class="lbl">Content type</label><select id="rule-content" class="input-field" onchange="window.socialRuleContentChange()">
            ${['products', 'selected_products', 'promotions', 'content_items'].map((c) => `<option value="${c}" ${r.content_type === c ? 'selected' : ''}>${esc({ products: 'Auto-pick new products', selected_products: 'Selected products', promotions: 'Promotions', content_items: 'News / articles (Content Items)' }[c])}</option>`).join('')}
          </select></div>
          <div><label class="lbl">Platforms</label><select id="rule-platforms" class="input-field" style="min-height:80px" multiple>
            ${PLATFORM_META ? Object.keys(PLATFORM_META).filter((x) => x !== 'whatsapp').map((p) => `<option value="${p}" ${(r.platforms || []).includes(p) ? 'selected' : ''}>${esc(platformName(p))}</option>`).join('') : ''}
          </select><p class="text-[10px] text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple.</p></div>
          <div id="rule-period" class="grid grid-cols-2 gap-3">
            <div><label class="lbl">Schedule type</label><select id="rule-sched" class="input-field" onchange="window.socialRuleSchedChange()">
              ${['hourly', 'daily', 'weekly', 'interval', 'custom'].map((s) => `<option value="${s}" ${r.schedule_type === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select></div>
            <div id="sched-time-wrap"><label class="lbl">Post time</label><input id="rule-time" type="time" class="input-field" value="${esc(r.schedule_time || '09:00')}"></div>
          </div>
          <div id="sched-extra" class="md:col-span-2 grid grid-cols-2 gap-3">
            <div id="sched-days-wrap"><label class="lbl">Days</label><div class="flex gap-1 flex-wrap">
              ${['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((d) => `<label class="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-gray-300"><input type="checkbox" class="rule-day" value="${d}" ${(r.schedule_days || []).includes(d) ? 'checked' : ''} style="accent-color:#2563eb">${d.toUpperCase()}</label>`).join('')}
            </div></div>
            <div id="sched-interval-wrap"><label class="lbl">Interval (hours)</label><input id="rule-interval" type="number" class="input-field" value="${esc(r.interval_hours || 24)}" min="1" max="720"></div>
          </div>
          <div><label class="lbl">Max posts per day</label><input id="rule-max" type="number" class="input-field" value="${esc(r.max_posts_per_day ?? 1)}" min="1" max="24"></div>
          <div><label class="lbl">Publishing</label><select id="rule-approval" class="input-field">
            <option value="auto" ${r.approval_mode !== 'manual' ? 'selected' : ''}>Publish automatically without approval</option>
            <option value="manual" ${r.approval_mode === 'manual' ? 'selected' : ''}>Require my approval (goes to Content Queue)</option>
          </select></div>
          <div id="rule-selected-wrap" class="md:col-span-2 hidden">
            <label class="lbl">Selected products (check to include)</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 max-h-48 overflow-y-auto scrollbar-thin border border-white/10 rounded-xl p-2 bg-white/[.02]">${productsHtml || '<p class="text-xs text-gray-500 p-2">No active products found.</p>'}</div>
          </div>
          <div class="md:col-span-2"><label class="lbl">Caption template</label><textarea id="rule-caption" class="input-field" placeholder="{{title}} {{price}} {{link}}">${esc(r.caption_template || '{{title}}\n{{price}}\n{{link}}')}</textarea><p class="text-[10px] text-gray-500 mt-1">Variables: {{title}} {{price}} {{category}} {{brand}} {{site}} {{link}}</p></div>
          <div><label class="lbl">Hashtags</label><input id="rule-hashtags" class="input-field" value="${esc(r.hashtags || '')}" placeholder="#marketplace #newarrival"></div>
          <div class="grid grid-cols-2 gap-3">
            <label class="flex items-center gap-2 text-xs text-gray-300"><input type="checkbox" id="rule-price" ${r.include_price !== false ? 'checked' : ''} style="accent-color:#2563eb"> Include price</label>
            <label class="flex items-center gap-2 text-xs text-gray-300"><input type="checkbox" id="rule-link" ${r.include_link !== false ? 'checked' : ''} style="accent-color:#2563eb"> Include product link</label>
          </div>
        </div>
        <div class="flex items-center justify-end gap-2 border-t border-white/10 pt-4">
          <button onclick="document.querySelector('.modal-overlay').remove()" class="btn-press px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:bg-white/5 transition">Cancel</button>
          <button onclick="window.socialSaveRule('${r.id}')" class="btn-press px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 transition">Save Rule</button>
        </div>
      </div>
    </div>`;
  document.getElementById('modal-container').appendChild(modal);
  socialRuleSchedChange();
  socialRuleContentChange();
  icons();
};

window.socialRuleSchedChange = function () {
  const sel = document.getElementById('rule-sched')?.value || 'daily';
  const days = document.getElementById('sched-days-wrap'); const iv = document.getElementById('sched-interval-wrap'); const tw = document.getElementById('sched-time-wrap');
  days.style.display = (sel === 'weekly') ? 'block' : 'none';
  iv.style.display = (sel === 'interval') ? 'block' : 'none';
  tw.style.display = (sel === 'hourly' || sel === 'interval' || sel === 'custom' || sel === 'weekly') ? 'none' : 'block';
  if (sel === 'weekly') { days.style.display = 'block'; }
};

window.socialRuleContentChange = function () {
  const sel = document.getElementById('rule-content')?.value || 'products';
  const w = document.getElementById('rule-selected-wrap');
  w.classList.toggle('hidden', sel !== 'selected_products');
};

window.socialSaveRule = async function (id) {
  try {
    const platforms = Array.from(document.querySelectorAll('#rule-platforms option:checked')).map((o) => o.value);
    const days = Array.from(document.querySelectorAll('.rule-day:checked')).map((o) => o.value);
    const selectedIds = Array.from(document.querySelectorAll('.rule-sel:checked')).map((o) => o.value);
    if (!platforms.length) return toast('Select at least one platform.', 'error');

    const sched = document.getElementById('rule-sched').value;
    let scheduleTime = document.getElementById('rule-time')?.value || '09:00';
    let intervalHours = Number(document.getElementById('rule-interval')?.value) || 24;

    const payload = {
      name: document.getElementById('rule-name').value.trim() || 'Automation rule',
      enabled: false,
      paused: false,
      platforms,
      content_type: document.getElementById('rule-content').value,
      selected_ids: selectedIds,
      schedule_type: sched,
      schedule_time: scheduleTime,
      schedule_days: sched === 'weekly' ? days : ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
      interval_hours: intervalHours,
      max_posts_per_day: Number(document.getElementById('rule-max').value) || 1,
      approval_mode: document.getElementById('rule-approval').value,
      caption_template: document.getElementById('rule-caption').value || '{{title}}\n{{price}}\n{{link}}',
      hashtags: document.getElementById('rule-hashtags').value.trim(),
      include_price: document.getElementById('rule-price').checked,
      include_link: document.getElementById('rule-link').checked,
      next_run_at: new Date().toISOString(),
    };
    if (id) { await supabase.from('social_automation_rules').update(payload).eq('id', id); }
    else { await supabase.from('social_automation_rules').insert(payload); }
    document.querySelector('.modal-overlay')?.remove();
    toast('Rule saved. Enable it when ready.');
    loadAuto(document.getElementById('social-body'));
  } catch (err) { toast(err.message, 'error'); }
};

// ══════════════ MANUAL POSTING ══════════════
let _manual = { sourceType: 'product', sourceId: '', caption: '', hashtags: '', platform: '', media: [], linkUrl: '', allowDuplicate: false };

async function loadManual(body) {
  try {
    const st = await fetchStatus();
    const connectedPlatforms = (st.platforms || []).filter((p) => p.connected && p.enabled);
    const accounts = (st.accounts || []).filter((a) => a.status === 'connected');
    const { data: prods } = await supabase.from('showroom_listings').select('property_id,title,category,price,currency,images,video_url,listing_type').eq('is_active', true).limit(600);
    const { data: promos } = await supabase.from('promotions').select('id,title,image_url,video_url').eq('is_active', true).limit(50);
    const { data: items } = await supabase.from('social_content_items').select('*').order('created_at', { ascending: false }).limit(50);
    const { data: drafts } = await supabase.from('social_posts').select('*').eq('status', 'draft').order('created_at', { ascending: false }).limit(40);

    _manual.platform = _manual.platform || (connectedPlatforms[0]?.id || '');
    _manual.sourceType = _manual.sourceType || (drafts?.length ? 'draft' : 'product');

    body.innerHTML = `
      <div class="grid lg:grid-cols-3 gap-4">
        <div class="lg:col-span-1 glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3">
          <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="file-edit" class="w-4 h-4 text-blue-400"></i> 1 · Content</h3>

          <div><label class="lbl">Source</label>
            <select id="mp-source" onchange="window.socialManualSource()" class="input-field">
              <option value="product" ${_manual.sourceType === 'product' ? 'selected' : ''}>Marketplace product</option>
              <option value="promo" ${_manual.sourceType === 'promo' ? 'selected' : ''}>Promotion</option>
              <option value="content" ${_manual.sourceType === 'content' ? 'selected' : ''}>News / article (Content Item)</option>
              <option value="text" ${_manual.sourceType === 'text' ? 'selected' : ''}>Custom text / announcement</option>
              <option value="draft" ${_manual.sourceType === 'draft' ? 'selected' : ''}>Saved draft</option>
            </select>
          </div>

          <div id="mp-source-picker">${sourcePickerHTML(_manual.sourceType, prods, promos, items, drafts)}</div>

          <div><label class="lbl">Caption</label><textarea id="mp-caption" class="input-field" placeholder="Write your post caption…">${esc(_manual.caption)}</textarea></div>
          <div><label class="lbl">Hashtags</label><input id="mp-hashtags" class="input-field" value="${esc(_manual.hashtags)}" placeholder="#newarrival #marketplace"></div>
          <div><label class="lbl">Link (optional)</label><input id="mp-link" class="input-field" value="${esc(_manual.linkUrl)}" placeholder="https://…"></div>

          <div>
            <label class="lbl">Media</label>
            <div id="mp-media" class="space-y-2">${_manual.media.length ? _manual.media.map((m, i) => mediaChip(m, i)).join('') : '<p class="text-[11px] text-gray-500">Media auto-fills from the source. Add extra image/video below.</p>'}</div>
            <div class="flex gap-2 mt-2">
              <input id="mp-media-url" class="input-field !text-xs !py-2" placeholder="Image/video URL…">
              <button onclick="window.socialAddMediaUrl()" class="btn-press px-3 py-2 rounded-xl text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 transition">Add</button>
            </div>
            <input type="file" id="mp-file" accept="image/*,video/*" class="hidden" onchange="window.socialAddMediaFile(event)">
            <button onclick="document.getElementById('mp-file').click()" class="btn-press w-full mt-2 py-2 rounded-xl text-xs font-bold bg-white/[.03] border border-white/10 text-gray-300 hover:border-blue-500/30 transition"><i data-lucide="upload" class="w-3.5 h-3.5 inline mr-1"></i>Upload image / video (stored in Secure Cloud Storage)</button>
          </div>
        </div>

        <div class="lg:col-span-1 glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3">
          <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="share-2" class="w-4 h-4 text-blue-400"></i> 2 · Platforms</h3>
          <p class="text-[11px] text-gray-500">Only connected accounts can receive posts.</p>
          <div id="mp-platforms" class="space-y-2">
            ${connectedPlatforms.length ? connectedPlatforms.map((p) => `
              <label class="flex items-center gap-3 p-3 rounded-xl bg-white/[.03] border ${_manual.platform === p.id ? 'border-blue-500/50' : 'border-white/10'} cursor-pointer transition" onclick="window.socialManualPlatform('${p.id}')">
                <input type="radio" name="mp-p" class="accent-blue-600" ${_manual.platform === p.id ? 'checked' : ''}>
                <i data-lucide="${platformIcon(p.id)}" class="w-4 h-4 ${PLATFORM_META[p.id]?.tone || ''}"></i>
                <span class="text-xs font-bold text-white flex-1">${esc(platformName(p.id))}</span>
                <span class="text-[10px] text-gray-500">${esc(p.capability)}</span>
              </label>`).join('') : empty('Connect at least one account first.', 'plug-zap')}
          </div>
          <button onclick="window.socialNav('accounts')" class="btn-press w-full py-2.5 rounded-xl text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 transition mt-2">Manage accounts</button>
        </div>

        <div class="lg:col-span-1 glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3">
          <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="eye" class="w-4 h-4 text-blue-400"></i> 3 · Preview & Publish</h3>
          <div id="mp-preview" class="border border-white/10 rounded-2xl overflow-hidden bg-black/30">
            ${previewHTML(_manual.media, _manual.caption, _manual.hashtags, _manual.platform)}
          </div>
          <label class="flex items-center gap-2 text-xs text-gray-300 mt-3"><input type="checkbox" id="mp-dup" ${_manual.allowDuplicate ? 'checked' : ''} style="accent-color:#2563eb"> Allow duplicate (bypass duplicate-post protection)</label>
          <div class="grid grid-cols-2 gap-2 mt-3">
            <button onclick="window.socialManualGo('publish_now')" class="btn-press py-3 rounded-xl text-xs font-black bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 transition"><i data-lucide="send" class="w-4 h-4 inline mr-1"></i>Publish Now</button>
            <button onclick="window.socialManualGo('draft')" class="btn-press py-3 rounded-xl text-xs font-bold bg-white/[.04] border border-white/10 text-gray-300 hover:border-blue-500/30 transition"><i data-lucide="save" class="w-4 h-4 inline mr-1"></i>Save Draft</button>
          </div>
          <button onclick="window.socialManualGo('schedule')" class="btn-press w-full py-3 rounded-xl text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition"><i data-lucide="calendar-clock" class="w-4 h-4 inline mr-1"></i>Schedule for Later
            <input id="mp-when" type="datetime-local" class="input-field !mt-2 !py-2 !text-xs"></button>
        </div>
      </div>`;
    icons();
  } catch (err) {
    body.innerHTML = `<div class="glass-soft border border-red-500/20 rounded-2xl p-5 text-sm text-red-300">${esc(err.message)}</div>`;
  }
}

function sourcePickerHTML(type, prods, promos, items, drafts) {
  if (type === 'product') {
    return `<div class="grid grid-cols-2 gap-2 max-h-44 overflow-y-auto scrollbar-thin border border-white/10 rounded-xl p-2 bg-white/[.02]">
      ${(prods || []).map((p) => `<button data-pid="${esc(p.property_id)}" onclick="window.socialPickProduct('${esc(p.property_id)}', this)" class="btn-press text-left p-2 rounded-lg text-[11px] text-gray-300 hover:bg-blue-500/10 hover:text-white border border-transparent hover:border-blue-500/30 transition truncate">${esc(p.title)}</button>`).join('') || '<p class="text-xs text-gray-500 p-2">No active products.</p>'}
    </div>`;
  }
  if (type === 'promo') {
    return `<div class="space-y-2 max-h-44 overflow-y-auto scrollbar-thin">
      ${(promos || []).map((p) => `<button data-pid="${esc(p.id)}" onclick="window.socialPickPromo('${esc(p.id)}', this)" class="btn-press w-full text-left p-2.5 rounded-lg text-[11px] text-gray-300 hover:bg-blue-500/10 transition border border-white/5">${esc(p.title || p.id)}</button>`).join('') || '<p class="text-xs text-gray-500 p-2">No active promotions.</p>'}
    </div>`;
  }
  if (type === 'content') {
    return `<div class="space-y-2 max-h-44 overflow-y-auto scrollbar-thin">
      ${(items || []).map((c) => `<button data-pid="${esc(c.id)}" onclick="window.socialPickContent('${esc(c.id)}', this)" class="btn-press w-full text-left p-2.5 rounded-lg text-[11px] text-gray-300 hover:bg-blue-500/10 transition border border-white/5">${esc(c.title)}</button>`).join('') || '<p class="text-xs text-gray-500 p-2">No content items. Add them under Platform Settings → News / Articles.</p>'}
    </div>`;
  }
  if (type === 'draft') {
    return `<div class="space-y-2 max-h-44 overflow-y-auto scrollbar-thin">
      ${(drafts || []).map((d) => `<button onclick="window.socialLoadDraft('${esc(d.id)}')" class="btn-press w-full text-left p-2.5 rounded-lg text-[11px] text-gray-300 hover:bg-blue-500/10 transition border border-white/5"><b>${esc(platformName(d.platform))}</b> · ${esc((d.caption || '').slice(0, 40))}</button>`).join('') || '<p class="text-xs text-gray-500 p-2">No drafts.</p>'}
    </div>`;
  }
  return '<p class="text-[11px] text-gray-500">Write a custom announcement — remember to comply with each platform\'s rules.</p>';
}

window.socialManualSource = function () {
  _manual.sourceType = document.getElementById('mp-source').value;
  _manual.caption = '';
  _manual.linkUrl = '';
  _manual.media = [];
  loadManual(document.getElementById('social-body'));
};

window.socialPickProduct = function (pid, btn) {
  // fetch the actual product row
  supabase.from('showroom_listings').select('*').eq('property_id', pid).maybeSingle().then(({ data: prod }) => {
    if (!prod) return;
    _manual.sourceId = pid;
    _manual.linkUrl = `${window.location.origin}/product/${encodeURIComponent(pid)}`;
    const images = Array.isArray(prod.images) ? prod.images.filter((u) => /^https?:\/\//i.test(u)).slice(0, 6).map((url) => ({ url, type: 'image' })) : [];
    if (prod.video_url && /^https?:\/\//i.test(prod.video_url)) images.push({ url: prod.video_url, type: 'video' });
    _manual.media = images;
    const currency = prod.currency || 'USD';
    const price = prod.price != null ? `${Number(prod.price).toLocaleString('en-US')} ${currency}` : '';
    _manual.caption = `${prod.title}\n${price ? `${price}\n` : ''}${_manual.linkUrl}`;
    document.getElementById('mp-caption').value = _manual.caption;
    document.getElementById('mp-link').value = _manual.linkUrl;
    renderMedia();
    renderPreview();
    document.querySelectorAll('#mp-source-picker button').forEach((b) => { b.classList.remove('bg-blue-500/10', 'text-white', 'border-blue-500/30'); b.classList.add('border-transparent'); });
    if (btn) { btn.classList.add('bg-blue-500/10', 'text-white', 'border-blue-500/30'); btn.classList.remove('border-transparent'); }
  });
};

window.socialPickPromo = function (id, btn) {
  supabase.from('promotions').select('*').eq('id', id).maybeSingle().then(({ data: promo }) => {
    if (!promo) return;
    _manual.sourceType = 'promo'; _manual.sourceId = id;
    _manual.media = [];
    if (promo.image_url && /^https?:\/\//i.test(promo.image_url)) _manual.media.push({ url: promo.image_url, type: 'image' });
    if (promo.video_url && /^https?:\/\//i.test(promo.video_url)) _manual.media.push({ url: promo.video_url, type: 'video' });
    _manual.caption = promo.title || 'Special offer';
    document.getElementById('mp-caption').value = _manual.caption;
    renderMedia(); renderPreview();
  });
};

window.socialPickContent = function (id, btn) {
  supabase.from('social_content_items').select('*').eq('id', id).maybeSingle().then(({ data: item }) => {
    if (!item) return;
    _manual.sourceType = 'content'; _manual.sourceId = id;
    _manual.media = [];
    if (item.image_url && /^https?:\/\//i.test(item.image_url)) _manual.media.push({ url: item.image_url, type: 'image' });
    if (item.video_url && /^https?:\/\//i.test(item.video_url)) _manual.media.push({ url: item.video_url, type: 'video' });
    _manual.caption = `${item.title}\n${item.body || ''}`.trim();
    _manual.linkUrl = item.link_url || '';
    document.getElementById('mp-caption').value = _manual.caption;
    document.getElementById('mp-link').value = _manual.linkUrl;
    renderMedia(); renderPreview();
  });
};

window.socialLoadDraft = async function (id) {
  const { data: d } = await supabase.from('social_posts').select('*').eq('id', id).maybeSingle();
  if (!d) return;
  window.socialNav('manual');
  setTimeout(() => {
    _manual = { sourceType: 'text', sourceId: d.id, caption: d.caption || '', hashtags: (d.hashtags || '').replace(/#/g, ''), platform: d.platform, media: Array.isArray(d.media) ? d.media : [], linkUrl: d.metadata?.link_url || '', allowDuplicate: true };
    document.getElementById('mp-caption').value = _manual.caption;
    document.getElementById('mp-hashtags').value = _manual.hashtags;
    document.getElementById('mp-link').value = _manual.linkUrl;
    renderMedia(); renderPreview();
  }, 200);
};

window.socialManualPlatform = function (id) {
  _manual.platform = id;
  document.querySelectorAll('#mp-platforms label').forEach((l, i, arr) => {
    l.classList.toggle('border-blue-500/50', l.querySelector('.accent-blue-600')?.value === id);
  });
  // simpler: recompute
  document.querySelectorAll('#mp-platforms label').forEach((l) => l.classList.remove('border-blue-500/50'));
  const label = Array.from(document.querySelectorAll('#mp-platforms label')).find((l) => l.textContent.includes(platformName(id)));
  if (label) label.classList.add('border-blue-500/50');
  renderPreview();
};

window.socialAddMediaUrl = function () {
  const url = document.getElementById('mp-media-url').value.trim();
  if (!url) return;
  const type = /\.(mp4|webm|mov|m4v)(\?|$)/i.test(url) ? 'video' : 'image';
  _manual.media.push({ url, type });
  document.getElementById('mp-media-url').value = '';
  renderMedia(); renderPreview();
};

window.socialAddMediaFile = async function (ev) {
  const file = ev.target.files?.[0];
  if (!file) return;
  try {
    toast('Uploading media…', 'info');
    const item = await uploadSocialFile(file);
    _manual.media.push(item);
    renderMedia(); renderPreview();
    toast('Media added.');
  } catch (err) { toast(err.message, 'error'); }
  ev.target.value = '';
};

function mediaChip(m, i) {
  return `<div class="flex items-center gap-2 p-2 rounded-lg bg-white/[.03] border border-white/10">
    ${m.type === 'video' ? '<i data-lucide="video" class="w-4 h-4 text-violet-300 shrink-0"></i>' : '<i data-lucide="image" class="w-4 h-4 text-emerald-300 shrink-0"></i>'}
    <span class="text-[11px] text-gray-400 truncate flex-1">${esc(m.url)}</span>
    <button onclick="window.socialRemoveMedia(${i})" class="p-1 text-red-400 hover:text-red-300"><i data-lucide="x" class="w-3.5 h-3.5"></i></button>
  </div>`;
}

window.socialRemoveMedia = function (i) {
  _manual.media.splice(i, 1);
  renderMedia(); renderPreview();
};

function renderMedia() {
  const el = document.getElementById('mp-media');
  if (el) el.innerHTML = _manual.media.length ? _manual.media.map(mediaChip).join('') : '<p class="text-[11px] text-gray-500">No media. Add an image or video URL, or upload a file.</p>';
  icons();
}

function previewHTML(media, caption, hashtags, platform) {
  const first = media?.[0];
  const text = [caption, hashtags ? hashtags.split(/[ ,]+/).map((h) => '#' + h.replace(/^#/, '')).join(' ') : ''].filter(Boolean).join('\n');
  return `
    <div class="p-4 space-y-3">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center"><i data-lucide="${platformIcon(platform) || 'share-2'}" class="w-4 h-4 text-blue-300"></i></div>
        <p class="text-[11px] font-bold text-gray-300">${esc(platformName(platform) || 'Select a platform')}</p>
      </div>
      ${first ? (first.type === 'video'
        ? `<video src="${esc(first.url)}" class="w-full rounded-xl max-h-40 object-cover" controls muted></video>`
        : `<img src="${esc(first.url)}" class="w-full rounded-xl max-h-40 object-cover" onerror="this.style.display='none'">`) : '<div class="w-full h-24 rounded-xl bg-white/5 flex items-center justify-center"><span class="text-[11px] text-gray-600">No media</span></div>'}
      <p class="text-xs text-gray-300 whitespace-pre-wrap break-words max-h-32 overflow-y-auto scrollbar-thin">${esc(text || 'Your caption will appear here…')}</p>
    </div>`;
}

function renderPreview() {
  _manual.caption = document.getElementById('mp-caption')?.value ?? _manual.caption;
  _manual.hashtags = document.getElementById('mp-hashtags')?.value ?? _manual.hashtags;
  const el = document.getElementById('mp-preview');
  if (el) el.innerHTML = previewHTML(_manual.media, _manual.caption, _manual.hashtags, _manual.platform);
  icons();
}

function collectManual() {
  _manual.caption = document.getElementById('mp-caption')?.value || '';
  _manual.hashtags = document.getElementById('mp-hashtags')?.value || '';
  _manual.linkUrl = document.getElementById('mp-link')?.value || '';
  _manual.allowDuplicate = document.getElementById('mp-dup')?.checked || false;
  const hashtagsArr = _manual.hashtags.split(/[\s,]+/).filter(Boolean).map((h) => h.replace(/^#/, '')).filter(Boolean);
  return {
    platform: _manual.platform,
    caption: _manual.caption,
    hashtags: hashtagsArr,
    media: _manual.media,
    linkUrl: _manual.linkUrl,
    contentType: _manual.sourceType === 'draft' ? 'manual' : _manual.sourceType,
    sourceType: mapSourceType(_manual.sourceType),
    sourceId: _manual.sourceId,
    allowDuplicate: _manual.allowDuplicate,
  };
}

function mapSourceType(t) {
  if (t === 'promo') return 'promotions';
  if (t === 'content') return 'social_content_item';
  if (t === 'product') return 'showroom_listing';
  return null;
}

window.socialManualGo = async function (mode) {
  const payload = collectManual();
  if (!payload.platform) return toast('Select a platform first.', 'error');
  if (!payload.caption.trim() && payload.sourceType === 'text') return toast('Write a caption.', 'error');
  if (payload.sourceType === 'showroom_listing' && !payload.sourceId) return toast('Pick a product first.', 'error');
  if (_manual.sourceType === 'draft' && _manual.sourceId) {
    // re-publish an existing draft
    try {
      await api('/api/social/posts', { method: 'POST', body: JSON.stringify({ action: 'trigger', post_id: _manual.sourceId }) });
      toast('Draft published.');
      window.socialNav('published');
      return;
    } catch (err) { return toast(err.message, 'error'); }
  }
  if (mode === 'schedule') {
    const when = document.getElementById('mp-when')?.value;
    if (!when) return toast('Choose a date and time to schedule.', 'error');
    payload.mode = 'schedule';
    payload.scheduledFor = new Date(when).toISOString();
  } else if (mode === 'draft') {
    payload.mode = 'draft';
  } else {
    payload.mode = 'publish_now';
  }
  try {
    const btn = document.getElementById('social-body')?.querySelector('button');
    if (btn) btn.disabled = true;
    const r = await api('/api/social/publish', { method: 'POST', body: JSON.stringify(payload) });
    toast(r.message || 'Done.');
    _manual.media = [];
    window.socialNav(mode === 'publish_now' ? 'published' : mode === 'schedule' ? 'schedule' : 'queue');
  } catch (err) {
    toast(err.message, 'error');
  }
};

// ══════════════ POSTING SCHEDULE ══════════════
async function loadSchedule(body) {
  try {
    const [rules, scheduled] = await Promise.all([
      supabase.from('social_automation_rules').select('*').eq('enabled', true).order('next_run_at'),
      supabase.from('social_posts').select('*').eq('status', 'scheduled').order('scheduled_for'),
    ]);
    const ruleRows = rules.data || [];
    const postRows = scheduled.data || [];
    body.innerHTML = `
      <div class="space-y-4">
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3">
          <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="bot" class="w-4 h-4 text-blue-400"></i> Automation Schedules (server-driven)</h3>
          ${ruleRows.length ? ruleRows.map((r) => `
            <div class="flex items-center gap-3 p-3 bg-white/[.03] border border-white/10 rounded-xl">
              <i data-lucide="bot" class="w-4 h-4 text-blue-400"></i>
              <div class="flex-1 min-w-0"><p class="text-xs font-bold text-white truncate">${esc(r.name)}</p><p class="text-[11px] text-gray-500">${esc((r.platforms || []).map(platformName).join(', '))} · ${esc(scheduleLabel(r))}</p></div>
              <div class="text-right"><p class="text-[11px] font-bold text-emerald-300">${r.next_run_at ? fmtDT(r.next_run_at) : 'pending'}</p><p class="text-[10px] text-gray-500">next run</p></div>
            </div>`).join('') : empty('No enabled automation rules. Enable rules under Automatic Posting.', 'bot')}
        </div>
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3">
          <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="calendar-clock" class="w-4 h-4 text-amber-300"></i> Manually Scheduled Posts</h3>
          ${postRows.length ? postRows.map((p) => `
            <div class="flex items-center gap-3 p-3 bg-white/[.03] border border-white/10 rounded-xl">
              <i data-lucide="${platformIcon(p.platform)}" class="w-4 h-4 ${PLATFORM_META[p.platform]?.tone || ''}"></i>
              <div class="flex-1 min-w-0"><p class="text-xs font-bold text-white truncate">${platformName(p.platform)}${p.caption ? ' · ' + esc(p.caption.slice(0, 70)) : ''}</p><p class="text-[11px] text-gray-500">Scheduled ${fmtDT(p.scheduled_for)}</p></div>
              <div class="flex gap-2">
                <button onclick="window.socialPostAction('${p.id}','trigger')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 transition">Publish now</button>
                <button onclick="window.socialPostAction('${p.id}','cancel')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-red-500/10 text-red-300 border border-red-500/25 hover:bg-red-500/20 transition">Cancel</button>
              </div>
            </div>`).join('') : empty('Nothing scheduled yet. Use Manual Posting → Schedule for Later.', 'calendar-clock')}
        </div>
      </div>`;
    icons();
  } catch (err) {
    body.innerHTML = `<div class="glass-soft border border-red-500/20 rounded-2xl p-5 text-sm text-red-300">${esc(err.message)}</div>`;
  }
}

// ══════════════ CONTENT QUEUE ══════════════
async function loadQueue(body) {
  const { data: posts } = await supabase.from('social_posts').select('*').in('status', ['draft', 'queued', 'publishing']).order('created_at', { ascending: true });
  const rows = posts || [];
  const groups = { draft: rows.filter((r) => r.status === 'draft'), queued: rows.filter((r) => r.status === 'queued'), publishing: rows.filter((r) => r.status === 'publishing') };
  body.innerHTML = `
    <div class="space-y-4">
      ${['publishing', 'queued', 'draft'].map((st) => `
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-2">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="${st === 'draft' ? 'hourglass' : st === 'queued' ? 'list-checks' : 'loader-2'}" class="w-4 h-4 ${st === 'draft' ? 'text-violet-300' : st === 'queued' ? 'text-sky-300' : 'text-violet-300'}"></i> ${st === 'draft' ? 'Awaiting Approval (drafts)' : st === 'queued' ? 'Queued' : 'Publishing'}</h3>
            <span class="badge bg-blue-500/10 text-blue-300 border-blue-500/20">${groups[st].length}</span>
          </div>
          ${groups[st].length ? groups[st].map((p) => queueRow(p)).join('') : '<p class="text-[11px] text-gray-600 py-2">Empty.</p>'}
        </div>`).join('')}
    </div>`;
  icons();
}

function queueRow(p) {
  const isDraft = p.status === 'draft';
  return `
    <div class="flex items-center gap-3 p-3 bg-white/[.03] border border-white/10 rounded-xl">
      <i data-lucide="${platformIcon(p.platform)}" class="w-4 h-4 ${PLATFORM_META[p.platform]?.tone || ''} shrink-0"></i>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-bold text-white truncate">${platformName(p.platform)}${p.caption ? ' · ' + esc(p.caption.slice(0, 60)) : ''}</p>
        <p class="text-[11px] text-gray-500">${esc((p.source_type || 'manual'))} · ${isDraft ? 'auto-generated, needs approval' : (p.auto_generated ? 'automatic' : 'manual')} · ${fmtDT(p.created_at)}</p>
      </div>
      <div class="flex gap-2 flex-wrap justify-end">
        ${p.scheduled_for ? `<span class="badge bg-amber-500/15 text-amber-300 border-amber-500/30">${fmtDT(p.scheduled_for)}</span>` : ''}
        ${isDraft ? `<button onclick="window.socialApprove('${p.id}')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 transition">Approve & publish</button>` : ''}
        ${(!isDraft && p.status === 'queued') ? `<button onclick="window.socialPostAction('${p.id}','trigger')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 transition">Publish now</button>` : ''}
        <button onclick="window.socialPostAction('${p.id}','cancel')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-red-500/10 text-red-300 border border-red-500/25 hover:bg-red-500/20 transition">Cancel</button>
        <button onclick="window.socialPostAction('${p.id}','delete')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-gray-500/10 text-gray-400 border border-gray-500/25 hover:bg-gray-500/20 transition">Delete</button>
      </div>
    </div>`;
}

window.socialApprove = async function (postId) {
  const { error } = await supabase.from('social_posts').update({ status: 'queued', updated_at: new Date().toISOString() }).eq('id', postId);
  if (error) return toast(error.message, 'error');
  toast('Approved. It will publish on the next scheduler tick (or click Publish now).');
  loadQueue(document.getElementById('social-body'));
};

window.socialPostAction = async function (postId, action) {
  try {
    if (action === 'delete' && !confirm('Delete this post record?')) return;
    await api('/api/social/posts', { method: 'POST', body: JSON.stringify({ action, post_id: postId }) });
    toast({ trigger: 'Published!', retry: 'Retried.', cancel: 'Cancelled.', delete: 'Deleted.' }[action] || 'Done.');
    const b = document.getElementById('social-body');
    if (b && (action === 'trigger' || action === 'retry')) window.socialNav('published'); else loadQueue(b);
  } catch (err) { toast(err.message, 'error'); }
};

// ══════════════ PUBLISHED POSTS ══════════════
async function loadPublished(body) {
  const { data: posts } = await supabase.from('social_posts').select('*').eq('status', 'published').order('published_at', { ascending: false }).limit(200);
  const rows = posts || [];
  body.innerHTML = `
    <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3">
      <div class="flex items-center justify-between"><h3 class="text-sm font-black text-white"><i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 inline mr-1.5"></i>Published Posts</h3><span class="badge bg-emerald-500/15 text-emerald-300 border-emerald-500/30">${rows.length}</span></div>
      ${rows.length ? `<div class="space-y-2">${rows.map(publishedRow).join('')}</div>` : empty('No published posts yet. Post manually or enable automation.', 'check-circle-2')}
    </div>`;
  icons();
}

function publishedRow(p) {
  const first = (p.media || [])[0];
  return `
    <div class="flex items-center gap-3 p-3 bg-white/[.03] border border-white/10 rounded-xl">
      ${first ? (first.type === 'video' ? `<video src="${esc(first.url)}" class="w-10 h-10 rounded-lg object-cover shrink-0"></video>` : `<img src="${esc(first.url)}" class="w-10 h-10 rounded-lg object-cover shrink-0" onerror="this.style.display='none'">`) : `<div class="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0"><i data-lucide="${platformIcon(p.platform)}" class="w-4 h-4 ${PLATFORM_META[p.platform]?.tone || ''}"></i></div>`}
      <div class="flex-1 min-w-0">
        <p class="text-xs font-bold text-white truncate">${platformName(p.platform)} · ${p.auto_generated ? 'automatic' : 'manual'}${p.content_type !== 'manual' ? ' · ' + esc(p.content_type) : ''}</p>
        <p class="text-[11px] text-gray-500 truncate">${esc(p.caption || '(no caption)')}</p>
        <p class="text-[10px] text-gray-600">${fmtDT(p.published_at)}${p.platform_post_id ? ' · id ' + esc(p.platform_post_id) : ''}</p>
      </div>
      <div class="flex gap-2 flex-wrap justify-end">
        ${p.platform_post_url ? `<a href="${esc(p.platform_post_url)}" target="_blank" rel="noopener" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition">View</a>` : ''}
        <button onclick="window.socialPostAction('${p.id}','delete')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-gray-500/10 text-gray-400 border border-gray-500/25 hover:bg-gray-500/20 transition">Delete</button>
      </div>
    </div>`;
}

// ══════════════ FAILED POSTS ══════════════
async function loadFailed(body) {
  const { data: posts } = await supabase.from('social_posts').select('*').eq('status', 'failed').order('updated_at', { ascending: false }).limit(200);
  const rows = posts || [];
  body.innerHTML = `
    <div class="glass-soft border border-red-500/20 rounded-2xl p-5 space-y-3">
      <div class="flex items-center justify-between"><h3 class="text-sm font-black text-white"><i data-lucide="alert-triangle" class="w-4 h-4 text-red-400 inline mr-1.5"></i>Failed Posts</h3><span class="badge bg-red-500/15 text-red-300 border-red-500/30">${rows.length}</span></div>
      ${rows.length ? rows.map(failedRow).join('') : empty('No failed posts.', 'check-circle-2')}
    </div>`;
  icons();
}

function failedRow(p) {
  const retriable = p.next_retry_at;
  return `
    <div class="p-3 rounded-xl bg-red-500/[.04] border border-red-500/20 space-y-2">
      <div class="flex items-center gap-3">
        <i data-lucide="${platformIcon(p.platform)}" class="w-4 h-4 ${PLATFORM_META[p.platform]?.tone || ''} shrink-0"></i>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-bold text-white truncate">${platformName(p.platform)} · attempt ${p.retry_count || 0}${p.max_retries ? ' / ' + p.max_retries : ''}</p>
          <p class="text-[11px] text-gray-500 truncate">${esc(p.caption || '(no caption)')}</p>
        </div>
        <div class="flex gap-2 flex-wrap justify-end">
          <button onclick="window.socialPostAction('${p.id}','retry')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 transition">Retry now</button>
          <button onclick="window.socialPostAction('${p.id}','delete')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-gray-500/10 text-gray-400 border border-gray-500/25 hover:bg-gray-500/20 transition">Delete</button>
        </div>
      </div>
      <p class="text-[11px] text-red-300/90 break-words">${esc(p.last_error || 'Unknown error')}</p>
      ${retriable ? `<p class="text-[10px] text-amber-300/80">Auto-retry scheduled: ${fmtDT(retriable)}.</p>` : ''}
    </div>`;
}

// ══════════════ POST LOGS ══════════════
async function loadLogs(body) {
  const [logs, posts] = await Promise.all([
    supabase.from('social_post_logs').select('*').order('created_at', { ascending: false }).limit(300),
    supabase.from('social_posts').select('id,caption,platform')
  ]);
  const rows = logs.data || [];
  const postMap = new Map((posts.data || []).map((p) => [p.id, p]));
  const levelColor = { info: 'text-sky-300', warn: 'text-amber-300', error: 'text-red-300' };
  body.innerHTML = `
    <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3">
      <div class="flex items-center justify-between"><h3 class="text-sm font-black text-white"><i data-lucide="scroll-text" class="w-4 h-4 text-blue-400 inline mr-1.5"></i>Post Logs</h3><span class="badge bg-blue-500/10 text-blue-300 border-blue-500/20">${rows.length}</span></div>
      <div class="space-y-1.5 max-h-[65vh] overflow-y-auto scrollbar-thin">${rows.map((l) => {
        const p = postMap.get(l.post_id);
        return `<div class="p-2.5 rounded-xl bg-white/[.02] border border-white/5 flex items-start gap-3">
          <span class="badge ${levelColor[l.level] || levelColor.info} border-transparent !text-[10px]">${esc(l.level)}</span>
          <div class="flex-1 min-w-0">
            <p class="text-[11px] text-gray-300 break-words">${esc(l.message)}</p>
            <p class="text-[10px] text-gray-600">${fmtDT(l.created_at)}${p ? ' · ' + esc(platformName(p.platform)) + (p.caption ? ' · ' + esc(p.caption.slice(0, 50)) : '') : ''}</p>
          </div>
        </div>`;
      }).join('') || empty('No logs yet.', 'scroll-text')}</div>
    </div>`;
  icons();
}

// ══════════════ PLATFORM SETTINGS ══════════════
let _platformSettings = [];

async function loadPlatforms(body) {
  try {
    const st = await fetchStatus();
    const { data: ps } = await supabase.from('social_platform_settings').select('*').order('platform');
    _platformSettings = ps || [];
    const { data: contentItems } = await supabase.from('social_content_items').select('*').order('created_at', { ascending: false });

    body.innerHTML = `
      ${tiktokInstructions()}
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        ${(st.platforms || []).map((p) => platformSettingsCard(p)).join('')}
      </div>
      <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3 mt-4">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="newspaper" class="w-4 h-4 text-blue-400"></i> News / Articles (Content Items for Auto Posting)</h3>
          <button onclick="window.socialNewContentItem()" class="btn-press px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 transition"><i data-lucide="plus" class="w-3.5 h-3.5 inline mr-1"></i>New item</button>
        </div>
        ${(contentItems || []).length ? (contentItems || []).map(contentItemRow).join('') : empty('Add news/article items to make them available for the automatic publisher (content type "News / articles").', 'newspaper')}
      </div>`;
    icons();
  } catch (err) {
    body.innerHTML = `<div class="glass-soft border border-red-500/20 rounded-2xl p-5 text-sm text-red-300">${esc(err.message)}</div>`;
  }
}

function contentItemRow(c) {
  return `<div class="flex items-center gap-3 p-3 bg-white/[.03] border border-white/10 rounded-xl">
    ${c.image_url ? `<img src="${esc(c.image_url)}" class="w-10 h-10 rounded-lg object-cover shrink-0" onerror="this.style.display='none'">` : '<i data-lucide="newspaper" class="w-4 h-4 text-blue-400 shrink-0"></i>'}
    <div class="flex-1 min-w-0"><p class="text-xs font-bold text-white truncate">${esc(c.title)}</p><p class="text-[11px] text-gray-500 truncate">${esc((c.body || '').slice(0, 60))}</p></div>
    <span class="badge ${c.is_active ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' : 'bg-gray-500/15 text-gray-400 border-gray-500/30'}">${c.is_active ? 'active' : 'inactive'}</span>
    <button onclick="window.socialToggleContentItem('${c.id}')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold ${c.is_active ? 'bg-amber-500/10 text-amber-300' : 'bg-emerald-500/15 text-emerald-300'} transition">${c.is_active ? 'Deactivate' : 'Activate'}</button>
    <button onclick="window.socialDeleteContentItem('${c.id}')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-red-500/10 text-red-300 border border-red-500/25 hover:bg-red-500/20 transition">Delete</button>
  </div>`;
}

window.socialNewContentItem = function () {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `<div class="modal-box">
    <div class="flex items-center justify-between mb-4"><h3 class="text-base font-black text-white">New News / Article Item</h3><button onclick="this.closest('.modal-overlay').remove()" class="p-2 rounded-lg text-gray-400 hover:bg-white/5"><i data-lucide="x" class="w-4 h-4"></i></button></div>
    <div class="space-y-3">
      <div><label class="lbl">Title *</label><input id="ci-title" class="input-field" placeholder="Article title"></div>
      <div><label class="lbl">Body</label><textarea id="ci-body" class="input-field" placeholder="Article summary / text…"></textarea></div>
      <div><label class="lbl">Image URL</label><input id="ci-image" class="input-field" placeholder="https://…"></div>
      <div><label class="lbl">Video URL</label><input id="ci-video" class="input-field" placeholder="https://…"></div>
      <div><label class="lbl">Link URL</label><input id="ci-link" class="input-field" placeholder="https://…"></div>
      <div class="flex justify-end gap-2 pt-3 border-t border-white/10">
        <button onclick="this.closest('.modal-overlay').remove()" class="btn-press px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:bg-white/5">Cancel</button>
        <button onclick="window.socialSaveContentItem()" class="btn-press px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white">Save item</button>
      </div>
    </div></div>`;
  document.getElementById('modal-container').appendChild(modal); icons();
};

window.socialSaveContentItem = async function () {
  const title = document.getElementById('ci-title').value.trim();
  if (!title) return toast('Title is required.', 'error');
  const { error } = await supabase.from('social_content_items').insert({
    title,
    body: document.getElementById('ci-body').value,
    image_url: document.getElementById('ci-image').value.trim(),
    video_url: document.getElementById('ci-video').value.trim(),
    link_url: document.getElementById('ci-link').value.trim(),
    is_active: true,
  });
  if (error) return toast(error.message, 'error');
  document.querySelector('.modal-overlay')?.remove();
  toast('Content item saved.');
  loadPlatforms(document.getElementById('social-body'));
};

window.socialToggleContentItem = async function (id) {
  const { data } = await supabase.from('social_content_items').select('is_active').eq('id', id).maybeSingle();
  if (!data) return toast('Item not found.', 'error');
  const { error } = await supabase.from('social_content_items').update({ is_active: !data.is_active }).eq('id', id);
  if (error) return toast(error.message, 'error');
  toast('Updated.');
  loadPlatforms(document.getElementById('social-body'));
};

window.socialDeleteContentItem = async function (id) {
  if (!confirm('Delete this content item?')) return;
  await supabase.from('social_content_items').delete().eq('id', id);
  toast('Deleted.');
  loadPlatforms(document.getElementById('social-body'));
};

function tiktokInstructions() {
  return `
    <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3 mb-4">
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0"><i data-lucide="music-2" class="w-5 h-5 text-white"></i></div>
        <div class="min-w-0 flex-1">
          <h3 class="text-sm font-black text-white">TikTok Developer Connection — official setup</h3>
          <p class="text-xs text-gray-500 leading-relaxed mt-1">Create your TikTok app <b class="text-gray-300">externally</b> on the official <a href="https://developers.tiktok.com/app/" target="_blank" rel="noopener" class="text-blue-400 underline hover:text-blue-300">TikTok Developer Portal</a>. This dashboard then connects to it through the official API — no password collection, no fake developer tools.</p>
          <ol class="text-[11px] text-gray-400 space-y-1 mt-2 list-decimal list-inside">
            <li>Sign in at developers.tiktok.com → <b>Manage apps</b> → create your app (must contain your TikTok Business account).</li>
            <li>Under your app, enable the scopes <b>user.info.basic</b>, <b>video.upload</b> and <b>video.publish</b>.</li>
            <li>Add this exact redirect/callback URL to your app:</li>
          </ol>
          <div class="mt-2 flex items-center gap-2">
            <code class="text-[11px] text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2 flex-1 break-all">/api/social/oauth/callback?platform=tiktok</code>
            <button onclick="window.socialCopy(this)" data-text="${esc(`${window.location.origin}/api/social/oauth/callback?platform=tiktok`)}" class="btn-press px-3 py-2 rounded-lg text-[11px] font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition">Copy</button>
          </div>
          <ol class="text-[11px] text-gray-400 space-y-1 mt-2 list-decimal list-inside" start="4">
            <li>Copy your <b>Client Key</b> and <b>Client Secret</b> into the server environment variables <code class="text-[11px] text-green-300">TIKTOK_CLIENT_KEY</code> and <code class="text-[11px] text-green-300">TIKTOK_CLIENT_SECRET</code> (Vercel → project → Settings → Environment Variables). Never put them in browser code.</li>
            <li>Submit your app for <b>Content Posting / app review</b> if you want public posting — until then TikTok publishes as <i>SELF_ONLY</i> and you control privacy below.</li>
            <li>Come back to <b>Connected Accounts</b> → <b>Connect TikTok</b> to authorize your account via official OAuth.</li>
          </ol>
          <p class="text-[10px] text-amber-300/90 mt-2"><i data-lucide="shield-check" class="w-3 h-3 inline mr-1"></i>Nothing is posted automatically until you connect an account, enable automation, and the server-side scheduler runs.</p>
        </div>
      </div>
    </div>`;
}

function platformSettingsCard(p) {
  const row = _platformSettings.find((s) => s.platform === p.id) || {};
  const config = row.config || {};
  const account = p.account || null;
  return `
    <div class="glass-soft border border-blue-500/15 rounded-2xl p-4 space-y-3">
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2 min-w-0"><i data-lucide="${platformIcon(p.id)}" class="w-4 h-4 ${PLATFORM_META[p.id]?.tone || ''}"></i><p class="text-xs font-black text-white truncate">${esc(p.label)}</p></div>
        <label class="toggle-switch"><input type="checkbox" data-platform="ps-${p.id}" ${row.enabled === false ? '' : 'checked'} onchange="window.socialTogglePlatform('${p.id}', this.checked)"><span class="toggle-slider"></span></label>
      </div>
      ${p.requiresApproval ? `<div class="flex items-start gap-2 p-2.5 bg-amber-500/10 border border-amber-500/25 rounded-xl"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-300 shrink-0 mt-0.5"></i><p class="text-[11px] text-amber-200 leading-relaxed">${esc(p.approvalNote || 'This platform requires approval / business verification / paid access.')}</p></div>` : ''}
      ${!p.configured ? `<p class="text-[10px] text-amber-300/90">API credentials not configured server-side yet (see .env.example).</p>` : ''}
      <div class="grid grid-cols-2 gap-2">
        <div><label class="lbl">Max / day</label><input type="number" class="input-field !text-xs !py-2" value="${esc(row.max_posts_per_day ?? p.maxPostsPerDay ?? 5)}" min="0" onchange="window.socialSavePlatform('${p.id}')" data-f="max_posts_per_day"></div>
        <div><label class="lbl">Min interval (min)</label><input type="number" class="input-field !text-xs !py-2" value="${esc(row.min_interval_minutes ?? 60)}" min="0" onchange="window.socialSavePlatform('${p.id}')" data-f="min_interval_minutes"></div>
      </div>
      ${platformConfigFields(p.id, config, p)}
      <div class="flex gap-2 flex-wrap">
        ${p.connected ? `<span class="badge bg-emerald-500/15 text-emerald-300 border-emerald-500/30">connected</span>` : (p.usesOAuth ? `<span class="badge bg-gray-500/10 text-gray-400 border-gray-500/20">not connected</span>` : '')}
        ${p.usesOAuth ? `<button onclick="window.socialConnect('${p.id}')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold ${p.connected ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20' : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'} transition">${p.connected ? 'Reconnect' : 'Connect account'}</button>` : `<button onclick="window.socialConnect('${p.id}')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold ${p.connected ? 'bg-blue-500/10 text-blue-300' : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'} transition">${p.connected ? 'Reconnect' : 'Connect'}</button>`}
      </div>
    </div>`;
}

function platformConfigFields(id, config, p) {
  const extras = [];
  if (id === 'tiktok') {
    extras.push(`<div><label class="lbl">Post privacy</label><select class="input-field !text-xs !py-2" onchange="window.socialSavePlatform('${id}')" data-f="tiktok_privacy_level">
      <option value="SELF_ONLY" ${(config.tiktok_privacy_level || 'SELF_ONLY') === 'SELF_ONLY' ? 'selected' : ''}>SELF_ONLY (recommended until app approved)</option>
      <option value="PUBLIC_TO_EVERYONE" ${config.tiktok_privacy_level === 'PUBLIC_TO_EVERYONE' ? 'selected' : ''}>PUBLIC (requires app approval)</option>
    </select></div>`);
  }
  if (id === 'telegram') {
    extras.push(`<div class="col-span-2"><label class="lbl">Destination chat / channel (@id or numeric)</label><input class="input-field !text-xs !py-2" value="${esc(config.telegram_chat_id || '')}" onchange="window.socialSavePlatform('${id}')" data-f="telegram_chat_id" placeholder="@yourchannel"></div>`);
  }
  if (id === 'whatsapp') {
    extras.push(`
      <div><label class="lbl">Phone number ID</label><input class="input-field !text-xs !py-2" value="${esc(config.whatsapp_phone_id || '')}" onchange="window.socialSavePlatform('${id}')" data-f="whatsapp_phone_id"></div>
      <div><label class="lbl">Recipient number</label><input class="input-field !text-xs !py-2" value="${esc(config.whatsapp_recipient || '')}" onchange="window.socialSavePlatform('${id}')" data-f="whatsapp_recipient"></div>
      <div class="col-span-2"><label class="lbl">Channel id</label><input class="input-field !text-xs !py-2" value="${esc(config.whatsapp_channel_id || '')}" onchange="window.socialSavePlatform('${id}')" data-f="whatsapp_channel_id"></div>`);
  }
  if (id === 'facebook') {
    const pages = Array.isArray(p.account?.extra?.pages) ? p.account.extra.pages : [];
    extras.push(`<div class="col-span-2"><label class="lbl">Facebook Page to post to</label><select class="input-field !text-xs !py-2" onchange="window.socialSavePlatform('${id}')" data-f="facebook_page_id">
      <option value="">Select a page…</option>
      ${pages.map((pg) => `<option value="${esc(pg.id)}" ${config.facebook_page_id === pg.id ? 'selected' : ''}>${esc(pg.name)}</option>`).join('')}
    </select>${pages.length ? '' : '<p class="text-[10px] text-gray-500">Connect a Facebook account first.</p>'}</div>`);
  }
  if (id === 'instagram') {
    const igPages = Array.isArray(p.account?.extra?.pages) ? p.account.extra.pages : [];
    extras.push(`<div class="col-span-2"><label class="lbl">Instagram account</label><select class="input-field !text-xs !py-2" onchange="window.socialSavePlatform('${id}')" data-f="instagram_ig_user_id">
      <option value="">Select an Instagram Business account…</option>
      ${igPages.map((pg) => `<option value="${esc(pg.igUserId)}" ${config.instagram_ig_user_id === String(pg.igUserId) ? 'selected' : ''}>@${esc(pg.username)}</option>`).join('')}
    </select>${igPages.length ? '' : '<p class="text-[10px] text-gray-500">Connect an Instagram business account first.</p>'}</div>`);
  }
  if (id === 'pinterest') {
    extras.push(`<div class="col-span-2"><label class="lbl">Board id</label><input class="input-field !text-xs !py-2" value="${esc(config.pinterest_board_id || '')}" onchange="window.socialSavePlatform('${id}')" data-f="pinterest_board_id" placeholder="Paste a board id from Pinterest"></div>`);
  }
  if (id === 'youtube') {
    extras.push(`<div><label class="lbl">Privacy</label><select class="input-field !text-xs !py-2" onchange="window.socialSavePlatform('${id}')" data-f="youtube_privacy">
      <option value="private" ${(config.youtube_privacy || 'private') === 'private' ? 'selected' : ''}>Private</option>
      <option value="unlisted" ${config.youtube_privacy === 'unlisted' ? 'selected' : ''}>Unlisted</option>
      <option value="public" ${config.youtube_privacy === 'public' ? 'selected' : ''}>Public</option>
    </select></div>`);
  }
  return extras.length ? `<div class="grid grid-cols-2 gap-2">${extras.join('')}</div>` : '';
}

window.socialTogglePlatform = async function (id, enabled) {
  await socialTogglePlatformLow(id, { enabled });
};

async function socialTogglePlatformLow(id, patch) {
  const row = _platformSettings.find((s) => s.platform === id);
  const { error } = await supabase.from('social_platform_settings').upsert({ id: row?.id, platform: id, ...patch, updated_at: new Date().toISOString() }, { onConflict: 'platform' });
  if (error) { toast(error.message, 'error'); return; }
  toast(`${platformName(id)} ${patch.enabled !== undefined ? (patch.enabled ? 'enabled' : 'disabled') : 'saved'}.`);
}

window.socialSavePlatform = async function (id) {
  const fields = Array.from(document.querySelectorAll(`[onchange="window.socialSavePlatform('${id}')"]`));
  const config = {};
  for (const el of fields) {
    const key = el.dataset.f; if (!key) continue;
    config[key] = el.value;
  }
  const row = _platformSettings.find((s) => s.platform === id);
  const { error } = await supabase.from('social_platform_settings').upsert({ id: row?.id, platform: id, config: { ...(row?.config || {}), ...config }, updated_at: new Date().toISOString() }, { onConflict: 'platform' });
  if (error) { toast(error.message, 'error'); return; }
  toast(`${platformName(id)} settings saved.`);
};

window.socialCopy = function (btn) {
  const text = btn.dataset.text || '';
  navigator.clipboard?.writeText(text).then(() => toast('Copied.')).catch(() => toast('Copy failed.', 'error'));
};

// ══════════════ API CONNECTION STATUS ══════════════
async function loadApiStatus(body) {
  try {
    const st = await fetchStatus();
    const server = st.serverConfigured || {};
    body.innerHTML = `
      <div class="space-y-4">
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-2">
          <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="server" class="w-4 h-4 text-blue-400"></i> Server Configuration</h3>
          <div class="grid sm:grid-cols-3 gap-2">
            ${serverRow('Supabase service keys', server.supabase, 'Needed for scheduler + token storage')}
            ${serverRow('Token encryption key', server.tokenEncryption, 'SOCIAL_TOKEN_ENC_KEY (AES-256-GCM)')}
            ${serverRow('Scheduler secret', server.schedulerSecret, 'SCHEDULER_CRON_SECRET for the 15-min cron')}
          </div>
        </div>
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-2">
          <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="plug" class="w-4 h-4 text-blue-400"></i> Platform API Ready Status</h3>
          <div class="grid md:grid-cols-2 gap-2">
            ${(st.platforms || []).map((p) => `
              <div class="flex items-center gap-3 p-3 bg-white/[.03] border border-white/10 rounded-xl">
                <i data-lucide="${platformIcon(p.id)}" class="w-4 h-4 ${PLATFORM_META[p.id]?.tone || ''} shrink-0"></i>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold text-white">${esc(p.label)}</p>
                  <p class="text-[10px] text-gray-500 leading-relaxed">${esc(p.requirements?.note || '')}</p>
                </div>
                <span class="badge ${p.configured ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/15 text-amber-300 border-amber-500/30'}">${p.configured ? 'ready' : 'setup needed'}</span>
              </div>`).join('')}
          </div>
        </div>
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-2">
          <h3 class="text-sm font-black text-white">Security notes</h3>
          <ul class="text-[11px] text-gray-400 space-y-1.5 list-disc list-inside">
            <li>API keys and client secrets are only read from server environment variables — they never reach the browser or frontend code.</li>
            <li>Access / refresh tokens are encrypted with AES-256-GCM before storage and are decrypted only inside server functions.</li>
            <li>All social endpoints verify admin access; the scheduler additionally checks its cron secret.</li>
            <li>No TikTok passwords are collected. Only the official OAuth flow is used — no scraping, no unofficial bots.</li>
            <li>Public posting on TikTok / Meta / Google / X is subject to each platform's app review and its posting rules; the dashboard shows those requirements.</li>
          </ul>
        </div>
      </div>`;
    icons();
  } catch (err) {
    body.innerHTML = `<div class="glass-soft border border-red-500/20 rounded-2xl p-5 text-sm text-red-300">${esc(err.message)}</div>`;
  }
}

function serverRow(label, value, sub) {
  return `<div class="p-3 rounded-xl bg-white/[.03] border border-white/10">
    <div class="flex items-center justify-between gap-2"><p class="text-xs font-bold text-white">${esc(label)}</p><span class="badge ${value ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' : 'bg-red-500/15 text-red-300 border-red-500/30'}">${value ? 'OK' : 'missing'}</span></div>
    <p class="text-[10px] text-gray-500 mt-1">${esc(sub)}</p>
  </div>`;
}

// expose for inline handlers
window.social = { renderSocialMedia, loadTab };