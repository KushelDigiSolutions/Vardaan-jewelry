"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiPhone, FiSearch, FiHeart, FiShoppingCart, FiShoppingBag, FiMenu, FiX, FiUser } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { cartItems } = useCart();
  const { user } = useAuth();
  const cartItemCount = cartItems?.length || 0;



  useEffect(() => {
    const handleScroll = () => {
      // Show sticky navbar immediately upon a slight scroll
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Shop", href: "/shop" },
    { label: "Contact", href: "/contact" },
  ];

  const renderTopBar = () => (
    <div className="bg-[#FFDE59] text-[#07512E] py-2.5 px-4 md:px-8 lg:px-12 grid grid-cols-2 md:grid-cols-2 items-center gap-4 text-xs md:text-[13px] font-medium">
      {/* Phone Call Section (Left Aligned) */}
      <div className="flex items-center justify-center md:justify-start">
        <a
          href="tel:+919818719997"
          className="flex items-center gap-2  transition-opacity"
        >
          <FiPhone className="w-[18px] h-[18px] stroke-[2] fill-[#07512E]" />
          <span className="font-semibold text-sm">91 98187 19997</span>
        </a>
      </div>

      {/* Search Bar (Centered) */}
      {/* <div className="flex justify-center w-full">
        <form 
          onSubmit={(e) => { e.preventDefault(); console.log("Searching for:", searchQuery); }}
          className="flex items-center w-full max-w-[420px] bg-[#FEFDF9] overflow-hidden shadow-sm"
        >
          <input
            type="text"
            placeholder="Search for keywords, Products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow px-4 py-2 text-sm text-gray-800 focus:outline-none placeholder-gray-500 font-sans bg-transparent"
          />
          <button 
            type="submit" 
            className="bg-[#07512E] hover:bg-[#04361E] text-white px-4 py-2 transition-colors duration-200 flex items-center justify-center cursor-pointer"
          >
            <FiSearch className="w-5 h-5" />
          </button>
        </form>
      </div> */}

      {/* User Profile, Wishlist, Cart Links (Right Aligned) */}
      <div className="flex items-center justify-center md:justify-end gap-6 font-sans">
        {/* User Profile Avatar */}
        {user ? (
          <Link href="/profile" className="flex items-center gap-1.5 cursor-pointer hover:opacity-85 transition-opacity" title="My Account">
            <div className="w-7 h-7 rounded-full bg-[#07512E]/10 border border-[#07512E]/20 overflow-hidden relative shadow-sm flex items-center justify-center text-[11px] font-bold text-[#07512E]">
              {user.avatar ? (
                <img
                  src={user.avatar.startsWith("http") ? user.avatar : `http://localhost:5000${user.avatar}`}
                  alt={user.name || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                user.name ? user.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() : "U"
              )}
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-[#07512E]">{(user.name || "").split(" ")[0] || "User"}</span>
          </Link>
        ) : (
          <Link href="/login" className="flex items-center gap-1.5 cursor-pointer hover:opacity-85 transition-opacity text-[#07512E]" title="Sign In">
            <FiUser className="w-[18px] h-[18px] stroke-[2.5]" />
            <span className="hidden sm:inline font-semibold">Sign In</span>
          </Link>
        )}

        {/* Wishlist */}
        <Link
          href="/wishlist"
          className="flex items-center gap-1.5  transition-opacity"
        >
          <FiHeart className="w-[18px] h-[18px] text-[#07512E] fill-[#07512E]" />
          <span className="hidden sm:inline font-semibold">Wishlist</span>
        </Link>

        {/* Cart */}
        <Link
          href="/cart"
          className="flex items-center gap-2  transition-opacity"
        >
          <div className="relative">
            <FiShoppingCart className="w-[18px] h-[18px] text-[#07512E] stroke-[2]" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="hidden sm:inline font-semibold">Cart</span>
        </Link>
      </div>
    </div>
  );

  const renderNavLinks = () => (
    navLinks.map((link, idx) => {
      const isActive = pathname === link.href || (link.href === "/" && pathname === null);
      return (
        <Link
          key={idx}
          href={link.href}
          className={`text-[14px] lg:text-[20px] font-serif transition-colors relative pb-3.5 duration-200 group whitespace-nowrap ${isActive ? "text-[#FFDE59]" : "text-white hover:text-[#FFDE59]"
            }`}
        >
          {link.label}
          {/* Underline Indicator */}
          <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#FFDE59] transform origin-left transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`} />
        </Link>
      );
    })
  );

  return (
    <>
      {/* Spacer div to prevent content below from jumping/hiding behind the fixed navbar */}
      <div className="w-full h-[190px] md:h-[210px] bg-[#07512E]" />

      {/* --- MAIN ANIMATED FIXED NAVBAR --- */}
      <header className="fixed top-0 left-0 w-full z-[60] shadow-2xl bg-[#07512E] transition-all duration-300">
        {/* Top Bar - Collapses smoothly on scroll */}
        <div className={`w-full transition-all duration-300 overflow-hidden ${isScrolled ? "max-h-0 opacity-0" : "max-h-[200px] opacity-100"}`}>
          {renderTopBar()}
        </div>

        {/* Main Luxury Green Navbar Container */}
        <div className={`relative bg-[#07512E] text-white transition-all duration-300 ease-in-out overflow-hidden flex items-center ${
          isScrolled 
            ? "px-4 md:px-8 lg:px-12 py-3 flex-row justify-between" 
            : "px-4 md:px-8 pt-5 md:pt-6 pb-2 flex-col justify-center"
        }`}>
          {/* Background Subtle Floral Pattern Overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className={`absolute left-[-20%] md:left-[-5%] top-1/2 -translate-y-1/2 w-[500px] md:w-[75%] h-[500px] md:h-[700px] bg-no-repeat bg-center bg-contain mix-blend-screen transition-opacity duration-300 ${isScrolled ? "opacity-30" : "opacity-80"}`}
              style={{ backgroundImage: `url('https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781612368/photo-1535632066927-ab7c9ab60908_1_cre4nd.png')` }}
            />
            <div
              className={`absolute right-[0%] top-1/2 -translate-y-1/2 w-[500px] md:w-[30%] h-[500px] md:h-[700px] bg-no-repeat bg-center bg-contain mix-blend-screen transition-opacity duration-300 ${isScrolled ? "opacity-0" : "opacity-80"}`}
              style={{ backgroundImage: `url('https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781612369/photo-1535632066927-ab7c9ab60908_2_hr2sjj.png')` }}
            />
          </div>

          {/* Left: Brand Logo Container (Takes flex-1 to balance right container) */}
          <div className={`relative z-10 flex transition-all duration-300 ease-in-out ${
            isScrolled ? "flex-1 justify-start mb-0" : "w-full justify-center mb-5"
          }`}>
            <Link href="/" className="hover:opacity-95 transition-opacity inline-block">
              <img
                src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781789797/vardan_logo_2_br1lkx.png"
                alt="Vardaan Logo"
                className={`h-auto object-contain transition-all duration-400 ease-in-out ${
                  isScrolled ? "w-[120px] md:w-[150px]" : "w-[180px] md:w-[220px]"
                }`}
              />
            </Link>
          </div>

          {/* Center: Desktop Navigation Links (Stays perfectly centered and vertically aligned with VARDAAN text in logo) */}
          <nav className={`hidden md:flex items-center justify-center relative z-10 transition-all duration-300 ease-in-out ${
            isScrolled ? "gap-6 lg:gap-10 pt-4" : "gap-6 lg:gap-14 pt-2 w-full max-w-5xl"
          }`}>
            {renderNavLinks()}
          </nav>

          {/* Right: Dummy Spacer for Desktop / Mobile Menu Button for Mobile (Takes flex-1 to balance left logo) */}
          <div className={`relative z-20 flex transition-all duration-300 ease-in-out ${
            isScrolled ? "flex-1 justify-end" : "md:hidden absolute right-4 top-6"
          }`}>
            <div className="hidden md:block" /> {/* Preserves exact flex-1 balance on desktop */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-[#FFDE59] hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors focus:outline-none"
              aria-label="Open mobile menu"
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* --- Mobile Sidebar Navigation Drawer --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden flex justify-end animate-fade-in">
          {/* Overlay Background */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Content */}
          <div className="relative w-full bg-[#07512E] text-white flex flex-col h-full z-10 shadow-2xl p-6 border-l border-[#053d22]">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                <img
                  src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781789797/vardan_logo_2_br1lkx.png"
                  alt="Vardaan Logo"
                  className="w-[130px] h-auto object-contain"
                />
              </Link>
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
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href || (link.href === "/" && pathname === null);
                return (
                  <Link
                    key={idx}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base tracking-widest font-serif py-1.5 border-b border-white/5 uppercase ${isActive ? "text-[#FFDE59] font-medium" : "text-white/80 hover:text-[#FFDE59]"
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
