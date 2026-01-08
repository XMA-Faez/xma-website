"use client";

import React, { useRef } from "react";
import Script from "next/script";

interface BookingIframeProps {
  className?: string;
}

const BookingIframe: React.FC<BookingIframeProps> = ({ className = "" }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const adjustIframeHeight = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      iframe.style.height = '500px';
      
      iframe.onload = () => {
        try {
          const contentWindow = iframe.contentWindow;
          if (contentWindow) {
            const height = contentWindow.document.body.scrollHeight;
            if (height > 0) {
              iframe.style.height = `${height}px`;
            }
          }
        } catch {
          console.log("Height adjustment failed, using default height");
        }
      };
    } catch {
      console.log("Could not adjust iframe");
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
