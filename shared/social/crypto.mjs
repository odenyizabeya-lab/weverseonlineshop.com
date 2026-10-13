// Token encryption for the Cloudflare Workers runtime.
//
// IMPORTANT: Workerd's `node:crypto` (unenv) does NOT implement
// createCipheriv/createDecipheriv, so AES-GCM must go through the Web Crypto
// API (globalThis.crypto.subtle), which IS fully supported. SHA-256 is
// implemented in pure JS so it can stay synchronous (used by the sync
// dedupeHash helper) and avoid the polyfill entirely.
//
// Ciphertext format:  v1.<base64(iv)>.<base64(ciphertext||tag)>
// The key (SOCIAL_TOKEN_ENC_KEY) lives ONLY in server environment variables.
// Plaintext never touches the database, responses, URLs or logs.

function enc(str) {
  return new TextEncoder().encode(str);
}

function toB64(bytes) {
  const b = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = '';
  for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
  return btoa(s);
}

function fromB64(b64) {
  const bin = atob(String(b64));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

// ── pure-JS SHA-256 (synchronous, no runtime crypto needed) ──────────
const K256 = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];

function rotr(x, n) {
  return ((x >>> n) | (x << (32 - n))) >>> 0;
}

function sha256Bytes(input) {
  const bytes = typeof input === 'string' ? enc(input) : (input instanceof Uint8Array ? input : enc(String(input)));
  const len = bytes.length;
  const withOne = len + 1;
  const pad = (56 - (withOne % 64) + 64) % 64;
  const total = withOne + pad + 8;
  const buf = new Uint8Array(total);
  buf.set(bytes);
  buf[len] = 0x80;
  const dv = new DataView(buf.buffer);
  const bits = len * 8;
  dv.setUint32(total - 8, Math.floor(bits / 0x100000000));
  dv.setUint32(total - 4, bits >>> 0);

  let h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
  let h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;
  const w = new Uint32Array(64);

  for (let off = 0; off < total; off += 64) {
    for (let i = 0; i < 16; i++) w[i] = dv.getUint32(off + i * 4);
    for (let i = 16; i < 64; i++) {
      const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
    }
    let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7;
    for (let i = 0; i < 64; i++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const ch = (e & f) ^ (~e & g);
      const t1 = (h + S1 + ch + K256[i] + w[i]) >>> 0;
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (S0 + maj) >>> 0;
      h = g; g = f; f = e; e = (d + t1) >>> 0;
      d = c; c = b; b = a; a = (t1 + t2) >>> 0;
    }
    h0 = (h0 + a) >>> 0; h1 = (h1 + b) >>> 0; h2 = (h2 + c) >>> 0; h3 = (h3 + d) >>> 0;
    h4 = (h4 + e) >>> 0; h5 = (h5 + f) >>> 0; h6 = (h6 + g) >>> 0; h7 = (h7 + h) >>> 0;
  }

  const out = new Uint8Array(32);
  const odv = new DataView(out.buffer);
  [h0, h1, h2, h3, h4, h5, h6, h7].forEach((v, i) => odv.setUint32(i * 4, v));
  return out;
}

export function sha256(input) {
  return Array.from(sha256Bytes(String(input || '')))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function randomToken(bytes = 32) {
  const b = new Uint8Array(bytes);
  globalThis.crypto.getRandomValues(b);
  return toB64(b).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// ── AES-256-GCM via Web Crypto ──────────────────────────────────────
const PREFIX = 'v1.';
let keyPromise = null;

function getKey() {
  const raw = process.env.SOCIAL_TOKEN_ENC_KEY || '';
  if (!raw) {
    throw new Error('SOCIAL_TOKEN_ENC_KEY is not set. Tokens cannot be securely stored.');
  }
  if (!globalThis.crypto || !globalThis.crypto.subtle) {
    throw new Error('Web Crypto API (crypto.subtle) is unavailable in this runtime.');
  }
  if (!keyPromise) {
    // Hash any-length key material to a fixed 32 bytes.
    const keyBytes = sha256Bytes(raw);
    keyPromise = globalThis.crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
  }
  return keyPromise;
}

export async function encryptToken(plaintext) {
  if (plaintext == null || plaintext === '') return null;
  const key = await getKey();
  const iv = new Uint8Array(12);
  globalThis.crypto.getRandomValues(iv);
  const ct = new Uint8Array(await globalThis.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc(String(plaintext))));
  return `${PREFIX}${toB64(iv)}.${toB64(ct)}`;
}

export async function decryptToken(payload) {
  if (!payload) return null;
  const s = String(payload);
  if (s.startsWith(PREFIX)) {
    try {
      const [ivB64, ctB64] = s.slice(PREFIX.length).split('.');
      if (!ivB64 || !ctB64) return null;
      const key = await getKey();
      const pt = await globalThis.crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(ivB64) }, key, fromB64(ctB64));
      return new TextDecoder().decode(pt);
    } catch {
      return null;
    }
  }
  // Legacy node:crypto 3-part format. Not decryptable in the Workers runtime
  // (and the key was rotated), so returns null rather than throwing.
  return legacyDecrypt(s);
}

async function legacyDecrypt(s) {
  try {
    const parts = s.split('.');
    if (parts.length !== 3) return null;
    const nodeCrypto = await import('node:crypto');
    if (typeof nodeCrypto.createDecipheriv !== 'function') return null;
    const raw = process.env.SOCIAL_TOKEN_ENC_KEY || '';
    if (!raw) return null;
    const key = nodeCrypto.createHash('sha256').update(raw).digest();
    const [ivB64, tagB64, dataB64] = parts;
    const decipher = nodeCrypto.createDecipheriv('aes-256-gcm', key, Buffer.from(ivB64, 'base64'));
    decipher.setAuthTag(Buffer.from(tagB64, 'base64'));
    const dec = Buffer.concat([decipher.update(Buffer.from(dataB64, 'base64')), decipher.final()]);
    return dec.toString('utf8');
  } catch {
    return null;
  }
}
