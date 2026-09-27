export const metadata = { title: "About — Manufacturer Since 2014" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-pine-600">About us</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-pine-950 sm:text-4xl">
        Pune&apos;s own dry-system manufacturer
      </h1>
      <div className="prose-stone mt-6 space-y-4 text-[15px] leading-relaxed text-stone-600">
        <p>
          Excellent Clothes Dry Pulley System started in Akurdi, Pune in 2014 with one
          belief — drying clothes should not eat up your balcony. Today 1,00,000+
          homes, hostels, hospitals and defence quarters dry on our pulley systems.
        </p>
        <p>
          We manufacture open-terrace pulley frames, ceiling-mount indoor systems and
          foldable 304-grade wall stands — with UV-grade rope, smooth-glide pulleys
          and installer teams that finish most fittings in 60–90 minutes.
        </p>
        <ul className="list-disc pl-5">
          <li>Factory-direct pricing, GST invoice</li>
          <li>Same-week installation across Pune & PCMC</li>
          <li>Service & spare support on call</li>
          <li>Retailer & builder partnerships welcome</li>
        </ul>
      </div>
    </div>
  );
}
