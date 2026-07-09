"use client";

import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqItems = [
  {
    question: "What is Vardaan Jewellery made of?",
    answer: "Our Anti-Tarnish collection is crafted from premium 316L stainless steel with high-quality gold plating for long-lasting shine. Our Heritage collection features beautifully crafted ethnic designs for special occasions.",
  },
  {
    question: "Is your jewellery anti-tarnish?",
    answer: "Yes. Our Anti-Tarnish collection is designed to resist fading and maintain its shine for much longer than regular fashion jewellery with proper care.",
  },
  {
    question: "Is the jewellery safe for sensitive skin?",
    answer: "Yes. Our Anti-Tarnish collection is skin-friendly and comfortable for everyday wear.",
  },
  {
    question: "Can I wear it daily?",
    answer: "Absolutely. Our designs are made for office wear, casual outings, date nights, and everyday elegance.",
  },
  {
    question: "How do I care for my jewellery?",
    answer: "Store it in a dry pouch or jewellery box. Avoid direct contact with perfume and harsh chemicals. Wipe with a soft cloth after use. Keep pieces separate to avoid scratches.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most orders are delivered within 3–7 business days, depending on your location.",
  },
  {
    question: "Do you offer Cash on Delivery (COD)?",
    answer: "Yes, COD is available on selected pincodes.",
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you'll receive a tracking link via SMS/Email/WhatsApp.",
  },
  {
    question: "Do you accept returns or exchanges?",
    answer: "Yes, we accept returns or exchange of all products only if eligible for our return/exchange policy.",
  },
  {
    question: "Is Vardaan Jewellery suitable for gifting?",
    answer: "Absolutely! Every Vardaan piece is designed to celebrate life's special moments—birthdays, anniversaries, weddings, festivals, and heartfelt surprises.",
  },
  {
    question: "Do you provide gift packaging?",
    answer: "Yes. Premium gift packaging is available, making every order ready to gift.",
  },
  {
    question: "Why choose Vardaan?",
    answer: "Because every piece combines premium quality, timeless design, and thoughtful craftsmanship—More Than a Jewel, A Blessing.",
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
