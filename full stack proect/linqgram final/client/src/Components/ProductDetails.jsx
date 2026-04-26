import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Heart, Star, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useProducts } from "../context/ProductContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [activeImg, setActiveImg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const product = useMemo(() => products.find((p) => p._id === id), [id, products]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      // Images are base64 DataURLs — use directly
      setActiveImg(product.images[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 1400);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found 😢</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 rounded-full bg-black text-white"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  const inWishlist = isInWishlist(product._id);
  const discount =
    product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Toast */}
      {toastVisible && (
        <div className="fixed top-20 right-4 z-[999]">
          <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-black text-white shadow-lg">
            <CheckCircle2 size={18} className="text-green-400" />
            <p className="text-sm font-semibold">Added to cart!</p>
          </div>
        </div>
      )}

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-semibold mb-6 hover:opacity-70 transition"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* IMAGE SECTION */}
        <div>
          <div className="rounded-2xl overflow-hidden border bg-gray-50">
            <img
              src={activeImg}
              alt={product.name}
              className="w-full h-[450px] object-cover"
            />
          </div>

          {product.images?.length > 1 && (
            <div className="mt-4 flex gap-3 flex-wrap">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumbnail-${index}`}
                  onClick={() => setActiveImg(img)}
                  className={`h-20 w-20 object-cover rounded-lg cursor-pointer border-2 transition ${
                    activeImg === img ? "border-black scale-105" : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col justify-start">
          {product.tag && (
            <span className="inline-block mb-3 px-3 py-1 bg-black text-white text-xs rounded-full w-fit">
              {product.tag}
            </span>
          )}

          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          {product.rating > 0 && (
            <div className="flex items-center gap-2 mt-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={star <= Math.round(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          )}

          <p className="mt-4 text-gray-600 leading-relaxed">{product.desc}</p>

          <div className="mt-6 flex items-center gap-4">
            <p className="text-3xl font-bold text-gray-900">
              ₹{product.price?.toLocaleString("en-IN")}
            </p>
            {product.oldPrice > 0 && (
              <p className="text-xl text-gray-400 line-through">
                ₹{product.oldPrice?.toLocaleString("en-IN")}
              </p>
            )}
            {discount > 0 && (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-lg">
                {discount}% OFF
              </span>
            )}
          </div>

          {product.longDesc && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-2">Product Details</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{product.longDesc}</p>
            </div>
          )}

          <div className="mt-8 flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 px-6 py-3 bg-black text-white rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition font-semibold"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>

            <button
              onClick={() =>
                inWishlist ? removeFromWishlist(product._id) : addToWishlist(product)
              }
              className="px-6 py-3 bg-gray-100 rounded-xl flex items-center gap-2 hover:bg-gray-200 transition font-semibold"
            >
              <Heart
                size={18}
                fill={inWishlist ? "currentColor" : "none"}
                className={inWishlist ? "text-red-500" : ""}
              />
              {inWishlist ? "Wishlisted" : "Wishlist"}
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="p-3 border rounded-xl text-xs text-gray-600 flex items-center gap-2">
              🚚 Fast Delivery
            </div>
            <div className="p-3 border rounded-xl text-xs text-gray-600 flex items-center gap-2">
              🔒 Secure Checkout
            </div>
            <div className="p-3 border rounded-xl text-xs text-gray-600 flex items-center gap-2">
              💎 Premium Quality
            </div>
            <div className="p-3 border rounded-xl text-xs text-gray-600 flex items-center gap-2">
              ✅ Easy Returns
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
