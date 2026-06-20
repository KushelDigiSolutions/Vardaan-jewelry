import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import YouMayAlsoLike from "@/components/YouMayAlsoLike";
import CheckoutClient from "./CheckoutClient";

export const metadata = {
  title: "Checkout - Vardaan Jewelry",
  description: "Secure checkout page.",
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#fdfbf6]">
      <Navbar />
      <CheckoutClient />
      <YouMayAlsoLike />
      <Footer />
    </main>
  );
}
