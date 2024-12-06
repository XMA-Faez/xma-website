"use client"; // For Framer Motion compatibility in Next.js 13

import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./rotatingText.module.css"; // Include your CSS file
import { useEffect, useRef, useState } from "react";

const RotatingText = () => {
  const [rotateXState, setRotateXState] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Dynamic rotation value for the wheel
  const rotateX = useTransform(scrollYProgress, [0, 1], [230, 450]); // Adjust range as needed

  // Highlighting logic for center text
  const totalItems = 5; // Total number of text items
  const highlightOpacity = Array.from({ length: totalItems }, (_, index) => {
    const start = index / totalItems;
    const end = (index + 1) / totalItems;

    return useTransform(
      scrollYProgress,
      [start, (start + end) / 2, end],
      [0.2, 1, 0.2],
    );
  });

  useEffect(() => {
    rotateX.on("change", (v) => {
      setRotateXState(v);
    });
  }, [rotateX]);

  return (
    <div className={styles.servicesStickyWrapper} ref={containerRef}>
      <div className={styles.servicesSticky}>
        <motion.div
          className={styles.servicesWrap}
          style={{
            willChange: "transform",
            transform: `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(${rotateXState}deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {[
            "UI Design",
            "Developing",
            "UX Design",
            "Copywriting",
            "Marketing",
          ].map((text, index) => (
            <motion.div
              key={index}
              className={`${ styles[`servicesText${index + 1}`] } text-[7vh] leading-3`}
              style={{
                opacity: highlightOpacity[index], 
              }}
            >
              {text}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RotatingText;
