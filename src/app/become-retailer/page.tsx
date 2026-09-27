import EnquiryForm from "@/components/EnquiryForm";

export const metadata = { title: "Become a Retailer / Dealer" };

export default function RetailerPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-2">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-pine-950 sm:text-4xl">Become a retailer</h1>
        <p className="mt-3 text-stone-600">Sell Pune&apos;s most-installed dry system in your area. Dealer margin, demo kit, installation training & lead sharing.</p>
        <ul className="mt-5 space-y-2 text-sm text-stone-600">
          <li>✓ Attractive dealer margins + volume slabs</li>
          <li>✓ Display stand & catalogue support</li>
          <li>✓ Installer training + service spares</li>
          <li>✓ Google & Justdial lead overflow in your zone</li>
        </ul>
      </div>
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
        <h2 className="text-lg font-extrabold text-pine-950">Retailer enquiry</h2>
        <div className="mt-3"><EnquiryForm product="Retailer / Dealership" /></div>
      </div>
    </div>
  );
}
