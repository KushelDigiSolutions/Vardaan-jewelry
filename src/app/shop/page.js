import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ShopHero from "@/components/ShopHero";
import ShopProducts from "@/components/ShopProducts";

export const metadata = {
  title: "Shop Collection | Vardaan - Fine Handcrafted Jewelry",
  description: "Browse Vardaan's collection of fine handcrafted jewelry. Shop certified gold rings, earrings, signature necklaces, and bespoke bridal heirloom sets.",
  keywords: "shop vardaan jewelry, gold rings, diamond earrings, gold sets, luxury emerald necklaces, certified bridal jewelry",
};

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <ShopHero />
        <ShopProducts />
      </main>
      <Footer />
    </>
  );
}
