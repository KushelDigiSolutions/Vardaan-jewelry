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
      // Show sticky navbar after scrolling down completely past the normal header
      if (window.scrollY > 300) {
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
          className={`text-[14px] lg:text-[20px] font-serif transition-colors relative pb-3.5 duration-200 group whitespace-nowrap ${
            isActive ? "text-[#FFDE59]" : "text-white hover:text-[#FFDE59]"
          }`}
        >
          {link.label}
          {/* Underline Indicator */}
          <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#FFDE59] transform origin-left transition-transform duration-300 ${
            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`} />
        </Link>
      );
    })
  );

  return (
    <>
      {/* --- STATIC NAVBAR (Normal Top Screen State) --- */}
      <header className="w-full z-[60] relative">
        {renderTopBar()}

        {/* Main Luxury Green Navbar */}
        <div className="relative bg-[#07512E] text-white px-4 md:px-8 pt-5 md:pt-6 flex flex-col items-center overflow-hidden">
          
          {/* Background Subtle Floral Pattern Overlay */}
        <div className="flex">

            <div 
            className="absolute left-[-20%] md:left-[-5%] top-1/2 -translate-y-1/2 w-[500px] md:w-[75%] h-[500px] md:h-[700px] bg-no-repeat bg-center bg-contain pointer-events-none mix-blend-screen opacity-80"
            style={{ backgroundImage: `url('https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781612368/photo-1535632066927-ab7c9ab60908_1_cre4nd.png')` }}
          />
          <div 
            className="absolute right-[0%] top-1/2 -translate-y-1/2 w-[500px] md:w-[30%] h-[500px] md:h-[700px] bg-no-repeat bg-center bg-contain pointer-events-none mix-blend-screen opacity-80"
            style={{ backgroundImage: `url('https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781612369/photo-1535632066927-ab7c9ab60908_2_hr2sjj.png')` }}
          />
        </div>

          {/* Brand Logo & Tagline Container */}
          <Link 
            href="/" 
            className="flex flex-col items-center text-center relative z-10 max-w-xs md:max-w-md mb-5 hover:opacity-95 transition-opacity"
          >
            <img 
              src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781789797/vardan_logo_2_br1lkx.png" 
              alt="Vardaan Logo" 
              className="w-[180px] md:w-[220px] h-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-14 relative z-10 pt-2 w-full justify-center max-w-5xl">
            {renderNavLinks()}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden absolute right-4 z-20">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-[#FFDE59] hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors focus:outline-none"
              aria-label="Open mobile menu"
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* --- STICKY NAVBAR (Scrolled State) --- */}
      <header 
        className={`fixed top-0 left-0 w-full z-[60] shadow-2xl transition-all duration-[600ms] ease-in-out transform ${
          isScrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        {renderTopBar()}

        {/* Green Main Bar (Horizontal Layout as requested) */}
        <div className="relative bg-[#07512E] text-white px-4 md:px-8 lg:px-12 py-3 flex items-center justify-between overflow-hidden">
          
          {/* Background Subtle Floral Pattern Overlay */}
          <div 
            className="absolute left-[-5%] top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-no-repeat bg-center bg-contain pointer-events-none mix-blend-screen opacity-50"
            style={{ backgroundImage: `url('https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781612368/photo-1535632066927-ab7c9ab60908_1_cre4nd.png')` }}
          />

          {/* Left: Brand Logo */}
          <Link href="/" className="relative z-10 hover:opacity-90 transition-opacity flex-shrink-0">
            <img 
              src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781789797/vardan_logo_2_br1lkx.png" 
              alt="Vardaan Logo" 
              className="w-[120px] md:w-[150px] h-auto object-contain"
            />
          </Link>

          {/* Right/Center: Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-8 relative z-10 flex-grow px-8">
            {renderNavLinks()}
          </nav>

          {/* Mobile Menu Button for Sticky Navbar */}
          <div className="lg:hidden relative z-20">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-[#FFDE59] hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors focus:outline-none"
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
                    className={`text-base tracking-widest font-serif py-1.5 border-b border-white/5 uppercase ${
                      isActive ? "text-[#FFDE59] font-medium" : "text-white/80 hover:text-[#FFDE59]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* <div className="mt-auto pt-6 border-t border-white/10">
              <div className="flex flex-col gap-4 text-sm">
                <a href="tel:+919818719997" className="flex items-center gap-3 text-white/80">
                  <FiPhone className="text-[#FFDE59]" />
                  <span>+91 98187 19997</span>
                </a>
                <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-white/80 hover:text-[#FFDE59]">
                  <FiHeart className="text-[#FFDE59]" />
                  <span>My Wishlist</span>
                </Link>
                <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-white/80 hover:text-[#FFDE59]">
                  <div className="relative">
                    <FiShoppingBag className="text-[#FFDE59] w-5 h-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                        {cartItemCount}
                      </span>
                    )}
                  </div>
                  <span>Shopping Cart</span>
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
}
