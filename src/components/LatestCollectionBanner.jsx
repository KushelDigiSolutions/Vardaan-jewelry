import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function LatestCollectionBanner() {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden flex items-center">
      {/* Background Image */}
      <img
        src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781526285/Latest_Collection_avkkym.png"
        alt="Latest Collection"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07512E]/95 via-[#07512E]/60 to-transparent md:w-3/4 lg:w-1/2" />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full">
        <div className="max-w-md">
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif text-white mb-4 leading-tight">
            Latest Collection
          </h2>
          <p className="text-base md:text-lg text-white/95 font-sans leading-relaxed mb-8">
            Discover the Newest Expressions of Elegance
          </p>
          <Link
            href="/collections/latest"
            className="inline-block bg-[#FDE066] text-[#1a1a1a] font-semibold px-8 py-3 hover:bg-[#e6c95c] transition-colors"
          >
            Explore Now
          </Link>
        </div>
      </div>
    </section>
  );
}
