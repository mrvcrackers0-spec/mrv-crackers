-- ============================================================
-- MRV Crackers — Supabase schema
-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query).
-- ============================================================

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- categories
-- ------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- products
-- ------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete cascade,
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  original_price numeric(10, 2),
  selling_price numeric(10, 2) not null,
  discount_percentage numeric(5, 2),
  is_featured boolean not null default false,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_id_idx on public.products(category_id);
create index if not exists products_is_active_idx on public.products(is_active);
create index if not exists products_is_featured_idx on public.products(is_featured);

-- ------------------------------------------------------------
-- site_settings (single row)
-- ------------------------------------------------------------
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  business_name text not null default 'MRV Crackers',
  logo_url text,
  phone text not null default '',
  whatsapp_number text not null default '',
  email text,
  address text not null default '',
  city text not null default '',
  minimum_order_amount numeric(10, 2) not null default 0,
  hero_discount_percent numeric(5, 2) not null default 40,
  ticker_text text not null default '',
  footer_text text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- updated_at triggers
-- ------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_updated_at on public.categories;
create trigger set_updated_at before update on public.categories
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.products;
create trigger set_updated_at before update on public.products
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.site_settings;
create trigger set_updated_at before update on public.site_settings
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.site_settings enable row level security;

-- Public read access (storefront)
drop policy if exists "Public can read active categories" on public.categories;
create policy "Public can read active categories" on public.categories
  for select using (is_active = true);

drop policy if exists "Public can read active products" on public.products;
create policy "Public can read active products" on public.products
  for select using (is_active = true);

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings" on public.site_settings
  for select using (true);

-- Authenticated (admin) full access
drop policy if exists "Authenticated can manage categories" on public.categories;
create policy "Authenticated can manage categories" on public.categories
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated can manage products" on public.products;
create policy "Authenticated can manage products" on public.products
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated can manage site settings" on public.site_settings;
create policy "Authenticated can manage site settings" on public.site_settings
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ------------------------------------------------------------
-- Storage buckets (product images + site assets like logo/category images)
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

drop policy if exists "Public can view product images" on storage.objects;
create policy "Public can view product images" on storage.objects
  for select using (bucket_id = 'product-images');

drop policy if exists "Authenticated can upload product images" on storage.objects;
create policy "Authenticated can upload product images" on storage.objects
  for insert with check (bucket_id = 'product-images' and auth.role() = 'authenticated');

drop policy if exists "Authenticated can update product images" on storage.objects;
create policy "Authenticated can update product images" on storage.objects
  for update using (bucket_id = 'product-images' and auth.role() = 'authenticated');

drop policy if exists "Authenticated can delete product images" on storage.objects;
create policy "Authenticated can delete product images" on storage.objects
  for delete using (bucket_id = 'product-images' and auth.role() = 'authenticated');

drop policy if exists "Public can view site assets" on storage.objects;
create policy "Public can view site assets" on storage.objects
  for select using (bucket_id = 'site-assets');

drop policy if exists "Authenticated can upload site assets" on storage.objects;
create policy "Authenticated can upload site assets" on storage.objects
  for insert with check (bucket_id = 'site-assets' and auth.role() = 'authenticated');

drop policy if exists "Authenticated can update site assets" on storage.objects;
create policy "Authenticated can update site assets" on storage.objects
  for update using (bucket_id = 'site-assets' and auth.role() = 'authenticated');

drop policy if exists "Authenticated can delete site assets" on storage.objects;
create policy "Authenticated can delete site assets" on storage.objects
  for delete using (bucket_id = 'site-assets' and auth.role() = 'authenticated');
