import React from "react";
import ExploreFeed from "./ExploorerFeed";
import ArticlesFeed from "./ArticlesFeed";
import OgfolioFeed from "./OgfolioFeed";
import MarketplaceFeed from "./MarketplaceFeed";
import LibrariesFeed from "./Liberarycard";
import UiKitsFeed from "./UiKitsFeed";
import FrameworksFeed from "./FrameworksFeed";
import DesignFeed from "./DesignFeed";
import LogosFeed from "./LogosFeed";
import IllustrationsFeed from "./IllustrationsFeed";
import AiFeed from "./AiFeed";
import ChatbotsFeed from "./ChatbotsFeed";
import GeneratorsFeed from "./GeneratorsFeed";
import NoCodeFeed from "./NoCodeFeed";
import StartupsFeed from "./StartupFeed";
import MarketingFeed from "./MarketingFeed";
import VideoFeed from "./VideoFeed";
import EcommerceFeed from "./EcommerceFeed";

const FeedLayout = ({ category }) => {
  switch (category) {
    case "Explore":        return <ExploreFeed />;
    case "Articles":       return <ArticlesFeed />;
    case "ogfolio":        return <OgfolioFeed />;
    case "Marketplace":    return <MarketplaceFeed />;
    case "Libraries":      return <LibrariesFeed />;
    case "UI Kits":        return <UiKitsFeed />;
    case "Frameworks":     return <FrameworksFeed />;
    case "Design":         return <DesignFeed />;
    case "Logos":          return <LogosFeed />;
    case "Illustrations":  return <IllustrationsFeed />;
    case "AI":             return <AiFeed />;
    case "Chatbots":       return <ChatbotsFeed />;
    case "Generators":     return <GeneratorsFeed />;
    case "No-Code":        return <NoCodeFeed />;
    case "Startups":       return <StartupsFeed />;
    case "Marketing":      return <MarketingFeed />;
    case "Video":          return <VideoFeed />;
    case "E-commerce":     return <EcommerceFeed />;
    default:
      return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-lg">No content found for "{category}"</p>
        </div>
      );
  }
};

export default FeedLayout;
