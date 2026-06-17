"use client";

import React from "react";
import Link from "next/link";

export default function ShopHero() {
  return (
    <section className="relative w-full h-[350px] overflow-hidden flex items-center bg-[#07512E]">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781698531/shop_page_banner_uqgl7s.png"
          alt="New Jewelry Arrivals Hero Background"
          className="w-full h-full object-cover object-[center_35%] scale-100 animate-scale-up"
        />
      </div>

      {/* Image Overlay for Readability */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <img
          src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781698390/Overlay_for_readability_phf7pk.png"
          alt="Overlay"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container (Standard 1192px max-width layout aligned with the rest of the site) */}
      <div className="w-full max-w-[1220px] mx-auto px-6 xl:px-0 relative z-30 flex flex-col justify-center h-full text-white">
        <div className="max-w-xl md:max-w-2xl flex flex-col items-start gap-3.5 animate-slide-up">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-[14px] sm:text-[20px]  font-sans font-light text-white/85">
            <Link href="/" className="hover:text-white transition-colors duration-200">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span>Jewelry</span>
          </nav>

          {/* Title */}
          <h1 className="text-[34px] sm:text-[42px] md:text-[48px] lg:text-[52px] font-serif font-light tracking-wide leading-tight text-white mt-1">
            New Jewelry Arrivals
          </h1>

          {/* Description */}
          <p className="text-[16px] sm:text-[22px]  text-white/90 font-light leading-relaxed tracking-wide max-w-[730px] mt-2.5">
            Explore our latest jewelry styles. This curated collection of new jewelry arrivals includes timeless pieces and on-trend designs for women and men, each crafted to elevate everyday looks.
          </p>

        </div>
      </div>
    </section>
  );
}
