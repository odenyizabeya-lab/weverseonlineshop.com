// src/admin-video-scanner.js — Admin AI Video Scanner.
//
// Flow:
//   1. Upload ONE real video to a private bucket via a signed URL.
//   2. `video-scanner` edge function sends it to Gemini (motion + audio) and
//      returns an honest analysis PLUS a dynamically generated listing form
//      (field definitions + pre-filled values) for each item it recognises.
//   3. This page renders that form as REAL editable inputs, pre-filled.
//   4. The admin reviews/edits, captures product photos from video frames,
//      then Save Draft or Publish — both write to the real showroom_listings
//      table via the same write path the Products Manager uses.

import { SUPABASE_URL, supabase } from './supabase-client.js';
import { getCurrentUser } from './auth.js';
import {
  FIELD_TYPES, CATEGORY_VALUES, normalizeItems, activeFields, blankField,
  validateItem, buildListingPayload, itemFromSchema, listingTypeLabel, slugifyKey,
} from './dynamic-form.js';
import {
  safePublishShowroom, genPropertyId, describeWriteError, uploadProductImage,
  uploadProductVideo, getListing, listDrafts, productUrl,
} from './showroom-write.js';

const MAX_BYTES = 180 * 1024 * 1024;
const MAX_FRAMES = 8;
const VIDEO_TYPES = [
  'video/mp4', 'video/quicktime', 'video/webm', 'video/m4v', 'video/x-m4v',
  'video/x-msvideo', 'video/x-matroska', 'application/octet-stream',
];

let state = {
  user: null,
  file: null,
  objectUrl: null,
  phase: 'idle',            // idle | ready | uploading | scanning | extracting | review | saving | publishing
  progress: 0,
  stageText: '',
  result: null,
  items: [],
  activeItemIndex: 0,
  itemIds: [],
  error: null,
  notice: null,
  question: '',
  frames: [],
  framesFor: null,
  existingImages: [],
  includeVideo: false,
  sourceVideoUrl: null,
  draftId: null,
  drafts: [],
  publishedLinks: [],
  busy: false,
};

// ---- Small utils ------------------------------------------------------------

function $(id) { return document.getElementById(id); }

function showToast(msg) {
  const toast = $('toast');
  if (!toast) return;
  const m = $('toast-msg');
  if (m) m.textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3800);
  if (window.lucide) lucide.createIcons();
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function fmtBytes(n) {
  if (!n) return '0 MB';
  const mb = n / (1024 * 1024);
  return mb >= 1024 ? `${(n / (1024 * 1024 * 1024)).toFixed(2)} GB` : `${mb.toFixed(1)} MB`;
}

function fmtMoney(v, currency = 'USD') {
  const n = Number(v);
  if (!Number.isFinite(n) || n <= 0) return '—';
  try { return n.toLocaleString('en-US', { style: 'currency', currency: currency || 'USD', maximumFractionDigits: 2 }); }
  catch { return `$${n.toLocaleString('en-US')}`; }
}

function reloadIcons() { if (window.lucide) lucide.createIcons(); }

function isVideoFile(file) {
  const name = String(file?.name || '').toLowerCase();
  const ext = name.includes('.') ? name.split('.').pop() : '';
  if (VIDEO_TYPES.includes(file?.type)) return true;
  return ['mp4', 'mov', 'webm', 'm4v', 'avi', 'mkv'].includes(ext);
}

function isBusy() { return state.busy || state.phase === 'uploading' || state.phase === 'scanning' || state.phase === 'extracting'; }

function findField(item, key) { return (item?.fields || []).find((f) => f.key === key && !f.removed); }

function targetItem(idx) { return state.items[idx] || state.items[0]; }

// ---- Rendering --------------------------------------------------------------

function render() {
  const root = $('admin-root');
  if (!root) return;
  root.innerHTML = `
    <div class="max-w-6xl mx-auto space-y-6 pb-24" id="scanner-app">
      ${renderHero()}
      ${renderUpload()}
      ${state.phase === 'review' || state.phase === 'saving' || state.phase === 'publishing' ? renderReview() : ''}
      ${renderDrafts()}
    </div>`;
  reloadIcons();
}

function renderHero() {
  return `
    <div class="glass rounded-2xl border border-violet-500/15 p-5 fade-in" id="hero">
      <a href="/admin.html" class="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition text-xs font-semibold mb-3">
        <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Back to Admin Dashboard
      </a>
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div class="flex items-center gap-2 text-violet-300">
            <i data-lucide="clapperboard" class="w-4 h-4"></i>
            <span class="text-[11px] font-bold uppercase tracking-widest">AI listing builder</span>
          </div>
          <h2 class="text-white font-black text-2xl mt-1">AI Video Scanner</h2>
          <p class="text-gray-400 text-sm mt-1">Upload a real video. The AI watches it, builds the right listing form for what it sees, and fills in the fields for you. You review, edit, save or publish.</p>
        </div>
        <div class="flex flex-col items-center gap-1 bg-violet-500/10 border border-violet-500/20 rounded-xl px-5 py-3">
          <i data-lucide="film" class="w-5 h-5 text-violet-300"></i>
          <span class="text-[10px] text-gray-400 uppercase tracking-wider">Max size</span>
          <span class="text-white font-bold text-sm">180 MB</span>
        </div>
      </div>
    </div>`;
}

function renderUpload() {
  const busy = isBusy();
  const fileBlock = state.file ? `
    <div class="flex flex-col sm:flex-row sm:items-center gap-4">
      <div class="relative w-full sm:w-44 aspect-video rounded-xl overflow-hidden bg-black border border-white/10 shrink-0">
        <video src="${state.objectUrl}" class="w-full h-full object-cover" muted playsinline></video>
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-white font-bold text-sm truncate">${escapeHtml(state.file.name)}</p>
        <p class="text-gray-400 text-xs mt-0.5">${fmtBytes(state.file.size)} • ${escapeHtml(state.file.type || 'video')}</p>
        <div class="mt-3 flex flex-wrap items-center gap-2">
          <button data-role="scan" class="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:pointer-events-none text-white font-bold py-2.5 px-5 rounded-xl text-sm btn-press" ${busy ? 'disabled' : ''}>
            <i data-lucide="${state.phase === 'scanning' ? 'loader-2' : 'scan-line'}" class="${state.phase === 'scanning' ? 'animate-spin ' : ''}w-4 h-4"></i>
            ${state.phase === 'scanning' ? 'Analyzing…' : (state.result ? 'Re-scan Video' : 'Upload & Scan Video')}
          </button>
          <button data-role="clear" class="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition text-xs font-semibold py-2.5 px-3 rounded-lg" ${busy ? 'disabled' : ''}>
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

      <input type="file" id="file-input" accept="video/mp4,video/quicktime,video/webm,video/x-m4v,video/x-msvideo,video/x-matroska,.mp4,.mov,.webm,.m4v" class="hidden" ${busy ? 'disabled' : ''}>

      ${state.file ? fileBlock : `
      <label for="file-input" id="drop-zone" class="block cursor-pointer rounded-xl border-2 border-dashed border-violet-500/30 hover:border-violet-500/60 transition bg-violet-500/5 hover:bg-violet-500/10 p-10 text-center ${busy ? 'pointer-events-none opacity-40' : ''}">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center mb-4">
          <i data-lucide="video" class="w-7 h-7 text-violet-400"></i>
        </div>
        <p class="text-white font-bold text-sm">Drag a video here, or <span class="text-violet-400 underline">browse</span></p>
        <p class="text-gray-500 text-xs mt-2">MP4, MOV or WebM up to 180&nbsp;MB — video only.</p>
      </label>`}

      <div class="mt-4">
        <label class="text-[10px] font-bold uppercase tracking-widest text-gray-500">Anything specific to look for? (optional)</label>
        <input id="scan-question" type="text" value="${escapeHtml(state.question)}" placeholder="e.g. focus on the condition and colour" class="input-field mt-1.5 w-full bg-gray-900/60 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-violet-500" ${busy ? 'disabled' : ''}>
      </div>

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

// ---- Analysis summary -------------------------------------------------------

function renderAnalysis() {
  const r = state.result;
  if (!r) return '';
  const conf = r.confidence || 0;
  const confColor = conf >= 70 ? 'bg-emerald-500' : conf >= 35 ? 'bg-amber-500' : 'bg-red-500';
  const confText = conf >= 70 ? 'text-emerald-400' : conf >= 35 ? 'text-amber-400' : 'text-red-400';
  const warnings = (r.warnings || []).map((w) => `
    <div class="flex items-start gap-2 text-xs text-amber-300 py-1"><i data-lucide="triangle-alert" class="w-3.5 h-3.5 mt-0.5 shrink-0"></i><span>${escapeHtml(w)}</span></div>`).join('');
  const lowConf = conf < 35;

  return `
    <details class="glass rounded-2xl border border-violet-500/15 p-4 fade-in" ${lowConf ? 'open' : ''}>
      <summary class="cursor-pointer flex items-center gap-2 text-sm font-bold text-white">
        <i data-lucide="scan-eye" class="w-4 h-4 text-violet-400"></i> AI analysis
        <span class="ml-auto text-[11px] font-bold ${confText}">${conf}% confidence</span>
      </summary>
      <div class="mt-3">
        <div class="h-1.5 rounded-full bg-white/5 overflow-hidden mb-3"><div class="h-full ${confColor}" style="width:${conf}%"></div></div>
        ${r.reason_if_cannot_determine && r.status !== 'ok' ? `<div class="rounded-xl border border-amber-500/25 bg-amber-500/10 p-3 mb-3 text-sm text-amber-200">${escapeHtml(r.reason_if_cannot_determine)}</div>` : ''}
        ${r.overall_analysis ? `<p class="text-sm text-gray-200 leading-relaxed">${escapeHtml(r.overall_analysis)}</p>` : ''}
        <div class="mt-3 flex flex-wrap gap-2 text-[11px]">
          <span class="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">Subject: ${escapeHtml(r.label || '—')}</span>
          <span class="px-2.5 py-1 rounded-full ${r.detected ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25' : 'bg-gray-500/15 text-gray-400 border border-gray-500/25'}">${r.detected ? 'Item detected' : 'No clear item'}</span>
        </div>
        ${r.audio_notes ? `<p class="text-xs text-gray-400 mt-2"><i data-lucide="ear" class="inline w-3 h-3"></i> ${escapeHtml(r.audio_notes)}</p>` : ''}
        ${warnings ? `<div class="mt-3 rounded-xl border border-amber-500/25 bg-amber-500/10 p-3">${warnings}</div>` : ''}
      </div>
    </details>`;
}

// ---- Dynamic form -----------------------------------------------------------

function renderReview() {
  const items = state.items;
  const idx = Math.min(state.activeItemIndex, items.length - 1);
  const item = items[idx];
  const missing = validateItem(item, { requirePrice: true }).errors;
  const missingKeys = new Set(missing.map((m) => m.key));

  const tabs = items.length > 1 ? `
    <div class="flex flex-wrap gap-2 mb-4">
      ${items.map((it, i) => `
        <button data-role="item-tab" data-index="${i}" class="px-3 py-1.5 rounded-lg text-xs font-bold border transition ${i === idx ? 'bg-violet-600 border-violet-500 text-white' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}">
          ${escapeHtml((it.title || `Item ${i + 1}`).slice(0, 28) || `Item ${i + 1}`)}
        </button>`).join('')}
    </div>` : '';

  return `
    <div class="glass rounded-2xl border border-violet-500/15 p-5 fade-in" id="review-panel">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-2">
        <h3 class="text-white font-bold text-sm flex items-center gap-2"><i data-lucide="wand-sparkles" class="w-4 h-4 text-violet-400"></i> AI-Generated Listing Form</h3>
        <span class="text-[10px] text-gray-500 uppercase tracking-wider">${items.length > 1 ? `${items.length} items found` : 'Step 2 · Review & edit'}</span>
      </div>
      <p class="text-xs text-gray-400 mb-4">The AI chose these fields and pre-filled everything it could read from the video. Blank fields mean the information was not visible — <strong class="text-gray-200">nothing was invented.</strong> Edit any value, or add/remove/rename fields.</p>

      ${state.notice ? `<div class="mb-4 rounded-xl border border-violet-500/25 bg-violet-500/10 p-3 text-xs text-violet-200 flex items-center gap-2"><i data-lucide="info" class="w-4 h-4"></i><span>${escapeHtml(state.notice)}</span></div>` : ''}
      ${state.publishedLinks.length ? `<div class="mb-4 rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-3 text-xs text-emerald-200 flex flex-wrap items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4"></i><span>Published &amp; live:</span>${state.publishedLinks.map((l, i) => `<a href="${escapeHtml(l.url)}" target="_blank" rel="noopener" class="underline font-semibold">Listing ${i + 1} →</a>`).join(' · ')}</div>` : ''}
      ${missing.length ? `<div class="mb-4 rounded-xl border border-amber-500/25 bg-amber-500/10 p-3 text-xs text-amber-200 flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 mt-0.5 shrink-0"></i><span>Fill these before publishing: <strong>${missing.map((m) => escapeHtml(m.key)).join(', ')}</strong>. You can still save a draft.</span></div>` : ''}

      ${tabs}

      <div class="rounded-xl border border-white/10 bg-white/[.02] p-4 mb-4">
        <div class="grid sm:grid-cols-3 gap-3">
          <div>
            <label class="text-[10px] font-bold uppercase tracking-widest text-gray-500">Type</label>
            <select data-role="item-listing-type" data-index="${idx}" class="mt-1 w-full bg-gray-900/60 border border-white/10 rounded-lg px-2.5 py-2 text-sm text-white outline-none focus:border-violet-500">
              ${['product', 'vehicle', 'property', 'service'].map((t) => `<option value="${t}" ${item.listing_type === t ? 'selected' : ''}>${listingTypeLabel(t)}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="text-[10px] font-bold uppercase tracking-widest text-gray-500">Category</label>
            <select data-role="item-category" data-index="${idx}" class="mt-1 w-full bg-gray-900/60 border border-white/10 rounded-lg px-2.5 py-2 text-sm text-white outline-none focus:border-violet-500">
              <option value="">— choose —</option>
              ${!CATEGORY_VALUES.includes(item.category) && item.category ? `<option value="${escapeHtml(item.category)}" selected>${escapeHtml(item.category)}</option>` : ''}
              ${CATEGORY_VALUES.map((c) => `<option value="${escapeHtml(c)}" ${item.category === c ? 'selected' : ''}>${escapeHtml(c)}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="text-[10px] font-bold uppercase tracking-widest text-gray-500">Subcategory</label>
            <input data-role="item-subcategory" data-index="${idx}" value="${escapeHtml(item.subcategory)}" class="mt-1 w-full bg-gray-900/60 border border-white/10 rounded-lg px-2.5 py-2 text-sm text-white outline-none focus:border-violet-500" placeholder="e.g. SUV">
          </div>
        </div>
      </div>

      <div data-role="fields" class="grid md:grid-cols-2 gap-3">
        ${activeFields(item).map((f) => renderField(idx, f, missingKeys.has(f.key))).join('')}
      </div>

      <button data-role="add-field" data-index="${idx}" class="mt-3 inline-flex items-center gap-2 text-violet-300 hover:text-white border border-violet-500/30 hover:border-violet-500/60 rounded-xl px-4 py-2 text-xs font-bold transition">
        <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add field
      </button>

      ${renderMedia(idx)}

      ${renderActionBar()}
    </div>`;
}

function renderField(idx, f, invalid) {
  const key = escapeHtml(f.key);
  const isOptioned = f.type === 'select' || f.type === 'multiselect';
  return `
    <div class="rounded-xl border ${invalid ? 'border-amber-500/40 bg-amber-500/5' : 'border-white/10 bg-white/[.02]'} p-3" data-field-card data-item="${idx}" data-key="${key}">
      <div class="flex flex-wrap items-center gap-2 mb-2">
        <input data-role="label" data-item="${idx}" data-key="${key}" value="${escapeHtml(f.label)}" class="flex-1 min-w-[7rem] bg-transparent border-b border-white/10 focus:border-violet-500 outline-none text-sm font-bold text-white py-0.5">
        <select data-role="type" data-item="${idx}" data-key="${key}" class="bg-gray-900 border border-white/10 rounded-lg text-[11px] text-gray-300 px-2 py-1 outline-none">
          ${FIELD_TYPES.map((t) => `<option value="${t.type}" ${t.type === f.type ? 'selected' : ''}>${t.label}</option>`).join('')}
        </select>
        <label class="flex items-center gap-1 text-[11px] text-gray-400 select-none"><input type="checkbox" data-role="required" data-item="${idx}" data-key="${key}" ${f.required ? 'checked' : ''}> req</label>
        <button data-role="remove" data-item="${idx}" data-key="${key}" class="text-gray-500 hover:text-red-400 p-1" title="Remove field"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
      </div>
      ${renderControl(idx, f)}
      ${isOptioned ? `
        <div class="mt-2">
          <label class="text-[10px] uppercase tracking-wider text-gray-500">Options (comma separated)</label>
          <input data-role="options" data-item="${idx}" data-key="${key}" value="${escapeHtml(f.options.join(', '))}" class="mt-1 w-full bg-gray-900/60 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-gray-200 outline-none focus:border-violet-500">
        </div>` : ''}
      ${f.help ? `<p class="text-[10px] text-gray-500 mt-1.5">${escapeHtml(f.help)}</p>` : ''}
    </div>`;
}

function renderControl(idx, f) {
  const key = escapeHtml(f.key);
  const base = 'data-role="value" data-item="' + idx + '" data-key="' + key + '" data-kind="' + escapeHtml(f.type) + '"';
  const cls = 'input-field w-full bg-gray-900/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-violet-500';
  const v = f.value;

  if (f.type === 'textarea') {
    return `<textarea ${base} rows="4" class="${cls}" placeholder="Describe the item…">${escapeHtml(v)}</textarea>`;
  }
  if (f.type === 'select') {
    return `<select ${base} class="${cls}">
      <option value="">— choose —</option>
      ${f.options.map((o) => `<option value="${escapeHtml(o)}" ${String(v) === o ? 'selected' : ''}>${escapeHtml(o)}</option>`).join('')}
    </select>`;
  }
  if (f.type === 'multiselect') {
    const displayed = Array.isArray(v) ? v.join(', ') : String(v || '');
    return `<input ${base} data-csv="1" class="${cls}" value="${escapeHtml(displayed)}" placeholder="${escapeHtml(f.options.join(', '))}">`;
  }
  if (f.type === 'boolean') {
    return `<label class="flex items-center gap-2 text-sm text-gray-200"><input type="checkbox" ${base} ${v ? 'checked' : ''} class="w-4 h-4 accent-violet-500"> Yes</label>`;
  }
  if (f.type === 'price') {
    return `<div class="relative"><span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span><input ${base} type="number" step="any" inputmode="decimal" class="${cls} !pl-7" value="${escapeHtml(v)}" placeholder="0.00"></div>`;
  }
  const inputType = ({ number: 'number', date: 'date', url: 'url', email: 'email', phone: 'tel' })[f.type] || 'text';
  const step = f.type === 'number' ? 'step="any" inputmode="decimal"' : '';
  return `<input ${base} type="${inputType}" ${step} class="${cls}" value="${escapeHtml(v)}" placeholder="${escapeHtml(f.placeholder || '')}">`;
}

function renderMedia(idx) {
  const frames = state.frames;
  const selectedCount = frames.filter((f) => f.selected).length;
  return `
    <div class="mt-5 rounded-xl border border-white/10 bg-white/[.02] p-4">
      <div class="flex items-center justify-between mb-2">
        <h4 class="text-white font-bold text-sm flex items-center gap-2"><i data-lucide="images" class="w-4 h-4 text-fuchsia-400"></i> Product photos &amp; video</h4>
        <span class="text-[10px] text-gray-500 uppercase tracking-wider">${selectedCount} frame${selectedCount === 1 ? '' : 's'} selected</span>
      </div>
      ${state.phase === 'extracting' ? `<p class="text-xs text-gray-400 flex items-center gap-2"><i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i> Extracting frames from the video…</p>` : ''}

      ${state.existingImages.length ? `
        <p class="text-[10px] uppercase tracking-wider text-gray-500 mt-1 mb-2">Saved photos</p>
        <div class="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
          ${state.existingImages.map((u, i) => `
            <div class="relative aspect-square rounded-lg overflow-hidden border border-white/10 group">
              <img src="${escapeHtml(u)}" class="w-full h-full object-cover" loading="lazy" alt="">
              <button data-role="remove-image" data-index="${i}" class="absolute top-1 right-1 bg-black/70 hover:bg-red-600 text-white rounded-full p-1" title="Remove"><i data-lucide="x" class="w-3 h-3"></i></button>
            </div>`).join('')}
        </div>` : ''}

      ${frames.length ? `
        <p class="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Frames from this video — tap to include/exclude</p>
        <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
          ${frames.map((f, i) => `
            <button data-role="frame-toggle" data-index="${i}" class="relative aspect-square rounded-lg overflow-hidden border-2 transition ${f.selected ? 'border-violet-500 ring-2 ring-violet-500/30' : 'border-white/10 opacity-70 hover:opacity-100'}">
              <img src="${f.url}" class="w-full h-full object-cover" loading="lazy" alt="">
              <span class="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] font-mono px-1 py-0.5 text-center">${fmtTime(f.atMs)}</span>
              ${f.selected ? `<span class="absolute top-1 right-1 bg-violet-600 text-white rounded-full p-0.5"><i data-lucide="check" class="w-3 h-3"></i></span>` : ''}
            </button>`).join('')}
        </div>` : (!state.existingImages.length && state.phase !== 'extracting' ? `<p class="text-xs text-gray-500">No product photos yet. Frames are captured automatically from the uploaded video.</p>` : '')}

      ${state.file ? `
        <label class="mt-3 flex items-center gap-2 text-xs text-gray-300 select-none">
          <input type="checkbox" data-role="include-video" ${state.includeVideo ? 'checked' : ''} class="w-4 h-4 accent-violet-500">
          Also publish the source video (${fmtBytes(state.file.size)})${state.file.size > 60 * 1024 * 1024 ? ' — large, may take a while' : ''}
        </label>` : ''}
    </div>`;
}

function renderActionBar() {
  const busy = state.busy;
  return `
    <div class="mt-5 flex flex-col sm:flex-row gap-2 sm:items-center">
      <button data-role="save-draft" class="flex-1 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold py-3 px-5 rounded-xl text-sm btn-press ${busy ? 'opacity-50 pointer-events-none' : ''}">
        <i data-lucide="${busy && state.phase === 'saving' ? 'loader-2' : 'save'}" class="${busy && state.phase === 'saving' ? 'animate-spin ' : ''}w-4 h-4"></i> ${busy && state.phase === 'saving' ? 'Saving…' : 'Save Draft'}
      </button>
      <button data-role="preview" class="flex-1 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold py-3 px-5 rounded-xl text-sm btn-press ${busy ? 'opacity-50 pointer-events-none' : ''}">
        <i data-lucide="eye" class="w-4 h-4"></i> Preview
      </button>
      <button data-role="publish" class="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black py-3 px-5 rounded-xl text-sm btn-press ${busy ? 'opacity-50 pointer-events-none' : ''}">
        <i data-lucide="${busy && state.phase === 'publishing' ? 'loader-2' : 'rocket'}" class="${busy && state.phase === 'publishing' ? 'animate-spin ' : ''}w-4 h-4"></i> ${busy && state.phase === 'publishing' ? 'Publishing…' : 'Publish'}
      </button>
    </div>`;
}

// ---- Drafts -----------------------------------------------------------------

function renderDrafts() {
  if (!state.drafts.length) return '';
  return `
    <div class="glass rounded-2xl border border-violet-500/15 p-5 fade-in" id="drafts-panel">
      <h3 class="text-white font-bold text-sm flex items-center gap-2 mb-4"><i data-lucide="archive" class="w-4 h-4 text-violet-400"></i> Saved Drafts <span class="text-gray-500 font-normal">(${state.drafts.length})</span></h3>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        ${state.drafts.map((d) => {
          const img = Array.isArray(d.images) && d.images[0] ? d.images[0] : '';
          return `
          <button data-role="open-draft" data-pid="${escapeHtml(d.property_id)}" class="text-left rounded-xl border border-white/10 bg-white/[.02] hover:bg-white/[.06] transition overflow-hidden">
            <div class="h-28 bg-black/40 flex items-center justify-center overflow-hidden">
              ${img ? `<img src="${escapeHtml(img)}" class="w-full h-full object-cover" loading="lazy" alt="">` : `<i data-lucide="image" class="w-6 h-6 text-gray-600"></i>`}
            </div>
            <div class="p-3">
              <p class="text-sm font-bold text-white truncate">${escapeHtml(d.title || 'Untitled draft')}</p>
              <p class="text-[11px] text-gray-400 mt-0.5">${escapeHtml(d.category || 'Uncategorised')} • ${fmtMoney(d.price, d.currency)}</p>
              <span class="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-violet-300 uppercase tracking-wider"><i data-lucide="pencil" class="w-3 h-3"></i> Open &amp; edit</span>
            </div>
          </button>`;
        }).join('')}
      </div>
    </div>`;
}

// ---- Upload / scan ----------------------------------------------------------

async function uploadWithProgress(file) {
  const name = String(file.name || 'clip.mp4').slice(0, 120);
  const safeName = name.replace(/[^\w.\-]+/g, '_');
  const path = `scans/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;
  const fnUrl = `${SUPABASE_URL.replace(/\/+$/, '')}/functions/v1/video-scanner`;
  const { data: { session } } = await supabase.auth.getSession();
  const authToken = session?.access_token || '';

  const uploadToken = await safeFetch(fnUrl, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'upload_token', path, content_type: file.type || 'video/mp4' }),
  });

  await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', uploadToken.url, true);
    xhr.setRequestHeader('Content-Type', file.type || 'video/mp4');
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && e.total) {
        state.progress = 15 + Math.round((e.loaded / e.total) * 75);
        renderProgressOnly();
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        state.progress = 90; state.stageText = 'Video uploaded. Asking the AI…'; renderProgressOnly(); resolve();
      } else reject(new Error(`Upload failed (HTTP ${xhr.status}).`));
    };
    xhr.onerror = () => reject(new Error('Upload failed — check your connection.'));
    xhr.onabort = () => reject(new Error('Upload aborted.'));
    xhr.send(file);
  });
  return path;
}

function renderProgressOnly() {
  const holder = $('prog-holder');
  if (holder) holder.innerHTML = progressBar();
  const stage = $('stage-text');
  if (stage) stage.textContent = state.stageText;
}

async function safeFetch(url, options) {
  let res;
  try { res = await fetch(url, options); }
  catch { throw new Error('Could not reach the scanner service. Check your connection.'); }
  let data = {};
  try { data = await res.json(); } catch {}
  if (!res.ok || data.error) throw new Error(data.error || `Request failed (${res.status}).`);
  return data;
}

async function handleScan() {
  if (!state.file || isBusy()) return;
  state.error = null;
  state.notice = null;
  state.busy = true;
  state.result = null;
  state.items = [];
  state.itemIds = [];
  state.draftId = null;
  state.existingImages = [];
  state.sourceVideoUrl = null;
  state.publishedLinks = [];
  setPhase('uploading', { progress: 5, stageText: 'Preparing upload…' });

  let path = null;
  try {
    path = await uploadWithProgress(state.file);
    setPhase('scanning', { progress: 92, stageText: 'AI is watching the video…' });

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

    const result = data.result || { status: 'cannot_determine', items: [] };
    state.result = result;

    let items = normalizeItems(result, { fallbackLabel: result.label });
    if (!result.items || result.items.length === 0) {
      items = [defaultItem(result.label)];
      state.notice = 'The AI could not identify specific details, so a blank starter form was created. Fill it in manually.';
    }
    state.items = items;
    state.itemIds = items.map(() => null);
    state.activeItemIndex = 0;

    // Make sure we have frames to offer as product photos.
    if (state.objectUrl && !state.frames.length && state.framesFor !== state.objectUrl) {
      setPhase('extracting', { stageText: 'Extracting video frames…' });
      try { state.frames = await captureFrames(state.objectUrl); } catch { state.frames = []; }
    }
    state.busy = false;
    setPhase('review', { progress: 100, stageText: 'Done' });
    showToast(result.status === 'ok' ? 'Form generated and pre-filled from the video.' : 'Analysis complete — please review the form.');
  } catch (err) {
    state.busy = false;
    state.error = err.message;
    setPhase(state.file ? 'ready' : 'idle', { error: err.message });
    showToast(err.message);
    if (path) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        await fetch(`${SUPABASE_URL.replace(/\/+$/, '')}/functions/v1/video-scanner`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${session?.access_token || ''}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'cleanup', path }),
        });
      } catch {}
    }
  }
}

function defaultItem(label) {
  const mk = (o) => blankField(o.key);
  const fields = [
    Object.assign(blankField('title'), { label: 'Title', type: 'text', required: true, value: label || '' }),
    Object.assign(blankField('brand'), { label: 'Brand', type: 'text' }),
    Object.assign(blankField('color'), { label: 'Colour', type: 'text' }),
    Object.assign(blankField('condition'), { label: 'Condition', type: 'select', required: true, options: ['New', 'Refurbished', 'Used - Like New', 'Used - Good', 'Used - Fair'] }),
    Object.assign(blankField('price'), { label: 'Price', type: 'price', required: true }),
    Object.assign(blankField('description'), { label: 'Description', type: 'textarea' }),
  ];
  return {
    id: 'item-1', title: label || '', listing_type: 'product', category: '', subcategory: '',
    description: '', features: [], highlights: [], seo_keywords: [], image_hints: [], fields,
  };
}

function setPhase(phase, patches = {}) {
  Object.assign(state, { phase, ...patches });
  render();
}

// ---- Frame capture ----------------------------------------------------------

function fmtTime(ms) {
  const s = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

function seekTo(video, t) {
  return new Promise((resolve) => {
    const done = () => { video.removeEventListener('seeked', done); resolve(); };
    video.addEventListener('seeked', done);
    video.currentTime = Math.min(t, Math.max(0, (video.duration || t) - 0.05));
    setTimeout(done, 2500);
  });
}

async function captureFrames(objectUrl, count = MAX_FRAMES) {
  const video = document.createElement('video');
  video.src = objectUrl;
  video.muted = true;
  video.playsInline = true;
  video.preload = 'auto';
  await new Promise((resolve, reject) => {
    video.onloadedmetadata = () => resolve();
    video.onerror = () => reject(new Error('Could not read the video for frames.'));
    setTimeout(() => resolve(), 5000);
  });
  const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;
  const canvas = document.createElement('canvas');
  const frames = [];
  const n = count;
  for (let i = 0; i < n; i++) {
    const t = duration > 0 ? duration * ((i + 0.5) / n) : 0;
    if (duration > 0) await seekTo(video, t);
    const w = video.videoWidth || 640;
    const h = video.videoHeight || 360;
    canvas.width = w; canvas.height = h;
    canvas.getContext('2d').drawImage(video, 0, 0, w, h);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.82));
    if (blob) frames.push({ atMs: Math.round(t * 1000), blob, url: URL.createObjectURL(blob), selected: i < 4, uploadedUrl: null });
  }
  video.removeAttribute('src');
  try { video.load(); } catch {}
  return frames;
}

// ---- Media preparation ------------------------------------------------------

async function prepareMedia(item) {
  const urls = [];
  for (const u of state.existingImages) if (u) urls.push(u);
  for (const f of state.frames) {
    if (!f.selected) continue;
    if (!f.uploadedUrl) {
      f.uploadedUrl = await uploadProductImage(f.blob);
      if (!f.uploadedUrl) showToast('A frame could not be uploaded and was skipped.');
    }
    if (f.uploadedUrl) urls.push(f.uploadedUrl);
  }
  let videoUrl = state.sourceVideoUrl || null;
  if (state.includeVideo && state.file && !videoUrl) {
    videoUrl = await uploadProductVideo(state.file);
    if (videoUrl) state.sourceVideoUrl = videoUrl;
    else showToast('The source video could not be uploaded; continuing without it.');
  }
  return { images: [...new Set(urls)], videoUrl };
}

function ensureItemIds(count) {
  for (let i = 0; i < count; i++) {
    if (!state.itemIds[i]) {
      if (i === 0 && state.draftId) state.itemIds[i] = state.draftId;
      else state.itemIds[i] = genPropertyId();
    }
  }
}

// ---- Save / publish ---------------------------------------------------------

function validateAll({ requirePrice }) {
  const allErrors = [];
  state.items.forEach((item, i) => {
    const { errors } = validateItem(item, { requirePrice });
    errors.forEach((e) => allErrors.push({ item: i, ...e }));
  });
  return allErrors;
}

async function persist({ publish }) {
  if (state.busy) return;
  if (!state.items.length) return;
  const errors = validateAll({ requirePrice: publish });
  if (publish && errors.length) {
    render();
    showToast(`Please fill: ${[...new Set(errors.map((e) => e.key))].join(', ')}`);
    return;
  }
  state.busy = true;
  state.error = null;
  state.notice = null;
  setPhase(publish ? 'publishing' : 'saving', { stageText: publish ? 'Publishing…' : 'Saving draft…' });

  try {
    ensureItemIds(state.items.length);
    const media = await prepareMedia();
    const results = [];
    let anyDropped = [];

    for (let i = 0; i < state.items.length; i++) {
      const item = state.items[i];
      const values = {};
      for (const f of activeFields(item)) values[f.key] = f.value;
      const payload = buildListingPayload(item, values, {
        propertyId: state.itemIds[i],
        images: media.images,
        videoUrl: media.videoUrl,
        isActive: publish,
        isFeatured: false,
        approvalStatus: publish ? 'published' : 'draft',
        report: state.result,
        currency: 'USD',
        extra: publish ? { published_at: new Date().toISOString() } : {},
      });
      const { error, dropped } = await safePublishShowroom(payload);
      if (error) throw error;
      anyDropped = anyDropped.concat(dropped || []);
      results.push(payload.property_id);
    }

    state.draftId = results[0] || state.draftId;
    state.itemIds = results.slice();
    state.busy = false;
    if (anyDropped.length) {
      state.notice = `Saved, but the database is missing the column(s): ${[...new Set(anyDropped)].join(', ')}. Apply the latest migration so the generated form structure is stored.`;
    }
    await refreshDrafts();
    setPhase('review', { stageText: 'Saved', notice: state.notice });

    if (publish) {
      state.publishedLinks = results.map((pid) => ({ pid, url: productUrl(pid) }));
      showToast(`Published ${results.length} listing${results.length > 1 ? 's' : ''} — live now.`);
      render();
    } else {
      state.publishedLinks = [];
      showToast(`Draft saved${results.length > 1 ? ` (${results.length})` : ''}. You can reopen it from Saved Drafts.`);
      render();
    }
  } catch (err) {
    state.busy = false;
    const msg = describeWriteError(err, publish ? 'Publish' : 'Draft save');
    state.error = msg;
    setPhase('review', { error: msg });
    showToast(msg);
  }
}

// ---- Preview ----------------------------------------------------------------

function closePreview() {
  const el = $('scanner-preview-overlay');
  if (el) el.remove();
}

function openPreview() {
  const item = targetItem(state.activeItemIndex);
  if (!item) return;
  const values = {};
  for (const f of activeFields(item)) values[f.key] = f.value;
  const title = values.title || item.title || 'Untitled listing';
  const priceField = findField(item, 'price');
  const price = priceField ? priceField.value : '';
  const desc = values.description || item.description || '';
  const images = [...state.existingImages, ...state.frames.filter((f) => f.selected).map((f) => f.url)];
  const specs = activeFields(item).filter((f) => f.key !== 'title' && f.key !== 'price' && f.key !== 'description' && String(f.value || '').trim() !== '');

  closePreview();
  const overlay = document.createElement('div');
  overlay.id = 'scanner-preview-overlay';
  overlay.className = 'fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm overflow-y-auto p-4 sm:p-8';
  overlay.innerHTML = `
    <div class="max-w-4xl mx-auto bg-[#0b1120] border border-white/10 rounded-2xl overflow-hidden">
      <div class="sticky top-0 z-10 flex items-center justify-between gap-3 bg-[#0b1120]/95 border-b border-white/10 px-5 py-3">
        <span class="inline-flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider"><i data-lucide="eye" class="w-4 h-4"></i> Buyer preview</span>
        <button data-role="close-preview" class="text-gray-300 hover:text-white text-sm font-semibold"><i data-lucide="x" class="inline w-4 h-4"></i> Close</button>
      </div>
      <div class="p-5 sm:p-8">
        <div class="grid md:grid-cols-2 gap-6">
          <div class="rounded-2xl overflow-hidden bg-black/40 min-h-[14rem] flex items-center justify-center">
            ${images[0] ? `<img src="${escapeHtml(images[0])}" class="w-full h-full object-cover" alt="">` : `<span class="text-gray-600 text-sm">No photos yet</span>`}
          </div>
          <div>
            <p class="text-[11px] font-bold uppercase tracking-widest text-violet-400">${escapeHtml(item.category || 'Uncategorised')}${item.subcategory ? ` · ${escapeHtml(item.subcategory)}` : ''}</p>
            <h1 class="text-2xl font-black text-white mt-1">${escapeHtml(title)}</h1>
            <p class="text-3xl font-black text-emerald-400 mt-2">${(price === '' || price == null) ? '<span class="text-gray-500 text-base">Price on request</span>' : fmtMoney(price)}</p>
            <p class="text-sm text-gray-300 mt-4 whitespace-pre-line">${escapeHtml(desc)}</p>
            ${item.features?.length ? `<div class="mt-4"><p class="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Features</p><ul class="list-disc list-inside text-sm text-gray-300 space-y-0.5">${item.features.map((f) => `<li>${escapeHtml(f)}</li>`).join('')}</ul></div>` : ''}
          </div>
        </div>
        ${images.length > 1 ? `<div class="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-5">${images.slice(1).map((u) => `<div class="aspect-square rounded-lg overflow-hidden border border-white/10"><img src="${escapeHtml(u)}" class="w-full h-full object-cover" alt=""></div>`).join('')}</div>` : ''}
        ${specs.length ? `
          <div class="mt-6">
            <p class="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Specifications</p>
            <div class="grid sm:grid-cols-2 gap-2">
              ${specs.map((f) => `<div class="flex justify-between gap-2 text-sm border-b border-white/5 py-1.5"><span class="text-gray-400">${escapeHtml(f.label)}</span><span class="text-white font-semibold text-right">${escapeHtml(f.value)}</span></div>`).join('')}
            </div>
          </div>` : ''}
        ${item.highlights?.length ? `<div class="mt-5 flex flex-wrap gap-2">${item.highlights.map((h) => `<span class="text-xs bg-violet-500/15 border border-violet-500/25 text-violet-200 rounded-full px-3 py-1">${escapeHtml(h)}</span>`).join('')}</div>` : ''}
        <p class="text-[11px] text-gray-600 mt-6">This is a live preview of the exact content that will be published.</p>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  reloadIcons();
}

// ---- Drafts -----------------------------------------------------------------

async function refreshDrafts() {
  try { state.drafts = await listDrafts(); } catch { state.drafts = []; }
}

async function openDraft(pid) {
  if (!pid) return;
  setPhase('extracting', { stageText: 'Opening draft…' });
  const row = await getListing(pid);
  if (!row) {
    showToast('Could not load that draft.');
    setPhase('review');
    return;
  }
  const item = row.ai_form_schema
    ? itemFromSchema(row.ai_form_schema, row)
    : itemFromSchema(null, {
      title: row.title, description: row.description, listing_type: row.listing_type,
      category: row.category, subcategory: row.subcategory,
      fields: buildFieldsFromRow(row),
    });
  // hydrate values from the real row for the known fields
  for (const f of item.fields) {
    if (row[f.key] != null && row[f.key] !== '' && !['images', 'video_url'].includes(f.key)) {
      f.value = Array.isArray(row[f.key]) ? row[f.key].join(', ') : row[f.key];
    }
    if (row.specifications && typeof row.specifications === 'object' && row.specifications[f.key] != null) {
      f.value = Array.isArray(row.specifications[f.key]) ? row.specifications[f.key].join(', ') : row.specifications[f.key];
    }
  }
  state.items = [item];
  state.itemIds = [pid];
  state.draftId = pid;
  state.result = row.ai_video_scan || null;
  state.existingImages = Array.isArray(row.images) ? row.images.filter((u) => typeof u === 'string' && !/^data:video|\.mp4|\.mov|\.webm/i.test(u)) : [];
  state.sourceVideoUrl = row.video_url || null;
  state.frames = [];
  state.framesFor = null;
  state.error = null;
  state.publishedLinks = [];
  state.notice = 'Draft loaded — make your changes, then Save Draft or Publish.';
  state.busy = false;
  setPhase('review');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function buildFieldsFromRow(row) {
  const fields = [
    { key: 'title', label: 'Title', type: 'text', required: true, value: row.title || '' },
    { key: 'price', label: 'Price', type: 'price', required: true, value: row.price || '' },
    { key: 'brand', label: 'Brand', type: 'text', value: row.brand || '' },
    { key: 'color', label: 'Colour', type: 'text', value: row.color || '' },
    { key: 'condition', label: 'Condition', type: 'select', options: ['New', 'Refurbished', 'Used - Like New', 'Used - Good', 'Used - Fair'], value: row.condition || '' },
    { key: 'description', label: 'Description', type: 'textarea', value: row.description || '' },
  ];
  return fields;
}

// ---- Events -----------------------------------------------------------------

function handleFieldChange(el, role) {
  const idx = Number(el.dataset.item);
  const item = state.items[idx];
  if (!item) return;
  const key = el.dataset.key;

  if (role === 'label') { const f = findField(item, key); if (f) f.label = el.value; return; }
  if (role === 'required') { const f = findField(item, key); if (f) f.required = el.checked; return; }
  if (role === 'options') { const f = findField(item, key); if (f) f.options = el.value.split(',').map((s) => s.trim()).filter(Boolean); return; }
  if (role === 'type') {
    const f = findField(item, key);
    if (f) {
      f.type = el.value;
      if ((f.type === 'select' || f.type === 'multiselect') && (!f.options || f.options.length === 0)) f.options = ['Option 1', 'Option 2'];
      if (f.type !== 'multiselect' && Array.isArray(f.value)) f.value = f.value.join(', ');
      if (f.type === 'multiselect') f.value = Array.isArray(f.value) ? f.value : String(f.value || '').split(',').map((s) => s.trim()).filter(Boolean);
    }
    render(); return;
  }
  if (role === 'value') {
    const f = findField(item, key);
    if (!f) return;
    if (f.type === 'multiselect' || el.dataset.csv === '1') f.value = el.value.split(',').map((s) => s.trim()).filter(Boolean);
    else if (f.type === 'boolean') f.value = el.checked;
    else f.value = el.value;
    if (f.key === 'title') item.title = el.value;
    if (f.key === 'description') item.description = el.value;
    return;
  }
}

function onClick(e) {
  const t = e.target.closest('[data-role]');
  if (!t) return;
  const role = t.dataset.role;
  const idx = Number(t.dataset.index);

  if (role === 'scan') { e.preventDefault(); handleScan(); return; }
  if (role === 'clear') { e.preventDefault(); resetScan(); return; }
  if (role === 'add-field') {
    const item = state.items[idx];
    if (!item) return;
    item.fields.push(blankField(''));
    render();
    return;
  }
  if (role === 'remove') {
    const item = state.items[idx];
    const f = findField(item, t.dataset.key);
    if (f && f.key === 'title') { showToast('The title field cannot be removed.'); return; }
    if (f) { f.removed = true; render(); }
    return;
  }
  if (role === 'item-tab') { state.activeItemIndex = idx; render(); return; }
  if (role === 'frame-toggle') {
    const f = state.frames[idx];
    if (f) { f.selected = !f.selected; render(); }
    return;
  }
  if (role === 'remove-image') {
    state.existingImages.splice(idx, 1);
    render();
    return;
  }
  if (role === 'include-video') return;
  if (role === 'save-draft') { e.preventDefault(); persist({ publish: false }); return; }
  if (role === 'publish') { e.preventDefault(); persist({ publish: true }); return; }
  if (role === 'preview') { e.preventDefault(); openPreview(); return; }
  if (role === 'close-preview') { e.preventDefault(); closePreview(); return; }
  if (role === 'open-draft') { e.preventDefault(); openDraft(t.dataset.pid); return; }
}

function onChange(e) {
  const el = e.target.closest('[data-role]');
  if (!el) return;
  const role = el.dataset.role;
  if (['item-listing-type', 'item-category', 'item-subcategory'].includes(role)) {
    const item = state.items[Number(el.dataset.index)];
    if (!item) return;
    if (role === 'item-listing-type') item.listing_type = el.value;
    if (role === 'item-category') item.category = el.value;
    if (role === 'item-subcategory') item.subcategory = el.value;
    return;
  }
  if (role === 'include-video') { state.includeVideo = el.checked; return; }
  if (['label', 'value', 'required', 'options', 'type'].includes(role)) handleFieldChange(el, role);
}

function onInput(e) {
  const el = e.target.closest('[data-role]');
  if (!el) return;
  const role = el.dataset.role;
  if (role === 'scan-question') { state.question = el.value; return; }
  if (['label', 'value', 'options'].includes(role)) handleFieldChange(el, role);
}

function onFileChange(e) {
  const f = e.target.files?.[0];
  if (f) attachFile(f);
}

function bindUI() {
  const root = $('admin-root');
  if (!root || root._scannerBound) return;
  root._scannerBound = true;

  root.addEventListener('click', onClick);
  root.addEventListener('change', onChange);
  root.addEventListener('input', onInput);
  root.addEventListener('change', (e) => {
    if (e.target && e.target.id === 'file-input') onFileChange(e);
  });
  ['dragenter', 'dragover'].forEach((ev) => root.addEventListener(ev, (e) => {
    if (e.target.closest && e.target.closest('#drop-zone')) e.preventDefault();
  }));
  root.addEventListener('drop', (e) => {
    if (!e.target.closest || !e.target.closest('#drop-zone')) return;
    e.preventDefault();
    const f = e.dataTransfer?.files?.[0];
    if (f) attachFile(f);
  });
  // Preview overlay close
  document.addEventListener('click', (e) => {
    if (e.target.closest && e.target.closest('[data-role="close-preview"]')) { e.preventDefault(); closePreview(); }
    const ov = $('scanner-preview-overlay');
    if (ov && e.target === ov) closePreview();
  });
}

function attachFile(file) {
  if (!file || isBusy()) return;
  if (!isVideoFile(file)) { showToast('Please choose a video file (MP4, MOV or WebM).'); return; }
  if (file.size > MAX_BYTES) { showToast(`Video is too large (${fmtBytes(file.size)}). Max is 180 MB.`); return; }
  if (state.objectUrl) URL.revokeObjectURL(state.objectUrl);
  for (const f of state.frames) { try { URL.revokeObjectURL(f.url); } catch {} }
  state.file = file;
  state.objectUrl = URL.createObjectURL(file);
  state.frames = [];
  state.framesFor = null;
  state.phase = 'ready';
  state.error = null;
  state.result = null;
  state.items = [];
  state.draftId = null;
  state.existingImages = [];
  state.sourceVideoUrl = null;
  state.includeVideo = file.size < 40 * 1024 * 1024;
  render();

  // Capture frames in the background so they are ready for the review step.
  const url = state.objectUrl;
  captureFrames(url).then((frames) => {
    if (state.objectUrl !== url) return; // file changed meanwhile
    state.frames = frames;
    state.framesFor = url;
    if (state.phase === 'review') render();
  }).catch(() => {});
}

function resetScan() {
  if (state.objectUrl) URL.revokeObjectURL(state.objectUrl);
  for (const f of state.frames) { try { URL.revokeObjectURL(f.url); } catch {} }
  Object.assign(state, {
    file: null, objectUrl: null, phase: 'idle', progress: 0, stageText: '', result: null,
    items: [], activeItemIndex: 0, itemIds: [], error: null, notice: null, frames: [],
    framesFor: null, existingImages: [], includeVideo: false, sourceVideoUrl: null, draftId: null,
  });
  render();
}

// ---- Access denied ----------------------------------------------------------

function renderAccessDenied(title, message) {
  const root = $('admin-root');
  if (!root) return;
  root.innerHTML = `
    <div class="flex items-center justify-center py-20">
      <div class="text-center max-w-md">
        <div class="w-14 h-14 mx-auto bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mb-4">
          <i data-lucide="shield-alert" class="w-7 h-7 text-red-400"></i>
        </div>
        <h2 class="text-white font-black text-xl mb-2">${escapeHtml(title)}</h2>
        <p class="text-gray-400 text-sm mb-6">${escapeHtml(message)}</p>
        <a href="/auth.html?redirect=/admin-video-scanner.html" class="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold py-2.5 px-5 rounded-xl text-sm btn-press">Sign In</a>
      </div>
    </div>`;
  reloadIcons();
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
  bindUI();
  try { await refreshDrafts(); } catch {}
  render();
}

init();
