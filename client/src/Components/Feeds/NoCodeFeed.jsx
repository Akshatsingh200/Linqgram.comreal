import React from "react";
import ToolCard from "../Cards/ToolCaard";
import "./FeedCommon.css";

const NoCodeFeed = () => {
  // 🌐 Website Builders
  const websiteBuilders = [
    {
      logo: "https://cdn.worldvectorlogo.com/logos/webflow-2.svg",
      name: "Webflow",
      description: "Visual website builder.",
      link: "https://webflow.com",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Bubble_logo.png",
      name: "Bubble",
      description: "No-code web apps.",
      link: "https://bubble.io",
    },
    {
      logo: "https://www.softr.io/icons/favicon-32x32.png",
      name: "Softr",
      description: "Web apps on Airtable.",
      link: "https://www.softr.io",
    },
  ];

  // 📱 App Builders
  const appBuilders = [
    {
      logo: "https://appgyver.com/favicon-32x32.png",
      name: "AppGyver",
      description: "Mobile apps visually.",
      link: "https://www.appgyver.com",
    },
    {
      logo: "https://www.glideapps.com/favicon-32x32.png",
      name: "Glide",
      description: "Apps from Sheets.",
      link: "https://www.glideapps.com",
    },
    {
      logo: "https://www.adalo.com/favicon.ico",
      name: "Adalo",
      description: "No-code mobile apps.",
      link: "https://www.adalo.com",
    },
  ];

  // ⚡ Automations
  const automations = [
    {
      logo: "https://cdn.worldvectorlogo.com/logos/zapier-1.svg",
      name: "Zapier",
      description: "Automate workflows.",
      link: "https://zapier.com",
    },
    {
      logo: "https://cdn.worldvectorlogo.com/logos/make-integromat.svg",
      name: "Make",
      description: "Visual automation.",
      link: "https://www.make.com",
    },
    {
      logo: "https://cdn.worldvectorlogo.com/logos/n8n-io.svg",
      name: "n8n",
      description: "Open-source automation.",
      link: "https://n8n.io",
    },
  ];

  // 🧠 AI No-Code
  const aiTools = [
    {
      logo: "https://chat.openai.com/apple-touch-icon.png",
      name: "ChatGPT",
      description: "AI assistant builder.",
      link: "https://chat.openai.com",
    },
    {
      logo: "https://cdn.worldvectorlogo.com/logos/midjourney.svg",
      name: "Midjourney",
      description: "AI image generation.",
      link: "https://www.midjourney.com",
    },
    {
      logo: "https://logo.clearbit.com/runwayml.com",
      name: "Runway ML",
      description: "AI video tools.",
      link: "https://runwayml.com",
    },
  ];

  // 🛒 E-commerce
  const ecommerce = [
    {
      logo: "https://cdn.worldvectorlogo.com/logos/shopify.svg",
      name: "Shopify",
      description: "No-code stores.",
      link: "https://www.shopify.com",
    },
    {
      logo: "https://cdn.worldvectorlogo.com/logos/woocommerce.svg",
      name: "WooCommerce",
      description: "WordPress commerce.",
      link: "https://woocommerce.com",
    },
    {
      logo: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg",
      name: "Stripe",
      description: "Payments made easy.",
      link: "https://stripe.com",
    },
  ];

  // 📊 Database & Backend
  const backend = [
    {
      logo: "https://cdn.worldvectorlogo.com/logos/airtable-logo.svg",
      name: "Airtable",
      description: "Smart databases.",
      link: "https://airtable.com",
    },
    {
      logo: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg",
      name: "Firebase",
      description: "Serverless backend.",
      link: "https://firebase.google.com",
    },
    {
      logo: "https://cdn.worldvectorlogo.com/logos/supabase-logo-icon.svg",
      name: "Supabase",
      description: "Open-source backend.",
      link: "https://supabase.com",
    },
  ];

  // 🧰 Design Tools
  const designTools = [
    {
      logo: "https://cdn.worldvectorlogo.com/logos/figma-1.svg",
      name: "Figma",
      description: "UI/UX design tool.",
      link: "https://figma.com",
    },
    {
      logo: "https://cdn.worldvectorlogo.com/logos/canva-1.svg",
      name: "Canva",
      description: "Easy graphic design.",
      link: "https://canva.com",
    },
    {
      logo: "https://logo.clearbit.com/uizard.io",
      name: "Uizard",
      description: "AI design tool.",
      link: "https://uizard.io",
    },
  ];

  // 🧾 Form Builders
  const formBuilders = [
    {
      logo: "https://cdn.worldvectorlogo.com/logos/typeform-1.svg",
      name: "Typeform",
      description: "Beautiful forms.",
      link: "https://typeform.com",
    },
    {
      logo: "https://cdn.worldvectorlogo.com/logos/jotform.svg",
      name: "Jotform",
      description: "Simple form builder.",
      link: "https://jotform.com",
    },
    {
      logo: "https://logo.clearbit.com/tally.so",
      name: "Tally",
      description: "Free online forms.",
      link: "https://tally.so",
    },
  ];

  // 🧑‍💻 Productivity
  const productivity = [
    {
      logo: "https://cdn.worldvectorlogo.com/logos/notion-logo.svg",
      name: "Notion",
      description: "Docs & workspace.",
      link: "https://www.notion.so",
    },
    {
      logo: "https://logo.clearbit.com/trello.com",
      name: "Trello",
      description: "Task boards.",
      link: "https://trello.com",
    },
    {
      logo: "https://cdn.worldvectorlogo.com/logos/airtable-logo.svg",
      name: "Airtable",
      description: "Organize & automate.",
      link: "https://airtable.com",
    },
  ];

  const openLink = (url) => window.open(url, "_blank");

  return (
    <div className="feed">
      <div className="banner">
        <h1>No-Code Tools 🚀</h1>
        <p>
          Build websites, apps, automations and more — all without writing a
          single line of code.
        </p>
      </div>

      <div className="card-grid">
        <div
          onClick={() => openLink("https://webflow.com")}
          style={{ cursor: "pointer" }}
        >
          <ToolCard
            title="Website Builders"
            icon="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
            items={websiteBuilders}
          />
        </div>

        <div
          onClick={() => openLink("https://glideapps.com")}
          style={{ cursor: "pointer" }}
        >
          <ToolCard
            title="App Builders"
            icon="https://cdn-icons-png.flaticon.com/512/1055/1055644.png"
            items={appBuilders}
          />
        </div>

        <div
          onClick={() => openLink("https://zapier.com")}
          style={{ cursor: "pointer" }}
        >
          <ToolCard
            title="Automations"
            icon="https://cdn-icons-png.flaticon.com/512/1995/1995568.png"
            items={automations}
          />
        </div>

        <div
          onClick={() => openLink("https://chat.openai.com")}
          style={{ cursor: "pointer" }}
        >
          <ToolCard
            title="AI Tools"
            icon="https://cdn-icons-png.flaticon.com/512/4712/4712100.png"
            items={aiTools}
          />
        </div>

        <div
          onClick={() => openLink("https://shopify.com")}
          style={{ cursor: "pointer" }}
        >
          <ToolCard
            title="E-Commerce"
            icon="https://cdn-icons-png.flaticon.com/512/711/711284.png"
            items={ecommerce}
          />
        </div>

        <div
          onClick={() => openLink("https://airtable.com")}
          style={{ cursor: "pointer" }}
        >
          <ToolCard
            title="Database & Backend"
            icon="https://cdn-icons-png.flaticon.com/512/481/481874.png"
            items={backend}
          />
        </div>

        <div
          onClick={() => openLink("https://figma.com")}
          style={{ cursor: "pointer" }}
        >
          <ToolCard
            title="Design Tools"
            icon="https://cdn-icons-png.flaticon.com/512/1829/1829588.png"
            items={designTools}
          />
        </div>

        <div
          onClick={() => openLink("https://typeform.com")}
          style={{ cursor: "pointer" }}
        >
          <ToolCard
            title="Form Builders"
            icon="https://cdn-icons-png.flaticon.com/512/747/747376.png"
            items={formBuilders}
          />
        </div>

        <div
          onClick={() => openLink("https://notion.so")}
          style={{ cursor: "pointer" }}
        >
          <ToolCard
            title="Productivity"
            icon="https://cdn-icons-png.flaticon.com/512/2965/2965278.png"
            items={productivity}
          />
        </div>
      </div>
    </div>
  );
};

export default NoCodeFeed;
