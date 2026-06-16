"use client";

import React, { useState } from "react";

const faqData = [
  {
    id: 1,
    question: "What is your design process like?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl felis, blandit in laoreet sed, malesuada id elit. Duis sed odio blandit tortor maximus euismod. Phasellus convallis dolor vel suscipit sagittis. Donec aliquam leo suscipit, semper dui a, condimentum sem.",
  },
  {
    id: 2,
    question: "What is your design process like?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl felis, blandit in laoreet sed, malesuada id elit. Duis sed odio blandit tortor maximus euismod. Phasellus convallis dolor vel suscipit sagittis. Donec aliquam leo suscipit, semper dui a, condimentum sem.",
  },
  {
    id: 3,
    question: "What is your design process like?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl felis, blandit in laoreet sed, malesuada id elit. Duis sed odio blandit tortor maximus euismod. Phasellus convallis dolor vel suscipit sagittis. Donec aliquam leo suscipit, semper dui a, condimentum sem.",
  },
  {
    id: 4,
    question: "What is your design process like?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl felis, blandit in laoreet sed, malesuada id elit. Duis sed odio blandit tortor maximus euismod. Phasellus convallis dolor vel suscipit sagittis. Donec aliquam leo suscipit, semper dui a, condimentum sem.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 md:mb-16 text-left">
          <p className="text-[#07512E] font-semibold tracking-wider text-sm md:text-base mb-3 uppercase">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#0d1c22] font-semibold">
            Most asked questions
          </h2>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={item.id} 
                className="border-b border-gray-100 py-6 first:pt-0"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg font-semibold text-[#1a1a1a] pr-4">
                    {item.question}
                  </span>
                  <span className="text-[#1a1a1a] ml-4 flex-shrink-0">
                    {isOpen ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19V5M5 12l7-7 7 7"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M19 12l-7 7-7-7"/>
                      </svg>
                    )}
                  </span>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed pr-10">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
