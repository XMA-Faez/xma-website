"use client";

import React, { useState, useRef, useCallback, useEffect, memo } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react";
import adCarouselData from "@/data/adCarousel";

type Video = {
  url: string;
  title: string;
};

type VideoThumbnailProps = {
  video: Video;
  isActive: boolean;
  isPlaying: boolean;
  onClick: () => void;
}

// Memoized thumbnail component to reduce rerenders
const VideoThumbnail = memo(({ video, isActive, isPlaying, onClick }: VideoThumbnailProps) => (
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
        backgroundImage: `url(${video.url.replace(/\.(mp4|mov)$/, ".jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
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

VideoThumbnail.displayName = 'VideoThumbnail';

const AdsCarousel = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted by default for better UX
  const videoRef = useRef<HTMLVideoElement>(null);
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);

  // Handle play/pause for the current video
  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current
        .play()
        .catch((e) => console.error("Video play error:", e));
    }

    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Handle mute/unmute
  const handleToggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering play/pause
    if (!videoRef.current) return;
    
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  // Handle video ended event
  const handleVideoEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  // Change to next video with autoplay
  const handleNext = useCallback(() => {
    setCurrentVideoIndex(
      (prevIndex) => (prevIndex + 1) % adCarouselData.length
    );
  }, []);

  // Change to previous video with autoplay
  const handlePrev = useCallback(() => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? adCarouselData.length - 1 : prevIndex - 1
    );
  }, []);

  // Select a specific video by index
  const handleSelectVideo = useCallback(
    (index: number) => {
      if (currentVideoIndex !== index) {
        setCurrentVideoIndex(index);
      }
    },
    [currentVideoIndex],
  );

  // Scroll thumbnails container
  const handleScroll = useCallback((direction: "left" | "right") => {
    if (thumbnailsContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      thumbnailsContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  // Effect to handle video changes and autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Set up video properties
    video.muted = isMuted;
    
    // Start playing the video automatically when index changes
    video.play()
      .then(() => setIsPlaying(true))
      .catch(error => {
        console.error("Autoplay failed:", error);
        setIsPlaying(false);
      });
    
    // Set up event listeners
    video.addEventListener("ended", handleVideoEnded);

    // Clean up function
    return () => {
      video.removeEventListener("ended", handleVideoEnded);
    };
  }, [currentVideoIndex, handleVideoEnded, isMuted]);

  return (
    <div className="relative max-w-md mx-auto">
      {/* Main Video Player */}
      <div className="relative bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-zinc-800 aspect-[9/16] mb-4">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={adCarouselData[currentVideoIndex].url}
          playsInline
          loop
          muted={isMuted}
          onEnded={handleVideoEnded}
          poster={adCarouselData[currentVideoIndex].url.replace(
            /\.(mp4|mov)$/,
            ".jpg",
          )}
          preload="metadata"
        />

        {/* Video Title */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <h3 className="text-white font-medium text-lg truncate bg-black/30 p-2 rounded">
            {adCarouselData[currentVideoIndex].title}
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

        {/* Audio Control Button */}
        <button
          className="absolute top-4 right-4 z-30 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
          onClick={handleToggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="text-white" size={20} />
          ) : (
            <Volume2 className="text-white" size={20} />
          )}
        </button>

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
          {adCarouselData.map((video, index) => (
            <VideoThumbnail
              key={video.public_id || index}
              video={video}
              isActive={index === currentVideoIndex}
              isPlaying={isPlaying}
              onClick={() => handleSelectVideo(index)}
            />
          ))}
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
