import { WavyBackground } from "@/components/ui/WavyBackground";
import { GlassShimmerButton } from "@/components/ui/GlassShimmerButton";
import React from "react";

function CTA() {
  return (
    <WavyBackground backgroundFill="#080808" className="max-w-4xl flex flex-col items-center mx-auto">
      <div className="glass-hero rounded-3xl p-8 md:p-12 backdrop-blur-3xl text-center">
        <p className="text-2xl md:text-4xl mb-md lg:text-7xl text-slate-900 dark:text-white font-bold inter-var drop-shadow-lg">
          Ready to get started?
        </p>
        <p className="text-base md:text-xl mt-4 text-slate-700 dark:text-white/90 mb-lg font-normal inter-var drop-shadow-sm">
          We can help you grow your business. Get in touch with us.
        </p>
        <GlassShimmerButton variant="secondary" size="lg">
          Book a Demo
        </GlassShimmerButton>
      </div>
    </WavyBackground>
  );
}

export default CTA;
