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
    description: `${p.name}: ${p.blurb} MRP ${inr(p.mrp)}, offer ${inr(p.price)} with installation in Pune.`,
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
    description: p.blurb,
    offers: { "@type": "Offer", priceCurrency: "INR", price: p.price, availability: "https://schema.org/InStock" },
  };
  return (
    <div className="mx-auto max-w-6xl px-4 pt-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="text-[12px] text-stone-500">
        <Link href="/" className="hover:underline">Home</Link> {" ＞ "}
        <Link href="/products" className="hover:underline">Drying rack</Link> {" ＞ "} {p.name}
      </p>
      <div className="mt-4 grid gap-10 lg:grid-cols-2">
        <div className="relative bg-card p-10">
          <span className="absolute left-3 top-3 bg-brand-yellow px-1.5 py-0.5 text-[11px] font-bold">New</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt={p.name} className="mx-auto aspect-square object-contain" />
        </div>
        <div>
          <h1 className="font-display text-5xl font-bold leading-[0.95]">{p.name}</h1>
          <p className="mt-2 text-[13px] text-stone-500">{p.category} · {p.size} · 304-grade steel</p>
          <p className="mt-3 text-xl font-bold">
            {inr(p.price)} <span className="text-sm font-normal text-stone-400 line-through">{inr(p.mrp)}</span>{" "}
            <span className="bg-brand-yellow px-1.5 py-0.5 text-xs font-bold">SAVE {inr(p.mrp - p.price)}</span>
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-stone-600">{p.blurb}</p>
          <ul className="mt-4 space-y-1.5 text-sm text-stone-600">
            <li>✓ Free measurement guidance on call/WhatsApp</li>
            <li>✓ Professional installation across Pune (60-90 min)</li>
            <li>✓ GST invoice · service support on call</li>
          </ul>
          <div className="mt-6 border border-stone-200 p-5">
            <p className="font-display text-2xl font-bold">Order this product.</p>
            <div className="mt-3"><EnquiryForm product={p.name} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
