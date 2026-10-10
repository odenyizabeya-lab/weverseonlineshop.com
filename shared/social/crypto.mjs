// AES-256-GCM encryption for social access/refresh tokens.
// The key (SOCIAL_TOKEN_ENC_KEY) lives ONLY in server environment variables.
// Ciphertext is stored in the database; plaintext never leaves the server.
import crypto from 'crypto';

function getKey() {
  const raw = process.env.SOCIAL_TOKEN_ENC_KEY || '';
  if (!raw) {
    throw new Error('SOCIAL_TOKEN_ENC_KEY is not set. Tokens cannot be securely stored.');
  }
  // Accept any length >= 32 chars; hash to a fixed 32 bytes.
  return crypto.createHash('sha256').update(raw).digest();
}

export function encryptToken(plaintext) {
  if (plaintext == null || plaintext === '') return null;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', getKey(), iv);
  const enc = Buffer.concat([cipher.update(String(plaintext), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv, tag, enc].map((x) => x.toString('base64')).join('.');
}

export function decryptToken(payload) {
  if (!payload) return null;
  const parts = String(payload).split('.');
  if (parts.length !== 3) return null;
  try {
    const [ivB64, tagB64, dataB64] = parts;
    const decipher = crypto.createDecipheriv('aes-256-gcm', getKey(), Buffer.from(ivB64, 'base64'));
    decipher.setAuthTag(Buffer.from(tagB64, 'base64'));
    const dec = Buffer.concat([decipher.update(Buffer.from(dataB64, 'base64')), decipher.final()]);
    return dec.toString('utf8');
  } catch (err) {
    return null;
  }
}

export function sha256(input) {
  return crypto.createHash('sha256').update(String(input || '')).digest('hex');
}

export function randomToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString('base64url');
}