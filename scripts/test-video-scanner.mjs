// scripts/test-video-scanner.mjs
// Verifies the pure logic behind the AI Video Scanner's dynamic forms:
// normalisation of AI output, validation, and mapping generated fields onto
// real showroom_listings columns. Run: node scripts/test-video-scanner.mjs
import assert from 'node:assert/strict';
import {
  normalizeItems, normalizeItem, activeFields, validateItem,
  buildListingPayload, buildFormSchema, itemFromSchema, blankField,
} from '../src/dynamic-form.js';

let passed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log(`  ok  - ${name}`); }
  catch (e) { console.error(`  FAIL - ${name}\n        ${e.message}`); process.exitCode = 1; }
}

// A realistic Gemini response for a car.
const carResult = {
  status: 'ok', detected: true, label: 'Silver 2019 Toyota Corolla', confidence: 82,
  items: [{
    title: '2019 Toyota Corolla', listing_type: 'vehicle', category: 'Cars', subcategory: 'Sedan',
    description: 'A silver Toyota Corolla seen in the video.',
    features: ['Alloy wheels', 'Air conditioning'], highlights: ['Low mileage'], seo_keywords: ['corolla'],
    fields: [
      { key: 'title', label: 'Title', type: 'text', value: '2019 Toyota Corolla', required: true },
      { key: 'brand', label: 'Brand', type: 'text', value: 'Toyota' },
      { key: 'model', label: 'Model', type: 'text', value: 'Corolla' },
      { key: 'model_year', label: 'Year', type: 'number', value: '2019' },
      { key: 'mileage', label: 'Mileage', type: 'number', value: '' },
      { key: 'transmission', label: 'Transmission', type: 'select', value: 'Automatic', options: ['Automatic', 'Manual'] },
      { key: 'condition', label: 'Condition', type: 'select', value: '', options: ['New', 'Used'] },
      { key: 'price', label: 'Price', type: 'price', value: '', required: true },
      { key: 'description', label: 'Description', type: 'textarea', value: 'A silver Toyota Corolla.' },
    ],
  }],
};

console.log('\nnormalizeItems');

test('reads items and pre-fills values (auto-fill)', () => {
  const items = normalizeItems(carResult);
  assert.equal(items.length, 1);
  const byKey = Object.fromEntries(activeFields(items[0]).map((f) => [f.key, f]));
  assert.equal(byKey.brand.value, 'Toyota');
  assert.equal(byKey.model_year.value, '2019');
  assert.equal(byKey.transmission.value, 'Automatic');
});

test('never invents a blank price (stays empty)', () => {
  const items = normalizeItems(carResult);
  const price = activeFields(items[0]).find((f) => f.key === 'price');
  assert.equal(price.value, '');
});

test('degrades a select with no options to text', () => {
  const item = normalizeItem({ fields: [{ key: 'foo', type: 'select', value: 'x', options: [] }] }, 0);
  assert.equal(item.fields.find((f) => f.key === 'foo').type, 'text');
});

test('guessed markers are stripped from values', () => {
  const item = normalizeItem({ fields: [{ key: 'mileage', type: 'number', value: 'approximately 20000' }] }, 0);
  assert.equal(item.fields.find((f) => f.key === 'mileage').value, '');
});

test('adds title + description when missing', () => {
  const item = normalizeItem({ fields: [{ key: 'brand', type: 'text', value: 'X' }] }, 0);
  const keys = item.fields.map((f) => f.key);
  assert.ok(keys.includes('title'));
  assert.ok(keys.includes('description'));
});

test('falls back to a single item when nothing detected', () => {
  const items = normalizeItems({ status: 'cannot_determine', items: [] }, { fallbackLabel: 'Unknown' });
  assert.equal(items.length, 1);
  assert.equal(items[0].title, 'Unknown');
});

test('multi-product videos produce multiple items', () => {
  const items = normalizeItems({ status: 'ok', items: [{ title: 'A', fields: [] }, { title: 'B', fields: [] }] });
  assert.equal(items.length, 2);
});

console.log('\nvalidateItem');

test('blocks publish without title/price', () => {
  const item = normalizeItem({ fields: [{ key: 'title', type: 'text', value: '' }, { key: 'price', type: 'price', value: '' }] }, 0);
  const r = validateItem(item, { requirePrice: true });
  assert.equal(r.ok, false);
  assert.ok(r.errors.some((e) => e.key === 'title'));
  assert.ok(r.errors.some((e) => e.key === 'price'));
});

test('allows a draft save without a price', () => {
  const item = normalizeItem({ fields: [{ key: 'title', type: 'text', value: 'Thing' }, { key: 'price', type: 'price', value: '' }] }, 0);
  assert.equal(validateItem(item, { requirePrice: false }).ok, true);
});

test('flags an empty required field', () => {
  const item = normalizeItem({ fields: [{ key: 'title', type: 'text', value: 'T' }, { key: 'sku', type: 'text', value: '', required: true }] }, 0);
  const r = validateItem(item, { requirePrice: false });
  assert.equal(r.ok, false);
  assert.ok(r.errors.some((e) => e.key === 'sku'));
});

console.log('\nbuildListingPayload');

test('maps known keys to columns and unknown keys to specifications', () => {
  const item = normalizeItems(carResult)[0];
  const p = buildListingPayload(item, {}, { propertyId: 'W-1', isActive: true, approvalStatus: 'published' });
  assert.equal(p.title, '2019 Toyota Corolla');
  assert.equal(p.brand, 'Toyota');
  assert.equal(p.listing_type, 'vehicle');
  assert.equal(p.category, 'Cars');
  assert.equal(p.specifications.model_year, '2019');  // not a column -> specs
  assert.equal(p.specifications.mileage, null);        // blank, never invented
  assert.equal(p.specifications.model, 'Corolla');
  assert.equal(p.specifications.transmission, 'Automatic');
  assert.equal(p.is_active, true);
  assert.equal(p.approval_status, 'published');
  assert.equal(p.ai_form_schema.version, 1);
});

test('price becomes null (not 0) when blank, so validation catches it', () => {
  const item = normalizeItems(carResult)[0];
  const p = buildListingPayload(item, {}, { propertyId: 'W-1' });
  assert.equal(p.price, null);
});

test('an edited DOM value overrides the AI value', () => {
  const item = normalizeItems(carResult)[0];
  const p = buildListingPayload(item, { price: '12500', title: 'Edited title' }, { propertyId: 'W-2' });
  assert.equal(p.price, 12500);
  assert.equal(p.title, 'Edited title');
});

test('array fields are preserved and unsafe keys are ignored', () => {
  const item = normalizeItems(carResult)[0];
  const p = buildListingPayload(item, { features: 'Sunroof, Leather' }, {});
  assert.deepEqual(p.features, ['Sunroof', 'Leather']);
  item.fields.push({ ...blankField('weird key!'), key: 'not a column' });
  const p2 = buildListingPayload(item, {}, {});
  assert.equal(p2['not a column'], undefined);
});

console.log('\nschema round-trip');

test('a saved form schema reopens with the same fields and values', () => {
  const item = normalizeItems(carResult)[0];
  const schema = buildFormSchema(item, { price: '9999' });
  const reopened = itemFromSchema(schema, {});
  const keys = activeFields(reopened).map((f) => f.key);
  assert.ok(keys.includes('transmission'));
  assert.ok(keys.includes('model_year'));
  assert.equal(reopened.listing_type, 'vehicle');
  const price = activeFields(reopened).find((f) => f.key === 'price');
  assert.equal(price.value, '9999');
});

test('AI-invented fields survive the round-trip', () => {
  const item = normalizeItem({ fields: [{ key: 'warranty_months', label: 'Warranty (months)', type: 'number', value: '24' }] }, 0);
  const reopened = itemFromSchema(buildFormSchema(item, {}), {});
  assert.ok(activeFields(reopened).some((f) => f.key === 'warranty_months'));
});

console.log(`\n${passed} checks passed.\n`);
