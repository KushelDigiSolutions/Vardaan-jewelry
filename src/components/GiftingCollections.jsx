import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function GiftingCollection() {
  return (
    <section className="relative w-full h-[496px] overflow-hidden flex items-center">
      {/* Background Image Placeholder */}
      <img
        src="https://res.cloudinary.com/dxlykgx6w/image/upload/v1783170164/Gemini_Generated_Image_jv0hacjv0hacjv0h_omsbsx.png"
        alt="Gifting Collection"
        className="absolute inset-0 w-full h-full object-cover object-right"
      />

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07512E]/90 via-[#07512E]/60 to-transparent md:w-3/4 lg:w-2/3 xl:w-1/2" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0">
        <div className="max-w-lg">
          <h2 className="text-[36px] sm:text-[48px] font-serif font-medium text-[#FFFFFF] mb-4 sm:mb-6 leading-tight">
           Vardaan's Gifting Edit
          </h2>
          <p className="text-[16px] sm:text-[20px] font-sans font-normal text-[#FFFFFF] leading-relaxed mb-6 sm:mb-8 max-w-md">
           Discover curated pieces that say it all — from subtle accents to statement-making designs, find the perfect expression of your affection.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center bg-[#FFDE59] text-[#101010] font-sans font-medium text-[20px] w-[184px] h-[48px] hover:bg-[#e6c543] transition-colors duration-300"
          >
            Explore Now
          </Link>
        </div>
      </div>
    </section>
  );
}
