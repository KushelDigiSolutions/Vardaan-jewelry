"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { FiShare2, FiHome, FiHeart, FiCheck, FiAlertTriangle } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import { LuShieldCheck } from "react-icons/lu";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import YouMayAlsoLike from "./YouMayAlsoLike";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ─── helpers ─────────────────────────────────────────────────────────────────
/** Extract unique values of a key from the variants array */
const unique = (arr) => [...new Set(arr.filter(Boolean))];

export default function ProductDetails({ productId }) {
  const { addToCart, cartItems, updateQuantity } = useCart();
  const { token } = useAuth();
  const toast = useToast();

  const [product, setProduct]           = useState(null);
  const [loading, setLoading]           = useState(true);
  const [quantity, setQuantity]         = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Variant selection state
  const [selectedKarat, setSelectedKarat]             = useState("");
  const [selectedColor, setSelectedColor]             = useState("");
  const [selectedSize, setSelectedSize]               = useState("");
  const [selectedMetalType, setSelectedMetalType]     = useState("");
  const [selectedGrossWeight, setSelectedGrossWeight] = useState("");
  const [selectedNetWeight, setSelectedNetWeight]     = useState("");

  // ── Fetch product ──────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchProductData = async () => {
      if (!productId) return;
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/products/${productId}`);
        if (res.ok) {
          const json = await res.json();
          const p = json.data;
          setProduct(p);

          // Pre-select karat, color, type, and weights, but NOT size
          if (p.variants && p.variants.length > 0) {
            const firstVar = p.variants[0];
            setSelectedKarat(firstVar.karat || "");
            setSelectedColor(firstVar.metalColor || "");
            setSelectedMetalType(firstVar.metalType || "Gold");
            setSelectedGrossWeight(firstVar.grossWeight || "");
            setSelectedNetWeight(firstVar.netWeight || "");
            setSelectedSize("");
          }
        }
      } catch (err) {
        console.error("Failed to load product details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [productId]);

  // ── Check wishlist ─────────────────────────────────────────────────────────
  useEffect(() => {
    const checkWishlist = async () => {
      if (!token || !productId) return;
      try {
        const res = await fetch(`${API_URL}/auth/wishlist`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          const wishlistItems = Array.isArray(json) ? json : (json?.data || []);
          setIsWishlisted(wishlistItems.some(item => (item.product?._id || item._id) === productId));
        }
      } catch (err) {
        console.error("Wishlist check error:", err);
      }
    };
    checkWishlist();
  }, [token, productId]);

  // ── Derived variant data ───────────────────────────────────────────────────
  const hasVariants = product?.variants?.length > 0;

  /** All unique karats */
  const allKarats = useMemo(() =>
    hasVariants ? unique(product.variants.map(v => v.karat)) : [],
    [product, hasVariants]
  );

  /** All unique colors */
  const allColors = useMemo(() =>
    hasVariants ? unique(product.variants.map(v => v.metalColor)) : [],
    [product, hasVariants]
  );

  /** All unique metal types */
  const allMetalTypes = useMemo(() =>
    hasVariants ? unique(product.variants.map(v => v.metalType || "Gold")) : [],
    [product, hasVariants]
  );

  /** All unique gross weights */
  const allGrossWeights = useMemo(() =>
    hasVariants ? unique(product.variants.map(v => v.grossWeight)) : [],
    [product, hasVariants]
  );

  /** All unique net weights */
  const allNetWeights = useMemo(() =>
    hasVariants ? unique(product.variants.map(v => v.netWeight)) : [],
    [product, hasVariants]
  );

  /** Metal colors available for the selected karat */
  const availableColors = useMemo(() => {
    if (!hasVariants) return [];
    return unique(
      product.variants.filter(v => v.karat === selectedKarat).map(v => v.metalColor)
    );
  }, [product, hasVariants, selectedKarat]);

  /** Sizes available for selected karat + color */
  const availableSizes = useMemo(() => {
    if (!hasVariants) return [];
    return unique(
      product.variants
        .filter(v => v.karat === selectedKarat && v.metalColor === selectedColor)
        .map(v => v.size)
    );
  }, [product, hasVariants, selectedKarat, selectedColor]);

  /** The specific variant object matching current selection */
  const activeVariant = useMemo(() => {
    if (!hasVariants) return null;
    return product.variants.find(
      v => 
        v.karat === selectedKarat && 
        v.metalColor === selectedColor && 
        v.size === selectedSize &&
        (v.metalType || "Gold") === (selectedMetalType || "Gold") &&
        (v.grossWeight || "") === (selectedGrossWeight || "") &&
        (v.netWeight || "") === (selectedNetWeight || "")
    ) || null;
  }, [product, hasVariants, selectedKarat, selectedColor, selectedSize, selectedMetalType, selectedGrossWeight, selectedNetWeight]);

  /** Human-readable variant string */
  const variantStr = useMemo(() => {
    if (hasVariants && activeVariant) {
      const parts = [];
      if (selectedSize)  parts.push(`Size: ${selectedSize}`);
      if (selectedKarat) parts.push(`Karat: ${selectedKarat}`);
      if (selectedColor) parts.push(`Color: ${selectedColor}`);
      if (selectedMetalType) parts.push(`Metal Type: ${selectedMetalType}`);
      if (selectedGrossWeight) parts.push(`Gross Wt: ${selectedGrossWeight}`);
      if (selectedNetWeight) parts.push(`Net Wt: ${selectedNetWeight}`);
      return parts.join(" | ") || "default";
    }
    return selectedSize || "default";
  }, [hasVariants, activeVariant, selectedSize, selectedKarat, selectedColor, selectedMetalType, selectedGrossWeight, selectedNetWeight]);

  /** Is currently selected variant in cart */
  const cartItem = useMemo(() => {
    if (!product || !cartItems) return null;
    return cartItems.find(
      (item) => item.id === product._id && item.variant === variantStr
    ) || null;
  }, [product, cartItems, variantStr]);

  const isInCart = !!cartItem;

  // Sync quantity from cart if item is already in cart
  useEffect(() => {
    if (isInCart && cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [isInCart, cartItem?.quantity]);

  /** Current display price */
  const displayPrice = activeVariant
    ? (activeVariant.salePrice > 0 ? activeVariant.salePrice : activeVariant.price)
    : (product?.salePrice > 0 ? product?.salePrice : product?.price) || 0;

  const originalPrice = activeVariant
    ? activeVariant.price
    : product?.price || 0;

  const hasDiscount = activeVariant
    ? activeVariant.salePrice > 0 && activeVariant.salePrice < activeVariant.price
    : product?.salePrice > 0 && product?.salePrice < product?.price;

  /** Out-of-stock flag */
  const isOutOfStock = activeVariant
    ? activeVariant.inventory <= 0
    : (product?.inventory || 0) <= 0;

  /** Stock availability label */
  const stockLabel = useMemo(() => {
    if (!hasVariants) {
      const inv = product?.inventory || 0;
      if (inv <= 0) return { text: "Out of Stock", color: "text-red-600" };
      if (inv <= 5) return { text: `Only ${inv} left!`, color: "text-amber-700" };
      return { text: `${inv} in stock`, color: "text-green-700" };
    }
    if (!activeVariant) return { text: "Select options above", color: "text-gray-400" };
    const inv = activeVariant.inventory || 0;
    if (inv <= 0) return { text: "Out of Stock", color: "text-red-600" };
    if (inv <= 5) return { text: `Only ${inv} left!`, color: "text-amber-700" };
    return { text: `${inv} in stock`, color: "text-green-700" };
  }, [hasVariants, product, activeVariant]);

  // ── Selection Change Sync (Score-based Matching) ──────────────────────────
  const handleSelectionChange = useCallback((field, value) => {
    if (!product || !product.variants || product.variants.length === 0) return;

    // Target configuration we are looking for
    const target = {
      karat: field === 'karat' ? value : selectedKarat,
      metalColor: field === 'metalColor' ? value : selectedColor,
      metalType: field === 'metalType' ? value : selectedMetalType,
      grossWeight: field === 'grossWeight' ? value : selectedGrossWeight,
      netWeight: field === 'netWeight' ? value : selectedNetWeight,
      size: field === 'size' ? value : selectedSize
    };

    // Find closest matching variant
    let bestVariant = null;
    let bestScore = -1;

    for (const v of product.variants) {
      let score = 0;
      if (v.karat === target.karat) score += 32;
      if (v.metalColor === target.metalColor) score += 16;
      if ((v.metalType || 'Gold') === target.metalType) score += 8;
      if ((v.grossWeight || '') === target.grossWeight) score += 4;
      if ((v.netWeight || '') === target.netWeight) score += 2;
      if (v.size === target.size) score += 1;

      if (score > bestScore) {
        bestScore = score;
        bestVariant = v;
      }
    }

    if (bestVariant) {
      setSelectedKarat(bestVariant.karat || "");
      setSelectedColor(bestVariant.metalColor || "");
      setSelectedMetalType(bestVariant.metalType || "Gold");
      setSelectedGrossWeight(bestVariant.grossWeight || "");
      setSelectedNetWeight(bestVariant.netWeight || "");
      if (field === 'size') {
        setSelectedSize(value);
      } else {
        setSelectedSize(bestVariant.size || "");
      }
    }
  }, [product, selectedKarat, selectedColor, selectedMetalType, selectedGrossWeight, selectedNetWeight, selectedSize]);

  // ── Cart ──────────────────────────────────────────────────────────────────
  const handleAddToCart = () => {
    if (!product) return;

    if (!selectedSize) {
      toast.error("Please select a size first!");
      return;
    }

    if (isOutOfStock) {
      toast.error("This variant is currently out of stock!");
      return;
    }

    let variantDetails = null;
    if (hasVariants && activeVariant) {
      variantDetails = {
        karat:       selectedKarat,
        metalColor:  selectedColor,
        metalType:   selectedMetalType,
        grossWeight: selectedGrossWeight,
        netWeight:   selectedNetWeight,
        size:        selectedSize,
        price:       activeVariant.price,
        salePrice:   activeVariant.salePrice || 0,
        inventory:   activeVariant.inventory
      };
    }

    setAddedFeedback(true);
    addToCart(product, quantity, variantStr, variantDetails);
    toast.success("Added to cart successfully!");
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  // ── Quantity API Trigger ──
  const handleQuantityChange = async (delta) => {
    if (isInCart) {
      if (delta > 0 && isOutOfStock) {
        toast.error("Insufficient inventory available!");
        return;
      }
      try {
        const newQty = Math.max(1, quantity + delta);
        if (newQty === quantity) return;
        await updateQuantity(product._id, delta, variantStr);
        setQuantity(newQty);
        toast.success("Cart updated successfully!");
      } catch (err) {
        console.error("Cart update quantity error:", err);
        toast.error("Failed to update cart quantity.");
      }
    } else {
      if (delta > 0 && isOutOfStock) return;
      setQuantity(q => Math.max(1, q + delta));
    }
  };

  // ── Wishlist ──────────────────────────────────────────────────────────────
  const handleToggleWishlist = async () => {
    if (!token) {
      toast.warning("Please log in to add items to your wishlist.");
      window.location.href = "/login";
      return;
    }
    const nextState = !isWishlisted;
    setIsWishlisted(nextState);
    try {
      const endpoint = nextState ? "add" : "remove";
      const res = await fetch(`${API_URL}/auth/wishlist/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ productId })
      });
      if (res.ok) {
        toast.success(nextState ? "Added to wishlist!" : "Removed from wishlist!");
      } else {
        throw new Error("Failed wishlist toggle");
      }
    } catch (err) {
      console.error("Failed to update wishlist:", err);
      setIsWishlisted(!nextState);
      toast.error("Failed to update wishlist.");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product?.name || "Vardaan Jewelry", url: window.location.href }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product page link copied to clipboard!");
    }
  };

  // ── Loading / not found ───────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="w-full max-w-[1192px] mx-auto px-4 py-20 text-center font-sans">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#07512E] mx-auto mb-4"></div>
        <p className="text-gray-500">Retrieving product information...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full max-w-[1192px] mx-auto px-4 py-20 text-center font-sans">
        <h2 className="text-2xl font-serif text-gray-700 mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-6">The requested jewelry piece could not be located in our catalog.</p>
        <Link href="/shop" className="bg-[#07512E] text-white px-6 py-2.5 font-medium tracking-wide uppercase text-sm">
          Return to Shop
        </Link>
      </div>
    );
  }

  const activeImage = product.images?.[selectedImageIdx] || "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png";

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-[1192px] lg:min-h-[808px] mx-auto px-4 lg:px-0 py-10 lg:py-16">
      <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-6">

        {/* =========================================
            COLUMN 1: PRODUCT INFO & ACTIONS
            ========================================= */}
        <div className="w-full lg:w-[365px] flex flex-col order-2 lg:order-1 shrink-0 text-left">
          <h1 className="text-[22px] sm:text-[26px] lg:text-[32px] font-sans font-medium text-[#303030] leading-tight mb-2">
            {product.name}
          </h1>

          <p className="text-[13px] font-sans text-amber-600 font-semibold tracking-[0.15em] uppercase mb-6">
            {product.isFeatured ? "Featured Collection" : "Online Exclusive"}
          </p>

          {/* ── Price Display ── */}
          <div className="mb-6">
            <p className="text-[22px] text-[#303030] font-medium font-sans flex items-baseline gap-1.5">
              INR:&nbsp;
              <span className="font-light text-[24px]">
                {displayPrice.toLocaleString("en-IN")}
              </span>
              {hasDiscount && (
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                  SALE
                </span>
              )}
            </p>
            {hasDiscount && (
              <p className="text-sm text-gray-400 line-through">
                Original Price: ₹ {originalPrice.toLocaleString("en-IN")}
              </p>
            )}
            <p className="text-[14px] text-gray-400 font-sans tracking-wide mt-1">
              MRP (INCL. OF ALL TAXES)
            </p>
          </div>

          {/* ── Variant Selectors (only when variants exist) ── */}
          {hasVariants && (
            <div className="mb-6 space-y-5">

              {/* ─ Karat ─ */}
              {allKarats.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[14px] font-semibold font-sans text-gray-700 uppercase tracking-wide">
                      Karat
                    </span>
                    <span className="text-[13px] font-sans text-gray-400 italic">
                      {selectedKarat}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {allKarats.map((karat) => (
                      <button
                        key={karat}
                        onClick={() => handleSelectionChange('karat', karat)}
                        className={`px-3 py-1.5 border text-[13px] font-sans rounded transition-all cursor-pointer ${
                          selectedKarat === karat
                            ? "bg-[#07512E] border-[#07512E] text-white font-medium shadow-sm"
                            : "bg-white border-gray-300 text-gray-700 hover:border-[#07512E] hover:text-[#07512E]"
                        }`}
                      >
                        {karat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
 
              {/* ─ Metal Color ─ */}
              {availableColors.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[14px] font-semibold font-sans text-gray-700 uppercase tracking-wide">
                      Metal Color
                    </span>
                    <span className="text-[13px] font-sans text-gray-400 italic">
                      {selectedColor}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {availableColors.map((color) => {
                      // Color swatch mapping
                      const swatchMap = {
                        "white gold": "#e8e8e8",
                        "yellow gold": "#FFD700",
                        "rose gold": "#E8A090",
                        "platinum": "#E5E4E2",
                        "silver": "#C0C0C0",
                      };
                      const swatchColor = swatchMap[color.toLowerCase()] || "#ccc";
                      return (
                        <button
                          key={color}
                          onClick={() => handleSelectionChange('metalColor', color)}
                          title={color}
                          className={`flex items-center gap-1.5 px-3 py-1.5 border text-[13px] font-sans rounded transition-all cursor-pointer ${
                            selectedColor === color
                              ? "border-[#07512E] bg-[#07512E]/5 text-[#07512E] font-medium"
                              : "border-gray-300 text-gray-700 hover:border-[#07512E]"
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full inline-block border border-gray-300 shrink-0"
                            style={{ background: swatchColor }}
                          />
                          {color}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
 
              {/* ─ Size ─ */}
              {availableSizes.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[14px] font-semibold font-sans text-gray-700 uppercase tracking-wide">
                      Size
                    </span>
                    <a href="#size-guide" className="text-[#07512E] text-[13px] underline underline-offset-4 decoration-1">
                      Size guide
                    </a>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSelectionChange('size', size)}
                        className={`w-11 h-11 border flex items-center justify-center text-[15px] font-sans transition-all cursor-pointer rounded ${
                          selectedSize === size
                            ? "bg-[#07512E] border-[#07512E] text-white font-medium shadow-sm"
                            : "bg-white border-gray-300 text-gray-700 hover:border-[#07512E] hover:text-[#07512E]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ─ Stock Label ─ */}
              <p className={`text-[13px] font-sans font-semibold ${stockLabel.color} flex items-center gap-1.5`}>
                {isOutOfStock && <FiAlertTriangle className="w-4 h-4" />}
                {stockLabel.text}
              </p>
            </div>
          )}

          {/* ── Fallback: static size selector for products without variants ── */}
          {!hasVariants && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[15px] font-sans text-gray-700">Size :</span>
                <a href="#size-guide" className="text-[#07512E] text-[14px] underline underline-offset-4 decoration-1">
                  Size guide
                </a>
              </div>
              <div className="flex gap-2 flex-wrap mb-3">
                {["50", "52", "55", "58", "60"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-11 h-11 border flex items-center justify-center text-[15px] font-sans transition-colors cursor-pointer ${
                      selectedSize === size
                        ? "bg-[#07512E] border-[#07512E] text-white"
                        : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className={`text-[13px] font-sans font-semibold ${stockLabel.color}`}>
                {stockLabel.text}
              </p>
            </div>
          )}

          {/* ── Quantity ── */}
          <div className="mb-8">
            <p className="text-[15px] font-sans font-medium text-[#303030] mb-3">Quantity</p>
            <div className="flex border border-gray-300 w-fit">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-10 h-10 flex items-center justify-center text-[#333333] hover:bg-gray-50 transition-colors cursor-pointer"
              >
                -
              </button>
              <div className="w-10 h-10 flex items-center justify-center text-[16px] font-sans border-x border-gray-300">
                {quantity}
              </div>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={isOutOfStock}
                className="w-10 h-10 flex items-center justify-center text-[#333333] hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          </div>

          {/* ── Action Buttons ── */}
          <div className="flex flex-col gap-3 mb-4">
            {isInCart ? (
              <Link
                href="/cart"
                className="w-full lg:w-[344px] h-[56px] border border-[#07512E] bg-[#07512E] text-white hover:bg-emerald-950 flex items-center justify-center font-sans font-medium text-[20px] py-3 transition-colors cursor-pointer"
              >
                View Cart
              </Link>
            ) : (
              <>
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`w-full lg:w-[344px] h-[56px] font-sans font-medium text-[20px] py-3 transition-colors cursor-pointer ${
                    isOutOfStock
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-[#FFDE59] text-[#101010] hover:bg-[#e6c543]"
                  }`}
                >
                  {isOutOfStock ? "Out of Stock" : "Shop Now"}
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`w-full lg:w-[344px] h-[56px] border font-sans font-medium text-[20px] py-3 transition-colors cursor-pointer ${
                    isOutOfStock
                      ? "border-gray-300 text-gray-400 cursor-not-allowed bg-gray-50"
                      : "border-[#07512E] text-[#07512E] bg-white hover:bg-[#07512E] hover:text-white"
                  }`}
                >
                  {addedFeedback ? (
                    <span className="flex items-center justify-center gap-2">
                      <FiCheck className="stroke-[2.5]" /> Added
                    </span>
                  ) : isOutOfStock ? "Unavailable" : "Add to Cart"}
                </button>
              </>
            )}
          </div>

          <div className="text-center mb-4">
            <span className="text-[#303030] text-[13px] font-sans">
              Shipping calculated at checkout
            </span>
          </div>

          {/* ── Delivery Estimate Box ── */}
          <div className="border border-[#FBEF9A] rounded px-4 py-3 mb-8 bg-[#fffff8]">
            <div className="flex justify-between items-center mb-2.5 text-[15px] text-[#333333] font-sans">
              <span>Delhi / NCR :</span>
              <span className="font-medium">2 - 4 Days</span>
            </div>
            <div className="flex justify-between items-center mb-2.5 text-[15px] text-[#333333] font-sans">
              <span>Rest of India :</span>
              <span className="font-medium">3 - 6 Days</span>
            </div>
            <div className="flex justify-between items-center mb-2.5 text-[15px] text-[#333333] font-sans">
              <span>International :</span>
              <span className="font-medium">7 - 14 Days</span>
            </div>
            <p className="text-red-500 text-[14px] font-light font-sans mt-1">
              COD available. Beware of fake websites.
            </p>
          </div>

          {/* ── Action Links ── */}
          <div className="flex items-center gap-6 text-[#606060]">
            <button
              onClick={handleToggleWishlist}
              className="flex items-center gap-2 text-[16px] font-sans hover:text-[#07512E] transition-colors cursor-pointer font-medium"
            >
              <FiHeart className={`w-4.5 h-4.5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              <span>{isWishlisted ? "In Wishlist" : "Add to Wishlist"}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-[16px] font-sans hover:text-[#07512E] transition-colors cursor-pointer font-medium"
            >
              <FiShare2 className="w-[18px] h-[18px]" /> Share
            </button>
          </div>
        </div>

        {/* =========================================
            COLUMN 2: IMAGE GALLERY
            ========================================= */}
        <div className="w-full lg:w-[395px] flex flex-col gap-4 order-1 lg:order-2 shrink-0">
          <div className="w-full aspect-square bg-[#F7F5F0] overflow-hidden relative border border-gray-100 rounded-lg">
            <img
              src={activeImage}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {product.images && product.images.length > 1 && (
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-16 h-14 bg-gray-50 border-2 cursor-pointer shrink-0 rounded overflow-hidden transition-all ${
                    selectedImageIdx === idx ? "border-[#07512E]" : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* =========================================
            COLUMN 3: DESCRIPTION & TRUST
            ========================================= */}
        <div className="w-full lg:w-[384px] flex flex-col order-3 shrink-0 text-left">

          {/* Yellowish Description Box */}
          <div className="bg-[#FFFDF4] px-6 pt-4 pb-6 sm:px-8 sm:pt-5 sm:pb-8 border border-[#F5EEDC] mb-5">
            <h2 className="text-[28px] font-medium font-serif text-[#303030] mb-4">
              Product Details
            </h2>
            <div className="w-full h-px bg-[#E5DCC5] mb-6"></div>

            <p className="text-[15px] text-[#303030] font-normal font-sans leading-relaxed mb-6">
              {product.description}
            </p>

            <h3 className="text-xs font-sans font-bold tracking-widest text-amber-700 uppercase mb-3">Attributes</h3>
            <ul className="text-[14px] text-[#303030] font-sans space-y-2 pl-0 list-none">
              <li className="flex justify-between py-1 border-b border-[#E5DCC5]/30">
                <span className="font-semibold text-gray-500">SKU Code :</span>
                <span className="font-mono text-gray-900">{product.sku}</span>
              </li>
              <li className="flex justify-between py-1 border-b border-[#E5DCC5]/30">
                <span className="font-semibold text-gray-500">Stock :</span>
                <span className={`font-semibold ${stockLabel.color}`}>
                  {stockLabel.text}
                </span>
              </li>
              {/* Show active variant details as select dropdowns if applicable */}
              {hasVariants && (
                <>
                  <li className="flex justify-between items-center py-1.5 border-b border-[#E5DCC5]/30">
                    <span className="font-semibold text-gray-500">Karat :</span>
                    <select
                      value={selectedKarat}
                      onChange={(e) => handleSelectionChange('karat', e.target.value)}
                      className="bg-[#FFFDF4] border border-[#E5DCC5] rounded px-2 py-0.5 text-[13px] font-sans font-medium text-gray-900 focus:border-[#07512E] outline-none text-right cursor-pointer"
                    >
                      {allKarats.map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                  </li>
                  <li className="flex justify-between items-center py-1.5 border-b border-[#E5DCC5]/30">
                    <span className="font-semibold text-gray-500">Metal Color :</span>
                    <select
                      value={selectedColor}
                      onChange={(e) => handleSelectionChange('metalColor', e.target.value)}
                      className="bg-[#FFFDF4] border border-[#E5DCC5] rounded px-2 py-0.5 text-[13px] font-sans font-medium text-gray-900 focus:border-[#07512E] outline-none text-right cursor-pointer"
                    >
                      {allColors.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </li>
                  <li className="flex justify-between items-center py-1.5 border-b border-[#E5DCC5]/30">
                    <span className="font-semibold text-gray-500">Metal Type :</span>
                    <select
                      value={selectedMetalType}
                      onChange={(e) => handleSelectionChange('metalType', e.target.value)}
                      className="bg-[#FFFDF4] border border-[#E5DCC5] rounded px-2 py-0.5 text-[13px] font-sans font-medium text-gray-900 focus:border-[#07512E] outline-none text-right cursor-pointer"
                    >
                      {allMetalTypes.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </li>
                  <li className="flex justify-between items-center py-1.5 border-b border-[#E5DCC5]/30">
                    <span className="font-semibold text-gray-500">Gross Weight :</span>
                    <select
                      value={selectedGrossWeight}
                      onChange={(e) => handleSelectionChange('grossWeight', e.target.value)}
                      className="bg-[#FFFDF4] border border-[#E5DCC5] rounded px-2 py-0.5 text-[13px] font-sans font-medium text-gray-900 focus:border-[#07512E] outline-none text-right cursor-pointer"
                    >
                      {allGrossWeights.map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </li>
                  <li className="flex justify-between items-center py-1.5 border-b border-[#E5DCC5]/30">
                    <span className="font-semibold text-gray-500">Net Weight :</span>
                    <select
                      value={selectedNetWeight}
                      onChange={(e) => handleSelectionChange('netWeight', e.target.value)}
                      className="bg-[#FFFDF4] border border-[#E5DCC5] rounded px-2 py-0.5 text-[13px] font-sans font-medium text-gray-900 focus:border-[#07512E] outline-none text-right cursor-pointer"
                    >
                      {allNetWeights.map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </li>
                  {activeVariant && activeVariant.size && (
                    <li className="flex justify-between py-1 border-b border-[#E5DCC5]/30">
                      <span className="font-semibold text-gray-500">Ring Size :</span>
                      <span className="text-gray-900 font-medium">{activeVariant.size}</span>
                    </li>
                  )}
                </>
              )}

              {/* General attributes (filtered to prevent duplicates) */}
              {product.attributes && product.attributes
                .filter(attr => {
                  const keyNorm = attr.key.trim().toLowerCase().replace(/\s+/g, '');
                  return ![
                    'karat',
                    'metalcolor',
                    'metaltype',
                    'grossweight',
                    'netweight'
                  ].includes(keyNorm);
                })
                .map((attr, idx) => (
                  <li key={idx} className="flex justify-between py-1 border-b border-[#E5DCC5]/30">
                    <span className="font-semibold text-gray-500">{attr.key} :</span>
                    <span className="text-gray-950 font-medium">{attr.value}</span>
                  </li>
                ))
              }
            </ul>
          </div>

          {/* Safe Checkout & Logos */}
          <div className="mb-8 pl-1">
            <div className="flex items-center gap-2 text-[#404040] text-[15px] font-medium font-sans mb-3">
              <LuShieldCheck className="w-[18px] h-[18px]" /> Safe Checkout
            </div>
            <img
              src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781762762/6220ac0f912013c51947f9c4_1_meyyn1.png"
              alt="Safe Checkout Payment Methods"
              className="h-7 w-auto"
            />
          </div>

          {/* Find in store box */}
          <div className="border border-gray-200 p-5 flex items-center gap-4">
            <div className="w-6 h-6 flex items-center justify-center shrink-0">
              <div className="w-5 h-5 rounded-full border border-gray-300"></div>
            </div>
            <FiHome className="w-7 h-7 text-[#07512E] shrink-0" />
            <div className="flex flex-col">
              <span className="text-[14px] text-[#000000] font-sans font-normal">Find in store</span>
              <a href="#click-collect" className="text-[14px] text-[#000000] font-normal font-sans underline underline-offset-2">
                Click & Collect: Check Availability
              </a>
            </div>
          </div>

        </div>

      </div>
      <YouMayAlsoLike categoryId={product?.category?._id} currentProductId={product?._id} />
    </div>
  );
}
