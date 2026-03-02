import React from "react";
import styles from "./glassEffectWrap.module.css";

function GlassEffectWrap() {
  return (
    <div className={styles.glassEffectWrap}>
      <div
        className={`${styles.glassEffect} ${styles.bottom} ${styles.home}`}
      ></div>
      <div
        className={`${styles.glassEffect} ${styles.top} ${styles.home}`}
      ></div>
    </div>
  );
}

export default GlassEffectWrap;
