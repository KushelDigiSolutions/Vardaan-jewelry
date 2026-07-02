"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function RoyallyCrafted() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [premiumCategoryId, setPremiumCategoryId] = useState(null);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const totalItems = products.length;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/categories`);
        if (res.ok) {
          const json = await res.json();
          const categoryList = Array.isArray(json) ? json : json?.data || [];
          setCategories(categoryList);

          const premiumCategory = categoryList.find(
            (cat) =>
              cat.slug?.toLowerCase() === "premium" ||
              cat.name?.toLowerCase() === "premium" ||
              cat._id?.toLowerCase() === "premium"
          );

          if (premiumCategory) {
            setPremiumCategoryId(premiumCategory._id || premiumCategory.id);
          }
        }
      } catch (err) {
        console.error("Error fetching categories for premium filter:", err);
      } finally {
        setCategoriesLoaded(true);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!categoriesLoaded) return;

    const fetchPremiumProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (premiumCategoryId) {
          params.append("category", premiumCategoryId);
        } else {
          params.append("sort", "premium");
        }
        params.append("limit", 6);

        const res = await fetch(`${API_URL}/products?${params.toString()}`);
        if (res.ok) {
          const json = await res.json();
          const items = json.data?.products || json.data || [];
          setProducts(items);
          if (items.length > 0) {
            setCurrentIndex(items.length);
          }
        } else {
          console.error("Failed to load premium products:", res.statusText);
        }
      } catch (err) {
        console.error("Error fetching premium products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPremiumProducts();
  }, [categoriesLoaded, premiumCategoryId]);

  const nextSlide = useCallback(() => {
    if (!isTransitioning || totalItems === 0) return;
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning, totalItems]);

  const prevSlide = () => {
    if (!isTransitioning || totalItems === 0) return;
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (totalItems === 0) return;
    if (currentIndex >= totalItems * 2) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex - totalItems);
      }, 700);
      return () => clearTimeout(timer);
    }
    if (currentIndex <= 0) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex + totalItems);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, totalItems]);

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  useEffect(() => {
    if (isHovered || totalItems === 0) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered, totalItems]);

  return (
    <section className="py-10 md:py-16 bg-[#FEF5E6]">
      <div className="w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0 flex flex-col">
        {/* Header Section */}
        <div className="flex justify-between sm: flex-wrap sm: gap-4 items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-[#1e2a24] font-medium tracking-wide">
            Premium Quality Products
          </h2>
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full cursor-pointer border border-[#07512E] flex items-center justify-center text-[#07512E] hover:bg-[#07512E] hover:text-white transition-colors z-10"
              aria-label="Previous slide"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full cursor-pointer bg-[#07512E] flex items-center justify-center text-white hover:bg-[#04361E] transition-colors z-10"
              aria-label="Next slide"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Window */}
        <div
          className="w-full relative overflow-hidden mb-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .royal-track { --slide-offset: calc(100% + 24px); }
            @media (min-width: 768px) {
              .royal-track { --slide-offset: calc(50% + 12px); }
            }
            @media (min-width: 1024px) {
              .royal-track { --slide-offset: calc(33.3333% + 8px); }
            }
          `,
            }}
          />
          {loading ? (
            <div className="py-20 text-center text-[#07512E]">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#07512E] mx-auto mb-4"></div>
              Loading premium products...
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              No premium products available.
            </div>
          ) : (
            <div
              className={`flex gap-6 royal-track w-full ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
              style={{
                transform: `translateX(calc(-${currentIndex} * var(--slide-offset)))`,
              }}
            >
              {[...products, ...products, ...products].map((product, idx) => {
                const productId = product._id || product.id;
                const productImage =
                  product.image ||
                  product.images?.[0] ||
                  "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png";
                const productPrice =
                  product.price ||
                  product.salePrice ||
                  product.regularPrice ||
                  "₹ 0";

                return (
                  <div
                    key={`${productId || idx}-${idx}`}
                    className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.3333%-16px)] min-h-0 md:min-h-[540px] h-auto flex flex-col bg-white p-4 shadow-sm border border-gray-100 mx-auto justify-between"
                  >
                    {/* Product Image */}
                    <Link
                      href={`/product/${productId}`}
                      className="relative aspect-square w-full mb-4 bg-gray-100 overflow-hidden group block shrink-0"
                    >
                      <img
                        src={productImage}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {product.soldOut && (
                        <div className="absolute top-3 left-3 bg-[#07512E] text-white text-xs font-semibold px-3 py-1.5 z-10">
                          Sold Out
                        </div>
                      )}
                      <button
                        className="absolute top-3 right-3 text-white hover:text-red-500 transition-colors z-10"
                        aria-label="Add to wishlist"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </Link>

                    {/* Product Details */}
                    <div className="flex flex-col flex-grow justify-between">
                      <div>
                        <Link href={`/product/${productId}`}>
                          <h3 className="font-serif text-[#303030] text-[20px] sm:text-[24px] font-medium leading-snug mb-2 line-clamp-2 hover:text-[#07512E] transition-colors min-h-0 md:min-h-[64px] flex items-start">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-[#07512E] font-medium mb-3 md:mb-4">
                          {typeof productPrice === "number"
                            ? `₹ ${productPrice.toLocaleString("en-IN")}`
                            : productPrice}
                        </p>
                      </div>
                      <div className="mt-auto flex gap-4 w-full">
                        <Link
                          href={`/product/${productId}`}
                          className="flex-1 h-[48px] flex items-center justify-center cursor-pointer bg-[#FFDE59] text-[#101010] font-sans font-medium text-[16px] sm:text-[20px] lg:text-[16px] xl:text-[20px] whitespace-nowrap hover:bg-[#e6c543] transition-colors duration-300"
                        >
                          Shop Now
                        </Link>
                        <button
                          onClick={() => addToCart(product)}
                          className="flex-1 h-[48px] flex items-center justify-center cursor-pointer bg-white border border-[#07512E] text-[#07512E] font-sans font-medium text-[16px] sm:text-[20px] lg:text-[16px] xl:text-[20px] whitespace-nowrap hover:bg-[#07512E] hover:text-white transition-colors duration-300"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Area with Features and View All Link */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-2 pb-4 gap-6">
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <div className="flex items-center gap-2 text-[#07512E] font-medium text-[18px]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Easy 10 Day Returns
            </div>
            <div className="flex items-center gap-2 text-[#07512E] font-medium text-[18px]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Light Weight Material
            </div>
            <div className="flex items-center gap-2 text-[#07512E] font-medium text-[18px]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Unique Design
            </div>
          </div>

          <Link
            href="/shop?category=premium"
            className="text-[#101010] hover:text-[#07512E] active:text-[#07512E] focus:text-[#07512E] no-underline hover:no-underline active:no-underline focus:no-underline flex items-center gap-2 font-serif font-medium text-[20px] group"
          >
            View All{" "}
            <span aria-hidden="true" className="text-gray-400 group-hover:text-[#07512E] group-active:text-[#07512E] group-focus:text-[#07512E] font-sans no-underline">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
