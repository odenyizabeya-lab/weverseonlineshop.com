// Old built-in phone listings have been removed.
// The showroom shows only the products the owner uploads (database-driven).

export const PHONE_LISTINGS = [];

export function getPhoneById(id) {
  return PHONE_LISTINGS.find((p) => p.property_id === id) || null;
}

// Brand showcase groups: one group per company, newest model first.
export function getPhoneBrandGroups() {
  const order = ['Apple', 'Samsung', 'Google', 'Xiaomi', 'OnePlus'];
  return order
    .map((brand) => ({ brand, phones: PHONE_LISTINGS.filter((p) => p.brand === brand) }))
    .filter((g) => g.phones.length > 0);
}