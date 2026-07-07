import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PolicyPage from "@/components/PolicyPage";

export const metadata = {
  title: "Privacy Policy | Vardaan",
  description: "Read Vardaan's privacy policy for how customer information is collected, used, protected, and managed.",
};

const sections = [
  {
    title: "Information We Collect",
    content: [
      "We may collect your name, phone number, email address, billing and shipping address, order details, and messages you share with us through forms or customer support.",
      "When you browse our website, basic device and usage information may be collected to help us improve performance, security, and shopping experience.",
    ],
  },
  {
    title: "How We Use Information",
    content: [
      "Your information is used to process orders, provide customer support, share order updates, respond to enquiries, and improve our products and services.",
      "We may use your contact details to send offers or updates only when permitted. You can opt out of promotional communication at any time.",
    ],
  },
  {
    title: "Data Protection",
    content: [
      "We take reasonable steps to protect customer information from unauthorized access, misuse, loss, or disclosure.",
      "Payment information is handled through secure payment partners. We do not intentionally store complete card or sensitive payment details on our website.",
    ],
  },
  {
    title: "Sharing Information",
    content: [
      "We may share necessary details with delivery partners, payment providers, service vendors, or legal authorities where required to complete orders or comply with law.",
      "We do not sell customer personal information to third parties.",
    ],
  },
  {
    title: "Contact",
    content: [
      "For privacy-related questions or requests, please contact our support team through the contact page.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <PolicyPage
          eyebrow="Privacy Policy"
          title="Privacy Policy"
          description="Your trust matters to us. This page explains how Vardaan handles customer information across our website, orders, and support channels."
          sections={sections}
        />
      </main>
      <Footer />
    </>
  );
}
