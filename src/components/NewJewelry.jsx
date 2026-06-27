"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const bannerItem = {
  type: "banner",
  title: "Let Your Love\nTick Forever",
  image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781590593/New_Jewelry_ndyxqb.png",
  link: "/shop",
};

export default function NewJewelry() {
  const { addToCart } = useCart();
  const [productItems, setProductItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [slideWidth, setSlideWidth] = useState(362);
  const [isHovered, setIsHovered] = useState(false);

  const totalItems = productItems.length;

  useEffect(() => {
    const fetchNewJewelry = async () => {
      try {
        const res = await fetch(`${API_URL}/products?limit=4`);
        if (res.ok) {
          const json = await res.json();
          const items = json.data?.products || json.data || [];
          setProductItems(items);
          if (items.length > 0) {
            setCurrentIndex(items.length);
          }
        }
      } catch (err) {
        console.error("Error loading new jewelry products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNewJewelry();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlideWidth(window.innerWidth - 64);
      } else if (window.innerWidth < 1024) {
        setSlideWidth((window.innerWidth - 64 - 24) / 2);
      } else if (window.innerWidth < 1224) {
        setSlideWidth(((window.innerWidth * 0.6666 - 8) - 32 - 24) / 2);
      } else {
        setSlideWidth(362);
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

  return (
    <section className="py-10 md:py-16 bg-[#F5F5F7]">
      <div className="w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0 flex flex-col">

        {/* Header Section */}
        <div className="flex justify-between flex-col md:flex-row sm: gap-4 items-start md:items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-[#1e2a24] font-medium tracking-wide">
            New Jewelry
          </h2>
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

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6 w-full mb-6 min-h-[490px]">

          {/* Carousel Window (Products) */}
          <div 
            className="w-full lg:w-[calc(66.6666%-8px)] relative overflow-hidden flex items-center justify-center bg-white border border-gray-100 shadow-sm p-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#07512E] mx-auto mb-3"></div>
                <p className="text-gray-500 text-sm">Loading fine jewelry...</p>
              </div>
            ) : productItems.length > 0 ? (
              <div
                className={`flex gap-6 w-full h-full ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
                style={{ transform: `translateX(calc(-${currentIndex} * (${slideWidth}px + 24px)))` }}
              >
                {[...productItems, ...productItems, ...productItems].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 h-full text-left flex flex-col"
                    style={{ width: `${slideWidth}px` }}
                  >
                    <div className="h-full flex flex-col flex-grow bg-white border border-gray-100 mx-auto w-full">
                      {/* Product Image */}
                      <Link href={`/product/${item._id}`} className="relative aspect-square w-full mb-4 bg-gray-50 overflow-hidden group block shrink-0">
                        <img
                          src={item.images?.[0] || "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png"}
                          alt={item.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex flex-col flex-grow justify-between">
                        <div>
                          <Link href={`/product/${item._id}`}>
                            <h3 className="font-serif text-[#303030] text-[20px] sm:text-[24px] font-medium leading-snug mb-2 line-clamp-2 hover:text-[#07512E] transition-colors min-h-[56px] sm:min-h-[64px] flex items-start">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-[#07512E] font-medium mb-4">
                            ₹ {(item.salePrice || item.price).toLocaleString("en-IN")}
                          </p>
                        </div>
                        <div className="mt-auto flex gap-4 w-full">
                          <Link href={`/product/${item._id}`} className="flex-1 h-[48px] flex items-center justify-center bg-[#FFDE59] text-[#101010] font-sans font-medium text-[20px] hover:bg-[#e6c543] transition-colors duration-300">
                            Shop Now
                          </Link>
                          <button
                            onClick={() => addToCart(item)}
                            className="flex-1 h-[48px] flex items-center cursor-pointer justify-center bg-white border border-[#07512E] text-[#07512E] font-sans font-medium text-[20px] hover:bg-[#07512E] hover:text-white transition-colors duration-300"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500">
                No new products found.
              </div>
            )}
          </div>

          {/* Fixed Banner Window */}
          <div className="w-full lg:w-[calc(33.3333%-16px)] flex-shrink-0">
            <div className="h-full relative overflow-hidden group w-full bg-[#dcdcdc] min-h-[400px]">
              <img
                src={bannerItem.image}
                alt="Banner"
                className="absolute inset-0 w-full h-full object-cover object-[15%_center] transition-transform duration-700 ease-out group-hover:scale-105"
              />


              {/* Overlay Content */}
              <div className="absolute z-10 flex flex-col justify-between w-max h-auto gap-6 left-8 lg:left-[32px] top-1/2 -translate-y-1/2 pointer-events-none">
                <h2 className="text-[#FFFFFF] font-serif text-[32px] sm:text-[40px] font-medium leading-[1.1] drop-shadow-md whitespace-pre-line">
                  {bannerItem.title}
                </h2>
                <Link
                  href={bannerItem.link}
                  className="inline-flex items-center justify-center bg-[#FFDE59] text-[#101010] font-sans font-medium text-[20px] w-[184px] h-[48px] hover:bg-[#e6c543] transition-colors duration-300 pointer-events-auto mt-auto"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}