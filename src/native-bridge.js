// Capacitor native bridge — only runs inside the Android app
// On the website (browser), all calls gracefully no-op.

const isNative = typeof window !== 'undefined' && !!(window).Capacitor?.isNativePlatform?.();
const isAndroid = isNative && (window).Capacitor?.getPlatform?.() === 'android';

export async function initNativeBridge() {
  if (!isNative) return;

  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar');
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#ffffff' });
  } catch {}

  try {
    const { SplashScreen } = await import('@capacitor/splash-screen');
    await SplashScreen.hide();
  } catch {}

  try {
    const { App: CapApp } = await import('@capacitor/app');
    CapApp.addListener('appUrlOpen', ({ url }) => {
      if (url) {
        const path = url.replace(/^https?:\/\/[^/]+/, '').replace(/^kco:\/\/marketplace/, '');
        if (path && path !== '/' && window.location.pathname !== path) {
          window.location.href = path;
        }
      }
    });
  } catch {}

  try {
    const { PushNotifications } = await import('@capacitor/push-notifications');
    const { Preferences } = await import('@capacitor/preferences');

    let permGranted = false;
    try {
      const permResult = await PushNotifications.requestPermissions();
      permGranted = permResult.receive === 'granted';
    } catch {}

    if (permGranted) {
      await PushNotifications.register();
      PushNotifications.addListener('registration', async (token) => {
        try {
          const stored = await Preferences.get({ key: 'fcm_token' });
          if (stored.value === token.value) return;
          await Preferences.set({ key: 'fcm_token', value: token.value });

          const { supabase } = await import('./supabase-client.js');
          const { data: session } = await supabase.auth.getSession();
          const userId = session?.session?.user?.id;
          if (userId) {
            await supabase.from('device_tokens').upsert({
              user_id: userId,
              token: token.value,
              platform: 'android',
            }, { onConflict: 'user_id,token' });
          }
        } catch {}
      });
      PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
        const data = notification?.notification?.data;
        if (data?.order_number) {
          window.location.href = '/account';
        }
      });
    }
  } catch {}

  try {
    const { Network } = await import('@capacitor/network');
    Network.addListener('networkStatusChange', (status) => {
      window.dispatchEvent(new CustomEvent('network-change', { detail: status }));
      if (!status.connected) {
        const banner = document.createElement('div');
        banner.id = 'offline-banner';
        banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:9999;background:#ef4444;color:#fff;text-align:center;padding:8px;font-size:12px;font-weight:700;font-family:Inter,sans-serif';
        banner.textContent = 'You are offline. Some features may be unavailable.';
        if (!document.getElementById('offline-banner')) document.body.appendChild(banner);
      } else {
        const existing = document.getElementById('offline-banner');
        if (existing) existing.remove();
      }
    });
  } catch {}
}

if (isNative) {
  initNativeBridge();
}

export { isNative, isAndroid };
