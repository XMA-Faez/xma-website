// components/BookingIframe.jsx
"use client";

import React, { useRef, useEffect } from "react";
import Script from "next/script";

const BookingIframe = ({ className = "" }) => {
  const iframeRef = useRef(null);
  const containerRef = useRef(null);

  // Handle iframe height adjustment after load
  const adjustIframeHeight = () => {
    if (iframeRef.current) {
      try {
        // Set a reasonable starting height
        iframeRef.current.style.height = '500px';
        
        // Try to adjust based on content when loaded
        iframeRef.current.onload = () => {
          try {
            const height = iframeRef.current.contentWindow.document.body.scrollHeight;
            if (height > 0) {
              iframeRef.current.style.height = `${height}px`;
            }
          } catch (error) {
            // Cross-origin restrictions may prevent accessing content
            console.log("Height adjustment failed, using default height");
          }
        };
      } catch (error) {
        console.log("Could not adjust iframe:", error);
      }
    }
  };

  return (
    <>
      {/* Load the external script with next/script for better performance */}
      <Script
        src="https://link.xmaboost.com/js/form_embed.js"
        strategy="lazyOnload"
        onLoad={() => console.log("Booking script loaded")}
      />
      
      <div ref={containerRef} className={`w-full ${className}`}>
        <iframe
          ref={iframeRef}
          src="https://link.xmaboost.com/widget/booking/Tj3i8x3FyT8sQOayn89T"
          style={{
            width: "100%",
            border: "none",
            minHeight: "450px", // Starting height before it adjusts
            height: "500px"
          }}
          id="a3mOsZixFuC2B0xuDyJz_1741602279253"
          title="XMA Booking System"
          loading="lazy" // Add lazy loading
          onLoad={adjustIframeHeight}
        />
      </div>
    </>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(BookingIframe);
