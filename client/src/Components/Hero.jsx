import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Truck, Gem } from "lucide-react";

const Hero = () => {
  return (
    <section className="w-full bg-gradient-to-b from-[#fff7f2] via-white to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm">
            <Sparkles size={16} />
            <span>New Collection • 2026 Luxury Drop</span>
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Jewellery that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c07c54] to-[#ff4d6d]">
              shines like you
            </span>
          </h1>

          <p className="mt-5 text-gray-600 text-base md:text-lg leading-relaxed max-w-xl">
            Discover handcrafted rings, necklaces, and earrings designed for
            modern elegance — premium finish, perfect sparkle, and timeless
            beauty.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button className="group px-6 py-3 rounded-full bg-black text-white font-semibold flex items-center justify-center gap-2 hover:bg-gray-900 transition">
              Explore Collection
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </button>

            <button className="px-6 py-3 rounded-full border border-gray-300 font-semibold text-gray-800 hover:bg-gray-100 transition">
              View Best Sellers
            </button>
          </div>

          {/* TRUST BADGES */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border">
              <ShieldCheck className="text-green-600" size={22} />
              <p className="text-sm font-semibold text-gray-800">
                Certified Quality
              </p>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border">
              <Truck className="text-blue-600" size={22} />
              <p className="text-sm font-semibold text-gray-800">
                Fast Delivery
              </p>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border">
              <Gem className="text-pink-600" size={22} />
              <p className="text-sm font-semibold text-gray-800">
                Premium Finish
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE UNIQUE DESIGN */}
        <div className="relative flex items-center justify-center">
          {/* Background Glow */}
          <div className="absolute w-[350px] h-[350px] md:w-[420px] md:h-[420px] rounded-full bg-gradient-to-tr from-[#ff4d6d]/30 via-[#ffd1b3]/30 to-[#c07c54]/30 blur-3xl"></div>

          {/* Main Hero Card */}
          <div className="relative w-full max-w-md rounded-[30px] p-6 bg-white shadow-xl border overflow-hidden">
            {/* Decorative lines */}
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gradient-to-br from-[#ff4d6d]/30 to-[#c07c54]/20 blur-2xl"></div>
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-gradient-to-br from-[#ffd1b3]/40 to-[#ff4d6d]/10 blur-2xl"></div>

            {/* Product Image Area (fake product) */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#fff0e7] to-white border p-6">
              <p className="text-sm font-semibold text-gray-600">
                Featured Piece
              </p>
              <h3 className="text-xl font-extrabold text-gray-900 mt-1">
                Rose Gold Pearl Set
              </h3>

              {/* Jewellery Illustration */}
              <div className="mt-6 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-white border shadow-sm flex items-center justify-center relative">
                  {/* Necklace circle */}
                  <div className="w-28 h-28 rounded-full border-2 border-[#c07c54]"></div>
                  {/* Pearl */}
                  <div className="absolute bottom-8 w-7 h-7 rounded-full bg-gradient-to-br from-white to-gray-200 shadow"></div>
                </div>
              </div>

              {/* Price */}
              <div className="mt-6 flex items-center justify-between">
                <p className="text-gray-600 text-sm">Starting from</p>
                <p className="text-lg font-extrabold text-gray-900">₹3,499</p>
              </div>
            </div>

            {/* Floating mini cards */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border bg-white shadow-sm hover:shadow-md transition">
                <p className="text-xs text-gray-500">Today’s Deal</p>
                <p className="font-bold text-gray-900">Earrings</p>
                <p className="text-sm text-[#ff4d6d] font-semibold mt-1">
                  Up to 40% Off
                </p>
              </div>

              <div className="p-4 rounded-2xl border bg-white shadow-sm hover:shadow-md transition">
                <p className="text-xs text-gray-500">Trending</p>
                <p className="font-bold text-gray-900">Rings</p>
                <p className="text-sm text-[#c07c54] font-semibold mt-1">
                  New Arrival
                </p>
              </div>
            </div>
          </div>

          {/* Side Floating Badge */}
          <div className="absolute -left-3 md:-left-6 top-10 rotate-[-8deg] px-4 py-2 rounded-2xl bg-black text-white shadow-lg text-sm font-semibold">
            ✨ Handcrafted
          </div>

          <div className="absolute -right-3 md:-right-6 bottom-12 rotate-[8deg] px-4 py-2 rounded-2xl bg-white border shadow-lg text-sm font-semibold text-gray-900">
            💎 Premium Shine
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
