"use client";

import React from "react";

export default function AboutHero() {
  return (
    <section className="relative w-full min-h-[650px] lg:h-[80vh] flex flex-col lg:grid lg:grid-cols-12 bg-[#04361E] overflow-hidden">
      
      {/* Left Column: Dark Editorial Brand block */}
      <div className="lg:col-span-7 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 lg:py-0 relative z-10 bg-[#04361E] text-white">
        {/* Subtle Watermark overlay */}
        <div 
          className="absolute inset-0 bg-no-repeat bg-left-top bg-contain pointer-events-none mix-blend-screen opacity-15"
          style={{ backgroundImage: `url('https://res.cloudinary.com/dd9tagtiw/image/upload/v1781515128/a29bc3df60dd42fbfd5b10b5b93b4efd38995dd5_clck27.png')` }}
        />

        <div className="relative z-10 flex flex-col items-start gap-6 animate-slide-up">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#FFDE59]" />
            <span className="text-xs font-semibold tracking-[0.35em] text-[#FFDE59] uppercase">
              The Legacy Maison
            </span>
          </div>

          <h1 className="text-4xl md:text-6.5xl font-serif font-light tracking-wide leading-tight uppercase">
            Spirit in Gold, <br />
            <span className="text-[#FFDE59] font-normal tracking-[0.05em] relative">
              Blessings in Art
              <span className="absolute bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-[#FFDE59] to-transparent" />
            </span>
          </h1>

          <p className="text-xs md:text-sm text-gray-300 font-light max-w-lg leading-relaxed tracking-wide mt-2">
            Vardaan stands at the intersection of cultural legacy and fine jewelry design. Every gemstone is selected for its purity; every curve is hand-crafted to celebrate your sacred path.
          </p>

          {/* Luxury Monogram stamp */}
          <div className="flex items-center gap-4 mt-4 pt-6 border-t border-white/10 w-full max-w-sm">
            <svg 
              className="w-10 h-10 text-[#FFDE59] shrink-0"
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 20C30 20 40 30 46 50L50 70L54 50C60 30 70 20 80 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              <path d="M50 75V40" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3"/>
              <circle cx="50" cy="76" r="2" fill="currentColor"/>
            </svg>
            <div className="flex flex-col">
              <span className="text-[10px] tracking-[0.25em] font-serif uppercase text-[#FFDE59]">Vardaan Atelier</span>
              <span className="text-[9px] text-gray-400 uppercase tracking-widest font-sans font-light mt-0.5">Delhi • Paris • Milan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Immersive Graphic Block */}
      <div className="lg:col-span-5 relative w-full h-[350px] lg:h-full overflow-hidden bg-[#07512E]">
        {/* Full Image */}
        <img
          src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1200&auto=format&fit=crop"
          alt="Luxury Jewelry Atelier"
          className="w-full h-full object-cover scale-100 animate-scale-up hover:scale-105 transition-transform duration-[10s] ease-out opacity-80"
        />

        {/* Soft Gold/Emerald overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04361E]/80 via-transparent to-[#04361E]/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04361E] via-transparent to-transparent hidden lg:block pointer-events-none" />

        {/* Dynamic bottom badge */}
        <div className="absolute bottom-8 right-8 z-20 bg-white/95 text-[#07512E] py-3 px-6 rounded shadow-2xl border border-gray-100 flex items-center gap-3 backdrop-blur-md">
          <span className="text-[10px] tracking-[0.3em] font-serif uppercase font-semibold text-amber-600">Pure Gold Covenant</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#07512E]" />
        </div>
      </div>

    </section>
  );
}
