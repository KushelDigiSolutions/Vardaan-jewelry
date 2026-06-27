import React from "react";
import { FiAward, FiShield, FiRefreshCw, FiTruck } from "react-icons/fi";

const promises = [
  {
    icon: FiAward,
    title: "100% Certified",
    description: "Every piece of rolled gold jewellery is certified for premium finish, exceptional durability, and authentic quality.",
  },
  {
    icon: FiShield,
    title: "Secure Purchase",
    description: "Your trust is our legacy. 100% secure payments and insured checkout.",
  },
  {
    icon: FiRefreshCw,
    title: "Lifetime Exchange",
    description: "Upgrade or exchange your Vardaan heirloom pieces anytime with our lifetime policy.",
  },
  {
    icon: FiTruck,
    title: "Free Insured Shipping",
    description: "Complimentary, fully-insured delivery across India directly to your doorstep.",
  },
];

export default function BrandPromise() {
  return (
    <section className="bg-white border-y border-[#07512E]/10 py-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {promises.map((promise, idx) => {
          const Icon = promise.icon;
          return (
            <div 
              key={idx}
              className="flex flex-col items-center text-center p-4 group transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-full bg-[#07512E]/5 flex items-center justify-center text-[#07512E] mb-4 group-hover:bg-[#07512E] group-hover:text-[#FFDE59] transition-all duration-300 shadow-sm">
                <Icon className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-[#07512E] text-base font-semibold tracking-wider mb-2 uppercase">
                {promise.title}
              </h3>
              <p className="text-xs text-gray-500 font-light max-w-[240px] leading-relaxed">
                {promise.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
