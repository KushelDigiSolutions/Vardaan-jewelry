"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

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
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525761/Group_1171275659_tvlydy.png",
    link: "/shop",
  },
];

// Duplicate items for carousel effect
const carouselItems = [...products, ...products];

export default function NewJewelry() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % (carouselItems.length - 2));
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? carouselItems.length - 3 : prev - 1));
  };

  return (
    <section className="py-16 md:py-24 bg-[#F5F4F1]">
      <div className="w-full max-w-[1192px] mx-auto px-4 lg:px-0 flex flex-col">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-[#1e2a24] font-semibold tracking-wide">
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

        {/* Carousel Window */}
        <div className="w-full relative overflow-hidden mb-6">
          <style dangerouslySetInnerHTML={{__html: `
            .new-track { --slide-offset: calc(100% + 24px); }
            @media (min-width: 768px) {
              .new-track { --slide-offset: calc(50% + 12px); }
            }
            @media (min-width: 1024px) {
              .new-track { --slide-offset: calc(33.3333% + 8px); }
            }
          `}} />
          <div 
            className="flex gap-6 transition-transform duration-700 ease-in-out new-track w-full"
            style={{ transform: `translateX(calc(-${currentIndex} * var(--slide-offset)))` }}
          >
            {carouselItems.map((item, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                {item.type === "product" ? (
                  <div className="h-full flex flex-col bg-white p-4 shadow-sm border border-gray-100">
                    {/* Product Image */}
                    <div className="relative aspect-square w-full mb-4 bg-gray-100 overflow-hidden group">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col flex-grow">
                      <h3 className="font-serif text-[#303030] text-[24px] font-medium leading-snug mb-2 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-[#07512E] font-semibold mb-4">
                        {item.price}
                      </p>
                      <div className="mt-auto flex gap-4">
                        <button className="flex-1 h-[48px] flex items-center justify-center bg-[#FFDE59] text-[#101010] font-semibold text-[16px] hover:bg-[#e6c543] transition-colors">
                          Shop Now
                        </button>
                        <button className="flex-1 h-[48px] flex items-center justify-center bg-white border border-[#07512E] text-[#07512E] font-semibold text-[16px] hover:bg-[#07512E] hover:text-white transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full relative overflow-hidden group w-full bg-[#dcdcdc] min-h-[400px]">
                    <img 
                      src={item.image} 
                      alt="Banner" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
