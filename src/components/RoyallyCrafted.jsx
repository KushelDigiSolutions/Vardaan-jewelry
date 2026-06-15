"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Lucy Williams Engravable Arco Cord Necklace",
    price: "₹ 1995",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525173/Rectangle_23_8_wrh0bx.png",
    soldOut: false,
  },
  {
    id: 2,
    name: "Trendy Gold Plated Floral Pendant Chain With Studs",
    price: "₹ 1995",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525042/Rectangle_23_6_igmjdi.png",
    soldOut: true,
  },
  {
    id: 3,
    name: "Beautiful Necklace in Gold Finish",
    price: "₹ 1995",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525033/Rectangle_23_7_k6kuwn.png",
    soldOut: false,
  },
];

const carouselItems = [...products, ...products, ...products];

export default function RoyallyCrafted() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % (carouselItems.length - 2));
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? carouselItems.length - 3 : prev - 1));
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-[#1e2a24] font-semibold tracking-wide">
            Royally Crafted for you
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
        <div className="w-full relative overflow-hidden mb-12">
          <div 
            className="flex gap-6 transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 24}px))` }}
          >
            {carouselItems.map((product, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[404px] h-[522px] flex flex-col bg-white p-5 shadow-sm border border-gray-100 mx-auto"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] w-full mb-5 bg-gray-100 overflow-hidden group">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.soldOut && (
                    <div className="absolute top-3 left-3 bg-[#07512E] text-white text-xs font-semibold px-3 py-1.5 z-10">
                      Sold Out
                    </div>
                  )}
                  <button className="absolute top-3 right-3 text-white hover:text-red-500 transition-colors z-10 drop-shadow-md" aria-label="Add to wishlist">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>

                {/* Product Details */}
                <div className="flex flex-col flex-grow">
                  <h3 className="font-serif text-[#1a1a1a] text-lg leading-snug mb-3 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-[#07512E] font-bold mb-5">
                    {product.price}
                  </p>
                  <div className="mt-auto flex gap-3">
                    <button className="flex-1 bg-[#FDE066] text-[#1a1a1a] font-semibold py-2.5 text-sm hover:bg-[#e6c95c] transition-colors">
                      Shop Now
                    </button>
                    <button className="flex-1 bg-white border border-[#07512E] text-[#07512E] font-semibold py-2.5 text-sm hover:bg-[#07512E] hover:text-white transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Area with Features and View All Link */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-8 gap-6">
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <div className="flex items-center gap-2 text-[#07512E] font-semibold text-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Easy 10 Day Returns
            </div>
            <div className="flex items-center gap-2 text-[#07512E] font-semibold text-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Light Weight Material
            </div>
            <div className="flex items-center gap-2 text-[#07512E] font-semibold text-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Unique Design
            </div>
          </div>
          
          <Link href="/collections/royal" className="text-sm text-[#1e2a24] hover:text-[#07512E] flex items-center gap-2 font-serif font-semibold text-lg">
            View All <span aria-hidden="true" className="text-gray-400 font-sans">&rarr;</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
