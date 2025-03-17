// components/LogoMarquee.jsx
"use client";

import React, { memo } from "react";

// Sample client logos - replace with your actual client logos
const clientLogos = [
  { id: 1, name: "Packman" },
  { id: 2, name: "The Flower Guys" },
  { id: 3, name: "Hairology" },
  { id: 4, name: "The Fabrique" },
  { id: 5, name: "4Matic Rentals" },
  { id: 6, name: "Wavesound Studio" },
  { id: 7, name: "Client 7" },
  { id: 8, name: "Client 8" },
];

// Memoized logo component
const Logo = memo(({ name }) => (
  <div className="flex items-center justify-center h-16 px-4 bg-zinc-900/50 rounded-xl backdrop-blur-sm border border-zinc-800">
    <span className="text-zinc-400 font-medium">{name}</span>
  </div>
));

// Using CSS animations instead of framer-motion for better performance
const LogoMarquee = () => {
  return (
    <div className="relative overflow-hidden py-6">
      {/* First Marquee - Left to Right */}
      <div className="flex items-center mb-8">
        <div className="animate-marquee flex items-center space-x-12 whitespace-nowrap">
          {clientLogos.map((client) => (
            <Logo key={client.id} name={client.name} />
          ))}
          {/* Add duplicates for seamless looping */}
          {clientLogos.map((client) => (
            <Logo key={`dup-${client.id}`} name={client.name} />
          ))}
        </div>
      </div>

      {/* Second Marquee - Right to Left (opposite direction) */}
      <div className="flex items-center">
        <div className="animate-marquee-reverse flex items-center space-x-12 whitespace-nowrap">
          {clientLogos
            .slice()
            .reverse()
            .map((client) => (
              <Logo key={`rev-${client.id}`} name={client.name} />
            ))}
          {/* Add duplicates for seamless looping */}
          {clientLogos
            .slice()
            .reverse()
            .map((client) => (
              <Logo key={`rev-dup-${client.id}`} name={client.name} />
            ))}
        </div>
      </div>

      {/* Gradient Overlay - Fade edges */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
        <div className="absolute left-0 w-24 h-full bg-gradient-to-r from-zinc-950 to-transparent"></div>
        <div className="absolute right-0 w-24 h-full bg-gradient-to-l from-zinc-950 to-transparent"></div>
      </div>
    </div>
  );
};

export default memo(LogoMarquee);
