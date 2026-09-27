import { promises as fs } from "fs";
import path from "path";

export const metadata = { title: "Installation Gallery" };

export default async function GalleryPage() {
  let files: string[] = [];
  try {
    const dir = path.join(process.cwd(), "public", "legacy", "gallery", "thumb");
    files = (await fs.readdir(dir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).slice(0, 24);
  } catch { files = []; }
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-pine-950 sm:text-4xl">Installation gallery</h1>
      <p className="mt-2 text-stone-500">Real fittings across Pune — managed from Admin → Gallery.</p>
      <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4">
        {files.map((f) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={f} src={`/legacy/gallery/thumb/${f}`} alt="Excellent Dry installation"
            loading="lazy" className="aspect-square w-full rounded-2xl border border-stone-200 object-cover" />
        ))}
        {files.length === 0 && <p className="text-sm text-stone-500">Photos will appear here after admin upload.</p>}
      </div>
    </div>
  );
}
