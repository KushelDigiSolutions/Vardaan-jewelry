"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";

// slugs → backend must have a matching category name/slug (exact or singular/plural)
// If no match found in backend → ShopProducts shows "No items found"
const GIFT_OCCASIONS = [
   {
    id: "birthday blessings",
    name: "Birthday Blessings",
    slug: "birthday-blessings",
    description: "Make their day unforgettable",
    icon: "🎂",
    bg: "#FFF8EC",
    accent: "#D4891A",
    image: "https://res.cloudinary.com/dxlykgx6w/image/upload/v1783171659/birthday_gift_pkt9yh.jpg",
  },
  {
    id: "anniversary love",
    name: "Anniversary Love",
    slug: "anniversary-love",
    description: "Celebrate love & milestones",
    icon: "💍",
    bg: "#FFF0F5",
    accent: "#C9487A",
    image: "https://res.cloudinary.com/dxlykgx6w/image/upload/v1783172118/anniversary_gift_jwtsbd.jpg",
  },
  {
    id: "festive gifting",
    name: "Festive Gifting",
    slug: "festive-gifting",
    description: "Celebrate festivals with joy",
    icon: "",
    bg: "#FFF0F5",
    accent: "#C9487A",
    image: "https://res.cloudinary.com/dxlykgx6w/image/upload/v1783321131/festive_gifting_isctgi.webp",
  },
  {
    id: "congratulations",
    name: "Congratulations",
    slug: "congratulations",
    description: "Congratulate on every success",
    icon: "",
    bg: "#FFF0F5",
    accent: "#C9487A",
    image: "https://res.cloudinary.com/dxlykgx6w/image/upload/v1783321136/ChatGPT_Image_Jul_6_2026_12_26_13_PM_tichc1.png",
  },
  {
    id: "self love",
    name: "Self Love",
    slug: "self-love",
    description: "Celebrate yourself every day",
    icon: "",
    bg: "#FFF0F5",
    accent: "#C9487A",
    image: "https://res.cloudinary.com/dxlykgx6w/image/upload/v1783321136/self_zsscld.png",
  },
  {
    id: "just because",
    name: "Just Because",
    slug: "just-because",
    description: "Thoughtful gifts without reason",
    icon: "",
    bg: "#FFF0F5",
    accent: "#C9487A",
    image: "https://res.cloudinary.com/dxlykgx6w/image/upload/v1783321136/ChatGPT_Image_Jul_6_2026_12_18_46_PM_kl0foz.png",
  },
 
  // {
  //   id: "engagement",
  //   name: "Engagement",
  //   slug: "engagement",
  //   description: "The promise of forever",
  //   icon: "💎",
  //   bg: "#F0F5FF",
  //   accent: "#3B5FBF",
  //   image: "https://res.cloudinary.com/dxlykgx6w/image/upload/v1783172118/engament_im9isy.jpg",
  // },
  // {
  //   id: "wedding",
  //   name: "Wedding",
  //   slug: "wedding",
  //   description: "Wedding ready elegance",
  //   icon: "👰",
  //   bg: "#F5FFF0",
  //   accent: "#07512E",
  //   image: "https://res.cloudinary.com/dxlykgx6w/image/upload/v1783172361/wedding_kcld1q.jpg",
  // },
];

export default function GiftsByOccasion() {
  const totalItems = GIFT_OCCASIONS.length;
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
    <section className="py-10 md:py-16 bg-[#FFF6E8]">
      <div className="w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0 flex flex-col">
        {/* Header */}
        <div className="flex justify-between sm:flex-wrap sm:gap-4 items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1e2a24] font-medium tracking-wide">
              Gift by Moment
            </h2>
            <p className="text-[#07512E] font-sans mt-2 text-sm sm:text-base tracking-wide">
              The perfect jewelry piece for every cherished moment
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
              .gifts-occ-track { --slide-offset: calc(100% + 24px); }
              @media (min-width: 768px) {
                .gifts-occ-track { --slide-offset: calc(50% + 12px); }
              }
              @media (min-width: 1024px) {
                .gifts-occ-track { --slide-offset: calc(33.3333% + 8px); }
              }
            `,
            }}
          />
          <div
            className={`flex gap-6 gifts-occ-track w-full ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
            style={{
              transform: `translateX(calc(-${currentIndex} * var(--slide-offset)))`,
            }}
          >
            {[...GIFT_OCCASIONS, ...GIFT_OCCASIONS, ...GIFT_OCCASIONS].map((occ, idx) => (
              <div
                key={`${occ.id}-${idx}`}
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.3333%-16px)] min-h-0 md:min-h-[480px] h-auto flex flex-col bg-white p-4 shadow-sm border border-gray-100 mx-auto justify-between"
              >
                {/* Image */}
                <Link
                  href={`/shop?category=${occ.slug}`}
                  className="relative aspect-square w-full mb-4 bg-gray-100 overflow-hidden group block shrink-0"
                >
                  <img
                    src={occ.image}
                    alt={occ.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Icon badge */}
                  {/* <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-xl shadow-sm">
                    {occ.icon}
                  </div> */}
                </Link>

                {/* Details */}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
