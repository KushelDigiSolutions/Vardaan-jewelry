"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiHeart, FiCheck } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Dummy wishlist items
const INITIAL_WISHLIST = [
  {
    id: 1,
    name: "Lucy Williams Engravable Arco Cord Necklace",
    price: "₹ 1995",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png"
  },
  {
    id: 2,
    name: "Classic Diamond Eternity Band",
    price: "₹ 3499",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781529306/Lucy_Williams_Engravable_Arco_Gold_Ring_vggf77.png"
  },
  {
    id: 3,
    name: "Luxe Hoop Diamond Earrings",
    price: "₹ 2499",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781528601/earing_fktmvk.png"
  }
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);
  const [cartState, setCartState] = useState({});

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const handleAddToCart = (product) => {
    setCartState((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setCartState((prev) => ({ ...prev, [product.id]: false }));
    }, 3000);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FCFCF9]">
      <Navbar />
      
      <div className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 py-10 lg:py-16">
        <div className="flex items-center justify-between mb-8 border-b border-[#F0ECE3] pb-6">
          <h1 className="text-[32px] md:text-[40px] font-serif text-[#07512E]">My Wishlist</h1>
          <span className="text-[16px] text-gray-500 font-sans">{wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'}</span>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#F0ECE3] p-8 mb-12 rounded-lg shadow-sm">
            <FiHeart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-2xl font-serif text-[#07512E] mb-3">Your wishlist is empty</h3>
            <p className="text-base text-gray-500 max-w-sm mx-auto mb-8 font-sans">
              Explore our collections and add your favorite jewelry pieces to your wishlist.
            </p>
            <Link 
              href="/shop"
              className="bg-[#07512E] text-white px-8 py-3.5 text-[16px] font-medium tracking-wide hover:bg-[#054024] transition-colors cursor-pointer"
            >
              Discover Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-12">
            {wishlist.map((product) => (
              <div 
                key={product.id} 
                className="bg-white border border-[#F0ECE3] flex flex-col group overflow-hidden transition-all duration-300 relative luxury-card-hover"
              >
                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 shadow-sm backdrop-blur-sm flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
                  aria-label="Remove from Wishlist"
                >
                  <FiHeart className="w-4.5 h-4.5 fill-current" strokeWidth={2.5} />
                </button>

                {/* Product Image */}
                <Link href={`/product/${product.id}`} className="relative aspect-square w-full bg-[#FAF9F6] overflow-hidden block">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Link>

                {/* Product Details */}
                <div className="p-5 flex flex-col flex-grow text-left">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-sans text-[#303030] text-[18px] md:text-[20px] font-medium leading-snug mb-3 min-h-[56px] line-clamp-2 hover:text-[#07512E] transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-[#07512E] font-medium text-[16px] mb-6">
                    {product.price}
                  </p>

                  <div className="mt-auto flex flex-col gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`w-full border-2 border-[#07512E] text-[#07512E] hover:bg-[#07512E] hover:text-white font-sans font-medium text-[16px] py-2.5 transition-all cursor-pointer text-center ${
                        cartState[product.id] ? "bg-[#07512E] text-white" : "bg-transparent"
                      }`}
                    >
                      {cartState[product.id] ? (
                        <span className="flex items-center justify-center gap-1.5">
                          <FiCheck className="stroke-[3]" /> Added to Cart
                        </span>
                      ) : (
                        "Move to Cart"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
