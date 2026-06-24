"use client";

import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781603449/hero_banner_optimized_jkbhox.png",
    subtitle: "NEW LAUNCH",
    title: "STYLED BY\nNATURE",
    ctaText: "Shop Now",
    ctaLink: "/shop",
  },
  {
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1782281607/home_page_banner_dmb1bp.jpg",
    subtitle: "SIGNATURE PIECES",
    title: "THE HARMONY\nSERIES",
    ctaText: "Explore Collection",
    ctaLink: "/shop",
    styleFilter: "hue-rotate-15 saturate-110", // Subtle visual distinction for slide 2
  },
  {
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1782281607/home_page_banner_image_czgpzk.jpg",
    subtitle: "LEGACY CRAFT",
    title: "BLESSINGS OF\nLIGHT",
    ctaText: "Book Appointment",
    ctaLink: "/contact",
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
    <section className="relative w-full h-[50vh] sm:h-[65vh] lg:h-[582px] min-h-[400px] overflow-hidden bg-[#04361E]">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            {/* Background Image */}
            <div
              className={`absolute inset-0 bg-cover bg-center ${slide.styleFilter || ""}`}
              style={{ backgroundImage: `url('${slide.image}')` }}
            />

            {/* Dark/Green gradient overlay for luxury look & high readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent md:bg-gradient-to-r md:from-black/40 md:via-[#07512E]/10 md:to-[#07512E]/25" />

            {/* Floating Content Layout */}
            <div className="absolute inset-0 max-w-[1440px] mx-auto z-20 pointer-events-none">
              <div className="pointer-events-auto flex flex-col items-start justify-between select-none
                absolute 
                bottom-12 left-6
                lg:bottom-auto lg:right-auto lg:top-1/2 lg:-translate-y-1/2 lg:left-[1056px]
                w-[260px] sm:h-[272px] gap-4 sm:gap-0">

                {/* Subtitle */}
                <span className="text-[16px] sm:text-[24px] font-sans font-medium tracking-wider text-[#FFFFFF] uppercase animate-slide-up">
                  {slide.subtitle}
                </span>

                {/* Title */}
                <h2 className="text-[32px] sm:text-[48px] font-serif text-[#FFFFFF] font-normal leading-[1.1] drop-shadow-sm uppercase whitespace-pre-line">
                  {slide.title}
                </h2>

                {/* CTA Button */}
                <a
                  href={slide.ctaLink}
                  className="mt-auto inline-flex items-center justify-center bg-[#FFDE59] text-[#101010] font-sans font-medium text-[20px] w-[184px] h-[48px] hover:bg-[#e6c543] transition-colors duration-300"
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
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${idx === current
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
