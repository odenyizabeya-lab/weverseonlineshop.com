// Motorhome listings — 20 luxury/beautiful motorhomes, photos from Pexels.
// Each motorhome has its own dedicated set of 6 unique photos
// (2 exteriors + living interior + kitchen + bedroom + bathroom) — no photo is reused.

const PX = (id, w = 1200) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

function buildGallery(ids) {
  return ids.map((id, i) => PX(id, i < 2 ? 1200 : 1000));
}

export const MOTORHOME_LISTINGS = [];

export function getMotorhomeById(id) {
  return MOTORHOME_LISTINGS.find(m => m.property_id === id) || null;
}
