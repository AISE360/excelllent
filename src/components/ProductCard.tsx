"use client";

import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import { inr, type Product } from "@/lib/site";

export default function ProductCard({ p, badge = "New" }: { p: Product; badge?: string }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function onAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    add(p.slug);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="lift group border border-stone-200 bg-white">
      <Link href={`/products/${p.slug}`} className="block">
        <div className="relative bg-card p-5">
          {badge && (
            <span className="absolute left-2 top-2 rounded bg-brand-yellow px-1.5 py-0.5 text-[11px] font-bold">{badge}</span>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="mx-auto aspect-square object-contain transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-3">
          <p className="text-[14px] font-semibold leading-snug group-hover:text-brand-red">{p.name}</p>
          <p className="mt-1 text-[13px] text-stone-500">
            {p.size} · {inr(p.price)} <span className="line-through">{inr(p.mrp)}</span>
          </p>
        </div>
      </Link>
      <button
        onClick={onAdd}
        className={`mx-3 mb-3 flex w-[calc(100%-1.5rem)] items-center justify-center gap-1.5 py-2 text-[13px] font-bold transition ${added ? "bg-green-600 text-white" : "bg-ink text-white hover:bg-brand-red"}`}
      >
        {added ? <><Check size={14} /> Added ✓</> : "Add to Cart"}
      </button>
    </div>
  );
}
