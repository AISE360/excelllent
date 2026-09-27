import EnquiryForm from "@/components/EnquiryForm";
import { SITE } from "@/lib/site";

export const metadata = { title: "Contact: Free Quote and Site Visit" };

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; area?: string }>;
}) {
  const { product = "", area = "" } = await searchParams;
  return (
    <div className="mx-auto max-w-6xl px-4 pt-4">
      <p className="text-[12px] text-stone-500">Home ＞ Contact</p>
      <h1 className="font-display mt-1 text-5xl font-bold">Contact.</h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <a href={`tel:${SITE.phone1.replace(/\s/g, "")}`} className="block border border-stone-200 p-5">
            <p className="text-xs font-bold uppercase text-stone-400">Call us</p>
            <p className="font-display text-3xl font-bold">{SITE.phone1}</p>
            <p className="text-sm text-stone-500">{SITE.phone2} · {SITE.hours}</p>
          </a>
          <div className="border border-stone-200 p-5 text-sm leading-relaxed text-stone-600">
            <p className="text-xs font-bold uppercase text-stone-400">Visit</p>
            <p className="mt-1">{SITE.address}<br />{SITE.email}</p>
          </div>
          <iframe
            title="Excellent Dry System map"
            src="https://www.google.com/maps?q=Akurdi,Pune&output=embed"
            className="h-56 w-full border border-stone-200"
            loading="lazy"
          />
        </div>
        <div className="h-fit border border-stone-200 bg-stone-50 p-6">
          <p className="font-display text-3xl font-bold">Request callback.</p>
          <div className="mt-4"><EnquiryForm product={product} /></div>
          {area && <p className="mt-3 text-xs text-stone-400">Area: {area}</p>}
        </div>
      </div>
    </div>
  );
}
