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

// Memoized logo component with fixed width to ensure consistent spacing
const Logo = memo(({ name }) => (
  <div className="flex items-center justify-center h-16 w-40 mx-4 bg-zinc-900/50 rounded-xl backdrop-blur-sm border border-zinc-800">
    <span className="text-zinc-400 font-medium text-center px-2 truncate">{name}</span>
  </div>
));

// Animation styles 
const marqueeStyles = {
  animation: 'marquee 30s linear infinite',
};

const marqueeReverseStyles = {
  animation: 'marquee-reverse 30s linear infinite',
};

// Keyframes styles to add to global CSS 
const keyframes = `
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-48px * ${clientLogos.length} * 2));
  }
}

@keyframes marquee-reverse {
  0% {
    transform: translateX(calc(-48px * ${clientLogos.length} * 2));
  }
  100% {
    transform: translateX(0);
  }
}
`;

const LogoMarquee = () => {
  // Add keyframes to document
  React.useEffect(() => {
    // Check if keyframes already exist
    if (!document.getElementById('marquee-keyframes')) {
      const style = document.createElement('style');
      style.id = 'marquee-keyframes';
      style.innerHTML = keyframes;
      document.head.appendChild(style);
    }
    
    return () => {
      // Cleanup on unmount
      const style = document.getElementById('marquee-keyframes');
      if (style) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden py-6">
      {/* First Marquee - Left to Right */}
      <div className="flex mb-8 overflow-hidden">
        <div style={marqueeStyles} className="flex whitespace-nowrap">
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
      <div className="flex overflow-hidden">
        <div style={marqueeReverseStyles} className="flex whitespace-nowrap">
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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 w-24 h-full bg-gradient-to-r from-zinc-950 to-transparent"></div>
        <div className="absolute right-0 w-24 h-full bg-gradient-to-l from-zinc-950 to-transparent"></div>
      </div>
    </div>
  );
};

export default memo(LogoMarquee);
