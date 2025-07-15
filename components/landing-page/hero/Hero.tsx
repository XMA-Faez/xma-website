import Link from "next/link";
import { HeroVideoParallax } from "./HeroVideoParallax";
import adCarouselData from "@/data/adCarousel";

const Hero = () => {
  return (
    <section>
      <HeroVideoParallax videos={adCarouselData} />
    </section>
  );
};

export default Hero;
