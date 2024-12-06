import { useEffect, useRef } from "react";
import { useAnimation, useInView } from "framer-motion";

export default function useInViewAnimation(config = {}) {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, config);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView]);

  return { ref, controls };
}
