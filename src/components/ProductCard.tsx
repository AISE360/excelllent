import Link from "next/link";
import { inr, type Product } from "@/lib/site";

export default function ProductCard({ p, badge = "New" }: { p: Product; badge?: string }) {
  return (
    <Link href={`/products/${p.slug}`} className="group">
      <div className="relative bg-card p-6">
        {badge && (
          <span className="absolute left-2 top-2 bg-brand-yellow px-1.5 py-0.5 text-[11px] font-bold">{badge}</span>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="mx-auto aspect-square object-contain transition duration-500 group-hover:scale-105"
        />
      </div>
      <p className="mt-2 text-[14px] font-semibold leading-snug group-hover:text-brand-red">{p.name}</p>
      <p className="text-[13px] text-stone-500">
        {p.size} · {inr(p.price)} <span className="line-through">{inr(p.mrp)}</span>
      </p>
    </Link>
  );
}
