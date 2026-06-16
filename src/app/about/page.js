import Navbar from "@/components/Navbar";
import AboutHero from "@/components/AboutHero";
import AboutWhoWeAre from "@/components/AboutWhoWeAre";
import AboutHeritage from "@/components/AboutHeritage";
import AboutVisionMission from "@/components/AboutVisionMission";
import AboutCraftsmanship from "@/components/AboutCraftsmanship";
import AboutValues from "@/components/AboutValues";
import AboutTimeline from "@/components/AboutTimeline";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us | Vardaan - Fine Handcrafted Jewelry",
  description: "Learn more about Vardaan's legacy of blessings, who we are, our vision & mission, 20-year history, ethical diamond sourcing, and bespoke fine jewelry craftsmanship.",
  keywords: "about vardaan, who we are vardaan, vision mission vardaan, jewelry story, ethical diamonds, gold hallmarking, jewelry timeline, bespoke gold",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <AboutHero />
        <AboutWhoWeAre />
        <AboutHeritage />
        <AboutVisionMission />
        <AboutCraftsmanship />
        <AboutValues />
        <AboutTimeline />
      </main>
      <Footer />
    </>
  );
}
