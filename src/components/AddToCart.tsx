"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";

export default function AddToCart({ slug }: { slug: string }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      onClick={() => {
        add(slug);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      className={`flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-bold text-white transition ${added ? "bg-green-600" : "bg-ink hover:bg-brand-red"}`}
    >
      {added ? <><Check size={16} /> Added to cart ✓</> : <><ShoppingCart size={16} /> Add to Cart</>}
    </button>
  );
}
