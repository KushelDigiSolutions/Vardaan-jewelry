"use client";

import React from "react";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function YouMayAlsoLike({ categoryId, currentProductId }) {
  const { addToCart } = useCart();
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!categoryId) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API_URL}/products?category=${categoryId}&limit=6`);
        if (res.ok) {
          const json = await res.json();
          const items = json.data?.products || json.data || [];
          // Filter out the current product
          const filtered = items.filter(item => item._id !== currentProductId).slice(0, 3);
          setProducts(filtered);
        }
      } catch (err) {
        console.error("Failed to load related products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRelatedProducts();
  }, [categoryId, currentProductId]);

  if (loading) {
    return (
      <section className="w-full bg-[#FFFDF4] py-16 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#07512E] mx-auto mb-3"></div>
        <p className="text-gray-500 text-sm font-sans">Loading recommendations...</p>
      </section>
    );
  }

  if (products.length === 0) {
    return null; // Don't render the section if no related items found
  }

  return (
    <section className="w-full bg-[#FFFDF4] py-16">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <h2 className="text-center text-[32px] sm:text-[40px] font-serif text-[#303030] mb-12">
          You May Also Like
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white flex flex-col shadow-sm group border border-gray-100 text-left">
              
              {/* Product Image Area */}
              <Link href={`/product/${product._id}`} className="relative aspect-[5/4] sm:aspect-[4/3] w-full overflow-hidden bg-[#F7F5F0] block">
                <img 
                  src={product.images?.[0] || "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png"} 
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>

              {/* Product Details Area */}
              <div className="p-6 flex flex-col flex-grow">
                <Link href={`/product/${product._id}`}>
                  <h3 className="text-[20px] sm:text-[24px] font-sans font-medium text-[#303030] leading-snug mb-3 min-h-[56px] line-clamp-2 hover:text-[#07512E] transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="text-[16px] text-[#07512E] font-medium mb-6">
                  ₹ {(product.salePrice || product.price).toLocaleString("en-IN")}
                </p>

                {/* Buttons Container */}
                <div className="mt-auto flex items-center gap-3 w-full">
                  <Link href={`/product/${product._id}`} className="flex-1 py-2.5 bg-[#FFDE59] text-[#101010] hover:bg-[#e6c543] transition-colors cursor-pointer text-center font-sans text-[16px] sm:text-[20px] font-medium block">
                    Shop Now
                  </Link>
                  <button 
                    onClick={() => addToCart(product)}
                    className="flex-1 py-2.5 bg-white border border-[#07512E] text-[#07512E] hover:bg-[#07512E] hover:text-white transition-colors cursor-pointer text-center font-sans text-[16px] sm:text-[20px] font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
