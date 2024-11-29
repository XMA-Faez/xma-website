"use client";
import React from "react";
import { motion } from "framer-motion";

function Tile() {
  return (
    <motion.div
      className="aspect-square bg-neutral-900 border-neutral-900 "
      whileHover={{
        zIndex: 1,
        backgroundColor: "#7c3aed",
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    />
  );
}

export default Tile;
