import React, { useState } from "react";
import { useTools } from "../../Context/ToolContext";

export default function SimpleCard({ title, img, items, link, category, showBadge, badgeText }) {
  const { toggleBookmark, isBookmarked, recordVisit } = useTools();
  const [imgErr, setImgErr] = useState(false);
  const bookmarked = isBookmarked(title);

  const handleVisit = (e) => {
    e.stopPropagation();
    recordVisit({ title, img, items, link, category });
    if (link) window.open(link, "_blank");
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleBookmark({ title, img, items, link, category });
  };

  const categoryColor = {
    Design: "#f472b6", Development: "#60a5fa", Hosting: "#34d399",
    Productivity: "#a78bfa", AI: "#fb923c", Frameworks: "#38bdf8",
    "No-Code": "#4ade80", "E-commerce": "#fbbf24", Marketing: "#f87171",
    Video: "#c084fc", Startups: "#2dd4bf",
  }[category] || "#818cf8";

  return (
    <div
      className="lq-card"
      style={styles.card}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(99,102,241,0.35)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(99,102,241,0.2)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)";
      }}
    >
      {showBadge && badgeText && (
        <div style={{ ...styles.badge, background: categoryColor, color: "#000" }}>
          {badgeText}
        </div>
      )}

      <button
        onClick={handleBookmark}
        style={{
          ...styles.bookmarkBtn,
          color: bookmarked ? "#f59e0b" : "rgba(255,255,255,0.3)",
          background: bookmarked ? "rgba(245,158,11,0.15)" : "rgba(0,0,0,0.5)",
        }}
        title={bookmarked ? "Remove bookmark" : "Bookmark this tool"}
      >
        {bookmarked ? "★" : "☆"}
      </button>

      <div style={styles.imgWrap}>
        <img
          src={imgErr ? `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&background=1a1a2e&color=fff&size=200` : img}
          alt={title}
          onError={() => setImgErr(true)}
          style={styles.img}
          className="lq-card-img"
        />
        <div style={styles.imgOverlay} />
        {category && (
          <div style={{ ...styles.catPill, borderColor: categoryColor + "66", color: categoryColor }}>
            {category}
          </div>
        )}
      </div>

      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.desc}>{items}</p>
        <button
          onClick={handleVisit}
          className="lq-visit-btn"
          style={styles.visitBtn}
          onMouseEnter={e => {
            e.currentTarget.style.background = "linear-gradient(135deg, #6366f1, #ec4899)";
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(99,102,241,0.45)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(99,102,241,0.1)";
            e.currentTarget.style.borderColor = "rgba(99,102,241,0.25)";
            e.currentTarget.style.color = "#a5b4fc";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Explore →
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    position: "relative",
    background: "linear-gradient(160deg, #111118 0%, #0d0d12 100%)",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.07)",
    display: "flex",
    flexDirection: "column",
    height: "320px",
    transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    cursor: "pointer",
    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
  },
  badge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    zIndex: 10,
    padding: "3px 10px",
    borderRadius: "100px",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  bookmarkBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: 10,
    width: "30px",
    height: "30px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    backdropFilter: "blur(8px)",
  },
  imgWrap: {
    height: "155px",
    overflow: "hidden",
    background: "#0a0a10",
    position: "relative",
    flexShrink: 0,
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease",
  },
  imgOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, transparent 40%, rgba(13,13,18,0.85) 100%)",
  },
  catPill: {
    position: "absolute",
    bottom: "8px",
    right: "8px",
    padding: "2px 8px",
    borderRadius: "6px",
    border: "1px solid",
    fontSize: "10px",
    fontWeight: "600",
    background: "rgba(0,0,0,0.65)",
    backdropFilter: "blur(8px)",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "14px 16px 16px",
    gap: "5px",
  },
  title: {
    color: "#f1f1f5",
    fontSize: "15px",
    fontWeight: "700",
    margin: 0,
    letterSpacing: "-0.2px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  desc: {
    color: "rgba(255,255,255,0.42)",
    fontSize: "12px",
    lineHeight: "1.5",
    margin: 0,
    flex: 1,
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  visitBtn: {
    marginTop: "8px",
    padding: "8px 14px",
    background: "rgba(99,102,241,0.1)",
    border: "1px solid rgba(99,102,241,0.25)",
    borderRadius: "9px",
    color: "#a5b4fc",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.25s ease",
    fontFamily: "inherit",
    letterSpacing: "0.2px",
  },
};
