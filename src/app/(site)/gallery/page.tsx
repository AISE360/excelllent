import { promises as fs } from "fs";
import path from "path";
import { getLang } from "@/lib/i18n";
import { tr } from "@/lib/strings";
import { DEMO_VIDEO_ID } from "@/lib/site";

export const metadata = { title: "Installation Gallery" };

export default async function GalleryPage() {
  let files: string[] = [];
  try {
    const dir = path.join(process.cwd(), "public", "legacy", "gallery", "thumb");
    files = (await fs.readdir(dir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).slice(0, 24);
  } catch { files = []; }
  const lang = await getLang();
  const t = (k: Parameters<typeof tr>[1]) => tr(lang, k);
  return (
    <div className="mx-auto max-w-6xl px-4 pt-4">
      <p className="text-[12px] text-stone-500">Home ＞ Gallery</p>
      <h1 className="font-display mt-1 text-5xl font-bold">{t("gallery_t")}</h1>
      <p className="mt-2 text-[13px] text-stone-500">{t("gallery_s")}</p>
      <div className="mt-6 overflow-hidden border border-stone-200 bg-ink">
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${DEMO_VIDEO_ID}?rel=0`}
            title="Excellent Dry system fitting demo video"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
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
