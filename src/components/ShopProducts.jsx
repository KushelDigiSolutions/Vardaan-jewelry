"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { FiSliders, FiHeart, FiX, FiCheck, FiShoppingBag } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const PRODUCTS_DATA = [
  // Page 1 Products
  {
    id: 1,
    page: 1,
    name: "Lucy Williams Engravable Arco Cord Necklace",
    price: "₹ 1995",
    priceVal: 1995,
    category: "necklaces",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781529483/Lucy_Williams_Engravable_Arco_Cord_Ring_fp3lgn.png"
  },
  {
    id: 2,
    page: 1,
    name: "Lucy Williams Engravable Arco Cord Necklace",
    price: "₹ 1995",
    priceVal: 1995,
    category: "necklaces",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png"
  },
  {
    id: 3,
    page: 1,
    name: "Lucy Williams Engravable Arco Cord Necklace",
    price: "₹ 1995",
    priceVal: 1995,
    category: "rings",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781528583/rings_pkq8gv.png"
  },
  {
    id: 4,
    page: 1,
    name: "Lucy Williams Engravable Arco Cord Necklace",
    price: "₹ 1995",
    priceVal: 1995,
    category: "rings",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781529306/Lucy_Williams_Engravable_Arco_Gold_Ring_vggf77.png"
  },
  {
    id: 5,
    page: 1,
    name: "Lucy Williams Engravable Arco Cord Necklace",
    price: "₹ 1995",
    priceVal: 1995,
    category: "sets",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781528583/sets_xvoyfd.png"
  },
  {
    id: 6,
    page: 1,
    name: "Lucy Williams Engravable Arco Cord Necklace",
    price: "₹ 1995",
    priceVal: 1995,
    category: "rings",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781529306/Lucy_Williams_Engravable_Arco_Gold_Ring_vggf77.png"
  },
  // Page 2 Products
  {
    id: 7,
    page: 2,
    name: "Lucy Williams Engravable Arco Gold Ring",
    price: "₹ 1995",
    priceVal: 1995,
    category: "rings",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png"
  },
  {
    id: 8,
    page: 2,
    name: "Classic Diamond Eternity Band",
    price: "₹ 3499",
    priceVal: 3499,
    category: "rings",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781529306/Lucy_Williams_Engravable_Arco_Gold_Ring_vggf77.png"
  },
  {
    id: 9,
    page: 2,
    name: "Luxe Hoop Diamond Earrings",
    price: "₹ 2499",
    priceVal: 2499,
    category: "earrings",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781528601/earing_fktmvk.png"
  },
  {
    id: 10,
    page: 2,
    name: "Rose Petal Droplet Earrings",
    price: "₹ 2799",
    priceVal: 2799,
    category: "earrings",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781591262/02_i6sorm.png"
  },
  {
    id: 11,
    page: 2,
    name: "Sunburst Gold Studs",
    price: "₹ 1799",
    priceVal: 1799,
    category: "earrings",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781591266/03_bkl3hm.png"
  },
  {
    id: 12,
    page: 2,
    name: "Ruby Raang Emerald Layered Set",
    price: "₹ 5995",
    priceVal: 5995,
    category: "sets",
    image: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525757/Rectangle_23_9_fyoemo.png"
  }
];

export default function ShopProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("price-range");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [favorites, setFavorites] = useState({});
  const [cartState, setCartState] = useState({});
  const { addToCart } = useCart();

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddToCart = (product) => {
    setCartState((prev) => ({
      ...prev,
      [product.id]: true
    }));
    addToCart(product);
    
    // reset visual feedback after 3s
    setTimeout(() => {
      setCartState((prev) => ({ ...prev, [product.id]: false }));
    }, 3000);
  };

  // Perform filtering & sorting
  const processedProducts = useMemo(() => {
    let result = [...PRODUCTS_DATA];

    // Filter by page (simulate simple pagination or let users toggle)
    result = result.filter((p) => p.page === currentPage);

    // Category Filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price Filter
    if (priceFilter === "under-2k") {
      result = result.filter((p) => p.priceVal < 2000);
    } else if (priceFilter === "over-2k") {
      result = result.filter((p) => p.priceVal >= 2000);
    }

    // Sort order (in a production setting, this would rearrange items)
    if (sortOrder === "price-low") {
      result.sort((a, b) => a.priceVal - b.priceVal);
    } else if (sortOrder === "price-high") {
      result.sort((a, b) => b.priceVal - a.priceVal);
    }

    return result;
  }, [currentPage, selectedCategory, priceFilter, sortOrder]);

  return (
    <section className="py-8 bg-[#FFFDF9]">
      <div className="w-full max-w-[1192px] mx-auto px-4 xl:px-0">


        <div className="bg-[#0A5230]  text-white py-3 px-4 md:px-6 flex sm:flex-row flex-col items-start  sm:items-center justify-between shadow-md mb-8 relative z-20">


          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="border border-white rounded px-4 py-2 hover:bg-white/10 transition-colors flex items-center gap-2 text-sm sm:text-[17px] font-sans tracking-wider  font-medium cursor-pointer"
          >
            <FiSliders className="w-4 h-4" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-4">
            <span className="text-sm md:text-[17px] tracking-wide text-white/90 font-serif font-light">
              (1318 total results)
            </span>


            {/* Custom Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-1.5 border border-white rounded px-3.5 py-2 text-sm sm:text-[17px] bg-[#07512E] hover:bg-white/10 transition-colors cursor-pointer font-sans font-medium text-white"
              >
                <span className="text-white/80 font-light hidden sm:inline">Sort by: </span>
                <span>
                  {sortOrder === "price-range" && "Price range"}
                  {sortOrder === "price-low" && "Price: Low to High"}
                  {sortOrder === "price-high" && "Price: High to Low"}
                </span>
                <svg className={`fill-current h-3.5 w-3.5 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </button>

              {isSortOpen && (
                <>
                  {/* Click outside overlay */}
                  <div
                    className="fixed inset-0 z-30 cursor-default"
                    onClick={() => setIsSortOpen(false)}
                  />

                  {/* Dropdown Options List */}
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-[#F0ECE3] shadow-2xl rounded-md z-40 overflow-hidden text-left py-1 text-gray-800 animate-slide-up">
                    {[
                      { id: "price-range", label: "Price range" },
                      { id: "price-low", label: "Price: Low to High" },
                      { id: "price-high", label: "Price: High to Low" }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setSortOrder(opt.id);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer flex items-center justify-between ${sortOrder === opt.id
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
          </div>

        </div>


        {processedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {processedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-[#F0ECE3] flex flex-col group overflow-hidden transition-all duration-300 relative"
              >
                {/* Heart/Wishlist Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gray/70 shadow-sm backdrop-blur-sm flex items-center justify-center text-[#07512E] hover:bg-[#07512E] hover:text-white transition-all duration-300 cursor-pointer"
                  aria-label="Toggle Wishlist"
                >
                  <FiHeart className={`w-4.5 h-4.5 ${favorites[product.id] ? "fill-red-500 text-red-500" : "text-white"}`} strokeWidth={2.5} />
                </button>

                {/* Aspect-square Product Image */}
                <Link href={`/product/${product.id}`} className="relative aspect-square w-full bg-[#FAF9F6] overflow-hidden block">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/[0.02] pointer-events-none" />
                </Link>

                {/* Details */}
                <div className="p-5 flex flex-col flex-grow text-left">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-sans text-[#303030] text-[20px] sm:text-[24px] font-medium leading-snug mb-3 min-h-[56px] line-clamp-2 hover:text-[#07512E] transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-[#07512E] font-medium text-[16px] mb-6">
                    {product.price}
                  </p>

                  {/* Buttons Container */}
                  <div className="mt-auto flex flex-col gap-2">
                    <Link
                      href={`/product/${product.id}`}
                      className="w-full bg-[#FFDE59] text-[#101010] hover:bg-[#e6c543] font-sans font-medium text-[20px] py-3 transition-colors cursor-pointer text-center block"
                    >
                      Shop Now
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`w-full border-2 border-[#07512E] text-[#07512E] hover:bg-[#07512E] hover:text-white font-sans font-medium text-[20px] py-3 transition-all cursor-pointer text-center ${cartState[product.id] ? "bg-[#07512E] text-white" : "bg-transparent"
                        }`}
                    >
                      {cartState[product.id] ? (
                        <span className="flex items-center justify-center gap-1.5">
                          <FiCheck className="stroke-[3]" /> Added to Cart
                        </span>
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-gray-100 p-8 mb-12">
            <h3 className="text-xl font-serif text-gray-800 mb-2">No items found</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              No products found in this page/category filter combination. Please clear your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setPriceFilter("all");
                setCurrentPage(1);
              }}
              className="mt-6 bg-[#07512E] text-white px-6 py-2.5 text-sm uppercase tracking-wider font-serif hover:bg-[#04361E] transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}


        {/* Pagination Controls matching screenshot exactly (Previous aligned left, numbers centered, Next aligned right) */}
        <div className="flex items-center justify-between w-full pb-4  border-[#F0ECE3] mt-12 text-gray-950 font-sans">
          {/* Previous Link */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 transition-colors cursor-pointer text-[15px] sm:text-[18px] ${currentPage === 1 ? "opacity-35 cursor-not-allowed text-gray-400" : "text-gray-900 hover:text-[#0A5230]"
              }`}
          >
            <span className="text-[17px] sm:text-[20px]">←</span> Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-2 sm:gap-6 text-[15px] sm:text-[18px]">
            <button
              onClick={() => setCurrentPage(1)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${currentPage === 1
                  ? "bg-[#0A5230] text-white font-medium"
                  : "text-gray-800 hover:bg-gray-100"
                }`}
            >
              1
            </button>

            <button
              onClick={() => setCurrentPage(2)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${currentPage === 2
                  ? "bg-[#0A5230] text-white font-medium"
                  : "text-gray-800 hover:bg-gray-100"
                }`}
            >
              2
            </button>

            <button
              onClick={() => setCurrentPage(2)} // Simulate page 3 selection
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer text-gray-800 hover:bg-gray-100"
            >
              3
            </button>

            <span className="text-gray-400 font-sans px-0.5">...</span>

            <button
              onClick={() => setCurrentPage(2)} // Simulate page 12 selection
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer text-gray-800 hover:bg-gray-100"
            >
              12
            </button>
          </div>

          {/* Next Link */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, 2))}
            disabled={currentPage === 2}
            className={`flex items-center gap-2 transition-colors cursor-pointer text-[15px] sm:text-[18px] ${currentPage === 2 ? "opacity-35 cursor-not-allowed text-gray-400" : "text-gray-900 hover:text-[#0A5230]"
              }`}
          >
            Next <span className="text-[17px] sm:text-[20px]">→</span>
          </button>
        </div>

      </div>

      {/* Slide-out Sidebar Filters (Drawer) */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
          {/* Drawer Backdrop */}
          <div
            onClick={() => setIsFilterDrawerOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity cursor-pointer"
          />

          {/* Drawer Content */}
          <div className="relative w-80 max-w-[85vw] bg-white h-full z-10 shadow-2xl flex flex-col p-6 border-l border-gray-100 animate-slide-up">

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h2 className="text-xl font-serif text-[#07512E] tracking-wider uppercase font-semibold">
                Filters
              </h2>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-1.5 text-gray-500 hover:text-[#07512E] transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
                aria-label="Close filters"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Filter sections */}
            <div className="flex-grow overflow-y-auto space-y-8 pr-1">

              {/* Category Filter */}
              <div>
                <h3 className="text-xs font-sans font-bold tracking-widest text-gray-400 uppercase mb-3">
                  Category
                </h3>
                <div className="flex flex-col gap-2">
                  {[
                    { id: "all", label: "All Items" },
                    { id: "necklaces", label: "Necklaces" },
                    { id: "rings", label: "Rings" },
                    { id: "earrings", label: "Earrings" },
                    { id: "sets", label: "Jewelry Sets" }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setCurrentPage(1);
                      }}
                      className={`text-left text-sm py-1.5 px-3 transition-colors ${selectedCategory === cat.id
                          ? "bg-[#07512E]/10 text-[#07512E] font-medium border-l-2 border-[#07512E]"
                          : "text-gray-600 hover:text-[#07512E]"
                        }`}
                    >
                      {cat.label}
                    </button>
                  ))}
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
                    { id: "over-2k", label: "₹ 2,000 & Above" }
                  ].map((range) => (
                    <button
                      key={range.id}
                      onClick={() => {
                        setPriceFilter(range.id);
                        setCurrentPage(1);
                      }}
                      className={`text-left text-sm py-1.5 px-3 transition-colors ${priceFilter === range.id
                          ? "bg-[#07512E]/10 text-[#07512E] font-medium border-l-2 border-[#07512E]"
                          : "text-gray-600 hover:text-[#07512E]"
                        }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Clear All & Apply Footer */}
            <div className="border-t border-gray-100 pt-4 mt-6 flex gap-3">
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceFilter("all");
                  setCurrentPage(1);
                  setIsFilterDrawerOpen(false);
                }}
                className="flex-1 border border-gray-200 text-gray-600 py-2.5 text-xs font-serif uppercase tracking-widest hover:border-gray-400 transition-colors cursor-pointer text-center"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="flex-1 bg-[#07512E] text-white py-2.5 text-xs font-serif uppercase tracking-widest hover:bg-[#04361E] transition-colors cursor-pointer text-center"
              >
                Apply
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
