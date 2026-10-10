// Deterministic, realistic-looking customer reviews seeded per product.
// EVERY product gets its OWN large, independent review base (187+ reviews,
// varied per product) — never shared with another product, never the same text
// on another page, and stable across reloads.
//
// The reviews talk about the ONLINE SHOP experience (ordering, checkout,
// shipping, customer service, delivery) — NOT about the product — so nothing
// suggests a product existed since 2018. The shop opened in October 2018, so
// review dates begin in 2018 and are mixed across 2019, 2020, 2021, 2022, 2023,
// 2024, 2025 and 2026 (2026 is NOT used everywhere).
//
// Locations are limited to good countries (USA, Canada, UK, Ireland, Europe,
// Australia, New Zealand, Singapore, Japan, South Korea, UAE, etc.). No bad or
// developing countries are used.

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

// Shop-experience comments written to sound like REAL short-form app comments
// (TikTok/Instagram style): casual, lowercase, light punctuation, occasional
// emoji — never stiff marketing paragraphs.
const OPENERS = [
  "just ordered from this shop and it was so easy fr",
  "first time buying here and honestly impressed ngl",
  "checked out in like 2 minutes, easiest thing ever",
  "was a little skeptical at first but it all worked out",
  "placed my order from my phone, super smooth",
  "i've ordered here a few times and it never lets me down",
  "took a chance on this store and zero regrets",
  "signing up and ordering took no time at all",
  "everything from picking to paying was really simple",
  "first international order and it went perfectly 🙏",
  "lowkey wasn't expecting much but it was great",
  "order went through instantly, no drama",
  "the site is so easy to use, even i managed it lol",
  "been shopping online for years, this one stands out",
  "quick and painless, just how online shopping should be",
  "had a tiny doubt before ordering but it was fine",
  "the whole process felt very professional",
  "just what i needed, no stress, no hassle",
  "my cousin recommended this shop and he was right",
  "ordered without overthinking and it paid off",
];

const DETAILS = [
  "shipping was mad fast, arrived way earlier than expected",
  "my package came in perfect condition 🔥",
  "the delivery guy was super nice and careful",
  "got updates the entire time, no guessing",
  "tracking was accurate and it showed up on time",
  "packaging was really solid, nothing was damaged",
  "they answered my question in like 10 minutes",
  "customer service was actually helpful, rare these days",
  "everything arrived exactly as described",
  "the parcel was wrapped so well, impressive",
  "it showed up a day early, which was a nice surprise",
  "payment was secure and confirmation came right away",
  "kept me posted at every single step",
  "dispatching was quick, shipped the same day",
  "the item looked even better in person",
  "my order was handled with so much care",
  "they were super responsive whenever i messaged",
  "the tracking link actually worked the whole way",
  "delivery was on schedule, not a minute late",
  "everything came neatly packed and in one piece",
  "no issues at all, straight to my door",
  "they followed up after delivery which i thought was nice",
  "the whole team was polite and professional",
  "my doubts disappeared once the package arrived",
  "quality was clear as soon as i opened the box",
  "support replied quickly even though it was late",
  "well organized from start to finish",
  "came when they said it would, no surprises",
  "fast dispatch and smooth handling of my order",
  "the notifications kept me calm the whole time lol",
  "everything i ordered was in the box, nothing missing",
  "the courier called before arriving, so professional",
  "shipped in sturdy packaging, survived the trip perfectly",
  "i could track it the whole way, very reassuring",
  "they processed my order in record time",
  "came in perfect shape and very well protected",
  "every update they sent was accurate and clear",
  "exactly the delivery experience you hope for",
  "returns and support were straightforward too",
  "very clean, well managed order, i was impressed",
];

const CLOSERS = [
  "100% ordering again fr",
  "would recommend this shop to anyone",
  "already told my friends about it",
  "this is my new go to place now",
  "can't recommend them enough",
  "definitely coming back, no question",
  "so glad i found this store",
  "will 100% be back 💯",
  "no complaints at all honestly",
  "totally worth it, trust me",
  "10/10 experience, easy",
  "this shop is legit, trust",
  "loyal customer for life now",
  "five stars from me, easy",
  "a real hidden gem honestly",
  "can't wait for my next order",
];

// Category-flavoured lines that stay about the SHOP experience, not the item
// itself, so no one assumes the product dates back to 2018.
const CATEGORY_DETAILS = {
  vehicle: [
    "my vehicle was delivered safe and sound, kept me updated the whole trip",
    "the listing was exact and delivery was arranged super smoothly",
  ],
  property: [
    "the listing was spot on and they walked me through the whole process",
    "all the paperwork was handled clean, very easy from start to finish",
  ],
  phone: [
    "the phone matched the photos exactly and shipped out quick",
    "they double checked everything before sending, packaging was solid",
  ],
  pet: [
    "they handled everything so carefully, i felt reassured the whole way",
    "all the paperwork was sorted out and the process was really easy",
  ],
  product: [
    "the item was exactly like the photos, arrived in great shape",
    "order was processed fast and the packaging was really solid",
  ],
};

// Small emoji sprinkle so a few comments feel lived-in, never every one.
const EMOJIS = ['🔥','✨','😍','🙌','💯','😭','❤️','👍','🎯','👌','✅','⚡','📦','🙏'];

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

    // Unique body per product: opener + detail(s) + closer.
    const bi = poolIndex(h, i, bodyStep, bodySpace);
    let idx = bi;
    const opener = OPENERS[idx % OPENERS.length]; idx = Math.floor(idx / OPENERS.length);
    const d1 = DETAILS[idx % DETAILS.length]; idx = Math.floor(idx / DETAILS.length);
    const d2 = DETAILS[idx % DETAILS.length]; idx = Math.floor(idx / DETAILS.length);
    const closer = CLOSERS[idx % CLOSERS.length];
    let text = `${opener} ${d1}`;
    if (i % 3 === 0 && catPool.length) {
      text += ` ${catPool[i % catPool.length]}`;
    }
    if (i % 2 === 0) text += ` ${d2}`;
    text += ` ${closer}`;
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