"use client";

import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    image: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1781515175/5d83e7fcf52d9f49672ca2d89f45cd465fdf6f9a_smmuzz.png",
    subtitle: "NEW LAUNCH",
    title: "STYLED BY NATURE",
    description: "Capturing the pure essence of natural flora in timeless turquoise and diamond masterworks.",
    ctaText: "Shop Now",
    ctaLink: "#shop",
  },
  {
    image: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1781515175/5d83e7fcf52d9f49672ca2d89f45cd465fdf6f9a_smmuzz.png",
    subtitle: "SIGNATURE PIECES",
    title: "THE HARMONY SERIES",
    description: "Finely detailed leaf and petal motifs, designed by master artisans for your special occasions.",
    ctaText: "Explore Collection",
    ctaLink: "#collections",
    styleFilter: "hue-rotate-15 saturate-110", // Subtle visual distinction for slide 2
  },
  {
    image: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1781515175/5d83e7fcf52d9f49672ca2d89f45cd465fdf6f9a_smmuzz.png",
    subtitle: "LEGACY CRAFT",
    title: "BLESSINGS OF LIGHT",
    description: "More than a jewel, a blessing. Exquisite bridal and luxury diamond heirlooms.",
    ctaText: "Book Appointment",
    ctaLink: "#contact",
    styleFilter: "brightness-95 contrast-105", // Subtle visual distinction for slide 3
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000); // 6 seconds slide time
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full h-[50vh] sm:h-[65vh] lg:h-[80vh] min-h-[400px] overflow-hidden bg-[#04361E]">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-1000 ${
                idx === current ? "scale-100 animate-scale-up" : "scale-105"
              } ${slide.styleFilter || ""}`}
              style={{ backgroundImage: `url('${slide.image}')` }}
            />

            {/* Dark/Green gradient overlay for luxury look & high readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent md:bg-gradient-to-r md:from-black/40 md:via-[#07512E]/10 md:to-[#07512E]/25" />

            {/* Floating Content Layout (Aligned to right on desktop, centered on mobile) */}
            <div className="absolute inset-0 flex items-center justify-end px-6 sm:px-12 md:px-20 lg:px-32 max-w-7xl mx-auto z-20">
              <div className="max-w-xl text-left md:text-left flex flex-col items-start gap-3 sm:gap-4 select-none mr-0 md:mr-10">
                
                {/* Subtitle */}
                <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#FFDE59] uppercase animate-slide-up">
                  {slide.subtitle}
                </span>

                {/* Title */}
                <h2 className="text-3xl sm:text-5xl lg:text-6.5xl font-serif text-white font-normal leading-tight tracking-wide drop-shadow-sm uppercase">
                  {slide.title.split(" ").map((word, i) => (
                    <span key={i} className="block">
                      {word}
                    </span>
                  ))}
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-sm md:text-base text-gray-200/90 font-light max-w-sm sm:max-w-md leading-relaxed tracking-wide mt-1">
                  {slide.description}
                </p>

                {/* CTA Button */}
                <a
                  href={slide.ctaText === "Book Appointment" ? "#contact" : "#products"}
                  className="mt-4 sm:mt-6 bg-[#FFDE59] hover:bg-[#e6c543] text-[#07512E] hover:text-[#04361E] font-semibold text-xs sm:text-sm tracking-widest uppercase px-6 sm:px-8 py-3.5 rounded shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer font-sans"
                >
                  {slide.ctaText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Manual Arrow Controls (Desktop only) */}
      <button
        onClick={handlePrev}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-black/20 hover:bg-[#07512E]/80 text-white hover:text-[#FFDE59] transition-all duration-300 border border-white/10 z-30 cursor-pointer"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-black/20 hover:bg-[#07512E]/80 text-white hover:text-[#FFDE59] transition-all duration-300 border border-white/10 z-30 cursor-pointer"
        aria-label="Next slide"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators / Dots (Bottom Center) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-35">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              idx === current
                ? "bg-[#FFDE59] scale-110 shadow"
                : "bg-transparent border border-white/60 hover:bg-white/30"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
