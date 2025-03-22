// components/LogoMarquee.jsx
"use client";
import React, { memo } from "react";
import Image from "next/image";

// Client logos with correct file paths, extensions, and specific styling requirements
const clientLogos = [
  { 
    id: 1, 
    name: "Packman", 
    image: "/logos/packman_Logo.png", 
    className: "h-12 bg-white rounded-xl"
  },
  { 
    id: 2, 
    name: "Casapons", 
    image: "/logos/Casapons.png", 
    className: "h-12 rounded-xl bg-white rounded-xl" 
  },
  { 
    id: 3, 
    name: "DXtreme", 
    image: "/logos/DXtreme.svg", 
    className: "h-12 rounded-xl bg-white rounded-xl p-2" 
  },
  { 
    id: 4, 
    name: "4Matic", 
    image: "/logos/4Matic.jpg", 
    className: "h-12 rounded-xl" 
  },
  { 
    id: 5, 
    name: "WYZ", 
    image: "/logos/wyz-logo.png", 
    className: "h-12 rounded-xl bg-white rounded-xl p-2" 
  },
  { 
    id: 6, 
    name: "Tick", 
    image: "/logos/Tick.webp", 
    className: "h-12 bg-white rounded-xl p-2" 
  },
  { 
    id: 7, 
    name: "ASUS", 
    image: "/logos/ASUS.png", 
    className: "h-12 w-full rounded-xl bg-white" 
  },
  { 
    id: 8, 
    name: "TFG", 
    image: "/logos/TFG.png", 
    className: "h-12 w-full rounded-xl bg-white" 
  },
];

// Memoized logo component with custom styling per logo
const Logo = memo(({ name, image, className }) => (
  <div className="flex items-center justify-center h-16 w-40 mx-1 p-2 transition duration-300">
    <Image 
      src={image} 
      alt={`${name} logo`} 
      width={120} 
      height={48} 
      className={className}
      style={{ objectFit: "contain" }}
    />
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
    <div className="relative overflow-hidden py-6">
      {/* First Marquee - Left to Right */}
      <div className="flex mb-8 overflow-hidden">
        <div style={marqueeStyles} className="flex whitespace-nowrap">
          {clientLogos.map((client) => (
            <Logo 
              key={client.id} 
              name={client.name} 
              image={client.image} 
              className={client.className} 
            />
          ))}
          {/* Add duplicates for seamless looping */}
          {clientLogos.map((client) => (
            <Logo 
              key={`dup-${client.id}`} 
              name={client.name} 
              image={client.image} 
              className={client.className} 
            />
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
