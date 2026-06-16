import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function BridalCollection() {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden flex items-center">
      {/* Background Image Placeholder */}
      <img
        src="/images/bridal-collection-bg.jpg"
        alt="Bridal Collection"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07512E]/90 via-[#07512E]/60 to-transparent md:w-3/4 lg:w-2/3 xl:w-1/2" />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full">
        <div className="max-w-lg">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
            Bridal Collection
          </h2>
          <p className="text-base md:text-lg text-white/90 font-sans leading-relaxed mb-8 max-w-md">
            Celebrate your special day with timeless bridal jewellery crafted to make every moment unforgettable.
          </p>
          <Link
            href="/collections/bridal"
            className="inline-block bg-[#FDE066] text-[#1a1a1a] font-semibold px-8 py-3 hover:bg-[#e6c95c] transition-colors"
          >
            Explore Now
          </Link>
        </div>
      </div>
    </section>
  );
}
