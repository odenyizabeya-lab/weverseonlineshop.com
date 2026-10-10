// /api/social/oauth — merged router for
//   /api/social/oauth/start    (GET: start official OAuth flow, redirect)
//   /api/social/oauth/callback (GET: exchange code, store encrypted tokens)
// /api/social/oauth/<step> is rewritten here by vercel.json, so the platform
// redirect URLs keep working. Merging keeps the project under Vercel's Hobby
// serverless-function cap (12 per deployment).
import { getServiceClient, siteUrl } from '../../shared/social/db.mjs';
import { randomToken, encryptToken } from '../../shared/social/crypto.mjs';
import { getAdapter, isPlatform } from '../../shared/social/registry.mjs';
import { redirect, json, html, corsHeaders } from '../../shared/social/http.mjs';

export const config = { maxDuration: 30 };

function route(req) {
  return String(req.query.__path || '');
}

function page(title, bodyHtml, extra = '') {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<style>
  body{font-family:Inter,system-ui,-apple-system,sans-serif;background:#0b1220;color:#e2e8f0;margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh}
  .card{background:#0f172a;border:1px solid rgba(59,130,246,.25);border-radius:20px;padding:32px;max-width:440px;width:92%;text-align:center}
  .icon{font-size:40px;margin-bottom:12px}
  h1{font-size:18px;margin:0 0 8px}
  p{font-size:13px;color:#94a3b8;line-height:1.55;margin:0 0 20px}
  a.btn{display:inline-block;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;font-weight:700;font-size:13px;text-decoration:none;padding:11px 20px;border-radius:12px}
  a.link{color:#60a5fa;font-size:12px;display:block;margin-top:12px;text-decoration:none}
</style></head><body>
<div class="card">
  <div class="icon">${extra}</div>
  <h1>${title}</h1>
  <p>${bodyHtml}</p>
  <a class="btn" href="/admin.html#social">Open Admin Dashboard</a>
  <a class="link" href="/">&#8592; Back to the store</a>
</div>
<script>try{sessionStorage.setItem('kco_social_connected','1')}catch(e){}</script>
</body></html>`;
}

function errPage(message) {
  return page('Connection not completed', `The OAuth flow was not completed. ${message || ''} You can try again from the dashboard.`, '&#9888;');
}

async function handleStart(req, res, cors) {
  const platform = String(req.query.platform || '');
  if (!isPlatform(platform)) return json(req, res, { ok: false, error: 'Unknown platform.' }, 400, cors);
  const adapter = getAdapter(platform);
  if (!adapter.metadata.usesOAuth || typeof adapter.buildAuthUrl !== 'function') {
    return json(req, res, { ok: false, error: `${adapter.metadata.label} does not use an OAuth redirect (token-based). Configure it in Platform Settings.` }, 400, cors);
  }
  if (!adapter.oauthAvailable()) {
    return json(req, res, { ok: false, error: `${adapter.metadata.label} API credentials are not configured. Set the server environment variables first (see .env.example).` }, 400, cors);
  }

  const sb = getServiceClient();
  const state = randomToken();
  const redirectUri = `${siteUrl(req)}/api/social/oauth/callback?platform=${encodeURIComponent(platform)}`;
  await sb.from('social_oauth_states').insert({
    platform,
    state,
    redirect_to: req.query.redirect || '/admin.html',
    expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
  }).select('id').maybeSingle();

  const url = adapter.buildAuthUrl({ redirectUri, state });
  return redirect(res, url);
}

async function handleCallback(req, res) {
  const platform = String(req.query.platform || '');
  const code = String(req.query.code || '');
  const state = String(req.query.state || '');
  const error = String(req.query.error || '');
  const errorDescription = String(req.query.error_description || '');

  if (!isPlatform(platform)) {
    res.statusCode = 400;
    return html(req, res, errPage('Unknown platform.'));
  }
  if (error) {
    res.statusCode = 400;
    return html(req, res, errPage(`The platform returned an error: ${error} ${errorDescription}`));
  }

  const sb = getServiceClient();
  try {
    const { data } = await sb.from('social_oauth_states').select('*').eq('state', state).maybeSingle();
    if (!data || data.platform !== platform) {
      res.statusCode = 400;
      return html(req, res, errPage('The authorization state was invalid or expired. Start a fresh connection.'));
    }
    await sb.from('social_oauth_states').delete().eq('state', state);

    const adapter = getAdapter(platform);
    if (!adapter.metadata.usesOAuth) {
      res.statusCode = 400;
      return html(req, res, errPage(`${adapter.metadata.label} does not use an OAuth redirect.`));
    }

    const redirectUri = `${siteUrl(req)}/api/social/oauth/callback?platform=${encodeURIComponent(platform)}`;
    const bundle = await adapter.exchangeCode({ code, redirectUri });

    let profile = null;
    let extra = {};
    try {
      if (typeof adapter.connectFromCode === 'function') {
        const conn = await adapter.connectFromCode({ token: bundle.accessToken });
        profile = conn.profile || null;
        extra = conn.extra || {};
      } else if (typeof adapter.getProfile === 'function') {
        profile = await adapter.getProfile(bundle.accessToken);
      } else if (typeof adapter.connectFromToken === 'function') {
        const conn = await adapter.connectFromToken({ token: bundle.accessToken });
        profile = conn.profile || null;
        extra = conn.extra || {};
      }
    } catch (profileErr) {
      profile = null;
    }

    const existing = await sb.from('social_accounts')
      .select('id')
      .eq('platform', platform)
      .maybeSingle();

    const accountPayload = {
      platform,
      platform_user_id: profile?.platformUserId || bundle.openId || null,
      account_name: profile?.displayName || null,
      display_name: profile?.displayName || null,
      avatar_url: profile?.avatarUrl || null,
      status: 'connected',
      access_token_enc: encryptToken(bundle.accessToken),
      refresh_token_enc: encryptToken(bundle.refreshToken),
      token_expires_at: bundle.tokenExpiresAt || null,
      refresh_token_expires_at: bundle.refreshTokenExpiresAt || null,
      scopes: bundle.scopes || [],
      raw_profile: profile ? JSON.parse(JSON.stringify(profile)) : {},
      extra: { ...(extra || {}), ...(profile?.extra || {}) },
      last_error: null,
      requires_approval: false,
      disconnected_at: null,
      updated_at: new Date().toISOString(),
    };

    if (existing?.id) {
      await sb.from('social_accounts').update(accountPayload).eq('id', existing.id);
    } else {
      await sb.from('social_accounts').insert(accountPayload).select('id').maybeSingle();
    }

    res.statusCode = 200;
    return html(req, res, page(
      `${adapter.metadata.label} connected`,
      `Your ${adapter.metadata.label} account was connected safely using the official OAuth flow. Access is stored encrypted on the server only.`,
      '&#9989;',
    ));
  } catch (err) {
    res.statusCode = 500;
    return html(req, res, errPage(err.message || 'Unknown error during connection.'));
  }
}

export default async function handler(req, res) {
  const cors = corsHeaders();
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', cors['Access-Control-Allow-Origin']);
    res.setHeader('Access-Control-Allow-Headers', cors['Access-Control-Allow-Headers']);
    res.setHeader('Access-Control-Allow-Methods', cors['Access-Control-Allow-Methods']);
    res.end('');
    return;
  }
  const r = route(req);
  try {
    if (r === '/api/social/oauth/start') return await handleStart(req, res, cors);
    if (r === '/api/social/oauth/callback') return await handleCallback(req, res);
    return json(req, res, { ok: false, error: 'Unknown OAuth step.' }, 404, cors);
  } catch (err) {
    return json(req, res, { ok: false, error: err.message || 'OAuth flow failed.' }, 500, cors);
  }
}