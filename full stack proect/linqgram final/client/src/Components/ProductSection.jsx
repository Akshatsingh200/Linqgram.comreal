import React, { useState } from "react";
import { Heart, ShoppingCart, CheckCircle2, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useProducts } from "../context/ProductContext";

const ProductSection = () => {
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [toast, setToast] = useState({ show: false, name: "" });

  const showToast = (name) => {
    setToast({ show: true, name });
    setTimeout(() => setToast({ show: false, name: "" }), 1400);
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-500">No Products Available</h2>
        <p className="text-gray-400 mt-2">Products added from admin will appear here.</p>
      </div>
    );
  }

  return (
    <section className="w-full py-14 bg-white relative">
      {toast.show && (
        <div className="fixed top-20 right-4 z-[999]">
          <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-black text-white shadow-lg">
            <CheckCircle2 size={18} className="text-green-400" />
            <p className="text-sm font-semibold">
              Added <span className="font-bold">{toast.name}</span> to cart
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-extrabold text-center">Featured Products</h2>
        <p className="text-center text-gray-500 mt-2">Our handpicked top picks just for you</p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((item) => {
            // Images are stored as base64 DataURLs — use directly
            const image = item.images?.length > 0 ? item.images[0] : null;
            const inWishlist = isInWishlist(item._id);

            return (
              <div
                key={item._id}
                onClick={() => navigate(`/product/${item._id}`)}
                className="group cursor-pointer rounded-3xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition duration-300"
              >
                <div className="relative overflow-hidden">
                  {image ? (
                    <img
                      src={image}
                      alt={item.name}
                      className="h-56 w-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  ) : (
                    <div className="h-56 flex items-center justify-center bg-gray-100 text-gray-400">
                      No Image
                    </div>
                  )}

                  {item.tag && (
                    <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full font-semibold">
                      {item.tag}
                    </span>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      inWishlist ? removeFromWishlist(item._id) : addToWishlist(item);
                    }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition"
                  >
                    <Heart
                      size={18}
                      className={inWishlist ? "text-red-500" : "text-gray-900"}
                      fill={inWishlist ? "currentColor" : "none"}
                    />
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-bold truncate">{item.name}</h3>

                  {item.rating > 0 && (
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={13} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-xs text-gray-500">{item.rating} ({item.reviews})</span>
                    </div>
                  )}

                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold">₹{item.price?.toLocaleString("en-IN")}</p>
                      {item.oldPrice > 0 && (
                        <p className="text-xs text-gray-400 line-through">
                          ₹{item.oldPrice?.toLocaleString("en-IN")}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                        showToast(item.name);
                      }}
                      className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {products.length > 4 && (
          <div className="text-center mt-10">
            <button
              onClick={() => navigate("/all-products")}
              className="px-8 py-3 border-2 border-black rounded-full font-bold hover:bg-black hover:text-white transition"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
