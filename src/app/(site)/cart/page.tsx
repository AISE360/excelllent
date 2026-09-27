import type { Metadata } from "next";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
import { getLang } from "@/lib/i18n";
import { tr } from "@/lib/strings";
import CartView from "./CartView";

export const metadata: Metadata = { title: "Your Cart" };

export default async function CartPage() {
  const lang = await getLang();
  const t = (k: Parameters<typeof tr>[1]) => tr(lang, k);
  return (
    <div className="mx-auto max-w-6xl px-4 pt-4">
      <p className="text-[12px] text-stone-500">
        <Link href="/" className="hover:underline">{t("home")}</Link> ＞ {t("cart")}
      </p>
      <h1 className="font-display mt-1 text-5xl font-bold">{t("cart_title")}</h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
        <CartView />
        <div className="h-fit border border-stone-200 bg-stone-50 p-6">
          <p className="font-display text-3xl font-bold">{t("cart_checkout_t")}</p>
          <p className="mt-1 text-[13px] text-stone-500">{t("cart_checkout_s")}</p>
          <div className="mt-4"><EnquiryForm product="Cart order" /></div>
        </div>
      </div>
    </div>
  );
}
