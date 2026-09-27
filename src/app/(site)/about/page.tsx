export const metadata = { title: "About — Manufacturer Since 2014" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-4">
      <p className="text-[12px] text-stone-500">Home ＞ About us</p>
      <h1 className="font-display mt-1 max-w-2xl text-5xl font-bold leading-[0.95]">Pune&apos;s own drying-system maker.</h1>
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/legacy/hero-2.png" alt="Excellent Dry systems" className="w-full object-cover" />
        <div className="space-y-4 text-[14px] leading-relaxed text-stone-600">
          <p>
            Excellent Clothes Dry Pulley System started in Akurdi, Pune in 2014 with one
            belief — drying clothes should not eat up your balcony. Today 1,00,000+
            homes, hostels, hospitals and defence quarters dry on our pulley systems.
          </p>
          <p>
            We manufacture open-terrace pulley frames, ceiling-mount indoor systems and
            foldable 304-grade wall stands — UV-grade rope, smooth-glide pulleys and
            installer teams that finish most fittings in 60–90 minutes.
          </p>
          <ul className="list-disc pl-5">
            <li>Factory-direct pricing, GST invoice</li>
            <li>Same-week installation across Pune & PCMC</li>
            <li>Service & spare support on call</li>
            <li>Retailer & builder partnerships welcome</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
