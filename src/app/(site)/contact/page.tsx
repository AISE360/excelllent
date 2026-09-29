import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";
import { getLang } from "@/lib/i18n";
import { tr } from "@/lib/strings";
import { SITE, DELIVERY_AREAS } from "@/lib/site";

export const metadata = { title: "Contact: Free Quote and Site Visit" };

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; area?: string }>;
}) {
  const { product = "", area = "" } = await searchParams;
  const lang = await getLang();
  const t = (k: Parameters<typeof tr>[1]) => tr(lang, k);
  const waGeneral = `https://wa.me/${SITE.phoneRaw1}?text=${encodeURIComponent("Hi Excellent Dry! I need a drying system. Please call me back.")}`;

  return (
    <>
      {/* dark header */}
      <div className="bg-[#051e1d] text-white">
        <div className="mx-auto max-w-[1440px] px-4 pb-12 pt-8 md:px-8 md:pb-16 md:pt-12">
          <p className="text-[12px] font-bold text-white/45">
            <Link href="/" className="hover:text-white">{t("home")}</Link> <span className="mx-1">/</span> {t("nav_contact")}
          </p>
          <p className="eyebrow mt-4 !text-[#e8b62a]">Replies in minutes · 10am–6pm</p>
          <h1 className="mega-type mt-3 text-[clamp(2.6rem,6vw,5rem)]">Talk to a fitter,<br />not a call center.</h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
            Call, WhatsApp, or drop your number. A real installer confirms price and slot. {area && <span className="font-bold text-[#e8b62a]">Showing slot info for {area}.</span>}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={`tel:${SITE.phone1.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full bg-[#e8b62a] px-7 py-3.5 text-sm font-extrabold text-black transition hover:brightness-95">
              <Phone size={15} /> {SITE.phone1}
            </a>
            <a href={waGeneral} target="_blank" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-extrabold text-white transition hover:brightness-95">
              <MessageCircle size={15} /> WhatsApp us
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          {/* visit + map */}
          <div className="overflow-hidden rounded-[1.75rem] border border-black/10 bg-white">
            <div className="p-7 md:p-8">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0b3b39]">{t("contact_visit")}</p>
              <p className="mt-2 flex items-start gap-2.5 text-[15px] font-bold leading-relaxed">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[#0b3b39]" />{SITE.address}
              </p>
              <p className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-sm font-semibold text-stone-500">
                <span className="inline-flex items-center gap-1.5"><Mail size={14} />{SITE.email}</span>
                <span className="inline-flex items-center gap-1.5"><Clock size={14} />{SITE.hours}</span>
              </p>
            </div>
            <iframe
              title="Excellent Dry System map"
              src="https://www.google.com/maps?q=Akurdi,Pune&output=embed"
              className="h-72 w-full border-t border-black/10"
              loading="lazy"
            />
          </div>

          {/* callback form */}
          <div className="h-fit rounded-[1.75rem] bg-[#072928] p-7 text-white md:p-8 lg:sticky lg:top-32">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#e8b62a]">Free callback</p>
            <p className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">{t("contact_cb")}</p>
            <p className="mt-1.5 text-sm text-white/60">
              {product ? <>Interested in: <strong className="text-white">{product}</strong></> : "Tell us your area and balcony size."} No advance, no spam.
            </p>
            <div className="mt-5 rounded-2xl bg-white p-4 text-black md:p-5">
              <EnquiryForm product={product} area={area} />
            </div>
            <p className="mt-3 text-center text-[13px] font-bold text-white/60">
              {t("form_orcall")} <a href={`tel:${SITE.phone1.replace(/\s/g, "")}`} className="text-[#e8b62a]">{SITE.phone1}</a> · {SITE.phone2}
            </p>
          </div>
        </div>

        {/* areas */}
        <div className="mt-10 rounded-[1.75rem] border border-black/10 bg-white p-7 md:p-9">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0b3b39]">{t("delivery_t")} · free site visit</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {DELIVERY_AREAS.slice(0, 36).map((a) => (
              <Link
                key={a}
                href={`/contact?area=${encodeURIComponent(a)}`}
                className={`rounded-md px-3 py-1.5 text-[13px] font-bold transition ${area === a ? "bg-[#0b3b39] text-white" : "bg-[#f1efe7] text-black/65 hover:bg-[#0b3b39] hover:text-white"}`}
              >
                {a}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
