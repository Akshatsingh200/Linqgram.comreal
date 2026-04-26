import React from "react";
import SimpleCard from "../Cards/SimpleCard";
import "./FeedCommon.css";

const GeneratorsFeed = () => {
  const generators = [
    { id: 1, title: "Midjourney", img: "https://logo.clearbit.com/midjourney.com", items: "Create stunning AI art from text prompts.", link: "https://www.midjourney.com" },
    { id: 2, title: "DALL·E 3", img: "https://logo.clearbit.com/openai.com", items: "OpenAI's powerful text-to-image model.", link: "https://openai.com/dall-e-3" },
    { id: 3, title: "Stable Diffusion", img: "https://logo.clearbit.com/stability.ai", items: "Open-source AI image generation.", link: "https://stability.ai" },
    { id: 4, title: "Adobe Firefly", img: "https://logo.clearbit.com/adobe.com", items: "Generative AI built into Adobe apps.", link: "https://firefly.adobe.com" },
    { id: 5, title: "Leonardo AI", img: "https://logo.clearbit.com/leonardo.ai", items: "AI image generation for game assets.", link: "https://leonardo.ai" },
    { id: 6, title: "Ideogram", img: "https://logo.clearbit.com/ideogram.ai", items: "AI image generation with accurate text.", link: "https://ideogram.ai" },
    { id: 7, title: "Runway Gen-3", img: "https://logo.clearbit.com/runwayml.com", items: "State-of-the-art AI video generation.", link: "https://runwayml.com" },
    { id: 8, title: "Sora", img: "https://logo.clearbit.com/openai.com", items: "OpenAI's revolutionary video generator.", link: "https://sora.com" },
    { id: 9, title: "ElevenLabs", img: "https://logo.clearbit.com/elevenlabs.io", items: "Hyper-realistic AI voice generation.", link: "https://elevenlabs.io" },
  ];

  return (
    <div className="feed">
      <div className="banner">
        <h1>✨ AI Generators</h1>
        <p>Create images, videos, and audio with cutting-edge AI generation tools.</p>
      </div>
      <div className="feed-grid">
        {generators.map((g) => (
          <div key={g.id} onClick={() => window.open(g.link, "_blank")} className="cursor-pointer">
            <SimpleCard title={g.title} img={g.img} items={g.items} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneratorsFeed;
