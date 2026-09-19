"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  FiSliders,
  FiHeart,
  FiX,
  FiCheck,
  FiShoppingBag,
  FiSearch,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.trim() || "https://vardaan-backend.vercel.app/api";

const PRICE_RANGES = [
  { id: "all", label: "All Prices", min: null, max: null },
  { id: "under-299", label: "Under ₹ 299", min: null, max: 299 },
  { id: "300-499", label: "₹ 300 - ₹ 499", min: 300, max: 499 },
  { id: "500-699", label: "₹ 500 - ₹ 699", min: 500, max: 699 },
  { id: "700-above", label: "₹ 700 & Above", min: 700, max: null },
];

export default function ShopProducts() {
  const { addToCart, cartItems, isProductOutOfStock, getCartItemDetailsForListing } = useCart();
  const { token } = useAuth();
  const toast = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const categorySlugParam = searchParams ? searchParams.get("category") : null;
  const pageParam = searchParams ? searchParams.get("page") : null;
  const minPriceParam = searchParams ? searchParams.get("minPrice") : null;
  const maxPriceParam = searchParams ? searchParams.get("maxPrice") : null;
  const limitParam = searchParams ? searchParams.get("limit") : null;
  const searchParam = searchParams ? searchParams.get("search") : null;
  const sortParam = searchParams ? searchParams.get("sort") : null;

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
            paramSingularEs === catNameSingularEs
          );
        });
      }

      // 3. Custom mappings (like necklace set -> sets/necklaces, jhumka -> earrings, wedding -> bridal, ring -> rings)
      if (!matched) {
        if (paramNormalized.includes("set")) {
          matched = categories.find(
            (cat) =>
              normalizeStr(cat.slug) === "necklaceset" ||
              normalizeStr(cat.slug) === "set" ||
              normalizeStr(cat.slug) === "sets" ||
              normalizeStr(cat.name).toLowerCase().includes("set")
          );
        } else if (paramNormalized.includes("necklace")) {
          matched = categories.find(
            (cat) =>
              normalizeStr(cat.slug) === "necklaces" ||
              normalizeStr(cat.slug) === "necklace" ||
              normalizeStr(cat.name).toLowerCase().includes("necklace")
          );
        } else if (
          paramNormalized.includes("jhumka") ||
          paramNormalized.includes("earring") || // earring, earrings
          paramNormalized.includes("earing")     // typo: earings, earing
        ) {
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
        // ── Gift by Occasion ───────────────────────────────────────────────────
        else if (paramNormalized.includes("anniversary")) {
          matched = categories.find(
            (cat) =>
              normalizeStr(cat.slug).includes("anniversary") ||
              normalizeStr(cat.name).includes("anniversary"),
          );
        } else if (paramNormalized.includes("birthday")) {
          matched = categories.find(
            (cat) =>
              normalizeStr(cat.slug).includes("birthday") ||
              normalizeStr(cat.name).includes("birthday"),
          );
        } else if (paramNormalized.includes("engagement")) {
          matched = categories.find(
            (cat) =>
              normalizeStr(cat.slug).includes("engagement") ||
              normalizeStr(cat.name).includes("engagement"),
          );
        }
        // ── Gift for Person ─────────────────────────────────────────────────────
        // "for-her" → normalised → "forher"
        else if (paramNormalized === "forher" || paramNormalized.includes("forher")) {
          matched = categories.find(
            (cat) =>
              normalizeStr(cat.slug) === "forher" ||
              normalizeStr(cat.slug).includes("forher") ||
              normalizeStr(cat.name) === "forher" ||
              normalizeStr(cat.name).includes("forher") ||
              normalizeStr(cat.name) === "for her" ||
              normalizeStr(cat.slug) === "forher",
          );
        } else if (paramNormalized === "forhim" || paramNormalized.includes("forhim")) {
          matched = categories.find(
            (cat) =>
              normalizeStr(cat.slug).includes("forhim") ||
              normalizeStr(cat.name).includes("forhim"),
          );
        } else if (paramNormalized.includes("forsister")) {
          matched = categories.find(
            (cat) =>
              normalizeStr(cat.slug).includes("forsister") ||
              normalizeStr(cat.name).includes("forsister") ||
              normalizeStr(cat.name).includes("sister"),
          );
        } else if (paramNormalized.includes("forbrother")) {
          matched = categories.find(
            (cat) =>
              normalizeStr(cat.slug).includes("forbrother") ||
              normalizeStr(cat.name).includes("forbrother") ||
              normalizeStr(cat.name).includes("brother"),
          );
        } else if (paramNormalized.includes("formother")) {
          matched = categories.find(
            (cat) =>
              normalizeStr(cat.slug).includes("formother") ||
              normalizeStr(cat.name).includes("formother") ||
              normalizeStr(cat.name).includes("mother"),
          );
        } else if (paramNormalized.includes("forfather")) {
          matched = categories.find(
            (cat) =>
              normalizeStr(cat.slug).includes("forfather") ||
              normalizeStr(cat.name).includes("forfather") ||
              normalizeStr(cat.name).includes("father"),
          );
        } else if (paramNormalized.includes("forfriends") || paramNormalized.includes("forfriend")) {
          matched = categories.find(
            (cat) =>
              normalizeStr(cat.slug).includes("forfriend") ||
              normalizeStr(cat.name).includes("forfriend") ||
              normalizeStr(cat.name).includes("friend"),
          );
        }
      }

      const urlPage = pageParam ? parseInt(pageParam, 10) : 1;
      const initialPage = urlPage > 0 ? urlPage : 1;

      if (matched) {
        setSelectedCategory(matched._id);
        setCurrentPage(initialPage);
        setIsActive(true);
        setFilterShow(matched.name);
        if (matched.parentCategory?._id) {
          setOpenCategories((prev) => ({
            ...prev,
            [matched.parentCategory._id]: true,
          }));
        } else {
          setOpenCategories((prev) => ({
            ...prev,
            [matched._id]: true,
          }));
        }
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
        setCurrentPage(initialPage);
        setIsActive(true);
        setFilterShow(categorySlugParam);
      }
      // Mark categories as resolved so fetchProducts can proceed
      setCategoriesReady(true);
    } else if (!categorySlugParam && categories.length > 0) {
      setSelectedCategory("all");
      const urlPage = pageParam ? parseInt(pageParam, 10) : 1;
      setCurrentPage(urlPage > 0 ? urlPage : 1);
      setCategoriesReady(true);
    } else if (!categorySlugParam) {
      // No category param at all, always ready
      const urlPage = pageParam ? parseInt(pageParam, 10) : 1;
      setCurrentPage(urlPage > 0 ? urlPage : 1);
      setCategoriesReady(true);
    }
  }, [categorySlugParam, categories, pageParam]);

  // Products listing states
  const productsSectionRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(() => {
    const p = searchParams ? parseInt(searchParams.get("page"), 10) : 1;
    return p > 0 ? p : 1;
  });
  const [totalPages, setTotalPages] = useState(1);

  // Filters & sorting states
  const [search, setSearch] = useState(() => (searchParams ? searchParams.get("search") || "" : ""));
  const [searchInput, setSearchInput] = useState(() => (searchParams ? searchParams.get("search") || "" : ""));
  const [priceFilter, setPriceFilter] = useState("all"); // 'all' | 'under-2k' | 'over-2k'
  const [sortOrder, setSortOrder] = useState(() => {
    const s = searchParams ? searchParams.get("sort") : null;
    return s && ["newest", "price_asc", "price_desc"].includes(s) ? s : "newest";
  });
  const [isActive, setIsActive] = useState(false);
  const [filterShow, setFilterShow] = useState("");
  const [openCategories, setOpenCategories] = useState({});

  const toggleCategoryOpen = (catId) => {
    setOpenCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  // Sync currentPage from URL query parameter (handles back/forward browser buttons)
  useEffect(() => {
    const p = pageParam ? parseInt(pageParam, 10) : 1;
    const validPage = p > 0 ? p : 1;
    if (validPage !== currentPage) {
      setCurrentPage(validPage);
    }
  }, [pageParam]);

  // Sync search state from URL query parameter (handles back/forward browser buttons)
  useEffect(() => {
    const urlSearch = searchParam ? searchParam.trim() : "";
    if (urlSearch !== search) {
      setSearch(urlSearch);
      setSearchInput(urlSearch);
    }
  }, [searchParam]);

  // Sync sortOrder state from URL query parameter (handles back/forward browser buttons)
  useEffect(() => {
    if (sortParam && ["newest", "price_asc", "price_desc"].includes(sortParam)) {
      if (sortParam !== sortOrder) {
        setSortOrder(sortParam);
      }
    } else if (!sortParam && sortOrder !== "newest") {
      setSortOrder("newest");
    }
  }, [sortParam]);

  // Sync priceFilter state from URL minPrice / maxPrice query params
  useEffect(() => {
    if (!minPriceParam && !maxPriceParam) {
      setPriceFilter("all");
      return;
    }

    const matchedRange = PRICE_RANGES.find((r) => {
      if (r.id === "all") return false;
      const minMatch = r.min === null ? !minPriceParam : minPriceParam === String(r.min);
      const maxMatch = r.max === null ? !maxPriceParam : maxPriceParam === String(r.max);
      return minMatch && maxMatch;
    });

    if (matchedRange) {
      setPriceFilter(matchedRange.id);
    } else {
      setPriceFilter("custom");
    }
  }, [minPriceParam, maxPriceParam]);

  // URL query updater helper
  const updateUrl = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams ? searchParams.toString() : "");

      Object.entries(updates).forEach(([key, value]) => {
        if (
          value === null ||
          value === undefined ||
          value === "" ||
          (key === "page" && (value === 1 || value === "1"))
        ) {
          params.delete(key);
        } else {
          params.set(key, value.toString());
        }
      });

      const queryString = params.toString();
      const newUrl = queryString ? `/shop?${queryString}` : "/shop";
      router.push(newUrl, { scroll: false });
    },
    [searchParams, router],
  );

  // Handlers for category & filter selection
  const handleSelectCategory = (cat) => {
    const slug = cat.slug || cat.name.toLowerCase().replace(/\s+/g, "-");
    setSelectedCategory(cat._id);
    setFilterShow(cat.name);
    setIsActive(true);
    setCurrentPage(1);

    updateUrl({
      category: slug,
      page: 1,
    });
  };

  const handleSelectAllCategories = () => {
    setSelectedCategory("all");
    setIsActive(false);
    setFilterShow("");
    setCurrentPage(1);

    updateUrl({
      category: null,
      page: 1,
    });
  };

  const handleSelectPrice = (range) => {
    setPriceFilter(range.id);
    setCurrentPage(1);

    if (range.id === "all") {
      updateUrl({ minPrice: null, maxPrice: null, page: 1 });
    } else {
      updateUrl({
        minPrice: range.min !== null ? String(range.min) : null,
        maxPrice: range.max !== null ? String(range.max) : null,
        page: 1,
      });
    }
  };

  const handleClearCategory = () => {
    setSelectedCategory("all");
    setIsActive(false);
    setFilterShow("");
    setCurrentPage(1);
    updateUrl({ category: null, page: 1 });
  };

  const handleClearPrice = () => {
    setPriceFilter("all");
    setCurrentPage(1);
    updateUrl({ minPrice: null, maxPrice: null, page: 1 });
  };

  const handleClearSearch = () => {
    setSearch("");
    setSearchInput("");
    setCurrentPage(1);
    updateUrl({ search: null, page: 1 });
  };

  const handleSelectSortOrder = (newSort) => {
    setSortOrder(newSort);
    setCurrentPage(1);
    setIsSortOpen(false);
    updateUrl({
      sort: newSort === "newest" ? null : newSort,
      page: 1,
    });
  };

  const handleClearAll = () => {
    setSelectedCategory("all");
    setPriceFilter("all");
    setSearch("");
    setSearchInput("");
    setSortOrder("newest");
    setCurrentPage(1);
    setIsActive(false);
    setFilterShow("");
    setIsFilterDrawerOpen(false);

    router.push("/shop", { scroll: false });
  };

  const handleRemoveActiveFilter = () => {
    handleClearAll();
  };

  // Compute category badge label
  const categoryBadgeLabel = (() => {
    if (selectedCategory && selectedCategory !== "all") {
      const cat = categories.find((c) => c._id === selectedCategory);
      if (cat) return cat.name;
    }
    if (categorySlugParam && selectedCategory !== "all") {
      const cat = categories.find(
        (c) =>
          c.slug?.toLowerCase() === categorySlugParam.toLowerCase() ||
          c.name?.toLowerCase() === categorySlugParam.toLowerCase()
      );
      if (cat) return cat.name;
      return filterShow || categorySlugParam;
    }
    if (filterShow && selectedCategory !== "all") {
      return filterShow;
    }
    return null;
  })();

  // Compute price badge label - ONLY ONE BADGE
  const priceBadgeLabel = (() => {
    if (!minPriceParam && !maxPriceParam && priceFilter === "all") return null;

    const matchedRange = PRICE_RANGES.find((r) => {
      if (r.id === "all") return false;
      const minMatch = r.min === null ? !minPriceParam : minPriceParam === String(r.min);
      const maxMatch = r.max === null ? !maxPriceParam : maxPriceParam === String(r.max);
      return minMatch && maxMatch;
    });

    if (matchedRange) return matchedRange.label;

    if (minPriceParam && maxPriceParam) {
      return `₹ ${minPriceParam} - ₹ ${maxPriceParam}`;
    }
    if (minPriceParam) {
      return `₹ ${minPriceParam} & Above`;
    }
    if (maxPriceParam) {
      return `Under ₹ ${maxPriceParam}`;
    }
    return null;
  })();

  const hasCategory = Boolean(categoryBadgeLabel);
  const hasPrice = Boolean(priceBadgeLabel);
  const hasSearch = Boolean((searchParam && searchParam.trim()) || search.trim());
  const searchBadgeLabel = (searchParam && searchParam.trim()) || search.trim();
  const hasAnyActiveFilter = hasCategory || hasPrice || hasSearch;

  const scrollToProductsSection = useCallback((smooth = false) => {
    const el = productsSectionRef.current || document.getElementById("shop-products-section");
    if (!el) return;
    const header = document.querySelector("header");
    const headerHeight = header ? header.offsetHeight : 118;
    const elPosition = el.getBoundingClientRect().top + window.pageYOffset;
    const targetY = Math.max(0, elPosition - headerHeight);

    window.scrollTo({
      top: targetY,
      left: 0,
      behavior: smooth ? "smooth" : "instant",
    });
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    scrollToProductsSection(true);

    updateUrl({ page: newPage });
  };

  // Industry-standard pagination items calculation (ellipsis)
  const getPaginationItems = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  // Auto scroll to products/filter section when Shop page loads, category URL changes, or search URL changes
  useEffect(() => {
    scrollToProductsSection(false);
    const t1 = setTimeout(() => scrollToProductsSection(false), 50);
    const t2 = setTimeout(() => scrollToProductsSection(false), 150);
    const t3 = setTimeout(() => scrollToProductsSection(false), 400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [categorySlugParam, searchParam, scrollToProductsSection]);

  // Scroll smoothly to products section when pagination changes
  const isFirstPaginationRender = useRef(true);
  useEffect(() => {
    if (isFirstPaginationRender.current) {
      isFirstPaginationRender.current = false;
      return;
    }
    scrollToProductsSection(true);
  }, [currentPage, scrollToProductsSection]);

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
      const limitVal = limitParam ? parseInt(limitParam, 10) || 9 : 9;
      params.append("limit", limitVal); // Grid layout limit

      if (selectedCategory !== "all") {
        params.append("category", selectedCategory);
      }

      const effectiveSearch = searchParam ? searchParam.trim() : search.trim();
      if (effectiveSearch) {
        params.append("search", effectiveSearch);
      }

      let activeMin = minPriceParam;
      let activeMax = maxPriceParam;

      if (!activeMin && !activeMax && priceFilter !== "all") {
        const found = PRICE_RANGES.find((r) => r.id === priceFilter);
        if (found) {
          if (found.min !== null) activeMin = String(found.min);
          if (found.max !== null) activeMax = String(found.max);
        }
      }

      if (activeMin) {
        params.append("minPrice", activeMin);
      }
      if (activeMax) {
        params.append("maxPrice", activeMax);
      }

      const effectiveSort =
        sortParam && ["newest", "price_asc", "price_desc"].includes(sortParam)
          ? sortParam
          : sortOrder;
      if (effectiveSort && effectiveSort !== "price-range") {
        params.append("sort", effectiveSort);
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
  }, [
    currentPage,
    selectedCategory,
    search,
    searchParam,
    priceFilter,
    sortOrder,
    sortParam,
    minPriceParam,
    maxPriceParam,
    categorySlugParam,
    categoriesReady,
    limitParam,
  ]);

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
    const { variantStr, variantDetails } = getCartItemDetailsForListing(product);
    addToCart(product, 1, variantStr, variantDetails);

    setTimeout(() => {
      setCartState((prev) => ({ ...prev, [id]: false }));
    }, 3000);
  };

  // Debounce search input and sync with URL query parameter
  useEffect(() => {
    const timer = setTimeout(() => {
      const value = searchInput.trim();
      const currentUrlSearch = searchParam ? searchParam.trim() : "";

      if (value.length >= 3) {
        if (value !== currentUrlSearch) {
          setSearch(value);
          setCurrentPage(1);
          updateUrl({ search: value, page: 1 });
        }
      } else if (value.length === 0 && currentUrlSearch) {
        setSearch("");
        setCurrentPage(1);
        updateUrl({ search: null, page: 1 });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, searchParam, updateUrl]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const value = searchInput.trim();
    setSearch(value);
    setCurrentPage(1);
    updateUrl({ search: value || null, page: 1 });
  };

  return (
    <section
      id="shop-products-section"
      ref={productsSectionRef}
      className="py-8 bg-[#FFFDF9] scroll-mt-[118px]"
    >
      <div className="w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0">
        {/* Dynamic Search Bar */}
        <div className="mb-6 flex justify-center">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center w-full max-w-[480px] bg-white border border-[#F0ECE3] rounded shadow-sm overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search preferred jewellery product..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-grow px-4 py-2.5 text-[16px] text-gray-800 focus:outline-none placeholder-gray-400 bg-transparent font-sans"
            />
            {searchInput.length >= 1 && (
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-800 flex items-center justify-center cursor-pointer mr-2 shrink-0 bg-transparent border-none outline-none"
                onClick={() => {
                  setSearchInput("");
                  setSearch("");
                  setCurrentPage(1);
                  updateUrl({ search: null, page: 1 });
                }}
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
            {/* Category Filter Badge */}
            {hasCategory && categoryBadgeLabel && (
              <button
                onClick={handleClearCategory}
                className="border border-white rounded px-4 py-2 hover:bg-white/10 transition-colors flex items-center gap-2 text-sm sm:text-[17px] font-sans tracking-wider font-medium cursor-pointer bg-white/10"
                title="Remove category filter"
              >
                <span>{categoryBadgeLabel}</span>
                <FiX className="w-5 h-5" />
              </button>
            )}

            {/* Price Filter Badge - EXACTLY ONE */}
            {hasPrice && priceBadgeLabel && (
              <button
                onClick={handleClearPrice}
                className="border border-white rounded px-4 py-2 hover:bg-white/10 transition-colors flex items-center gap-2 text-sm sm:text-[17px] font-sans tracking-wider font-medium cursor-pointer bg-white/10"
                title="Remove price filter"
              >
                <span>{priceBadgeLabel}</span>
                <FiX className="w-5 h-5" />
              </button>
            )}

            {/* Search Filter Badge */}
            {hasSearch && (
              <button
                onClick={handleClearSearch}
                className="border border-white rounded px-4 py-2 hover:bg-white/10 transition-colors flex items-center gap-2 text-sm sm:text-[17px] font-sans tracking-wider font-medium cursor-pointer bg-white/10"
                title="Clear search text"
              >
                <span>{searchBadgeLabel}</span>
                <FiX className="w-5 h-5" />
              </button>
            )}

            {/* If no filter is selected, show Price Sort Dropdown next to Filters button */}
            {!hasAnyActiveFilter && (
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
                          onClick={() => handleSelectSortOrder(opt.id)}
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

            {/* Custom Sort Dropdown (shown here when any filter IS selected) */}
            {hasAnyActiveFilter && (
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
                          onClick={() => handleSelectSortOrder(opt.id)}
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

                  {product.salePrice > 0 && product.price > product.salePrice ? (
                    <p className="text-[#07512E] font-medium text-[16px] mb-6 flex items-center gap-2">
                      <span className="text-gray-400 line-through text-[14px]">
                        ₹ {(product.price || 0).toLocaleString("en-IN")}
                      </span>
                      <span>
                        ₹ {(product.salePrice || 0).toLocaleString("en-IN")}
                      </span>
                     {Math.round((((product.price || 0) - (product.salePrice || 0)) / (product.price || 1)) * 100) > 0 && (
  <span className="text-xs bg-green-50 text-green-600 border border-green-200 px-1.5 py-0.5 rounded font-bold ml-1">
    {Math.round((((product.price || 0) - (product.salePrice || 0)) / (product.price || 1)) * 100)}% OFF
  </span>
)}
                    </p>
                  ) : (
                    <p className="text-[#07512E] font-medium text-[16px] mb-6">
                      ₹ {(product.price || 0).toLocaleString("en-IN")}
                    </p>
                  )}

                  <div className="mt-auto flex flex-col gap-2">
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
              onClick={handleClearAll}
              className="mt-6 bg-[#07512E] text-white px-6 py-2.5 text-sm uppercase tracking-wider font-serif hover:bg-[#04361E] transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && !limitParam && (
          <div className="flex items-center justify-between w-full pb-4 border-t border-[#F0ECE3] pt-6 mt-12 text-gray-950 font-sans gap-2 select-none">
            {/* Previous */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 sm:gap-2 transition-colors cursor-pointer text-[14px] sm:text-[17px] font-medium py-1.5 px-2 sm:px-3 rounded-lg hover:bg-gray-100 ${
                currentPage === 1
                  ? "opacity-30 cursor-not-allowed text-gray-400 hover:bg-transparent"
                  : "text-gray-900 hover:text-[#0A5230]"
              }`}
              aria-label="Previous page"
            >
              <span className="text-[17px] sm:text-[20px]">←</span>
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </button>

            {/* Pagination Numbers & Ellipses */}
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
              {getPaginationItems().map((item, index) => {
                if (item === "...") {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="w-6 h-8 sm:w-8 sm:h-10 flex items-center justify-center text-gray-400 font-bold tracking-widest text-xs sm:text-sm"
                    >
                      ...
                    </span>
                  );
                }

                const isCurrent = currentPage === item;
                return (
                  <button
                    key={item}
                    onClick={() => handlePageChange(item)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer text-xs sm:text-sm md:text-base font-medium ${
                      isCurrent
                        ? "bg-[#0A5230] text-white font-semibold shadow-xs"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#0A5230]"
                    }`}
                    aria-label={`Page ${item}`}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            {/* Next */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 sm:gap-2 transition-colors cursor-pointer text-[14px] sm:text-[17px] font-medium py-1.5 px-2 sm:px-3 rounded-lg hover:bg-gray-100 ${
                currentPage === totalPages
                  ? "opacity-30 cursor-not-allowed text-gray-400 hover:bg-transparent"
                  : "text-gray-900 hover:text-[#0A5230]"
              }`}
              aria-label="Next page"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
              <span className="text-[17px] sm:text-[20px]">→</span>
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
                    onClick={handleSelectAllCategories}
                    className={`text-left text-sm py-2 px-3 rounded transition-colors cursor-pointer ${selectedCategory === "all" ? "bg-[#07512E]/10 text-[#07512E] font-medium border-l-2 border-[#07512E]" : "text-gray-600 hover:text-[#07512E] hover:bg-gray-50"}`}
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
                      const isParentSelected = selectedCategory === cat._id;
                      const hasSelectedChild = children.some((c) => c._id === selectedCategory);
                      const isOpen = openCategories[cat._id] !== undefined ? openCategories[cat._id] : hasSelectedChild;

                      return (
                        <div key={cat._id} className="border-b border-gray-50 last:border-b-0 pb-1">
                          {hasChildren ? (
                            <div>
                              <div
                                onClick={() => {
                                  toggleCategoryOpen(cat._id);
                                  handleSelectCategory(cat);
                                }}
                                className={`flex items-center justify-between py-2 px-3 rounded cursor-pointer transition-colors ${
                                  isParentSelected
                                    ? "bg-[#07512E]/10 text-[#07512E] font-medium border-l-2 border-[#07512E]"
                                    : "text-gray-700 hover:text-[#07512E] hover:bg-gray-50"
                                }`}
                              >
                                <span className="text-sm font-medium">{cat.name}</span>
                                <span className="p-1 text-gray-400 hover:text-[#07512E]">
                                  {isOpen ? (
                                    <FiChevronDown className="w-4 h-4 text-[#07512E]" />
                                  ) : (
                                    <FiChevronRight className="w-4 h-4" />
                                  )}
                                </span>
                              </div>

                              {/* Child Categories Dropdown */}
                              {isOpen && (
                                <div className="ml-4 pl-2 border-l-2 border-[#07512E]/20 mt-1 mb-2 flex flex-col gap-1">
                                  {children.map((child) => {
                                    const isChildSelected = selectedCategory === child._id;
                                    return (
                                      <button
                                        key={child._id}
                                        onClick={() => handleSelectCategory(child)}
                                        className={`block w-full text-left py-1.5 px-3 text-sm rounded cursor-pointer transition-colors ${
                                          isChildSelected
                                            ? "bg-[#07512E]/10 text-[#07512E] font-semibold border-l-2 border-[#07512E]"
                                            : "text-gray-600 hover:text-[#07512E] hover:bg-gray-50"
                                        }`}
                                      >
                                        {child.name}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          ) : (
                            <button
                              onClick={() => handleSelectCategory(cat)}
                              className={`block w-full text-left py-2 px-3 text-sm rounded cursor-pointer transition-colors ${
                                isParentSelected
                                  ? "bg-[#07512E]/10 text-[#07512E] font-medium border-l-2 border-[#07512E]"
                                  : "text-gray-700 hover:text-[#07512E] hover:bg-gray-50"
                              }`}
                            >
                              {cat.name}
                            </button>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-xs font-sans font-bold tracking-widest text-gray-400 uppercase mb-3">
                  Price Limit
                </h3>
                <div className="flex flex-col gap-2">
                  {PRICE_RANGES.map((range) => {
                    const isSelected =
                      priceFilter === range.id ||
                      (range.id === "all" &&
                        !minPriceParam &&
                        !maxPriceParam &&
                        priceFilter === "all") ||
                      (range.id !== "all" &&
                        (range.min === null
                          ? !minPriceParam
                          : minPriceParam === String(range.min)) &&
                        (range.max === null
                          ? !maxPriceParam
                          : maxPriceParam === String(range.max)));

                    return (
                      <button
                        key={range.id}
                        onClick={() => handleSelectPrice(range)}
                        className={`text-left text-sm py-1.5 px-3 transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-[#07512E]/10 text-[#07512E] font-semibold border-l-2 border-[#07512E]"
                            : "text-gray-600 hover:text-[#07512E]"
                        }`}
                      >
                        {range.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-6 flex gap-3">
              <button
                onClick={handleClearAll}
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
