import React, { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Helper: get stable ID (supports _id and id)
  const getId = (product) => product._id || product.id;

  const addToWishlist = (product) => {
    const productId = getId(product);
    setWishlist((prev) => {
      if (prev.find((item) => getId(item) === productId)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => getId(item) !== id));
  };

  const isInWishlist = (id) => {
    return wishlist.some((item) => getId(item) === id);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
