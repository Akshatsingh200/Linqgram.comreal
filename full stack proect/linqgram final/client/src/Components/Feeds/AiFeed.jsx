import React from "react";
import ToolCard from "../Cards/ToolCaard";
import "./FeedCommon.css";
import "./Librerary.css";

function AiFeed() {
  const chatbotTools = [
    {
      logo: "https://via.placeholder.com/40/FF0000/FFFFFF?text=C",
      name: "ChatGPT",
      description: "AI-powered conversational assistant",
      link: "https://chat.openai.com/",
    },
    {
      logo: "https://via.placeholder.com/40/00FFAA/FFFFFF?text=M",
      name: "Mistral AI",
      description: "Lightweight AI chat models",
      link: "https://mistral.ai/",
    },
    {
      logo: "https://via.placeholder.com/40/0000FF/FFFFFF?text=C",
      name: "Claude",
      description: "Advanced AI assistant for tasks",
      link: "https://claude.ai/",
    },
  ];

  const imageTools = [
    {
      logo: "https://via.placeholder.com/40/FF7B00/FFFFFF?text=I",
      name: "Midjourney",
      description: "AI image generation",
      link: "https://www.midjourney.com/",
    },
    {
      logo: "https://via.placeholder.com/40/AA00FF/FFFFFF?text=D",
      name: "DALL·E",
      description: "Text-to-image model",
      link: "https://openai.com/dall-e-3",
    },
    {
      logo: "https://via.placeholder.com/40/00CCFF/FFFFFF?text=S",
      name: "Stable Diffusion",
      description: "Open-source AI image generator",
      link: "https://stability.ai/",
    },
  ];

  const automationTools = [
    {
      logo: "https://via.placeholder.com/40/FF5555/FFFFFF?text=Z",
      name: "Zapier AI",
      description: "Automate workflows with AI",
      link: "https://zapier.com/",
    },
    {
      logo: "https://via.placeholder.com/40/00AA00/FFFFFF?text=M",
      name: "Make",
      description: "Smart automation builder",
      link: "https://www.make.com/",
    },
    {
      logo: "https://via.placeholder.com/40/888888/FFFFFF?text=A",
      name: "AutoGPT",
      description: "Self-running AI automation",
      link: "https://autogpt.net/",
    },
  ];

  const voiceTools = [
    {
      logo: "https://via.placeholder.com/40/FFA500/FFFFFF?text=V",
      name: "ElevenLabs",
      description: "AI voice generation",
      link: "https://elevenlabs.io/",
    },
    {
      logo: "https://via.placeholder.com/40/00CED1/FFFFFF?text=R",
      name: "Resemble AI",
      description: "Realistic voice cloning",
      link: "https://www.resemble.ai/",
    },
    {
      logo: "https://via.placeholder.com/40/FF69B4/FFFFFF?text=D",
      name: "Descript",
      description: "Voice editing and podcast tools",
      link: "https://www.descript.com/",
    },
  ];

  return (
    <div className="feed library-feed">
      <div className="banner">
        <h1>Explore AI Tools</h1>
        <p>
          Discover the best AI tools for productivity, creativity, and
          automation.
        </p>
      </div>

      <div className="card-grid">
        <ToolCard
          title="Chatbots"
          icon="https://via.placeholder.com/24/FF0000/FFFFFF?text=C"
          items={chatbotTools}
        />
        <ToolCard
          title="Image Generators"
          icon="https://via.placeholder.com/24/FF7B00/FFFFFF?text=I"
          items={imageTools}
        />
        <ToolCard
          title="Automation"
          icon="https://via.placeholder.com/24/00AA00/FFFFFF?text=A"
          items={automationTools}
        />
        <ToolCard
          title="Voice & Audio"
          icon="https://via.placeholder.com/24/FFA500/FFFFFF?text=V"
          items={voiceTools}
        />
      </div>
    </div>
  );
}

export default AiFeed;
