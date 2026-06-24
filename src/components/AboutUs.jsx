import React from "react";

export default function AboutUs() {
  return (
    <section className="py-10 md:py-16 lg:px-6  bg-[#FAF9F6]" id="about">
      <div className="w-full max-w-[1192px] mx-auto px-4 lg:px-0 grid grid-cols-1 xl:grid-cols-12 gap-16 items-center">
        
        {/* Story Text */}
        <div className="lg:col-span-6 flex flex-col items-start gap-4">
          <span className="text-[18px] tracking-widest font-semibold text-[#07512E] uppercase">
            Our Legacy
          </span>
          <h2 className="text-[32px] md:text-[48px] font-serif text-[#07512E] font-normal leading-tight tracking-wide uppercase">
            Crafted for Grace,
            Born of Blessings
          </h2>
          <div className="w-16 h-[2px] bg-[#FFDE59] mt-1 mb-2" />
          
          <p className="text-[18px] text-gray-600 font-light leading-relaxed tracking-wide">
            At Vardaan, we believe that fine jewelry is far more than an ornament. It is an extension of your spirit, a symbol of your journey, and above all, a sacred blessing. Inspired by the intricate symmetry of natural flora, our master artisans bring years of meticulous heritage craftsmanship to every single cut.
          </p>
          
          <p className="text-[18px] text-gray-600 font-light leading-relaxed tracking-wide">
            From the initial sketch in our atelier to the final hand-polished gold setting, each diamond, emerald, and sapphire is ethically sourced and hand-selected. We don't just create jewelry; we curate memories that pass down as modern family heirlooms.
          </p>

          <div className="flex gap-4 sm:gap-8 mt-6">
            <div>
              <span className="block font-serif text-3xl text-[#07512E]">20+</span>
              <span className="text-[12px] md:text-[14px] text-gray-400 font-medium tracking-widest uppercase">Years of Artistry</span>
            </div>
            <div className="border-l border-gray-200 pl-4 sm:pl-8">
              <span className="block font-serif text-3xl text-[#07512E]">100%</span>
              <span className="text-[12px] md:text-[14px] text-gray-400 font-medium tracking-widest uppercase">Certified Gold</span>
            </div>
            <div className="border-l border-gray-200 pl-4 sm:pl-8">
              <span className="block font-serif text-3xl text-[#07512E]">10k+</span>
              <span className="text-[12px] md:text-[14px] text-gray-400 font-medium tracking-widest uppercase">Happy Patrons</span>
            </div>
          </div>
        </div>

        {/* Story Image */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          {/* Accent frame behind the image */}
          <div className="absolute inset-4 -translate-x-4 translate-y-4 border border-[#FFDE59] rounded-lg hidden sm:block pointer-events-none" />
          
          {/* Main luxury image */}
          <div className="relative w-full aspect-[4/3] sm:aspect-video lg:aspect-[4/3] rounded-lg overflow-hidden shadow-xl border border-gray-100 z-10">
            <img 
              src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=650&auto=format&fit=crop" 
              alt="Artisan crafting jewelry" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Elegant transparent overlay with brand stamp */}
            <div className="absolute bottom-4 right-4  text-[#FFDE59] text-[9px] tracking-[0.2em] font-serif uppercase px-4 py-2 rounded backdrop-blur-sm shadow-md">
                        <img src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781789797/vardan_logo_2_br1lkx.png" alt="" className="w-20 color-transparent" />

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
