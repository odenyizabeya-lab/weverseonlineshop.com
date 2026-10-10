// fx.js — Live currency conversion (USD base) for correct regional pricing.
// Prices are stored in USD; when a visitor from Europe/Asia/etc. checks out we
// convert the total to their currency using real exchange rates so the amount
// they pay (and the bank account they use) always matches. Falls back to the
// USD number if rates cannot be fetched (offline / blocked network).

const FX_CACHE_KEY = 'kco_fx_rates_v1';
const FX_URL = 'https://open.er-api.com/v6/latest/USD';
const TTL = 24 * 60 * 60 * 1000;
const ZERO_DECIMAL = new Set(['JPY', 'KRW', 'VND', 'IDR', 'CLP', 'ISK', 'PYG', 'KWD', 'BHD', 'OMR']);

let rates = null;
let ratesPromise = null;

async function fetchRates() {
  try {
    const cached = JSON.parse(localStorage.getItem(FX_CACHE_KEY) || 'null');
    if (cached && cached.ts && Date.now() - cached.ts < TTL && cached.rates && typeof cached.rates === 'object') {
      return cached.rates;
    }
  } catch (e) { /* noop */ }
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(FX_URL, { signal: ctrl.signal });
    clearTimeout(t);
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.rates) {
      const r = data.rates;
      localStorage.setItem(FX_CACHE_KEY, JSON.stringify({ ts: Date.now(), rates: r }));
      return r;
    }
  } catch (e) { /* noop */ }
  return null;
}

// Preload rates once (cached). Call during checkout init so later conversions
// are synchronous and never delay the payment screen.
export async function preloadFx() {
  if (rates) return rates;
  if (!ratesPromise) ratesPromise = fetchRates().then(r => { rates = r; return r; });
  return ratesPromise;
}

// Convert a USD amount into the given currency using live rates.
// Returns the USD amount unchanged if rates are unavailable or the currency is
// USD. Rounds sensibly (no decimals for JPY/IDR/etc.).
export function convertFromUSD(usdAmount, currency) {
  const cur = (currency || 'USD').toUpperCase();
  const base = parseFloat(usdAmount) || 0;
  if (cur === 'USD') return base;
  const rate = rates && rates[cur];
  if (!rate) return base;
  const converted = base * rate;
  return ZERO_DECIMAL.has(cur) ? Math.round(converted) : Math.round(converted * 100) / 100;
}

// Format an amount in a currency: "1,299.00 EUR".
export function fmtLocal(amount, currency) {
  const n = parseFloat(amount) || 0;
  const cur = (currency || 'USD').toUpperCase();
  const dec = ZERO_DECIMAL.has(cur) ? 0 : 2;
  return `${n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec })} ${cur}`;
}

// Flutterwave only accepts a fixed set of currencies. Map any other currency to
// USD so card payments are never declined for an unsupported currency.
export function flwSupportedCurrency(currency) {
  const FLW = ['NGN', 'USD', 'GBP', 'EUR', 'GHS', 'KES', 'ZAR', 'ZMW', 'TZS', 'UGX', 'XAF', 'XOF'];
  const cur = (currency || 'USD').toUpperCase();
  return FLW.includes(cur) ? cur : 'USD';
}