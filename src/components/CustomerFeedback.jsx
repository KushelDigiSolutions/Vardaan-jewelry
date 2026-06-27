import React from "react";

function QuoteIcon() {
  return (
    <svg
      viewBox="0 0 42 26"
      className="h-[28px] sm:h-[32px] w-auto opacity-80 group-hover:opacity-100 transition-opacity"
      aria-hidden="true"
    >
      {/* Outer Green Stroke */}
      <path
        d="M15.099 2.246C11.166 4.064 8.728 7.01 7.787 11.084c-.213.92-.319 1.822-.319 2.707 0 3.575 1.728 5.363 5.186 5.363 1.552 0 2.84-.46 3.861-1.382 1.022-.92 1.533-2.105 1.533-3.55 0-1.304-.45-2.406-1.348-3.31-.878-.92-1.935-1.418-3.17-1.488.249-1.694 1.286-3.336 3.117-4.925l1.772-1.542L15.099 2.246ZM31.677 2.246c-3.95 1.818-6.387 4.764-7.31 8.838a12.64 12.64 0 0 0-.32 2.707c0 3.575 1.72 5.363 5.16 5.363 1.57 0 2.866-.46 3.888-1.382 1.022-.92 1.533-2.105 1.533-3.55 0-1.304-.45-2.406-1.347-3.31-.88-.92-1.936-1.418-3.171-1.488.248-1.694 1.286-3.336 3.117-4.925l1.773-1.542-3.323-.711Z"
        fill="#07512E"
        stroke="#07512E"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Inner White Stroke + Green Fill */}
      <path
        d="M15.099 2.246C11.166 4.064 8.728 7.01 7.787 11.084c-.213.92-.319 1.822-.319 2.707 0 3.575 1.728 5.363 5.186 5.363 1.552 0 2.84-.46 3.861-1.382 1.022-.92 1.533-2.105 1.533-3.55 0-1.304-.45-2.406-1.348-3.31-.878-.92-1.935-1.418-3.17-1.488.249-1.694 1.286-3.336 3.117-4.925l1.772-1.542L15.099 2.246ZM31.677 2.246c-3.95 1.818-6.387 4.764-7.31 8.838a12.64 12.64 0 0 0-.32 2.707c0 3.575 1.72 5.363 5.16 5.363 1.57 0 2.866-.46 3.888-1.382 1.022-.92 1.533-2.105 1.533-3.55 0-1.304-.45-2.406-1.347-3.31-.88-.92-1.936-1.418-3.171-1.488.248-1.694 1.286-3.336 3.117-4.925l1.773-1.542-3.323-.711Z"
        fill="#07512E"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const testimonials = [
  {
    id: 1,
    quote: '"Vardaan’s Rolled Gold jewellery is an absolute masterpiece. The craftsmanship, texture, and brilliant finish look exactly like pure 24K gold. It feels incredibly luxurious to wear!"',
    name: "Ananya Sharma",
    location: "India",
  },
  {
    id: 2,
    quote: '"I purchased a stunning rolled gold bridal set for a family wedding, and the quality is exceptional. It maintains its radiant golden luster perfectly. Highly recommended!"',
    name: "Rajeshwari Patel",
    location: "India",
  },
  {
    id: 3,
    quote: '"The elegant designs and durable rolled gold finishing are unmatched. Vardaan offers the true essence of traditional gold jewellery with modern sophistication and premium feel."',
    name: "Priya Mehta",
    location: "India",
  },
];

export default function CustomerFeedback() {
  return (
    <section className="min-h-[520px] py-12 md:pt-16 md:pb-6 lg:pb-16 bg-[#FFFFFF] overflow-hidden flex flex-col justify-center">
      <div className="w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0 flex flex-col">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#2d3732] font-medium tracking-wide">
            Customer Feedback
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-all duration-300">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="rounded-[32px] bg-white px-6 py-8 md:px-8 md:py-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.06)] transition-all group flex flex-col"
            >
              <div className="mb-4">
                <QuoteIcon />
              </div>

              <p className="w-full text-[18px] leading-relaxed text-[#1a1a1a] font-sans flex-grow">
                {item.quote}
              </p>

              <div className="my-6 h-px w-full bg-gradient-to-r from-gray-200 via-gray-100 to-transparent" />

              <div className="flex flex-col">
                <h3 className="text-[18px] font-medium leading-none text-[#1a1a1a] mb-1.5">
                  {item.name}
                </h3>
                <p className="text-[#a0a0a0] text-[16px]">
                  {item.location}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
