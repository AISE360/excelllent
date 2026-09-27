"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useCart } from "@/lib/cart";
import { inr, type Product } from "@/lib/site";
import { useT } from "@/components/LanguageSwitcher";
import WishHeart from "@/components/WishHeart";

export default function ProductCard({ p, badge = "New" }: { p: Product; badge?: string }) {
  const { add } = useCart();
  const t = useT();
  const [added, setAdded] = useState(false);

  function onAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    add(p.slug);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="group overflow-hidden rounded-3xl bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/products/${p.slug}`} className="block">
        <div className="relative bg-stone-100 p-5">
          {badge && (
            <span className="absolute left-3 top-3 z-10 rounded-full border border-ink/10 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">{badge}</span>
          )}
          <span className="absolute right-3 top-3 z-10"><WishHeart slug={p.slug} /></span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="mx-auto aspect-square rounded-2xl object-contain transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <p className="text-[14px] font-semibold leading-snug transition group-hover:text-pine">{p.name}</p>
          <p className="mt-1.5 text-[13px] text-stone-500">
            <span className="text-base font-extrabold text-ink">{inr(p.price)}</span>{" "}
            <span className="line-through">{inr(p.mrp)}</span>
          </p>
        </div>
      </Link>
      <button
        onClick={onAdd}
        className={`mx-4 mb-4 flex w-[calc(100%-2rem)] items-center justify-center gap-1.5 rounded-full py-2.5 text-[13px] font-bold transition-all ${added ? "bg-green-700 text-white" : "bg-pine text-white hover:bg-pine-deep"}`}
      >
        {added ? <><Check size={14} /> {t("card_added")} ✓</> : <><Plus size={14} /> {t("card_add")}</>}
      </button>
    </div>
  );
}
