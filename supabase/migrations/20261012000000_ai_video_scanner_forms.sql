-- ============================================================================
-- AI Video Scanner: dynamic AI-generated forms
-- ============================================================================
-- The scanner now returns a dynamic form schema (which fields the AI chose) and
-- pre-filled values. We persist BOTH:
--   * the field VALUES  -> real showroom_listings columns + `specifications` jsonb
--   * the field STRUCTURE -> `ai_form_schema` jsonb (so a draft reopens with the
--     exact same fields, including AI-invented ones, with no data loss).
--
-- Everything here is idempotent so it is safe to run on the existing database.
-- Existing rows and unrelated features are untouched.
-- ============================================================================

-- 1. The generated form structure (object: { fields: [...], listing_type, ... }).
ALTER TABLE public.showroom_listings
  ADD COLUMN IF NOT EXISTS ai_form_schema jsonb;

-- 2. Safety net: ensure the other scanner-related columns exist (older DBs may
--    not have run every prior migration). All are nullable / safe defaults.
ALTER TABLE public.showroom_listings
  ADD COLUMN IF NOT EXISTS ai_video_scan jsonb,
  ADD COLUMN IF NOT EXISTS ai_generated_fields jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS approval_status text DEFAULT 'published',
  ADD COLUMN IF NOT EXISTS published_at timestamptz,
  ADD COLUMN IF NOT EXISTS video text;

-- 3. Fast lookup for the admin "Drafts" list.
CREATE INDEX IF NOT EXISTS idx_showroom_listings_drafts
  ON public.showroom_listings (is_active, updated_at DESC);

-- ============================================================================
-- 4. Recreate publish_showroom_upsert so the RPC fallback also persists the
--    newly used columns (previous version silently dropped them).
-- ============================================================================
CREATE OR REPLACE FUNCTION public.publish_showroom_upsert(p_data jsonb)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count integer;
BEGIN
  IF NOT public.is_current_user_admin() THEN
    RAISE EXCEPTION 'permission denied for table showroom_listings'
      USING ERRCODE = '42501';
  END IF;

  INSERT INTO public.showroom_listings (
    property_id, listing_type, category, subcategory, title, description,
    price, currency, country, country_code, state, city, town, product_location,
    latitude, longitude, property_type, listing_status, bedrooms, bathrooms,
    building_size, land_size, parking_spaces, furnished, features, tags,
    highlights, seo_keywords, images, brand, color, size, condition, warranty,
    availability_status, stock_quantity, is_active, is_featured,
    is_ai_generated, ai_generated_fields, ai_form_schema, ai_video_scan,
    specifications, sku, rating, rating_count, favorite_count, video, video_url,
    approval_status, published_at, updated_at, created_at
  )
  SELECT
    r->>'property_id',
    COALESCE(r->>'listing_type', 'product'),
    NULLIF(r->>'category', ''),
    NULLIF(r->>'subcategory', ''),
    COALESCE(r->>'title', 'Untitled Listing'),
    COALESCE(r->>'description', ''),
    COALESCE((r->>'price')::numeric, 0),
    COALESCE(r->>'currency', 'USD'),
    COALESCE(r->>'country', ''),
    COALESCE(r->>'country_code', ''),
    NULLIF(r->>'state', ''),
    NULLIF(r->>'city', ''),
    NULLIF(r->>'town', ''),
    COALESCE(r->>'product_location', ''),
    NULLIF((r->>'latitude')::numeric, NULL),
    NULLIF((r->>'longitude')::numeric, NULL),
    NULLIF(r->>'property_type', ''),
    COALESCE(r->>'listing_status', 'sale'),
    NULLIF((r->>'bedrooms')::integer, NULL),
    NULLIF((r->>'bathrooms')::integer, NULL),
    NULLIF(r->>'building_size', ''),
    NULLIF(r->>'land_size', ''),
    NULLIF((r->>'parking_spaces')::integer, NULL),
    NULLIF(r->>'furnished', ''),
    COALESCE(r->'features', '[]'::jsonb),
    COALESCE(r->'tags', '[]'::jsonb),
    COALESCE(r->'highlights', '[]'::jsonb),
    COALESCE(r->'seo_keywords', '[]'::jsonb),
    COALESCE(r->'images', '[]'::jsonb),
    NULLIF(r->>'brand', ''),
    NULLIF(r->>'color', ''),
    NULLIF(r->>'size', ''),
    NULLIF(r->>'condition', ''),
    NULLIF(r->>'warranty', ''),
    COALESCE(r->>'availability_status', 'In Stock'),
    NULLIF((r->>'stock_quantity')::integer, NULL),
    COALESCE((r->>'is_active')::boolean, true),
    COALESCE((r->>'is_featured')::boolean, false),
    COALESCE((r->>'is_ai_generated')::boolean, false),
    COALESCE(r->'ai_generated_fields', '[]'::jsonb),
    r->'ai_form_schema',
    r->'ai_video_scan',
    COALESCE(r->'specifications', '{}'::jsonb),
    NULLIF(r->>'sku', r->>'property_id'),
    COALESCE((r->>'rating')::numeric, 0),
    COALESCE((r->>'rating_count')::integer, 0),
    COALESCE((r->>'favorite_count')::integer, 0),
    NULLIF(r->>'video', ''),
    NULLIF(r->>'video_url', ''),
    COALESCE(r->>'approval_status', 'published'),
    COALESCE((r->>'published_at')::timestamptz, NULL),
    COALESCE((r->>'updated_at')::timestamptz, now()),
    COALESCE((r->>'created_at')::timestamptz, now())
  FROM jsonb_array_elements(p_data) AS r
  WHERE r->>'property_id' IS NOT NULL
  ON CONFLICT (property_id) DO UPDATE SET
    listing_type = EXCLUDED.listing_type,
    category = EXCLUDED.category,
    subcategory = EXCLUDED.subcategory,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    currency = EXCLUDED.currency,
    country = EXCLUDED.country,
    country_code = EXCLUDED.country_code,
    state = EXCLUDED.state,
    city = EXCLUDED.city,
    town = EXCLUDED.town,
    product_location = EXCLUDED.product_location,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude,
    property_type = EXCLUDED.property_type,
    listing_status = EXCLUDED.listing_status,
    bedrooms = EXCLUDED.bedrooms,
    bathrooms = EXCLUDED.bathrooms,
    building_size = EXCLUDED.building_size,
    land_size = EXCLUDED.land_size,
    parking_spaces = EXCLUDED.parking_spaces,
    furnished = EXCLUDED.furnished,
    features = EXCLUDED.features,
    tags = EXCLUDED.tags,
    highlights = EXCLUDED.highlights,
    seo_keywords = EXCLUDED.seo_keywords,
    images = EXCLUDED.images,
    brand = EXCLUDED.brand,
    color = EXCLUDED.color,
    size = EXCLUDED.size,
    condition = EXCLUDED.condition,
    warranty = EXCLUDED.warranty,
    availability_status = EXCLUDED.availability_status,
    stock_quantity = EXCLUDED.stock_quantity,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_ai_generated = EXCLUDED.is_ai_generated,
    ai_generated_fields = EXCLUDED.ai_generated_fields,
    ai_form_schema = COALESCE(EXCLUDED.ai_form_schema, public.showroom_listings.ai_form_schema),
    ai_video_scan = COALESCE(EXCLUDED.ai_video_scan, public.showroom_listings.ai_video_scan),
    specifications = EXCLUDED.specifications,
    sku = EXCLUDED.sku,
    rating = EXCLUDED.rating,
    rating_count = EXCLUDED.rating_count,
    favorite_count = EXCLUDED.favorite_count,
    video = EXCLUDED.video,
    video_url = EXCLUDED.video_url,
    approval_status = EXCLUDED.approval_status,
    published_at = COALESCE(EXCLUDED.published_at, public.showroom_listings.published_at),
    updated_at = now();

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.publish_showroom_upsert(jsonb) TO anon, authenticated;
