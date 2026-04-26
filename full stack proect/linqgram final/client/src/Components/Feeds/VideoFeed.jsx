import React from "react";
import SimpleCard from "../Cards/SimpleCard";
import "./FeedCommon.css";

const VideoFeed = () => {
  const videoTools = [
    {
      id: 1,
      title: "Runway ML",
      img: "https://images.unsplash.com/photo-1611162616305-4ec3060a058e",
      items: "AI-powered video editing & generation.",
      link: "https://runwayml.com",
    },
    {
      id: 2,
      title: "Pictory",
      img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
      items: "Turn text into engaging videos instantly.",
      link: "https://pictory.ai",
    },
    {
      id: 3,
      title: "Synthesia",
      img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
      items: "Create AI avatar videos in minutes.",
      link: "https://www.synthesia.io",
    },
    {
      id: 4,
      title: "Descript",
      img: "https://images.unsplash.com/photo-1622547748225-3fc4abd6f182",
      items: "Edit videos like docs with AI tools.",
      link: "https://www.descript.com",
    },
    {
      id: 5,
      title: "Invideo",
      img: "https://images.unsplash.com/photo-1593642532871-8b12e02d091c",
      items: "Create stunning videos easily.",
      link: "https://invideo.io",
    },
    {
      id: 6,
      title: "CapCut",
      img: "https://images.unsplash.com/photo-1593642532400-2682810df593",
      items: "Free, powerful video editor.",
      link: "https://www.capcut.com",
    },
    {
      id: 7,
      title: "VEED",
      img: "https://images.unsplash.com/photo-1622547748225-3fc4abd6f182",
      items: "Edit and subtitle videos online.",
      link: "https://www.veed.io",
    },
    {
      id: 8,
      title: "Animoto",
      img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
      items: "Drag-and-drop video maker.",
      link: "https://animoto.com",
    },
    {
      id: 9,
      title: "Adobe Premiere Pro",
      img: "https://images.unsplash.com/photo-1611162616305-4ec3060a058e",
      items: "Professional-grade editing platform.",
      link: "https://www.adobe.com/products/premiere.html",
    },
  ];

  const handleCardClick = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div className="feed">
      <div className="banner">
        <h1>Explore Video Tools</h1>
        <p>Create and edit amazing videos with AI & pro platforms.</p>
      </div>

      <div className="feed-grid">
        {videoTools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => handleCardClick(tool.link)}
            style={{ cursor: "pointer" }}
          >
            <SimpleCard title={tool.title} img={tool.img} items={tool.items} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoFeed;
