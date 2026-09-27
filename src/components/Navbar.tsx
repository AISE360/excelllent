"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, Phone, Search, ShoppingCart, User, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { SITE } from "@/lib/site";
import { type Key } from "@/lib/strings";
import LanguageSwitcher, { useT } from "@/components/LanguageSwitcher";

const NAV: { key: Key; href: string; children?: { key: Key; href: string }[] }[] = [
  {
    key: "nav_pulley",
    href: "/products?cat=Open Terrace",
    children: [
      { key: "nav_open", href: "/products?cat=Open Terrace" },
      { key: "nav_ceiling", href: "/products?cat=Ceiling Mount" },
      { key: "nav_all", href: "/products" },
    ],
  },
  {
    key: "nav_wall",
    href: "/products?cat=Wall Mount",
    children: [
      { key: "nav_fold", href: "/products?cat=Wall Mount" },
      { key: "nav_all", href: "/products" },
    ],
  },
  { key: "nav_gallery", href: "/gallery" },
  { key: "nav_reviews", href: "/testimonials" },
  { key: "nav_retailer", href: "/become-retailer" },
  { key: "nav_contact", href: "/contact" },
];

export default function Navbar() {
  const [q, setQ] = useState("");
  const [mobile, setMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const t = useT();
  let count = 0;
  try {
    count = useCart().count;
  } catch {
    count = 0;
  }

  function search(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/products?q=${encodeURIComponent(q)}`);
    setMobile(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_0_rgb(0_0_0/0.06)]">
      {/* main header */}
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <button className="p-1 lg:hidden" onClick={() => setMobile(!mobile)} aria-label="Menu">
          {mobile ? <X size={22} /> : <Menu size={22} />}
        </button>
        <Link
          href="/"
          className="shrink-0"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/legacy/logo.png" alt="Excellent Dry" className="h-10 w-auto transition hover:opacity-90" />
        </Link>
        <form onSubmit={search} className="mx-auto hidden w-full max-w-md items-center md:flex">
          <div className="flex w-full items-center rounded-full border border-stone-300 px-4 py-2 transition focus-within:border-ink">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("search_ph")}
              className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400"
            />
            <button aria-label="Search"><Search size={17} /></button>
          </div>
        </form>
        <div className="ml-auto flex items-center gap-4 text-[13px] font-medium md:ml-0">
          <Link href="/admin" className="flex items-center gap-1.5 hover:text-brand-red">
            <User size={19} /><span className="hidden sm:inline">{t("account")}</span>
          </Link>
          <Link href="/cart" className="relative flex items-center gap-1.5 hover:text-brand-red">
            <ShoppingCart size={19} /><span className="hidden sm:inline">{t("cart")}</span>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>

      {/* category nav */}
      <nav className="hidden border-t border-stone-100 lg:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <ul className="flex items-center gap-7">
            {NAV.map((n) => (
              <li key={n.key} className="group relative py-2.5">
                <Link href={n.href} className="flex items-center gap-1 text-[14px] transition hover:text-brand-red">
                  {t(n.key)}
                  {n.children && <ChevronDown size={13} />}
                </Link>
                {n.children && (
                  <div className="invisible absolute left-0 top-full z-50 w-56 translate-y-1 border border-stone-200 bg-white py-2 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {n.children.map((c) => (
                      <Link key={c.key} href={c.href} className="block px-4 py-2 text-sm hover:bg-stone-100">
                        {t(c.key)}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <a
            href={`tel:${SITE.phone1.replace(/\s/g, "")}`}
            className="my-1.5 flex items-center gap-1.5 rounded-md bg-brand-yellow px-4 py-2 text-[13px] font-bold transition hover:brightness-95"
          >
            <Phone size={14} /> {t("call_now")}: {SITE.phone1.replace("+91 ", "")}
          </a>
        </div>
      </nav>

      {/* mobile menu */}
      {mobile && (
        <div className="border-t border-stone-200 bg-white px-4 pb-5 lg:hidden">
          <form onSubmit={search} className="mt-3 flex items-center rounded-full border border-stone-300 px-4 py-2.5">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("search_ph")}
              className="w-full bg-transparent text-sm outline-none" />
            <button aria-label="Search"><Search size={17} /></button>
          </form>
          {NAV.map((n) => (
            <Link key={n.key} href={n.href} onClick={() => setMobile(false)}
              className="block border-b border-stone-100 py-3 text-[15px] font-medium">
              {t(n.key)}
            </Link>
          ))}
          <a href={`tel:${SITE.phone1.replace(/\s/g, "")}`}
            className="mt-3 flex items-center justify-center gap-1.5 rounded-md bg-brand-yellow px-4 py-3 text-sm font-bold">
            <Phone size={15} /> {t("call_now")}: {SITE.phone1}
          </a>
        </div>
      )}
    </header>
  );
}
