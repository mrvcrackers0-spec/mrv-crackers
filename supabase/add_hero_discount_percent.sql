-- ============================================================
-- MRV Crackers — add editable homepage discount badge field
-- Run once in the Supabase SQL editor.
-- ============================================================

alter table public.site_settings
  add column if not exists hero_discount_percent numeric(5, 2) not null default 40;
