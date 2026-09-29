"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

export default function GalleryGrid({ files }: { files: string[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (dir: number) => {
      setOpen(( cur) => (cur === null ? cur : (cur + dir + files.length) % files.length));
    },
    [files.length]
  );

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  if (files.length === 0) {
    return <p className="rounded-3xl border border-black/10 bg-white p-10 text-center text-sm text-stone-500">Photos will appear here after admin upload.</p>;
  }

  return (
    <>
      <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        {files.map((f, i) => (
          <button
            key={f}
            onClick={() => setOpen(i)}
            className={`group relative block w-full overflow-hidden rounded-2xl border border-black/10 bg-white ${i % 5 === 0 ? "aspect-[4/5]" : i % 5 === 2 ? "aspect-square" : "aspect-[4/3]"}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/legacy/gallery/big/${f}`}
              alt={`Excellent Dry installation ${i + 1}`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md bg-white/90 px-2.5 py-1.5 text-[11px] font-extrabold opacity-0 backdrop-blur transition group-hover:opacity-100">
              <Expand size={12} /> View
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <div className="fade-in fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4" onClick={() => setOpen(null)}>
          <button aria-label="Close" className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"><X size={20} /></button>
          <button
            aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#e8b62a] hover:text-black md:left-6"
          >
            <ChevronLeft size={22} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/legacy/gallery/big/${files[open]}`}
            alt={`Excellent Dry installation ${open + 1}`}
            className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            aria-label="Next"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#e8b62a] hover:text-black md:right-6"
          >
            <ChevronRight size={22} />
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[13px] font-bold text-white/60">{open + 1} / {files.length}</p>
        </div>
      )}
    </>
  );
}
