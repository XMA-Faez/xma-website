import Button from "@/components/ui/Button";
import Image from "next/image";
import React from "react";
import Pricing from "./Pricing";
import FeatureList from "./FeatureList";
import Testimonials from "./Testimonials";

function Page() {
  return (
    <section>
      <div className="h-screen flex justify-center items-center">
        <div className="max-w-4xl text-center">
          <h1 className="mb-md text-7xl capitalize leading-[1.2]">
            Automate your business with XMA Boost
          </h1>
          <p className="mb-xl capitalize text-balance ">
            A powerful automation tool that helps you automate your business
            processes and workflows.
          </p>
          <Button>Get Started Now</Button>
        </div>
      </div>
      <div className="spacing mb-2xl text-center">
        <div className="mb-xl">
          <h2 className="mb-md">Everything You Need</h2>
          <p className="mb-md">
            XMA Boost is a powerful automation tool that helps you automate your
            business processes and workflows.
          </p>
          <Button>Watch Demo</Button>
        </div>

        <FeatureList />
      </div>
      <div>
        <h2 className="text-center mb-xl">What Our Clients Say</h2>
        <Testimonials />
      </div>
      <Pricing />
    </section>
  );
}

export default Page;
