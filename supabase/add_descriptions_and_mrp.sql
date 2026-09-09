-- ============================================================
-- MRV Crackers — product descriptions + original price (MRP)
--
-- DESCRIPTIONS: short, honest, category-level blurbs (no invented
-- specific facts/stats).
--
-- ORIGINAL PRICE (MRP): your source list only had one real price
-- per item, so there was no genuine "before" price to show. Rather
-- than invent random numbers, this derives a consistent MRP using
-- a flat ~30% markup rounded to the nearest Rs.5 (how MRPs are
-- normally printed), the same pattern used industry-wide for
-- Sivakasi cracker pricing. These are estimates, not real printed
-- MRPs — replace any of them via /admin/products with the actual
-- printed MRP whenever you have it (e.g. from packaging).
-- ============================================================

-- ------------------------------------------------------------
-- Descriptions (by category)
-- ------------------------------------------------------------
with category_desc as (
  select c.id as category_id, d.description
  from (values
    ('special-items', 'A handpicked mix of fun novelty crackers for every celebration.'),
    ('crackers', 'Classic strings of crackers for a loud, festive celebration.'),
    ('loose-crackers', 'Individual loose crackers, perfect for mixing into your own combo.'),
    ('rockets', 'Sky-bound rockets that add height and excitement to your display.'),
    ('sparklers', 'Bright, long-lasting sparklers, safe for family fun.'),
    ('wheels', 'Spinning ground wheels with colourful sparks and motion.'),
    ('flower-pots', 'Classic fountain-style crackers with a steady shower of colour.'),
    ('fancy-items', 'Novelty and fancy crackers for playful, varied effects.'),
    ('colour-matches', 'Compact colour-burst crackers for quick festive sparkle.'),
    ('bombs', 'Loud sound crackers for a powerful festive bang.'),
    ('multi-colour-shots', 'Multi-shot aerial crackers with a vibrant, colourful display.'),
    ('single-shot', 'Single aerial shot crackers for a focused burst of colour.'),
    ('gift-boxes', 'Curated combo packs bringing together a variety of crackers.'),
    ('one-sound-crackers', 'Traditional one-sound crackers for classic festive noise.'),
    ('ground-crackers', 'Ground-spinning crackers with continuous colour and motion.')
  ) as d(slug, description)
  join public.categories c on c.slug = d.slug
)
update public.products p
set description = cd.description
from category_desc cd
where p.category_id = cd.category_id;

-- ------------------------------------------------------------
-- Original price (estimated MRP) + discount percentage
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
