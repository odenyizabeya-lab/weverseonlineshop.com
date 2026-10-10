// Supabase Edge Function: send-order-notification
// Dispatches queued order notification emails (rows in notification_log with
// status='queued', created by the payment_receipts trigger and the
// shipping-management function) via Resend. Degrades gracefully when no
// RESEND_API_KEY is configured — emails stay queued and flows never break.

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

function textToHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');
}

function layoutHtml(title, contentLines) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <body style="margin:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px;">
        <tr><td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
            <tr>
              <td style="background:linear-gradient(135deg,#2563eb,#3b82f6);padding:20px 28px;">
                <span style="color:#ffffff;font-size:20px;font-weight:800;">Weverse Online Shop</span>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;color:#1e293b;font-size:14px;line-height:1.6;">
                <h1 style="margin:0 0 12px;font-size:18px;color:#0f172a;">${textToHtml(title)}</h1>
                ${contentLines.map((l) => `<p style="margin:0 0 8px;">${textToHtml(l)}</p>`).join('')}
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px;background:#f8fafc;border-top:1px solid #eef2f7;color:#94a3b8;font-size:11px;">
                You are receiving this email about an order on Weverse Online Shop.
                Questions? <a href="https://weverseonlineshop.com/contact" style="color:#3b82f6;">Contact Us</a>.
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>`;
}

async function sendViaResend(apiKey, { to, from, fromName, replyTo, subject, body }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: fromName ? `${fromName} <${from}>` : from,
      to,
      reply_to: replyTo || undefined,
      subject,
      text: body,
      html: layoutHtml(subject, String(body || '').split(/\n+/).filter(Boolean)),
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(String(data?.message || `Resend returned ${res.status}`));
  return data;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);

  let payload = {};
  try { payload = await req.json(); } catch {}

  const resendKey = String(Deno.env.get('RESEND_API_KEY') || '').trim();
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
  if (!supabaseUrl || !serviceRoleKey) return jsonResponse({ error: 'Missing service config' }, 500);

  const serviceClient = createClient(supabaseUrl, serviceRoleKey);

  const orderNumber = String(payload?.order_number || '').trim();
  const dispatchAll = orderNumber === '__dispatch_pending__';

  // No provider configured — stay resilient.
  if (!resendKey) {
    return jsonResponse({ success: true, queued: 0, dispatched: 0, provider: 'noop', message: 'Email dispatch endpoint is configured (no email provider set).' });
  }

  const q = serviceClient.from('notification_log').select('*').eq('status', 'queued');
  if (!dispatchAll) q.eq('order_number', orderNumber);
  const { data: rows } = await q.order('created_at', { ascending: true }).limit(200);
  const queue = rows || [];

  // Sender preferences from site_settings.
  let site = {};
  try { const { data } = await serviceClient.from('site_settings').select('*').limit(1).maybeSingle(); site = data || {}; } catch {}
  const from = String(site.email_reply_to || site.contact_email || site.brand_email || 'support@weverseonlineshop.com').trim();
  const fromName = String(site.email_from_name || 'Weverse Online Shop').trim();

  let dispatched = 0;
  let failed = 0;
  const errors = [];
  for (const row of queue) {
    if (!row.recipient) { continue; }
    try {
      await sendViaResend(resendKey, {
        to: row.recipient,
        from,
        fromName,
        replyTo: from,
        subject: row.subject,
        body: row.body,
      });
      await serviceClient.from('notification_log').update({ status: 'sent', error: null }).eq('id', row.id);
      dispatched++;
    } catch (e) {
      failed++;
      errors.push(String(e?.message || e));
      await serviceClient.from('notification_log').update({ status: 'failed', error: String(e?.message || e) }).eq('id', row.id);
    }
  }

  return jsonResponse({
    success: true,
    queued_dispatched: queue.length,
    dispatched,
    failed,
    provider: 'resend',
    errors: errors.slice(0, 5),
  });
});