import { getAllShowcaseProperties, getAllHeroVehicles, heroCardHtml, houseTypeLabel, vehicleKindLabel, heroStyles } from './showroom-hero.js';
import { getDBListings, loadDBListings, hydrateDBListingsFromCache } from './showroom-data.js';

const HOUSE_ORDER = [
  'Single-Family Home', 'Apartment', 'Condo', 'Townhouse', 'Villa', 'Mansion',
  'Beach House', 'Farm House', 'House', 'Homes', 'Duplex', 'Penthouse',
  'Bungalow', 'Cottage', 'Chalet', 'Studio', 'Loft',
];

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function icon(name) {
  return `<i data-lucide="${name}" class="w-5 h-5"></i>`;
}

function currentCat() {
  try { return new URLSearchParams(window.location.search).get('cat') || 'real-estate'; }
  catch { return 'real-estate'; }
}

function setupCatBar(types, active, veh) {
  const bar = document.getElementById('kco-catbar');
  if (!bar) return;
  bar.innerHTML = `<a class="kco-cat ${!active ? 'active' : ''} ${veh ? 'veh' : ''}" href="#" data-type="">All Types</a>` +
    types.map(t => `<a class="kco-cat ${active === t ? 'active' : ''} ${veh ? 'veh' : ''}" href="#" data-type="${esc(t)}">${esc(t)}</a>`).join('');
  bar.querySelectorAll('.kco-cat').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      render(currentCat(), a.dataset.type || '');
    });
  });
}

function showroomMasthead(isRe, list) {
  const mast = document.getElementById('kco-brand-mast') || document.querySelector('.kco-head');
  if (!mast) return;
  mast.innerHTML = `
    <h1 id="kco-cat-title">${isRe ? 'Houses For Sale &amp; Rent' : 'Cars &amp; Trucks'}</h1>
    <p id="kco-cat-sub">${isRe ? 'Every home for sale or rent, grouped by type in continuous side-scrolling lines with video tours on every listing.' : 'New and used cars, trucks, buses and motorhomes listed by their sellers — grouped in continuous side-scrolling lines.'}</p>`;
}

const HOUSE_ICONS = {
  'Single-Family Home': 'home', 'Apartment': 'building-2', 'Condo': 'building-2', 'Townhouse': 'home',
  'Villa': 'castle', 'Mansion': 'warehouse', 'Beach House': 'waves', 'Farm House': 'tractor',
  'House': 'home', 'Homes': 'home', 'Duplex': 'building-2', 'Penthouse': 'building-2',
  'Bungalow': 'home', 'Cottage': 'home', 'Chalet': 'mountain', 'Studio': 'building-2', 'Loft': 'building-2',
};

const VEHICLE_ICONS = {
  'Car': 'car-front', 'Truck': 'truck', 'Bus': 'bus', 'Motorhome / RV': 'van',
  'Motorcycle': 'bike', 'Boat / Marine': 'ship',
};

const SVG_CH_L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>';
const SVG_CH_R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';

function wireGroup(group) {
  const track = group.querySelector('.kco-hero-hscroll');
  if (!track) return;
  let down = false, moved = false, startX = 0, startScroll = 0;
  track.addEventListener('pointerdown', (e) => {
    down = true; moved = false;
    startX = e.clientX; startScroll = track.scrollLeft;
    track.classList.add('dragging');
    try { track.setPointerCapture(e.pointerId); } catch { /* older browsers */ }
  });
  track.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 5) moved = true;
    track.scrollLeft = startScroll - dx;
  });
  const end = () => { down = false; track.classList.remove('dragging'); };
  track.addEventListener('pointerup', end);
  track.addEventListener('pointercancel', end);
  track.addEventListener('pointerleave', end);
  track.addEventListener('click', (e) => {
    if (moved) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  const left = group.querySelector('.kco-hero-arrow.left');
  const right = group.querySelector('.kco-hero-arrow.right');
  if (left && right) {
    const update = () => {
      const max = track.scrollWidth - track.clientWidth - 2;
      left.disabled = track.scrollLeft <= 2;
      right.disabled = track.scrollLeft >= max;
    };
    left.addEventListener('click', () => track.scrollBy({ left: -track.clientWidth * 0.8, behavior: 'smooth' }));
    right.addEventListener('click', () => track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' }));
    track.addEventListener('scroll', update, { passive: true });
    update();
  }
}

function render(cat, filterType) {
  const results = document.getElementById('kco-results');
  if (!results) return;
  heroStyles();
  const isRe = cat === 'real-estate';
  const list = isRe ? getAllShowcaseProperties() : getAllHeroVehicles();
  showroomMasthead(isRe, list);
  document.querySelectorAll('.kco-tab').forEach(t => t.classList.toggle('active', t.dataset.cat === cat));

  const groups = new Map();
  const order = [];
  for (const l of list) {
    const key = isRe ? houseTypeLabel(l) : vehicleKindLabel(l);
    if (!groups.has(key)) { groups.set(key, []); order.push(key); }
    groups.get(key).push(l);
  }
  const baseOrder = isRe ? HOUSE_ORDER : ['Car', 'Truck', 'Bus', 'Motorhome / RV', 'Motorcycle', 'Boat / Marine'];
  order.sort((a, b) => {
    const ia = baseOrder.indexOf(a), ib = baseOrder.indexOf(b);
    const av = ia === -1 ? 1000 : ia, bv = ib === -1 ? 1000 : ib;
    if (av !== bv) return av - bv;
    return groups.get(b).length - groups.get(a).length;
  });

  const veh = !isRe;
  setupCatBar(order, filterType || '', veh);

  const visibleOrder = filterType ? order.filter(k => k === filterType) : order;
  const html = visibleOrder.map(key => {
    const items = groups.get(key);
    const cards = items.map(l => heroCardHtml(l, isRe ? 'house' : 'vehicle', 'kco-hero-card')).join('');
    return `
      <section class="kco-group ${veh ? 'veh' : ''}">
        <div class="kco-group-head ${veh ? 'veh' : ''}">
          <span class="kco-gh-ic">${icon(isRe ? (HOUSE_ICONS[key] || 'home') : (VEHICLE_ICONS[key] || 'car-front'))}</span>
          <h2>${esc(key)}</h2>
          <span>${items.length} listing${items.length === 1 ? '' : 's'}</span>
        </div>
        <div class="kco-hero-hscroll">${cards}</div>
        <button class="kco-hero-arrow left" aria-label="Scroll ${esc(key)} left">${SVG_CH_L}</button>
        <button class="kco-hero-arrow right" aria-label="Scroll ${esc(key)} right">${SVG_CH_R}</button>
      </section>`;
  }).join('');

  results.innerHTML = html || '<div class="kco-empty">No items in this group yet.</div>';
  results.querySelectorAll('.kco-group').forEach(wireGroup);
  if (window.lucide) lucide.createIcons();
}

function init() {
  hydrateDBListingsFromCache();
  render(currentCat(), '');
  loadDBListings().then(() => render(currentCat(), '')).catch(() => {});
  window.addEventListener('showroom-categories-ready', () => render(currentCat(), ''));
  window.addEventListener('kco-db-refresh', () => render(currentCat(), ''));
}

init();