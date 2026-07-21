"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  FiShare2,
  FiHome,
  FiHeart,
  FiCheck,
  FiAlertTriangle,
  FiStar,
} from "react-icons/fi";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { LuShieldCheck } from "react-icons/lu";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import YouMayAlsoLike from "./YouMayAlsoLike";

const API_URL =process.env.NEXT_PUBLIC_API_URL ||"https:localhost:5000/api";

// ─── helpers ─────────────────────────────────────────────────────────────────
/** Extract unique values of a key from the variants array */
const unique = (arr) => [...new Set(arr.filter(Boolean))];

export default function ProductDetails({ productId }) {
  const { addToCart, cartItems, updateQuantity } = useCart();
  const { token } = useAuth();
  const toast = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedWearableIdx, setSelectedWearableIdx] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [isActive, setIsActive] = useState(false);
  // const [showSizeInput, setShowSizeInput] = useState(false);
  const [customSize, setCustomSize] = useState("");

  // Variant selection state
  const [selectedKarat, setSelectedKarat] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedMetalType, setSelectedMetalType] = useState("");
  const [selectedGrossWeight, setSelectedGrossWeight] = useState("");
  const [selectedNetWeight, setSelectedNetWeight] = useState("");

  // Product reviews and rating states
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

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
          if (p.reviews && Array.isArray(p.reviews)) {
            setReviews(p.reviews);
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

  // ── Fetch reviews ──────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchReviews = async () => {
      if (!productId) return;
      setReviewsLoading(true);
      try {
        const res = await fetch(`${API_URL}/products/${productId}/reviews`);
        if (res.ok) {
          const json = await res.json();
          const reviewsData = Array.isArray(json)
            ? json
            : json.data || json.reviews || [];
          setReviews(reviewsData);
        }
      } catch (err) {
        console.error("Failed to load reviews:", err);
      } finally {
        setReviewsLoading(false);
      }
    };
    fetchReviews();
  }, [productId]);

  // ── Check wishlist ─────────────────────────────────────────────────────────
  useEffect(() => {
    const checkWishlist = async () => {
      if (!token || !productId) return;
      try {
        const res = await fetch(`${API_URL}/auth/wishlist`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const json = await res.json();
          const wishlistItems = Array.isArray(json) ? json : json?.data || [];
          setIsWishlisted(
            wishlistItems.some(
              (item) => (item.product?._id || item._id) === productId,
            ),
          );
        }
      } catch (err) {
        console.error("Wishlist check error:", err);
      }
    };
    checkWishlist();
  }, [token, productId]);

  // ── Derived variant data ───────────────────────────────────────────────────
  const hasVariants = product?.variants?.length > 0;

  const isRingProduct = useMemo(() => {
    const getNormalizedString = (cat) => {
      if (!cat) return "";
      const catVal = typeof cat === "string" ? cat : (cat.name || cat.slug || "");
      const parentVal = typeof cat !== "string" && cat.parentCategory
        ? (cat.parentCategory.name || cat.parentCategory.slug || "")
        : "";
      return `${catVal} ${parentVal}`;
    };

    let searchStr = "";
    if (product?.category) {
      searchStr += getNormalizedString(product.category);
    }
    if (product?.categories && Array.isArray(product.categories)) {
      product.categories.forEach(c => {
        searchStr += " " + getNormalizedString(c);
      });
    }

    const normalized = searchStr.toLowerCase();
    return normalized.includes("ring");
  }, [product]);

  const renderAverageStars = (rating, sizeClass = "w-4 h-4") => {
    const roundedRating = Math.round((rating || 0) * 2) / 2;
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating - fullStars === 0.5;

    return Array.from({ length: 5 }).map((_, i) => {
      if (i < fullStars) {
        return <BsStarFill key={i} className={`${sizeClass} text-[#FFDE59]`} />;
      }
      if (i === fullStars && hasHalfStar) {
        return <BsStarHalf key={i} className={`${sizeClass} text-[#FFDE59]`} />;
      }
      return <BsStar key={i} className={`${sizeClass} text-gray-300`} />;
    });
  };

  /** All unique karats */
  const allKarats = useMemo(
    () => (hasVariants ? unique(product.variants.map((v) => v.karat)) : []),
    [product, hasVariants],
  );

  /** All unique colors */
  const allColors = useMemo(
    () =>
      hasVariants ? unique(product.variants.map((v) => v.metalColor)) : [],
    [product, hasVariants],
  );

  /** All unique metal types */
  const allMetalTypes = useMemo(
    () =>
      hasVariants
        ? unique(product.variants.map((v) => v.metalType || "Gold"))
        : [],
    [product, hasVariants],
  );

  /** All unique gross weights */
  const allGrossWeights = useMemo(
    () =>
      hasVariants ? unique(product.variants.map((v) => v.grossWeight)) : [],
    [product, hasVariants],
  );

  /** All unique net weights */
  const allNetWeights = useMemo(
    () => (hasVariants ? unique(product.variants.map((v) => v.netWeight)) : []),
    [product, hasVariants],
  );

  /** Metal colors available for the selected karat */
  const availableColors = useMemo(() => {
    if (!hasVariants) return [];
    return unique(
      product.variants
        .filter((v) => v.karat === selectedKarat)
        .map((v) => v.metalColor),
    );
  }, [product, hasVariants, selectedKarat]);

  /** Sizes available for selected karat + color */
  const availableSizes = useMemo(() => {
    if (!hasVariants) return [];
    return unique(
      product.variants
        .filter(
          (v) => v.karat === selectedKarat && v.metalColor === selectedColor,
        )
        .map((v) => v.size),
    );
  }, [product, hasVariants, selectedKarat, selectedColor]);

  /** The specific variant object matching current selection */
  const activeVariant = useMemo(() => {
    if (!hasVariants) return null;
    const matched = product.variants.find(
      (v) =>
        v.karat === selectedKarat &&
        v.metalColor === selectedColor &&
        (selectedSize ? v.size === selectedSize : true) &&
        (v.metalType || "Gold") === (selectedMetalType || "Gold") &&
        (v.grossWeight || "") === (selectedGrossWeight || "") &&
        (v.netWeight || "") === (selectedNetWeight || ""),
    );
    return matched || product.variants[0];
  }, [
    product,
    hasVariants,
    selectedKarat,
    selectedColor,
    selectedSize,
    selectedMetalType,
    selectedGrossWeight,
    selectedNetWeight,
  ]);

  /** Human-readable variant string */
  const variantStr = useMemo(() => {
    if (hasVariants && activeVariant) {
      const parts = [];
      parts.push(`Size: ${selectedSize || "Standard"}`);
      if (selectedKarat) parts.push(`Karat: ${selectedKarat}`);
      if (selectedColor) parts.push(`Color: ${selectedColor}`);
      if (selectedMetalType) parts.push(`Metal Type: ${selectedMetalType}`);
      if (selectedGrossWeight) parts.push(`Gross Wt: ${selectedGrossWeight}`);
      if (selectedNetWeight) parts.push(`Net Wt: ${selectedNetWeight}`);
      return parts.join(" | ") || "Standard";
    }
    return selectedSize || "Standard";
  }, [
    hasVariants,
    activeVariant,
    selectedSize,
    selectedKarat,
    selectedColor,
    selectedMetalType,
    selectedGrossWeight,
    selectedNetWeight,
  ]);

  /** Is currently selected variant in cart */
  const cartItem = useMemo(() => {
    if (!product || !cartItems) return null;
    return (
      cartItems.find(
        (item) => item.id === product._id && item.variant === variantStr,
      ) || null
    );
  }, [product, cartItems, variantStr]);

  const isInCart = !!cartItem;

  // Sync quantity from cart if item is already in cart
  useEffect(() => {
    if (isInCart && cartItem) {
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInCart, cartItem?.quantity]);

  // Get custom size price if selected
  const selectedSizeObj = useMemo(() => {
    if (!product?.sizes) return null;
    if (!selectedSize) {
      return null;
    }
    return product.sizes.find(s => s.size === selectedSize) || null;
  }, [product?.sizes, selectedSize]);

  /** Current display price */
  const displayPrice = useMemo(() => {
    if (activeVariant) {
      return activeVariant.salePrice > 0 ? activeVariant.salePrice : activeVariant.price;
    }
    if (selectedSizeObj && selectedSizeObj.price !== null && selectedSizeObj.price !== undefined && selectedSizeObj.price > 0) {
      return selectedSizeObj.price;
    }
    return (product?.salePrice > 0 ? product?.salePrice : product?.price) || 0;
  }, [activeVariant, selectedSizeObj, product]);

  const originalPrice = useMemo(() => {
    if (activeVariant) return activeVariant.price;
    if (selectedSizeObj && selectedSizeObj.price !== null && selectedSizeObj.price !== undefined && selectedSizeObj.price > 0) {
      return selectedSizeObj.price;
    }
    return product?.price || 0;
  }, [activeVariant, selectedSizeObj, product]);

  const hasDiscount = useMemo(() => {
    // Custom size selected — no discount/sale badge for size-specific prices
    if (selectedSizeObj) return false;
    if (activeVariant) {
      return activeVariant.salePrice > 0 && activeVariant.salePrice < activeVariant.price;
    }
    return product?.salePrice > 0 && product?.salePrice < product?.price;
  }, [activeVariant, product, selectedSizeObj]);

  // Compute average rating and count dynamically
  const { averageRating, totalRatingsCount } = useMemo(() => {
    let totalScore = 0;
    const count = reviews.length;

    if (count > 0) {
      totalScore = reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
      return {
        averageRating: Number((totalScore / count).toFixed(1)),
        totalRatingsCount: count,
      };
    }

    // Fallback to product model stats if available
    return {
      averageRating: product?.averageRating || product?.rating || 0,
      totalRatingsCount: product?.totalRatings || product?.numReviews || 0,
    };
  }, [reviews, product]);

  /** Out-of-stock flag */
  const isOutOfStock = useMemo(() => {
    if (!selectedSize) {
      return (product?.inventory || 0) <= 0;
    }
    if (hasVariants) {
      return activeVariant
        ? activeVariant.inventory <= 0
        : (product?.inventory || 0) <= 0;
    }
    if (selectedSizeObj) {
      return selectedSizeObj.inventory <= 0;
    }
    return (product?.inventory || 0) <= 0;
  }, [hasVariants, activeVariant, selectedSizeObj, product, selectedSize]);

  /** Stock availability label */
  const stockLabel = useMemo(() => {
    if (!selectedSize) {
      const inv = product?.inventory || 0;
      if (inv <= 0) return { text: "Out of Stock", color: "text-red-600" };
      if (inv <= 5) return { text: `Only ${inv} left!`, color: "text-amber-700" };
      return { text: `${inv} in stock`, color: "text-green-700" };
    }

    if (hasVariants) {
      if (!activeVariant)
        return { text: "Select options above", color: "text-gray-400" };
      const inv = activeVariant.inventory || 0;
      if (inv <= 0) return { text: "Out of Stock", color: "text-red-600" };
      if (inv <= 5) return { text: `Only ${inv} left!`, color: "text-amber-700" };
      return { text: `${inv} in stock`, color: "text-green-700" };
    }
    // For non-variants (including custom sizes or simple products)
    const inv = selectedSizeObj ? (selectedSizeObj.inventory || 0) : (product?.inventory || 0);
    if (inv <= 0) return { text: "Out of Stock", color: "text-red-600" };
    if (inv <= 5) return { text: `Only ${inv} left!`, color: "text-amber-700" };
    return { text: `${inv} in stock`, color: "text-green-700" };
  }, [hasVariants, activeVariant, selectedSizeObj, product, selectedSize]);

  // ── Selection Change Sync (Score-based Matching) ──────────────────────────
  const handleSelectionChange = useCallback(
    (field, value) => {
      if (!product || !product.variants || product.variants.length === 0)
        return;

      // Target configuration we are looking for
      const target = {
        karat: field === "karat" ? value : selectedKarat,
        metalColor: field === "metalColor" ? value : selectedColor,
        metalType: field === "metalType" ? value : selectedMetalType,
        grossWeight: field === "grossWeight" ? value : selectedGrossWeight,
        netWeight: field === "netWeight" ? value : selectedNetWeight,
        size: field === "size" ? value : selectedSize,
      };

      // Find closest matching variant
      let bestVariant = null;
      let bestScore = -1;

      for (const v of product.variants) {
        let score = 0;
        if (v.karat === target.karat) score += 32;
        if (v.metalColor === target.metalColor) score += 16;
        if ((v.metalType || "Gold") === target.metalType) score += 8;
        if ((v.grossWeight || "") === target.grossWeight) score += 4;
        if ((v.netWeight || "") === target.netWeight) score += 2;
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
        if (field === "size") {
          setSelectedSize(value);
        } else {
          if (selectedSize === "") {
            setSelectedSize("");
          } else {
            setSelectedSize(bestVariant.size || "");
          }
        }
      }
    },
    [
      product,
      selectedKarat,
      selectedColor,
      selectedMetalType,
      selectedGrossWeight,
      selectedNetWeight,
      selectedSize,
    ],
  );

  // ── Cart ──────────────────────────────────────────────────────────────────
  const handleAddToCart = () => {
    if (!product) return;

    // Size selection is optional; commented out mandatory validation
    /*
    const requiresSize = (isRingProduct && !hasVariants) || (product.sizes && product.sizes.length > 0);
    if (requiresSize && !selectedSize) {
      toast.error("Please select a size first!");
      return;
    }
    */

    if (isOutOfStock) {
      toast.error("This variant is currently out of stock!");
      return;
    }

    let variantDetails = null;
    if (hasVariants && activeVariant) {
      variantDetails = {
        karat: selectedKarat,
        metalColor: selectedColor,
        metalType: selectedMetalType,
        grossWeight: selectedGrossWeight,
        netWeight: selectedNetWeight,
        size: selectedSize || "Standard",
        price: activeVariant.price,
        salePrice: activeVariant.salePrice || 0,
        inventory: selectedSize ? activeVariant.inventory : (product?.inventory || 0),
      };
    } else if (selectedSizeObj) {
      variantDetails = {
        size: selectedSize || "Standard",
        price: displayPrice,
        salePrice: 0,
        inventory: selectedSize ? selectedSizeObj.inventory : (product?.inventory || 0)
      };
    } else {
      variantDetails = {
        size: "Standard",
        price: displayPrice,
        salePrice: 0,
        inventory: product?.inventory || 0
      };
    }

    setAddedFeedback(true);
    addToCart(product, quantity, variantStr, variantDetails);
    toast.success("Added to cart successfully!");
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  // ── Quantity API Trigger ──
  const handleQuantityChange = async (delta) => {
    // Get available inventory based on variant/size selections
    let availableInventory = product?.inventory || 0;
    if (hasVariants && activeVariant) {
      availableInventory = activeVariant.inventory;
    } else if (selectedSizeObj) {
      availableInventory = selectedSizeObj.inventory;
    }

    const newQty = quantity + delta;
    if (newQty < 1) return; // Do not allow quantity less than 1

    if (newQty > availableInventory) {
      toast.error(`Only ${availableInventory} items available in stock!`);
      return;
    }

    if (isInCart) {
      // Optimistically update the UI instantly
      setQuantity(newQty);
      
      updateQuantity(product._id, delta, variantStr).then((success) => {
        if (!success) {
          // Revert quantity if the API call fails
          setQuantity((current) => current - delta);
        }
      }).catch((err) => {
        console.error("Cart update quantity error:", err);
        setQuantity((current) => current - delta);
      });
    } else {
      setQuantity(newQty);
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        toast.success(
          nextState ? "Added to wishlist!" : "Removed from wishlist!",
        );
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
      navigator
        .share({
          title: product?.name || "Vardaan Jewelry",
          url: window.location.href,
        })
        .catch(console.error);
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
        <h2 className="text-2xl font-serif text-gray-700 mb-2">
          Product Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          The requested jewelry piece could not be located in our catalog.
        </p>
        <Link
          href="/shop"
          className="bg-[#07512E] text-white px-6 py-2.5 font-medium tracking-wide uppercase text-sm"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const activeImage =
    product.images?.[selectedImageIdx] ||
    "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png";

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-[1192px] lg:min-h-[808px] mx-auto px-4 lg:px-12 xl:px-0 py-10 lg:py-16">
      <div className="flex flex-col lg:grid lg:grid-cols-2 xl:flex xl:flex-row justify-between gap-8 lg:gap-x-8 lg:gap-y-10 xl:gap-6">
        {/* =========================================
            COLUMN 1: PRODUCT INFO & ACTIONS
            ========================================= */}
        <div className="w-full xl:w-[365px] flex flex-col order-2 lg:order-2 xl:order-1 shrink-0 text-left lg:col-span-1">
          <h1 className="text-[22px] sm:text-[26px] lg:text-[32px] font-sans font-medium text-[#303030] leading-tight mb-2">
            {product.name}
          </h1>

          <p className="text-[13px] font-sans text-amber-600 font-semibold tracking-[0.15em] uppercase mb-6">
            {product.isFeatured ? "Featured Collection" : "Online Exclusive"}
          </p>

          {/* ── Price Display ── */}
          <div className="mb-6">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
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

              {/* Price Rating */}
              {totalRatingsCount > 0 && (
                <div
                  onClick={() => {
                    const el = document.getElementById("reviews-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity bg-[#FFFDF4] px-2 py-0.5 border border-[#F5EEDC] rounded-full"
                  title="Click to view reviews"
                >
                  <div className="flex">
                    {renderAverageStars(averageRating, "w-3.5 h-3.5")}
                  </div>
                  <span className="text-xs font-semibold text-gray-700 ml-0.5">
                    {averageRating}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    ({totalRatingsCount})
                  </span>
                </div>
              )}
            </div>
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
                        onClick={() => handleSelectionChange("karat", karat)}
                        className={`px-3 py-1.5 border text-[13px] font-sans rounded transition-all cursor-pointer ${selectedKarat === karat
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
                        platinum: "#E5E4E2",
                        silver: "#C0C0C0",
                      };
                      const swatchColor =
                        swatchMap[color.toLowerCase()] || "#ccc";
                      return (
                        <button
                          key={color}
                          onClick={() =>
                            handleSelectionChange("metalColor", color)
                          }
                          title={color}
                          className={`flex items-center gap-1.5 px-3 py-1.5 border text-[13px] font-sans rounded transition-all cursor-pointer ${selectedColor === color
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
              {isRingProduct && availableSizes.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[14px] font-semibold font-sans text-gray-700 uppercase tracking-wide">
                      Size
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      key="Standard"
                      onClick={() => handleSelectionChange("size", "")}
                      className={`px-3.5 h-11 border flex items-center justify-center text-[15px] font-sans transition-all cursor-pointer rounded ${!selectedSize
                        ? "bg-[#07512E] border-[#07512E] text-white font-medium shadow-sm"
                        : "bg-white border-gray-300 text-gray-700 hover:border-[#07512E] hover:text-[#07512E]"
                        }`}
                    >
                      Standard
                    </button>
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSelectionChange("size", size)}
                        className={`w-11 h-11 border flex items-center justify-center text-[15px] font-sans transition-all cursor-pointer rounded ${selectedSize === size
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
              <p
                className={`text-[13px] font-sans font-semibold ${stockLabel.color} flex items-center gap-1.5`}
              >
                {isOutOfStock && <FiAlertTriangle className="w-4 h-4" />}
                {stockLabel.text}
              </p>
            </div>
          )}

          {/* ── Custom Sizes Selector ── */}
          {!hasVariants && product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[15px] font-sans text-gray-700 font-semibold uppercase tracking-wide">
                  Select Size (Current: {selectedSize || "Standard"})
                </span>
              </div>
              <div className="flex gap-2 flex-wrap mb-3">
                <button
                  key="Standard"
                  type="button"
                  onClick={() => setSelectedSize("")}
                  className={`px-4 py-2 border flex items-center justify-center text-[15px] font-sans transition-colors cursor-pointer rounded ${!selectedSize
                    ? "bg-[#07512E] border-[#07512E] text-white font-medium shadow-sm"
                    : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                >
                  Standard
                </button>
                {product.sizes.map((sObj) => (
                  <button
                    key={sObj.size}
                    type="button"
                    onClick={() => setSelectedSize(sObj.size)}
                    className={`px-4 py-2 border flex items-center justify-center text-[15px] font-sans transition-colors cursor-pointer rounded ${selectedSize === sObj.size
                      ? "bg-[#07512E] border-[#07512E] text-white font-medium shadow-sm"
                      : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                  >
                    {sObj.size}
                  </button>
                ))}
              </div>
              <p
                className={`text-[13px] font-sans font-semibold ${stockLabel.color} flex items-center gap-1.5`}
              >
                {isOutOfStock && <FiAlertTriangle className="w-4 h-4" />}
                {stockLabel.text}
              </p>
            </div>
          )}



          {/* ── Quantity ── */}
          <div className="mb-8">
            <p className="text-[15px] font-sans font-medium text-[#303030] mb-3">
              Quantity
            </p>
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
                className="w-10 h-10 flex items-center justify-center text-[#333333] hover:bg-gray-50 transition-colors cursor-pointer"
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
                  className={`w-full lg:w-[344px] h-[56px] border font-sans font-medium text-[20px] py-3 transition-colors cursor-pointer ${isOutOfStock
                    ? "border-gray-300 text-gray-400 cursor-not-allowed bg-gray-50"
                    : "border-[#07512E] text-[#07512E] bg-white hover:bg-[#07512E] hover:text-white"
                    }`}
                >
                  {addedFeedback ? (
                    <span className="flex items-center justify-center gap-2">
                      <FiCheck className="stroke-[2.5]" /> Added
                    </span>
                  ) : isOutOfStock ? (
                    "Unavailable"
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </>
            )}
          </div>

          <div className="w-full lg:w-[344px] text-center mb-4">
            <span className="text-[#303030] text-[13px] font-sans">
              Shipping calculated at checkout
            </span>
          </div>

          {/* ── Delivery Estimate Box ── */}
          {/* <div className="border border-[#FBEF9A] rounded px-4 py-3 mb-8 bg-[#fffff8]">
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
          </div> */}

          {/* ── Action Links ── */}
          <div className="flex items-center gap-6 text-[#606060]">
            <button
              onClick={handleToggleWishlist}
              className="flex items-center gap-2 text-[16px] font-sans hover:text-[#07512E] transition-colors cursor-pointer font-medium"
            >
              <FiHeart
                className={`w-4.5 h-4.5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
              />
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
        <div className="w-full md:max-w-[400px] lg:max-w-none xl:w-[395px] mx-auto xl:mx-0 flex flex-col lg:grid lg:grid-cols-2 xl:flex xl:flex-col gap-6 lg:gap-8 xl:gap-6 order-1 lg:order-1 xl:order-2 shrink-0 items-start lg:col-span-2 xl:col-span-1">
          {/* Top Section: Main product image */}
          <div className="w-full">
            <div className="w-full aspect-square bg-white overflow-hidden relative border border-gray-100 rounded-lg shadow-sm">
              <img
                src={
                  product.mainImage ||
                  product.images?.[0] ||
                  "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png"
                }
                alt={product.name}
                className="absolute inset-0 w-full h-full object-contain object-center transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Bottom Section Wrapper for side-by-side view on lg */}
          <div className="w-full flex flex-col gap-6">

          {/* Bottom Section: Wearable Media (Images & Videos showing the product being worn) */}
          {product.wearableMedia && product.wearableMedia.length > 0 && (
            <div className="flex flex-col gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 xl:pt-4 xl:border-t border-gray-200">

              {/* Active Wearable Media Display Area */}
              <div className="w-full aspect-[4/5] lg:aspect-square xl:aspect-[4/5] bg-white overflow-hidden relative border border-gray-100 rounded-lg shadow-sm">
                {product.wearableMedia[selectedWearableIdx]?.mediaType ===
                  "video" ? (
                  <video
                    key={product.wearableMedia[selectedWearableIdx]?.url}
                    src={product.wearableMedia[selectedWearableIdx]?.url}
                    autoPlay
                    loop
                    muted
                    controls
                    playsInline
                    className="absolute inset-0 w-full h-full object-contain object-center"
                  />
                ) : (
                  <img
                    src={product.wearableMedia[selectedWearableIdx]?.url}
                    alt={`${product.name} on body`}
                    className="absolute inset-0 w-full h-full object-contain object-center"
                  />
                )}
              </div>

              {/* Thumbnails below the wearable display */}
              <div className="flex items-center justify-start gap-2 overflow-x-auto py-1">
                {product.wearableMedia.map((media, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedWearableIdx(idx)}
                    className={`w-16 h-16 bg-gray-50 border-[2px] border-solid cursor-pointer shrink-0 rounded overflow-hidden relative transition-all ${selectedWearableIdx === idx
                      ? "border-[#07512E] shadow-sm z-10"
                      : "border-transparent opacity-80 hover:opacity-100"
                      }`}
                  >
                    {media.mediaType === "video" ? (
                      <div className="w-full h-full relative">
                        <video
                          src={media.url}
                          muted
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-white fill-white"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={media.url}
                        alt={`Wearable thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Fallback to traditional multiple images gallery if wearable media is not specified */}
          {(!product.wearableMedia || product.wearableMedia.length === 0) &&
            product.images &&
            product.images.length > 1 && (
              <div className="flex flex-col gap-2">
                <span className="text-[11px] uppercase font-bold text-amber-800 tracking-widest block font-sans">
                  Additional Views
                </span>
                <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`w-16 h-14 bg-gray-50 border-[2px] border-solid cursor-pointer shrink-0 rounded overflow-hidden transition-all ${selectedImageIdx === idx
                        ? "border-[#07512E] z-10"
                        : "border-transparent hover:border-gray-200"
                        }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =========================================
            COLUMN 3: DESCRIPTION & TRUST
            ========================================= */}
        <div className="w-full xl:w-[384px] flex flex-col order-3 lg:order-3 shrink-0 text-left lg:col-span-1">
          {/* Yellowish Description Box */}
          <div className="bg-[#FFFDF4] px-6 pt-4 pb-6 sm:px-8 sm:pt-5 sm:pb-8 border border-[#F5EEDC] mb-5">
            <h2 className="text-[28px] font-medium font-serif text-[#303030] mb-4">
              Product Details
            </h2>
            <div className="w-full h-px bg-[#E5DCC5] mb-6"></div>

            <p className="text-[15px] text-[#303030] font-normal font-sans leading-relaxed mb-6">
              {product.description}
            </p>

            <h3 className="text-xs font-sans font-bold tracking-widest text-amber-700 uppercase mb-3">
              Attributes
            </h3>
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
                  <li className="flex items-start py-2 border-b border-[#E5DCC5]/30">
                    <span className="font-semibold text-gray-500">Karat :</span>
                    <select
                      value={selectedKarat}
                      onChange={(e) =>
                        handleSelectionChange("karat", e.target.value)
                      }
                      className="bg-[#FFFDF4] border border-[#E5DCC5] rounded px-2 py-0.5 text-[13px] font-sans font-medium text-gray-900 focus:border-[#07512E] outline-none text-right cursor-pointer"
                    >
                      {allKarats.map((k) => (
                        <option key={k} value={k}>
                          {k}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li className="flex justify-between items-center py-1.5 border-b border-[#E5DCC5]/30">
                    <span className="font-semibold text-gray-500">
                      Metal Color :
                    </span>
                    <select
                      value={selectedColor}
                      onChange={(e) =>
                        handleSelectionChange("metalColor", e.target.value)
                      }
                      className="bg-[#FFFDF4] border border-[#E5DCC5] rounded px-2 py-0.5 text-[13px] font-sans font-medium text-gray-900 focus:border-[#07512E] outline-none text-right cursor-pointer"
                    >
                      {allColors.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li className="flex justify-between items-center py-1.5 border-b border-[#E5DCC5]/30">
                    <span className="font-semibold text-gray-500">
                      Metal Type :
                    </span>
                    <select
                      value={selectedMetalType}
                      onChange={(e) =>
                        handleSelectionChange("metalType", e.target.value)
                      }
                      className="bg-[#FFFDF4] border border-[#E5DCC5] rounded px-2 py-0.5 text-[13px] font-sans font-medium text-gray-900 focus:border-[#07512E] outline-none text-right cursor-pointer"
                    >
                      {allMetalTypes.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li className="flex justify-between items-center py-1.5 border-b border-[#E5DCC5]/30">
                    <span className="font-semibold text-gray-500">
                      Gross Weight :
                    </span>
                    <select
                      value={selectedGrossWeight}
                      onChange={(e) =>
                        handleSelectionChange("grossWeight", e.target.value)
                      }
                      className="bg-[#FFFDF4] border border-[#E5DCC5] rounded px-2 py-0.5 text-[13px] font-sans font-medium text-gray-900 focus:border-[#07512E] outline-none text-right cursor-pointer"
                    >
                      {allGrossWeights.map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li className="flex justify-between items-center py-1.5 border-b border-[#E5DCC5]/30">
                    <span className="font-semibold text-gray-500">
                      Net Weight :
                    </span>
                    <select
                      value={selectedNetWeight}
                      onChange={(e) =>
                        handleSelectionChange("netWeight", e.target.value)
                      }
                      className="bg-[#FFFDF4] border border-[#E5DCC5] rounded px-2 py-0.5 text-[13px] font-sans font-medium text-gray-900 focus:border-[#07512E] outline-none text-right cursor-pointer"
                    >
                      {allNetWeights.map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                  </li>
                  {isRingProduct && (
                    <li className="flex justify-between py-1 border-b border-[#E5DCC5]/30">
                      <span className="font-semibold text-gray-500">
                        Ring Size :
                      </span>
                      <span className="text-gray-900 font-medium">
                        {selectedSize || "Standard"}
                      </span>
                    </li>
                  )}
                </>
              )}

              {/* General attributes (filtered to prevent duplicates) */}
              {product.attributes &&
                product.attributes
                  .filter((attr) => {
                    const keyNorm = attr.key
                      .trim()
                      .toLowerCase()
                      .replace(/\s+/g, "");
                    return ![
                      "karat",
                      "metalcolor",
                      "metaltype",
                      "grossweight",
                      "netweight",
                    ].includes(keyNorm);
                  })
                  .map((attr, idx) => (
                    <li
                      key={idx}
                      className="justify-between py-1 border-b border-[#E5DCC5]/30"
                    >
                      <span className="font-semibold text-gray-500">
                        {attr.key} :
                      </span>
                      <span className="text-gray-950 font-medium">
                        {attr.value}
                      </span>
                    </li>
                  ))}
            </ul>
          </div>

          {/* =========================================
              CUSTOMER REVIEWS SECTION
              ========================================= */}
          <div
            id="reviews-section"
            className="bg-[#FFFDF4] px-6 pt-5 pb-6 sm:px-8 sm:pt-6 sm:pb-8 border border-[#F5EEDC] mb-5 text-left font-sans"
          >
            <h2 className="text-[28px] font-medium font-serif text-[#303030] mb-4">
              Customer Reviews
            </h2>
            <div className="w-full h-px bg-[#E5DCC5] mb-6"></div>

            {/* Overall Rating Stats */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 bg-[#FAF9F5] p-5 border border-[#E5DCC5]/40 rounded">
              <div className="text-center shrink-0">
                <p className="text-4xl font-serif font-bold text-[#07512E]">
                  {averageRating}
                </p>
                <div className="flex justify-center text-[#FFDE59] my-2">
                  {renderAverageStars(averageRating, "w-5 h-5")}
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  Based on {totalRatingsCount} ratings
                </p>
              </div>

              {/* Star Progress Bars */}
              <div className="w-full space-y-1.5">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const starCount = reviews.filter(
                    (r) => r.rating === stars,
                  ).length;
                  const percent =
                    totalRatingsCount > 0
                      ? (starCount / totalRatingsCount) * 100
                      : 0;
                  return (
                    <div
                      key={stars}
                      className="flex items-center gap-3 text-xs"
                    >
                      <span className="w-8 text-gray-500 font-semibold flex items-center justify-end gap-0.5">
                        {stars}{" "}
                        <FiStar className="w-3 h-3 text-[#FFDE59] fill-[#FFDE59]" />
                      </span>
                      <div className="flex-1 h-2 bg-gray-200/80 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#07512E] transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="w-6 text-gray-400 text-right">
                        {starCount}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews List */}
            {reviewsLoading ? (
              <div className="text-center py-6 text-gray-500 text-sm">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#07512E] mx-auto mb-2"></div>
                Loading reviews...
              </div>
            ) : reviews.length > 0 ? (
              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                {reviews.map((review, idx) => {
                  const reviewerName =
                    review.name ||
                    review.user?.name ||
                    review.userName ||
                    "Verified Buyer";
                  const initials = reviewerName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase();

                  const reviewDate = review.createdAt
                    ? new Date(review.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    : "Recently";

                  return (
                    <div
                      key={review._id || idx}
                      className="border-b border-[#E5DCC5]/30 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#07512E]/10 border border-[#07512E]/20 flex items-center justify-center text-xs font-bold text-[#07512E] shrink-0">
                          {initials}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between flex-wrap gap-1 mb-1">
                            <span className="text-[14px] font-bold text-gray-900">
                              {reviewerName}
                            </span>
                            <span className="text-[11px] text-gray-400 font-sans">
                              {reviewDate}
                            </span>
                          </div>

                          <div className="flex text-[#FFDE59] mb-1.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <FiStar
                                key={i}
                                className={`w-3.5 h-3.5 ${i < (review.rating || 0)
                                  ? "fill-[#FFDE59]"
                                  : "text-gray-300"
                                  }`}
                              />
                            ))}
                          </div>

                          <p className="text-[13.5px] text-[#404040] leading-relaxed font-normal">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 bg-[#FAF9F5]/40 border border-dashed border-[#E5DCC5]/40 rounded">
                <p className="text-[14px] mb-1">
                  No reviews yet for this product.
                </p>
                <p className="text-xs text-gray-400">
                  Purchased this item? You can leave a review from your Order
                  History in your Profile dashboard.
                </p>
              </div>
            )}
          </div>

          {/* Safe Checkout & Logos */}
          {/* <div className="mb-8 pl-1">
            <div className="flex items-center gap-2 text-[#404040] text-[15px] font-medium font-sans mb-3">
              <LuShieldCheck className="w-[18px] h-[18px]" /> Safe Checkout
            </div>
            <img
              src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781762762/6220ac0f912013c51947f9c4_1_meyyn1.png"
              alt="Safe Checkout Payment Methods"
              className="h-7 w-auto"
            />
          </div> */}

          {/* Find in store box */}
          {/* <div className="border border-gray-200 p-5 flex items-center gap-4">
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
          </div> */}
        </div>
      </div>
      <YouMayAlsoLike
        categoryId={product?.category?._id || product?.categories?.[0]?._id}
        currentProductId={product?._id}
      />
    </div>
  );
}
