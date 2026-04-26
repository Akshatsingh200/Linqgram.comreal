import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const getId = (item) => item._id || item.id;

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="text-center py-20">
        <Heart size={64} className="mx-auto text-gray-200 mb-4" />
        <h2 className="text-2xl font-bold text-gray-600">Your Wishlist is Empty</h2>
        <p className="text-gray-400 mt-2">Save items you love for later.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-8 px-8 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition"
        >
          Discover Products
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">My Wishlist</h2>
        <span className="text-gray-500 text-sm">{wishlist.length} item{wishlist.length !== 1 ? "s" : ""}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => {
          // Images stored as base64 DataURLs — use directly
          const image = item.images?.length > 0 ? item.images[0] : item.img || "";
          const itemId = getId(item);

          return (
            <div
              key={itemId}
              className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition bg-white"
            >
              <div
                className="relative cursor-pointer"
                onClick={() => navigate(`/product/${itemId}`)}
              >
                {image ? (
                  <img
                    src={image}
                    alt={item.name}
                    className="h-52 w-full object-cover hover:scale-105 transition duration-300"
                  />
                ) : (
                  <div className="h-52 flex items-center justify-center bg-gray-100 text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3
                  className="font-bold cursor-pointer hover:underline"
                  onClick={() => navigate(`/product/${itemId}`)}
                >
                  {item.name}
                </h3>
                <p className="text-gray-600 mt-1">₹{item.price?.toLocaleString("en-IN")}</p>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      addToCart(item);
                      removeFromWishlist(itemId);
                    }}
                    className="flex-1 bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition flex items-center justify-center gap-2 text-sm font-semibold"
                  >
                    <ShoppingCart size={15} />
                    Move to Cart
                  </button>

                  <button
                    onClick={() => removeFromWishlist(itemId)}
                    className="w-10 h-10 flex-shrink-0 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition flex items-center justify-center"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Wishlist;
