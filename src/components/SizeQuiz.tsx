"use client";

import Link from "next/link";
import { ArrowRight, Check, Ruler } from "lucide-react";
import { useState } from "react";
import { PRODUCTS, inr } from "@/lib/site";

const SPACE_OPTS = [
  { label: "Open terrace", desc: "Full sun", cat: "Open Terrace" },
  { label: "Balcony / ceiling", desc: "Most popular", cat: "Ceiling Mount" },
  { label: "Utility wall", desc: "Foldable", cat: "Wall Mount" },
];
const FAMILY_OPTS = [
  { label: "1–2 people", desc: "3–4 ft is enough", feet: 4 },
  { label: "3–5 people", desc: "Sweet spot: 5–6 ft", feet: 6 },
  { label: "6+ people", desc: "Go 7–9 ft", feet: 8 },
];

export default function SizeQuiz() {
  const [cat, setCat] = useState<string | null>(null);
  const [feet, setFeet] = useState<number | null>(null);

  const rec =
    cat && feet
      ? [...PRODUCTS]
          .filter((p) => p.category === cat)
          .sort((a, b) => Math.abs(a.feet - feet) - Math.abs(b.feet - feet))[0]
      : null;

  return (
    <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_30px_70px_-30px_rgb(7_41_40/0.35)]">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="p-7 md:p-10">
          <p className="eyebrow">Find your fit · 20 sec</p>
          <h3 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Answer two. We size it right.</h3>

          <p className="mt-7 flex items-baseline gap-3">
            <span className="text-sm font-extrabold text-[#173063]">01</span>
            <span className="text-[15px] font-extrabold">Where will it go?</span>
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2.5">
            {SPACE_OPTS.map((o) => {
              const on = cat === o.cat;
              return (
                <button
                  key={o.label}
                  onClick={() => setCat(on ? null : o.cat)}
                  aria-pressed={on}
                  className={`rounded-2xl border-2 p-3 md:p-4 text-left transition ${on ? "border-[#173063] bg-[#173063] text-white shadow-lg" : "border-black/10 bg-white hover:border-[#173063]/50"}`}
                >
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${on ? "border-white bg-white text-[#173063]" : "border-black/20 text-transparent"}`}>
                    <Check size={12} strokeWidth={4} />
                  </span>
                  <span className="mt-2.5 block text-[14px] font-extrabold leading-tight">{o.label}</span>
                  <span className={`mt-1 block text-[12px] font-semibold ${on ? "text-white/70" : "text-stone-400"}`}>{o.desc}</span>
                </button>
              );
            })}
          </div>

          <p className="mt-6 flex items-baseline gap-3">
            <span className="text-sm font-extrabold text-[#173063]">02</span>
            <span className="text-[15px] font-extrabold">How many people?</span>
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2.5">
            {FAMILY_OPTS.map((o) => {
              const on = feet === o.feet;
              return (
                <button
                  key={o.label}
                  onClick={() => setFeet(on ? null : o.feet)}
                  aria-pressed={on}
                  className={`rounded-2xl border-2 p-3 md:p-4 text-left transition ${on ? "border-[#173063] bg-[#173063] text-white shadow-lg" : "border-black/10 bg-white hover:border-[#173063]/50"}`}
                >
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${on ? "border-white bg-white text-[#173063]" : "border-black/20 text-transparent"}`}>
                    <Check size={12} strokeWidth={4} />
                  </span>
                  <span className="mt-2.5 block text-[14px] font-extrabold leading-tight">{o.label}</span>
                  <span className={`mt-1 block text-[12px] font-semibold ${on ? "text-white/70" : "text-stone-400"}`}>{o.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative flex flex-col justify-center overflow-hidden border-l border-black/10 bg-[#e3e9f6] p-7 text-[#101d33] md:p-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/legacy/hero-2.png" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-[0.07]" />
          <div className="relative">
            {!rec ? (
              <>
                <span className="inline-flex items-center justify-center rounded-2xl bg-[#173063]/10 p-4 text-[#173063]">
                  <Ruler size={30} />
                </span>
                <p className="mt-5 text-2xl font-extrabold leading-tight">Your match shows up here.</p>
                <p className="mt-2 max-w-xs text-sm font-medium leading-relaxed text-black/55">Tap a space and a family size. Tap again to deselect. The install team still confirms measurements free on site visit.</p>
                <div className="mt-5 flex gap-2 text-[12px] font-bold">
                  <span className={`rounded-md px-3 py-1.5 ${cat ? "bg-[#173063] text-white" : "bg-black/10 text-black/45"}`}>{cat ?? "1 · Space?"}</span>
                  <span className={`rounded-md px-3 py-1.5 ${feet ? "bg-[#173063] text-white" : "bg-black/10 text-black/45"}`}>{feet ? `${feet} ft family` : "2 · Family?"}</span>
                </div>
              </>
            ) : (
              <>
                <p className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#173063]">Your match</p>
                <p className="mt-2 text-2xl font-extrabold leading-tight md:text-[1.7rem]">{rec.name}</p>
                <p className="mt-1.5 text-sm font-bold text-black/55">
                  {inr(rec.price)} fitted · incl. GST bill
                  <span className="ml-2 rounded-md bg-[#d9232e]/10 px-2 py-0.5 text-[12px] font-extrabold text-[#d9232e]">Save {inr(rec.mrp - rec.price)}</span>
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={rec.image} alt={rec.name} className="mt-4 h-56 w-full rounded-2xl border border-black/10 bg-white object-contain p-3 shadow-sm" />
                <p className="mt-3 flex flex-wrap gap-1.5 text-[12px] font-bold text-black/55">
                  <span className="rounded-md bg-white px-2.5 py-1">{rec.category}</span>
                  <span className="rounded-md bg-white px-2.5 py-1">{rec.feet} ft · {rec.lines} lines</span>
                  <span className="rounded-md bg-white px-2.5 py-1">304 SS · install included</span>
                </p>
                <div className="mt-4 flex gap-2">
                  <Link href={`/products/${rec.slug}`} className="btn-slide flex flex-1 items-center justify-center gap-2 rounded-full bg-[#173063] py-3.5 text-sm font-extrabold text-white">
                    View this size <ArrowRight size={15} />
                  </Link>
                  <Link href={`/products?cat=${encodeURIComponent(rec.category)}`} className="rounded-full border border-black/20 px-5 py-3.5 text-sm font-bold hover:border-black">
                    All sizes
                  </Link>
                </div>
                <button onClick={() => { setCat(null); setFeet(null); }} className="mt-2.5 w-full text-center text-[13px] font-bold text-black/45 underline underline-offset-4 hover:text-black">
                  Start over
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
