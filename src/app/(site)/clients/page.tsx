import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, Landmark, BedDouble, ShieldCheck } from "lucide-react";
import { GOVT_CLIENTS, HOSTEL_CLIENTS, RESIDENTIAL_CLIENTS } from "@/lib/site";
import { getLang } from "@/lib/i18n";
import { tr } from "@/lib/strings";

export const metadata = { title: "Our Valuable Clients" };

const LOGOS = [1, 2, 3, 4, 5];

export default async function ClientsPage() {
  const lang = await getLang();
  const t = (k: Parameters<typeof tr>[1]) => tr(lang, k);
  const societies = RESIDENTIAL_CLIENTS.reduce((n, g) => n + g.societies.length, 0);

  return (
    <>
      {/* dark premium header */}
      <div className="bg-[#051e1d] text-white">
        <div className="mx-auto max-w-[1440px] px-4 pb-12 pt-8 md:px-8 md:pb-16 md:pt-12">
          <p className="text-[12px] font-bold text-white/45">
            <Link href="/" className="hover:text-white">{t("home")}</Link> <span className="mx-1">/</span> {t("nav_clients")}
          </p>
          <p className="eyebrow mt-4 !text-[#e8b62a]">Trusted across Pune · since 2014</p>
          <h1 className="mega-type mt-3 text-[clamp(2.6rem,6vw,5rem)]">{t("cli_t")}</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/65">
            {societies}+ housing societies, government institutions and hostels dry on Excellent Dry systems. When a whole building orders together, everyone gets priority slots and a society rate.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3 md:max-w-2xl">
            {[
              [String(societies), "Societies"],
              [String(RESIDENTIAL_CLIENTS.length), "Areas covered"],
              [`${GOVT_CLIENTS.length + HOSTEL_CLIENTS.length}`, "Institutions"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-center backdrop-blur md:p-5">
                <p className="text-2xl font-extrabold tracking-tight text-[#e8b62a] md:text-4xl">{v}</p>
                <p className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/55">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* logo marquee */}
      <div className="border-b border-black/[0.07] bg-white py-8">
        <div className="marquee marquee-mask overflow-hidden">
          <div className="marquee-track flex w-max shrink-0 items-center gap-5 pr-5">
            {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((n, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={`/legacy/clients/client${n}.jpg`}
                alt={`Client ${n}`}
                loading="lazy"
                className="h-20 w-auto shrink-0 rounded-2xl border border-black/10 bg-white object-contain px-4 grayscale-[40%] transition hover:grayscale-0 md:h-24"
              />
            ))}
          </div>
        </div>
      </div>

      {/* residential areas */}
      <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="flex items-center gap-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            <span className="flex items-center justify-center rounded-2xl bg-[#0b3b39] p-2.5 text-white"><Building2 size={22} /></span>
            {t("cli_res")}
          </h2>
          <Link href="/contact" className="btn-slide inline-flex items-center gap-1.5 text-sm font-extrabold text-[#0b3b39]">Get a society quote <ArrowRight size={15} /></Link>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {RESIDENTIAL_CLIENTS.map((g, gi) => (
            <div key={g.area} className={`lift overflow-hidden rounded-[1.5rem] border border-black/10 ${gi % 4 === 0 ? "bg-[#072928] text-white md:col-span-2" : "bg-white"}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 px-6 pt-5">
                <p className="text-xl font-extrabold tracking-tight md:text-2xl">{g.area}</p>
                <p className={`text-[12px] font-extrabold uppercase tracking-[0.16em] ${gi % 4 === 0 ? "text-[#e8b62a]" : "text-[#0b3b39]"}`}>{g.societies.length} societies</p>
              </div>
              <div className="flex flex-wrap gap-2 p-6 pt-4">
                {g.societies.map((s) => (
                  <span
                    key={s}
                    className={`rounded-md px-3 py-1.5 text-[13px] font-bold transition ${gi % 4 === 0 ? "bg-white/10 text-white/85 hover:bg-[#e8b62a] hover:text-black" : "bg-[#f1efe7] text-black/70 hover:bg-[#0b3b39] hover:text-white"}`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* govt + hostels */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.5rem] bg-black p-7 text-white md:p-8">
            <p className="flex items-center gap-2.5 text-xl font-extrabold"><Landmark size={22} className="text-[#e8b62a]" /> {t("cli_govt")}</p>
            <ul className="mt-4 space-y-2.5">
              {GOVT_CLIENTS.map((c) => (
                <li key={c} className="flex items-center gap-2.5 rounded-xl bg-white/[0.06] px-4 py-3 text-sm font-bold text-white/85">
                  <ShieldCheck size={15} className="shrink-0 text-[#e8b62a]" />{c}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.5rem] border border-black/10 bg-white p-7 md:p-8">
            <p className="flex items-center gap-2.5 text-xl font-extrabold"><BedDouble size={22} className="text-[#0b3b39]" /> {t("cli_hostels")}</p>
            <ul className="mt-4 space-y-2.5">
              {HOSTEL_CLIENTS.map((c) => (
                <li key={c} className="flex items-center gap-2.5 rounded-xl bg-[#f1efe7] px-4 py-3 text-sm font-bold text-black/75">
                  <ShieldCheck size={15} className="shrink-0 text-[#0b3b39]" />{c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="relative mt-8 overflow-hidden rounded-[2rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/legacy/hero-2.png" alt="Society installations" className="absolute inset-0 h-full w-full object-cover" />
          <span className="absolute inset-0 bg-[#072928]/90" />
          <div className="relative flex flex-col items-start gap-5 p-8 text-white md:flex-row md:items-center md:justify-between md:p-12">
            <div>
              <p className="mega-type text-[clamp(1.8rem,4vw,3rem)]">Your society next?</p>
              <p className="mt-1.5 max-w-md text-sm text-white/65">Bulk fitting days, one supervisor per building, society billing with GST.</p>
            </div>
            <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#e8b62a] px-7 py-4 text-sm font-extrabold text-black transition hover:brightness-95">
              {t("cta_quote")} <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
