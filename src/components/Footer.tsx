import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { getLang } from "@/lib/i18n";
import { tr } from "@/lib/strings";
import { SITE } from "@/lib/site";

export default async function Footer() {
  const lang = await getLang();
  const t = (k: Parameters<typeof tr>[1]) => tr(lang, k);
  return (
    <footer className="grain relative mt-20 overflow-hidden bg-ink text-white">
      <div className="relative z-[2] mx-auto max-w-6xl px-4 pb-8 pt-14">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-brand-yellow">Excellent Dry System</p>
            <p className="font-display mt-2 max-w-xl leading-[0.9]" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
              Dry smart. <span className="font-accent font-normal text-brand-yellow">Save space.</span>
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-slide inline-flex items-center gap-2 rounded-full bg-brand-yellow px-7 py-3.5 text-sm font-bold text-ink transition hover:brightness-95"
          >
            {t("cta_quote")} <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid gap-10 py-10 text-sm md:grid-cols-4">
          <div>
            <p className="font-semibold uppercase tracking-wider text-white/40">{t("foot_shop")}</p>
            <ul className="mt-4 space-y-2.5 text-white/75">
              <li><Link className="transition hover:text-brand-yellow" href="/products?cat=Open Terrace">{t("nav_open")}</Link></li>
              <li><Link className="transition hover:text-brand-yellow" href="/products?cat=Ceiling Mount">{t("nav_ceiling")}</Link></li>
              <li><Link className="transition hover:text-brand-yellow" href="/products?cat=Wall Mount">{t("nav_fold")}</Link></li>
              <li><Link className="transition hover:text-brand-yellow" href="/products">{t("nav_all")}</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold uppercase tracking-wider text-white/40">{t("foot_service")}</p>
            <ul className="mt-4 space-y-2.5 text-white/75">
              <li><Link className="transition hover:text-brand-yellow" href="/about">{t("foot_about")}</Link></li>
              <li><Link className="transition hover:text-brand-yellow" href="/contact">{t("nav_contact")}</Link></li>
              <li><Link className="transition hover:text-brand-yellow" href="/become-retailer">{t("nav_retailer")}</Link></li>
              <li><Link className="transition hover:text-brand-yellow" href="/gallery">{t("nav_gallery")}</Link></li>
              <li><Link className="transition hover:text-brand-yellow" href="/testimonials">{t("nav_reviews")}</Link></li>
              <li><Link className="transition hover:text-brand-yellow" href="/clients">{t("nav_clients")}</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="font-semibold uppercase tracking-wider text-white/40">{t("foot_contact")}</p>
            <ul className="mt-4 space-y-3 text-white/75">
              <li className="flex gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0 text-brand-yellow" />{SITE.address}</li>
              <li>
                <a className="flex gap-2.5 font-bold text-white transition hover:text-brand-yellow" href={`tel:${SITE.phone1.replace(/\s/g, "")}`}>
                  <Phone size={16} className="mt-0.5 shrink-0 text-brand-yellow" />{SITE.phone1} · {SITE.phone2}
                </a>
              </li>
              <li className="flex gap-2.5"><Mail size={16} className="mt-0.5 shrink-0 text-brand-yellow" />{SITE.email}</li>
            </ul>
            <p className="mt-5 max-w-md text-[13px] leading-relaxed text-white/45">{t("foot_tag")}</p>
          </div>
        </div>

        <p className="font-display select-none text-center leading-none text-white/[0.07]" style={{ fontSize: "clamp(4rem, 15vw, 13rem)" }}>
          excellentdry
        </p>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-5 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Excellent Dry System, Pune.</p>
          <Link href="/admin" className="transition hover:text-white">Admin login →</Link>
        </div>
      </div>
    </footer>
  );
}
