"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";

const OCCASIONS = [
  {
    id: "festive",
    name: "Festive",
    slug: "festive",
    image: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784281534/time_shop_by_occasion-Festive_f0eaok.jpg",
    description: "Sparkle in celebration",
  },
  {
    id: "wedding",
    name: "Wedding",
    slug: "wedding",
    image: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784281535/time_shop_by_occasion-wedding_party_p2k6pg.jpg",
    description: "Wedding ready elegance",
  },
  {
    id: "sangeet",
    name: "Sangeet",
    slug: "sangeet",
    image: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784293875/ChatGPT_Image_Jul_17_2026_06_40_11_PM_ebqhym.png",
    description: "Dance the night away",
  },
  {
    id: "haldi",
    name: "Haldi",
    slug: "haldi",
    image: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784281535/time_shop_by_occasion-Haldi_giwmxb.jpg",
    description: "Yellow auspicious hues",
  },
];

export default function ShopByOccasion() {
  const [currentIndex, setCurrentIndex] = useState(4); // Starts at totalItems (4) for infinite carousel
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const totalItems = OCCASIONS.length;

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
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  useEffect(() => {
    if (isHovered || totalItems === 0) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered, totalItems]);

  return (
    <section className="py-10 md:py-16 bg-[#FFFDF9]">
      <div className="w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0 flex flex-col">
        {/* Header Section */}
        <div className="flex justify-between sm:flex-wrap sm:gap-4 items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1e2a24] font-medium tracking-wide">
              Shop By Occasion
            </h2>
            <p className="text-[#07512E] font-sans mt-2 text-sm sm:text-base tracking-wide">
              Curated jewellery collections for every special moment
            </p>
          </div>
          <div className="flex gap-3 animate-fade-in">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full cursor-pointer border border-[#07512E] flex items-center justify-center text-[#07512E] hover:bg-[#07512E] hover:text-white transition-colors z-10"
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
          className="w-full relative overflow-hidden mb-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .occasion-track { --slide-offset: calc(100% + 24px); }
            @media (min-width: 768px) {
              .occasion-track { --slide-offset: calc(50% + 12px); }
            }
            @media (min-width: 1024px) {
              .occasion-track { --slide-offset: calc(33.3333% + 8px); }
            }
          `,
            }}
          />
          <div
            className={`flex gap-6 occasion-track w-full ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
            style={{
              transform: `translateX(calc(-${currentIndex} * var(--slide-offset)))`,
            }}
          >
            {[...OCCASIONS, ...OCCASIONS, ...OCCASIONS].map((occ, idx) => {
              return (
                <div
                  key={`${occ.id || idx}-${idx}`}
                  className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.3333%-16px)] min-h-0 md:min-h-[480px] h-auto flex flex-col bg-white p-4 shadow-sm border border-gray-100 mx-auto justify-between"
                >
                  {/* Occasion Image */}
                  <Link
                    href={`/shop?category=${occ.slug}`}
                    className="relative aspect-square w-full mb-4 bg-gray-100 overflow-hidden group block shrink-0"
                  >
                    <img
                      src={occ.image}
                      alt={occ.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  {/* Occasion Details */}
                  <div className="flex flex-col flex-grow justify-between">
                    <div className="text-center py-2">
                      <Link href={`/shop?category=${occ.slug}`}>
                        <h3 className="font-serif text-[#303030] text-[22px] sm:text-[26px] font-medium leading-snug mb-1 hover:text-[#07512E] transition-colors capitalize">
                          {occ.name}
                        </h3>
                      </Link>
                      <p className="text-gray-500 font-sans text-sm tracking-wide">
                        {occ.description}
                      </p>
                    </div>
                    <div className="mt-auto w-full">
                      <Link
                        href={`/shop?category=${occ.slug}`}
                        className="w-full h-[48px] flex items-center justify-center cursor-pointer bg-[#FFDE59] text-[#101010] font-sans font-medium text-[16px] sm:text-[18px] whitespace-nowrap hover:bg-[#e6c543] transition-colors duration-300"
                      >
                        Explore Collection
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
