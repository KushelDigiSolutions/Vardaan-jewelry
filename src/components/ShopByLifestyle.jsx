"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";

const LIFESTYLES = [
  {
    id: "office-wear",
    name: "Office Wear",
    slug: "office-wear",
    image: "https://res.cloudinary.com/dxlykgx6w/image/upload/v1783080279/office_wear_vxhu1p.png",
    description: "Sleek and professional elegance",
  },
  {
    id: "everyday-wear",
    name: "Everyday Wear",
    slug: "everyday-wear",
    image: "https://res.cloudinary.com/dxlykgx6w/image/upload/v1783080278/everyday_wear_xvtrc3.png",
    description: "Chic designs for daily routines",
  },
  {
    id: "date-night",
    name: "Date Night",
    slug: "date-night",
    image: "https://res.cloudinary.com/dxlykgx6w/image/upload/v1783080279/date_night_dgllwe.png",
    description: "Glamorous and romantic statement pieces",
  },
  {
    id: "party-look",
    name: "Party Look",
    slug: "party-look",
    image: "https://res.cloudinary.com/dxlykgx6w/image/upload/v1783083589/party_v5vmpa.png",
    description: "Bold and eye-catching designs for celebrations",
  },
  {
    id: "travel-essentials",
    name: "Travel Essentials",
    slug: "travel-essentials",
    image: "https://res.cloudinary.com/dxlykgx6w/image/upload/v1783080277/travel_essential_mfzv1c.png",
    description: "Lightweight and versatile styling",
  },
];

export default function ShopByLifestyle() {
  const [currentIndex, setCurrentIndex] = useState(4); // Starts at totalItems (4) for infinite carousel
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const totalItems = LIFESTYLES.length;

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
              Shop By Style
            </h2>
            <p className="text-[#07512E] font-sans mt-2 text-sm sm:text-base tracking-wide">
               jewellery styled for your lifestyle and special moments
            </p>
          </div>
          <div className="flex gap-3">
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
            .lifestyle-track { --slide-offset: calc(100% + 24px); }
            @media (min-width: 768px) {
              .lifestyle-track { --slide-offset: calc(50% + 12px); }
            }
            @media (min-width: 1024px) {
              .lifestyle-track { --slide-offset: calc(33.3333% + 8px); }
            }
          `,
            }}
          />
          <div
            className={`flex gap-6 lifestyle-track w-full ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
            style={{
              transform: `translateX(calc(-${currentIndex} * var(--slide-offset)))`,
            }}
          >
            {[...LIFESTYLES, ...LIFESTYLES, ...LIFESTYLES].map((styleItem, idx) => {
              return (
                <div
                  key={`${styleItem.id || idx}-${idx}`}
                  className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.3333%-16px)] min-h-0 md:min-h-[480px] h-auto flex flex-col bg-white p-4 shadow-sm border border-gray-100 mx-auto justify-between"
                >
                  {/* Lifestyle Image */}
                  <Link
                    href={`/shop?category=${styleItem.slug}`}
                    className="relative aspect-square w-full mb-4 bg-gray-100 overflow-hidden group block shrink-0"
                  >
                    <img
                      src={styleItem.image}
                      alt={styleItem.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  {/* Lifestyle Details */}
                  <div className="flex flex-col flex-grow justify-between">
                    <div className="text-center py-2">
                      <Link href={`/shop?category=${styleItem.slug}`}>
                        <h3 className="font-serif text-[#303030] text-[22px] sm:text-[26px] font-medium leading-snug mb-1 hover:text-[#07512E] transition-colors capitalize">
                          {styleItem.name}
                        </h3>
                      </Link>
                      <p className="text-gray-500 font-sans text-sm tracking-wide">
                        {styleItem.description}
                      </p>
                    </div>
                    <div className="mt-auto w-full">
                      <Link
                        href={`/shop?category=${styleItem.slug}`}
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
