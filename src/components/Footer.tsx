import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 text-sm md:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-bold">excellent<span className="text-brand-red">dry</span></p>
          <p className="mt-3 leading-relaxed text-stone-500">
            Clothes drying systems to love. Designed in Pune, built with 304-grade
            steel, installed in 1,00,000+ homes since 2014.
          </p>
        </div>
        <div>
          <p className="font-semibold">Shop</p>
          <ul className="mt-3 space-y-2 text-stone-500">
            <li><Link className="hover:text-ink" href="/products?cat=Open Terrace">Open Terrace System</Link></li>
            <li><Link className="hover:text-ink" href="/products?cat=Ceiling Mount">Ceiling Mount System</Link></li>
            <li><Link className="hover:text-ink" href="/products?cat=Wall Mount">Wall Mount Stand</Link></li>
            <li><Link className="hover:text-ink" href="/products">All products</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Service</p>
          <ul className="mt-3 space-y-2 text-stone-500">
            <li><Link className="hover:text-ink" href="/about">About us</Link></li>
            <li><Link className="hover:text-ink" href="/contact">Contact & site visit</Link></li>
            <li><Link className="hover:text-ink" href="/become-retailer">Become a retailer</Link></li>
            <li><Link className="hover:text-ink" href="/gallery">Installation gallery</Link></li>
            <li><Link className="hover:text-ink" href="/testimonials">Reviews</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Contact</p>
          <p className="mt-3 leading-relaxed text-stone-500">
            {SITE.address}<br />
            <a className="font-semibold text-ink" href={`tel:${SITE.phone1.replace(/\s/g, "")}`}>{SITE.phone1}</a>
            {" · "}{SITE.phone2}<br />{SITE.email}
          </p>
        </div>
      </div>
      <div className="border-t border-stone-200">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-stone-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Excellent Dry System, Pune.</p>
          <Link href="/admin" className="hover:text-ink">Admin login →</Link>
        </div>
      </div>
    </footer>
  );
}
