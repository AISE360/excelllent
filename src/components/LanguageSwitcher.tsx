"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { LANGS, tr, type Key, type Lang } from "@/lib/strings";

function readLang(): Lang {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(/(?:^|; )lang=(hi|mr|en)/);
  return (m?.[1] as Lang) || "en";
}

/** Reactive current language for client components */
export function useLang(): Lang {
  const [l, setL] = useState<Lang>("en");
  useEffect(() => {
    setL(readLang());
    const f = () => setL(readLang());
    window.addEventListener("lang-change", f);
    return () => window.removeEventListener("lang-change", f);
  }, []);
  return l;
}

/** t() bound to the live language for client components */
export function useT() {
  const l = useLang();
  return (k: Key) => tr(l, k);
}

/** EN / हिंदी / मराठी dropdown */
export default function LanguageSwitcher() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const lang = useLang();

  function pick(code: Lang) {
    document.cookie = `lang=${code};path=/;max-age=31536000`;
    window.dispatchEvent(new Event("lang-change"));
    setOpen(false);
    router.refresh();
  }

  return (
    <span className="relative hidden items-center sm:flex">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-[13px] font-medium hover:text-brand-red"
        aria-label="Language"
      >
        <Globe size={18} /> {LANGS.find((l) => l.code === lang)?.label} <ChevronDown size={12} />
      </button>
      {open && (
        <>
          <span className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <span className="absolute right-0 top-full z-50 mt-1 w-28 border border-stone-200 bg-white py-1 shadow-xl">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => pick(l.code)}
                className={`block w-full px-3 py-2 text-left text-[13px] hover:bg-stone-100 ${l.code === lang ? "font-bold" : ""}`}
              >
                {l.label}
              </button>
            ))}
          </span>
        </>
      )}
    </span>
  );
}
