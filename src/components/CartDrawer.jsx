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
  const { isCartOpen, closeCart, cartItems, addToCart } = useCart();
  const [navHeight, setNavHeight] = useState(180);

  // Prevent background scrolling when cart is open and calculate exact navbar offset
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';

      // Calculate precise navbar height to position drawer right below it
      const headers = document.querySelectorAll('header');
      if (headers.length >= 2) {
        const staticNav = headers[0];
        const stickyNav = headers[1];

        let calculatedHeight = 0;
        if (window.scrollY > 300) {
          calculatedHeight = stickyNav.getBoundingClientRect().bottom;
        } else {
          calculatedHeight = staticNav.getBoundingClientRect().bottom;
        }
        setNavHeight(calculatedHeight > 0 ? calculatedHeight : 0);
      }
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
        className={`fixed inset-0 bg-black/40 z-[55] transition-opacity duration-300 ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        style={{ top: `${navHeight}px` }}
        onClick={closeCart}
      />

      {/* Side Drawer */}
      <div
        className={`fixed right-0 w-[640px] max-w-[100vw] bg-white shadow-2xl z-[55] transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"
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
          <div className="py-5 w-full max-w-[512px] px-4 mx-auto">
            {/* Added Item (Using dynamic item if available, or placeholder to match screenshot) */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="w-[120px] sm:w-[220px] h-[100px] sm:h-[186px] bg-[#F7F5F0] shrink-0 mx-auto sm:mx-0">
                <img
                  src={cartItems.length > 0 ? cartItems[cartItems.length - 1].image : "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781529483/Lucy_Williams_Engravable_Arco_Cord_Ring_fp3lgn.png"}
                  alt="Added Product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col w-full sm:w-[276px] h-auto sm:h-[186px] py-1 shrink-0 text-center sm:text-left">
                <h3 className="text-[20px] font-sans font-medium text-[#111827] mb-1 leading-snug">
                  {cartItems.length > 0 ? cartItems[cartItems.length - 1].name : "Dragon & Phoenix pendant"}
                </h3>
                <p className="text-[14px] text-[#6B7280]  font-normal font-sans leading-relaxed mb-3 line-clamp-2">
                  Crystal pearls, Dragon's claw, White, 18K rose gold...
                </p>
                <div className="flex flex-col gap-3 mt-4 sm:mt-auto items-center sm:items-start">
                  {/* Quantity Box */}
                  <div className="flex items-center border border-gray-200 rounded-full px-4 py-1.5 w-fit">
                    <button className="px-2 text-gray-500 text-lg hover:text-black leading-none">-</button>
                    <span className="px-4 text-[15px] font-sans text-gray-800 leading-none">1</span>
                    <button className="px-2 text-gray-500 text-lg hover:text-black leading-none">+</button>
                  </div>
                  {/* Price */}
                  <span className="text-[24px] font-semibold font-sans text-[#111827]">
                    {cartItems.length > 0 && cartItems[cartItems.length - 1].price ? cartItems[cartItems.length - 1].price : "₹ 13,900.00"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 mb-8">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full sm:w-[512px] h-[52px] bg-[#07512E] text-[#FFFFFF] py-3 text-[16px] font-sans font-bold tracking-[0.05em] uppercase hover:bg-[#054024] transition-colors flex items-center justify-center"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={closeCart}
                className="w-full sm:w-[512px] h-[52px] bg-white border border-[#07512E] text-[#07512E] py-3 text-[16px] font-sans font-bold tracking-[0.05em] uppercase hover:bg-[#054024] hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>

            <div className="w-full h-px bg-gray-100 mb-6"></div>

            {/* Recommended Items */}
            <div className="flex flex-col gap-3">
              {RECOMMENDED_ITEMS.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-4 p-3 border border-gray-100 hover:border-gray-200 transition-colors bg-white group cursor-pointer">
                  <Link href={`/product/${item.id}`} className={`w-full sm:w-[190px] h-[160px] ${item.bg} shrink-0`}>
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                  </Link>
                  <div className="flex flex-col justify-center py-1 w-full gap-3 text-center sm:text-left">
                    <Link href={`/product/${item.id}`}>
                      <h4 className="text-[18px] sm:text-[24px] font-medium font-serif text-[#303030] leading-snug group-hover:text-[#07512E] transition-colors">
                        {item.name}
                      </h4>
                    </Link>
                    <div className="flex items-center justify-between px-2 sm:px-0">
                      <p className="text-[18px] sm:text-[20px] text-[#07512E] font-medium font-sans">
                        {item.price}
                      </p>
                      <button 
                        onClick={() => addToCart(item)}
                        className="text-[12px] font-bold uppercase tracking-wider text-[#07512E] underline underline-offset-4 hover:text-[#054024]"
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
    </>
  );
}
