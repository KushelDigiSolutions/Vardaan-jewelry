"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiShare2, FiHome } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import { LuShieldCheck } from "react-icons/lu";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("50");
  const { addToCart } = useCart();

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="w-full max-w-[1192px] lg:min-h-[808px] mx-auto px-4 lg:px-0 py-10 lg:py-16">
      <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-6">

        {/* =========================================
            COLUMN 1: PRODUCT INFO & ACTIONS
            ========================================= */}
        <div className="w-full lg:w-[365px] flex flex-col order-2 lg:order-1 shrink-0">
          <h1 className="text-[22px] sm:text-[26px] lg:text-[32px] font-sans font-medium text-[#303030] leading-tight mb-2">
            Sparkling Elegance Elara CZ Statement Ring
          </h1>

          <p className="text-[15px] font-sans text-gray-400 font-medium tracking-[0.15em] uppercase mb-6">
            Online Exclusive
          </p>

          <div className="mb-6">
            <p className="text-[22px] text-[#303030] font-medium font-sans flex items-baseline gap-1.5">
              INR: <span className="font-light text-[24px]">4000</span>
            </p>
            <p className="text-[15px] text-gray-400 font-sans tracking-wide mt-1">
              MRP (INCL. OF ALL TAXES)
            </p>
          </div>

          {/* Size Selector */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[15px] font-sans text-gray-700">Size :</span>
              <a href="#size-guide" className="text-[#07512E] text-[15px] font-regular underline underline-offset-4 decoration-1">
                Size guide
              </a>
            </div>
            <div className="flex gap-2 flex-wrap">
              {["50", "52", "55", "58", "60"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-11   h-11 border flex items-center justify-center text-[15px] font-sans transition-colors cursor-pointer ${selectedSize === size
                    ? "bg-[#07512E] border-[#07512E] text-white font-regular"
                    : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <p className="text-[15px] font-sans font-medium text-[#303030] mb-3">Quantity</p>
            <div className="flex border border-gray-300 w-fit">
              <button
                onClick={decreaseQuantity}
                className="w-10 h-10 flex items-center justify-center text-[#333333] hover:bg-gray-50 transition-colors cursor-pointer"
              >
                -
              </button>
              <div className="w-10 h-10 flex items-center justify-center text-[16px]  font-regular *:font-sans border-x border-gray-300">
                {quantity}
              </div>
              <button
                onClick={increaseQuantity}
                className="w-10 h-10 flex items-center justify-center text-[#333333] hover:bg-gray-50 transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mb-4">
            <button className="w-full lg:w-[344px] h-[56px] bg-[#FFDE59] text-[#101010] hover:bg-[#e6c543] font-sans font-medium text-[20px] py-3 transition-colors cursor-pointer">
              Shop Now
            </button>
            <button
              onClick={() => {
                addToCart({
                  id: 'elara-ring-1',
                  name: 'Sparkling Elegance Elara CZ Statement Ring',
                  price: '₹ 4000',
                  image: 'https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png'
                });
              }}
              className="w-full lg:w-[344px] h-[56px] border border-[#07512E] text-[#07512E] bg-white hover:bg-[#07512E] hover:text-white font-sans font-medium text-[20px] py-3 transition-colors cursor-pointer"
            >
              Add to Cart
            </button>
          </div>

          <div className="text-center mb-4">
            <a href="#shipping" className="text-[#303030] text-[14px] font-sans underline underline-offset-4 decoration-1">
              Shipping calculated at checkout
            </a>
          </div>

          {/* Delivery Estimate Box */}
          <div className="border border-[#FBEF9A] rounded px-4 py-3 mb-8 bg-[#fffff8]">
            <div className="flex justify-between items-center mb-2.5 text-[16px] text-[#333333] font-sans">
              <span>Delhi / NCR :</span>
              <span className="font-medium">2 - 4 Days</span>
            </div>
            <div className="flex justify-between items-center mb-2.5 text-[16px] text-[#333333] font-sans">
              <span>Rest of India :</span>
              <span className="font-medium">3 - 6 Days</span>
            </div>
            <div className="flex justify-between items-center mb-2.5 text-[16px] text-[#333333] font-sans">
              <span>International</span>
              <span className="font-medium">7 - 14 Days</span>
            </div>
            <p className="text-red-500 text-[15px] font-light font-sans mt-1">
              COD available. Beware of fake websites.
            </p>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-6 text-[#606060]">
            <button className="flex items-center gap-2 text-[18px] font-sans hover:text-[#07512E] transition-colors cursor-pointer font-medium">
              <TbTruckDelivery className="w-5 h-5" /> Delivery & Return
            </button>
            <button className="flex items-center gap-2 text-[18px] font-sans hover:text-[#07512E] transition-colors cursor-pointer font-medium">
              <FiShare2 className="w-[18px] h-[18px]" /> Share
            </button>
          </div>
        </div>


        {/* =========================================
            COLUMN 2: IMAGE GALLERY
            ========================================= */}
        <div className="w-full lg:w-[395px] flex flex-col gap-4 order-1 lg:order-2 shrink-0">
          <div className="w-full aspect-square bg-[#F7F5F0] overflow-hidden relative">
            <img
              src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png"
              alt="Ring Top View"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="w-full aspect-square bg-[#F7F5F0] overflow-hidden relative">
            <img
              src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781529306/Lucy_Williams_Engravable_Arco_Gold_Ring_vggf77.png"
              alt="Ring Hand View"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Thumbnails overlaid on the bottom image just like screenshot */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 px-2 py-2 w-[90%] sm:w-auto overflow-x-auto">
              {[1, 2, 3].map((num) => (
                <div key={num} className={`w-12 h-10 sm:w-16 sm:h-12 bg-gray-200 border-2 cursor-pointer shrink-0 ${num === 1 ? 'border-[#07512E]' : 'border-transparent'}`}>
                  <img src={`https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png`} alt={`Thumbnail ${num}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* =========================================
            COLUMN 3: DESCRIPTION & TRUST
            ========================================= */}
        <div className="w-full lg:w-[384px] flex flex-col order-3 shrink-0">

          {/* Yellowish Description Box */}
          <div className="bg-[#FFFDF4] px-6 pt-4 pb-6 sm:px-8 sm:pt-5 sm:pb-8 border border-[#F5EEDC] mb-5">
            <h2 className="text-[32px] font-medium font-serif text-[#303030] mb-4">
              Product Discription
            </h2>
            <div className="w-full h-px bg-[#E5DCC5] mb-6"></div>

            <p className="text-[15px] text-[#303030] font-normal font-sans leading-relaxed mb-6">
              This cushion cut ring features pavé on the shoulders and around the bright central crystal, showcasing Swarovski's mastery of light at its most radiant. A joyful design that never stops shining. The Una Angelic family unleashes hypnotic movement and dazzling halos, resulting in a stunning play of light that needs to be seen to be believed.
            </p>

            <ul className="text-[15px] text-[#303030] font-sans space-y-2 list-disc pl-4">
              <li>Article no.: 5758469</li>
              <li>Collection: Una</li>
              <li>Material: Crystals, Rhodium plated</li>
              <li>Color: White</li>
              <li>Country of Origin: Mainland China</li>
              <li>Importer: Swarovski India Private Limited, UG Floor, Tower A, DLF Building No. 10, DLF Cyber City, DLF Phase - III, Gurugram - 122002</li>
            </ul>
          </div>

          {/* Safe Checkout & Logos */}
          <div className="mb-8 pl-1">
            <div className="flex items-center gap-2 text-[#404040] text-[15px] font-medium font-sans mb-3">
              <LuShieldCheck className="w-[18px] h-[18px]" /> Safe Checkout
            </div>
            <img
              src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781762762/6220ac0f912013c51947f9c4_1_meyyn1.png"
              alt="Safe Checkout Payment Methods"
              className="h-7 w-auto"
            />
          </div>

          {/* Find in store box */}
          <div className="border border-gray-200 p-5 flex items-center gap-4">
            <div className="w-6 h-6 flex items-center justify-center shrink-0">
              <div className="w-5 h-5 rounded-full border border-gray-300"></div>
            </div>
            <FiHome className="w-7 h-7 text-[#07512E] shrink-0" />
            <div className="flex flex-col">
              <span className="text-[14px] text-[#000000] font-sans font-normal">Find in store</span>
              <a href="#click-collect" className="text-[14px] text-[#000000] font-normal font-sans underline underline-offset-2">
                Click & Collect: Check Availability
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
