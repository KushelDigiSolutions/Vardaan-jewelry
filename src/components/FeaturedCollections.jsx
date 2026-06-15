import React from "react";
import Link from "next/link";

const collections = [
  {
    title: "Signature Rings",
    description: "Symbol of commitment and eternal beauty, crafted in 18k gold and platinum.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
    link: "#rings",
  },
  {
    title: "Celestial Necklaces",
    description: "From statement chokers to delicate chains, styled to mirror nature's flow.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
    link: "#necklaces",
  },
  {
    title: "Elegant Earrings",
    description: "Sparkling diamond drops and classic hoops that catch the light with every move.",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=600&auto=format&fit=crop",
    link: "#earrings",
  },
  {
    title: "Luxury Bracelets",
    description: "Intricately detailed cuffs and bangles adding a touch of grace to your wrist.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop",
    link: "#bracelets",
  },
];

export default function FeaturedCollections() {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-12 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#07512E] uppercase">
            Curated Creations
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#07512E] mt-2 mb-4 font-normal tracking-wide uppercase">
            Shop by Collection
          </h2>
          <div className="w-16 h-[2px] bg-[#FFDE59] mx-auto" />
          <p className="text-xs md:text-sm text-gray-500 font-light mt-4 leading-relaxed">
            Explore our collections handcrafted by master artisans, blending centuries-old Indian heritage with modern elegance.
          </p>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col, idx) => (
            <Link 
              key={idx} 
              href={col.link}
              className="group relative h-[420px] rounded-lg overflow-hidden flex flex-col justify-end p-6 luxury-shadow border border-gray-100 bg-[#07512E]"
            >
              {/* Zooming background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${col.image}')` }}
              />

              {/* Dark overlay which fades in stronger on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/95" />

              {/* Text content */}
              <div className="relative z-10 transition-transform duration-300 transform group-hover:-translate-y-2 flex flex-col gap-2">
                <h3 className="font-serif text-white text-xl tracking-wider uppercase group-hover:text-[#FFDE59] transition-colors duration-200">
                  {col.title}
                </h3>
                <p className="text-[11px] text-gray-300 font-light line-clamp-2 leading-relaxed opacity-85 group-hover:opacity-100">
                  {col.description}
                </p>
                <span className="text-xs font-semibold tracking-widest text-[#FFDE59] uppercase mt-2 inline-flex items-center gap-1 group-hover:translate-x-1.5 transition-transform duration-300">
                  View Items &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
