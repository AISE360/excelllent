"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/site";
import { useT } from "@/components/LanguageSwitcher";

const CATS = [
  { key: "filter_pulley" as const, cat: "Open Terrace" },
  { key: "filter_ceiling" as const, cat: "Ceiling Mount" },
  { key: "filter_wall" as const, cat: "Wall Mount" },
];

export default function ProductsPage() {
  return (
    <Suspense fallback={<p className="mx-auto max-w-6xl px-4 py-20 text-sm text-stone-400">Loading...</p>}>
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

  const keep = new URLSearchParams({ ...(cat ? { cat } : {}), ...(q ? { q } : {}) });
  const sortHref = (s?: string) =>
    `/products?${new URLSearchParams({ ...Object.fromEntries(keep), ...(s ? { sort: s } : {}) })}`;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4">
      <p className="text-[12px] text-stone-500">
        <Link href="/" className="hover:underline">{t("home")}</Link>
        {" ＞ "} {t("shop_title")} {cat ? `＞ ${cat}` : ""}
      </p>

      <h1 className="font-display mt-1 leading-[0.9]" style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>{t("shop_title")}</h1>
      <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-stone-500">
        {t("shop_desc")} {q && <>“<strong>{q}</strong>”</>}
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside>
          <p className="text-sm font-bold">{t("filter_t")}</p>
          <div className="mt-3 border-t border-stone-200 pt-3">
            <p className="text-[13px] font-bold">{t("filter_cat")}</p>
            <ul className="mt-2 space-y-1.5 text-[13px] text-stone-600">
              <li>
                <Link href="/products" className={!cat ? "inline-block rounded-full bg-ink px-3 py-1 font-bold text-white" : "hover:text-ink"}>
                  {t("filter_all")} ({PRODUCTS.length})
                </Link>
              </li>
              {CATS.map((c) => {
                const n = PRODUCTS.filter((p) => p.category === c.cat).length;
                return (
                  <li key={c.cat}>
                    <Link
                      href={`/products?cat=${encodeURIComponent(c.cat)}`}
                      className={cat === c.cat ? "inline-block rounded-full bg-ink px-3 py-1 font-bold text-white" : "hover:text-ink"}
                    >
                      {t(c.key)} ({n})
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-4 border-t border-stone-200 pt-3">
            <p className="text-[13px] font-bold">{t("filter_size")}</p>
            <ul className="mt-2 space-y-1.5 text-[13px] text-stone-600">
              {["3 Ft", "4 Ft", "5 Ft", "6 Ft"].map((s) => {
                const n = PRODUCTS.filter((p) => p.size === s).length;
                return <li key={s}>☐ {s} ({n})</li>;
              })}
            </ul>
          </div>
          <div className="mt-4 border-t border-stone-200 pt-3">
            <p className="text-[13px] font-bold">{t("filter_colour")}</p>
            <div className="mt-2 flex gap-3 text-[12px] text-stone-600">
              <span className="flex items-center gap-1"><i className="inline-block h-4 w-4 bg-ink" /> Steel</span>
              <span className="flex items-center gap-1"><i className="inline-block h-4 w-4 bg-stone-400" /> Grey</span>
              <span className="flex items-center gap-1"><i className="inline-block h-4 w-4 border border-stone-400 bg-white" /> White</span>
            </div>
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between text-[13px]">
            <p className="text-stone-500">{list.length} {t("products_n")}</p>
            <p className="flex items-center gap-2">
              {t("sort_by")}
              <span className="flex gap-2 font-semibold">
                <Link href={sortHref()} className={!sort ? "underline" : ""}>{t("sort_rec")}</Link>
                <Link href={sortHref("low")} className={sort === "low" ? "underline" : ""}>{t("sort_low")}</Link>
                <Link href={sortHref("high")} className={sort === "high" ? "underline" : ""}>{t("sort_high")}</Link>
              </span>
            </p>
          </div>
          {list.length === 0 ? (
            <p className="mt-10 border border-stone-200 bg-stone-50 p-8 text-center text-sm text-stone-500">
              <Link href="/products" className="font-semibold text-ink underline">{t("filter_all")}</Link>
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
