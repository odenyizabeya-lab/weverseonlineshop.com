// src/showroom-write.js — real database writes for the AI Video Scanner.
//
// Mirrors the battle-tested write path used by the Products Manager
// (src/admin-page.js) so AI-generated listings are stored exactly like
// hand-created ones:
//   1. sanitize to known showroom_listings columns,
//   2. try a direct Supabase upsert (RLS-permitted for admins),
//   3. fall back to the SECURITY DEFINER RPC `publish_showroom_upsert`,
//   4. degrade gracefully if a recently-added column is not migrated yet.
//
// It also handles product image uploads (public `product-images` bucket) and
// listing lookups for the drafts list.

import { supabase } from './supabase-client.js';

// Whitelist of real showroom_listings columns (kept in sync with admin-page.js).
export const SHOWROOM_COLUMNS = [
  'id', 'property_id', 'listing_type', 'category', 'subcategory', 'title', 'description',
  'price', 'price_period', 'currency', 'country', 'country_code', 'state', 'city', 'town',
  'product_location', 'latitude', 'longitude', 'bedrooms', 'bathrooms', 'building_size',
  'land_size', 'parking_spaces', 'property_type', 'furnished', 'listing_status', 'images',
  'features', 'tags', 'highlights', 'seo_keywords', 'specifications', 'brand', 'color',
  'size', 'condition', 'warranty', 'shipping_info', 'delivery_estimate', 'weight',
  'dimensions', 'storage_options', 'ram_options', 'color_options', 'availability_status',
  'stock_quantity', 'sku', 'is_active', 'is_featured', 'is_ai_generated',
  'ai_generated_fields', 'rating', 'rating_count', 'favorite_count', 'review_count',
  'video', 'video_url', 'approval_status', 'published_at', 'created_at', 'updated_at',
  'real_price', 'year_built', 'year_renovated', 'half_bathrooms', 'floors', 'garage',
  'zip_code', 'address', 'landmarks', 'interior_features', 'exterior_features',
  'home_systems', 'legal_info', 'risk_notes', 'floor_plan', 'nearby_area',
  'verification_status', 'verification_date', 'inspection_info', 'documents',
  'language_info', 'ai_video_scan', 'ai_form_schema', 'meta_description',
];

// Columns that may not exist until the latest migration is applied. If a write
// fails because of one of these we drop it and retry, so the listing still saves.
const OPTIONAL_COLUMNS = ['ai_form_schema', 'ai_video_scan', 'approval_status', 'published_at', 'is_featured'];

export function sanitizeShowroomPayload(obj, extraColumns = []) {
  const allowed = new Set([...SHOWROOM_COLUMNS, ...extraColumns]);
  const out = {};
  if (!obj || typeof obj !== 'object') return out;
  for (const k of Object.keys(obj)) {
    if (allowed.has(k)) out[k] = obj[k];
  }
  return out;
}

export function genPropertyId() {
  return 'W-' + String(Date.now()).slice(-6) + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
}

export function isRlsDenied(err) {
  if (!err) return false;
  const code = String(err.code || '');
  const msg = String(err.message || err.details || '').toLowerCase();
  return code === '42501' || code === 'PGRST301' || msg.includes('row-level security') || msg.includes('permission denied');
}

function missingColumn(err) {
  const msg = String(err?.message || err?.details || '').toLowerCase();
  const m = msg.match(/column\s+"?([a-z0-9_]+)"?/);
  if (m && (msg.includes('does not exist') || msg.includes('could not find'))) return m[1];
  if (msg.includes('does not exist') && msg.includes('column')) {
    for (const c of SHOWROOM_COLUMNS) if (msg.includes(c)) return c;
  }
  return null;
}

export function describeWriteError(err, label = 'Save') {
  if (!err) return `${label} failed for an unknown reason.`;
  const msg = String(err.message || err);
  if (/failed to fetch|networkerror|load failed/i.test(msg)) {
    return `${label} could not reach the database — check your internet connection and try again. Your form data is preserved.`;
  }
  if (isRlsDenied(err)) {
    return `${label} was blocked by the database security policy. Make sure you are signed in as an administrator and try again.`;
  }
  const col = missingColumn(err);
  if (col) return `${label} failed because the database is missing the "${col}" column. Apply the latest migration, then retry. Your form data is preserved.`;
  return `${label} failed: ${msg}. Your form data is preserved — please try again.`;
}

// Normalises timestamptz values so a text value can never break the write.
function normalizeTimestamps(payload) {
  const out = { ...payload };
  for (const k of ['created_at', 'updated_at', 'published_at']) {
    const v = out[k];
    if (v == null || v === '') { delete out[k]; continue; }
    if (typeof v === 'string') {
      const d = new Date(v);
      out[k] = Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
    } else if (v instanceof Date && !Number.isNaN(v.getTime())) {
      out[k] = v.toISOString();
    } else {
      delete out[k];
    }
  }
  return out;
}

// BULLETPROOF showroom write. Returns { error: null | Error, dropped: [...] }.
export async function safePublishShowroom(payload) {
  let attemptPayload = normalizeTimestamps(sanitizeShowroomPayload(payload));
  const dropped = [];

  for (let i = 0; i <= OPTIONAL_COLUMNS.length; i++) {
    const direct = { ...attemptPayload, updated_at: new Date().toISOString() };
    let directErr = null;
    if (direct.property_id) {
      const { error } = await supabase.from('showroom_listings').upsert(direct, { onConflict: 'property_id' });
      directErr = error;
    } else {
      const { error } = await supabase.from('showroom_listings').insert(direct);
      directErr = error;
    }
    if (!directErr) return { error: null, dropped };

    const col = missingColumn(directErr);
    if (col && OPTIONAL_COLUMNS.includes(col) && col in attemptPayload) {
      delete attemptPayload[col];
      dropped.push(col);
      continue; // retry without the unmigrated column
    }
    break;
  }

  // Fallback: SECURITY DEFINER RPC (bypasses RLS / column issues).
  try {
    const rpcPayload = { ...attemptPayload };
    delete rpcPayload.id;
    const { error: rpcErr } = await supabase.rpc('publish_showroom_upsert', { p_data: [rpcPayload] });
    if (rpcErr) {
      const col = missingColumn(rpcErr);
      if (col && OPTIONAL_COLUMNS.includes(col)) {
        delete rpcPayload[col];
        const retry = await supabase.rpc('publish_showroom_upsert', { p_data: [rpcPayload] });
        if (!retry.error) return { error: null, dropped: [...dropped, col] };
        return { error: retry.error, dropped };
      }
      return { error: rpcErr, dropped };
    }
    return { error: null, dropped };
  } catch (e) {
    return { error: e, dropped };
  }
}

// --- Media -------------------------------------------------------------------

async function compressImage(file, maxEdge = 1600, quality = 0.82) {
  if (typeof document === 'undefined') return file;
  try {
    const bitmap = await createImageBitmap(file);
    let { width, height } = bitmap;
    const scale = Math.min(1, maxEdge / Math.max(width, height));
    if (scale < 1) { width = Math.round(width * scale); height = Math.round(height * scale); }
    const canvas = document.createElement('canvas');
    canvas.width = width; canvas.height = height;
    canvas.getContext('2d').drawImage(bitmap, 0, 0, width, height);
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', quality));
    return blob || file;
  } catch {
    return file;
  }
}

// Uploads one image to the public product-images bucket. Falls back to a
// compressed inline data URL so an image is never lost.
export async function uploadProductImage(file) {
  const isImg = String(file?.type || '').startsWith('image/');
  let payload = file;
  if (isImg && file.size > 250 * 1024) payload = await compressImage(file);
  const ext = payload.type === 'image/png' ? 'png' : 'jpg';
  const base = `scans/${Date.now()}-${Math.random().toString(36).slice(2)}`;
  for (let attempt = 0; attempt < 2; attempt++) {
    const path = `${base}${attempt ? '-' + Math.random().toString(36).slice(2, 7) : ''}.${ext}`;
    try {
      const { error } = await supabase.storage
        .from('product-images')
        .upload(path, payload, { contentType: payload.type || 'image/jpeg', upsert: false, cacheControl: '3600' });
      if (!error) {
        const { data } = supabase.storage.from('product-images').getPublicUrl(path);
        if (data?.publicUrl) return data.publicUrl;
      }
    } catch { /* fall through to inline */ }
  }
  try {
    const small = await compressImage(payload, 1200, 0.72);
    const dataUrl = await new Promise((resolve) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = () => resolve(null);
      r.readAsDataURL(small);
    });
    if (dataUrl) return dataUrl;
  } catch { /* ignore */ }
  return null;
}

// Uploads an existing video file to the public bucket and returns its URL.
export async function uploadProductVideo(file) {
  const safe = String(file.name || 'video.mp4').slice(0, 100).replace(/[^\w.\-]+/g, '_');
  const path = `scans/${Date.now()}-${Math.random().toString(36).slice(2)}-${safe}`;
  try {
    const { error } = await supabase.storage
      .from('product-images')
      .upload(path, file, { contentType: file.type || 'video/mp4', upsert: false, cacheControl: '3600' });
    if (error) return null;
    const { data } = supabase.storage.from('product-images').getPublicUrl(path);
    return data?.publicUrl || null;
  } catch {
    return null;
  }
}

// --- Lookups / drafts --------------------------------------------------------

export async function getListing(propertyId) {
  const { data, error } = await supabase
    .from('showroom_listings')
    .select('*')
    .eq('property_id', propertyId)
    .maybeSingle();
  if (error) return null;
  return data || null;
}

// Drafts = AI-generated listings the admin has not published (inactive). Falls
// back to a plain inactive listing query if ai_form_schema is unavailable.
export async function listDrafts(limit = 50) {
  const { data, error } = await supabase
    .from('showroom_listings')
    .select('property_id,title,category,listing_type,price,currency,images,is_active,is_ai_generated,approval_status,ai_form_schema,created_at,updated_at')
    .eq('is_active', false)
    .eq('is_ai_generated', true)
    .order('updated_at', { ascending: false })
    .limit(limit);
  if (error) {
    const { data: fallback } = await supabase
      .from('showroom_listings')
      .select('property_id,title,category,listing_type,price,currency,images,is_active,created_at,updated_at')
      .eq('is_active', false)
      .eq('is_ai_generated', true)
      .order('created_at', { ascending: false })
      .limit(limit);
    return fallback || [];
  }
  return data || [];
}

export function productUrl(propertyId) {
  if (!propertyId) return '';
  return `${window.location.origin}/product/${encodeURIComponent(propertyId)}`;
}
