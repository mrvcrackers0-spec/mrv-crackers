-- ============================================================
-- MRV Crackers — reorder categories to match the printed 2026
-- price list, merge Wheels + Ground Crackers, and add two new
-- (empty, for now) categories.
--
-- Run once in the Supabase SQL editor.
-- ============================================================

-- ------------------------------------------------------------
-- 1. Merge "Wheels" + "Ground Crackers" into one category.
--    Rename Wheels in place (keeps its existing products), move
--    every Ground Crackers product onto it, then drop the now-
--    empty Ground Crackers row.
-- ------------------------------------------------------------
update public.categories
set name = 'Ground Chakkar & Wheels', slug = 'ground-chakkar-wheels'
where slug = 'wheels';

update public.products
set category_id = (select id from public.categories where slug = 'ground-chakkar-wheels')
where category_id = (select id from public.categories where slug = 'ground-crackers');

delete from public.categories where slug = 'ground-crackers';

-- ------------------------------------------------------------
-- 2. Add the two new categories from the price list. They start
--    with no products — assign products to them from
--    /admin/products whenever ready. Empty categories simply
--    won't appear on the shop page until they have products.
-- ------------------------------------------------------------
insert into public.categories (name, slug, display_order, is_active) values
  ('Children Special', 'children-special', 12, true),
  ('Combo Packs', 'combo-packs', 15, true)
on conflict (slug) do nothing;

-- ------------------------------------------------------------
-- 3. Set display_order to match the price list exactly.
--    Special Items (not on the price list) is kept and appended
--    at the end, per your instruction.
-- ------------------------------------------------------------
update public.categories
set display_order = case slug
  when 'one-sound-crackers'      then 1
  when 'crackers'                then 2
  when 'loose-crackers'          then 3
  when 'bombs'                   then 4
  when 'rockets'                 then 5
  when 'ground-chakkar-wheels'   then 6
  when 'flower-pots'             then 7
  when 'sparklers'               then 8
  when 'single-shot'             then 9
  when 'fancy-items'             then 10
  when 'multi-colour-shots'      then 11
  when 'children-special'        then 12
  when 'colour-matches'          then 13
  when 'gift-boxes'              then 14
  when 'combo-packs'             then 15
  when 'special-items'           then 16
  else display_order
end;
