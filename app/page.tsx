import About from "@/components/landing-page/about-section/About";
import CTA from "@/components/landing-page/cta/CTA";
import Hero from "@/components/landing-page/hero/Hero";
import Products from "@/components/landing-page/products/Products";
import Services from "@/components/landing-page/services/Services";
import Process from "@/components/landing-page/process/Process";
import FAQ from "@/components/landing-page/faq/FAQ";
import AdsCarousel from "@/components/vsl/AdsCarousel";

export default function Home() {
  return (
    <div className="relative w-full">
      <Hero />
      <About />
      <Products />
      {/* <Services /> */}
      <Process />
      <FAQ />
    </div>
  );
}
