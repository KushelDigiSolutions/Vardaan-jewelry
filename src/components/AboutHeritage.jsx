"use client";

import React from "react";

export default function AboutHeritage() {
  return (
    <section className="py-16 lg:py-20 bg-[#04361E] text-white relative overflow-hidden border-t border-white/5">
      {/* Decorative background monogram overlay */}
      <div
        className="absolute inset-0 bg-no-repeat  bg-right bg-contain pointer-events-none mix-blend-screen opacity-[0.3]"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dlzxiy0tl/image/upload/v1782281607/home_page_banner_dmb1bp.jpg')`,
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      <div className="w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0 flex flex-col items-center gap-1 relative z-10 text-center">

        {/* Large Decorative Quotation Mark */}
        <div className="text-6xl font-serif text-[#FFDE59] leading-none select-none opacity-80 animate-pulse">
          “
        </div>

        {/* Central Quote */}
        <h3 className="text-[24px] md:text-[32px] font-serif font-light italic leading-relaxed text-gray-100 max-w-4xl tracking-wide">
          "A jewel is never just an ornament. It is a sacred blessing, a protection, and a quiet witness to your family's grandest milestones."
        </h3>

        {/* Quote Author */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[18px] tracking-widest font-semibold text-[#FFDE59] ">
            The Philosophy of Vardaan
          </span>
          <div className="w-12 h-[1px] bg-[#FFDE59]" />
        </div>

        {/* Staggered Grid Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 xl:min-w-300 w-full mt-8 max-w-4xl text-left border border-white/10 p-6 lg:p-10 rounded-lg bg-[#053D22]/50 backdrop-blur-md">
          <div className="flex flex-col gap-2">
            <span className="text-xl lg:text-2xl font-serif text-[#FFDE59] font-normal">Vardaan ESt. 2025</span>
            <span className="text-[12px] md:text-[14px] text-gray-400 font-semibold tracking-widest ">A new beginning</span>
            <p className="text-[14px] lg:text-[18px] text-gray-300 font-light leading-relaxed">Growing with Your Trust
              Established in 2025, building relationships through quality, honesty, and exceptional service.</p>
          </div>
          <div className="flex flex-col gap-2 border-t md:border-t-0 md:border-x border-white/10 pt-6 md:pt-0 md:px-4 lg:px-8">
            <span className="text-xl lg:text-2xl font-serif text-[#FFDE59] font-normal">Premium Craftsmanship</span>
            {/* <span className="text-[12px] md:text-[14px] text-gray-400 font-semibold tracking-widest ">Certified BIS Hallmark</span> */}
            <p className="text-[14px] lg:text-[18px] text-gray-300 font-light leading-relaxed">Thoughtfully designed with exceptional attention to detail and lasting elegance. Using premium grade 316 stainless steel with an anti-tarnish finish</p>
          </div>
          <div className="flex flex-col gap-2 border-t md:border-t-0 pt-6 md:pt-0 md:pl-4 lg:pl-0">
            <span className="text-xl lg:text-2xl font-serif text-[#FFDE59] font-normal">Quality Assured</span>
            {/* <span className="text-[12px] md:text-[14px] text-gray-400 font-semibold tracking-widest ">Lifetime Maintenance</span> */}
            <p className="text-[14px] lg:text-[18px] text-gray-300 font-light leading-relaxed">Every piece is carefully inspected and beautifully packed before it reaches you.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
