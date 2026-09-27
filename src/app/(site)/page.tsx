"use client";

import Link from "next/link";
import { ArrowRight, Home as HomeIcon, ShieldCheck, Star, Wrench } from "lucide-react";
import { inr, DEMO_VIDEO_ID, PRODUCTS, TESTIMONIALS } from "@/lib/site";
import { type Key } from "@/lib/strings";
import { useT } from "@/components/LanguageSwitcher";
import Reveal from "@/components/Reveal";
import DeliveryTicker from "@/components/DeliveryTicker";

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
  const BADGES = [
    { icon: <Star size={18} />, t: t("b1t"), s: t("b1s") },
    { icon: <HomeIcon size={18} />, t: t("b2t"), s: t("b2s") },
    { icon: <Wrench size={18} />, t: t("b3t"), s: t("b3s") },
    { icon: <ShieldCheck size={18} />, t: t("b4t"), s: t("b4s") },
  ];

  return (
    <>
      {/* EDITORIAL HERO */}
      <section className="grain relative flex min-h-[93vh] items-end overflow-hidden bg-ink text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/legacy/hero-1.png"
          alt="Excellent Dry balcony drying system"
          className="slow-zoom absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-ink/30" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/50 to-transparent" />

        <div className="relative z-[2] mx-auto w-full max-w-6xl px-4 pb-12 pt-40 md:pb-16">
          <p className="rise rise-1 flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.28em] text-white/80">
            <span className="inline-block h-[3px] w-10 bg-brand-yellow" /> {t("hero_eb")}
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
            <h1 className="rise rise-2 font-display leading-[0.86] tracking-tight" style={{ fontSize: "clamp(3.8rem, 10vw, 9rem)" }}>
              {t("hero_l1")}
              <br />
              {t("hero_l2")}
            </h1>
            <div className="rise rise-3 pb-2">
              <Link
                href="/products"
                className="btn-slide inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-ink shadow-2xl transition hover:bg-brand-yellow"
              >
                {t("hero_cta")} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <p className="rise rise-3 mt-4 max-w-md text-[14px] leading-relaxed text-white/75">
            {t("hero_sub")}
          </p>
          <div className="rise rise-4 mt-6 flex max-w-3xl flex-wrap gap-x-6 gap-y-2 border-t border-white/15 pt-4">
            {BADGES.map((b) => (
              <span key={b.t} className="flex items-center gap-2 text-white/85">
                <span className="text-brand-yellow">{b.icon}</span>
                <span className="text-[12px] font-semibold">{b.t} {b.s}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="floaty absolute right-6 top-24 z-[2] hidden rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-xl xl:block">
          <p className="font-display text-4xl font-bold text-brand-yellow">4.8 ★</p>
          <p className="text-[11px] uppercase tracking-wider text-white/70">80,000+ reviews</p>
        </div>
      </section>

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
      <section className="mx-auto max-w-6xl px-4 pt-16 md:pt-24">
        <Reveal>
          <Eyebrow no="01">Shop by space</Eyebrow>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATS.map((c, i) => (
            <Reveal key={c.t} delay={i * 90}>
              <Link href={c.href} className="lift group relative block overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={t(c.t)} className="h-72 w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <span className="font-display absolute right-4 top-3 text-2xl font-bold text-white/40">0{i + 1}</span>
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
                  <span>
                    <span className="font-display block text-2xl font-bold leading-none">{t(c.t)}</span>
                    <span className="mt-1 block text-[12px] text-white/75">{t(c.s)}</span>
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink transition duration-300 group-hover:rotate-[-35deg] group-hover:bg-brand-yellow">
                    <ArrowRight size={18} />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* bestsellers */}
      <section className="mt-16 bg-cream/60 py-16 md:mt-24 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow no="02">{t("pop_eb")}</Eyebrow>
                <h2 className="font-display mt-2 leading-[0.9]" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>{t("best")}</h2>
              </div>
              <Link href="/products" className="btn-slide hidden items-center gap-1.5 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-bold transition hover:border-ink hover:bg-ink hover:text-white sm:inline-flex">
                {t("view_all")} <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {PRODUCTS.slice(0, 4).map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <Link href={`/products/${p.slug}`} className="lift group block overflow-hidden rounded-2xl border border-stone-200/70 bg-white">
                  <div className="relative bg-card p-5">
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-yellow">New</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.name} loading="lazy" className="mx-auto aspect-square object-contain transition duration-500 group-hover:scale-[1.06] group-hover:-rotate-1" />
                  </div>
                  <div className="p-4">
                    <p className="text-[14px] font-semibold leading-snug">{p.name}</p>
                    <p className="mt-1.5 text-[13px] text-stone-500">
                      <span className="text-base font-extrabold text-ink">{inr(p.price)}</span>{" "}
                      <span className="line-through">{inr(p.mrp)}</span>
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
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
          <div className="grain relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-cyan via-brand-cyan-deep to-ink p-10 text-center text-white md:p-16">
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
