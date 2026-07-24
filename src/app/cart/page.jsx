"use client";

import React from "react";
import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 
import YouMayAlsoLike from "@/components/YouMayAlsoLike";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleQtyChange = (id, delta, variant) => {
    updateQuantity(id, delta, variant);
  };

  const handleRemove = (id, variant) => {
    removeFromCart(id, variant);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen flex flex-col bg-[#FCFCF9] mt-[110px]">
      <Navbar />

      <div className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 py-10 lg:py-16">
        <h1 className="text-[32px] md:text-[40px] font-serif text-[#07512E] mb-8 border-b border-[#F0ECE3] pb-6">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#F0ECE3] rounded-lg shadow-sm">
            <h3 className="text-2xl font-serif text-[#07512E] mb-3">Your cart is empty</h3>
            <p className="text-base text-gray-500 max-w-sm mx-auto mb-8 font-sans">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link 
              href="/shop"
              className="bg-[#07512E] text-white px-8 py-3.5 text-[16px] font-medium tracking-wide hover:bg-[#054024] transition-colors cursor-pointer"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Column: Cart Items */}
            <div className="flex-[2] bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-[#F0ECE3] w-full text-left">
              {cartItems.map((item, idx) => (
                <React.Fragment key={`${item.id}-${item.variant}`}>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start py-5">
                    <Link href={`/product/${item.id}`} className="shrink-0 w-full sm:w-[140px] aspect-[4/5] sm:aspect-square rounded-lg overflow-hidden bg-[#F7F5F0] luxury-card-hover block">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                    </Link>
                    
                    <div className="flex-1 flex flex-col justify-between w-full min-w-0 sm:h-[140px] py-1">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <Link href={`/product/${item.id}`}>
                            <h3 className="text-[20px] font-medium text-[#111827] mb-1 hover:text-[#07512E] transition-colors font-sans">{item.name}</h3>
                          </Link>
                          {item.variant && item.variant !== "default" && (
                            <p className="text-[13px] text-amber-700 font-medium mb-1 font-sans italic">Size : {item.variant}</p>
                          )}
                          <p className="text-[13px] text-gray-400 font-normal m-0 font-sans line-clamp-2">{item.desc}</p>
                        </div>
                        <button 
                          onClick={() => handleRemove(item.id, item.variant)}
                          className="bg-transparent border-none text-gray-400 hover:text-red-500 transition-colors cursor-pointer p-1"
                          aria-label="Remove item"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex flex-wrap sm:flex-nowrap items-center justify-start gap-4 mt-4 sm:mt-auto">
                        <div className="flex items-center border border-[#E5E7EB] rounded-full h-[42px] px-3 box-border w-fit">
                          <button 
                            className="bg-transparent border-none px-2 cursor-pointer text-[18px] text-[#333] hover:text-[#07512E]" 
                            onClick={() => handleQtyChange(item.id, -1, item.variant)}
                          >
                            -
                          </button>
                          <span className="px-4 text-[16px] font-medium font-sans w-8 text-center">{item.quantity}</span>
                          <button 
                            className="bg-transparent border-none px-2 cursor-pointer text-[18px] text-[#333] hover:text-[#07512E]" 
                            onClick={() => handleQtyChange(item.id, 1, item.variant)}
                          >
                            +
                          </button>
                        </div>
                        <div className="flex gap-5 font-semibold text-[20px] text-[#111827] font-sans mt-2 sm:mt-0 ">
                          <p className="font-semibold text-gray-900 text-[15px] md:text-[16px]">
                      ₹ {(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>

                    {/* Original Price + Discount */}
                    {item.product && item.product.price > item.price && (
                      <div className="flex items-center gap-2 md:justify-end mt-1 flex-wrap">
                        <span className="text-[12px] md:text-[13px] text-gray-400 line-through">
                          ₹{" "}
                          {(item.product.price * item.quantity).toLocaleString(
                            "en-IN",
                          )}
                        </span>

                        <span className="text-[11px] md:text-[12px] font-semibold text-[#0B7A4B] whitespace-nowrap">
                          {Math.round(
                            ((item.product.price - item.price) /
                              item.product.price) *
                              100,
                          )}
                          % OFF
                        </span>
                      </div>
                    )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {idx < cartItems.length - 1 && <hr className="border-0 border-t border-gray-100 m-0" />}
                </React.Fragment>
              ))}
            </div>

            {/* Right Column: Order Summary */}
            <div className="flex-1 bg-white pt-8 pb-8 px-6 rounded-lg shadow-sm border border-[#F0ECE3] w-full min-w-0 lg:min-w-[340px] sticky top-[120px] text-left">
              <h2 className="text-[24px] font-medium mb-6 mt-0 text-[#07512E] font-serif">Order Summary</h2>
              
              <div className="flex justify-between mb-4 text-[15px] text-gray-600 font-sans">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">₹ {subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between mb-4 text-[15px] text-gray-600 font-sans">
                <span>Shipping</span>
                <span className="text-[#07512E] font-semibold">Calculated at checkout</span>
              </div>
              
              <div className="border-t border-gray-100 my-4 pt-4 flex justify-between text-[20px] font-bold text-[#111827] font-sans">
                <span>Estimated Total</span>
                <span>₹ {subtotal.toLocaleString("en-IN")}</span>
              </div>

              <Link 
                href="/checkout"
                className="w-full mt-6 bg-[#07512E] text-[#FFDE59] py-3.5 rounded font-sans font-semibold text-[16px] tracking-wide hover:bg-[#054024] transition-colors flex justify-center items-center"
              >
                PROCEED TO CHECKOUT
              </Link>
              
              <div className="text-center mt-4">
                <p className="text-[13px] text-gray-500 font-sans">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {cartItems.length === 0 && <YouMayAlsoLike />}
      
      <Footer />
    </main>
  );
}
