import React, { useState } from "react";
import { useTools } from "../../Context/ToolContext";
import SimpleCard from "../Cards/SimpleCard";

const FILTERS = ["All", "Design", "Development", "AI", "Productivity", "Hosting", "Frameworks", "No-Code"];

const PopularFeed = () => {
  const { popularTools } = useTools();
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? popularTools
    : popularTools.filter(t => t.category === activeFilter);

  const top3 = popularTools.slice(0, 3);

  return (
    <div style={styles.wrap}>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroGlow} />
        <div style={styles.heroContent}>
          <div style={styles.trendBadge}>🔥 Trending Now</div>
          <h1 style={styles.heroTitle}>Popular Tools</h1>
          <p style={styles.heroSub}>The most loved tools in the LinqGram community right now.</p>
        </div>
      </div>

      {/* Top 3 Spotlight */}
      <div style={styles.spotlightSection}>
        <h2 style={styles.sectionLabel}>⚡ Top Picks</h2>
        <div style={styles.spotlightGrid}>
          {top3.map((tool, i) => (
            <div key={i} style={{
              ...styles.spotlightCard,
              borderColor: ["#f59e0b", "#94a3b8", "#b45309"][i] + "44",
            }}>
              <div style={styles.rankBadge}>
                {["🥇", "🥈", "🥉"][i]}
              </div>
              <img
                src={tool.img}
                alt={tool.title}
                style={styles.spotlightImg}
                onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.title)}&background=1a1a2e&color=fff&size=80`; }}
              />
              <div style={styles.spotlightInfo}>
                <h3 style={styles.spotlightTitle}>{tool.title}</h3>
                <p style={styles.spotlightDesc}>{tool.items}</p>
                <div style={styles.popularityBar}>
                  <div style={{ ...styles.popularityFill, width: `${(tool.popularityScore / 10000) * 100}%` }} />
                </div>
                <span style={styles.popularityNum}>{tool.popularityScore.toLocaleString()} users</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Chips */}
      <div style={styles.filterRow}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              ...styles.chip,
              background: activeFilter === f ? "linear-gradient(135deg, #6366f1, #ec4899)" : "rgba(255,255,255,0.04)",
              color: activeFilter === f ? "#fff" : "rgba(255,255,255,0.5)",
              border: activeFilter === f ? "1px solid transparent" : "1px solid rgba(255,255,255,0.08)",
              boxShadow: activeFilter === f ? "0 4px 14px rgba(99,102,241,0.35)" : "none",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={styles.countRow}>
        <span style={styles.countText}>{filtered.length} tools</span>
      </div>

      <div style={styles.grid}>
        {filtered.map((tool, i) => (
          <SimpleCard
            key={i}
            title={tool.title}
            img={tool.img}
            items={tool.items}
            link={tool.link}
            category={tool.category}
            showBadge={i < 5}
            badgeText={i === 0 ? "🔥 #1" : i < 3 ? `#${i + 1}` : "Hot"}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  wrap: { padding: "28px 24px", color: "white", minHeight: "100vh" },
  hero: {
    position: "relative",
    background: "linear-gradient(135deg, #1a0533 0%, #0f172a 50%, #0a0a0f 100%)",
    borderRadius: "20px",
    padding: "40px 36px",
    marginBottom: "32px",
    overflow: "hidden",
    border: "1px solid rgba(99,102,241,0.15)",
  },
  heroGlow: {
    position: "absolute",
    top: "-40px",
    left: "-40px",
    width: "200px",
    height: "200px",
    background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  heroContent: { position: "relative" },
  trendBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 14px",
    background: "rgba(245,158,11,0.15)",
    border: "1px solid rgba(245,158,11,0.3)",
    borderRadius: "100px",
    fontSize: "12px",
    color: "#f59e0b",
    fontWeight: "600",
    marginBottom: "12px",
    letterSpacing: "0.3px",
  },
  heroTitle: { fontSize: "32px", fontWeight: "900", margin: "0 0 8px", letterSpacing: "-1px", color: "#f1f1f5" },
  heroSub: { color: "rgba(255,255,255,0.5)", fontSize: "15px", margin: 0 },
  spotlightSection: { marginBottom: "32px" },
  sectionLabel: {
    fontSize: "13px",
    fontWeight: "700",
    color: "rgba(255,255,255,0.4)",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    marginBottom: "16px",
  },
  spotlightGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "14px",
  },
  spotlightCard: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid",
    borderRadius: "14px",
    padding: "16px",
    position: "relative",
    transition: "all 0.25s",
  },
  rankBadge: {
    position: "absolute",
    top: "-8px",
    left: "-8px",
    fontSize: "20px",
    lineHeight: 1,
  },
  spotlightImg: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    objectFit: "cover",
    flexShrink: 0,
    border: "1px solid rgba(255,255,255,0.1)",
  },
  spotlightInfo: { flex: 1, minWidth: 0 },
  spotlightTitle: { fontSize: "15px", fontWeight: "700", color: "#f1f1f5", margin: "0 0 3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  spotlightDesc: { fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: "0 0 8px" },
  popularityBar: { height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", marginBottom: "4px" },
  popularityFill: { height: "100%", background: "linear-gradient(90deg, #6366f1, #ec4899)", borderRadius: "2px", transition: "width 0.6s ease" },
  popularityNum: { fontSize: "11px", color: "rgba(255,255,255,0.3)", fontWeight: "500" },
  filterRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "20px",
  },
  chip: {
    padding: "6px 16px",
    borderRadius: "100px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
    letterSpacing: "0.2px",
  },
  countRow: { marginBottom: "16px" },
  countText: { fontSize: "12px", color: "rgba(255,255,255,0.3)", fontWeight: "600", letterSpacing: "0.5px", textTransform: "uppercase" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "18px",
  },
};

export default PopularFeed;
