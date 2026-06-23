import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetails from "@/components/ProductDetails";

export default async function ProductPage({ params }) {
  // Extracting the ID from params (awaiting dynamic route params for Next.js 15 compatibility)
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <ProductDetails productId={id} />
      </main>
      <Footer />
    </>
  );
}
