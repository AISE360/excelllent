"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Home as HomeIcon, ShieldCheck, Star, Wrench } from "lucide-react";
import { useRef } from "react";
import { inr, DEMO_VIDEO_ID, PRODUCTS, TESTIMONIALS } from "@/lib/site";
import { type Key } from "@/lib/strings";
import { useT } from "@/components/LanguageSwitcher";
import Reveal from "@/components/Reveal";
import DeliveryTicker from "@/components/DeliveryTicker";
import WishHeart from "@/components/WishHeart";

function Eyebrow({ no, children }: { no: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.28em] text-brand-cyan-deep">
      <span className="inline-block h-[3px] w-10 bg-brand-yellow" />
      <span className="text-stone-400">{no}</span> {children}
    </p>
  );
}

export default function Home() {
  const t = useT();
  const CATS: { t: Key; s: Key; img: string; href: string }[] = [
    { t: "cat_open", s: "cat_open_s", img: "/legacy/products/open-terrace/open-terrace-fitting-6-feet-4-lines.jpg", href: "/products?cat=Open Terrace" },
    { t: "cat_ceil", s: "cat_ceil_s", img: "/legacy/products/ceiling-mount/ceiling-mount-fitting-5-feet-4-lines.jpg", href: "/products?cat=Ceiling Mount" },
    { t: "cat_wall", s: "cat_wall_s", img: "/legacy/products/wall-mount/wall-mount-3-feet-4-lines.jpg", href: "/products?cat=Wall Mount" },
    { t: "cat_all", s: "cat_all_s", img: "/legacy/hero-2.png", href: "/products" },
  ];
  const railRef = useRef<HTMLDivElement>(null);
  function rail(dir: number) {
    railRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  }
  const TAGS = ["tag_best", "tag_fav", "tag_best", "tag_fav", "tag_best", "tag_fav", "tag_best", "tag_fav"] as const;
  const BADGES = [
    { icon: <Star size={18} />, t: t("b1t"), s: t("b1s") },
    { icon: <HomeIcon size={18} />, t: t("b2t"), s: t("b2s") },
    { icon: <Wrench size={18} />, t: t("b3t"), s: t("b3s") },
    { icon: <ShieldCheck size={18} />, t: t("b4t"), s: t("b4s") },
  ];

  return (
    <>
      {/* SKANVI-STYLE SPLIT HERO */}
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <section className="grain grid overflow-hidden rounded-[2rem] border border-ink/10 bg-stone-100 md:grid-cols-2">
          <div className="relative z-[2] flex flex-col justify-center p-8 md:p-12">
            <p className="rise rise-1 text-[11px] font-bold uppercase tracking-[0.24em] text-pine">
              {t("hero_eb")}
            </p>
            <h1 className="rise rise-2 font-serifed mt-3 leading-[1.04]" style={{ fontSize: "clamp(2.6rem, 5vw, 4.5rem)" }}>
              {t("hero_l1")} {t("hero_l2")}
            </h1>
            <p className="rise rise-3 mt-4 max-w-md text-[14px] leading-relaxed text-stone-600">
              {t("hero_sub")}
            </p>
            <div className="rise rise-3 mt-6">
              <Link
                href="/products"
                className="btn-slide inline-flex items-center gap-2 rounded-full bg-pine px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-pine-deep"
              >
                {t("hero_cta")} <ArrowRight size={16} />
              </Link>
            </div>
            <div className="rise rise-4 mt-7 flex max-w-md flex-wrap gap-x-5 gap-y-2 border-t border-ink/10 pt-4">
              {BADGES.map((b) => (
                <span key={b.t} className="flex items-center gap-1.5 text-ink/80">
                  <span className="text-pine">{b.icon}</span>
                  <span className="text-[12px] font-semibold">{b.t} {b.s}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="relative grid min-h-80 grid-cols-[1fr_110px] gap-3 p-4 md:p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/legacy/hero-1.png"
              alt="Excellent Dry balcony drying system"
              className="slow-zoom h-full min-h-72 w-full rounded-3xl object-cover md:min-h-[430px]"
            />
            <div className="hidden flex-col gap-3 sm:flex">
              {[
                { img: "/legacy/products/ceiling-mount/ceiling-mount-fitting-5-feet-4-lines.jpg", label: "Ceiling" },
                { img: "/legacy/products/wall-mount/wall-mount-3-feet-4-lines.jpg", label: "Wall" },
                { img: "/legacy/products/open-terrace/open-terrace-fitting-6-feet-4-lines.jpg", label: "Terrace" },
              ].map((m) => (
                <div key={m.label} className="relative flex-1 overflow-hidden rounded-2xl bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.img} alt={m.label} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  <span className="absolute bottom-1.5 left-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold">{m.label}</span>
                </div>
              ))}
            </div>
            <div className="floaty absolute right-8 top-8 z-[2] rounded-2xl border border-ink/10 bg-white/85 px-4 py-3 text-center shadow-lg backdrop-blur">
              <p className="font-serifed text-3xl">4.8</p>
              <p className="text-amber-500">★★★★★</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-wider text-stone-500">{t("rated_t")}</p>
            </div>
          </div>
        </section>
      </div>

      <DeliveryTicker />

      {/* editorial statement */}
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 pt-14 md:grid-cols-2 md:pt-20">
        <Reveal>
          <div className="overflow-hidden rounded-t-[10rem] rounded-b-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/legacy/hero-2.png" alt="Excellent Dry systems" className="aspect-[4/5] w-full object-cover transition duration-700 hover:scale-105" />
          </div>
        </Reveal>
        <Reveal delay={140}>
          <p className="font-display leading-[0.92] tracking-tight" style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}>
            {t("ed_t")}
          </p>
          <p className="mt-5 max-w-md text-[14px] leading-relaxed text-stone-500">
            {t("ed_s")}
          </p>
          <Link href="/about" className="btn-slide mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-white transition hover:bg-brand-cyan-deep">
            {t("foot_about")} <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>

      {/* categories */}
      <section className="mx-auto max-w-6xl px-4 pt-12 md:pt-16">
        <div className="mt-2 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATS.map((c, i) => (
            <Reveal key={c.t} delay={i * 80}>
              <Link href={c.href} className="group block text-center">
                <span className="block overflow-hidden rounded-[1.75rem] bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={t(c.t)} className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105" />
                </span>
                <span className="font-serifed mt-3 block text-xl">{t(c.t)}</span>
                <span className="mt-0.5 block text-[12px] text-stone-500">{t(c.s)}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* featured */}
      <section className="mt-12 border-y border-ink/10 bg-white py-14 md:mt-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-stone-500">{t("pop_eb")}</p>
                <h2 className="font-serifed mt-1 text-ink" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>{t("best")}</h2>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/products" className="btn-slide mr-1 hidden items-center gap-1.5 text-sm font-bold text-ink sm:inline-flex">
                  {t("view_all")} <ArrowRight size={15} />
                </Link>
                <button onClick={() => rail(-1)} aria-label="Previous" className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 transition hover:bg-ink hover:text-white">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={() => rail(1)} aria-label="Next" className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 transition hover:bg-ink hover:text-white">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div ref={railRef} className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {PRODUCTS.slice(0, 8).map((p, i) => (
                <Link key={p.slug} href={`/products/${p.slug}`} className="group w-[240px] shrink-0 snap-start overflow-hidden rounded-3xl border border-ink/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl md:w-[270px]">
                  <div className="relative bg-stone-100 p-5">
                    <span className="absolute left-3 top-3 z-10 rounded-full border border-ink/10 bg-cream px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">{t(TAGS[i])}</span>
                    <span className="absolute right-3 top-3 z-10"><WishHeart slug={p.slug} /></span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.name} loading="lazy" className="mx-auto aspect-square rounded-2xl object-contain transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <p className="line-clamp-2 min-h-10 text-[14px] font-semibold leading-snug">{p.name}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-[13px] text-stone-500">
                        <span className="text-base font-extrabold text-ink">{inr(p.price)}</span>{" "}
                        <span className="line-through">{inr(p.mrp)}</span>
                      </p>
                      <span className="rounded-full bg-pine px-3 py-1.5 text-[12px] font-bold text-white">+ {t("cart")}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* wide lifestyle banner */}
      <section className="mx-auto max-w-6xl px-4 pt-12 md:pt-16">
        <Reveal>
          <Link href="/gallery" className="group relative block overflow-hidden rounded-[2rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/legacy/hero-3.png" alt="Excellent Dry installations" className="h-64 w-full object-cover transition duration-700 group-hover:scale-105 md:h-96" />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <span className="absolute bottom-0 flex w-full flex-wrap items-end justify-between gap-3 p-6 text-white md:p-10">
              <span className="font-display leading-[0.9]" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
                1,00,000+ homes<br />dry with us.
              </span>
              <span className="btn-slide inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-ink transition group-hover:bg-brand-yellow">
                {t("nav_gallery")} <ArrowRight size={16} />
              </span>
            </span>
          </Link>
        </Reveal>
      </section>

      {/* corporate clients marquee */}
      <section className="py-14 md:py-20">
        <Reveal>
          <h2 className="font-display text-center leading-[0.9]" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
            <Link href="/clients" className="transition hover:text-brand-cyan-deep">{t("clients_t")}</Link>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="marquee marquee-mask mt-8 overflow-hidden">
            <div className="marquee-track marquee-fast flex w-max items-center gap-6 pr-6">
              {[3, 1, 4, 1, 5, 2, 5, 3, 2, 4, 3, 1, 4, 1, 5, 2, 5, 3, 2, 4].map((n, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={`/legacy/clients/client${n}.jpg`}
                  alt={`Corporate client ${n}`}
                  loading="lazy"
                  className="h-24 w-auto shrink-0 rounded-xl border border-stone-200/60 bg-white object-contain px-3 grayscale-[35%] transition hover:scale-105 hover:grayscale-0"
                />
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* get inspired */}
      <section className="mx-auto max-w-6xl px-4">
        <Reveal>
          <Eyebrow no="03">Journal</Eyebrow>
          <h2 className="font-display mt-2 leading-[0.9]" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>{t("insp_t")}</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { k: "insp1" as Key, img: "/legacy/hero-2.png", href: "/products" },
            { k: "insp2" as Key, img: "/legacy/hero-3.png", href: "/products?cat=Ceiling Mount" },
            { k: "insp3" as Key, img: "/legacy/products/wall-mount/wall-mount-3-feet-3-lines.jpg", href: "/products?cat=Wall Mount" },
          ].map((c, i) => (
            <Reveal key={c.k} delay={i * 90}>
              <Link href={c.href} className="group block">
                <span className="relative block overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={t(c.k)} className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink transition duration-300 group-hover:bg-brand-yellow">
                    <ArrowRight size={17} />
                  </span>
                </span>
                <span className="font-display mt-3 block text-2xl font-bold leading-none">{t(c.k)}</span>
                <span className="u-link mt-1 inline-block text-[13px] font-semibold text-brand-cyan-deep">{t("get_insp")} ＞</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* moment banner */}
      <section className="mx-auto grid max-w-6xl gap-4 px-4 pt-14 md:grid-cols-2 md:pt-20">
        <Reveal className="grain flex items-center overflow-hidden rounded-3xl bg-[#dcebe4] p-10 md:p-14">
          <h2 className="font-display relative z-[2] leading-[0.9]" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
            {t("moment_l1")}<br /><span className="font-accent font-normal">{t("moment_l2")}</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/legacy/hero-3.png" alt="Easy home drying" className="h-full min-h-72 w-full rounded-3xl object-cover" />
        </Reveal>
      </section>

      {/* fitting demo video */}
      <section className="mx-auto max-w-6xl px-4 pt-14 md:pt-20">
        <Reveal>
          <Eyebrow no="04">Watch how it fits</Eyebrow>
          <h2 className="font-display mt-2 leading-[0.9]" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>See it in action.</h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="lift mt-8 overflow-hidden rounded-3xl border border-ink/10 bg-ink shadow-2xl">
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${DEMO_VIDEO_ID}?rel=0`}
                title="Excellent Dry system fitting demo video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* reviews + CTA */}
      <section className="mx-auto max-w-6xl px-4 pt-14 md:pt-20">
        <Reveal>
          <Eyebrow no="05">Wall of love</Eyebrow>
          <h2 className="font-display mt-2 leading-[0.9]" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>{t("rated_t")}</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((item, i) => (
            <Reveal key={item.name} delay={i * 90}>
              <figure className="lift flex h-full flex-col rounded-3xl border border-stone-200/70 bg-white p-7">
                <p className="font-accent text-5xl leading-none text-brand-yellow">“</p>
                <blockquote className="mt-1 flex-1 text-[15px] leading-relaxed text-stone-600">“{item.text}”</blockquote>
                <p className="mt-2 text-amber-500">★★★★★</p>
                <figcaption className="mt-2 text-sm font-bold">{item.name} <span className="font-normal text-stone-400">· {item.area}</span></figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="grain relative mt-10 overflow-hidden rounded-[2rem] bg-pine p-10 text-center text-white md:p-16">
            <p className="font-display relative z-[2] leading-[0.9]" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>{t("cta_t")}</p>
            <div className="relative z-[2] mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-slide inline-flex items-center gap-2 rounded-full bg-brand-yellow px-7 py-3.5 text-sm font-bold text-ink transition hover:brightness-95">
                {t("cta_quote")} <ArrowRight size={16} />
              </Link>
              <Link href="/cart" className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-bold backdrop-blur transition hover:bg-white/10">
                {t("cta_cart")}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
