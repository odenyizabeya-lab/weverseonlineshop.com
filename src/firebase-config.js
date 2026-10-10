import { supabase } from './supabase-client.js';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY || '';

let messaging = null;
let initialized = false;

function isConfigured() {
  return firebaseConfig.apiKey && firebaseConfig.apiKey !== 'YOUR_FIREBASE_API_KEY';
}

async function loadFirebaseScripts() {
  if (window.firebase) return;
  await new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js';
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
  await new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js';
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export async function initFirebase() {
  if (initialized || !isConfigured()) return false;
  try {
    await loadFirebaseScripts();
    if (!window.firebase) return false;
    window.firebase.initializeApp(firebaseConfig);
    if (window.firebase.messaging) {
      messaging = window.firebase.messaging();
    }
    initialized = true;
    return true;
  } catch (e) {
    console.warn('Firebase init failed:', e.message);
    return false;
  }
}

export async function requestNotificationPermission() {
  const ok = await initFirebase();
  if (!ok || !messaging) return null;
  if (!VAPID_KEY || VAPID_KEY === 'YOUR_FIREBASE_VAPID_KEY') return null;

  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return null;

    const token = await messaging.getToken({ vapidKey: VAPID_KEY });
    if (token) {
      await saveDeviceToken(token);
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/firebase-messaging-sw.js').catch(() => {});
      }
    }
    return token;
  } catch (e) {
    console.warn('FCM token error:', e.message);
    return null;
  }
}

async function saveDeviceToken(token) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from('device_tokens').upsert(
      { user_id: user.id, token, platform: 'web' },
      { onConflict: 'user_id,token' }
    );
  } catch (e) { /* token save failed silently */ }
}

export function onForegroundMessage(callback) {
  if (!messaging) return;
  messaging.onMessage((payload) => {
    callback(payload);
  });
}
