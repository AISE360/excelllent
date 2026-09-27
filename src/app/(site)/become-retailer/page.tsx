import EnquiryForm from "@/components/EnquiryForm";
import { getLang } from "@/lib/i18n";
import { tr } from "@/lib/strings";

export const metadata = { title: "Become a Retailer / Dealer" };

export default async function RetailerPage() {
  const lang = await getLang();
  const t = (k: Parameters<typeof tr>[1]) => tr(lang, k);
  return (
    <div className="mx-auto max-w-6xl px-4 pt-4">
      <p className="text-[12px] text-stone-500">Home ＞ Become a retailer</p>
      <h1 className="font-display mt-1 text-5xl font-bold">{t("ret_t")}</h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="text-[14px] leading-relaxed text-stone-600">
          <p>Sell Pune&apos;s most-installed dry system in your area. Dealer margin, demo kit, installation training & lead sharing.</p>
          <ul className="mt-4 list-disc pl-5">
            <li>Attractive dealer margins + volume slabs</li>
            <li>Display stand & catalogue support</li>
            <li>Installer training + service spares</li>
            <li>Lead overflow in your zone</li>
          </ul>
        </div>
        <div className="border border-stone-200 bg-stone-50 p-6">
          <p className="font-display text-3xl font-bold">Retailer enquiry.</p>
          <div className="mt-3"><EnquiryForm product="Retailer / Dealership" /></div>
        </div>
      </div>
    </div>
  );
}
