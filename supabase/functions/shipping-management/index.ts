// Supabase Edge Function: shipping-management
// Admin-only API for shipment, courier and shipping-rate management.
// Serves the admin-shipping page (see src/admin-shipping-page.js and the
// legacy assets/adminShipping bundle). All mutations run as the service role;
// the caller's user JWT is verified against is_current_user_admin().

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function genTrackingNumber() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 12; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return 'WT' + s;
}

async function queueNotification(serviceClient, orderNumber, eventType, message, status, amount, currency, listingTitle, email, fullName) {
  const subjectMap = {
    shipped: 'Order Shipped — ' + orderNumber,
    in_transit: 'In Transit — ' + orderNumber,
    out_for_delivery: 'Out for Delivery — ' + orderNumber,
    delivered: 'Order Delivered — ' + orderNumber,
    cancelled: 'Action Needed — ' + orderNumber,
  };
  try {
    const { data: pr } = await serviceClient.from('payment_receipts').select('*').eq('order_number', orderNumber).maybeSingle();
    const row = pr || { amount, currency, listing_title: listingTitle, email, full_name: fullName };
    const subject = subjectMap[eventType] || 'Order Update — ' + orderNumber;
    const body =
      `Dear ${row.full_name || 'Customer'},\n\n` +
      `${message}\n\n` +
      `Order Number: ${orderNumber}\n` +
      `Product: ${row.listing_title || ''}\n` +
      `Total Amount: ${row.amount || ''} ${row.currency || ''}\n` +
      `Current Status: ${eventType}\n\n` +
      `Thank you for shopping with Weverse Online Shop.\n` +
      `Track your order: https://weverseonlineshop.com/account\n` +
      `— Weverse Online Shop Team`;
    await serviceClient.from('order_events').insert({
      order_number: orderNumber,
      event_type: eventType,
      message,
      metadata: { amount: row.amount, currency: row.currency, listing_title: row.listing_title },
    });
    await serviceClient.from('notification_log').insert({
      order_number: orderNumber,
      event_type: eventType,
      channel: 'email',
      recipient: row.email || '',
      customer_name: row.full_name || 'Customer',
      subject,
      body,
      status: 'queued',
    });
  } catch (e) {
    console.log('queueNotification error:', String(e?.message || e));
  }
}

async function fireNotificationDispatch() {
  try {
    const url = Deno.env.get('SUPABASE_URL') || '';
    const anon = Deno.env.get('SUPABASE_ANON_KEY') || '';
    if (!url || !anon) return;
    await fetch(`${url}/functions/v1/send-order-notification`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${anon}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ order_number: '__dispatch_pending__' }),
      signal: AbortSignal.timeout(15000),
    }).catch(() => {});
  } catch {}
}

async function computeReports(serviceClient) {
  const { data: rows } = await serviceClient.from('shipments').select('status, shipping_cost, courier_id, couriers(name)');
  const total = rows?.length || 0;
  const byStatus = { pending: 0, in_transit: 0, delivered: 0, cancelled: 0 };
  let totalShippingCost = 0;
  const byCourier = {};
  for (const r of rows || []) {
    if (r.status === 'pending' || r.status === 'processing' || r.status === 'packed') byStatus.pending++;
    else if (r.status === 'in_transit' || r.status === 'out_for_delivery' || r.status === 'shipped') byStatus.in_transit++;
    else if (r.status === 'delivered') byStatus.delivered++;
    else if (r.status === 'cancelled') byStatus.cancelled++;
    if (r.status !== 'cancelled') totalShippingCost += Number(r.shipping_cost || 0);
    const name = r.couriers?.name || 'Unassigned';
    byCourier[name] = (byCourier[name] || 0) + 1;
  }
  return { total, by_courier: byCourier, total_shipping_cost: Number(totalShippingCost.toFixed(2)), ...byStatus };
}

async function listData(serviceClient) {
  const [ships, couriers, methods] = await Promise.all([
    serviceClient.from('shipments').select('*, couriers(name), shipping_methods(name)').order('created_at', { ascending: false }).limit(300),
    serviceClient.from('couriers').select('*').order('is_builtin', { ascending: false }).order('name'),
    serviceClient.from('shipping_methods').select('*').order('sort_order', { ascending: true }).order('name'),
  ]);
  const shipments = (ships.data || []).map((s) => ({
    ...s,
    courier_name: s.couriers?.name || null,
    method_name: s.shipping_methods?.name || null,
  }));
  return {
    shipments,
    couriers: couriers.data || [],
    methods: methods.data || [],
    reports: await computeReports(serviceClient),
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'GET' && req.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);

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

  const url = new URL(req.url);
  const action = String(url.searchParams.get('action') || '');
  const orderNumber = String(url.searchParams.get('order_number') || '');
  let body = {};
  try { body = await req.json(); } catch {}

  try {
    switch (action) {
      case 'list': {
        return jsonResponse(await listData(serviceClient));
      }
      case 'couriers': {
        const { data } = await serviceClient.from('couriers').select('*').order('is_builtin', { ascending: false }).order('name');
        return jsonResponse({ couriers: data || [] });
      }
      case 'methods': {
        const { data } = await serviceClient.from('shipping_methods').select('*').order('sort_order', { ascending: true }).order('name');
        return jsonResponse({ methods: data || [] });
      }
      case 'reports': {
        return jsonResponse(await computeReports(serviceClient));
      }
      case 'get': {
        const on = orderNumber || body.order_number || '';
        if (!on) return jsonResponse({ error: 'Missing order_number' }, 400);
        const { data: shipment } = await serviceClient.from('shipments').select('*, couriers(name), shipping_methods(name)').eq('order_number', on).maybeSingle();
        const { data: order } = await serviceClient.from('payment_receipts')
          .select('order_number, full_name, listing_title, amount, currency, email, created_at')
          .eq('order_number', on).maybeSingle();
        return jsonResponse({
          shipment: shipment ? { ...shipment, courier_name: shipment.couriers?.name || null, method_name: shipment.shipping_methods?.name || null } : null,
          order: order || null,
        });
      }
      case 'create': {
        const on = String(body.order_number || '').trim();
        if (!on) return jsonResponse({ error: 'Missing order_number' }, 400);
        const tracking_number = genTrackingNumber();
        const { data, error } = await serviceClient.from('shipments').insert({
          order_number: on,
          courier_id: body.courier_id || null,
          shipping_method_id: body.shipping_method_id || null,
          shipping_cost: body.shipping_cost != null ? body.shipping_cost : 0,
          estimated_delivery: body.estimated_delivery || null,
          shipping_address: body.shipping_address || null,
          tracking_number,
          status: 'pending',
        }).select().maybeSingle();
        if (error) return jsonResponse({ error: error.message }, 500);
        await queueNotification(serviceClient, on, 'pending', 'A shipment has been created for your order.', null, null, null, body.email, body.full_name);
        await fireNotificationDispatch();
        return jsonResponse({ ok: true, shipment: data, tracking_number });
      }
      case 'update': {
        const on = String(body.order_number || '').trim();
        if (!on) return jsonResponse({ error: 'Missing order_number' }, 400);
        const { data: current } = await serviceClient.from('shipments').select('*').eq('order_number', on).maybeSingle();
        if (!current) return jsonResponse({ error: 'Shipment not found' }, 404);
        const nextStatus = String(body.status || current.status);
        const patch = {};
        if ('courier_id' in body) patch.courier_id = body.courier_id || null;
        if ('tracking_number' in body) patch.tracking_number = body.tracking_number || current.tracking_number;
        if ('status' in body) patch.status = body.status;
        if ('estimated_delivery' in body) patch.estimated_delivery = body.estimated_delivery || null;
        if ('note' in body) patch.note = body.note || null;
        if ('location' in body) patch.location = body.location || null;
        if (nextStatus === 'delivered' && current.status !== 'delivered') patch.delivered_at = new Date().toISOString();
        if (Object.keys(patch).length === 0) return jsonResponse({ error: 'Nothing to update' }, 400);
        const { error } = await serviceClient.from('shipments').update(patch).eq('order_number', on);
        if (error) return jsonResponse({ error: error.message }, 500);
        if (nextStatus !== (current.status || '')) {
          await queueNotification(serviceClient, on, nextStatus, `Your order is now: ${nextStatus.replace(/_/g, ' ')}.`);
        }
        await fireNotificationDispatch();
        const { data: fresh } = await serviceClient.from('shipments').select('*, couriers(name)').eq('order_number', on).maybeSingle();
        return jsonResponse({ ok: true, shipment: fresh });
      }
      case 'add_courier': {
        const name = String(body.name || '').trim();
        const code = String(body.code || '').trim().toUpperCase();
        if (!name || !code) return jsonResponse({ error: 'Courier name and code are required' }, 400);
        const { data, error } = await serviceClient.from('couriers').insert({
          name, code,
          tracking_url: body.tracking_url || null,
          logo_url: body.logo_url || null,
          is_builtin: false,
        }).select().maybeSingle();
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ ok: true, courier: data });
      }
      case 'add_method': {
        const name = String(body.name || '').trim();
        const code = String(body.code || '').trim().toLowerCase();
        if (!name || !code) return jsonResponse({ error: 'Method name and code are required' }, 400);
        const { data, error } = await serviceClient.from('shipping_methods').insert({
          name,
          code,
          description: body.description || null,
          base_cost: body.base_cost != null ? body.base_cost : 0,
          estimated_days_min: body.estimated_days_min != null ? body.estimated_days_min : 3,
          estimated_days_max: body.estimated_days_max != null ? body.estimated_days_max : 7,
          sort_order: body.sort_order != null ? body.sort_order : 0,
        }).select().maybeSingle();
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ ok: true, method: data });
      }
      case 'update_method': {
        if (!body.id) return jsonResponse({ error: 'Missing method id' }, 400);
        const patch = {};
        if ('name' in body) patch.name = body.name;
        if ('description' in body) patch.description = body.description || null;
        if ('base_cost' in body) patch.base_cost = body.base_cost;
        if ('is_active' in body) patch.is_active = !!body.is_active;
        if ('estimated_days_min' in body) patch.estimated_days_min = body.estimated_days_min;
        if ('estimated_days_max' in body) patch.estimated_days_max = body.estimated_days_max;
        const { error } = await serviceClient.from('shipping_methods').update(patch).eq('id', body.id);
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ ok: true });
      }
      default:
        return jsonResponse({ error: `Unknown action: ${action}` }, 400);
    }
  } catch (err) {
    return jsonResponse({ error: String(err?.message || err) }, 500);
  }
});