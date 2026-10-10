import { COUNTRIES, COUNTRY_CURRENCY, getCountryByCode } from './country-data.js';

export const GLOBAL_PRICE_MIN = 1;
export const GLOBAL_PRICE_MAX = 5000000;

const PRODUCT_TEMPLATES = [
  { id: 'prod-smartphone', listingType: 'product', category: 'Phones', subcategory: 'Smartphones', label: 'Flagship Smartphone', brand: 'Global Mobile', model: 'X Pro', color: 'Midnight Black', size: '6.7-inch', condition: 'New', features: ['5G connectivity', 'OLED display', 'Fast charging', 'Unlocked', 'Premium cameras'], highlights: ['Retail-ready packaging', 'Strong search demand', 'Ideal for global shipping'], keywords: ['smartphone', 'mobile phone', '5g'], descriptionType: 'phone' },
  { id: 'prod-laptop', listingType: 'product', category: 'Computers & Laptops', subcategory: 'Laptops', label: 'Performance Laptop', brand: 'NorthBridge', model: 'Studio 14', color: 'Silver', size: '14-inch', condition: 'New', features: ['Fast processor', 'SSD storage', 'Long battery life', 'Portable chassis', 'Business-ready design'], highlights: ['Suitable for work and study', 'Premium margin band', 'Global audience appeal'], keywords: ['laptop', 'notebook', 'computer'], descriptionType: 'laptop' },
  { id: 'prod-tv', listingType: 'product', category: 'Electronics', subcategory: 'Smart TVs', label: '4K Smart TV', brand: 'VistaHome', model: 'UltraView', color: 'Black', size: '65-inch', condition: 'New', features: ['4K panel', 'Streaming apps', 'HDR support', 'Voice control', 'Slim bezel'], highlights: ['Living-room centerpiece', 'Popular premium electronics segment'], keywords: ['tv', 'smart tv', 'home electronics'], descriptionType: 'electronics' },
  { id: 'prod-watch', listingType: 'product', category: 'Watches', subcategory: 'Luxury Watches', label: 'Luxury Wristwatch', brand: 'Aurelius', model: 'Chrono 8', color: 'Gold / Black', size: '42mm', condition: 'New', features: ['Precision movement', 'Premium case', 'Gift-ready presentation', 'Water resistance', 'Collector appeal'], highlights: ['High perceived value', 'Strong gifting category'], keywords: ['watch', 'luxury watch', 'timepiece'], descriptionType: 'luxury' },
  { id: 'prod-jewelry', listingType: 'product', category: 'Jewelry', subcategory: 'Fine Jewelry', label: 'Fine Jewelry Set', brand: 'Maison Valeur', model: 'Signature Set', color: 'Gold', size: 'Adjustable', condition: 'New', features: ['Premium finish', 'Gift packaging', 'Occasion-ready', 'Elegant styling'], highlights: ['High-value presentation', 'Wedding and celebration demand'], keywords: ['jewelry', 'necklace', 'bracelet'], descriptionType: 'luxury' },
  { id: 'prod-handbag', listingType: 'product', category: 'Bags & Accessories', subcategory: 'Designer Bags', label: 'Designer Handbag', brand: 'Rue Maison', model: 'Carry All', color: 'Tan', size: 'Medium', condition: 'New', features: ['Structured silhouette', 'Premium hardware', 'Travel-friendly storage', 'Retail-ready finish'], highlights: ['Fashion-forward listing', 'Broad international demand'], keywords: ['handbag', 'designer bag', 'accessories'], descriptionType: 'fashion' },
  { id: 'prod-sneakers', listingType: 'product', category: 'Shoes', subcategory: 'Premium Sneakers', label: 'Premium Sneakers', brand: 'RunNorth', model: 'Air Flex', color: 'White', size: 'EU 42', condition: 'New', features: ['Comfort cushioning', 'Streetwear styling', 'Durable outsole', 'Daily wear ready'], highlights: ['High-conversion category', 'Easy multi-country merchandising'], keywords: ['sneakers', 'shoes', 'fashion'], descriptionType: 'fashion' },
  { id: 'prod-sofa', listingType: 'product', category: 'Furniture', subcategory: 'Living Room', label: 'Luxury Sofa Set', brand: 'Grand Habitat', model: 'Residence 3-Piece', color: 'Sand Beige', size: '3-Piece Set', condition: 'New', features: ['Premium upholstery', 'Statement living-room piece', 'Comfort seating', 'Interior-ready styling'], highlights: ['Large-ticket home category', 'Ideal for premium households'], keywords: ['sofa', 'furniture', 'living room'], descriptionType: 'home' },
  { id: 'prod-generator', listingType: 'product', category: 'Home & Kitchen', subcategory: 'Power Solutions', label: 'Backup Power Generator', brand: 'VoltWorks', model: 'SilentMax', color: 'Graphite', size: '7.5kVA', condition: 'New', features: ['Reliable backup power', 'Low-noise housing', 'Residential and business use', 'Heavy-duty build'], highlights: ['Practical high-demand utility item', 'Useful in many markets'], keywords: ['generator', 'power', 'backup power'], descriptionType: 'industrial' },
  { id: 'prod-drone', listingType: 'product', category: 'Cameras & Photography', subcategory: 'Drones', label: 'Pro Camera Drone', brand: 'SkyFrame', model: 'Aerial 4K', color: 'Gray', size: 'Foldable', condition: 'New', features: ['4K stabilized video', 'GPS return home', 'Portable folding frame', 'Creator-ready footage'], highlights: ['Strong visual listing appeal', 'Premium creator equipment'], keywords: ['drone', 'camera drone', 'aerial'], descriptionType: 'electronics' },
  { id: 'prod-grocery', listingType: 'product', category: 'Food & Groceries', subcategory: 'Family Essentials', label: 'Family Grocery Bundle', brand: 'Market Select', model: 'Household Pack', color: 'Mixed', size: 'Bulk Pack', condition: 'New', features: ['Everyday essentials', 'Bulk value', 'Family sized', 'Easy repeat orders'], highlights: ['Fast-moving everyday goods', 'Useful across broad regions'], keywords: ['groceries', 'food bundle', 'household essentials'], descriptionType: 'daily' },
  { id: 'prod-scale-house', listingType: 'product', category: 'Home & Kitchen', subcategory: 'Model Houses', label: 'Architectural Model House', brand: 'Studio Form', model: 'Estate Miniature', color: 'Natural Wood', size: '1:50 Scale', condition: 'New', features: ['Collector display piece', 'Detailed craftsmanship', 'Interior decor appeal', 'Gift-ready packaging'], highlights: ['Supports the model-house use case', 'Works for decor and collector audiences'], keywords: ['model house', 'architectural model', 'collector decor'], descriptionType: 'home' },
  { id: 'veh-sedan', listingType: 'product', category: 'Cars', subcategory: 'Sedans', label: 'Executive Sedan', brand: 'Summit Motors', model: 'S Line', color: 'Pearl White', size: 'Mid-size', condition: 'Used - Like New', features: ['Comfortable cabin', 'Road-trip ready', 'Well-maintained presentation', 'Family and executive appeal'], highlights: ['Vehicle posts support 24-image galleries', 'Map-ready listing'], keywords: ['car', 'sedan', 'vehicle'], requiredImageCount: 24, descriptionType: 'vehicle' },
  { id: 'veh-suv', listingType: 'product', category: 'Cars', subcategory: 'SUVs', label: 'Family SUV', brand: 'Frontier Auto', model: 'Terrain X', color: 'Obsidian', size: '7-Seater', condition: 'Used - Like New', features: ['Spacious seating', 'Utility-focused cargo room', 'Suitable for families', 'Road and city versatility'], highlights: ['High-demand automotive segment', 'Works well with showroom map'], keywords: ['suv', 'family car', 'vehicle'], requiredImageCount: 24, descriptionType: 'vehicle' },
  { id: 'veh-luxury', listingType: 'product', category: 'Luxury Cars', subcategory: 'Luxury Vehicles', label: 'Luxury Performance Car', brand: 'Regal Automotive', model: 'Imperium GT', color: 'Metallic Black', size: 'Coupe', condition: 'Used - Like New', features: ['Prestige brand positioning', 'Performance styling', 'Collector-level appeal', 'Premium interior'], highlights: ['Supports the requested high-ticket range', 'Designed for showroom-style luxury listings'], keywords: ['luxury car', 'sports car', 'supercar'], requiredImageCount: 24, descriptionType: 'vehicle' },
  { id: 'veh-motorcycle', listingType: 'product', category: 'Motorcycles', subcategory: 'Street Bikes', label: 'Sport Motorcycle', brand: 'Velocity Moto', model: 'R 900', color: 'Red', size: '900cc', condition: 'Used - Like New', features: ['Agile handling', 'Performance design', 'Lifestyle buyer appeal', 'Weekend-ready machine'], highlights: ['Automotive category with image-rich display'], keywords: ['motorcycle', 'bike', 'sport bike'], requiredImageCount: 24, descriptionType: 'vehicle' },
  { id: 'veh-commercial', listingType: 'product', category: 'Commercial Vehicles', subcategory: 'Utility Vehicles', label: 'Commercial Utility Vehicle', brand: 'FleetCore', model: 'CargoPro', color: 'White', size: 'Long wheelbase', condition: 'Used - Good', features: ['Business-ready load space', 'Fleet-friendly purchase', 'Service history presentation', 'Commercial utility'], highlights: ['Suitable for business buyers', 'Map-ready logistics listing'], keywords: ['commercial vehicle', 'cargo van', 'fleet'], requiredImageCount: 24, descriptionType: 'vehicle' },
  { id: 'veh-boat', listingType: 'product', category: 'Boats & Marine', subcategory: 'Leisure Boats', label: 'Leisure Boat', brand: 'BlueHarbor', model: 'Coastline 28', color: 'Navy / White', size: '28 ft', condition: 'Used - Like New', features: ['Marina-ready presentation', 'Leisure and charter appeal', 'Premium leisure category'], highlights: ['Large-format gallery support', 'High-ticket recreational listing'], keywords: ['boat', 'marine', 'yacht'], requiredImageCount: 24, descriptionType: 'vehicle' },
];

const PROPERTY_TEMPLATES = [
  { id: 'prop-apartment', listingType: 'property', category: 'Real Estate', subcategory: 'Apartments', label: 'City Apartment', propertyType: 'Apartment', bedrooms: 2, bathrooms: 2, buildingSize: '1,150 sqft', landSize: '', furnished: 'Furnished', features: ['Secure access', 'Modern kitchen', 'Prime urban access', 'Balcony or city views'], highlights: ['Strong urban demand', 'Good for short and long stay buyers'], keywords: ['apartment', 'real estate', 'city home'], requiredImageCount: 24, descriptionType: 'property' },
  { id: 'prop-condo', listingType: 'property', category: 'Real Estate', subcategory: 'Condos', label: 'Modern Condo', propertyType: 'Condo', bedrooms: 3, bathrooms: 2, buildingSize: '1,450 sqft', landSize: '', furnished: 'Furnished', features: ['Managed building', 'Amenity access', 'Contemporary finish', 'Secure parking'], highlights: ['Works across major global markets'], keywords: ['condo', 'property', 'home'], requiredImageCount: 24, descriptionType: 'property' },
  { id: 'prop-townhouse', listingType: 'property', category: 'Real Estate', subcategory: 'Townhouses', label: 'Townhouse Residence', propertyType: 'Townhouse', bedrooms: 4, bathrooms: 3, buildingSize: '2,000 sqft', landSize: '0.08 acres', furnished: 'Unfurnished', features: ['Multi-level layout', 'Family-ready plan', 'Private entry', 'Parking included'], highlights: ['Popular residential ownership format'], keywords: ['townhouse', 'residence', 'property'], requiredImageCount: 24, descriptionType: 'property' },
  { id: 'prop-villa', listingType: 'property', category: 'Real Estate', subcategory: 'Villas', label: 'Private Villa', propertyType: 'Villa', bedrooms: 5, bathrooms: 5, buildingSize: '4,800 sqft', landSize: '0.4 acres', furnished: 'Furnished', features: ['Private outdoor space', 'Premium architecture', 'Luxury entertaining zones', 'Prestige location potential'], highlights: ['Premium property tier', 'Designed for international buyers'], keywords: ['villa', 'luxury property', 'real estate'], requiredImageCount: 24, descriptionType: 'property' },
  { id: 'prop-mansion', listingType: 'property', category: 'Real Estate', subcategory: 'Mansions', label: 'Luxury Mansion', propertyType: 'Mansion', bedrooms: 8, bathrooms: 10, buildingSize: '12,000 sqft', landSize: '1.2 acres', furnished: 'Furnished', features: ['Grand entrance', 'High-end interior finishes', 'Staff or guest quarters', 'Statement curb appeal'], highlights: ['Matches the mansion requirement directly', 'Supports high-ticket luxury listings'], keywords: ['mansion', 'estate', 'luxury home'], requiredImageCount: 24, descriptionType: 'property' },
  { id: 'prop-beach', listingType: 'property', category: 'Real Estate', subcategory: 'Beach Houses', label: 'Beachfront House', propertyType: 'Beach House', bedrooms: 4, bathrooms: 4, buildingSize: '3,600 sqft', landSize: '0.25 acres', furnished: 'Furnished', features: ['Waterfront views', 'Outdoor leisure space', 'Vacation-rental appeal', 'Premium lifestyle positioning'], highlights: ['Ideal for tourism and lifestyle markets'], keywords: ['beach house', 'waterfront home', 'property'], requiredImageCount: 24, descriptionType: 'property' },
  { id: 'prop-farm', listingType: 'property', category: 'Real Estate', subcategory: 'Farm Houses', label: 'Farm House Estate', propertyType: 'Farm House', bedrooms: 4, bathrooms: 3, buildingSize: '3,100 sqft', landSize: '5 acres', furnished: 'Unfurnished', features: ['Land-rich asset', 'Agricultural potential', 'Quiet residential use', 'Outbuilding opportunity'], highlights: ['Suitable for rural and suburban regions'], keywords: ['farm house', 'landed property', 'estate'], requiredImageCount: 24, descriptionType: 'property' },
  { id: 'prop-commercial', listingType: 'property', category: 'Real Estate', subcategory: 'Commercial Buildings', label: 'Commercial Building', propertyType: 'Commercial Building', bedrooms: 0, bathrooms: 4, buildingSize: '8,500 sqft', landSize: '0.35 acres', furnished: 'Unfurnished', features: ['Business district potential', 'Mixed-use flexibility', 'Visible frontage', 'Investor-ready asset class'], highlights: ['Attractive for business buyers and investors'], keywords: ['commercial building', 'office', 'investment property'], requiredImageCount: 24, descriptionType: 'property' },
  { id: 'prop-hotel', listingType: 'property', category: 'Real Estate', subcategory: 'Hotels', label: 'Boutique Hotel', propertyType: 'Hotel', bedrooms: 18, bathrooms: 20, buildingSize: '15,000 sqft', landSize: '0.75 acres', furnished: 'Furnished', features: ['Hospitality-ready layout', 'Guest-focused amenities', 'Tourism and corporate appeal', 'Revenue asset potential'], highlights: ['Supports hospitality listings globally'], keywords: ['hotel', 'hospitality', 'investment'], requiredImageCount: 24, descriptionType: 'property' },
  { id: 'prop-land', listingType: 'property', category: 'Real Estate', subcategory: 'Land', label: 'Development Land', propertyType: 'Land', bedrooms: 0, bathrooms: 0, buildingSize: '', landSize: '10 acres', furnished: '', features: ['Development potential', 'Flexible use case', 'Long-term investment appeal', 'Location-led value'], highlights: ['Useful for land banking and development'], keywords: ['land', 'plot', 'development'], requiredImageCount: 24, descriptionType: 'property' },
];

export const GLOBAL_CATALOG_TEMPLATES = [...PRODUCT_TEMPLATES, ...PROPERTY_TEMPLATES];

export function getDefaultCurrencyForCountry(countryCode) {
  return COUNTRY_CURRENCY[countryCode] || 'USD';
}

export function getTemplatesForCategory(listingType, category) {
  return GLOBAL_CATALOG_TEMPLATES.filter(template => {
    if (template.listingType !== listingType) return false;
    if (!category) return true;
    return template.category === category;
  });
}

function moneyText(price, currency) {
  const safePrice = Math.max(GLOBAL_PRICE_MIN, Math.min(GLOBAL_PRICE_MAX, Number(price) || GLOBAL_PRICE_MIN));
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD', maximumFractionDigits: 0 }).format(safePrice);
}

function buildDescription(template, country, currency, price, locationLine) {
  const priceLabel = moneyText(price, currency);
  if (template.descriptionType === 'vehicle') return `${template.label} listed at ${priceLabel}. This template is intended to present a complete automotive post with exterior, interior, condition, performance, and gallery details in a clean showroom-style format.`;
  if (template.descriptionType === 'property') return `${template.label} located in ${locationLine}. Offered at ${priceLabel}, this property template is designed for a complete real-estate presentation with map-ready location data, rich visual gallery coverage, and buyer-friendly highlights covering layout, lifestyle, and investment value.`;
  if (template.descriptionType === 'phone') return `${template.label} listed at ${priceLabel}. The template focuses on a clean premium device presentation with brand, model, condition, core features, and strong online merchandising copy.`;
  if (template.descriptionType === 'laptop') return `${template.label} listed at ${priceLabel}. Built for marketplace listings that need clear performance positioning, specification highlights, and an easy-to-scan description for students, professionals, and remote workers.`;
  if (template.descriptionType === 'luxury') return `${template.label} listed at ${priceLabel}. This template supports high-value presentation with polished positioning, premium selling points, and a strong showroom-style description.`;
  if (template.descriptionType === 'fashion') return `${template.label} listed at ${priceLabel}. This product template highlights styling, quality, and day-to-day appeal while keeping the listing easy to customize.`;
  if (template.descriptionType === 'home') return `${template.label} listed at ${priceLabel}. The listing copy is structured for shoppers looking for quality presentation, reliable detail, and visual merchandising support.`;
  if (template.descriptionType === 'industrial') return `${template.label} listed at ${priceLabel}. This template emphasizes practical use, dependable performance, and business or household value in a straightforward format.`;
  if (template.descriptionType === 'daily') return `${template.label} listed at ${priceLabel}. The copy is designed for repeat-buy categories with clear value messaging and broad buyer appeal.`;
  return `${template.label} listed at ${priceLabel}. This template generates a clean, marketable listing with ready-made highlights, keywords, and presentation details.`;
}

export function buildCatalogDraft({ templateId, listingType, category, countryCode, currency, price }) {
  const template = GLOBAL_CATALOG_TEMPLATES.find(item => item.id === templateId && item.listingType === listingType);
  if (!template) return null;
  const country = getCountryByCode(countryCode) || COUNTRIES[0];
  const resolvedCurrency = currency || getDefaultCurrencyForCountry(country.code);
  const locationLine = [country.name].filter(Boolean).join(', ');
  const base = {
    category: template.category || category || (listingType === 'property' ? 'Real Estate' : 'Other'),
    subcategory: template.subcategory || template.label,
    title: listingType === 'property' ? `${template.label} in ${country.name}` : template.label,
    description: buildDescription(template, country, resolvedCurrency, price, locationLine),
    currency: resolvedCurrency,
    features: [...template.features],
    highlights: [...(template.highlights || [])],
    seo_keywords: [...new Set([template.category, template.subcategory, template.label, ...(listingType === 'property' ? [country.name] : []), ...(template.keywords || [])].filter(Boolean))],
    requiredImageCount: template.requiredImageCount || 0,
  };

  if (listingType === 'property') {
    return {
      ...base,
      country: country.name,
      country_code: country.code,
      product_location: country.name,
      property_type: template.propertyType || template.label,
      bedrooms: template.bedrooms ?? null,
      bathrooms: template.bathrooms ?? null,
      building_size: template.buildingSize || '',
      land_size: template.landSize || '',
      furnished: template.furnished || '',
    };
  }

  return {
    ...base,
    brand: template.brand || '',
    model: template.model || '',
    color: template.color || '',
    size: template.size || '',
    condition: template.condition || 'New',
  };
}