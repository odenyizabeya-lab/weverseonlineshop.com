// ═══════════════════════════════════════════════════════════════════════════
// video-advertisement.js — Home page Video Advertisement card.
//
// Mounted right below the hero banner. The owner uploads their own video (and
// optional poster image) and writes their own title, subtitle and button from
// the admin "Content Settings" panel. The card plays the video muted/autoplay
// with play-pause and a progress bar; a "Shop Now" button is shown when set.
// Nothing here is fabricated and nothing in the showroom is touched.
// ═══════════════════════════════════════════════════════════════════════════

import { loadSiteContent, DEFAULT_SITE_CONTENT } from './site-content.js';

const MOUNT = () => document.getElementById('video-advertisement');

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function placeholderHtml(title) {
  return `
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
      <div class="absolute inset-0 opacity-20" style="background-image:radial-gradient(#38bdf8 1px, transparent 1px);background-size:24px 24px"></div>
      <div class="relative flex items-center justify-center gap-3 py-10 sm:py-12 px-6 text-center">
        <span class="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20">
          <svg viewBox="0 0 24 24" class="w-6 h-6 text-sky-300" fill="none"><path d="M6 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 6 4.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
        </span>
        <div class="text-left">
          <p class="text-sm font-black tracking-wide">${esc(title || 'Video Advertisement')}</p>
          <p class="text-[11px] text-slate-400 mt-0.5">Add your video from Content Settings in the admin.</p>
        </div>
      </div>
    </div>`;
}

function buildHtml(c) {
  const videoUrl = (c.video_ad_video_url || '').trim();
  const poster = (c.video_ad_poster_url || '').trim();
  const title = (c.video_ad_title || 'Weverse Online Shop').trim();
  const subtitle = (c.video_ad_subtitle || '').trim();
  const buttonText = (c.video_ad_button_text || '').trim();
  const buttonLink = (c.video_ad_button_link || '/#showroom-directory').trim();
  const overlay = `
      <div class="absolute inset-x-0 top-0 z-10 flex items-end justify-between p-4 sm:p-6 bg-gradient-to-b from-black/70 via-black/25 to-transparent">
        <div class="min-w-0 pr-4">
          <span class="inline-block text-[10px] font-black uppercase tracking-widest text-sky-300 mb-1">Video Ad</span>
          <h3 class="text-white font-black text-lg sm:text-xl leading-tight truncate">${esc(title)}</h3>
          ${subtitle ? `<p class="text-white/85 text-xs sm:text-sm mt-0.5 line-clamp-2">${esc(subtitle)}</p>` : ''}
        </div>
        ${buttonText ? `<a href="${esc(buttonLink)}" class="shrink-0 inline-flex items-center gap-1.5 bg-white text-gray-900 text-xs font-black px-4 py-2 rounded-full hover:gap-2.5 transition-all shadow-lg">${esc(buttonText)} <svg viewBox="0 0 24 24" class="w-3.5 h-3.5" fill="none"><path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></a>` : ''}
      </div>`;
  const controls = `
      <div class="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
        <div class="flex items-center gap-3">
          <button id="vad-play" type="button" aria-label="Play / Pause" class="shrink-0 w-9 h-9 rounded-full bg-white/95 text-gray-900 flex items-center justify-center transition active:scale-95">
            <svg id="vad-pause-icon" viewBox="0 0 24 24" class="w-4 h-4 hidden" fill="currentColor"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>
            <svg id="vad-play-icon" viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M7 4.8v14.4a.8.8 0 0 0 1.22.68l11.4-7.2a.8.8 0 0 0 0-1.36L8.22 4.12A.8.8 0 0 0 7 4.8Z"/></svg>
          </button>
          <div class="flex-1 h-1.5 rounded-full bg-white/25 overflow-hidden cursor-pointer" id="vad-track">
            <div id="vad-progress" class="h-full bg-sky-400 rounded-full" style="width:0%"></div>
          </div>
          <span id="vad-time" class="text-white/80 text-[11px] font-bold tabular-nums">0:00 / 0:00</span>
        </div>
      </div>`;
  return `
    <div class="relative overflow-hidden rounded-2xl bg-black shadow-xl shadow-black/20" id="vad-card">
      <video id="vad-video" class="w-full aspect-[16/7] sm:aspect-[21/8] max-h-[480px] object-cover" muted loop playsinline webkit-playsinline preload="metadata"${poster ? ` poster="${esc(poster)}"` : ''}>
        <source src="${esc(videoUrl)}" type="video/mp4">
      </video>
      ${overlay}
      ${controls}
    </div>`;
}

function fmtTime(s) {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, '0')}`;
}

function wireControls() {
  const card = document.getElementById('vad-card');
  if (!card) return;
  const video = document.getElementById('vad-video');
  const playBtn = document.getElementById('vad-play');
  const playIcon = document.getElementById('vad-play-icon');
  const pauseIcon = document.getElementById('vad-pause-icon');
  const track = document.getElementById('vad-track');
  const progress = document.getElementById('vad-progress');
  const timeEl = document.getElementById('vad-time');
  if (!video || !playBtn || !track) return;

  let userPaused = false;
  const updateIcons = () => {
    if (playIcon) playIcon.classList.toggle('hidden', !video.paused);
    if (pauseIcon) pauseIcon.classList.toggle('hidden', video.paused);
  };
  const onMeta = () => {
    if (timeEl) timeEl.textContent = `${fmtTime(video.currentTime)} / ${fmtTime(video.duration)}`;
    if (progress) progress.style.width = `${video.duration ? (video.currentTime / video.duration) * 100 : 0}%`;
  };
  video.addEventListener('loadedmetadata', onMeta);
  video.addEventListener('timeupdate', onMeta);
  video.addEventListener('play', updateIcons);
  video.addEventListener('pause', updateIcons);
  video.addEventListener('ended', () => { video.currentTime = 0; video.play().catch(() => {}); });

  playBtn.addEventListener('click', () => {
    if (video.paused) { userPaused = false; video.play().catch(() => {}); }
    else { userPaused = true; video.pause(); }
  });
  track.addEventListener('click', (e) => {
    const rect = track.getBoundingClientRect();
    if (!video.duration) return;
    const ratio = (e.clientX - rect.left) / rect.width;
    video.currentTime = ratio * video.duration;
    if (video.paused && !userPaused) video.play().catch(() => {});
  });

  const tryAutoplay = () => { video.play().catch(() => { /* autoplay blocked — user taps play */ }); };
  if (document.readyState === 'complete') tryAutoplay();
  else window.addEventListener('load', tryAutoplay, { once: true });
}

async function render() {
  const mount = MOUNT();
  if (!mount) return;
  let content = {};
  try { content = await loadSiteContent(); } catch { /* keep defaults */ }
  const c = { ...DEFAULT_SITE_CONTENT, ...(content || {}) };

  if (c.video_ad_enabled === false) { mount.innerHTML = ''; return; }
  const videoUrl = (c.video_ad_video_url || '').trim();
  if (!videoUrl) {
    mount.innerHTML = placeholderHtml(c.video_ad_title);
    return;
  }
  mount.innerHTML = buildHtml(c);
  wireControls();
  if (window.lucide) { try { lucide.createIcons(); } catch { /* ignore */ } }
  window.dispatchEvent(new CustomEvent('video-advertisement-ready'));
}

function init() {
  render().catch(() => {});
  window.addEventListener('site-content-updated', () => { render().catch(() => {}); });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();