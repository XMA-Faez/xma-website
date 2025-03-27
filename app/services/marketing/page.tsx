import React from "react";
import { Target, TrendingUp, Users, LineChart, Zap } from "lucide-react";
import CTAButton from "@/components/general/CTAButton";

const PerformanceMarketingPage = () => {
  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Strategic Ad Campaigns",
      description: "Targeted campaigns that deliver measurable results",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Multi-Platform Management",
      description: "Expertly managed campaigns across all major platforms",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Audience Targeting",
      description: "Precise audience segmentation and targeting",
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: "Performance Analytics",
      description: "Comprehensive tracking and optimization",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-0">
          <div className="w-full h-full bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center" />
        </div>
        <div className="relative z-20 text-center px-4">
          <h1 className="font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-6">
            Performance Marketing
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto">
            Drive results with data-driven marketing strategies
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Our Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-sm border border-zinc-800/60 rounded-lg p-6 hover:border-red-600/50 transition-colors"
              >
                <div className="text-red-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/40 backdrop-blur-sm border border-zinc-800/60 rounded-lg p-8 text-center">
              <div className="text-4xl font-bold text-red-500 mb-2">30K+</div>
              <div className="text-zinc-300">Leads Generated</div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm border border-zinc-800/60 rounded-lg p-8 text-center">
              <div className="text-4xl font-bold text-red-500 mb-2">3M+</div>
              <div className="text-zinc-300">Ad Budget Managed</div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm border border-zinc-800/60 rounded-lg p-8 text-center">
              <div className="text-4xl font-bold text-red-500 mb-2">50+</div>
              <div className="text-zinc-300">Active Clients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Section */}
      {/* <div className="py-20 bg-zinc-900/50"> */}
      {/*   <div className="max-w-6xl mx-auto px-4"> */}
      {/*     <h2 className="text-3xl font-bold text-center text-white mb-12"> */}
      {/*       Marketing Packages */}
      {/*     </h2> */}
      {/*     <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> */}
      {/*       {Object.entries(packages).map(([key, pkg], index) => ( */}
      {/*         <div */}
      {/*           key={index} */}
      {/*           className="bg-black/40 backdrop-blur-sm border border-zinc-800/60 rounded-lg p-6 hover:border-red-600/50 transition-colors" */}
      {/*         > */}
      {/*           <h3 className="text-xl font-semibold text-white mb-2"> */}
      {/*             {pkg.name} Package */}
      {/*           </h3> */}
      {/*           <div className="text-2xl font-bold text-red-500 mb-1"> */}
      {/*             {pkg.price} */}
      {/*           </div> */}
      {/*           <div className="text-sm text-zinc-400 mb-6">{pkg.usdPrice}</div> */}
      {/*           <ul className="space-y-3"> */}
      {/*             {pkg.features.map((feature, featureIndex) => ( */}
      {/*               <li */}
      {/*                 key={featureIndex} */}
      {/*                 className="flex items-center gap-2 text-zinc-300" */}
      {/*               > */}
      {/*                 <Zap className="w-4 h-4 text-red-500" /> */}
      {/*                 {feature} */}
      {/*               </li> */}
      {/*             ))} */}
      {/*           </ul> */}
      {/*         </div> */}
      {/*       ))} */}
      {/*     </div> */}
      {/*   </div> */}
      {/* </div> */}

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Boost Your Performance?
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Let's create a data-driven marketing strategy that delivers results
          </p>

          <CTAButton />
        </div>
      </div>
    </div>
  );
};

export default PerformanceMarketingPage;
