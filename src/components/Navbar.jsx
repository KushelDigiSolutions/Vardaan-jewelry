"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiPhone, FiSearch, FiHeart, FiShoppingBag, FiMenu, FiX, FiUser } from "react-icons/fi";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { label: "Shop", href: "#" },
    { label: "Jewellery", href: "#" },
    { label: "Collections", href: "#", active: true },
    { label: "Shop By Material", href: "#" },
    { label: "Shop By Occasion", href: "#" },
  ];

  return (
    <header className="w-full z-50">
      {/* Yellow Top Bar */}
      <div className="bg-[#FFDE59] text-[#07512E] py-2.5 px-4 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-3 text-xs md:text-sm font-semibold border-b border-[#ffd738]">
        {/* Phone Call Section */}
        <a 
          href="tel:+919818719997" 
          className="flex items-center gap-2 hover:opacity-80 transition-opacity font-medium"
        >
          <FiPhone className="w-4 h-4 stroke-[2.5]" />
          <span>+91 98187 19997</span>
        </a>

        {/* Search Bar */}
        <form 
          onSubmit={(e) => { e.preventDefault(); console.log("Searching for:", searchQuery); }}
          className="flex items-center w-full max-w-sm md:max-w-md bg-white rounded shadow-sm border border-gray-200 overflow-hidden"
        >
          <input
            type="text"
            placeholder="Search for keywords, Products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow px-3.5 py-1.5 text-xs text-gray-800 focus:outline-none placeholder-gray-400"
          />
          <button 
            type="submit" 
            className="bg-[#07512E] hover:bg-[#04361E] text-white p-2.5 transition-colors duration-200 flex items-center justify-center cursor-pointer"
          >
            <FiSearch className="w-4 h-4" />
          </button>
        </form>

        {/* User Profile, Wishlist, Cart Links */}
        <div className="flex items-center gap-5 md:gap-6">
          {/* User Profile Avatar */}
          <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-85 transition-opacity">
            <div className="w-7 h-7 rounded-full bg-gray-300 border border-[#07512E]/20 overflow-hidden relative">
              {/* Profile placeholder image matching screenshot */}
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Wishlist */}
          <Link 
            href="#wishlist" 
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity font-medium"
          >
            <FiHeart className="w-4 h-4 text-[#07512E] fill-[#07512E]/10 stroke-[2]" />
            <span className="hidden sm:inline">Wishlist</span>
          </Link>

          {/* Cart */}
          <Link 
            href="#cart" 
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity font-medium"
          >
            <FiShoppingBag className="w-4 h-4 text-[#07512E] stroke-[2]" />
            <span className="hidden sm:inline">Cart</span>
          </Link>
        </div>
      </div>

      {/* Main Luxury Green Navbar */}
      <div className="relative bg-[#07512E] text-white px-4 md:px-8 py-6 md:py-8 flex flex-col items-center overflow-hidden border-b border-[#053d22]">
        
        {/* Background Subtle Floral Pattern Overlay (from Cloudinary link provided by user) */}
        <div 
          className="absolute left-0 top-0 h-full w-[350px] md:w-[450px] bg-no-repeat bg-left-top bg-contain pointer-events-none mix-blend-screen opacity-15"
          style={{ backgroundImage: `url('https://res.cloudinary.com/dd9tagtiw/image/upload/v1781515128/a29bc3df60dd42fbfd5b10b5b93b4efd38995dd5_clck27.png')` }}
        />

        {/* Brand Logo & Tagline Container */}
        <div className="flex flex-col items-center text-center relative z-10 max-w-xs md:max-w-md mb-6 animate-fade-in">
          {/* Logo SVG (Recreating the luxury V emblem from the screenshot) */}
          <div className="flex justify-center mb-1">
            <svg 
              className="w-12 h-12 text-[#FFDE59] drop-shadow-md"
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Detailed luxury V scrollwork monogram */}
              <path 
                d="M15 15C25 15 35 25 42 45L50 68L58 45C65 25 75 15 85 15" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round"
              />
              <path 
                d="M50 72L42 48L32 20H18" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round"
              />
              <path 
                d="M50 72L58 48L68 20H82" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round"
              />
              {/* Decorative internal flourishes */}
              <circle cx="50" cy="74" r="2.5" fill="currentColor" />
              <path d="M42 22C42 22 46 16 50 22C54 16 58 22 58 22" stroke="currentColor" strokeWidth="1" />
              <path d="M35 35C40 32 46 36 46 36" stroke="currentColor" strokeWidth="1" />
              <path d="M65 35C60 32 54 36 54 36" stroke="currentColor" strokeWidth="1" />
              <path d="M50 30V48" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
            </svg>
          </div>
          
          {/* Brand Name */}
          <h1 className="text-2xl md:text-3.5xl font-serif tracking-[0.25em] text-[#FFDE59] uppercase font-light">
            Vardaan
          </h1>
          
          {/* Tagline */}
          <div className="flex items-center gap-3 w-full mt-1.5">
            <div className="h-[0.5px] flex-grow bg-gradient-to-r from-transparent to-[#FFDE59]/50" />
            <p className="text-[9px] md:text-[10px] tracking-[0.3em] font-serif text-[#FFDE59] font-medium whitespace-nowrap uppercase">
              More than a jewel, a blessing
            </p>
            <div className="h-[0.5px] flex-grow bg-gradient-to-l from-transparent to-[#FFDE59]/50" />
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12 relative z-10 border-t border-white/10 pt-4 w-full justify-center max-w-4xl">
          {navLinks.map((link, idx) => (
            <Link 
              key={idx} 
              href={link.href}
              className={`text-sm tracking-widest font-serif transition-colors relative py-1 duration-200 group uppercase ${
                link.active ? "text-[#FFDE59]" : "text-white/90 hover:text-[#FFDE59]"
              }`}
            >
              {link.label}
              {/* Underline Indicator */}
              <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#FFDE59] transform origin-left transition-transform duration-300 ${
                link.active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`} />
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button - Left Aligned in navbar overlay */}
        <div className="md:hidden absolute left-4 bottom-5 z-20">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-[#FFDE59] hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors focus:outline-none"
            aria-label="Open mobile menu"
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex animate-fade-in">
          {/* Overlay Background */}
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Content */}
          <div className="relative w-80 max-w-[85vw] bg-[#07512E] text-white flex flex-col h-full z-10 shadow-2xl p-6 border-r border-[#053d22]">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="font-serif tracking-widest text-lg text-[#FFDE59] uppercase">Vardaan</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-[#FFDE59] p-1.5 rounded-full hover:bg-white/5 transition-colors"
                aria-label="Close menu"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation links inside drawer */}
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <Link 
                  key={idx} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base tracking-widest font-serif py-1.5 border-b border-white/5 uppercase ${
                    link.active ? "text-[#FFDE59] font-medium" : "text-white/80 hover:text-[#FFDE59]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-white/10">
              <div className="flex flex-col gap-4 text-sm">
                <a href="tel:+919818719997" className="flex items-center gap-3 text-white/80">
                  <FiPhone className="text-[#FFDE59]" />
                  <span>+91 98187 19997</span>
                </a>
                <Link href="#wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-white/80">
                  <FiHeart className="text-[#FFDE59]" />
                  <span>My Wishlist</span>
                </Link>
                <Link href="#cart" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-white/80">
                  <FiShoppingBag className="text-[#FFDE59]" />
                  <span>Shopping Cart</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
