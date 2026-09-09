-- ============================================================
-- MRV Crackers — temporary product images
-- Points every product's image at the compressed logo placeholder
-- (public/product-placeholder.jpg, 13KB) until real product photos
-- are available. Safe to re-run; overwrite later per-product via
-- /admin/products once real photos exist.
-- ============================================================

update public.products
set image_url = '/product-placeholder.jpg'
where image_url is null;
