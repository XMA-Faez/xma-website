import Link from "next/link";
import React from "react";

function CTAButton() {
  return (
    <Link href="/#cta">
      <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
        Book Your Free Consultation
      </button>
    </Link>
  );
}

export default CTAButton;
