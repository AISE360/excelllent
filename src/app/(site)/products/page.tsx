import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Drying Rack & Systems",
  description: "Open terrace pulley systems, ceiling mount dryers & foldable wall stands with installation in Pune.",
};

const CATS = ["Open Terrace", "Ceiling Mount", "Wall Mount"] as const;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; q?: string; sort?: string }>;
}) {
  const { cat, q, sort } = await searchParams;
  let list = [...PRODUCTS];
  if (cat) list = list.filter((p) => p.category === cat);
  if (q) {
    const needle = q.toLowerCase();
    list = list.filter((p) => `${p.name} ${p.category} ${p.blurb}`.toLowerCase().includes(needle));
  }
  if (sort === "low") list.sort((a, b) => a.price - b.price);
  if (sort === "high") list.sort((a, b) => b.price - a.price);

  const here = (c: string) => `/products?cat=${encodeURIComponent(c)}`;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4">
      {/* breadcrumb */}
      <p className="text-[12px] text-stone-500">
        <Link href="/" className="hover:underline">Home</Link>
        {" ＞ "} Drying Systems {cat ? `＞ ${cat}` : ""}
      </p>

      <h1 className="font-display mt-1 text-5xl font-bold">Drying rack</h1>
      <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-stone-500">
        Clothes horses to fall in love with. Dry without a dryer on a pulley-operated
        Excellent Dry system instead — stable, easy to use, and available for terrace,
        ceiling and wall. {q && <>Results for “<strong>{q}</strong>”.</>}
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[220px_1fr]">
        {/* FILTER SIDEBAR */}
        <aside>
          <p className="text-sm font-bold">Filter Results</p>
          <div className="mt-3 border-t border-stone-200 pt-3">
            <p className="text-[13px] font-bold">Categories</p>
            <ul className="mt-2 space-y-1.5 text-[13px] text-stone-600">
              <li>
                <Link href="/products" className={!cat ? "font-bold text-ink" : "hover:text-ink"}>
                  All systems ({PRODUCTS.length})
                </Link>
              </li>
              {CATS.map((c) => {
                const n = PRODUCTS.filter((p) => p.category === c).length;
                return (
                  <li key={c}>
                    <Link href={here(c)} className={cat === c ? "font-bold text-ink" : "hover:text-ink"}>
                      {c === "Open Terrace" ? "Pulley drying system" : c === "Ceiling Mount" ? "Ceiling drying rack" : "Wall mounted dryer"} ({n})
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-4 border-t border-stone-200 pt-3">
            <p className="text-[13px] font-bold">Size</p>
            <ul className="mt-2 space-y-1.5 text-[13px] text-stone-600">
              {["3 Ft", "4 Ft", "5 Ft", "6 Ft"].map((s) => {
                const n = PRODUCTS.filter((p) => p.size === s).length;
                return <li key={s}>☐ {s} ({n})</li>;
              })}
            </ul>
          </div>
          <div className="mt-4 border-t border-stone-200 pt-3">
            <p className="text-[13px] font-bold">Colour</p>
            <div className="mt-2 flex gap-3 text-[12px] text-stone-600">
              <span className="flex items-center gap-1"><i className="inline-block h-4 w-4 bg-ink" /> Steel</span>
              <span className="flex items-center gap-1"><i className="inline-block h-4 w-4 bg-stone-400" /> Grey</span>
              <span className="flex items-center gap-1"><i className="inline-block h-4 w-4 border border-stone-400 bg-white" /> White</span>
            </div>
          </div>
        </aside>

        {/* GRID */}
        <div>
          <div className="flex items-center justify-between text-[13px]">
            <p className="text-stone-500">{list.length} products</p>
            <p className="flex items-center gap-2">
              Sort By
              <span className="flex gap-2 font-semibold">
                <Link href={`/products?${new URLSearchParams({ ...(cat ? { cat } : {}), ...(q ? { q } : {}) })}`} className={!sort ? "underline" : ""}>Recommended</Link>
                <Link href={`/products?${new URLSearchParams({ ...(cat ? { cat } : {}), ...(q ? { q } : {}), sort: "low" })}`} className={sort === "low" ? "underline" : ""}>Price ↑</Link>
                <Link href={`/products?${new URLSearchParams({ ...(cat ? { cat } : {}), ...(q ? { q } : {}), sort: "high" })}`} className={sort === "high" ? "underline" : ""}>Price ↓</Link>
              </span>
            </p>
          </div>
          {list.length === 0 ? (
            <p className="mt-10 border border-stone-200 bg-stone-50 p-8 text-center text-sm text-stone-500">
              No products match. <Link href="/products" className="font-semibold text-ink underline">View all</Link> or{" "}
              <Link href="/contact" className="font-semibold text-ink underline">ask us on WhatsApp</Link>.
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-8 xl:grid-cols-3">
              {list.map((p) => <ProductCard key={p.slug} p={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
