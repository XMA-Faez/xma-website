"use client";
import React from "react";
import { LazyMotion, domAnimation, AnimatePresence } from "motion/react";
import Link from "next/link";
import * as m from "motion/react-m";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  optimizeCloudinaryVideoUrl,
  getOptimizedThumbnail,
} from "@/utils/cloudinary";
import { ScanningButton } from "@/components/ui/ScanningButton";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-velocity";

interface Video {
  title?: string;
  url: string;
  thumbnail: string;
  public_id: string;
}

export const HeroVideoParallax = ({
  videos,
}: {
  videos: Video[];
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const rowSize = Math.ceil(videos.length / 3);
  const firstRow = videos.slice(0, rowSize);
  const secondRow = videos.slice(rowSize, rowSize * 2);
  const thirdRow = videos.slice(rowSize * 2);
  const allVideos = [...firstRow, ...secondRow, ...thirdRow];

  const openVideo = (publicId: string) => {
    const idx = allVideos.findIndex((v) => v.public_id === publicId);
    if (idx !== -1) setSelectedIndex(idx);
  };

  const closeVideo = () => setSelectedIndex(null);

  const goNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % allVideos.length);
  };

  const goPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + allVideos.length) % allVideos.length);
  };

  React.useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVideo();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <div className="relative min-h-svh flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 flex flex-col justify-end pb-8 md:pb-12">
        <LazyMotion features={domAnimation}>
          <ScrollVelocityContainer>
            <ScrollVelocityRow baseVelocity={1} direction={-1} className="mb-4 md:mb-6">
              {firstRow.map((video) => (
                <VideoCard video={video} key={video.public_id} onClick={() => openVideo(video.public_id)} />
              ))}
            </ScrollVelocityRow>
            <ScrollVelocityRow baseVelocity={1} direction={1} className="mb-4 md:mb-6">
              {secondRow.map((video) => (
                <VideoCard video={video} key={video.public_id} onClick={() => openVideo(video.public_id)} />
              ))}
            </ScrollVelocityRow>
            <ScrollVelocityRow baseVelocity={1} direction={-1}>
              {thirdRow.map((video) => (
                <VideoCard video={video} key={video.public_id} onClick={() => openVideo(video.public_id)} />
              ))}
            </ScrollVelocityRow>
          </ScrollVelocityContainer>
        </LazyMotion>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <VideoLightbox
            video={allVideos[selectedIndex]}
            onClose={closeVideo}
            onNext={goNext}
            onPrev={goPrev}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

function VideoLightbox({
  video,
  onClose,
  onNext,
  onPrev,
}: {
  video: Video;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      <m.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-[80vw] max-w-sm aspect-[9/16] rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          key={video.public_id}
          src={optimizeCloudinaryVideoUrl(video.url)}
          poster={getOptimizedThumbnail(video.url)}
          className="absolute inset-0 w-full h-full object-cover rounded-2xl"
          autoPlay
          loop
          playsInline
          controls
        />
      </m.div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center text-white hover:bg-zinc-700/80 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center text-white hover:bg-zinc-700/80 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center text-white hover:bg-zinc-700/80 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </m.div>
  );
}

export const Header = () => {
  return (
    <div className="max-w-7xl z-10 relative mx-auto pt-24 md:pt-32 pb-8 md:pb-12 px-4 w-full">
      <h1 className="max-w-2xl text-3xl md:text-6xl text-balance font-bold text-white drop-shadow-lg">
        Growth Systems Built to{" "}
        <span className="heading-gradient">Scale Revenue</span>
      </h1>
      <p className="max-w-xl text-base md:text-lg mt-6 text-white/80 drop-shadow-sm">
        Marketing, sales, and conversion systems that generate leads and grow
        revenue predictably.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <Link href="/apply" className="inline-block">
          <ScanningButton variant="primary" size="md" color="white">
            Book a Call
          </ScanningButton>
        </Link>
        <Link href="#solutions" className="inline-block">
          <ScanningButton variant="outline" size="md" color="neutral">
            Explore Solutions
          </ScanningButton>
        </Link>
      </div>
    </div>
  );
};

export const VideoCard = ({
  video,
  onClick,
}: {
  video: Video;
  onClick: () => void;
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(() => {});
        } else if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px",
      },
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <m.div
      whileHover={{
        y: -20,
      }}
      onClick={onClick}
      className="group/video w-36 md:w-52 aspect-[9/16] relative flex-shrink-0 mx-2 md:mx-4 cursor-pointer"
    >
      <div className="block w-full h-full rounded-2xl overflow-hidden">
        <video
          ref={videoRef}
          src={optimizeCloudinaryVideoUrl(video.url)}
          poster={getOptimizedThumbnail(video.url)}
          className="object-cover object-center absolute h-full w-full inset-0 rounded-2xl"
          muted
          loop
          playsInline
          preload="none"
        />
      </div>
    </m.div>
  );
};
