import React from "react";
import styles from "./rotatingTextList.module.css";
import { motion, useTransform } from "framer-motion";

function TextComponent({ index, text, scrollY }) {
  const totalItems = 5;
  const start = index / totalItems;
  const end = (index + 1) / totalItems;

  const highlightOpacity = useTransform(
    scrollY,
    [start, (start + end) / 2, end],
    [0.2, 1, 0.2],
  );

  return (
    <motion.div
      key={index}
      className={`${styles[`servicesText${index + 1}`]} text-[7vh] leading-3`}
      style={{
        opacity: highlightOpacity,
      }}
    >
      {text}
    </motion.div>
  );
}

export default TextComponent;
