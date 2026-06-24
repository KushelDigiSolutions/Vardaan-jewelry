import { Suspense } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BridalHero from "./BridalHero";
import BridalProducts from "./BridalProducts";

export const metadata = {
  title: "Bridal Collection | Vardaan - Fine Handcrafted Jewelry",
  description: "Celebrate your special day with timeless bridal jewellery crafted to make every moment unforgettable. Explore fine bridal sets, necklaces, and heirloom jewelry.",
  keywords: "bridal jewelry, wedding jewelry, vardaan bridal collection, gold sets, bridal necklaces, heirloom jewelry",
};

function BridalProductsFallback() {
  return (
    <div className="w-full max-w-[1192px] mx-auto px-4 py-24 text-center font-sans">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#07512E] mx-auto mb-4"></div>
      <p className="text-gray-400 text-sm">Loading exquisite bridal collection...</p>
    </div>
  );
}

export default function BridalCollectionPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <BridalHero />
        <Suspense fallback={<BridalProductsFallback />}>
          <BridalProducts />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
