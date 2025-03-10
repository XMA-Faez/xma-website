// components/HeroSection.jsx
"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  ShieldCheck,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = ({ onCtaClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative pt-24 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/40 to-zinc-950 z-0"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-red-600/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-red-600/5 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4"
          >
            Generate Qualified Leads On Autopilot
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8"
          >
            Dubai's top businesses trust our 4-step system to grow consistently
            month after month
          </motion.p>
        </div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="relative aspect-video bg-zinc-900 rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="/video-poster.jpg"
              onEnded={() => setIsPlaying(false)}
            >
              <source src="/vsl-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePlayPause}
                  className="bg-red-600 hover:bg-red-700 rounded-full p-3 transition"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Money Back Guarantee & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2 text-lg text-zinc-300 mb-6">
            <ShieldCheck className="text-green-500" size={24} />
            <span>100% Money Back Guarantee</span>
          </div>

          <Button
            size="lg"
            onClick={onCtaClick}
            className="bg-red-600 hover:bg-red-700 text-white py-6 px-8 rounded-xl font-medium text-lg transition duration-300 inline-flex items-center gap-2"
          >
            <MessageSquare size={20} />
            Schedule a Free Strategy Call
            <ChevronRight size={20} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
