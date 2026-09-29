import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { getLang } from "@/lib/i18n";
import { tr } from "@/lib/strings";
import { SITE } from "@/lib/site";

export default async function Footer() {
  const lang = await getLang();
  const t = (k: Parameters<typeof tr>[1]) => tr(lang, k);
  return (
    <footer className="mt-24 bg-[#071026] text-white">
      {/* full-bleed CTA */}
      <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-8 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow !text-[#d9232e]">Excellent Dry · Pune · Since 2014</p>
            <p className="mega-type mt-4 text-[clamp(2.8rem,6vw,5.5rem)]">
              Reclaim your<br />balcony<span className="text-[#d9232e]">.</span>
            </p>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/65">
              Pulley terrace, ceiling and foldable wall systems in 304-grade steel. Measured, fitted and serviced by our own Pune team. Not a courier box.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/12 bg-white/[0.06] p-6 backdrop-blur md:p-8">
            <p className="text-lg font-extrabold">Free site visit this week</p>
            <p className="mt-1 text-sm text-white/60">Baner · Wakad · Hinjewadi · Kothrud · Kharadi · Hadapsar + 40 areas</p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <Link href="/contact" className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#d9232e] px-6 py-3.5 text-sm font-extrabold text-white hover:brightness-95">
                {t("cta_quote")} <ArrowUpRight size={16} />
              </Link>
              <a href={`tel:${SITE.phone1.replace(/\s/g, "")}`} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold hover:bg-white/10">
                <Phone size={15} /> {SITE.phone1}
              </a>
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-[12px] text-white/50"><Clock size={13} /> {SITE.hours} · Replies in minutes</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 text-sm md:grid-cols-4 md:px-8">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/40">Systems</p>
            <ul className="mt-4 space-y-2.5 text-[15px] font-bold">
              <li><Link className="hover:text-[#d9232e]" href="/products?cat=Open Terrace">Open Terrace Pulley →</Link></li>
              <li><Link className="hover:text-[#d9232e]" href="/products?cat=Ceiling Mount">Ceiling Pulley →</Link></li>
              <li><Link className="hover:text-[#d9232e]" href="/products?cat=Wall Mount">Foldable Wall →</Link></li>
              <li><Link className="hover:text-[#d9232e]" href="/products">Compare all 24 →</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/40">Company</p>
            <ul className="mt-4 space-y-2.5 font-semibold text-white/75">
              <li><Link className="hover:text-white" href="/about">{t("foot_about")}</Link></li>
              <li><Link className="hover:text-white" href="/gallery">{t("nav_gallery")}</Link></li>
              <li><Link className="hover:text-white" href="/testimonials">{t("nav_reviews")}</Link></li>
              <li><Link className="hover:text-white" href="/clients">{t("nav_clients")}</Link></li>
              <li><Link className="hover:text-white" href="/become-retailer">{t("nav_retailer")}</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/40">Contact</p>
            <ul className="mt-4 space-y-3 text-white/75">
              <li className="flex gap-2"><MapPin size={15} className="mt-0.5 shrink-0 text-[#d9232e]" />{SITE.address}</li>
              <li className="flex gap-2 font-bold text-white"><Phone size={15} className="mt-0.5 shrink-0 text-[#d9232e]" />{SITE.phone1} · {SITE.phone2}</li>
              <li className="flex gap-2"><Mail size={15} className="mt-0.5 shrink-0 text-[#d9232e]" />{SITE.email}</li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/40">Why us</p>
            <ul className="mt-4 space-y-2 text-white/65">
              <li>✓ Manufacturer, not reseller</li>
              <li>✓ Installation included, GST bill</li>
              <li>✓ 1,00,000+ Pune fittings</li>
              <li>✓ Serviceable rope + pulleys</li>
            </ul>
            <Link href="/contact" className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-[13px] font-extrabold text-black hover:bg-[#d9232e] hover:text-white">Get price on WhatsApp</Link>
          </div>
        </div>
      </div>

      {/* giant logo */}
      <div className="relative overflow-hidden border-t border-white/10">
        <div className="mx-auto w-[min(1100px,92vw)] py-8 md:py-10">
          <div className="rounded-[2rem] bg-white px-6 py-8 shadow-2xl md:px-12 md:py-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/legacy/logo.png"
              alt="Excellent Dry, Clothes Drying System"
              className="mx-auto w-full select-none"
              draggable={false}
            />
          </div>
        </div>
        {/* black shadow from bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black via-black/75 to-transparent" />
        <div className="relative mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-2 px-4 pb-6 text-[12px] text-white/40 sm:flex-row md:px-8">
          <p>© {new Date().getFullYear()} Excellent Dry System, Pune.</p>
          <p>Pulley drying systems · Designed for Indian homes</p>
        </div>
      </div>
    </footer>
  );
}
