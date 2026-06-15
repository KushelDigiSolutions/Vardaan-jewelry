import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
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
        <BrandPromise />
        <FeaturedCollections />
        <Bestsellers />
        <AboutUs />
      </main>
      <Footer />
    </>
  );
}

