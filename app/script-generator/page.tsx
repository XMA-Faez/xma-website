import AdScriptForm from "@/components/script-automation/AdScriptForm";
import AdsCarousel from "@/components/vsl/AdsCarousel";
import CTASection from "@/components/vsl/CTASection";
export const metadata = {
  title: "Video Ad Script Generator",
  description: "Generate professional video ad scripts",
};

export default function Home() {
  return (
    <div className="min-h-screen py-12 pt-32">
      <AdScriptForm />
      <section className="py-16 mt-xl bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
              Our Work
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Check out the high-quality videos we create for our clients using our script automation tool.
            </p>
          </div>

          <AdsCarousel />
        </div>
      </section>
      <CTASection />
    </div>
  );
}
