import React from "react";
import "./ToolCard.css";

export default function ToolCard({ title, icon, items }) {
  const handleClick = (link) => {
    if (link) window.open(link, "_blank");
  };

  return (
    <div className="tool-feed-card">
      <div className="tool-header">
        <img
          src={icon}
          alt={title}
          className="tool-category-icon"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&background=1a1a2e&color=fff&size=40`;
          }}
        />
        <h2>{title}</h2>
      </div>

      <div className="tool-grid">
        {items.map((tool, index) => (
          <div key={index} className="tool-card" onClick={() => handleClick(tool.link)}>
            <div className="tool-card-top">
              <img
                src={tool.logo}
                alt={tool.name}
                className="tool-logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=111&color=fff&size=32`;
                }}
              />
              <h3>{tool.name}</h3>
            </div>
            <p className="tool-desc">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
