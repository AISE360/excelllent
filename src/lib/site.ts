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
  feet: number;
  lines: number;
  mrp: number;
  price: number;
  image: string;
  blurb: string;
};

const T = (feet: number) => ({
  blurb: "Pulley-operated terrace system with rust-proof pipes and UV-grade rope.",
});
const C = {
  blurb: "Space-saving balcony and passage fitting with smooth pulley glide.",
};
const W = {
  blurb: "Foldable 304-grade stainless-steel wall stand. Zero floor space.",
};

export const PRODUCTS: Product[] = [
  // Open Terrace 4 to 9 ft (prices from original site)
  { slug: "open-terrace-4ft", name: "Open Terrace Fitting 4 Feet, 4 Lines", category: "Open Terrace", size: "4 Ft", feet: 4, lines: 4, mrp: 4500, price: 3960, image: "/legacy/products/open-terrace/open-terrace-fitting-4-feet-4-lines.jpg", ...T(4) },
  { slug: "open-terrace-5ft", name: "Open Terrace Fitting 5 Feet, 4 Lines", category: "Open Terrace", size: "5 Ft", feet: 5, lines: 4, mrp: 4600, price: 4080, image: "/legacy/products/open-terrace/open-terrace-fitting-5-feet-4-lines.jpg", blurb: "Best for 4 to 5 member families. Lower, load and raise with one pull." },
  { slug: "open-terrace-6ft", name: "Open Terrace Fitting 6 Feet, 4 Lines", category: "Open Terrace", size: "6 Ft", feet: 6, lines: 4, mrp: 4700, price: 4136, image: "/legacy/products/open-terrace/open-terrace-fitting-6-feet-4-lines.jpg", blurb: "Extra drying length for heavy laundry days and large homes." },
  { slug: "open-terrace-7ft", name: "Open Terrace Fitting 7 Feet, 4 Lines", category: "Open Terrace", size: "7 Ft", feet: 7, lines: 4, mrp: 4800, price: 4224, image: "/legacy/products/open-terrace/open-terrace-fitting-7-feet-4-lines.jpg", ...T(7) },
  { slug: "open-terrace-8ft", name: "Open Terrace Fitting 8 Feet, 4 Lines", category: "Open Terrace", size: "8 Ft", feet: 8, lines: 4, mrp: 4900, price: 4312, image: "/legacy/products/open-terrace/open-terrace-fitting-8-feet-4-lines.jpg", ...T(8) },
  { slug: "open-terrace-9ft", name: "Open Terrace Fitting 9 Feet, 4 Lines", category: "Open Terrace", size: "9 Ft", feet: 9, lines: 4, mrp: 5000, price: 4400, image: "/legacy/products/open-terrace/open-terrace-fitting-9-feet-4-lines.jpg", ...T(9) },
  // Ceiling Mount 4 to 9 ft
  { slug: "ceiling-mount-4ft", name: "Ceiling Mount Fitting 4 Feet, 4 Lines", category: "Ceiling Mount", size: "4 Ft", feet: 4, lines: 4, mrp: 3600, price: 3168, image: "/legacy/products/ceiling-mount/ceiling-mount-fitting-4-feet-4-lines.jpg", blurb: "Space-saving balcony and passage fitting. Elegant ceiling look." },
  { slug: "ceiling-mount-5ft", name: "Ceiling Mount Fitting 5 Feet, 4 Lines", category: "Ceiling Mount", size: "5 Ft", feet: 5, lines: 4, mrp: 3700, price: 3256, image: "/legacy/products/ceiling-mount/ceiling-mount-fitting-5-feet-4-lines.jpg", blurb: "Our bestseller for flats and balconies across Pune." },
  { slug: "ceiling-mount-6ft", name: "Ceiling Mount Fitting 6 Feet, 4 Lines", category: "Ceiling Mount", size: "6 Ft", feet: 6, lines: 4, mrp: 3800, price: 3344, image: "/legacy/products/ceiling-mount/ceiling-mount-fitting-6-feet-4-lines.jpg", blurb: "Maximum indoor drying with smooth pulley glide." },
  { slug: "ceiling-mount-7ft", name: "Ceiling Mount Fitting 7 Feet, 4 Lines", category: "Ceiling Mount", size: "7 Ft", feet: 7, lines: 4, mrp: 3900, price: 3432, image: "/legacy/products/ceiling-mount/ceiling-mount-fitting-7-feet-4-lines.jpg", ...C },
  { slug: "ceiling-mount-8ft", name: "Ceiling Mount Fitting 8 Feet, 4 Lines", category: "Ceiling Mount", size: "8 Ft", feet: 8, lines: 4, mrp: 4000, price: 3520, image: "/legacy/products/ceiling-mount/ceiling-mount-fitting-8-feet-4-lines.jpg", ...C },
  { slug: "ceiling-mount-9ft", name: "Ceiling Mount Fitting 9 Feet, 4 Lines", category: "Ceiling Mount", size: "9 Ft", feet: 9, lines: 4, mrp: 4100, price: 3608, image: "/legacy/products/ceiling-mount/ceiling-mount-fitting-9-feet-4-lines.jpg", ...C },
  // Wall Mount 3/4/5 ft x 3/4/5/6 lines
  { slug: "wall-mount-3ft-3lines", name: "Wall Mount 3 Feet, 3 Lines", category: "Wall Mount", size: "3 Ft", feet: 3, lines: 3, mrp: 2300, price: 2070, image: "/legacy/products/wall-mount/wall-mount-3-feet-3-lines.jpg", blurb: "Foldable stainless-steel wall stand. Ideal for compact walls." },
  { slug: "wall-mount-3ft-4lines", name: "Wall Mount 3 Feet, 4 Lines", category: "Wall Mount", size: "3 Ft", feet: 3, lines: 4, mrp: 2600, price: 2340, image: "/legacy/products/wall-mount/wall-mount-3-feet-4-lines.jpg", blurb: "Fold flat when not in use. 304-grade steel rods." },
  { slug: "wall-mount-3ft-5lines", name: "Wall Mount 3 Feet, 5 Lines", category: "Wall Mount", size: "3 Ft", feet: 3, lines: 5, mrp: 2700, price: 2430, image: "/legacy/products/wall-mount/wall-mount-3-feet-5-lines.jpg", ...W },
  { slug: "wall-mount-3ft-6lines", name: "Wall Mount 3 Feet, 6 Lines", category: "Wall Mount", size: "3 Ft", feet: 3, lines: 6, mrp: 2800, price: 2530, image: "/legacy/products/wall-mount/wall-mount-3-feet-6-lines.jpg", ...W },
  { slug: "wall-mount-4ft-3lines", name: "Wall Mount 4 Feet, 3 Lines", category: "Wall Mount", size: "4 Ft", feet: 4, lines: 3, mrp: 2400, price: 2160, image: "/legacy/products/wall-mount/wall-mount-4-feet-3-lines.png", blurb: "The classic utility-balcony workhorse. Zero floor space." },
  { slug: "wall-mount-4ft-4lines", name: "Wall Mount 4 Feet, 4 Lines", category: "Wall Mount", size: "4 Ft", feet: 4, lines: 4, mrp: 2700, price: 2430, image: "/legacy/products/wall-mount/wall-mount-4-feet-4-lines.jpg", ...W },
  { slug: "wall-mount-4ft-5lines", name: "Wall Mount 4 Feet, 5 Lines", category: "Wall Mount", size: "4 Ft", feet: 4, lines: 5, mrp: 2800, price: 2520, image: "/legacy/products/wall-mount/wall-mount-4-feet-5-lines.jpg", ...W },
  { slug: "wall-mount-4ft-6lines", name: "Wall Mount 4 Feet, 6 Lines", category: "Wall Mount", size: "4 Ft", feet: 4, lines: 6, mrp: 2900, price: 2610, image: "/legacy/products/wall-mount/wall-mount-4-feet-6-lines.jpg", ...W },
  { slug: "wall-mount-5ft-3lines", name: "Wall Mount 5 Feet, 3 Lines", category: "Wall Mount", size: "5 Ft", feet: 5, lines: 3, mrp: 2400, price: 2160, image: "/legacy/products/wall-mount/wall-mount-5-feet-3-lines.jpg", ...W },
  { slug: "wall-mount-5ft-4lines", name: "Wall Mount 5 Feet, 4 Lines", category: "Wall Mount", size: "5 Ft", feet: 5, lines: 4, mrp: 2700, price: 2430, image: "/legacy/products/wall-mount/wall-mount-5-feet-4-lines.jpg", ...W },
  { slug: "wall-mount-5ft-5lines", name: "Wall Mount 5 Feet, 5 Lines", category: "Wall Mount", size: "5 Ft", feet: 5, lines: 5, mrp: 2800, price: 2520, image: "/legacy/products/wall-mount/wall-mount-5-feet-5-lines.jpg", ...W },
  { slug: "wall-mount-5ft-6lines", name: "Wall Mount 5 Feet, 6 Lines", category: "Wall Mount", size: "5 Ft", feet: 5, lines: 6, mrp: 2900, price: 2610, image: "/legacy/products/wall-mount/wall-mount-5-feet-6-lines.jpg", ...W },
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

export const DELIVERY_AREAS = [
  "Pune City", "Shivaji Nagar", "Camp", "Deccan Gymkhana", "Model Colony",
  "Rasta Peth", "Sadashiv Peth", "Swargate", "Parvati", "Bibvewadi",
  "Dhankawadi", "Katraj", "Khed Shivapur", "Khadki", "Bopkhel",
  "Baner", "Hinjewadi", "Bavdhan", "Pimple Saudagar", "Pimple Gurav",
  "Aundh", "Yerawada", "Viman Nagar", "Vishrantwadi", "Pirangut",
  "Peth", "Panshet", "Pimpri", "Chinchwad", "Vidya Nagar Lohagaon",
  "Wagholi", "Tingre Nagar", "Khadakwasla", "Mulshi", "Lavasa",
  "Kothrud", "Warje", "Vadgaon Budruk", "Fursungi", "Wanowrie",
  "Kondhwa Khurd", "Bopodi", "Dapodi", "Bhosari", "Hadpsar",
  "Undri", "Mundhwa", "Chakan", "Moshi", "Talegaon Dabhade",
];

export type ClientGroup = { area: string; societies: string[] };

export const RESIDENTIAL_CLIENTS: ClientGroup[] = [
  { area: "Pimpri Chinchwad", societies: ["Queens town", "Mahindra Antheia", "Ganga Ashiyana", "Metro Politeen", "Greens", "Empire Squire", "Empire Estate", "Ajmera Housing Society", "Elite Homes"] },
  { area: "Rawet", societies: ["Kunal Iconia", "G. K. Hill Residency", "Nano Homes", "Royal Casa", "Crystal City", "Rainbow Yellow"] },
  { area: "Wakad, Bhumkar Chowk", societies: ["Akshara Elementa", "Kalptaru Harmony", "Windsor", "Dynasty", "Sonigara Nisarg", "Vedanta", "Ganesh Imperial", "Costa Rica", "Prolife", "Malpani Greens", "Sucasa Ph 1", "Sanskriti", "Palash", "Park Street", "Omega Paradise", "Vardhaman Residency", "Sonigara Kesar", "Flurencia", "Bella Vista"] },
  { area: "Pimple Saudagar, Pimple Nilakh", societies: ["Kunal Icon", "Sai Avenue", "Rose Land", "Nico Sky Park", "Kalpataru Estate", "Leon Orbit", "Peace Valley", "Green Land Society", "Rose Valley", "Alcove", "Kohinoor Lifestyle", "Nisarg Nirman", "Akash Ganga", "Rose Woods", "Park Royal", "Siddhi Vinayak Ginger", "24 K Glitterati", "Waters Edge"] },
  { area: "Hinjewadi", societies: ["Megapolis", "Blue Ridge", "Life Republic", "Lodha Belmondo"] },
  { area: "Sinhgad Road, Dhayri", societies: ["Madhukosh", "Nanded City", "Balaji Paradise", "Eisha Erica", "D.S.K Vishwa", "Sun City", "Greenland"] },
  { area: "Bavdhan, Balewadi, Baner", societies: ["Nayati", "Rutuparna", "Balaji Infinity", "Vatica", "Paritosh", "Nandan Spectra", "Comfort Zone", "Thorve Vishwa", "Bella Casa", "Rohan Leher", "Pebbles", "Yashwin Society", "Basant Bahar Society", "Mount Vert", "Padmavilas", "Felicita", "Hillscape"] },
  { area: "Kothrud", societies: ["Karishma Society", "Dahanukar Colony", "Mahatma Society", "Hill View Residency", "Woodland Society", "Woods Royal", "Pachimanagari", "Right Bhusari Colony", "Left Bhusari Colony"] },
  { area: "Viman Nagar, Kalyani Nagar", societies: ["Lunkad Amazon", "Zircon", "Kumar City"] },
  { area: "Yerwada, Vishrantwadi, Dhanori", societies: ["Brahma Sky City", "Ashiyana", "Aero Polis", "Nayati", "Tirupati Vasantam"] },
  { area: "Hadapsar", societies: ["Amanora Park Town", "Magarpatta City"] },
  { area: "Kharadi, Wagholi", societies: ["Forest County", "Gera Trinity Tower", "Song Of Joy", "Gera South", "Marvel Ganga Ph 1", "Konark Orchid", "Oxy Valley", "Nyati Elan", "IVY Estate"] },
  { area: "Manjri", societies: ["Kalpataru Serenity", "Manjri Greens", "Grand Bay"] },
];

export const GOVT_CLIENTS = [
  "CRPF Talegaon Dabhade",
  "Police Training Center, Pashan",
  "Reserve Bank of India, Shivaji Nagar",
];

export const HOSTEL_CLIENTS = [
  "Arekar Hostel, Chikhali and Panchgani",
  "Abhishek Vidhyalayam, Shahu Nagar, Chinchwad",
];

export const DEMO_VIDEO_ID = "5RdtFaFhsXM";
export const DEMO_VIDEO_URL = `https://youtu.be/${DEMO_VIDEO_ID}`;

export function inr(n: number) {
  return "₹ " + n.toLocaleString("en-IN");
}
