import type { Metadata } from "next";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
import CartView from "./CartView";

export const metadata: Metadata = { title: "Your Cart" };

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-4">
      <p className="text-[12px] text-stone-500">
        <Link href="/" className="hover:underline">Home</Link> ＞ Cart
      </p>
      <h1 className="font-display mt-1 text-5xl font-bold">Your cart.</h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
        <CartView />
        <div className="h-fit border border-stone-200 bg-stone-50 p-6">
          <p className="font-display text-3xl font-bold">Checkout.</p>
          <p className="mt-1 text-[13px] text-stone-500">
            Send this cart for a free callback, or order instantly on WhatsApp.
          </p>
          <div className="mt-4"><EnquiryForm product="Cart order" /></div>
        </div>
      </div>
    </div>
  );
}
