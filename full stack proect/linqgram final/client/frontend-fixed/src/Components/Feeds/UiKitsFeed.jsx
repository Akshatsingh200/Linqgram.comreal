import React from "react";
import SimpleCard from "../Cards/SimpleCard";
import "./FeedCommon.css";

const UiKitsFeed = () => {
  const kits = [
    { id: 1, title: "Shadcn UI", img: "https://logo.clearbit.com/ui.shadcn.com", items: "Beautiful components built with Radix UI and Tailwind.", link: "https://ui.shadcn.com" },
    { id: 2, title: "Material UI", img: "https://logo.clearbit.com/mui.com", items: "React components implementing Google's Material Design.", link: "https://mui.com" },
    { id: 3, title: "Chakra UI", img: "https://logo.clearbit.com/chakra-ui.com", items: "Simple, modular and accessible component library.", link: "https://chakra-ui.com" },
    { id: 4, title: "Ant Design", img: "https://logo.clearbit.com/ant.design", items: "Enterprise-class UI design language for React.", link: "https://ant.design" },
    { id: 5, title: "Mantine", img: "https://logo.clearbit.com/mantine.dev", items: "Full-featured React components library.", link: "https://mantine.dev" },
    { id: 6, title: "DaisyUI", img: "https://logo.clearbit.com/daisyui.com", items: "The most popular Tailwind CSS component library.", link: "https://daisyui.com" },
    { id: 7, title: "Radix UI", img: "https://logo.clearbit.com/radix-ui.com", items: "Unstyled, accessible UI primitives for React.", link: "https://www.radix-ui.com" },
    { id: 8, title: "Headless UI", img: "https://logo.clearbit.com/headlessui.com", items: "Completely unstyled accessible UI components.", link: "https://headlessui.com" },
    { id: 9, title: "Flowbite", img: "https://logo.clearbit.com/flowbite.com", items: "Open-source UI components built with Tailwind CSS.", link: "https://flowbite.com" },
  ];

  return (
    <div className="feed">
      <div className="banner">
        <h1>🎨 UI Kits</h1>
        <p>Best React component libraries to build beautiful UIs faster.</p>
      </div>
      <div className="feed-grid">
        {kits.map((k) => (
          <div key={k.id} onClick={() => window.open(k.link, "_blank")} className="cursor-pointer">
            <SimpleCard title={k.title} img={k.img} items={k.items} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UiKitsFeed;
