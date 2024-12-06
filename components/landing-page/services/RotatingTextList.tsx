"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./rotatingTextList.module.css";
import { useEffect, useRef, useState } from "react";
import TextComponent from "./TextComponent";

const RotatingTextList = () => {
  const [rotateXState, setRotateXState] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end center"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [270, 420]);

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
            <TextComponent
              scrollY={scrollYProgress}
              index={index}
              text={text}
              key={index}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RotatingTextList;
