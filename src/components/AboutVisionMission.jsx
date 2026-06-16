"use client";

import React from "react";

export default function AboutVisionMission() {
  return (
    <section className="py-16 lg:py-32 bg-[#FAF9F6] overflow-hidden">
      <div className="w-full max-w-[1192px] mx-auto px-4 lg:px-0 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Descriptive Section Heading */}
        <div className="lg:col-span-4 flex flex-col items-start gap-4">
          <span className="text-[14px] md:text-[16px] tracking-widest font-semibold text-amber-600 uppercase">
            Maison Principles
          </span>
          <h2 className="text-[32px] md:text-[48px] font-serif text-[#07512E] font-light leading-tight uppercase tracking-wide">
            Our Purpose & <br />
            <span className="font-normal text-amber-600">Direction</span>
          </h2>
          <div className="w-12 h-[2px] bg-[#FFDE59] mt-1" />
          <p className="text-[14px] md:text-[16px] text-gray-500 font-light leading-relaxed max-w-xs mt-2">
            Explore the dual forces driving our designs: a clear future vision combined with an unwavering daily mission.
          </p>
        </div>

        {/* Offset Overlapping Cards Container */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-6 relative mt-12 lg:mt-0">
          
          {/* Card 1: Our Vision (Offset Downwards) */}
          <div className="bg-[#07512E] text-white p-8 md:p-10 rounded-lg shadow-xl hover:-translate-y-4 transition-all duration-500 relative border border-white/5 lg:translate-y-6 flex flex-col gap-4 group">
            <span className="text-[12px] md:text-[14px] tracking-widest text-[#FFDE59] uppercase font-semibold">
              01 • Future
            </span>
            <h3 className="text-[24px] md:text-[32px] font-serif uppercase tracking-wide text-[#FFDE59]">
              Our Vision
            </h3>
            <p className="text-[14px] md:text-[16px] text-gray-200 font-light leading-relaxed">
              To be a globally recognized boutique jeweler, where each creation is celebrated for its organic floral geometry and holds a legacy of blessings for the generations that inherit it.
            </p>
            {/* Elegant V watermark */}
            <div className="absolute right-4 bottom-4 text-white/5 font-serif text-8xl leading-none select-none font-bold">
              V
            </div>
          </div>

          {/* Card 2: Our Mission (Offset Upwards) */}
          <div className="bg-white text-gray-900 p-8 md:p-10 rounded-lg shadow-xl hover:-translate-y-4 transition-all duration-500 relative border border-gray-100 lg:-translate-y-6 flex flex-col gap-4 group">
            <span className="text-[12px] md:text-[14px] tracking-widest text-amber-600 uppercase font-semibold">
              02 • Execution
            </span>
            <h3 className="text-[24px] md:text-[32px] font-serif uppercase tracking-wide text-[#07512E] group-hover:text-amber-600 transition-colors">
              Our Mission
            </h3>
            <p className="text-[14px] md:text-[16px] text-gray-600 font-light leading-relaxed">
              To keep the ancestral craft of fine handcrafting alive, enforce strict transparency with GIA gemstone grading, and provide direct atelier customization services for our patrons.
            </p>
            {/* Elegant M watermark */}
            <div className="absolute right-4 bottom-4 text-gray-100/50 font-serif text-8xl leading-none select-none font-bold">
              M
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
