// ── Weverse Localization Bootstrap ──────────────────────────
// Imported by every HTML page. Initializes localization detection,
// persistence, and the floating selector UI.
import { initLocalization } from './localization.js';
import { initLocalizationUI } from './localization-ui.js';

async function boot() {
  try {
    await initLocalization();
    initLocalizationUI();
  } catch (e) {
    console.warn('Localization init failed:', e);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
