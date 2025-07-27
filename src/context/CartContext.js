// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children, isAuthenticated }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage or API
  useEffect(() => {
    if (isAuthenticated) {
      axios.get("/api/cart/", { withCredentials: true }).then(res => {
        setCart(res.data.items || []);
      });
    } else {
      const stored = localStorage.getItem("cart");
      setCart(stored ? JSON.parse(stored) : []);
    }
  }, [isAuthenticated]);

  const saveCart = (newCart) => {
    setCart(newCart);
    if (!isAuthenticated) {
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      axios.post("/api/cart/update/", { items: newCart }, { withCredentials: true });
    }
  };

  const addToCart = (product, qty = 1) => {
    const existing = cart.find((item) => item.id === product.id);
    const updatedCart = existing
      ? cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        )
      : [...cart, { ...product, qty }];
    saveCart(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    saveCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
