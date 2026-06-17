"use client";

import React from "react";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const RELATED_PRODUCTS = [
  {
    id: 1,
    name: "Lucy Williams Engravable Arco Cord Necklace",
    price: "₹ 1995",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525173/Rectangle_23_8_wrh0bx.png" // Using a necklace placeholder
  },
  {
    id: 2,
    name: "Lucy Williams Engravable Arco Cord Necklace",
    price: "₹ 1995",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525042/Rectangle_23_6_igmjdi.png" // Using a gold ring placeholder
  },
  {
    id: 3,
    name: "Lucy Williams Engravable Arco Cord Necklace",
    price: "₹ 1995",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525033/Rectangle_23_7_k6kuwn.png" // Using another placeholder
  }
];

export default function YouMayAlsoLike() {
  const { addToCart } = useCart();

  return (
    <section className="w-full bg-[#FFFDF4] py-16">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <h2 className="text-center text-[32px] sm:text-[40px] font-serif text-[#303030] mb-12">
          You May Also Like
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {RELATED_PRODUCTS.map((product) => (
            <div key={product.id} className="bg-white flex flex-col shadow-sm group">
              
              {/* Product Image Area */}
              <div className="relative aspect-[5/4] sm:aspect-[4/3] w-full overflow-hidden bg-[#F7F5F0]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Heart Icon */}
                <button 
                  className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                  aria-label="Add to Wishlist"
                >
                  <FiHeart className="w-6 h-6 text-white stroke-[1.5]" />
                </button>
              </div>

              {/* Product Details Area */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-[20px] sm:text-[24px] font-sans font-medium text-[#303030] leading-snug mb-3 min-h-[56px] line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-[16px] text-[#07512E] font-medium mb-6">
                  {product.price}
                </p>

                {/* Buttons Container */}
                <div className="mt-auto flex items-center gap-3 w-full">
                  <Link href={`/product/${product.id}`} className="flex-1 py-2.5 bg-[#FFDE59] text-[#101010] hover:bg-[#e6c543] transition-colors cursor-pointer text-center font-sans text-[16px] sm:text-[20px] font-medium block">
                    Shop Now
                  </Link>
                  <button 
                    onClick={() => addToCart(product)}
                    className="flex-1 py-2.5 bg-white border border-[#07512E] text-[#07512E] hover:bg-[#07512E] hover:text-white transition-colors cursor-pointer text-center font-sans text-[16px] sm:text-[20px] font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
