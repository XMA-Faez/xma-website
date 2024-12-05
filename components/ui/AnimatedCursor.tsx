"use client";
import React from "react";
import AnimatedCursor from "react-animated-cursor";

function AnimatedCursorComponent() {
  return (
    <AnimatedCursor
      color="255, 255, 255"
      innerSize={8}
      outerSize={35}
      innerScale={1}
      outerScale={1.7}
      outerAlpha={1}
      outerStyle={{
        mixBlendMode: "exclusion",
      }}
      trailingSpeed={3}
    />
  );
}

export default AnimatedCursorComponent;
