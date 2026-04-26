import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQty, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const phoneNumber = "918595013983";
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Helper to get stable ID
  const getId = (item) => item._id || item.id;

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    let message = `🛍 New Order\n\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Qty: ${item.qty}  |  ₹${item.price} x ${item.qty} = ₹${item.price * item.qty}\n\n`;
    });
    message += `💰 Total: ₹${totalAmount}\n\n`;
    if (customerName) message += `👤 Name: ${customerName}\n`;
    if (customerPhone) message += `📞 Phone: ${customerPhone}\n`;
    message += `\nThank you 🙏`;

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-3xl font-bold text-gray-700">Your cart is empty</h2>
        <p className="text-gray-400 mt-2">Browse our products and add items to your cart.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-8 px-8 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const image = item.images?.length > 0 ? item.images[0] : null;
            const itemId = getId(item);

            return (
              <div
                key={itemId}
                className="flex gap-4 p-4 border rounded-2xl bg-white shadow-sm"
              >
                {image ? (
                  <img
                    src={image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
                    No Image
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 truncate">{item.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">₹{item.price?.toLocaleString("en-IN")} each</p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQty(itemId, item.qty - 1)}
                      className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100 transition"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-bold w-6 text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQty(itemId, item.qty + 1)}
                      className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100 transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between flex-shrink-0">
                  <button
                    onClick={() => removeFromCart(itemId)}
                    className="text-red-400 hover:text-red-600 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                  <p className="font-bold text-gray-900">
                    ₹{(item.price * item.qty).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white border rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-bold">Order Summary</h2>

            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
              <span>₹{totalAmount.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>
              <span className="text-green-600 font-semibold">Free</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-extrabold text-lg">
              <span>Total</span>
              <span>₹{totalAmount.toLocaleString("en-IN")}</span>
            </div>

            {/* Customer Info */}
            <div className="space-y-2 pt-2">
              <input
                type="text"
                placeholder="Your Name (optional)"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                placeholder="Your Phone (optional)"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full p-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition flex items-center justify-center gap-2"
            >
              📱 Order on WhatsApp
            </button>

            <button
              onClick={() => navigate("/all-products")}
              className="w-full py-2 text-sm text-gray-500 hover:text-gray-800 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
