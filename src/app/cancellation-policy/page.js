import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PolicyPage from "@/components/PolicyPage";

export const metadata = {
  title: "Cancellation Policy | Vardaan",
  description: "Read Vardaan's cancellation policy for order cancellation requests, custom jewellery, refunds, and processing timelines.",
};

const sections = [ 
  {
    title: "Cancellation Requests",
    content: [
      "Cancellation requests should be made as soon as possible after placing an order. Requests are reviewed based on order status, product type, and whether processing has started.",
      "If the order has not been processed, packed, customized, or shipped, cancellation may be approved by our team.",
    ],
  },
  {
    title: "Customized Orders",
    content: [
      "Customized, made-to-order, engraved, resized, or specially sourced jewellery may not be eligible for cancellation once production or procurement has started.",
      "Our team will confirm the applicable terms before accepting major customization requests.",
    ],
  },
  {
    title: "Shipped Orders",
    content: [
      "Orders that have already been shipped cannot usually be cancelled. In such cases, the request may be handled under the return or refund policy if applicable.",
      "Shipping charges, payment gateway charges, or other non-recoverable costs may be deducted where applicable.",
    ],
  },
  {
    title: "Refund Timeline",
    content: [
      "For approved cancellations, refunds are processed to the original payment method or another approved mode after internal verification.",
      "Bank or payment provider timelines may vary after the refund is initiated.",
    ],
  },
  {
    title: "How To Request",
    content: [
      "To request cancellation, contact our support team with your order number, registered contact details, and reason for cancellation.",
    ],
  },
];

export default function CancellationPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow mt-[110px]">
        <PolicyPage
          eyebrow="Cancellation Policy"
          title="Cancellation Policy"
          description="This policy explains when an order can be cancelled and how approved cancellation requests are processed."
          sections={sections}
        />
      </main>
      <Footer />
    </>
  );
}
