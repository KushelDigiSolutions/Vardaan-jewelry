"use client";

import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.trim() || "https://vardaan-backend.vercel.app/api";

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

                {/* Animated Brand Header */}
                <div className="flex flex-col items-start w-full mb-1 sm:mb-2 select-none">
                  {/* Brand Title (Letter-by-Letter Reveal) */}
                  <h1 className="text-[28px] sm:text-[34px] md:text-[40px] lg:text-[44px] font-medium font-serif font-black uppercase leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
                    {"VARDAAN".split("").map((letter, lIdx) => (
                      <span
                        key={lIdx}
                        style={{ animationDelay: `${lIdx * 80}ms` }}
                        className={`inline-block mr-[0.08em] bg-gradient-to-r from-[#eca636] to-[#fdd967] bg-clip-text text-transparent ${
                          lIdx === 0 ? "text-[1.8em]" : ""
                        } ${
                          idx === current ? "animate-letter-reveal" : "opacity-0"
                        }`}
                      >
                        {letter}
                      </span>
                    ))}
                  </h1>
                  
                  {/* Shimmer/glowing Divider Line */}
                  <div 
                    style={{ animationDelay: "560ms" }}
                    className={`h-[1px] bg-gradient-to-r from-[#eca636] via-[#fdd967]/40 to-transparent my-2 transition-all duration-1000 ${
                      idx === current ? "w-full animate-reveal-width" : "w-0 opacity-0"
                    }`} 
                  />
                  
                  {/* Brand Subtext (Word-by-Word Reveal) */}
                  <p className="text-[12px] sm:text-[13px] md:text-[15px] font-sans font-light tracking-[0.08em] flex flex-wrap gap-x-1.5 leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                    {[
                      { text: "More", highlight: false },
                      { text: "Than", highlight: false },
                      { text: "a", highlight: false },
                      { text: "Jewel,", highlight: false },
                      { text: "A", highlight: false },
                      { text: "Blessing", highlight: true }
                    ].map((word, wIdx) => (
                      <span
                        key={wIdx}
                        style={{ animationDelay: `${700 + wIdx * 100}ms` }}
                        className={`inline-block ${
                          word.highlight 
                            ? "text-[#fdd967] font-semibold font-serif italic" 
                            : "text-[#FAF9F6]/90"
                        } ${
                          idx === current ? "animate-word-reveal" : "opacity-0"
                        }`}
                      >
                        {word.text}
                      </span>
                    ))}
                  </p>
                </div>

                {/* Subtitle */}
                <span 
                  style={{ animationDelay: "1300ms" }}
                  className={`text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-sans font-medium tracking-[0.2em] text-[#fdd967] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-all duration-700 ${
                    idx === current ? "animate-slide-up" : "opacity-0"
                  }`}
                >
                  {slide.subtitle}
                </span>

                {/* Title */}
                <h2 
                  style={{ animationDelay: "1500ms" }}
                  className={`text-[24px] sm:text-[30px] md:text-[34px] lg:text-[40px] font-sans text-[#FFFFFF] font-normal leading-[1.15] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] whitespace-pre-line transition-all duration-700 ${
                    idx === current ? "animate-slide-up" : "opacity-0"
                  }`}
                >
                  {slide.title}
                </h2>

                <a
                  href={slide.ctaLink}
                  style={{ animationDelay: "1700ms" }}
                  className={`mt-1 md:mt-2 lg:mt-3 inline-flex items-center justify-center bg-gradient-to-r from-[#eca636] to-[#fdd967] text-[#101010] font-sans font-bold text-[14px] md:text-[14px] lg:text-[16px] px-6 md:px-6 lg:px-8 py-2.5 md:py-2.5 lg:py-3 hover:from-[#d99225] hover:to-[#ecc64e] transition-all duration-300 hover:shadow-lg hover:shadow-[#eca636]/30 transform hover:-translate-y-0.5 ${
                    idx === current ? "animate-slide-up" : "opacity-0"
                  }`}
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
