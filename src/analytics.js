const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

let initialized = false;

function init() {
  if (initialized || !GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'YOUR_GA_MEASUREMENT_ID') return;
  if (typeof window === 'undefined') return;

  const s1 = document.createElement('script');
  s1.async = true;
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s1);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: true });

  initialized = true;
}

export function trackPageView(path) {
  if (!initialized || !window.gtag) return;
  window.gtag('event', 'page_view', { page_path: path || window.location.pathname });
}

export function trackEvent(name, params = {}) {
  if (!initialized || !window.gtag) return;
  window.gtag('event', name, params);
}

init();
