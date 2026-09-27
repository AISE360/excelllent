import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

/** Storefront chrome — header, menu, footer, WhatsApp. Admin pages do NOT use this. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
