import Link from "next/link";
import { inr, PRODUCTS, TESTIMONIALS } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* HERO — cyan block + yellow card */}
      <section className="mx-auto max-w-6xl px-4 pt-4">
        <div className="grid bg-brand-cyan md:grid-cols-2">
          <div className="flex items-center justify-center p-6 md:p-12">
            <div className="bg-brand-yellow p-8 md:p-10 max-w-md">
              <h1 className="font-display text-5xl font-bold leading-[0.95] md:text-6xl">
                Dry smart.<br />Save space.
              </h1>
              <p className="mt-4 text-[14px] leading-relaxed">
                Pulley-operated terrace & ceiling systems and foldable wall stands —
                304-grade steel, installed across Pune in days. 1,00,000+ happy homes.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-block rounded bg-ink px-5 py-2.5 text-sm font-semibold text-white"
              >
                View the collection →
              </Link>
            </div>
          </div>
          <div className="min-h-[320px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/legacy/hero-1.png"
              alt="Excellent Dry pulley clothes drying system"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4 lifestyle tiles */}
      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 pt-6 lg:grid-cols-4">
        {[
          { t: "Open Terrace", img: "/legacy/products/open-terrace/open-terrace-fitting-6-feet-4-lines.jpg", href: "/products?cat=Open Terrace" },
          { t: "Ceiling Mount", img: "/legacy/products/ceiling-mount/ceiling-mount-fitting-5-feet-4-lines.jpg", href: "/products?cat=Ceiling Mount" },
          { t: "Wall Mount", img: "/legacy/products/wall-mount/wall-mount-3-feet-4-lines.jpg", href: "/products?cat=Wall Mount" },
          { t: "All Systems", img: "/legacy/hero-2.png", href: "/products" },
        ].map((c) => (
          <Link key={c.t} href={c.href} className="group relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.img} alt={c.t} className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-105" />
            <span className="absolute bottom-3 left-3 bg-white px-3 py-1.5 text-[13px] font-semibold">{c.t} →</span>
          </Link>
        ))}
      </section>

      {/* Bestsellers on grey cards */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-4xl font-bold">Bestsellers.</h2>
          <Link href="/products" className="text-sm font-semibold hover:text-brand-red">View all →</Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {PRODUCTS.slice(0, 4).map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`} className="group">
              <div className="relative bg-card p-6">
                <span className="absolute left-2 top-2 bg-brand-yellow px-1.5 py-0.5 text-[11px] font-bold">New</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} loading="lazy" className="mx-auto aspect-square object-contain transition duration-500 group-hover:scale-105" />
              </div>
              <p className="mt-2 text-[14px] font-semibold leading-snug">{p.name}</p>
              <p className="text-[13px] text-stone-500">{inr(p.price)} <span className="line-through">{inr(p.mrp)}</span></p>
            </Link>
          ))}
        </div>
      </section>

      {/* GET INSPIRED */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <h2 className="font-display text-4xl font-bold">Get inspired.</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            { t: "How do you choose the right drying system?", img: "/legacy/hero-2.png", href: "/products" },
            { t: "How do you free up your balcony?", img: "/legacy/hero-3.png", href: "/products?cat=Ceiling Mount" },
            { t: "Drying tools you can't live without", img: "/legacy/products/wall-mount/wall-mount-3-feet-3-lines.jpg", href: "/products?cat=Wall Mount" },
          ].map((c) => (
            <Link key={c.t} href={c.href} className="group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt={c.t} className="aspect-[4/5] w-full object-cover" />
              <p className="mt-2 text-[14px] font-semibold">{c.t}</p>
              <p className="text-[13px] text-stone-500">Get inspired ＞</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Moment banner */}
      <section className="mx-auto grid max-w-6xl px-4 pt-10 md:grid-cols-2">
        <div className="flex items-center bg-[#dfe9e4] p-10">
          <h2 className="font-display text-5xl font-bold leading-[0.95]">Take your<br />moment.</h2>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/legacy/hero-3.png" alt="Easy home drying" className="h-full w-full object-cover" />
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <h2 className="font-display text-4xl font-bold">Rated 4.8/5.</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="border border-stone-200 p-5">
              <p className="text-amber-500 text-sm">★★★★★</p>
              <blockquote className="mt-2 text-sm leading-relaxed text-stone-600">“{t.text}”</blockquote>
              <figcaption className="mt-3 text-sm font-semibold">{t.name} <span className="font-normal text-stone-400">· {t.area}</span></figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8 bg-ink p-8 text-center text-white">
          <p className="font-display text-3xl font-bold">Free site visit across Pune.</p>
          <Link href="/contact" className="mt-4 inline-block rounded bg-brand-yellow px-6 py-2.5 text-sm font-bold text-ink">
            Get a free quote →
          </Link>
        </div>
      </section>
    </>
  );
}
