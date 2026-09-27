export const SITE = {
  name: "Excellent Dry System",
  tagline: "Smart Clothes Drying Systems",
  phone1: "+91 9226848274",
  phone2: "+91 7719946592",
  phoneRaw1: "919226848274",
  email: "excellentdry@gmail.com",
  address:
    "Jai Ganesh Vision, D-Wing Shop No. 15, Ground Floor, Nr. Hotel Angan, Akurdi, Pune 411035",
  hours: "Mon-Sun, 10:00 AM to 6:00 PM",
};

export type Product = {
  slug: string;
  name: string;
  category: "Open Terrace" | "Ceiling Mount" | "Wall Mount";
  size: string;
  mrp: number;
  price: number;
  image: string;
  blurb: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "open-terrace-4ft",
    name: "Open Terrace Fitting 4 Feet · 4 Lines",
    category: "Open Terrace",
    size: "4 Ft",
    mrp: 4500,
    price: 3825,
    image: "/legacy/products/open-terrace/open-terrace-fitting-4-feet-4-lines.jpg",
    blurb: "Pulley-operated terrace system with rust-proof pipes & UV-grade rope.",
  },
  {
    slug: "open-terrace-5ft",
    name: "Open Terrace Fitting 5 Feet · 4 Lines",
    category: "Open Terrace",
    size: "5 Ft",
    mrp: 4600,
    price: 3910,
    image: "/legacy/products/open-terrace/open-terrace-fitting-5-feet-4-lines.jpg",
    blurb: "Best for 4 to 5 member families. Lower, load and raise with one pull.",
  },
  {
    slug: "open-terrace-6ft",
    name: "Open Terrace Fitting 6 Feet · 4 Lines",
    category: "Open Terrace",
    size: "6 Ft",
    mrp: 4700,
    price: 3995,
    image: "/legacy/products/open-terrace/open-terrace-fitting-6-feet-4-lines.jpg",
    blurb: "Extra drying length for heavy laundry days & large homes.",
  },
  {
    slug: "ceiling-mount-4ft",
    name: "Ceiling Mount Fitting 4 Feet · 4 Lines",
    category: "Ceiling Mount",
    size: "4 Ft",
    mrp: 3600,
    price: 3060,
    image: "/legacy/products/ceiling-mount/ceiling-mount-fitting-4-feet-4-lines.jpg",
    blurb: "Space-saving balcony & passage fitting. Elegant ceiling look.",
  },
  {
    slug: "ceiling-mount-5ft",
    name: "Ceiling Mount Fitting 5 Feet · 4 Lines",
    category: "Ceiling Mount",
    size: "5 Ft",
    mrp: 3700,
    price: 3145,
    image: "/legacy/products/ceiling-mount/ceiling-mount-fitting-5-feet-4-lines.jpg",
    blurb: "Our bestseller for flats & balconies across Pune.",
  },
  {
    slug: "ceiling-mount-6ft",
    name: "Ceiling Mount Fitting 6 Feet · 4 Lines",
    category: "Ceiling Mount",
    size: "6 Ft",
    mrp: 3800,
    price: 3230,
    image: "/legacy/products/ceiling-mount/ceiling-mount-fitting-6-feet-4-lines.jpg",
    blurb: "Maximum indoor drying with smooth pulley glide.",
  },
  {
    slug: "wall-mount-3ft-3lines",
    name: "Wall Mount 3 Feet · 3 Lines",
    category: "Wall Mount",
    size: "3 Ft",
    mrp: 2200,
    price: 1980,
    image: "/legacy/products/wall-mount/wall-mount-3-feet-3-lines.jpg",
    blurb: "Foldable stainless-steel wall stand. Ideal for compact walls.",
  },
  {
    slug: "wall-mount-3ft-4lines",
    name: "Wall Mount 3 Feet · 4 Lines",
    category: "Wall Mount",
    size: "3 Ft",
    mrp: 2500,
    price: 2250,
    image: "/legacy/products/wall-mount/wall-mount-3-feet-4-lines.jpg",
    blurb: "Fold flat when not in use. 304-grade steel rods.",
  },
  {
    slug: "wall-mount-4ft-3lines",
    name: "Wall Mount 4 Feet · 3 Lines",
    category: "Wall Mount",
    size: "4 Ft",
    mrp: 2800,
    price: 2520,
    image: "/legacy/product-wall.png",
    blurb: "The classic utility-balcony workhorse. Zero floor space.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Poonam Yadav",
    area: "Baner, Pune",
    text: "Using the pulley system for a couple of months. Working smoothly, easy to use, and it manages our drying space so effectively.",
  },
  {
    name: "Anil Mahajan",
    area: "Kothrud, Pune",
    text: "Six members in the family and the balcony felt tiny. Thanks to Excellent Dry, all clothes dry faster with proper spacing.",
  },
  {
    name: "Mallikarjuna Swamy",
    area: "Wakad, Pune",
    text: "Good quality product, professional installation. An asset with real utility for every house.",
  },
];

export const STATS = [
  { value: "100000+", label: "Installations done" },
  { value: "80000+", label: "Happy reviews" },
  { value: "11+", label: "Years experience" },
  { value: "15+", label: "Team members" },
];

export const AREAS = [
  "Baner", "Bavdhan", "Wakad", "Hinjewadi", "Kothrud", "Warje",
  "Pimpri", "Chinchwad", "Akurdi", "Viman Nagar", "Kharadi",
  "Hadapsar", "Kondhwa", "Katraj", "Deccan", "Shivajinagar",
];

export const DEMO_VIDEO_ID = "5RdtFaFhsXM";
export const DEMO_VIDEO_URL = `https://youtu.be/${DEMO_VIDEO_ID}`;

export function inr(n: number) {
  return "₹ " + n.toLocaleString("en-IN");
}
