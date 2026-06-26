"use client";

import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqItems = [
  {
    question: "What is your design process like?",
    answer: "Our design process begins with a deep understanding of traditional aesthetics and modern craftsmanship. We sketch initial concepts, select premium fabrics, and then our master artisans execute the intricate hand-embroidery to create a unique piece.",
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 5-7 business days within India. International shipping can take 10-15 business days depending on the destination and customs processing.",
  },
  {
    question: "Do you offer custom sizing?",
    answer: "Yes, we specialize in custom sizing for all our deity dresses. You can provide specific measurements of your idol, and we will tailor the dress to ensure a perfect fit.",
  },
  {
    question: "What materials do you use for the dresses?",
    answer: "We use only the finest materials including pure silk, velvet, organza, and high-quality cotton. All our embellishments like Gota Patti and Zardosi are made with premium threads and stones.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 md:pt-6 md:pb-16 lg:pt-16 lg:px-6 bg-[#FFFFFF] overflow-hidden">
      <div className="w-full max-w-[1192px] mx-auto px-4 lg:px-0 flex flex-col">
        {/* Header */}
        <div className="mb-10 ">
          <p className="text-[20px] md:text-[32px] font-medium tracking-wider text-[#07512E] uppercase">
            FAQ
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-serif font-medium leading-tight text-[#0d1c22]">
            Most asked questions
          </h2>
        </div>

          {/* FAQ List */}
          <div className="">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`py-4 sm:py-6 md:py-7 ${index === faqItems.length - 1 ? "" : "border-b border-[#E5E7EB]"}`}
                >
                  <div 
                    className="flex cursor-pointer items-start justify-between gap-4"
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="flex-1 pr-2">
                      <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-medium font-sans leading-[1.45] text-[#1a1a1a]">
                        {item.question}
                      </h3>

                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="max-w-[980px] text-[18px] font-sans leading-relaxed text-gray-500">
                          {item.answer}
                        </p>
                      </div>
                    </div>

                    <button
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-[#1a1a1a]"
                      aria-label={isOpen ? "Collapse FAQ" : "Expand FAQ"}
                    >
                      {isOpen ? (
                        <FiChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
                      ) : (
                        <FiChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
      </div>
    </section>
  );
}
