import { HeroVideoParallax } from "./HeroVideoParallax";
import adCarouselData from "@/data/adCarousel";

const Hero = () => {
  return (
    <section className="dark:bg-zinc-950 transition-colors duration-300">
      <HeroVideoParallax videos={adCarouselData} />
    </section>
  );
};

export default Hero;
