"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Sets",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781528583/sets_xvoyfd.png",
    link: "/category/sets",
  },
  {
    title: "Earrings",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781528601/earing_fktmvk.png",
    link: "/category/earrings",
  },
  {
    title: "rings",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781528583/rings_pkq8gv.png",
    link: "/category/rings",
  },
];

// Duplicate items to ensure smooth carousel experience even on large screens
const carouselItems = [...categories, ...categories, ...categories, ...categories];

export default function ShopByCategories() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % (carouselItems.length - 3)); 
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? carouselItems.length - 4 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="py-16 md:py-24 bg-[#FFF6E8] overflow-hidden">
      <div className="w-full max-w-[1192px] mx-auto px-4 lg:px-0">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-[32px] font-bold font-serif text-[#07512E] tracking-wide">
            Shop by Categories
          </h2>
          <div className="flex gap-3">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-[#07512E] flex items-center justify-center text-[#07512E] hover:bg-[#07512E] hover:text-white transition-colors z-10"
              aria-label="Previous slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-[#07512E] flex items-center justify-center text-white hover:bg-[#04361E] transition-colors z-10"
              aria-label="Next slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Window */}
        <div className="w-full relative overflow-hidden">
          <div 
            className="flex gap-6 lg:gap-[26px] transition-transform duration-700 ease-in-out"
            style={{ 
              // Using a simple slide logic: each slide moves by 1 item's width + gap.
              // On desktop: 380px + 26px = 406px
              transform: `translateX(calc(-${currentIndex} * (380px + 26px)))` 
            }}
          >
            {carouselItems.map((cat, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[380px] flex justify-center"
              >
                <Link
                  href={cat.link}
                  className="group relative w-full lg:w-[380px] h-[504px] overflow-hidden block"
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 bg-gray-200"
                  />
                  {/* Green Gradient Overlay with Category Title */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#07512E]/90 via-[#07512E]/40 to-transparent pointer-events-none flex items-end justify-center pb-8">
                    <h3 className="text-white font-serif text-3xl font-medium tracking-wide capitalize">
                      {cat.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
