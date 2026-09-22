-- ============================================================
-- MRV Crackers — add branch address field + set real addresses
-- Run once in the Supabase SQL editor.
-- ============================================================

alter table public.site_settings
  add column if not exists branch_address text;

update public.site_settings
set
  address = 'No. 2/658/6A, Main Road, Sivagamipuram Colony, Viswanatham Village, Sivakasi Taluk',
  city = 'Virudhunagar - 626001',
  branch_address = 'Aalangulam, Sivakasi';
