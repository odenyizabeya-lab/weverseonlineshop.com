// Supabase Edge Function: send-auth-email
// Sends transactional / notification emails for auth flows and the
// contact form via Resend (https://resend.com). If no RESEND_API_KEY is
// configured the endpoint stays resilient and returns success, so auth
// flows are never blocked.

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

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function layoutHtml(title, bodyHtml) {
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
                <h1 style="margin:0 0 12px;font-size:18px;color:#0f172a;">${title}</h1>
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px;background:#f8fafc;border-top:1px solid #eef2f7;color:#94a3b8;font-size:11px;">
                You are receiving this email because of activity on Weverse Online Shop. Questions? Reply to this email or visit <a href="https://weverseonlineshop.com/contact" style="color:#3b82f6;">Contact Us</a>.
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>`;
}

function buildEmail(payload) {
  const type = String(payload?.type || '').trim();
  const name = String(payload?.name || '').trim();
  const email = String(payload?.email || '').trim();
  const subject = String(payload?.subject || '').trim();
  const message = String(payload?.message || '').trim();

  const base = {
    verify_email: {
      subject: 'Verify your email — Weverse Online Shop',
      body: `<p>Hi${name ? ' ' + escapeHtml(name) : ''},</p><p>Thanks for creating an account with Weverse Online Shop. Please confirm your email address using the verification link sent by Supabase Auth, or contact our team if you need help.</p>`,
    },
    welcome: {
      subject: 'Welcome to Weverse Online Shop 🎉',
      body: `<p>Hi${name ? ' ' + escapeHtml(name) : ''},</p><p>Welcome to Weverse Online Shop — your trusted global store with worldwide delivery. Browse the marketplace, track orders, and enjoy secure payments.</p><p><a href="https://weverseonlineshop.com" style="color:#3b82f6;">Start shopping →</a></p>`,
    },
    login_notification: {
      subject: 'New sign-in to your account',
      body: `<p>Hi,</p><p>We noticed a new sign-in to your Weverse Online Shop account${email ? ' for ' + escapeHtml(email) : ''}.</p><p>If this was you, no action is needed. If it wasn't, please reset your password immediately.</p>`,
    },
  }[type];

  if (type === 'contact_form') {
    return {
      toAdmin: {
        subject: `New contact message: ${subject || 'General'}`,
        body: `<p><strong>Name:</strong> ${escapeHtml(name) || '—'}</p><p><strong>Email:</strong> ${escapeHtml(email) || '—'}</p><p><strong>Topic:</strong> ${escapeHtml(subject) || '—'}</p><p><strong>Message:</strong></p><p style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;">${escapeHtml(message) || '—'}</p>`,
      },
      toCustomer: {
        subject: `We received your message — ${subject || 'Weverse Online Shop'}`,
        body: `<p>Hi${name ? ' ' + escapeHtml(name) : ''},</p><p>We received your message (<em>${escapeHtml(subject) || 'General'}</em>) and will get back to you within 24 hours.</p><p>Your message:<br><span style="color:#475569;">“${escapeHtml(message)}”</span></p>`,
      },
    };
  }

  if (!base) return null;
  return { toUser: { subject: base.subject, body: base.body } };
}

async function sendViaResend(apiKey, { to, from, fromName, replyTo, subject, bodyHtml }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromName ? `${fromName} <${from}>` : from,
      to,
      reply_to: replyTo || undefined,
      subject,
      html: layoutHtml(subject, bodyHtml),
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(String(data?.message || `Resend returned ${res.status}`));
  return data;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const resendKey = String(Deno.env.get('RESEND_API_KEY') || '').trim();
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

  let payload = {};
  try {
    payload = await req.json();
  } catch {
    payload = {};
  }
  const type = String(payload?.type || '').trim();
  if (!type) return jsonResponse({ error: 'Missing email type' }, 400);

  // Load sender preferences from site_settings (service role bypasses RLS).
  let site = {};
  if (supabaseUrl && serviceRoleKey) {
    try {
      const serviceClient = createClient(supabaseUrl, serviceRoleKey);
      const { data } = await serviceClient.from('site_settings').select('*').limit(1).maybeSingle();
      site = data || {};
    } catch {}
  }

  const from = String(site.email_reply_to || site.contact_email || site.brand_email || 'support@weverseonlineshop.com').trim();
  const fromName = String(site.email_from_name || 'Weverse Online Shop').trim();
  const adminEmail = String(site.contact_email || site.brand_email || 'support@weverseonlineshop.com').trim();

  const email = buildEmail(payload);
  if (!email) return jsonResponse({ error: `Unknown email type: ${type}` }, 400);

  // No provider configured — stay resilient, never block auth/forms.
  if (!resendKey) {
    return jsonResponse({
      success: true,
      queued: false,
      provider: 'noop',
      type,
      message: 'Email helper endpoint is configured (no email provider set).',
    });
  }

  try {
    const sent = [];
    if (email.toAdmin) {
      await sendViaResend(resendKey, { to: adminEmail, from, fromName, replyTo: from, ...email.toAdmin });
      sent.push(adminEmail);
    }
    if (email.toUser) {
      await sendViaResend(resendKey, { to: payload.email, from, fromName, replyTo: from, ...email.toUser });
      sent.push(payload.email);
    }
    if (email.toCustomer) {
      await sendViaResend(resendKey, { to: payload.email, from, fromName, replyTo: from, ...email.toCustomer });
      sent.push(payload.email);
    }
    return jsonResponse({
      success: true,
      queued: true,
      provider: 'resend',
      type,
      recipients: sent,
    });
  } catch (err) {
    // Degrade gracefully: report the error but never fail the calling flow.
    return jsonResponse({
      success: true,
      queued: false,
      provider: 'noop',
      type,
      error: String(err?.message || err),
      message: 'Email could not be sent, but the request completed.',
    });
  }
});