import React from "react";
import SimpleCard from "../Cards/SimpleCard";
import "./FeedCommon.css";

const StartupFeed = () => {
  const startups = [
    {
      id: 1,
      title: "Y Combinator",
      img: "https://upload.wikimedia.org/wikipedia/commons/4/47/Y_Combinator_logo.png",
      items: "Top accelerator for early-stage startups.",
      link: "https://www.ycombinator.com",
    },
    {
      id: 2,
      title: "AngelList",
      img: "https://cdn.worldvectorlogo.com/logos/angellist-1.svg",
      items: "Discover investors and talent for your startup.",
      link: "https://angel.co",
    },
    {
      id: 3,
      title: "Crunchbase",
      img: "https://cdn.worldvectorlogo.com/logos/crunchbase-1.svg",
      items: "Find funding rounds, investors and startups.",
      link: "https://www.crunchbase.com",
    },
    {
      id: 4,
      title: "Product Hunt",
      img: "https://cdn.worldvectorlogo.com/logos/product-hunt-1.svg",
      items: "Launch your product and reach early adopters.",
      link: "https://www.producthunt.com",
    },
    {
      id: 5,
      title: "TechCrunch",
      img: "https://cdn.worldvectorlogo.com/logos/techcrunch.svg",
      items: "Startup and tech news platform.",
      link: "https://techcrunch.com",
    },
    {
      id: 6,
      title: "Startup Grind",
      img: "https://startupgrind.com/favicon.ico",
      items: "Global startup community events and learning.",
      link: "https://www.startupgrind.com",
    },
    {
      id: 7,
      title: "Seedrs",
      img: "https://logo.clearbit.com/seedrs.com",
      items: "Crowdfunding platform for startups.",
      link: "https://www.seedrs.com",
    },
    {
      id: 8,
      title: "Foundersuite",
      img: "https://logo.clearbit.com/foundersuite.com",
      items: "Fundraising CRM for startup founders.",
      link: "https://foundersuite.com",
    },
    {
      id: 9,
      title: "CB Insights",
      img: "https://logo.clearbit.com/cbinsights.com",
      items: "Research and trends for scaling startups.",
      link: "https://www.cbinsights.com",
    },
  ];

  const openLink = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="feed">
      <div className="banner">
        <h1>🚀 Startup Essentials</h1>
        <p>Top platforms every founder should know — from funding to launch.</p>
      </div>

      <div className="feed-grid">
        {startups.map((startup) => (
          <div
            key={startup.id}
            onClick={() => openLink(startup.link)}
            style={{ cursor: "pointer" }}
          >
            <SimpleCard
              title={startup.title}
              img={startup.img}
              items={startup.items}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartupFeed;
