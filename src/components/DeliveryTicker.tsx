"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { DELIVERY_AREAS } from "@/lib/site";
import { useT } from "@/components/LanguageSwitcher";

export default function DeliveryTicker() {
  const t = useT();
  const areas = [...DELIVERY_AREAS, ...DELIVERY_AREAS, ...DELIVERY_AREAS, ...DELIVERY_AREAS];
  return (
    <div className="flex items-stretch border-y border-black/[0.07] bg-white">
      <span className="z-10 flex shrink-0 items-center gap-2 bg-[#0b3b39] px-4 py-2.5 text-[12px] font-extrabold uppercase tracking-wider text-white">
        <MapPin size={14} /> {t("delivery_t")}
      </span>
      <div className="marquee marquee-mask relative flex-1 overflow-hidden">
        <div className="marquee-track flex w-max shrink-0 items-center gap-8 py-2.5 pr-8 text-[13px] font-semibold text-stone-500">
          {areas.map((a, i) => (
            <Link
              key={i}
              href={`/contact?area=${encodeURIComponent(a)}`}
              className="shrink-0 whitespace-nowrap transition hover:text-[#0b3b39]"
            >
              {a} <span className="ml-6 text-[#b98a1f]">•</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
