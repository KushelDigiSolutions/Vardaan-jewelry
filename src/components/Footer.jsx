"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiFacebook, FiInstagram, FiYoutube, FiLinkedin, FiShield, FiRefreshCw, FiTruck } from "react-icons/fi";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    alert("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  return (
    <footer className="bg-[#053D22] text-white select-none">
      {/* 1. Newsletter Segment */}
      <div className="relative bg-[#07512E] py-12 px-6 md:px-12 lg:px-20 overflow-hidden flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 border-b border-white/5">
        
        {/* Left Side decorative triangle overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-[#04361E] [clip-path:polygon(0_0,0_100%,100%_100%)] pointer-events-none opacity-50" />
        
        {/* Newsletter Text */}
        <div className="relative z-10 flex items-start gap-4 max-w-xl">
          {/* Vertical yellow accent line */}
          <div className="w-1 h-14 bg-[#FFDE59] shrink-0 mt-0.5" />
          <div>
            <h3 className="font-serif text-white text-xl md:text-2xl font-bold tracking-wider uppercase">
              Subscribe to the Newsletter
            </h3>
            <p className="text-xs text-gray-300 font-light leading-relaxed mt-2 max-w-lg">
              Subscribe to our newsletter and be the first to know about exclusive offers, new product releases, and exciting events at Vardaan.
            </p>
          </div>
        </div>

        {/* Newsletter Input/Button */}
        <form 
          onSubmit={handleSubmit}
          className="relative z-10 flex w-full max-w-lg bg-white rounded overflow-hidden shadow-md"
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

        {/* Right Side decorative triangle overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-[#04361E] [clip-path:polygon(100%_0,100%_100%,0_0)] pointer-events-none opacity-50" />
      </div>

      {/* 2. Middle Columns Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-0 text-sm">
        
        {/* Col 1: Logo, text, social links */}
        <div className="lg:col-span-4 flex flex-col gap-6 lg:pr-12 justify-center">
          <div className="flex flex-col items-start">
            {/* SVG Logo matching the branding */}
            <div className="flex items-center gap-2">
              <svg 
                className="w-9 h-9 text-[#FFDE59]"
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15 15C25 15 35 25 42 45L50 68L58 45C65 25 75 15 85 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                <path d="M50 72L42 48L32 20H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M50 72L58 48L68 20H82" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="50" cy="74" r="2.5" fill="currentColor" />
                <path d="M42 22C42 22 46 16 50 22C54 16 58 22 58 22" stroke="currentColor" strokeWidth="1" />
                <path d="M35 35C40 32 46 36 46 36" stroke="currentColor" strokeWidth="1" />
                <path d="M65 35C60 32 54 36 54 36" stroke="currentColor" strokeWidth="1" />
                <path d="M50 30V48" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
              </svg>
              <div className="flex flex-col">
                <span className="text-base font-serif tracking-[0.25em] text-[#FFDE59] uppercase leading-tight font-medium">Vardaan</span>
                <span className="text-[6.5px] tracking-[0.22em] font-serif text-[#FFDE59]/80 uppercase leading-none mt-0.5">More than a jewel, a blessing</span>
              </div>
            </div>
          </div>
          
          <p className="text-[12px] text-gray-300 font-light leading-relaxed">
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
                  className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-[#FFDE59] hover:border-[#FFDE59] transition-all duration-300 hover:bg-white/5"
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
          <div className="w-[0.5px] h-[85%] bg-white/10 self-center" />
        </div>

        {/* Col 2: Customer Service */}
        <div className="lg:col-span-2 flex flex-col gap-4 justify-center">
          <h4 className="font-sans text-white text-[15px] font-semibold tracking-wide uppercase">
            Customer Service
          </h4>
          <ul className="flex flex-col gap-3 text-xs text-gray-300 font-light">
            <li><Link href="/contact" className="hover:text-[#FFDE59] transition-colors">Contact Us</Link></li>
            <li><Link href="#shipping" className="hover:text-[#FFDE59] transition-colors">Shipping Policy</Link></li>
            <li><Link href="#returns" className="hover:text-[#FFDE59] transition-colors">Return & Refund Policy</Link></li>
            <li><Link href="#track" className="hover:text-[#FFDE59] transition-colors">Track Order</Link></li>
          </ul>
        </div>

        {/* Separator Line 2 */}
        <div className="hidden lg:flex lg:col-span-1 justify-center">
          <div className="w-[0.5px] h-[85%] bg-white/10 self-center" />
        </div>

        {/* Col 3: About Us (with watermark) */}
        <div className="lg:col-span-2 flex flex-col gap-4 relative overflow-hidden justify-center py-2">
          {/* Gold serif V watermark logo overlay behind links */}
          <div className="absolute right-2 bottom-0 text-[#FFDE59]/5 pointer-events-none font-serif text-[130px] leading-none select-none font-bold">
            V
          </div>
          
          <h4 className="font-sans text-white text-[15px] font-semibold tracking-wide uppercase relative z-10">
            About Us
          </h4>
          <ul className="flex flex-col gap-3 text-xs text-gray-300 font-light relative z-10">
            <li><Link href="/about" className="hover:text-[#FFDE59] transition-colors">Our Story</Link></li>
            <li><Link href="#blogs" className="hover:text-[#FFDE59] transition-colors">Blogs</Link></li>
            <li><Link href="#careers" className="hover:text-[#FFDE59] transition-colors">Careers</Link></li>
          </ul>
        </div>

        {/* Separator Line 3 */}
        <div className="hidden lg:flex lg:col-span-1 justify-center">
          <div className="w-[0.5px] h-[85%] bg-white/10 self-center" />
        </div>

        {/* Col 4: Information */}
        <div className="lg:col-span-2 flex flex-col gap-4 justify-center">
          <h4 className="font-sans text-white text-[15px] font-semibold tracking-wide uppercase">
            Information
          </h4>
          <ul className="flex flex-col gap-3 text-xs text-gray-300 font-light">
            <li><Link href="#privacy" className="hover:text-[#FFDE59] transition-colors">Privacy Policy</Link></li>
            <li><Link href="#terms" className="hover:text-[#FFDE59] transition-colors">Terms & Conditions</Link></li>
            <li><Link href="#cancellation" className="hover:text-[#FFDE59] transition-colors">Cancellation Policy</Link></li>
          </ul>
        </div>

      </div>

      {/* 3. Lower Trust Badges Segment */}
      <div className="border-t border-white/10 py-6 bg-[#04361E]">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-x-12 gap-y-4 px-4 text-xs font-semibold tracking-widest text-gray-200">
          <div className="flex items-center gap-2.5">
            <FiShield className="w-5 h-5 text-[#FFDE59] stroke-[2]" />
            <span className="uppercase font-sans">Secure Checkout</span>
          </div>
          <div className="flex items-center gap-2.5">
            <FiRefreshCw className="w-5 h-5 text-[#FFDE59] stroke-[2]" />
            <span className="uppercase font-sans">Easy Returns</span>
          </div>
          <div className="flex items-center gap-2.5">
            <FiTruck className="w-5 h-5 text-[#FFDE59] stroke-[2]" />
            <span className="uppercase font-sans">Fast Shipping</span>
          </div>
        </div>
      </div>

      {/* 4. Yellow Footer Bottom Bar */}
      <div className="bg-[#FFDE59] text-[#07512E] py-4 text-center text-xs font-semibold border-t border-[#ffd738]">
        <p>© Copyright 2026 Vardaan All Rights Reserved.</p>
      </div>
    </footer>
  );
}

