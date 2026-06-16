import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function BridalCollection() {
  return (
    <section className="relative w-full h-[496px] overflow-hidden flex items-center">
      {/* Background Image Placeholder */}
      <img
        src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781586844/Bridal_Collection_image_sbbumb.jpg"
        alt="Bridal Collection"
        className="absolute inset-0 w-full h-full object-cover object-right"
      />

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07512E]/90 via-[#07512E]/60 to-transparent md:w-3/4 lg:w-2/3 xl:w-1/2" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1192px] mx-auto px-4 lg:px-0">
        <div className="max-w-lg">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
            Bridal Collection
          </h2>
          <p className="text-base md:text-lg text-white/90 font-sans leading-relaxed mb-8 max-w-md">
            Celebrate your special day with timeless bridal jewellery crafted to make every moment unforgettable.
          </p>
          <Link
            href="/collections/bridal"
            className="inline-flex items-center justify-center bg-[#FFDE59] text-[#101010] font-sans font-semibold text-[20px] w-[184px] h-[48px] hover:bg-[#e6c543] transition-colors"
          >
            Explore Now
          </Link>
        </div>
      </div>
    </section>
  );
}
