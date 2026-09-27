-- Excellent Dry — seed data. Run AFTER supabase/schema.sql
-- Dashboard → SQL Editor → paste → Run.

alter table products add column if not exists feet int default 0;
alter table products add column if not exists lines int default 0;

insert into hero_slides (title, subtitle, image_url, cta_text, cta_href, sort) values
('Dry smart. Save space.', 'Pulley-operated terrace and ceiling systems, 304-grade steel, installed across Pune in days.', '/legacy/hero-1.png', 'View the collection →', '/products', 0),
('Say bye to the clothes line.', 'Switch to the Excellent Dry pulley system for your smart home.', '/legacy/hero-2.png', 'Shop ceiling systems', '/products?cat=Ceiling Mount', 1),
('Zero floor space drying.', 'Foldable stainless-steel wall stands for compact balconies.', '/legacy/hero-3.png', 'Shop wall stands', '/products?cat=Wall Mount', 2);

insert into products (slug, name, category, size, feet, lines, mrp, price, image_url, blurb) values
('open-terrace-4ft', 'Open Terrace Fitting 4 Feet, 4 Lines', 'Open Terrace', '4 Ft', 4, 4, 4500, 3960, '/legacy/products/open-terrace/open-terrace-fitting-4-feet-4-lines.jpg', 'Pulley-operated terrace system with rust-proof pipes and UV-grade rope.'),
('open-terrace-5ft', 'Open Terrace Fitting 5 Feet, 4 Lines', 'Open Terrace', '5 Ft', 5, 4, 4600, 4080, '/legacy/products/open-terrace/open-terrace-fitting-5-feet-4-lines.jpg', 'Best for 4 to 5 member families. Lower, load and raise with one pull.'),
('open-terrace-6ft', 'Open Terrace Fitting 6 Feet, 4 Lines', 'Open Terrace', '6 Ft', 6, 4, 4700, 4136, '/legacy/products/open-terrace/open-terrace-fitting-6-feet-4-lines.jpg', 'Extra drying length for heavy laundry days and large homes.'),
('open-terrace-7ft', 'Open Terrace Fitting 7 Feet, 4 Lines', 'Open Terrace', '7 Ft', 7, 4, 4800, 4224, '/legacy/products/open-terrace/open-terrace-fitting-7-feet-4-lines.jpg', 'Pulley-operated terrace system with rust-proof pipes and UV-grade rope.'),
('open-terrace-8ft', 'Open Terrace Fitting 8 Feet, 4 Lines', 'Open Terrace', '8 Ft', 8, 4, 4900, 4312, '/legacy/products/open-terrace/open-terrace-fitting-8-feet-4-lines.jpg', 'Pulley-operated terrace system with rust-proof pipes and UV-grade rope.'),
('open-terrace-9ft', 'Open Terrace Fitting 9 Feet, 4 Lines', 'Open Terrace', '9 Ft', 9, 4, 5000, 4400, '/legacy/products/open-terrace/open-terrace-fitting-9-feet-4-lines.jpg', 'Pulley-operated terrace system with rust-proof pipes and UV-grade rope.'),
('ceiling-mount-4ft', 'Ceiling Mount Fitting 4 Feet, 4 Lines', 'Ceiling Mount', '4 Ft', 4, 4, 3600, 3168, '/legacy/products/ceiling-mount/ceiling-mount-fitting-4-feet-4-lines.jpg', 'Space-saving balcony and passage fitting. Elegant ceiling look.'),
('ceiling-mount-5ft', 'Ceiling Mount Fitting 5 Feet, 4 Lines', 'Ceiling Mount', '5 Ft', 5, 4, 3700, 3256, '/legacy/products/ceiling-mount/ceiling-mount-fitting-5-feet-4-lines.jpg', 'Bestseller for flats and balconies across Pune.'),
('ceiling-mount-6ft', 'Ceiling Mount Fitting 6 Feet, 4 Lines', 'Ceiling Mount', '6 Ft', 6, 4, 3800, 3344, '/legacy/products/ceiling-mount/ceiling-mount-fitting-6-feet-4-lines.jpg', 'Maximum indoor drying with smooth pulley glide.'),
('ceiling-mount-7ft', 'Ceiling Mount Fitting 7 Feet, 4 Lines', 'Ceiling Mount', '7 Ft', 7, 4, 3900, 3432, '/legacy/products/ceiling-mount/ceiling-mount-fitting-7-feet-4-lines.jpg', 'Space-saving balcony and passage fitting with smooth pulley glide.'),
('ceiling-mount-8ft', 'Ceiling Mount Fitting 8 Feet, 4 Lines', 'Ceiling Mount', '8 Ft', 8, 4, 4000, 3520, '/legacy/products/ceiling-mount/ceiling-mount-fitting-8-feet-4-lines.jpg', 'Space-saving balcony and passage fitting with smooth pulley glide.'),
('ceiling-mount-9ft', 'Ceiling Mount Fitting 9 Feet, 4 Lines', 'Ceiling Mount', '9 Ft', 9, 4, 4100, 3608, '/legacy/products/ceiling-mount/ceiling-mount-fitting-9-feet-4-lines.jpg', 'Space-saving balcony and passage fitting with smooth pulley glide.'),
('wall-mount-3ft-3lines', 'Wall Mount 3 Feet, 3 Lines', 'Wall Mount', '3 Ft', 3, 3, 2300, 2070, '/legacy/products/wall-mount/wall-mount-3-feet-3-lines.jpg', 'Foldable stainless-steel wall stand. Ideal for compact walls.'),
('wall-mount-3ft-4lines', 'Wall Mount 3 Feet, 4 Lines', 'Wall Mount', '3 Ft', 3, 4, 2600, 2340, '/legacy/products/wall-mount/wall-mount-3-feet-4-lines.jpg', 'Fold flat when not in use. 304-grade steel rods.'),
('wall-mount-3ft-5lines', 'Wall Mount 3 Feet, 5 Lines', 'Wall Mount', '3 Ft', 3, 5, 2700, 2430, '/legacy/products/wall-mount/wall-mount-3-feet-5-lines.jpg', 'Foldable 304-grade stainless-steel wall stand. Zero floor space.'),
('wall-mount-3ft-6lines', 'Wall Mount 3 Feet, 6 Lines', 'Wall Mount', '3 Ft', 3, 6, 2800, 2530, '/legacy/products/wall-mount/wall-mount-3-feet-6-lines.jpg', 'Foldable 304-grade stainless-steel wall stand. Zero floor space.'),
('wall-mount-4ft-3lines', 'Wall Mount 4 Feet, 3 Lines', 'Wall Mount', '4 Ft', 4, 3, 2400, 2160, '/legacy/products/wall-mount/wall-mount-4-feet-3-lines.png', 'The classic utility-balcony workhorse. Zero floor space.'),
('wall-mount-4ft-4lines', 'Wall Mount 4 Feet, 4 Lines', 'Wall Mount', '4 Ft', 4, 4, 2700, 2430, '/legacy/products/wall-mount/wall-mount-4-feet-4-lines.jpg', 'Foldable 304-grade stainless-steel wall stand. Zero floor space.'),
('wall-mount-4ft-5lines', 'Wall Mount 4 Feet, 5 Lines', 'Wall Mount', '4 Ft', 4, 5, 2800, 2520, '/legacy/products/wall-mount/wall-mount-4-feet-5-lines.jpg', 'Foldable 304-grade stainless-steel wall stand. Zero floor space.'),
('wall-mount-4ft-6lines', 'Wall Mount 4 Feet, 6 Lines', 'Wall Mount', '4 Ft', 4, 6, 2900, 2610, '/legacy/products/wall-mount/wall-mount-4-feet-6-lines.jpg', 'Foldable 304-grade stainless-steel wall stand. Zero floor space.'),
('wall-mount-5ft-3lines', 'Wall Mount 5 Feet, 3 Lines', 'Wall Mount', '5 Ft', 5, 3, 2400, 2160, '/legacy/products/wall-mount/wall-mount-5-feet-3-lines.jpg', 'Foldable 304-grade stainless-steel wall stand. Zero floor space.'),
('wall-mount-5ft-4lines', 'Wall Mount 5 Feet, 4 Lines', 'Wall Mount', '5 Ft', 5, 4, 2700, 2430, '/legacy/products/wall-mount/wall-mount-5-feet-4-lines.jpg', 'Foldable 304-grade stainless-steel wall stand. Zero floor space.'),
('wall-mount-5ft-5lines', 'Wall Mount 5 Feet, 5 Lines', 'Wall Mount', '5 Ft', 5, 5, 2800, 2520, '/legacy/products/wall-mount/wall-mount-5-feet-5-lines.jpg', 'Foldable 304-grade stainless-steel wall stand. Zero floor space.'),
('wall-mount-5ft-6lines', 'Wall Mount 5 Feet, 6 Lines', 'Wall Mount', '5 Ft', 5, 6, 2900, 2610, '/legacy/products/wall-mount/wall-mount-5-feet-6-lines.jpg', 'Foldable 304-grade stainless-steel wall stand. Zero floor space.')
on conflict (slug) do update set name = excluded.name, price = excluded.price, mrp = excluded.mrp,
  image_url = excluded.image_url, blurb = excluded.blurb, category = excluded.category, size = excluded.size,
  feet = excluded.feet, lines = excluded.lines;

insert into testimonials (name, area, text) values
('Poonam Yadav', 'Baner, Pune', 'Using the pulley system for a couple of months. Working smoothly, easy to use, and it manages our drying space so effectively.'),
('Anil Mahajan', 'Kothrud, Pune', 'Six members in the family and the balcony felt tiny. Thanks to Excellent Dry, all clothes dry faster with proper spacing.'),
('Mallikarjuna Swamy', 'Wakad, Pune', 'Good quality product, professional installation. An asset with real utility for every house.');
