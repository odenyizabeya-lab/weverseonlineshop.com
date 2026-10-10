// Admin / internal authentication for the social publishing API routes.
import { getServiceClient } from './db.mjs';

function parseBearer(authorization) {
  const m = /^Bearer\s+(.+)$/i.exec(String(authorization || ''));
  return m ? m[1].trim() : null;
}

// Validates the caller is a signed-in admin for this marketplace.
// Accepts a user access token (the Supabase anon JWT issued to the browser).
export async function verifyAdmin(authorization) {
  const token = parseBearer(authorization);
  if (!token) throw adminError(401, 'Missing authorization token.');
  const sb = getServiceClient();
  const { data, error } = await sb.auth.getUser(token);
  if (error || !data?.user) throw adminError(401, 'Invalid or expired session. Sign in again.');
  const { data: isAdmin, error: rpcErr } = await sb.rpc('is_current_user_admin');
  if (rpcErr || isAdmin !== true) throw adminError(403, 'You do not have permission to manage social media.');
  return { user: data.user, token };
}

// Internal guard for cron/scheduler invocations.
// Returns true on a valid secret; never throws for a missing config so the
// caller can respond with a precise HTTP status.
export function verifyInternal(authorization) {
  const expected = process.env.SCHEDULER_CRON_SECRET || process.env.SOCIAL_INTERNAL_SECRET || '';
  if (!expected) return false;
  const token = parseBearer(authorization);
  if (token && token === expected) return true;
  return false;
}

export function adminError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}