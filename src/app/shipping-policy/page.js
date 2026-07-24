import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PolicyPage from "@/components/PolicyPage";

export const metadata = {
  title: "Shipping Policy | Vardaan",
  description: "Read Vardaan's shipping policy for order processing, delivery timelines, shipping charges, and delivery support.",
};

const sections = [
  {
    title: "Order Processing",
    content: [
      "Orders are processed after payment confirmation and any required verification. Processing timelines may vary based on product availability, customization, quality checks, and packaging needs.",
      "For made-to-order or customized jewellery, our team may share an estimated dispatch timeline before or after order confirmation.",
    ],
  },
  {
    title: "Delivery Timelines",
    content: [
      "Estimated delivery timelines depend on the delivery location, courier availability, and product readiness. Standard delivery may take longer during holidays, sales, or unforeseen service delays.",
      "Once an order is dispatched, tracking details may be shared through email, SMS, WhatsApp, or your registered contact details.",
    ],
  },
  {
    title: "Shipping Charges",
    content: [
      "Shipping charges, if applicable, are shown during checkout or confirmed by our team before order completion.",
      "Additional charges may apply for special handling, remote locations, international shipping, insurance, or urgent delivery requests.",
    ],
  },
  {
    title: "Delivery Responsibility",
    content: [
      "Customers should provide complete and accurate shipping information. Vardaan is not responsible for delivery delays caused by incorrect address details, unreachable contact numbers, or customer unavailability.",
      "Please inspect the package at the time of delivery and contact support promptly if the parcel appears damaged or tampered with.",
    ],
  },
  {
    title: "Support",
    content: [
      "For shipping updates or delivery concerns, contact our support team with your order number and registered contact details.",
    ],
  },
];

export default function ShippingPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow mt-[120px]">
        <PolicyPage
          eyebrow="Shipping Policy"
          title="Shipping Policy"
          description="This policy explains how Vardaan processes, dispatches, and delivers customer orders."
          sections={sections}
        />
      </main>
      <Footer />
    </>
  );
}
