import Link from "next/link";
import React from "react";
import posthog from "posthog-js"; // Import PostHog

function CTAButton({ location = "unknown" }) {
  const handleClick = () => {
    // Track the CTA button click event
    posthog.capture("cta_button_clicked", {
      buttonText: "Book Your Free Consultation",
      location: location,
      path: window.location.pathname,
      url: window.location.href,
      referrer: document.referrer,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      // You can add any additional properties you want to track
    });
  };

  return (
    <Link href="/#cta">
      <button
        onClick={handleClick}
        className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
      >
        Book Your Free Consultation
      </button>
    </Link>
  );
}

export default CTAButton;
