import Link from "next/link";
import { TESTIMONIALS } from "@/lib/site";

export const metadata = { title: "Customer Reviews" };

export default function TestimonialsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-4">
      <p className="text-[12px] text-stone-500">Home ＞ Reviews</p>
      <h1 className="font-display mt-1 text-5xl font-bold">Rated 4.8/5.</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="border border-stone-200 p-5">
            <p className="text-amber-500 text-sm">★★★★★</p>
            <blockquote className="mt-2 text-sm leading-relaxed text-stone-600">“{t.text}”</blockquote>
            <figcaption className="mt-3 text-sm font-semibold">{t.name} <span className="font-normal text-stone-400">· {t.area}</span></figcaption>
          </figure>
        ))}
      </div>
      <Link href="/contact" className="mt-6 inline-block rounded bg-ink px-6 py-2.5 text-sm font-semibold text-white">Get a free quote →</Link>
    </div>
  );
}
