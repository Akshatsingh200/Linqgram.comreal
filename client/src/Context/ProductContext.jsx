import React, { createContext, useContext, useState, useEffect } from "react";
import { API_BASE } from "../utils/config";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH ALL PRODUCTS
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/products`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ADD PRODUCT
  const addProduct = async (product) => {
    try {
      const response = await fetch(`${API_BASE}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setProducts((prev) => [data, ...prev]);
      return { success: true, product: data };
    } catch (error) {
      console.error("Add error:", error);
      return { success: false, error: error.message };
    }
  };

  // UPDATE PRODUCT
  const updateProduct = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_BASE}/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setProducts((prev) => prev.map((p) => (p._id === id ? data : p)));
      return { success: true, product: data };
    } catch (error) {
      console.error("Update error:", error);
      return { success: false, error: error.message };
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Delete failed");
      setProducts((prev) => prev.filter((p) => p._id !== id));
      return { success: true };
    } catch (error) {
      console.error("Delete error:", error);
      return { success: false, error: error.message };
    }
  };

  return (
    <ProductContext.Provider
      value={{ products, loading, addProduct, updateProduct, deleteProduct, fetchProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
