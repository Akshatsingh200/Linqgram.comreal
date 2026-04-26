import React from "react";
import SimpleCard from "../Cards/SimpleCard";
import "./FeedCommon.css";

const FrameworksFeed = () => {
  const frameworks = [
    { id: 1, title: "Next.js", img: "https://logo.clearbit.com/nextjs.org", items: "The React framework for production apps with SSR & SSG.", link: "https://nextjs.org" },
    { id: 2, title: "React", img: "https://logo.clearbit.com/react.dev", items: "A JavaScript library for building user interfaces.", link: "https://react.dev" },
    { id: 3, title: "Vue.js", img: "https://logo.clearbit.com/vuejs.org", items: "Progressive JavaScript framework for building UIs.", link: "https://vuejs.org" },
    { id: 4, title: "Nuxt.js", img: "https://logo.clearbit.com/nuxt.com", items: "The intuitive Vue framework for full-stack apps.", link: "https://nuxt.com" },
    { id: 5, title: "SvelteKit", img: "https://logo.clearbit.com/kit.svelte.dev", items: "Full-stack framework powered by Svelte.", link: "https://kit.svelte.dev" },
    { id: 6, title: "Astro", img: "https://logo.clearbit.com/astro.build", items: "All-in-one web framework for content-driven websites.", link: "https://astro.build" },
    { id: 7, title: "Remix", img: "https://logo.clearbit.com/remix.run", items: "Full-stack web framework focused on web standards.", link: "https://remix.run" },
    { id: 8, title: "Angular", img: "https://logo.clearbit.com/angular.io", items: "Platform for building mobile & desktop web apps.", link: "https://angular.io" },
    { id: 9, title: "Express.js", img: "https://logo.clearbit.com/expressjs.com", items: "Fast, minimalist web framework for Node.js.", link: "https://expressjs.com" },
  ];

  return (
    <div className="feed">
      <div className="banner">
        <h1>🛠️ Frameworks</h1>
        <p>Top frontend and backend frameworks to build modern web apps.</p>
      </div>
      <div className="feed-grid">
        {frameworks.map((f) => (
          <div key={f.id} onClick={() => window.open(f.link, "_blank")} className="cursor-pointer">
            <SimpleCard title={f.title} img={f.img} items={f.items} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrameworksFeed;
