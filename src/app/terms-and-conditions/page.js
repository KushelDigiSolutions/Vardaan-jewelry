import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PolicyPage from "@/components/PolicyPage";

export const metadata = {
  title: "Terms & Conditions | Vardaan",
  description: "Read Vardaan's terms and conditions for website use, orders, pricing, product information, and customer responsibilities.",
};

const sections = [
  {
    title: "Website Use",
    content: [
      "By using this website, you agree to access it for lawful purposes and provide accurate information when placing orders or contacting us.",
      "We may update website content, product details, pricing, and these terms whenever needed.",
    ],
  },
  {
    title: "Product Information",
    content: [
      "We try to display product images, descriptions, sizes, weights, and prices as accurately as possible. Minor variations may occur due to handcrafted work, screen display, gemstone character, or product availability.",
      "Final product availability and pricing may be confirmed before order acceptance.",
    ],
  },
  {
    title: "Orders & Payments",
    content: [
      "Orders are accepted only after successful payment confirmation or any required verification. Vardaan reserves the right to cancel or refuse an order if information is incomplete, unavailable, or appears suspicious.",
      "Customers are responsible for ensuring that shipping details and contact information are correct at the time of purchase.",
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      "All website content, including images, designs, text, branding, and product presentation, belongs to Vardaan or its content partners.",
      "Content may not be copied, reused, or distributed without written permission.",
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      "Vardaan is not responsible for losses caused by misuse of the website, incorrect customer information, third-party service interruptions, or circumstances beyond reasonable control.",
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <PolicyPage
          eyebrow="Terms & Conditions"
          title="Terms & Conditions"
          description="These terms outline how customers may use the Vardaan website and how orders, product details, and services are managed."
          sections={sections}
        />
      </main>
      <Footer />
    </>
  );
}
