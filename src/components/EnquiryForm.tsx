"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { SITE } from "@/lib/site";
import { useT } from "@/components/LanguageSwitcher";

export default function EnquiryForm({ product = "" }: { product?: string }) {
  const t = useT();
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
      /* fall through to success + WhatsApp fallback */
    }
    setBusy(false);
    setDone(true);
  }

  if (done) {
    const wa = `https://wa.me/${SITE.phoneRaw1}?text=${encodeURIComponent(
      `Hi Excellent Dry! I'm ${form.name} from ${form.area}. Interested in: ${form.product || "dry system"}. Please call ${form.phone}.`
    )}`;
    return (
      <div className="border border-teal-200 bg-teal-50 p-6 text-center">
        <p className="font-display text-3xl font-bold">{t("form_thanks")}, {form.name.split(" ")[0] || "friend"}!</p>
        <p className="mt-1 text-sm text-stone-600">{t("form_back")} ({SITE.hours})</p>
        <a href={wa} target="_blank" className="mt-4 inline-block bg-[#25D366] px-6 py-3 text-sm font-bold text-white">
          {t("form_wa")}
        </a>
      </div>
    );
  }

  const inp =
    "w-full border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-ink";
  return (
    <form onSubmit={submit} className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input required placeholder={t("form_name")} className={inp} value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input required placeholder={t("form_phone")} pattern="[0-9+ ]{10,15}" className={inp}
          value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input placeholder={t("form_area")} className={inp} value={form.area}
          onChange={(e) => setForm({ ...form, area: e.target.value })} />
        <input placeholder={t("form_product")} className={inp} value={form.product}
          onChange={(e) => setForm({ ...form, product: e.target.value })} />
      </div>
      <textarea placeholder={t("form_msg")} rows={4} className={inp}
        value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      <button disabled={busy} className="bg-ink px-6 py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60">
        {busy ? t("form_sending") : t("form_submit")}
      </button>
      <p className="text-center text-xs text-stone-500">
        {t("form_orcall")} <a className="font-bold text-ink" href={`tel:${SITE.phone1.replace(/\s/g, "")}`}>{SITE.phone1}</a>
      </p>
    </form>
  );
}
