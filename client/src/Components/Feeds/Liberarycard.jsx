import React from "react";
import ToolCard from "../Cards/ToolCaard";
import "./Librerary.css";
import "./FeedCommon.css";

function Liberarycard() {
  const framerTools = [
    { logo: "https://logo.clearbit.com/framer.com", name: "Frameship", description: "Modern e-commerce builder.", link: "https://frameship.com" },
    { logo: "https://logo.clearbit.com/humblytics.com", name: "Humblytics", description: "Simple content analytics.", link: "https://www.humblytics.com" },
    { logo: "https://logo.clearbit.com/flowbase.co", name: "Flowbase", description: "Webflow UI components.", link: "https://www.flowbase.co" },
  ];

  const macTools = [
    { logo: "https://logo.clearbit.com/pasteapp.io", name: "Paste", description: "Clipboard manager for Mac.", link: "https://pasteapp.io/" },
    { logo: "https://logo.clearbit.com/textsniper.app", name: "TextSniper", description: "Extract text from images.", link: "https://textsniper.app/" },
    { logo: "https://logo.clearbit.com/onetap.ai", name: "OneTap", description: "No-code app builder.", link: "https://onetap.ai/" },
  ];

  const figmaTools = [
    { logo: "https://logo.clearbit.com/figma.com", name: "Figma", description: "Collaborative design tool.", link: "https://www.figma.com" },
    { logo: "https://logo.clearbit.com/figma.com", name: "Figmotion", description: "Figma animation plugin.", link: "https://www.figma.com/community/plugin/733025261168520714/Figmotion" },
    { logo: "https://logo.clearbit.com/figma.com", name: "Autoflow", description: "Auto connect objects in Figma.", link: "https://www.figma.com/community/plugin/733902567457592893/Autoflow" },
  ];

  const shopifyTools = [
    { logo: "https://logo.clearbit.com/shopify.com", name: "Shopify", description: "E-commerce store builder.", link: "https://www.shopify.com" },
    { logo: "https://logo.clearbit.com/klaviyo.com", name: "Klaviyo", description: "Email marketing for stores.", link: "https://www.klaviyo.com" },
    { logo: "https://logo.clearbit.com/getshogun.com", name: "Shogun", description: "Page builder for Shopify.", link: "https://getshogun.com" },
  ];

  return (
    <div className="feed library-feed">
      <div className="banner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1>📚 Explore Library</h1>
          <p>Discover top tools and plugins to level up your workflow.</p>
        </div>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer"
          style={{ background: "rgba(255,255,255,0.2)", color: "white", padding: "8px 18px", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>
          View Library →
        </a>
      </div>

      <div className="card-grid">
        <ToolCard title="Framer Tools" icon="https://logo.clearbit.com/framer.com" items={framerTools} />
        <ToolCard title="Mac Apps" icon="https://logo.clearbit.com/apple.com" items={macTools} />
        <ToolCard title="Figma Plugins" icon="https://logo.clearbit.com/figma.com" items={figmaTools} />
        <ToolCard title="Shopify Tools" icon="https://logo.clearbit.com/shopify.com" items={shopifyTools} />
      </div>
    </div>
  );
}

export default Liberarycard;
