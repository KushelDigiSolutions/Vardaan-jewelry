"use client";

import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqItems = [
  {
    question: "Are your jewellery pieces certified and hallmarked?",
    answer: "Yes, absolutely. Every gold jewellery piece at Vardaan carries the official BIS Hallmark certification guaranteeing exact purity (18K or 22K gold). Furthermore, all our diamonds and gemstones come with authentic certification from internationally recognized laboratories like IGI and GIA.",
  },
  {
    question: "Can I request custom designs or bespoke bridal jewellery?",
    answer: "Yes, we specialize in bespoke sculpting and custom bridal suites. You can book a private consultation with our expert designers in our Delhi atelier or via a virtual session. We work closely with you to select the desired gold karat, diamond specifications, and design motifs to bring your dream jewellery to life.",
  },
  {
    question: "How is your fine jewellery packaged and shipped securely?",
    answer: "Every piece of Vardaan jewellery is meticulously packaged in our luxury, tamper-proof branded boxes. We offer fully insured, secure shipping across India and worldwide, ensuring your precious pieces arrive safely at your doorstep.",
  },
  {
    question: "What materials and gemstones do you use in your creations?",
    answer: "We craft our timeless pieces using premium 18K and 22K BIS certified gold. Our masterful settings feature conflict-free, ethically sourced VVS/VS clarity diamonds, lush Zambian emeralds, rich rubies, and premium South Sea pearls, created by expert traditional artisans.",
  },
  {
    question: "Do you offer maintenance, cleaning, or restoration services?",
    answer: "Vardaan provides a lifetime maintenance covenant for all our clients. We offer professional inspection, ultrasonic cleaning, prong tightening, and restoration services to ensure your heirloom jewellery maintains its pristine brilliance across generations.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 md:pt-6 md:pb-16 lg:pt-16 lg:px-6 bg-[#FFFFFF] overflow-hidden">
      <div className="w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0 flex flex-col">
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
