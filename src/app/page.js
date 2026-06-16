import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import CosmicCreations from "@/components/CosmicCreations";
import ShopByCategories from "@/components/ShopByCategories";
import LatestCollection from "@/components/LatestCollection";
import BridalCollection from "@/components/BridalCollection";
import RoyallyCrafted from "@/components/RoyallyCrafted";
import NewJewelry from "@/components/NewJewelry";
import LatestCollectionBanner from "@/components/LatestCollectionBanner";
import InstagramFeed from "@/components/InstagramFeed";
import CustomerFeedback from "@/components/CustomerFeedback";
import FAQ from "@/components/FAQ";
import BrandPromise from "@/components/BrandPromise";
import FeaturedCollections from "@/components/FeaturedCollections";
import Bestsellers from "@/components/Bestsellers";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <HeroSlider />
        <CosmicCreations />
        <ShopByCategories />
        <LatestCollection />
        <BridalCollection />
        <RoyallyCrafted />
        <NewJewelry />
        <LatestCollectionBanner />
        <InstagramFeed />
        <CustomerFeedback />
        <FAQ />
        <BrandPromise />
        <FeaturedCollections />
        <Bestsellers />
        <AboutUs />
      </main>
      <Footer />
    </>
  );
}

