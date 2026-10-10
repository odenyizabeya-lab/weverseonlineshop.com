// Old built-in car listings have been removed.
// The showroom shows only the products the owner uploads (database-driven).

export const CAR_LISTINGS = [];

export function getCarById(id) {
  return CAR_LISTINGS.find(c => c.property_id === id) || null;
}

export function formatCarPrice(price) {
  return Number(price || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}