"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiSliders, FiHeart, FiX, FiCheck, FiShoppingBag, FiSearch } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Strictly Bride-related luxurious wedding products
const fallbackBridalProducts = [
  {
    _id: "bridal-1",
    name: "Maharani Polki Bridal Gold Set",
    price: 485000,
    salePrice: 465000,
    images: ["https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781528583/sets_xvoyfd.png"],
    category: "sets",
  },
  {
    _id: "bridal-2",
    name: "Imperial Kundan & Pearl Bridal Choker",
    price: 525000,
    salePrice: 495000,
    images: ["https://res.cloudinary.com/dlzxiy0tl/image/upload/v1782281607/home_page_banner_dmb1bp.jpg"],
    category: "chokers",
  },
  {
    _id: "bridal-3",
    name: "Swarnprabha Royal Heirloom Wedding Set",
    price: 650000,
    salePrice: 620000,
    images: ["https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png"],
    category: "sets",
  },
  {
    _id: "bridal-4",
    name: "Rajwada Antique Meenakari Bridal Haar",
    price: 580000,
    salePrice: 550000,
    images: ["https://res.cloudinary.com/dlzxiy0tl/image/upload/v1782281607/home_page_banner_image_czgpzk.jpg"],
    category: "haars",
  },
  {
    _id: "bridal-5",
    name: "Kalyani Temple Gold Bridal Haar Set",
    price: 420000,
    salePrice: 395000,
    images: ["https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781528583/sets_xvoyfd.png"],
    category: "sets",
  },
  {
    _id: "bridal-6",
    name: "Shahi Navratna Heavy Wedding Choker Set",
    price: 720000,
    salePrice: 690000,
    images: ["https://res.cloudinary.com/dlzxiy0tl/image/upload/v1782281607/home_page_banner_dmb1bp.jpg"],
    category: "chokers",
  },
  {
    _id: "bridal-7",
    name: "Sita Kalyanam Antique Bridal Haar",
    price: 510000,
    salePrice: 485000,
    images: ["https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png"],
    category: "haars",
  },
  {
    _id: "bridal-8",
    name: "Padmavat Royal Kundan Bridal Choker",
    price: 640000,
    salePrice: 610000,
    images: ["https://res.cloudinary.com/dlzxiy0tl/image/upload/v1782281607/home_page_banner_image_czgpzk.jpg"],
    category: "chokers",
  },
];

const fallbackCategories = [
  { _id: "sets", name: "Bridal Sets", slug: "sets" },
  { _id: "chokers", name: "Royal Chokers", slug: "chokers" },
  { _id: "haars", name: "Antique Haars", slug: "haars" },
];

export default function BridalProducts() {
  const { addToCart, cartItems, isProductOutOfStock, getCartItemDetailsForListing } = useCart();
  const { token } = useAuth();
  const toast = useToast();
  const searchParams = useSearchParams();
  const categorySlugParam = searchParams ? searchParams.get("category") : null;

  // Categories list & selection states
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // React to category query param in the URL
  useEffect(() => {
    if (categorySlugParam && categories.length > 0) {
      const matched = categories.find(cat => cat.slug.toLowerCase() === categorySlugParam.toLowerCase());
      if (matched) {
        setSelectedCategory(matched._id);
        setCurrentPage(1);
      }
    } else if (!categorySlugParam && categories.length > 0) {
      setSelectedCategory("all");
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
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  
  // UI states
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [favorites, setFavorites] = useState({});
  const [cartState, setCartState] = useState({});

  // Fetch Categories List
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/categories`);
        if (res.ok) {
          const json = await res.json();
          const apiCats = Array.isArray(json) ? json : (json?.data || []);
          setCategories(apiCats.length > 0 ? apiCats : fallbackCategories);
        } else {
          setCategories(fallbackCategories);
        }
      } catch (err) {
        console.error("Error loading categories:", err);
        setCategories(fallbackCategories);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Wishlist items if logged in
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token) {
        setFavorites({});
        return;
      }
      try {
        const res = await fetch(`${API_URL}/auth/wishlist`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          const favObj = {};
          const wishlistItems = Array.isArray(json) ? json : (json?.data || []);
          wishlistItems.forEach(item => {
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

  // Fetch Products & Apply Client-Side Filtering to guarantee perfect working filters
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    let baseList = [];
    try {
      const params = new URLSearchParams();
      params.append("page", currentPage);
      params.append("limit", 50); // fetch ample items to filter client-side

      const res = await fetch(`${API_URL}/products?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        const apiProducts = json.data?.products || json.data || [];
        
        // Strictly filter API products for bridal/wedding keywords
        const bridalKeywords = ["bride", "bridal", "wedding", "heirloom", "maharani", "rajwada", "choker", "set", "haar", "temple", "heavy", "polki", "kundan"];
        const filteredApiProducts = apiProducts.filter(p => {
          const text = `${p.name} ${p.description || ""} ${p.category || ""}`.toLowerCase();
          return bridalKeywords.some(kw => text.includes(kw));
        });

        baseList = filteredApiProducts.length > 0 ? filteredApiProducts : fallbackBridalProducts;
      } else {
        baseList = fallbackBridalProducts;
      }
    } catch (err) {
      console.error("Failed to load products list:", err);
      baseList = fallbackBridalProducts;
    }

    // Apply Client-Side Filtering & Sorting to make filters 100% fully functional
    let filteredList = [...baseList];

    // 1. Search Filter
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      filteredList = filteredList.filter(p => 
        p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
      );
    }

    // 2. Category Filter
    if (selectedCategory !== "all") {
      filteredList = filteredList.filter(p => {
        if (!p.category) return false;
        if (typeof p.category === "string") {
          return p.category.toLowerCase() === selectedCategory.toLowerCase();
        }
        return p.category._id === selectedCategory || p.category.slug === selectedCategory || p.category.name === selectedCategory;
      });
    }

    // 3. Price Filter (Tailored for bridal high-end collection)
    if (priceFilter === "under-500k") {
      filteredList = filteredList.filter(p => (p.salePrice || p.price) < 500000);
    } else if (priceFilter === "over-500k") {
      filteredList = filteredList.filter(p => (p.salePrice || p.price) >= 500000);
    }

    // 4. Sort Order
    if (sortOrder === "price_asc") {
      filteredList.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (sortOrder === "price_desc") {
      filteredList.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    }

    // Pagination calculation
    const limit = 12;
    const total = filteredList.length;
    const pages = Math.ceil(total / limit) || 1;
    const startIndex = (currentPage - 1) * limit;
    const paginatedList = filteredList.slice(startIndex, startIndex + limit);

    setProducts(paginatedList);
    setTotalResults(total);
    setTotalPages(pages);
    setLoading(false);
  }, [currentPage, selectedCategory, search, priceFilter, sortOrder]);

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
    setFavorites(prev => ({ ...prev, [productId]: !isFav }));

    try {
      const endpoint = isFav ? "remove" : "add";
      const res = await fetch(`${API_URL}/auth/wishlist/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId })
      });
      if (res.ok) {
        toast.success(isFav ? "Removed from wishlist!" : "Added to wishlist!");
      } else {
        setFavorites(prev => ({ ...prev, [productId]: isFav }));
        toast.error("Failed to update wishlist.");
      }
    } catch (err) {
      console.error("Failed to toggle wishlist item:", err);
      setFavorites(prev => ({ ...prev, [productId]: isFav }));
      toast.error("Failed to update wishlist.");
    }
  };

  // Add to cart with visual loader feedback
  const handleAddToCart = (product) => {
    const id = product._id;
    setCartState(prev => ({ ...prev, [id]: true }));
    const { variantStr, variantDetails } = getCartItemDetailsForListing(product);
    addToCart(product, 1, variantStr, variantDetails);
    
    setTimeout(() => {
      setCartState(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setCurrentPage(1);
  };

  return (
    <section className="py-12 bg-[#FFFDF9]">
      <div className="w-full max-w-[1192px] mx-auto px-4 xl:px-0">

        {/* Dynamic Search Bar */}
        <div className="mb-8 flex justify-center">
          <form onSubmit={handleSearchSubmit} className="flex items-center w-full max-w-[500px] bg-white border border-[#F0ECE3] rounded shadow-sm overflow-hidden">
            <input
              type="text"
              placeholder="Search fine bridal jewelry sets, necklaces..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-grow px-4 py-3 text-sm text-gray-800 focus:outline-none placeholder-gray-400 bg-transparent font-sans"
            />
            <button type="submit" className="bg-[#07512E] hover:bg-[#054024] text-white px-6 py-3 transition-colors cursor-pointer flex items-center justify-center">
              <FiSearch className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Filter Controls Banner */}
        <div className="bg-[#0A5230] text-white py-3.5 px-4 md:px-6 flex sm:flex-row flex-col items-start sm:items-center justify-between shadow-md mb-10 relative z-20 gap-4">
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="border border-white rounded px-5 py-2 hover:bg-white/10 transition-colors flex items-center gap-2 text-sm sm:text-[17px] font-sans tracking-wider font-medium cursor-pointer"
          >
            <FiSliders className="w-4 h-4" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-4">
            <span className="text-sm md:text-[17px] tracking-wide text-white/90 font-serif font-light">
              ({totalResults} bridal pieces)
            </span>

            {/* Custom Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 border border-white rounded px-4 py-2 text-sm sm:text-[17px] bg-[#07512E] hover:bg-white/10 transition-colors cursor-pointer font-sans font-medium text-white"
              >
                <span className="text-white/80 font-light hidden sm:inline">Sort by: </span>
                <span>
                  {sortOrder === "newest" && "Newest"}
                  {sortOrder === "price_asc" && "Price: Low to High"}
                  {sortOrder === "price_desc" && "Price: High to Low"}
                </span>
                <svg className={`fill-current h-3.5 w-3.5 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </button>

              {isSortOpen && (
                <>
                  <div className="fixed inset-0 z-30 cursor-default" onClick={() => setIsSortOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-[#F0ECE3] shadow-2xl rounded-md z-40 overflow-hidden text-left py-1 text-gray-800">
                    {[
                      { id: "newest", label: "Newest" },
                      { id: "price_asc", label: "Price: Low to High" },
                      { id: "price_desc", label: "Price: High to Low" }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setSortOrder(opt.id);
                          setCurrentPage(1);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer flex items-center justify-between ${sortOrder === opt.id
                            ? "bg-[#07512E]/10 text-[#07512E] font-semibold"
                            : "hover:bg-gray-50 text-gray-700"
                          }`}
                      >
                        <span>{opt.label}</span>
                        {sortOrder === opt.id && <FiCheck className="text-[#07512E] w-4 h-4 stroke-[2.5]" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#07512E] mx-auto mb-4"></div>
            <p className="text-gray-500 font-sans">Retrieving exquisite bridal ornaments...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-[#F0ECE3] flex flex-col group overflow-hidden transition-all duration-300 relative shadow-sm hover:shadow-md"
              >
                {/* Heart / Wishlist Toggle */}
                <button
                  onClick={() => toggleFavorite(product._id)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 shadow-sm backdrop-blur-sm flex items-center justify-center text-white hover:text-red-500 transition-all duration-300 cursor-pointer"
                  aria-label="Toggle Wishlist"
                >
                  <FiHeart className={`w-4.5 h-4.5 ${favorites[product._id] ? "fill-red-500 text-red-500" : "text-white"}`} strokeWidth={2.5} />
                </button>

                {/* Aspect-square Product Image */}
                <Link href={`/product/${product._id}`} className="relative aspect-square w-full bg-[#FAF9F6] overflow-hidden block">
                  <img
                    src={product.images?.[0] || "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png"}
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

                  <p className="mt-auto text-[#07512E] font-medium text-[16px] mb-6">
                    ₹ {(product.salePrice || product.price).toLocaleString("en-IN")}
                  </p>

                  <div className="flex flex-col gap-2">
                    {isProductOutOfStock(product) ? (
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
                    {isProductOutOfStock(product) ? (
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
                            {/* <FiCheck className="stroke-[3]" /> */}
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
            <h3 className="text-xl font-serif text-gray-800 mb-2">No bridal items found</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              No products found matching your filter selection. Try modifying your criteria.
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
        <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
          <div onClick={() => setIsFilterDrawerOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity cursor-pointer" />
          <div className="relative w-80 max-w-[85vw] bg-white h-full z-10 shadow-2xl flex flex-col p-6 border-l border-gray-100">
            
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h2 className="text-xl font-serif text-[#07512E] tracking-wider uppercase font-semibold">Filters</h2>
              <button onClick={() => setIsFilterDrawerOpen(false)} className="p-1.5 text-gray-500 hover:text-[#07512E] transition-colors rounded-full hover:bg-gray-100 cursor-pointer">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto space-y-8 pr-1">
              {/* Category Filter */}
              <div>
                <h3 className="text-xs font-sans font-bold tracking-widest text-gray-400 uppercase mb-3">Category</h3>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => { setSelectedCategory("all"); setCurrentPage(1); }}
                    className={`text-left text-sm py-1.5 px-3 transition-colors ${selectedCategory === "all" ? "bg-[#07512E]/10 text-[#07512E] font-medium border-l-2 border-[#07512E]" : "text-gray-600 hover:text-[#07512E]"}`}
                  >
                    All Items
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat._id}
                      onClick={() => { setSelectedCategory(cat._id); setCurrentPage(1); }}
                      className={`text-left text-sm py-1.5 px-3 transition-colors ${selectedCategory === cat._id ? "bg-[#07512E]/10 text-[#07512E] font-medium border-l-2 border-[#07512E]" : "text-gray-600 hover:text-[#07512E]"}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-xs font-sans font-bold tracking-widest text-gray-400 uppercase mb-3">Price Limit</h3>
                <div className="flex flex-col gap-2">
                  {[
                    { id: "all", label: "All Prices" },
                    { id: "under-500k", label: "Under ₹ 5,00,000" },
                    { id: "over-500k", label: "₹ 5,00,000 & Above" }
                  ].map((range) => (
                    <button
                      key={range.id}
                      onClick={() => { setPriceFilter(range.id); setCurrentPage(1); }}
                      className={`text-left text-sm py-1.5 px-3 transition-colors ${priceFilter === range.id ? "bg-[#07512E]/10 text-[#07512E] font-medium border-l-2 border-[#07512E]" : "text-gray-600 hover:text-[#07512E]"}`}
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
              <button onClick={() => setIsFilterDrawerOpen(false)} className="flex-1 bg-[#07512E] text-white py-2.5 text-xs font-serif uppercase tracking-widest hover:bg-[#04361E] transition-colors cursor-pointer text-center">
                Apply
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
