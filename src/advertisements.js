// Bridge: loads admin-created advertisements from the `promotions` table
// and exposes them globally so the non-module app.js can merge them into
// the hero showcase. Only active ads within their scheduled window appear.
import { getSupabase } from './supabase-lazy.js';

const AD_FIELDS = 'id,title,description,image_url,video_url,poster_url,link_type,link_target,ad_label,start_date,end_date,is_active,sort_order,created_at';
const AD_LABELS = ['Featured', 'Sponsored', 'Featured Collection', 'Discover', 'Promotion'];

function inSchedule(row) {
  if (!row.is_active) return false;
  const now = Date.now();
  if (row.start_date && new Date(row.start_date).getTime() > now) return false;
  if (row.end_date && new Date(row.end_date).getTime() < now) return false;
  return true;
}

function isRelevantAd(row) {
  const title = (row.title || '').trim().toLowerCase();
  const desc = (row.description || '').trim().toLowerCase();
  const isHome = ['home', 'house', 'apartment', 'villa', 'cottage', 'condo', 'townhouse', 'bungalow'].some(k => title.includes(k) || desc.includes(k));
  const isTruck = ['truck', 'trucks', 'pickup', 'delivery', 'freight'].some(k => title.includes(k) || desc.includes(k));
  const isMotorhome = ['motorhome', 'motor home', 'rv', 'recreational vehicle', 'camper', 'campervan'].some(k => title.includes(k) || desc.includes(k));
  const isCar = ['car', 'cars', 'vehicle', 'vehicles', 'sedan', 'suv', 'coupe', 'hatchback'].some(k => title.includes(k) || desc.includes(k));
  // Explicitly exclude kitchen and similar room categories
  const excludesKitchen = !['kitchen', 'cooking', 'culinary'].some(k => title.includes(k) || desc.includes(k));
  return (isHome || isTruck || isMotorhome || isCar) && excludesKitchen;
}

function buildSlide(row) {
  if (!row || !inSchedule(row)) return null;
  if (!isRelevantAd(row)) return null;
  const image = (row.image_url || '').trim() || null;
  const video = null;
  const poster = (row.poster_url || '').trim() || null;
  if (!image) return null;
  const title = (row.title || 'Marketplace Promotion').trim();
  const desc = (row.description || '').trim();
  const label = AD_LABELS.includes(row.ad_label) ? row.ad_label : 'Featured';
  const linkType = ['product', 'category', 'section', 'none'].includes(row.link_type) ? row.link_type : 'none';
  return {
    adId: row.id,
    isAd: true,
    isLive: false,
    badge: label,
    title,
    desc,
    titles: { en: title },
    descs: { en: desc },
    image,
    video,
    poster,
    linkType,
    linkTarget: (row.link_target || '').trim() || null,
    sortOrder: Number(row.sort_order) || 0,
  };
}

async function fetchAds() {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from('promotions')
      .select(AD_FIELDS)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
    if (error || !data) return [];
    return data.map(buildSlide).filter(Boolean);
  } catch {
    return [];
  }
}

async function loadAds() {
  const slides = await fetchAds();
  window._ads = slides;
  window.dispatchEvent(new CustomEvent('ads-updated', { detail: slides }));
  return slides;
}

async function subscribeAds() {
  try {
    const supabase = await getSupabase();
    return supabase
      .channel('public:promotions:ads')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'promotions' }, () => {
        loadAds();
      })
      .subscribe();
  } catch {
    return null;
  }
}

window._loadAds = loadAds;
window._subscribeAds = subscribeAds;
window._ads = [];
