"use client";
import React from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
  LazyMotion,
  domAnimation,
} from "motion/react";
import Link from "next/link";
import * as m from "motion/react-m";
import { optimizeCloudinaryVideoUrl, getOptimizedThumbnail } from "../../../utils/cloudinary";

// Global counter to limit concurrent video loads
let loadingVideos = 0;
const MAX_CONCURRENT_VIDEOS = 30;

export const HeroVideoParallax = ({
  videos,
}: {
  videos: {
    title?: string;
    url: string;
    thumbnail: string;
    public_id: string;
  }[];
}) => {
  const firstRow = videos.slice(0, 10);
  const secondRow = videos.slice(10, 20);
  const thirdRow = videos.slice(20, 30);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig,
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <LazyMotion features={domAnimation}>
      <m.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <m.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((video) => (
            <VideoCard
              video={video}
              translate={translateX}
              key={video.public_id}
            />
          ))}
        </m.div>
        <m.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((video) => (
            <VideoCard
              video={video}
              translate={translateXReverse}
              key={video.public_id}
            />
          ))}
        </m.div>
        <m.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((video) => (
            <VideoCard
              video={video}
              translate={translateX}
              key={video.public_id}
            />
          ))}
        </m.div>
      </m.div>
      </LazyMotion>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl z-10 relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl pointer-events-none md:text-6xl text-balance capitalize font-bold dark:text-white">
        Unlimited Growth with subscription-based lead generation
      </h1>
      <p className="max-w-2xl text-base pointer-events-none md:text-xl mt-8 mb-lg dark:text-neutral-200">
        From SMART ads and campaign management to message marketing, Lead Flow
        provides everything you need.
      </p>
      <Link href="" className="transition duration-300">
        <button className="button--calypso inline-block relative button !bg-blend-difference bg-fg px-8 py-3">
          <span className="mix-blend-difference">Book Discoery Call</span>
        </button>
      </Link>
    </div>
  );
};

export const VideoCard = ({
  video,
  translate,
}: {
  video: {
    title?: string;
    url: string;
    thumbnail: string;
    public_id: string;
  };
  translate: MotionValue<number>;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isInView, setIsInView] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(() => {});
        } else if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
        }
      },
      { 
        threshold: 0.3,
        rootMargin: '0px'
      }
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
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={video.public_id}
      className="group/video w-64 aspect-[9/16] relative flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="block group-hover/video:shadow-2xl w-full h-full">
        <video
          ref={videoRef}
          src={optimizeCloudinaryVideoUrl(video.url)}
          poster={getOptimizedThumbnail(video.url)}
          className="object-cover object-center absolute h-full w-full inset-0 rounded-lg"
          muted
          loop
          playsInline
          preload="none"
        />
      </div>
      {/* <div className="absolute inset-0 h-full w-full opacity-0 group-hover/video:opacity-80 bg-black transition-opacity pointer-events-none rounded-lg"></div> */}
      {/* <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/video:opacity-100 text-white"> */}
      {/*   {video.title || video.public_id} */}
      {/* </h2> */}
    </m.div>
  );
};
