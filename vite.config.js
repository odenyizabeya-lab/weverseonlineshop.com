import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const supabaseUrl = (env.VITE_SUPABASE_MAIN_URL || env.VITE_SUPABASE_URL || 'https://mzgrjwvwzgqgivwmlkno.supabase.co').replace(/\/$/, '');

  return {
    plugins: [tailwindcss()],
    server: {
      host: true,
      port: 5173,
      proxy: {
        // Local dev proxy avoids browser CORS preflight blocks against Supabase Edge Functions.
        '/_supabase/functions/v1': {
          target: supabaseUrl,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/_supabase\/functions\/v1/, '/functions/v1'),
        },
      },
    },
    build: {
      target: 'esnext',
      rollupOptions: {
        external: [
          '@capacitor/core',
          '@capacitor/app',
          '@capacitor/browser',
          '@capacitor/camera',
          '@capacitor/filesystem',
          '@capacitor/haptics',
          '@capacitor/network',
          '@capacitor/preferences',
          '@capacitor/push-notifications',
          '@capacitor/splash-screen',
          '@capacitor/status-bar',
        ],
        input: {
          main: resolve(__dirname, 'index.html'),
          details: resolve(__dirname, 'details.html'),
          auth: resolve(__dirname, 'auth.html'),
          payment: resolve(__dirname, 'payment.html'),
          account: resolve(__dirname, 'account.html'),
          checkout: resolve(__dirname, 'checkout.html'),
          cart: resolve(__dirname, 'cart.html'),
          adminShipping: resolve(__dirname, 'admin-shipping.html'),
          about: resolve(__dirname, 'about.html'),
          team: resolve(__dirname, 'team.html'),
          contact: resolve(__dirname, 'contact.html'),
          privacy: resolve(__dirname, 'privacy.html'),
          terms: resolve(__dirname, 'terms.html'),
          refundPolicy: resolve(__dirname, 'refund-policy.html'),
          shippingPolicy: resolve(__dirname, 'shipping-policy.html'),
          help: resolve(__dirname, 'help.html'),
          admin: resolve(__dirname, 'admin.html'),
          adminDomains: resolve(__dirname, 'admin-domains.html'),
          adminVideoScanner: resolve(__dirname, 'admin-video-scanner.html'),
          showroom: resolve(__dirname, 'showroom.html'),
          policies: resolve(__dirname, 'policies.html'),
          policiesUsa: resolve(__dirname, 'policies-usa.html'),
          policiesUk: resolve(__dirname, 'policies-uk.html'),
          policiesEu: resolve(__dirname, 'policies-eu.html'),
          policiesGermany: resolve(__dirname, 'policies-germany.html'),
          policiesFrance: resolve(__dirname, 'policies-france.html'),
          policiesJapan: resolve(__dirname, 'policies-japan.html'),
          policiesCanada: resolve(__dirname, 'policies-canada.html'),
          policiesAustralia: resolve(__dirname, 'policies-australia.html'),
          policiesSwitzerland: resolve(__dirname, 'policies-switzerland.html'),
        },
      },
    },
  };
});
