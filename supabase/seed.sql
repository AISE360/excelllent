-- Excellent Dry — seed data. Run AFTER supabase/schema.sql
-- Dashboard → SQL Editor → paste → Run.

insert into hero_slides (title, subtitle, image_url, cta_text, cta_href, sort) values
('Dry smart. Save space.', 'Pulley-operated terrace & ceiling systems, 304-grade steel, installed across Pune in days.', '/legacy/hero-1.png', 'View the collection →', '/products', 0),
('Say bye to the clothes line.', 'Switch to the Excellent Dry pulley system for your smart home.', '/legacy/hero-2.png', 'Shop ceiling systems', '/products?cat=Ceiling Mount', 1),
('Zero floor space drying.', 'Foldable stainless-steel wall stands for compact balconies.', '/legacy/hero-3.png', 'Shop wall stands', '/products?cat=Wall Mount', 2);

insert into products (slug, name, category, size, mrp, price, image_url, blurb) values
('open-terrace-4ft', 'Open Terrace Fitting 4 Feet · 4 Lines', 'Open Terrace', '4 Ft', 4500, 3825, '/legacy/products/open-terrace/open-terrace-fitting-4-feet-4-lines.jpg', 'Pulley-operated terrace system with rust-proof pipes & UV-grade rope.'),
('open-terrace-5ft', 'Open Terrace Fitting 5 Feet · 4 Lines', 'Open Terrace', '5 Ft', 4600, 3910, '/legacy/products/open-terrace/open-terrace-fitting-5-feet-4-lines.jpg', 'Best for 4–5 member families. Lower, load & raise with one pull.'),
('open-terrace-6ft', 'Open Terrace Fitting 6 Feet · 4 Lines', 'Open Terrace', '6 Ft', 4700, 3995, '/legacy/products/open-terrace/open-terrace-fitting-6-feet-4-lines.jpg', 'Extra drying length for heavy laundry days & large homes.'),
('ceiling-mount-4ft', 'Ceiling Mount Fitting 4 Feet · 4 Lines', 'Ceiling Mount', '4 Ft', 3600, 3060, '/legacy/products/ceiling-mount/ceiling-mount-fitting-4-feet-4-lines.jpg', 'Space-saving balcony & passage fitting. Elegant ceiling look.'),
('ceiling-mount-5ft', 'Ceiling Mount Fitting 5 Feet · 4 Lines', 'Ceiling Mount', '5 Ft', 3700, 3145, '/legacy/products/ceiling-mount/ceiling-mount-fitting-5-feet-4-lines.jpg', 'Bestseller for flats & balconies across Pune.'),
('ceiling-mount-6ft', 'Ceiling Mount Fitting 6 Feet · 4 Lines', 'Ceiling Mount', '6 Ft', 3800, 3230, '/legacy/products/ceiling-mount/ceiling-mount-fitting-6-feet-4-lines.jpg', 'Maximum indoor drying with smooth pulley glide.'),
('wall-mount-3ft-3lines', 'Wall Mount 3 Feet · 3 Lines', 'Wall Mount', '3 Ft', 2200, 1980, '/legacy/products/wall-mount/wall-mount-3-feet-3-lines.jpg', 'Foldable stainless-steel wall stand. Ideal for compact walls.'),
('wall-mount-3ft-4lines', 'Wall Mount 3 Feet · 4 Lines', 'Wall Mount', '3 Ft', 2500, 2250, '/legacy/products/wall-mount/wall-mount-3-feet-4-lines.jpg', 'Fold flat when not in use. 304-grade steel rods.'),
('wall-mount-4ft-3lines', 'Wall Mount 4 Feet · 3 Lines', 'Wall Mount', '4 Ft', 2800, 2520, '/legacy/product-wall.png', 'The classic utility-balcony workhorse. Zero floor space.')
on conflict (slug) do update set name = excluded.name, price = excluded.price, mrp = excluded.mrp,
  image_url = excluded.image_url, blurb = excluded.blurb, category = excluded.category, size = excluded.size;

insert into testimonials (name, area, text) values
('Poonam Yadav', 'Baner, Pune', 'Using the pulley system for a couple of months. Working smoothly, easy to use — it manages our drying space so effectively.'),
('Anil Mahajan', 'Kothrud, Pune', 'Six members in the family and the balcony felt tiny. Thanks to Excellent Dry, all clothes dry faster with proper spacing.'),
('Mallikarjuna Swamy', 'Wakad, Pune', 'Good quality product, professional installation. An asset with real utility for every house.');
