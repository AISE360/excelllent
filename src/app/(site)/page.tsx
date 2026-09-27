"use client";

import Link from "next/link";
import { ArrowRight, Home as HomeIcon, ShieldCheck, Star, Wrench } from "lucide-react";
import { inr, PRODUCTS, TESTIMONIALS } from "@/lib/site";
import { type Key } from "@/lib/strings";
import { useT } from "@/components/LanguageSwitcher";
import Reveal from "@/components/Reveal";

export default function Home() {
  const t = useT();
  const CATS: { t: Key; s: Key; img: string; href: string }[] = [
    { t: "cat_open", s: "cat_open_s", img: "/legacy/products/open-terrace/open-terrace-fitting-6-feet-4-lines.jpg", href: "/products?cat=Open Terrace" },
    { t: "cat_ceil", s: "cat_ceil_s", img: "/legacy/products/ceiling-mount/ceiling-mount-fitting-5-feet-4-lines.jpg", href: "/products?cat=Ceiling Mount" },
    { t: "cat_wall", s: "cat_wall_s", img: "/legacy/products/wall-mount/wall-mount-3-feet-4-lines.jpg", href: "/products?cat=Wall Mount" },
    { t: "cat_all", s: "cat_all_s", img: "/legacy/hero-2.png", href: "/products" },
  ];
  const BADGES = [
    { icon: <Star size={20} />, t: t("b1t"), s: t("b1s") },
    { icon: <HomeIcon size={20} />, t: t("b2t"), s: t("b2s") },
    { icon: <Wrench size={20} />, t: t("b3t"), s: t("b3s") },
    { icon: <ShieldCheck size={20} />, t: t("b4t"), s: t("b4s") },
  ];

  return (
    <>
      {/* HERO — full-bleed photo + cyan panel */}
      <section className="relative overflow-hidden bg-ink text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/legacy/hero-1.png"
          alt="Excellent Dry balcony drying system"
          className="slow-zoom absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan via-brand-cyan/85 to-brand-cyan/10" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="max-w-xl">
            <p className="rise rise-1 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-yellow">
              <span className="inline-block h-[3px] w-8 bg-brand-yellow" /> {t("hero_eb")}
            </p>
            <h1 className="rise rise-2 font-display mt-3 text-6xl font-bold leading-[0.92] md:text-8xl">
              {t("hero_l1")}<br />
              <span className="text-brand-yellow">{t("hero_l2")}</span>
            </h1>
            <p className="rise rise-3 mt-4 max-w-md text-[14px] leading-relaxed text-white/90 md:text-[15px]">
              {t("hero_sub")}
            </p>
            <Link
              href="/products"
              className="rise rise-3 mt-6 inline-flex items-center gap-2 rounded-md bg-brand-yellow px-6 py-3 text-sm font-bold text-ink transition hover:brightness-95"
            >
              {t("hero_cta")} <ArrowRight size={16} />
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
              <img src={c.img} alt={t(c.t)} className="h-56 w-full object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white">
                <span>
                  <span className="block text-[17px] font-bold leading-tight">{t(c.t)}</span>
                  <span className="block text-[12px] text-white/80">{t(c.s)}</span>
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
                <span className="inline-block h-[3px] w-8 bg-brand-yellow" /> {t("pop_eb")}
              </p>
              <h2 className="font-display mt-1 text-5xl font-bold md:text-6xl">{t("best")}</h2>
            </div>
            <Link href="/products" className="hidden items-center gap-1 text-sm font-semibold hover:text-brand-red sm:inline-flex">
              {t("view_all")} <ArrowRight size={15} />
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
          <h2 className="font-display text-5xl font-bold md:text-6xl">{t("insp_t")}</h2>
        </Reveal>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            { k: "insp1" as Key, img: "/legacy/hero-2.png", href: "/products" },
            { k: "insp2" as Key, img: "/legacy/hero-3.png", href: "/products?cat=Ceiling Mount" },
            { k: "insp3" as Key, img: "/legacy/products/wall-mount/wall-mount-3-feet-3-lines.jpg", href: "/products?cat=Wall Mount" },
          ].map((c, i) => (
            <Reveal key={c.k} delay={i * 90}>
              <Link href={c.href} className="group block">
                <span className="block overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={t(c.k)} className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105" />
                </span>
                <span className="mt-2 block text-[14px] font-semibold">{t(c.k)}</span>
                <span className="text-[13px] text-stone-500">{t("get_insp")} ＞</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* moment banner */}
      <section className="mx-auto grid max-w-6xl px-4 pt-10 md:grid-cols-2">
        <Reveal className="flex items-center bg-[#dfe9e4] p-10">
          <h2 className="font-display text-5xl font-bold leading-[0.95] md:text-6xl">{t("moment_l1")}<br />{t("moment_l2")}</h2>
        </Reveal>
        <Reveal delay={120}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/legacy/hero-3.png" alt="Easy home drying" className="h-full w-full object-cover" />
        </Reveal>
      </section>

      {/* reviews + CTA */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <Reveal>
          <h2 className="font-display text-5xl font-bold md:text-6xl">{t("rated_t")}</h2>
        </Reveal>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((item, i) => (
            <Reveal key={item.name} delay={i * 90}>
              <figure className="lift h-full border border-stone-200 bg-white p-5">
                <p className="text-sm text-amber-500">★★★★★</p>
                <blockquote className="mt-2 text-sm leading-relaxed text-stone-600">“{item.text}”</blockquote>
                <figcaption className="mt-3 text-sm font-semibold">{item.name} <span className="font-normal text-stone-400">· {item.area}</span></figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-8 bg-ink p-8 text-center text-white md:p-10">
            <p className="font-display text-4xl font-bold md:text-5xl">{t("cta_t")}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="rounded-md bg-brand-yellow px-6 py-3 text-sm font-bold text-ink transition hover:brightness-95">
                {t("cta_quote")} →
              </Link>
              <Link href="/cart" className="rounded-md border border-white/40 px-6 py-3 text-sm font-bold transition hover:bg-white/10">
                {t("cta_cart")}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
