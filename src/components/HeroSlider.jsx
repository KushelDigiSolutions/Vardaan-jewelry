"use client";

import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const defaultSlides = [
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
    styleFilter: "hue-rotate-15 saturate-110",
  },
  {
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1782281607/home_page_banner_image_czgpzk.jpg",
    subtitle: "LEGACY CRAFT",
    title: "BLESSINGS OF\nLIGHT",
    ctaText: "Book Appointment",
    ctaLink: "/contact",
    styleFilter: "brightness-95 contrast-105",
  },
];

export default function HeroSlider() {
  const [slides, setSlides] = useState(defaultSlides);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(`${API_URL}/hero-slides?activeOnly=true`);
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setSlides(data.data);
        }
      } catch (err) {
        console.error("Error fetching hero slides, using defaults:", err);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev >= slides.length - 1 ? 0 : prev + 1));
    }, 6000); // 6 seconds slide time
    return () => clearInterval(timer);
  }, [slides.length]);

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

            {/* Dark overlay for luxury look & high readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10 md:bg-gradient-to-l md:from-black/70 md:via-black/30 md:to-transparent" />

            {/* Floating Content Layout */}
            <div className="absolute inset-0 max-w-[1440px] mx-auto z-20 pointer-events-none">
              <div className="pointer-events-auto flex flex-col items-start text-left justify-center select-none
                absolute 
                top-1/2 -translate-y-1/2 md:-mt-8 lg:mt-0
                left-4 sm:left-auto right-auto sm:right-2 md:right-3 lg:right-4 xl:right-5
                w-[80%] sm:w-[85%] md:w-auto max-w-[400px] gap-3 sm:gap-3 lg:gap-5">

                {/* Subtitle */}
                <span className="text-[14px] sm:text-[16px] md:text-[20px] font-sans font-medium tracking-[0.2em] text-[#FDE066] uppercase animate-slide-up drop-shadow-md">
                  {slide.subtitle}
                </span>

                {/* Title */}
                <h2 className="text-[28px] sm:text-[34px] md:text-[34px] lg:text-[40px] font-sans text-[#FFFFFF] font-normal leading-[1.1] drop-shadow-lg  whitespace-pre-line">
                  {slide.title}
                </h2>

                <a
                  href={slide.ctaLink}
                  className="mt-2 md:mt-3 lg:mt-4 inline-flex items-center justify-center bg-[#FFDE59] text-[#101010] font-sans font-semibold text-[14px] md:text-[14px] lg:text-[16px] px-6 md:px-6 lg:px-8 py-2.5 md:py-2.5 lg:py-3 hover:bg-[#e6c543] transition-colors duration-300"
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
        className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-black/20 hover:bg-[#07512E]/80 text-white hover:text-[#FFDE59] transition-all duration-300 border border-white/10 z-30 cursor-pointer"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-black/20 hover:bg-[#07512E]/80 text-white hover:text-[#FFDE59] transition-all duration-300 border border-white/10 z-30 cursor-pointer"
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
