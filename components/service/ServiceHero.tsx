"use client";
import React from "react";
import { motion } from "framer-motion";

function ServiceHero({ title, description }) {
  return (
    <div className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent" />
      <div className="container pt-40 mx-auto px-4">
        <motion.h1
          className="text-5xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-xl text-zinc-300 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}

export default ServiceHero;
