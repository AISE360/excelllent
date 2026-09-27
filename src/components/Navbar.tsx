"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/become-retailer", label: "Retailer" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-white/90 backdrop-blur">
      <div className="bg-pine-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs sm:text-[13px]">
          <p className="truncate">
            Pune&apos;s trusted dry-system maker since 2014 · {SITE.hours}
          </p>
          <a
            href={`tel:${SITE.phone1.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 font-semibold"
          >
            <Phone size={13} /> {SITE.phone1}
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/legacy/logo.png" alt="Excellent Dry System" className="h-10 w-auto" />
          <span className="leading-tight">
            <span className="block text-[17px] font-extrabold tracking-tight text-pine-950">
              EXCELLENT DRY
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.22em] text-pine-600">
              Clothes Dry System
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-stone-600 transition hover:text-pine-700"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-pine-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-pine-700"
          >
            Get Free Quote
          </Link>
        </nav>
        <button
          className="rounded-lg p-2 text-pine-950 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-stone-200 bg-white px-4 py-3 lg:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-2 py-2.5 text-[15px] font-medium text-stone-700 hover:bg-stone-100"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-xl bg-pine-800 px-4 py-3 text-center font-semibold text-white"
          >
            Get Free Quote
          </Link>
        </nav>
      )}
    </header>
  );
}
