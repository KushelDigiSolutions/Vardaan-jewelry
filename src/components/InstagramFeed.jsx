import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function InstagramFeed() {
  const instaImages = [
    "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781591259/01_ircrg1.png",
    "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781591262/02_i6sorm.png",
    "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781591266/03_bkl3hm.png",
    "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781591255/04_1_wynaxd.png",
    "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781591253/9_gqh50g.png",
    "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781591266/11_gut3iw.png",
    "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781591372/05_pkg9gj.png",
    "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781591375/06_cnfjpa.png",
    "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781591375/07_rquoyy.png",
    "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781591375/08_a0gfne.png",
    "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781591377/10_scol7z.png",
    "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781591380/image_19_pc3qnn.png"
  ];

  return (
    <section className="py-10 md:py-16 bg-[#07512E]">
      {/* Header Area in container */}
      <div className="w-full max-w-[1192px] mx-auto px-4 lg:px-0 mb-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
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
      </div>

      {/* Marquee CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        .marquee-container {
          --gap: 8px;
          display: flex;
          flex-direction: column;
          gap: var(--gap);
          overflow: hidden;
          width: 100%;
        }

        .marquee-track {
          display: flex;
          width: max-content;
          gap: var(--gap);
          padding-right: var(--gap);
        }
        .marquee-left {
          animation: marqueeLeft 40s linear infinite;
        }
        .marquee-right {
          animation: marqueeRight 40s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }

        .marquee-item {
          width: 231px;
          height: 210px;
          flex-shrink: 0;
        }

        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}} />

      {/* Marquee Tracks */}
      <div className="marquee-container mt-6">
        {/* Row 1: Sliding Left */}
        <div className="marquee-track marquee-left">
          {[...instaImages.slice(0, 6), ...instaImages.slice(0, 6), ...instaImages.slice(0, 6), ...instaImages.slice(0, 6)].map((src, index) => (
            <Link 
              key={index} 
              href="#"
              className="marquee-item relative overflow-hidden group bg-gray-200 block"
              aria-label={`Instagram post ${index + 1}`}
            >
              <img
                src={src}
                alt={`Instagram Post ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
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

        {/* Row 2: Sliding Right */}
        <div className="marquee-track marquee-right">
          {[...instaImages.slice(6, 12), ...instaImages.slice(6, 12), ...instaImages.slice(6, 12), ...instaImages.slice(6, 12)].map((src, index) => (
            <Link 
              key={index} 
              href="#"
              className="marquee-item relative overflow-hidden group bg-gray-200 block"
              aria-label={`Instagram post ${index + 1}`}
            >
              <img
                src={src}
                alt={`Instagram Post ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
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
