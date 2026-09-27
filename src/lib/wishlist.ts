"use client";

import { useEffect, useState } from "react";

const KEY = "ed_wishlist";

function read(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function useWishlist(slug?: string) {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    setList(read());
    const f = () => setList(read());
    window.addEventListener("wishlist-change", f);
    return () => window.removeEventListener("wishlist-change", f);
  }, []);

  function toggle(s: string) {
    const next = list.includes(s) ? list.filter((x) => x !== s) : [...list, s];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch { /* noop */ }
    setList(next);
    window.dispatchEvent(new Event("wishlist-change"));
  }

  return {
    list,
    has: slug ? list.includes(slug) : false,
    toggle,
  };
}
