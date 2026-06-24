"use client";

import React from "react";

export default function AboutCraftsmanship() {
  const steps = [
    {
      num: "I",
      title: "Design Atelier",
      desc: "Every jewelry creation begins as a hand-drawn vision. In our New Delhi design atelier, we sketch organic flora patterns and trace geometric lines to fit modern silhouettes.",
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop"
    },
    {
      num: "II",
      title: "Ethical Gem Sourcing",
      desc: "Our gemologists procure conflict-free diamonds and precious stones directly from certified mines. Every stone is audited for weight density, fire, and organic origin.",
      img: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format&fit=crop"
    },
    {
      num: "III",
      title: "Goldsmithing Craft",
      desc: "Generational craftsmen alloy fine gold and spend up to 90 hours on a single bridal set. We specialize in micro-pave gem setting and hand-carved filigree patterns.",
      img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop"
    },
    {
      num: "IV",
      title: "Atelier Buffing & Audit",
      desc: "Before a Vardaan piece is delivered, it undergo multiple rounds of hand polishing and quality audits, ensuring a signature, mirror-like jewelry shine.",
      img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-16 lg:py-28 lg:px-6 bg-[#FCFCF9] border-y border-gray-100">
      <div className="w-full max-w-[1192px] mx-auto px-4 lg:px-0">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <span className="text-[18px] tracking-widest font-semibold text-amber-600 uppercase">
            ATELIER CRAFTSMANSHIP
          </span>
          <h2 className="text-[32px] md:text-[48px] font-serif text-[#07512E] font-light uppercase tracking-wide">
            The Journey of <span className="font-normal text-amber-600">Creation</span>
          </h2>
          <div className="w-12 h-[2px] bg-[#FFDE59] mt-2" />
        </div>

        {/* Dynamic Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="relative aspect-[3/4] rounded-lg overflow-hidden group shadow-lg cursor-pointer"
            >
              {/* Background Image with Scale effect */}
              <img 
                src={step.img} 
                alt={step.title}
                className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Solid color filter overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#04361E] via-[#04361E]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Fixed top stamp */}
              <div className="absolute top-6 left-6 text-[#FFDE59] font-serif text-lg font-light italic">
                {step.num}
              </div>

              {/* Slide Up Content Container */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end translate-y-16 group-hover:translate-y-0 transition-transform duration-500 ease-out h-[60%] bg-gradient-to-t from-[#04361E] to-transparent">
                <h3 className="font-serif text-[20px] md:text-[24px] text-[#FFDE59] uppercase tracking-wide mb-2 font-normal">
                  {step.title}
                </h3>
                <p className="text-[18px] text-gray-300 font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
