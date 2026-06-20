"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { LuShieldCheck } from "react-icons/lu";

const fallbackItems = [
  {
    id: 1,
    name: "Necklace",
    desc: "Cushion cut, Blue, Rhodium plated",
    price: 12000.0,
    quantity: 1,
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png"
  },
  {
    id: 2,
    name: "Millenia drop earrings",
    desc: "Cushion cut, Blue, Rhodium plated",
    price: 5000.0,
    quantity: 1,
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781529483/Lucy_Williams_Engravable_Arco_Cord_Ring_fp3lgn.png"
  },
  {
    id: 3,
    name: "Millenia drop ring",
    desc: "Cushion cut, Blue, Rhodium plated",
    price: 4000.0,
    quantity: 1,
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781528583/rings_pkq8gv.png"
  }
];

export default function CheckoutClient() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const mapped = cartItems.map((item, idx) => {
        let parsedPrice = item.price;
        if (typeof parsedPrice === "string") {
          parsedPrice = parseFloat(parsedPrice.replace(/[^0-9.]/g, ""));
        }
        return {
          id: item.id || Date.now() + idx,
          name: item.name,
          desc: "Cushion cut, Blue, Rhodium plated",
          price: parsedPrice || 0,
          quantity: item.quantity || 1,
          image: item.image
        };
      });
      setItems(mapped);
    } else {
      setItems([]);
    }
  }, [cartItems]);

  const handleQtyChange = (id, delta) => {
    updateQuantity(id, delta);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <section className="flex-1 flex justify-center py-10 px-5 bg-[#fdfbf6]">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row gap-8 items-start">

        {/* Left Column: Cart Items */}
        <div className="flex-[2] bg-white p-4 sm:p-6 rounded-lg shadow-sm w-full">
          {items.length === 0 ? (
            <p className="text-center p-5">Your cart is empty.</p>
          ) : (
            items.map((item, idx) => (
              <React.Fragment key={item.id}>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start py-4">
                  <div className="shrink-0 w-full sm:w-[128px] h-auto sm:h-[128px] aspect-[4/5] sm:aspect-square  overflow-hidden bg-[#f0f0f0]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between w-full min-w-0 sm:h-[128px]">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-[20px] font-medium text-[#111827] mb-1">{item.name}</h3>
                        <p className="text-[16px] text-[#6B7280] font-normal m-0">{item.desc}</p>
                      </div>
                      <button className="bg-transparent border-none text-gray-300 hover:text-red-500 transition-colors cursor-pointer -mt-1.5">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-start sm:items-center justify-between gap-y-3 mt-auto sm:mt-0 w-full">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
                        <div className="flex items-center border border-[#E5E7EB] rounded-full h-[42px] px-3 box-border w-fit">
                          <button className="bg-transparent border-none px-1 cursor-pointer text-[18px] text-[#333]" onClick={() => handleQtyChange(item.id, -1)}>-</button>
                          <span className="px-3 text-[16px] font-medium">{item.quantity}</span>
                          <button className="bg-transparent border-none px-1 cursor-pointer text-[18px] text-[#333]" onClick={() => handleQtyChange(item.id, 1)}>+</button>
                        </div>
                        <button className="bg-transparent border-none underline text-black text-[15px] font-medium cursor-pointer ml-2 sm:ml-0" onClick={() => handleRemove(item.id)}>Remove</button>
                      </div>
                      <div className="font-medium text-[18px] text-black pt-2 sm:pt-0">
                        ₹ {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
                {idx < items.length - 1 && <hr className="border-0 border-t border-gray-100 m-0" />}
              </React.Fragment>
            ))
          )}
        </div>

        {/* Right Column: Order Summary */}
        <div className="flex-1 bg-white pt-9 pb-8 px-6 rounded-lg shadow-sm w-full min-w-0 lg:min-w-[320px]">
          <h2 className="text-[28px] font-medium mb-4 mt-0 text-black">Order Summary</h2>

          <div className="flex justify-between mb-2.5 text-[15px] text-gray-600">
            <span>Subtotal</span>
            <span>₹ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2.5 text-[15px] text-gray-600">
            <span>Shipping</span>
            <span className="text-[#2e8b57] font-semibold">Free</span>
          </div>

          <div className="flex justify-between text-[20px] font-bold text-[#333] mt-4 mb-5">
            <span>Total</span>
            <span>₹ {subtotal.toFixed(2)}</span>
          </div>

          <div className="flex flex-col gap-3 border border-[#E5E7EB] p-3 sm:p-4 mb-4 box-border">
            <h4 className="text-[18px] font-semibold m-0 text-black">Promo code</h4>
            <div className="flex m-0">
              <input className="flex-1 min-w-0 py-2 px-3 border border-[#E5E7EB] border-r-0 rounded-l outline-none text-[15px]" type="text" placeholder="Enter promo code" />
              <button className="py-2 px-4 bg-gray-50 border border-[#E5E7EB] rounded-r cursor-pointer font-semibold text-[#333] hover:bg-gray-200 transition-colors">Apply</button>
            </div>

            <ul className="list-none p-0 m-0 text-[14px] text-gray-700 flex flex-col gap-2 leading-snug mt-8">
              <li className="flex items-center gap-2.5 m-0">
                <span className="flex items-center justify-center w-8 h-8 border border-[#E5E7EB] text-center font-bold shrink-0 text-[13px]">%</span>
                Apply promo codes here in the shopping bag
              </li>
              <li className="flex items-center gap-2.5 m-0">
                <span className="flex items-center justify-center w-8 h-8 border border-[#E5E7EB] text-center font-bold shrink-0 text-[13px]">📥</span>
                Use Gift Cards at the payment step of the checkout
              </li>
            </ul>
          </div>

          <button className="w-full p-3.5 bg-[#0b4d2c] text-white border-none rounded font-semibold text-[16px] cursor-pointer mb-4 hover:bg-[#083c22] transition-colors">CHECKOUT</button>

          <div className="text-center mb-5">
            <a className="text-[#07512E] font-semibold underline text-[16px]" href="/">Continue Shopping</a>
          </div>

          <div className="border-t border-gray-100 pt-3">
            <div className="flex items-center font-medium gap-2 text-[18px] text-gray-600 mb-3">
              <LuShieldCheck className="w-5 h-5 stroke-[1.5]" />
              Safe Checkout
            </div>
            <div className="flex gap-2 items-center">
              <img
                src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781762762/6220ac0f912013c51947f9c4_1_meyyn1.png"
                alt="Safe Checkout Payment Methods"
                className="h-10 w-60"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
