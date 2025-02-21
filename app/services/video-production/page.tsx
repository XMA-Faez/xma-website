import React from "react";
import { Edit, CheckCircle, Users, Film, Target, Play } from "lucide-react";
import Link from "next/link";

const VideoProductionPage = () => {
  const features = [
    {
      icon: <Film className="w-6 h-6" />,
      title: "48 Professional Ads",
      description: "High-quality video ads tailored for your business",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "28 Videos with Variants",
      description: "Multiple versions optimized for different platforms",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Team",
      description: "Professional videographers and editors",
    },
    {
      icon: <Edit className="w-6 h-6" />,
      title: "Custom Graphics",
      description: "20 custom graphics to enhance your videos",
    },
  ];

  const process = [
    {
      title: "Week 1: Kickoff",
      description: "Content strategy discussion and timeline confirmation",
      items: [
        "Company & brand deep-dive",
        "Content strategy discussion",
        "Timeline confirmation",
        "Required materials checklist",
      ],
    },
    {
      title: "Week 1-2: Content Strategy",
      description: "Video concepts and production planning",
      items: [
        "Video concepts presentation",
        "Hook variations discussion",
        "Shot list review",
        "Filming schedule confirmation",
      ],
    },
    {
      title: "Week 2-3: Production",
      description: "Video shooting and initial editing",
      items: [
        "Professional filming",
        "First draft review",
        "Feedback collection",
        "Hook variations approval",
      ],
    },
    {
      title: "Week 4: Launch",
      description: "Final approval and campaign preparation",
      items: [
        "Final video approval",
        "Campaign settings review",
        "Launch timeline confirmation",
        "Success metrics setup",
      ],
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
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-6">
            Video Production
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto">
            Transform your brand with stunning videos that captivate and convert
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Premium Features
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

      {/* Process Section */}
      {/* <div className="py-20"> */}
      {/*   <div className="max-w-6xl mx-auto px-4"> */}
      {/*     <h2 className="text-3xl font-bold text-center text-white mb-12"> */}
      {/*       Our Process */}
      {/*     </h2> */}
      {/*     <div className="space-y-8"> */}
      {/*       {process.map((step, index) => ( */}
      {/*         <div */}
      {/*           key={index} */}
      {/*           className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800/60" */}
      {/*         > */}
      {/*           <div className="flex items-start gap-4"> */}
      {/*             <div className="bg-red-500/10 rounded-full p-2"> */}
      {/*               <Play className="w-6 h-6 text-red-500" /> */}
      {/*             </div> */}
      {/*             <div> */}
      {/*               <h3 className="text-xl font-semibold text-white mb-2"> */}
      {/*                 {step.title} */}
      {/*               </h3> */}
      {/*               <p className="text-zinc-400 mb-4">{step.description}</p> */}
      {/*               <ul className="grid grid-cols-1 md:grid-cols-2 gap-2"> */}
      {/*                 {step.items.map((item, itemIndex) => ( */}
      {/*                   <li */}
      {/*                     key={itemIndex} */}
      {/*                     className="flex items-center gap-2 text-zinc-300" */}
      {/*                   > */}
      {/*                     <CheckCircle className="w-4 h-4 text-red-500" /> */}
      {/*                     {item} */}
      {/*                   </li> */}
      {/*                 ))} */}
      {/*               </ul> */}
      {/*             </div> */}
      {/*           </div> */}
      {/*         </div> */}
      {/*       ))} */}
      {/*     </div> */}
      {/*   </div> */}
      {/* </div> */}

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Let's create stunning videos that tell your story and drive results
          </p>
          <Link href="/proposal">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Start Your Project
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoProductionPage;
