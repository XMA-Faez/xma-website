import About from "@/components/landing-page/about-section/About";
import Hero from "@/components/landing-page/hero/Hero";
import Products from "@/components/landing-page/products/Products";
import Services from "@/components/landing-page/services/Services";

export default function Home() {
  return (
    <div className="relative w-full">
      <Hero />
      <About />
      <Products />
      <Services />
    </div>
  );
}
