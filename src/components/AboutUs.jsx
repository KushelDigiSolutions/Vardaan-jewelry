'use client'
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function AboutUs() {
    const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  return (
    <section className="py-10 md:py-16 lg:px-6  bg-[#FAF9F6]" id="about">
      <div className="w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0 grid grid-cols-1 xl:grid-cols-12 gap-16 items-center">
        
        {/* Story Text */}
        <div className="lg:col-span-6 flex flex-col items-start gap-4">
          <span className="text-[18px] tracking-widest font-semibold text-[#07512E] uppercase">
            Our Legacy
          </span>
          <h2 className="text-[32px] md:text-[48px] font-serif text-[#07512E] font-normal leading-tight tracking-wide uppercase">
            Crafted for Grace,
            Born of Blessings
          </h2>
          <div className="w-16 h-[2px] bg-[#FFDE59] mt-1 mb-2" />
          
          <div className="space-y-4">
            {/* <p className="text-[18px] text-gray-600 font-light leading-relaxed tracking-wide">
              <span className="font-semibold text-[#07512E]">Established in 2025</span>, Vardaan Jewels was founded with a vision to create jewellery that combines timeless elegance with everyday comfort.
            </p> */}

            <p className="text-[18px] text-gray-600 font-light leading-relaxed tracking-wide">
              We specialize in <span className="font-semibold text-[#07512E]">Premium Anti-Tarnish Jewellery</span> designed for modern lifestyles—pieces that are stylish, durable, and perfect for daily wear, work, travel, and special occasions.
            </p>

            <p className="text-[18px] text-gray-600 font-light leading-relaxed tracking-wide">
              For those who cherish tradition, our <span className="font-semibold text-[#07512E]">Ethnic Heritage Collection</span> showcases beautifully crafted designs inspired by India&apos;s rich cultural heritage, making every celebration even more memorable.
            </p>

            <p className="text-[18px] text-gray-600 font-light leading-relaxed tracking-wide">
              Looking for the perfect gift? <span className="font-semibold text-[#07512E]">Vardaan Gifting</span> offers thoughtfully curated jewellery for birthdays, anniversaries, weddings, festivals, corporate gifting, and every meaningful moment.
            </p>

            <p className="text-[18px] text-gray-600 font-light leading-relaxed tracking-wide">
              At Vardaan, every creation is thoughtfully curated with premium craftsmanship, elegant designs, and exceptional quality.
            </p>

            <p className="text-[18px] italic text-[#07512E] font-medium leading-relaxed tracking-wide">
              Because every piece is more than a jewel—it&apos;s a blessing.
            </p>
          </div>

          

          <div ref={ref} className="flex flex-col gap-4 sm:gap-8 mt-6">
            <div >
              {/* <span className="block font-serif text-3xl text-[#07512E]"> {inView && <CountUp end={20} duration={2} useEasing={false} />}+</span> */}
              <span className="text-[12px] md:text-[14px] text-black font-medium tracking-widest uppercase">✨Premium Craftsmanship Designed to Last</span>
            </div>
            <div className="">
              {/* <span className="block font-serif text-3xl text-[#07512E]">{inView && <CountUp end={100} duration={2} useEasing={false} />}% 
              </span> */}
              <span className="text-[12px] md:text-[14px] text-black font-medium tracking-widest uppercase">✨ 316 L Stainless Steel Anti-Tarnish Collection</span>
            </div>
            <div className="">
              {/* <span className="block font-serif text-3xl text-[#07512E]">{inView && <CountUp end={10} duration={2} useEasing={false} />}k+</span> */}
              <span className="text-[12px] md:text-[14px] text-black font-medium tracking-widest uppercase">✨ Thoughtfully Curated More Than a Jewel, A Blessing</span>
            </div>
          </div>
        </div>

        {/* Story Image */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          {/* Accent frame behind the image */}
          <div className="absolute inset-4 -translate-x-4 translate-y-4 border border-[#FFDE59] rounded-lg hidden sm:block pointer-events-none" />
          
          {/* Main luxury image */}
          <div className="relative w-full aspect-[4/3] sm:aspect-video lg:aspect-[4/4] rounded-lg overflow-hidden shadow-xl border border-gray-100 z-10">
            <img 
              src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=650&auto=format&fit=crop" 
              alt="Artisan crafting jewelry" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Elegant transparent overlay with brand stamp */}
            <div className="absolute bottom-4 right-4  text-[#FFDE59] text-[9px] tracking-[0.2em] font-serif uppercase px-4 py-2 rounded backdrop-blur-sm shadow-md">
                        <img src="https://res.cloudinary.com/dxlykgx6w/image/upload/v1783322584/Vardaan_jewel_logo-removebg-preview_q2mgqj.png" alt="" className="w-20 color-transparent" />

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
