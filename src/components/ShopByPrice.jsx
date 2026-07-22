"use client";

import React from "react";
import Link from "next/link";

const priceRanges = [
  {
    title: "Under ₹599",
    query: "?category=time-less-tradition&maxPrice=599",
    image: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784353155/WhatsApp_Image_2026-07-18_at_10.59.51_AM_tx9xl1.jpg",
  },
  {
    title: "₹600 - ₹899",
    query: "?category=time-less-tradition&minPrice=600&maxPrice=899",
    image: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784353155/WhatsApp_Image_2026-07-18_at_10.59.52_AM_mo262m.jpg",
  },
  {
    title: "₹900 - ₹1199",
    query: "?category=time-less-tradition&minPrice=900&maxPrice=1199",
    image: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784538993/new3_c4nqjt.png",
  },
  {
    title: "₹1199 & Above",
    query: "?category=time-less-tradition&minPrice=1199",
    image: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784538993/new13_y6sl0m.png",
  },
];

export default function ShopByPrice() {
  return (
    <section className="py-12 md:py-20 bg-[#FCFCF9]">
      <div className="w-full max-w-[1172px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0">
        
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-[32px] font-medium font-serif text-[#07512E] tracking-wide">
            Shop By Price
          </h2>
          <p className="text-gray-500 font-sans text-sm mt-2">
            Explore our curated collections matching your desired budget.
          </p>
        </div>

        {/* Price Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {priceRanges.map((range, index) => (
            <Link
              key={index}
              href={`/shop${range.query}`}
              className="group relative h-[300px] overflow-hidden rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 block"
            >
              <img
                src={range.image}
                alt={range.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 bg-gray-100"
              />
              
              {/* Overlay with subtle darkening and bottom green gradient */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
              
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#07512E]/90 via-[#07512E]/35 to-transparent pointer-events-none flex flex-col items-center justify-end pb-8">
                <h3 className="text-white font-serif text-2xl font-medium tracking-wide">
                  {range.title}
                </h3>
                <span className="text-[#FFDE59] font-sans text-xs font-semibold uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
