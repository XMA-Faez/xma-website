// components/AdsCarousel.jsx
"use client";

import React, { useState, useRef, useCallback, useEffect, memo } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// Move data out of component to prevent re-creation on each render
// Only import a small subset of videos initially
const INITIAL_VIDEOS_COUNT = 6;

// Sample data for the ad videos (9:16 aspect ratio) - reduced set for initial load
const adVideos = [
  {
    id: 1,
    public_id: "WYZ_Rent_-_Video_2_1__optimized_wugim2",
    title: "WYZ Rent Service Showcase 2",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740671522/WYZ_Rent_-_Video_2_1__optimized_wugim2.mp4",
  },
  {
    id: 2,
    public_id: "WYZ_Rent_-_Video_1_1__optimized_rfedcs",
    title: "WYZ Rent Service Showcase 3",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740669965/WYZ_Rent_-_Video_1_1__optimized_rfedcs.mp4",
  },
  {
    id: 3,
    public_id: "V03_Albert_C_New_Version_rn8slq",
    title: "Wave Sound Service Showcase",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740669753/V03_Albert_C_New_Version_rn8slq.mp4",
  },
  {
    id: 4,
    public_id: "250217_V07_ENG_optimized_s0q2a6",
    title: "Beauty ELS Service Showcase",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740670763/250217_V07_ENG_optimized_s0q2a6.mov",
  },
  {
    id: 5,
    public_id: "250217_V06_OP2_optimized_vzjdjv",
    title: "The Fabrique Food",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740669977/250217_V06_OP2_optimized_vzjdjv.mov",
  },
  {
    id: 6,
    public_id: "250217_V04_ENG_optimized_eohxvl",
    title: "Hairology UGC",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740671568/250217_V04_ENG_optimized_eohxvl.mov",
  }
];

// This function will be used to load more videos when needed
const loadMoreVideos = () => {
  // In a real implementation, fetch the rest of the videos from an API
  // For now, we'll just return a promise that resolves in 500ms
  return new Promise(resolve => setTimeout(resolve, 500));
};

// Memoized thumbnail component to reduce rerenders
const VideoThumbnail = memo(({ video, isActive, isPlaying, onClick }) => (
  <div
    className={`flex-shrink-0 relative cursor-pointer rounded-lg overflow-hidden aspect-[9/16] w-16 border-2 transition-all ${
      isActive
        ? "border-red-500 shadow-lg shadow-red-500/20 w-20"
        : "border-zinc-800 hover:border-zinc-600"
    }`}
    onClick={onClick}
  >
    {/* Use poster image instead of video for thumbnails */}
    <div className="absolute inset-0 bg-black/30"></div>
    <div 
      className="w-full h-full bg-zinc-800"
      style={{
        backgroundImage: `url(${video.url.replace(/\.(mp4|mov)$/, '.jpg')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    ></div>

    {/* Selection Indicator */}
    {isActive && (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-red-500/50 rounded-full p-1">
          {isPlaying ? (
            <Pause size={12} className="text-white" />
          ) : (
            <Play size={12} className="text-white" />
          )}
        </div>
      </div>
    )}
  </div>
));

const AdsCarousel = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState(adVideos.slice(0, INITIAL_VIDEOS_COUNT));
  const [hasLoadedAll, setHasLoadedAll] = useState(false);
  const videoRef = useRef(null);
  const thumbnailsContainerRef = useRef(null);

  // Load more videos when user interacts with carousel
  const handleLoadMoreVideos = useCallback(async () => {
    if (hasLoadedAll) return;
    
    try {
      await loadMoreVideos();
      // In a real implementation, append new videos to loadedVideos
      setHasLoadedAll(true);
    } catch (error) {
      console.error("Error loading more videos:", error);
    }
  }, [hasLoadedAll]);

  // Handle play/pause for the current video - use useCallback to prevent recreating function
  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play()
        .catch(e => console.error("Video play error:", e));
    }
    
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Handle video ended event
  const handleVideoEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  // Change to next video
  const handleNext = useCallback(() => {
    setIsPlaying(false);
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % loadedVideos.length);
  }, [loadedVideos.length]);

  // Change to previous video
  const handlePrev = useCallback(() => {
    setIsPlaying(false);
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? loadedVideos.length - 1 : prevIndex - 1
    );
  }, [loadedVideos.length]);

  // Select a specific video by index
  const handleSelectVideo = useCallback((index) => {
    if (currentVideoIndex !== index) {
      setIsPlaying(false);
      setCurrentVideoIndex(index);
    }
  }, [currentVideoIndex]);

  // Scroll thumbnails container - debounced
  const handleScroll = useCallback((direction) => {
    if (thumbnailsContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      thumbnailsContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
    
    // Load more videos when user scrolls to the end
    if (direction === "right" && !hasLoadedAll) {
      handleLoadMoreVideos();
    }
  }, [hasLoadedAll, handleLoadMoreVideos]);

  // Use a single effect to manage video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Set up event listeners
    video.addEventListener('ended', handleVideoEnded);
    
    // Clean up function
    return () => {
      video.removeEventListener('ended', handleVideoEnded);
    };
  }, [handleVideoEnded]);

  // Set up intersection observer to lazy-load videos when component is visible
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasLoadedAll) {
          handleLoadMoreVideos();
        }
      });
    }, options);
    
    const carouselElement = thumbnailsContainerRef.current;
    if (carouselElement) {
      observer.observe(carouselElement);
    }
    
    return () => {
      if (carouselElement) {
        observer.unobserve(carouselElement);
      }
    };
  }, [hasLoadedAll, handleLoadMoreVideos]);

  return (
    <div className="relative max-w-md mx-auto">
      {/* Main Video Player */}
      <div className="relative bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-zinc-800 aspect-[9/16] mb-4">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={loadedVideos[currentVideoIndex].url}
          playsInline
          loop
          onEnded={handleVideoEnded}
          poster={loadedVideos[currentVideoIndex].url.replace(/\.(mp4|mov)$/, '.jpg')} // Use poster image
          preload="metadata" // Only preload metadata, not whole video
        />

        {/* Video Title */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <h3 className="text-white font-medium text-lg truncate bg-black/30 p-2 rounded">
            {loadedVideos[currentVideoIndex].title}
          </h3>
        </div>

        {/* Play/Pause Button Overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer z-20"
          onClick={handlePlayPause}
        >
          {!isPlaying && (
            <div className="bg-black/30 p-4 rounded-full">
              <Play className="text-white" size={32} />
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full z-30 hover:bg-black/70 transition-colors"
          onClick={handlePrev}
        >
          <ChevronLeft className="text-white" size={24} />
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full z-30 hover:bg-black/70 transition-colors"
          onClick={handleNext}
        >
          <ChevronRight className="text-white" size={24} />
        </button>
      </div>

      {/* Thumbnails Navigation */}
      <div className="relative">
        {/* Scroll Left Button */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-zinc-800 hover:bg-zinc-700 p-1 rounded-full z-10"
          aria-label="Scroll left"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Thumbnails Container */}
        <div
          ref={thumbnailsContainerRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-6 mx-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {loadedVideos.map((video, index) => (
            <VideoThumbnail
              key={video.id || video.public_id}
              video={video}
              isActive={index === currentVideoIndex}
              isPlaying={isPlaying}
              onClick={() => handleSelectVideo(index)}
            />
          ))}
          
          {/* Show loading state if not all videos are loaded */}
          {!hasLoadedAll && (
            <div className="flex-shrink-0 w-16 aspect-[9/16] bg-zinc-800 rounded-lg animate-pulse"></div>
          )}
        </div>

        {/* Scroll Right Button */}
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-zinc-800 hover:bg-zinc-700 p-1 rounded-full z-10"
          aria-label="Scroll right"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default memo(AdsCarousel);
