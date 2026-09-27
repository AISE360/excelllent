import Link from "next/link";
import { getLang } from "@/lib/i18n";
import { tr } from "@/lib/strings";
import { SITE } from "@/lib/site";

export default async function Footer() {
  const lang = await getLang();
  const t = (k: Parameters<typeof tr>[1]) => tr(lang, k);
  return (
    <footer className="mt-16 border-t border-stone-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 text-sm md:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-bold">excellent<span className="text-brand-red">dry</span></p>
          <p className="mt-3 leading-relaxed text-stone-500">{t("foot_tag")}</p>
        </div>
        <div>
          <p className="font-semibold">{t("foot_shop")}</p>
          <ul className="mt-3 space-y-2 text-stone-500">
            <li><Link className="hover:text-ink" href="/products?cat=Open Terrace">{t("nav_open")}</Link></li>
            <li><Link className="hover:text-ink" href="/products?cat=Ceiling Mount">{t("nav_ceiling")}</Link></li>
            <li><Link className="hover:text-ink" href="/products?cat=Wall Mount">{t("nav_fold")}</Link></li>
            <li><Link className="hover:text-ink" href="/products">{t("nav_all")}</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">{t("foot_service")}</p>
          <ul className="mt-3 space-y-2 text-stone-500">
            <li><Link className="hover:text-ink" href="/about">{t("foot_about")}</Link></li>
            <li><Link className="hover:text-ink" href="/contact">{t("nav_contact")}</Link></li>
            <li><Link className="hover:text-ink" href="/become-retailer">{t("nav_retailer")}</Link></li>
            <li><Link className="hover:text-ink" href="/gallery">{t("nav_gallery")}</Link></li>
            <li><Link className="hover:text-ink" href="/testimonials">{t("nav_reviews")}</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">{t("foot_contact")}</p>
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
