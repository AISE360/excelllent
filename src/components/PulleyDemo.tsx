"use client";

import { useCallback, useRef, useState } from "react";

const GARMENTS = [
  { x: "5%", w: "13%", h: 74, c: "#d9232e" },
  { x: "21%", w: "11%", h: 96, c: "#e3e9f6" },
  { x: "35%", w: "14%", h: 66, c: "#2e4a8a" },
  { x: "52%", w: "10%", h: 88, c: "#c05a2e" },
  { x: "65%", w: "13%", h: 70, c: "#a89a83" },
  { x: "81%", w: "11%", h: 92, c: "#e4ddd0" },
];

const ROD_TOPS = [48, 118];
const TRAVEL = 130;

export default function PulleyDemo() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [lift, setLift] = useState(0.85); // 0 = down (loading), 1 = up (drying)
  const [active, setActive] = useState(false);

  const setFromY = useCallback((clientY: number) => {
    const el = trackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    // map pointer position along the rope track, with a little overshoot room
    const pct = (clientY - r.top + 22) / (r.height + 44);
    setLift(Math.min(1, Math.max(0, 1 - pct)));
  }, []);

  function grab(e: React.PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    setActive(true);
    setFromY(e.clientY);
  }

  const drop = (1 - lift) * TRAVEL;
  const raised = lift > 0.7;
  const lowered = lift < 0.3;
  const glide = active ? "none" : "all 0.5s cubic-bezier(0.22,0.61,0.36,1)";

  return (
    <div className="relative select-none overflow-hidden rounded-[1.75rem] border border-white/12 bg-gradient-to-b from-[#1a3468] to-[#0c1c3d] shadow-2xl">
      {/* ceiling with pulley wheels */}
      <div className="relative h-12 bg-black/30">
        <div className="absolute inset-x-10 top-1/2 flex -translate-y-1/2 justify-between">
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex h-5 w-5 items-center justify-center rounded-full bg-[#d9232e] text-[10px] font-extrabold text-white">◉</span>
          ))}
        </div>
      </div>

      {/* status */}
      <div className="absolute left-5 top-[60px] z-10">
        <p className={`rounded-md px-3 py-1.5 text-[12px] font-extrabold uppercase tracking-wider backdrop-blur transition ${raised ? "bg-[#d9232e] text-white" : "bg-white/10 text-white"}`}>
          {raised ? "Ceiling sun · drying" : lowered ? "Chest height · loading" : "Gliding…"}
        </p>
      </div>
      <div className="absolute right-5 top-[60px] z-10 rounded-md bg-black/40 px-3 py-1.5 text-[12px] font-bold text-white/80 backdrop-blur">
        20 kg max · 4 lines
      </div>

      {/* scene — fixed geometry, rods glide inside */}
      <div className="relative mx-6 h-[340px] md:h-[360px]">
        {/* ropes: anchored to ceiling, stretch to each rod */}
        {[10, 50, 90].map((x, i) => (
          <span
            key={x}
            className="absolute top-0 w-[2px] rounded bg-white/50"
            style={{ left: `${x}%`, height: ROD_TOPS[i % 2] + drop + 4, transition: glide }}
          />
        ))}
        {/* rods + garments glide together */}
        <div className="absolute inset-x-0 top-0" style={{ transform: `translateY(${drop}px)`, transition: active ? "none" : "transform 0.5s cubic-bezier(0.22,0.61,0.36,1)" }}>
          {ROD_TOPS.map((top, rod) => (
            <div key={rod} className="absolute inset-x-0" style={{ top }}>
              <div className="h-[7px] rounded-full bg-gradient-to-b from-white via-stone-300 to-stone-400 shadow-[0_3px_10px_rgb(0_0_0/0.45)]" />
              {GARMENTS.map((g, gi) => (
                <span
                  key={gi}
                  className="absolute rounded-b-[6px] shadow-[0_6px_14px_rgb(0_0_0/0.35)]"
                  style={{
                    left: `calc(${g.x} + ${rod * 5}px)`,
                    top: 7,
                    width: g.w,
                    height: rod === 0 ? g.h : Math.round(g.h * 0.72),
                    background: `linear-gradient(160deg, ${g.c}, ${g.c} 60%, rgb(0 0 0 / 0.28))`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* rope + handle — the ONLY drag zone */}
      <div className="relative flex items-end justify-between px-8 pb-6">
        <p className="max-w-[180px] text-[12px] font-semibold leading-relaxed text-white/50">
          {raised ? "Hot ceiling air dries 2× faster up here." : lowered ? "Everything hangs at hand height. No stretching." : "One finger on the rope…"}
        </p>
        <div className="flex flex-col items-center gap-1">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/50">Drag the rope</span>
          <div
            ref={trackRef}
            role="slider"
            aria-label="Pulley rope: drag to raise or lower the rods"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(lift * 100)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" || e.key === "ArrowRight") setLift((v) => Math.min(1, v + 0.08));
              if (e.key === "ArrowDown" || e.key === "ArrowLeft") setLift((v) => Math.max(0, v - 0.08));
            }}
            onPointerDown={grab}
            onPointerMove={(e) => {
              if (active) setFromY(e.clientY);
            }}
            onPointerUp={() => setActive(false)}
            onPointerCancel={() => setActive(false)}
            className="relative h-28 w-14 cursor-grab touch-none select-none outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-[#d9232e]"
            style={{ touchAction: "none" }}
          >
            {/* rope threads through the knob: fixed top segment + tail below */}
            <span className="absolute left-1/2 top-0 w-[3px] -translate-x-1/2 rounded bg-[#d9232e]/80" style={{ height: `calc(${(1 - lift) * 68}px + 22px)` }} />
            <span className="absolute bottom-0 left-1/2 w-[3px] -translate-x-1/2 rounded bg-[#d9232e]/35" style={{ top: `calc(${(1 - lift) * 68}px + 66px)` }} />
            <span
              className="absolute left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-[#d9232e] text-lg font-extrabold text-white shadow-[0_10px_25px_rgb(0_0_0/0.5)]"
              style={{ top: `${(1 - lift) * 68}px`, transition: active ? "none" : "top 0.5s cubic-bezier(0.22,0.61,0.36,1)" }}
            >
              ↕
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
