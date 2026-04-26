import React from "react";
import SimpleCard from "../Cards/SimpleCard";
import "./FeedCommon.css";

const IllustrationsFeed = () => {
  const tools = [
    { id: 1, title: "unDraw", img: "https://logo.clearbit.com/undraw.co", items: "Open-source SVG illustrations for any idea.", link: "https://undraw.co" },
    { id: 2, title: "Storyset", img: "https://logo.clearbit.com/storyset.com", items: "Free customizable illustrations for projects.", link: "https://storyset.com" },
    { id: 3, title: "Blush Design", img: "https://logo.clearbit.com/blush.design", items: "Create and customize illustrations easily.", link: "https://blush.design" },
    { id: 4, title: "Humaaans", img: "https://logo.clearbit.com/humaaans.com", items: "Mix-&-match illustrations of people.", link: "https://www.humaaans.com" },
    { id: 5, title: "DrawKit", img: "https://logo.clearbit.com/drawkit.com", items: "Free hand-drawn vector illustrations.", link: "https://www.drawkit.com" },
    { id: 6, title: "Open Peeps", img: "https://logo.clearbit.com/openpeeps.com", items: "Hand-drawn illustration library.", link: "https://www.openpeeps.com" },
    { id: 7, title: "Freepik", img: "https://logo.clearbit.com/freepik.com", items: "Millions of free vectors & illustrations.", link: "https://www.freepik.com" },
    { id: 8, title: "Icons8 Illustrations", img: "https://logo.clearbit.com/icons8.com", items: "Consistent vector illustration sets.", link: "https://icons8.com/illustrations" },
    { id: 9, title: "Illlustrations.co", img: "https://logo.clearbit.com/illlustrations.co", items: "Open-source website illustration kit.", link: "https://illlustrations.co" },
  ];

  return (
    <div className="feed">
      <div className="banner">
        <h1>🖼️ Illustrations</h1>
        <p>Free and premium illustration resources for designers and developers.</p>
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

export default IllustrationsFeed;
