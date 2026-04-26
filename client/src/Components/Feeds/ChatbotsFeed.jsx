import React from "react";
import SimpleCard from "../Cards/SimpleCard";
import "./FeedCommon.css";

const ChatbotsFeed = () => {
  const bots = [
    { id: 1, title: "ChatGPT", img: "https://logo.clearbit.com/openai.com", items: "Most popular AI chatbot by OpenAI.", link: "https://chat.openai.com" },
    { id: 2, title: "Claude", img: "https://logo.clearbit.com/anthropic.com", items: "Advanced AI assistant by Anthropic.", link: "https://claude.ai" },
    { id: 3, title: "Google Gemini", img: "https://logo.clearbit.com/gemini.google.com", items: "Google's multimodal AI assistant.", link: "https://gemini.google.com" },
    { id: 4, title: "Mistral AI", img: "https://logo.clearbit.com/mistral.ai", items: "Fast, open-source AI chat models.", link: "https://chat.mistral.ai" },
    { id: 5, title: "Perplexity", img: "https://logo.clearbit.com/perplexity.ai", items: "AI-powered answer engine with sources.", link: "https://www.perplexity.ai" },
    { id: 6, title: "Meta AI", img: "https://logo.clearbit.com/meta.ai", items: "Meta's AI assistant powered by Llama.", link: "https://www.meta.ai" },
    { id: 7, title: "Grok", img: "https://logo.clearbit.com/x.ai", items: "xAI's witty AI assistant by Elon Musk.", link: "https://x.ai" },
    { id: 8, title: "Poe", img: "https://logo.clearbit.com/poe.com", items: "All AI chatbots in one platform.", link: "https://poe.com" },
    { id: 9, title: "Character.ai", img: "https://logo.clearbit.com/character.ai", items: "Chat with AI characters and personas.", link: "https://character.ai" },
  ];

  return (
    <div className="feed">
      <div className="banner">
        <h1>🤖 AI Chatbots</h1>
        <p>The best AI conversational assistants available today.</p>
      </div>
      <div className="feed-grid">
        {bots.map((b) => (
          <div key={b.id} onClick={() => window.open(b.link, "_blank")} className="cursor-pointer">
            <SimpleCard title={b.title} img={b.img} items={b.items} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatbotsFeed;
