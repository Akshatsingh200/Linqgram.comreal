import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";

import ExploreFeed from "../Components/Feeds/ExploorerFeed";
import ArticlesFeed from "../Components/Feeds/ArticlesFeed";
import OgfolioFeed from "../Components/Feeds/OgfolioFeed";
import MarketplaceFeed from "../Components/Feeds/MarketplaceFeed";
import UiKitsFeed from "../Components/Feeds/UiKitsFeed";
import FrameworksFeed from "../Components/Feeds/FrameworksFeed";
import LogosFeed from "../Components/Feeds/LogosFeed";
import IllustrationsFeed from "../Components/Feeds/IllustrationsFeed";
import AiFeed from "../Components/Feeds/AiFeed";
import ChatbotsFeed from "../Components/Feeds/ChatbotsFeed";
import GeneratorsFeed from "../Components/Feeds/GeneratorsFeed";
import NoCodeFeed from "../Components/Feeds/NoCodeFeed";
import StartupFeed from "../Components/Feeds/StartupFeed";
import MarketingFeed from "../Components/Feeds/MarketingFeed";
import VideoFeed from "../Components/Feeds/VideoFeed";
import EcommerceFeed from "../Components/Feeds/EcommerceFeed";
import DesignFeed from "../Components/Feeds/DesignFeed";
import HistoryFeed from "../Components/Feeds/HistoryFeed";
import PopularFeed from "../Components/Feeds/PopularFeed";
import MostUsedFeed from "../Components/Feeds/MostUsedFeed";
import BookmarksFeed from "../Components/Feeds/BookmarksFeed";

import "./Home.css";

const renderFeed = (category) => {
  switch (category) {
    case "Explore":       return <ExploreFeed />;
    case "Articles":      return <ArticlesFeed />;
    case "ogfolio":       return <OgfolioFeed />;
    case "Marketplace":   return <MarketplaceFeed />;
    case "UI Kits":       return <UiKitsFeed />;
    case "Frameworks":    return <FrameworksFeed />;
    case "Design":        return <DesignFeed />;
    case "Logos":         return <LogosFeed />;
    case "Illustrations": return <IllustrationsFeed />;
    case "AI":            return <AiFeed />;
    case "Chatbots":      return <ChatbotsFeed />;
    case "Generators":    return <GeneratorsFeed />;
    case "No-Code":       return <NoCodeFeed />;
    case "Startups":      return <StartupFeed />;
    case "Marketing":     return <MarketingFeed />;
    case "Video":         return <VideoFeed />;
    case "E-commerce":    return <EcommerceFeed />;
    case "History":       return <HistoryFeed />;
    case "Popular":       return <PopularFeed />;
    case "Most Used":     return <MostUsedFeed />;
    case "Bookmarks":     return <BookmarksFeed />;
    default:              return <ExploreFeed />;
  }
};

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Explore");

  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth > 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="home-container">
      <Sidebar sidebar={sidebarOpen} setSelectedCategory={setSelectedCategory} />
      <div
        className="main-content"
        style={{ marginLeft: sidebarOpen ? "240px" : "0px", transition: "margin-left 0.3s ease" }}
      >
        {renderFeed(selectedCategory)}
      </div>
    </div>
  );
};

export default Home;
