import { TESTIMONIALS } from "@/lib/site";

export const metadata = { title: "Customer Reviews" };

export default function TestimonialsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-pine-950 sm:text-4xl">Customer reviews</h1>
      <p className="mt-2 text-stone-500">4.8★ average across 80,000+ feedbacks.</p>
      <div className="mt-7 grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="rounded-2xl border border-stone-200 bg-white p-6">
            <p className="text-amber-500">★★★★★</p>
            <blockquote className="mt-2 text-sm leading-relaxed text-stone-600">“{t.text}”</blockquote>
            <figcaption className="mt-4 text-sm font-bold text-pine-900">{t.name} <span className="font-normal text-stone-400">· {t.area}</span></figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
