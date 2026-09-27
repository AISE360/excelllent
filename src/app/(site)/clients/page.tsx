import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Landmark, BedDouble, ArrowRight } from "lucide-react";
import { GOVT_CLIENTS, HOSTEL_CLIENTS, RESIDENTIAL_CLIENTS } from "@/lib/site";
import { getLang } from "@/lib/i18n";
import { tr } from "@/lib/strings";

export const metadata = { title: "Our Valuable Clients" };

export default async function ClientsPage() {
  const lang = await getLang();
  const t = (k: Parameters<typeof tr>[1]) => tr(lang, k);
  const total = RESIDENTIAL_CLIENTS.reduce((n, g) => n + g.societies.length, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4">
      <p className="text-[12px] text-stone-500">
        <Link href="/" className="hover:underline">{t("home")}</Link> ＞ {t("nav_clients")}
      </p>
      <h1 className="font-display mt-1 text-5xl font-bold md:text-6xl">{t("cli_t")}</h1>
      <p className="mt-2 max-w-2xl text-[14px] text-stone-500">
        {total}+ housing societies, government institutions and hostels across Pune dry on Excellent Dry systems.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          [String(RESIDENTIAL_CLIENTS.length), t("cli_res")],
          [String(GOVT_CLIENTS.length), t("cli_govt")],
          [String(HOSTEL_CLIENTS.length), t("cli_hostels")],
        ].map(([v, l]) => (
          <div key={l} className="bg-ink p-5 text-center text-white">
            <p className="font-display text-4xl font-bold text-brand-yellow">{v}</p>
            <p className="mt-1 text-[12px] uppercase tracking-wider text-white/70">{l}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display mt-10 flex items-center gap-2 text-3xl font-bold">
        <Building2 size={24} /> {t("cli_res")}
      </h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {RESIDENTIAL_CLIENTS.map((g) => (
          <div key={g.area} className="lift border border-stone-200 bg-white">
            <p className="border-b border-stone-200 bg-stone-50 px-4 py-3 text-[15px] font-bold">{g.area}</p>
            <div className="flex flex-wrap gap-1.5 p-4">
              {g.societies.map((s) => (
                <span key={s} className="bg-card px-2.5 py-1 text-[12px] text-stone-600">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="border border-stone-200 bg-white p-5">
          <h2 className="font-display flex items-center gap-2 text-3xl font-bold">
            <Landmark size={22} /> {t("cli_govt")}
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-stone-600">
            {GOVT_CLIENTS.map((c) => <li key={c} className="flex gap-2"><ArrowRight size={15} className="mt-0.5 shrink-0 text-brand-red" />{c}</li>)}
          </ul>
        </div>
        <div className="border border-stone-200 bg-white p-5">
          <h2 className="font-display flex items-center gap-2 text-3xl font-bold">
            <BedDouble size={22} /> {t("cli_hostels")}
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-stone-600">
            {HOSTEL_CLIENTS.map((c) => <li key={c} className="flex gap-2"><ArrowRight size={15} className="mt-0.5 shrink-0 text-brand-red" />{c}</li>)}
          </ul>
        </div>
      </div>

      <div className="mt-8 bg-brand-cyan p-8 text-center text-white">
        <p className="font-display text-3xl font-bold md:text-4xl">Your society next?</p>
        <Link href="/contact" className="mt-4 inline-block rounded-md bg-brand-yellow px-6 py-3 text-sm font-bold text-ink">
          {t("cta_quote")} →
        </Link>
      </div>
    </div>
  );
}
