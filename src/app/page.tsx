import Link from "next/link";
import { ArrowRight, BadgeCheck, Drill, Ruler, ShieldCheck, Truck, WashingMachine } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import EnquiryForm from "@/components/EnquiryForm";
import { AREAS, PRODUCTS, SITE, STATS, TESTIMONIALS, inr } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* HERO — Brabantia-style calm premium */}
      <section className="hero-grid relative overflow-hidden bg-gradient-to-b from-pine-50 to-[#fafaf8]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-pine-600/30 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-pine-700">
              <BadgeCheck size={14} /> Since 2014 · 1,00,000+ Pune homes
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-pine-950 sm:text-5xl lg:text-[3.4rem]">
              Dry laundry the smart way.{" "}
              <span className="text-pine-600">Zero floor space.</span>
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-stone-600 sm:text-base">
              Pulley-operated ceiling & terrace systems and foldable wall stands —
              304-grade steel, UV-grade rope, professional installation across Pune
              within days. Better designed than imports, built for Indian homes.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/products" className="rounded-full bg-pine-800 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-pine-800/20 transition hover:bg-pine-700">
                Shop drying systems
              </Link>
              <Link href="/contact" className="rounded-full border-2 border-pine-800 px-7 py-3 text-sm font-bold text-pine-800 transition hover:bg-pine-50">
                Book free site visit
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-stone-600">
              <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-pine-600" /> Genuine 304 steel</span>
              <span className="flex items-center gap-2"><Truck size={16} className="text-pine-600" /> Same-week fitting</span>
              <span className="flex items-center gap-2"><Drill size={16} className="text-pine-600" /> Expert installers</span>
            </div>
          </div>
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/legacy/hero-1.png" alt="Pulley operated clothes drying system" className="w-full rounded-[2rem] border border-stone-200 object-cover shadow-2xl" />
            <div className="absolute -bottom-5 -left-4 rounded-2xl bg-white px-5 py-4 shadow-xl sm:-left-8">
              <p className="text-2xl font-extrabold text-pine-800">4.8 ★</p>
              <p className="text-xs text-stone-500">from 80,000+ reviews</p>
            </div>
            <div className="absolute -top-4 -right-2 rounded-2xl bg-pine-950 px-5 py-3 text-white shadow-xl sm:-right-4">
              <p className="text-sm font-bold">Starting {inr(1980)}</p>
              <p className="text-[11px] text-teal-300">incl. installation visit</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { t: "Open Terrace Pulley", d: "4–9 ft · heavy-duty terrace frames", img: "/legacy/products/open-terrace/open-terrace-fitting-6-feet-4-lines.jpg", q: "Open Terrace" },
            { t: "Ceiling Mount Pulley", d: "Balcony & room · space saving", img: "/legacy/products/ceiling-mount/ceiling-mount-fitting-5-feet-4-lines.jpg", q: "Ceiling Mount" },
            { t: "Wall Mount Foldable", d: "304 steel · folds flat", img: "/legacy/products/wall-mount/wall-mount-3-feet-4-lines.jpg", q: "Wall Mount" },
          ].map((c) => (
            <Link key={c.t} href={`/products?cat=${encodeURIComponent(c.q)}`}
              className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt={c.t} className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-pine-950/85 via-pine-950/10 to-transparent" />
              <div className="absolute bottom-0 p-5 text-white">
                <p className="text-lg font-bold">{c.t}</p>
                <p className="text-[13px] text-white/80">{c.d}</p>
                <p className="mt-2 inline-flex items-center gap-1 text-[13px] font-bold text-teal-300">Explore <ArrowRight size={14} /></p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pine-600">Our products</p>
              <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-pine-950">Choose the best one for you</h2>
            </div>
            <Link href="/products" className="inline-flex items-center gap-1 text-sm font-bold text-pine-700">View all <ArrowRight size={15} /></Link>
          </div>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.slice(0, 6).map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-pine-950">Effortless, from enquiry to dry clothes</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            { i: <WashingMachine size={22} />, t: "1. Free quote", d: "Call or WhatsApp your balcony size & photos." },
            { i: <Ruler size={22} />, t: "2. Site visit", d: "We measure & recommend the right feet + lines." },
            { i: <Drill size={22} />, t: "3. Installation", d: "Clean drilling & fitting in ~60–90 minutes." },
            { i: <BadgeCheck size={22} />, t: "4. Dry happy", d: "Pull, load, raise. Service support on call." },
          ].map((s) => (
            <div key={s.t} className="rounded-2xl border border-stone-200 bg-white p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-pine-50 text-pine-700">{s.i}</span>
              <p className="mt-4 font-bold text-pine-950">{s.t}</p>
              <p className="mt-1 text-sm text-stone-500">{s.d}</p>
            </div>
          ))}
        </div>
        {/* STATS */}
        <div className="mt-8 grid grid-cols-2 gap-4 rounded-3xl bg-pine-950 p-8 text-white md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold">{s.value}</p>
              <p className="mt-1 text-[13px] text-teal-200">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-pine-950">Loved across Pune</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-stone-200 bg-[#fafaf8] p-6">
                <p className="text-amber-500">★★★★★</p>
                <blockquote className="mt-2 text-sm leading-relaxed text-stone-600">“{t.text}”</blockquote>
                <figcaption className="mt-4 text-sm font-bold text-pine-900">{t.name} <span className="font-normal text-stone-400">· {t.area}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS + ENQUIRY */}
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-pine-950">Serving all of Pune</h2>
          <p className="mt-2 text-sm text-stone-500">Same-week installation · {SITE.hours}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {AREAS.map((a) => (
              <Link key={a} href={`/contact?area=${a}`}
                className="rounded-full border border-stone-300 bg-white px-3.5 py-1.5 text-[13px] font-medium text-stone-600 hover:border-pine-600 hover:text-pine-700">
                {a}
              </Link>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-pine-50 p-5 text-sm leading-relaxed text-stone-600">
            <strong className="text-pine-900">Visit / call us:</strong><br />
            {SITE.address}<br />{SITE.phone1} · {SITE.phone2} · {SITE.email}
          </div>
        </div>
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="text-xl font-extrabold text-pine-950">Make an enquiry</h3>
          <p className="mb-4 mt-1 text-sm text-stone-500">Free callback — usually within a few working hours.</p>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
