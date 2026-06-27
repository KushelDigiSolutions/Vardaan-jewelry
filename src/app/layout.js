import "gtwalsheim4web/GTWalsheimPro.css";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { ToastProvider } from "../context/ToastContext";
// import { LoaderProvider } from "../context/LoaderContext";
import CartDrawer from "../components/CartDrawer";
import LoaderProvider from "@/context/LoaderContext";

export const metadata = {
  title: "Vardaan - More than a Jewel, a Blessing",
  description: "Discover Vardaan's exquisite collection of fine jewelry. Handcrafted gold, diamond, and precious gemstone designs styled by nature.",
  keywords: "fine jewelry, gold rings, diamond necklace, vardaan, collections, luxury jewelry, blessings",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col font-sans bg-[#111111] text-gray-900 overflow-x-hidden">
        
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

