// components/AdsCarousel.jsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Sample data for the ad videos (9:16 aspect ratio)
const adVideos = [
  { id: 1, url: "https://res.cloudinary.com/dkgprmys0/video/upload/v1706615625/Portalz/9-16/PORTALZ_BTP_S04_v1.0_Dancehall_INSTA_h6hbku.mp4", title: "Dancehall" },
  { id: 2, url: "https://res.cloudinary.com/dkgprmys0/video/upload/v1706615626/Portalz/9-16/PORTALZ_TravelAgent_v1.0_INSTA_kluqhs.mp4", title: "Travel Agent" },
  { id: 3, url: "https://res.cloudinary.com/dkgprmys0/video/upload/v1706615623/Portalz/9-16/PORTALZ_BTP_S04_v1.0_Mens_Grooming_INSTA_jgcqna.mp4", title: "Men's Grooming" },
  { id: 4, url: "https://res.cloudinary.com/dkgprmys0/video/upload/v1706615619/Portalz/9-16/PORTALZ_BTP_S03_v1.0_Oud_Player_INSTA_c67zq0.mp4", title: "Oud Player" },
  { id: 5, url: "https://res.cloudinary.com/dkgprmys0/video/upload/v1706615619/Portalz/9-16/PORTALZ_BTP_S03_v1.0_Italian_Chef_INSTA_vfswcz.mp4", title: "Italian Chef" },
  { id: 6, url: "https://res.cloudinary.com/dkgprmys0/video/upload/v1706615619/Portalz/9-16/PORTALZ_BTP_S03_v1.0_Hiker_INSTA_o4ueyo.mp4", title: "Hiker" },
  { id: 7, url: "https://res.cloudinary.com/dkgprmys0/video/upload/v1706615617/Portalz/9-16/PORTALZ_BTP_S03_v1.0_Floral_Designer_INSTA_gptjby.mp4", title: "Floral Designer" },
  { id: 8, url: "https://res.cloudinary.com/dkgprmys0/video/upload/v1706615616/Portalz/9-16/PORTALZ_BTP_S03_v1.0_Equestrian_INSTA_oxl0mb.mp4", title: "Equestrian" },
  { id: 9, url: "https://res.cloudinary.com/dkgprmys0/video/upload/v1706615611/Portalz/9-16/PORTALZ_BTP_S02_v1.0_Gamer_INSTA_t7dxcn.mp4", title: "Gamer" },
  { id: 10, url: "https://res.cloudinary.com/dkgprmys0/video/upload/v1706615611/Portalz/9-16/PORTALZ_BTP_S01_v1.0_Musician_INSTA_iknryc.mp4", title: "Musician" }
];

const AdsCarousel = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const videoRefs = useRef([]);
  const containerRef = useRef(null);

  // Initialize video refs
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, adVideos.length);
  }, []);

  // Auto-play the current video and pause others
  useEffect(() => {
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef) {
        if (index === currentVideoIndex && isPlaying) {
          videoRef.play().catch(e => console.error("Video play error:", e));
        } else {
          videoRef.pause();
          videoRef.currentTime = 0;
        }
      }
    });
  }, [currentVideoIndex, isPlaying]);

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  const handlePlayPause = (index) => {
    if (currentVideoIndex !== index) {
      setCurrentVideoIndex(index);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % adVideos.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentVideoIndex((prevIndex) => 
      prevIndex === 0 ? adVideos.length - 1 : prevIndex - 1
    );
    setIsPlaying(true);
  };

  const handleThumbnailHover = (index) => {
    setHoveredVideo(index);
  };

  const handleThumbnailLeave = () => {
    setHoveredVideo(null);
  };

  const handleScroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      {/* Main Video Display */}
      <div className="mb-8 max-w-xs mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-zinc-800 aspect-[9/16]"
        >
          {adVideos.map((video, index) => (
            <div 
              key={video.id}
              className={`absolute inset-0 transition-opacity duration-300 ${
                index === currentVideoIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <video
                ref={el => videoRefs.current[index] = el}
                className="w-full h-full object-cover"
                src={video.url}
                playsInline
                loop
                onEnded={handleVideoEnded}
                onClick={() => handlePlayPause(index)}
              />
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <h3 className="text-white font-medium text-lg truncate">{video.title}</h3>
              </div>
            </div>
          ))}
          
          {/* Play/Pause overlay */}
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer z-20"
            onClick={() => handlePlayPause(currentVideoIndex)}
          >
            <div className={`transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
              <div className="bg-black/30 p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full z-30"
            onClick={handlePrev}
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full z-30"
            onClick={handleNext}
          >
            <ChevronRight className="text-white" size={24} />
          </button>
        </motion.div>
      </div>
      
      {/* Thumbnails row */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center justify-center mb-6"
        >
          <button 
            onClick={() => handleScroll('left')}
            className="hidden md:flex bg-zinc-800 hover:bg-zinc-700 p-2 rounded-full mr-2"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div 
            ref={containerRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide max-w-full pb-4 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {adVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`flex-shrink-0 relative cursor-pointer rounded-lg overflow-hidden aspect-[9/16] w-24 border-2 ${
                  index === currentVideoIndex 
                    ? 'border-red-500 shadow-lg shadow-red-500/20' 
                    : 'border-zinc-800'
                }`}
                onClick={() => {
                  setCurrentVideoIndex(index);
                  setIsPlaying(true);
                }}
                onMouseEnter={() => handleThumbnailHover(index)}
                onMouseLeave={handleThumbnailLeave}
              >
                <div className="absolute inset-0 bg-black/30"></div>
                <video
                  className="w-full h-full object-cover"
                  src={video.url}
                  muted
                  playsInline
                  loop
                  autoPlay={hoveredVideo === index}
                  onMouseEnter={e => {
                    if (e.target.paused) e.target.play().catch(err => console.log(err));
                  }}
                  onMouseLeave={e => {
                    e.target.pause();
                    e.target.currentTime = 0;
                  }}
                />
              </motion.div>
            ))}
          </div>
          
          <button 
            onClick={() => handleScroll('right')}
            className="hidden md:flex bg-zinc-800 hover:bg-zinc-700 p-2 rounded-full ml-2"
          >
            <ChevronRight size={20} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AdsCarousel;
