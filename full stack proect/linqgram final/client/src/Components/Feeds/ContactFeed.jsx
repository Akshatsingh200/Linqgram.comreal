import React, { useState } from "react";
import { toast } from "react-toastify";

const ContactFeed = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async submit
    await new Promise((r) => setTimeout(r, 800));
    // ✅ Fixed: toast instead of alert()
    toast.success("✅ Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  const contactInfo = [
    { icon: "📧", label: "Email", value: "singhakshatsingh83@gmail.com" },
    { icon: "🌐", label: "Website", value: "linqgram.vercel.app" },
    { icon: "💬", label: "Response Time", value: "Within 24 hours" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm bg-pink-500/20 text-pink-300 px-4 py-1.5 rounded-full border border-pink-500/30">
            Get in Touch
          </span>
          <h1 className="text-4xl font-black mt-4 mb-3 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Have a question, suggestion, or want to submit a tool? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Info Cards */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {contactInfo.map((info, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:border-indigo-500/30 transition-all"
              >
                <div className="text-3xl">{info.icon}</div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">{info.label}</p>
                  <p className="text-white font-medium text-sm">{info.value}</p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-gray-400 text-sm mb-3">Follow Us</p>
              <div className="flex gap-3">
                {["GitHub", "Twitter", "LinkedIn"].map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300 hover:border-indigo-500/40 hover:text-white cursor-pointer transition-all"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3 bg-white/5 border border-white/10 rounded-2xl p-7">
            <h2 className="text-xl font-semibold mb-6 text-gray-200">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="Tool suggestion / Bug report / Question"
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Write your message here..."
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 text-sm"
              >
                {loading ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFeed;
