import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function InstagramFeed() {
  // Array of 12 placeholder images to match the 2 rows of 6 columns design
  const placeholders = Array.from({ length: 12 }, (_, i) => `/images/insta-${i + 1}.jpg`);

  return (
    <section className="py-16 md:py-24 bg-[#07512E] px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto flex flex-col">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white text-center md:text-left">
            Explore latest <span className="text-[#FDE066]">Instagram Posts</span>
          </h2>
          <Link
            href="#"
            className="inline-block bg-[#FDE066] text-[#1a1a1a] font-semibold px-8 py-3 rounded-full hover:bg-[#e6c95c] transition-colors whitespace-nowrap"
          >
            Follow us
          </Link>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {placeholders.map((src, index) => (
            <Link 
              key={index} 
              href="#"
              className="relative aspect-square w-full overflow-hidden group bg-gray-200 block"
              aria-label={`Instagram post ${index + 1}`}
            >
              <img
                src={src}
                alt={`Instagram Post ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Optional Hover Overlay for Instagram Icon */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
