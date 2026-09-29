"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/site";
import { useT } from "@/components/LanguageSwitcher";

export default function ProductsPage() {
  return (
    <Suspense fallback={<p className="mx-auto max-w-[1440px] px-4 py-20">Loading…</p>}>
      <List />
    </Suspense>
  );
}

function List() {
  const t = useT();
  const sp = useSearchParams();
  const cat = sp.get("cat") || undefined;
  const q = sp.get("q") || undefined;
  const sort = sp.get("sort") || undefined;

  let list = [...PRODUCTS];
  if (cat) list = list.filter((p) => p.category === cat);
  if (q) {
    const needle = q.toLowerCase();
    list = list.filter((p) => `${p.name} ${p.category} ${p.blurb}`.toLowerCase().includes(needle));
  }
  if (sort === "low") list.sort((a, b) => a.price - b.price);
  if (sort === "high") list.sort((a, b) => b.price - a.price);

  const href = (params: Record<string, string | undefined>) => {
    const s = new URLSearchParams();
    if (params.cat) s.set("cat", params.cat);
    if (params.q) s.set("q", params.q);
    if (params.sort) s.set("sort", params.sort);
    const str = s.toString();
    return `/products${str ? `?${str}` : ""}`;
  };

  const cats: { label: string; value: string | undefined; img: string }[] = [
    { label: "All 24", value: undefined, img: "/legacy/hero-2.png" },
    { label: "Terrace", value: "Open Terrace", img: "/legacy/products/open-terrace/open-terrace-fitting-6-feet-4-lines.jpg" },
    { label: "Ceiling", value: "Ceiling Mount", img: "/legacy/products/ceiling-mount/ceiling-mount-fitting-5-feet-4-lines.jpg" },
    { label: "Wall", value: "Wall Mount", img: "/legacy/products/wall-mount/wall-mount-3-feet-4-lines.jpg" },
  ];

  return (
    <div className="bg-[#f7f5ef]">
      {/* full-bleed PLP header */}
      <div className="border-b border-black/10 bg-[#051e1d] text-white">
        <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8 md:py-14">
          <p className="text-[12px] font-bold text-white/50"><Link href="/" className="hover:text-white">Home</Link> / Shop{q ? ` / “${q}”` : ""}</p>
          <h1 className="mega-type mt-2 text-[clamp(2.6rem,6vw,5rem)]">Shop systems<span className="text-[#e8b62a]">.</span></h1>
          <p className="mt-3 max-w-2xl text-sm text-white/65 md:text-[15px]">{t("shop_desc")} Every price includes fitting, GST bill and 1-year service in Pune.</p>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        {/* visual category selector */}
        <div className="mt-6 grid grid-cols-4 gap-2.5 md:gap-3">
          {cats.map((c) => {
            const active = (c.value ?? undefined) === cat && !q;
            const n = c.value ? PRODUCTS.filter((p) => p.category === c.value).length : PRODUCTS.length;
            return (
              <Link key={c.label} href={href({ cat: c.value, q, sort })} className={`group overflow-hidden rounded-2xl border text-left transition ${active ? "border-black bg-black text-white shadow-xl" : "border-black/10 bg-white hover:-translate-y-0.5 hover:shadow-lg"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={c.label} className="hidden aspect-[16/8] w-full object-cover sm:block" />
                <span className="block p-3 md:p-4">
                  <span className="block text-sm font-extrabold md:text-base">{c.label} · {n}</span>
                  <span className={`block text-[11px] font-bold md:text-[12px] ${active ? "text-white/60" : "text-stone-400"}`}>{active ? "Selected ✓" : "Tap to filter"}</span>
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] font-extrabold text-stone-500">{list.length} systems · pay after fitting</p>
          <div className="flex items-center gap-4 text-[13px] font-bold">
            {[
              { l: t("sort_rec"), v: undefined },
              { l: t("sort_low"), v: "low" },
              { l: t("sort_high"), v: "high" },
            ].map((s) => (
              <Link key={s.l} href={href({ cat, q, sort: s.v })} className={`transition ${(sort ?? undefined) === s.v ? "underline underline-offset-4" : "text-stone-400 hover:text-black"}`}>{s.l}</Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 py-6 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p, i) => (
            <ProductCard key={p.slug} p={p} badge={i < 2 ? "Bestseller" : cat ?? p.category} />
          ))}
        </div>

        <div className="mb-10 grid gap-3 rounded-[1.75rem] bg-black p-7 text-sm text-white md:grid-cols-3 md:p-8">
          <p><strong className="text-[#e8b62a]">Free visit.</strong> <span className="text-white/65">Measure first, pay later.</span></p>
          <p><strong className="text-[#e8b62a]">90-min fitting.</strong> <span className="text-white/65">Anchors + cleanup included.</span></p>
          <p><strong className="text-[#e8b62a]">Serviceable.</strong> <span className="text-white/65">Rope + pulleys replaceable.</span></p>
        </div>
      </div>
    </div>
  );
}
