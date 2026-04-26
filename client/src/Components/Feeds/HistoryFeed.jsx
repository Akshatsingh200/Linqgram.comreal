import React from "react";
import { useTools } from "../../Context/ToolContext";
import SimpleCard from "../Cards/SimpleCard";

const HistoryFeed = () => {
  const { history, clearHistory } = useTools();

  const timeAgo = (ts) => {
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    if (hrs < 24) return `${hrs}h ago`;
    return `${days}d ago`;
  };

  return (
    <div style={styles.wrap}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.headerTop}>
            <span style={styles.icon}>🕐</span>
            <h1 style={styles.heading}>Browsing History</h1>
          </div>
          <p style={styles.sub}>Tools you've explored recently — pick up where you left off.</p>
        </div>
        {history.length > 0 && (
          <button onClick={clearHistory} style={styles.clearBtn}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(248,113,113,0.12)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            🗑 Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>🔍</div>
          <h3 style={styles.emptyTitle}>No history yet</h3>
          <p style={styles.emptySub}>Start exploring tools and they'll appear here for quick access.</p>
        </div>
      ) : (
        <>
          <div style={styles.count}>{history.length} tool{history.length !== 1 ? "s" : ""} visited</div>
          <div style={styles.grid}>
            {history.map((tool, i) => (
              <div key={i} style={styles.cardWrap}>
                <div style={styles.timeTag}>{timeAgo(tool.visitedAt)}</div>
                <SimpleCard
                  title={tool.title}
                  img={tool.img}
                  items={tool.items}
                  link={tool.link}
                  category={tool.category}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  wrap: { padding: "28px 24px", color: "white", minHeight: "100vh" },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "28px",
    flexWrap: "wrap",
    gap: "12px",
  },
  headerTop: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" },
  icon: { fontSize: "28px" },
  heading: { fontSize: "26px", fontWeight: "800", margin: 0, color: "#f1f1f5", letterSpacing: "-0.5px" },
  sub: { color: "rgba(255,255,255,0.45)", fontSize: "14px", margin: 0 },
  clearBtn: {
    padding: "8px 16px",
    background: "transparent",
    border: "1px solid rgba(248,113,113,0.3)",
    borderRadius: "9px",
    color: "#f87171",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "inherit",
    fontWeight: "500",
    transition: "background 0.2s",
    whiteSpace: "nowrap",
    alignSelf: "flex-start",
  },
  count: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.3)",
    marginBottom: "20px",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    fontWeight: "600",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
    gap: "20px",
  },
  cardWrap: { position: "relative" },
  timeTag: {
    position: "absolute",
    bottom: "12px",
    left: "12px",
    zIndex: 20,
    fontSize: "10px",
    color: "rgba(255,255,255,0.35)",
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(8px)",
    padding: "2px 8px",
    borderRadius: "6px",
    fontWeight: "500",
    pointerEvents: "none",
  },
  empty: {
    textAlign: "center",
    padding: "80px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },
  emptyIcon: { fontSize: "48px", marginBottom: "4px" },
  emptyTitle: { fontSize: "20px", color: "#f1f1f5", fontWeight: "700", margin: 0 },
  emptySub: { color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: 0, maxWidth: "320px" },
};

export default HistoryFeed;
