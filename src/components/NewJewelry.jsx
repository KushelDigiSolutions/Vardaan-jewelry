"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

const products = [
  {
    id: 1,
    type: "product",
    name: "Ruby Raang Emerald Layered Neckpiece",
    price: "₹ 1995",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525757/Rectangle_23_9_fyoemo.png",
  },
  {
    id: 2,
    type: "product",
    name: "Lucy Williams Engravable Arco Gold Ring",
    price: "₹ 1995",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png",
  },
  {
    id: 3,
    type: "banner",
    title: "Let Your Love\nTick Forever",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781590593/New_Jewelry_ndyxqb.png",
    link: "/shop",
  },
];

const productItems = products.filter(p => p.type === "product");
const bannerItem = products.find(p => p.type === "banner");

export default function NewJewelry() {
  const { addToCart } = useCart();
  const [currentIndex, setCurrentIndex] = useState(productItems.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const totalItems = productItems.length;

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

  return (
    <section className="py-10 md:py-16 bg-[#F5F5F7]">
      <div className="w-full max-w-[1192px] mx-auto px-4 lg:px-0 flex flex-col">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-[#1e2a24] font-medium tracking-wide">
            New Jewelry
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

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6 w-full mb-6">
          
          {/* Carousel Window (Products) */}
          <div className="w-full lg:w-[calc(66.6666%-8px)] relative overflow-hidden">
            <style dangerouslySetInnerHTML={{__html: `
              .new-track { --slide-offset: calc(100% + 24px); }
              @media (min-width: 768px) {
                .new-track { --slide-offset: calc(50% + 12px); }
              }
            `}} />
            <div 
              className={`flex gap-6 new-track w-full h-full ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
              style={{ transform: `translateX(calc(-${currentIndex} * var(--slide-offset)))` }}
            >
              {[...productItems, ...productItems, ...productItems].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex-shrink-0 w-full md:w-[calc(50%-12px)] h-full"
                >
                  <div className="h-full flex flex-col bg-white p-4 shadow-sm border border-gray-100 mx-auto">
                    {/* Product Image */}
                    <Link href={`/product/${item.id}`} className="relative aspect-square w-full mb-4 bg-gray-100 overflow-hidden group block">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex flex-col flex-grow">
                      <Link href={`/product/${item.id}`}>
                        <h3 className="font-serif text-[#303030] text-[20px] sm:text-[24px] font-medium leading-snug mb-2 line-clamp-2 hover:text-[#07512E] transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-[#07512E] font-medium mb-4">
                        {item.price}
                      </p>
                      <div className="mt-auto flex gap-4">
                        <Link href={`/product/${item.id}`} className="flex-1 h-[48px] flex items-center justify-center bg-[#FFDE59] text-[#101010] font-sans font-medium text-[20px] hover:bg-[#e6c543] transition-colors duration-300">
                          Shop Now
                        </Link>
                        <button 
                          onClick={() => addToCart(item)}
                          className="flex-1 h-[48px] flex items-center justify-center bg-white border border-[#07512E] text-[#07512E] font-sans font-medium text-[20px] hover:bg-[#07512E] hover:text-white transition-colors duration-300"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
