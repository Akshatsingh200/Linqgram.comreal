import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const stats = [
    { value: "200+", label: "Tools Listed", color: "#6366f1" },
    { value: "18", label: "Categories", color: "#ec4899" },
    { value: "100%", label: "Free Forever", color: "#10b981" },
    { value: "24/7", label: "Always Updated", color: "#f59e0b" },
  ];

  const features = [
    { icon: "🔧", title: "Developer Tools", desc: "From IDEs to deployment platforms — everything a developer needs.", color: "#6366f1" },
    { icon: "🎨", title: "Design Resources", desc: "UI kits, illustration packs, and design inspiration all in one place.", color: "#ec4899" },
    { icon: "🤖", title: "AI Powered", desc: "Latest AI chatbots, image generators, and automation tools.", color: "#10b981" },
    { icon: "🚀", title: "Startup Hub", desc: "Resources to pitch, fund, launch, and grow your startup.", color: "#f59e0b" },
    { icon: "📚", title: "Learning Library", desc: "Curated articles, tutorials and guides to level up your skills.", color: "#06b6d4" },
    { icon: "🛍️", title: "Marketplace", desc: "Buy and sell digital products, templates and tools.", color: "#8b5cf6" },
  ];

  const timeline = [
    { year: "2024", title: "LinqGram Founded", desc: "Started as a personal tools bookmark list that got too big." },
    { year: "2024", title: "First 100 Tools", desc: "Reached our first milestone — 100 curated tools across 10 categories." },
    { year: "2025", title: "Community Launch", desc: "Opened up to the public with accounts, submissions, and reviews." },
    { year: "2025", title: "200+ Tools", desc: "Grew to 200+ tools across 18 categories with thousands of users." },
  ];

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glow { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        .feature-card:hover { transform: translateY(-4px) !important; border-color: rgba(255,255,255,0.12) !important; }
        .stat-card:hover { transform: scale(1.04) !important; }
        .timeline-dot { animation: glow 2s ease-in-out infinite; }
      `}</style>

      {/* Background */}
      <div style={styles.gridBg} />
      <div style={{ ...styles.orb, top: "-200px", left: "-200px", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 60%)", width: "700px", height: "700px" }} />
      <div style={{ ...styles.orb, bottom: "-200px", right: "-100px", background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 60%)", width: "600px", height: "600px" }} />

      {/* ===== HERO ===== */}
      <section style={styles.hero}>
        <div style={styles.heroBadge}>
          <span style={styles.heroBadgeDot} />
          About LinqGram
        </div>
        <h1 style={styles.heroTitle}>
          The hub for tools<br />
          <span style={styles.heroGradient}>every creator needs</span>
        </h1>
        <p style={styles.heroSubtitle}>
          We built LinqGram because finding the right tools is exhausting.
          Stop searching, start building.
        </p>
        <div style={styles.heroActions}>
          <button onClick={() => navigate("/")} style={styles.primaryBtn}>Explore Tools →</button>
          <button onClick={() => navigate("/contact")} style={styles.secondaryBtn}>Get in Touch</button>
        </div>

        {/* Floating tool logos */}
        <div style={styles.floatingLogos}>
          {["figma.com", "notion.so", "vercel.com", "github.com", "canva.com"].map((domain, i) => (
            <div key={i} style={{
              ...styles.floatingLogo,
              animation: `float ${2.5 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              left: `${10 + i * 18}%`,
              top: `${20 + (i % 2) * 30}%`,
            }}>
              <img
                src={`https://logo.clearbit.com/${domain}`}
                alt={domain}
                style={{ width: "28px", height: "28px", borderRadius: "8px" }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section style={styles.section}>
        <div style={styles.statsGrid}>
          {stats.map((s, i) => (
            <div key={i} className="stat-card" style={{ ...styles.statCard, borderColor: `${s.color}22` }}>
              <div style={{ ...styles.statValue, color: s.color }}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
              <div style={{ ...styles.statGlow, background: `radial-gradient(circle, ${s.color}22 0%, transparent 70%)` }} />
            </div>
          ))}
        </div>
      </section>

      {/* ===== MISSION ===== */}
      <section style={styles.section}>
        <div style={styles.missionCard}>
          <div style={styles.missionLeft}>
            <p style={styles.sectionLabel}>Our Mission</p>
            <h2 style={styles.sectionTitle}>Stop wasting time searching. Start building.</h2>
            <p style={styles.sectionText}>
              Every developer, designer, and creator spends hours hunting for the right tool. We curate, organize, and constantly update the best tools so you don't have to.
            </p>
            <p style={styles.sectionText}>
              LinqGram is your shortcut — whether you're building your first app, designing a brand identity, launching a startup, or learning to code.
            </p>
            <div style={styles.missionTags}>
              {["Curated", "Free", "Updated Weekly", "Community Driven"].map((tag, i) => (
                <span key={i} style={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div style={styles.missionRight}>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80"
              alt="Team working"
              style={styles.missionImg}
            />
            <div style={styles.missionImgOverlay} />
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section style={styles.section}>
        <div style={styles.centeredHeader}>
          <p style={styles.sectionLabel}>What We Offer</p>
          <h2 style={styles.sectionTitle}>Everything in one place</h2>
        </div>
        <div style={styles.featuresGrid}>
          {features.map((f, i) => (
            <div key={i} className="feature-card" style={{ ...styles.featureCard, transition: "all 0.3s ease" }}>
              <div style={{ ...styles.featureIconBox, background: `${f.color}18`, border: `1px solid ${f.color}30` }}>
                <span style={{ fontSize: "22px" }}>{f.icon}</span>
              </div>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section style={styles.section}>
        <div style={styles.centeredHeader}>
          <p style={styles.sectionLabel}>Our Journey</p>
          <h2 style={styles.sectionTitle}>How we got here</h2>
        </div>
        <div style={styles.timeline}>
          {timeline.map((item, i) => (
            <div key={i} style={styles.timelineItem}>
              <div style={styles.timelineLeft}>
                <span style={styles.timelineYear}>{item.year}</span>
              </div>
              <div style={styles.timelineCenter}>
                <div className="timeline-dot" style={{ ...styles.timelineDot, animationDelay: `${i * 0.5}s` }} />
                {i < timeline.length - 1 && <div style={styles.timelineLine} />}
              </div>
              <div style={styles.timelineRight}>
                <h3 style={styles.timelineTitle}>{item.title}</h3>
                <p style={styles.timelineDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={styles.section}>
        <div style={styles.ctaCard}>
          <div style={styles.ctaGlow} />
          <h2 style={styles.ctaTitle}>Have a tool to suggest?</h2>
          <p style={styles.ctaSubtitle}>Help us grow the best tool directory on the internet.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/contact")} style={styles.ctaBtn}>Submit a Tool →</button>
            <button onClick={() => navigate("/")} style={styles.ctaBtnOutline}>Explore Tools</button>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#060608",
    color: "#fff",
    paddingTop: "80px",
    position: "relative",
    overflow: "hidden",
  },
  gridBg: {
    position: "fixed",
    inset: 0,
    backgroundImage: `linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)`,
    backgroundSize: "50px 50px",
    pointerEvents: "none",
    zIndex: 0,
  },
  orb: { position: "absolute", borderRadius: "50%", pointerEvents: "none", zIndex: 0 },

  // Hero
  hero: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "80px 24px 60px",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(99,102,241,0.1)",
    border: "1px solid rgba(99,102,241,0.25)",
    borderRadius: "100px",
    padding: "6px 18px",
    fontSize: "13px",
    color: "#a5b4fc",
    fontWeight: "600",
    marginBottom: "28px",
    letterSpacing: "0.5px",
  },
  heroBadgeDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#6366f1",
    boxShadow: "0 0 8px #6366f1",
  },
  heroTitle: {
    fontSize: "clamp(36px, 6vw, 64px)",
    fontWeight: "900",
    lineHeight: "1.1",
    marginBottom: "20px",
    letterSpacing: "-2px",
  },
  heroGradient: {
    background: "linear-gradient(135deg, #6366f1, #ec4899, #f59e0b)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSubtitle: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.5)",
    maxWidth: "480px",
    margin: "0 auto 36px",
    lineHeight: "1.7",
  },
  heroActions: { display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" },
  primaryBtn: {
    padding: "13px 28px",
    background: "linear-gradient(135deg, #6366f1, #ec4899)",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
    fontFamily: "inherit",
  },
  secondaryBtn: {
    padding: "13px 28px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    color: "rgba(255,255,255,0.7)",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  floatingLogos: { position: "relative", height: "100px", marginTop: "40px" },
  floatingLogo: {
    position: "absolute",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "8px",
    backdropFilter: "blur(10px)",
  },

  // Section
  section: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "60px 24px",
    position: "relative",
    zIndex: 1,
  },
  centeredHeader: { textAlign: "center", marginBottom: "48px" },
  sectionLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#6366f1",
    textTransform: "uppercase",
    letterSpacing: "2px",
    marginBottom: "12px",
  },
  sectionTitle: {
    fontSize: "clamp(24px, 4vw, 36px)",
    fontWeight: "800",
    color: "#fff",
    letterSpacing: "-1px",
    lineHeight: "1.2",
    marginBottom: "16px",
  },
  sectionText: {
    fontSize: "15px",
    color: "rgba(255,255,255,0.5)",
    lineHeight: "1.8",
    marginBottom: "14px",
  },

  // Stats
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
  },
  statCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid",
    borderRadius: "16px",
    padding: "32px 24px",
    textAlign: "center",
    cursor: "default",
    transition: "transform 0.2s ease",
    position: "relative",
    overflow: "hidden",
  },
  statValue: { fontSize: "40px", fontWeight: "900", letterSpacing: "-2px", marginBottom: "6px" },
  statLabel: { fontSize: "13px", color: "rgba(255,255,255,0.4)", fontWeight: "500" },
  statGlow: { position: "absolute", inset: "-50%", pointerEvents: "none" },

  // Mission
  missionCard: {
    display: "flex",
    gap: "60px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  missionLeft: { flex: "1 1 320px" },
  missionRight: {
    flex: "1 1 320px",
    position: "relative",
    borderRadius: "20px",
    overflow: "hidden",
  },
  missionImg: {
    width: "100%",
    height: "320px",
    objectFit: "cover",
    display: "block",
    borderRadius: "20px",
  },
  missionImgOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, transparent 60%)",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  missionTags: { display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "24px" },
  tag: {
    padding: "5px 14px",
    background: "rgba(99,102,241,0.1)",
    border: "1px solid rgba(99,102,241,0.2)",
    borderRadius: "100px",
    fontSize: "12px",
    color: "#a5b4fc",
    fontWeight: "500",
  },

  // Features
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "16px",
  },
  featureCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "16px",
    padding: "28px",
  },
  featureIconBox: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
  },
  featureTitle: { fontSize: "15px", fontWeight: "700", color: "#fff", marginBottom: "8px" },
  featureDesc: { fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: "1.7" },

  // Timeline
  timeline: { maxWidth: "640px", margin: "0 auto", display: "flex", flexDirection: "column" },
  timelineItem: { display: "flex", gap: "20px", alignItems: "flex-start" },
  timelineLeft: { width: "60px", textAlign: "right", paddingTop: "2px", flexShrink: 0 },
  timelineYear: { fontSize: "12px", fontWeight: "700", color: "#6366f1" },
  timelineCenter: { display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 },
  timelineDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #ec4899)",
    boxShadow: "0 0 12px rgba(99,102,241,0.6)",
    flexShrink: 0,
  },
  timelineLine: { width: "2px", flex: 1, background: "linear-gradient(180deg, rgba(99,102,241,0.4), rgba(236,72,153,0.1))", minHeight: "40px", margin: "4px 0" },
  timelineRight: { flex: 1, paddingBottom: "36px" },
  timelineTitle: { fontSize: "15px", fontWeight: "700", color: "#fff", marginBottom: "6px" },
  timelineDesc: { fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: "1.7" },

  // CTA
  ctaCard: {
    background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(236,72,153,0.08) 100%)",
    border: "1px solid rgba(99,102,241,0.2)",
    borderRadius: "24px",
    padding: "64px 40px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  ctaGlow: {
    position: "absolute",
    top: "-100px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "400px",
    height: "300px",
    background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  ctaTitle: { fontSize: "clamp(24px, 4vw, 36px)", fontWeight: "800", marginBottom: "12px", letterSpacing: "-1px" },
  ctaSubtitle: { color: "rgba(255,255,255,0.5)", fontSize: "15px", marginBottom: "32px" },
  ctaBtn: {
    padding: "14px 32px",
    background: "linear-gradient(135deg, #6366f1, #ec4899)",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
    fontFamily: "inherit",
  },
  ctaBtnOutline: {
    padding: "14px 32px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "10px",
    color: "rgba(255,255,255,0.7)",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "inherit",
  },
};

export default About;
