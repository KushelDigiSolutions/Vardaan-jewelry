"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiX, FiCheckCircle } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const RECOMMENDED_ITEMS = [
  {
    id: 101,
    name: "Lucy Williams Engravable Arco Cord Necklace",
    price: "₹ 1995",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png", // using available placeholder
    bg: "bg-[#E6F0F2]" // Light bluish background
  },
  {
    id: 102,
    name: "Lucy Williams Engravable Arco Cord Necklace",
    price: "₹ 1995",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781529483/Lucy_Williams_Engravable_Arco_Cord_Ring_fp3lgn.png",
    bg: "bg-[#F7F5F0]"
  },
  {
    id: 103,
    name: "Lucy Williams Engravable Arco Cord Necklace",
    price: "₹ 1995",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png",
    bg: "bg-[#E6F0F2]"
  },
  {
    id: 104,
    name: "Lucy Williams Engravable Arco Cord Necklace",
    price: "₹ 1995",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781528583/rings_pkq8gv.png",
    bg: "bg-[#0A1A3A]" // Dark blue background like screenshot
  }
];

export default function CartDrawer() {
  const { isCartOpen, closeCart, cartItems } = useCart();
  const [navHeight, setNavHeight] = useState(180);

  // Prevent background scrolling when cart is open and compute nav height
  useEffect(() => {
    if (isCartOpen) {
      const scrolled = window.scrollY > 300;
      setNavHeight(scrolled ? 110 : 180);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[55] transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: `${navHeight}px` }}
        onClick={closeCart}
      />

      {/* Side Drawer */}
      <div 
        className={`fixed right-0 w-[640px] max-w-[100vw] bg-white shadow-2xl z-[55] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: `${navHeight}px`, height: `calc(100vh - ${navHeight}px)` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2 text-sm text-[#404040] font-sans">
            <FiCheckCircle className="w-5 h-5 text-green-600 stroke-[2]" />
            <span>1 item has been added to your bag</span>
          </div>
          <button 
            onClick={closeCart}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-5">
            {/* Added Item (Using dynamic item if available, or placeholder to match screenshot) */}
            <div className="flex gap-4 mb-6">
              <div className="w-[100px] h-[100px] bg-[#F7F5F0] shrink-0">
                <img 
                  src={cartItems.length > 0 ? cartItems[cartItems.length - 1].image : "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781529483/Lucy_Williams_Engravable_Arco_Cord_Ring_fp3lgn.png"} 
                  alt="Added Product" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="text-[15px] font-sans font-medium text-[#202020] mb-1 leading-snug">
                  {cartItems.length > 0 ? cartItems[cartItems.length - 1].name : "Dragon & Phoenix pendant"}
                </h3>
                <p className="text-[11px] text-gray-500 font-sans leading-relaxed mb-3 line-clamp-2">
                  Crystal pearls, Dragon's claw, White, 18K rose gold...
                </p>
                <div className="flex items-center justify-between mt-auto">
                  {/* Quantity Box */}
                  <div className="flex items-center border border-gray-200 rounded px-2 py-0.5 w-fit">
                    <button className="px-2 text-gray-500 text-sm hover:text-black">-</button>
                    <span className="px-3 text-sm font-sans text-gray-800">1</span>
                    <button className="px-2 text-gray-500 text-sm hover:text-black">+</button>
                  </div>
                  <span className="text-[15px] font-bold font-sans text-[#202020]">
                    {cartItems.length > 0 && cartItems[cartItems.length - 1].price ? cartItems[cartItems.length - 1].price : "₹ 13,900.00"}
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2.5 mb-8">
              <button className="w-full bg-[#07512E] text-white py-3 text-[13px] font-sans font-bold tracking-[0.05em] uppercase hover:bg-[#054024] transition-colors">
                Proceed to Checkout
              </button>
              <button 
                onClick={closeCart}
                className="w-full bg-white border border-[#07512E] text-[#303030] py-3 text-[13px] font-sans font-bold tracking-[0.05em] uppercase hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>

            <div className="w-full h-px bg-gray-100 mb-6"></div>

            {/* Recommended Items */}
            <div className="flex flex-col gap-3">
              {RECOMMENDED_ITEMS.map((item, index) => (
                <div key={index} className="flex gap-4 p-3 border border-gray-100 hover:border-gray-200 transition-colors bg-white group cursor-pointer">
                  <div className={`w-[100px] h-[90px] ${item.bg} shrink-0`}>
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                  </div>
                  <div className="flex flex-col py-1">
                    <h4 className="text-[14.5px] font-serif text-[#303030] leading-snug mb-auto group-hover:text-[#07512E] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-[14px] text-[#07512E] font-medium font-sans mt-2">
                      {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
