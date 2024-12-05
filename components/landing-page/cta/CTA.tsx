import { WavyBackground } from "@/components/ui/WavyBackground";
import React from "react";

function CTA() {
  return (
    <WavyBackground backgroundFill="#080808" className="max-w-4xl flex flex-col items-center mx-auto">
      <p className="text-2xl md:text-4xl mb-md lg:text-7xl text-white font-bold inter-var text-center">
        Ready to get started?
      </p>
      <p className="text-base md:text-xl mt-4 text-white mb-lg font-normal inter-var text-center">
        We can help you grow your business. Get in touch with us.
      </p>
      <button className="button--calypso inline-block relative button bg-fg px-8 text-bg py-3">
        <span>Book a Demo</span>
      </button>
    </WavyBackground>
  );
}

export default CTA;
