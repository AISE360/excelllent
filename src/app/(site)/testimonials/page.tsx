import Link from "next/link";
import { ArrowRight, BadgeCheck, Star } from "lucide-react";
import { getLang } from "@/lib/i18n";
import { tr } from "@/lib/strings";
import { TESTIMONIALS } from "@/lib/site";

export const metadata = { title: "Customer Reviews" };

const EXTRA = [
  { name: "Sneha Kulkarni", area: "Hinjewadi, Pune", text: "Balcony finally looks like a balcony, not a laundry godown. Fitting took an hour, team even cleaned the drilling dust." },
  { name: "Rahul Deshmukh", area: "Kharadi, Pune", text: "Compared Bathla online and two local shops. Excellent Dry was the only one who measured first and gave a written price. Worth it." },
  { name: "Farah Sheikh", area: "Kondhwa, Pune", text: "Heavy jeans and bedsheets go up with one pull. My mother operates it easily at 62. Very sturdy pipes." },
  { name: "Vikram Patil", area: "Pimpri, Pune", text: "Second flat, second system from them. First one is 6 years old and still glides. Rope changed once, doorstep service." },
  { name: "Meera Nair", area: "Viman Nagar, Pune", text: "Society group order for 11 flats. One supervisor, two days, zero complaints. Billing with GST for our records." },
  { name: "Suresh Iyer", area: "Aundh, Pune", text: "Was using floor stands for years. Should have switched earlier. Drying is faster near the ceiling and the floor is free." },
];

const BARS = [
  ["5", 94],
  ["4", 5],
  ["3", 1],
] as const;

function Initials({ name, dark = false }: { name: string; dark?: boolean }) {
  const ch = name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${dark ? "bg-[#d9232e] text-white" : "bg-[#173063] text-white"}`}>
      {ch}
    </span>
  );
}

export default async function TestimonialsPage() {
  const lang = await getLang();
  const t = (k: Parameters<typeof tr>[1]) => tr(lang, k);
  const [featured, ...rest] = [...TESTIMONIALS, ...EXTRA];

  return (
    <>
      {/* light header with rating summary */}
      <div className="border-b border-black/10 bg-[#f4f7fd] text-[#101d33]">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 pb-12 pt-8 md:px-8 md:pb-16 md:pt-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-[12px] font-bold text-black/45">
              <Link href="/" className="hover:text-black">{t("home")}</Link> <span className="mx-1">/</span> Reviews
            </p>
            <p className="eyebrow mt-4">Wall of love</p>
            <h1 className="mega-type mt-3 text-[clamp(2.6rem,6vw,5rem)]">{t("testi_t")}</h1>
            <p className="mt-4 max-w-xl text-[15px] font-medium leading-relaxed text-black/55">
              1,00,000+ Pune installations since 2014. Unedited words from balconies we fitted this year.
            </p>
            <Link href="/contact" className="btn-slide mt-6 inline-flex items-center gap-2 rounded-full bg-[#173063] px-7 py-3.5 text-sm font-extrabold text-white">
              Join them — free site visit <ArrowRight size={15} />
            </Link>
          </div>
          <div className="rounded-[1.75rem] border border-black/10 bg-white p-7 md:p-8">
            <p className="flex items-end gap-2">
              <span className="mega-type text-6xl">4.8</span>
              <span className="pb-1.5 text-sm font-bold text-black/45">/ 5 · 80,000+ reviews</span>
            </p>
            <p className="mt-1 flex gap-1 text-[#b98a1f]">
              <Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" />
            </p>
            <div className="mt-5 space-y-2">
              {BARS.map(([s, pct]) => (
                <p key={s} className="flex items-center gap-3 text-[13px] font-bold text-black/60">
                  <span className="w-6">{s}★</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-black/10">
                    <span className="block h-full rounded-full bg-[#173063]" style={{ width: `${pct}%` }} />
                  </span>
                  <span className="w-9 text-right">{pct}%</span>
                </p>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-1.5 text-[12px] font-bold text-black/45"><BadgeCheck size={14} className="text-[#173063]" /> Verified Pune installations only</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
        {/* featured */}
        <figure className="overflow-hidden rounded-[2rem] border border-[#173063]/25 bg-[#e3e9f6] p-8 md:p-12">
          <p className="flex gap-1 text-[#b98a1f]">
            <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
          </p>
          <blockquote className="mt-4 max-w-3xl text-2xl font-extrabold leading-snug tracking-tight text-[#101d33] md:text-[2rem]">“{featured.text}”</blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            <Initials name={featured.name} dark />
            <span><strong className="block">{featured.name}</strong><span className="text-sm text-black/55">{featured.area}</span></span>
          </figcaption>
        </figure>

        {/* grid */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((r) => (
            <figure key={r.name} className="lift flex h-full flex-col rounded-[1.5rem] border border-black/10 bg-white p-6">
              <p className="flex gap-0.5 text-[#b98a1f]">
                <Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" />
              </p>
              <blockquote className="mt-3 flex-1 text-[15px] font-semibold leading-relaxed text-black/75">“{r.text}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-3 border-t border-black/[0.07] pt-4">
                <Initials name={r.name} />
                <span><strong className="block text-sm">{r.name}</strong><span className="text-[13px] text-stone-400">{r.area}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[1.75rem] border border-black/10 bg-white p-8 md:flex-row md:p-10">
          <p className="mega-type text-[clamp(1.6rem,3.5vw,2.6rem)]">Fitted once. Loved for years.</p>
          <Link href="/products" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#173063] px-7 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#0c1c3d]">
            Shop bestsellers <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </>
  );
}
