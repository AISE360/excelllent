"use client";

import Link from "next/link";
import { ArrowRight, Minus, Plus, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { SITE, inr } from "@/lib/site";

export default function CartDrawer() {
  let cart: ReturnType<typeof useCart> | null = null;
  try {
    cart = useCart();
  } catch {
    return null;
  }
  const { detailed, subtotal, mrpTotal, setQty, remove, cartOpen, setCartOpen } = cart;

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setCartOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setCartOpen]);

  if (!cartOpen) return null;

  const wa = `https://wa.me/${SITE.phoneRaw1}?text=${encodeURIComponent(
    "Hi Excellent Dry! I want to order:\n" +
      detailed.map((d) => `• ${d.product.name} x ${d.qty} = ${inr(d.product.price * d.qty)}`).join("\n") +
      `\nTotal: ${inr(subtotal)}`
  )}`;

  return (
    <div className="fixed inset-0 z-[90]">
      <div className="fade-in absolute inset-0 bg-black/55 backdrop-blur-[2px]" onClick={() => setCartOpen(false)} />
      <aside className="drawer-in absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <p className="text-lg font-extrabold tracking-tight">Your kit <span className="text-sm font-bold text-stone-400">({detailed.reduce((n, d) => n + d.qty, 0)})</span></p>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart" className="rounded-full p-2 hover:bg-black/5"><X size={20} /></button>
        </div>

        <div className="border-b border-black/[0.07] bg-[#f7f5ef] px-5 py-3 text-[12px] font-bold text-[#0b3b39]">
          Free site visit + installation in Pune · Pay after fitting
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {detailed.length === 0 ? (
            <div className="py-14 text-center">
              <p className="text-xl font-extrabold">Nothing here yet.</p>
              <p className="mt-1 text-sm text-stone-500">Pick a size. Most balconies take 5–6 ft.</p>
              <button onClick={() => setCartOpen(false)} className="mt-5 rounded-full bg-[#0b3b39] px-6 py-3 text-sm font-bold text-white">
                <Link href="/products">Browse systems</Link>
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {detailed.map(({ product: p, qty }) => (
                <li key={p.slug} className="flex gap-3 rounded-2xl border border-black/10 p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.name} className="h-16 w-16 rounded-xl bg-[#f7f5ef] object-contain" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-bold">{p.name}</p>
                    <p className="text-[13px] font-extrabold">{inr(p.price * qty)}</p>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="flex items-center rounded-full border border-black/12">
                        <button className="px-2 py-1" onClick={() => setQty(p.slug, qty - 1)} aria-label="Decrease"><Minus size={12} /></button>
                        <span className="w-6 text-center text-[13px] font-extrabold">{qty}</span>
                        <button className="px-2 py-1" onClick={() => setQty(p.slug, qty + 1)} aria-label="Increase"><Plus size={12} /></button>
                      </span>
                      <button onClick={() => remove(p.slug)} aria-label="Remove" className="p-1 text-stone-400 hover:text-red-600"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {detailed.length > 0 && (
          <div className="border-t border-black/10 bg-white p-5">
            <p className="flex justify-between text-sm font-bold"><span className="text-stone-500">Subtotal</span><span>{inr(subtotal)}</span></p>
            <p className="mt-1 flex justify-between text-sm font-bold text-green-700"><span>You save</span><span>{inr(mrpTotal - subtotal)}</span></p>
            <a href={wa} target="_blank" className="mt-3 block rounded-full bg-[#25D366] p-3.5 text-center text-sm font-extrabold text-white">
              Order on WhatsApp →
            </a>
            <Link href="/cart" onClick={() => setCartOpen(false)} className="btn-slide mt-2 flex items-center justify-center gap-1.5 rounded-full bg-[#0b3b39] p-3.5 text-center text-sm font-bold text-white">
              Review & checkout <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
