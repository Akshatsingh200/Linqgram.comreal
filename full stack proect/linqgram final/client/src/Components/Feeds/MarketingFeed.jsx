import React from "react";
import SimpleCard from "../Cards/SimpleCard";
import "./FeedCommon.css";

const MarketingFeed = () => {
  const marketingTools = [
    {
      id: 1,
      title: "Mailchimp",
      img: "https://logo.clearbit.com/mailchimp.com",
      items: "Email marketing & automation.",
      link: "https://mailchimp.com",
    },
    {
      id: 2,
      title: "HubSpot",
      img: "https://logo.clearbit.com/hubspot.com",
      items: "CRM & inbound marketing platform.",
      link: "https://www.hubspot.com",
    },
    {
      id: 3,
      title: "Canva",
      img: "https://logo.clearbit.com/canva.com",
      items: "Design content for campaigns.",
      link: "https://www.canva.com",
    },
    {
      id: 4,
      title: "Buffer",
      img: "https://logo.clearbit.com/buffer.com",
      items: "Social media scheduling & analytics.",
      link: "https://buffer.com",
    },
    {
      id: 5,
      title: "Hootsuite",
      img: "https://logo.clearbit.com/hootsuite.com",
      items: "Manage all social accounts easily.",
      link: "https://hootsuite.com",
    },
    {
      id: 6,
      title: "Google Analytics",
      img: "https://logo.clearbit.com/analytics.google.com",
      items: "Measure website performance.",
      link: "https://analytics.google.com",
    },
    {
      id: 7,
      title: "Ahrefs",
      img: "https://logo.clearbit.com/ahrefs.com",
      items: "SEO research & competitor analysis.",
      link: "https://ahrefs.com",
    },
    {
      id: 8,
      title: "Semrush",
      img: "https://logo.clearbit.com/semrush.com",
      items: "Powerful SEO & marketing tools.",
      link: "https://semrush.com",
    },
    {
      id: 9,
      title: "AdCreative.ai",
      img: "https://logo.clearbit.com/adcreative.ai",
      items: "Generate ad creatives with AI.",
      link: "https://www.adcreative.ai",
    },
  ];

  const openLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="feed">
      <div className="banner">
        <h1>📢 Marketing Tools</h1>
        <p>Best platforms to grow, automate & analyze your marketing.</p>
      </div>

      <div className="feed-grid">
        {marketingTools.map((item) => (
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

export default MarketingFeed;
