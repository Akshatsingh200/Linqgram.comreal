import React from "react";

const About = () => {
  const features = [
    { icon: "🔧", title: "Developer Tools", desc: "Curated tools for every stage of development." },
    { icon: "🎨", title: "Design Resources", desc: "UI kits, illustrations, and design inspiration." },
    { icon: "🤖", title: "AI Powered", desc: "Latest AI tools to supercharge your workflow." },
    { icon: "🚀", title: "Startup Hub", desc: "Resources to launch and grow your startup." },
  ];

  const team = [
    { name: "Akshat Singh", role: "Founder & Developer", avatar: "A" },
    { name: "LinqGram Team", role: "Curators & Designers", avatar: "L" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      {/* Hero */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <span className="text-sm bg-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full border border-indigo-500/30">
          About LinqGram
        </span>
        <h1 className="text-5xl font-black mt-5 mb-5 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Your All-in-One Tool Hub
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          LinqGram is a curated platform for developers, designers, marketers, and creators —
          bringing the best tools, resources, and inspiration into one place.
        </p>
      </div>

      {/* Image + Text */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 mb-20">
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"
            alt="Team working"
            className="rounded-2xl shadow-2xl w-full object-cover h-[300px]"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Why LinqGram?</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            We built LinqGram because finding the right tools is time-consuming.
            Instead of searching across dozens of websites, you can discover everything here —
            organized, categorized, and always updated.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Whether you're building your first app, designing a brand, or launching a startup —
            LinqGram has what you need to move faster and smarter.
          </p>
          <div className="flex gap-6 mt-6">
            <div className="text-center">
              <div className="text-3xl font-black text-indigo-400">200+</div>
              <div className="text-gray-500 text-sm">Tools Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-pink-400">18</div>
              <div className="text-gray-500 text-sm">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-purple-400">Free</div>
              <div className="text-gray-500 text-sm">Forever</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center mb-10">What We Offer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/40 hover:bg-white/8 transition-all duration-300"
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold mb-10">Meet the Team</h2>
        <div className="flex justify-center gap-8 flex-wrap">
          {team.map((member, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-2xl font-black">
                {member.avatar}
              </div>
              <div>
                <p className="font-semibold">{member.name}</p>
                <p className="text-gray-400 text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-indigo-900/50 to-pink-900/50 border border-white/10 rounded-2xl p-10">
        <h2 className="text-2xl font-bold mb-3">Have a tool to suggest?</h2>
        <p className="text-gray-400 mb-6">
          We're always looking to add the best tools to LinqGram. Reach out to us!
        </p>
        <a
          href="/contact"
          className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full font-semibold hover:opacity-90 transition-all"
        >
          Contact Us →
        </a>
      </div>
    </div>
  );
};

export default About;
