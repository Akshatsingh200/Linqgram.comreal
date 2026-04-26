import React from "react";
import SimpleCard from "../Cards/SimpleCard";
import "./FeedCommon.css";

const LogosFeed = () => {
  const tools = [
    { id: 1, title: "Looka", img: "https://logo.clearbit.com/looka.com", items: "AI-powered logo maker for your brand.", link: "https://looka.com" },
    { id: 2, title: "Hatchful", img: "https://logo.clearbit.com/hatchful.shopify.com", items: "Free logo creator by Shopify.", link: "https://hatchful.shopify.com" },
    { id: 3, title: "Brandmark", img: "https://logo.clearbit.com/brandmark.io", items: "AI logo design tool for startups.", link: "https://brandmark.io" },
    { id: 4, title: "LogoMakr", img: "https://logo.clearbit.com/logomakr.com", items: "Simple drag-and-drop logo creator.", link: "https://logomakr.com" },
    { id: 5, title: "Canva Logo Maker", img: "https://logo.clearbit.com/canva.com", items: "Create professional logos with Canva.", link: "https://www.canva.com/create/logos" },
    { id: 6, title: "Wix Logo Maker", img: "https://logo.clearbit.com/wix.com", items: "AI-driven logo design by Wix.", link: "https://www.wix.com/logo/maker" },
    { id: 7, title: "DesignEvo", img: "https://logo.clearbit.com/designevo.com", items: "10,000+ logo templates to customize.", link: "https://www.designevo.com" },
    { id: 8, title: "Tailor Brands", img: "https://logo.clearbit.com/tailorbrands.com", items: "Brand identity builder with logo AI.", link: "https://www.tailorbrands.com" },
    { id: 9, title: "Adobe Express", img: "https://logo.clearbit.com/adobe.com", items: "Quick and free Adobe logo maker.", link: "https://www.adobe.com/express/create/logo" },
  ];

  return (
    <div className="feed">
      <div className="banner">
        <h1>🏷️ Logo Makers</h1>
        <p>Create stunning logos for your brand with these AI-powered tools.</p>
      </div>
      <div className="feed-grid">
        {tools.map((t) => (
          <div key={t.id} onClick={() => window.open(t.link, "_blank")} className="cursor-pointer">
            <SimpleCard title={t.title} img={t.img} items={t.items} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogosFeed;
