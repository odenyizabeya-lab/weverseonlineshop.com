// On-device shopping cart. Uses the same `kco_cart` localStorage key as the
// details page, showroom cards and checkout so every entry point stays in sync.
//
// Format: array of { id, qty }. Legacy string arrays (plain property ids) are
// migrated automatically on read so existing carts are never lost.

const CART_KEY = 'kco_cart';

export function readCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    if (!Array.isArray(raw)) return [];
    const items = [];
    for (const entry of raw) {
      if (typeof entry === 'string') {
        items.push({ id: entry, qty: 1 });
      } else if (entry && typeof entry === 'object' && entry.id) {
        items.push({ id: entry.id, qty: Math.max(1, parseInt(entry.qty, 10) || 1) });
      }
    }
    return items;
  } catch {
    return [];
  }
}

export function saveCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch { /* storage unavailable */ }
  emitCartChanged();
}

export function emitCartChanged() {
  window.dispatchEvent(new CustomEvent('kco-cart-changed', { detail: { count: getCartCount() } }));
}

export function getCartCount() {
  return readCart().reduce((sum, item) => sum + item.qty, 0);
}

export function addToCart(id, qty = 1) {
  if (!id) return;
  const items = readCart();
  const existing = items.find((i) => i.id === id);
  if (existing) existing.qty = Math.min(99, existing.qty + qty);
  else items.push({ id, qty });
  saveCart(items);
}

export function setCartQty(id, qty) {
  const items = readCart();
  const existing = items.find((i) => i.id === id);
  if (!existing) return;
  existing.qty = Math.max(1, Math.min(99, parseInt(qty, 10) || 1));
  saveCart(items);
}

export function removeFromCart(id) {
  saveCart(readCart().filter((i) => i.id !== id));
}

export function clearCart() {
  saveCart([]);
}