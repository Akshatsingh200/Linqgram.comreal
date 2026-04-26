import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Helper: get the stable ID from a product (supports both _id and id)
  const getId = (product) => product._id || product.id;

  const addToCart = (product) => {
    const productId = getId(product);
    setCart((prev) => {
      const existing = prev.find((item) => getId(item) === productId);
      if (existing) {
        return prev.map((item) =>
          getId(item) === productId ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => getId(item) !== id));
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) => (getId(item) === id ? { ...item, qty } : item))
    );
  };

  const clearCart = () => setCart([]);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, cartCount, addToCart, removeFromCart, updateQty, clearCart, totalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
