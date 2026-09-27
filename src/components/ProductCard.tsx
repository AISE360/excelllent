"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useCart } from "@/lib/cart";
import { inr, type Product } from "@/lib/site";
import { useT } from "@/components/LanguageSwitcher";

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
    <div className="lift group overflow-hidden rounded-2xl border border-ink/5 bg-white">
      <Link href={`/products/${p.slug}`} className="block">
        <div className="relative bg-gradient-to-b from-card to-stone-200/60 p-5">
          {badge && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-yellow">{badge}</span>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="mx-auto aspect-square object-contain transition duration-500 group-hover:scale-[1.06] group-hover:-rotate-1"
          />
          <span className="absolute inset-x-5 bottom-3 translate-y-2 text-center text-[11px] font-bold uppercase tracking-widest text-ink/0 transition duration-300 group-hover:translate-y-0 group-hover:text-ink/50">
            {p.feet} Ft · {p.lines} Lines
          </span>
        </div>
        <div className="p-4">
          <p className="text-[14px] font-semibold leading-snug transition group-hover:text-brand-cyan-deep">{p.name}</p>
          <p className="mt-1.5 text-[13px] text-stone-500">
            <span className="text-base font-extrabold text-ink">{inr(p.price)}</span>{" "}
            <span className="line-through">{inr(p.mrp)}</span>
          </p>
        </div>
      </Link>
      <button
        onClick={onAdd}
        className={`mx-4 mb-4 flex w-[calc(100%-2rem)] items-center justify-center gap-1.5 rounded-full py-2.5 text-[13px] font-bold transition-all ${added ? "bg-green-600 text-white" : "bg-ink text-white hover:bg-brand-cyan-deep"}`}
      >
        {added ? <><Check size={14} /> {t("card_added")} ✓</> : <><Plus size={14} /> {t("card_add")}</>}
      </button>
    </div>
  );
}
