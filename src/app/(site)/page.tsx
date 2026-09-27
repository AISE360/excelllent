import Link from "next/link";
import { ArrowRight, Home as HomeIcon, ShieldCheck, Star, Wrench } from "lucide-react";
import { inr, PRODUCTS, TESTIMONIALS } from "@/lib/site";
import Reveal from "@/components/Reveal";

const CATS = [
  { t: "Open Terrace", s: "Pulley Systems for Open Spaces", img: "/legacy/products/open-terrace/open-terrace-fitting-6-feet-4-lines.jpg", href: "/products?cat=Open Terrace" },
  { t: "Ceiling Mount", s: "Space-Saving Ceiling Systems", img: "/legacy/products/ceiling-mount/ceiling-mount-fitting-5-feet-4-lines.jpg", href: "/products?cat=Ceiling Mount" },
  { t: "Wall Mount", s: "Strong and Foldable Wall Stands", img: "/legacy/products/wall-mount/wall-mount-3-feet-4-lines.jpg", href: "/products?cat=Wall Mount" },
  { t: "All Systems", s: "Explore Complete Range", img: "/legacy/hero-2.png", href: "/products" },
];

const BADGES = [
  { icon: <Star size={20} />, t: "304-Grade", s: "Stainless Steel" },
  { icon: <HomeIcon size={20} />, t: "Space Saving", s: "Design" },
  { icon: <Wrench size={20} />, t: "Free Installation", s: "in Pune" },
  { icon: <ShieldCheck size={20} />, t: "1 Year", s: "Warranty" },
];

export default function Home() {
  return (
    <>
      {/* HERO — full-bleed photo + cyan panel */}
      <section className="relative overflow-hidden bg-ink text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/legacy/hero-1.png"
          alt="Woman hanging clothes on an Excellent Dry balcony system"
          className="slow-zoom absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan via-brand-cyan/85 to-brand-cyan/10" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="max-w-xl">
            <p className="rise rise-1 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-yellow">
              <span className="inline-block h-[3px] w-8 bg-brand-yellow" /> India&apos;s trusted drying solutions
            </p>
            <h1 className="rise rise-2 font-display mt-3 text-6xl font-bold leading-[0.92] md:text-8xl">
              Dry smart.<br />
              <span className="text-brand-yellow">Save space.</span>
            </h1>
            <p className="rise rise-3 mt-4 max-w-md text-[14px] leading-relaxed text-white/90 md:text-[15px]">
              Pulley-operated terrace and ceiling systems and foldable wall stands:
              304-grade steel, installed across Pune in days. 1,00,000+ happy homes.
            </p>
            <Link
              href="/products"
              className="rise rise-3 mt-6 inline-flex items-center gap-2 rounded-md bg-brand-yellow px-6 py-3 text-sm font-bold text-ink transition hover:brightness-95"
            >
              View the collection <ArrowRight size={16} />
            </Link>
            <div className="rise rise-4 mt-8 grid max-w-lg grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
              {BADGES.map((b) => (
                <div key={b.t} className="flex items-center gap-2">
                  <span className="text-brand-yellow">{b.icon}</span>
                  <span className="text-[11px] font-semibold leading-tight">{b.t}<br />{b.s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* category cards */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-3 px-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
        {CATS.map((c, i) => (
          <Reveal key={c.t} delay={i * 90}>
            <Link href={c.href} className="lift group relative block overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt={c.t} className="h-56 w-full object-cover transition duration-700 group-hover:scale-108" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white">
                <span>
                  <span className="block text-[17px] font-bold leading-tight">{c.t}</span>
                  <span className="block text-[12px] text-white/80">{c.s}</span>
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-ink transition group-hover:bg-brand-yellow">
                  <ArrowRight size={17} />
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </section>

      {/* bestsellers */}
      <section className="mx-auto max-w-6xl px-4 pt-10">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-yellow">
                <span className="inline-block h-[3px] w-8 bg-brand-yellow" /> Our popular products
              </p>
              <h2 className="font-display mt-1 text-5xl font-bold md:text-6xl">Bestsellers.</h2>
            </div>
            <Link href="/products" className="hidden items-center gap-1 text-sm font-semibold hover:text-brand-red sm:inline-flex">
              View all products <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
        <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {PRODUCTS.slice(0, 4).map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <Link href={`/products/${p.slug}`} className="lift group block border border-stone-200 bg-white">
                <div className="relative bg-card p-5">
                  <span className="absolute left-2 top-2 rounded bg-brand-yellow px-1.5 py-0.5 text-[11px] font-bold">New</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.name} loading="lazy" className="mx-auto aspect-square object-contain transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-3">
                  <p className="text-[14px] font-semibold leading-snug">{p.name}</p>
                  <p className="mt-1 text-[13px] text-stone-500">{inr(p.price)} <span className="line-through">{inr(p.mrp)}</span></p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* get inspired */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <Reveal>
          <h2 className="font-display text-5xl font-bold md:text-6xl">Get inspired.</h2>
        </Reveal>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            { t: "How do you choose the right drying system?", img: "/legacy/hero-2.png", href: "/products" },
            { t: "How do you free up your balcony?", img: "/legacy/hero-3.png", href: "/products?cat=Ceiling Mount" },
            { t: "Drying tools you cannot live without", img: "/legacy/products/wall-mount/wall-mount-3-feet-3-lines.jpg", href: "/products?cat=Wall Mount" },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 90}>
              <Link href={c.href} className="group block">
                <span className="block overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={c.t} className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105" />
                </span>
                <span className="mt-2 block text-[14px] font-semibold">{c.t}</span>
                <span className="text-[13px] text-stone-500">Get inspired ＞</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* moment banner */}
      <section className="mx-auto grid max-w-6xl px-4 pt-10 md:grid-cols-2">
        <Reveal className="flex items-center bg-[#dfe9e4] p-10">
          <h2 className="font-display text-5xl font-bold leading-[0.95] md:text-6xl">Take your<br />moment.</h2>
        </Reveal>
        <Reveal delay={120}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/legacy/hero-3.png" alt="Easy home drying" className="h-full w-full object-cover" />
        </Reveal>
      </section>

      {/* reviews + CTA */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <Reveal>
          <h2 className="font-display text-5xl font-bold md:text-6xl">Rated 4.8/5.</h2>
        </Reveal>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="lift h-full border border-stone-200 bg-white p-5">
                <p className="text-sm text-amber-500">★★★★★</p>
                <blockquote className="mt-2 text-sm leading-relaxed text-stone-600">“{t.text}”</blockquote>
                <figcaption className="mt-3 text-sm font-semibold">{t.name} <span className="font-normal text-stone-400">· {t.area}</span></figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-8 bg-ink p-8 text-center text-white md:p-10">
            <p className="font-display text-4xl font-bold md:text-5xl">Free site visit across Pune.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="rounded-md bg-brand-yellow px-6 py-3 text-sm font-bold text-ink transition hover:brightness-95">
                Get a free quote →
              </Link>
              <Link href="/cart" className="rounded-md border border-white/40 px-6 py-3 text-sm font-bold transition hover:bg-white/10">
                View cart
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
