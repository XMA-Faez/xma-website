// components/LogoMarquee.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";

// Sample client logos - replace with your actual client logos
const clientLogos = [
  { id: 1, name: "Packman", logo: "/packman_Logo.jpg" },
  { id: 2, name: "The Flower Guys", logo: "/flowerguys_logo.jpg" },
  { id: 3, name: "Hairology", logo: "/hairology_logo.jpg" },
  { id: 4, name: "The Fabrique", logo: "/fabrique_logo.jpg" },
  { id: 5, name: "4Matic Rentals", logo: "/4matic_logo.jpg" },
  { id: 6, name: "Wavesound Studio", logo: "/wavesound_logo.jpg" },
  { id: 7, name: "Client 7", logo: "/client7_logo.jpg" },
  { id: 8, name: "Client 8", logo: "/client8_logo.jpg" },
];

const LogoMarquee = () => {
  return (
    <div className="relative overflow-hidden py-6">
      {/* First Marquee - Left to Right */}
      <div className="flex items-center">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          }}
          className="flex items-center space-x-12 whitespace-nowrap"
        >
          {clientLogos.map((client) => (
            <React.Fragment key={client.id}>
              <div className="flex items-center justify-center h-16 px-4 bg-zinc-900/50 rounded-xl backdrop-blur-sm border border-zinc-800">
                {/* If you have actual logos */}
                {/* <img src={client.logo} alt={client.name} className="h-10 w-auto" /> */}

                {/* If you don't have logos yet, use the name */}
                <span className="text-zinc-400 font-medium">{client.name}</span>
              </div>
            </React.Fragment>
          ))}
        </motion.div>

        {/* Duplicate for seamless looping */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          }}
          className="flex items-center space-x-12 whitespace-nowrap"
        >
          {clientLogos.map((client) => (
            <React.Fragment key={`dup-${client.id}`}>
              <div className="flex items-center justify-center h-16 px-4 bg-zinc-900/50 rounded-xl backdrop-blur-sm border border-zinc-800">
                {/* If you have actual logos */}
                {/* <img src={client.logo} alt={client.name} className="h-10 w-auto" /> */}

                {/* If you don't have logos yet, use the name */}
                <span className="text-zinc-400 font-medium">{client.name}</span>
              </div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Second Marquee - Right to Left (opposite direction) */}
      <div className="flex items-center mt-8">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          }}
          className="flex items-center space-x-12 whitespace-nowrap"
        >
          {clientLogos
            .slice()
            .reverse()
            .map((client) => (
              <React.Fragment key={`rev-${client.id}`}>
                <div className="flex items-center justify-center h-16 px-4 bg-zinc-900/50 rounded-xl backdrop-blur-sm border border-zinc-800">
                  {/* If you have actual logos */}
                  {/* <img src={client.logo} alt={client.name} className="h-10 w-auto" /> */}

                  {/* If you don't have logos yet, use the name */}
                  <span className="text-zinc-400 font-medium">
                    {client.name}
                  </span>
                </div>
              </React.Fragment>
            ))}
        </motion.div>

        {/* Duplicate for seamless looping */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          }}
          className="flex items-center space-x-12 whitespace-nowrap"
        >
          {clientLogos
            .slice()
            .reverse()
            .map((client) => (
              <React.Fragment key={`rev-dup-${client.id}`}>
                <div className="flex items-center justify-center h-16 px-4 bg-zinc-900/50 rounded-xl backdrop-blur-sm border border-zinc-800">
                  {/* If you have actual logos */}
                  {/* <img src={client.logo} alt={client.name} className="h-10 w-auto" /> */}

                  {/* If you don't have logos yet, use the name */}
                  <span className="text-zinc-400 font-medium">
                    {client.name}
                  </span>
                </div>
              </React.Fragment>
            ))}
        </motion.div>
      </div>

      {/* Gradient Overlay - Fade edges */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
        <div className="absolute left-0 w-24 h-full bg-gradient-to-r from-zinc-950 to-transparent"></div>
        <div className="absolute right-0 w-24 h-full bg-gradient-to-l from-zinc-950 to-transparent"></div>
      </div>
    </div>
  );
};

export default LogoMarquee;
