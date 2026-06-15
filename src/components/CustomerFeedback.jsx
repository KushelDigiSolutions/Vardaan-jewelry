import React from "react";

const testimonials = [
  {
    id: 1,
    quote: "Supporting vardaan has been a truly uplifting experience. Knowing that my contribution helps feed the needy and spread devotion brings deep satisfaction to my heart.",
    name: "Jerome Bell",
    location: "India",
  },
  {
    id: 2,
    quote: "Supporting vardaan has been a truly uplifting experience. Knowing that my contribution helps feed the needy and spread devotion brings deep satisfaction to my heart.",
    name: "Jerome Bell",
    location: "India",
  },
  {
    id: 3,
    quote: "Supporting Vardaan has been a truly uplifting experience. Knowing that my contribution helps feed the needy and spread devotion brings deep satisfaction to my heart.",
    name: "Jerome Bell",
    location: "India",
  },
];

export default function CustomerFeedback() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-[#2d3732] font-semibold text-center mb-12 md:mb-16">
          Customer Feedback
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.04)] flex flex-col"
            >
              {/* Quote Icon */}
              <div className="mb-6 text-[#07512E]">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 11L8.5 16H5L6.5 11V6H11V11H10ZM18 11L16.5 16H13L14.5 11V6H19V11H18Z" />
                </svg>
              </div>

              {/* Quote Text */}
              <p className="text-[#333] text-sm md:text-base leading-relaxed mb-10 flex-grow font-sans">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="mt-auto">
                <h4 className="text-[#1a1a1a] font-semibold text-base mb-1">
                  {testimonial.name}
                </h4>
                <p className="text-gray-400 text-sm">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
