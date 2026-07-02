"use client";

import React from "react";

export default function AboutHeritage() {
  return (
    <section className="py-16 lg:py-20 bg-[#04361E] text-white relative overflow-hidden border-t border-white/5">
      {/* Decorative background monogram overlay */}
      <div 
        className="absolute inset-0 bg-no-repeat  bg-right bg-contain pointer-events-none mix-blend-screen opacity-[0.3]"
        style={{ backgroundImage: `url('https://res.cloudinary.com/dlzxiy0tl/image/upload/v1782281607/home_page_banner_dmb1bp.jpg')` ,
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 xl:min-w-300 w-full mt-8 max-w-4xl text-left border border-white/10 p-10 rounded-lg bg-[#053D22]/50 backdrop-blur-md">
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-serif text-[#FFDE59] font-normal">Vardaan Est. 2005</span>
            <span className="text-[12px] md:text-[14px] text-gray-400 font-semibold tracking-widest ">Vardaan Heritage</span>
            <p className="text-[18px] text-gray-300 font-light leading-relaxed">Established in 2005, Vardaan began as a premier jewellery house crafting sacred, timeless heirloom pieces with uncompromising dedication.</p>
          </div>
          <div className="flex flex-col gap-2 border-t md:border-t-0 md:border-x border-white/10 pt-6 md:pt-0 md:px-8">
            <span className="text-2xl font-serif text-[#FFDE59] font-normal">100% Hallmark</span>
            <span className="text-[12px] md:text-[14px] text-gray-400 font-semibold tracking-widest ">Certified BIS Hallmark</span>
            <p className="text-[18px] text-gray-300 font-light leading-relaxed">Every piece of Vardaan jewellery adheres to strict BIS hallmarking standards and IGI diamond certifications, ensuring absolute purity and trust.</p>
          </div>
          <div className="flex flex-col gap-2 border-t md:border-t-0 pt-6 md:pt-0">
            <span className="text-2xl font-serif text-[#FFDE59] font-normal">Vardaan Care</span>
            <span className="text-[12px] md:text-[14px] text-gray-400 font-semibold tracking-widest ">Lifetime Maintenance</span>
            <p className="text-[18px] text-gray-300 font-light leading-relaxed">We stand by our craftsmanship with complimentary professional jewellery cleaning, rigorous inspection, and polishing for the lifetime of your product.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
