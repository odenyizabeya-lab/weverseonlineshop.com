// ═══════════════════════════════════════════════════════════════════
//  API & INTEGRATIONS SETTINGS — admin dashboard section.
//
//  Lets an authorized administrator store, replace and remove the
//  credentials for every external integration WITHOUT the values ever
//  appearing in the browser after they are saved.
//
//  • Values are POSTed once, encrypted server-side (AES-256-GCM) and
//    stored as an opaque blob. The API never returns them.
//  • Cloudflare Pages deployment secrets (encryption key, scheduler
//    secret, Supabase service-role key) are shown status-only with a
//    link to the Cloudflare dashboard — they cannot be set from a form.
//  • Every platform offers a real connection test; nothing is reported
//    as working unless the server actually contacted the platform.
// ═══════════════════════════════════════════════════════════════════
import { supabase } from './supabase-client.js';

let _categories = [];

function esc(t) {
  if (t == null) return '';
  const d = document.createElement('div'); d.textContent = String(t); return d.innerHTML;
}
function icons() { if (window.lucide) { try { lucide.createIcons(); } catch (e) {} } }
function toast(msg, type = 'success') {
  const t = document.getElementById('toast'); const m = document.getElementById('toast-msg');
  if (!t || !m) { if (type === 'error') alert(msg); return; }
  m.textContent = msg;
  const icon = t.querySelector('i[data-lucide]');
  const iconMap = { success: 'check-circle', error: 'alert-circle', info: 'info' };
  const colorMap = { success: 'text-emerald-400', error: 'text-red-400', info: 'text-blue-400' };
  if (icon) { icon.setAttribute('data-lucide', iconMap[type] || 'info'); icon.className = `w-4 h-4 shrink-0 ${colorMap[type] || 'text-blue-400'}`; }
  t.style.transform = 'translateY(0)'; t.style.opacity = '1';
  icons();
  clearTimeout(t._t);
  t._t = setTimeout(() => { t.style.transform = 'translateY(20px)'; t.style.opacity = '0'; }, 3200);
}
function loading() { return '<div class="flex items-center justify-center py-24"><div class="flex items-center gap-3 text-gray-400 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading…</div></div>'; }

async function sessionToken() {
  const { data } = await supabase.auth.getSession();
  return data?.session?.access_token || '';
}

async function api(path, { method = 'GET', body } = {}) {
  const token = await sessionToken();
  const headers = { 'authorization': `Bearer ${token}`, 'content-type': 'application/json' };
  if (method !== 'GET') headers['x-admin-csrf'] = '1';
  const res = await fetch(path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  let data = {};
  try { data = await res.json(); } catch (e) { data = {}; }
  if (!res.ok) throw Object.assign(new Error(data?.error || `Request failed (HTTP ${res.status})`), { status: res.status, data });
  return data;
}

function statusPill(configured, source) {
  if (!configured) return '<span class="badge bg-amber-500/15 text-amber-300 border-amber-500/30">Not configured</span>';
  const label = source === 'environment' ? 'Configured (env)' : 'Configured';
  return `<span class="badge bg-emerald-500/15 text-emerald-300 border-emerald-500/30">${label}</span>`;
}

function fmtDT(d) { try { return d ? new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : null; } catch (e) { return null; } }

function deploymentCard(cat) {
  return `
    <div class="glass-soft border border-blue-500/15 rounded-2xl p-5">
      <div class="flex items-start justify-between gap-3 mb-3">
        <div class="flex items-center gap-2">
          <div class="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center"><i data-lucide="${esc(cat.icon || 'lock')}" class="w-4 h-4 text-blue-400"></i></div>
          <div><h3 class="text-sm font-black text-white">${esc(cat.label)}</h3><p class="text-[11px] text-gray-500">Cloudflare deployment secret</p></div>
        </div>
        ${statusPill(cat.configured, 'environment')}
      </div>
      <p class="text-xs text-gray-500 mb-3">${esc(cat.description || '')}</p>
      <div class="space-y-2">
        ${(cat.secrets || []).map((s) => `
          <div class="flex items-start justify-between gap-3 p-3 bg-white/[.03] border border-white/5 rounded-xl">
            <div class="min-w-0">
              <p class="text-xs font-bold text-white">${esc(s.label)} <code class="text-[10px] text-gray-500">${esc(s.name)}</code></p>
              <p class="text-[11px] text-gray-500 mt-0.5">${esc(s.note || '')}</p>
            </div>
            ${s.configured ? '<span class="badge bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shrink-0">set</span>' : '<span class="badge bg-red-500/15 text-red-300 border-red-500/30 shrink-0">missing</span>'}
          </div>`).join('')}
      </div>
      <a href="${esc(cat.dashboardUrl || '#')}" target="_blank" rel="noopener" class="btn-press inline-flex items-center gap-1.5 mt-4 px-3 py-2 rounded-xl text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition">
        <i data-lucide="external-link" class="w-3.5 h-3.5"></i> Set in Cloudflare dashboard
      </a>
    </div>`;
}

function platformCard(cat) {
  const updated = fmtDT(cat.updatedAt);
  return `
    <div class="glass-soft border border-blue-500/15 rounded-2xl p-5" data-category="${esc(cat.id)}">
      <div class="flex items-start justify-between gap-3 mb-4">
        <div class="flex items-center gap-2">
          <div class="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center"><i data-lucide="${esc(cat.icon || 'plug')}" class="w-4 h-4 text-blue-400"></i></div>
          <div><h3 class="text-sm font-black text-white">${esc(cat.label)}</h3>
            <p class="text-[11px] text-gray-500">${updated ? 'Updated ' + esc(updated) : 'No credentials stored yet'}</p></div>
        </div>
        ${statusPill(cat.configured, cat.source)}
      </div>
      <div class="space-y-3">
        ${(cat.fields || []).map((f) => `
          <div>
            <label class="block text-[11px] font-bold text-gray-400 mb-1">
              ${esc(f.label)}${f.optional ? ' <span class="text-gray-600 font-normal">(optional)</span>' : ''}
              ${f.configured ? '<span class="ml-1 text-emerald-400 font-normal">• stored</span>' : ''}
            </label>
            <div class="flex gap-2">
              <input id="int-${esc(cat.id)}-${esc(f.name)}" type="${f.secret ? 'password' : 'text'}" autocomplete="new-password" spellcheck="false"
                maxlength="${f.max || 400}" placeholder="${f.configured ? '•••••••• (leave blank to keep)' : (f.secret ? 'Enter value' : '')}"
                class="flex-1 bg-white/[.04] border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-blue-500/50 outline-none">
              ${f.secret ? `<button type="button" onclick="window.intToggle('int-${esc(cat.id)}-${esc(f.name)}', this)" class="px-3 rounded-xl bg-white/[.04] border border-white/10 text-gray-400 hover:text-white" title="Show / hide"><i data-lucide="eye" class="w-4 h-4"></i></button>` : ''}
            </div>
          </div>`).join('')}
      </div>
      <div class="flex items-center gap-2 flex-wrap mt-4">
        <button onclick="window.intSave('${esc(cat.id)}')" class="btn-press inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition"><i data-lucide="save" class="w-3.5 h-3.5"></i> Save</button>
        <button onclick="window.intTest('${esc(cat.id)}')" class="btn-press inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white/[.05] text-gray-200 border border-white/10 hover:border-blue-500/40 transition"><i data-lucide="plug-zap" class="w-3.5 h-3.5"></i> Test connection</button>
        ${cat.configured ? `<button onclick="window.intRemove('${esc(cat.id)}')" class="btn-press inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-red-500/10 text-red-300 border border-red-500/20 hover:bg-red-500/20 transition"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Remove</button>` : ''}
      </div>
      <p id="int-result-${esc(cat.id)}" class="hidden text-[11px] mt-3 px-3 py-2 rounded-xl"></p>
    </div>`;
}

function renderBody() {
  const dep = _categories.filter((c) => c.kind === 'deployment');
  const plat = _categories.filter((c) => c.kind === 'platform');
  return `
    <div class="space-y-5">
      <div class="glass-soft border border-blue-500/15 rounded-2xl p-4">
        <p class="text-xs text-gray-400"><i data-lucide="shield-check" class="w-3.5 h-3.5 inline text-emerald-400 mr-1"></i>
        Credentials you save here are encrypted on the server (AES-256-GCM) before storage. Saved values are never sent back to the browser — after saving you will only ever see whether a field is configured.</p>
      </div>
      <div>
        <h3 class="text-xs font-black text-gray-400 uppercase tracking-wide mb-2">Security &amp; platform infrastructure</h3>
        <div class="grid lg:grid-cols-2 gap-4">${dep.map(deploymentCard).join('')}</div>
      </div>
      <div>
        <h3 class="text-xs font-black text-gray-400 uppercase tracking-wide mb-2">Platform integrations</h3>
        <div class="grid lg:grid-cols-2 gap-4">${plat.map(platformCard).join('')}</div>
      </div>
    </div>`;
}

function findCategory(id) { return _categories.find((c) => c.id === id); }

export async function renderIntegrationsSettings() {
  const content = document.getElementById('content');
  if (!content) return;
  content.innerHTML = `
    <div class="space-y-4 fade-in">
      <div>
        <h2 class="text-xl font-black text-white flex items-center gap-2"><i data-lucide="key-round" class="w-5 h-5 text-blue-400"></i> API &amp; Integrations Settings</h2>
        <p class="text-xs text-gray-500 mt-1">Manage the credentials for every external integration yourself. Secrets are stored encrypted server-side and never displayed again after saving.</p>
      </div>
      <div id="integrations-body">${loading()}</div>
    </div>`;
  icons();
  await loadIntegrations();
}

async function loadIntegrations() {
  const body = document.getElementById('integrations-body');
  if (!body) return;
  try {
    const data = await api('/api/social/integrations');
    _categories = data.categories || [];
    body.innerHTML = renderBody();
    icons();
  } catch (err) {
    body.innerHTML = `<div class="glass-soft border border-red-500/20 rounded-2xl p-6 text-sm text-red-300">${esc(err.message)}</div>`;
  }
}

function collectValues(cat) {
  const values = {};
  for (const f of cat.fields || []) {
    const el = document.getElementById(`int-${cat.id}-${f.name}`);
    if (!el) continue;
    const v = String(el.value || '').trim();
    if (v) values[f.name] = v;
  }
  return values;
}

function showResult(id, ok, note) {
  const el = document.getElementById(`int-result-${id}`);
  if (!el) return;
  el.classList.remove('hidden', 'bg-emerald-500/10', 'text-emerald-300', 'bg-red-500/10', 'text-red-300', 'bg-amber-500/10', 'text-amber-300');
  if (ok) el.classList.add('bg-emerald-500/10', 'text-emerald-300');
  else el.classList.add('bg-red-500/10', 'text-red-300');
  el.textContent = note || (ok ? 'OK' : 'Failed');
}

window.intToggle = function (inputId, btn) {
  const el = document.getElementById(inputId);
  if (!el) return;
  el.type = el.type === 'password' ? 'text' : 'password';
};

window.intSave = async function (id) {
  const cat = findCategory(id);
  if (!cat) return;
  const values = collectValues(cat);
  const requiredMissing = (cat.fields || []).filter((f) => !f.optional && !values[f.name] && !f.configured);
  if (requiredMissing.length) { toast(`Please fill: ${requiredMissing.map((f) => f.label).join(', ')}`, 'error'); return; }
  try {
    await api('/api/social/integrations/save', { method: 'POST', body: { category: id, values } });
    toast(`${cat.label} credentials saved.`);
    await loadIntegrations();
  } catch (err) {
    toast(err.message, 'error');
  }
};

window.intRemove = async function (id) {
  const cat = findCategory(id);
  if (!cat) return;
  if (!window.confirm(`Remove the stored ${cat.label} credentials? Publishing for this platform will stop until new credentials are added.`)) return;
  try {
    await api('/api/social/integrations/remove', { method: 'POST', body: { category: id } });
    toast(`${cat.label} credentials removed.`);
    await loadIntegrations();
  } catch (err) {
    toast(err.message, 'error');
  }
};

window.intTest = async function (id) {
  const cat = findCategory(id);
  if (!cat) return;
  showResult(id, true, 'Testing…');
  try {
    const data = await api('/api/social/integrations/test', { method: 'POST', body: { category: id } });
    showResult(id, !!data.ok, data.note || (data.ok ? 'Connection verified.' : 'Test failed.'));
    toast(data.ok ? `${cat.label} connection verified.` : (data.requiresAccount ? `${cat.label}: ${data.note}` : `Test failed: ${data.note || ''}`), data.ok ? 'success' : 'error');
  } catch (err) {
    showResult(id, false, err.message);
    toast(err.message, 'error');
  }
};
