-- ============================================================
-- MRV Crackers — optional demo seed data.
-- Run AFTER schema.sql if you want sample content to start with.
-- Everything here is placeholder data — edit or delete freely from
-- /admin once your project is live.
-- ============================================================

insert into public.site_settings (
  business_name, logo_url, phone, whatsapp_number, email,
  address, city, minimum_order_amount, ticker_text, footer_text
)
select
  'MRV Crackers', null, '+91 90000 00000', '919000000000', 'info@mrvcrackers.example',
  '123 Market Street, Crackers Nagar', 'Sivakasi, Tamil Nadu', 3000,
  'MRV Crackers • Premium Crackers • Festival Offers • Best Deals • Shop Now',
  'Your trusted destination for premium festival crackers.'
where not exists (select 1 from public.site_settings);

-- Demo categories
insert into public.categories (name, slug, description, display_order, is_active) values
  ('Gift Boxes', 'gift-boxes', 'Curated combo packs', 1, true),
  ('Sparklers', 'sparklers', 'Classic hand sparklers', 2, true),
  ('Flower Pots', 'flower-pots', 'Ground spinning fountains', 3, true),
  ('Aerial Crackers', 'aerial-crackers', 'Sky shots & rockets', 4, true),
  ('Ground Chakkars', 'ground-chakkars', 'Spinning wheels', 5, true),
  ('Kids Collection', 'kids-collection', 'Safe fun for children', 6, true)
on conflict (slug) do nothing;

-- Demo products (linked to the categories above via slug lookup)
insert into public.products (category_id, name, slug, description, original_price, selling_price, discount_percentage, is_featured, display_order, is_active)
select c.id, v.name, v.slug, v.description, v.original_price, v.selling_price, v.discount_percentage, v.is_featured, v.display_order, true
from (values
  ('gift-boxes', 'Family Celebration Gift Box', 'family-celebration-gift-box', 'A generous assortment for the whole family.', 5000, 3200, 36, true, 1),
  ('gift-boxes', 'Deluxe Diwali Combo Pack', 'deluxe-diwali-combo-pack', 'Our most popular combo.', 7500, 4500, 40, true, 2),
  ('sparklers', '7 Inch Electric Sparklers (Pack of 10)', '7-inch-electric-sparklers', 'Bright, long-lasting sparklers.', 150, 95, 37, true, 1),
  ('sparklers', '12 Inch Colour Sparklers (Pack of 5)', '12-inch-colour-sparklers', 'Vivid colour sparks.', 200, 129, 35, false, 2),
  ('flower-pots', 'Colour Flower Pot (Big)', 'colour-flower-pot-big', 'Rich colour fountain effect.', 220, 140, 36, true, 1),
  ('aerial-crackers', 'Sky Shot 10 Shots', 'sky-shot-10-shots', 'Multi-colour aerial display.', 900, 599, 33, false, 1),
  ('ground-chakkars', 'Ground Chakkar (Pack of 5)', 'ground-chakkar-pack-5', 'Classic spinning wheel.', 180, 110, 39, false, 1),
  ('kids-collection', 'Kids Fun Sparkler Combo', 'kids-fun-sparkler-combo', 'Safe assortment for kids.', 350, 249, 29, true, 1)
) as v(category_slug, name, slug, description, original_price, selling_price, discount_percentage, is_featured, display_order)
join public.categories c on c.slug = v.category_slug
on conflict (slug) do nothing;
