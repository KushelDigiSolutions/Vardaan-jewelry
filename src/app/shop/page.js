import { Suspense } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ShopHero from "@/components/ShopHero";
import ShopProducts from "@/components/ShopProducts";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "Shop Collection | Vardaan - Fine Handcrafted Jewelry",
  description: "Browse Vardaan's collection of fine handcrafted jewelry. Shop certified gold rings, earrings, signature necklaces, and bespoke bridal heirloom sets.",
  keywords: "shop vardaan jewelry, gold rings, diamond earrings, gold sets, luxury emerald necklaces, certified bridal jewelry",
};

function ShopProductsFallback() {
  return (
    <div className="w-full max-w-[1192px] mx-auto px-4 py-20 text-center font-sans">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#07512E] mx-auto mb-4"></div>
      <p className="text-gray-400 text-sm">Loading jewelry collection...</p>
    </div>
  );
}

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <ShopHero />
        <Suspense fallback={<ShopProductsFallback />}>
          <ShopProducts />
        </Suspense>
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

