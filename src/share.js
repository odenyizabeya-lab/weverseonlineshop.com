// share.js — Share sheet for showroom products and the website link.
// Opens a bottom sheet with TikTok, WhatsApp, Facebook, X, Copy Link and More.
// Every share always carries the product's EXACT image, name, price and URL.

const SITE_NAME = 'Weverse Online Shop';
// Featured brand image (W10000 — first property). Used as the OG preview for
// the website link (baked into index.html by prerender-home.mjs and mirrored
// here so the share sheet shows the same image).
const HOMEPAGE_OG_IMAGE = 'https://weverseonlineshop.com/brand-logo.jpeg';

export function absUrl(src) {
  if (!src) return '';
  if (/^(https?:|data:)/i.test(src)) return src;
  return (window.location.origin || '') + src;
}

// True for blob/data/temp or video-file URLs that must never be used as the
// share-card thumbnail — the preview needs the product's real, permanent media.
function isPermanentMedia(src) {
  if (!src || typeof src !== 'string') return false;
  if (src.startsWith('blob:') || src.startsWith('data:')) return false;
  return true;
}

// Best permanent share media: the first real persisted video (never a
// temp/blob). Falls back to a persisted image, then the first listed item.
function mainShareImage(listing) {
  const imgs = Array.isArray(listing?.images) ? listing.images : [];
  const permanent = imgs.find(isPermanentMedia);
  return permanent || imgs[0] || '';
}

// Permanent product video (mp4 and similar). Used to emit og:video so
// WhatsApp/Facebook/Telegram can offer a playable card for video products.
function mainShareVideo(listing) {
  const candidates = [];
  if (listing?.video_url) candidates.push(listing.video_url);
  if (listing?.video) candidates.push(listing.video);
  if (Array.isArray(listing?.images)) candidates.push(...listing.images);
  return candidates.find((u) => typeof u === 'string' && /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(u)) || '';
}

export function formatSharePrice(listing) {
  const raw = listing?.price;
  const n = Number(raw && typeof raw === 'object' ? raw.price : raw) || 0;
  const cur = listing?.currency || 'USD';
  let s;
  try {
    s = n.toLocaleString('en-US', { style: 'currency', currency: cur, maximumFractionDigits: 0 });
  } catch {
    s = '$' + n.toLocaleString('en-US');
  }
  if (listing?.price_period) s += '/' + listing.price_period;
  return s;
}

function productUrl(listing) {
  const id = listing?.property_id || listing?.id;
  return `${window.location.origin}/product/${encodeURIComponent(id)}`;
}

function productMeta(listing) {
  const title = String(listing?.title || '').trim() || SITE_NAME;
  const price = formatSharePrice(listing);
  const url = productUrl(listing);
  const image = absUrl(mainShareImage(listing) || '');
  const video = absUrl(mainShareVideo(listing) || '');
  const text = price ? `${title} — ${price}` : title;
  const caption = price ? `${title}\n${price}\n${url}` : `${title}\n${url}`;
  return { title, price, url, image, video, text, caption, _listing: listing };
}

// ── Native media file sharing ─────────────────────────────
// The share button on mobile posts a LINK, which Facebook shows as a small
// card (and usually ignores video). To share a product exactly like a normal
// image/video post — big and at original size — we download the REAL permanent
// file (image or mp4) and pass it to the OS share sheet via the Web Share API,
// so picking the Facebook app posts a native, full-size media post.

function fileNameFromUrl(url, fallbackExt) {
  try {
    const base = new URL(url).pathname.split('/').pop();
    return base && base.includes('.') ? base : `product.${fallbackExt}`;
  } catch {
    return `product.${fallbackExt}`;
  }
}

// The real media file to share: prefer the playable video (mp4) for video
// products, otherwise the permanent main photo. Never temp/blob/video placeholders.
function primaryMediaSource(listing) {
  const video = mainShareVideo(listing);
  if (video) return absUrl(video);
  const img = mainShareImage(listing);
  if (img) return absUrl(img);
  return '';
}

function guessMime(url) {
  if (/\.(mp4|m4v)(\?|#|$)/i.test(url)) return 'video/mp4';
  if (/\.webm(\?|#|$)/i.test(url)) return 'video/webm';
  if (/\.png(\?|#|$)/i.test(url)) return 'image/png';
  if (/\.webp(\?|#|$)/i.test(url)) return 'image/webp';
  if (/\.(jpe?g)(\?|#|$)/i.test(url)) return 'image/jpeg';
  return '';
}

async function fetchAsFile(url) {
  const res = await fetch(url, { mode: 'cors', credentials: 'omit', redirect: 'follow' });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const blob = await res.blob();
  const type = blob.type || guessMime(url) || 'application/octet-stream';
  const isVideo = /^video\//.test(type) || /\.(mp4|webm|m4v)/i.test(url);
  const name = fileNameFromUrl(url, isVideo ? 'mp4' : 'jpg');
  const file = new File([blob], name, { type });
  return { file, isVideo, type };
}

// Shares a product's real media file natively (native Facebook/WhatsApp/etc. post).
// Returns true if the OS share went through, false if it fell back to a link.
async function shareMediaFile(listing, fallback) {
  const src = primaryMediaSource(listing);
  if (!src || typeof navigator.share !== 'function') { fallback(); return false; }
  let file = null;
  try {
    const f = await fetchAsFile(src);
    file = f.file;
  } catch {
    fallback(); return false;
  }
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      const meta = productMeta(listing);
      // The product link MUST always travel with the shared image/video. We put
      // the full caption (title + price + LINK) in BOTH `text` and `title` so the
      // URL is never dropped — even if a platform ignores one of those fields.
      const payload = {
        files: [file],
        title: meta.caption, // title is always kept alongside files → link survives
        text: meta.caption,  // normal caption with the link
        url: meta.url,
      };
      await navigator.share(payload);
      return true;
    }
  } catch (err) {
    if (err && err.name === 'AbortError') return true; // user cancelled
    // some apps/desktop throw because files aren't accepted — fall back to link
  }
  fallback();
  return false;
}

function showShareToast(msg) {
  let toast = document.getElementById('share-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'share-toast';
    toast.className = 'fixed bottom-24 left-1/2 z-[400] bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xl transition-all duration-300 pointer-events-none whitespace-nowrap';
    toast.style.opacity = '0';
    toast.style.transform = 'translate(-50%, 10px)';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translate(-50%, 0)';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translate(-50%, 10px)';
  }, 2600);
}

function fallbackCopy(text, done) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand('copy');
    ta.remove();
    done();
  } catch {
    done();
  }
}

function copyText(text) {
  return new Promise((resolve) => {
    const done = () => resolve(true);
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
      fallbackCopy(text, done);
    }
  });
}

function openWindow(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

const ICONS = {
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C22 6.45 17.5 2 12.04 2zm5.8 14.32c-.25.7-1.44 1.35-2 1.4-.52.05-1.19.24-3.97-.83-3.33-1.31-5.45-4.7-5.61-4.92-.16-.22-1.34-1.79-1.34-3.41 0-1.62.85-2.41 1.15-2.74.3-.33.65-.41.87-.41.22 0 .43 0 .62.01.2.01.46-.07.72.55.27.63.92 2.16 1 2.31.08.15.13.33.03.53-.1.2-.15.32-.3.5-.15.18-.32.4-.45.53-.15.15-.31.31-.13.61.18.3.79 1.31 1.7 2.12 1.17 1.04 2.15 1.36 2.46 1.51.31.15.49.13.67-.08.18-.2.77-.9.98-1.21.2-.31.41-.25.69-.15.28.1 1.79.84 2.1 1 .31.15.51.23.58.35.08.13.08.73-.17 1.42z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07z"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.9 2.9 0 0 1-2.89 2.62 2.9 2.9 0 0 1-2.9-2.9 2.9 2.9 0 0 1 3.53-2.84V9.94a6.35 6.35 0 0 0-3.53 1.06 6.36 6.36 0 0 0-2.9 5.37 6.36 6.36 0 0 0 6.35 6.36c3.5 0 6.36-2.86 6.36-6.36V7.87a8.24 8.24 0 0 0 4.77 1.52V6.26a4.83 4.83 0 0 1-.5.03 4.87 4.87 0 0 1-1.12.4z"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  more: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7"><circle cx="12" cy="12" r="2.2"/><circle cx="5" cy="12" r="2.2"/><circle cx="19" cy="12" r="2.2"/></svg>',
};

const PLATFORMS = [
  { key: 'whatsapp', label: 'WhatsApp', color: '#25D366', icon: ICONS.whatsapp },
  { key: 'facebook', label: 'Facebook', color: '#1877F2', icon: ICONS.facebook },
  { key: 'x', label: 'X', color: '#000000', icon: ICONS.x },
  { key: 'tiktok', label: 'TikTok', color: '#111111', icon: ICONS.tiktok },
  { key: 'copy', label: 'Copy Link', color: '#64748B', icon: ICONS.link },
  { key: 'more', label: 'More', color: '#334155', icon: ICONS.more },
];

function platformBtn(p) {
  return `<button type="button" class="group flex flex-col items-center gap-2" data-share-action="${p.key}">
    <span class="w-14 h-14 rounded-2xl flex items-center justify-center text-white transition group-active:scale-95 shadow-md" style="background:${p.color}">${p.icon}</span>
    <span class="text-xs font-semibold text-gray-700">${p.label}</span>
  </button>`;
}

function buildSheet() {
  const root = document.createElement('div');
  root.id = 'share-sheet';
  root.className = 'fixed inset-0 z-[350] hidden';
  root.innerHTML = `
    <style>
      @keyframes share-sheet-up{from{transform:translateY(100%)}to{transform:translateY(0)}}
      #share-sheet .animate-share-sheet{animation:share-sheet-up .28s cubic-bezier(.2,.8,.2,1)}
      #share-sheet .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
    </style>
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" data-share-close></div>
    <div class="absolute bottom-0 left-0 right-0 max-w-lg mx-auto bg-white rounded-t-3xl shadow-2xl overflow-hidden animate-share-sheet">
      <div class="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100">
        <h3 class="text-base font-black text-gray-900 tracking-tight">Share</h3>
        <button type="button" data-share-close class="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-5 h-5"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="p-5 space-y-5">
        <div class="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-3">
          <div id="share-product-media" class="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shrink-0 bg-gray-100 flex items-center justify-center"></div>
          <div class="min-w-0">
            <div id="share-product-title" class="text-sm font-bold text-gray-900 leading-snug line-clamp-2"></div>
            <div id="share-product-price" class="mt-1 text-sm font-black text-blue-600"></div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-x-4 gap-y-5" id="share-platforms"></div>
        <p class="text-[11px] text-gray-400 text-center leading-relaxed">Shares this exact product with its image, name, price and link.</p>
      </div>
    </div>`;
  document.body.appendChild(root);
  return root;
}

function closeSheet() {
  const sheet = document.getElementById('share-sheet');
  if (sheet) sheet.classList.add('hidden');
  document.body.style.overflow = '';
}

function openSheet(meta) {
  let sheet = document.getElementById('share-sheet');
  if (!sheet) sheet = buildSheet();
  sheet.querySelector('#share-product-title').textContent = meta.title;
  sheet.querySelector('#share-product-price').textContent = meta.price || '';
  const mediaEl = sheet.querySelector('#share-product-media');
  const src = meta.video || ((meta.image && /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(meta.image.split('?')[0])) ? meta.image : '');
  if (src) {
    mediaEl.innerHTML = `<video src="${src}" muted playsinline preload="metadata" class="w-full h-full object-cover"></video>`;
  } else {
    mediaEl.innerHTML = `<i data-lucide="video-off" class="w-7 h-7 text-gray-300"></i>`;
  }
  sheet.querySelector('#share-platforms').innerHTML = PLATFORMS.map(platformBtn).join('');
  sheet.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  sheet.querySelectorAll('[data-share-close]').forEach((el) => el.addEventListener('click', closeSheet));
  sheet.querySelectorAll('[data-share-action]').forEach((btn) =>
    btn.addEventListener('click', () => {
      closeSheet();
      runAction(btn.dataset.shareAction, meta);
    })
  );
}

async function runAction(action, meta) {
  switch (action) {
    case 'whatsapp':
      // Native media first: sharing the actual image/video posts it big and at
      // original size (like a normal WhatsApp photo/video). Otherwise fall back
      // to a text message with the link.
      await shareMediaFile(meta._listing, () =>
        openWindow(`https://api.whatsapp.com/send?text=${encodeURIComponent(meta.caption)}`));
      break;
    case 'facebook':
      // Native media first: the real image/video file posts as a full-size
      // native Facebook post (exactly like uploading a normal photo/video).
      // Otherwise fall back to the link-share card.
      await shareMediaFile(meta._listing, () =>
        openWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(meta.url)}&quote=${encodeURIComponent(meta.text)}`));
      break;
    case 'x':
      openWindow(`https://twitter.com/intent/tweet?text=${encodeURIComponent(meta.text)}&url=${encodeURIComponent(meta.url)}`);
      break;
    case 'tiktok':
      if (navigator.share) {
        try { await navigator.share({ title: meta.title, text: meta.caption, url: meta.url }); } catch {}
      } else {
        await copyText(meta.caption);
        showShareToast('TikTok caption copied — paste to share');
      }
      break;
    case 'copy':
      await copyText(meta.url);
      showShareToast('Link copied to clipboard');
      break;
    case 'more':
      if (navigator.share) {
        try { await navigator.share({ title: meta.title, text: meta.text, url: meta.url }); } catch {}
      } else {
        await copyText(meta.url);
        showShareToast('Link copied to clipboard');
      }
      break;
  }
}

// ── Public API ─────────────────────────────────────────────────

export function openShareSheet(listing) {
  if (!listing) return;
  openSheet(productMeta(listing));
}

export function openWebsiteShareSheet() {
  const url = window.location.origin;
  openSheet({
    title: SITE_NAME,
    price: '',
    url,
    image: absUrl(HOMEPAGE_OG_IMAGE),
    text: `Check out ${SITE_NAME} — a trusted global marketplace for premium products with worldwide delivery.`,
    caption: `${SITE_NAME} — premium products, secure payments, worldwide delivery.\n${url}`,
  });
}

// Keeps the live document head in sync with the shown product so any link
// shared from this page previews with the exact product image, name and price.
export function setProductMeta(listing) {
  if (!listing) return;
  const meta = productMeta(listing);
  const desc = `${meta.title}${meta.price ? ` — ${meta.price}` : ''} — available at ${SITE_NAME}.`;
  const setMeta = (attr, key, content) => {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };
  setMeta('property', 'og:title', meta.title);
  setMeta('property', 'og:description', desc);
  const ogImage = meta.image && !/\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(meta.image.split('?')[0]) ? meta.image : '';
  if (ogImage) {
    // Recommended preview dimensions so Facebook, WhatsApp, Instagram, TikTok and
    // others render a large, properly balanced card from the original photo.
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:image:secure_url', ogImage);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:type', 'image/jpeg');
  }
  setMeta('property', 'og:url', meta.url);
  setMeta('property', 'og:type', 'product');
  if (meta.video) {
    setMeta('property', 'og:video', meta.video);
    setMeta('property', 'og:video:secure_url', meta.video);
    setMeta('property', 'og:video:type', 'video/mp4');
  }
  setMeta('name', 'twitter:title', meta.title);
  setMeta('name', 'twitter:description', desc);
  if (ogImage) setMeta('name', 'twitter:image', ogImage);
  document.title = `${meta.title} | ${SITE_NAME}`;
}

export function shareProduct(listing) {
  openShareSheet(listing);
}

if (typeof window !== 'undefined') {
  window.openShareSheet = openShareSheet;
  window.openWebsiteShareSheet = openWebsiteShareSheet;
  window.shareProduct = shareProduct;
}