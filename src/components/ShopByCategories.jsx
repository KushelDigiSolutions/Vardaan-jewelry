"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Sets",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781528583/sets_xvoyfd.png",
    link: "/shop?category=sets",
  },
  {
    title: "Earrings",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781528601/earing_fktmvk.png",
    link: "/shop?category=earrings",
  },
  {
    title: "rings",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781528583/rings_pkq8gv.png",
    link: "/shop?category=rings",
  },
];

export default function ShopByCategories() {
  const [currentIndex, setCurrentIndex] = useState(categories.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [slideWidth, setSlideWidth] = useState(380);
  const totalItems = categories.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlideWidth(window.innerWidth - 32); // mobile full width
      } else if (window.innerWidth < 1024) {
        setSlideWidth((window.innerWidth - 32 - 16) / 2); // tablet 2 cols
      } else if (window.innerWidth < 1204) {
        setSlideWidth((window.innerWidth - 32 - 32) / 3); // small desktop 3 cols
      } else {
        setSlideWidth(380); // large desktop fixed
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const prevSlide = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (currentIndex >= totalItems * 2) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex - totalItems);
      }, 700);
      return () => clearTimeout(timer);
    }
    if (currentIndex <= 0) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex + totalItems);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, totalItems]);

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="py-10 md:py-16 bg-[#FFF6E8] overflow-hidden">
      <div className="w-full max-w-[1172px] mx-auto px-4 lg:px-0">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-[32px] font-medium font-serif text-[#07512E] ">
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
            className={`flex gap-4 ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
            style={{ transform: `translateX(calc(-${currentIndex} * (${slideWidth}px + 16px)))` }}
          >
            {[...categories, ...categories, ...categories].map((cat, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 flex justify-center"
                style={{ width: `${slideWidth}px` }}
              >
                <Link
                  href={cat.link}
                  className="group relative w-full h-[420px] overflow-hidden block"
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
