import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Vardaan - More than a Jewel, a Blessing",
  description: "Discover Vardaan's exquisite collection of fine jewelry. Handcrafted gold, diamond, and precious gemstone designs styled by nature.",
  keywords: "fine jewelry, gold rings, diamond necklace, vardaan, collections, luxury jewelry, blessings",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FCFCF9] text-gray-900">
        {children}
      </body>
    </html>
  );
}

