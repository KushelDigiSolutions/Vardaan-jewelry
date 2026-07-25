import "gtwalsheim4web/GTWalsheimPro.css";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { ToastProvider } from "../context/ToastContext";
// import { LoaderProvider } from "../context/LoaderContext";
import CartDrawer from "../components/CartDrawer";
import LoaderProvider from "@/context/LoaderContext";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata = {
  title: "Vardaan - More than a Jewel, a Blessing",
  description:
    "Explore Vardaan's premium collection of roll gold artificial jewellery, featuring elegant necklaces, earrings, rings, bangles, bracelets, and stylish accessories crafted for every occasion.",
  keywords:
    "roll gold jewellery, artificial jewellery, fashion jewellery, imitation jewellery, women's jewellery, necklaces, earrings, rings, bangles, bracelets, Vardaan",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-[#111111] text-gray-900 overflow-x-hidden">
        <ScrollToTop />
        <AuthProvider>
          <ToastProvider>
            <LoaderProvider>
              <CartProvider>
                <div className="w-full max-w-[1720px] mx-auto min-h-screen flex flex-col bg-[#FCFCF9] relative shadow-2xl overflow-x-hidden">
                  {children}
                  <CartDrawer />
                </div>
              </CartProvider>
            </LoaderProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
