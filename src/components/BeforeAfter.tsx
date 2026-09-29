"use client";

import { useCallback, useRef, useState } from "react";

export default function BeforeAfter({
  before = "/legacy/rope-drying.png",
  after = "/legacy/pulley-drying.png",
}: {
  before?: string;
  after?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(50);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const pct = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(96, Math.max(4, pct)));
  }, []);

  return (
    <div
      ref={ref}
      className="ba-handle relative select-none overflow-hidden rounded-[2rem] border border-black/10"
      style={{ touchAction: "pan-y" }}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) move(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
    >
      {/* AFTER — full base layer, sets the box size */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt="After: pulley drying system with clothes neatly spaced" className="block aspect-[16/10] w-full object-cover md:aspect-[21/9]" draggable={false} />

      {/* BEFORE — identical geometry, revealed with clip-path so it can never shrink */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before} alt="Before: clothes crowded on sagging rope lines" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        <span className="absolute left-5 top-5 rounded-md bg-black/70 px-3 py-1.5 text-[12px] font-extrabold uppercase tracking-wider text-white backdrop-blur">
          Before · ropes
        </span>
      </div>

      <span className="absolute right-5 top-5 rounded-md bg-[#d9232e] px-3 py-1.5 text-[12px] font-extrabold uppercase tracking-wider text-white">
        After · pulley
      </span>

      {/* handle */}
      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -left-px w-[3px] bg-white shadow-[0_0_20px_rgb(0_0_0/0.5)]" />
        <div className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-lg font-extrabold shadow-2xl">
          ↔
        </div>
      </div>
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[12px] font-bold uppercase tracking-[0.18em] text-white/90 [text-shadow:0_1px_8px_rgb(0_0_0/0.8)]">
        Drag to compare
      </p>
    </div>
  );
}
