# TODO: Admin Dashboard — Full Showroom Mirror (Edit Everything in Admin)

## Goal
Every listing shown on the public showroom (static seed `SHOWROOM_LISTINGS` + DB rows)
must appear in the admin dashboard and be fully editable: title, price, description,
location, category, stock, images (replace/remove/reorder/upload), publish/unpublish,
delete. Every change must be saved to Supabase and automatically reflected on the
public showroom. "Coming Soon" categories get an "Add Product" button that opens the
form pre-filled with that category. Categories must stay strictly separated.

## Steps
- [ ] 1. Create migration `supabase/migrations/20260807000000_admin_showroom_full_mirror.sql`
       - SECURITY DEFINER RPC `publish_showroom_upsert(p_data jsonb)` admin-gated by
         `is_current_user_admin()` that upserts showroom listings by `property_id`
         (insert on conflict update), preserving all fields incl. specifications,
         subcategory, images.
- [ ] 2. `src/admin-page.js` — merge static `SHOWROOM_LISTINGS` into admin Products &
       Properties views (dedupe by property_id) so every showroom card is editable.
       Add a "seed" badge for static-only items.
- [ ] 3. `src/admin-page.js` — add "Showroom categories" section listing every
       marketplace/real-estate category (incl. "Coming Soon" ones with no listings)
       with an "Add Product"/"Add Property" button that opens the editor pre-filled
       with that category.
- [ ] 4. `src/admin-page.js` — add "Sync & Publish All" button (Products header +
       Publish page) that upserts ALL showroom items (DB + local + static) into the
       DB and marks them active so edits appear live immediately.
- [ ] 5. Ensure image management works for seed listings: replace/remove/reorder/
       upload already exist in the editor — verify they work when editing a seed item
       and that the changes are saved to Supabase.
- [ ] 6. Run `node --check src/admin-page.js` to verify syntax.
- [ ] 7. Apply the migration (provide SQL / `supabase db push`).

