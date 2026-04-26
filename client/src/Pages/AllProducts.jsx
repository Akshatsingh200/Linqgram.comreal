import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const AllProducts = () => {
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-500">No Products Available</h2>
        <p className="text-gray-400 mt-2">Check back later or add products via the admin panel.</p>
      </div>
    );
  }

  return (
    <section className="w-full py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center">All Products</h2>
        <p className="text-center text-gray-500 mt-2">{products.length} products available</p>

        {/* Search Bar */}
        <div className="mt-6 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-black text-sm"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No products match your search.</div>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((item) => {
              // Images stored as base64 DataURLs — use directly
              const image = item.images?.length > 0 ? item.images[0] : null;
              const inWishlist = isInWishlist(item._id);

              return (
                <div
                  key={item._id}
                  className="group cursor-pointer rounded-3xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition duration-300"
                >
                  <div
                    className="relative overflow-hidden"
                    onClick={() => navigate(`/product/${item._id}`)}
                  >
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
                      <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded-full">
                        {item.tag}
                      </span>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        inWishlist ? removeFromWishlist(item._id) : addToWishlist(item);
                      }}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition"
                    >
                      <Heart
                        size={16}
                        className={inWishlist ? "text-red-500" : "text-gray-700"}
                        fill={inWishlist ? "currentColor" : "none"}
                      />
                    </button>
                  </div>

                  <div className="p-4" onClick={() => navigate(`/product/${item._id}`)}>
                    <h3 className="font-bold text-base truncate">{item.name}</h3>

                    {item.rating > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-gray-500">{item.rating}</span>
                      </div>
                    )}

                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-900">₹{item.price?.toLocaleString("en-IN")}</p>
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
                        }}
                        className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition"
                      >
                        <ShoppingCart size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
