// src/admin-video-scanner.js — Admin Video Scanner.
// Brand-new VIDEO-ONLY AI scanner (never reuses any deleted scanner code).
// The browser picks ONE real video (mp4/mov/webm), uploads it to a private
// Supabase Storage bucket, then calls the `video-scanner` edge function which
// sends the video to Gemini's File API as REAL video (motion + audio) and
// returns a structured analysis. The Gemini key never leaves the server.

import { SUPABASE_URL, supabase } from './supabase-client.js';
import { getCurrentUser } from './auth.js';

const MAX_BYTES = 180 * 1024 * 1024;        // keep in sync with the edge function
const VIDEO_TYPES = [
  'video/mp4', 'video/quicktime', 'video/webm', 'video/m4v', 'video/x-m4v',
  'video/x-msvideo', 'video/x-matroska', 'application/octet-stream',
];

let state = {
  user: null,
  file: null,
  objectUrl: null,
  phase: 'idle',           // idle | ready | uploading | scanning | done
  progress: 0,
  stageText: '',
  result: null,
  error: null,
  question: '',
};

function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3500);
  if (window.lucide) lucide.createIcons();
}

function isVideoFile(file) {
  const name = String(file?.name || '').toLowerCase();
  const ext = name.includes('.') ? name.split('.').pop() : '';
  if (VIDEO_TYPES.includes(file?.type)) return true;
  return ['mp4', 'mov', 'webm', 'm4v', 'avi', 'mkv'].includes(ext);
}

function renderAccessDenied(title, message) {
  const root = document.getElementById('admin-root');
  root.innerHTML = `
    <div class="flex items-center justify-center py-20">
      <div class="text-center max-w-md">
        <div class="w-14 h-14 mx-auto bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mb-4">
          <i data-lucide="shield-alert" class="w-7 h-7 text-red-400"></i>
        </div>
        <h2 class="text-white font-black text-xl mb-2">${title}</h2>
        <p class="text-gray-400 text-sm mb-6">${message}</p>
        <a href="/auth.html?redirect=/admin-video-scanner.html" class="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold py-2.5 px-5 rounded-xl text-sm btn-press">Sign In</a>
      </div>
    </div>`;
  if (window.lucide) lucide.createIcons();
}

function reloadIcons() {
  if (window.lucide) lucide.createIcons();
}

function fmtBytes(n) {
  if (!n) return '0 MB';
  const mb = n / (1024 * 1024);
  return mb >= 1024 ? `${(n / (1024*1024*1024)).toFixed(2)} GB` : `${mb.toFixed(1)} MB`;
}

// ---- Rendering --------------------------------------------------------------

function render() {
  const root = document.getElementById('admin-root');
  root.innerHTML = `
    <div class="max-w-5xl mx-auto space-y-6" id="scanner-app">
      ${renderHero()}
      ${renderDropzone()}
      ${renderResults()}
    </div>`;
  reloadIcons();
  bindUI();
}

function renderHero() {
  return `
    <div class="glass rounded-2xl border border-violet-500/15 p-5 fade-in" id="hero">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div class="flex items-center gap-2 text-violet-300">
            <i data-lucide="clapperboard" class="w-4 h-4"></i>
            <span class="text-[11px] font-bold uppercase tracking-widest">Video-only analysis</span>
          </div>
          <h2 class="text-white font-black text-2xl mt-1">AI Video Scanner</h2>
          <p class="text-gray-400 text-sm mt-1">Upload one real video clip (mp4, mov or webm). Gemini watches the motion and listens to the audio, then reports exactly what the video shows.</p>
        </div>
        <div class="flex flex-col items-center gap-1 bg-violet-500/10 border border-violet-500/20 rounded-xl px-5 py-3">
          <i data-lucide="film" class="w-5 h-5 text-violet-300"></i>
          <span class="text-[10px] text-gray-400 uppercase tracking-wider">Max size</span>
          <span class="text-white font-bold text-sm">180 MB</span>
        </div>
      </div>
    </div>`;
}

function renderDropzone() {
  const busy = state.phase === 'uploading' || state.phase === 'scanning';
  const fileBlock = state.file ? `
    <div class="flex items-center gap-4">
      <div class="relative w-36 h-24 rounded-xl overflow-hidden bg-black border border-white/10 shrink-0">
        <video src="${state.objectUrl}" class="w-full h-full object-cover" muted playsinline></video>
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-white font-bold text-sm truncate">${escapeHtml(state.file.name)}</p>
        <p class="text-gray-400 text-xs mt-0.5">${fmtBytes(state.file.size)} • ${state.file.type || 'video'}</p>
        <div class="mt-3 flex items-center gap-2">
          <button id="btn-scan" class="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:pointer-events-none text-white font-bold py-2.5 px-5 rounded-xl text-sm btn-press">
            <i data-lucide="${state.phase === 'scanning' ? 'loader-2' : 'scan-line'}" class="${state.phase === 'scanning' ? 'animate-spin ' : ''}w-4 h-4"></i>
            ${state.phase === 'scanning' ? 'Analyzing…' : 'Upload & Scan Video'}
          </button>
          <button id="btn-clear" class="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition text-xs font-semibold py-2.5 px-3 rounded-lg">
            <i data-lucide="x" class="w-4 h-4"></i> Remove
          </button>
        </div>
      </div>
    </div>` : '';

  return `
    <div class="glass rounded-2xl border border-violet-500/15 p-5 fade-in">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-white font-bold text-sm flex items-center gap-2"><i data-lucide="upload-cloud" class="w-4 h-4 text-violet-400"></i> Upload Video</h3>
        <span class="text-[10px] text-gray-500 uppercase tracking-wider">Step 1 · Choose file</span>
      </div>

      ${state.error ? `
        <div class="mb-4 rounded-xl border border-red-500/25 bg-red-500/10 p-3 text-xs text-red-300 flex items-start gap-2">
          <i data-lucide="circle-alert" class="w-4 h-4 text-red-400 mt-0.5 shrink-0"></i>
          <span>${escapeHtml(state.error)}</span>
        </div>` : ''}

      <input type="file" id="file-input" accept="video/mp4,video/quicktime,video/webm,video/x-m4v,video/x-msvideo,video/x-matroska,.mp4,.mov,.webm,.m4v" class="hidden">

      ${state.file ? fileBlock : `
      <label for="file-input" id="drop-zone" class="block cursor-pointer rounded-xl border-2 border-dashed border-violet-500/30 hover:border-violet-500/60 transition bg-violet-500/5 hover:bg-violet-500/10 p-10 text-center ${busy ? 'pointer-events-none opacity-40' : ''}">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center mb-4">
          <i data-lucide="video" class="w-7 h-7 text-violet-400"></i>
        </div>
        <p class="text-white font-bold text-sm">Drag a video here, or <span class="text-violet-400 underline">browse</span></p>
        <p class="text-gray-500 text-xs mt-2">MP4, MOV or WebM up to 180&nbsp;MB — video only, photos are ignored.</p>
      </label>`}

      ${(state.phase === 'uploading' || state.phase === 'scanning') ? progressBar() : ''}
    </div>`;
}

function progressBar() {
  const pct = state.phase === 'uploading' ? state.progress : 92;
  const scan = state.phase === 'scanning' || state.progress >= 100;
  return `
    <div id="prog-holder" class="mt-4">
      <div class="flex items-center justify-between text-xs mb-1.5">
        <span id="stage-text" class="text-gray-300 flex items-center gap-1.5">
          <i data-lucide="${scan ? 'sparkles' : 'loader-2'}" class="${scan ? '' : 'animate-spin'} w-3.5 h-3.5 text-violet-400"></i>
          ${escapeHtml(state.stageText || (scan ? 'Analyzing video…' : `Uploading… ${Math.round(state.progress)}%`))}
        </span>
        <span class="text-gray-500 font-mono">${scan ? '—' : Math.round(state.progress) + '%'}</span>
      </div>
      <div class="h-2 rounded-full bg-white/5 overflow-hidden">
        <div class="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full progress-stripes transition-all duration-300" style="width:${scan ? 100 : Math.max(3, state.progress)}%"></div>
      </div>
    </div>`;
}

function renderResults() {
  if (state.phase !== 'done' || !state.result) return '';
  const r = state.result;
  const isOk = r.status === 'ok';
  const badge = isOk
    ? '<span class="inline-flex items-center gap-1.5 bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"><i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Analyzed</span>'
    : '<span class="inline-flex items-center gap-1.5 bg-amber-500/15 text-amber-300 border border-amber-500/25 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"><i data-lucide="help-circle" class="w-3.5 h-3.5"></i> Could not determine</span>';

  const conf = r.confidence || 0;
  const confColor = conf >= 70 ? 'bg-emerald-500' : conf >= 35 ? 'bg-amber-500' : 'bg-red-500';
  const confText = conf >= 70 ? 'text-emerald-400' : conf >= 35 ? 'text-amber-400' : 'text-red-400';

  const obs = (r.observations || []).map((o) => `
    <div class="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0">
      <span class="shrink-0 text-[10px] font-mono font-bold bg-violet-500/15 text-violet-300 border border-violet-500/20 rounded px-2 py-1 mt-0.5">${escapeHtml(o.time || '00:00')}</span>
      <span class="text-sm text-gray-300">${escapeHtml(o.note || '')}</span>
    </div>`).join('');

  const sections = (r.sections || []).map((s) => `
    <div class="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0">
      <span class="shrink-0 text-[10px] font-mono font-bold bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/20 rounded px-2 py-1 mt-0.5">${escapeHtml(s.time || '00:00')}</span>
      <div>
        <p class="text-sm font-semibold text-white">${escapeHtml(s.title || '')}</p>
        ${s.description ? `<p class="text-xs text-gray-400 mt-0.5">${escapeHtml(s.description)}</p>` : ''}
      </div>
    </div>`).join('');

  const warnings = (r.warnings || []).map((w) => `
    <div class="flex items-start gap-2 text-xs text-amber-300 py-1">
      <i data-lucide="triangle-alert" class="w-3.5 h-3.5 mt-0.5 shrink-0"></i><span>${escapeHtml(w)}</span>
    </div>`).join('');

  return `
    <div class="glass rounded-2xl border border-violet-500/15 p-5 fade-in">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h3 class="text-white font-bold text-sm flex items-center gap-2"><i data-lucide="clipboard-list" class="w-4 h-4 text-violet-400"></i> Scan Result</h3>
        ${badge}
      </div>

      ${r.reason_if_cannot_determine && !isOk ? `
        <div class="rounded-xl border border-amber-500/25 bg-amber-500/10 p-4 mb-4">
          <p class="text-sm text-amber-200">${escapeHtml(r.reason_if_cannot_determine)}</p>
        </div>` : ''}

      <div class="grid md:grid-cols-2 gap-4 mb-4">
        <div>${confidenceCard(conf, confColor, confText)}</div>
        <div>${labelCard(r)}</div>
      </div>

      ${r.overall_analysis ? `
        <div class="rounded-xl bg-white/[.03] border border-white/10 p-4 mb-4">
          <p class="text-sm text-gray-200 leading-relaxed">${escapeHtml(r.overall_analysis)}</p>
        </div>` : ''}

      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h4 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-1.5"><i data-lucide="eye" class="w-3.5 h-3.5 text-violet-400"></i> What I saw</h4>
          ${obs || '<p class="text-xs text-gray-500 py-2">No timestamped observations were returned.</p>'}
        </div>
        <div>
          <h4 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-1.5"><i data-lucide="camera" class="w-3.5 h-3.5 text-fuchsia-400"></i> Sections</h4>
          ${sections || '<p class="text-xs text-gray-500 py-2">No sections were returned.</p>'}
        </div>
      </div>

      ${r.audio_notes ? `
        <div class="mt-4 rounded-xl bg-white/[.03] border border-white/10 p-4 flex items-start gap-3">
          <i data-lucide="ear" class="w-4 h-4 text-violet-400 mt-0.5 shrink-0"></i>
          <div>
            <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Audio</p>
            <p class="text-xs text-gray-300">${escapeHtml(r.audio_notes)}</p>
          </div>
        </div>` : ''}

      ${warnings ? `
        <div class="mt-4 rounded-xl border border-amber-500/25 bg-amber-500/10 p-4">
          <p class="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-2">Warnings</p>
          ${warnings}
        </div>` : ''}
    </div>`;
}

function confidenceCard(conf, color, text) {
  return `
    <div class="rounded-xl bg-white/[.03] border border-white/10 p-4">
      <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Confidence</p>
      <div class="flex items-center gap-3">
        <span class="text-3xl font-black ${text}">${conf}</span>
        <span class="text-gray-500 text-xs mt-1.5">/ 100</span>
      </div>
      <div class="h-2.5 rounded-full bg-white/5 overflow-hidden mt-3">
        <div class="h-full ${color} rounded-full transition-all duration-500" style="width:${conf}%"></div>
      </div>
      <p class="text-[10px] ${text} font-bold mt-2 uppercase tracking-wide">${confidenceLabel(conf)}</p>
    </div>`;
}

function confidenceLabel(conf) {
  if (conf >= 70) return 'High confidence';
  if (conf >= 35) return 'Moderate confidence';
  return 'Low confidence';
}

function labelCard(r) {
  return `
    <div class="rounded-xl bg-white/[.03] border border-white/10 p-4">
      <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Subject</p>
      <p class="text-lg font-bold text-white leading-snug">${escapeHtml(r.label || '—')}</p>
      <div class="mt-3 flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 ${r.detected ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25' : 'bg-gray-500/15 text-gray-400 border border-gray-500/25'} rounded-full px-3 py-1 text-[11px] font-bold">
          <i data-lucide="${r.detected ? 'check' : 'x'}" class="w-3.5 h-3.5"></i>
          ${r.detected ? 'Subject detected' : 'No clear subject'}
        </span>
      </div>
    </div>`;
}

// ---- Upload / scan ----------------------------------------------------------

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function setPhase(phase, patches = {}) {
  Object.assign(state, { phase, ...patches });
  render();
}

async function uploadWithProgress(file) {
  const name = String(file.name || 'clip.mp4').slice(0, 120);
  const safeName = name.replace(/[^\w.\-]+/g, '_');
  const path = `scans/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;

  // 1. Admin requests a signed upload URL via the edge function (server-side token).
  const fnUrl = `${SUPABASE_URL.replace(/\/+$/, '')}/functions/v1/video-scanner`;
  const { data: { session } } = await supabase.auth.getSession();
  const authToken = session?.access_token || '';

  const uploadToken = await safeFetch(fnUrl, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'upload_token', path, content_type: file.type || 'video/mp4' }),
  });

  // 2. PUT the bytes to the signed URL via XHR so we get real progress.
  await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', uploadToken.url, true);
    xhr.setRequestHeader('Content-Type', file.type || 'video/mp4');
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && e.total) {
        state.progress = 15 + Math.round((e.loaded / e.total) * 75);
        document.querySelector('#scanner-app') && renderProgressOnly();
      }
    };
    xhr.onload = () => {
      const good = xhr.status >= 200 && xhr.status < 300;
      if (good) { state.progress = 90; state.stageText = 'Video uploaded. Asking Gemini…'; renderProgressOnly(); resolve(); }
      else reject(new Error(`Upload failed (HTTP ${xhr.status}).`));
    };
    xhr.onerror = () => reject(new Error('Upload failed — check your connection.'));
    xhr.onabort = () => reject(new Error('Upload aborted.'));
    xhr.send(file);
  });

  return path;
}

function renderProgressOnly() {
  const holder = document.getElementById('prog-holder');
  if (holder) holder.innerHTML = progressBar();
  const stage = document.getElementById('stage-text');
  if (stage) stage.textContent = state.stageText;
}

async function safeFetch(url, options) {
  let res;
  try {
    res = await fetch(url, options);
  } catch (e) {
    throw new Error('Could not reach the scanner service.');
  }
  let data = {};
  try { data = await res.json(); } catch {}
  if (!res.ok || data.error) throw new Error(data.error || `Request failed (${res.status}).`);
  return data;
}

async function handleScan() {
  if (!state.file || state.phase === 'uploading' || state.phase === 'scanning') return;
  state.error = null;
  setPhase('uploading', { progress: 5, stageText: 'Preparing upload…', result: null });

  let path;
  try {
    path = await uploadWithProgress(state.file);
    setPhase('scanning', { progress: 92, stageText: 'Analyzing video with AI…', result: null });

    const fnUrl = `${SUPABASE_URL.replace(/\/+$/, '')}/functions/v1/video-scanner`;
    const { data: { session } } = await supabase.auth.getSession();
    const authToken = session?.access_token || '';
    const data = await safeFetch(fnUrl, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'scan',
        path,
        model: 'gemini-flash-latest',
        question: state.question.trim() || undefined,
      }),
    });
    setPhase('done', { result: data.result || { status: 'cannot_determine' }, progress: 100, stageText: 'Done' });
  } catch (err) {
    state.error = err.message;
    setPhase(state.file ? 'ready' : 'idle', { error: err.message });
    if (path) {
      try {
        await fetch(`${SUPABASE_URL.replace(/\/+$/, '')}/functions/v1/video-scanner`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token || ''}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'cleanup', path }),
        });
      } catch {}
    }
  }
}

function resetScan() {
  if (state.objectUrl) URL.revokeObjectURL(state.objectUrl);
  state.file = null;
  state.objectUrl = null;
  state.phase = 'idle';
  state.progress = 0;
  state.stageText = '';
  state.result = null;
  state.error = null;
  render();
}

function attachFile(file) {
  if (!file || state.phase === 'uploading' || state.phase === 'scanning') return;
  if (!isVideoFile(file)) { showToast('Please choose a video file (MP4, MOV or WebM).'); return; }
  if (file.size > MAX_BYTES) { showToast(`Video is too large (${fmtBytes(file.size)}). Max is 180 MB.`); return; }
  if (state.objectUrl) URL.revokeObjectURL(state.objectUrl);
  state.file = file;
  state.objectUrl = URL.createObjectURL(file);
  state.phase = 'ready';
  state.error = null;
  state.result = null;
  render();
}

function bindUI() {
  const fileInput = document.getElementById('file-input');
  if (fileInput) fileInput.addEventListener('change', (e) => attachFile(e.target.files?.[0]));

  const dropZone = document.getElementById('drop-zone');
  if (dropZone) {
    ['dragenter', 'dragover'].forEach((ev) => dropZone.addEventListener(ev, (e) => { e.preventDefault(); }));
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      const f = e.dataTransfer?.files?.[0];
      if (f) attachFile(f);
    });
  }

  const btnScan = document.getElementById('btn-scan');
  if (btnScan) btnScan.addEventListener('click', handleScan);

  const btnClear = document.getElementById('btn-clear');
  if (btnClear) btnClear.addEventListener('click', resetScan);
}

// ---- Boot -------------------------------------------------------------------

async function init() {
  state.user = await getCurrentUser();
  if (!state.user) {
    renderAccessDenied('Access denied', 'Please sign in to use the video scanner.');
    return;
  }
  const { data: isAdmin } = await supabase.rpc('is_current_user_admin');
  if (!isAdmin) {
    renderAccessDenied('Admins only', 'This account does not have administrator privileges.');
    return;
  }
  render();
}

init();