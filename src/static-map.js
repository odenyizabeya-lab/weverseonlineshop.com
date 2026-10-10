// Lightweight, dependency-free static map renderer for property cards and small
// previews. Draws OpenStreetMap raster tiles onto a <canvas> (no API key, no
// dead third-party static-map service). Exports a single function + a tiny
// helper that turns any element holding data-lat/data-lng into a rendered map.
export function renderStaticMap(canvas, lat, lng, opts = {}) {
  if (!canvas || !Number.isFinite(lat) || !Number.isFinite(lng)) return;
  const width = opts.width || canvas.width || 600;
  const height = opts.height || canvas.height || 160;
  const zoom = Math.max(3, Math.min(18, opts.zoom || 13));
  if (window.devicePixelRatio && opts.highDpi !== false) {
    canvas.width = width * 2;
    canvas.height = height * 2;
  } else {
    canvas.width = width;
    canvas.height = height;
  }
  const ctx = canvas.getContext('2d');
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  if (window.devicePixelRatio && opts.highDpi !== false) ctx.scale(2, 2);
  ctx.fillStyle = '#e5e7eb';
  ctx.fillRect(0, 0, width, height);

  const tileSize = 256;
  const maxTile = Math.pow(2, zoom);
  const worldPx = tileSize * maxTile;
  const latRad = lat * Math.PI / 180;
  const centerX = (lng + 180) / 360 * worldPx;
  const centerY = (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * worldPx;

  const x0 = Math.floor((centerX - width / 2) / tileSize);
  const y0 = Math.floor((centerY - height / 2) / tileSize);
  const x1 = Math.floor((centerX + width / 2) / tileSize);
  const y1 = Math.floor((centerY + height / 2) / tileSize);

  let pending = 0;
  const drawPin = () => {
    const px = width / 2;
    const py = height / 2;
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,.4)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 2;
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(px, py, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(px, py, 3.5, 0, Math.PI * 2);
    ctx.fill();
  };

  for (let tx = x0; tx <= x1; tx++) {
    for (let ty = y0; ty <= y1; ty++) {
      if (ty < 0 || ty >= maxTile) continue;
      const nx = ((tx % maxTile) + maxTile) % maxTile;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.decoding = 'async';
      img.src = `https://tile.openstreetmap.org/${zoom}/${nx}/${ty}.png`;
      const dx = Math.round(tx * tileSize - (centerX - width / 2));
      const dy = Math.round(ty * tileSize - (centerY - height / 2));
      pending++;
      img.onload = () => {
        try { ctx.drawImage(img, dx, dy, tileSize, tileSize); } catch {}
        pending--;
        if (pending === 0) drawPin();
      };
      img.onerror = () => {
        pending--;
        if (pending === 0) drawPin();
      };
    }
  }
  if (pending === 0) drawPin();
}

export function renderStaticMapsIn(container) {
  if (!container) return;
  container.querySelectorAll('[data-static-map]').forEach((el) => {
    const lat = parseFloat(el.dataset.lat);
    const lng = parseFloat(el.dataset.lng);
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      renderStaticMap(el, lat, lng, { width: el.clientWidth || 600, height: el.clientHeight || 160, zoom: 13 });
    }
  });
}

// Render every map canvas inside a card once it is actually visible (so we do
// not fetch tiles for cards that are never shown). Falls back to immediate
// rendering when IntersectionObserver is unavailable.
export function renderCardMaps(card) {
  const canvases = card.querySelectorAll('[data-static-map]');
  if (!canvases.length) return;
  const draw = (el) => {
    const lat = parseFloat(el.dataset.lat);
    const lng = parseFloat(el.dataset.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
    renderStaticMap(el, lat, lng, { width: el.clientWidth || 600, height: el.clientHeight || 160, zoom: 13 });
  };
  const io = ('IntersectionObserver' in window)
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { draw(e.target); io.unobserve(e.target); }
        });
      }, { rootMargin: '200px' })
    : null;
  canvases.forEach((el) => {
    if (io) io.observe(el);
    else draw(el);
  });
}