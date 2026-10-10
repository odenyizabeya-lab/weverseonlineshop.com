// Platform registry — maps platform ids to adapters and exposes tooling.
import * as tiktok from './platforms/tiktok.mjs';
import * as telegram from './platforms/telegram.mjs';
import * as facebook from './platforms/facebook.mjs';
import * as instagram from './platforms/instagram.mjs';
import * as youtube from './platforms/youtube.mjs';
import * as x from './platforms/x.mjs';
import * as pinterest from './platforms/pinterest.mjs';
import * as linkedin from './platforms/linkedin.mjs';
import * as whatsapp from './platforms/whatsapp.mjs';

export const ADAPTERS = {
  tiktok,
  telegram,
  facebook,
  instagram,
  youtube,
  x,
  pinterest,
  linkedin,
  whatsapp,
};

export const PLATFORMS = Object.keys(ADAPTERS);

export function isPlatform(id) {
  return Object.prototype.hasOwnProperty.call(ADAPTERS, id);
}

export function getAdapter(id) {
  if (!isPlatform(id)) {
    const err = new Error(`Unknown platform "${id}".`);
    err.code = 'UNKNOWN_PLATFORM';
    throw err;
  }
  return ADAPTERS[id];
}

export function platformList() {
  return PLATFORMS.map((id) => {
    const a = ADAPTERS[id];
    return {
      id,
      label: a.metadata?.label || id,
      capability: a.metadata?.capability || 'text',
      usesOAuth: a.metadata?.usesOAuth !== false,
      officiallyConfigured: a.oauthAvailable ? a.oauthAvailable() : false,
      requirements: a.requirements ? a.requirements() : { configured: false, requiresApproval: false, note: '' },
    };
  });
}