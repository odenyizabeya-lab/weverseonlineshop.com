// catalog.js — the deterministic generated catalog is DISABLED.
// Every generated/AI catalog listing is removed so old products can never
// reappear anywhere (showroom, details, checkout, payment, admin manager).
// The storefront now shows only the owner's real listings (database rows and
// locally-saved products). The API surface below is preserved so all existing
// imports keep working; every function simply returns an empty result.

export const CATALOG_CATEGORIES = [];

export function getCatalogCategory() {
  return null;
}

export function getCategoryCount() {
  return 0;
}

export function getCatalogCategories() {
  return [];
}

export function catalogIdFor() {
  return null;
}

export function generateProduct() {
  return null;
}

export function getCatalogProducts() {
  return [];
}

export function getCatalogSample() {
  return [];
}

export function findCatalogListingById() {
  return null;
}

export function generateListingById() {
  return null;
}

// Re-exports keep existing imports (showroom-cards, admin-page, etc.) working
// unchanged; the real implementation lives in catalog-hidden-store.js.
export { getHiddenCatalogIds, isCatalogListingHidden, isHiddenCatalogLoaded, loadHiddenCatalogIds, saveCatalogHidden, resetHiddenCatalogIds } from './catalog-hidden-store.js';