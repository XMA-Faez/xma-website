// components/BookingIframe.jsx
"use client";

import React, { useEffect, useRef } from "react";

const BookingIframe = ({ className = "" }) => {
  const iframeRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Add the external script
    const script = document.createElement("script");
    script.src = "https://link.xmaboost.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Clean up
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Function to adjust iframe height based on content
    const adjustIframeHeight = () => {
      if (iframeRef.current && containerRef.current) {
        try {
          // Wait for iframe to load
          iframeRef.current.onload = () => {
            // Try to get the height from the iframe content
            const height =
              iframeRef.current.contentWindow.document.body.scrollHeight;
            iframeRef.current.style.height = `${height}px`;
          };
        } catch (error) {
          console.log("Could not adjust iframe height:", error);
        }
      }
    };

    // Set initial height and add event listener
    adjustIframeHeight();
    window.addEventListener("resize", adjustIframeHeight);

    // Clean up
    return () => {
      window.removeEventListener("resize", adjustIframeHeight);
    };
  }, []);

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      <iframe
        ref={iframeRef}
        src="https://link.xmaboost.com/widget/booking/Tj3i8x3FyT8sQOayn89T"
        style={{
          width: "100%",
          border: "none",
          minHeight: "450px", // Starting height before it adjusts
        }}
        id="a3mOsZixFuC2B0xuDyJz_1741602279253"
        title="XMA Booking System"
      />
    </div>
  );
};

export default BookingIframe;
