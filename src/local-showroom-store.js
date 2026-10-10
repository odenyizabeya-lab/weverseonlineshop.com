const STORAGE_KEY = 'kco_local_showroom_listings_v1';

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readStore() {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStore(items) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function normalizeListing(listing) {
  return {
    ...listing,
    images: Array.isArray(listing.images) ? listing.images : [],
    features: Array.isArray(listing.features) ? listing.features : [],
    tags: Array.isArray(listing.tags) ? listing.tags : [],
    highlights: Array.isArray(listing.highlights) ? listing.highlights : [],
    seo_keywords: Array.isArray(listing.seo_keywords) ? listing.seo_keywords : [],
    price: Number(listing.price) || 0,
    is_active: listing.is_active !== false,
    created_at: listing.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function listLocalShowroomListings() {
  return readStore().map(normalizeListing).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

export function getLocalShowroomListingById(propertyId) {
  return listLocalShowroomListings().find(item => item.property_id === propertyId) || null;
}

export function upsertLocalShowroomListing(listing) {
  const items = readStore();
  const normalized = normalizeListing(listing);
  const index = items.findIndex(item => item.property_id === normalized.property_id);
  if (index >= 0) {
    items[index] = { ...items[index], ...normalized, created_at: items[index].created_at || normalized.created_at };
  } else {
    items.unshift(normalized);
  }
  writeStore(items);
  return normalized;
}

export function patchLocalShowroomListing(propertyId, updates) {
  const items = readStore();
  const index = items.findIndex(item => item.property_id === propertyId);
  if (index < 0) return null;
  items[index] = normalizeListing({ ...items[index], ...updates, property_id: propertyId, created_at: items[index].created_at });
  writeStore(items);
  return items[index];
}

export function removeLocalShowroomListing(propertyId) {
  const items = readStore().filter(item => item.property_id !== propertyId);
  writeStore(items);
  return true;
}