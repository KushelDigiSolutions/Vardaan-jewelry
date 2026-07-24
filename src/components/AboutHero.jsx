"use client";

import React from "react";

export default function AboutHero() {
  return (
    <section
      className="relative w-full min-h-[600px] lg:h-[60vh] flex items-center bg-cover bg-center overflow-hidden mt-[118px]"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1200&auto=format&fit=crop')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#04361E]/75"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-8">
        <div className="max-w-2xl text-white">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#FFDE59]" />
            <span className="text-[18px] font-semibold tracking-widest text-[#FFDE59] uppercase">
              The Legacy Maison
            </span>
          </div>

          <h1 className="text-[40px] md:text-[64px] font-serif font-light leading-tight uppercase">
           More Than a Jewel,
            <br />
            <span className="text-[#FFDE59]">
              A Blessing
            </span>
          </h1>

          <p className="mt-6 text-[18px] text-gray-200 leading-relaxed max-w-lg">
           <span className="font-bold">Established in 2025</span>, Vardaan Jewels was founded with a vision to create jewellery that combines timeless elegance with everyday comfort.
          </p>

          <div className="mt-8 pt-6 border-t border-white/20 max-w-sm">
            <img
              src="https://res.cloudinary.com/dxlykgx6w/image/upload/v1783322584/Vardaan_jewel_logo-removebg-preview_q2mgqj.png"
              alt="Vardaan"
              className="w-44"
            />
          </div>
        </div>
      </div>
    </section>
  );
}