// Permanently deletes the signed-in customer's account and personal data.
// Google Play's Account Deletion policy requires apps that support account
// creation to offer account deletion; the client "Danger Zone" button calls
// this function, then signs the user out locally.
//
// Auth: caller must send their own Supabase access token (Bearer). The service
// role key is used ONLY server-side to invoke auth.admin.deleteUser.
//
// Data handling (matches privacy.html):
// - Deleted immediately via FK cascades from auth.users: profiles,
//   shipping_addresses, email_preferences, support_messages,
//   customer_payment_methods, wishlist entries, device_tokens.
// - Order/financial records (payment_receipts) are RETAINED for legal/tax
//   purposes per the published policy; their user_id is nulled automatically
//   by the FK so they are no longer tied to an identity.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);

  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
  if (!supabaseUrl || !anonKey || !serviceRoleKey) {
    return json({ error: 'Server is missing required configuration.' }, 500);
  }

  const authHeader = req.headers.get('Authorization') || '';
  if (!authHeader.startsWith('Bearer ') || authHeader.length < 20) {
    return json({ error: 'You must be signed in to delete your account.' }, 401);
  }

  // Identify the caller from THEIR OWN token — never trust a body-supplied id.
  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: userData, error: userErr } = await userClient.auth.getUser();
  if (userErr || !userData?.user?.id) {
    return json({ error: 'Your session has expired. Sign in again, then try deleting your account.' }, 401);
  }
  const userId = userData.user.id;

  const admin = createClient(supabaseUrl, serviceRoleKey);

  // Best-effort cleanup for any tables without ON DELETE CASCADE from
  // auth.users. Failures here do not abort deletion of the auth user itself.
  const cleanups: Array<Promise<unknown>> = [
    admin.from('wishlist').delete().eq('user_id', userId),
    admin.from('device_tokens').delete().eq('user_id', userId),
  ];
  await Promise.allSettled(cleanups);

  const { error: deleteErr } = await admin.auth.admin.deleteUser(userId);
  if (deleteErr) {
    return json({ error: 'Could not delete the account right now. Please try again or contact support.' }, 500);
  }

  return json({ success: true });
});
