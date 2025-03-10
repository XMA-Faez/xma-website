// /app/vsl/page.js
import React from "react";
import VSLPage from "@/components/vsl/VSLPage";

export const metadata = {
  title: "XMA Agency - Generate Qualified Leads On Autopilot",
  description:
    "Dubai's top businesses trust our 4-step system to grow consistently month after month. Learn how our proven lead flow system can guarantee qualified leads without you lifting a finger.",
  openGraph: {
    title: "XMA Agency - Generate Qualified Leads On Autopilot",
    description:
      "Dubai's top businesses trust our 4-step system to grow consistently month after month",
    images: ["/og-image.jpg"], // Create this image for social sharing
  },
};

export default function VSL() {
  return <VSLPage />;
}
