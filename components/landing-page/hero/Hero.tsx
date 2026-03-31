import { HeroVideoParallax } from "./HeroVideoParallax";
import adCarouselData from "@/data/adCarousel";

const Hero = () => {
  return (
    <section className="relative bg-black overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 50% 100% at 10% 0%, rgba(226, 232, 240, 0.15), transparent 65%), #000000",
        }}
      />
      <div className="relative z-10">
        <HeroVideoParallax videos={adCarouselData} />
      </div>
    </section>
  );
};

export default Hero;
