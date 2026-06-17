"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiFacebook, FiInstagram, FiYoutube, FiLinkedin } from "react-icons/fi";
import { TbShieldCheck, TbRefresh, TbTruck } from "react-icons/tb";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    alert("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  return (
    <footer className="bg-[#07512E] text-white select-none h-auto">
      {/* 1. Newsletter Segment */}
      <div className="relative overflow-hidden border-b border-white/5">
        {/* Left Side decorative triangle overlay */}
        <div className="absolute left-0 bottom-0 w-[120px] h-[120px] bg-[#FFDE59] opacity-20 pointer-events-none [clip-path:polygon(0_0,0_100%,100%_100%)]" />
        {/* Right Side decorative triangle overlay */}
        <div className="absolute right-0 bottom-0 w-[120px] h-[120px] bg-[#FFDE59] opacity-20 pointer-events-none [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
        
        <div className="w-full max-w-[1192px] mx-auto px-4 lg:px-0 py-8 lg:py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 relative z-10">
        
        {/* Newsletter Text */}
        <div className="relative z-10 flex items-start gap-4 max-w-xl">
          {/* Vertical yellow accent line */}
          <div className="w-1 h-14 bg-[#FFDE59] shrink-0 mt-0.5" />
          <div>
            <h3 className="font-serif text-[#FFFFFF] text-[24px] sm:text-[28px] font-bold uppercase">
              SUBSCRIBE TO THE NEWSLETTER
            </h3>
            <p className="text-[15px] text-[#FFFFFF] font-normal leading-relaxed mt-2 max-w-lg">
              Subscribe to our newsletter and be the first to know about exclusive offers, new product releases, and exciting events at Typhoon Defense.
            </p>
          </div>
        </div>

        {/* Newsletter Input/Button */}
        <form 
          onSubmit={handleSubmit}
          className="relative z-10 flex w-full max-w-lg bg-white rounded-none overflow-hidden shadow-md"
        >
          <input 
            type="email" 
            placeholder="Enter your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow px-4 py-3.5 text-xs text-gray-800 focus:outline-none placeholder-gray-400 font-medium"
            required
          />
          <button 
            type="submit" 
            className="bg-[#FFDE59] hover:bg-[#e6c543] text-[#07512E] font-semibold text-xs tracking-widest px-8 py-3.5 uppercase transition-colors duration-200 cursor-pointer shrink-0"
          >
            Subscribe
          </button>
        </form>

        </div>
      </div>

      {/* 2. Middle Columns Section */}
      <div className="w-full max-w-[1192px] mx-auto px-4 lg:px-0 py-10 lg:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-0 text-sm">
        
        {/* Col 1: Logo, text, social links */}
        <div className="lg:col-span-3 flex flex-col gap-6 lg:pr-8 justify-start">
          <div className="flex flex-col items-start">
            {/* SVG Logo matching the branding */}
            <div className="flex flex-col items-center gap-1 w-max">
              <img 
                src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781607744/Untitled_design_6_2_uirv47.png" 
                alt="Vardaan Logo" 
                className="h-[120px] w-auto object-contain"
              />
            </div>
          </div>
          
          <p className="text-[18px] text-gray-300 font-light leading-relaxed">
            Discover timeless elegance with beautifully crafted jewellery designed to celebrate every moment. Our collections blend exquisite artistry, premium quality, and modern sophistication to create pieces you'll cherish forever.
          </p>

          {/* Circle Social Links */}
          <div className="flex items-center gap-3">
            {[
              { icon: FiFacebook, label: "Facebook" },
              { icon: FiInstagram, label: "Instagram" },
              { icon: FiYoutube, label: "Youtube" },
              { icon: FiLinkedin, label: "LinkedIn" }
            ].map((soc, i) => {
              const Icon = soc.icon;
              return (
                <a 
                  key={i} 
                  href="#" 
                  className="w-7 h-7 rounded-full border border-white flex items-center justify-center text-white hover:text-[#FFDE59] hover:border-[#FFDE59] transition-all duration-300 hover:bg-white/5"
                  aria-label={soc.label}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Separator Line 1 */}
        <div className="hidden lg:flex lg:col-span-1 justify-center">
          <div className="w-[1px] h-[75%] bg-white/10 self-center" />
        </div>

        {/* Col 2: Customer Service */}
        <div className="lg:col-span-2 flex flex-col gap-4 justify-start lg:pt-6">
          <h4 className="font-sans text-white text-[15px] font-semibold tracking-wide uppercase">
            Customer Service
          </h4>
          <ul className="flex flex-col gap-3 text-[16px] text-gray-300 font-normal">
            <li><Link href="/contact" className="hover:text-[#FFDE59] transition-colors">Contact Us</Link></li>
            <li><Link href="#shipping" className="hover:text-[#FFDE59] transition-colors">Shipping Policy</Link></li>
            <li><Link href="#returns" className="hover:text-[#FFDE59] transition-colors">Return & Refund Policy</Link></li>
            <li><Link href="#track" className="hover:text-[#FFDE59] transition-colors">Track Order</Link></li>
          </ul>
        </div>

        {/* Separator Line 2 */}
        <div className="hidden lg:flex lg:col-span-1 justify-center">
          <div className="w-[1px] h-[75%] bg-white/10 self-center" />
        </div>

        {/* Col 3: About Us (with watermark) */}
        <div className="lg:col-span-2 flex flex-col gap-4 relative justify-start lg:pt-6">
          {/* Logo watermark overlay behind links */}
          <div className="absolute -left-4 top-2 md:left-6 md:top-[52px] pointer-events-none select-none z-0">
            <img 
              src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781608371/Untitled_design_6_3_1_l9tztp.png" 
              alt="Watermark Logo" 
              className="w-[180px] md:w-[231px] h-auto object-contain object-top"
            />
          </div>
          
          <h4 className="font-sans text-white text-[22px] font-medium tracking-wide uppercase relative z-10">
            About Us
          </h4>
          <ul className="flex flex-col gap-3 text-[18px] text-gray-300 font-normal relative z-10">
            <li><Link href="/about" className="hover:text-[#FFDE59] transition-colors">Our Story</Link></li>
            <li><Link href="#blogs" className="hover:text-[#FFDE59] transition-colors">Blogs</Link></li>
            <li><Link href="#careers" className="hover:text-[#FFDE59] transition-colors">Careers</Link></li>
          </ul>
        </div>

        {/* Separator Line 3 */}
        <div className="hidden lg:flex lg:col-span-1 justify-center">
          <div className="w-[1px] h-[75%] bg-white/10 self-center" />
        </div>

        {/* Col 4: Information */}
        <div className="lg:col-span-2 flex flex-col gap-4 justify-start lg:pt-6">
          <h4 className="font-sans text-white text-[22px] font-medium tracking-wide ">
            Information
          </h4>
          <ul className="flex flex-col gap-3 text-[18px] text-gray-300 font-normal">
            <li><Link href="#privacy" className="hover:text-[#FFDE59] transition-colors">Privacy Policy</Link></li>
            <li><Link href="#terms" className="hover:text-[#FFDE59] transition-colors">Terms & Conditions</Link></li>
            <li><Link href="#cancellation" className="hover:text-[#FFDE59] transition-colors">Cancellation Policy</Link></li>
          </ul>
        </div>

      </div>

      {/* 3. Lower Trust Badges Segment */}
      <div className="pb-8 pt-2 lg:pb-10 lg:pt-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-x-12 gap-y-4 px-4 text-xs font-medium tracking-widest text-white">
          <div className="flex items-center gap-2.5">
            <TbShieldCheck className="w-[22px] h-[22px] text-white stroke-[1.5]" />
            <span className="uppercase font-sans">SECURE CHECKOUT</span>
          </div>
          <div className="flex items-center gap-2.5">
            <TbRefresh className="w-[22px] h-[22px] text-white stroke-[1.5]" />
            <span className="uppercase font-sans">EASY RETURNS</span>
          </div>
          <div className="flex items-center gap-2.5">
            <TbTruck className="w-[22px] h-[22px] text-white stroke-[1.5]" />
            <span className="uppercase font-sans">FAST SHIPPING</span>
          </div>
        </div>
      </div>

      {/* 4. Yellow Footer Bottom Bar */}
      <div className="bg-[#FFDE59] text-[#07512E] py-4 border-t border-[#ffd738]">
        <div className="w-full max-w-[1192px] mx-auto px-4 lg:px-0 flex flex-col md:flex-row items-center md:justify-between gap-5 md:gap-3 text-[13px] font-semibold">
          <div className="text-center md:text-left flex flex-col md:flex-row md:items-center">
            <span className="flex items-center justify-center md:justify-start gap-1">
              <span className="text-[16px] leading-none">©</span> Copyright 2026 Vardaan
            </span>
            <span className="md:ml-1 mt-0.5 md:mt-0">All Rights Reserved.</span>
          </div>
          <div className="text-center md:text-right flex flex-col md:flex-row md:items-center">
            <span>Designed and developed by</span>
            <a 
              href="https://kusheldigi.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:opacity-70 transition-opacity underline underline-offset-2 md:ml-1 mt-0.5 md:mt-0"
            >
              kusheldigi.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

