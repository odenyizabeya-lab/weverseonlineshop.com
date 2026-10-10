// Supabase Edge Function: flutterwave-payment
// Initializes Flutterwave standard payments (card / ATM / bank / mobile money),
// verifies transactions on redirect, and confirms webhooks so card + ATM
// payments always land. Keys are read from site_settings (set via the admin
// dashboard → Payments → Flutterwave) — never exposed to the browser.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, verif-hash',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const FLW_BASE = 'https://api.flutterwave.com/v3';

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function clean(s: unknown): string {
  return String(s || '').trim();
}

// Only currencies Flutterwave actually accepts. Anything else is charged in USD
// (the client already maps unsupported currencies to USD before calling us).
const FLW_SUPPORTED = ['NGN', 'USD', 'GBP', 'EUR', 'GHS', 'KES', 'ZAR', 'ZMW', 'TZS', 'UGX', 'XAF', 'XOF'];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);

  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: 'Supabase environment variables are missing.' }, 500);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  let payload: Record<string, unknown> = {};
  try { payload = await req.json(); } catch { payload = {}; }

  // Webhook confirmation from Flutterwave (not signed-in user).
  const verifHash = clean(req.headers.get('verif-hash'));
  if (payload.event === 'charge.completed' || verifHash) {
    return handleWebhook(supabase, payload, verifHash);
  }

  const { data: settings, error: settingsErr } = await supabase
    .from('site_settings')
    .select('flutterwave_secret_key, flutterwave_public_key, flutterwave_encryption_key, flutterwave_webhook_secret, flutterwave_enabled, flutterwave_currency, flutterwave_redirect_url, payment_mode')
    .limit(1)
    .maybeSingle();
  if (settingsErr) return jsonResponse({ error: settingsErr.message }, 500);
  if (!settings) return jsonResponse({ error: 'Payment settings not found.' }, 500);

  const secretKey = clean(settings.flutterwave_secret_key);
  const action = clean(payload.action);

  if (action === 'initialize') {
    if (!secretKey) {
      return jsonResponse({ error: 'Flutterwave is not configured yet. The store owner will enable it from the admin dashboard shortly.' }, 503);
    }
    if (settings.flutterwave_enabled === false) {
      return jsonResponse({ error: 'Card payments are temporarily disabled. Please use bank transfer and upload your receipt.' }, 503);
    }

    const orderNumber = clean(payload.order_number);
    const amount = Number(payload.amount);
    const currency = clean(payload.currency || settings.flutterwave_currency || 'USD').toUpperCase();
    if (!Number.isFinite(amount) || amount <= 0) return jsonResponse({ error: 'Invalid amount.' }, 400);
    if (!FLW_SUPPORTED.includes(currency)) return jsonResponse({ error: `Currency ${currency} is not supported by Flutterwave.` }, 400);

    const txRef = `W${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 1e6).toString(36).toUpperCase()}`;

    const redirectBase = clean(payload.redirect_url) || clean(settings.flutterwave_redirect_url) || `${req.url.replace(/\/functions\/v1\/.*$/, '')}/checkout.html`;
    const redirectUrl = `${redirectBase}${redirectBase.includes('?') ? '&' : '?'}status=verify&tx_ref=${encodeURIComponent(txRef)}&order_number=${encodeURIComponent(orderNumber)}`;

    try {
      const flwRes = await fetch(`${FLW_BASE}/payments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tx_ref: txRef,
          amount,
          currency,
          redirect_url: redirectUrl,
          customer: {
            email: clean(payload.customer_email),
            name: clean(payload.customer_name) || 'Weverse Customer',
            phonenumber: clean(payload.customer_phone),
          },
          customizations: {
            title: 'Weverse Online Shop',
            description: `Order ${orderNumber}`,
          },
          payment_options: 'card,banktransfer,account,ussd,mobilemoneyrw,mobilemoneyug,mobilemoneyzm,mobilemoneygh,mpesa,francomobile,ach,barzahlen',
        }),
      });

      const raw = await flwRes.text();
      const data = raw ? JSON.parse(raw) : {};
      if (!flwRes.ok || data.status !== 'success' || !data.data?.link) {
        const msg = data?.message || data?.error || `Flutterwave returned ${flwRes.status}`;
        return jsonResponse({ error: msg }, flwRes.ok ? 400 : 502);
      }

      // Save the tx_ref so verify/webhook can match the order.
      await supabase
        .from('payment_receipts')
        .update({ flutterwave_tx_ref: txRef })
        .eq('order_number', orderNumber);

      return jsonResponse({ success: true, payment_link: data.data.link, tx_ref: txRef });
    } catch (err) {
      return jsonResponse({ error: `Payment gateway error: ${String(err?.message || err)}` }, 502);
    }
  }

  if (action === 'verify') {
    if (!secretKey) return jsonResponse({ error: 'Flutterwave is not configured yet.' }, 503);
    const transactionId = clean(payload.transaction_id);
    if (!transactionId) return jsonResponse({ error: 'transaction_id is required' }, 400);

    try {
      const verifyRes = await fetch(`${FLW_BASE}/transactions/${encodeURIComponent(transactionId)}/verify`, {
        headers: { 'Authorization': `Bearer ${secretKey}` },
      });
      const raw = await verifyRes.text();
      const data = raw ? JSON.parse(raw) : {};
      if (!verifyRes.ok || data.status !== 'success' || !data.data) {
        return jsonResponse({ error: 'Could not verify payment with the gateway.' }, 502);
      }

      const txn = data.data;
      const txRef = clean(payload.tx_ref) || clean(txn.tx_ref);
      const orderNumber = clean(payload.order_number) || clean(txn.meta?.order_number);
      const successful = String(txn.status || '').toLowerCase() === 'successful';
      const amount = txn.amount ?? txn.charged_amount ?? null;
      const currency = clean(txn.currency) || 'USD';
      const id = clean(txn.id);

      if (!orderNumber) {
        return jsonResponse({ error: 'Order number not found in transaction.' }, 400);
      }

      const update: Record<string, unknown> = {
        flutterwave_tx_ref: txRef || null,
        flutterwave_tx_id: id || null,
        transaction_reference: clean(txn.flw_ref) || null,
        payment_date: new Date().toISOString().slice(0, 10),
      };
      if (amount != null) update.amount = Number(amount);
      if (currency) update.currency = currency.toUpperCase();
      if (successful) {
        update.status = 'paid';
      } else {
        update.status = 'payment_failed';
      }

      await supabase.from('payment_receipts').update(update).eq('order_number', orderNumber);

      if (!successful) {
        return jsonResponse({ status: 'failed', message: 'Payment was not completed.', order_number: orderNumber }, 200);
      }
      return jsonResponse({ success: true, status: 'success', order_number: orderNumber, amount, currency });
    } catch (err) {
      return jsonResponse({ error: `Verification error: ${String(err?.message || err)}` }, 502);
    }
  }

  return jsonResponse({ error: 'Unsupported action.' }, 400);
});

async function handleWebhook(
  supabase: any,
  payload: Record<string, unknown>,
  verifHash: string,
): Promise<Response> {
  const { data: settings } = await supabase
    .from('site_settings')
    .select('flutterwave_webhook_secret')
    .limit(1)
    .maybeSingle();

  const expected = clean(settings?.flutterwave_webhook_secret);
  if (expected && (!verifHash || verifHash !== expected)) {
    return jsonResponse({ error: 'Invalid webhook hash.' }, 401);
  }

  const txn = payload.data && typeof payload.data === 'object' ? payload.data as Record<string, unknown> : {};
  const event = clean(payload.event);
  const txRef = clean(txn.tx_ref);
  const status = clean(txn.status).toLowerCase();
  const id = clean(txn.id);

  if (!txRef) return jsonResponse({ ok: true });

  const { data: orders } = await supabase
    .from('payment_receipts')
    .select('order_number')
    .eq('flutterwave_tx_ref', txRef)
    .limit(1);
  const orderNumber = orders?.[0]?.order_number;
  if (!orderNumber) return jsonResponse({ ok: true });

  const update: Record<string, unknown> = {
    flutterwave_tx_id: id || null,
    transaction_reference: clean(txn.flw_ref) || null,
    payment_date: new Date().toISOString().slice(0, 10),
  };

  if (event === 'charge.completed' && (status === 'successful' || status === 'success')) {
    update.status = 'paid';
    if (txn.amount != null) update.amount = Number(txn.amount);
    if (clean(txn.currency)) update.currency = clean(txn.currency).toUpperCase();
  } else if (event === 'charge.failed' || status === 'failed') {
    update.status = 'payment_failed';
  }

  await supabase.from('payment_receipts').update(update).eq('order_number', orderNumber);
  return jsonResponse({ ok: true });
}