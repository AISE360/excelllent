import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EnquiryForm from "@/components/EnquiryForm";
import AddToCart from "@/components/AddToCart";
import ProductCard from "@/components/ProductCard";
import { getLang } from "@/lib/i18n";
import { tr } from "@/lib/strings";
import { PRODUCTS, inr } from "@/lib/site";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name} in Pune`,
    description: `${p.name}: ${p.blurb} MRP ${inr(p.mrp)}, offer ${inr(p.price)} with installation in Pune.`,
  };
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) notFound();
  const lang = await getLang();
  const t = (k: Parameters<typeof tr>[1]) => tr(lang, k);
  const siblings = PRODUCTS.filter((x) => x.category === p.category);
  const related = PRODUCTS.filter((x) => x.category !== p.category).slice(0, 4);
  const off = Math.round(((p.mrp - p.price) / p.mrp) * 100);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.blurb,
    offers: { "@type": "Offer", priceCurrency: "INR", price: p.price, availability: "https://schema.org/InStock" },
  };
  return (
    <div className="bg-[#f4f7fd] pb-24 lg:pb-0">
      <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-8 md:py-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <p className="text-[12px] font-bold text-stone-400">
          <Link href="/" className="hover:text-black">Home</Link> / <Link href="/products" className="hover:text-black">Shop</Link> / <span className="text-black">{p.name}</span>
        </p>

        <div className="mt-4 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          {/* gallery bento */}
          <div className="grid gap-4">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-black/10 bg-white p-6 md:p-10">
              <span className="absolute left-5 top-5 flex gap-2">
                <span className="rounded-md bg-black px-2.5 py-1 text-[11px] font-extrabold uppercase text-white">Bestseller</span>
                <span className="rounded-md bg-[#d9232e] px-2.5 py-1 text-[11px] font-extrabold text-white">Save {off}%</span>
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.name} className="mx-auto aspect-[4/3.4] w-full max-w-lg object-contain" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[["304 SS", "Rust-proof pipes"], ["20 kg", "Safe load"], ["90 min", "Pro fitting"]].map(([a, b]) => (
                <div key={b} className="rounded-2xl border border-black/10 bg-white p-4 text-center">
                  <p className="text-xl font-extrabold">{a}</p>
                  <p className="text-[12px] font-bold text-stone-500">{b}</p>
                </div>
              ))}
            </div>
          </div>

          {/* buy panel */}
          <div className="h-fit rounded-[1.75rem] border border-black/10 bg-white p-6 md:p-8 lg:sticky lg:top-32">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#173063]">{p.category} · {p.size} · {p.lines} lines</p>
            <h1 className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold leading-[1.05] tracking-tight">{p.name}</h1>
            <p className="mt-2 text-[13px] font-bold">★★★★★ 4.8 · 2,300+ Pune fittings · GST bill</p>
            <p className="mt-4 flex flex-wrap items-baseline gap-2.5">
              <span className="text-4xl font-extrabold tracking-tight">{inr(p.price)}</span>
              <span className="font-bold text-stone-400 line-through">{inr(p.mrp)}</span>
              <span className="rounded-md bg-green-700/10 px-3 py-1 text-xs font-extrabold text-green-800">Fitted · save {inr(p.mrp - p.price)}</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-stone-500">{p.blurb} Measured on site, anchored to slab, load-tested. Pay after demo.</p>

            <p className="mt-5 text-[13px] font-extrabold">{t("select_size")}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {siblings.map((s) => (
                <Link key={s.slug} href={`/products/${s.slug}`} className={`rounded-full border px-4 py-2 text-[13px] font-bold ${s.slug === p.slug ? "border-black bg-black text-white" : "border-black/12 hover:border-black"}`}>
                  {s.feet} Ft · {s.lines}L · {inr(s.price)}
                </Link>
              ))}
            </div>

            <div className="mt-6 hidden gap-2 lg:flex">
              <AddToCart slug={p.slug} />
              <Link href={`/contact?product=${encodeURIComponent(p.name)}`} className="flex flex-1 items-center justify-center rounded-full bg-[#d9232e] py-3.5 text-sm font-extrabold text-white hover:brightness-95">
                {t("d_ordernow")}
              </Link>
            </div>
            <ul className="mt-5 space-y-1.5 text-[13px] font-bold text-stone-500">
              <li>✓ Free site visit · no advance</li>
              <li>✓ 60–90 min fitting + cleanup</li>
              <li>✓ 1-year rope + pulley service</li>
            </ul>

            <div className="mt-5 rounded-2xl border border-black/10 bg-[#f4f7fd] p-5">
              <p className="font-extrabold">{t("d_order")}</p>
              <div className="mt-3 rounded-xl border border-black/10 bg-white p-3"><EnquiryForm product={p.name} /></div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-black/10 bg-white p-6 md:p-8">
            <p className="text-xl font-extrabold">Full specs</p>
            <dl className="mt-3 divide-y divide-black/[0.06] text-sm">
              {[["System", `${p.category} · ${p.feet} ft × ${p.lines} lines`], ["Pipes", "304 SS · rust-proof · spaced airflow"], ["Rope", "UV nylon · replaceable"], ["Pulleys", "Sealed bearing · one-finger glide"], ["Load", "15–20 kg even"], ["Fitting", "Anchors + 90-min pro install"], ["Warranty", "1-year Pune service"]].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-2.5"><dt className="text-stone-500">{k}</dt><dd className="text-right font-bold">{v}</dd></div>
              ))}
            </dl>
          </div>
          <div className="overflow-hidden rounded-[1.75rem] border border-black/10 bg-white">
            <div className="p-6 md:p-8">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#173063]">Rope vs stand vs pulley</p>
              <p className="mt-2 text-2xl font-extrabold">Pulley wins on space, speed and life.</p>
            </div>
            <div className="grid grid-cols-3 gap-px border-t border-black/10 bg-black/[0.07] text-center text-[13px] font-bold">
              {[["Pulley", "0 sq ft", "8–10 yrs", "✓ Fitted"], ["Rope", "0 sq ft", "6–12 mo", "✕ Sag"], ["Stand", "10 sq ft", "2–3 yrs", "✕ Rust"]].map((c) => (
                <div key={c[0]} className="bg-[#f4f7fd] p-4"><p className="font-extrabold">{c[0]}</p><p className="mt-1 text-black/55">{c[1]}<br />{c[2]}<br />{c[3]}</p></div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-end justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Complete the laundry wall</h2>
          <Link href="/products" className="text-sm font-bold">View all →</Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {related.map((r) => <ProductCard key={r.slug} p={r} />)}
        </div>
      </div>

      {/* sticky mobile buy bar */}
      <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-black/10 bg-white/95 p-3 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-[1440px] items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-extrabold">{p.name}</p>
            <p className="text-sm font-extrabold">{inr(p.price)} <span className="font-semibold text-stone-400 line-through">{inr(p.mrp)}</span></p>
          </div>
          <div className="w-36"><AddToCart slug={p.slug} /></div>
          <Link href={`/contact?product=${encodeURIComponent(p.name)}`} className="rounded-full bg-[#d9232e] px-5 py-3.5 text-sm font-extrabold text-white">Visit</Link>
        </div>
      </div>
    </div>
  );
}
