"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { MessageCircle, Brain, BarChart3, Workflow } from "lucide-react";

// Minimal data structure
const sections = [
  { id: "section1", title: "WhatsApp Integration", icon: <MessageCircle className="w-8 h-8" />, color: "emerald" },
  { id: "section2", title: "AI Chatbot", icon: <Brain className="w-8 h-8" />, color: "blue" },
  { id: "section3", title: "Sales Pipeline", icon: <BarChart3 className="w-8 h-8" />, color: "purple" },
  { id: "section4", title: "Automation", icon: <Workflow className="w-8 h-8" />, color: "amber" }
];

const MinimalStickyFeatures: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.1", "end 0.9"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const sectionIndex = Math.floor(progress * sections.length);
      setActiveSection(Math.min(sectionIndex, sections.length - 1));
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: "bg-emerald-500/20 border-emerald-500/30 text-emerald-400",
      blue: "bg-blue-500/20 border-blue-500/30 text-blue-400",
      purple: "bg-purple-500/20 border-purple-500/30 text-purple-400",
      amber: "bg-amber-500/20 border-amber-500/30 text-amber-400"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="relative bg-zinc-950 text-white" ref={containerRef}>
      
      {/* Header */}
      <div className="text-center py-24 px-4">
        <h2 className="text-5xl font-bold mb-6">
          Minimal Sticky Test
        </h2>
        <p className="text-xl text-zinc-400">
          Building up from basics
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left Scrolling Content */}
          <div className="space-y-32">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h3 className="text-4xl font-bold">
                    {section.title}
                  </h3>
                  <p className="text-xl text-zinc-400">
                    This is the description for {section.title}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="h-48 bg-zinc-800 p-6 rounded-xl">
                    <h4 className="text-xl font-semibold mb-4">Feature Details</h4>
                    <p className="text-zinc-400">
                      Detailed explanation of this feature and how it works...
                    </p>
                  </div>
                  
                  <div className="h-48 bg-zinc-800 p-6 rounded-xl">
                    <h4 className="text-xl font-semibold mb-4">Benefits</h4>
                    <p className="text-zinc-400">
                      Key benefits and advantages of using this feature...
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Sticky Content - TEST MULTIPLE APPROACHES */}
          
          {/* Approach 1: Basic sticky top */}
          <div className="hidden">
            <div className="sticky top-10 self-start bg-red-500 p-8 rounded">
              <h3 className="font-bold">Approach 1: Basic Sticky</h3>
              <p>Active: {sections[activeSection]?.title}</p>
            </div>
          </div>

          {/* Approach 2: Centered sticky - ACTIVE TEST */}
          <div className="sticky top-1/2 -translate-y-1/2 self-start">
            <div className={`p-8 rounded-3xl border backdrop-blur-xl ${getColorClasses(sections[activeSection]?.color || 'blue')}`}>
              <div className="text-center">
                {sections[activeSection]?.icon}
                <h3 className="text-2xl font-bold mt-4 mb-2">
                  {sections[activeSection]?.title}
                </h3>
                <p>Active Section: {activeSection + 1}</p>
                <div className="mt-4 p-4 bg-white/10 rounded">
                  Visual Demo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-32 px-4">
        <h3 className="text-3xl font-bold mb-4">
          End of Minimal Test
        </h3>
        <p className="text-zinc-400">
          Scroll back up to see if sticky worked
        </p>
      </div>
    </section>
  );
};

export default MinimalStickyFeatures;
