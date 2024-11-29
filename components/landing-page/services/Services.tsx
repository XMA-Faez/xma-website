import { Section } from "@radix-ui/themes";
import React from "react";
import styles from "./services.module.css";

const cards = [
  {
    title: "Lead Generation",
    description:
      "We provide a subscription-based lead generation service that helps you grow your business.",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Campaign Management",
    description:
      "We help you manage your campaigns to ensure you get the best results.",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Message Marketing",
    description:
      "We provide message marketing services to help you reach your customers.",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "SMART Ads",
    description:
      "We provide SMART ads that help you get the best results for your ad budget.",
    image: "https://via.placeholder.com/150",
  },
];

function Services() {
  return (
    <Section
      className={`${styles.card_container} h-screen bg-opacity-40 container mx-auto grid grid-cols-3`}
    >
      {cards.map((card, index) => (
        <div key={card.title} className={`p-md border-zinc-800 hover:bg-black transition-colors border backdrop-blur-md ${styles[`card-${index + 1}`]}`}>
          <img src={card.image} alt={card.title} />
          <h2 className="text-xl">{card.title}</h2>
          <p className="text-base">{card.description}</p>
        </div>
      ))}
    </Section>
  );
}

export default Services;
