"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";

// slugs are matched by ShopProducts normalizer (Step 1: exact, Step 2: singular/plural)
// If backend has no matching category → ShopProducts shows "No items found"
const GIFT_SOMEONE = [
  {
    id: "for-her",
    name: "For Her",
    slug: "for-her",
    description: "Elegance she'll adore",
    icon: "👩",
    image: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784371852/WhatsApp_Image_2026-07-18_at_12.36.55_PM_qpb2bc.jpg",
  },
  {
    id: "for-him",
    name: "For Him",
    slug: "for-him",
    description: "Bold & refined picks",
    icon: "👨",
    image: "https://res.cloudinary.com/dxlykgx6w/image/upload/v1783172993/for_him_by211u.webp",
  },
  {
    id: "for-sister",
    name: "For Sister",
    slug: "for-sister",
    description: "A bond like no other",
    icon: "👧",
    image: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784371852/WhatsApp_Image_2026-07-18_at_12.32.57_PM_korvzt.jpg",
  },
  {
    id: "for-brother",
    name: "For Brother",
    slug: "for-brother",
    description: "Thoughtful & stylish",
    icon: "👦",
    image: "https://res.cloudinary.com/dxlykgx6w/image/upload/v1783172992/for_brother_n7t4um.webp",
  },
  {
    id: "for-mother",
    name: "For Mother",
    slug: "for-mother",
    description: "Timeless love & grace",
    icon: "👩‍👧",
    image: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784537593/ChatGPT_Image_Jul_20_2026_02_19_16_PM8888_gqxret.png",
  },
  {
    id: "for-father",
    name: "For Father",
    slug: "for-father",
    description: "Classic strength & warmth",
    icon: "👨‍👦",
    image: "https://res.cloudinary.com/dxlykgx6w/image/upload/v1783172992/for_father_unl6rz.webp",
  },
  {
    id: "for-friends",
    name: "For Friends",
    slug: "for-friends",
    description: "Celebrate every friendship",
    icon: "🤝",
    image: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784371852/WhatsApp_Image_2026-07-18_at_12.38.13_PM_cwepus.jpg",
  },
];

export default function GiftsForSomeone() {
  const totalItems = GIFT_SOMEONE.length;
  const [currentIndex, setCurrentIndex] = useState(totalItems);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const prevSlide = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  };

  // Infinite loop — forward wrap
  useEffect(() => {
    if (currentIndex >= totalItems * 2) {
      const t = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex - totalItems);
      }, 700);
      return () => clearTimeout(t);
    }
    // Infinite loop — backward wrap
    if (currentIndex <= 0) {
      const t = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex + totalItems);
      }, 700);
      return () => clearTimeout(t);
    }
  }, [currentIndex, totalItems]);

  // Re-enable transition after snap
  useEffect(() => {
    if (!isTransitioning) {
      const t = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(t);
    }
  }, [isTransitioning]);

  // Auto-play (pause on hover)
  useEffect(() => {
    if (isHovered) return;
    const t = setInterval(nextSlide, 3200);
    return () => clearInterval(t);
  }, [nextSlide, isHovered]);

  return (
    <section className="py-10 md:py-16 bg-[#FFFDF9]">
      <div className="w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0 flex flex-col">
        {/* Header */}
        <div className="flex justify-between sm:flex-wrap sm:gap-4 items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1e2a24] font-medium tracking-wide">
              Gifts for Special Someone
            </h2>
            <p className="text-[#07512E] font-sans mt-2 text-sm sm:text-base tracking-wide">
              Handpicked jewelry for every special person in your life
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full cursor-pointer border border-[#07512E] flex items-center justify-center text-[#07512E] hover:bg-[#07512E] hover:text-white transition-colors z-10"
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

        {/* Carousel */}
        <div
          className="w-full relative overflow-hidden mb-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
              .gifts-someone-track { --slide-offset: calc(100% + 24px); }
              @media (min-width: 768px) {
                .gifts-someone-track { --slide-offset: calc(50% + 12px); }
              }
              @media (min-width: 1024px) {
                .gifts-someone-track { --slide-offset: calc(33.3333% + 8px); }
              }
            `,
            }}
          />
          <div
            className={`flex gap-6 gifts-someone-track w-full ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
            style={{
              transform: `translateX(calc(-${currentIndex} * var(--slide-offset)))`,
            }}
          >
            {[...GIFT_SOMEONE, ...GIFT_SOMEONE, ...GIFT_SOMEONE].map((person, idx) => (
              <div
                key={`${person.id}-${idx}`}
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.3333%-16px)] min-h-0 md:min-h-[480px] h-auto flex flex-col bg-white p-4 shadow-sm border border-gray-100 mx-auto justify-between"
              >
                {/* Image */}
                <Link
                  href={`/shop?category=${person.slug}`}
                  className="relative aspect-square w-full mb-4 bg-gray-100 overflow-hidden group block shrink-0"
                >
                  <img
                    src={person.image}
                    alt={person.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Emoji badge */}
                  {/* <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-xl shadow-sm">
                    {person.icon}
                  </div> */}
                </Link>

                {/* Details */}
                <div className="flex flex-col flex-grow justify-between">
                  <div className="text-center py-2">
                    <Link href={`/shop?category=${person.slug}`}>
                      <h3 className="font-serif text-[#303030] text-[22px] sm:text-[26px] font-medium leading-snug mb-1 hover:text-[#07512E] transition-colors">
                        {person.name}
                      </h3>
                    </Link>
                    <p className="text-gray-500 font-sans text-sm tracking-wide">
                      {person.description}
                    </p>
                  </div>
                  <div className="mt-auto w-full">
                    <Link
                      href={`/shop?category=${person.slug}`}
                      className="w-full h-[48px] flex items-center justify-center cursor-pointer bg-[#FFDE59] text-[#101010] font-sans font-medium text-[16px] sm:text-[18px] whitespace-nowrap hover:bg-[#e6c543] transition-colors duration-300"
                    >
                      Explore Collection
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
