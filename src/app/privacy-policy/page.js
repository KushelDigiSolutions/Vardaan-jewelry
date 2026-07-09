import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PolicyPage from "@/components/PolicyPage";

export const metadata = {
  title: "Privacy Policy | Vardaan",
  description: "Read Vardaan's privacy policy to understand how we collect, use, store, and protect your personal information.",
};

const sections = [
  {
    title: "Information Collection",
    content: [
      "We collect personal information such as your name, email address, phone number, shipping address, and billing details when you create an account, place an order, or contact us.",
      "We also collect non-personal data like browser type, device information, and site interaction statistics through cookies to optimize your overall shopping experience.",
    ],
  },
  {
    title: "Use of Information",
    content: [
      "The information collected is primarily used to process and fulfill your orders, manage payments, send dispatch tracking updates, and provide customer support.",
      "If you choose to subscribe to our communications, we may use your details to share news about new collections, seasonal blessings, promotions, or store events.",
    ],
  },
  {
    title: "Information Sharing",
    content: [
      "Vardaan does not sell, trade, or rent your personal identification information to third parties.",
      "We only share necessary information with trusted third-party partners (such as secure payment processors and reliable logistic/shipping partners) strictly to process your transaction and complete delivery.",
    ],
  },
  {
    title: "Data Security",
    content: [
      "We implement robust electronic, administrative, and physical security measures to safeguard your personal data from unauthorized access, modification, or exposure.",
      "Sensitive transaction details and payment checkouts are encrypted using industry-standard Secure Socket Layer (SSL) protocols.",
    ],
  },
  {
    title: "Cookies Policy",
    content: [
      "Our website uses cookies to remember items in your shopping cart, save your preferences, and track traffic patterns to improve site responsiveness.",
      "You can configure your web browser settings to reject cookies or warn you before they are set, though doing so might affect certain website functionalities.",
    ],
  },
  {
    title: "Your Rights & Support",
    content: [
      "You have the right to request access, correction, or deletion of your personal details. You can manage your account settings from your user profile dashboard.",
      "For any queries regarding this Privacy Policy or your data protection rights, please contact our support team.",
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
          description="This policy outlines how Vardaan collects, handles, stores, and protects your personal details."
          sections={sections}
        />
      </main>
      <Footer />
    </>
  );
}
