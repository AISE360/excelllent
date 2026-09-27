"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { SITE, inr } from "@/lib/site";

export default function CartView() {
  const { detailed, subtotal, mrpTotal, setQty, remove } = useCart();

  if (detailed.length === 0) {
    return (
      <div className="border border-stone-200 bg-white p-10 text-center">
        <p className="font-display text-3xl font-bold">Cart is empty.</p>
        <p className="mt-1 text-sm text-stone-500">Add a drying system to get started.</p>
        <Link href="/products" className="mt-5 inline-block bg-ink px-6 py-2.5 text-sm font-bold text-white">
          Browse products →
        </Link>
      </div>
    );
  }

  const wa = `https://wa.me/${SITE.phoneRaw1}?text=${encodeURIComponent(
    "Hi Excellent Dry! I want to order:\n" +
      detailed.map((d) => `• ${d.product.name} x ${d.qty} = ${inr(d.product.price * d.qty)}`).join("\n") +
      `\nTotal: ${inr(subtotal)}`
  )}`;

  return (
    <div>
      <div className="border border-stone-200 bg-white">
        {detailed.map(({ product: p, qty }) => (
          <div key={p.slug} className="flex gap-4 border-b border-stone-100 p-4 last:border-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt={p.name} className="h-20 w-20 shrink-0 bg-card object-contain" />
            <div className="min-w-0 flex-1">
              <Link href={`/products/${p.slug}`} className="text-sm font-semibold hover:text-brand-red">
                {p.name}
              </Link>
              <p className="mt-0.5 text-sm font-bold">{inr(p.price * qty)}</p>
              <div className="mt-2 flex items-center gap-3">
                <span className="flex items-center border border-stone-300">
                  <button aria-label="Decrease" className="px-2 py-1" onClick={() => setQty(p.slug, qty - 1)}><Minus size={13} /></button>
                  <span className="w-7 text-center text-sm font-bold">{qty}</span>
                  <button aria-label="Increase" className="px-2 py-1" onClick={() => setQty(p.slug, qty + 1)}><Plus size={13} /></button>
                </span>
                <button aria-label="Remove" onClick={() => remove(p.slug)}><Trash2 size={15} className="text-red-600" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between bg-ink p-4 text-white">
        <span className="text-sm">Subtotal (you save {inr(mrpTotal - subtotal)})</span>
        <span className="font-display text-3xl font-bold">{inr(subtotal)}</span>
      </div>
      <a href={wa} target="_blank" className="mt-3 block bg-[#25D366] p-3.5 text-center text-sm font-bold text-white">
        Order instantly on WhatsApp →
      </a>
    </div>
  );
}
