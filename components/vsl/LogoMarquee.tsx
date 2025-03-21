// components/LogoMarquee.jsx
"use client";
import React, { memo } from "react";
import Image from "next/image";

// Client logos with correct file paths and extensions
const clientLogos = [
  { id: 1, name: "4Matic", image: "/logos/4Matic.jpg" },
  { id: 2, name: "ASUS", image: "/logos/ASUS.png" },
  { id: 3, name: "Casapons", image: "/logos/Casapons.png" },
  { id: 4, name: "DXtreme", image: "/logos/DXtreme.svg" },
  { id: 5, name: "TFG", image: "/logos/TFG.png" },
  { id: 6, name: "Tick", image: "/logos/Tick.webp" },
  { id: 7, name: "WYZ", image: "/logos/wyz-logo.png" },
];

// Memoized logo component with image
const Logo = memo(({ name, image }) => (
  <div className="flex items-center justify-center w-40 mx-4 bg-white rounded-xl backdrop-blur-sm border border-zinc-200 p-3">
    <div className="w-full flex items-center justify-center">
      <Image 
        src={image} 
        alt={`${name} logo`} 
        width={120} 
        height={40} 
        className="h-8 h-full"
      />
    </div>
  </div>
));

// Animation styles 
const marqueeStyles = {
  animation: 'marquee 30s linear infinite',
};

const marqueeReverseStyles = {
  animation: 'marquee-reverse 30s linear infinite',
};

// Keyframes calculation based on logo width and count
const keyframes = `
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-48rem));
  }
}

@keyframes marquee-reverse {
  0% {
    transform: translateX(calc(-48rem));
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
    <div className="relative overflow-hidden py-6 bg-black">
      {/* First Marquee - Left to Right */}
      <div className="flex mb-8 overflow-hidden">
        <div style={marqueeStyles} className="flex whitespace-nowrap">
          {clientLogos.map((client) => (
            <Logo key={client.id} name={client.name} image={client.image} />
          ))}
          {/* Add duplicates for seamless looping */}
          {clientLogos.map((client) => (
            <Logo key={`dup-${client.id}`} name={client.name} image={client.image} />
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
              <Logo key={`rev-${client.id}`} name={client.name} image={client.image} />
            ))}
          {/* Add duplicates for seamless looping */}
          {clientLogos
            .slice()
            .reverse()
            .map((client) => (
              <Logo key={`rev-dup-${client.id}`} name={client.name} image={client.image} />
            ))}
        </div>
      </div>

      {/* Gradient Overlay - Fade edges */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 w-24 h-full bg-gradient-to-r from-black to-transparent"></div>
        <div className="absolute right-0 w-24 h-full bg-gradient-to-l from-black to-transparent"></div>
      </div>
    </div>
  );
};

export default memo(LogoMarquee);
