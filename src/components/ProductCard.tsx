"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useCart } from "@/lib/cart";
import { inr, type Product } from "@/lib/site";

export default function ProductCard({ p, badge }: { p: Product; badge?: string }) {
  const [added, setAdded] = useState(false);
  let add: (s: string) => void = () => {};
  try {
    add = useCart().add;
  } catch { /* noop */ }
  const off = Math.round(((p.mrp - p.price) / p.mrp) * 100);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-black/10 bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-24px_rgb(0_0_0/0.35)]">
      <Link href={`/products/${p.slug}`} className="relative block bg-[#f1efe7]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.name} loading="lazy" className="aspect-[4/3.6] w-full object-contain p-5 transition duration-500 group-hover:scale-[1.05]" />
        <span className="absolute left-3 top-3 flex gap-1.5">
          <span className="rounded-md bg-black px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">{badge ?? p.size}</span>
          <span className="rounded-md bg-[#e8b62a] px-2 py-1 text-[10px] font-extrabold text-black">-{off}%</span>
        </span>
        <span className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              add(p.slug);
              setAdded(true);
              setTimeout(() => setAdded(false), 1200);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                add(p.slug);
              }
            }}
            className={`flex items-center justify-center gap-1.5 rounded-full py-3 text-[13px] font-extrabold backdrop-blur transition ${added ? "bg-green-700 text-white" : "glass hover:bg-[#e8b62a] hover:text-black"}`}
          >
            {added ? <><Check size={14} /> Added to cart</> : <><Plus size={14} /> Quick add · {inr(p.price)}</>}
          </span>
        </span>
      </Link>
      <Link href={`/products/${p.slug}`} className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#0b3b39]">{p.category} · {p.feet} ft · {p.lines} lines</p>
        <p className="mt-1.5 line-clamp-2 text-[16px] font-extrabold leading-snug tracking-tight">{p.name}</p>
        <p className="mt-1 text-[13px] font-semibold text-stone-400">★★★★★ 4.8 · fitted in Pune</p>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="text-xl font-extrabold">{inr(p.price)}</span>
          <span className="text-sm font-semibold text-stone-400 line-through">{inr(p.mrp)}</span>
        </p>
      </Link>
    </div>
  );
}
