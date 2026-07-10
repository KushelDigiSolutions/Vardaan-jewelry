"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";
import { useLoader } from "./LoaderContext";


const CartContext = createContext();
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const { token } = useAuth();
  const toast = useToast();
  const {showLoader , hideLoader} = useLoader();

  // Helper to fetch options
  const getHeaders = useCallback(() => {
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }, [token]);

  // Fetch cart from backend
  const fetchCart = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: "GET",
        headers: getHeaders(),
      });
      if (res.ok) {
        const json = await res.json();
        const cartData = json.data || json;
        // Backend returns cart document, which has items: [{ product: {...}, quantity, variant }]
        const formatted = (cartData.items || []).map(item => {
          if (!item.product) return null;
          return {
            id: item.product._id,
            productId: item.product._id,
            name: item.product.name,
            price: (item.variantDetails?.salePrice > 0 ? item.variantDetails.salePrice : item.variantDetails?.price) || item.product.salePrice || item.product.price,
            image: item.product.images?.[0] || "",
            quantity: item.quantity,
            variant: item.variant || "50",
            variantDetails: item.variantDetails || null,
            inventory: item.product.inventory,
            product: item.product,
            desc: item.product.description || ""
          };
        }).filter(Boolean);
        setCartItems(formatted);
      }
    } catch (err) {
      console.error("Fetch cart error:", err);
    }
  }, [token, getHeaders]);

  // Fetch cart when authenticated
  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      // Load from localStorage if not logged in
      const localCart = localStorage.getItem("vardaan_cart");
      if (localCart) {
        try {
          setCartItems(JSON.parse(localCart));
        } catch (e) {
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    }
  }, [token, fetchCart]);

  // Save cart to local storage when not authenticated
  const saveToLocal = (items) => {
    if (!token) {
      localStorage.setItem("vardaan_cart", JSON.stringify(items));
    }
  };

  // Sync local cart to database upon login
  useEffect(() => {
    const syncLocalCart = async () => {
      if (token) {
        const localCart = localStorage.getItem("vardaan_cart");
        if (localCart) {
          try {
            const items = JSON.parse(localCart);
            if (items && items.length > 0) {
              for (const item of items) {
                await fetch(`${API_URL}/cart/add`, {
                  method: "POST",
                  headers: getHeaders(),
                  body: JSON.stringify({
                    productId: item.productId || item.id,
                    quantity: item.quantity,
                    variant: item.variant || "50",
                    variantDetails: item.variantDetails
                  })
                });
              }
              // Clear local cart
              localStorage.removeItem("vardaan_cart");
              // Refresh database cart
              await fetchCart();
            }
          } catch (e) {
            console.error("Local cart sync error:", e);
          }
        }
      }
    };
    syncLocalCart();
  }, [token, getHeaders, fetchCart]);

  // Add an item to the cart and open the drawer
  const addToCart = useCallback(async (product, qty = 1, size = "50", variantDetails = null) => {
    const productId = product._id || product.id || product.productId;
    let priceVal = (variantDetails?.salePrice > 0 ? variantDetails.salePrice : variantDetails?.price) || product.salePrice || product.priceVal || product.price;
    if (typeof priceVal === "string") {
      priceVal = parseFloat(priceVal.replace(/[^0-9.]/g, "")) || 0;
    }
    const imageVal = product.images?.[0] || product.image || "";

    const newItem = {
      id: productId,
      productId: productId,
      name: product.name,
      price: priceVal,
      image: imageVal,
      quantity: qty,
      variant: size,
      variantDetails: variantDetails,
      inventory: product.inventory,
      product: product,
      desc: product.description || product.desc || "Fine Jewelry"
    };

    if (token) {
      showLoader(true)
      // Backend request
      try {
        const res = await fetch(`${API_URL}/cart/add`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({
            productId: productId,
            quantity: qty,
            variant: size,
            variantDetails: variantDetails
          }),
        });
        if (res.ok) {

          
          await fetchCart();
        }
      } catch (err) {
        console.error("Add to cart API error:", err);
      }
      finally {
        hideLoader(false)
      }
    } else {
      // Local state update
      setCartItems((prev) => {
        const existingIdx = prev.findIndex((item) => item.id === productId && item.variant === size);
        let updated;
        if (existingIdx > -1) {
          updated = prev.map((item, idx) =>
            idx === existingIdx
              ? { ...item, quantity: item.quantity + qty }
              : item
          );
        } else {
          updated = [...prev, newItem];
        }
        saveToLocal(updated);
        return updated;
      });
    }

    setIsCartOpen(true);
  }, [token, getHeaders, fetchCart]);

  // Remove an item
  const removeFromCart = useCallback(async (id, variant = "50") => {
    const item = cartItems.find((i) => (i.productId === id || i.id === id) && i.variant === variant);
    const itemName = item ? item.name : "Product";

    if (token) {
      showLoader(true)
      try {
        const res = await fetch(`${API_URL}/cart/remove`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({
            productId: id,
            variant: variant,
            removeAll: true
          }),
        });
        if (res.ok) {
          await fetchCart();
          toast.success(`Removed "${itemName}" from cart`);
        }
      } catch (err) {
        console.error("Remove from cart API error:", err);
      }
      finally {
        hideLoader(false)
      }
    } else {
      setCartItems((prev) => {
        const updated = prev.filter((item) => !((item.id === id || item.productId === id) && item.variant === variant));
        saveToLocal(updated);
        toast.success(`Removed "${itemName}" from cart`);
        return updated;
      });
    }
  }, [token, getHeaders, fetchCart, cartItems, toast]);

  // Update item quantity
  const updateQuantity = useCallback(async (id, delta, variant = "50") => {
    const item = cartItems.find(i => (i.id === id || i.productId === id) && i.variant === variant);
    if (!item) return;

    if (delta > 0) {
      let availableInventory = item.variantDetails?.inventory ?? item.inventory ?? item.product?.inventory ?? Infinity;
      if (item.product?.variants?.length > 0) {
        const matchedVariant = item.product.variants.find(v => {
          if (item.variantDetails) {
            return v.karat === item.variantDetails.karat && 
                   v.metalColor === item.variantDetails.metalColor && 
                   v.size === item.variantDetails.size;
          }
          return false;
        });
        if (matchedVariant && matchedVariant.inventory !== undefined) {
          availableInventory = matchedVariant.inventory;
        }
      } else if (item.variant && item.product?.sizes?.length > 0) {
        const sizeMatch = item.product.sizes.find(s => s.size === item.variant);
        if (sizeMatch && sizeMatch.inventory !== undefined) {
          availableInventory = sizeMatch.inventory;
        }
      }
      if (item.quantity + delta > availableInventory) {
        toast.error(`Only ${availableInventory} items available in stock!`);
        return;
      }
    }

    const newQty = Math.max(1, item.quantity + delta);
    if (newQty === item.quantity) return; // No change (e.g. trying to decrease below 1)

    const isIncrease = delta > 0;
    const actionText = isIncrease ? "Increased" : "Decreased";

    if (token) {
      try {
        const res = await fetch(`${API_URL}/cart`, {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify({
            productId: id,
            quantity: newQty,
            variant: variant
          }),
        });
        if (res.ok) {
          await fetchCart();
        }
      } catch (err) {
        console.error("Update quantity API error:", err);
      }
    } else {
      setCartItems((prev) => {
        const updated = prev.map((item) =>
          (item.id === id || item.productId === id) && item.variant === variant
            ? { ...item, quantity: newQty }
            : item
        );
        saveToLocal(updated);
        return updated;
      });
    }
  }, [token, getHeaders, cartItems, fetchCart, toast]);

  const clearCart = useCallback(async () => {
    if (token) {
      try {
        await fetch(`${API_URL}/cart`, {
          method: "DELETE",
          headers: getHeaders()
        });
        setCartItems([]);
      } catch (err) {
        console.error("Clear cart API error:", err);
      }
    } else {
      setCartItems([]);
      localStorage.removeItem("vardaan_cart");
    }
  }, [token, getHeaders]);

  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        closeCart,
        openCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
