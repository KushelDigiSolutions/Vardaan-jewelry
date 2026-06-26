"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiInstagram, FiYoutube, FiRefreshCw } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineShieldCheck, HiOutlineTruck } from "react-icons/hi";

export default function Footer() {
  const [email, setEmail] = useState("");
  const pathname = usePathname();

  const scrollShopToTop = () => {
    if (pathname === "/shop") {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    alert("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  return (
    <footer className="bg-[#07512E] text-white select-none h-auto">
      {/* 1. Newsletter Segment */}
      <div className="relative overflow-hidden border-b border-white/5 min-h-[220px] py-10 lg:py-0  lg:px-10 flex items-center">
        {/* Left Side decorative triangle overlay */}
        <div className="absolute left-0 bottom-0 w-[120px] h-[120px] bg-[#FFDE59] opacity-20 pointer-events-none [clip-path:polygon(0_0,0_100%,100%_100%)]" />
        {/* Right Side decorative triangle overlay */}
        <div className="absolute right-0 bottom-0 w-[120px] h-[120px] bg-[#FFDE59] opacity-20 pointer-events-none [clip-path:polygon(100%_0,100%_100%,0_100%)]" />

        <div className="w-full max-w-[1192px] mx-auto px-4 lg:px-0 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 relative z-10">

          {/* Newsletter Text */}
          <div className="relative z-10 flex items-start gap-4 w-full lg:max-w-[596px] h-auto">
            {/* Vertical yellow accent line */}
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

          {/* Newsletter Input/Button */}
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
      </div>

      {/* Bottom Footer Sections Wrapper */}
      <div className="flex flex-col bg-[#07512E]">
        {/* 2. Middle Columns Section */}
        <div className="w-full max-w-[1192px] mx-auto px-4 lg:px-0 py-10 lg:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-0 text-sm">

          {/* Col 1: Logo, text, social links */}
          <div className="lg:col-span-3 flex flex-col gap-6 justify-start ">
            <div className="w-full lg:max-w-[334px] h-auto  flex flex-col justify-between gap-6 lg:ps-6 xl:ps-0 ">
              <div className="flex flex-col items-start">
                {/* SVG Logo matching the branding */}
                <div className="flex flex-col items-center gap-1 w-max">
                  <img
                    src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781789797/vardan_logo_2_br1lkx.png"
                    alt="Vardaan Logo"
                    className="h-[90px] w-auto object-contain"
                  />
                </div>
              </div>

              <p className="text-[15px] text-[#E2E8F0] font-normal leading-[1.6]">
                Discover timeless elegance with beautifully crafted jewellery designed to celebrate every moment. Our collections blend exquisite artistry, premium quality, and modern sophistication to create pieces you&apos;ll cherish forever.
              </p>
            </div>

            {/* Circle Social Links */}
            <div className="flex items-center gap-4 mt-2 lg:ps-6 xl:ps-0">
              {[
                { icon: FaFacebookF, label: "Facebook" },
                { icon: FiInstagram, label: "Instagram" },
                { icon: FiYoutube, label: "Youtube" },
                { icon: FaLinkedinIn, label: "LinkedIn" }
              ].map((soc, i) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={i}
                    href="#"
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
            <div className="w-[1px] h-[100%] bg-white/10 self-center" />
          </div>

          {/* Col 2: Customer Service */}
          <div className="lg:col-span-2 flex justify-start lg:pt-6">
            <div className="w-full lg:max-w-[198px] h-auto flex flex-col gap-6">
              <h4 className="font-sans text-[#FFFFFF] text-[18px] font-medium tracking-wide ">
                Customer Service
              </h4>
              <ul className="flex flex-col gap-5 text-[16px] text-[#FFFFFF] font-normal">
                <li><Link href="/contact" className="hover:text-[#FFDE59] transition-colors">Contact Us</Link></li>
                <li><Link href="/shipping-policy" className="hover:text-[#FFDE59] transition-colors">Shipping Policy</Link></li>
                <li><Link href="/return-refund-policy" className="hover:text-[#FFDE59] transition-colors">Return & Refund Policy</Link></li>
                {/* <li><Link href="#track" className="hover:text-[#FFDE59] transition-colors">Track Order</Link></li> */}
              </ul>
            </div>
          </div>

          {/* Separator Line 2 */}
          <div className="hidden lg:flex lg:col-span-1 justify-center">
            <div className="w-[1px] h-[100%] bg-white/10 self-center" />
          </div>

          {/* Col 3: About Us (with watermark) */}
          <div className="lg:col-span-2 flex relative justify-start lg:pt-6">
            {/* Logo watermark overlay behind links */}
            <div className="absolute -left-4 top-2 md:left-6 md:top-[52px] pointer-events-none select-none z-0">
              <img
                src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781608371/Untitled_design_6_3_1_l9tztp.png"
                alt="Watermark Logo"
                className="w-[231px] h-[213px] object-contain object-top"
              />
            </div>

            <div className="w-full lg:max-w-[198px] h-auto flex flex-col gap-6 relative z-10">
              <h4 className="font-sans text-[#FFFFFF] text-[18px] font-medium tracking-wide ">
                Categories
              </h4>
              <ul className="flex flex-col gap-5 text-[16px] text-[#FFFFFF] font-normal">
                <li><Link href="/shop?category=latest" onClick={scrollShopToTop} className="hover:text-[#FFDE59] transition-colors">Ring</Link></li>
                <li><Link href="/shop?category=latest" onClick={scrollShopToTop} className="hover:text-[#FFDE59] transition-colors">Bridal</Link></li>
                <li><Link href="/shop?category=latest" onClick={scrollShopToTop} className="hover:text-[#FFDE59] transition-colors">Sets</Link></li>
                <li><Link href="/shop?category=latest" onClick={scrollShopToTop} className="hover:text-[#FFDE59] transition-colors">Necklaces</Link></li>
              </ul>
            </div>
          </div>

          {/* Separator Line 3 */}
          <div className="hidden lg:flex lg:col-span-1 justify-center">
            <div className="w-[1px] h-[100%] bg-white/10 self-center" />
          </div>

          {/* Col 4: Information */}
          <div className="lg:col-span-2 flex justify-start lg:pt-6">
            <div className="w-full lg:max-w-[198px] h-auto flex flex-col gap-6">
              <h4 className="font-sans text-[#FFFFFF] text-[18px] font-medium tracking-wide">
                Information
              </h4>
              <ul className="flex flex-col gap-5 text-[16px] text-[#FFFFFF] font-normal">
                <li><Link href="/privacy-policy" className="hover:text-[#FFDE59] transition-colors"  onClick={scrollShopToTop} >Privacy Policy</Link></li>
                <li><Link href="/terms-and-conditions" className="hover:text-[#FFDE59] transition-colors"  onClick={scrollShopToTop} >Terms & Conditions</Link></li>
                <li><Link href="/cancellation-policy" className="hover:text-[#FFDE59] transition-colors"  onClick={scrollShopToTop} >Cancellation Policy</Link></li>
              </ul>
              
              {/* Mobile-only Trust Badges (below Cancellation Policy) */}
              <div className="flex md:hidden flex-col gap-5 text-[14px] font-medium tracking-widest text-white mt-4">
                <div className="flex items-center gap-2.5">
                  <HiOutlineShieldCheck className="w-[24px] h-[24px] text-white stroke-[1.5]" />
                  <span className="uppercase font-sans mt-0.5">SECURE CHECKOUT</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FiRefreshCw className="w-[24px] h-[24px] text-white stroke-[1.5]" />
                  <span className="uppercase font-sans mt-0.5">EASY RETURNS</span>
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
              <span className="uppercase font-sans mt-0.5">EASY RETURNS</span>
            </div>
            <div className="flex items-center gap-2.5">
              <HiOutlineTruck className="w-[24px] h-[24px] text-white stroke-[1.5]" />
              <span className="uppercase font-sans mt-0.5">FAST SHIPPING</span>
            </div>
          </div>
        </div>

        {/* 4. Yellow Footer Bottom Bar */}
        <div className="bg-[#FFDE59] text-[#07512E] py-4 border-t border-[#ffd738]">
          <div className="w-full max-w-[1192px] mx-auto px-4 lg:px-0 flex flex-col md:flex-row items-center md:justify-between gap-5 md:gap-3 text-[13px] font-semibold">
            <div className="text-center md:text-left flex flex-col md:flex-row md:items-center">
              <span className="flex items-center justify-center md:justify-start gap-1 text-[16px] font-normal">
                <span className="text-[24px]  leading-none">©</span> Copyright 2026 Vardaan
              </span>
              <span className="md:ml-1 mt-0.5 md:mt-0 text-[16px] font-normal">All Rights Reserved.</span>
            </div>
            <div className="text-center md:text-right flex flex-col md:flex-row md:items-center">
              <span className="text-[16px] font-normal">Designed and developed by</span>
              <a
                href="https://kusheldigi.com"
                target="_blank"
                rel="noopener noreferrer"
                className=" md:ml-1 mt-0.5 md:mt-0 text-[16px] font-semibold"
              >
                kusheldigi.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
