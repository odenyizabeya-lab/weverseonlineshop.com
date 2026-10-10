// api/seo-audit.js — Automatic SEO management dashboard (serverless).
//
//   GET  /seo-audit                       → full dashboard (HTML)
//   GET  /seo-audit?id=<id>               → single-product audit + actions (HTML)
//   GET  /seo-audit?format=json           → machine-readable aggregate (JSON)
//   POST /seo-audit  { action:'recheck',  id } → live re-audit of one product (HTML)
//   POST /seo-audit  { action:'regenerate', id } → rebuild real-data SEO fields (HTML)
//
// Regenerate persistence is SAFE:
//   • Only real-data improvements are written (derived title when empty,
//     whitespace/HTML-normalized description, real-data keywords when empty,
//     location filled from city/state/country when empty).
//   • Writes go through the existing admin-gated publish_showroom_upsert RPC,
//     so nothing is ever written unless the caller sends a valid admin JWT.
//
// No fake data is ever generated: a missing description is reported as an
// error that needs the owner, never invented.

import { fetchCatalog, auditCatalog, auditListing, buildImprovements, renderedTitle, renderedMetaDescription, listingTitle, locationOf, priceNum, availabilityInfo, rowId, SITE_URL, SITE_NAME } from '../shared/seo-audit.mjs';
import { escXml } from '../shared/seo-builders.mjs';
import { MAIN_URL, MAIN_ANON_KEY } from '../shared/supabase-env.mjs';

let cache = { at: 0, report: null };

const PAGE_SIZE = 40;

// ── Small HTTP helper for image liveness (deep checks only) ─────────────
const headTimeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function isLiveImage(url) {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 4000);
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: ctrl.signal, headers: { 'user-agent': 'WeverseSEO-audit/1.0' } });
    clearTimeout(t);
    return res.ok || res.status === 304 ? 'ok' : `http_${res.status}`;
  } catch {
    return 'unreachable';
  }
}

async function withDeepImageCheck(audit) {
  const hero = audit.images?.[0];
  if (!hero) {
    audit.deep = { checked: true, heroImage: null, status: 'no_image' };
  } else {
    const status = await isLiveImage(hero);
    audit.deep = { checked: true, heroImage: hero, status };
    // Fold result into the checklist so the dashboard shows it.
    const existing = audit.checklist.find((c) => c.id === 'image_live');
    if (existing) existing.status = status === 'ok' ? 'ok' : 'error';
    else audit.checklist.push({ id: 'image_live', label: 'Hero image live check', status: status === 'ok' ? 'ok' : 'error', message: status === 'ok' ? 'Hero image responds with HTTP 200.' : `Hero image check failed: ${status}.`, fix: status === 'ok' ? 'No action needed.' : 'Re-upload or repair the broken image URL in the admin.' });
  }
  return audit;
}

async function getOrBuildReport(opts = {}) {
  const now = Date.now();
  if (!opts.force && cache.report && now - cache.at < 120000) return cache.report;
  const listings = await fetchCatalog();
  const report = await auditCatalog(listings, { deep: false });
  cache = { at: now, report };
  return report;
}

function esc(t) {
  if (t == null) return '';
  return String(t)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function money(n) {
  if (n == null || Number.isNaN(Number(n))) return '—';
  return '$' + Number(n).toLocaleString('en-US');
}

const STATUS_META = {
  ready: { label: 'Ready', cls: 's-ok' },
  attention: { label: 'Needs attention', cls: 's-warn' },
  error: { label: 'Has errors', cls: 's-err' },
};
function badge(status) {
  const m = STATUS_META[status] || STATUS_META.error;
  return `<span class="badge ${m.cls}">${m.label}</span>`;
}
function scoreRing(score) {
  const color = score >= 90 ? '#10b981' : score >= 70 ? '#f59e0b' : '#ef4444';
  return `<span class="pill" style="color:${color};border-color:${color}55;background:${color}11">${score}</span>`;
}
function checkIcon(status) {
  return status === 'ok' ? '<span class="ci ok" title="Pass">✓</span>'
    : status === 'warn' ? '<span class="ci warn" title="Warning">!</span>'
      : '<span class="ci err" title="Error">✕</span>';
}

// ── Page shell ──────────────────────────────────────────────────────────
function shell(body, opts = {}) {
  const title = opts.title || 'SEO Audit | Weverse Online Shop';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex,nofollow">
<title>${esc(title)}</title>
<style>
  :root{--bg:#0b1120;--card:#111a2e;--card2:#0f1730;--line:#1e2a45;--ink:#e2e8f0;--muted:#8494b2;--blue:#3b82f6;--green:#10b981;--amber:#f59e0b;--red:#ef4444}
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:var(--bg);color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;line-height:1.5;-webkit-font-smoothing:antialiased}
  .wrap{max-width:1440px;margin:0 auto;padding:0 20px}
  header{background:#0d1424;border-bottom:1px solid var(--line);position:sticky;top:0;z-index:20;backdrop-filter:blur(12px)}
  .hbar{display:flex;align-items:center;gap:14px;height:64px;flex-wrap:wrap}
  .logo{font-weight:900;font-size:18px;color:#fff;text-decoration:none}
  .logo span{color:var(--blue)}
  .sub{font-size:11px;color:var(--muted);font-weight:600}
  .ml-auto{margin-left:auto}
  a.btn{display:inline-flex;align-items:center;gap:6px;text-decoration:none;font-size:12px;font-weight:800;padding:8px 14px;border-radius:10px;border:1px solid var(--line);color:var(--ink);background:var(--card)}
  a.btn:hover{border-color:var(--blue);color:#fff}
  a.btn.primary{background:#2563eb;border-color:#2563eb;color:#fff}
  main{padding:26px 0 60px}
  h1{font-size:24px;font-weight:900;letter-spacing:-.01em}
  .lead{color:var(--muted);font-size:13px;max-width:900px;margin-top:6px}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:14px;margin-top:22px}
  .card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:18px}
  .card h3{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-bottom:8px}
  .big{font-size:30px;font-weight:900;line-height:1}
  .num{color:#fff}
  .ok{color:var(--green)} .warn{color:var(--amber)} .err{color:var(--red)}
  .tone{font-size:12px;color:var(--muted);margin-top:4px}
  .row{display:flex;gap:14px;flex-wrap:wrap;align-items:center}
  h2{font-size:17px;font-weight:900;margin:30px 0 10px}
  .filters{display:flex;gap:8px;flex-wrap:wrap;margin:14px 0}
  a.chip{font-size:12px;font-weight:800;padding:7px 13px;border-radius:999px;border:1px solid var(--line);color:var(--muted);text-decoration:none;background:var(--card)}
  a.chip.on{background:#2563eb;border-color:#2563eb;color:#fff}
  a.chip:hover{color:#fff}
  table{width:100%;border-collapse:collapse;background:var(--card);border:1px solid var(--line);border-radius:16px;overflow:hidden}
  th{background:var(--card2);color:var(--muted);font-size:10.5px;text-transform:uppercase;letter-spacing:.06em;text-align:left;padding:11px 12px;border-bottom:1px solid var(--line);white-space:nowrap}
  td{padding:11px 12px;font-size:12.5px;border-bottom:1px solid #16203a;vertical-align:middle}
  tr:last-child td{border-bottom:none}
  tr:hover td{background:#131d36}
  .pill{display:inline-flex;min-width:34px;justify-content:center;font-weight:900;font-size:12px;padding:3px 8px;border-radius:999px;border:1px solid var(--line)}
  .badge{display:inline-flex;font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;padding:4px 10px;border-radius:999px;border:1px solid}
  .s-ok{color:#34d399;border-color:#34d39944;background:#34d39911}
  .s-warn{color:#fbbf24;border-color:#fbbf2444;background:#fbbf2411}
  .s-err{color:#f87171;border-color:#f8717144;background:#f8717111}
  .muted{color:var(--muted)}
  .actions{display:flex;gap:6px}
  .actions button, .actions a{font-size:11px;font-weight:800;padding:6px 10px;border-radius:8px;border:1px solid var(--line);background:var(--card2);color:var(--ink);text-decoration:none;cursor:pointer;display:inline-flex;align-items:center;gap:5px;white-space:nowrap}
  .actions button:hover, .actions a:hover{border-color:var(--blue);color:#fff}
  .actions .danger:hover{border-color:var(--red);color:#fca5a5}
  .pager{display:flex;gap:8px;align-items:center;margin-top:16px;flex-wrap:wrap}
  .pager a{font-size:12px;font-weight:800;padding:6px 12px;border-radius:8px;border:1px solid var(--line);color:var(--muted);text-decoration:none;background:var(--card)}
  .pager a.on{background:#2563eb;color:#fff;border-color:#2563eb}
  .checklist{background:var(--card);border:1px solid var(--line);border-radius:16px;overflow:hidden}
  .chk-row{display:flex;gap:12px;padding:12px 16px;border-bottom:1px solid #16203a;align-items:flex-start}
  .chk-row:last-child{border-bottom:none}
  .ci{flex-shrink:0;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:12px}
  .ci.ok{background:#10b98122;color:#34d399;border:1px solid #10b98144}
  .ci.warn{background:#f59e0b22;color:#fbbf24;border:1px solid #f59e0b44}
  .ci.err{background:#ef444422;color:#f87171;border:1px solid #ef444444}
  .chk-title{font-size:12.5px;font-weight:800}
  .chk-msg{font-size:12.5px;color:#cbd5e1;margin-top:2px}
  .chk-fix{font-size:12px;color:var(--muted);margin-top:4px}
  .chk-fix b{color:#93c5fd;font-weight:700}
  .dupe-pair{font-size:12px;padding:8px 14px;border-left:3px solid var(--amber);background:#f59e0b0d;margin-bottom:8px;border-radius:0 10px 10px 0}
  .proposal{background:#10b9810a;border:1px solid #10b98133;border-radius:14px;padding:16px}
  .proposal .lbl{font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)}
  .proposal .val{font-size:13px;margin-top:3px}
  code{background:#0b1120;border:1px solid var(--line);padding:1px 6px;border-radius:6px;font-size:11.5px}
  .note{background:#f59e0b0a;border:1px solid #f59e0b33;color:#fcd34d;border-radius:12px;padding:12px 14px;font-size:12.5px;margin:12px 0}
  .note.green{background:#10b9810a;border-color:#10b98133;color:#a7f3d0}
  .sitemapbox{font-size:12.5px}
  .sitemapbox a{color:#93c5fd;text-decoration:none}
  .sitemapbox a:hover{text-decoration:underline}
  label.search{display:flex;gap:8px;align-items:center;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:7px 12px;max-width:340px}
  label.search input{background:transparent;border:none;outline:none;color:var(--ink);font-size:13px;width:100%}
  footer{border-top:1px solid var(--line);padding:20px 0;color:var(--muted);font-size:12px}
  @media(max-width:720px){h1{font-size:19px}.big{font-size:24px}table{display:block;overflow-x:auto}}
</style>
</head>
<body>
<header><div class="wrap hbar">
  <a class="logo" href="/seo-audit">SEO <span>Audit</span></a>
  <span class="sub">Weverse Online Shop — automatic validation of every product page</span>
  <div class="ml-auto row">
    <a class="btn" href="/seo-audit?format=json" target="_blank">JSON report</a>
    <a class="btn" href="/sitemap.xml" target="_blank">Sitemap</a>
    <a class="btn" href="/admin.html" target="_blank">Admin</a>
    <a class="btn primary" href="/" target="_blank">View store</a>
  </div>
</div></header>
<main class="wrap">${body}
</main>
<footer><div class="wrap">SEO Audit engine — validates the 20-point SEO standard against real catalog data only. It never invents descriptions, prices, reviews or availability.</div></footer>
<script>
  function kcoSeoToken(){
    try{
      for(const k of Object.keys(localStorage)){
        try{const v=JSON.parse(localStorage.getItem(k));if(v&&v.access_token)return v.access_token;}catch(_){}
      }
      for(const k of Object.keys(sessionStorage)){
        try{const v=JSON.parse(sessionStorage.getItem(k));if(v&&v.access_token)return v.access_token;}catch(_){}
      }
    }catch(_){}
    return '';
  }
  async function kcoSeoPost(action,id){
    const btn=document.querySelector('[data-action-btn]');
    const lab=(btn?btn.textContent:'');
    if(action==='regenerate'&&!confirm('Regenerate the SEO fields for this product from REAL data only?\n\nThis may: fix an empty/derived title, normalize whitespace in the description, fill empty seo_keywords and product_location.\nIt will NEVER invent descriptions, prices or reviews.\n\nApply and save to the database?'))return;
    const area=document.getElementById('seo-result');
    if(area)area.innerHTML='<p class="muted" style="padding:12px">Running ‘'+action+'’…</p>';
    try{
      const res=await fetch('/seo-audit',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+kcoSeoToken()},body:JSON.stringify({action,id})});
      const html=await res.text();
      if(area)area.innerHTML=html; else document.body.innerHTML=html;
      if(action==='regenerate'){window.scrollTo({top:0,behavior:'smooth'});}
    }catch(e){ if(area)area.innerHTML='<p class="err" style="padding:12px">Request failed — '+esc(e&&e.message?e.message:e)+'</p>'; }
  }
  function esc(t){const d=document.createElement('div');d.textContent=t==null?'':String(t);return d.innerHTML;}
</script>
</body>
</html>`;
}

// ── Dashboard body ───────────────────────────────────────────────────────
function statCards(r) {
  const c = r.counts;
  return `<div class="grid">
    <div class="card"><h3>Total products</h3><p class="big num">${c.total.toLocaleString()}</p><p class="tone">active listings in the catalog</p></div>
    <div class="card"><h3>Ready for Google</h3><p class="big ok">${c.ready.toLocaleString()}</p><p class="tone">no errors found — all core checks pass</p></div>
    <div class="card"><h3>With SEO errors</h3><p class="big err">${c.error.toLocaleString()}</p><p class="tone">blocking or risky issues</p></div>
    <div class="card"><h3>Needing attention</h3><p class="big warn">${c.attention.toLocaleString()}</p><p class="tone">warnings — improvement advised</p></div>
    <div class="card"><h3>Missing metadata</h3><p class="big num">${c.missingMetadata.toLocaleString()}</p><p class="tone">no real title or description</p></div>
    <div class="card"><h3>Missing structured data</h3><p class="big num">${c.missingStructuredData.toLocaleString()}</p><p class="tone">invalid Product Offer or no price</p></div>
    <div class="card"><h3>Duplicate content</h3><p class="big warn">${c.duplicateContent.toLocaleString()}</p><p class="tone">title/description/URL collisions</p></div>
    <div class="card"><h3>No product image</h3><p class="big num">${c.noImage.toLocaleString()}</p><p class="tone">fall back to the site logo</p></div>
    <div class="card"><h3>No description</h3><p class="big num">${c.noDescription.toLocaleString()}</p><p class="tone">cannot be auto-fixed</p></div>
    <div class="card"><h3>Performance warnings</h3><p class="big num">${c.perfWarnings.toLocaleString()}</p><p class="tone">image weight / count heuristics</p></div>
  </div>`;
}

function sitemapPanel(r) {
  const s = r.sitemap;
  return `<h2>Infastructure</h2><div class="grid">
    <div class="card"><h3>Sitemap</h3><div class="sitemapbox"><span class="ok">● Live</span><p class="muted" style="margin:6px 0">${s.productCount.toLocaleString()} product URLs served.</p><a href="${esc(s.url)}">${esc(s.url)}</a></div></div>
    <div class="card"><h3>Robots.txt indexability</h3><div class="sitemapbox">${r.robots.sitemapLinked ? '<span class="ok">● Sitemap linked in robots.txt</span>' : '<span class="err">Sitemap not linked</span>'}<p class="tone">/product, /category and /country are allowed to crawl.</p></div></div>
    <div class="card"><h3>Indexable product pages</h3><p class="big ok">${r.indexability.indexable.toLocaleString()}</p><p class="tone">of ${r.indexability.total.toLocaleString()} products serve index,follow</p></div>
    <div class="card"><h3>Discontinued listings</h3><p class="big num">${c14(r).toLocaleString()}</p><p class="tone">served with OutOfStock schema</p></div>
  </div>`;
  function c14(r){return r.counts.discontinued||0;}
}

function duplicatePanel(r) {
  const d = r.duplicates;
  const sections = [];
  if (d.titleGroups.length) {
    sections.push(`<h2>Duplicate titles (${d.titleGroups.length} groups)</h2>`);
    sections.push(d.titleGroups.slice(0, 20).map((g) => `<div class="dupe-pair">${g.map((x) => `<a style="color:#93c5fd" href="/seo-audit?id=${esc(x.id)}">${esc(x.title)}</a> (<a style="color:#93c5fd" href="${esc(x.url)}" target="_blank">${esc(x.id)}</a>)`).join('  vs  ')}</div>`).join(''));
  }
  if (d.descriptionGroups.length) {
    sections.push(`<h2>Duplicate / very similar descriptions (${d.descriptionGroups.length} pairs shown)</h2>`);
    sections.push(d.descriptionGroups.slice(0, 20).map((g) => `<div class="dupe-pair">${g.map((x) => `<a style="color:#93c5fd" href="/seo-audit?id=${esc(x.id)}">${esc(x.title)}</a> (<a style="color:#93c5fd" href="${esc(x.url)}" target="_blank">${esc(x.id)}</a>)`).join('  vs  ')}</div>`).join(''));
  }
  if (d.urlGroups.length) {
    sections.push(`<h2>Duplicate URLs (${d.urlGroups.length} groups)</h2>`);
    sections.push(d.urlGroups.slice(0, 20).map((g) => `<div class="dupe-pair">${g.map((x) => `<a style="color:#93c5fd" href="${esc(x.url)}" target="_blank">${esc(x.url)}</a>`).join('  vs  ')}</div>`).join(''));
  }
  if (!sections.length) return `<h2>Duplicate content</h2><div class="note green">✓ No duplicate titles, URLs or near-identical descriptions detected across the catalog.</div>`;
  return sections.join('');
}

function errorsByCategory(r) {
  const entries = Object.entries(r.errorsByCategory).sort((a, b) => b[1] - a[1]);
  if (!entries.length) return '';
  return `<h2>Most common errors across the catalog</h2>
  <div class="checklist">${entries.map(([id, n]) => {
    const sample = r.reports.find((x) => x.checklist.some((c) => c.id === id && c.status === 'error'));
    const chk = sample?.checklist.find((c) => c.id === id);
    return `<div class="chk-row"><span class="ci err">✕</span><div style="flex:1"><div class="chk-title">${esc(CHECK_LABELS[id] || id)} — ${n} product${n > 1 ? 's' : ''}</div><div class="chk-msg">${esc(chk?.message || '')}</div><div class="chk-fix"><b>Fix:</b> ${esc(chk?.fix || '')}</div></div></div>`;
  }).join('')}</div>`;
}

const CHECK_LABELS = {
  title_present: 'Missing title', title_length: 'Title length', title_unique: 'Duplicate title',
  desc_present: 'Missing description', desc_html: 'Raw HTML in description', desc_unique: 'Duplicate description',
  price_valid: 'Invalid price', url_clean: 'URL cleanliness', h1: 'H1', h2: 'H2 headings', h3: 'H3 headings',
  img_count: 'Missing images', img_alt: 'Image ALT', structured_product: 'Product schema', structured_breadcrumb: 'Breadcrumb schema',
  structured_org: 'Organization schema', structured_valid: 'Schema validity', canonical: 'Canonical', og: 'Open Graph',
  twitter: 'Twitter cards', internal_links: 'Internal links', sitemap: 'Sitemap inclusion', robots_index: 'Indexability',
  discontinued: 'Discontinued', availability: 'Availability', mobile: 'Mobile friendly', perf: 'Performance', approval: 'Approval status',
  image_live: 'Image live check',
};
function checkLabel(id) { return CHECK_LABELS[id] || id; }

function productTable(reports, filter, page, query) {
  let rows = reports;
  const filterKey = { all: () => true, ready: (r) => r.status === 'ready', errors: (r) => r.status === 'error', attention: (r) => r.status === 'attention', duplicates: (r) => r.duplicates }[filter] || (() => true);
  rows = rows.filter(filterKey);
  if (query) {
    const q = query.toLowerCase();
    rows = rows.filter((r) => (r.id || '').toLowerCase().includes(q) || (r.title || '').toLowerCase().includes(q));
  }
  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const p = Math.min(Math.max(1, page), pages);
  const start = (p - 1) * PAGE_SIZE;
  const slice = rows.slice(start, start + PAGE_SIZE);
  const f = (label, key) => `<a class="chip ${filter === key ? 'on' : ''}" href="/seo-audit?filter=${key}${query ? `&q=${esc(query)}` : ''}">${label} (${rows.length})</a>`;

  const tbody = slice.length ? slice.map((r) => `<tr>
    <td><a style="color:#93c5fd;font-weight:700" href="/seo-audit?id=${esc(r.id)}">${esc(r.id)}</a></td>
    <td style="max-width:340px"><a style="color:#e2e8f0;text-decoration:none" href="${esc(r.url)}" target="_blank">${esc(r.title.slice(0, 70))}</a></td>
    <td class="muted">${esc(r.category || '—')}</td>
    <td class="muted">${esc(r.country || '—')}</td>
    <td>${scoreRing(r.score)}</td>
    <td>${badge(r.status)}</td>
    <td>${r.duplicates ? '<span class="badge s-warn">dup</span>' : ''}</td>
    <td><div class="actions">
      <a href="/seo-audit?id=${esc(r.id)}">Recheck</a>
      <a href="${esc(r.url)}" target="_blank">View</a>
    </div></td>
  </tr>`).join('') : `<tr><td colspan="8" class="muted" style="text-align:center;padding:28px">No products match this filter.</td></tr>`;

  let pager = '';
  if (pages > 1) {
    const mk = (pg, label, on) => `<a ${on ? 'class="on"' : ''} href="/seo-audit?filter=${filter}&page=${pg}${query ? `&q=${esc(query)}` : ''}">${label}</a>`;
    pager = `<div class="pager">${p > 1 ? mk(p - 1, '← Prev') : ''}${mk(1, '1', p === 1)}${p > 3 ? '<span class="muted">…</span>' : ''}${p > 2 ? mk(p, `${p}`, true) : ''}${p < pages - 1 ? '<span class="muted">…</span>' : ''}${mk(pages, `${pages}`, p === pages)}${p < pages ? mk(p + 1, 'Next →') : ''}<span class="muted" style="margin-left:auto">Page ${p} of ${pages}</span></div>`;
  }

  return `<div class="row" style="margin-top:20px"><label class="search"><input id="seo-q" type="search" placeholder="Filter by ID or title…" value="${esc(query || '')}" oninput="const v=this.value;const u=new URL(location.href);u.searchParams.set('q',v);u.searchParams.set('page','1');history.replaceState(null,'',u); 
  clearTimeout(window.__sq);window.__sq=setTimeout(()=>location.href=u.toString(),450);"></label>
  <div class="filters">${f('All', 'all')}${f('Ready', 'ready')}${f('Errors', 'errors')}${f('Attention', 'attention')}${f('Duplicates', 'duplicates')}</div></div>
  <div style="overflow-x:auto"><table>
    <tr><th>ID</th><th>Product title</th><th>Category</th><th>Country</th><th>Score</th><th>Status</th><th>Dup</th><th>Actions</th></tr>
    ${tbody}
  </table></div>${pager}`;
}

function renderDashboard(report, opts) {
  const filter = ['all', 'ready', 'errors', 'attention', 'duplicates'].includes(opts.filter) ? opts.filter : 'all';
  const page = Number(opts.page) || 1;
  const query = opts.q || '';
  const body = `
    <h1>Automatic SEO report</h1>
    <p class="lead">Every active product was tested against the 20-point SEO standard: unique titles, meta descriptions, clean URLs, H1–H3 headings, image ALT, Product + BreadcrumbList + Organization structured data, canonical URLs, Open Graph, internal links, sitemap inclusion, robots/indexability, mobile &amp; performance heuristics, discontinued handling, and duplicate-content detection. <b>Only real, existing product data is evaluated — nothing is invented.</b></p>
    ${statCards(report)}
    ${sitemapPanel(report)}
    ${errorsByCategory(report)}
    ${duplicatePanel(report)}
    <h2>Products (${report.counts.total.toLocaleString()})</h2>
    ${productTable(report.reports, filter, page, query)}`;
  return shell(body, { title: `SEO Audit — ${report.counts.ready}/${report.counts.total} ready | Weverse Online Shop` });
}

// ── Single-product audit view ───────────────────────────────────────────
function renderProductView(report, audit, listing) {
  const id = audit.id;
  const price = listing ? priceNum(listing) : 0;
  const loc = listing ? locationOf(listing) : '';
  const improvements = listing ? buildImprovements(listing) : null;
  const changeRows = improvements?.changes?.length
    ? improvements.changes.map((c) => `<div class="proposal" style="margin-bottom:8px">
        <div class="lbl">${esc(c.field)}${c.after === '' && c.before === '' ? ' — cannot be auto-generated' : ''}</div>
        <div class="val">${esc(c.field === 'seo_keywords' ? 'keywords' : '')}${c.after ? `<code>${esc(String(c.after).slice(0, 160))}</code>` : `<span class="muted">(needs the owner: ${esc(c.reason)})</span>`}</div>
        <div class="tone">${esc(c.reason)}</div>
      </div>`).join('')
    : '<div class="proposal"><span class="ok">✓ No safe, real-data improvements available. This product already has complete SEO fields.</span></div>';

  const checklist = audit.checklist.map((c) => `<div class="chk-row">${checkIcon(c.status)}
    <div style="flex:1"><div class="chk-title">${esc(checkLabel(c.id))}</div>
    <div class="chk-msg">${esc(c.message)}</div>
    <div class="chk-fix"><b>Fix:</b> ${esc(c.fix)}</div></div></div>`).join('');

  const body = `
    <div class="row"><a class="btn" href="/seo-audit" style="padding:7px 12px">← Back to report</a>
      <h1 style="flex:1;min-width:200px">${esc(audit.title.slice(0, 80))}</h1>
      ${scoreRing(audit.score)} ${badge(audit.status)}</div>
    <p class="lead">${esc(id)}${loc ? ' · ' + esc(loc) : ''}${price ? ' · ' + esc(money(price)) : ''}${audit.updatedAt ? ' · updated ' + String(audit.updatedAt).slice(0, 10) : ''}</p>

    <div class="row" style="margin:16px 0">
      <button data-action-btn onclick="kcoSeoPost('recheck', '${esc(id)}')">↻ Recheck live</button>
      <button data-action-btn onclick="kcoSeoPost('regenerate', '${esc(id)}')" class="danger">✦ Regenerate SEO (real data only)</button>
      <a class="btn" href="${esc(audit.url)}" target="_blank" style="padding:7px 14px">View live page</a>
      <a class="btn" href="https://search.google.com/search-console?utm_source=${esc(id)}" target="_blank" style="padding:7px 14px">Google Search Console</a>
    </div>

    <div class="note">Regenerate applies only safe, real-data changes — it will never invent descriptions, prices, reviews or availability. Writes require an admin session; without one you see the proposal. After regeneration, Google must still recognize the page on its own crawl.</div>

    <div id="seo-result"></div>

    <h2>SEO fields for this product</h2>
    <div class="checklist">
      <div class="chk-row"><span class="ci ok">✓</span><div><div class="chk-title">Rendered SEO title</div><div class="chk-msg">${esc(renderedTitle(listing))}</div></div></div>
      <div class="chk-row"><span class="ci ok">✓</span><div><div class="chk-title">Meta description (auto-built from real data)</div><div class="chk-msg">${esc(renderedMetaDescription(listing))}</div></div></div>
      <div class="chk-row"><span class="ci ok">✓</span><div><div class="chk-title">Canonical / Open Graph URL</div><div class="chk-msg">${esc(audit.url)}</div></div></div>
    </div>

    <h2>Suggested real-data improvements</h2>
    ${changeRows}

    <h2>Checklist (${audit.counts.ok} pass · ${audit.counts.warn} warn · ${audit.counts.error} errors)</h2>
    <div class="checklist">${checklist}</div>`;

  return shell(body, { title: `SEO audit — ${audit.title.slice(0, 60)} | Weverse Online Shop` });
}

async function resolveFullListing(id) {
  const { createClient } = await import('@supabase/supabase-js');
  const client = createClient(MAIN_URL, MAIN_ANON_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data } = await client
    .from('showroom_listings')
    .select('*')
    .eq('is_active', true)
    .eq('property_id', id)
    .maybeSingle();
  if (data) return data;
  const byId = await client.from('showroom_listings').select('*').eq('is_active', true).eq('id', id).maybeSingle();
  return byId?.data || null;
}

// ── Regenerate (real data only) via the admin-gated RPC ─────────────────
async function applyRegeneration(id, listing, jwt) {
  const improvements = buildImprovements(listing);
  const merged = JSON.parse(JSON.stringify(listing));
  let applied = 0;
  for (const c of improvements.changes) {
    if (c.field === 'title' && !listingTitle(listing) && c.after) { merged.title = c.after; applied++; }
    if (c.field === 'description' && c.after !== '' && String(listing.description || '').trim() !== c.after) { merged.description = c.after; applied++; }
    if (c.field === 'seo_keywords' && (!Array.isArray(listing.seo_keywords) || !listing.seo_keywords.length)) { merged.seo_keywords = improvements.proposedKeywords; applied++; }
  }
  if (improvements?.changes?.some((c) => c.field === 'description' && c.after === '' && c.before !== '') && !merged.description) {
    // never invented; nothing to do
  }
  merged.product_location = locationOf(listing) || [listing?.city, listing?.state, listing?.country].filter(Boolean).join(', ');

  // Only call the RPC if something real changed and we have an admin JWT.
  if (applied === 0) {
    return { ok: true, applied: 0, note: 'No safe real-data changes were necessary.' };
  }
  if (!jwt) {
    return { ok: false, applied: 0, note: 'Proposal ready, but an admin session is required to save. Open this page while logged into the admin, then try again.' };
  }

  const { createClient } = await import('@supabase/supabase-js');
  const client = createClient(MAIN_URL, MAIN_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${jwt}` } },
  });
  const { data, error } = await client.rpc('publish_showroom_upsert', { p_data: [merged] });
  if (error) {
    return { ok: false, applied: 0, note: `Save failed: ${error.message}. The RPC only writes for admin users.` };
  }
  return { ok: true, applied, note: `Saved ${applied} real-data improvement(s) via the admin publish RPC (rows affected: ${data}).` };
}

// ── Unified single-product result (fresh DB row + aggregate context) ─────
async function buildProductView(id, report) {
  const listing = await resolveFullListing(id);
  if (!listing) {
    return { html: shell(`<div class="note">No active product with ID <code>${esc(id)}</code> was found in the catalog.</div><p><a class="btn" href="/seo-audit">← Back to report</a></p>`, { title: 'Product not found' }), ok: false };
  }
  const audit = auditListing(listing, ctxFromReport(report));
  await withDeepImageCheck(audit);
  return { html: renderProductView(report, audit, listing), ok: true };
}

function ctxFromReport(report) {
  const dupTitles = new Set();
  for (const g of report.duplicates.titleGroups) if (g.length) dupTitles.add(g[0].title.toLowerCase());
  const dupDescriptions = new Set();
  const sitemapUrls = new Set();
  for (const r of report.reports) {
    sitemapUrls.add(r.url);
    if (r.duplicates) dupDescriptions.add(r.title.toLowerCase());
  }
  return { sitemapUrls, dupTitles, dupDescriptions, scanAll: false };
}

// ── Handler ─────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  try {
    const url = new URL(req.url || '', 'https://x');
    const id = String(url.searchParams.get('id') || '').trim();
    const format = String(url.searchParams.get('format') || '').trim().toLowerCase();
    const filter = String(url.searchParams.get('filter') || 'all').trim();
    const page = Number(url.searchParams.get('page')) || 1;
    const q = String(url.searchParams.get('q') || '').trim().slice(0, 80);

    if ((req.method || 'GET').toUpperCase() === 'POST') {
      let payload = {};
      try { payload = JSON.parse(req.body || '{}'); } catch { payload = {}; }
      const action = String(payload.action || '').trim();
      const pid = String(payload.id || '').trim();
      if (!action || !pid) { return send(res, 400, shell('<p class="err">Missing action or id.</p>'), 'text/html'); }

      const report = await getOrBuildReport({ force: true });
      if (action === 'recheck') {
        const view = await buildProductView(pid, report);
        return send(res, 200, view.html, 'text/html');
      }
      if (action === 'regenerate') {
        const listing = await resolveFullListing(pid);
        if (!listing) return send(res, 404, shell('<p class="err">Product not found.</p>'), 'text/html');
        const jwt = String(req.headers?.authorization || '').replace(/^Bearer\s+/i, '');
        const result = await applyRegeneration(pid, listing, jwt);
        const freshListing = await resolveFullListing(pid);
        const audit = auditListing(freshListing || listing, ctxFromReport(report));
        const noteCls = result.ok ? 'green' : '';
        const resultBox = `<div class="note ${noteCls}">${esc(result.note)}</div>`;
        const body = `${resultBox}${renderProductView(await rebuildForRegen(report), audit, freshListing || listing)}`;
        return send(res, 200, body, 'text/html');
      }
      return send(res, 400, shell('<p class="err">Unknown action.</p>'), 'text/html');
    }

    // ── GET ──
    if (format === 'json') {
      const report = await getOrBuildReport({});
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=120');
      return res.end(JSON.stringify({
        generatedAt: report.generatedAt,
        counts: report.counts,
        sitemap: report.sitemap,
        robots: report.robots,
        indexability: report.indexability,
        errorsByCategory: report.errorsByCategory,
        duplicates: {
          titleGroups: report.duplicates.titleGroups.slice(0, 50),
          descriptionGroups: report.duplicates.descriptionGroups.slice(0, 50),
          urlGroups: report.duplicates.urlGroups.slice(0, 50),
        },
      }));
    }

    const report = await getOrBuildReport({});
    if (id) {
      const view = await buildProductView(id, report);
      if (!view.ok) return send(res, 404, view.html, 'text/html');
      return send(res, 200, view.html, 'text/html');
    }
    return send(res, 200, renderDashboard(report, { filter, page, q }), 'text/html');
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.end(shell(`<div class="note">Audit engine error: ${esc(err && err.message ? err.message : err)}</div><p><a class="btn" href="/seo-audit">Try again</a></p>`));
  }
}

async function rebuildForRegen(report) {
  const fresh = await fetchCatalog();
  const r = await auditCatalog(fresh);
  cache = { at: Date.now(), report: r };
  return r;
}

function send(res, code, body, type) {
  res.statusCode = code;
  res.setHeader('Content-Type', type || 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  return res.end(body);
}