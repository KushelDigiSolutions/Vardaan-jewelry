"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiX, FiCheckCircle } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const RECOMMENDED_ITEMS = [];
/*
[
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
*/

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const PLACEHOLDER_IMAGE =
  "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png";

export default function CartDrawer() {
  const { isCartOpen, closeCart, cartItems, addToCart } = useCart();
  const [navHeight, setNavHeight] = useState(135);
  const [recommendedItems, setRecommendedItems] = useState(
    RECOMMENDED_ITEMS.slice(0, 0),
  );
  const [isRecommendedLoading, setIsRecommendedLoading] = useState(false);

  // Prevent background scrolling when cart is open and calculate exact navbar offset
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";

      // Calculate precise navbar height to position drawer right below it
      const headers = document.querySelectorAll("header");
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
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);
  useEffect(() => {
    if (!isCartOpen || recommendedItems.length > 0) return;

    const fetchRecommendedProducts = async () => {
      setIsRecommendedLoading(true);
      try {
        const res = await fetch(`${API_URL}/products?sort=newest&limit=6`);
        if (res.ok) {
          const json = await res.json();
          setRecommendedItems(json.data?.products || json.data || []);
        }
      } catch (err) {
        console.error("Error fetching recommended products:", err);
      } finally {
        setIsRecommendedLoading(false);
      }
    };

    fetchRecommendedProducts();
  }, [isCartOpen, recommendedItems.length]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[55] transition-opacity  duration-300 ${
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: `${navHeight-15}px` }}
        onClick={closeCart}
      />

      {/* Side Drawer */}
      <div
        className={`fixed right-0 w-[640px] md:pt-[20px] max-w-[100vw] bg-white shadow-2xl z-[55] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          top: `${navHeight-15}px`,
          height: `calc(100vh - ${navHeight-15}px)`,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5 text-[18px] sm:text-[20px] font-medium text-[#202020] font-sans">
            <FiCheckCircle className="w-6 h-6 text-green-600 stroke-[2.2]" />
            <span>
              {cartItems.length === 0
                ? "Your bag is empty"
                : `${cartItems.length} item${cartItems.length > 1 ? "s" : ""} in your bag`}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400 cursor-pointer"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="py-5 w-full max-w-[512px] px-4 mx-auto">
            {/* Last Added Item Preview */}
            {cartItems.length > 0 ? (
              (() => {
                const lastItem = cartItems[cartItems.length - 1];
                const originalPrice = lastItem.product?.price || lastItem.price;
                const salePrice = lastItem.product?.salePrice || lastItem.price;
                const discount = Math.round(
                  ((originalPrice - salePrice) / originalPrice) * 100,
                );
                return (
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="w-[120px] sm:w-[220px] h-[100px] sm:h-[186px] bg-[#F7F5F0] shrink-0 mx-auto sm:mx-0 overflow-hidden rounded">
                      <img
                        src={
                          lastItem.image ||
                          "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781529483/Lucy_Williams_Engravable_Arco_Cord_Ring_fp3lgn.png"
                        }
                        alt={lastItem.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col w-full sm:w-[276px] h-auto sm:h-[186px] py-1 shrink-0 text-center sm:text-left">
                      <h3 className="text-[20px] font-sans font-medium text-[#111827] mb-1 leading-snug">
                        {lastItem.name}
                      </h3>
                      {lastItem.variant && lastItem.variant !== "default" && (
                        <p className="text-[13px] text-[#6B7280] font-normal font-sans leading-relaxed mb-1 italic">
                          {lastItem.variant.includes(":") ||
                          lastItem.variant.startsWith("Color Option") ||
                          lastItem.variant.startsWith("Size")
                            ? lastItem.variant
                            : `Size : ${lastItem.variant}`}
                        </p>
                      )}
                      <p className="text-[13px] text-[#9CA3AF] font-sans mb-2">
                        Qty: {lastItem.quantity}
                      </p>
                      <div className="flex flex-col gap-1 mt-2 items-center sm:items-start">
                        {/* Total Sale Price */}
                        <span className="text-[24px] font-semibold font-sans text-[#111827]">
                          ₹{" "}
                          {(salePrice * lastItem.quantity).toLocaleString(
                            "en-IN",
                          )}
                        </span>

                        {/* Original Price + Discount */}
                        {discount > 0 && (
                          <div className="flex items-center gap-2">
                            <span className="text-[14px] text-gray-400 line-through">
                              ₹{" "}
                              {(
                                originalPrice * lastItem.quantity
                              ).toLocaleString("en-IN")}
                            </span>

                            <span className="text-[13px] font-semibold text-[#0B7A4B]">
                              {discount}% OFF
                            </span>
                          </div>
                        )}

                        <span className="text-[12px] text-gray-400 font-sans">
                          ₹ {salePrice.toLocaleString("en-IN")} each
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()
            ) : (
              <p className="text-center text-gray-400 font-sans py-8">
                No items in your bag yet.
              </p>
            )}

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
              {isRecommendedLoading ? (
                <p className="text-center text-gray-400 font-sans py-6">
                  Loading recommendations...
                </p>
              ) : recommendedItems.length > 0 ? (
                recommendedItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row gap-4 p-3 border border-gray-100 hover:border-gray-200 transition-colors bg-white group cursor-pointer"
                  >
                    <Link
                      href={`/product/${item._id}`}
                      onClick={closeCart}
                      className="w-full sm:w-[190px] h-[140px] bg-[#F7F5F0] shrink-0"
                    >
                      <img
                        src={item.images?.[0] || PLACEHOLDER_IMAGE}
                        alt={item.name}
                        className="w-full h-full object-cover mix-blend-multiply"
                      />
                    </Link>
                    <div className="flex flex-col justify-center py-1 w-full gap-3 text-center sm:text-left">
                      <Link href={`/product/${item._id}`} onClick={closeCart}>
                        <h4 className="text-[18px] sm:text-[24px] font-medium font-serif text-[#303030] leading-snug group-hover:text-[#07512E] transition-colors">
                          {item.name}
                        </h4>
                      </Link>
                      <div className="flex items-center justify-between px-2 sm:px-0">
                        {/* Price Section */}
                        <div className="flex flex-col">
                          {/* Sale Price */}
                          <span className="text-[14px] sm:text-[20px] font-semibold text-black">
                            ₹{" "}
                            {(item.salePrice || item.price || 0).toLocaleString(
                              "en-IN",
                            )}
                          </span>

                          {/* Original Price + Discount */}
                          {item.salePrice &&
                            item.price &&
                            item.salePrice < item.price && (
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[14px] text-gray-400 line-through">
                                  ₹ {item.price.toLocaleString("en-IN")}
                                </span>

                                <span className="text-[13px] font-semibold text-[#0B7A4B]">
                                  {Math.round(
                                    ((item.price - item.salePrice) /
                                      item.price) *
                                      100,
                                  ) > 0 && (
                                    <span className="text-[13px] font-semibold text-[#0B7A4B]">
                                      {Math.round(
                                        ((item.price - item.salePrice) /
                                          item.price) *
                                          100,
                                      )}
                                      % OFF
                                    </span>
                                  )}
                                </span>
                              </div>
                            )}
                        </div>

                        {/* Button */}
                        {item.inventory <= 0 ? (
                          <span className="text-[12px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-3 py-1.5 rounded-sm border border-red-200 whitespace-nowrap">
                            Out of Stock
                          </span>
                        ) : cartItems.some(
                            (cartItem) =>
                              cartItem.id === item._id ||
                              cartItem._id === item._id,
                          ) ? (
                          <Link
                            href="/cart"
                            onClick={closeCart}
                            className="text-[12px] font-bold uppercase tracking-wider text-white bg-[#07512E] border border-[#07512E] px-3 py-1.5 rounded-sm hover:bg-[#054024] transition-colors whitespace-nowrap"
                          >
                            View Cart
                          </Link>
                        ) : (
                          <button
                            onClick={() => addToCart(item)}
                            className="text-[12px] font-bold uppercase tracking-wider text-[#07512E] border border-[#07512E] px-3 py-1.5 rounded-sm hover:bg-[#07512E] hover:text-white transition-colors whitespace-nowrap"
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 font-sans py-6">
                  No recommendations found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
