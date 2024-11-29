import Tile from "@/components/ui/Tile";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative">
      <div className="max-w-4xl mx-auto h-screen text-center top-0 flex flex-col gap-5 items-center justify-center z-10 mb-10 font-poppins">
        <h1 className="text-4xl md:text-5xl/[1.3] max-w-4xl font-bold mb-lg">
          Unlimited Growth with subscription-based lead generation
        </h1>
        <p className="text-lg md:text-2xl mb-6 opacity-80 leading-10">
          From SMART ads and campaign management to message marketing, Lead Flow
          provides everything you need.
        </p>
        <Link
          href=""
          className="transition duration-300"
        >
          <button className="button--calypso inline-block relative button bg-fg px-8 py-3">
            <span>Book Discovery Call</span>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
