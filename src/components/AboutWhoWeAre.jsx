"use client";

import React from "react";

export default function AboutWhoWeAre() {
  return (
    <section className="py-16 lg:py-28 lg:px-6  bg-[#FCFCF9]">
      <div className="w-full max-w-[1192px] mx-auto px-4 lg:px-0 grid grid-cols-1 xl:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Drop-Cap & Narrative */}
        <div className="lg:col-span-5 flex flex-col items-start gap-6 relative">
          <span className="text-[18px] tracking-widest font-semibold text-amber-600 uppercase">
            The Design Collective
          </span>
          
          <h2 className="text-[32px] md:text-[48px] font-serif text-[#07512E] font-light leading-tight uppercase tracking-wide">
            We Are <br />
            <span className="font-normal text-[#FFDE59] bg-[#07512E] px-4 py-1.5 inline-block mt-2 shadow-sm rounded-sm">Vardaan</span>
          </h2>
          
          <div className="w-12 h-[2px] bg-[#FFDE59] mt-2" />

          {/* Narrative with drop-cap */}
          <div className="text-[18px] text-gray-600 font-light leading-relaxed tracking-wide mt-2">
            <span className="float-left text-[48px] md:text-[64px] font-serif text-[#07512E] leading-[0.8] pr-2.5 pt-1 font-normal">W</span>
            e are a collective of generational goldsmiths, certified gemologists, and modern artisans. Headquartered in our Delhi design atelier, we practice high jewelry design not as a trade, but as a commitment to heritage. We preserve India's oldest filigree and carving practices, ensuring that old-world secrets stay alive.
          </div>

          <p className="text-[18px] text-gray-600 font-light leading-relaxed tracking-wide">
            By keeping our workshops local, ethically auditing our gemstone supply chain, and co-creating designs directly with you, Vardaan ensures that every creation is a personal amulet.
          </p>

          <div className="w-full h-[1px] bg-gray-100 my-4" />

          {/* Signature Badge */}
          <div className="flex items-center gap-3">
            <span className="font-serif italic text-amber-700 text-[16px]">Design Atelier Team</span>
            <span className="w-2 h-2 rounded-full bg-[#FFDE59]" />
          </div>
        </div>

        {/* Right Side: Staggered 3-Image Editorial Gallery */}
        <div className="lg:col-span-7 grid grid-cols-12 gap-4 relative py-6">
          {/* Main Large Image */}
          <div className="col-span-12 sm:col-span-8 relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl border border-gray-100/60 z-10 hover:scale-[1.01] transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=700&auto=format&fit=crop" 
              alt="Artisan at work bench" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Second Image - Staggered Overlapping Right */}
          <div className="col-span-4 absolute right-0 top-1/2 -translate-y-2/3 w-[36%] aspect-square rounded-lg overflow-hidden shadow-2xl border-4 border-[#FCFCF9] z-20 hover:scale-105 transition-transform duration-500 hidden sm:block">
            <img 
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop" 
              alt="Gems and raw gold settings" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Third Image - Staggered Bottom Left */}
          <div className="col-span-6 col-start-3 -mt-8 relative aspect-[3/2] rounded-lg overflow-hidden shadow-xl border-4 border-[#FCFCF9] z-20 hover:scale-105 transition-transform duration-500 hidden sm:block">
            <img 
              src="https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=500&auto=format&fit=crop" 
              alt="Hand sketching jewelry curves" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
