import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EnquiryForm from "@/components/EnquiryForm";
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
    description: `${p.name} — ${p.blurb} MRP ${inr(p.mrp)}, offer ${inr(p.price)} with installation in Pune.`,
  };
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: p.image,
    description: p.blurb,
    offers: { "@type": "Offer", priceCurrency: "INR", price: p.price, availability: "https://schema.org/InStock" },
  };
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/products" className="text-sm font-semibold text-pine-700">← All products</Link>
      <div className="mt-4 grid gap-10 lg:grid-cols-2">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt={p.name} className="w-full rounded-3xl border border-stone-200 object-cover shadow-lg" />
          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-[13px]">
            {[["Material", "304-grade steel"], ["Rope", "UV-grade nylon"], ["Warranty", "On-site service"]].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-white p-3 border border-stone-200">
                <p className="font-bold text-pine-900">{k}</p><p className="text-stone-500">{v}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-pine-600">{p.category} · {p.size}</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-pine-950 sm:text-4xl">{p.name}</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-stone-600">{p.blurb} Designed for Indian homes — rust-proof pipes, smooth pulleys, wall-safe clamps, and clean drilling.</p>
          <p className="mt-5 flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-pine-800">{inr(p.price)}</span>
            <span className="text-lg text-stone-400 line-through">{inr(p.mrp)}</span>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">SAVE {inr(p.mrp - p.price)}</span>
          </p>
          <ul className="mt-5 space-y-2 text-sm text-stone-600">
            <li>✓ Free site measurement guidance on call/WhatsApp</li>
            <li>✓ Professional installation across Pune (60–90 min)</li>
            <li>✓ GST invoice · service support on call</li>
          </ul>
          <div className="mt-7 rounded-3xl border border-stone-200 bg-white p-6">
            <h2 className="text-lg font-extrabold text-pine-950">Order this product</h2>
            <div className="mt-3"><EnquiryForm product={p.name} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
