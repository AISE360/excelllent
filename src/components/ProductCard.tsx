import Link from "next/link";
import { inr, type Product } from "@/lib/site";

export default function ProductCard({ p }: { p: Product }) {
  const off = Math.round((1 - p.price / p.mrp) * 100);
  return (
    <div className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_1px_0_rgb(0_0_0/0.04)] transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-pine-950/90 px-2.5 py-1 text-[11px] font-bold text-white">
          {off}% OFF
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-pine-800">
          {p.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-[15px] font-bold leading-snug text-stone-900">{p.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-stone-500">{p.blurb}</p>
        <p className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-pine-800">{inr(p.price)}</span>
          <span className="text-sm text-stone-400 line-through">{inr(p.mrp)}</span>
        </p>
        <div className="mt-4 flex gap-2">
          <Link
            href={`/products/${p.slug}`}
            className="flex-1 rounded-xl border border-pine-800 px-3 py-2.5 text-center text-sm font-semibold text-pine-800 transition hover:bg-pine-50"
          >
            Details
          </Link>
          <Link
            href={`/contact?product=${encodeURIComponent(p.name)}`}
            className="flex-1 rounded-xl bg-pine-800 px-3 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-pine-700"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
}
