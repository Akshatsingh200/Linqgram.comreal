import React from "react";
import { useTools } from "../../Context/ToolContext";
import SimpleCard from "../Cards/SimpleCard";

const MostUsedFeed = () => {
  const { mostUsedTools, popularTools } = useTools();
  const hasPersonal = mostUsedTools.length > 0;
  const suggestions = popularTools.slice(0, 8);
  const totalVisits = mostUsedTools.reduce((a, t) => a + t.useCount, 0);
  const topTool = mostUsedTools[0]?.title?.split(" ")[0] || "—";

  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <div style={styles.headerIcon}>⚡</div>
        <div>
          <h1 style={styles.heading}>Most Used</h1>
          <p style={styles.sub}>
            {hasPersonal
              ? "Your most frequently visited tools — your personal toolkit."
              : "Start exploring tools to build your personal usage stats."}
          </p>
        </div>
      </div>

      {hasPersonal ? (
        <>
          <div style={styles.statsRow}>
            <StatCard num={mostUsedTools.length} label="Tools Explored" />
            <StatCard num={totalVisits} label="Total Visits" />
            <StatCard num={topTool} label="Top Tool" />
          </div>

          <h2 style={styles.sectionLabel}>YOUR TOP TOOLS</h2>
          <div style={styles.listSection}>
            {mostUsedTools.slice(0, 5).map((tool, i) => (
              <div
                key={i}
                style={styles.listItem}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <span style={styles.rank}>#{i + 1}</span>
                <img
                  src={tool.img}
                  alt={tool.title}
                  style={styles.listImg}
                  onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.title)}&background=111&color=fff&size=40`; }}
                />
                <div style={styles.listInfo}>
                  <span style={styles.listTitle}>{tool.title}</span>
                  <span style={styles.listCat}>{tool.category}</span>
                </div>
                <div style={styles.usageRight}>
                  <div style={styles.usageBar}>
                    <div style={{
                      ...styles.usageFill,
                      width: `${Math.min((tool.useCount / mostUsedTools[0].useCount) * 100, 100)}%`,
                    }} />
                  </div>
                  <span style={styles.useCount}>{tool.useCount}x</span>
                </div>
              </div>
            ))}
          </div>

          <h2 style={{ ...styles.sectionLabel, marginTop: "28px" }}>ALL YOUR TOOLS</h2>
          <div style={styles.grid}>
            {mostUsedTools.map((tool, i) => (
              <SimpleCard
                key={i}
                title={tool.title}
                img={tool.img}
                items={tool.items}
                link={tool.link}
                category={tool.category}
                showBadge
                badgeText={`${tool.useCount}x`}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div style={styles.emptyBox}>
            <div style={styles.emptyIll}>⚡</div>
            <h3 style={styles.emptyTitle}>No usage data yet</h3>
            <p style={styles.emptyDesc}>Click "Explore →" on any tool card to start tracking your usage here.</p>
          </div>

          <h2 style={{ ...styles.sectionLabel, marginTop: "28px" }}>SUGGESTED TO GET STARTED</h2>
          <div style={styles.grid}>
            {suggestions.map((tool, i) => (
              <SimpleCard key={i} title={tool.title} img={tool.img} items={tool.items} link={tool.link} category={tool.category} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const StatCard = ({ num, label }) => (
  <div style={styles.statCard}>
    <span style={styles.statNum}>{num}</span>
    <span style={styles.statLabel}>{label}</span>
  </div>
);

const styles = {
  wrap: { padding: "28px 24px", color: "white", minHeight: "100vh" },
  header: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" },
  headerIcon: {
    width: "56px", height: "56px", borderRadius: "16px", flexShrink: 0,
    background: "linear-gradient(135deg, #f59e0b, #ef4444)",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px",
    boxShadow: "0 8px 24px rgba(245,158,11,0.25)",
  },
  heading: { fontSize: "26px", fontWeight: "800", margin: "0 0 4px", color: "#f1f1f5", letterSpacing: "-0.5px" },
  sub: { color: "rgba(255,255,255,0.45)", fontSize: "14px", margin: 0 },
  statsRow: { display: "flex", gap: "14px", marginBottom: "28px", flexWrap: "wrap" },
  statCard: {
    flex: "1", minWidth: "120px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "14px",
    padding: "18px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  statNum: { fontSize: "24px", fontWeight: "800", color: "#f1f1f5" },
  statLabel: { fontSize: "11px", color: "rgba(255,255,255,0.35)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.8px" },
  sectionLabel: {
    fontSize: "11px", fontWeight: "700",
    color: "rgba(255,255,255,0.3)",
    textTransform: "uppercase", letterSpacing: "1.5px",
    marginBottom: "12px",
  },
  listSection: { marginBottom: "4px" },
  listItem: {
    display: "flex", alignItems: "center", gap: "12px",
    padding: "11px 8px", borderRadius: "10px",
    transition: "background 0.2s", cursor: "pointer",
  },
  rank: { width: "24px", fontSize: "12px", color: "rgba(255,255,255,0.3)", fontWeight: "700", textAlign: "center", flexShrink: 0 },
  listImg: { width: "36px", height: "36px", borderRadius: "9px", objectFit: "cover", border: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 },
  listInfo: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "2px" },
  listTitle: { fontSize: "14px", fontWeight: "600", color: "#f1f1f5", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  listCat: { fontSize: "11px", color: "rgba(255,255,255,0.35)" },
  usageRight: { display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 },
  usageBar: { width: "80px", height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "2px" },
  usageFill: { height: "100%", background: "linear-gradient(90deg, #f59e0b, #ef4444)", borderRadius: "2px", transition: "width 0.5s ease" },
  useCount: { fontSize: "11px", color: "#f59e0b", fontWeight: "700", width: "24px", textAlign: "right" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "18px", marginTop: "12px" },
  emptyBox: {
    textAlign: "center", padding: "48px 20px",
    background: "rgba(255,255,255,0.025)",
    border: "1px dashed rgba(255,255,255,0.1)",
    borderRadius: "16px", marginBottom: "8px",
    display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
  },
  emptyIll: { fontSize: "44px", marginBottom: "4px" },
  emptyTitle: { fontSize: "18px", fontWeight: "700", color: "#f1f1f5", margin: 0 },
  emptyDesc: { color: "rgba(255,255,255,0.4)", fontSize: "13px", margin: 0, maxWidth: "300px" },
};

export default MostUsedFeed;
