// Shared HTTP helpers for platform adapters.
export async function fetchJson(url, options = {}, timeoutMs = 60000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs || 60000);
  try {
    const res = await fetch(url, { signal: controller.signal, ...options });
    let body = null;
    try {
      body = await res.json();
    } catch {
      body = null;
    }
    return { status: res.status, ok: res.ok, body, headers: res.headers };
  } finally {
    clearTimeout(timer);
  }
}

export function pick(...values) {
  for (const v of values) {
    if (v !== undefined && v !== null && v !== '') return v;
  }
  return undefined;
}

export function postErr(message, code = 'PLATFORM_ERROR', httpStatus = 400) {
  const err = new Error(message);
  err.code = code;
  err.httpStatus = httpStatus;
  return err;
}

export function shortHeadline(text, max = 80) {
  const t = String(text || '').trim().replace(/\s+/g, ' ');
  return t.length > max ? `${t.slice(0, max - 1)}…` : t || 'New arrival';
}