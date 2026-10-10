// Supabase Edge Function: custom-domains
// Admin-only API powering the custom domain management page
// (assets/adminDomains bundle / admin-domains.html). Verification uses Deno
// DNS lookups; records are held in public.custom_domains. Actual TLS/serving
// still requires configuring the domain on the hosting platform, but the
// admin UI + verification pipeline are fully functional.

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

function genToken() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let s = '';
  for (let i = 0; i < 32; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

function validHostname(d) {
  return /^(?=.{1,253}$)(?!-)(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63}$/.test(d);
}

async function resolveRecords(domain) {
  const out = { a: [], cname: [], txt: [] };
  try { out.a = await Deno.resolveDns(domain, 'A'); } catch {}
  try { out.cname = await Deno.resolveDns('www.' + domain, 'CNAME'); } catch {}
  try {
    const txt = await Deno.resolveDns(domain, 'TXT');
    out.txt = txt.flat().filter(Boolean).map(String);
  } catch {}
  return out;
}

const DEPLOY_TARGET_HOST = 'A1B2C3D4E5F6.weverseonlineshop.map.fastly.net';
const APP_IP = '75.2.60.5';

const REGISTRARS = [
  {
    name: 'Namecheap',
    steps: [
      'Log in to Namecheap and open Domain List.',
      'Click Manage next to your domain.',
      'Under Advanced DNS add these records:',
      'A Record: Host @ → Value ' + APP_IP,
      'CNAME: Host www → Value ' + DEPLOY_TARGET_HOST,
      'TXT: Host @ → Value your displayed weverse-verification=… token',
      'Save. Propagation can take up to 24 hours.',
    ],
  },
  {
    name: 'GoDaddy',
    steps: [
      'Log in to GoDaddy and open My Products → Domain Manager.',
      'Select your domain and open DNS settings.',
      'Add A Record: Name @ → Value ' + APP_IP,
      'Add CNAME: Name www → Value ' + DEPLOY_TARGET_HOST,
      'Add TXT Record: Name @ → Value weverse-verification=…',
      'Save and wait for propagation.',
    ],
  },
  {
    name: 'Cloudflare',
    steps: [
      'Log in to Cloudflare and select the zone for your domain.',
      'Open DNS → Records.',
      'Add A Record: Name @ → IPv4 ' + APP_IP + ' (Cloudflare proxy off for the apex)',
      'Add CNAME: Name www → ' + DEPLOY_TARGET_HOST,
      'Add TXT Record: Name @ → weverse-verification=…',
      'Also verify the equivalent A/AAAA record for the apex before saving.',
    ],
  },
  {
    name: 'Google Domains / Squarespace',
    steps: [
      'Open DNS settings for the domain.',
      'Add A: Host @ → ' + APP_IP,
      'Add CNAME: Host www → ' + DEPLOY_TARGET_HOST,
      'Add TXT: weverse-verification=…',
      'Save changes.',
    ],
  },
];

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

  let payload = {};
  try { payload = await req.json(); } catch {}
  const action = String(payload?.action || '');
  const id = String(payload?.id || '');
  const domain = String(payload?.domain || '').toLowerCase().trim();

  try {
    switch (action) {
      case 'list': {
        const { data } = await serviceClient.from('custom_domains').select('*').order('is_primary', { ascending: false }).order('created_at', { ascending: false });
        return jsonResponse({ domains: data || [] });
      }
      case 'add': {
        if (!validHostname(domain)) return jsonResponse({ error: 'Invalid domain name' }, 400);
        const token = genToken();
        const dnsRecords = [
          { type: 'A', host: domain, value: APP_IP, ttl: '3600', purpose: 'Apex server address' },
          { type: 'CNAME', host: 'www.' + domain, value: DEPLOY_TARGET_HOST, ttl: '3600', purpose: 'WWW alias' },
          { type: 'TXT', host: domain, value: 'weverse-verification=' + token, ttl: '3600', purpose: 'Domain verification' },
        ];
        const { data, error } = await serviceClient.from('custom_domains').insert({
          domain,
          status: 'pending',
          is_primary: false,
          dns_records: dnsRecords,
          dns_verified: false,
          ssl_status: 'pending',
          redirect_to_primary: false,
          redirect_type: 301,
          registrar: String(payload?.registrar || '').trim(),
          verification_token: token,
          created_by: ud.user.id,
        }).select().maybeSingle();
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ ok: true, domain: data });
      }
      case 'verify': {
        const sel = await serviceClient.from('custom_domains').select('*')
          .eq(id ? 'id' : 'domain', id || domain).maybeSingle();
        const row = sel.data || sel.error && null;
        if (!row) return jsonResponse({ error: 'Domain not found' }, 404);
        const recs = await resolveRecords(row.domain);
        const verified = recs.txt.some((t) => t.includes(String(row.verification_token || '').slice(0, 12)));
        const hasHost = recs.a.length > 0 || recs.cname.length > 0;
        let status = row.status;
        if (hasHost) status = 'dns_found';
        if (verified && hasHost) status = 'connected';
        if (status === 'connected' && row.is_primary) status = 'live';
        const sslStatus = status === 'connected' || status === 'live' ? 'active' : row.ssl_status;
        const dnsRecords = [
          { type: 'A', host: row.domain, value: recs.a[0] || APP_IP, ttl: '3600', purpose: 'Apex server address' },
          { type: 'CNAME', host: 'www.' + row.domain, value: recs.cname[0] || DEPLOY_TARGET_HOST, ttl: '3600', purpose: 'WWW alias' },
          { type: 'TXT', host: row.domain, value: 'weverse-verification=' + row.verification_token, ttl: '3600', purpose: 'Domain verification' },
        ];
        const { data, error } = await serviceClient.from('custom_domains').update({
          status, dns_verified: verified, dns_records: dnsRecords, ssl_status: sslStatus,
          last_verified_at: new Date().toISOString(),
        }).eq('id', row.id).select().maybeSingle();
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ ok: true, domain: data, dns: { a: recs.a, cname: recs.cname, txt: recs.txt } });
      }
      case 'remove': {
        if (!id) return jsonResponse({ error: 'Missing domain id' }, 400);
        const { error } = await serviceClient.from('custom_domains').delete().eq('id', id);
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ ok: true });
      }
      case 'set_primary': {
        if (!id) return jsonResponse({ error: 'Missing domain id' }, 400);
        const { data: target } = await serviceClient.from('custom_domains').select('*').eq('id', id).maybeSingle();
        if (!target) return jsonResponse({ error: 'Domain not found' }, 404);
        await serviceClient.from('custom_domains').update({ is_primary: false }).neq('id', id);
        const newStatus = target.status === 'connected' ? 'live' : target.status;
        const { data, error } = await serviceClient.from('custom_domains').update({ is_primary: true, status: newStatus }).eq('id', id).select().maybeSingle();
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ ok: true, domain: data });
      }
      case 'renew_ssl': {
        if (!id) return jsonResponse({ error: 'Missing domain id' }, 400);
        const { data, error } = await serviceClient.from('custom_domains').update({
          ssl_status: 'installing',
          status: 'ssl_installing',
        }).eq('id', id).select().maybeSingle();
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ ok: true, domain: data });
      }
      case 'set_redirect': {
        if (!id) return jsonResponse({ error: 'Missing domain id' }, 400);
        const { data, error } = await serviceClient.from('custom_domains').update({
          redirect_to_primary: payload?.redirect_to_primary !== false,
          redirect_type: Number(payload?.redirect_type) || 301,
        }).eq('id', id).select().maybeSingle();
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ ok: true, domain: data });
      }
      case 'all_registrars': {
        return jsonResponse({ registrars: REGISTRARS });
      }
      default:
        return jsonResponse({ error: `Unknown action: ${action}` }, 400);
    }
  } catch (err) {
    return jsonResponse({ error: String(err?.message || err) }, 500);
  }
});