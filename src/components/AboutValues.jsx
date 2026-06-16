"use client";

import React from "react";
import { FiCheckSquare, FiGlobe, FiLayers, FiCompass } from "react-icons/fi";

export default function AboutValues() {
  const values = [
    {
      icon: FiCheckSquare,
      title: "BIS Certified Gold",
      desc: "Every single piece carries the government recognized Hallmark tag, guaranteeing exact purity specification (18k or 22k gold)."
    },
    {
      icon: FiGlobe,
      title: "Conflict-Free Jewels",
      desc: "We adhere strictly to international sourcing treaties, ensuring our stones are ethical, clean, and support mining communities."
    },
    {
      icon: FiLayers,
      title: "Bespoke Sculpting",
      desc: "We offer one-on-one virtual design sessions, turning your emotional family moments into personalized custom gold designs."
    },
    {
      icon: FiCompass,
      title: "Legacy Security",
      desc: "Vardaan provides lifetime maintenance covenants, including complimentary inspection, restoration, and cleaning."
    }
  ];

  return (
    <section className="py-28 px-6 md:px-16 lg:px-24 bg-[#07512E] text-white relative overflow-hidden">
      {/* Background brand stamp watermark */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-center bg-contain pointer-events-none mix-blend-screen opacity-[0.08]"
        style={{ backgroundImage: `url('https://res.cloudinary.com/dd9tagtiw/image/upload/v1781515128/a29bc3df60dd42fbfd5b10b5b93b4efd38995dd5_clck27.png')` }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <span className="text-[10px] tracking-[0.3em] text-[#FFDE59] uppercase font-semibold">
            Brand Promises
          </span>
          <h2 className="text-3xl md:text-5.5xl font-serif text-white font-light uppercase tracking-wide">
            Covenants of <span className="font-normal text-[#FFDE59]">Purity</span>
          </h2>
          <div className="w-12 h-[2px] bg-[#FFDE59] mt-2" />
        </div>

        {/* Glassmorphic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div 
                key={idx}
                className="relative bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#FFDE59]/40 p-8 rounded-lg shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
              >
                {/* Concentric Gold Ring Icon */}
                <div className="relative w-14 h-14 rounded-full border border-[#FFDE59]/25 flex items-center justify-center mb-6 group-hover:border-[#FFDE59] transition-colors duration-500">
                  <div className="w-10 h-10 rounded-full bg-[#053D22] text-[#FFDE59] flex items-center justify-center border border-white/5">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                </div>

                {/* Text */}
                <h3 className="font-serif text-lg text-[#FFDE59] uppercase tracking-wide mb-3 font-normal">
                  {val.title}
                </h3>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
