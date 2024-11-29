import About from "@/components/landing-page/about-section/About";
import Hero from "@/components/landing-page/hero/Hero";
import Services from "@/components/landing-page/services/Services";
import Tile from "@/components/ui/Tile";

export default function Home() {
  return (
    <div className="relative w-full">
      <Hero />
      <About />
      <Services />
    </div>
  );
}
