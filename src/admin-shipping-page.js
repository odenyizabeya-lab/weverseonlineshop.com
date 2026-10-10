import { supabase } from './supabase-client.js';
import { getCurrentUser } from './auth.js';

const SHIPMENT_STATUSES = [
  { id: 'pending', label: 'Pending', icon: 'clock', color: 'text-gray-400', bg: 'bg-gray-500/15' },
  { id: 'processing', label: 'Processing', icon: 'package', color: 'text-blue-400', bg: 'bg-blue-500/15' },
  { id: 'packed', label: 'Packed', icon: 'package-check', color: 'text-teal-400', bg: 'bg-teal-500/15' },
  { id: 'shipped', label: 'Shipped', icon: 'truck', color: 'text-indigo-400', bg: 'bg-indigo-500/15' },
  { id: 'in_transit', label: 'In Transit', icon: 'navigation', color: 'text-violet-400', bg: 'bg-violet-500/15' },
  { id: 'out_for_delivery', label: 'Out for Delivery', icon: 'bike', color: 'text-blue-400', bg: 'bg-blue-500/15' },
  { id: 'delivered', label: 'Delivered', icon: 'check-circle', color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
  { id: 'cancelled', label: 'Cancelled', icon: 'x-circle', color: 'text-red-400', bg: 'bg-red-500/15' },
];

let state = { user: null, tab: 'shipments', shipments: [], couriers: [], methods: [], reports: null, loading: true };

function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3000);
  if (window.lucide) lucide.createIcons();
}

function ripple(btn) {
  btn.addEventListener('click', function (e) {
    const r = this.getBoundingClientRect();
    const rip = document.createElement('span');
    rip.className = 'ripple';
    const s = Math.max(r.width, r.height);
    rip.style.width = rip.style.height = s + 'px';
    rip.style.left = (e.clientX - r.left - s / 2) + 'px';
    rip.style.top = (e.clientY - r.top - s / 2) + 'px';
    this.appendChild(rip);
    setTimeout(() => rip.remove(), 600);
  });
}

function formatDate(d) { return d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'; }
function formatDateTime(d) { return d ? new Date(d).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'; }

function statusBadge(status) {
  const step = SHIPMENT_STATUSES.find(s => s.id === status) || SHIPMENT_STATUSES[0];
  const colorMap = {
    'text-gray-400': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    'text-blue-400': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'text-teal-400': 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    'text-indigo-400': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    'text-violet-400': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    'text-blue-400': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'text-emerald-400': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'text-red-400': 'bg-red-500/10 text-red-400 border-red-500/20',
  };
  const cls = colorMap[step.color] || colorMap['text-gray-400'];
  return `<span class="inline-flex items-center gap-1 ${cls} border text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">${step.label}</span>`;
}

function fmtMoney(amount, currency) {
  const n = parseFloat(amount) || 0;
  return `${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency || 'USD'}`;
}

async function callShippingApi(action, method = 'GET', body = null) {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/shipping-management?action=${action}`;
  const res = await fetch(url, {
    method,
    headers: { 'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : null,
  });
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

async function init() {
  const { data: sessionData } = await supabase.auth.getSession();
  state.user = sessionData?.session?.user || null;

  if (!state.user) {
    document.getElementById('admin-root').innerHTML = '<div class="flex items-center justify-center py-20"><div class="text-center"><p class="text-red-400 text-sm mb-4">Access denied. Please sign in as an admin.</p><a href="/auth.html?redirect=/admin-shipping.html" class="inline-flex items-center gap-2 bg-blue-600 text-white font-bold py-2.5 px-5 rounded-xl text-sm">Sign In</a></div></div>';
    return;
  }

  const { data: isAdmin } = await supabase.rpc('is_current_user_admin');
  if (!isAdmin) {
    document.getElementById('admin-root').innerHTML = '<div class="flex items-center justify-center py-20"><div class="text-center"><p class="text-red-400 text-sm mb-4">You are signed in, but this account does not have administrator privileges.</p><a href="/auth.html?redirect=/admin-shipping.html" class="inline-flex items-center gap-2 bg-blue-600 text-white font-bold py-2.5 px-5 rounded-xl text-sm">Sign In With Admin Account</a></div></div>';
    return;
  }
  await loadData();
  render();
}

async function loadData() {
  state.loading = true;
  try {
    const [shipData, courierData, methodData, reportData] = await Promise.all([
      callShippingApi('list'),
      callShippingApi('couriers'),
      callShippingApi('methods'),
      callShippingApi('reports'),
    ]);
    state.shipments = shipData.shipments || [];
    state.couriers = courierData.couriers || [];
    state.methods = methodData.methods || [];
    state.reports = reportData;
  } catch (err) {
    showToast('Failed to load shipping data: ' + err.message);
  }
  state.loading = false;
}

function render() {
  const root = document.getElementById('admin-root');
  if (state.loading) {
    root.innerHTML = `<div class="flex items-center justify-center py-20"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading...</div></div>`;
    if (window.lucide) lucide.createIcons();
    return;
  }

  root.innerHTML = `
    <div class="fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 class="text-2xl sm:text-3xl font-black text-white tracking-tight">Shipping Management</h1>
          <p class="text-sm text-gray-500 mt-1">Manage shipments, couriers, tracking, and delivery</p>
        </div>
        <button onclick="showCreateShipmentModal()" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-2.5 px-5 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden self-start">
          <i data-lucide="plus" class="w-4 h-4"></i> Create Shipment
        </button>
      </div>
      ${renderStats()}
      <div class="flex gap-1 mb-6 glass border border-blue-500/20 rounded-2xl p-1.5 overflow-x-auto scrollbar-none">
        <button onclick="switchTab('shipments')" class="tab-item ${state.tab === 'shipments' ? 'active' : ''} flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-gray-400 hover:text-white rounded-xl border border-transparent whitespace-nowrap"><i data-lucide="package" class="w-4 h-4"></i> Shipments</button>
        <button onclick="switchTab('couriers')" class="tab-item ${state.tab === 'couriers' ? 'active' : ''} flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-gray-400 hover:text-white rounded-xl border border-transparent whitespace-nowrap"><i data-lucide="truck" class="w-4 h-4"></i> Couriers</button>
        <button onclick="switchTab('rates')" class="tab-item ${state.tab === 'rates' ? 'active' : ''} flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-gray-400 hover:text-white rounded-xl border border-transparent whitespace-nowrap"><i data-lucide="tag" class="w-4 h-4"></i> Shipping Rates</button>
        <button onclick="switchTab('reports')" class="tab-item ${state.tab === 'reports' ? 'active' : ''} flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-gray-400 hover:text-white rounded-xl border border-transparent whitespace-nowrap"><i data-lucide="bar-chart-3" class="w-4 h-4"></i> Reports</button>
      </div>
      <div class="fade-in">
        ${state.tab === 'shipments' ? renderShipments() : ''}
        ${state.tab === 'couriers' ? renderCouriers() : ''}
        ${state.tab === 'rates' ? renderRates() : ''}
        ${state.tab === 'reports' ? renderReports() : ''}
      </div>
    </div>
  `;
  if (window.lucide) lucide.createIcons();
  document.querySelectorAll('.btn-press').forEach(ripple);
}

function renderStats() {
  const r = state.reports || {};
  return `
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      ${statCard('Total Shipments', r.total || 0, 'package', 'bg-blue-500/10 text-blue-400')}
      ${statCard('Pending', r.pending || 0, 'clock', 'bg-amber-500/10 text-amber-400')}
      ${statCard('In Transit', r.in_transit || 0, 'navigation', 'bg-violet-500/10 text-violet-400')}
      ${statCard('Delivered', r.delivered || 0, 'check-circle', 'bg-emerald-500/10 text-emerald-400')}
      ${statCard('Cancelled', r.cancelled || 0, 'x-circle', 'bg-red-500/10 text-red-400')}
    </div>
  `;
}

function statCard(label, value, icon, cls) {
  return `<div class="glass border border-blue-500/20 rounded-2xl p-4 slide-up"><div class="p-2 ${cls} rounded-lg w-fit mb-2"><i data-lucide="${icon}" class="w-4 h-4"></i></div><p class="text-2xl font-black text-white">${value}</p><p class="text-[10px] text-gray-500 uppercase tracking-wide mt-0.5">${label}</p></div>`;
}

function renderShipments() {
  if (state.shipments.length === 0) {
    return `<div class="glass border border-blue-500/20 rounded-2xl p-10 text-center slide-up"><div class="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl mb-4"><i data-lucide="package" class="w-8 h-8 text-blue-400"></i></div><h3 class="text-lg font-bold text-white mb-2">No Shipments</h3><p class="text-sm text-gray-500 mb-6">Create a shipment to get started.</p><button onclick="showCreateShipmentModal()" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-xl uppercase text-sm tracking-wider transition shadow-lg shadow-blue-600/30 relative overflow-hidden"><i data-lucide="plus" class="w-4 h-4"></i> Create Shipment</button></div>`;
  }
  return `<div class="glass border border-blue-500/20 rounded-2xl overflow-hidden slide-up"><div class="overflow-x-auto scrollbar-none"><table class="w-full"><thead><tr class="border-b border-blue-500/10 bg-blue-950/30"><th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Order #</th><th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3 hidden sm:table-cell">Courier</th><th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Tracking #</th><th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Status</th><th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3 hidden md:table-cell">Est. Delivery</th><th class="text-right text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Actions</th></tr></thead><tbody>${state.shipments.map(s => `<tr class="border-b border-blue-500/5 hover:bg-blue-500/5 transition"><td class="px-4 py-3 text-xs font-mono text-blue-400">${s.order_number}</td><td class="px-4 py-3 text-xs text-white hidden sm:table-cell">${s.courier_name || '<span class="text-gray-600">Unassigned</span>'}</td><td class="px-4 py-3 text-xs text-gray-300 font-mono">${s.tracking_number || '—'}</td><td class="px-4 py-3">${statusBadge(s.status)}</td><td class="px-4 py-3 text-xs text-amber-400 hidden md:table-cell">${s.estimated_delivery ? formatDate(s.estimated_delivery) : '—'}</td><td class="px-4 py-3 text-right"><button onclick="showShipmentModal('${s.order_number}')" class="btn-press p-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-blue-400 transition relative overflow-hidden"><i data-lucide="edit-3" class="w-4 h-4"></i></button></td></tr>`).join('')}</tbody></table></div></div>`;
}

function renderCouriers() {
  return `<div class="mb-4"><button onclick="showAddCourierModal()" class="btn-press inline-flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 font-bold py-2.5 px-5 rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden"><i data-lucide="plus" class="w-4 h-4"></i> Add Custom Courier</button></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">${state.couriers.map(c => `<div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up"><div class="flex items-center justify-between mb-3"><div class="flex items-center gap-3"><div class="w-11 h-11 bg-blue-500/10 rounded-xl flex items-center justify-center"><i data-lucide="truck" class="w-5 h-5 text-blue-400"></i></div><div><h3 class="text-sm font-bold text-white">${c.name}</h3><p class="text-xs text-gray-500 font-mono">${c.code}</p></div></div>${c.is_builtin ? '<span class="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold uppercase">Built-in</span>' : '<span class="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-bold uppercase">Custom</span>'}</div>${c.tracking_url ? `<p class="text-xs text-gray-500 truncate" title="${c.tracking_url}">${c.tracking_url.replace('{tracking_number}', 'XXX')}</p>` : '<p class="text-xs text-gray-600">No tracking URL</p>'}<div class="mt-2"><span class="text-[10px] ${c.is_active ? 'text-emerald-400' : 'text-gray-500'} font-bold uppercase">${c.is_active ? 'Active' : 'Inactive'}</span></div></div>`).join('')}</div>`;
}

function renderRates() {
  return `<div class="mb-4"><button onclick="showAddMethodModal()" class="btn-press inline-flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 font-bold py-2.5 px-5 rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden"><i data-lucide="plus" class="w-4 h-4"></i> Add Shipping Method</button></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-4">${state.methods.map(m => `<div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up"><div class="flex items-center justify-between mb-3"><h3 class="text-sm font-bold text-white">${m.name}</h3><span class="text-[10px] ${m.is_active ? 'text-emerald-400' : 'text-gray-500'} font-bold uppercase">${m.is_active ? 'Active' : 'Inactive'}</span></div><p class="text-xs text-gray-500 mb-3">${m.description || '—'}</p><div class="space-y-1.5"><div class="flex justify-between text-xs"><span class="text-gray-500">Base Cost</span><span class="text-amber-400 font-bold">${fmtMoney(m.base_cost, 'USD')}</span></div><div class="flex justify-between text-xs"><span class="text-gray-500">Est. Days</span><span class="text-white">${m.estimated_days_min}-${m.estimated_days_max} days</span></div></div><button onclick="showEditMethodModal('${m.id}')" class="btn-press w-full mt-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 font-bold py-2 rounded-xl text-xs uppercase transition relative overflow-hidden">Edit Rate</button></div>`).join('')}</div>`;
}

function renderReports() {
  const r = state.reports || {};
  const courierData = r.by_courier || {};
  return `<div class="grid grid-cols-1 lg:grid-cols-2 gap-5"><div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up"><h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-4"><i data-lucide="bar-chart-3" class="w-4 h-4 text-blue-400"></i> Shipping Overview</h3><div class="space-y-3">${reportRow('Total Shipments', r.total || 0, 'text-white')}${reportRow('Pending', r.pending || 0, 'text-amber-400')}${reportRow('In Transit', r.in_transit || 0, 'text-violet-400')}${reportRow('Delivered', r.delivered || 0, 'text-emerald-400')}${reportRow('Cancelled', r.cancelled || 0, 'text-red-400')}<div class="pt-3 border-t border-blue-500/10">${reportRow('Total Shipping Cost', fmtMoney(r.total_shipping_cost || 0, 'USD'), 'text-amber-400')}</div></div></div><div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up"><h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-4"><i data-lucide="truck" class="w-4 h-4 text-blue-400"></i> Shipments by Courier</h3>${Object.keys(courierData).length === 0 ? '<p class="text-sm text-gray-500 text-center py-8">No courier data yet.</p>' : `<div class="space-y-3">${Object.entries(courierData).map(([name, count]) => { const pct = r.total > 0 ? (count / r.total * 100) : 0; return `<div><div class="flex justify-between text-sm mb-1"><span class="text-white font-bold">${name}</span><span class="text-gray-400">${count} (${pct.toFixed(0)}%)</span></div><div class="w-full bg-blue-950/60 rounded-full h-2 overflow-hidden"><div class="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500" style="width:${pct}%"></div></div></div>`; }).join('')}</div>`}</div></div>`;
}

function reportRow(label, value, cls) {
  return `<div class="flex justify-between text-sm"><span class="text-gray-500">${label}</span><span class="${cls} font-bold">${value}</span></div>`;
}

window.showCreateShipmentModal = () => {
  const modal = document.getElementById('modal-container');
  modal.innerHTML = `<div class="modal-overlay fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onclick="closeModal(event)"><div class="modal-content glass border border-blue-500/20 rounded-2xl p-6 max-w-md w-full" onclick="event.stopPropagation()"><h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2"><i data-lucide="package-plus" class="w-5 h-5 text-blue-400"></i> Create Shipment</h3><form id="create-shipment-form" class="space-y-4"><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Order Number *</label><input type="text" id="cs-order-number" required placeholder="W-XXXXXX" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Courier</label><select id="cs-courier" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"><option value="">— Select Courier —</option>${state.couriers.map(c => `<option value="${c.id}">${c.name} (${c.code})</option>`).join('')}</select></div><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Shipping Method</label><select id="cs-method" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"><option value="">— Select Method —</option>${state.methods.map(m => `<option value="${m.id}">${m.name} (${fmtMoney(m.base_cost, 'USD')}, ${m.estimated_days_min}-${m.estimated_days_max} days)</option>`).join('')}</select></div><div class="grid grid-cols-2 gap-4"><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Shipping Cost</label><input type="number" id="cs-cost" step="0.01" value="0" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Est. Delivery Date</label><input type="date" id="cs-est-delivery" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div></div><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Shipping Address</label><textarea id="cs-address" rows="2" placeholder="Full shipping address" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"></textarea></div><div class="flex gap-3 pt-2"><button type="submit" class="btn-press flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">Create Shipment</button><button type="button" onclick="closeModal()" class="btn-press px-5 py-3 bg-blue-950/60 border border-blue-500/20 text-gray-400 font-bold rounded-xl text-sm uppercase transition relative overflow-hidden">Cancel</button></div></form></div></div>`;
  if (window.lucide) lucide.createIcons();
  document.querySelectorAll('.btn-press').forEach(ripple);
  document.getElementById('create-shipment-form').addEventListener('submit', createShipment);
};

window.showShipmentModal = async (orderNumber) => {
  const modal = document.getElementById('modal-container');
  modal.innerHTML = `<div class="modal-overlay fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"><div class="modal-content glass border border-blue-500/20 rounded-2xl p-6 max-w-md w-full"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading shipment...</div></div></div>`;
  if (window.lucide) lucide.createIcons();
  try {
    const data = await callShippingApi(`get&order_number=${encodeURIComponent(orderNumber)}`);
    const s = data.shipment;
    const o = data.order;
    modal.innerHTML = `<div class="modal-overlay fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onclick="closeModal(event)"><div class="modal-content glass border border-blue-500/20 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto scrollbar-none" onclick="event.stopPropagation()"><h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2"><i data-lucide="edit-3" class="w-5 h-5 text-blue-400"></i> Manage Shipment</h3><div class="glass-soft border border-blue-500/15 rounded-xl p-4 mb-4"><div class="grid grid-cols-2 gap-2 text-sm"><div><p class="text-[10px] text-gray-500 uppercase">Order #</p><p class="text-blue-400 font-mono font-bold">${o?.order_number || orderNumber}</p></div><div><p class="text-[10px] text-gray-500 uppercase">Customer</p><p class="text-white">${o?.full_name || '—'}</p></div><div><p class="text-[10px] text-gray-500 uppercase">Product</p><p class="text-white truncate">${o?.listing_title || '—'}</p></div><div><p class="text-[10px] text-gray-500 uppercase">Amount</p><p class="text-amber-400 font-bold">${o ? fmtMoney(o.amount, o.currency) : '—'}</p></div></div></div>${s ? `<form id="update-shipment-form" class="space-y-4"><input type="hidden" id="us-order-number" value="${orderNumber}">${s.tracking_number ? `<div class="glass-soft border border-blue-500/15 rounded-xl p-3"><p class="text-[10px] text-gray-500 uppercase mb-1">Current Tracking Number (auto-generated)</p><p class="text-sm text-blue-400 font-mono font-bold">${s.tracking_number}</p></div>` : ''}<div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Courier</label><select id="us-courier" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"><option value="">— Select Courier —</option>${state.couriers.map(c => `<option value="${c.id}" ${s.courier_id === c.id ? 'selected' : ''}>${c.name} (${c.code})</option>`).join('')}</select></div><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Official Tracking Number</label><input type="text" id="us-tracking" value="${s.tracking_number || ''}" placeholder="Enter official courier tracking number" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"><p class="text-[11px] text-gray-600 mt-1">Replace the auto-generated number with the official courier tracking number.</p></div><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Shipment Status</label><select id="us-status" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">${SHIPMENT_STATUSES.map(st => `<option value="${st.id}" ${s.status === st.id ? 'selected' : ''}>${st.label}</option>`).join('')}</select></div><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Estimated Delivery</label><input type="date" id="us-est-delivery" value="${s.estimated_delivery || ''}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Status Note (Optional)</label><input type="text" id="us-note" placeholder="e.g. Package picked up from warehouse" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Location (Optional)</label><input type="text" id="us-location" placeholder="e.g. New York, USA" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>${s.history?.length ? `<div class="pt-3 border-t border-blue-500/10"><h4 class="text-xs font-bold text-white uppercase tracking-wide mb-3 flex items-center gap-2"><i data-lucide="history" class="w-4 h-4 text-blue-400"></i> Status History</h4><div class="space-y-2 max-h-40 overflow-y-auto scrollbar-none">${s.history.map(h => `<div class="flex items-start gap-2.5 p-2.5 bg-blue-950/30 border border-blue-500/10 rounded-xl"><div class="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0"></div><div class="flex-1 min-w-0"><p class="text-xs text-gray-200 font-medium capitalize">${h.status.replace(/_/g,' ')}${h.location ? ' · ' + h.location : ''}</p>${h.note ? `<p class="text-[10px] text-gray-500 mt-0.5">${h.note}</p>` : ''}<p class="text-[10px] text-gray-500 mt-0.5">${formatDateTime(h.created_at)} · ${h.created_by}</p></div></div>`).join('')}</div></div>` : ''}<div class="flex gap-3 pt-2"><button type="submit" class="btn-press flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">Update Shipment</button><button type="button" onclick="closeModal()" class="btn-press px-5 py-3 bg-blue-950/60 border border-blue-500/20 text-gray-400 font-bold rounded-xl text-sm uppercase transition relative overflow-hidden">Close</button></div></form>` : `<p class="text-sm text-gray-500 mb-4">No shipment found for this order. Create one?</p><button onclick="closeModal();showCreateShipmentModal()" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">Create Shipment</button>`}</div></div>`;
    if (window.lucide) lucide.createIcons();
    document.querySelectorAll('.btn-press').forEach(ripple);
    document.getElementById('update-shipment-form')?.addEventListener('submit', updateShipment);
  } catch (err) {
    modal.innerHTML = `<div class="modal-overlay fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onclick="closeModal()"><div class="modal-content glass border border-blue-500/20 rounded-2xl p-6 max-w-md w-full"><p class="text-sm text-red-400 mb-4">${err.message}</p><button onclick="closeModal()" class="btn-press w-full bg-blue-950/60 border border-blue-500/20 text-gray-400 font-bold py-3 rounded-xl text-sm uppercase transition relative overflow-hidden">Close</button></div></div>`;
    if (window.lucide) lucide.createIcons();
    document.querySelectorAll('.btn-press').forEach(ripple);
  }
};

window.showAddCourierModal = () => {
  const modal = document.getElementById('modal-container');
  modal.innerHTML = `<div class="modal-overlay fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onclick="closeModal(event)"><div class="modal-content glass border border-blue-500/20 rounded-2xl p-6 max-w-md w-full" onclick="event.stopPropagation()"><h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2"><i data-lucide="truck" class="w-5 h-5 text-blue-400"></i> Add Custom Courier</h3><form id="add-courier-form" class="space-y-4"><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Courier Name *</label><input type="text" id="ac-name" required placeholder="e.g. Aramex" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Code *</label><input type="text" id="ac-code" required placeholder="e.g. ARX" maxlength="6" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 uppercase"></div><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Tracking URL Template</label><input type="text" id="ac-tracking-url" placeholder="https://track.com/?id={tracking_number}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Logo URL (Optional)</label><input type="text" id="ac-logo-url" placeholder="https://example.com/logo.png" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div><div class="flex gap-3 pt-2"><button type="submit" class="btn-press flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">Add Courier</button><button type="button" onclick="closeModal()" class="btn-press px-5 py-3 bg-blue-950/60 border border-blue-500/20 text-gray-400 font-bold rounded-xl text-sm uppercase transition relative overflow-hidden">Cancel</button></div></form></div></div>`;
  if (window.lucide) lucide.createIcons();
  document.querySelectorAll('.btn-press').forEach(ripple);
  document.getElementById('add-courier-form').addEventListener('submit', addCourier);
};

window.showAddMethodModal = () => {
  const modal = document.getElementById('modal-container');
  modal.innerHTML = `<div class="modal-overlay fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onclick="closeModal(event)"><div class="modal-content glass border border-blue-500/20 rounded-2xl p-6 max-w-md w-full" onclick="event.stopPropagation()"><h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2"><i data-lucide="tag" class="w-5 h-5 text-blue-400"></i> Add Shipping Method</h3><form id="add-method-form" class="space-y-4"><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Method Name *</label><input type="text" id="am-name" required placeholder="e.g. Same Day" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Code *</label><input type="text" id="am-code" required placeholder="e.g. same_day" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 lowercase"></div><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Description</label><input type="text" id="am-desc" placeholder="Fast same-day delivery" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div><div class="grid grid-cols-2 gap-4"><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Base Cost (USD)</label><input type="number" id="am-cost" step="0.01" value="0" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Sort Order</label><input type="number" id="am-sort" value="0" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div></div><div class="grid grid-cols-2 gap-4"><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Min Days</label><input type="number" id="am-min-days" value="1" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Max Days</label><input type="number" id="am-max-days" value="1" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div></div><div class="flex gap-3 pt-2"><button type="submit" class="btn-press flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">Add Method</button><button type="button" onclick="closeModal()" class="btn-press px-5 py-3 bg-blue-950/60 border border-blue-500/20 text-gray-400 font-bold rounded-xl text-sm uppercase transition relative overflow-hidden">Cancel</button></div></form></div></div>`;
  if (window.lucide) lucide.createIcons();
  document.querySelectorAll('.btn-press').forEach(ripple);
  document.getElementById('add-method-form').addEventListener('submit', addMethod);
};

window.showEditMethodModal = (methodId) => {
  const m = state.methods.find(x => x.id === methodId);
  if (!m) return;
  const modal = document.getElementById('modal-container');
  modal.innerHTML = `<div class="modal-overlay fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onclick="closeModal(event)"><div class="modal-content glass border border-blue-500/20 rounded-2xl p-6 max-w-md w-full" onclick="event.stopPropagation()"><h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2"><i data-lucide="edit-3" class="w-5 h-5 text-blue-400"></i> Edit ${m.name}</h3><form id="edit-method-form" class="space-y-4"><input type="hidden" id="em-id" value="${m.id}"><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Method Name</label><input type="text" id="em-name" value="${m.name}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Description</label><input type="text" id="em-desc" value="${m.description || ''}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div><div class="grid grid-cols-2 gap-4"><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Base Cost (USD)</label><input type="number" id="em-cost" step="0.01" value="${m.base_cost}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Active</label><select id="em-active" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"><option value="true" ${m.is_active ? 'selected' : ''}>Yes</option><option value="false" ${!m.is_active ? 'selected' : ''}>No</option></select></div></div><div class="grid grid-cols-2 gap-4"><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Min Days</label><input type="number" id="em-min-days" value="${m.estimated_days_min}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div><div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Max Days</label><input type="number" id="em-max-days" value="${m.estimated_days_max}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div></div><div class="flex gap-3 pt-2"><button type="submit" class="btn-press flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">Save Changes</button><button type="button" onclick="closeModal()" class="btn-press px-5 py-3 bg-blue-950/60 border border-blue-500/20 text-gray-400 font-bold rounded-xl text-sm uppercase transition relative overflow-hidden">Cancel</button></div></form></div></div>`;
  if (window.lucide) lucide.createIcons();
  document.querySelectorAll('.btn-press').forEach(ripple);
  document.getElementById('edit-method-form').addEventListener('submit', updateMethod);
};

window.closeModal = (e) => {
  if (e && e.target !== e.currentTarget) return;
  document.getElementById('modal-container').innerHTML = '';
};

window.switchTab = (tab) => { state.tab = tab; render(); };

async function createShipment(e) {
  e.preventDefault();
  const orderNumber = document.getElementById('cs-order-number').value.trim();
  if (!orderNumber) return;
  try {
    await callShippingApi('create', 'POST', {
      order_number: orderNumber,
      courier_id: document.getElementById('cs-courier').value || null,
      shipping_method_id: document.getElementById('cs-method').value || null,
      shipping_cost: parseFloat(document.getElementById('cs-cost').value) || 0,
      estimated_delivery: document.getElementById('cs-est-delivery').value || null,
      shipping_address: document.getElementById('cs-address').value.trim() || null,
      admin_email: state.user?.email || 'admin',
    });
    closeModal(); await loadData(); render(); showToast('Shipment created successfully.');
  } catch (err) { showToast(err.message); }
}

async function updateShipment(e) {
  e.preventDefault();
  const orderNumber = document.getElementById('us-order-number').value;
  try {
    await callShippingApi('update', 'POST', {
      order_number: orderNumber,
      courier_id: document.getElementById('us-courier').value || null,
      tracking_number: document.getElementById('us-tracking').value.trim() || null,
      status: document.getElementById('us-status').value,
      estimated_delivery: document.getElementById('us-est-delivery').value || null,
      note: document.getElementById('us-note').value.trim() || null,
      location: document.getElementById('us-location').value.trim() || null,
      admin_email: state.user?.email || 'admin',
    });
    closeModal(); await loadData(); render(); showToast('Shipment updated successfully.');
  } catch (err) { showToast(err.message); }
}

async function addCourier(e) {
  e.preventDefault();
  try {
    await callShippingApi('add_courier', 'POST', {
      name: document.getElementById('ac-name').value.trim(),
      code: document.getElementById('ac-code').value.trim().toUpperCase(),
      tracking_url: document.getElementById('ac-tracking-url').value.trim() || null,
      logo_url: document.getElementById('ac-logo-url').value.trim() || null,
    });
    closeModal(); await loadData(); render(); showToast('Courier added successfully.');
  } catch (err) { showToast(err.message); }
}

async function addMethod(e) {
  e.preventDefault();
  try {
    await callShippingApi('add_method', 'POST', {
      name: document.getElementById('am-name').value.trim(),
      code: document.getElementById('am-code').value.trim().toLowerCase(),
      description: document.getElementById('am-desc').value.trim() || null,
      base_cost: parseFloat(document.getElementById('am-cost').value) || 0,
      estimated_days_min: parseInt(document.getElementById('am-min-days').value) || 3,
      estimated_days_max: parseInt(document.getElementById('am-max-days').value) || 7,
      sort_order: parseInt(document.getElementById('am-sort').value) || 0,
    });
    closeModal(); await loadData(); render(); showToast('Shipping method added successfully.');
  } catch (err) { showToast(err.message); }
}

async function updateMethod(e) {
  e.preventDefault();
  try {
    await callShippingApi('update_method', 'POST', {
      id: document.getElementById('em-id').value,
      name: document.getElementById('em-name').value.trim(),
      description: document.getElementById('em-desc').value.trim() || null,
      base_cost: parseFloat(document.getElementById('em-cost').value) || 0,
      is_active: document.getElementById('em-active').value === 'true',
      estimated_days_min: parseInt(document.getElementById('em-min-days').value) || 3,
      estimated_days_max: parseInt(document.getElementById('em-max-days').value) || 7,
    });
    closeModal(); await loadData(); render(); showToast('Shipping rate updated successfully.');
  } catch (err) { showToast(err.message); }
}

init();
