"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Phone, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { SITE } from "@/lib/site";
import LanguageSwitcher, { useT } from "@/components/LanguageSwitcher";

const MEGA = [
  {
    title: "Open Terrace",
    desc: "Pulley · 4–9 ft · full sun",
    img: "/legacy/products/open-terrace/open-terrace-fitting-6-feet-4-lines.jpg",
    href: "/products?cat=Open Terrace",
    price: "from ₹3,960",
  },
  {
    title: "Ceiling Mount",
    desc: "Balcony pulley · zero floor space",
    img: "/legacy/products/ceiling-mount/ceiling-mount-fitting-5-feet-4-lines.jpg",
    href: "/products?cat=Ceiling Mount",
    price: "from ₹3,168",
  },
  {
    title: "Wall Mount",
    desc: "Foldable 304 SS · 3–5 ft",
    img: "/legacy/products/wall-mount/wall-mount-3-feet-4-lines.jpg",
    href: "/products?cat=Wall Mount",
    price: "from ₹2,070",
  },
];

export default function Navbar() {
  const [q, setQ] = useState("");
  const [mobile, setMobile] = useState(false);
  const [mega, setMega] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const t = useT();
  let cartCount = 0;
  let openCart = () => {};
  try {
    const c = useCart();
    cartCount = c.count;
    openCart = () => c.setCartOpen(true);
  } catch { /* noop */ }

  function search(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/products?q=${encodeURIComponent(q)}`);
    setMobile(false);
  }

  // close mega menu on navigation + Escape
  useEffect(() => {
    setMega(false);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMega(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  // dropdown lives only while hovering the Shop systems zone (button + panel)
  function openMega() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMega(true);
  }
  function hoverOutMega() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMega(false), 140);
  }

  return (
    <header className="sticky top-0 z-[80]">
      {/* full-bleed marquee utility */}
      <div className="overflow-hidden bg-[#072928] text-white">
        <div className="marquee flex whitespace-nowrap py-2 text-[12px] font-bold tracking-wide">
          <div className="marquee-track flex w-max shrink-0 items-center gap-10 pr-10">
            {Array(4).fill(["Free site visit across Pune", "1,00,000+ installations", "304-grade steel", "Pay after fitting", "1-year service", "Same-week slots"]).flat().map((s, i) => (
              <span key={i} className="flex shrink-0 items-center gap-10"><span>{s}</span><span className="text-[#e8b62a]">●</span></span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-b border-black/10 bg-white/92 backdrop-blur-2xl" style={{ background: "rgb(255 255 255 / 0.92)" }}>
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-3 px-4 md:px-8">
          <button className="rounded-lg p-2 hover:bg-black/5 lg:hidden" onClick={() => setMobile(!mobile)} aria-label="Menu">
            {mobile ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link href="/" className="flex shrink-0 items-center" aria-label="Excellent Dry, home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/legacy/logo.png" alt="Excellent Dry" className="h-11 w-auto" />
          </Link>

          <nav className="ml-6 hidden items-center gap-1 lg:flex">
            <div>
              <button
                onMouseEnter={openMega}
                onMouseLeave={hoverOutMega}
                onClick={() => {
                  if (closeTimer.current) window.clearTimeout(closeTimer.current);
                  setMega((v) => !v);
                }}
                aria-expanded={mega}
                aria-haspopup="true"
                data-open={mega}
                className="nav-water flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[14px] font-extrabold hover:bg-black/5"
              >
                <span className="nav-label">Shop systems <ChevronDown size={14} className={`transition ${mega ? "rotate-180" : ""}`} /></span>
              </button>
            </div>
            {[
              { l: t("nav_gallery"), h: "/gallery" },
              { l: t("nav_reviews"), h: "/testimonials" },
              { l: t("nav_clients"), h: "/clients" },
              { l: t("nav_contact"), h: "/contact" },
            ].map((n) => (
              <Link key={n.h} href={n.h} className="nav-water rounded-full px-4 py-2.5 text-[14px] font-bold text-black/70">
                <span className="nav-label">{n.l}</span>
              </Link>
            ))}
          </nav>

          <form onSubmit={search} className="ml-auto hidden min-w-0 flex-1 max-w-xs items-center xl:flex">
            <div className="flex w-full items-center gap-2 rounded-full border border-black/10 bg-[#f7f5ef] px-4 py-2.5 focus-within:border-[#0b3b39] focus-within:bg-white">
              <Search size={15} className="text-black/40" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("search_ph")} className="w-full bg-transparent text-sm outline-none" />
            </div>
          </form>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <span className="hidden rounded-full border border-black/10 px-1.5 py-1 md:block"><LanguageSwitcher /></span>
            <a href={`tel:${SITE.phone1.replace(/\s/g, "")}`} className="hidden h-11 items-center gap-1.5 rounded-full border border-black/10 px-4 text-[13px] font-extrabold hover:border-black md:inline-flex">
              <Phone size={14} /> {SITE.phone1.replace("+91 ", "")}
            </a>
            <button onClick={openCart} className="relative inline-flex h-11 items-center gap-2 rounded-full bg-[#0b3b39] px-5 text-sm font-bold text-white shadow-lg transition hover:bg-[#072928]">
              <ShoppingBag size={16} /> <span className="hidden sm:inline">{t("cart")}</span>
              {cartCount > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e8b62a] px-1.5 text-[11px] font-extrabold text-black">{cartCount}</span>}
            </button>
          </div>
        </div>

        {mobile && (
          <div className="border-t border-black/10 bg-white px-4 pb-6 lg:hidden">
            <form onSubmit={search} className="mt-3 flex items-center gap-2 rounded-full bg-[#f7f5ef] px-4 py-3">
              <Search size={17} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("search_ph")} className="w-full bg-transparent text-sm outline-none" />
            </form>
            {[...MEGA.map((m) => ({ l: m.title, h: m.href })), { l: t("nav_gallery"), h: "/gallery" }, { l: t("nav_reviews"), h: "/testimonials" }, { l: t("nav_contact"), h: "/contact" }].map((n) => (
              <Link key={n.h + n.l} href={n.h} onClick={() => setMobile(false)} className="flex items-center justify-between border-b border-black/[0.06] py-3.5 font-extrabold">
                {n.l} <span className="text-black/30">→</span>
              </Link>
            ))}
          </div>
        )}

        {/* mega panel — attached flush under the bar so hover never breaks */}
        {mega && (
          <div
            onMouseEnter={openMega}
            onMouseLeave={() => setMega(false)}
            className="fade-in absolute inset-x-0 top-full z-[80] hidden border-b border-black/10 bg-white shadow-[0_40px_80px_-20px_rgb(0_0_0/0.3)] lg:block"
          >
            <div className="mx-auto grid max-w-[1440px] grid-cols-3 gap-4 px-8 py-6">
              {MEGA.map((m) => (
                <Link key={m.title} href={m.href} onClick={() => setMega(false)} className="group overflow-hidden rounded-3xl border border-black/10 bg-[#f7f5ef] transition hover:-translate-y-1 hover:shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.img} alt={m.title} className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-105" />
                  <span className="block p-5">
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#0b3b39]">{m.price}</span>
                    <span className="mt-0.5 block text-xl font-extrabold tracking-tight">{m.title} →</span>
                    <span className="block text-sm text-stone-500">{m.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
            <div className="mx-auto flex max-w-[1440px] items-center justify-between px-8 pb-5">
              <p className="text-[13px] font-semibold text-stone-500">All prices include fitting in Pune · GST bill · pay after demo</p>
              <Link href="/products" onClick={() => setMega(false)} className="text-sm font-extrabold text-[#0b3b39] underline underline-offset-4">View all 24 systems →</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
