"use client";

import React from "react";

export default function AboutTimeline() {
  const milestones = [
    {
      year: "2005",
      title: "Founding the Workshop",
      desc: "Vardaan opens as a private jewelry atelier in Delhi, crafting hand-finished custom gold jewelry for elite families."
    },
    {
      year: "2012",
      title: "Boutique Atelier Launch",
      desc: "Opening our premier catalog showroom, introducing GIA certified diamond lines and forming the bridal design atelier."
    },
    {
      year: "2018",
      title: "Covenant Certification",
      desc: "First brand to certify 100% of our jewelry catalog under strict BIS hallmark parameters, securing absolute consumer trust."
    },
    {
      year: "2026",
      title: "The Digital Era",
      desc: "Bridging generational artisan craft with high-fidelity digital custom consultation portals and secure worldwide delivery."
    }
  ];

  return (
    <section className="py-28 px-6 md:px-16 lg:px-24 bg-[#FCFCF9]">
      <div className="max-w-4xl mx-auto">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center gap-4 mb-24">
          <span className="text-[10px] tracking-[0.3em] font-semibold text-amber-600 uppercase">
            ATELIER CHRONOLOGY
          </span>
          <h2 className="text-3xl md:text-5.5xl font-serif text-[#07512E] font-light uppercase tracking-wide">
            Our Journey <span className="font-normal text-amber-600">Through Time</span>
          </h2>
          <div className="w-12 h-[2px] bg-[#FFDE59] mt-2" />
        </div>

        {/* Serpentine Timeline Layout */}
        <div className="relative border-l border-gray-100 md:border-l-0 md:before:absolute md:before:left-1/2 md:before:top-0 md:before:h-full md:before:w-[1px] md:before:bg-gray-100">
          {milestones.map((ms, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div 
                key={idx} 
                className={`relative mb-16 last:mb-0 pl-8 md:pl-0 md:flex md:w-full items-center justify-between ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Visual gap spacer for desktop */}
                <div className="hidden md:block md:w-[46%]" />

                {/* Concentric Timeline Bubble */}
                <div className="absolute left-0 top-1.5 md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 z-10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#07512E] border-2 border-[#FFDE59] shadow-lg flex items-center justify-center text-[#FFDE59] font-serif text-[10px] font-bold">
                    0{idx + 1}
                  </div>
                </div>

                {/* Timeline Card */}
                <div className="md:w-[46%] bg-white p-8 rounded-lg border border-gray-100/80 shadow-md hover:shadow-lg transition-shadow duration-300 relative group">
                  {/* Glowing Top line indicator */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-[#FFDE59]/20 group-hover:bg-[#FFDE59] transition-colors duration-500 rounded-t-lg" />
                  
                  {/* Large Year watermark */}
                  <span className="block font-serif text-4xl font-light text-amber-600 mb-2 tracking-wide">
                    {ms.year}
                  </span>
                  
                  <h3 className="font-serif text-[15px] text-[#07512E] uppercase font-normal mb-2 tracking-wide">
                    {ms.title}
                  </h3>
                  
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    {ms.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
