import React from "react";
import SimpleCard from "../Cards/SimpleCard";
import "./FeedCommon.css";

const DesignFeed = () => {
  const designTools = [
    {
      id: 1,
      title: "Figma",
      img: "https://logo.clearbit.com/figma.com",
      items: "Collaborative UI/UX design tool.",
      link: "https://www.figma.com",
    },
    {
      id: 2,
      title: "Canva",
      img: "https://logo.clearbit.com/canva.com",
      items: "Easy graphic design for everyone.",
      link: "https://www.canva.com",
    },
    {
      id: 3,
      title: "Dribbble",
      img: "https://logo.clearbit.com/dribbble.com",
      items: "Discover and showcase creative design work.",
      link: "https://dribbble.com",
    },
    {
      id: 4,
      title: "Behance",
      img: "https://logo.clearbit.com/behance.net",
      items: "Explore top design portfolios and projects.",
      link: "https://www.behance.net",
    },
    {
      id: 5,
      title: "Sketch",
      img: "https://logo.clearbit.com/sketch.com",
      items: "Professional vector design tool for macOS.",
      link: "https://www.sketch.com",
    },
    {
      id: 6,
      title: "Adobe XD",
      img: "https://logo.clearbit.com/adobe.com",
      items: "Wireframe and prototype interactive designs.",
      link: "https://www.adobe.com/products/xd.html",
    },
    {
      id: 7,
      title: "Coolors",
      img: "https://logo.clearbit.com/coolors.co",
      items: "Generate beautiful color palettes.",
      link: "https://coolors.co",
    },
    {
      id: 8,
      title: "Freepik",
      img: "https://logo.clearbit.com/freepik.com",
      items: "Illustrations, icons, vectors & templates.",
      link: "https://www.freepik.com",
    },
    {
      id: 9,
      title: "UI8",
      img: "https://logo.clearbit.com/ui8.net",
      items: "Premium UI kits, templates & assets.",
      link: "https://ui8.net",
    },
  ];

  const openLink = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="feed">
      <div className="banner">
        <h1>🎨 Design Tools</h1>
        <p>Top platforms to create, explore, and get inspired.</p>
      </div>

      <div className="feed-grid">
        {designTools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => openLink(tool.link)}
            style={{ cursor: "pointer" }}
          >
            <SimpleCard title={tool.title} img={tool.img} items={tool.items} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignFeed;
