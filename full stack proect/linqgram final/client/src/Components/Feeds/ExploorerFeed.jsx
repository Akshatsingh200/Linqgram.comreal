import React, { useState, useMemo } from "react";
import "./FeedCommon.css";
import "./Exploorer.css";
import SimpleCard from "../Cards/SimpleCard";

const ALL_TOOLS = [
  { title: "Figma", img: "https://logo.clearbit.com/figma.com", items: "Collaborative interface design tool", link: "https://www.figma.com/", category: "Design" },
  { title: "Framer", img: "https://logo.clearbit.com/framer.com", items: "Interactive prototyping & web design", link: "https://www.framer.com/", category: "Design" },
  { title: "Canva", img: "https://logo.clearbit.com/canva.com", items: "Create stunning visuals online", link: "https://www.canva.com/", category: "Design" },
  { title: "Adobe XD", img: "https://logo.clearbit.com/adobe.com", items: "UI/UX design and prototyping", link: "https://www.adobe.com/products/xd.html", category: "Design" },
  { title: "Sketch", img: "https://logo.clearbit.com/sketch.com", items: "Vector UI design app for macOS", link: "https://www.sketch.com/", category: "Design" },
  { title: "GitHub", img: "https://logo.clearbit.com/github.com", items: "Code hosting & collaboration platform", link: "https://github.com/", category: "Development" },
  { title: "GitLab", img: "https://logo.clearbit.com/gitlab.com", items: "DevOps & CI/CD platform", link: "https://gitlab.com/", category: "Development" },
  { title: "VS Code", img: "https://logo.clearbit.com/visualstudio.com", items: "Powerful and fast code editor", link: "https://code.visualstudio.com/", category: "Development" },
  { title: "Stack Overflow", img: "https://logo.clearbit.com/stackoverflow.com", items: "Q&A for developers worldwide", link: "https://stackoverflow.com/", category: "Development" },
  { title: "CodePen", img: "https://logo.clearbit.com/codepen.io", items: "Online code editor for front-end dev", link: "https://codepen.io/", category: "Development" },
  { title: "Replit", img: "https://logo.clearbit.com/replit.com", items: "Collaborative online IDE", link: "https://replit.com/", category: "Development" },
  { title: "Vercel", img: "https://logo.clearbit.com/vercel.com", items: "Deploy React & Next.js apps easily", link: "https://vercel.com/", category: "Hosting" },
  { title: "Netlify", img: "https://logo.clearbit.com/netlify.com", items: "Powerful hosting & CI/CD for web apps", link: "https://www.netlify.com/", category: "Hosting" },
  { title: "Firebase", img: "https://logo.clearbit.com/firebase.google.com", items: "Backend services & hosting by Google", link: "https://firebase.google.com/", category: "Hosting" },
  { title: "Heroku", img: "https://logo.clearbit.com/heroku.com", items: "Platform as a service for apps", link: "https://www.heroku.com/", category: "Hosting" },
  { title: "Render", img: "https://logo.clearbit.com/render.com", items: "Fast cloud hosting platform", link: "https://render.com/", category: "Hosting" },
  { title: "Notion", img: "https://logo.clearbit.com/notion.so", items: "All-in-one workspace for notes & docs", link: "https://www.notion.so/", category: "Productivity" },
  { title: "Trello", img: "https://logo.clearbit.com/trello.com", items: "Organize and plan projects visually", link: "https://trello.com/", category: "Productivity" },
  { title: "Slack", img: "https://logo.clearbit.com/slack.com", items: "Team communication and collaboration", link: "https://slack.com/", category: "Productivity" },
  { title: "Discord", img: "https://logo.clearbit.com/discord.com", items: "Voice & text chat for communities", link: "https://discord.com/", category: "Productivity" },
  { title: "Linear", img: "https://logo.clearbit.com/linear.app", items: "Issue tracking for modern teams", link: "https://linear.app/", category: "Productivity" },
  { title: "Unsplash", img: "https://logo.clearbit.com/unsplash.com", items: "Free high-quality stock images", link: "https://unsplash.com/", category: "Productivity" },
];

const CATS = ["All", "Design", "Development", "Hosting", "Productivity"];

const ExploreFeed = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(() => {
    let result = ALL_TOOLS;
    if (activeFilter !== "All") result = result.filter(t => t.category === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(t => t.title.toLowerCase().includes(q) || t.items.toLowerCase().includes(q));
    }
    return result;
  }, [search, activeFilter]);

  const grouped = useMemo(() => {
    if (activeFilter !== "All" || search.trim()) return null;
    return CATS.slice(1).reduce((acc, cat) => {
      acc[cat] = ALL_TOOLS.filter(t => t.category === cat);
      return acc;
    }, {});
  }, [activeFilter, search]);

  return (
    <div className="feed explore-feed">
      {/* Banner */}
      <div style={styles.banner}>
        <div style={styles.bannerGlow} />
        <div style={styles.bannerContent}>
          <h1 style={styles.bannerTitle}>🚀 Explore Top Tools</h1>
          <p style={styles.bannerSub}>Your all-in-one resource hub for design, development, hosting & productivity.</p>
          {/* Search */}
          <div style={styles.searchWrap}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={styles.searchInput}
            />
            {search && (
              <button onClick={() => setSearch("")} style={styles.clearBtn}>✕</button>
            )}
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div style={styles.filterRow}>
        {CATS.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            style={{
              ...styles.chip,
              background: activeFilter === cat ? "linear-gradient(135deg, #6366f1, #ec4899)" : "rgba(255,255,255,0.04)",
              color: activeFilter === cat ? "#fff" : "rgba(255,255,255,0.5)",
              border: activeFilter === cat ? "1px solid transparent" : "1px solid rgba(255,255,255,0.08)",
              boxShadow: activeFilter === cat ? "0 4px 14px rgba(99,102,241,0.35)" : "none",
              fontWeight: activeFilter === cat ? "700" : "500",
            }}
          >
            {cat}
          </button>
        ))}
        <div style={styles.resultCount}>{filtered.length} tools</div>
      </div>

      {/* Results */}
      {search.trim() || activeFilter !== "All" ? (
        filtered.length > 0 ? (
          <div style={styles.grid}>
            {filtered.map((tool, i) => (
              <SimpleCard key={i} title={tool.title} img={tool.img} items={tool.items} link={tool.link} category={tool.category} />
            ))}
          </div>
        ) : (
          <div style={styles.noResults}>
            <span style={{ fontSize: "36px" }}>🔍</span>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>No tools found for "{search}"</p>
          </div>
        )
      ) : (
        CATS.slice(1).map(cat => (
          <div key={cat} style={styles.catSection}>
            <div style={styles.catHeader}>
              <div style={styles.catBar} />
              <h2 style={styles.catTitle}>{cat}</h2>
              <div style={styles.catCount}>{grouped[cat]?.length} tools</div>
            </div>
            <div style={styles.grid}>
              {grouped[cat]?.map((tool, i) => (
                <SimpleCard key={i} title={tool.title} img={tool.img} items={tool.items} link={tool.link} category={tool.category} />
              ))}
            </div>
          </div>
        ))
      )}

      <div style={styles.footer}>
        <h2 style={styles.footerTitle}>✨ More tools coming soon</h2>
        <p style={styles.footerSub}>We keep this list updated with the best new tools for creators and developers.</p>
      </div>
    </div>
  );
};

const styles = {
  banner: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "20px",
    marginBottom: "24px",
    background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 60%, #0a0a0f 100%)",
    border: "1px solid rgba(99,102,241,0.2)",
    padding: "40px 36px",
  },
  bannerGlow: {
    position: "absolute",
    top: "-60px",
    right: "-60px",
    width: "280px",
    height: "280px",
    background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  bannerContent: { position: "relative" },
  bannerTitle: { fontSize: "30px", fontWeight: "900", color: "#f1f1f5", margin: "0 0 8px", letterSpacing: "-0.8px" },
  bannerSub: { color: "rgba(255,255,255,0.5)", fontSize: "14px", marginBottom: "24px" },
  searchWrap: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "12px",
    padding: "0 14px",
    maxWidth: "420px",
    gap: "10px",
    transition: "border-color 0.2s",
  },
  searchIcon: { fontSize: "14px", flexShrink: 0 },
  searchInput: {
    flex: 1,
    background: "none",
    border: "none",
    outline: "none",
    color: "#f1f1f5",
    fontSize: "14px",
    padding: "12px 0",
    fontFamily: "inherit",
  },
  clearBtn: {
    background: "none",
    border: "none",
    color: "rgba(255,255,255,0.35)",
    cursor: "pointer",
    fontSize: "13px",
    padding: "2px 4px",
    borderRadius: "4px",
    transition: "color 0.2s",
  },
  filterRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "24px",
    alignItems: "center",
  },
  chip: {
    padding: "7px 18px",
    borderRadius: "100px",
    fontSize: "12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
    letterSpacing: "0.2px",
  },
  resultCount: {
    marginLeft: "auto",
    fontSize: "12px",
    color: "rgba(255,255,255,0.25)",
    fontWeight: "600",
    letterSpacing: "0.5px",
  },
  catSection: { marginBottom: "36px" },
  catHeader: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" },
  catBar: { width: "4px", height: "22px", background: "linear-gradient(135deg, #6366f1, #ec4899)", borderRadius: "2px", flexShrink: 0 },
  catTitle: { fontSize: "18px", fontWeight: "800", color: "#f1f1f5", margin: 0, letterSpacing: "-0.3px" },
  catCount: { fontSize: "11px", color: "rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.05)", padding: "2px 8px", borderRadius: "6px", fontWeight: "600" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "18px",
  },
  noResults: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    padding: "60px 20px",
    color: "rgba(255,255,255,0.4)",
  },
  footer: {
    textAlign: "center",
    marginTop: "48px",
    padding: "32px 20px",
    borderTop: "1px solid rgba(255,255,255,0.05)",
  },
  footerTitle: { fontSize: "18px", color: "#f1f1f5", fontWeight: "700", margin: "0 0 8px" },
  footerSub: { color: "rgba(255,255,255,0.35)", fontSize: "14px", margin: 0 },
};

export default ExploreFeed;
