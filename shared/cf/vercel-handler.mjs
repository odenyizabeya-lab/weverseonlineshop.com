// shared/cf/vercel-handler.mjs
// Adapts Cloudflare Pages Functions (Request + context) to the Node-style
// (req, res) signature that the legacy Vercel api/*.js handlers expect, so the
// original handler code runs on Cloudflare with zero changes.
//
//  • process.env is populated from the Pages bindings before the handler
//    module is imported (supabase-env.mjs and the platform adapters read
//    process.env at module-eval time).
//  • `req` mirrors a Vercel request: method, url, headers (lowercase keys),
//    query, a parsed body string (seo-audit reads req.body directly), and an
//    event-emitter interface so shared/social/http.mjs readBody() works.
//  • `res` collects statusCode/headers/end() into a Web Response.

export function installEnv(env) {
  const p = (typeof process !== 'undefined' && process) ? process : (globalThis.process = {});
  if (!p.env || typeof p.env !== 'object') p.env = {};
  for (const [k, v] of Object.entries(env || {})) {
    if (typeof v === 'string' && p.env[k] === undefined) {
      try { p.env[k] = v; } catch { /* read-only process.env in some runtimes */ }
    }
  }
  return p.env;
}

export async function runVercel(loader, context, extraQuery = {}) {
  installEnv(context.env);

  const request = context.request;
  const url = new URL(request.url);
  const query = {};
  url.searchParams.forEach((v, k) => { query[k] = v; });
  Object.assign(query, extraQuery);

  const headers = {};
  request.headers.forEach((v, k) => { headers[k.toLowerCase()] = v; });

  const readsBody = !['GET', 'HEAD'].includes(request.method);
  const rawBytes = readsBody ? new Uint8Array(await request.arrayBuffer()) : null;
  // Workerd's Buffer.concat rejects plain Uint8Arrays, so hand the emitter a
  // real Buffer (nodejs_compat provides the global) — shared/social/http.mjs
  // readBody() does Buffer.concat(chunks).
  const raw = rawBytes ? (typeof Buffer !== 'undefined' ? Buffer.from(rawBytes) : rawBytes) : null;
  const rawText = raw ? new TextDecoder().decode(rawBytes) : '';

  const req = {
    method: request.method,
    url: url.pathname + url.search,
    headers,
    query,
    body: rawText,
    on(event, cb) {
      if (event === 'data' && raw) cb(raw);
      else if (event === 'end') queueMicrotask(() => cb());
      return req;
    },
    destroy() {},
  };

  const outHeaders = {};
  let settled = false;
  let resolveResponse;
  const done = new Promise((r) => { resolveResponse = r; });

  const res = {
    statusCode: 200,
    setHeader(k, v) { outHeaders[String(k)] = v; },
    getHeader(k) { return outHeaders[String(k)]; },
    removeHeader(k) { delete outHeaders[String(k)]; },
    end(body) {
      if (settled) return;
      settled = true;
      resolveResponse(new Response(body == null ? '' : body, {
        status: res.statusCode,
        headers: outHeaders,
      }));
    },
    write() { return true; },
  };

  Promise.resolve(loader().then((mod) => mod.default(req, res))).catch((err) => {
    if (settled) return;
    settled = true;
    if (!outHeaders['Content-Type']) outHeaders['Content-Type'] = 'application/json; charset=utf-8';
    resolveResponse(new Response(
      JSON.stringify({ ok: false, error: (err && err.message) || String(err) }),
      { status: (err && err.status) || 500, headers: outHeaders },
    ));
  });

  return done;
}