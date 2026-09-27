"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Inbox, Package, Image as ImageIcon, Settings as SettingsIcon, LogOut, Plus, Pencil, Trash2, Download } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { toWebp } from "@/lib/image";
import { PRODUCTS as SEED, type Product } from "@/lib/site";

const DEMO_EMAIL = "admin@excellentdry.com";
const DEMO_PASS = "excellent123";

type Lead = { id: string; created_at: string; name: string; phone: string; area: string; product: string; message: string };
type Tab = "Overview" | "Enquiries" | "Products" | "Media" | "Settings";

const LS_PRODUCTS = "ed_products";
const LS_LEADS = "ed_leads";
const LS_SETTINGS = "ed_settings";
const LS_SESSION = "ed_admin";

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function AdminPage() {
  const configured = useMemo(() => Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL), []);
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<Tab>("Overview");

  const [leads, setLeads] = useState<Lead[]>([]);
  const [products, setProducts] = useState<Product[]>(SEED);
  const [settings, setSettings] = useState({ phone1: "+91 9226848274", phone2: "+91 7719946592", email: "excellentdry@gmail.com", address: "Akurdi, Pune", hours: "Mon-Sun, 10:00 AM to 6:00 PM" });
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploads, setUploads] = useState<string[]>([]);

  /* ---------- session ---------- */
  useEffect(() => {
    (async () => {
      if (configured) {
        const { data } = await supabaseBrowser().auth.getSession();
        setAuthed(Boolean(data.session));
      } else {
        setAuthed(localStorage.getItem(LS_SESSION) === "1");
        setProducts(load(LS_PRODUCTS, SEED));
        setLeads(load<Lead[]>(LS_LEADS, [
          { id: "demo-1", created_at: new Date().toISOString(), name: "Priya Sharma", phone: "9876543210", area: "Baner", product: "Ceiling Mount 5ft", message: "Need fitting this weekend." },
          { id: "demo-2", created_at: new Date().toISOString(), name: "Rahul Patil", phone: "9822012345", area: "Kothrud", product: "Wall Mount 4ft", message: "Please share quote." },
        ]));
        setSettings(load(LS_SETTINGS, settings));
      }
      setChecking(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configured]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      if (configured) {
        const { error } = await supabaseBrowser().auth.signInWithPassword({ email, password });
        if (error) throw error;
        setAuthed(true);
      } else {
        if (email === DEMO_EMAIL && password === DEMO_PASS) {
          localStorage.setItem(LS_SESSION, "1");
          setAuthed(true);
        } else throw new Error("Wrong demo credentials. Use the demo login shown below.");
      }
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Login failed");
    }
    setBusy(false);
  }

  async function logout() {
    if (configured) await supabaseBrowser().auth.signOut();
    else localStorage.removeItem(LS_SESSION);
    setAuthed(false);
  }

  /* ---------- data ---------- */
  async function refresh() {
    if (!authed) return;
    if (configured) {
      const sb = supabaseBrowser();
      const [l, p, s] = await Promise.all([
        sb.from("leads").select("*").order("created_at", { ascending: false }).limit(200),
        sb.from("products").select("*").order("name"),
        sb.from("site_settings").select("*").eq("id", 1).single(),
      ]);
      if (l.data) setLeads(l.data as Lead[]);
      if (p.data && p.data.length) {
        setProducts(p.data.map((r) => ({ slug: r.slug, name: r.name, category: r.category, size: r.size ?? "", feet: Number(r.feet ?? 0), lines: Number(r.lines ?? 0), mrp: Number(r.mrp), price: Number(r.price), image: r.image_url ?? "", blurb: r.blurb ?? "" })));
      }
      if (s.data) setSettings({ phone1: s.data.phone1, phone2: s.data.phone2, email: s.data.email, address: s.data.address, hours: s.data.hours });
    } else {
      setProducts(load(LS_PRODUCTS, SEED));
      setLeads(load(LS_LEADS, []));
      setSettings(load(LS_SETTINGS, settings));
    }
  }

  useEffect(() => {
    if (authed) refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  function persistProducts(next: Product[]) {
    setProducts(next);
    if (!configured) localStorage.setItem(LS_PRODUCTS, JSON.stringify(next));
  }

  async function saveProduct() {
    if (!editing) return;
    setMsg("");
    if (configured) {
      const { error } = await supabaseBrowser().from("products").upsert({
        slug: editing.slug, name: editing.name, category: editing.category, size: editing.size,
        feet: editing.feet, lines: editing.lines,
        mrp: editing.mrp, price: editing.price, image_url: editing.image, blurb: editing.blurb, active: true,
      }, { onConflict: "slug" });
      if (error) { setMsg(error.message); return; }
    }
    const exists = products.some((p) => p.slug === editing.slug);
    persistProducts(exists ? products.map((p) => (p.slug === editing.slug ? editing : p)) : [...products, editing]);
    setEditing(null);
    setMsg("Product saved ✓");
  }

  async function deleteProduct(slug: string) {
    if (!confirm("Delete this product?")) return;
    if (configured) await supabaseBrowser().from("products").delete().eq("slug", slug);
    persistProducts(products.filter((p) => p.slug !== slug));
  }

  async function deleteLead(id: string) {
    if (configured) await supabaseBrowser().from("leads").delete().eq("id", id);
    else localStorage.setItem(LS_LEADS, JSON.stringify(leads.filter((l) => l.id !== id)));
    setLeads(leads.filter((l) => l.id !== id));
  }

  async function saveSettings() {
    if (configured) {
      const { error } = await supabaseBrowser().from("site_settings").update({ ...settings }).eq("id", 1);
      setMsg(error ? error.message : "Settings saved ✓");
    } else {
      localStorage.setItem(LS_SETTINGS, JSON.stringify(settings));
      setMsg("Settings saved ✓ (demo , stored in this browser)");
    }
  }

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploading(true);
    setMsg("");
    try {
      const webp = await toWebp(f);
      if (!configured) {
        const url = URL.createObjectURL(webp);
        setUploads([url, ...uploads]);
        setMsg(`Compressed to webp ${(webp.size / 1024).toFixed(0)} KB (demo , connect Supabase to store permanently).`);
      } else {
        const path = `uploads/${Date.now()}.webp`;
        const { error } = await supabaseBrowser().storage.from("site-images").upload(path, webp, { contentType: "image/webp", upsert: true });
        if (error) throw error;
        const { data } = supabaseBrowser().storage.from("site-images").getPublicUrl(path);
        setUploads([data.publicUrl, ...uploads]);
        setMsg("Uploaded as optimised .webp ✓ Paste the URL into a product.");
      }
    } catch (err: unknown) {
      setMsg(err instanceof Error ? err.message : "Upload failed");
    }
    setUploading(false);
  }

  /* ---------- login screen ---------- */
  if (checking) return <p className="mx-auto max-w-6xl px-4 py-20 text-sm text-stone-400">Loading…</p>;

  if (!authed) {
    return (
      <>
        <AdminBar />
        <div className="bg-card min-h-[70vh]">
        <div className="mx-auto max-w-md px-4 py-16">
          <p className="font-display text-4xl font-bold">Admin login.</p>
          <p className="mt-1 text-sm text-stone-500">
            {configured ? "Sign in with your Supabase team account." : "Demo mode , use the demo credentials below."}
          </p>
          <form onSubmit={login} className="mt-6 border border-stone-200 bg-white p-6">
            <label className="text-xs font-bold uppercase text-stone-400">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com"
              className="mt-1 w-full border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-ink" />
            <label className="mt-4 block text-xs font-bold uppercase text-stone-400">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••"
              className="mt-1 w-full border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-ink" />
            {err && <p className="mt-3 bg-red-50 p-2 text-[13px] text-red-700">{err}</p>}
            <button disabled={busy} className="mt-5 w-full bg-ink py-3 text-sm font-bold text-white disabled:opacity-60">
              {busy ? "Signing in…" : "Sign in →"}
            </button>
            {!configured && (
              <p className="mt-4 bg-brand-yellow/40 p-3 text-[13px]">
                Demo login<br /><strong>{DEMO_EMAIL}</strong> / <strong>{DEMO_PASS}</strong>
              </p>
            )}
          </form>
        </div>
      </div>
      </>
    );
  }

  /* ---------- dashboard ---------- */
  const NAV = [
    { t: "Overview" as Tab, icon: <LayoutDashboard size={16} /> },
    { t: "Enquiries" as Tab, icon: <Inbox size={16} /> },
    { t: "Products" as Tab, icon: <Package size={16} /> },
    { t: "Media" as Tab, icon: <ImageIcon size={16} /> },
    { t: "Settings" as Tab, icon: <SettingsIcon size={16} /> },
  ];
  const inp = "w-full border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-ink";

  return (
    <>
      <AdminBar />
      <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-4xl font-bold">Dashboard.</p>
          <p className="text-[13px] text-stone-500">
            {configured ? "Connected to Supabase ✓" : "Demo mode , add Supabase keys in .env.local for live data"}
          </p>
        </div>
        <button onClick={logout} className="flex items-center gap-1.5 border border-stone-300 px-3 py-2 text-[13px] font-semibold">
          <LogOut size={14} /> Sign out
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[200px_1fr]">
        <nav className="flex gap-2 overflow-x-auto lg:flex-col">
          {NAV.map((n) => (
            <button key={n.t} onClick={() => { setTab(n.t); setMsg(""); }}
              className={`flex items-center gap-2 px-3 py-2.5 text-sm font-semibold ${tab === n.t ? "bg-ink text-white" : "bg-white border border-stone-200"}`}>
              {n.icon} {n.t}
              {n.t === "Enquiries" && leads.length > 0 && (
                <span className="ml-auto bg-brand-yellow px-1.5 text-xs font-bold text-ink">{leads.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="min-w-0">
          {msg && <p className="mb-4 bg-green-50 p-2.5 text-[13px] text-green-800">{msg}</p>}

          {tab === "Overview" && (
            <>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[
                  ["Products", String(products.length)],
                  ["Enquiries", String(leads.length)],
                  ["Avg. rating", "4.8/5"],
                  ["Installations", "1L+"],
                ].map(([k, v]) => (
                  <div key={k} className="border border-stone-200 bg-white p-5">
                    <p className="font-display text-4xl font-bold">{v}</p>
                    <p className="text-[13px] text-stone-500">{k}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm font-bold">Latest enquiries</p>
              <div className="mt-2 border border-stone-200 bg-white">
                {leads.slice(0, 5).map((l) => (
                  <div key={l.id} className="flex justify-between gap-3 border-b border-stone-100 p-3 text-sm last:border-0">
                    <span><strong>{l.name}</strong> <span className="text-stone-400">· {l.area} · {l.product}</span></span>
                    <a className="font-semibold hover:underline" href={`tel:${l.phone}`}>{l.phone}</a>
                  </div>
                ))}
                {leads.length === 0 && <p className="p-4 text-sm text-stone-400">No enquiries yet.</p>}
              </div>
            </>
          )}

          {tab === "Enquiries" && (
            <div className="overflow-x-auto border border-stone-200 bg-white">
              <div className="flex items-center justify-between border-b border-stone-200 p-3">
                <p className="text-sm font-bold">{leads.length} enquiries</p>
                <button
                  onClick={() => {
                    const csv = "name,phone,area,product,message\n" + leads.map((l) => [l.name, l.phone, l.area, l.product, l.message].map((x) => `"${(x ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
                    const a = document.createElement("a");
                    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
                    a.download = "enquiries.csv";
                    a.click();
                  }}
                  className="flex items-center gap-1 border border-stone-300 px-2.5 py-1.5 text-xs font-semibold"
                >
                  <Download size={13} /> CSV
                </button>
              </div>
              <table className="w-full min-w-[640px] text-sm">
                <thead><tr className="bg-stone-50 text-left text-xs uppercase text-stone-400">
                  <th className="p-3">Date</th><th className="p-3">Name</th><th className="p-3">Phone</th><th className="p-3">Area</th><th className="p-3">Product</th><th className="p-3"></th>
                </tr></thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} className="border-t border-stone-100">
                      <td className="p-3 text-xs">{new Date(l.created_at).toLocaleString("en-IN")}</td>
                      <td className="p-3 font-semibold">{l.name}</td>
                      <td className="p-3"><a className="font-semibold hover:underline" href={`tel:${l.phone}`}>{l.phone}</a></td>
                      <td className="p-3">{l.area}</td>
                      <td className="p-3">{l.product}</td>
                      <td className="p-3"><button onClick={() => deleteLead(l.id)} aria-label="Delete"><Trash2 size={15} className="text-red-600" /></button></td>
                    </tr>
                  ))}
                  {leads.length === 0 && <tr><td className="p-6 text-stone-400" colSpan={6}>No enquiries yet.</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {tab === "Products" && (
            <div>
              <button
                onClick={() => { setEditing({ slug: `new-${Date.now()}`, name: "", category: "Ceiling Mount", size: "5 Ft", feet: 5, lines: 4, mrp: 0, price: 0, image: "/legacy/hero-1.png", blurb: "" }); setIsNew(true); }}
                className="flex items-center gap-1.5 bg-ink px-4 py-2.5 text-sm font-bold text-white"
              >
                <Plus size={15} /> Add product
              </button>
              <div className="mt-3 border border-stone-200 bg-white">
                {products.map((p) => (
                  <div key={p.slug} className="flex items-center gap-3 border-b border-stone-100 p-3 text-sm last:border-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt="" className="h-10 w-10 bg-card object-contain" />
                    <span className="min-w-0 flex-1"><strong>{p.name}</strong> <span className="text-stone-400">· ₹{p.price}</span></span>
                    <button onClick={() => { setEditing({ ...p }); setIsNew(false); }} aria-label="Edit"><Pencil size={15} /></button>
                    <button onClick={() => deleteProduct(p.slug)} aria-label="Delete"><Trash2 size={15} className="text-red-600" /></button>
                  </div>
                ))}
              </div>
              {editing && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
                  <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto bg-white p-6">
                    <p className="font-display text-3xl font-bold">{isNew ? "Add product." : "Edit product."}</p>
                    <div className="mt-4 grid gap-3">
                      <input className={inp} placeholder="Product name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
                      <div className="grid grid-cols-2 gap-3">
                        <input className={inp} placeholder="slug" value={editing.slug} disabled={!isNew} onChange={(e) => setEditing({ ...editing, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-") })} />
                        <select className={inp} value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value as Product["category"] })}>
                          <option>Open Terrace</option><option>Ceiling Mount</option><option>Wall Mount</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <input className={inp} placeholder="Size (5 Ft)" value={editing.size} onChange={(e) => setEditing({ ...editing, size: e.target.value })} />
                        <input className={inp} type="number" placeholder="Feet" value={editing.feet} onChange={(e) => setEditing({ ...editing, feet: Number(e.target.value) })} />
                        <input className={inp} type="number" placeholder="Lines" value={editing.lines} onChange={(e) => setEditing({ ...editing, lines: Number(e.target.value) })} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input className={inp} type="number" placeholder="MRP" value={editing.mrp} onChange={(e) => setEditing({ ...editing, mrp: Number(e.target.value) })} />
                        <input className={inp} type="number" placeholder="Price" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} />
                      </div>
                      <input className={inp} placeholder="Image URL (/legacy/… or https://…webp)" value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} />
                      <textarea className={inp} rows={3} placeholder="Short description" value={editing.blurb} onChange={(e) => setEditing({ ...editing, blurb: e.target.value })} />
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button onClick={saveProduct} className="flex-1 bg-ink py-2.5 text-sm font-bold text-white">Save</button>
                      <button onClick={() => setEditing(null)} className="flex-1 border border-stone-300 py-2.5 text-sm font-semibold">Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === "Media" && (
            <div className="border border-stone-200 bg-white p-5">
              <p className="text-sm font-bold">Upload image , auto-converts to .webp</p>
              <p className="mt-1 text-[13px] text-stone-500">Compressed to max 1600px / ~0.8MB before upload.</p>
              <input type="file" accept="image/*" onChange={upload} className="mt-3 text-sm" />
              {uploading && <p className="mt-2 text-sm">Compressing & uploading…</p>}
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                {uploads.map((u) => (
                  <div key={u} className="border border-stone-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={u} alt="upload" className="aspect-square w-full object-cover" />
                    <p className="break-all p-1.5 text-[11px] text-stone-400">{u.slice(0, 60)}…</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "Settings" && (
            <div className="grid max-w-lg gap-3 border border-stone-200 bg-white p-5">
              {(["phone1", "phone2", "email", "hours"] as const).map((k) => (
                <label key={k} className="grid gap-1 text-xs font-bold uppercase text-stone-400">{k}
                  <input className={inp} value={settings[k]} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })} />
                </label>
              ))}
              <label className="grid gap-1 text-xs font-bold uppercase text-stone-400">address
                <textarea className={inp} rows={2} value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} />
              </label>
              <button onClick={saveSettings} className="bg-ink py-2.5 text-sm font-bold text-white">Save settings</button>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

/** Slim admin-only bar , no storefront menu, footer or WhatsApp here. */
function AdminBar() {
  return (
    <div className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <span className="font-display text-[22px] font-bold leading-none">
          excellent<span className="text-brand-red">dry</span>
          <span className="ml-2 bg-ink px-1.5 py-0.5 align-middle text-[11px] font-bold text-white">ADMIN</span>
        </span>
        <Link href="/" className="text-[13px] font-semibold hover:text-brand-red">← View website</Link>
      </div>
    </div>
  );
}
