"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, BadgeCheck, Plus } from "lucide-react";
import { DEMO_VIDEO_ID, PRODUCTS, STATS, TESTIMONIALS, inr } from "@/lib/site";
import { useCart } from "@/lib/cart";
import { useT } from "@/components/LanguageSwitcher";
import Reveal from "@/components/Reveal";
import SizeQuiz from "@/components/SizeQuiz";
import BeforeAfter from "@/components/BeforeAfter";

const HERO_TABS = [
  {
    id: "terrace",
    label: "Terrace",
    img: "/legacy/hero-1.png",
    title: "Terrace pulley that eats full sun.",
    price: "6 ft · 4 lines · ₹4,136 fitted",
    href: "/products?cat=Open Terrace",
  },
  {
    id: "balcony",
    label: "Balcony",
    img: "/legacy/hero-2.png",
    title: "Ceiling pulley. Floor stays yours.",
    price: "5 ft · 4 lines · ₹3,256 fitted",
    href: "/products?cat=Ceiling Mount",
  },
  {
    id: "wall",
    label: "Wall",
    img: "/legacy/products/wall-mount/wall-mount-3-feet-4-lines.jpg",
    title: "Foldable wall. Zero footprint.",
    price: "4 ft · 4 lines · ₹2,430 fitted",
    href: "/products?cat=Wall Mount",
  },
];

const BESTSELLER_SLUGS = [
  "ceiling-mount-5ft",
  "open-terrace-6ft",
  "wall-mount-4ft-4lines",
  "open-terrace-5ft",
  "ceiling-mount-6ft",
  "wall-mount-3ft-4lines",
  "open-terrace-4ft",
  "ceiling-mount-4ft",
  "wall-mount-5ft-4lines",
  "open-terrace-7ft",
];

function QuickAdd({ slug }: { slug: string }) {
  const [added, setAdded] = useState(false);
  let add: (s: string) => void = () => {};
  try {
    add = useCart().add;
  } catch { /* noop */ }
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        add(slug);
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
      }}
      className={`rounded-full px-5 py-2.5 text-[13px] font-extrabold transition ${added ? "bg-green-700 text-white" : "bg-white text-black hover:bg-[#e8b62a]"}`}
    >
      {added ? "Added ✓" : "+ Quick add"}
    </button>
  );
}

export default function Home() {
  const t = useT();
  const [tab, setTab] = useState(HERO_TABS[0]);
  const railRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* CINEMATIC FULL-BLEED HERO */}
      <section className="relative overflow-hidden bg-[#051e1d] text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={tab.id} src={tab.img} alt={tab.title} className="slow-zoom absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#051e1d] via-[#051e1d]/72 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#051e1d] to-transparent" />

        <div className="relative mx-auto grid max-w-[1440px] gap-10 px-4 pb-14 pt-12 md:px-8 md:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24">
          <div>
            <p className="rise rise-1 flex items-center gap-3 text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#e8b62a]">
              <span className="inline-block h-[2px] w-8 bg-[#e8b62a]" /> {t("hero_eb")} · Pune
            </p>
            <h1 className="rise rise-2 mega-type mt-5 text-[clamp(3rem,7.5vw,6.8rem)]">
              Dry smart.<br />Live large<span className="text-[#e8b62a]">.</span>
            </h1>
            <p className="rise rise-3 mt-5 max-w-xl text-[15px] leading-relaxed text-white/75 md:text-lg">
              {t("hero_sub")} Lower to chest height, load 20 kg, raise to ceiling sun. Fitted in 60–90 minutes. Pay after.
            </p>

            {/* interactive space tabs */}
            <div className="rise rise-3 mt-7 flex flex-wrap gap-7 border-b border-white/15">
              {HERO_TABS.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setTab(h)}
                  className={`relative pb-3 text-sm font-extrabold uppercase tracking-[0.14em] transition ${tab.id === h.id ? "text-white" : "text-white/45 hover:text-white/80"}`}
                >
                  {h.label}
                  {tab.id === h.id && <span className="absolute inset-x-0 -bottom-px h-[3px] bg-[#e8b62a]" />}
                </button>
              ))}
            </div>
            <div className="rise rise-4 mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href={tab.href} className="btn-slide inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-extrabold text-black transition hover:bg-[#e8b62a]">
                Shop {tab.label} systems <ArrowRight size={16} />
              </Link>
              <span className="text-sm font-bold text-white/70">{tab.price}</span>
            </div>

            <div className="rise rise-5 mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-5 text-[13px] font-bold text-white/80">
              <span>★★★★★ <strong className="text-white">4.8</strong> · 80k reviews</span>
              <span>✓ 1,00,000+ Pune fittings</span>
              <span>✓ 304 SS · 1-yr service</span>
            </div>
          </div>

          {/* glass configurator card */}
          <div className="rise rise-4 self-end">
            <div className="glass-dark rounded-[1.75rem] p-6 text-white md:p-7">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#e8b62a]">{tab.label} · live pick</p>
              <p className="mt-2 text-2xl font-extrabold leading-tight">{tab.title}</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[["304", "SS pipes"], ["20kg", "per lift"], ["90min", "fitting"]].map(([a, b]) => (
                  <div key={b} className="rounded-2xl bg-white/10 p-3">
                    <p className="text-lg font-extrabold">{a}</p>
                    <p className="text-[11px] font-bold text-white/60">{b}</p>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="mt-5 block rounded-full bg-[#e8b62a] py-3.5 text-center text-sm font-extrabold text-black hover:brightness-95">
                Get free site visit →
              </Link>
              <p className="mt-2 text-center text-[12px] text-white/55">No advance · GST bill · Same-week slot</p>
            </div>
          </div>
        </div>

        {/* stats bar */}
        <div className="relative border-t border-white/10 bg-black/25 backdrop-blur">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-4 px-4 py-5 md:grid-cols-4 md:px-8">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2.5">
                <span className="text-2xl font-extrabold md:text-3xl">{s.value}</span>
                <span className="text-[12px] font-bold uppercase tracking-wider text-white/55">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEMS BENTO */}
      <section className="mx-auto max-w-[1440px] px-4 pt-12 md:px-8 md:pt-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Systems</p>
              <h2 className="mega-type mt-3 text-[clamp(2.2rem,4.5vw,4rem)]">One system.<br />Every home.</h2>
            </div>
            <Link href="/products" className="btn-slide inline-flex items-center gap-1.5 pb-1 text-[15px] font-extrabold text-[#0b3b39]">Compare all 24 systems <ArrowRight size={16} /></Link>
          </div>
        </Reveal>
        <div className="mt-7 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Link href="/products?cat=Ceiling Mount" className="group relative block h-full min-h-[440px] overflow-hidden rounded-[1.75rem] lg:min-h-[580px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/legacy/hero-1.png" alt="Ceiling pulley drying system in a bright balcony" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5" />
              <span className="absolute left-6 top-6 rounded-md bg-[#e8b62a] px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-black">Bestseller</span>
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white md:p-8">
                <span>
                  <span className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-white/70">Balconies + passages</span>
                  <span className="mt-1.5 block text-3xl font-extrabold tracking-tight md:text-4xl">Ceiling pulley</span>
                  <span className="mt-1.5 block text-sm font-semibold text-white/75">Zero floor space · 4–9 ft · from ₹3,168 fitted</span>
                </span>
                <span className="flex shrink-0 items-center justify-center rounded-full bg-white p-4 text-black transition group-hover:bg-[#e8b62a]"><ArrowRight size={20} /></span>
              </span>
            </Link>
          </Reveal>
          <div className="grid gap-4 lg:col-span-5">
            <Reveal delay={80}>
              <Link href="/products?cat=Open Terrace" className="group relative block min-h-[270px] overflow-hidden rounded-[1.75rem] lg:min-h-[282px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/legacy/hero-3.png" alt="Open terrace pulley drying system in full sun" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6 text-white">
                  <span>
                    <span className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-white/70">Full sun · 4–9 ft</span>
                    <span className="mt-1 block text-2xl font-extrabold tracking-tight">Terrace pulley</span>
                    <span className="mt-0.5 block text-sm font-semibold text-white/75">from ₹3,960 fitted</span>
                  </span>
                  <span className="flex shrink-0 items-center justify-center rounded-full bg-white/15 p-3 backdrop-blur transition group-hover:bg-[#e8b62a] group-hover:text-black"><ArrowRight size={17} /></span>
                </span>
              </Link>
            </Reveal>
            <Reveal delay={140}>
              <Link href="/products?cat=Wall Mount" className="group relative block min-h-[270px] overflow-hidden rounded-[1.75rem] lg:min-h-[282px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/legacy/product-wall.png" alt="Foldable wall mounted drying system" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6 text-white">
                  <span>
                    <span className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-white/70">304 SS · folds flat</span>
                    <span className="mt-1 block text-2xl font-extrabold tracking-tight">Foldable wall</span>
                    <span className="mt-0.5 block text-sm font-semibold text-white/75">from ₹2,070 fitted</span>
                  </span>
                  <span className="flex shrink-0 items-center justify-center rounded-full bg-white/15 p-3 backdrop-blur transition group-hover:bg-[#e8b62a] group-hover:text-black"><ArrowRight size={17} /></span>
                </span>
              </Link>
            </Reveal>
          </div>
          <Reveal delay={100} className="lg:col-span-12">
            <div className="relative overflow-hidden rounded-[1.75rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/legacy/hero-2.png" alt="Pune homes with Excellent Dry fittings" className="absolute inset-0 h-full w-full object-cover" />
              <span className="absolute inset-0 bg-[#072928]/88" />
              <span className="relative flex flex-col justify-between gap-5 p-7 text-white md:flex-row md:items-center md:p-9">
                <span>
                  <span className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#e8b62a]">Pulley physics</span>
                  <span className="mt-2 block max-w-xl text-2xl font-extrabold leading-tight tracking-tight md:text-[1.7rem]">Hot air lives at the ceiling. We lift clothes straight to it.</span>
                </span>
                <Link href="/gallery" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-black transition hover:bg-[#e8b62a]">See 1,00,000+ fittings <ArrowUpRight size={15} /></Link>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* QUIZ */}
      <section className="mx-auto max-w-[1440px] px-4 pt-12 md:px-8 md:pt-20">
        <Reveal><SizeQuiz /></Reveal>
      </section>

      {/* BEFORE / AFTER */}
      <section className="mx-auto max-w-[1440px] px-4 pt-12 md:px-8 md:pt-20">
        <Reveal>
          <p className="eyebrow">Drag it · before / after</p>
          <h2 className="mega-type mt-3 text-[clamp(2.2rem,4.5vw,3.8rem)]">Ropes steal rooms.<br />Pulleys return them.</h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-6"><BeforeAfter /></div>
        </Reveal>
      </section>

      {/* HOTSPOT SHOWCASE — full-bleed dark */}
      <section className="mt-12 bg-[#051e1d] py-14 text-white md:mt-20 md:py-20">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 md:px-8 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow !text-[#e8b62a]">Anatomy of a lift</p>
            <h2 className="mega-type mt-3 text-[clamp(2.2rem,4vw,3.6rem)]">Steel where it matters. Serviceable everywhere.</h2>
            <ul className="mt-6 space-y-4 text-[15px]">
              {[
                ["Sealed pulleys", "Glide with one finger. No squeak, no jam. Replaceable in minutes."],
                ["304 SS pipes", "Won't rust, stain or sag. Spaced for 2× airflow vs ropes."],
                ["UV nylon rope", "Sun-proof, knot-proof. Re-roping costs little, lasts years."],
              ].map(([h, s], i) => (
                <li key={h} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8b62a] text-sm font-extrabold text-black">{i + 1}</span>
                  <span><strong className="block">{h}</strong><span className="text-white/65">{s}</span></span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/legacy/product-wall.png" alt="Excellent Dry system close-up" className="aspect-[4/4.5] w-full object-cover" />
              {[
                { t: "Sealed pulley", s: "top-6 left-8" },
                { t: "304 SS · 20 kg", s: "top-1/2 right-6" },
                { t: "UV rope", s: "bottom-8 left-10" },
              ].map((h) => (
                <span key={h.t} className={`absolute ${h.s}`}>
                  <span className="hotspot relative flex h-4 w-4 items-center justify-center rounded-full bg-[#e8b62a]"><span className="relative h-1.5 w-1.5 rounded-full bg-black" /></span>
                  <span className="mt-2 block whitespace-nowrap rounded-md bg-black/70 px-3 py-1.5 text-[12px] font-extrabold text-white backdrop-blur">{h.t}</span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* BESTSELLERS — side-arrow rail */}
      <section className="overflow-hidden py-14 md:py-20">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-end justify-between gap-4 px-4 md:px-8">
          <div>
            <p className="eyebrow">Most fitted in Pune</p>
            <h2 className="mega-type mt-3 text-[clamp(2.2rem,4.5vw,3.8rem)]">Bestsellers<span className="text-[#0b3b39]">.</span></h2>
          </div>
          <Link href="/products" className="btn-slide inline-flex items-center gap-1.5 pb-1 text-[15px] font-extrabold text-[#0b3b39]">View all systems <ArrowRight size={16} /></Link>
        </div>
        <div className="relative mt-7">
          <div ref={railRef} className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 md:px-8" style={{ paddingLeft: "max(1rem, calc((100vw - 1440px)/2 + 2rem))", paddingRight: "max(1rem, calc((100vw - 1440px)/2 + 5rem))" }}>
            {BESTSELLER_SLUGS.map((slug, i) => {
              const p = PRODUCTS.find((x) => x.slug === slug)!;
              if (!p) return null;
              return (
                <Link key={p.slug} href={`/products/${p.slug}`} className="group relative w-[290px] shrink-0 snap-start overflow-hidden rounded-[1.5rem] border border-black/10 bg-white shadow-[0_18px_45px_-25px_rgb(7_41_40/0.45)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-25px_rgb(7_41_40/0.5)] md:w-[330px]">
                  <span className="mega-type pointer-events-none absolute left-4 top-2 z-10 text-5xl text-black/[0.08]">0{i + 1}</span>
                  {i === 0 && <span className="absolute right-4 top-4 z-10 rounded-md bg-[#e8b62a] px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-black">No. 1 in Pune</span>}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.name} className="aspect-[4/3] w-full bg-[#f1efe7] object-cover transition duration-500 group-hover:scale-[1.04]" loading="lazy" />
                  <span className="block bg-[#072928] p-5 text-white">
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#e8b62a]">{p.category} · {p.size} · {p.lines} lines</span>
                    <span className="mt-1 line-clamp-2 block min-h-11 text-[15px] font-extrabold leading-snug">{p.name}</span>
                    <span className="mt-1 block text-[12px] font-bold text-white/50">★★★★★ 4.8 · fitted + GST bill</span>
                    <span className="mt-3 flex items-center justify-between gap-2 border-t border-white/10 pt-3">
                      <span className="text-lg font-extrabold">{inr(p.price)} <span className="block text-[12px] font-semibold text-white/45 line-through">{inr(p.mrp)}</span></span>
                      <QuickAdd slug={p.slug} />
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
          <button onClick={() => railRef.current?.scrollBy({ left: -360, behavior: "smooth" })} aria-label="Previous bestsellers" className="absolute left-2 top-[38%] z-10 hidden h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-xl shadow-2xl transition hover:bg-[#e8b62a] md:flex">←</button>
          <button onClick={() => railRef.current?.scrollBy({ left: 360, behavior: "smooth" })} aria-label="Next bestsellers" className="absolute right-2 top-[38%] z-10 hidden h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-xl shadow-2xl transition hover:bg-[#e8b62a] md:flex">→</button>
        </div>
      </section>

      {/* STICKY STORY */}
      <section className="mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="overflow-hidden rounded-[2rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/legacy/hero-2.png" alt="Fitted system" className="aspect-[4/4.6] w-full object-cover" />
            </div>
          </div>
          <div className="flex flex-col justify-center py-4">
            <p className="eyebrow">Fitting day</p>
            <h2 className="mega-type mt-3 text-[clamp(2.2rem,4vw,3.6rem)]">In by lunch.<br />Dry by evening.</h2>
            {[
              ["09:30: Measure", "We laser-check ceiling strength + sun angle. You approve the exact spot."],
              ["10:15: Anchor", "Chemical anchors + SS brackets. Vacuum cleanup, no dust on laundry."],
              ["11:00: Lift test", "20 kg load test, pulley tuning, demo in your language. Pay after."],
            ].map(([h, s], i) => (
              <Reveal key={h} delay={i * 80}>
                <div className="mt-5 flex gap-4 rounded-3xl border border-black/10 bg-white p-6">
                  <span className="text-3xl font-extrabold text-black/15">0{i + 1}</span>
                  <span><strong className="block text-lg">{h}</strong><span className="text-sm text-stone-500">{s}</span></span>
                </div>
              </Reveal>
            ))}
            <Link href="/contact" className="btn-slide mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white">Book my slot <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* VIDEO — full width */}
      <section className="mx-auto max-w-[1440px] px-4 pt-14 md:px-8 md:pt-20">
        <div className="overflow-hidden rounded-[2rem] bg-black">
          <div className="aspect-video w-full">
            <iframe src={`https://www.youtube-nocookie.com/embed/${DEMO_VIDEO_ID}?rel=0`} title="Fitting demo" loading="lazy" allowFullScreen className="h-full w-full" />
          </div>
        </div>
      </section>

      {/* REVIEWS WALL */}
      <section className="mx-auto max-w-[1440px] px-4 pt-14 md:px-8 md:pt-20">
        <h2 className="mega-type text-[clamp(2.2rem,4.5vw,3.8rem)]">Loved in 1,00,000+<br />Pune homes.</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((r, i) => (
            <Reveal key={r.name} delay={i * 80}>
              <figure className={`rounded-[1.75rem] p-7 ${i === 0 ? "bg-[#0b3b39] text-white" : "border border-black/10 bg-white"}`}>
                <p className="flex text-[#e8b62a]">{"★★★★★"}</p>
                <blockquote className={`mt-3 text-[17px] font-bold leading-snug ${i === 0 ? "" : "text-black/80"}`}>“{r.text}”</blockquote>
                <figcaption className={`mt-4 text-sm font-bold ${i === 0 ? "text-white/70" : "text-stone-500"}`}>{r.name} · {r.area}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 grid gap-4 rounded-[1.75rem] border border-black/10 bg-[#f7f5ef] p-7 md:grid-cols-3 md:p-8">
          {[["No advance", "Pay UPI/cash after fitting + demo."], ["GST bill", "E-bill on WhatsApp same day."], ["1-yr service", "Rope + pulley tune, one call away."]].map(([h, s]) => (
            <p key={h} className="flex items-start gap-2.5 text-sm"><BadgeCheck size={18} className="mt-0.5 shrink-0 text-[#0b3b39]" /><span><strong>{h}.</strong> <span className="text-stone-500">{s}</span></span></p>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[900px] px-4 pt-14 md:pt-20">
        <h2 className="mega-type text-center text-[clamp(2rem,4vw,3.2rem)]">Asked on every visit.</h2>
        <div className="mt-7 space-y-3">
          {[
            ["Will it hold heavy bedsheets + jeans?", "Yes, 15–20 kg spread across 4 lines. We load-test on fitting day and show you the sweet spot for heavy loads."],
            ["My ceiling is POP / false ceiling. Still possible?", "Usually yes. We anchor into the RCC slab above with longer rods, or shift to wall-mount. The free visit confirms in 10 minutes."],
            ["What if rope wears out?", "Rope is a ₹300–500 consumable. We re-rope at your door, and pulleys are individually replaceable. No need to buy a new system."],
            ["How is this better than a ₹2,000 online stand?", "Stands rust, wobble and eat 8–10 sq ft. Ours frees the floor, dries faster in ceiling heat, and includes fitting + service. Cost-per-year is lower."],
          ].map(([q, a]) => (
            <details key={q} className="faq group rounded-2xl border border-black/10 bg-white p-5">
              <summary className="flex items-center justify-between gap-4 font-extrabold">
                {q}
                <span className="faq-plus flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white"><Plus size={15} /></span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">{a}</p>
            </details>
          ))}
        </div>
        <div className="mt-10 rounded-[2rem] bg-black p-8 text-center text-white md:p-12">
          <p className="mega-type text-[clamp(1.8rem,4vw,3rem)]">Get exact price for your balcony.</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/60">Send 2 photos on WhatsApp. Price + slot in minutes, 10am–6pm.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="rounded-full bg-[#e8b62a] px-8 py-4 text-sm font-extrabold text-black">Free site visit →</Link>
            <Link href="/products" className="rounded-full border border-white/25 px-8 py-4 text-sm font-bold hover:bg-white/10">Browse systems</Link>
          </div>
        </div>
      </section>
    </>
  );
}
