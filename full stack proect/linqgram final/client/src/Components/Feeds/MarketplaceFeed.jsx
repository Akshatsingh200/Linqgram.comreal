import React from "react";
import SimpleCard from "../Cards/SimpleCard";
import "./FeedCommon.css";

const MarketplaceFeed = () => {
  const marketplaces = [
    {
      id: 1,
      title: "Etsy",
      img: "https://logo.clearbit.com/etsy.com",
      items: "Handmade, vintage & unique goods.",
      link: "https://www.etsy.com",
    },
    {
      id: 2,
      title: "ThemeForest",
      img: "https://logo.clearbit.com/themeforest.net",
      items: "Premium website themes & templates.",
      link: "https://themeforest.net",
    },
    {
      id: 3,
      title: "Creative Market",
      img: "https://logo.clearbit.com/creativemarket.com",
      items: "Design assets & templates marketplace.",
      link: "https://creativemarket.com",
    },
    {
      id: 4,
      title: "Gumroad",
      img: "https://logo.clearbit.com/gumroad.com",
      items: "Sell digital products directly.",
      link: "https://gumroad.com",
    },
    {
      id: 5,
      title: "Udemy",
      img: "https://logo.clearbit.com/udemy.com",
      items: "Online courses & learning platform.",
      link: "https://www.udemy.com",
    },
    {
      id: 6,
      title: "Envato Elements",
      img: "https://logo.clearbit.com/envato.com",
      items: "Unlimited creative assets & templates.",
      link: "https://elements.envato.com",
    },
    {
      id: 7,
      title: "Amazon",
      img: "https://logo.clearbit.com/amazon.com",
      items: "The world’s largest e-commerce platform.",
      link: "https://www.amazon.com",
    },
    {
      id: 8,
      title: "AppSumo",
      img: "https://logo.clearbit.com/appsumo.com",
      items: "Lifetime deals on top SaaS tools.",
      link: "https://appsumo.com",
    },
    {
      id: 9,
      title: "Notion Market",
      img: "https://logo.clearbit.com/notion.so",
      items: "Templates & tools for Notion lovers.",
      link: "https://notion.market",
    },
  ];

  const openLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="feed">
      <div className="banner">
        <h1>🛍️ Marketplace</h1>
        <p>Explore top platforms to buy & sell digital products.</p>
      </div>

      <div className="feed-grid">
        {marketplaces.map((item) => (
          <div
            key={item.id}
            onClick={() => openLink(item.link)}
            role="button"
            tabIndex={0}
            className="cursor-pointer focus:outline-none"
          >
            <SimpleCard title={item.title} img={item.img} items={item.items} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceFeed;
