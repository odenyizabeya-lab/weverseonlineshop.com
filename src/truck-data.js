// Truck listings — 30 latest-model trucks (2024–2026), photos from Wikimedia Commons.
// Each truck has its own dedicated set of 4 unique full-truck photos — no photo is reused.

const WM = (p) => `https://upload.wikimedia.org/wikipedia/commons/thumb/${p}`;

function buildGallery(paths) {
  return paths.map((p, i) => WM(p));
}

export const TRUCK_LISTINGS = [];

export function getTruckById(id) {
  return TRUCK_LISTINGS.find(t => t.property_id === id) || null;
}

export function formatTruckPrice(price) {
  const n = (price && typeof price === 'object') ? price.price : price;
  return Number(n || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}
