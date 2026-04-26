import React, { useState, useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import { Trash2, Plus, LogOut, Package, AlertCircle } from "lucide-react";

const OWNER_PASSWORD = "akshat@123";

const Admin = () => {
  const { products, addProduct, deleteProduct } = useProducts();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null); // { type: "success"|"error", text }
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "", desc: "", longDesc: "",
    price: "", oldPrice: "", tag: "",
    rating: "", reviews: "", images: [],
  });

  useEffect(() => {
    if (localStorage.getItem("adminAuth") === "true") setIsLoggedIn(true);
  }, []);

  const showMsg = (type, text) => {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === OWNER_PASSWORD) {
      localStorage.setItem("adminAuth", "true");
      setIsLoggedIn(true);
    } else {
      showMsg("error", "Wrong password ❌");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsLoggedIn(false);
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        })
    );
    const imagesArray = await Promise.all(imagePromises);
    setForm((prev) => ({ ...prev, images: imagesArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.images.length === 0) {
      showMsg("error", "Please upload at least one image");
      return;
    }
    setSubmitting(true);
    const result = await addProduct({
      ...form,
      price: Number(form.price),
      oldPrice: Number(form.oldPrice) || 0,
      rating: Number(form.rating) || 0,
      reviews: Number(form.reviews) || 0,
    });
    setSubmitting(false);

    if (result?.success !== false) {
      showMsg("success", "Product added successfully ✅");
      setForm({ name: "", desc: "", longDesc: "", price: "", oldPrice: "", tag: "", rating: "", reviews: "", images: [] });
    } else {
      showMsg("error", result.error || "Failed to add product");
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    await deleteProduct(id);
    showMsg("success", `"${name}" deleted`);
  };

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-xl p-8 rounded-2xl space-y-4 w-80"
        >
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-xl mx-auto">
              A
            </div>
            <h2 className="text-xl font-bold mt-3">Admin Login</h2>
            <p className="text-gray-400 text-sm mt-1">AkshatStore Management</p>
          </div>

          {msg && (
            <div className={`p-3 rounded-xl text-sm flex items-center gap-2 ${msg.type === "error" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
              <AlertCircle size={15} />
              {msg.text}
            </div>
          )}

          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-black"
            required
          />
          <button type="submit" className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition">
            Login
          </button>
        </form>
      </div>
    );
  }

  // ADMIN PANEL
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} products in store</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition text-sm font-semibold"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Notification */}
      {msg && (
        <div className={`mb-6 p-4 rounded-xl text-sm flex items-center gap-2 ${msg.type === "error" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
          <AlertCircle size={16} />
          {msg.text}
        </div>
      )}

      {/* ADD PRODUCT FORM */}
      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-2xl border space-y-4 mb-10">
        <h2 className="text-xl font-bold flex items-center gap-2"><Plus size={18} /> Add New Product</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Product Name *" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-black text-sm" required />

          <input type="text" placeholder="Tag (e.g. Bestseller, New)" value={form.tag}
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
            className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-black text-sm" />

          <input type="number" placeholder="Price (₹) *" value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-black text-sm" required min="0" />

          <input type="number" placeholder="Old Price (₹) — for strikethrough" value={form.oldPrice}
            onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
            className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-black text-sm" min="0" />

          <input type="number" placeholder="Rating (0–5)" value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
            className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-black text-sm" min="0" max="5" step="0.1" />

          <input type="number" placeholder="Number of Reviews" value={form.reviews}
            onChange={(e) => setForm({ ...form, reviews: e.target.value })}
            className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-black text-sm" min="0" />
        </div>

        <textarea placeholder="Short Description" value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
          rows={2} className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-black text-sm" />

        <textarea placeholder="Long Description (product details, material, care instructions…)" value={form.longDesc}
          onChange={(e) => setForm({ ...form, longDesc: e.target.value })}
          rows={3} className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-black text-sm" />

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Images * (select multiple)
          </label>
          <input type="file" multiple accept="image/*" onChange={handleImageUpload}
            className="w-full p-2 border rounded-xl text-sm" required={form.images.length === 0} />
        </div>

        {form.images.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            {form.images.map((img, i) => (
              <img key={i} src={img} alt="preview" className="h-20 w-20 object-cover rounded-xl border" />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition disabled:opacity-50 flex items-center gap-2"
        >
          {submitting ? (
            <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Adding…</>
          ) : (
            <><Plus size={16} /> Add Product</>
          )}
        </button>
      </form>

      {/* PRODUCT LIST */}
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Package size={18} /> Current Products ({products.length})
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-400 text-center py-10">No products yet. Add one above!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border rounded-2xl overflow-hidden bg-white shadow-sm">
              {product.images?.length > 0 ? (
                <img src={product.images[0]} alt={product.name}
                  className="h-40 w-full object-cover" />
              ) : (
                <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  No Image
                </div>
              )}

              <div className="p-4">
                <h3 className="font-bold truncate">{product.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-gray-800 font-semibold">₹{product.price?.toLocaleString("en-IN")}</p>
                  {product.oldPrice > 0 && (
                    <p className="text-gray-400 text-sm line-through">₹{product.oldPrice?.toLocaleString("en-IN")}</p>
                  )}
                </div>
                {product.tag && (
                  <span className="inline-block mt-1 text-xs bg-gray-100 px-2 py-1 rounded-full">{product.tag}</span>
                )}

                <button
                  onClick={() => handleDelete(product._id, product.name)}
                  className="mt-3 w-full flex items-center justify-center gap-2 bg-red-50 text-red-500 py-2 rounded-xl hover:bg-red-100 transition text-sm font-semibold"
                >
                  <Trash2 size={15} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
