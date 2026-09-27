import EnquiryForm from "@/components/EnquiryForm";
import { SITE } from "@/lib/site";

export const metadata = { title: "Contact — Free Quote & Site Visit" };

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; area?: string }>;
}) {
  const { product = "", area = "" } = await searchParams;
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-2">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-pine-950 sm:text-4xl">Get your free quote</h1>
        <p className="mt-2 text-stone-500">Call, WhatsApp or send the form — we reply within working hours.</p>
        <div className="mt-6 space-y-3">
          <a href={`tel:${SITE.phone1.replace(/\s/g, "")}`} className="block rounded-2xl border border-stone-200 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Call us</p>
            <p className="text-xl font-extrabold text-pine-900">{SITE.phone1}</p>
            <p className="text-sm text-stone-500">{SITE.phone2} · {SITE.hours}</p>
          </a>
          <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Visit</p>
            <p className="mt-1 text-sm leading-relaxed text-stone-600">{SITE.address}<br />{SITE.email}</p>
          </div>
          <iframe
            title="Excellent Dry System map"
            src="https://www.google.com/maps?q=Akurdi,Pune&output=embed"
            className="h-56 w-full rounded-2xl border border-stone-200"
            loading="lazy"
          />
        </div>
      </div>
      <div className="h-fit rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-pine-950">Request callback</h2>
        <div className="mt-4">
          <EnquiryForm product={product} />
        </div>
        {area && <p className="mt-3 text-xs text-stone-400">Area pre-filled: {area}</p>}
      </div>
    </div>
  );
}
