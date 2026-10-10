// Shared media detection for the OG card functions (/api/og.js, /api/og-image.js).
//
// A product's video is often stored as a .mp4 entry inside its `images[]`
// array (not in standalone video/video_url columns), and a video is never a
// valid og:image. These helpers pick the REAL photo for the poster thumbnail
// and the REAL video for a playable og:video card, so sharing a video product
// never shows a blank/white frame and the video actually plays.

const VIDEO_RE = /\.(mp4|webm|mov|avi|mkv|m4v|3gp)(\?|#|$)/i;

export function isVideoUrl(url) {
  return typeof url === 'string' && VIDEO_RE.test(url);
}

// The first true photo in images[] (skips temp/blob/data and video files).
// Returns the first photo, or '' when the product has no real photo at all.
export function productPoster(listing) {
  const imgs = Array.isArray(listing?.images) ? listing.images : [];
  const photo = imgs.find((u) => typeof u === 'string' && u.startsWith('http') && !isVideoUrl(u));
  return photo || '';
}

// The first playable video for a product: standalone video_url/video then any
// .mp4 inside images[]. Returns '' when the product has no video.
export function productVideo(listing) {
  if (!listing) return '';
  const c = [];
  if (typeof listing.video_url === 'string' && listing.video_url) c.push(listing.video_url);
  if (typeof listing.video === 'string' && listing.video) c.push(listing.video);
  if (Array.isArray(listing.images)) c.push(...listing.images);
  return c.find(isVideoUrl) || '';
}

// True when a product carries playable video media (anywhere).
export function hasVideo(listing) {
  return !!productVideo(listing);
}
