import Navbar from "@/components/Navbar";
import ContactHero from "@/components/ContactHero";
import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
 
export const metadata = {
  title: "Contact Us | Vardaan - Fine Handcrafted Jewelry",
  description: "Connect with Vardaan's Delhi atelier. Contact our custom design consultants, inquire about certificates, or view showroom hours.",
  keywords: "contact vardaan, boutique showroom delhi, custom jewelry consult, gold certification, email vardaan support",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <ContactHero />
        <ContactInfo />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
