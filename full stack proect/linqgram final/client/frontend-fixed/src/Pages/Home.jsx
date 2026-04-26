import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import FeedLayout from "../Components/Feeds/FeedLayout";
import "./Home.css";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Explore");

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="home-container">
      {/* ✅ Fixed: Sidebar only rendered once here, not inside MainFeed too */}
      <Sidebar sidebar={sidebarOpen} setSelectedCategory={setSelectedCategory} />

      <div
        className="main-content"
        style={{
          marginLeft: sidebarOpen ? "250px" : "0px",
          transition: "margin-left 0.3s ease",
        }}
      >
        <FeedLayout category={selectedCategory} />
      </div>
    </div>
  );
};

export default Home;
