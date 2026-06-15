"use client";

import React, { useState } from "react";
import { FiStar, FiHeart, FiShoppingBag } from "react-icons/fi";

const products = [
  {
    id: 1,
    name: "Lotus Diamond Pendant",
    category: "Pendants",
    price: "₹48,900",
    oldPrice: "₹55,000",
    rating: 5,
    reviews: 24,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: 2,
    name: "Petal Solitaire Ring",
    category: "Rings",
    price: "₹92,500",
    oldPrice: "₹1,02,000",
    rating: 5,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop",
    isNew: false,
  },
  {
    id: 3,
    name: "Vardaan Gold Drops",
    category: "Earrings",
    price: "₹36,700",
    oldPrice: "",
    rating: 4.8,
    reviews: 32,
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=400&auto=format&fit=crop",
    isNew: false,
  },
  {
    id: 4,
    name: "Emerald Leaf Bangle",
    category: "Bracelets",
    price: "₹1,24,000",
    oldPrice: "₹1,40,000",
    rating: 5,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=400&auto=format&fit=crop",
    isNew: true,
  },
];

export default function Bestsellers() {
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-24 px-4 md:px-8 lg:px-12 bg-white" id="products">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-md">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#07512E] uppercase">
              Highly Coveted
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#07512E] mt-2 font-normal tracking-wide uppercase">
              Our Bestsellers
            </h2>
            <div className="w-16 h-[2px] bg-[#FFDE59] mt-3 mb-4" />
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Explore the timeless masterworks loved by our patrons worldwide, each crafted with divine details and premium finishes.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button className="text-xs tracking-widest font-semibold text-[#07512E] border-b border-[#07512E] pb-1 hover:text-[#FFDE59] hover:border-[#FFDE59] transition-colors duration-200 uppercase">
              View All Products
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((prod) => (
            <div 
              key={prod.id} 
              className="group flex flex-col h-full bg-[#FCFCF9] rounded-lg overflow-hidden border border-gray-100 hover:border-[#07512E]/10 transition-all duration-300 luxury-shadow hover:shadow-lg relative"
            >
              
              {/* Product Image Container */}
              <div className="relative aspect-square w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                <img 
                  src={prod.image} 
                  alt={prod.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Badge Overlay */}
                {prod.isNew && (
                  <span className="absolute top-4 left-4 bg-[#07512E] text-[#FFDE59] text-[9px] tracking-wider font-semibold uppercase px-2.5 py-1 rounded shadow-sm">
                    New Launch
                  </span>
                )}

                {/* Wishlist Button */}
                <button 
                  onClick={() => toggleWishlist(prod.id)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 hover:text-red-500 p-2.5 rounded-full shadow transition-all duration-200 focus:outline-none cursor-pointer"
                  aria-label="Add to wishlist"
                >
                  <FiHeart 
                    className={`w-4 h-4 transition-colors ${
                      wishlist[prod.id] ? "fill-red-500 stroke-red-500 text-red-500" : ""
                    }`} 
                  />
                </button>

                {/* Hover Add-To-Cart Banner */}
                <div className="absolute inset-x-0 bottom-0 bg-[#07512E]/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center py-3.5 gap-2 text-white font-medium text-xs tracking-wider uppercase cursor-pointer hover:bg-[#07512E] z-10">
                  <FiShoppingBag className="w-4 h-4 text-[#FFDE59]" />
                  <span className="text-[#FFDE59] font-sans font-semibold">Quick Add to Cart</span>
                </div>
              </div>

              {/* Product Info Section */}
              <div className="p-5 flex flex-col flex-grow bg-white">
                <span className="text-[10px] tracking-widest text-gray-400 font-medium uppercase mb-1">
                  {prod.category}
                </span>
                
                <h3 className="font-serif text-[#07512E] text-base font-semibold group-hover:text-gray-900 transition-colors duration-200 line-clamp-1 mb-2">
                  {prod.name}
                </h3>

                {/* Ratings */}
                <div className="flex items-center gap-1.5 mb-4">
                  <div className="flex items-center text-[#FFDE59]">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(prod.rating) ? "fill-[#FFDE59]" : "text-gray-200"
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400 font-light">
                    ({prod.reviews} reviews)
                  </span>
                </div>

                {/* Price block */}
                <div className="mt-auto flex items-baseline gap-2.5">
                  <span className="text-lg font-semibold text-[#07512E]">
                    {prod.price}
                  </span>
                  {prod.oldPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {prod.oldPrice}
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
