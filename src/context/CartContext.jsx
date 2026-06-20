"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]); // Simplified to an array of items for now

  // Add an item to the cart and open the drawer
  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      // Very basic logic: just append or increase quantity.
      // Assuming product has { id, name, price, image }
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
          : item
      )
    );
  }, []);

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
