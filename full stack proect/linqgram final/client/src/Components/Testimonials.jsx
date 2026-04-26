import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    review:
      "Absolutely love the rose gold set I ordered! The quality is stunning — far better than I expected at this price. Packaging was beautiful and delivery was super fast. Highly recommend!",
    product: "Rose Gold Pearl Set",
    avatar: "P",
    color: "from-pink-400 to-rose-500",
  },
  {
    id: 2,
    name: "Anjali Verma",
    location: "Mumbai",
    rating: 5,
    review:
      "I bought earrings as a gift for my sister and she was thrilled! The craftsmanship is excellent and they look even more beautiful in person. Will definitely shop here again.",
    product: "Diamond Drop Earrings",
    avatar: "A",
    color: "from-purple-400 to-indigo-500",
  },
  {
    id: 3,
    name: "Rekha Nair",
    location: "Bangalore",
    rating: 5,
    review:
      "The necklace I ordered is absolutely gorgeous! Wore it to a wedding and received so many compliments. The customer service was also very helpful when I had a query.",
    product: "Gold Layered Necklace",
    avatar: "R",
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: 4,
    name: "Sunita Joshi",
    location: "Jaipur",
    rating: 4,
    review:
      "Very good quality jewellery at affordable prices. The bangles set I ordered looks premium and has held its shine even after weeks of regular wear. Great purchase!",
    product: "Traditional Bangle Set",
    avatar: "S",
    color: "from-teal-400 to-green-500",
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));
  const next = () => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1));

  const t = testimonials[active];

  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">What Our Customers Say</h2>
          <p className="text-gray-500 mt-2">Real reviews from real customers ✨</p>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all ${
                i === active ? "w-8 h-3 bg-black" : "w-3 h-3 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="relative bg-white rounded-3xl shadow-xl border p-8 md:p-10">
          <Quote className="absolute top-6 left-6 text-gray-100" size={48} />

          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Avatar */}
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${t.color} text-white flex items-center justify-center text-2xl font-bold flex-shrink-0`}>
              {t.avatar}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    className={s <= t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}
                  />
                ))}
              </div>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed relative z-10">
                "{t.review}"
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div>
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-400">{t.location} · Bought: {t.product}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nav Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Stats row */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl border bg-white">
            <p className="text-2xl font-extrabold text-gray-900">500+</p>
            <p className="text-sm text-gray-500 mt-1">Happy Customers</p>
          </div>
          <div className="p-4 rounded-2xl border bg-white">
            <p className="text-2xl font-extrabold text-gray-900">4.9★</p>
            <p className="text-sm text-gray-500 mt-1">Average Rating</p>
          </div>
          <div className="p-4 rounded-2xl border bg-white">
            <p className="text-2xl font-extrabold text-gray-900">100%</p>
            <p className="text-sm text-gray-500 mt-1">Verified Reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
