"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

// ─── Static categories shown in the "Shop by Category" carousel ───────────────
// slug must match what ShopProducts.jsx normalizer can resolve
// (rings→rings, earrings→earrings/jhumka, bracelet→bracelet, watches→watch/watches, necklace→necklace/sets)
const STATIC_CATEGORIES = [
  {
    name: "Necklace",
    slug: "necklace",
    image:
      "https://res.cloudinary.com/vykqb6hs/image/upload/v1784273398/shop_by_category-necklace_evkx5c.jpg",
  },
  {
    name: "Earrings",
    slug: "earrings",
    image:
      "https://res.cloudinary.com/vykqb6hs/image/upload/v1784273397/shop_by_category-Earrings_crzrdt.jpg",
  },
  {
    name: "Rings",
    slug: "rings",
    image:
      "https://res.cloudinary.com/vykqb6hs/image/upload/v1784273398/shop_by_category-Rings_wp86so.jpg",
  },
  {
    name: "Bracelet",
    slug: "bracelet",
    image:
      "https://res.cloudinary.com/vykqb6hs/image/upload/v1784273397/shop_by_category-Bracelets_cptpsc.jpg",
  },
  {
    name: "Watches",
    slug: "watches",
    image:
      "https://res.cloudinary.com/vykqb6hs/image/upload/v1784273396/shop_by_category-watches_b6imki.jpg",
      
  },
];

export default function ShopByCategories() {
  const categories = STATIC_CATEGORIES;
  const totalItems = categories.length;

  const [currentIndex, setCurrentIndex] = useState(totalItems); // start at first real set
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [slideWidth, setSlideWidth] = useState(380);
  const [isHovered, setIsHovered] = useState(false);

  // Responsive slide width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSlideWidth(width - 32);
      } else if (width < 1024) {
        setSlideWidth((width - 64 - 16) / 2);
      } else if (width < 1280) {
        setSlideWidth((width - 96 - 32) / 3);
      } else {
        setSlideWidth(380);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const prevSlide = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  };

  // Infinite loop reset — forward
  useEffect(() => {
    if (currentIndex >= totalItems * 2) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex - totalItems);
      }, 700);
      return () => clearTimeout(timer);
    }
    // Infinite loop reset — backward
    if (currentIndex <= 0) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex + totalItems);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, totalItems]);

  // Re-enable transition after a snap jump
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Auto-play every 3 seconds (pause on hover)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  return (
    <section className="py-10 md:py-16 bg-[#FFF6E8] overflow-hidden">
      <div className="w-full max-w-[1172px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0">
        {/* Header */}
        <div className="flex justify-between sm:flex-wrap sm:gap-4 items-center mb-10">
          <h2 className="text-[32px] font-medium font-serif text-[#07512E]">
            Shop by Category
          </h2>
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border cursor-pointer border-[#07512E] flex items-center justify-center text-[#07512E] hover:bg-[#07512E] hover:text-white transition-colors z-10"
              aria-label="Previous slide"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full cursor-pointer bg-[#07512E] flex items-center justify-center text-white hover:bg-[#04361E] transition-colors z-10"
              aria-label="Next slide"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Window */}
        <div
          className="w-full relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`flex gap-4 ${
              isTransitioning ? "transition-transform duration-700 ease-in-out" : ""
            }`}
            style={{
              transform: `translateX(calc(-${currentIndex} * (${slideWidth}px + 16px)))`,
            }}
          >
            {/* Triple clone for seamless infinite loop */}
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
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 bg-gray-200"
                  />
                  {/* Green gradient overlay with label */}
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
