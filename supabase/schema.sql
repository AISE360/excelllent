-- Excellent Dry System — Supabase schema
-- Run in Supabase Dashboard → SQL Editor. Project ref: bcpljbsrknkarzyounxm

create table if not exists site_settings (
  id int primary key default 1,
  phone1 text default '+91 9226848274',
  phone2 text default '+91 7719946592',
  email text default 'excellentdry@gmail.com',
  address text default 'Jai Ganesh Vision, D-Wing Shop No. 15, Ground Floor, Nr. Hotel Angan, Akurdi, Pune 411035',
  hours text default 'Mon-Sun, 10:00 AM to 6:00 PM',
  constraint single_row check (id = 1)
);

create table if not exists hero_slides (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  image_url text not null,
  cta_text text default 'Shop Now',
  cta_href text default '/products',
  sort int default 0,
  active boolean default true
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null,
  size text,
  mrp numeric default 0,
  price numeric default 0,
  image_url text,
  blurb text,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  area text,
  text text not null,
  rating int default 5,
  active boolean default true
);

create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  sort int default 0
);

create table if not exists seo_pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  body text,
  active boolean default true
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text,
  phone text,
  area text,
  product text,
  message text
);

-- Public read, admin write (tighten with auth roles later)
alter table site_settings enable row level security;
alter table hero_slides enable row level security;
alter table products enable row level security;
alter table testimonials enable row level security;
alter table gallery enable row level security;
alter table seo_pages enable row level security;
alter table leads enable row level security;

drop policy if exists "public read" on site_settings;
create policy "public read" on site_settings for select using (true);
drop policy if exists "public read" on hero_slides;
create policy "public read" on hero_slides for select using (true);
drop policy if exists "public read" on products;
create policy "public read" on products for select using (true);
drop policy if exists "public read" on testimonials;
create policy "public read" on testimonials for select using (true);
drop policy if exists "public read" on gallery;
create policy "public read" on gallery for select using (true);
drop policy if exists "public read" on seo_pages;
create policy "public read" on seo_pages for select using (true);
drop policy if exists "leads insert" on leads;
create policy "leads insert" on leads for insert with check (true);
drop policy if exists "leads read auth" on leads;
create policy "leads read auth" on leads for select to authenticated using (true);

insert into site_settings (id) values (1) on conflict (id) do nothing;
