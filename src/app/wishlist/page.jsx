"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiHeart, FiCheck, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function WishlistPage() {
  const { token } = useAuth();
  const { addToCart, getCartItemDetailsForListing } = useCart();
  const toast = useToast();
  
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartState, setCartState] = useState({});

  // Fetch wishlist
  const fetchWishlist = async () => {
    if (!token) {
      setWishlist([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        // Backend returns: { success: true, data: [...] }
        setWishlist(json.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  // Remove from Wishlist
  const handleRemove = async (productId, isMoveToCart = false) => {
    // Optimistic UI update
    setWishlist(prev => prev.filter(item => item._id !== productId));
    
    try {
      const res = await fetch(`${API_URL}/auth/wishlist/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId })
      });
      if (res.ok) {
        if (!isMoveToCart) {
          toast.success("Product removed from wishlist!");
        }
      } else {
        throw new Error("Failed to remove");
      }
    } catch (err) {
      console.error("Failed to remove item from wishlist:", err);
      toast.error("Failed to remove product from wishlist");
      fetchWishlist(); // rollback on error
    }
  };

  // Move to Cart
  const handleMoveToCart = async (product) => {
    const id = product._id;
    setCartState((prev) => ({ ...prev, [id]: true }));
    
    // Add to cart
    const { variantStr, variantDetails } = getCartItemDetailsForListing(product);
    addToCart(product, 1, variantStr, variantDetails);
    setTimeout(()=> {
       toast.success(`${product.name} moved to cart successfully!`);
    
    },3000)
    // toast.success(`${product.name} moved to cart successfully!`);

    // Remove from wishlist
    await handleRemove(id, true);
    
    setTimeout(() => {
      setCartState((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FCFCF9] mt-[110px]">
      <Navbar />
      
      <div className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 py-10 lg:py-16">
        <div className="flex items-center justify-between mb-8 border-b border-[#F0ECE3] pb-6">
          <h1 className="text-[32px] md:text-[40px] font-serif text-[#07512E]">My Wishlist</h1>
          <span className="text-[16px] text-gray-500 font-sans">
            {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        {!token ? (
          <div className="text-center py-20 bg-white border border-[#F0ECE3] p-8 mb-12 rounded-lg shadow-sm">
            <FiHeart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-2xl font-serif text-[#07512E] mb-3">Please Sign In</h3>
            <p className="text-base text-gray-500 max-w-sm mx-auto mb-8 font-sans">
              You must be logged in to view and manage your private wishlist folder.
            </p>
            <Link 
              href="/login"
              className="bg-[#07512E] text-white px-8 py-3.5 text-[16px] font-medium tracking-wide hover:bg-[#054024] transition-colors cursor-pointer"
            >
              Sign In Now
            </Link>
          </div>
        ) : loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#07512E] mx-auto mb-4"></div>
            <p className="text-gray-500 font-sans">Retrieving your wishlist items...</p>
          </div>
        ) : wishlist.length === 0 ? (
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
             Browse  Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-12">
            {wishlist.map((product) => (
              <div 
                key={product._id} 
                className="bg-white border border-[#F0ECE3] flex flex-col group overflow-hidden transition-all duration-300 relative luxury-card-hover text-left"
              >
                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(product._id)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-red-500 shadow-sm backdrop-blur-sm flex items-center justify-center transition-all duration-300 cursor-pointer"
                  aria-label="Remove from Wishlist"
                  title="Remove from Wishlist"
                >
                  <FiTrash2 className="w-4.5 h-4.5" />
                </button>

                {/* Product Image */}
                <Link href={`/product/${product._id}`} className="relative aspect-square w-full bg-[#FAF9F6] overflow-hidden block">
                  <img
                    src={product.images?.[0] || "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png"}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Link>

                {/* Product Details */}
                <div className="p-5 flex flex-col flex-grow text-left">
                  <Link href={`/product/${product._id}`}>
                    <h3 className="font-sans text-[#303030] text-[18px] md:text-[20px] font-medium leading-snug mb-3 min-h-[56px] line-clamp-2 hover:text-[#07512E] transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-[#07512E] font-medium text-[16px] mb-6">
                    ₹ {(product.salePrice || product.price).toLocaleString("en-IN")}
                  </p>

                  <div className="mt-auto flex flex-col gap-2">
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className={`w-full border-2 border-[#07512E] text-[#07512E] hover:bg-[#07512E] hover:text-white font-sans font-medium text-[16px] py-2.5 transition-all cursor-pointer text-center ${
                        cartState[product._id] ? "bg-[#07512E] text-white" : "bg-transparent"
                      }`}
                    >
                      {cartState[product._id] ? (
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
