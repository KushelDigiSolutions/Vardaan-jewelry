"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FiSliders,
  FiHeart,
  FiX,
  FiCheck,
  FiShoppingBag,
  FiSearch,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function ShopProducts() {
  const { addToCart, cartItems } = useCart();
  const { token } = useAuth();
  const toast = useToast();
  const searchParams = useSearchParams();
  const categorySlugParam = searchParams ? searchParams.get("category") : null;

  // Categories list & selection states
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all"); // 'all' or category ID

  // React to category query param in the URL
  useEffect(() => {
    if (categorySlugParam && categories.length > 0) {
      setCategoriesReady(false); // reset while resolving
      const normalizeStr = (str) => {
        if (!str) return "";
        return str
          .toLowerCase()
          .replace(/[^a-z0-9]/g, ""); // remove spaces, hyphens, and other special characters
      };

      const paramNormalized = normalizeStr(categorySlugParam);

      // 1. Try exact or direct slug/name match (normalized)
      let matched = categories.find(
        (cat) =>
          normalizeStr(cat.slug) === paramNormalized ||
          normalizeStr(cat.name) === paramNormalized,
      );

      // 2. Try singular/plural normalization match
      if (!matched) {
        matched = categories.find((cat) => {
          const catSlugNorm = normalizeStr(cat.slug);
          const catNameNorm = normalizeStr(cat.name);

          const paramSingular = paramNormalized.replace(/s$/, ""); // rings -> ring
          const catSingular = catSlugNorm.replace(/s$/, "");
          const catNameSingular = catNameNorm.replace(/s$/, "");

          // Also strip 'es' for words like watches -> watch
          const paramSingularEs = paramNormalized.replace(/es$/, "");
          const catSingularEs = catSlugNorm.replace(/es$/, "");
          const catNameSingularEs = catNameNorm.replace(/es$/, "");

          return (
            paramSingular === catSingular ||
            paramSingular === catNameSingular ||
            paramSingularEs === catSingularEs ||
            paramSingularEs === catNameSingularEs ||
            catSlugNorm.startsWith(paramSingular) ||
            catNameNorm.startsWith(paramSingular) ||
            paramNormalized.startsWith(catSingular) ||
            paramNormalized.startsWith(catNameSingular)
          );
        });
      }

      // 3. Custom mappings (like necklace set -> sets/necklaces, jhumka -> earrings, wedding -> bridal, ring -> rings)
      if (!matched) {
        if (paramNormalized.includes("necklaceset") || paramNormalized.includes("necklace")) {
          matched = categories.find(
            (cat) =>
              normalizeStr(cat.slug) === "sets" ||
              normalizeStr(cat.slug) === "necklaces" ||
              normalizeStr(cat.name).includes("set") ||
              normalizeStr(cat.name).includes("necklace"),
          );
        } else if (paramNormalized.includes("jhumka") || paramNormalized.includes("earring")) {
          matched = categories.find(
            (cat) =>
              normalizeStr(cat.slug) === "earrings" ||
              normalizeStr(cat.name).includes("earring"),
          );
        } else if (paramNormalized.includes("wedding") || paramNormalized.includes("marriage")) {
          matched = categories.find(
            (cat) =>
              normalizeStr(cat.slug) === "bridal" ||
              normalizeStr(cat.name).includes("bridal") ||
              normalizeStr(cat.name).includes("wedding"),
          );
        } else if (paramNormalized === "ring" || paramNormalized === "rings") {
          matched = categories.find(
            (cat) =>
              normalizeStr(cat.slug) === "rings" ||
              normalizeStr(cat.slug) === "ring" ||
              normalizeStr(cat.name) === "rings" ||
              normalizeStr(cat.name) === "ring",
          );
        }
      }

      if (matched) {
        setSelectedCategory(matched._id);
        setCurrentPage(1);
        setIsActive(true);
        setFilterShow(matched.name);
      } else {
        // Fallback to text search if no category ID matches the URL query param
        setSelectedCategory("all");
        
        let searchKeyword = categorySlugParam;
        const normParam = paramNormalized;
        if (normParam.includes("officewear") || normParam.includes("office")) {
          searchKeyword = "office";
        } else if (normParam.includes("everydaywear") || normParam.includes("everyday")) {
          searchKeyword = "everyday";
        } else if (normParam.includes("datenight") || normParam.includes("date")) {
          searchKeyword = "date";
        } else if (normParam.includes("travelessential") || normParam.includes("travel")) {
          searchKeyword = "travel";
        } else if (normParam.includes("festive")) {
          searchKeyword = "festive";
        } else if (normParam.includes("sangeet")) {
          searchKeyword = "sangeet";
        } else if (normParam.includes("haldi")) {
          searchKeyword = "haldi";
        } else if (normParam.includes("partylook") || normParam.includes("party")) {
          searchKeyword = "party";
        }

        setSearch(searchKeyword);
        setSearchInput(searchKeyword);
        setCurrentPage(1);
        setIsActive(true);
        setFilterShow(categorySlugParam);
      }
      // Mark categories as resolved so fetchProducts can proceed
      setCategoriesReady(true);
    } else if (!categorySlugParam && categories.length > 0) {
      setSelectedCategory("all");
      setCategoriesReady(true);
    } else if (!categorySlugParam) {
      // No category param at all, always ready
      setCategoriesReady(true);
    }
  }, [categorySlugParam, categories]);

  // Products listing states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters & sorting states
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [priceFilter, setPriceFilter] = useState("all"); // 'all' | 'under-2k' | 'over-2k'
  const [sortOrder, setSortOrder] = useState("newest"); // 'newest' | 'price_asc' | 'price_desc'
  const [isActive, setIsActive] = useState(false);
  const [filterShow, setFilterShow] = useState("");

  // UI states
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [favorites, setFavorites] = useState({}); // { [prodId]: true/false }
  const [cartState, setCartState] = useState({}); // visual feedback for add button

  // Fetch Categories List
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/categories`);
        if (res.ok) {
          const json = await res.json();
          setCategories(Array.isArray(json) ? json : json?.data || []);
        }
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Wishlist items if logged in to display filled hearts
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token) {
        setFavorites({});
        return;
      }
      try {
        const res = await fetch(`${API_URL}/auth/wishlist`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const json = await res.json();
          const favObj = {};
          const wishlistItems = Array.isArray(json) ? json : json?.data || [];
          wishlistItems.forEach((item) => {
            if (item.product?._id) {
              favObj[item.product._id] = true;
            } else if (item._id) {
              favObj[item._id] = true;
            }
          });
          setFavorites(favObj);
        }
      } catch (err) {
        console.error("Error loading wishlist:", err);
      }
    };
    fetchWishlist();
  }, [token]);

  const minPriceParam = searchParams ? searchParams.get("minPrice") : null;
  const maxPriceParam = searchParams ? searchParams.get("maxPrice") : null;

  // Track whether categories have been resolved for the current URL param
  const [categoriesReady, setCategoriesReady] = useState(false);

  // Fetch Products based on current filters
  const fetchProducts = useCallback(async () => {
    // If a category param is in the URL but categories haven't loaded yet, wait.
    // This prevents fetching all-products before the filter is resolved.
    if (categorySlugParam && !categoriesReady) return;

    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", currentPage);
      params.append("limit", 9); // Grid layout limit

      if (selectedCategory !== "all") {
        params.append("category", selectedCategory);
      }

      if (search.trim()) {
        params.append("search", search.trim());
      }

      if (minPriceParam) {
        params.append("minPrice", minPriceParam);
      } else if (priceFilter === "over-2k") {
        params.append("minPrice", 2000);
      }

      if (maxPriceParam) {
        params.append("maxPrice", maxPriceParam);
      } else if (priceFilter === "under-2k") {
        params.append("maxPrice", 2000);
      }

      if (sortOrder !== "price-range") {
        params.append("sort", sortOrder);
      }

      const res = await fetch(`${API_URL}/products?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        setProducts(json.data.products || []);
        setTotalResults(json.data.pagination?.total || 0);
        setTotalPages(json.data.pagination?.pages || 1);
      }
    } catch (err) {
      console.error("Failed to load products list:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategory, search, priceFilter, sortOrder, minPriceParam, maxPriceParam, categorySlugParam, categoriesReady]);

  // Trigger load when filters update
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Toggle favorite / wishlist status
  const toggleFavorite = async (productId) => {
    if (!token) {
      toast.error("Please log in to manage your wishlist!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      return;
    }

    const isFav = !!favorites[productId];

    // Optimistic UI updates
    setFavorites((prev) => ({ ...prev, [productId]: !isFav }));

    try {
      const endpoint = isFav ? "remove" : "add";
      const res = await fetch(`${API_URL}/auth/wishlist/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        toast.success(isFav ? "Removed from wishlist!" : "Added to wishlist!");
      } else {
        // Rollback state if api fails
        setFavorites((prev) => ({ ...prev, [productId]: isFav }));
        toast.error("Failed to update wishlist.");
      }
    } catch (err) {
      console.error("Failed to toggle wishlist item:", err);
      setFavorites((prev) => ({ ...prev, [productId]: isFav }));
      toast.error("Failed to update wishlist.");
    }
  };

  // Add to cart with visual loader feedback
  const handleAddToCart = (product) => {
    const id = product._id;
    setCartState((prev) => ({ ...prev, [id]: true }));
    addToCart(product, 1, "50");

    setTimeout(() => {
      setCartState((prev) => ({ ...prev, [id]: false }));
    }, 3000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const value = searchInput.trim();

      if (value.length >= 3) {
        setSearch(value);
        setCurrentPage(1);
      } else if (value.length < 3) {
        setSearch("");
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setCurrentPage(1);
  };

  // console.log("IS ACTIVE : " , isActive)

  return (
    <section className="py-8 bg-[#FFFDF9] ">
      <div className="w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0">
        {/* Dynamic Search Bar */}
        <div className="mb-6 flex justify-center">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center w-full max-w-[480px] bg-white border border-[#F0ECE3] rounded shadow-sm overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search fine jewelry products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-grow px-4 py-2.5 text-[16px] text-gray-800 focus:outline-none placeholder-gray-400 bg-transparent font-sans"
            />
            {searchInput.length >= 1 && (
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-800 flex items-center justify-center cursor-pointer mr-2 shrink-0 bg-transparent border-none outline-none"
                onClick={() => setSearchInput("")}
                aria-label="Clear search"
              >
                <FiX className="w-5 h-5 stroke-[2.5]" />
              </button>
            )}

            <button
              type="submit"
              className="bg-[#07512E] hover:bg-[#054024] text-white px-5 py-3.5 transition-colors cursor-pointer flex items-center justify-center"
            >
              <FiSearch className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Filter Controls Banner */}
        <div className="bg-[#0A5230] text-white py-3 px-4 md:px-6 flex sm:flex-row flex-col items-start sm:items-center justify-between shadow-md mb-8 relative z-20 gap-4">
          <div className="flex gap-4 flex-wrap items-center">
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="border border-white rounded px-4 py-2 hover:bg-white/10 transition-colors flex items-center gap-2 text-sm sm:text-[17px] font-sans tracking-wider font-medium cursor-pointer"
            >
              <FiSliders className="w-4 h-4" />
              <span>Filters</span>
            </button>
            {isActive && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceFilter("all");
                  setSearch("");
                  setSearchInput("");
                  setCurrentPage(1);
                  setIsActive(false);
                }}
                className={` border border-white rounded px-4 py-2 hover:bg-white/10 transition-colors flex items-center gap-2 text-sm sm:text-[17px] font-sans tracking-wider font-medium cursor-pointer ${isActive ? "" : "disabled: opacity-50 disabled:pointer-events-none"} `}
              >
                {/* <FiSliders className="w-4 h-4" /> */}
                <span>{filterShow}</span>{" "}
                <span>
                  <FiX className="w-5 h-5" />{" "}
                </span>
              </button>
            )}
            {search.trim() && (
              <button
                onClick={() => {
                  setSearch("");
                  setSearchInput("");
                  setCurrentPage(1);
                }}
                className="border border-white rounded px-4 py-2 hover:bg-white/10 transition-colors flex items-center gap-2 text-sm sm:text-[17px] font-sans tracking-wider font-medium cursor-pointer bg-white/10"
                title="Clear search text"
              >
                <span>{search}</span>
                <span>
                  <FiX className="w-5 h-5" />
                </span>
              </button>
            )}
            {(minPriceParam || maxPriceParam) && (
              <button
                onClick={() => {
                  window.location.href = "/shop";
                }}
                className="border border-white rounded px-4 py-2 hover:bg-white/10 transition-colors flex items-center gap-2 text-sm sm:text-[17px] font-sans tracking-wider font-medium cursor-pointer bg-white/10"
                title="Clear price filter"
              >
                <span>
                  {minPriceParam && maxPriceParam
                    ? `₹${minPriceParam} - ₹${maxPriceParam}`
                    : minPriceParam
                    ? `₹${minPriceParam} & Above`
                    : `Under ₹${maxPriceParam}`}
                </span>
                <span>
                  <FiX className="w-5 h-5" />
                </span>
              </button>
            )}

            {/* If no filter is selected, show Price Sort Dropdown next to Filters button */}
            {!isActive && !search.trim() && (
              <div className="relative">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-1.5 border border-white rounded px-3.5 py-2 text-sm sm:text-[17px] bg-[#07512E] hover:bg-white/10 transition-colors cursor-pointer font-sans font-medium text-white"
                >
                  <span className="text-white/80 font-light hidden sm:inline">
                    Sort by:{" "}
                  </span>
                  <span>
                    {sortOrder === "newest" && "Newest"}
                    {sortOrder === "price_asc" && "Price: Low to High"}
                    {sortOrder === "price_desc" && "Price: High to Low"}
                  </span>
                  <svg
                    className={`fill-current h-3.5 w-3.5 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </button>

                {isSortOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30 cursor-default"
                      onClick={() => setIsSortOpen(false)}
                    />
                    <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-56 bg-white border border-[#F0ECE3] shadow-2xl rounded-md z-40 overflow-hidden text-left py-1 text-gray-800">
                      {[
                        { id: "newest", label: "Newest" },
                        { id: "price_asc", label: "Price: Low to High" },
                        { id: "price_desc", label: "Price: High to Low" },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setSortOrder(opt.id);
                            setCurrentPage(1);
                            setIsSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer flex items-center justify-between ${
                            sortOrder === opt.id
                              ? "bg-[#07512E]/10 text-[#07512E] font-semibold"
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <span>{opt.label}</span>
                          {sortOrder === opt.id && (
                            <FiCheck className="text-[#07512E] w-4 h-4 stroke-[2.5]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 justify-between w-full sm:w-auto">
            <span className="text-sm md:text-[17px] tracking-wide text-white/90 font-serif font-light">
              ({totalResults} total results)
            </span>

            {/* Custom Sort Dropdown (shown here when a filter IS selected) */}
            {(isActive || search.trim()) && (
              <div className="relative">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-1.5 border border-white rounded px-3.5 py-2 text-sm sm:text-[17px] bg-[#07512E] hover:bg-white/10 transition-colors cursor-pointer font-sans font-medium text-white"
                >
                  <span className="text-white/80 font-light hidden sm:inline">
                    Sort by:{" "}
                  </span>
                  <span>
                    {sortOrder === "newest" && "Newest"}
                    {sortOrder === "price_asc" && "Price: Low to High"}
                    {sortOrder === "price_desc" && "Price: High to Low"}
                  </span>
                  <svg
                    className={`fill-current h-3.5 w-3.5 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </button>

                {isSortOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30 cursor-default"
                      onClick={() => setIsSortOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-[#F0ECE3] shadow-2xl rounded-md z-40 overflow-hidden text-left py-1 text-gray-800">
                      {[
                        { id: "newest", label: "Newest" },
                        { id: "price_asc", label: "Price: Low to High" },
                        { id: "price_desc", label: "Price: High to Low" },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setSortOrder(opt.id);
                            setCurrentPage(1);
                            setIsSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer flex items-center justify-between ${
                            sortOrder === opt.id
                              ? "bg-[#07512E]/10 text-[#07512E] font-semibold"
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <span>{opt.label}</span>
                          {sortOrder === opt.id && (
                            <FiCheck className="text-[#07512E] w-4 h-4 stroke-[2.5]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#07512E] mx-auto mb-4"></div>
            <p className="text-gray-500 font-sans">
              Retrieving fine jewelry items...
            </p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-[#F0ECE3] flex flex-col group overflow-hidden transition-all duration-300 relative"
              >
                {/* Heart / Wishlist Toggle */}
                <button
                  onClick={() => toggleFavorite(product._id)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 shadow-sm backdrop-blur-sm flex items-center justify-center text-white hover:text-red-500 transition-all duration-300 cursor-pointer"
                  aria-label="Toggle Wishlist"
                >
                  <FiHeart
                    className={`w-4.5 h-4.5 ${favorites[product._id] ? "fill-red-500 text-red-500" : "text-white"}`}
                    strokeWidth={2.5}
                  />
                </button>

                {/* Aspect-square Product Image */}
                <Link
                  href={`/product/${product._id}`}
                  className="relative aspect-square w-full bg-[#FAF9F6] overflow-hidden block"
                >
                  <img
                    src={
                      product.images?.[0] ||
                      "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png"
                    }
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/[0.02] pointer-events-none" />
                </Link>

                {/* Details */}
                <div className="p-5 flex flex-col flex-grow text-left">
                  <Link href={`/product/${product._id}`}>
                    <h3 className="font-sans text-[#303030] text-[20px] sm:text-[22px] font-medium leading-snug mb-3 min-h-[56px] line-clamp-2 hover:text-[#07512E] transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-[#07512E] font-medium text-[16px] mb-6">
                    ₹{" "}
                    {(product.salePrice || product.price).toLocaleString(
                      "en-IN",
                    )}
                  </p>

                  <div className="mt-auto flex flex-col gap-2">
                    {product.inventory <= 0 ? (
                      <button
                        onClick={() => toggleFavorite(product._id)}
                        className="w-full bg-[#E5DCC5] text-[#303030] hover:bg-[#d9cfb4] font-sans font-medium text-[18px] py-3 transition-colors cursor-pointer text-center flex items-center justify-center gap-2"
                      >
                        <FiHeart className={favorites[product._id] ? "fill-red-500 text-red-500" : ""} />
                        {favorites[product._id] ? "In Wishlist" : "Add to Wishlist"}
                      </button>
                    ) : (
                      <Link
                        href={`/product/${product._id}`}
                        className="w-full bg-[#FFDE59] text-[#101010] hover:bg-[#e6c543] font-sans font-medium text-[18px] py-3 transition-colors cursor-pointer text-center block"
                      >
                        Shop Now
                      </Link>
                    )}
                    {product.inventory <= 0 ? (
                      <button
                        disabled
                        className="w-full border-2 border-gray-300 text-gray-400 bg-gray-50 font-sans font-medium text-[18px] py-3 cursor-not-allowed text-center"
                      >
                        Out of Stock
                      </button>
                    ) : cartItems && cartItems.some((item) => item.id === product._id) ? (
                      <Link
                        href="/cart"
                        className="w-full border-2 border-[#07512E] bg-[#07512E] text-white hover:bg-[#054024] hover:border-[#054024] font-sans font-medium text-[18px] py-3 transition-all cursor-pointer text-center block"
                      >
                        View Cart
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`w-full border-2 border-[#07512E] text-[#07512E] hover:bg-[#07512E] hover:text-white font-sans font-medium text-[18px] py-3 transition-all cursor-pointer text-center ${cartState[product._id] ? "bg-[#07512E] text-white" : "bg-transparent"}`}
                      >
                        {cartState[product._id] ? (
                          <span className="flex items-center justify-center gap-1.5">
                            {/* <FiCheck className="stroke-[3]" />  */}
                            Adding to Cart
                          </span>
                        ) : (
                          "Add to Cart"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-gray-100 p-8 mb-12">
            <h3 className="text-xl font-serif text-gray-800 mb-2">
              No items found
            </h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              No products found matching your filter selection. Try modifying
              your criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setPriceFilter("all");
                setSearch("");
                setSearchInput("");
                setCurrentPage(1);
              }}
              className="mt-6 bg-[#07512E] text-white px-6 py-2.5 text-sm uppercase tracking-wider font-serif hover:bg-[#04361E] transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between w-full pb-4 border-[#F0ECE3] mt-12 text-gray-950 font-sans">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 transition-colors cursor-pointer text-[15px] sm:text-[18px] ${currentPage === 1 ? "opacity-35 cursor-not-allowed text-gray-400" : "text-gray-900 hover:text-[#0A5230]"}`}
            >
              <span className="text-[17px] sm:text-[20px]">←</span> Previous
            </button>

            <div className="flex items-center gap-2 sm:gap-6 text-[15px] sm:text-[18px]">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${currentPage === index + 1 ? "bg-[#0A5230] text-white font-medium" : "text-gray-800 hover:bg-gray-100"}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 transition-colors cursor-pointer text-[15px] sm:text-[18px] ${currentPage === totalPages ? "opacity-35 cursor-not-allowed text-gray-400" : "text-gray-900 hover:text-[#0A5230]"}`}
            >
              Next <span className="text-[17px] sm:text-[20px]">→</span>
            </button>
          </div>
        )}
      </div>

      {/* Slide-out Sidebar Filters (Drawer) */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-100 flex justify-end animate-fade-in">
          <div
            onClick={() => setIsFilterDrawerOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity cursor-pointer"
          />
          <div className="relative w-80 max-w-[85vw] bg-white h-full z-10 shadow-2xl flex flex-col p-6 border-l border-gray-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h2 className="text-xl font-serif text-[#07512E] tracking-wider uppercase font-semibold">
                Filters
              </h2>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-1.5 text-gray-500 hover:text-[#07512E] transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto space-y-8 pr-1">
              {/* Category Filter */}
              <div>
                <h3 className="text-xs font-sans font-bold tracking-widest text-gray-400 uppercase mb-3">
                  Category
                </h3>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setCurrentPage(1);
                    }}
                    className={`text-left text-sm py-1.5 px-3 transition-colors cursor-pointer  ${selectedCategory === "all" ? "bg-[#07512E]/10 text-[#07512E] font-medium border-l-2 border-[#07512E]" : "text-gray-600 hover:text-[#07512E]"}`}
                  >
                    All Items
                  </button>
                  {categories
                    .filter((cat) => !cat.parentCategory)
                    .map((cat) => {
                      const children = categories.filter(
                        (item) => item.parentCategory?._id === cat._id,
                      );

                      const hasChildren = children.length > 0;

                      return (
                        <div key={cat._id}>
                          {hasChildren ? (
                            <details>
                              <summary
                                className={`cursor-pointer py-2 px-3 ${
                                  selectedCategory === cat._id
                                    ? "bg-[#07512E]/10 text-[#07512E] font-medium border-l-2 border-[#07512E]"
                                    : "text-gray-600 hover:text-[#07512E]"
                                }`}
                                onClick={() => {
                                  setSelectedCategory(cat._id);
                                  setFilterShow(cat.name);
                                  setCurrentPage(1);
                                  setIsActive(true);
                                }}
                              >
                                {cat.name}
                              </summary>

                              <div className="ml-4">
                                {/* Parent Category */}
                                {/* <button
                onClick={() => {
                  setSelectedCategory(cat._id);
                  setCurrentPage(1);
                  setIsActive(true);
                }}
                className={`block w-full text-left py-2 px-3 cursor-pointer ${
                  selectedCategory === cat._id
                    ? "bg-[#07512E]/10 text-[#07512E] font-medium border-l-2 border-[#07512E]"
                    : "text-gray-600 hover:text-[#07512E]"
                }`}
              >
                All {cat.name}
              </button> */}

                                {/* Child Categories */}
                                {children.map((child) => (
                                  <button
                                    key={child._id}
                                    onClick={() => {
                                      setSelectedCategory(child._id);
                                      setCurrentPage(1);
                                      setFilterShow(child.name);
                                      setIsActive(true);
                                    }}
                                    className={`block w-full text-left py-2 px-3 cursor-pointer ${
                                      selectedCategory === child._id
                                        ? "bg-[#07512E]/10 text-[#07512E] font-medium border-l-2 border-[#07512E]"
                                        : "text-gray-600 hover:text-[#07512E]"
                                    }`}
                                  >
                                    {child.name}
                                  </button>
                                ))}
                              </div>
                            </details>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedCategory(cat._id);
                                setCurrentPage(1);
                                setFilterShow(cat.name);
                                setIsActive(true);
                              }}
                              className={`block w-full text-left py-2 px-3 cursor-pointer ${
                                selectedCategory === cat._id
                                  ? "bg-[#07512E]/10 text-[#07512E] font-medium border-l-2 border-[#07512E]"
                                  : "text-gray-600 hover:text-[#07512E]"
                              }`}
                            >
                              {cat.name}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  {/* {categories.map((cat) => (
                    
                    <button
                      key={cat._id}
                      onClick={() => {
                        setSelectedCategory(cat._id);
                        setCurrentPage(1);
                        setIsActive(true)
                      }}
                      className={`text-left text-sm py-1.5 px-3 transition-colors cursor-pointer  ${selectedCategory === cat._id ? "bg-[#07512E]/10 text-[#07512E] font-medium border-l-2 border-[#07512E]" : "text-gray-600 hover:text-[#07512E]"}`}
                    >
                      {cat.name}
                    </button>
                  ))} */}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-xs font-sans font-bold tracking-widest text-gray-400 uppercase mb-3">
                  Price Limit
                </h3>
                <div className="flex flex-col gap-2">
                  {[
                    { id: "all", label: "All Prices" },
                    { id: "under-2k", label: "Under ₹ 2,000" },
                    { id: "over-2k", label: "₹ 2,000 & Above" },
                  ].map((range) => (
                    <button
                      key={range.id}
                      onClick={() => {
                        setPriceFilter(range.id);
                        setCurrentPage(1);
                        setFilterShow(range.label);
                        setIsActive(true);
                      }}
                      className={`text-left text-sm py-1.5 px-3 transition-colors cursor-pointer ${priceFilter === range.id ? "bg-[#07512E]/10 text-[#07512E] font-medium border-l-2 border-[#07512E]" : "text-gray-600 hover:text-[#07512E]"}`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-6 flex gap-3">
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceFilter("all");
                  setSearch("");
                  setSearchInput("");
                  setCurrentPage(1);
                  setIsFilterDrawerOpen(false);
                }}
                className="flex-1 border border-gray-200 text-gray-600 py-2.5 text-xs font-serif uppercase tracking-widest hover:border-gray-400 transition-colors cursor-pointer text-center"
              >
                Clear All
              </button>
              {/* <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="flex-1 bg-[#07512E] text-white py-2.5 text-xs font-serif uppercase tracking-widest hover:bg-[#04361E] transition-colors cursor-pointer text-center"
              >
                Apply
              </button> */}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
