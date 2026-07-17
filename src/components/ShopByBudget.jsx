"use client";

import React from "react";
import Link from "next/link";

const budgetRanges = [
  {
    title: "Under ₹499",
    query: "?maxPrice=499",
    image: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784281534/Everyday_icons_shop_by_price-under_499_pxj2k9.jpg",
  },
  {
    title: "₹500 - ₹699",
    query: "?minPrice=500&maxPrice=699",
    image: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784281534/Everyday_icons_shop_by_price-500-699_izkztc.jpg",
  },
  {
    title: "₹700 - ₹999",
    query: "?minPrice=700&maxPrice=999",
    image: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784281534/Everyday_icons_shop_by_price-700-999_olshxm.jpg",
  },
  {
    title: "₹999 & Above",
    query: "?minPrice=999",
    image: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784281534/Everyday_icons_shop_by_price-above-999_wdpalr.jpg",
  },
];

export default function ShopByBudget() {
  return (
    <section className="py-12 md:py-16 bg-[#FFFDF9]">
      <div className="w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0">
        {/* Header Section */}
        <div className="mb-10 text-left">
          <h2 className="text-3xl md:text-4xl font-serif text-[#1e2a24] font-medium tracking-wide">
            Shop By Price
          </h2>
          <p className="text-[#07512E] font-sans mt-2 text-sm sm:text-base tracking-wide">
            Find the perfect jewellery matching your price preferences
          </p>
        </div>

        {/* Budget Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {budgetRanges.map((range, index) => (
            <Link
              key={index}
              href={`/shop${range.query}`}
              className="group relative h-[360px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 ease-out flex flex-col bg-gray-100"
            >
              {/* Image */}
              <img
                src={range.image}
                alt={range.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07512E]/95 via-[#07512E]/35 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-white z-10">
                <h3 className="font-serif text-2xl font-medium tracking-wide mb-1 transition-transform duration-500 group-hover:-translate-y-1">
                  {range.title}
                </h3>
                <span className="text-[#FFDE59] font-sans text-xs font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  Shop Now &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
