"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import { usePortfolioItems } from "@/app/(website)/portfolio/_hooks/usePortfolio";
import type { CloudinaryVideo } from "@/sanity/lib/types";

type GalleryItem = {
  src: string;
  videoUrl?: string;
  title: string;
  isVideo: boolean;
};

const PhotoGallerySkiper = () => {
  const { items, isLoading } = usePortfolioItems();

  const galleryItems: GalleryItem[] = useMemo(() => {
    if (isLoading || items.length === 0) {
      return [];
    }

    return items
      .filter((item): item is CloudinaryVideo => item.type === "video")
      .slice(0, 12)
      .map((item) => ({
        src: item.thumbnailUrl,
        videoUrl: item.url,
        title: item.title,
        isVideo: true,
      }));
  }, [items, isLoading]);

  if (isLoading) {
    return (
      <div className="w-full h-[175vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (galleryItems.length === 0) {
    return null;
  }

  return <GalleryContent items={galleryItems} />;
};

const GalleryContent = ({ items }: { items: GalleryItem[] }) => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height, width } = dimension;

  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  const x = useTransform(scrollYProgress, [0, 1], [0, width * 0.5]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, width * 0.8]);
  const x3 = useTransform(scrollYProgress, [0, 1], [0, width * 0.3]);
  const x4 = useTransform(scrollYProgress, [0, 1], [0, width * 0.6]);

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const distributeItems = (galleryItems: GalleryItem[], columns: number): GalleryItem[][] => {
    const result: GalleryItem[][] = Array.from({ length: columns }, () => []);
    galleryItems.forEach((item, index) => {
      result[index % columns].push(item);
    });
    return result;
  };

  const mobileColumns = distributeItems(items, 3);
  const desktopColumns = distributeItems(items, 4);

  return (
    <main className="w-full relative">
      <div className="absolute inset-0 pointer-events-none z-10 [box-shadow:inset_0_10px_8px_rgba(0,0,0,.2),_inset_0_-10px_8px_rgba(0,0,0,.2)] md:[box-shadow:inset_0_10px_10px_30px_rgba(0,0,0,.15),_inset_0_-10px_10px_30px_rgba(0,0,0,.15)]" />
      <div
        ref={gallery}
        className={`relative box-border flex overflow-hidden ${
          isMobile
            ? "h-auto flex-col gap-0 p-0"
            : "h-[175vh] flex-row gap-[2vw] p-[2vw]"
        }`}
      >
        {isMobile ? (
          <>
            <Column items={mobileColumns[0]} y={y} x={x} isMobile={isMobile} />
            <Column items={mobileColumns[1]} y={y2} x={x2} isMobile={isMobile} />
            <Column items={mobileColumns[2]} y={y3} x={x3} isMobile={isMobile} />
          </>
        ) : (
          <>
            <Column items={desktopColumns[0]} y={y} x={x} isMobile={isMobile} />
            <Column items={desktopColumns[1]} y={y2} x={x2} isMobile={isMobile} />
            <Column items={desktopColumns[2]} y={y3} x={x3} isMobile={isMobile} />
            <Column items={desktopColumns[3]} y={y4} x={x4} isMobile={isMobile} />
          </>
        )}
      </div>
    </main>
  );
};

type ColumnProps = {
  items: GalleryItem[];
  y: MotionValue<number>;
  x: MotionValue<number>;
  isMobile: boolean;
};

const Column = ({ items, y, x, isMobile }: ColumnProps) => {
  return (
    <motion.div
      className={
        isMobile
          ? "relative -left-[45%] flex h-[250px] w-full flex-row gap-4 first:left-[-45%] [&:nth-child(2)]:left-[-80%] [&:nth-child(3)]:left-[-30%]"
          : "relative -top-[45%] flex h-full w-1/4 min-w-[250px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]"
      }
      style={isMobile ? { x } : { y }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={`group relative overflow-hidden ${
            isMobile ? "h-full w-[250px] min-w-[250px]" : "h-full w-full"
          }`}
        >
          <video
            src={item.videoUrl}
            poster={item.src}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none h-full w-full object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
};

export { PhotoGallerySkiper };
