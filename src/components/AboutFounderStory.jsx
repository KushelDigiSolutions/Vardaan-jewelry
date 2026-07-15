"use client";

import React from "react";

export default function AboutFounderStory() {
  return (
    <section className="py-16 lg:py-24 bg-[#FCFCF9] overflow-hidden" id="founder-story">
      <div className="w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Staggered 2-Image Editorial Gallery */}
        <div className="lg:col-span-6 flex items-center justify-center order-2 lg:order-1">
          <div className="relative w-full max-w-[480px] aspect-[4/5] sm:aspect-[1.1] lg:aspect-[4/5]">
            
            {/* Elegant Accent Outline Behind Main Image */}
            <div className="absolute top-4 left-4 w-[70%] h-[75%] border border-[#FFDE59] rounded-lg -z-10 hidden sm:block" />
            
            {/* Main Background Image */}
            <div className="absolute top-0 left-0 w-[72%] h-[76%] rounded-lg overflow-hidden shadow-lg border border-gray-100/50 z-10 hover:scale-[1.02] transition-transform duration-500 ease-out">
              <img 
                src="https://res.cloudinary.com/dxlykgx6w/image/upload/v1783925265/WhatsApp_Image_2026-07-11_at_3.46.44_PM_ysxye3.jpg" 
                alt="Shilpi Jindal - Founder of Vardaan" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Staggered Overlapping Foreground Image */}
            <div className="absolute bottom-0 right-0 w-[64%] h-[68%] rounded-lg overflow-hidden shadow-2xl border-[6px] border-[#FCFCF9] z-20 hover:scale-[1.03] transition-transform duration-500 ease-out">
              <img 
                src="https://res.cloudinary.com/dxlykgx6w/image/upload/v1783925266/WhatsApp_Image_2026-07-11_at_3.46.44_PM_1_k9slt1.jpg" 
                alt="Shilpi & Vikas Jindal - Founders" 
                className="w-full h-full object-cover"
              />
              {/* Subtle brand tag overlay */}
              <div className="absolute bottom-3 right-3 bg-[#07512E]/90 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] tracking-wider text-[#FFDE59] uppercase font-serif z-30 shadow-md">
                Est. 2025
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: The Story Content */}
        <div className="lg:col-span-6 flex flex-col items-start gap-6 order-1 lg:order-2">
          <div className="flex flex-col gap-2">
            <span className="text-[14px] md:text-[16px] tracking-[0.2em] font-semibold text-amber-600 uppercase">
              The Hearts Behind Vardaan
            </span>
            <h2 className="text-[32px] md:text-[44px] font-serif text-[#07512E] font-normal leading-tight uppercase tracking-wide">
              Our Journey & <br />
              <span className="italic text-amber-600 font-light lowercase first-letter:uppercase">Blessings</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#FFDE59] mt-2" />
          </div>

          <div className="space-y-4 text-[17px] md:text-[18px] text-gray-600 font-light leading-relaxed tracking-wide">
            <p className="font-medium text-gray-800">
              Vardaan began in 2025 with a dream that had been quietly growing for years.
            </p>
            <p>
              I am <span className="font-semibold text-[#07512E]">Shilpi Jindal</span>, an MBA in Finance from a business family, a wife, and a proud mother of three beautiful children. While I never chose a corporate career, I always knew I wanted to create something meaningful—something I could build with passion while staying close to my family.
            </p>
            <p>
              Together with my husband, <span className="font-semibold text-[#07512E]">Vikas Jindal</span>, we started Vardaan with one simple belief: a jewellery brand should earn trust before it earns a sale. We wanted to offer premium, thoughtfully crafted jewellery backed by honesty, transparency, and genuine care for every customer.
            </p>
            <p>
              The name <span className="font-semibold text-[#07512E]">Vardaan </span> comes from our son, who has been the greatest blessing in our lives. That is why every piece we deliver carries the same emotion—not just to be worn, but to become a part of someone&apos;s special moments.
            </p>
          </div>

          {/* Core Philosophy Quote Card */}
          <div className="w-full mt-2 p-6 bg-[#07512E] text-white rounded-lg border border-white/5 relative shadow-lg overflow-hidden group">
            <div className="absolute -top-3 -right-3 text-7xl font-serif text-[#FFDE59]/10 select-none pointer-events-none group-hover:scale-110 transition-transform duration-500">
              ”
            </div>
            <p className="text-[16px] md:text-[17px] italic font-light leading-relaxed text-gray-100 z-10 relative">
              &ldquo;Vardaan is more than our business. It is our dream, our promise, and our blessing to every customer.&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 pt-3 border-t border-white/10 gap-2">
              <span className="text-[12px] md:text-[13px] tracking-widest text-[#FFDE59] uppercase font-semibold">
                More Than a Jewel, A Blessing.
              </span>
              <span className="text-[13px] font-serif italic text-gray-300">
                — Shilpi & Vikas Jindal
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
