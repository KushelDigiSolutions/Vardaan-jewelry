"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function RoyallyCrafted() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(4); // Starts at totalItems (4) for infinite carousel
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const DISPLAY_CATEGORIES = [
    {
      id: "necklace-set",
      name: "Necklace Set",
      slug: "necklaceset",
      image: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784296012/ChatGPT_Image_Jul_17_2026_07_16_14_PM_evfji8.png",
    },
    {
      id: "jhumka",
      name: "Jhumka",
      slug: "jhumka",
      image: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784281535/time_shop_by_category_-jhumka_akxlnl.jpg",
    },
    {
      id: "ring",
      name: "Rings",
      slug: "rings",
      image: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784281535/time_shop_by_category_-rings_yums3r.jpg",
    },
    {
      id: "watches",
      name: "Watches",
      slug: "watches",
      image: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784281534/time_shop_by_category_-watches_bgjuuw.jpg",
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/categories`);
        if (res.ok) {
          const json = await res.json();
          const categoryList = Array.isArray(json) ? json : json?.data || [];
          setCategories(categoryList);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Process and dynamically match target display categories with backend categories
  const displayCategories = DISPLAY_CATEGORIES.map((displayCat) => {
    const normalizeStr = (str) => {
      if (!str) return "";
      return str.toLowerCase().replace(/[^a-z0-9]/g, "");
    };

    const targetNormalized = normalizeStr(displayCat.name);

    // Try to match in backend categories
    const matched = categories.find((cat) => {
      const catNameNorm = normalizeStr(cat.name);
      const catSlugNorm = normalizeStr(cat.slug);

      // Exact or singular/plural
      if (catNameNorm === targetNormalized || catSlugNorm === targetNormalized) return true;
      if (catNameNorm.replace(/s$/, "") === targetNormalized.replace(/s$/, "")) return true;
      if (catSlugNorm.replace(/s$/, "") === targetNormalized.replace(/s$/, "")) return true;

      // Custom mappings
      if (targetNormalized === "necklaceset" && (catSlugNorm === "sets" || catSlugNorm === "necklaces")) return true;
      if (targetNormalized === "jhumka" && (catSlugNorm === "jhumka" || catSlugNorm === "jhumka")) return true;

      return false;
    });

    return {
      ...displayCat,
      backendCategory: matched || null,
      slug: matched ? matched.slug : displayCat.slug,
      image: (matched && matched.image) ? matched.image : displayCat.image,
    };
  });

  const totalItems = displayCategories.length;

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
    <section className="py-10 md:py-16 bg-[#FEF5E6]">
      <div className="w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0 flex flex-col">
        {/* Header Section */}
        <div className="flex justify-between sm:flex-wrap sm:gap-4 items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-[#1e2a24] font-medium tracking-wide">
            Shop By Category
          </h2>
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
            .royal-track { --slide-offset: calc(100% + 24px); }
            @media (min-width: 768px) {
              .royal-track { --slide-offset: calc(50% + 12px); }
            }
            @media (min-width: 1024px) {
              .royal-track { --slide-offset: calc(33.3333% + 8px); }
            }
          `,
            }}
          />
          {loading ? (
            <div className="py-20 text-center text-[#07512E]">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#07512E] mx-auto mb-4"></div>
              Loading categories...
            </div>
          ) : displayCategories.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              No categories available.
            </div>
          ) : (
            <div
              className={`flex gap-6 royal-track w-full ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
              style={{
                transform: `translateX(calc(-${currentIndex} * var(--slide-offset)))`,
              }}
            >
              {[...displayCategories, ...displayCategories, ...displayCategories].map((cat, idx) => {
                return (
                  <div
                    key={`${cat.id || idx}-${idx}`}
                    className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.3333%-16px)] min-h-0 md:min-h-[480px] h-auto flex flex-col bg-white p-4 shadow-sm border border-gray-100 mx-auto justify-between"
                  >
                    {/* Category Image */}
                    <Link
                      href={`/shop?category=${cat.slug}`}
                      className="relative aspect-square w-full mb-4 bg-gray-100 overflow-hidden group block shrink-0"
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {/* Category Details */}
                    <div className="flex flex-col flex-grow justify-between">
                      <div className="text-center py-2">
                        <Link href={`/shop?category=${cat.slug}`}>
                          <h3 className="font-serif text-[#303030] text-[22px] sm:text-[26px] font-medium leading-snug mb-2 hover:text-[#07512E] transition-colors capitalize">
                            {cat.name}
                          </h3>
                        </Link>
                      </div>
                      <div className="mt-auto w-full">
                        <Link
                          href={`/shop?category=${cat.slug}`}
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
          )}
        </div>

        {/* Footer Area with Features and View All Link */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-2 pb-4 gap-6">
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <div className="flex items-center gap-2 text-[#07512E] font-medium text-[18px]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Easy Replacement / Return
            </div>
            <div className="flex items-center gap-2 text-[#07512E] font-medium text-[18px]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Light Weight Material
            </div>
            <div className="flex items-center gap-2 text-[#07512E] font-medium text-[18px]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Unique Design
            </div>
          </div>

          <Link
            href="/shop"
            className="text-[#101010] hover:text-[#07512E] active:text-[#07512E] focus:text-[#07512E] no-underline hover:no-underline active:no-underline focus:no-underline flex items-center gap-2 font-serif font-medium text-[20px] group"
          >
            View All{" "}
            <span aria-hidden="true" className="text-gray-400 group-hover:text-[#07512E] group-active:text-[#07512E] group-focus:text-[#07512E] font-sans no-underline">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}