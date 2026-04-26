import React, { useState } from "react";
import { useTools } from "../Context/ToolContext";
import "./Sidebar.css";

const ICONS = {
  Explore: "🔭", Articles: "📰", Portfolio: "💼",
  Marketplace: "🛒", Libraries: "📚", "UI Kits": "🎨",
  Frameworks: "⚙️", Design: "✏️", Logos: "🔷", Illustrations: "🖼️",
  AI: "🤖", Chatbots: "💬", Generators: "⚡",
  "No-Code": "🧱", Startups: "🚀", Marketing: "📣",
  "Video": "🎬", "E-commerce": "🛍️",
  History: "🕐", Popular: "🔥", "Most Used": "⚡", Bookmarks: "★",
};

const Sidebar = ({ sidebar, setSelectedCategory }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [activeMenu, setActiveMenu] = useState("Explore");
  const [isOpen, setIsOpen] = useState(false);
  const { history, bookmarks } = useTools();

  const toggleMenu = (menu) => setOpenMenu(openMenu === menu ? null : menu);

  const handleClick = (category) => {
    setSelectedCategory(category);
    setActiveMenu(category);
    setIsOpen(false);
  };

  const personalItems = [
    { label: "History", category: "History", badge: history.length || null },
    { label: "Popular", category: "Popular" },
    { label: "Most Used", category: "Most Used" },
    { label: "Bookmarks", category: "Bookmarks", badge: bookmarks.length || null },
  ];

  const navItems = [
    { label: "Explore", category: "Explore" },
    { label: "Articles", category: "Articles" },
    { label: "Portfolio", category: "ogfolio" },
  ];

  const toolItems = [
    { label: "Marketplace", category: "Marketplace" },
    {
      label: "Libraries", category: "Libraries",
      sub: [{ label: "UI Kits", category: "UI Kits" }, { label: "Frameworks", category: "Frameworks" }],
    },
    {
      label: "Design", category: "Design",
      sub: [{ label: "Logos", category: "Logos" }, { label: "Illustrations", category: "Illustrations" }],
    },
    {
      label: "AI", category: "AI",
      sub: [{ label: "Chatbots", category: "Chatbots" }, { label: "Generators", category: "Generators" }],
    },
    { label: "No-Code", category: "No-Code" },
    { label: "Startups", category: "Startups" },
    { label: "Marketing", category: "Marketing" },
    { label: "Video Editing", category: "Video" },
    { label: "E-commerce", category: "E-commerce" },
  ];

  const SideItem = ({ label, category, badge, isActive }) => (
    <div
      className={`side-link ${isActive ? "active" : ""}`}
      onClick={() => handleClick(category)}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "8px 12px",
        marginBottom: "2px",
        borderRadius: "10px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        background: isActive ? "rgba(99,102,241,0.14)" : "transparent",
        border: isActive ? "1px solid rgba(99,102,241,0.2)" : "1px solid transparent",
      }}
    >
      <span style={{ fontSize: "14px", width: "18px", textAlign: "center", flexShrink: 0 }}>
        {ICONS[label] || ICONS[category] || "•"}
      </span>
      <span style={{
        fontSize: "13px",
        fontWeight: isActive ? "600" : "400",
        color: isActive ? "#a5b4fc" : "rgba(255,255,255,0.55)",
        flex: 1,
        transition: "color 0.2s",
      }}>
        {label}
      </span>
      {badge > 0 && (
        <span style={{
          minWidth: "18px",
          height: "18px",
          background: "rgba(99,102,241,0.25)",
          color: "#a5b4fc",
          borderRadius: "100px",
          fontSize: "10px",
          fontWeight: "700",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 5px",
        }}>
          {badge}
        </span>
      )}
    </div>
  );

  return (
    <>
      {/* Hamburger */}
      <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
        <div /><div /><div />
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebar ? "" : "small-sidebar"} ${isOpen ? "show" : ""}`}>

        {/* Logo area in sidebar */}
        <div style={sideStyle.brand}>
          <div style={sideStyle.brandIcon}>⬡</div>
          <span style={sideStyle.brandText}>LinqGram</span>
        </div>

        {/* Personal section */}
        <div style={sideStyle.section}>
          <div style={sideStyle.sectionLabel}>PERSONAL</div>
          {personalItems.map((item) => (
            <SideItem
              key={item.category}
              label={item.label}
              category={item.category}
              badge={item.badge}
              isActive={activeMenu === item.category}
            />
          ))}
        </div>

        {/* Divider */}
        <div style={sideStyle.divider} />

        {/* Discover section */}
        <div style={sideStyle.section}>
          <div style={sideStyle.sectionLabel}>DISCOVER</div>
          {navItems.map((item) => (
            <SideItem
              key={item.category}
              label={item.label}
              category={item.category}
              isActive={activeMenu === item.category}
            />
          ))}
        </div>

        <div style={sideStyle.divider} />

        {/* Tools section */}
        <div style={sideStyle.section}>
          <div style={sideStyle.sectionLabel}>TOOLS</div>
          {toolItems.map((item) => (
            <div key={item.category}>
              <div
                className={`side-link ${activeMenu === item.category ? "active" : ""}`}
                onClick={() => {
                  if (item.sub) toggleMenu(item.category);
                  handleClick(item.category);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 12px",
                  marginBottom: "2px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  background: activeMenu === item.category ? "rgba(99,102,241,0.14)" : "transparent",
                  border: activeMenu === item.category ? "1px solid rgba(99,102,241,0.2)" : "1px solid transparent",
                }}
              >
                <span style={{ fontSize: "14px", width: "18px", textAlign: "center", flexShrink: 0 }}>
                  {ICONS[item.label] || ICONS[item.category] || "•"}
                </span>
                <span style={{
                  fontSize: "13px",
                  fontWeight: activeMenu === item.category ? "600" : "400",
                  color: activeMenu === item.category ? "#a5b4fc" : "rgba(255,255,255,0.55)",
                  flex: 1,
                  transition: "color 0.2s",
                }}>
                  {item.label}
                </span>
                {item.sub && (
                  <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", transition: "transform 0.2s", transform: openMenu === item.category ? "rotate(180deg)" : "none" }}>
                    ▼
                  </span>
                )}
              </div>

              {item.sub && openMenu === item.category && (
                <div style={sideStyle.submenu}>
                  {item.sub.map((s) => (
                    <div
                      key={s.category}
                      onClick={() => handleClick(s.category)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "6px 12px 6px 36px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "all 0.15s",
                        background: activeMenu === s.category ? "rgba(99,102,241,0.1)" : "transparent",
                        marginBottom: "1px",
                      }}
                    >
                      <span style={{ fontSize: "12px", color: activeMenu === s.category ? "#a5b4fc" : "rgba(255,255,255,0.4)" }}>
                        {ICONS[s.label] || "—"} {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={sideStyle.bottom}>
          <div style={sideStyle.divider} />
          <button
            onClick={() => handleClick("contact")}
            style={{
              width: "100%",
              padding: "10px 16px",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)",
              borderRadius: "10px",
              color: "#a5b4fc",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(99,102,241,0.18)";
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(99,102,241,0.1)";
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
            }}
          >
            <span>+</span> Submit a Tool
          </button>
        </div>
      </div>
    </>
  );
};

const sideStyle = {
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "0 4px",
    marginBottom: "24px",
  },
  brandIcon: {
    width: "32px",
    height: "32px",
    background: "linear-gradient(135deg, #6366f1, #ec4899)",
    borderRadius: "9px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    flexShrink: 0,
  },
  brandText: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#f1f1f5",
    letterSpacing: "-0.3px",
  },
  section: { marginBottom: "4px" },
  sectionLabel: {
    fontSize: "10px",
    fontWeight: "700",
    color: "rgba(255,255,255,0.25)",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    padding: "0 12px",
    marginBottom: "6px",
    marginTop: "4px",
  },
  divider: {
    height: "1px",
    background: "rgba(255,255,255,0.055)",
    margin: "10px 4px",
  },
  submenu: {
    paddingLeft: "0",
    marginTop: "2px",
    marginBottom: "4px",
  },
  bottom: { marginTop: "auto", paddingTop: "8px" },
};

export default Sidebar;
