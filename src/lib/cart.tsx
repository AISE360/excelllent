"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PRODUCTS, type Product } from "@/lib/site";

export type CartLine = { slug: string; qty: number };
export type CartDetailed = { product: Product; qty: number };

const KEY = "ed_cart";

const Ctx = createContext<{
  lines: CartLine[];
  detailed: CartDetailed[];
  count: number;
  subtotal: number;
  mrpTotal: number;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch { /* empty */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch { /* noop */ }
  }, [lines]);

  const value = useMemo(() => {
    const detailed = lines
      .map((l) => ({ product: PRODUCTS.find((p) => p.slug === l.slug)!, qty: l.qty }))
      .filter((d) => d.product);
    const count = detailed.reduce((n, d) => n + d.qty, 0);
    const subtotal = detailed.reduce((n, d) => n + d.qty * d.product.price, 0);
    const mrpTotal = detailed.reduce((n, d) => n + d.qty * d.product.mrp, 0);
    return {
      lines,
      detailed,
      count,
      subtotal,
      mrpTotal,
      cartOpen,
      setCartOpen,
      add: (slug: string, qty = 1) => {
        setLines((prev) => {
          const f = prev.find((l) => l.slug === slug);
          return f
            ? prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(99, l.qty + qty) } : l))
            : [...prev, { slug, qty }];
        });
        setCartOpen(true);
      },
      setQty: (slug: string, qty: number) =>
        setLines((prev) =>
          qty <= 0 ? prev.filter((l) => l.slug !== slug) : prev.map((l) => (l.slug === slug ? { ...l, qty } : l))
        ),
      remove: (slug: string) => setLines((prev) => prev.filter((l) => l.slug !== slug)),
      clear: () => setLines([]),
    };
  }, [lines, cartOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
