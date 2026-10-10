// Renders every page of a PDF document into compressed JPEG data URLs so the
// document can be read in full (not just the first page).
// pdf.js is imported lazily so it is code-split out of the main bundle and
// only downloaded when a PDF is actually opened.
let _pdfjsPromise = null;
async function getPdfjs() {
  if (!_pdfjsPromise) {
    _pdfjsPromise = import('pdfjs-dist').then((pdfjs) => {
      try {
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          'pdfjs-dist/build/pdf.worker.min.mjs',
          import.meta.url,
        ).toString();
      } catch { /* main-thread fallback still works */ }
      return pdfjs;
    });
  }
  return _pdfjsPromise;
}

// Convert one canvas to a compact JPEG data URL.
function canvasToDataUrl(canvas, quality) {
  return canvas.toDataURL('image/jpeg', quality);
}

async function renderPage(page, maxDim) {
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = Math.min(3, Math.max(0.5, maxDim / Math.max(baseViewport.width, baseViewport.height)));
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(viewport.width));
  canvas.height = Math.max(1, Math.round(viewport.height));
  const ctx = canvas.getContext('2d', { alpha: false });
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, viewport }).promise;
  // Text-dense pages need more pixels than photos to stay readable, while
  // staying small enough for batched AI requests.
  return canvasToDataUrl(canvas, 0.78);
}

// Render EVERY page of the PDF at `url` (a http(s) URL or blob/data URL).
// Returns an array of data URLs, one per page, in page order.
export async function pdfToPageDataUrls(url, { maxDim = 1300, maxPages = 0, onProgress = () => {} } = {}) {
  const pdfjs = await getPdfjs();
  const doc = await pdfjs.getDocument({
    url,
    useSystemFonts: true,
    isEvalSupported: false,
  }).promise;
  const total = doc.numPages;
  const pageCount = maxPages > 0 ? Math.min(total, maxPages) : total;
  const pages = [];
  try {
    for (let n = 1; n <= pageCount; n++) {
      onProgress(n, pageCount);
      const page = await doc.getPage(n);
      pages.push(await renderPage(page, maxDim));
    }
  } finally {
    try { await doc.destroy(); } catch { /* ignore */ }
  }
  return pages;
}

export function looksLikePdf(urlOrPath) {
  const s = String(urlOrPath || '').toLowerCase();
  return s.endsWith('.pdf') || s.includes('.pdf?') || s.includes('.pdf#');
}
