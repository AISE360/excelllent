import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import { ArrowRight } from "lucide-react";
import { getLang } from "@/lib/i18n";
import { tr } from "@/lib/strings";
import { DEMO_VIDEO_ID } from "@/lib/site";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata = { title: "Installation Gallery" };

export default async function GalleryPage() {
  let files: string[] = [];
  try {
    const dir = path.join(process.cwd(), "public", "legacy", "gallery", "big");
    files = (await fs.readdir(dir))
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort((a, b) => parseInt(a) - parseInt(b) || a.localeCompare(b));
  } catch { files = []; }
  const lang = await getLang();
  const t = (k: Parameters<typeof tr>[1]) => tr(lang, k);

  return (
    <>
      {/* light header */}
      <div className="border-b border-black/10 bg-[#f4f7fd] text-[#101d33]">
        <div className="mx-auto max-w-[1440px] px-4 pb-12 pt-8 md:px-8 md:pb-16 md:pt-12">
          <p className="text-[12px] font-bold text-black/45">
            <Link href="/" className="hover:text-black">{t("home")}</Link> <span className="mx-1">/</span> Gallery
          </p>
          <p className="eyebrow mt-4">Real fittings · real balconies</p>
          <h1 className="mega-type mt-3 text-[clamp(2.6rem,6vw,5rem)]">{t("gallery_t")}</h1>
          <p className="mt-4 max-w-xl text-[15px] font-medium leading-relaxed text-black/55">
            {files.length}+ fittings across Pune. Tap any photo to view it full-screen.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
        {/* video feature */}
        <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white">
          <div className="grid lg:grid-cols-[0.9fr_1.4fr]">
            <div className="flex flex-col justify-center p-7 md:p-10">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#173063]">Watch a fitting</p>
              <p className="mt-2 text-2xl font-extrabold leading-tight md:text-3xl">90 seconds. Measure to demo.</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black/55">This is exactly what happens on your fitting day, same team, same tools.</p>
              <Link href="/contact" className="btn-slide mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#173063] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#0c1c3d]">
                Book my slot <ArrowRight size={15} />
              </Link>
            </div>
            <div className="aspect-video w-full lg:aspect-auto lg:min-h-[380px]">
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
        </div>

        {/* masonry grid with lightbox */}
        <div className="mt-10">
          <GalleryGrid files={files} />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-[1.75rem] border border-black/10 bg-white p-8 md:flex-row md:p-10">
          <p className="mega-type text-[clamp(1.6rem,3.5vw,2.6rem)]">Picture yours up there.</p>
          <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#173063] px-7 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#0c1c3d]">
            Free site visit <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </>
  );
}
