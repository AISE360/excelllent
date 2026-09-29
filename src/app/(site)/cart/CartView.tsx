"use client";

import Link from "next/link";
import { ArrowRight, Minus, Plus, ShieldCheck, Trash2, Truck } from "lucide-react";
import { useCart } from "@/lib/cart";
import { SITE, inr } from "@/lib/site";
import { useT } from "@/components/LanguageSwitcher";
import EnquiryForm from "@/components/EnquiryForm";

export default function CartView() {
  const { detailed, subtotal, mrpTotal, setQty, remove } = useCart();
  const t = useT();

  if (detailed.length === 0) {
    return (
      <div className="rounded-3xl border border-black/10 bg-white p-10 text-center">
        <p className="text-2xl font-extrabold tracking-tight">{t("cart_empty_t")}</p>
        <p className="mt-1 text-sm text-stone-500">{t("cart_empty_s")}</p>
        <Link href="/products" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#173063] px-6 py-3 text-sm font-bold text-white">
          {t("cart_browse")} <ArrowRight size={15} />
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
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <div className="overflow-hidden rounded-3xl border border-black/10 bg-white">
        <div className="flex items-center justify-between border-b border-black/[0.07] bg-[#f4f7fd] px-5 py-3.5 text-[13px] font-bold">
          <span>{detailed.length} item(s) · Installation included</span>
          <span className="inline-flex items-center gap-1.5 text-[#173063]"><Truck size={14} /> Free site visit</span>
        </div>
        {detailed.map(({ product: p, qty }) => (
          <div key={p.slug} className="flex gap-4 border-b border-black/[0.06] p-4 last:border-0 md:p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt={p.name} className="h-20 w-20 shrink-0 rounded-2xl bg-[#f4f7fd] object-contain p-1.5 md:h-24 md:w-24" />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#173063]">{p.category}</p>
              <Link href={`/products/${p.slug}`} className="mt-0.5 block truncate text-sm font-bold hover:text-[#173063]">
                {p.name}
              </Link>
              <p className="mt-1 text-sm"><strong>{inr(p.price * qty)}</strong> <span className="text-stone-400 line-through">{inr(p.mrp * qty)}</span></p>
              <div className="mt-2.5 flex items-center gap-3">
                <span className="flex items-center rounded-full border border-black/12">
                  <button aria-label="Decrease" className="px-2.5 py-1.5 hover:text-[#173063]" onClick={() => setQty(p.slug, qty - 1)}><Minus size={13} /></button>
                  <span className="w-7 text-center text-sm font-extrabold">{qty}</span>
                  <button aria-label="Increase" className="px-2.5 py-1.5 hover:text-[#173063]" onClick={() => setQty(p.slug, qty + 1)}><Plus size={13} /></button>
                </span>
                <button aria-label="Remove" onClick={() => remove(p.slug)} className="inline-flex items-center gap-1 text-[12px] font-bold text-stone-400 hover:text-red-600"><Trash2 size={14} /> Remove</button>
              </div>
            </div>
          </div>
        ))}
        <p className="flex items-center gap-2 px-5 py-4 text-[12px] font-semibold text-stone-500">
          <ShieldCheck size={14} className="text-[#173063]" /> Pay after fitting · GST invoice on WhatsApp · 1-year service
        </p>
      </div>

      <div className="h-fit rounded-3xl border border-black/10 bg-white p-6 md:sticky md:top-32">
        <p className="text-lg font-extrabold tracking-tight">{t("cart_checkout_t")}</p>
        <p className="mt-1 text-[13px] font-medium text-black/55">{t("cart_checkout_s")}</p>
        <div className="mt-4 space-y-1.5 border-t border-black/10 pt-4 text-sm font-semibold">
          <p className="flex justify-between"><span className="text-black/55">{t("cart_subtotal")}</span><strong>{inr(subtotal)}</strong></p>
          <p className="flex justify-between text-green-700"><span>{t("cart_save")}</span><strong>{inr(mrpTotal - subtotal)}</strong></p>
          <p className="flex justify-between border-t border-black/10 pt-2 text-base font-extrabold"><span>Total</span><span>{inr(subtotal)}</span></p>
        </div>
        <a href={wa} target="_blank" className="mt-4 block rounded-full bg-[#25D366] p-3.5 text-center text-sm font-extrabold text-white transition hover:brightness-95">
          {t("cart_wa")} →
        </a>
        <div className="mt-3 rounded-2xl bg-[#f4f7fd] p-4">
          <p className="text-[13px] font-extrabold">Or request a free callback</p>
          <div className="mt-2"><EnquiryForm /></div>
        </div>
      </div>
    </div>
  );
}
