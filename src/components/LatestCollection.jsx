"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";

const products = [
  {
    id: 1,
    name: "Lucy Williams Engravable Arco Cord Ring",
    price: "₹ 1995",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781529483/Lucy_Williams_Engravable_Arco_Cord_Ring_fp3lgn.png",
  },
  {
    id: 2,
    name: "Lucy Williams Engravable Arco Gold Ring",
    price: "₹ 1995",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781529306/Lucy_Williams_Engravable_Arco_Gold_Ring_vggf77.png",
  },
  {
    id: 3,
    name: "Classic Diamond Eternity Band",
    price: "₹ 3499",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781529306/Lucy_Williams_Engravable_Arco_Gold_Ring_vggf77.png",
  },
];

export default function LatestCollection() {
  const { addToCart } = useCart();
  const [currentIndex, setCurrentIndex] = useState(products.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const totalItems = products.length;

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
      }, 500);
      return () => clearTimeout(timer);
    }
    if (currentIndex <= 0) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex + totalItems);
      }, 500);
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
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="py-10 md:py-16 bg-[#F5F5F7] overflow-hidden">
      <div className="w-full max-w-[1192px] mx-auto px-4 lg:px-0 flex flex-col lg:flex-row gap-8 lg:gap-[24px]">
        
        {/* Left Side: Large Promotional Banner */}
        <div className="w-full lg:w-[584px] relative h-[400px] lg:h-[600px] flex-shrink-0 overflow-hidden group">
          {/* Placeholder for the user's banner image */}
          <img 
            src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781529489/Latest_Collection_mjuzxl.png" 
            alt="Latest Collection Banner" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 bg-[#dcdcdc]"
          />
          {/* Image Overlay */}
          <img 
            src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781604785/Overlay_for_readability_1_zncjny.png"
            alt="Overlay"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          
          {/* Overlay Content */}
          <div className="absolute z-10 flex flex-col justify-between w-max h-auto gap-6 left-8 lg:left-[32px] top-1/2 -translate-y-1/2 pointer-events-none">
            <h2 className="text-[#FFFFFF] font-serif text-[32px] sm:text-[40px] font-medium leading-[1.1] drop-shadow-md whitespace-nowrap">
              Let Your Love<br />Tick Forever
            </h2>
            <Link 
              href="/shop" 
              className="inline-flex items-center justify-center bg-[#FFDE59] text-[#101010] font-sans font-medium text-[20px] w-[184px] h-[48px] hover:bg-[#e6c543] transition-colors duration-300 pointer-events-auto mt-auto"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Right Side: Product Carousel */}
        <div className="w-full flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 w-full lg:w-[584px] lg:h-[80px]">
            <div className="flex flex-col justify-center gap-2">
              <h2 className="text-[28px] sm:text-[32px] text-[#303030] font-medium tracking-wide leading-none">
                Latest Collection
              </h2>
              <Link href="/collections/latest" className="text-[20px] text-[#101010] font-medium hover:underline flex items-center gap-1 leading-none">
                View All <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-[#07512E] flex items-center justify-center text-[#07512E] hover:bg-[#07512E] hover:text-white transition-colors"
                aria-label="Previous products"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-[#07512E] flex items-center justify-center text-white hover:bg-[#04361E] transition-colors"
                aria-label="Next products"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Carousel Viewport */}
          <div className="w-full flex-grow relative overflow-hidden">
            <style dangerouslySetInnerHTML={{__html: `
              .latest-track { --slide-offset: calc(100% + 24px); }
              @media (min-width: 640px) {
                .latest-track { --slide-offset: calc(50% + 12px); }
              }
              @media (min-width: 1024px) {
                .latest-track { --slide-offset: calc(340px + 24px); }
              }
            `}} />
            <div 
              className={`flex gap-6 h-full latest-track w-full ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
              style={{ 
                transform: `translateX(calc(-${currentIndex} * var(--slide-offset)))` 
              }}
            >
              {[...products, ...products, ...products].map((product, idx) => (
                <div key={idx} className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[340px] h-[490px] flex flex-col bg-white p-4 shadow-sm border border-gray-100">
                  {/* Product Image */}
                      <Link href={`/product/${product.id}`} className="relative aspect-square w-full mb-4 bg-gray-100 overflow-hidden group block">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <button className="absolute top-3 right-3 text-white hover:text-red-500 transition-colors z-10" aria-label="Add to wishlist">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>
                      </Link>

                      {/* Product Details */}
                      <div className="flex flex-col flex-grow">
                        <Link href={`/product/${product.id}`}>
                          <h3 className="font-serif text-[#303030] text-[20px] sm:text-[24px] font-medium leading-snug mb-2 line-clamp-2 hover:text-[#07512E] transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-[#07512E] font-medium mb-4">
                          {product.price}
                        </p>
                        <div className="mt-auto flex gap-4">
                          <Link href={`/product/${product.id}`} className="flex-1 h-[48px] flex items-center justify-center bg-[#FFDE59] text-[#101010] font-sans font-medium text-[20px] hover:bg-[#e6c543] transition-colors duration-300">
                            Shop Now
                          </Link>
                          <button 
                            onClick={() => addToCart(product)}
                            className="flex-1 h-[48px] flex items-center justify-center bg-white border border-[#07512E] text-[#07512E] font-sans font-medium text-[20px] hover:bg-[#07512E] hover:text-white transition-colors duration-300"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                  </div>
                ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
