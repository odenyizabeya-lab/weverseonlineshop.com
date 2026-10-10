// showroom-video-keepalive.js
// Keep showroom videos playing: muted, looping, autoplaying — but ONLY the
// ones the user can actually see. 186+ autoplaying clips at once would stall
// low-end phones, so playback is gated to the viewport (plus a small buffer):
//   • a video scrolling into view starts,
//   • a video scrolling far out of view pauses and frees memory/CPU,
//   • re-rendered / pre-rendered cards get the same treatment automatically.
// The user-controlled video-tour modal keeps its native controls so the owner
// can still pause/scrub it.
const SELECTOR = '.showroom-card video, [data-showroom-grid] video, .kco-video-section video, .kco-video-el, .kco-hero-media video';
const IGNORED = '#video-tour-modal video';

function isWatched(el) {
  return !!(el && el.matches && el.matches(SELECTOR) && (!IGNORED || !el.closest(IGNORED)));
}

// Buffer around the viewport so a card just off-screen is already playing by
// the time it's needed (and the reverse: it stays playing a beat after it
// leaves, avoiding stop/start flicker on a scroll).
const MARGIN_PX = 600;

// Video elements become 'watched' when they enter the viewport buffer; they
// are un-watched (and paused) when they leave it.
function startVideo(video) {
  if (!isWatched(video)) return;
  video.setAttribute('muted', '');
  video.setAttribute('loop', '');
  video.setAttribute('autoplay', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.autoplay = true;
  if (video.ended) {
    try { video.currentTime = 0; } catch { /* noop */ }
  }
  if (video.paused) {
    video.play().catch(() => {});
  }
}

function stopVideo(video) {
  // Leave the attributes intact (muted/loop/autoplay) so coming back into view
  // restarts cleanly; just release the decode pipeline while it's hidden.
  if (!video.paused) {
    try { video.pause(); } catch { /* noop */ }
  }
}

// Every video element in the DOM gets exactly one observer registration; the
// observer decides play/pause from real viewport visibility. Live visibility
// is also tracked per element so the 'ended' handler below can restart a
// finished clip only while it is actually on screen.
const weakSet = typeof WeakSet !== 'undefined' ? new WeakSet() : null;
const inView = (typeof WeakMap !== 'undefined') ? new WeakMap() : null;

let observer = null;
function ensureObserver() {
  if (observer || typeof IntersectionObserver === 'undefined') return;
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const v = entry.target;
      if (!isWatched(v)) continue;
      if (entry.isIntersecting) {
        if (inView) inView.set(v, true);
        startVideo(v);
      } else {
        if (inView) inView.set(v, false);
        stopVideo(v);
      }
    }
  }, { rootMargin: `${MARGIN_PX}px 0px ${MARGIN_PX}px 0px` });
}

function register(video) {
  if (!isWatched(video)) return;
  ensureObserver();
  if (!observer) {
    // No IntersectionObserver (very old browser): fall back to always-on like
    // the original behavior so videos still play.
    startVideo(video);
    return;
  }
  if (weakSet && weakSet.has(video)) return;
  if (weakSet) weakSet.add(video);
  observer.observe(video);
}

function scan(root) {
  if (!root || !root.querySelectorAll) return;
  root.querySelectorAll(SELECTOR).forEach(register);
}

// If a watched video ever reports 'ended' (e.g. loop briefly failed on a
// re-rendered card), roll it back and resume playing — but only if it is
// currently on screen.
document.addEventListener('ended', (e) => {
  const t = e.target;
  if (t && t.tagName === 'VIDEO' && isWatched(t) && observer) {
    const visible = inView ? inView.get(t) : true;
    if (visible !== false) {
      try { t.currentTime = 0; } catch { /* noop */ }
      t.play().catch(() => {});
    }
  }
}, true);

// Cards and hero sections are re-rendered lazily after DB loads — watch for
// new videos and gate them the moment they appear.
const mo = ('MutationObserver' in window) ? new MutationObserver((muts) => {
  for (const m of muts) {
    for (const node of m.addedNodes) {
      if (!node || node.nodeType !== 1) continue;
      if (node.matches && isWatched(node)) register(node);
      if (node.querySelectorAll) node.querySelectorAll(SELECTOR).forEach(register);
    }
  }
}) : null;

function init() {
  if (typeof IntersectionObserver === 'undefined') {
    // Old-browser fallback: keep the old always-on behavior.
    const oldScan = () => { scan(document); setTimeout(oldScan, 2000); };
    oldScan();
    return;
  }
  scan(document);
  if (mo && document.body) mo.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();