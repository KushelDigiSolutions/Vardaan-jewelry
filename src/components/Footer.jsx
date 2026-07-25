"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiInstagram, FiYoutube, FiRefreshCw } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineShieldCheck, HiOutlineTruck } from "react-icons/hi";
import { BsGoogle } from "react-icons/bs";

export default function Footer() {
  const [email, setEmail] = useState("");
  const pathname = usePathname();

const scrollShopToTop = () => {
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 100);
};


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    alert("Thank you for subscribing to our newsletter!");
    setEmail("");
  };
const GoogleGIcon = () => (
  <svg
    className="w-6 h-6 inline-block shrink-0"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    aria-hidden="true"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.62-.62-1.07-1.37-1.37-2.18L5.84 14.09z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);
  return (
    <footer className="bg-[#07512E] text-white select-none h-auto">
      {/* 1. Newsletter Segment */}
      {/* <div className="relative overflow-hidden border-b border-white/5 min-h-[220px] py-10 lg:py-0  lg:px-10 flex items-center">
      
        <div className="absolute left-0 bottom-0 w-[120px] h-[120px] bg-[#FFDE59] opacity-20 pointer-events-none [clip-path:polygon(0_0,0_100%,100%_100%)]" />
        
        <div className="absolute right-0 bottom-0 w-[120px] h-[120px] bg-[#FFDE59] opacity-20 pointer-events-none [clip-path:polygon(100%_0,100%_100%,0_100%)]" />

        <div className="w-full max-w-[1192px] mx-auto px-4 lg:px-12 xl:px-0 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 relative z-10">

        
          <div className="relative z-10 flex items-start gap-4 w-full lg:max-w-[596px] h-auto">
            
            <div className="w-[3px] h-[60px] bg-[#FFDE59] shrink-0 mt-1" />
            <div className="flex flex-col h-full justify-start pt-0.5">
              <h3 className="font-serif text-[#FFFFFF] text-[28px] font-bold uppercase leading-[1.2]">
                SUBSCRIBE TO THE NEWSLETTER
              </h3>
              <p className="text-[16px] text-[#FFFFFF] font-normal leading-[1.6] mt-2">
                Subscribe to our newsletter and be the first to know about exclusive offers, new product releases, and exciting events at Typhoon Defense.
              </p>
            </div>
          </div>

     
          <form
            onSubmit={handleSubmit}
            className="relative z-10 flex w-full flex flex-col sm:flex-row  lg:max-w-[502px] min-h-[50px]  gap-4 md: gap-0 md:bg-white rounded-none overflow-hidden shrink-0"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 h-[50px] sm:h-auto w-full sm:w-auto bg-white text-[16px] text-gray-800 focus:outline-none placeholder-gray-400 font-medium"
              required
            />
            <button
              type="submit"
              className="bg-[#FFDE59] hover:bg-[#e6c543] text-[#07512E] sm: font-semibold text-[14px] md:text-[16px]  tracking-widest px-2 md:px-8 h-[50px] sm:h-auto w-full sm:w-auto flex items-center justify-center uppercase transition-colors duration-200 cursor-pointer shrink-0"
            >
              Subscribe
            </button>
          </form>

        </div>
      </div> */}

      {/* Bottom Footer Sections Wrapper */}
      <div className="flex flex-col bg-[#07512E]">
        {/* 2. Middle Columns Section */}
        <div className="w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-12 md:gap-8 lg:gap-0 text-sm">

          {/* Col 1: Logo, text, social links */}
          <div className="md:col-span-3 lg:col-span-3 flex flex-col gap-6 justify-start w-full md:mb-6 lg:mb-0">
            <div className="w-full flex flex-col gap-6">
              <div className="flex flex-col items-start">
                {/* SVG Logo matching the branding */}
                <div className="flex flex-col items-center gap-1 w-max">
                  <img
                    src="https://res.cloudinary.com/dxlykgx6w/image/upload/v1783322584/Vardaan_jewel_logo-removebg-preview_q2mgqj.png"
                    alt="Vardaan Logo"
                    className="h-[80px] md:h-[90px] w-auto object-contain"
                  />
                </div>
              </div>

              <p className="text-[15px] text-[#E2E8F0] font-normal leading-[1.6] max-w-2xl lg:max-w-none">
                Discover timeless elegance with beautifully crafted jewellery designed to celebrate every moment. Our collections blend exquisite artistry, premium quality, and modern sophistication to create pieces you&apos;ll cherish forever.
              </p>
            </div>

            {/* Circle Social Links */}
            <div className="flex items-center gap-4 mt-2 w-full justify-start">
              {[
                // { icon: FaFacebookF, label: "Facebook",link:"https://www.facebook.com/share/v/fN9M85G1cT639m1n/" },
                { icon: FiInstagram, label: "Instagram",link:"https://www.instagram.com/vardaan.pureblessing?igsh=MXRzNmJzNWlicjByNQ==" },
                { icon: FiYoutube, label: "Youtube",link:"https://youtube.com/@vardaanjewels?si=bd-SoaWgD21qJXHP" },
                { icon: GoogleGIcon, label: "google review",link:"https://g.page/r/CREzg2FefF56EBM/review" },
                // { icon: FaLinkedinIn, label: "LinkedIn",link:"https://www.linkedin.com/company/vardaanpureblessing/" }
              ].map((soc, i) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={i}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={soc.link}
                    className="w-[36px] h-[36px] rounded-full border-[1.5px] border-white flex items-center justify-center text-white hover:text-[#FFDE59] hover:border-[#FFDE59] transition-all duration-300 hover:bg-white/5"
                    aria-label={soc.label}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Separator Line 1 */}
          <div className="hidden lg:flex lg:col-span-1 justify-center">
            <div className="w-[1px] h-full bg-white/10 self-center" />
          </div>

          {/* Col 2: Customer Service */}
          <div className="md:col-span-1 lg:col-span-2 flex justify-start lg:pt-6 w-full">
            <div className="w-full flex flex-col gap-6">
              <h4 className="font-sans text-[#FFFFFF] text-[18px] font-medium tracking-wide">
                Customer Service
              </h4>
              <ul className="flex flex-col gap-5 text-[16px] text-[#FFFFFF] font-normal">
                <li><Link href="/contact" onClick={scrollShopToTop} className="hover:text-[#FFDE59] transition-colors">Contact Us</Link></li>
                <li><Link href="/shipping-policy" onClick={scrollShopToTop} className="hover:text-[#FFDE59] transition-colors">Shipping Policy</Link></li>
                <li><Link href="/return-refund-policy" onClick={scrollShopToTop} className="hover:text-[#FFDE59] transition-colors">Return & Refund Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Separator Line 2 */}
          <div className="hidden lg:flex lg:col-span-1 justify-center">
            <div className="w-[1px] h-full bg-white/10 self-center" />
          </div>

          {/* Col 3: About Us (with watermark) */}
          <div className="md:col-span-1 lg:col-span-2 flex relative justify-start lg:pt-6 w-full">
            {/* Logo watermark overlay behind links */}
            <div className="absolute -left-4 top-2 md:left-6 md:top-[52px] pointer-events-none select-none z-0">
              <img
                src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781608371/Untitled_design_6_3_1_l9tztp.png"
                alt="Watermark Logo"
                className="w-[231px] h-[213px] object-contain object-top"
              />
            </div>

            <div className="w-full flex flex-col gap-6 relative z-10">
              <h4 className="font-sans text-[#FFFFFF] text-[18px] font-medium tracking-wide">
                Categories
              </h4>
              <ul className="flex flex-col gap-5 text-[16px] text-[#FFFFFF] font-normal">
                <li><Link href="/shop?category=necklace" onClick={scrollShopToTop} className="hover:text-[#FFDE59] transition-colors">Necklace</Link></li>
                <li><Link href="/shop?category=jhumka" onClick={scrollShopToTop} className="hover:text-[#FFDE59] transition-colors">Jhumka</Link></li>
                <li><Link href="/shop?category=watches" onClick={scrollShopToTop} className="hover:text-[#FFDE59] transition-colors">Watches</Link></li>
                <li><Link href="/shop?category=bracelet" onClick={scrollShopToTop} className="hover:text-[#FFDE59] transition-colors">Bracelets</Link></li>
              </ul>
            </div>
          </div>

          {/* Separator Line 3 */}
          <div className="hidden lg:flex lg:col-span-1 justify-center">
            <div className="w-[1px] h-full bg-white/10 self-center" />
          </div>

          {/* Col 4: Information */}
          <div className="md:col-span-1 lg:col-span-2 flex justify-start lg:pt-6 w-full">
            <div className="w-full flex flex-col gap-6">
              <h4 className="font-sans text-[#FFFFFF] text-[18px] font-medium tracking-wide">
                Information
              </h4>
              <ul className="flex flex-col gap-5 text-[16px] text-[#FFFFFF] font-normal">
                <li><Link href="/privacy-policy" className="hover:text-[#FFDE59] transition-colors" onClick={scrollShopToTop}>Privacy Policy</Link></li>
                <li><Link href="/terms-and-conditions" className="hover:text-[#FFDE59] transition-colors" onClick={scrollShopToTop}>Terms & Conditions</Link></li>
                <li><Link href="/cancellation-policy" className="hover:text-[#FFDE59] transition-colors" onClick={scrollShopToTop}>Cancellation Policy</Link></li>
              </ul>

              {/* Mobile-only Trust Badges (below Cancellation Policy) */}
              <div className="flex md:hidden flex-col gap-5 text-[14px] font-medium tracking-widest text-white mt-4">
                <div className="flex items-center gap-2.5">
                  <HiOutlineShieldCheck className="w-[24px] h-[24px] text-white stroke-[1.5]" />
                  <span className="uppercase font-sans mt-0.5">SECURE CHECKOUT</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FiRefreshCw className="w-[24px] h-[24px] text-white stroke-[1.5]" />
                  <span className="uppercase font-sans mt-0.5">EASY REPLACEMENT / RETURNS</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <HiOutlineTruck className="w-[24px] h-[24px] text-white stroke-[1.5]" />
                  <span className="uppercase font-sans mt-0.5">FAST SHIPPING</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Lower Trust Badges Segment (Hidden on mobile) */}
        <div className="hidden md:flex pb-8 lg:pb-10 justify-center w-full px-4">
          <div className="w-full max-w-[712px] h-auto flex flex-col md:flex-row justify-center md:justify-between items-center gap-6 md:gap-4 text-[14px] font-medium tracking-widest text-white">
            <div className="flex items-center gap-2.5">
              <HiOutlineShieldCheck className="w-[24px] h-[24px] text-white stroke-[1.5]" />
              <span className="uppercase font-sans mt-0.5">SECURE CHECKOUT</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FiRefreshCw className="w-[24px] h-[24px] text-white stroke-[1.5]" />
              <span className="uppercase font-sans mt-0.5">EASY REPLACEMENT / RETURN</span>
            </div>
            <div className="flex items-center gap-2.5">
              <HiOutlineTruck className="w-[24px] h-[24px] text-white stroke-[1.5]" />
              <span className="uppercase font-sans mt-0.5">FAST SHIPPING</span>
            </div>
          </div>
        </div>

        {/* 4. Yellow Footer Bottom Bar */}
        <div className="bg-[#FFDE59] text-[#07512E] py-4 border-t border-[#ffd738]">
          <div className="w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0 flex flex-col md:flex-row items-center md:justify-between gap-5 md:gap-3 text-[13px] font-semibold">
            <div className="text-center md:text-left flex flex-col md:flex-row md:items-center">
              <span className="flex items-center justify-center md:justify-start gap-1 text-[16px] font-normal">
                <span className="text-[24px]  leading-none">©</span> Copyright 2026 Vardaan
              </span>
              <span className="md:ml-1 mt-0.5 md:mt-0 text-[16px] font-normal">All Rights Reserved.</span>
            </div>
            <div className="text-center md:text-right flex flex-col md:flex-row md:items-center">
              <span className="text-[16px] font-normal">Designed and Developed by</span>
              <a
                href="https://kusheldigi.com"
                target="_blank"
                rel="noopener noreferrer"
                className=" md:ml-1 mt-0.5 md:mt-0 text-[16px] font-semibold"
              >
                Kushel Digi Solutions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
