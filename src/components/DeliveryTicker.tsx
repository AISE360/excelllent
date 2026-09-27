"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { DELIVERY_AREAS } from "@/lib/site";
import { useT } from "@/components/LanguageSwitcher";

export default function DeliveryTicker() {
  const t = useT();
  const areas = [...DELIVERY_AREAS, ...DELIVERY_AREAS];
  return (
    <div className="flex items-stretch bg-pine-deep text-cream">
      <span className="z-10 flex shrink-0 items-center gap-2 bg-brand-yellow px-4 py-2.5 text-[13px] font-bold uppercase tracking-wide text-ink">
        <MapPin size={15} /> {t("delivery_t")}
      </span>
      <div className="marquee marquee-mask relative flex-1 overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-8 py-2.5 pr-8 text-[13px]">
          {areas.map((a, i) => (
            <Link
              key={i}
              href={`/contact?area=${encodeURIComponent(a)}`}
              className="whitespace-nowrap text-white/85 transition hover:text-brand-yellow"
            >
              {a} <span className="ml-6 text-brand-yellow">•</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
