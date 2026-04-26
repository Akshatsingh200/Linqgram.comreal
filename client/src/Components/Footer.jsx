import React from "react";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  ShieldCheck,
  BadgeCheck,
  Truck,
  Sparkles,
  Gem,
  PhoneCall,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative w-full bg-black text-white overflow-hidden mt-14">
      {/* Luxury Gradient Border */}
      <div className="h-1 w-full bg-gradient-to-r from-[#ff4d6d] via-[#ffd1b3] to-[#c07c54]" />

      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#ff4d6d]/30 blur-3xl rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#c07c54]/30 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-14">
        {/* Top: Unique Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-3xl p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-green-400" />
              <h3 className="font-extrabold text-lg">100% Secure Checkout</h3>
            </div>
            <p className="text-sm text-gray-300 mt-2">
              Your payments are protected with safe & encrypted systems.
            </p>
          </div>

          <div className="rounded-3xl p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition">
            <div className="flex items-center gap-3">
              <BadgeCheck className="text-yellow-300" />
              <h3 className="font-extrabold text-lg">Certified Jewellery</h3>
            </div>
            <p className="text-sm text-gray-300 mt-2">
              Hallmarked & quality-certified designs for true elegance.
            </p>
          </div>

          <div className="rounded-3xl p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition">
            <div className="flex items-center gap-3">
              <Truck className="text-blue-300" />
              <h3 className="font-extrabold text-lg">Fast Delivery</h3>
            </div>
            <p className="text-sm text-gray-300 mt-2">
              Quick dispatch with premium packaging & tracking support.
            </p>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-extrabold">
                A
              </div>
              <h2 className="text-xl font-extrabold tracking-wide">
                AkshatJewels
              </h2>
            </div>

            <p className="mt-4 text-sm text-gray-300 leading-relaxed">
              Luxury jewellery made for modern style ✨ Shine everyday with
              handcrafted premium designs.
            </p>

            <div className="mt-6 space-y-3 text-sm text-gray-300">
              <p className="flex items-center gap-2">
                <MapPin size={18} className="text-gray-200" />
                Ambedkar Nagar, UP
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall size={18} className="text-gray-200" />
                +91 98765 43210
              </p>
              <p className="flex items-center gap-2">
                <Mail size={18} className="text-gray-200" />
                support@akshatjewels.com
              </p>
            </div>
          </div>

          {/* Unique: Jewellery Care Tips */}
          <div>
            <h3 className="text-lg font-extrabold flex items-center gap-2">
              <Gem className="text-[#ffd1b3]" /> Jewellery Care Tips
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-300">
              <li className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                ✅ Keep away from perfume & water
              </li>
              <li className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                ✅ Store in a dry velvet box
              </li>
              <li className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                ✅ Clean with soft cotton cloth
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-extrabold">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-300">
              <li className="hover:text-white cursor-pointer transition">
                Home
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Shop
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Wishlist
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Cart
              </li>
              <li className="hover:text-white cursor-pointer transition">
                My Account
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-extrabold flex items-center gap-2">
              <Sparkles className="text-[#ff4d6d]" /> Sparkle Letter
            </h3>
            <p className="mt-4 text-sm text-gray-300 leading-relaxed">
              Get jewellery drops, exclusive deals & styling tips directly in
              your inbox.
            </p>

            <div className="mt-5 flex items-center gap-2 bg-white rounded-full overflow-hidden p-1">
              <input
                type="text"
                placeholder="Enter email..."
                className="w-full px-4 py-2 text-black outline-none text-sm"
              />
              <button className="px-5 py-2 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#c07c54] text-white font-bold hover:opacity-90 transition">
                Join
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition cursor-pointer">
                <Instagram size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition cursor-pointer">
                <Facebook size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition cursor-pointer">
                <Twitter size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} AkshatJewels. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="hover:text-white cursor-pointer transition">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Terms
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Refund
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
