import React from "react";
import SimpleCard from "../Cards/SimpleCard";
import "./FeedCommon.css";

const EcommerceFeed = () => {
  const ecommerceTools = [
    {
      id: 1,
      title: "Shopify",
      img: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd",
      items: "Easiest way to build and scale online stores.",
      link: "https://www.shopify.com",
    },
    {
      id: 2,
      title: "Wix",
      img: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
      items: "Drag-and-drop store builder for beginners.",
      link: "https://www.wix.com",
    },
    {
      id: 3,
      title: "Squarespace",
      img: "https://images.unsplash.com/photo-1508830524289-0adcbe822b40",
      items: "Sleek, modern eCommerce store builder.",
      link: "https://www.squarespace.com",
    },
    {
      id: 4,
      title: "BigCommerce",
      img: "https://images.unsplash.com/photo-1556742400-b5b7c5121f4f",
      items: "A powerful platform for growing businesses.",
      link: "https://www.bigcommerce.com",
    },
    {
      id: 5,
      title: "WooCommerce",
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
      items: "Free WordPress plugin for online stores.",
      link: "https://woocommerce.com",
    },
    {
      id: 6,
      title: "Weebly",
      img: "https://images.unsplash.com/photo-1581092580491-7c8a4e0d8f92",
      items: "Easy website builder with store features.",
      link: "https://www.weebly.com",
    },
    {
      id: 7,
      title: "Magento (Adobe Commerce)",
      img: "https://images.unsplash.com/photo-1532614338840-ab30cf10ed36",
      items: "Advanced eCommerce for enterprises.",
      link: "https://business.adobe.com/products/magento/magento-commerce.html",
    },
    {
      id: 8,
      title: "Zyro",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      items: "Affordable and fast store builder.",
      link: "https://zyro.com",
    },
    {
      id: 9,
      title: "Ecwid",
      img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
      items: "Add online store to any website easily.",
      link: "https://www.ecwid.com",
    },
  ];

  const handleCardClick = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div className="feed">
      <div className="banner">
        <h1>Explore Ecommerce Builders</h1>
        <p>Launch your online store easily with these powerful tools.</p>
      </div>

      <div className="feed-grid">
        {ecommerceTools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => handleCardClick(tool.link)}
            style={{ cursor: "pointer" }}
          >
            <SimpleCard title={tool.title} img={tool.img} items={tool.items} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EcommerceFeed;
