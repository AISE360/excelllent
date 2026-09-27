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
    <div className="mx-auto max-w-6xl px-4 pt-4">
      <p className="text-[12px] text-stone-500">Home ＞ Gallery</p>
      <h1 className="font-display mt-1 text-5xl font-bold">Get inspired.</h1>
      <p className="mt-2 text-[13px] text-stone-500">Real fittings across Pune. New photos are added from Admin Media.</p>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {files.map((f) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={f} src={`/legacy/gallery/thumb/${f}`} alt="Excellent Dry installation"
            loading="lazy" className="aspect-square w-full object-cover" />
        ))}
        {files.length === 0 && <p className="text-sm text-stone-500">Photos will appear here after admin upload.</p>}
      </div>
    </div>
  );
}
