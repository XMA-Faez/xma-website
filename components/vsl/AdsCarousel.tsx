// components/AdsCarousel.jsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// Sample data for the ad videos (9:16 aspect ratio)
const adVideos = [
  {
    public_id: "WYZ_Rent_-_Video_2_1__optimized_wugim2",
    title: "WYZ Rent Service Showcase 2",
    format: "mp4",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740671522/WYZ_Rent_-_Video_2_1__optimized_wugim2.mp4",
    created_at: "2025-02-27T15:52:02Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "WYZ_Rent_-_Video_1_1__optimized_rfedcs",
    title: "WYZ Rent Service Showcase 3",
    format: "mp4",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740669965/WYZ_Rent_-_Video_1_1__optimized_rfedcs.mp4",
    created_at: "2025-02-27T15:26:05Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "V03_Albert_C_New_Version_rn8slq",
    title: "Wave Sound Service Showcase",
    format: "mp4",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740669753/V03_Albert_C_New_Version_rn8slq.mp4",
    created_at: "2025-02-27T15:22:33Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "250217_V07_ENG_optimized_s0q2a6",
    title: "Beauty ELS Service Showcase",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740670763/250217_V07_ENG_optimized_s0q2a6.mov",
    created_at: "2025-02-27T15:39:23Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "250217_V06_OP2_optimized_vzjdjv",
    title: "The Fabrique Food",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740669977/250217_V06_OP2_optimized_vzjdjv.mov",
    created_at: "2025-02-27T15:26:17Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "250217_V04_ENG_optimized_eohxvl",
    title: "Hairology UGC",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740671568/250217_V04_ENG_optimized_eohxvl.mov",
    created_at: "2025-02-27T15:52:48Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "250203_Noon_x_FG_optimized_qxxa93",
    title: "TFG x Noon",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740670298/250203_Noon_x_FG_optimized_qxxa93.mov",
    created_at: "2025-02-27T15:31:38Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "250116_V06_Aziz_2__optimized_optimized_nfhwj3",
    title: "Packman Founders Story",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740670494/250116_V06_Aziz_2__optimized_optimized_nfhwj3.mov",
    created_at: "2025-02-27T15:34:54Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "250116_V04_1__optimized_xwrrb5",
    title: "Packman Service Showcase",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740670086/250116_V04_1__optimized_xwrrb5.mov",
    created_at: "2025-02-27T15:28:06Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "250113_V01_AR_optimized_gqdxl2",
    title: "Packman Service Showcase - Arabic",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740670161/250113_V01_AR_optimized_gqdxl2.mov",
    created_at: "2025-02-27T15:29:21Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "241220_V09_ASMR_optimized_snz1lh",
    title: "TFG ASMR",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740671539/241220_V09_ASMR_optimized_snz1lh.mov",
    created_at: "2025-02-27T15:52:19Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "241220_V03_teaching_romantic_1__optimized_qdo2hy",
    title: "TFG Teaching Romantic",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740670843/241220_V03_teaching_romantic_1__optimized_qdo2hy.mov",
    created_at: "2025-02-27T15:40:43Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "241220_V01_apology_1__optimized_guoxaz",
    title: "TFG Apology",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740670132/241220_V01_apology_1__optimized_guoxaz.mov",
    created_at: "2025-02-27T15:28:52Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "241218_V04_ENG_optimized_hceblq",
    title: "Aldhahab Alahmar Cinematic",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740670808/241218_V04_ENG_optimized_hceblq.mov",
    created_at: "2025-02-27T15:40:08Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "241217_V03_ENG_optimized_xpwoio",
    title: "Aldhahab Alahmar Process",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740670085/241217_V03_ENG_optimized_xpwoio.mov",
    created_at: "2025-02-27T15:28:05Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "241209_V12_optimized_optimized_t8jb9o",
    title: "TFG - Why not buy it",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740671349/241209_V12_optimized_optimized_t8jb9o.mov",
    created_at: "2025-02-27T15:49:09Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "241204_V03_UGC_Arabic_optimized_optimized_yqcqok",
    title: "4Matic G63 Showcase",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740671354/241204_V03_UGC_Arabic_optimized_optimized_yqcqok.mov",
    created_at: "2025-02-27T15:49:14Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "241118_V8_green_sc_optimized_dcrpon",
    title: "Nemari UGC",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740671202/241118_V8_green_sc_optimized_dcrpon.mov",
    created_at: "2025-02-27T15:46:42Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "241118_V3_optimized_ldaztz",
    title: "Nemari Product Showcase",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740670392/241118_V3_optimized_ldaztz.mov",
    created_at: "2025-02-27T15:33:12Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "241118_V12_op1_optimized_hziofy",
    title: "Nemari Product Showcase 2",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740671492/241118_V12_op1_optimized_hziofy.mov",
    created_at: "2025-02-27T15:51:32Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "241118_V04_op2_optimized_optimized_v4yadf",
    title: "Nemari Product Showcase 1",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740671665/241118_V04_op2_optimized_optimized_v4yadf.mov",
    created_at: "2025-02-27T15:54:25Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "241118_V01_Short_optimized_optimized_wnpegc",
    title: "Nemari Anniversary Gift",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740671547/241118_V01_Short_optimized_optimized_wnpegc.mov",
    created_at: "2025-02-27T15:52:27Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "241106_V9_two_person_skit_optimized_optimized_tgybpd",
    title: "Nemari Product Showcase 4",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740671291/241106_V9_two_person_skit_optimized_optimized_tgybpd.mov",
    created_at: "2025-02-27T15:48:11Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "241030_V07_Bently_1__optimized_uyxgny",
    title: "4Matic Bently",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740670000/241030_V07_Bently_1__optimized_uyxgny.mov",
    created_at: "2025-02-27T15:26:40Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "241030_V02_G63_vs_Maybakh_1__optimized_yhtuky",
    title: "4Matic Maybach",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740671504/241030_V02_G63_vs_Maybakh_1__optimized_yhtuky.mov",
    created_at: "2025-02-27T15:51:44Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "241015_V03_Product_Demonstration_optimized_pj2fet",
    title: "Rootfoot Product Showcase",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740671055/241015_V03_Product_Demonstration_optimized_pj2fet.mov",
    created_at: "2025-02-27T15:44:15Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "241009_V11_optimized_twdyt4",
    title: "White Lilac Before After",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740670150/241009_V11_optimized_twdyt4.mov",
    created_at: "2025-02-27T15:29:10Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "241004_V07_bag_optimized_j6xoqd",
    title: "White Lilac UGC",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740670098/241004_V07_bag_optimized_j6xoqd.mov",
    created_at: "2025-02-27T15:28:18Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "241003_V05_2__optimized_ja0rcy",
    title: "4Matic Product Showcase 2",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740671628/241003_V05_2__optimized_ja0rcy.mov",
    created_at: "2025-02-27T15:53:48Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "240926_V03_GTA_2__optimized_i0oy4b",
    title: "4Matic Product Showcase",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740671114/240926_V03_GTA_2__optimized_i0oy4b.mov",
    created_at: "2025-02-27T15:45:14Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "240924_V02_Arcade_2__optimized_sl9kr1",
    title: "Dream Drives Arcade 2",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740670168/240924_V02_Arcade_2__optimized_sl9kr1.mov",
    created_at: "2025-02-27T15:29:28Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id:
      "240918_V01_Single_Testimonial_tracked_optimized_optimized_vq3mdu",
    title: "Rootfoot Founders Story",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740670371/240918_V01_Single_Testimonial_tracked_optimized_optimized_vq3mdu.mov",
    created_at: "2025-02-27T15:32:51Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "240218_V08_1__optimized_lbft36",
    title: "WYZ Rent Service Showcase",
    format: "mov",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740671592/240218_V08_1__optimized_lbft36.mov",
    created_at: "2025-02-27T15:53:12Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "23113002_Tick_oldschool_38s_231205_optimized_xvxj0v",
    title: "Tick Oldschool",
    format: "mp4",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740671103/23113002_Tick_oldschool_38s_231205_optimized_xvxj0v.mp4",
    created_at: "2025-02-27T15:45:03Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "23113002_Tick_Loop_02_13s_231207_optimized_sjobal",
    title: "Tick Product Showcase",
    format: "mp4",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740670010/23113002_Tick_Loop_02_13s_231207_optimized_sjobal.mp4",
    created_at: "2025-02-27T15:26:50Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "23113002_Tick_Before_After_25s_231203_1__optimized_kbpkps",
    title: "Tick Before After",
    format: "mp4",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740670249/23113002_Tick_Before_After_25s_231203_1__optimized_kbpkps.mp4",
    created_at: "2025-02-27T15:30:49Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "2024-10-08_15.20.45_optimized_ouefwq",
    title: "Dream Drives Product Showcase 1",
    format: "mp4",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740670074/2024-10-08_15.20.45_optimized_ouefwq.mp4",
    created_at: "2025-02-27T15:27:54Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "001.2_-_The_Cooks_-_V1_optimized_optimized_fqfaur",
    title: "The Cooks Founders Story",
    format: "mp4",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740671337/001.2_-_The_Cooks_-_V1_optimized_optimized_fqfaur.mp4",
    created_at: "2025-02-27T15:48:57Z",
    width: 1080,
    height: 1920,
    tags: [],
    context: {},
  },
  {
    public_id: "001_Ad_-_Albert_C_-_V3_1_sge3ek",
    title: "Wave Sound Business Intro",
    format: "mp4",
    url: "https://res.cloudinary.com/dw1j7izud/video/upload/v1740669814/001_Ad_-_Albert_C_-_V3_1_sge3ek.mp4",
    created_at: "2025-02-27T15:23:34Z",
    width: 1080,
    height: 1920,
    tags: ["Service Based"],
    context: {},
  },
];
const AdsCarousel = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const thumbnailsContainerRef = useRef(null);

  // Handle play/pause for the current video
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current
          .play()
          .catch((e) => console.error("Video play error:", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentVideoIndex]);

  // Handle video ended event
  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  // Toggle play/pause state
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Change to next video
  const handleNext = () => {
    setIsPlaying(false);
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % adVideos.length);
    setTimeout(() => setIsPlaying(true), 100);
  };

  // Change to previous video
  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? adVideos.length - 1 : prevIndex - 1,
    );
    setTimeout(() => setIsPlaying(true), 100);
  };

  // Select a specific video by index
  const handleSelectVideo = (index) => {
    if (currentVideoIndex !== index) {
      setIsPlaying(false);
      setCurrentVideoIndex(index);
      setTimeout(() => setIsPlaying(true), 100);
    }
  };

  // Scroll thumbnails container
  const handleScroll = (direction) => {
    if (thumbnailsContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      thumbnailsContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative max-w-md mx-auto">
      {/* Main Video Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-zinc-800 aspect-[9/16] mb-4"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={adVideos[currentVideoIndex].url}
          playsInline
          loop
          onEnded={handleVideoEnded}
        />

        {/* Video Title */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <h3 className="text-white font-medium text-lg truncate bg-black/30 p-2 rounded">
            {adVideos[currentVideoIndex].title}
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
      </motion.div>

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
          {adVideos.map((video, index) => (
            <motion.div
              key={video.public_id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              viewport={{ once: true }}
              className={`flex-shrink-0 relative cursor-pointer rounded-lg overflow-hidden aspect-[9/16] w-16 border-2 transition-all ${
                index === currentVideoIndex
                  ? "border-red-500 shadow-lg shadow-red-500/20 w-20"
                  : "border-zinc-800 hover:border-zinc-600"
              }`}
              onClick={() => handleSelectVideo(index)}
            >
              {/* Thumbnail Image */}
              <div className="absolute inset-0 bg-black/30"></div>
              <video
                className="w-full h-full object-cover"
                src={video.url}
                muted
                playsInline
                preload="metadata"
              />

              {/* Selection Indicator */}
              {index === currentVideoIndex && (
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
            </motion.div>
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

export default AdsCarousel;
