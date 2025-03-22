// components/HeroSection.jsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  ShieldCheck,
  MessageSquare,
  ChevronRight,
  Volume2,
  VolumeX,
  RotateCcw,
  Maximize,
  MinusCircle,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = ({ onCtaClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef(null);

  // Auto-play on mount with muted audio (to comply with browser policies)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      
      // Promise-based play attempt for autoplay
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            console.log("playing")
          })
          .catch(error => {
            console.log("Autoplay prevented:", error);
          });
      }
    }
  }, []);

  // Handle time update to update progress bar
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateTime);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateTime);
    };
  }, []);
  
  // Track if this is the first play click
  const [isFirstPlay, setIsFirstPlay] = useState(true);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        // Just pause if already playing
        videoRef.current.pause();
      } else {
        // Reset to beginning ONLY on first play
        if (isFirstPlay) {
          videoRef.current.currentTime = 0;
          setIsFirstPlay(false);
        }
        
        // Unmute when clicking play
        videoRef.current.muted = false;
        setIsMuted(false);
        
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const increaseVolume = () => {
    const newVolume = Math.min(1, volume + 0.1);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const decreaseVolume = () => {
    const newVolume = Math.max(0, volume - 0.1);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
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
            Top businesses trust our 4-step system to grow consistently
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
              poster=""
              onEnded={() => setIsPlaying(false)}
              playsInline
            >
              <source src="https://res.cloudinary.com/dw1j7izud/video/upload/v1742200140/Amir_-_XMA_-_VSL_-_Draft_5_compressed_derxxx.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-4 px-4">
              {/* Progress bar */}
              <div className="mb-3 flex items-center gap-2">
                <span className="text-xs text-zinc-300">{formatTime(currentTime)}</span>
                <input
                  ref={progressBarRef}
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleProgressChange}
                  className="w-full h-1 bg-zinc-600 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #dc2626 ${(currentTime / (duration || 1)) * 100}%, #52525b ${(currentTime / (duration || 1)) * 100}%)`,
                  }}
                />
                <span className="text-xs text-zinc-300">{formatTime(duration)}</span>
              </div>

              {/* Control buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePlayPause}
                    className="bg-red-600 hover:bg-red-700 rounded-full p-3 transition"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  
                  <button
                    onClick={handleRestart}
                    className="text-zinc-300 hover:text-white p-2 transition"
                  >
                    <RotateCcw size={18} />
                  </button>
                  
                  <div className="relative">
                    <button
                      onClick={handleMuteToggle}
                      onMouseEnter={() => setShowVolumeControl(true)}
                      className="text-zinc-300 hover:text-white p-2 transition"
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    
                    {showVolumeControl && (
                      <div 
                        className="absolute bottom-full left-0 bg-zinc-800 p-3 rounded-lg mb-2 flex flex-col items-center gap-2 shadow-lg"
                        onMouseEnter={() => setShowVolumeControl(true)}
                        onMouseLeave={() => setShowVolumeControl(false)}
                      >
                        <button onClick={increaseVolume} className="text-zinc-300 hover:text-white">
                          <PlusCircle size={16} />
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-6 h-20 appearance-none cursor-pointer bg-zinc-700 rounded-full"
                          style={{
                            background: `linear-gradient(to top, #dc2626 ${volume * 100}%, #52525b ${volume * 100}%)`,
                            writingMode: "bt-lr",
                            WebkitAppearance: "slider-vertical"
                          }}
                        />
                        <button onClick={decreaseVolume} className="text-zinc-300 hover:text-white">
                          <MinusCircle size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleFullscreen}
                    className="text-zinc-300 hover:text-white p-2 transition"
                  >
                    <Maximize size={18} />
                  </button>
                </div>
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
