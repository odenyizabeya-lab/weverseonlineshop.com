import { supabase } from './supabase-client.js';
import { detectCurrency, getCountryByCode, SUPPORTED_CURRENCIES } from './country-data.js';

export const PAYMENT_SETTINGS_CACHE_KEY = 'kco_payment_settings_v1';
export const BANK_ACCOUNTS_CACHE_KEY = 'kco_bank_accounts_v1';

// High-value security rule: any order worth 1,000 USD (or the equivalent in
// EUR/GBP/any other supported currency) or more is paid ONLY by manual bank
// transfer. Card/ATM payment is offered for orders below this threshold.
// The business rule lives here as plain logic (not a secret) and is easily
// adjustable.
export const MANUAL_REQUIRED_THRESHOLD_USD = 1000;
export function isManualTransferRequired(totalUsd) {
  return (parseFloat(totalUsd) || 0) >= MANUAL_REQUIRED_THRESHOLD_USD;
}

export function getFlagEmojiFromCountryCode(code) {
  if (!code || code.length !== 2) return '🏦';
  const points = code.toUpperCase().split('').map(char => 0x1F1E6 + char.charCodeAt(0) - 65);
  try { return String.fromCodePoint(...points); } catch { return '🏦'; }
}

export function loadPaymentSettingsCache() {
  try {
    const raw = localStorage.getItem(PAYMENT_SETTINGS_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function savePaymentSettingsCache(settings) {
  try {
    localStorage.setItem(PAYMENT_SETTINGS_CACHE_KEY, JSON.stringify(settings));
  } catch {}
}

function normalizeAccount(account, index = 0) {
  const countryCode = account.country_code || account.flag || (account.currency === 'EUR' ? 'EU' : 'US');
  const country = account.country || getCountryByCode(countryCode)?.name || '';
  const currency = (account.currency || 'USD').toUpperCase();
  return {
    id: account.id || `bank-${index + 1}`,
    currency,
    currencyName: account.currencyName || account.currency_name || currency,
    flag: account.flag && account.flag.length > 2 ? account.flag : getFlagEmojiFromCountryCode(countryCode),
    country,
    country_code: countryCode,
    bankName: account.bankName || account.bank_name || '',
    transferType: account.transferType || account.transfer_type || 'Bank Transfer',
    beneficiary: account.beneficiary || account.accountName || account.account_name || '',
    accountNumber: account.accountNumber || account.account_number || '',
    accountType: account.accountType || account.account_type || '',
    iban: account.iban || '',
    swift: account.swift || '',
    routing: account.routing || '',
    sortCode: account.sortCode || account.sort_code || '',
    bankCode: account.bankCode || account.bank_code || '',
    branchCode: account.branchCode || account.branch_code || '',
    institutionNumber: account.institutionNumber || account.institution_number || '',
    transitNumber: account.transitNumber || account.transit_number || '',
    bsbCode: account.bsbCode || account.bsb_code || '',
    address: account.address || '',
  };
}

export function normalizeManualPaymentAccounts(accounts = []) {
  return accounts
    .map((account, index) => normalizeAccount(account, index))
    .filter(account => account.currency && (account.accountNumber || account.iban || account.swift || account.routing || account.sortCode || account.bankCode || account.branchCode || account.institutionNumber || account.transitNumber || account.bsbCode));
}

export function getLegacyManualPaymentAccounts(settings = {}) {
  const accounts = [];
  if (settings.bank1_account_name || settings.bank1_account_number || settings.bank1_bank_name) {
    accounts.push(normalizeAccount({
      id: 'bank-1',
      currency: settings.bank1_currency || 'USD',
      country: settings.bank1_country || getCountryByCode('US')?.name || 'United States',
      country_code: settings.bank1_country_code || 'US',
      bank_name: settings.bank1_bank_name,
      transfer_type: settings.bank1_transfer_type,
      account_name: settings.bank1_account_name,
      account_number: settings.bank1_account_number,
      sort_code: settings.bank1_sort_code,
    }, 0));
  }
  if (settings.bank2_account_name || settings.bank2_account_number || settings.bank2_bank_name) {
    accounts.push(normalizeAccount({
      id: 'bank-2',
      currency: settings.bank2_currency || 'USD',
      country: settings.bank2_country || getCountryByCode('US')?.name || 'United States',
      country_code: settings.bank2_country_code || 'US',
      bank_name: settings.bank2_bank_name,
      transfer_type: settings.bank2_transfer_type,
      account_name: settings.bank2_account_name,
      account_number: settings.bank2_account_number,
      sort_code: settings.bank2_sort_code,
    }, 1));
  }
  return accounts;
}

export function getManualPaymentAccounts(settings = {}) {
  const current = normalizeManualPaymentAccounts(settings.manual_payment_accounts || []);
  if (current.length > 0) return current;
  const legacy = getLegacyManualPaymentAccounts(settings);
  if (legacy.length > 0) return legacy;
  return [];
}

// Loads the ACTIVE bank accounts from the locked `bank_accounts` table via the
// SECURITY DEFINER RPC. The RPC is the only public window into these details —
// nothing lives in the client bundle. Falls back to any admin-configured
// jsonb/legacy values in site_settings (migrated data), and to a short
// localStorage cache for offline resilience.
let _bankCache = null;
export async function getActiveBankAccounts() {
  if (_bankCache) return _bankCache;
  let fromCache = true;
  try {
    const raw = localStorage.getItem(BANK_ACCOUNTS_CACHE_KEY);
    if (raw) {
      const c = JSON.parse(raw);
      if (c && Array.isArray(c.accounts) && c.ts && (Date.now() - c.ts) < 6 * 3600 * 1000) {
        _bankCache = c.accounts;
        return _bankCache;
      }
    }
  } catch {}
  let accounts = [];
  try {
    const { data, error } = await supabase.rpc('get_active_bank_accounts');
    if (!error && Array.isArray(data) && data.length) {
      accounts = normalizeManualPaymentAccounts(data);
      fromCache = false;
    }
  } catch {}
  if (!accounts.length) {
    const settings = await loadPaymentSettings();
    accounts = getManualPaymentAccounts(settings);
  }
  if (accounts.length) {
    _bankCache = accounts;
    if (!fromCache) {
      try { localStorage.setItem(BANK_ACCOUNTS_CACHE_KEY, JSON.stringify({ ts: Date.now(), accounts })); } catch {}
    }
  }
  return accounts;
}

export function getPaymentInstructions(settings = {}) {
  return settings.manual_payment_instructions || 'Transfer the exact order amount to the bank account shown below. After payment, upload your receipt for verification. Once your receipt is verified, your goods will be shipped immediately.';
}

export function getUsdFallbackAccount(accounts) {
  return accounts.find(account => account.currency === 'USD') || accounts[0] || null;
}

export function resolveAccountForCountry(accounts, countryCode, selectedCurrency) {
  const detectedCurrency = detectCurrency(countryCode);
  const currency = (selectedCurrency || detectedCurrency || 'USD').toUpperCase();
  if (!selectedCurrency && !detectedCurrency && countryCode && countryCode !== 'US') {
    const fallback = getUsdFallbackAccount(accounts);
    return { currency: fallback?.currency || 'USD', account: fallback, isFallback: !!fallback };
  }
  const exact = accounts.find(account => account.currency === currency);
  if (exact) return { currency, account: exact, isFallback: false };
  const fallback = getUsdFallbackAccount(accounts);
  return { currency: fallback?.currency || 'USD', account: fallback, isFallback: !!fallback };
}

export async function loadPaymentSettings() {
  const cached = loadPaymentSettingsCache() || {};
  try {
    const { data, error } = await supabase.from('site_settings').select('*').limit(1).maybeSingle();
    if (error) return { ...cached, _source: 'cache' };
    const merged = { ...cached, ...(data || {}) };
    savePaymentSettingsCache(merged);
    return { ...merged, _source: 'db' };
  } catch {
    return { ...cached, _source: 'cache' };
  }
}

export function buildFallbackNotice(account, countryCode, requestedCurrency, instructions) {
  const country = getCountryByCode(countryCode);
  const requested = requestedCurrency || detectCurrency(countryCode) || 'USD';
  return {
    title: 'Use Our USD Receiving Account',
    message: `${country?.name || 'Your country'} is currently not mapped to a dedicated receiving account in ${requested}. Please use our United States Dollar (USD) receiving account. Your bank will convert your local currency automatically. After payment, upload your receipt for verification so your goods can be shipped immediately.`,
    account,
    instructions: instructions || getPaymentInstructions({}),
  };
}

export function getSupportedCurrenciesFromAccounts(accounts) {
  const currencies = [...new Set(accounts.map(account => account.currency).filter(Boolean))];
  return currencies.length > 0 ? currencies : SUPPORTED_CURRENCIES;
}