"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";

export default function WishHeart({ slug }: { slug: string }) {
  const { has, toggle } = useWishlist(slug);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-label="Wishlist"
      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:scale-110"
    >
      <Heart size={15} className={has ? "fill-brand-red text-brand-red" : "text-ink"} />
    </button>
  );
}
