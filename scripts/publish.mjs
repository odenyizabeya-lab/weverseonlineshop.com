/* ── Weverse Online Shopping — Worldwide Auto-Publisher ─────────────────────
 *
 * Publishes deterministic, per-location showcase listings across every
 * non-African country (country → state → city → town/area order).
 *
 * Every location receives all seven showcase kinds during each cycle:
 * motorhome (WS-M), house (WS-A), car (WS-C), truck (WS-T), refrigerator
 * (WS-R), washing machine (WS-W) and dog (WS-D). After 4 full cycles a
 * general marketplace product (WS-P) is added per location. The publisher
 * NEVER stops and NEVER edits or deletes existing rows — every listing is
 * published once and kept forever.
 *
 * All auto rows are clearly labeled Illustrative Listings (demonstration
 * entries). Geographic data (country/state/city/area/postal/coordinates) is
 * REAL from world-locations.mjs; everything that would require on-site
 * verification is marked "Not provided - requires verification". Photos are
 * known-good Pexels stock photos and are labeled illustrative, never as
 * verified inventory.
 *
 * Usage:
 *   node scripts/publish.mjs                # dry run (reads DB, prints plan)
 *   node scripts/publish.mjs --live         # insert (requires service key)
 *   node scripts/publish.mjs --live --batch 20
 *
 * Live inserts require the Supabase service-role key (anonymous INSERT is
 * blocked by row-level security):
 *   env SUPABASE_MAIN_SERVICE_ROLE_KEY=...
 *   (legacy fallbacks accepted: WEVERSE_SERVICE_ROLE_KEY / SUPABASE_SERVICE_ROLE_KEY)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { randomUUID } from 'node:crypto';
import { MAIN_URL, MAIN_ANON_KEY, MAIN_SERVICE_ROLE_KEY } from '../shared/supabase-env.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SITE_URL = 'https://weverseonlineshop.com';
const TABLE = 'showroom_listings';

const SERVICE_ROLE_KEY = MAIN_SERVICE_ROLE_KEY;

const ILLUSTRATIVE_NOTE =
  'ILLUSTRATIVE LISTING — Demonstration entry for the Weverse online marketplace showcase. ' +
  'The photo and price are illustrative, not a verified live offer. ' +
  'Location (country/state/city/area/postal code) is real; on-site details are unverified.';

const DISCLAIMER_FIELDS = {
  verification_status: 'Illustrative',
  verification_date: '',
  inspection_info: 'Not provided - illustrative listing',
  documents: [],
  legal_info: [],
  landmarks: [],
  risk_notes: 'Illustrative listing - no inspection performed.',
};

function notVerified() {
  return {
    schools: ['Not provided - requires verification'],
    shopping: ['Not provided - requires verification'],
    distances: ['Not provided - requires verification'],
    hospitals: ['Not provided - requires verification'],
    transportation: ['Not provided - requires verification'],
  };
}

/* ── Real brand / model / style pools (rotated deterministically) ───────── */

const HOUSE_STYLES = [
  ['Modern Family Villa', 4, 3, 'Furnished'],
  ['Contemporary 3-Bedroom Home', 3, 2, 'Furnished'],
  ['Spacious Executive Residence', 5, 4, 'Furnished'],
  ['Charming Terrace Townhouse', 3, 2, 'Semi-furnished'],
  ['Designer Apartment Penthouse', 2, 2, 'Furnished'],
  ['Grand Luxury Estate', 6, 5, 'Furnished'],
  ['Cozy Suburban Cottage', 3, 2, 'Semi-furnished'],
  ['Modern Garden Duplex', 4, 3, 'Furnished'],
];

const CAR_POOL = [
  ['Toyota Corolla', 'Sedan', 21500],
  ['Toyota Camry', 'Sedan', 24900],
  ['Honda Civic', 'Hatchback', 22600],
  ['Honda Accord', 'Sedan', 25300],
  ['Ford Mustang', 'Coupe', 41500],
  ['Chevrolet Camaro', 'Coupe', 39800],
  ['BMW 3 Series', 'Sedan', 46200],
  ['BMW 5 Series', 'Sedan', 59500],
  ['Mercedes-Benz C-Class', 'Sedan', 48900],
  ['Mercedes-Benz E-Class', 'Sedan', 64800],
  ['Audi A4', 'Sedan', 45200],
  ['Tesla Model 3', 'Sedan', 38990],
  ['Tesla Model Y', 'SUV', 44990],
  ['Volkswagen Golf', 'Hatchback', 22800],
  ['Hyundai Sonata', 'Sedan', 25800],
  ['Kia K5', 'Sedan', 25600],
  ['Mazda CX-5', 'SUV', 28900],
  ['Subaru Outback', 'Wagon', 31300],
  ['Toyota RAV4', 'SUV', 30600],
  ['Honda CR-V', 'SUV', 30400],
  ['Jeep Wrangler', 'SUV', 35600],
  ['Land Rover Defender', 'SUV', 52500],
  ['BMW X5', 'SUV', 65200],
  ['Porsche 911', 'Coupe', 114000],
];

const TRUCK_POOL = [
  ['Ford F-150', 'Pickup Truck', 38500],
  ['Chevrolet Silverado 1500', 'Pickup Truck', 39800],
  ['Ram 1500', 'Pickup Truck', 39400],
  ['Toyota Tundra', 'Pickup Truck', 42200],
  ['GMC Sierra 1500', 'Pickup Truck', 40600],
  ['Ford F-250', 'Heavy Duty Pickup', 49500],
  ['Chevrolet Silverado 2500HD', 'Heavy Duty Pickup', 50500],
  ['Nissan Titan', 'Pickup Truck', 37800],
  ['Toyota Tacoma', 'Pickup Truck', 31800],
  ['Rivian R1T', 'Electric Pickup', 71800],
  ['Ford Ranger', 'Pickup Truck', 30900],
  ['Isuzu D-Max', 'Pickup Truck', 29500],
  ['Mercedes-Benz Actros', 'Semi Truck', 128500],
  ['Volvo FH16', 'Semi Truck', 142000],
  ['Scania R500', 'Semi Truck', 133000],
];

const PRODUCT_POOL = [
  ['Scandinavian Armchair', 'Furniture', 189],
  ['Handwoven Wool Rug', 'Home Decor & Storage', 249],
  ['Stainless Espresso Machine', 'Home Appliances', 349],
  ['LED Desk Lamp', 'Home Decor & Storage', 59],
  ['Ceramic Dinnerware Set', 'Kitchen', 129],
  ['Slim Bluetooth Speaker', 'Electronics', 79],
  ['Designer Floor Mirror', 'Home Decor & Storage', 219],
  ['Leather Weekend Tote', 'Bags', 159],
];

const MOTORHOME_POOL = [
  ['Winnebago Vista', 'Class C Motorhome', 98500],
  ['Thor Motor Coach Apex', 'Travel Trailer', 41500],
  ['Coachmen Leprechaun', 'Class C Motorhome', 82900],
  ['Jayco Greyhawk', 'Class C Motorhome', 88900],
  ['Forest River Sunseeker', 'Class C Motorhome', 76900],
  ['Airstream Classic', 'Travel Trailer', 112000],
  ['Keystone Cougar', 'Fifth Wheel', 53900],
  ['Winnebago Travato', 'Class B Camper Van', 96500],
  ['Pleasure-Way Tofino', 'Class B Camper Van', 92800],
  ['Grand Design Solitude', 'Fifth Wheel', 64900],
  ['Itasca Sunova', 'Class A Motorhome', 109000],
  ['McKenzie Towne Hall', 'Travel Trailer', 38900],
];

const FRIDGE_POOL = [
  ['Samsung French Door Refrigerator', 'Refrigerator', 1899],
  ['LG InstaView Refrigerator', 'Refrigerator', 2299],
  ['Whirlpool Side-by-Side Refrigerator', 'Refrigerator', 1399],
  ['Bosch Built-In Refrigerator', 'Refrigerator', 3199],
  ['Panasonic Two-Door Refrigerator', 'Refrigerator', 1049],
  ['Siemens NoFrost Fridge-Freezer', 'Refrigerator', 1699],
  ['Miele Refrigerator', 'Refrigerator', 2799],
  ['Electrolux Bottom-Freezer Refrigerator', 'Refrigerator', 1249],
  ['Haier Compact Refrigerator', 'Mini Fridge', 449],
  ['Gorenje Retro Refrigerator', 'Refrigerator', 899],
];

const WASHER_POOL = [
  ['Bosch Serie 6 Front Load Washer', 'Washing Machine', 899],
  ['Samsung AddWash Washer', 'Washing Machine', 949],
  ['LG TurboWash Washer', 'Washing Machine', 1049],
  ['Miele W1 Washer', 'Washing Machine', 1699],
  ['Whirlpool Top Load Washer', 'Washing Machine', 649],
  ['Electrolux PerfectCare Washer', 'Washing Machine', 929],
  ['Panasonic NA Washer', 'Washing Machine', 849],
  ['Haier Load & Go Washer', 'Washing Machine', 699],
  ['AEG L7 Washer', 'Washing Machine', 1099],
  ['Siemens iQ700 Washer', 'Washing Machine', 1299],
];

const DOG_POOL = [
  ['Golden Retriever Puppy', 'Dog', 950],
  ['Labrador Retriever Puppy', 'Dog', 850],
  ['German Shepherd Puppy', 'Dog', 1100],
  ['French Bulldog Puppy', 'Dog', 2100],
  ['Beagle Puppy', 'Dog', 700],
  ['Poodle Puppy', 'Dog', 1200],
  ['Corgi Puppy', 'Dog', 1600],
  ['Siberian Husky Puppy', 'Dog', 1150],
  ['Boxer Puppy', 'Dog', 980],
  ['Dachshund Puppy', 'Dog', 750],
  ['Rottweiler Puppy', 'Dog', 1050],
  ['Shih Tzu Puppy', 'Dog', 890],
];

const PEXELS = {
  house: [
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  car: [
    'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/593172/pexels-photo-593172.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/977003/pexels-photo-977003.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/248687/pexels-photo-248687.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  truck: [
    'https://images.pexels.com/photos/3156482/pexels-photo-3156482.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2467273/pexels-photo-2467273.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/616966/pexels-photo-616966.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1840427/pexels-photo-1840427.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/936357/pexels-photo-936357.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2336832/pexels-photo-2336832.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/3772513/pexels-photo-3772513.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/3814594/pexels-photo-3814594.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1102343/pexels-photo-1102343.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  product: [
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  motorhome: [
    'https://images.pexels.com/photos/7737214/pexels-photo-7737214.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/7126186/pexels-photo-7126186.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/8219580/pexels-photo-8219580.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1239655/pexels-photo-1239655.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/908184/pexels-photo-908184.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  fridge: [
    'https://images.pexels.com/photos/6965054/pexels-photo-6965054.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/3612182/pexels-photo-3612182.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/6586693/pexels-photo-6586693.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/4700386/pexels-photo-4700386.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/3621145/pexels-photo-3621145.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  washer: [
    'https://images.pexels.com/photos/8067051/pexels-photo-8067051.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/5945667/pexels-photo-5945667.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2531411/pexels-photo-2531411.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/362550/pexels-photo-362550.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/3957997/pexels-photo-3957997.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  dog: [
    'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/235805/pexels-photo-235805.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
};

/* ── Location dataset ────────────────────────────────────────────────────── */

const { orderedLocations } = await import('./geo/world-locations.mjs');
const LOCATIONS = orderedLocations();

const AUTO_ID_RE = /^WS-(A|C|T|P|M|R|W|D)-(\d{3})-(\d{4})$/;

function prefixFor(kind) {
  return (
    kind === 'house' ? 'A'
      : kind === 'car' ? 'C'
        : kind === 'truck' ? 'T'
          : kind === 'motorhome' ? 'M'
            : kind === 'fridge' ? 'R'
              : kind === 'washer' ? 'W'
                : kind === 'dog' ? 'D'
                  : 'P'
  );
}

function propId(kind, cycle, seq) {
  const cyc = String(cycle).padStart(3, '0');
  const seqPadded = String(seq).padStart(4, '0');
  return `WS-${prefixFor(kind)}-${cyc}-${seqPadded}`;
}

function areaFor(loc, cycle) {
  const areas = loc.areas && loc.areas.length ? loc.areas : [];
  if (!areas.length) return '';
  return areas[(cycle - 1) % areas.length];
}

function placeLabel(loc, area) {
  return [area, loc.city, loc.state, loc.country].filter(Boolean).join(', ');
}

function baseFields(kind, loc, cycle, seq) {
  const area = areaFor(loc, cycle);
  return {
    id: randomUUID(),
    property_id: propId(kind, cycle, seq),
    sku: propId(kind, cycle, seq),
    is_active: true,
    is_featured: true,
    approval_status: 'published',
    listing_status: 'sale',
    price_period: null,
    currency: 'USD',
    country: loc.country,
    country_code: loc.countryCode,
    state: loc.state,
    city: loc.city,
    town: area,
    zip_code: loc.zip || '',
    address: '',
    product_location: placeLabel(loc, area),
    latitude: loc.lat,
    longitude: loc.lng,
    availability_status: 'Available (Illustrative Listing)',
    rating: 0,
    rating_count: 0,
    review_count: 0,
    favorite_count: 0,
    stock_quantity: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_ai_generated: false,
    ai_generated_fields: [],
    verification_status: 'Illustrative',
    inspection_info: 'Not provided - illustrative listing',
    documents: [],
    legal_info: [],
    landmarks: [],
    risk_notes: 'Illustrative listing - no inspection performed.',
    nearby_area: notVerified(),
  };
}

function houseRow(loc, cycle, seq) {
  const area = areaFor(loc, cycle);
  const [style, beds, baths, furnished] = HOUSE_STYLES[(seq + cycle - 2) % HOUSE_STYLES.length];
  const title = `${style} (${beds} Bed, ${baths} Bath) in ${area ? area + ', ' : ''}${loc.city}`;
  const img = PEXELS.house[seq % PEXELS.house.length];
  return {
    ...baseFields('house', loc, cycle, seq),
    listing_type: 'property',
    category: 'Houses',
    subcategory: 'Residential Properties',
    property_type: 'House',
    title,
    description:
      `${title}. A ${style.toLowerCase()} in ${placeLabel(loc, area)} featuring ${beds} bedrooms, ` +
      `${baths} bathrooms, a ${Number(beds) * 120 + 1200} sqft living area and ${furnished.toLowerCase()} interiors. ` +
      `${ILLUSTRATIVE_NOTE}`,
    price: 240000 + ((seq + cycle) % 9) * 85000,
    images: [img],
    bedrooms: beds,
    bathrooms: baths,
    half_bathrooms: 1,
    floors: beds >= 5 ? 2 : 1,
    building_size: `${Number(beds) * 120 + 1200} sqft`,
    land_size: `${(0.12 + ((seq + cycle) % 6) * 0.07).toFixed(2)} acres`,
    parking_spaces: beds >= 4 ? 3 : 2,
    garage: beds >= 4 ? '2-car attached' : '1-car attached',
    furnished,
    condition: 'New',
    year_built: 2021 + (cycle % 4),
    year_renovated: 0,
    features: ['Open-Concept Living Area', 'Modern Kitchen', 'Private Parking', 'Landscaped Garden'],
    interior_features: ['Not provided - requires verification'],
    exterior_features: ['Not provided - requires verification'],
    home_systems: ['Not provided - requires verification'],
    seo_keywords: [style.toLowerCase(), 'house for sale', loc.city.toLowerCase(), loc.country.toLowerCase()],
    tags: ['Illustrative Listing', 'Houses', 'Worldwide'],
    specifications: {
      kitchens: 1,
      living_areas: 'Open-concept living room and dining area',
      construction_status: 'Completed',
      ownership_type: 'Freehold',
      utilities: 'Municipal water, electricity; other utilities - requires verification',
      neighborhood: 'Neighborhood - requires verification',
    },
    floor_plan: {
      image: '',
      rooms: [{ name: 'Not provided - requires verification', dimensions: '' }],
      levels: 'Not provided - requires verification',
      total_area: 'Not provided - requires verification',
    },
  };
}

function carRow(loc, cycle, seq, kind) {
  const pool = kind === 'car' ? CAR_POOL : TRUCK_POOL;
  const area = areaFor(loc, cycle);
  const idx = (seq + cycle - 2) % pool.length;
  const [model, bodyType, base] = pool[idx];
  const year = 2019 + ((seq * 3 + cycle) % 7);
  const title = `${year} ${model} — ${bodyType} for Sale in ${area ? area + ', ' : ''}${loc.city}`;
  const img = PEXELS[kind][seq % PEXELS[kind].length];
  return {
    ...baseFields(kind, loc, cycle, seq),
    listing_type: 'vehicle',
    category: kind === 'car' ? 'Cars' : 'Trucks',
    subcategory: 'Vehicles & Parts > Vehicles',
    property_type: bodyType,
    brand: model.split(' ')[0],
    title,
    description:
      `${title}. ${year} ${model} ${bodyType} offered in ${placeLabel(loc, area)}. ` +
      `Illustrative vehicle listing with representative photo (not an actual current unit). ${ILLUSTRATIVE_NOTE}`,
    price: base + ((seq + cycle) % 5) * 1500,
    images: [img],
    condition: year >= 2024 ? 'New' : 'Like New',
    color: 'Not provided - requires verification',
    size: null,
    warranty: null,
    specifications: { model_year: String(year), fuel_type: 'Not provided - requires verification', mileage: 'Not provided - requires verification' },
    features: ['Power Steering', 'AC', 'Anti-lock Brakes', 'Airbags'],
  };
}

function productRow(loc, cycle, seq) {
  const area = areaFor(loc, cycle);
  const idx = (seq + cycle - 2) % PRODUCT_POOL.length;
  const [name, cat, base] = PRODUCT_POOL[idx];
  const title = `${name} in ${area ? area + ', ' : ''}${loc.city} — ${loc.country}`;
  const img = PEXELS.product[seq % PEXELS.product.length];
  return {
    ...baseFields('product', loc, cycle, seq),
    listing_type: 'product',
    category: cat,
    subcategory: null,
    property_type: null,
    title,
    description:
      `${title}. A curated marketplace product available in ${placeLabel(loc, area)}. ${ILLUSTRATIVE_NOTE}`,
    price: base + ((seq + cycle) % 4) * 10,
    images: [img],
    condition: 'New',
    features: [],
    specifications: {},
  };
}

function motorhomeRow(loc, cycle, seq) {
  const area = areaFor(loc, cycle);
  const idx = (seq + cycle - 2) % MOTORHOME_POOL.length;
  const [model, bodyType, base] = MOTORHOME_POOL[idx];
  const year = 2019 + ((seq * 2 + cycle) % 6);
  const title = `${year} ${model} ${bodyType} for Sale in ${area ? area + ', ' : ''}${loc.city}`;
  const img = PEXELS.motorhome[seq % PEXELS.motorhome.length];
  return {
    ...baseFields('motorhome', loc, cycle, seq),
    listing_type: 'vehicle',
    category: 'Motorhomes',
    subcategory: 'Vehicles & Parts > Vehicles > Motorhomes',
    property_type: bodyType,
    brand: model.split(' ')[0],
    title,
    description:
      `${title}. ${year} ${model} ${bodyType} offered in ${placeLabel(loc, area)}. ` +
      `Illustrative motorhome listing with a representative photo (not an actual current unit). ${ILLUSTRATIVE_NOTE}`,
    price: base + ((seq + cycle) % 5) * 1800,
    images: [img],
    condition: year >= 2024 ? 'New' : 'Like New',
    color: 'Not provided - requires verification',
    size: null,
    warranty: null,
    specifications: {
      model_year: String(year),
      fuel_type: 'Not provided - requires verification',
      sleeping_capacity: 'Not provided - requires verification',
      length: 'Not provided - requires verification',
    },
    features: ['Air Conditioning', 'Galley Kitchen', 'Sleeping Areas', 'Onboard Bathroom'],
  };
}

function applianceRow(loc, cycle, seq, kind) {
  const pool = kind === 'fridge' ? FRIDGE_POOL : WASHER_POOL;
  const area = areaFor(loc, cycle);
  const idx = (seq + cycle - 2) % pool.length;
  const [model, type, base] = pool[idx];
  const title = `${model} ${type} in ${area ? area + ', ' : ''}${loc.city}`;
  const img = PEXELS[kind][seq % PEXELS[kind].length];
  return {
    ...baseFields(kind, loc, cycle, seq),
    listing_type: 'product',
    category: 'Home Appliances',
    subcategory: kind === 'fridge' ? 'Kitchen Appliances > Refrigerators' : 'Home Appliances > Laundry > Washers',
    property_type: type,
    brand: model.split(' ')[0],
    title,
    description:
      `${title}. A ${type.toLowerCase()} available in ${placeLabel(loc, area)}. ${ILLUSTRATIVE_NOTE}`,
    price: base + ((seq + cycle) % 4) * 25,
    images: [img],
    condition: 'New',
    color: 'Not provided - requires verification',
    features: ['Energy Efficient', 'Quiet Operation', 'Warranty Available'],
    specifications: { model, capacity: 'Not provided - requires verification' },
  };
}

function dogRow(loc, cycle, seq) {
  const area = areaFor(loc, cycle);
  const idx = (seq + cycle - 2) % DOG_POOL.length;
  const [breed, type, base] = DOG_POOL[idx];
  const title = `${breed} in ${area ? area + ', ' : ''}${loc.city} — ${loc.country}`;
  const img = PEXELS.dog[seq % PEXELS.dog.length];
  return {
    ...baseFields('dog', loc, cycle, seq),
    listing_type: 'product',
    category: 'Pets',
    subcategory: 'Dogs',
    property_type: type,
    brand: null,
    title,
    description:
      `${title}. A ${breed} ${type.toLowerCase()} available from ${placeLabel(loc, area)}. ${ILLUSTRATIVE_NOTE}`,
    price: base + ((seq + cycle) % 4) * 50,
    images: [img],
    condition: 'New',
    color: 'Not provided - requires verification',
    features: ['Socialized', 'Health Check', 'Pedigree Available'],
    specifications: { breed, age: 'Not provided - requires verification', temperament: 'Not provided - requires verification' },
  };
}

/* ── DB access ───────────────────────────────────────────────────────────── */

let clients = {};

async function getClient(useServiceRole) {
  const slot = useServiceRole ? 'svc' : 'anon';
  if (clients[slot]) return clients[slot];
  const { createClient } = await import('@supabase/supabase-js');
  const key = useServiceRole ? SERVICE_ROLE_KEY : MAIN_ANON_KEY;
  if (useServiceRole && !SERVICE_ROLE_KEY) {
    throw new Error(
      'Publish requires the Supabase Service Role key (anonymous INSERT is blocked by RLS). ' +
        'Provide it as env WEVERSE_SERVICE_ROLE_KEY or SUPABASE_SERVICE_ROLE_KEY.',
    );
  }
  const client = createClient(MAIN_URL, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  clients[slot] = client;
  return client;
}

async function loadExistingIds() {
  const c = await getClient(false);
  const { data, error } = await c
    .from(TABLE)
    .select('property_id')
    .like('property_id', 'WS-%')
    .limit(20000);
  if (error) throw new Error(`read existing rows: ${error.message}`);
  const ids = new Set();
  let maxCycle = 0;
  let maxSeq = 0;
  for (const r of data || []) {
    const m = AUTO_ID_RE.exec(r.property_id || '');
    if (!m) continue;
    ids.add(r.property_id);
    const cNum = Number(m[2]);
    const sNum = Number(m[3]);
    if (cNum > maxCycle) maxCycle = cNum;
    if (cNum === maxCycle && sNum > maxSeq) maxSeq = sNum;
  }
  return { ids, maxCycle, maxSeq };
}

async function insertRows(rows) {
  const c = await getClient(true);
  const inserted = [];
  const failed = [];
  for (const row of rows) {
    const { data, error } = await c.from(TABLE).insert(row).select('property_id');
    if (error) {
      if (/row-level security|violates row-level/i.test(error.message)) {
        throw new Error(
          `RLS blocked insert for ${row.property_id}: ${error.message}. ` +
            'Use the Service Role key (env WEVERSE_SERVICE_ROLE_KEY).',
        );
      }
      failed.push({ property_id: row.property_id, error: error.message });
    } else {
      inserted.push(data && data[0] ? data[0].property_id : row.property_id);
    }
  }
  return { inserted, failed };
}

/* ── Generator ───────────────────────────────────────────────────────────── */

function rowsForCycle(cycle) {
  const out = [];
  for (let seq = 1; seq <= LOCATIONS.length; seq += 1) {
    const loc = LOCATIONS[seq - 1];
    out.push(
      { kind: 'motorhome', row: motorhomeRow(loc, cycle, seq) },
      { kind: 'house', row: houseRow(loc, cycle, seq) },
      { kind: 'car', row: carRow(loc, cycle, seq, 'car') },
      { kind: 'truck', row: carRow(loc, cycle, seq, 'truck') },
      { kind: 'fridge', row: applianceRow(loc, cycle, seq, 'fridge') },
      { kind: 'washer', row: applianceRow(loc, cycle, seq, 'washer') },
      { kind: 'dog', row: dogRow(loc, cycle, seq) },
    );
    if (cycle >= 5) {
      out.push({ kind: 'product', row: productRow(loc, cycle, seq) });
    }
  }
  return out;
}

/* ── IndexNow (Bing / Yandex / Naver / Seznam instant indexing) ──────────── */

const INDEXNOW_KEY = 'e7dab8295af2814019cf65154c4147d1';
const INDEXNOW_KEY_URL = `${SITE_URL}/indexnow-${INDEXNOW_KEY}.txt`;

const INDEXNOW_ENDPOINTS = ['https://api.indexnow.org/indexnow', 'https://indexnow.api.bing.com/indexnow'];

export async function submitIndexNow(canonicalUrls) {
  const urlList = [...new Set(canonicalUrls.map((u) => String(u || '')))]
    .filter((u) => u.startsWith(SITE_URL))
    .slice(0, 10000);
  if (!urlList.length) return { submitted: 0, note: 'no eligible URLs' };
  for (const endpoint of INDEXNOW_ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host: new URL(SITE_URL).host,
          key: INDEXNOW_KEY,
          keyLocation: INDEXNOW_KEY_URL,
          urlList,
        }),
      });
      const ok = res.status >= 200 && res.status < 300;
      if (ok) return { submitted: urlList.length, note: `${endpoint} HTTP ${res.status} — accepted` };
      const body = (await res.text()).slice(0, 120);
      console.warn(`[publish] indexnow ${endpoint}: HTTP ${res.status} — ${body}`);
    } catch (err) {
      console.warn(`[publish] indexnow ${endpoint}: request failed — ${err && err.message ? err.message : err}`);
    }
  }
  return { submitted: 0, note: 'all IndexNow endpoints unreachable. Skipped.' };
}

/* ── CLI ─────────────────────────────────────────────────────────────────── */

export async function runPublish({ live = false, batch = 8 } = {}) {
  const countries = new Set(LOCATIONS.map((l) => l.countryCode)).size;
  const dryFallback = !SERVICE_ROLE_KEY && process.env.PUBLISH_ALLOW_DRY_FALLBACK === '1';
  if (live && dryFallback) {
    console.warn('[publish] Service-role key missing — PUBLISH_ALLOW_DRY_FALLBACK is set, running a DRY-RUN plan instead. Add the WEVERSE_SERVICE_ROLE_KEY secret to the GitHub workflow to insert real rows.');
    live = false;
  }
  console.log(`[publish] mode=${live ? 'LIVE' : 'dry-run'} batch=${batch} locations=${LOCATIONS.length} countries=${countries}`);
  const { ids, maxCycle, maxSeq } = await loadExistingIds();
  console.log(`[publish] existing auto rows=${ids.size} maxCycle=${maxCycle} maxSeq=${maxSeq}`);

  const startCycle = Math.max(1, maxCycle);
  const planned = [];
  const skipped = [];
  const scanCap = Math.min(startCycle + 5, Math.max(startCycle + 1, 24));

  for (let cycle = startCycle; cycle <= scanCap; cycle += 1) {
    if (planned.length >= batch) break;
    for (const { kind, row } of rowsForCycle(cycle)) {
      if (planned.length >= batch) break;
      if (ids.has(row.property_id)) {
        skipped.push(row.property_id);
        continue;
      }
      planned.push({ kind, row, cycle, seq: Number(row.property_id.split('-')[3]) });
    }
    if (planned.length === 0 && cycle < maxCycle) continue;
    if (planned.length === 0) break;
  }

  console.log(`[publish] new=${planned.length} already-published=${skipped.length}`);
  const urls = planned.map(({ row }) => `${SITE_URL}/product/${encodeURIComponent(row.property_id)}`);
  const breakdown = planned.reduce((acc, p) => ((acc[p.kind] = (acc[p.kind] || 0) + 1), acc), {});
  console.log('[publish] breakdown:', JSON.stringify(breakdown));

  let inserted = [];
  let failed = [];
  let indexNow = null;
  if (live) {
    const res = await insertRows(planned.map((p) => p.row));
    inserted = res.inserted;
    failed = res.failed;
    console.log(`[publish] inserted=${inserted.length} failed=${failed.length}`);
    for (const f of failed) console.log(`  FAIL ${f.property_id}: ${f.error}`);
    for (const u of urls) console.log(`  ${u}`);
    if (inserted.length) {
      indexNow = await submitIndexNow(inserted.map((id) => `${SITE_URL}/product/${encodeURIComponent(id)}`));
      console.log(`[publish] indexnow: ${indexNow.note} (${indexNow.submitted}/${inserted.length} URLs)`);
    }
    console.log('[publish] done');
  } else {
    console.log('[publish] DRY-RUN — no rows inserted. Re-run with --live to publish.');
    for (const p of planned.slice(0, 6)) {
      const r = p.row;
      console.log(`  - ${r.property_id} | ${p.kind} | ${r.title} | ${r.city}, ${r.state}, ${r.country} | $${r.price.toLocaleString()} | ${r.product_location}`);
    }
    if (planned.length) {
      console.log('[publish] product URLs (first 20):');
      for (const u of urls.slice(0, 20)) console.log(`  ${u}`);
    }
    fs.writeFileSync(
      path.join(ROOT, '.publish-plan.json'),
      JSON.stringify({ generatedAt: new Date().toISOString(), batch, count: planned.length, urls, rows: planned.map((p) => p.row) }, null, 2),
    );
    console.log('[publish] plan written to .publish-plan.json');
  }

  return { mode: live ? 'live' : 'dry-run', batch, locations: LOCATIONS.length, countries, existing: ids.size, newRows: planned.length, skipped: skipped.length, urls, breakdown, inserted, failed, maxCycle, maxSeq, indexNow };
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

export { rowsForCycle, houseRow, carRow, motorhomeRow, applianceRow, dogRow, productRow, propId, LOCATIONS, ILLUSTRATIVE_NOTE, INDEXNOW_KEY, INDEXNOW_KEY_URL };

if (isMain) {
  const args = process.argv.slice(2);
  const LIVE = args.includes('--live');
  const BATCH = Number((args.find((a) => a.startsWith('--batch=')) || '--batch=8').split('=')[1] || 8);
  runPublish({ live: LIVE, batch: BATCH }).catch((err) => {
    console.error('[publish] ERROR:', err && err.message ? err.message : err);
    process.exit(1);
  });
}