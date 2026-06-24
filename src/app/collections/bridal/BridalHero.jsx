"use client";

import React from "react";
import Link from "next/link";

export default function BridalHero() {
  return (
    <section className="relative w-full h-[380px] md:h-[450px] lg:h-[500px] overflow-hidden flex items-center bg-[#07512E]">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781586844/Bridal_Collection_image_sbbumb.jpg"
          alt="Bridal Collection Hero Background"
          className="w-full h-full object-cover object-center scale-100 animate-scale-up"
        />
      </div>

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07512E]/95 via-[#07512E]/70 to-black/30 md:w-3/4 lg:w-2/3 xl:w-1/2 z-10" />

      {/* Content Container (Standard 1192px max-width layout aligned with the rest of the site) */}
      <div className="w-full max-w-[1192px] mx-auto px-6 xl:px-0 relative z-30 flex flex-col justify-center h-full text-white">
        <div className="max-w-xl md:max-w-2xl flex flex-col items-start gap-3.5 animate-slide-up">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-[14px] sm:text-[20px] font-sans font-light text-white/85">
            <Link href="/" className="hover:text-white transition-colors duration-200">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <Link href="/shop" className="hover:text-white transition-colors duration-200">
              Collections
            </Link>
            <span className="text-white/40">/</span>
            <span>Bridal</span>
          </nav>

          {/* Title */}
          <h1 className="text-[34px] sm:text-[42px] md:text-[48px] lg:text-[52px] font-serif font-light tracking-wide leading-tight text-white mt-1">
            Bridal Collection
          </h1>

          {/* Description */}
          <p className="text-[16px] sm:text-[22px] text-white/90 font-light leading-relaxed tracking-wide max-w-[730px] mt-2.5">
            Celebrate your special day with timeless bridal jewellery crafted to make every moment unforgettable. Explore our exquisite wedding ornaments designed for eternal elegance.
          </p>

        </div>
      </div>
    </section>
  );
}
