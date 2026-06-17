import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetails from "@/components/ProductDetails";
import YouMayAlsoLike from "@/components/YouMayAlsoLike";

export default function ProductPage({ params }) {
  // Extracting the ID from params just to be correct structurally, 
  // though we are rendering a static/hardcoded product for now.
  const { id } = params;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <ProductDetails />
        <YouMayAlsoLike />
      </main>
      <Footer />
    </>
  );
}
