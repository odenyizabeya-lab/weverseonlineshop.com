// Deterministic, realistic-looking customer reviews seeded per house listing.
// EVERY listing gets its OWN large, independent review base (187+ reviews,
// varied per listing) — never shared with another listing, never the same text
// on another page, and stable across reloads.
//
// The reviews talk about the HOUSE itself — how it looks, its rooms, light,
// garden, street and overall feel — short and human, never shop/payment talk.
// Review dates begin in 2018 (when the shop opened) and are mixed across
// 2019-2026 (2026 is NOT used everywhere).
//
// Locations are limited to good countries (USA, Canada, UK, Ireland, Europe,
// Australia, New Zealand, Singapore, Japan, South Korea, UAE, etc.).

function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 90 x 90 = 8,100 unique name combos — enough for every review in a single
// product to have its own name while still feeling like a real global shop.
const FIRST_NAMES = [
  'James','Emma','Liam','Olivia','Noah','Ava','Ethan','Sophia','Lucas','Mia',
  'Daniel','Isabella','Matthew','Charlotte','Samuel','Amelia','Gabriel','Harper',
  'Nathan','Evelyn','Caleb','Abigail','Adrian','Ella','Owen','Grace','Leo','Chloe',
  'Julian','Nora','Mason','Aria','Elijah','Layla','Isaac','Zoe','Hunter','Scarlett',
  'Christian','Lily','Aaron','Hannah','Dylan','Savannah','Andrew','Ruby','David','Elena',
  'Ryan','Nina','Marcus','Priya','Kwame','Fatima','Andre','Yuki','Tomas','Ingrid',
  'Mateo','Sofia','Omar','Zara','Felix','Amara','Jonas','Leila','Victor','Mila',
  'Diego','Iris','Hugo','Camila','Adam','Freya','Oscar','Amina','Peter','Naomi',
  'Elias','Lucia','Ray','Talia','Marco','Sienna','Joshua','Anya','Kofi','Petra',
];

const LAST_NAMES = [
  'Anderson','Baker','Carter','Diaz','Evans','Foster','Garcia','Harris','Ingram',
  'Johnson','Kelly','Lewis','Miller','Nelson','Ortiz','Parker','Quinn','Reed',
  'Sanders','Turner','Underwood','Vaughn','Walker','Young','Zimmerman','Brooks',
  'Coleman','Dunn','Fisher','Grant','Hayes','Jordan','Knight','Lopez','Morgan',
  'Nguyen','Okafor','Peterson','Romano','Silva','Thompson','Umeh','Volkov','Wang',
  'Xu','Yates','Zhou','Bennett','Chukwu','Doyle','Eze','Ferreira','Gonzalez','Hansen',
  'Ivanov','Jansen','Kumar','Larsen','Moreau','Novak','Osei','Patel','Quintero',
  'Rossi','Schmidt','Tavares','Ueda','Vasquez','Weber','Xavier','Yamamoto','Ziegler',
  'Adeyemi','Barlow','Costa','Diop','Eriksen','Fontaine','Gomez','Holmes','Ikram',
  'Juma','Karlsson','Lawson','Mensah','Nilsson',
];

// Only good, developed countries. No Nigeria, Ghana, Kenya or similar.
const CITIES = [
  { city: 'Austin', country: 'United States' }, { city: 'New York', country: 'United States' },
  { city: 'Seattle', country: 'United States' }, { city: 'Los Angeles', country: 'United States' },
  { city: 'Chicago', country: 'United States' }, { city: 'Boston', country: 'United States' },
  { city: 'San Diego', country: 'United States' }, { city: 'Denver', country: 'United States' },
  { city: 'Miami', country: 'United States' }, { city: 'Portland', country: 'United States' },
  { city: 'Toronto', country: 'Canada' }, { city: 'Vancouver', country: 'Canada' },
  { city: 'Montreal', country: 'Canada' }, { city: 'Calgary', country: 'Canada' },
  { city: 'Ottawa', country: 'Canada' }, { city: 'London', country: 'United Kingdom' },
  { city: 'Manchester', country: 'United Kingdom' }, { city: 'Birmingham', country: 'United Kingdom' },
  { city: 'Edinburgh', country: 'United Kingdom' }, { city: 'Glasgow', country: 'United Kingdom' },
  { city: 'Bristol', country: 'United Kingdom' }, { city: 'Liverpool', country: 'United Kingdom' },
  { city: 'Dublin', country: 'Ireland' }, { city: 'Cork', country: 'Ireland' },
  { city: 'Paris', country: 'France' }, { city: 'Lyon', country: 'France' },
  { city: 'Marseille', country: 'France' }, { city: 'Berlin', country: 'Germany' },
  { city: 'Munich', country: 'Germany' }, { city: 'Hamburg', country: 'Germany' },
  { city: 'Frankfurt', country: 'Germany' }, { city: 'Amsterdam', country: 'Netherlands' },
  { city: 'Rotterdam', country: 'Netherlands' }, { city: 'Brussels', country: 'Belgium' },
  { city: 'Antwerp', country: 'Belgium' }, { city: 'Zurich', country: 'Switzerland' },
  { city: 'Geneva', country: 'Switzerland' }, { city: 'Vienna', country: 'Austria' },
  { city: 'Rome', country: 'Italy' }, { city: 'Milan', country: 'Italy' },
  { city: 'Florence', country: 'Italy' }, { city: 'Madrid', country: 'Spain' },
  { city: 'Barcelona', country: 'Spain' }, { city: 'Valencia', country: 'Spain' },
  { city: 'Lisbon', country: 'Portugal' }, { city: 'Porto', country: 'Portugal' },
  { city: 'Stockholm', country: 'Sweden' }, { city: 'Gothenburg', country: 'Sweden' },
  { city: 'Oslo', country: 'Norway' }, { city: 'Copenhagen', country: 'Denmark' },
  { city: 'Helsinki', country: 'Finland' }, { city: 'Reykjavik', country: 'Iceland' },
  { city: 'Warsaw', country: 'Poland' }, { city: 'Krakow', country: 'Poland' },
  { city: 'Prague', country: 'Czech Republic' }, { city: 'Athens', country: 'Greece' },
  { city: 'Sydney', country: 'Australia' }, { city: 'Melbourne', country: 'Australia' },
  { city: 'Brisbane', country: 'Australia' }, { city: 'Perth', country: 'Australia' },
  { city: 'Adelaide', country: 'Australia' }, { city: 'Auckland', country: 'New Zealand' },
  { city: 'Wellington', country: 'New Zealand' }, { city: 'Christchurch', country: 'New Zealand' },
  { city: 'Singapore', country: 'Singapore' }, { city: 'Tokyo', country: 'Japan' },
  { city: 'Osaka', country: 'Japan' }, { city: 'Kyoto', country: 'Japan' },
  { city: 'Seoul', country: 'South Korea' }, { city: 'Busan', country: 'South Korea' },
  { city: 'Dubai', country: 'United Arab Emirates' }, { city: 'Abu Dhabi', country: 'United Arab Emirates' },
  { city: 'Doha', country: 'Qatar' }, { city: 'Tel Aviv', country: 'Israel' },
  { city: 'Taipei', country: 'Taiwan' }, { city: 'Hong Kong', country: 'Hong Kong' },
];

// House comments written to sound like REAL people reacting to a listing:
// casual, lowercase, light punctuation, occasional emoji — never stiff
// marketing paragraphs.
const OPENERS = [
  "just viewed this one and wow",
  "saw this house and had to stop scrolling",
  "went to see it over the weekend and fell for it",
  "pics really don't do this place justice",
  "drove past and had to look it up",
  "viewed a few houses this month, this one stood out",
  "couldn't stop thinking about this listing",
  "booked a viewing the same day i saw it",
  "honestly didn't expect to like it this much",
  "this one ticked almost every box for us",
  "showed my wife and she was sold instantly",
  "first one we saw online and nothing else compared",
  "walked in and just knew",
  "wasn't even looking seriously but here we are",
  "the curb appeal got me first ngl",
  "my agent sent this one and it was the best of the lot",
  "been house hunting for months, this finally felt right",
  "the listing looked good, in person it's even better",
  "saw it once and booked a second viewing",
  "this place looked lovely from the photos alone",
];

const DETAILS = [
  "the light in the living room is unreal",
  "kitchen looks brand new honestly",
  "the backyard is huge and so private",
  "high ceilings make it feel massive",
  "every bedroom is a proper size",
  "the front garden is neat and well kept",
  "floors are spotless throughout",
  "big windows with such a nice view",
  "quiet street, really peaceful",
  "open plan downstairs feels so airy",
  "bathrooms are clean and modern",
  "the garden is perfect for the kids",
  "great curb appeal from the road",
  "cosy fireplace in the living room",
  "the walk-in closet is a dream",
  "balcony gets the best evening sun",
  "garage is roomy and tidy",
  "tiled floors keep it cool and clean",
  "new roof, nothing to fix",
  "sunny rooms all day long",
  "the layout just makes sense",
  "modern finish in every room",
  "plenty of space for a growing family",
  "the views from upstairs are lovely",
  "quiet neighbourhood, feels safe",
  "big yard for long summer evenings",
  "everything's updated and move-in ready",
  "bright, clean and well looked after",
  "the master suite is gorgeous",
  "so much natural light everywhere",
  "spacious double garage out front",
  "the porch is such a lovely touch",
  "pristine condition, barely lived in",
  "the open kitchen is great for hosting",
  "a beautiful, well-kept family home",
  "the garden wraps right around the house",
  "tall windows make every room feel bright",
  "the driveway fits two cars easily",
  "warm and welcoming the second you step in",
  "spotless kitchen with so much storage",
];

const CLOSERS = [
  "already picturing us here",
  "best one we've seen by far",
  "told the family straight away",
  "this is the one for us",
  "so glad we found it",
  "can't stop thinking about it tbh",
  "putting in an offer this week",
  "worth every penny honestly",
  "proper dream home vibes",
  "booking a second viewing already",
  "our search might finally be over",
  "showing my mum this weekend",
  "feels like home already",
  "nothing else has come close",
  "made our shortlist instantly",
];

// Short, house-flavoured lines so the comments stay about the property itself.
const CATEGORY_DETAILS = {
  property: [
    "every room is bright and beautifully kept",
    "a solid, loved family home",
  ],
  product: [
    "a lovely, well-kept home",
    "bright and welcoming from the moment you step in",
  ],
};

// Small emoji sprinkle so a few comments feel lived-in, never every one.
const EMOJIS = ['🏡','✨','😍','❤️','🙌','🔥','💯','🌿','🌅','🛋️','🔑','🏠','☀️','🌳'];

// Years from 2018 (shop opened October 2018) with a realistic spread — 2026 is
// present but not dominant. Weighted so middle years are the most common.
const YEAR_WEIGHTS = [
  { year: 2018, w: 3 },
  { year: 2019, w: 7 },
  { year: 2020, w: 11 },
  { year: 2021, w: 13 },
  { year: 2022, w: 15 },
  { year: 2023, w: 16 },
  { year: 2024, w: 15 },
  { year: 2025, w: 12 },
  { year: 2026, w: 8 },
];
const YEAR_TOTAL = YEAR_WEIGHTS.reduce((a, y) => a + y.w, 0);

function pickYear(rng) {
  let r = rng() * YEAR_TOTAL;
  for (const y of YEAR_WEIGHTS) {
    if (r < y.w) return y.year;
    r -= y.w;
  }
  return 2024;
}

// Pick a deterministic unique index within a pool for a given product + slot.
function poolIndex(base, slot, step, poolSize) {
  return (base + slot * step) % poolSize;
}

export function generateSeedReviews(listing, opts = {}) {
  const id = String(listing.property_id || listing.id || '');
  if (!id) return { reviews: [], breakdown: { 5:0, 4:0, 3:0, 2:0, 1:0 }, total: 0, computedRating: 0 };
  const h = hashString(id);

  // Each product gets its OWN large base count (187+), varied per product.
  const show = 187 + (h % 660); // 187..846 per product

  const rating = Math.min(5, Math.max(1, Number(listing.rating) || 0));
  const target = rating || 4.5;

  let p5 = Math.max(0.30, Math.min(0.90, target / 5));
  let p4 = 1 - p5;
  let p3 = 0.07, p2 = 0.04, p1 = 0.03;
  const scale = 1 / (p5 + p4 + p3 + p2 + p1);
  p5 *= scale; p4 *= scale; p3 *= scale; p2 *= scale; p1 *= scale;
  const buckets = [p5, p4, p3, p2, p1];

  const categoryKey = listing.listing_type === 'vehicle' ? 'vehicle'
    : listing.listing_type === 'property' ? 'property'
    : listing.listing_type === 'pet' ? 'pet'
    : (String(listing.category || '').toLowerCase().includes('phone') ? 'phone' : 'product');

  const catPool = CATEGORY_DETAILS[categoryKey] || CATEGORY_DETAILS.product;
  const reviews = [];

  const nameSpace = FIRST_NAMES.length * LAST_NAMES.length; // 8100
  const bodySpace = OPENERS.length * DETAILS.length * DETAILS.length * CLOSERS.length;

  const nameStep = 457, bodyStep = 811;

  for (let i = 0; i < show; i++) {
    const rng = mulberry32(hashString(id + '::' + i));

    // Stars
    let r = rng();
    let stars = 5;
    let acc = 0;
    for (let s = 5; s >= 1; s--) {
      acc += buckets[5 - s];
      if (r <= acc) { stars = s; break; }
    }

    // Unique name per product (modular index avoids repeats within a product).
    const ni = poolIndex(h, i, nameStep, nameSpace);
    const firstName = FIRST_NAMES[Math.floor(ni / LAST_NAMES.length) % FIRST_NAMES.length];
    const lastName = LAST_NAMES[ni % LAST_NAMES.length];
    const name = `${firstName} ${lastName}`;

    // Short, natural body: opener + one feature + closer (never a paragraph).
    const bi = poolIndex(h, i, bodyStep, bodySpace);
    let idx = bi;
    const opener = OPENERS[idx % OPENERS.length]; idx = Math.floor(idx / OPENERS.length);
    const d1 = DETAILS[idx % DETAILS.length]; idx = Math.floor(idx / DETAILS.length);
    const d2 = DETAILS[idx % DETAILS.length]; idx = Math.floor(idx / DETAILS.length);
    const closer = CLOSERS[idx % CLOSERS.length];
    let text = `${opener}, ${d1}. ${closer}`;
    if (i % 7 === 0 && catPool.length) {
      text = `${catPool[i % catPool.length]}. ${closer}`;
    }
    if (i % 5 === 0) text = `${opener}, ${d2}. ${closer}`;
    if (i % 3 === 2) text += ` ${EMOJIS[(h + i * 13) % EMOJIS.length]}`;

    const city = CITIES[poolIndex(h, i, 337, CITIES.length)];

    // Date from October 2018 (shop opening) onwards, realistically spread.
    // Never in the future — always clamped to today.
    const now = Date.now();
    const year = pickYear(rng);
    const month = year === 2018 ? 10 + Math.floor(rng() * 3) : 1 + Math.floor(rng() * 12);
    const day = 1 + Math.floor(rng() * 28);
    const candidate = Date.UTC(year, month - 1, day);
    const date = new Date(Math.min(candidate, now)).toISOString();

    // Casual "@username" handle + engagement counts so the list feels like a
    // real comment thread (likes are deterministic per product + slot).
    const handle = `@${firstName.toLowerCase()}${lastName.toLowerCase()}`;
    const likes = 2 + ((hashString(id + '::likes::' + i) % 380));
    const replies = i % 7 === 0 ? 1 + ((hashString(id + '::rep::' + i) % 4)) : 0;

    reviews.push({
      name,
      handle,
      location: city.country,
      date,
      rating: stars,
      text,
      likes,
      replies,
      verified: false,
      seeded: true,
    });
  }

  // Sort newest first like a real review list.
  reviews.sort((a, b) => (a.date < b.date ? 1 : -1));

  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let assigned = 0;
  for (let s = 5; s >= 1; s--) {
    breakdown[s] = Math.round(show * buckets[5 - s]);
    assigned += breakdown[s];
  }
  const diff = show - assigned;
  if (diff !== 0) breakdown[diff > 0 ? 5 : 1] += diff;

  let weighted = 0;
  for (let s = 5; s >= 1; s--) weighted += s * breakdown[s];
  const computedRating = weighted / show;

  return { reviews, breakdown, total: show, computedRating };
}

export default generateSeedReviews;