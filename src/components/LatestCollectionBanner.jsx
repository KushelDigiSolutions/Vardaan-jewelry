import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function LatestCollectionBanner() {
  return (
    <section className="relative w-full h-[496px] overflow-hidden flex items-center">
      {/* Background Image */}
      <img
        src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781526285/Latest_Collection_avkkym.png"
        alt="Latest Collection"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Image Overlay for Text Readability */}
      <img
        src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781605418/Overlay_for_readability_2_ylbztd.png"
        alt="Overlay"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0">
        <div className="max-w-md">
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif text-white mb-4 leading-tight">
            Everyday Icons
          </h2>
          <p className="text-base md:text-[20px] text-white/95 font-sans leading-relaxed mb-8">
            Discover the Everyday Expressions of Elegance and Style.
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
