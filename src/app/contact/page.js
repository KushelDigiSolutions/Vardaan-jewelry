import Navbar from "@/components/Navbar";
import ContactHero from "@/components/ContactHero";
import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";
import TrustFeatures from "@/components/TrustFeatures";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import GoogleReviewCTA from "@/components/GoogleReviewCTA";

export const metadata = {
  title: "Contact Us | Vardaan - Fine Handcrafted Jewelry",
  description:
    "Connect with Vardaan's. Contact our custom design consultants, inquire about certificates, or view showroom hours.",
  keywords:
    "contact vardaan, boutique showroom delhi, custom jewelry consult, gold certification, email vardaan support",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <ContactHero />
        <ContactInfo />
        <ContactForm />
        <section className="py-16 lg:py-24 bg-[#FCFCF9] border-t border-gray-100">
          <div className="w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">
              <div className="space-y-6">
                <h2 className="text-[26px] md:text-4xl font-serif text-[#07512E] uppercase tracking-wide">
                  We can help you with:
                </h2>
                <ul className=" flex flex-col items-start space-y-3 text-md md:text-xl text-gray-700 font-light leading-relaxed">
                  <li>• Premium Anti-Tarnish Jewellery</li>
                  <li>• Ethnic Heritage Collection</li>
                  <li>• Gift Recommendations & Gift Packaging</li>
                  <li>• Bulk & Corporate Gifting</li>
                  <li>• Order Support & Customer Care</li>
                </ul>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  Have a question or need styling advice? We'd love to hear from
                  you. Your perfect piece—or your perfect gift—is just a message
                  away. ✨
                </p>
              </div>
              <div className="bg-[#07512E] w-full rounded-xl px-5 py-5 md:px-10 md:py-8  text-white shadow-xl border border-white/10">
                <h3 className="text-2xl md:text-3xl font-serif uppercase tracking-wide text-[#FFDE59]">
                  Reach Out
                </h3>
                <div className="mt-6 space-y-5 text-base md:text-lg leading-relaxed">
                  <div>
                    <p className="font-medium text-[#FFDE59] uppercase tracking-[0.2em]">
                      WhatsApp
                    </p>
                    <a  href="https://wa.me/+919217042525" target="_blank" className="mt-2 flex items-center gap-2 cursor-pointer">
                      <div className="">
                        <img
                          src="/whatsappIcon.svg"
                          alt=""
                          className="h-7 w-7"
                        />
                      </div>
                      <span className="hover:underline bg-white/20 px-2 rounded-md">Click here for Chat</span>
                    </a>
                  </div>
                  <div>
                    <p className="font-medium text-[#FFDE59] uppercase tracking-[0.2em]">
                      Email
                    </p>
                    <a  href="mailto:vardaan.1225@gmail.com" className="mt-2 flex items-center gap-2 cursor-pointer text-white ">
                      <img
                        src="/gmail.svg"
                        alt=""
                        className="h-6 w-6 text-white "
                      />
                      <span className="hover:underline">vardaan.1225@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <TrustFeatures />
        <FAQ />
        <GoogleReviewCTA />
      </main>
      <Footer />
    </>
  );
}
