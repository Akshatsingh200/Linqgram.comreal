import { createContext, useContext, useState, useEffect, useCallback } from "react";

export const ToolContext = createContext();

const MAX_HISTORY = 20;

export const ToolContextProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem("lq_bookmarks") || "[]"); } catch { return []; }
  });
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("lq_history") || "[]"); } catch { return []; }
  });
  const [usageCounts, setUsageCounts] = useState(() => {
    try { return JSON.parse(localStorage.getItem("lq_usage") || "{}"); } catch { return {}; }
  });

  useEffect(() => { localStorage.setItem("lq_bookmarks", JSON.stringify(bookmarks)); }, [bookmarks]);
  useEffect(() => { localStorage.setItem("lq_history", JSON.stringify(history)); }, [history]);
  useEffect(() => { localStorage.setItem("lq_usage", JSON.stringify(usageCounts)); }, [usageCounts]);

  const toggleBookmark = useCallback((tool) => {
    setBookmarks((prev) => {
      const exists = prev.find((b) => b.title === tool.title);
      if (exists) return prev.filter((b) => b.title !== tool.title);
      return [{ ...tool, savedAt: Date.now() }, ...prev];
    });
  }, []);

  const isBookmarked = useCallback((title) => bookmarks.some((b) => b.title === title), [bookmarks]);

  const recordVisit = useCallback((tool) => {
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.title !== tool.title);
      return [{ ...tool, visitedAt: Date.now() }, ...filtered].slice(0, MAX_HISTORY);
    });
    setUsageCounts((prev) => ({
      ...prev,
      [tool.title]: (prev[tool.title] || 0) + 1,
    }));
  }, []);

  const clearHistory = useCallback(() => setHistory([]), []);

  // All tools across the app for Popular/Most Used computation
  const allTools = [
    { title: "Figma", img: "https://logo.clearbit.com/figma.com", items: "Collaborative interface design tool", link: "https://www.figma.com/", category: "Design" },
    { title: "Framer", img: "https://logo.clearbit.com/framer.com", items: "Interactive prototyping & web design", link: "https://www.framer.com/", category: "Design" },
    { title: "Canva", img: "https://logo.clearbit.com/canva.com", items: "Create stunning visuals online", link: "https://www.canva.com/", category: "Design" },
    { title: "Adobe XD", img: "https://logo.clearbit.com/adobe.com", items: "UI/UX design and prototyping", link: "https://www.adobe.com/products/xd.html", category: "Design" },
    { title: "Sketch", img: "https://logo.clearbit.com/sketch.com", items: "Vector UI design app for macOS", link: "https://www.sketch.com/", category: "Design" },
    { title: "GitHub", img: "https://logo.clearbit.com/github.com", items: "Code hosting & collaboration platform", link: "https://github.com/", category: "Development" },
    { title: "VS Code", img: "https://logo.clearbit.com/visualstudio.com", items: "Powerful and fast code editor", link: "https://code.visualstudio.com/", category: "Development" },
    { title: "Vercel", img: "https://logo.clearbit.com/vercel.com", items: "Deploy React & Next.js apps easily", link: "https://vercel.com/", category: "Hosting" },
    { title: "Netlify", img: "https://logo.clearbit.com/netlify.com", items: "Powerful hosting & CI/CD for web apps", link: "https://www.netlify.com/", category: "Hosting" },
    { title: "Notion", img: "https://logo.clearbit.com/notion.so", items: "All-in-one workspace for notes & docs", link: "https://www.notion.so/", category: "Productivity" },
    { title: "Slack", img: "https://logo.clearbit.com/slack.com", items: "Team communication and collaboration", link: "https://slack.com/", category: "Productivity" },
    { title: "Linear", img: "https://logo.clearbit.com/linear.app", items: "Issue tracking for modern teams", link: "https://linear.app/", category: "Productivity" },
    { title: "ChatGPT", img: "https://logo.clearbit.com/openai.com", items: "AI-powered conversational assistant", link: "https://chat.openai.com/", category: "AI" },
    { title: "Midjourney", img: "https://logo.clearbit.com/midjourney.com", items: "AI image generation tool", link: "https://www.midjourney.com/", category: "AI" },
    { title: "Claude", img: "https://logo.clearbit.com/anthropic.com", items: "Advanced AI assistant by Anthropic", link: "https://claude.ai/", category: "AI" },
    { title: "Tailwind CSS", img: "https://logo.clearbit.com/tailwindcss.com", items: "Utility-first CSS framework", link: "https://tailwindcss.com/", category: "Frameworks" },
    { title: "Next.js", img: "https://logo.clearbit.com/nextjs.org", items: "React framework for production", link: "https://nextjs.org/", category: "Frameworks" },
    { title: "Shopify", img: "https://logo.clearbit.com/shopify.com", items: "E-commerce platform for all scales", link: "https://www.shopify.com/", category: "E-commerce" },
    { title: "Webflow", img: "https://logo.clearbit.com/webflow.com", items: "No-code web design platform", link: "https://webflow.com/", category: "No-Code" },
    { title: "Bubble", img: "https://logo.clearbit.com/bubble.io", items: "Build web apps without code", link: "https://bubble.io/", category: "No-Code" },
  ];

  // Popular = sorted by a simulated popularity score seeded with known counts
  const popularTools = [...allTools]
    .map((t) => ({
      ...t,
      popularityScore: {
        Figma: 9800, GitHub: 9600, "VS Code": 9400, "Tailwind CSS": 8900,
        Vercel: 8700, Notion: 8500, ChatGPT: 8300, "Next.js": 8100,
        Canva: 7900, Slack: 7700, Framer: 7500, Claude: 7200,
        Netlify: 6900, Webflow: 6700, Midjourney: 6400, Linear: 6100,
        Shopify: 5900, Bubble: 5600, Sketch: 5300, "Adobe XD": 5000,
      }[t.title] || 4000,
    }))
    .sort((a, b) => b.popularityScore - a.popularityScore);

  // Most used = sorted by user's actual usage counts
  const mostUsedTools = [...allTools]
    .map((t) => ({ ...t, useCount: usageCounts[t.title] || 0 }))
    .filter((t) => t.useCount > 0)
    .sort((a, b) => b.useCount - a.useCount);

  return (
    <ToolContext.Provider value={{
      bookmarks, toggleBookmark, isBookmarked,
      history, recordVisit, clearHistory,
      usageCounts,
      popularTools,
      mostUsedTools,
      allTools,
    }}>
      {children}
    </ToolContext.Provider>
  );
};

export const useTools = () => useContext(ToolContext);
