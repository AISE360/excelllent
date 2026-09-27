import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { AREAS, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-pine-950 text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <p className="text-lg font-extrabold text-white">EXCELLENT DRY</p>
          <p className="mt-1 text-xs uppercase tracking-[0.22em] text-teal-300">
            Clothes Dry System · Pune
          </p>
          <p className="mt-4 text-sm leading-relaxed">
            Manufacturer of pulley-operated clothes drying systems — open
            terrace, ceiling mount & wall mount — with maximum durability and
            same-week installation.
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">Products</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:text-white" href="/products?cat=Open Terrace">Open Terrace Pulley System</Link></li>
            <li><Link className="hover:text-white" href="/products?cat=Ceiling Mount">Ceiling Mount Pulley System</Link></li>
            <li><Link className="hover:text-white" href="/products?cat=Wall Mount">Wall Mount Foldable Stand</Link></li>
            <li><Link className="hover:text-white" href="/become-retailer">Become a Retailer</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Service areas</p>
          <p className="mt-3 text-sm leading-relaxed">{AREAS.join(" · ")}</p>
        </div>
        <div>
          <p className="font-semibold text-white">Contact</p>
          <ul className="mt-3 space-y-2.5 text-sm">
            <li className="flex gap-2"><MapPin size={15} className="mt-0.5 shrink-0" />{SITE.address}</li>
            <li className="flex gap-2"><Phone size={15} className="mt-0.5 shrink-0" />{SITE.phone1} / {SITE.phone2}</li>
            <li className="flex gap-2"><Mail size={15} className="mt-0.5 shrink-0" />{SITE.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} Excellent Dry System, Pune. All rights reserved.</p>
          <Link href="/admin" className="text-teal-300 hover:text-white">Admin login →</Link>
        </div>
      </div>
    </footer>
  );
}
