import React from "react";
import SimpleCard from "../Cards/SimpleCard";
import "./FeedCommon.css";

const OgfolioFeed = () => {
  const portfolios = [
    {
      id: 1,
      title: "Notion",
      img: "https://logo.clearbit.com/notion.so",
      items: "Build clean and minimal personal portfolios.",
      link: "https://www.notion.so",
    },
    {
      id: 2,
      title: "Framer",
      img: "https://logo.clearbit.com/framer.com",
      items: "Create stunning portfolio websites visually.",
      link: "https://www.framer.com",
    },
    {
      id: 3,
      title: "Webflow",
      img: "https://logo.clearbit.com/webflow.com",
      items: "Powerful no-code site builder for portfolios.",
      link: "https://www.webflow.com",
    },
    {
      id: 4,
      title: "Behance",
      img: "https://logo.clearbit.com/behance.net",
      items: "Showcase creative work to a global audience.",
      link: "https://www.behance.net",
    },
    {
      id: 5,
      title: "Dribbble",
      img: "https://logo.clearbit.com/dribbble.com",
      items: "Designers share and discover creative portfolios.",
      link: "https://dribbble.com",
    },
    {
      id: 6,
      title: "Carbonmade",
      img: "https://logo.clearbit.com/carbonmade.com",
      items: "Easy drag-and-drop portfolio builder.",
      link: "https://carbonmade.com",
    },
    {
      id: 7,
      title: "WordPress",
      img: "https://logo.clearbit.com/wordpress.com",
      items: "Build customizable portfolio websites.",
      link: "https://wordpress.com",
    },
    {
      id: 8,
      title: "Wix",
      img: "https://logo.clearbit.com/wix.com",
      items: "Create professional online portfolios fast.",
      link: "https://www.wix.com",
    },
    {
      id: 9,
      title: "Squarespace",
      img: "https://logo.clearbit.com/squarespace.com",
      items: "Elegant templates for modern portfolios.",
      link: "https://www.squarespace.com",
    },
  ];

  const openLink = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="feed">
      <div className="banner">
        <h1>🎨 Portfolio Builders</h1>
        <p>Top platforms to design and showcase your work beautifully.</p>
      </div>

      <div className="feed-grid">
        {portfolios.map((item) => (
          <div
            key={item.id}
            onClick={() => openLink(item.link)}
            style={{ cursor: "pointer" }}
          >
            <SimpleCard title={item.title} img={item.img} items={item.items} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OgfolioFeed;
