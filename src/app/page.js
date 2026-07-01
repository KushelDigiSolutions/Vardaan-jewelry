import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import CosmicCreations from "@/components/CosmicCreations";
import ShopByCategories from "@/components/ShopByCategories";
import ShopByPrice from "@/components/ShopByPrice";
import LatestCollection from "@/components/LatestCollection";
import BridalCollection from "@/components/BridalCollection";
import RoyallyCrafted from "@/components/RoyallyCrafted";
import NewJewelry from "@/components/NewJewelry";
import LatestCollectionBanner from "@/components/LatestCollectionBanner";
import InstagramFeed from "@/components/InstagramFeed";
import CustomerFeedback from "@/components/CustomerFeedback";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <HeroSlider />
        <CosmicCreations />
        <ShopByCategories />
        <ShopByPrice />
        <LatestCollection />
        <BridalCollection />
        <RoyallyCrafted />
        <NewJewelry />
        <LatestCollectionBanner />
        <InstagramFeed />
        <CustomerFeedback />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
