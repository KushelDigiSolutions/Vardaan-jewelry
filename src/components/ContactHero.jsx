"use client";

import React from "react";

export default function ContactHero() {
  return (
    <section className="relative h-[55vh] min-h-[380px] flex items-center justify-center overflow-hidden bg-[#04361E] px-6">
      
      {/* Outer Golden Border Frames */}
      <div className="absolute inset-4 border border-[#FFDE59]/20 pointer-events-none z-20" />
      <div className="absolute inset-5 border border-[#FFDE59]/10 pointer-events-none z-20" />

      {/* Decorative brand pattern backdrop overlay */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-center bg-cover pointer-events-none mix-blend-screen opacity-10"
        style={{ backgroundImage: `url('https://res.cloudinary.com/dd9tagtiw/image/upload/v1781515128/a29bc3df60dd42fbfd5b10b5b93b4efd38995dd5_clck27.png')` }}
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-5 animate-slide-up text-white">
        
        {/* Exhibition Gold Medallion Badge */}
        <div className="relative w-20 h-20 flex items-center justify-center mb-2">
          {/* Rotating outer gold dotted ring */}
          <div className="absolute inset-0 border border-dashed border-[#FFDE59]/40 rounded-full animate-[spin_20s_linear_infinite]" />
          {/* Core gold emblem */}
          <div className="w-14 h-14 rounded-full bg-[#07512E] border border-[#FFDE59]/45 flex items-center justify-center shadow-xl text-[#FFDE59]">
            <svg className="w-6 h-6" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 20C30 20 40 30 46 50L50 70L54 50C60 30 70 20 80 20" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
              <circle cx="50" cy="76" r="2.5" fill="currentColor"/>
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="w-4 h-[1px] bg-[#FFDE59]" />
          <span className="text-[10px] font-semibold tracking-[0.4em] text-[#FFDE59] uppercase">
            Atelier Concierge Desk
          </span>
          <span className="w-4 h-[1px] bg-[#FFDE59]" />
        </div>
        
        <h1 className="text-3xl md:text-5xl font-serif font-light text-white leading-tight tracking-wider uppercase">
          A Covenant of <br />
          <span className="text-[#FFDE59] font-normal tracking-[0.05em] relative">
            Personal Service
          </span>
        </h1>
        
        <div className="w-12 h-[1px] bg-[#FFDE59]/30 my-1" />
        
        <p className="text-xs text-gray-300 font-light max-w-md leading-relaxed tracking-wide">
          Our design curators are available to guide you through bespoke custom selections, GIA certification inquiries, or private suite reservations.
        </p>
      </div>

    </section>
  );
}
