-- ============================================================
-- MRV Crackers — official 2026 printed price list
-- Fully replaces categories & products to match the real printed
-- price list exactly (names, prices, category structure, order).
-- Safe to re-run (wipes and reloads).
--
-- Key differences from the previous catalog, in case anything here
-- looks surprising:
--   - "Special Items" no longer exists as a category. Its products
--     are redistributed: most into "Children Special", and
--     Colour Shower Big / Adiyal Small / Adiyal Mega / Cylinder
--     Bomb / Deluxe Bomb into "Bombs" — matching the price list.
--   - "Bada Kit Kat" and "Military Bomb" are not on the price list
--     and have been dropped. "Tom & Jerry" (Children Special) and
--     "30 Shot" / "60 Shot" (Multi Colour Shots) are new.
--   - Elephant Crackers (Rs.60) and Ground Chakkar Special (Rs.90)
--     now have real prices and are ACTIVE — no longer the Rs.0
--     inactive placeholders from before.
--   - "12 inch Twinkling Star" is corrected to "1½ inch" (that's
--     the real size printed on the price list).
--   - A number of prices changed from the previous catalog (e.g.
--     Baby Rocket, several Sparklers, Chotta Fancy, 25 Shot Rider,
--     Starvel 20-20) — all set to the printed rate here.
--   - Since every product is deleted and recreated, this script
--     also re-applies the placeholder logo image, the category
--     descriptions, and the estimated MRP/discount that were set
--     on the old rows (a plain delete+reinsert would otherwise
--     silently wipe all three).
-- ============================================================

delete from public.products;
delete from public.categories;

-- ------------------------------------------------------------
-- Categories, in printed price-list order
-- ------------------------------------------------------------
insert into public.categories (name, slug, display_order, is_active) values
  ('One Sound Crackers', 'one-sound-crackers', 1, true),
  ('Crackers', 'crackers', 2, true),
  ('Loose Crackers', 'loose-crackers', 3, true),
  ('Bombs', 'bombs', 4, true),
  ('Rockets', 'rockets', 5, true),
  ('Ground Chakkar & Wheels', 'ground-chakkar-wheels', 6, true),
  ('Flower Pots', 'flower-pots', 7, true),
  ('Sparklers', 'sparklers', 8, true),
  ('Single Shot', 'single-shot', 9, true),
  ('Fancy Items', 'fancy-items', 10, true),
  ('Multi Colour Shots', 'multi-colour-shots', 11, true),
  ('Children Special', 'children-special', 12, true),
  ('Colour Matches', 'colour-matches', 13, true),
  ('Combo Packs', 'combo-packs', 14, true),
  ('Gift Boxes', 'gift-boxes', 15, true);

-- ------------------------------------------------------------
-- Products (linked to categories via slug lookup)
-- ------------------------------------------------------------
insert into public.products (category_id, name, slug, selling_price, display_order, is_active)
select c.id, v.name, v.slug, v.selling_price, v.display_order, true
from (values
  -- One Sound Crackers
  ('one-sound-crackers', '3½" Laxmi', '3-half-inch-laxmi', 15, 1),
  ('one-sound-crackers', '4" Laxmi', '4-inch-laxmi', 20, 2),
  ('one-sound-crackers', '4" Dlx Laxmi', '4-inch-dlx-laxmi', 25, 3),
  ('one-sound-crackers', '4" Gold Laxmi', '4-inch-gold-laxmi', 25, 4),
  ('one-sound-crackers', '2¾" Kuruvai', '2-three-quarter-inch-kuruvai', 8, 5),
  ('one-sound-crackers', 'Elephant Crackers', 'elephant-crackers', 60, 6),
  ('one-sound-crackers', '2 Sound Crackers', '2-sound-crackers', 30, 7),
  ('one-sound-crackers', '2" Laxmi ARD''s', '2-inch-laxmi-ards', 10, 8),
  ('one-sound-crackers', '5" Laxmi', '5-inch-laxmi', 50, 9),
  ('one-sound-crackers', '6" Laxmi', '6-inch-laxmi', 60, 10),

  -- Crackers
  ('crackers', '28 C. Dhoom', '28-c-dhoom', 15, 1),
  ('crackers', '28 G. Dhoom', '28-g-dhoom', 30, 2),
  ('crackers', '100 Dhoom', '100-dhoom', 50, 3),
  ('crackers', '1 K Dhoom', '1k-dhoom', 180, 4),
  ('crackers', '2 K Dhoom', '2k-dhoom', 360, 5),
  ('crackers', '5 K Dhoom', '5k-dhoom', 900, 6),
  ('crackers', '10 K Dhoom', '10k-dhoom', 1800, 7),
  ('crackers', 'ARD Incredibles', 'ard-incredibles', 550, 8),
  ('crackers', 'ARD Red Scorpion', 'ard-red-scorpion', 1100, 9),
  ('crackers', 'ARD Jumbo Man', 'ard-jumbo-man', 1650, 10),

  -- Loose Crackers
  ('loose-crackers', 'Bijili (50 Pcs)', 'bijili-50-pcs', 10, 1),
  ('loose-crackers', 'Bijili (100 Pcs)', 'bijili-100-pcs', 25, 2),
  ('loose-crackers', 'PL Bijili (50 Pcs)', 'pl-bijili-50-pcs', 15, 3),
  ('loose-crackers', 'PL Bijili (100 Pcs)', 'pl-bijili-100-pcs', 30, 4),
  ('loose-crackers', 'Motta Bijili (100 Pcs)', 'motta-bijili-100-pcs', 60, 5),
  ('loose-crackers', 'ARD''s Bijili (100 Pcs)', 'ards-bijili-100-pcs', 40, 6),

  -- Bombs
  ('bombs', 'Hydro Bomb ARD''s', 'hydro-bomb-ards', 80, 1),
  ('bombs', 'Jug Mug 3000', 'jug-mug-3000', 90, 2),
  ('bombs', 'Jug Mug 5000', 'jug-mug-5000', 100, 3),
  ('bombs', 'Special Tiger Bomb', 'special-tiger-bomb', 280, 4),
  ('bombs', 'ARD''s Indian Dynamite', 'ards-indian-dynamite', 120, 5),
  ('bombs', 'Spider Bomb', 'spider-bomb', 280, 6),
  ('bombs', 'Lion Deluxe Bomb', 'lion-deluxe-bomb', 400, 7),
  ('bombs', 'ARD''s Bullet Bomb', 'ards-bullet-bomb', 40, 8),
  ('bombs', '555 Bomb', '555-bomb', 100, 9),
  ('bombs', 'Paper Bomb 250', 'paper-bomb-250', 40, 10),
  ('bombs', 'Paper Bomb 500', 'paper-bomb-500', 90, 11),
  ('bombs', 'Colour Shower Big', 'colour-shower-big', 100, 12),
  ('bombs', 'Adiyal Small (10 Pcs)', 'adiyal-small-10-pcs', 300, 13),
  ('bombs', 'Adiyal Mega (10 Pcs)', 'adiyal-mega-10-pcs', 350, 14),
  ('bombs', 'Cylinder Bomb', 'cylinder-bomb', 200, 15),
  ('bombs', 'Deluxe Bomb', 'deluxe-bomb', 140, 16),

  -- Rockets
  ('rockets', 'Baby Rocket', 'baby-rocket', 40, 1),
  ('rockets', 'Rocket Bomb', 'rocket-bomb', 70, 2),
  ('rockets', 'Lunik Rocket', 'lunik-rocket', 120, 3),
  ('rockets', '3 Sound Rocket', '3-sound-rocket', 160, 4),
  ('rockets', 'ARD''s Rocket Bomb', 'ards-rocket-bomb', 90, 5),
  ('rockets', 'ARD''s Baby Rocket', 'ards-baby-rocket', 50, 6),
  ('rockets', 'Whistling Rocket', 'whistling-rocket', 220, 7),

  -- Ground Chakkar & Wheels
  ('ground-chakkar-wheels', 'Ground Chakkar Big', 'ground-chakkar-big', 40, 1),
  ('ground-chakkar-wheels', 'Ground Chakkar Special', 'ground-chakkar-special', 90, 2),
  ('ground-chakkar-wheels', 'Ground Chakkar Deluxe', 'ground-chakkar-deluxe', 160, 3),
  ('ground-chakkar-wheels', 'Rollar Coaster', 'rollar-coaster', 250, 4),
  ('ground-chakkar-wheels', 'Disco Wheel', 'disco-wheel', 120, 5),
  ('ground-chakkar-wheels', 'Giant Wheel', 'giant-wheel', 280, 6),
  ('ground-chakkar-wheels', 'Ground Chakkar Asoka', 'ground-chakkar-asoka', 90, 7),
  ('ground-chakkar-wheels', '4 x 4 Wheel', '4x4-wheel', 200, 8),
  ('ground-chakkar-wheels', 'Whistling Wheel', 'whistling-wheel', 280, 9),

  -- Flower Pots
  ('flower-pots', 'Flower Pots Small', 'flower-pots-small', 50, 1),
  ('flower-pots', 'Flower Pots Big', 'flower-pots-big', 90, 2),
  ('flower-pots', 'Flower Pots Special', 'flower-pots-special', 120, 3),
  ('flower-pots', 'Flower Pots Special (ARDS)', 'flower-pots-special-ards', 160, 4),
  ('flower-pots', 'Flower Pots Asoka', 'flower-pots-asoka', 160, 5),
  ('flower-pots', 'Flower Pots Giant', 'flower-pots-giant', 200, 6),
  ('flower-pots', 'Colour Koti', 'colour-koti', 200, 7),
  ('flower-pots', 'Colour Koti Deluxe', 'colour-koti-deluxe', 300, 8),
  ('flower-pots', 'Tri Colour Fountain', 'tri-colour-fountain', 280, 9),

  -- Sparklers
  ('sparklers', '7 Cm Electric Sparklers', '7cm-electric-sparklers', 8, 1),
  ('sparklers', '7 Cm Colour Sparklers', '7cm-colour-sparklers', 9, 2),
  ('sparklers', '10 Cm Electric Sparklers', '10cm-electric-sparklers', 16, 3),
  ('sparklers', '10 Cm Colour Sparklers', '10cm-colour-sparklers', 18, 4),
  ('sparklers', '10 Cm Red Sparklers', '10cm-red-sparklers', 24, 5),
  ('sparklers', '10 Cm Green Sparklers', '10cm-green-sparklers', 22, 6),
  ('sparklers', '12 Cm Electric Sparklers', '12cm-electric-sparklers', 24, 7),
  ('sparklers', '12 Cm Colour Sparklers', '12cm-colour-sparklers', 26, 8),
  ('sparklers', '15 Cm Electric Sparklers', '15cm-electric-sparklers', 42, 9),
  ('sparklers', '15 Cm Colour Sparklers', '15cm-colour-sparklers', 45, 10),
  ('sparklers', '30 Cm Electric Sparklers', '30cm-electric-sparklers', 42, 11),
  ('sparklers', '30 Cm Colour Sparklers', '30cm-colour-sparklers', 45, 12),
  ('sparklers', '50 Cm Electric Sparklers', '50cm-electric-sparklers', 200, 13),
  ('sparklers', '75 Cm Electric Sparklers', '75cm-electric-sparklers', 300, 14),

  -- Single Shot
  ('single-shot', 'Pogo Shots (5 Pcs)', 'pogo-shots-5-pcs', 250, 1),
  ('single-shot', 'Chotta Fancy', 'chotta-fancy', 40, 2),
  ('single-shot', '2" Fancy 6 Varieties', '2-inch-fancy-6-varieties', 90, 3),
  ('single-shot', '3" Fancy 8 Varieties', '3-inch-fancy-8-varieties', 200, 4),
  ('single-shot', '3½" Fancy 8 Varieties', '3-half-inch-fancy-8-varieties', 250, 5),
  ('single-shot', '3½" Fancy (2 Pcs)', '3-half-inch-fancy-2-pcs', 550, 6),
  ('single-shot', '3½" Fancy Crackling', '3-half-inch-fancy-crackling', 280, 7),
  ('single-shot', '3½" Fancy Nayagara Falls', '3-half-inch-fancy-nayagara-falls', 280, 8),
  ('single-shot', '3½" Gun Out', '3-half-inch-gun-out', 200, 9),
  ('single-shot', '4" Fancy 6 Varieties', '4-inch-fancy-6-varieties', 350, 10),
  ('single-shot', '4" Double Ball 4 Varieties', '4-inch-double-ball-4-varieties', 450, 11),
  ('single-shot', '4" Fancy (2 Pcs)', '4-inch-fancy-2-pcs', 700, 12),

  -- Fancy Items
  ('fancy-items', '7 Shots (5 Pcs)', '7-shots-5-pcs', 120, 1),
  ('fancy-items', 'Penta Collection (5 Pcs)', 'penta-collection-5-pcs', 220, 2),
  ('fancy-items', 'Sky Shots (10 Pcs)', 'sky-shots-10-pcs', 150, 3),
  ('fancy-items', 'Helicopter', 'helicopter', 80, 4),
  ('fancy-items', 'Bamparam', 'bamparam', 120, 5),
  ('fancy-items', 'Butterfly', 'butterfly', 80, 6),
  ('fancy-items', 'Mini Peacock', 'mini-peacock', 100, 7),
  ('fancy-items', 'Peacock 3 Face', 'peacock-3-face', 140, 8),
  ('fancy-items', 'Bada Peacock', 'bada-peacock', 360, 9),
  ('fancy-items', 'Purple Peacock', 'purple-peacock', 360, 10),
  ('fancy-items', 'Golden Duck', 'golden-duck', 250, 11),
  ('fancy-items', 'Starvel Race Car', 'starvel-race-car', 400, 12),
  ('fancy-items', 'Racing Car', 'racing-car', 180, 13),
  ('fancy-items', 'Ravindra''s Angry Birds', 'ravindras-angry-birds', 400, 14),
  ('fancy-items', 'Ravindra''s Candy Crush', 'ravindras-candy-crush', 400, 15),
  ('fancy-items', 'Money Bank', 'money-bank', 150, 16),
  ('fancy-items', 'Black Money', 'black-money', 350, 17),
  ('fancy-items', 'Magic Show', 'magic-show', 280, 18),
  ('fancy-items', 'K.G.F Gun', 'kgf-gun', 200, 19),
  ('fancy-items', 'Standard Jumping Frog', 'standard-jumping-frog', 160, 20),
  ('fancy-items', 'Ladoo', 'ladoo', 240, 21),
  ('fancy-items', 'Natiyalaya (5 Pcs)', 'natiyalaya-5-pcs', 120, 22),
  ('fancy-items', 'Starvel Emu Egg', 'starvel-emu-egg', 280, 23),
  ('fancy-items', 'Chotta Bheem 5 in 1', 'chotta-bheem-5-in-1', 150, 24),
  ('fancy-items', 'Ravindra Tasty 5 in 1', 'ravindra-tasty-5-in-1', 300, 25),
  ('fancy-items', 'Siren', 'siren', 200, 26),
  ('fancy-items', 'Mini Siren', 'mini-siren', 180, 27),
  ('fancy-items', 'Starvel Water Queen', 'starvel-water-queen', 220, 28),
  ('fancy-items', 'Ravindra Pop Star', 'ravindra-pop-star', 160, 29),
  ('fancy-items', 'I Cone', 'i-cone', 200, 30),
  ('fancy-items', 'Starvel Triple Monkey', 'starvel-triple-monkey', 280, 31),
  ('fancy-items', 'Starvel Mottu Patlu', 'starvel-mottu-patlu', 280, 32),
  ('fancy-items', 'Tin Series', 'tin-series', 90, 33),
  ('fancy-items', 'Photo Flash', 'photo-flash', 60, 34),
  ('fancy-items', 'Crack Jack (3 Pcs)', 'crack-jack-3-pcs', 350, 35),
  ('fancy-items', 'Ganga Jamuna', 'ganga-jamuna', 120, 36),
  ('fancy-items', 'Standard Little Dragon', 'standard-little-dragon', 350, 37),
  ('fancy-items', 'Starvel 20-20', 'starvel-20-20', 200, 38),

  -- Multi Colour Shots
  ('multi-colour-shots', '6 Shot Multi Colour', '6-shot-multi-colour', 110, 1),
  ('multi-colour-shots', '12 Shot Rider', '12-shot-rider', 120, 2),
  ('multi-colour-shots', '12 Shot Multi Colour', '12-shot-multi-colour', 250, 3),
  ('multi-colour-shots', '12 + 12 FIFA Shot', '12-plus-12-fifa-shot', 250, 4),
  ('multi-colour-shots', '25 Shot Rider', '25-shot-rider', 220, 5),
  ('multi-colour-shots', '30 Shot Multi Colour', '30-shot-multi-colour', 450, 6),
  ('multi-colour-shots', '60 Shot Multi Colour', '60-shot-multi-colour', 850, 7),
  ('multi-colour-shots', '120 Shot Multi Colour', '120-shot-multi-colour', 1700, 8),
  ('multi-colour-shots', '240 Shot Multi Colour', '240-shot-multi-colour', 3400, 9),
  ('multi-colour-shots', '10 x 10 Multi Colour', '10x10-multi-colour', 4500, 10),
  ('multi-colour-shots', '20 Comet (ARDS)', '20-comet-ards', 800, 11),
  ('multi-colour-shots', 'ARD''s 30 Shot', 'ards-30-shot', 600, 12),
  ('multi-colour-shots', 'ARD''s 60 Shot', 'ards-60-shot', 1200, 13),
  ('multi-colour-shots', '30 Shot', '30-shot', 350, 14),
  ('multi-colour-shots', '60 Shot', '60-shot', 700, 15),
  ('multi-colour-shots', '30 Shot Crackling', '30-shot-crackling', 600, 16),
  ('multi-colour-shots', '15 Multi Colour Shot', '15-multi-colour-shot', 350, 17),

  -- Children Special
  ('children-special', 'Cartoon', 'cartoon', 25, 1),
  ('children-special', 'Electric Stone', 'electric-stone', 10, 2),
  ('children-special', 'Magic Glittering', 'magic-glittering', 10, 3),
  ('children-special', '1½" Twinkling Star', '1-half-inch-twinkling-star', 25, 4),
  ('children-special', '4" Twinkling Star', '4-inch-twinkling-star', 70, 5),
  ('children-special', '7" Pencil', '7-inch-pencil', 50, 6),
  ('children-special', 'Enjoy Pencil', 'enjoy-pencil', 70, 7),
  ('children-special', 'Welcome Hand Showers', 'welcome-hand-showers', 240, 8),
  ('children-special', 'Snake Tablet Small', 'snake-tablet-small', 20, 9),
  ('children-special', 'Snake Tablet Big', 'snake-tablet-big', 25, 10),
  ('children-special', 'Kit Kat', 'kit-kat', 25, 11),
  ('children-special', 'Tom & Jerry', 'tom-and-jerry', 40, 12),
  ('children-special', 'Roll Cap', 'roll-cap', 60, 13),
  ('children-special', 'Ring Cap', 'ring-cap', 10, 14),

  -- Colour Matches
  ('colour-matches', 'Express Jumbo', 'express-jumbo', 90, 1),
  ('colour-matches', 'Dino 7 in 1', 'dino-7-in-1', 150, 2),

  -- Combo Packs
  ('combo-packs', '3000 Combo Pack (36 Varieties - 43 Items)', '3000-combo-pack', 3000, 1),
  ('combo-packs', '5000 Combo Pack (50 Varieties - 59 Items)', '5000-combo-pack', 5000, 2),

  -- Gift Boxes
  ('gift-boxes', 'A Box - 21 Item', 'a-box-21-item', 350, 1),
  ('gift-boxes', 'B Box - 26 Item', 'b-box-26-item', 450, 2),
  ('gift-boxes', 'C Box - 33 Item', 'c-box-33-item', 600, 3),
  ('gift-boxes', 'Beat Collection - 30 Item', 'beat-collection-30-item', 550, 4),
  ('gift-boxes', 'D Box - 41 Item', 'd-box-41-item', 800, 5),
  ('gift-boxes', 'Sonata Pack - 25 Item', 'sonata-pack-25-item', 450, 6),
  ('gift-boxes', 'Rhythm - 20 Item', 'rhythm-20-item', 400, 7)
) as v(category_slug, name, slug, selling_price, display_order)
join public.categories c on c.slug = v.category_slug;

-- ------------------------------------------------------------
-- Placeholder image — every product above was just recreated, so
-- image_url is null again. Point them all at the compressed logo
-- placeholder until real product photos exist, same as before.
-- ------------------------------------------------------------
update public.products
set image_url = '/product-placeholder.jpg'
where image_url is null;

-- ------------------------------------------------------------
-- Descriptions (by category) — same short, honest, category-level
-- blurbs as before, extended to cover the new/renamed categories.
-- ------------------------------------------------------------
with category_desc as (
  select c.id as category_id, d.description
  from (values
    ('one-sound-crackers', 'Traditional one-sound crackers for classic festive noise.'),
    ('crackers', 'Classic strings of crackers for a loud, festive celebration.'),
    ('loose-crackers', 'Individual loose crackers, perfect for mixing into your own combo.'),
    ('bombs', 'Loud sound crackers for a powerful festive bang.'),
    ('rockets', 'Sky-bound rockets that add height and excitement to your display.'),
    ('ground-chakkar-wheels', 'Ground-spinning wheels and chakkars with continuous colour and motion.'),
    ('flower-pots', 'Classic fountain-style crackers with a steady shower of colour.'),
    ('sparklers', 'Bright, long-lasting sparklers, safe for family fun.'),
    ('single-shot', 'Single aerial shot crackers for a focused burst of colour.'),
    ('fancy-items', 'Novelty and fancy crackers for playful, varied effects.'),
    ('multi-colour-shots', 'Multi-shot aerial crackers with a vibrant, colourful display.'),
    ('children-special', 'Fun, kid-friendly novelty crackers for young ones to enjoy safely.'),
    ('colour-matches', 'Compact colour-burst crackers for quick festive sparkle.'),
    ('combo-packs', 'Complete festival combo packs bundling a wide variety of crackers together.'),
    ('gift-boxes', 'Curated combo packs bringing together a variety of crackers.')
  ) as d(slug, description)
  join public.categories c on c.slug = d.slug
)
update public.products p
set description = cd.description
from category_desc cd
where p.category_id = cd.category_id;

-- ------------------------------------------------------------
-- Original price (estimated MRP) + discount percentage — same
-- ~30%-markup-rounded-to-Rs.5 formula as before, applied to the
-- new printed prices. Estimates, not real printed MRPs — replace
-- via /admin/products with the actual MRP whenever you have it.
-- ------------------------------------------------------------
update public.products p
set
  original_price = calc.original_price,
  discount_percentage = round((1 - (p.selling_price / calc.original_price)) * 100)
from (
  select id, ceil((selling_price / 0.7) / 5) * 5 as original_price
  from public.products
  where selling_price > 0
) as calc
where p.id = calc.id;
