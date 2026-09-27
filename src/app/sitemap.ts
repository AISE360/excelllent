import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/site";

const BASE = "https://www.excellentdrysystem.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = ["", "/products", "/about", "/gallery", "/testimonials", "/become-retailer", "/contact"].map(
    (p) => ({ url: `${BASE}${p}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })
  );
  const products = PRODUCTS.map((p) => ({
    url: `${BASE}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...statics, ...products];
}
