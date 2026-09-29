import { CartProvider } from "@/lib/cart";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollTop from "@/components/ScrollTop";

/** Storefront chrome — header, menu, footer, WhatsApp. Admin pages do NOT use this. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ScrollTop />
      <Navbar />
      <CartDrawer />
      <main className="min-h-[60dvh]">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </CartProvider>
  );
}
