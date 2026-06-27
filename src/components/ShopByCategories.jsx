"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getCategoryFallbackImage = (slug) => {
  const s = slug ? slug.toLowerCase() : "";
  if (s.includes("set")) {
    return "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781528583/sets_xvoyfd.png";
  }
  if (s.includes("earring")) {
    return "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781528601/earing_fktmvk.png";
  }
  if (s.includes("ring")) {
    return "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781528583/rings_pkq8gv.png";
  }
  // Default general fallback
  return "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781528583/rings_pkq8gv.png";
};

export default function ShopByCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [slideWidth, setSlideWidth] = useState(380);
  const [isHovered, setIsHovered] = useState(false);
  const totalItems = categories.length;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/categories`);
        if (res.ok) {
          const json = await res.json();
          const data = Array.isArray(json) ? json : json?.data || [];
          
          // Filter root active categories (parentCategory is null)
          const rootActive = data.filter(c => c.isActive && !c.parentCategory);
          
          // Fallback to all active categories if no root categories are found
          const displayCategories = rootActive.length > 0 
            ? rootActive 
            : data.filter(c => c.isActive);
            
          setCategories(displayCategories);
          
          if (displayCategories.length > 0) {
            setCurrentIndex(displayCategories.length);
          }
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlideWidth(window.innerWidth - 32); // mobile full width
      } else if (window.innerWidth < 1024) {
        setSlideWidth((window.innerWidth - 32 - 16) / 2); // tablet 2 cols
      } else if (window.innerWidth < 1204) {
        setSlideWidth((window.innerWidth - 64) / 3); // 1024px to 1204px: exactly 3 cards fit perfectly (32px padding + 32px gaps = 64px)
      } else {
        setSlideWidth(380); // large desktop fixed
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    if (!isTransitioning || totalItems === 0) return;
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning, totalItems]);

  const prevSlide = () => {
    if (!isTransitioning || totalItems === 0) return;
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (totalItems === 0) return;
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
    if (totalItems === 0) return;
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, totalItems]);

  useEffect(() => {
    if (totalItems === 0 || isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [nextSlide, totalItems, isHovered]);

  if (loading) {
    return (
      <section className="py-10 md:py-16 bg-[#FFF6E8] overflow-hidden">
        <div className="w-full max-w-[1172px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-[32px] font-medium font-serif text-[#07512E] ">
              Shop by Categories
            </h2>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#07512E]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-10 md:py-16 bg-[#FFF6E8] overflow-hidden">
      <div className="w-full max-w-[1172px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0">
        {/* Header Section */}
        <div className="flex justify-between sm: flex-wrap sm: gap-4 items-center mb-10">
          <h2 className="text-[32px] font-medium font-serif text-[#07512E] ">
            Shop by Categories
          </h2>
          <div className="flex gap-3">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border cursor-pointer border-[#07512E] flex items-center justify-center text-[#07512E] hover:bg-[#07512E] hover:text-white transition-colors z-10"
              aria-label="Previous slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full cursor-pointer bg-[#07512E] flex items-center justify-center text-white hover:bg-[#04361E] transition-colors z-10"
              aria-label="Next slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Window (Pause on Hover) */}
        <div 
          className="w-full relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
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
                  href={`/shop?category=${cat.slug}`}
                  className="group relative w-full h-[420px] overflow-hidden block"
                >
                  <img
                    src={cat.image || getCategoryFallbackImage(cat.slug)}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 bg-gray-200"
                  />
                  {/* Green Gradient Overlay with Category Title */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#07512E]/90 via-[#07512E]/40 to-transparent pointer-events-none flex items-end justify-center pb-8">
                    <h3 className="text-white font-serif text-3xl font-medium tracking-wide capitalize">
                      {cat.name}
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
