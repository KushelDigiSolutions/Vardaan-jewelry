import "gtwalsheim4web/GTWalsheimPro.css";
import "./globals.css";

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
      <body className="min-h-full flex flex-col font-sans bg-[#FCFCF9] text-gray-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

