"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { SITE } from "@/lib/site";

export default function EnquiryForm({ product = "" }: { product?: string }) {
  const [form, setForm] = useState({ name: "", phone: "", area: "", product, message: "" });
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const sb = supabaseBrowser();
        await sb.from("leads").insert({
          name: form.name,
          phone: form.phone,
          area: form.area,
          product: form.product,
          message: form.message,
        });
      }
    } catch {
      /* fall through — still show success + WhatsApp fallback */
    }
    setBusy(false);
    setDone(true);
  }

  if (done) {
    const wa = `https://wa.me/${SITE.phoneRaw1}?text=${encodeURIComponent(
      `Hi Excellent Dry! I'm ${form.name} from ${form.area}. Interested in: ${form.product || "dry system"}. Please call ${form.phone}.`
    )}`;
    return (
      <div className="rounded-2xl border border-teal-200 bg-teal-50 p-6 text-center">
        <p className="text-lg font-bold text-pine-900">Thank you, {form.name.split(" ")[0] || "friend"}! 🙏</p>
        <p className="mt-1 text-sm text-stone-600">
          We&apos;ll call you back within a few working hours ({SITE.hours}).
        </p>
        <a
          href={wa}
          target="_blank"
          className="mt-4 inline-block rounded-xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white"
        >
          Confirm instantly on WhatsApp
        </a>
      </div>
    );
  }

  const inp =
    "w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-pine-600 focus:ring-2 focus:ring-pine-600/20";
  return (
    <form onSubmit={submit} className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input required placeholder="Your name *" className={inp} value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input required placeholder="Phone / WhatsApp *" pattern="[0-9+ ]{10,15}" className={inp}
          value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input placeholder="Area in Pune (e.g. Baner)" className={inp} value={form.area}
          onChange={(e) => setForm({ ...form, area: e.target.value })} />
        <input placeholder="Product of interest" className={inp} value={form.product}
          onChange={(e) => setForm({ ...form, product: e.target.value })} />
      </div>
      <textarea placeholder="Message (size, floor, balcony…)" rows={4} className={inp}
        value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      <button
        disabled={busy}
        className="rounded-xl bg-pine-800 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-pine-700 disabled:opacity-60"
      >
        {busy ? "Sending…" : "Request Free Callback"}
      </button>
      <p className="text-center text-xs text-stone-500">
        or call <a className="font-bold text-pine-800" href={`tel:${SITE.phone1.replace(/\s/g, "")}`}>{SITE.phone1}</a>
      </p>
    </form>
  );
}
