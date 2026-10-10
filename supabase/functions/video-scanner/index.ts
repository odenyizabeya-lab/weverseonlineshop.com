// Supabase Edge Function: video-scanner
// Admin-only video analysis via Google Gemini's File API.
//
// Architecture (never trust the browser): the admin's browser uploads the video
// ONCE to a private Supabase Storage bucket (`video-scanner-files`) using a
// signed upload URL, so the video is never pushed through an Edge Function
// request body (free-tier Edge Functions cap request size well below a real
// video). This function then:
//   1. verifies the caller is an admin (is_current_user_admin),
//   2. streams the stored file out of Storage with the service role,
//   3. uploads it to the Gemini File API as a REAL video (motion + audio),
//   4. polls until the file reaches ACTIVE,
//   5. calls generateContent with the file_data part (real video inference),
//   6. parses the structured JSON answer and cleans up the temp Gemini file.
// The GEMINI_API_KEY never leaves the server.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

const GEMINI_BASE = 'https://generativelanguage.googleapis.com';

function nowMs() {
  return Date.now();
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Edge Functions must respond before the platform idle timeout (~150s) or the
// connection is dropped. We keep a strict global budget and fail with a clean
// 504 well before that, so the admin gets a readable message instead of a
// network error.
function remainingTime(deadline, label = 'The scan is taking too long and was cancelled. Try a shorter or smaller video.') {
  const left = deadline - nowMs();
  if (left <= 0) throw new TimeoutError(label);
  return left;
}

class TimeoutError extends Error {
  constructor(message) { super(message); this.name = 'TimeoutError'; }
}

// ---- Gemini File API -------------------------------------------------------

async function geminiUploadFile(apiKey, bytes, mimeType, displayName, deadline) {
  // Resumable upload: start -> upload bytes -> finalize.
  const startRes = await fetch(
    `${GEMINI_BASE}/upload/v1beta/files?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'X-Goog-Upload-Protocol': 'resumable',
        'X-Goog-Upload-Command': 'start',
        'X-Goog-Upload-Header-Content-Length': String(bytes.length),
        'X-Goog-Upload-Header-Content-Type': mimeType,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ file: { display_name: displayName, mime_type: mimeType } }),
      signal: AbortSignal.timeout(Math.min(30000, remainingTime(deadline))),
    },
  );
  const uploadUrl = startRes.headers.get('X-Goog-Upload-URL');
  if (!startRes.ok || !uploadUrl) {
    const text = await startRes.text().catch(() => '');
    throw new Error(`Gemini upload start failed (${startRes.status}): ${text.slice(0, 300)}`);
  }

  const upRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Length': String(bytes.length),
      'Content-Type': mimeType,
      'X-Goog-Upload-Command': 'upload, finalize',
      'X-Goog-Upload-Offset': '0',
    },
    body: bytes,
    signal: AbortSignal.timeout(Math.min(120000, remainingTime(deadline))),
  });
  const bodyText = await upRes.text();
  if (!upRes.ok) {
    throw new Error(`Gemini upload failed (${upRes.status}): ${bodyText.slice(0, 300)}`);
  }
  let file;
  try { file = JSON.parse(bodyText); } catch { throw new Error('Gemini upload returned malformed metadata'); }
  file = file?.file || file;
  if (!file?.name || !file?.uri) throw new Error('Gemini upload response missing file metadata');
  return file;
}

async function geminiWaitActive(apiKey, fileName, deadline) {
  while (remainingTime(deadline) > 0) {
    const res = await fetch(
      `${GEMINI_BASE}/v1beta/${fileName}?key=${apiKey}`,
      { signal: AbortSignal.timeout(Math.min(30000, remainingTime(deadline))) },
    );
    const data = await res.json().catch(() => ({}));
    if (data?.state === 'ACTIVE') return data;
    if (data?.state === 'FAILED') {
      throw new Error(`Gemini rejected the video: ${data?.error?.message || 'processing failed'}`);
    }
    await sleep(Math.min(3000, remainingTime(deadline)));
  }
  throw new TimeoutError('Timed out waiting for Gemini to finish processing the video (it may be too large).');
}

const MODEL_FALLBACKS = [
  'gemini-flash-latest',
  'gemini-3-flash-preview',
  'gemini-3.5-flash',
  'gemini-3.6-flash',
];

function dedupe(list) {
  return [...new Set(list.filter(Boolean))];
}

// Tries each model in order. Free tier limits are per-model (e.g. 20 requests
// per day for gemini-3.5-flash), so when one model is quota-exhausted (429) or
// overloaded (503) we fall through to the next one. 404 means the model alias
// is gone entirely.
async function geminiGenerateJson(apiKey, models, fileData, prompt, deadline) {
  const body = JSON.stringify({
    contents: [
      {
        role: 'user',
        parts: [
          { file_data: fileData },
          { text: prompt },
        ],
      },
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.3,
      maxOutputTokens: 8192,
    },
  });

  let lastErr = null;
  for (const model of models) {
    // up to 2 quick attempts per model, then move on
    for (let attempt = 0; attempt < 2; attempt++) {
      const left = remainingTime(deadline);
      const res = await fetch(
        `${GEMINI_BASE}/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
          signal: AbortSignal.timeout(Math.min(150000, left)),
        },
      );
      if (res.status === 429 || res.status === 503) {
        lastErr = new Error(`Gemini is busy (${res.status})`);
        const wait = Math.min(4000 * (attempt + 1), remainingTime(deadline));
        if (wait <= 0) break;
        await sleep(wait);
        continue;
      }
      if (res.status === 404) {
        // alias/model not available — try the next model
        lastErr = new Error(`Gemini model is not available (${model})`);
        break;
      }
      const respBody = await res.text();
      if (!res.ok) {
        throw new Error(`Gemini inference failed (${res.status}): ${respBody.slice(0, 300)}`);
      }
      let data;
      try { data = JSON.parse(respBody); } catch { throw new Error('Gemini inference returned malformed response'); }
      const text = data?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text || '')
        .join('')
        .trim();
      if (!text) throw new Error('Gemini returned no analysis text.');
      try { return JSON.parse(text); } catch { return { summary: text }; }
    }
  }
  throw new Error(lastErr?.message || 'Gemini is currently overloaded. Please try again in a few minutes.');
}

async function geminiDeleteFile(apiKey, fileName) {
  try {
    await fetch(`${GEMINI_BASE}/v1beta/${fileName}?key=${apiKey}`, { method: 'DELETE', signal: AbortSignal.timeout(15000) });
  } catch { /* best-effort cleanup */ }
}

// ---- Scan logic ------------------------------------------------------------

const SYSTEM_PROMPT = `You are the Weverse Online Shop video inspector.
A seller uploaded a real video clip (motion + audio) for a listing review.
Watch the WHOLE video carefully, including the audio track and any text on screen.

Return STRICT JSON only, with exactly these fields:
{
  "status": "ok" | "cannot_determine" | "error",
  "overall_analysis": string (2-5 sentences describing exactly what the video shows),
  "confidence": number 0-100 (your confidence in the analysis),
  "detected": boolean (true if a concrete product/vehicle/room/item is clearly visible),
  "label": string (short noun phrase: the single most likely subject, e.g. "Blue 2020 boat", "Modern living room"),
  "observations": [ { "time": "mm:ss", "note": string } ],
  "sections": [ { "time": "mm:ss", "title": string, "description": string } ],
  "audio_notes": string (what is said or heard, if anything),
  "warnings": [string],
  "reason_if_cannot_determine": string (empty when status=ok)
}

Rules:
- Only describe what you actually SEE and HEAR in the video. Never invent details.
- If the clip is blurry, too dark, has no clear subject, is a black screen, or it is
  impossible to reliably describe or verify content, set status="cannot_determine",
  leave detected=false, give an honest reason, low confidence, and DO NOT guess.
- If the video is offensive/illegal/unrelated to a product listing, say so in warnings.
- Timestamps must reference real moments you observed.`;

async function runGeminiScan(apiKey, bytes, mimeType, models, question, deadline) {
  const file = await geminiUploadFile(apiKey, bytes, mimeType, `weverse-scan-${Date.now()}`, deadline);
  try {
    await geminiWaitActive(apiKey, file.name, deadline);
    const prompt = `${SYSTEM_PROMPT}\n\n${question ? `Reviewer question: ${question}\n` : ''}Produce the JSON analysis.`;
    const result = await geminiGenerateJson(
      apiKey,
      models,
      { mime_type: file.mimeType || mimeType, file_uri: file.uri },
      prompt,
      deadline,
    );
    return normalizeResult(result);
  } finally {
    await geminiDeleteFile(apiKey, file.name);
  }
}

async function scanVideo(serviceClient, path, models, question) {
  // ~150s platform idle timeout; keep 15s of headroom so we can always write a
  // response (even a 504) back to the admin.
  const deadline = nowMs() + 135000;
  const { data: blob, error: dlErr } = await serviceClient.storage.from('video-scanner-files').download(path);
  if (dlErr || !blob) throw new Error('Could not read the uploaded video from storage.');
  const bytes = new Uint8Array(await blob.arrayBuffer());
  if (bytes.length === 0) throw new Error('The uploaded video is empty.');
  // Free-tier Edge Functions have a 256MB memory cap — refuse absurdly huge files.
  if (bytes.length > 180 * 1024 * 1024) throw new Error('Video too large (over 180MB).');

  const mimeType = blob.type || inferMime(path);
  const apiKey = Deno.env.get('GEMINI_API_KEY') || '';
  if (!apiKey) throw new Error('Server Gemini API key is not configured.');

  return runGeminiScan(apiKey, bytes, mimeType, models, question, deadline);
}

// Persists a finished report onto the product so the admin UI can badge it later.
async function saveScan(listingId, result, serviceClient) {
  if (!listingId) return false;
  const { error: saveErr } = await serviceClient
    .from('showroom_listings')
    .update({ ai_video_scan: result })
    .eq('property_id', listingId)
    .single();
  return !saveErr;
}

// Scans a listing's EXISTING video straight from its public URL, so admins can
// analyze any product video right from the product manager without re-uploading.
async function scanVideoUrl(url, listingId, models, question, serviceClient) {
  const deadline = nowMs() + 135000;
  const cleanUrl = String(url || '').trim();
  if (!/^https?:\/\//i.test(cleanUrl)) throw new Error('Invalid video URL.');
  const res = await fetch(cleanUrl, { signal: AbortSignal.timeout(Math.min(60000, remainingTime(deadline))) });
  if (!res.ok) throw new Error(`Could not fetch the video (HTTP ${res.status}).`);
  const respType = String(res.headers.get('content-type') || '');
  const mimeType = (respType && respType.startsWith('video/')) ? respType.split(';')[0].trim() : inferMime(cleanUrl.split(/[?#]/)[0]);
  const bytes = new Uint8Array(await res.arrayBuffer());
  if (bytes.length === 0) throw new Error('The video is empty.');
  if (bytes.length > 180 * 1024 * 1024) throw new Error('Video too large (over 180MB).');

  const apiKey = Deno.env.get('GEMINI_API_KEY') || '';
  if (!apiKey) throw new Error('Server Gemini API key is not configured.');
  const result = await runGeminiScan(apiKey, bytes, mimeType, models, question, deadline);

  if (listingId) {
    const saved = await saveScan(listingId, result, serviceClient);
    return { result, saved };
  }
  return { result, saved: false };
}

function normalizeResult(r) {
  if (!r || typeof r !== 'object') {
    return { status: 'cannot_determine', overall_analysis: 'Gemini returned an unreadable response.', confidence: 0, detected: false, label: '', observations: [], sections: [], audio_notes: '', warnings: [], reason_if_cannot_determine: 'Model output could not be parsed.' };
  }
  return {
    status: r.status === 'ok' ? 'ok' : (r.status === 'error' ? 'error' : 'cannot_determine'),
    overall_analysis: String(r.overall_analysis || ''),
    confidence: Math.max(0, Math.min(100, Number(r.confidence) || 0)),
    detected: !!r.detected,
    label: String(r.label || ''),
    observations: Array.isArray(r.observations) ? r.observations.map((o) => ({ time: String(o?.time || ''), note: String(o?.note || '') })) : [],
    sections: Array.isArray(r.sections) ? r.sections.map((s) => ({ time: String(s?.time || ''), title: String(s?.title || ''), description: String(s?.description || '') })) : [],
    audio_notes: String(r.audio_notes || ''),
    warnings: Array.isArray(r.warnings) ? r.warnings.map((w) => String(w)) : [],
    reason_if_cannot_determine: String(r.reason_if_cannot_determine || ''),
  };
}

function inferMime(path) {
  const p = String(path || '').toLowerCase();
  if (p.endsWith('.webm')) return 'video/webm';
  if (p.endsWith('.mov')) return 'video/quicktime';
  if (p.endsWith('.m4v')) return 'video/x-m4v';
  if (p.endsWith('.mp4')) return 'video/mp4';
  return 'video/mp4';
}

// ---- Request handling --------------------------------------------------------

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);

  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
  const authHeader = req.headers.get('Authorization') || '';

  const userClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } });
  const { data: ud, error: uerr } = await userClient.auth.getUser();
  if (uerr || !ud?.user) return jsonResponse({ error: 'Authentication required' }, 401);
  const { data: isAdmin } = await userClient.rpc('is_current_user_admin');
  if (!isAdmin) return jsonResponse({ error: 'Administrator access required' }, 403);

  const serviceClient = createClient(supabaseUrl, serviceRoleKey);

  let body = {};
  try { body = await req.json(); } catch {}

  const action = String(body.action || urlParam(req, 'action') || '');

  try {
    if (action === 'upload_token') {
      const path = String(body.path || '').trim();
      if (!path) return jsonResponse({ error: 'Missing upload path' }, 400);
      const { data: signed, error: sigErr } = await serviceClient.storage
        .from('video-scanner-files')
        .createSignedUploadUrl(path);
      const signedUrl = signed?.signedUrl;
      if (sigErr || !signedUrl) return jsonResponse({ error: 'Could not create upload URL.' }, 500);
      return jsonResponse({ ok: true, path, url: signedUrl, token: signed?.token || null });
    }

    if (action === 'scan') {
      const path = String(body.path || '').trim();
      if (!path) return jsonResponse({ error: 'Missing video path' }, 400);
      const listingId = String(body.listing_id || '').trim() || null;
      const models = dedupe([
        String(body.model || '').trim(),
        Deno.env.get('GEMINI_MODEL') || '',
        ...MODEL_FALLBACKS,
      ]);
      const question = String(body.question || '').trim().slice(0, 2000);
      const startedAt = nowMs();
      const result = await scanVideo(serviceClient, path, models, question);
      const saved = await saveScan(listingId, result, serviceClient);
      const keepFile = !!body.keep_file;
      if (!keepFile) await serviceClient.storage.from('video-scanner-files').remove([path]).catch(() => {});
      return jsonResponse({ ok: true, result, saved, elapsed_ms: nowMs() - startedAt });
    }

    if (action === 'scan_url') {
      const url = String(body.url || '').trim();
      if (!url) return jsonResponse({ error: 'Missing video URL' }, 400);
      const listingId = String(body.listing_id || '').trim() || null;
      const models = dedupe([
        String(body.model || '').trim(),
        Deno.env.get('GEMINI_MODEL') || '',
        ...MODEL_FALLBACKS,
      ]);
      const question = String(body.question || '').trim().slice(0, 2000);
      const startedAt = nowMs();
      const { result, saved } = await scanVideoUrl(url, listingId, models, question, serviceClient);
      return jsonResponse({ ok: true, result, saved, elapsed_ms: nowMs() - startedAt });
    }

    if (action === 'cleanup') {
      const path = String(body.path || '').trim();
      if (path) await serviceClient.storage.from('video-scanner-files').remove([path]).catch(() => {});
      return jsonResponse({ ok: true });
    }

    return jsonResponse({ error: `Unknown action: ${action}` }, 400);
  } catch (err) {
    if (err?.name === 'TimeoutError') {
      return jsonResponse({ error: 'The scan timed out. Try a shorter or smaller video.' }, 504);
    }
    return jsonResponse({ error: String(err?.message || err) }, 500);
  }
});

function urlParam(req, key) {
  try { return new URL(req.url).searchParams.get(key) || ''; } catch { return ''; }
}