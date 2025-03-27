"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";

// Loading placeholders
const LoadingVideo = () => (
  <div className="w-full aspect-video bg-zinc-900 rounded-xl animate-pulse"></div>
);

const LoadingSection = () => (
  <div className="w-full h-96 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
  </div>
);

// Eagerly load critical above-the-fold component
import HeroSection from "./HeroSection";
import posthog from "posthog-js";

// Dynamically load below-the-fold components with code splitting
const AdsCarousel = dynamic(() => import("./AdsCarousel"), {
  loading: () => <LoadingVideo />,
  ssr: false, // Client-side only rendering for this heavy component
});

const PainPoints = dynamic(() => import("./PainPoints"), {
  loading: () => <LoadingSection />,
  ssr: true,
});

const Solutions = dynamic(() => import("./Solutions"), {
  loading: () => <LoadingSection />,
  ssr: true,
});

const LogoMarquee = dynamic(() => import("./LogoMarquee"), {
  loading: () => <LoadingSection />,
  ssr: true,
});

const Testimonials = dynamic(() => import("./Testimonials"), {
  loading: () => <LoadingSection />,
  ssr: true,
});

const SocialProof = dynamic(() => import("./SocialProof"), {
  loading: () => <LoadingSection />,
  ssr: true,
});

const FAQ = dynamic(() => import("./FAQ"), {
  loading: () => <LoadingSection />,
  ssr: true,
});

const CTASection = dynamic(() => import("./CTASection"), {
  loading: () => <LoadingSection />,
  ssr: true,
});

// Simplified motion component to avoid importing the full framer-motion library
const SimpleMotion = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export default function SystemPage() {
  const ctaRef = useRef(null);
  const solutionsRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onCtaClick = () => {
    // Track the CTA button click event
    posthog.capture("cta_home_button_clicked", {
      buttonText: "Book Your Free Consultation",
      location: location,
      path: window.location.pathname,
      url: window.location.href,
      referrer: document.referrer,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
    });

    scrollToSection(ctaRef);
  };

  return (
    <div className="bg-zinc-950 min-h-screen">
      <HeroSection onCtaClick={onCtaClick} />

      {/* Ads Carousel */}
      <section className="py-16 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <SimpleMotion className="text-center mb-10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
              Our Work
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Check out the high-quality videos we create for our clients
            </p>
          </SimpleMotion>

          <AdsCarousel />
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SimpleMotion className="text-center mb-10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
              Challenges Businesses Face
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Are you struggling with any of these marketing challenges?
            </p>
          </SimpleMotion>

          <PainPoints />
        </div>
      </section>

      {/* Solutions */}
      <section ref={solutionsRef} className="py-16 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <SimpleMotion className="text-center mb-10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
              Our Proven 4-Step Solution
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              A streamlined system that delivers qualified leads on autopilot
            </p>
          </SimpleMotion>

          <Solutions />
        </div>
      </section>

      {/* Logo Marquee */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SimpleMotion className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
              Trusted by Top Businesses
            </h2>
          </SimpleMotion>

          <LogoMarquee />
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-16 bg-zinc-900/30"> */}
      {/*   <div className="container mx-auto px-4"> */}
      {/*     <SimpleMotion className="text-center mb-10"> */}
      {/*       <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4"> */}
      {/*         What Our Clients Say */}
      {/*       </h2> */}
      {/*       <p className="text-xl text-zinc-400 max-w-2xl mx-auto"> */}
      {/*         Success stories from businesses just like yours */}
      {/*       </p> */}
      {/*     </SimpleMotion> */}
      {/*      */}
      {/*     <Testimonials /> */}
      {/*   </div> */}
      {/* </section> */}

      {/* Social Proof */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SocialProof />
        </div>
      </section>

      {/* Q&A */}
      <section className="py-16 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <SimpleMotion className="text-center mb-10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Everything you need to know about our marketing system
            </p>
          </SimpleMotion>

          <FAQ />
        </div>
      </section>

      {/* Final CTA */}
      <div id="book-call">
        <CTASection ref={ctaRef} />
      </div>
    </div>
  );
}
