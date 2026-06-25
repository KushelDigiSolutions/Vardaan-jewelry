import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PolicyPage from "@/components/PolicyPage";

export const metadata = {
  title: "Return & Refund Policy | Vardaan",
  description: "Read Vardaan's return and refund policy for eligibility, return requests, inspection, and refund timelines.",
};

const sections = [
  {
    title: "Return Eligibility",
    content: [
      "Return requests are reviewed based on product condition, order type, delivery date, and the reason for return. Items should be unused, undamaged, and returned with original packaging, certificates, tags, invoices, and accessories where applicable.",
      "Customized, engraved, resized, made-to-order, or specially sourced jewelry may not be eligible for return unless there is a verified defect or order issue.",
    ],
  },
  {
    title: "Return Request Process",
    content: [
      "To request a return, contact our support team with your order number, registered contact details, product photos, and reason for the request.",
      "Our team will review the request and share the next steps if the return is eligible.",
    ],
  },
  {
    title: "Inspection",
    content: [
      "Returned products are inspected after they are received. Refunds or replacements are approved only after verification of product condition and return eligibility.",
      "If an item is found used, altered, damaged, incomplete, or different from the original dispatched product, the return may be rejected.",
    ],
  },
  {
    title: "Refund Timeline",
    content: [
      "Approved refunds are processed to the original payment method or another approved mode after inspection and internal confirmation.",
      "Bank, card, or payment provider timelines may vary after the refund is initiated.",
    ],
  },
  {
    title: "Non-Refundable Charges",
    content: [
      "Shipping charges, payment gateway fees, customization charges, certification charges, or other non-recoverable costs may be deducted where applicable.",
    ],
  },
];

export default function ReturnRefundPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <PolicyPage
          eyebrow="Return & Refund Policy"
          title="Return & Refund Policy"
          description="This policy explains how return requests are reviewed and how approved refunds are processed."
          sections={sections}
        />
      </main>
      <Footer />
    </>
  );
}
