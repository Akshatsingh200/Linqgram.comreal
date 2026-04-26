import React from "react";
import { useTools } from "../../Context/ToolContext";
import SimpleCard from "../Cards/SimpleCard";

const BookmarksFeed = () => {
  const { bookmarks, popularTools } = useTools();
  const suggestions = popularTools.slice(5, 11);

  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <div style={styles.headerIcon}>★</div>
        <div>
          <h1 style={styles.heading}>Bookmarks</h1>
          <p style={styles.sub}>
            {bookmarks.length > 0
              ? `${bookmarks.length} saved tool${bookmarks.length !== 1 ? "s" : ""} — your personal collection.`
              : "Save tools by clicking the ☆ icon on any card."}
          </p>
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <>
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>☆</div>
            <h3 style={styles.emptyTitle}>No bookmarks yet</h3>
            <p style={styles.emptySub}>
              Click the star icon on any tool card to save it here for quick access.
            </p>
          </div>
          <h2 style={styles.suggestLabel}>YOU MIGHT LIKE</h2>
          <div style={styles.grid}>
            {suggestions.map((tool, i) => (
              <SimpleCard key={i} {...tool} />
            ))}
          </div>
        </>
      ) : (
        <div style={styles.grid}>
          {bookmarks.map((tool, i) => (
            <SimpleCard
              key={i}
              title={tool.title}
              img={tool.img}
              items={tool.items}
              link={tool.link}
              category={tool.category}
              showBadge
              badgeText="★ Saved"
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  wrap: { padding: "28px 24px", color: "white", minHeight: "100vh" },
  header: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" },
  headerIcon: {
    width: "56px", height: "56px", borderRadius: "16px", flexShrink: 0,
    background: "linear-gradient(135deg, #f59e0b, #f97316)",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px",
    color: "#000", fontWeight: "900",
    boxShadow: "0 8px 24px rgba(245,158,11,0.3)",
  },
  heading: { fontSize: "26px", fontWeight: "800", margin: "0 0 4px", color: "#f1f1f5", letterSpacing: "-0.5px" },
  sub: { color: "rgba(255,255,255,0.45)", fontSize: "14px", margin: 0 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "18px",
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    background: "rgba(255,255,255,0.025)",
    border: "1px dashed rgba(255,255,255,0.1)",
    borderRadius: "16px",
    marginBottom: "32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  emptyIcon: { fontSize: "44px", color: "#f59e0b" },
  emptyTitle: { fontSize: "18px", fontWeight: "700", color: "#f1f1f5", margin: 0 },
  emptySub: { color: "rgba(255,255,255,0.4)", fontSize: "13px", margin: 0, maxWidth: "300px" },
  suggestLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "rgba(255,255,255,0.3)",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    marginBottom: "16px",
  },
};

export default BookmarksFeed;
