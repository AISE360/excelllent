import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop Clothes Drying Systems",
  description: "Open terrace pulley systems, ceiling mount dryers & foldable wall stands with installation in Pune.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const list = cat ? PRODUCTS.filter((p) => p.category === cat) : PRODUCTS;
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-pine-950 sm:text-4xl">
        {cat ? `${cat} drying systems` : "All drying systems"}
      </h1>
      <p className="mt-2 text-sm text-stone-500">
        Prices include standard Pune installation visit · GST invoice available
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {["All", "Open Terrace", "Ceiling Mount", "Wall Mount"].map((c) => (
          <a key={c} href={c === "All" ? "/products" : `/products?cat=${encodeURIComponent(c)}`}
            className={`rounded-full px-4 py-2 text-[13px] font-semibold ${(!cat && c === "All") || cat === c ? "bg-pine-800 text-white" : "border border-stone-300 bg-white text-stone-600"}`}>
            {c}
          </a>
        ))}
      </div>
      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => <ProductCard key={p.slug} p={p} />)}
      </div>
    </div>
  );
}
