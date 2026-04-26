import React from "react";
import SimpleCard from "../Cards/SimpleCard";
import "./FeedCommon.css";

const ArticlesFeed = () => {
  const articles = [
    { id: 1, title: "AI is Changing the World", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400", items: "Discover how AI impacts industries and daily life.", link: "https://www.ibm.com/topics/artificial-intelligence" },
    { id: 2, title: "How AI Tools Boost Productivity", img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400", items: "Explore how AI is transforming the way we work.", link: "https://www.microsoft.com/en-us/ai" },
    { id: 3, title: "The Future of Web3", img: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400", items: "An easy guide to understanding decentralized technology.", link: "https://ethereum.org/en/web3/" },
    { id: 4, title: "How Chatbots Are Revolutionizing Industries", img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400", items: "From healthcare to e-commerce bots are everywhere.", link: "https://www.ibm.com/watson" },
    { id: 5, title: "Top 10 Coding Tips", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400", items: "Boost your productivity with these programming hacks.", link: "https://www.freecodecamp.org/news/tag/programming-tips/" },
    { id: 6, title: "Why Every Developer Should Learn Git", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400", items: "Version control is an essential skill for modern devs.", link: "https://git-scm.com/" },
    { id: 7, title: "React vs Vue: Which One to Learn?", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", items: "A quick comparison of two powerful front-end frameworks.", link: "https://www.geeksforgeeks.org/react-vs-vue/" },
    { id: 8, title: "Understanding APIs Like a Pro", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400", items: "APIs power the modern web here is what you need to know.", link: "https://www.postman.com/what-is-an-api/" },
    { id: 9, title: "Design Trends 2025", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400", items: "Minimalism and AI-powered designs are taking over.", link: "https://www.behance.net/" },
    { id: 10, title: "The Psychology of Colors in UI Design", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400", items: "Learn how colors influence user emotions and actions.", link: "https://www.interaction-design.org/literature/topics/color-theory" },
    { id: 11, title: "Typography Rules Every Designer Should Know", img: "https://images.unsplash.com/photo-1524666041070-9d87656c25bb?w=400", items: "Good typography improves readability and user experience.", link: "https://uxdesign.cc/" },
    { id: 12, title: "How Dark Mode Took Over the Web", img: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400", items: "Why users love dark mode and how to design it right.", link: "https://www.smashingmagazine.com/" },
    { id: 13, title: "The Rise of No-Code Platforms", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400", items: "Building apps without code is no longer a dream.", link: "https://zapier.com/blog/best-no-code-tools/" },
    { id: 14, title: "Why Cybersecurity Matters More Than Ever", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400", items: "Protecting data in a connected world.", link: "https://www.cisa.gov/" },
    { id: 15, title: "Quantum Computing Explained Simply", img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400", items: "A beginners guide to understanding quantum tech.", link: "https://www.ibm.com/quantum" },
    { id: 16, title: "AR and VR: The Next Digital Frontier", img: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=400", items: "Immersive experiences are changing how we interact.", link: "https://www.meta.com/vr/" },
  ];

  return (
    <div className="feed">
      <div className="banner">
        <h1>📰 Explore Articles</h1>
        <p>Stay updated with the latest in AI, Tech, Design and Development.</p>
      </div>
      <div className="feed-grid">
        {articles.map((article) => (
          <a key={article.id} href={article.link} target="_blank" rel="noopener noreferrer" className="article-card-link">
            <SimpleCard title={article.title} img={article.img} items={article.items} />
          </a>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "40px", color: "#aaa", padding: "20px", borderTop: "1px solid #222" }}>
        <h2 style={{ color: "#fff", marginBottom: "8px" }}>More Articles Coming Soon ✨</h2>
        <p>We keep adding the latest trending tech content regularly.</p>
      </div>
    </div>
  );
};

export default ArticlesFeed;
