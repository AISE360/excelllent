"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { toWebp } from "@/lib/image";
import { PRODUCTS as SEED } from "@/lib/site";

type Lead = { id: string; created_at: string; name: string; phone: string; area: string; product: string; message: string };

const TABS = ["Leads", "Products", "Images", "Settings"] as const;

export default function AdminPage() {
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const [authed, setAuthed] = useState(!configured); // demo mode when env missing
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<(typeof TABS)[number]>("Leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  useEffect(() => {
    if (!configured) return;
    supabaseBrowser().auth.getSession().then(({ data }) => setAuthed(Boolean(data.session)));
  }, [configured]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabaseBrowser().auth.signInWithPassword({ email, password });
    if (error) setMsg(error.message);
    else setAuthed(true);
  }

  async function loadLeads() {
    if (!configured) {
      setLeads([{ id: "demo", created_at: new Date().toISOString(), name: "Demo Lead", phone: "9876543210", area: "Baner", product: "Ceiling Mount 5ft", message: "Connect Supabase to see live enquiries." }]);
      return;
    }
    const { data } = await supabaseBrowser().from("leads").select("*").order("created_at", { ascending: false }).limit(100);
    setLeads((data as Lead[]) ?? []);
  }

  useEffect(() => {
    if (authed) loadLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed, tab]);

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploading(true);
    setMsg("");
    try {
      const webp = await toWebp(f); // ← auto .webp compress
      if (!configured) {
        setUploadedUrl(URL.createObjectURL(webp));
        setMsg(`Compressed to webp: ${(webp.size / 1024).toFixed(0)} KB (demo — connect Supabase to store).`);
        return;
      }
      const path = `uploads/${Date.now()}.webp`;
      const { error } = await supabaseBrowser().storage.from("site-images").upload(path, webp, {
        contentType: "image/webp",
        upsert: true,
      });
      if (error) throw error;
      const { data } = supabaseBrowser().storage.from("site-images").getPublicUrl(path);
      setUploadedUrl(data.publicUrl);
      setMsg("Uploaded as optimised .webp ✓ Copy the URL into Products/Hero.");
    } catch (err: unknown) {
      setMsg(err instanceof Error ? err.message : "Upload failed");
    }
    setUploading(false);
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="text-2xl font-extrabold text-pine-950">Admin login</h1>
        <p className="mt-1 text-sm text-stone-500">
          {configured ? "Sign in with your Supabase auth user." : "Demo mode — add Supabase env to enable real login."}
        </p>
        <form onSubmit={login} className="mt-6 grid gap-3">
          <input className="rounded-xl border border-stone-300 px-4 py-3 text-sm" placeholder="admin email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="rounded-xl border border-stone-300 px-4 py-3 text-sm" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="rounded-xl bg-pine-800 px-4 py-3 text-sm font-bold text-white">Sign in</button>
          {msg && <p className="text-sm text-red-600">{msg}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-pine-950">Admin panel {!configured && <span className="text-sm font-medium text-amber-600">(demo — Supabase not connected)</span>}</h1>
        <button
          className="rounded-lg border border-stone-300 px-3 py-2 text-xs font-semibold"
          onClick={() => { if (configured) supabaseBrowser().auth.signOut(); setAuthed(!configured); }}
        >
          Sign out
        </button>
      </div>
      <div className="mt-5 flex gap-2">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === t ? "bg-pine-800 text-white" : "border border-stone-300 bg-white"}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Leads" && (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
          <table className="w-full min-w-[640px] text-sm">
            <thead><tr className="bg-stone-50 text-left text-xs uppercase text-stone-400">
              <th className="p-3">Date</th><th className="p-3">Name</th><th className="p-3">Phone</th><th className="p-3">Area</th><th className="p-3">Product</th><th className="p-3">Message</th>
            </tr></thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-t border-stone-100">
                  <td className="p-3 text-xs">{new Date(l.created_at).toLocaleString("en-IN")}</td>
                  <td className="p-3 font-semibold">{l.name}</td>
                  <td className="p-3"><a className="text-pine-700 font-semibold" href={`tel:${l.phone}`}>{l.phone}</a></td>
                  <td className="p-3">{l.area}</td><td className="p-3">{l.product}</td><td className="p-3">{l.message}</td>
                </tr>
              ))}
              {leads.length === 0 && <tr><td className="p-6 text-stone-400" colSpan={6}>No enquiries yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {tab === "Products" && (
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-6">
          <p className="text-sm text-stone-600">
            Products live in Supabase table <code>products</code> (seed below mirrors the current site).
            Edit them in Supabase Table Editor, or run <code>supabase/seed.sql</code>. Every field on the
            website — price, image, blurb — comes from there once connected.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {SEED.map((p) => (
              <div key={p.slug} className="rounded-xl bg-stone-50 p-3 text-xs">
                <p className="font-bold">{p.name}</p>
                <p className="text-stone-500">{p.slug} · ₹{p.price} · {p.image}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "Images" && (
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="font-bold text-pine-950">Upload image (auto-converts to .webp)</h2>
          <p className="mt-1 text-sm text-stone-500">Any JPG/PNG is compressed to max 1600px / ~0.8MB webp before upload to the <code>site-images</code> bucket.</p>
          <input type="file" accept="image/*" onChange={upload} className="mt-4 text-sm" />
          {uploading && <p className="mt-2 text-sm">Compressing & uploading…</p>}
          {msg && <p className="mt-2 text-sm text-pine-700">{msg}</p>}
          {uploadedUrl && (
            <div className="mt-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={uploadedUrl} alt="uploaded" className="max-h-64 rounded-xl border" />
              <p className="mt-2 break-all text-xs text-stone-500">{uploadedUrl}</p>
            </div>
          )}
        </div>
      )}

      {tab === "Settings" && (
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 text-sm text-stone-600">
          <p>Edit phone, address, hero slides, testimonials & SEO pages in Supabase tables:</p>
          <ul className="mt-2 list-disc pl-5">
            <li><code>site_settings</code> — phones, email, address, hours</li>
            <li><code>hero_slides</code> — homepage banner (title, image, CTA)</li>
            <li><code>testimonials</code>, <code>gallery</code>, <code>products</code>, <code>seo_pages</code></li>
          </ul>
          <p className="mt-3">Full SQL in <code>supabase/schema.sql</code>. Create a bucket named <code>site-images</code> (public).</p>
        </div>
      )}
    </div>
  );
}
