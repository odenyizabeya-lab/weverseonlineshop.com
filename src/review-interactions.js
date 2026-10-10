// review-interactions.js — Persistent ❤️ likes and 💬 reply comments for the
// "What Buyers Say" customer review list.
//
// Guests can like and reply WITHOUT an account. Likes/replies are keyed by a
// stable per-comment key (`seed-*` for generated comments, `db-<id>` for
// real reviews from `product_reviews`). Persistence:
//   • server  — `review_likes` + `review_comments` tables (see
//               supabase/migrations/20260829000000_review_likes_and_replies.sql).
//               Used automatically once those tables exist.
//   • fallback — device-local storage when the tables aren't created yet or the
//                DB request fails. Same behaviour, but only saved on this device.

import { supabase } from './supabase-client.js';
import { getCurrentUser } from './auth.js';

let mode = 'pending'; // 'pending' | 'server' | 'local'
let currentUserCache = null;

const LS_LIKES = (pid) => `kco_review_likes_${pid}`;
const LS_COMMENTS = (pid) => `kco_review_comments_${pid}`;

function readLocal(key) {
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
}
function writeLocal(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

async function currentLikerId() {
  try {
    if (!currentUserCache) currentUserCache = (await getCurrentUser()) || null;
  } catch { currentUserCache = null; }
  if (currentUserCache && currentUserCache.id) return 'u:' + currentUserCache.id;
  try {
    let a = localStorage.getItem('kco_anon_id');
    if (!a) { a = 'anon-' + Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('kco_anon_id', a); }
    return a;
  } catch {
    return 'anon-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
  }
}

async function detectMode() {
  if (mode !== 'pending') return mode;
  try {
    const { error } = await supabase.from('review_likes').select('id').limit(1);
    const { error: err2 } = await supabase.from('review_comments').select('id').limit(1);
    mode = (error || err2) ? 'local' : 'server';
  } catch {
    mode = 'local';
  }
  return mode;
}

export async function loadReviewInteractions(propertyId) {
  const likes = new Map();
  const liked = new Set();
  const comments = new Map();
  const pid = String(propertyId || '');
  try {
    if ((await detectMode()) === 'server') {
      const [{ data: l }, { data: c }] = await Promise.all([
        supabase.from('review_likes').select('review_key, liker_id').eq('property_id', pid),
        supabase.from('review_comments').select('*').eq('property_id', pid).order('created_at', { ascending: true }),
      ]);
      const me = await currentLikerId();
      for (const row of l || []) {
        likes.set(row.review_key, (likes.get(row.review_key) || 0) + 1);
        if (row.liker_id === me) liked.add(row.review_key);
      }
      for (const row of c || []) {
        const arr = comments.get(row.review_key) || [];
        arr.push({ id: row.id, author: row.author, body: row.body, created_at: row.created_at });
        comments.set(row.review_key, arr);
      }
    } else {
      const lik = readLocal(LS_LIKES(pid)) || {};
      const myId = await currentLikerId();
      for (const [k, ids] of Object.entries(lik)) {
        const list = Array.isArray(ids) ? ids : [];
        likes.set(k, list.length);
        if (list.includes(myId)) liked.add(k);
      }
      const com = readLocal(LS_COMMENTS(pid)) || {};
      for (const [k, arr] of Object.entries(com)) {
        if (Array.isArray(arr)) comments.set(k, arr);
      }
    }
  } catch {}
  return { likes, liked, comments };
}

export async function toggleReviewLike(propertyId, reviewKey) {
  const pid = String(propertyId || '');
  const likedNow = false;
  try {
    const me = await currentLikerId();
    if ((await detectMode()) === 'server') {
      const { data } = await supabase.from('review_likes').select('id').eq('review_key', reviewKey).eq('liker_id', me).limit(1);
      if (data && data.length) {
        const { error } = await supabase.from('review_likes').delete().eq('review_key', reviewKey).eq('liker_id', me);
        return { liked: !error ? false : likedNow };
      }
      const { error } = await supabase.from('review_likes').insert({ property_id: pid, review_key: reviewKey, liker_id: me });
      return { liked: !error };
    }
    const lik = readLocal(LS_LIKES(pid)) || {};
    const list = Array.isArray(lik[reviewKey]) ? lik[reviewKey] : [];
    const idx = list.indexOf(me);
    if (idx >= 0) { list.splice(idx, 1); }
    else { list.push(me); }
    lik[reviewKey] = list;
    writeLocal(LS_LIKES(pid), lik);
    return { liked: idx < 0 };
  } catch {
    return { liked: likedNow };
  }
}

export async function addReviewComment(propertyId, reviewKey, author, body) {
  const pid = String(propertyId || '');
  const clean = String(body || '').trim().slice(0, 1000);
  const name = String(author || '').trim().slice(0, 40) || 'Guest';
  if (!clean) return null;
  try {
    if ((await detectMode()) === 'server') {
      const { data, error } = await supabase
        .from('review_comments')
        .insert({ property_id: pid, review_key: reviewKey, author: name, body: clean })
        .select('id, author, body, created_at')
        .single();
      if (!error && data) return data;
    }
  } catch {}
  const comment = { id: 'c_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8), author: name, body: clean, created_at: new Date().toISOString() };
  const store = readLocal(LS_COMMENTS(pid)) || {};
  const arr = Array.isArray(store[reviewKey]) ? store[reviewKey] : [];
  arr.push(comment);
  store[reviewKey] = arr;
  writeLocal(LS_COMMENTS(pid), store);
  return comment;
}

// ── Guest-written reviews ────────────────────────────────────────────────
// Visitors who are NOT signed in can still rate a product and write a review.
// The site first tries to save it to `product_reviews` (server, shared across
// all devices once the guest-review migration is applied) and falls back to
// this device-local store so the review ALWAYS shows up instantly at the top.
const LS_REVIEWS = (pid) => `kco_guest_reviews_${pid}`;

export function loadGuestReviews(propertyId) {
  const pid = String(propertyId || '');
  const arr = readLocal(LS_REVIEWS(pid));
  if (!Array.isArray(arr)) return [];
  return arr
    .filter(r => r && r.rating >= 1 && r.rating <= 5 && (r.text || r.comment))
    .map(r => ({
      ...r,
      _local: true,
      comment: r.comment || r.text,
      text: r.text || r.comment,
      name: r.name || '',
      rating: Math.max(1, Math.min(5, Math.round(Number(r.rating) || 0))),
    }))
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
}

export function addGuestReviewLocal(propertyId, review) {
  const pid = String(propertyId || '');
  const rating = Math.max(1, Math.min(5, Math.round(Number(review && review.rating) || 0)));
  const text = String(review && review.text || '').trim().slice(0, 2000);
  const name = String(review && review.name || '').trim().slice(0, 40);
  if (!rating || !text) return null;
  const entry = {
    id: 'gv_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8),
    rating,
    text,
    comment: text,
    name,
    created_at: new Date().toISOString(),
    _local: true,
  };
  const store = readLocal(LS_REVIEWS(pid));
  if (!Array.isArray(store)) return null;
  store.push(entry);
  writeLocal(LS_REVIEWS(pid), store);
  return entry;
}

// Removes the device-local copy of a review that was successfully saved to the
// server, so it is not shown twice after a reload (server row first).
export function removeGuestReviewLocal(propertyId, review) {
  const pid = String(propertyId || '');
  const rating = Math.max(1, Math.min(5, Math.round(Number(review && review.rating) || 0)));
  const text = String(review && review.text || '').trim();
  const store = readLocal(LS_REVIEWS(pid));
  if (!Array.isArray(store)) return;
  const next = store.filter(x => !(Math.round(Number(x.rating)) === rating && String(x.text || '').trim() === text));
  if (next.length !== store.length) writeLocal(LS_REVIEWS(pid), next);
}