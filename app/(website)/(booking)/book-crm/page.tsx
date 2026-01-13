"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, ChartBar, Lightning, Target } from "phosphor-react";

export default function BookCRMPage() {
  React.useEffect(() => {
    // Load the form embed script
    const script = document.createElement('script');
    script.src = 'https://link.xmaboost.com/js/form_embed.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen w-full relative bg-white dark:bg-black">
      {/* Background gradients - Emerald theme */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.15), transparent 70%), rgb(255, 255, 255)",
        }}
      />
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.25), transparent 70%), #000000",
        }}
      />

      {/* Header Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-full mb-6">
              <Lightning weight="duotone" className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-zinc-300">
                Transform Your Business with XMA CRM
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Book Your CRM Demo
            </h1>
            <p className="text-xl text-slate-600 dark:text-zinc-300 max-w-2xl mx-auto mb-8">
              See how our all-in-one CRM platform can revolutionize your business operations, automate your workflows, and drive unprecedented growth.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-gray-400 mb-12">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>30-minute demo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span>Custom walkthrough</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Implementation plan</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Widget Section */}
      <section className="relative pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-emerald-50/30 dark:bg-zinc-900/50 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/30 rounded-2xl p-8"
          >
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Schedule Your Personalized CRM Demo
              </h3>
              <p className="text-slate-600 dark:text-zinc-300">
                Choose a time that works best for you and we'll show you exactly how XMA CRM can transform your business
              </p>
            </div>

            {/* Calendly iframe */}
            <div className="w-full" style={{ minHeight: "700px" }}>
              <iframe
                src="https://link.xmaboost.com/widget/booking/6tKzTJcZxVa9HYvP9lKY"
                style={{ width: "100%", height: "700px", border: "none", overflow: "hidden" }}
                scrolling="no"
                id="6tKzTJcZxVa9HYvP9lKY_1754932347225"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What You'll Discover Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              What You'll Discover
            </h2>
            <p className="text-slate-600 dark:text-zinc-300">
              Here's what we'll cover during your personalized CRM demo
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "Lead Management",
                description: "See how to capture, nurture, and convert leads automatically with our intelligent workflows.",
                icon: Users,
                color: "text-emerald-400",
              },
              {
                title: "Sales Pipeline",
                description: "Visualize and optimize your entire sales process with our intuitive pipeline management tools.",
                icon: ChartBar,
                color: "text-teal-400",
              },
              {
                title: "Marketing Automation",
                description: "Discover how to automate your email campaigns, SMS, and social media engagement.",
                icon: Lightning,
                color: "text-green-400",
              },
              {
                title: "ROI Calculator",
                description: "Get a personalized projection of your potential return on investment with XMA CRM.",
                icon: Target,
                color: "text-emerald-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="text-center p-6 bg-emerald-50/30 dark:bg-emerald-900/10 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/30 rounded-xl hover:scale-105 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="mb-4 flex justify-center">
                  <item.icon 
                    weight="duotone" 
                    className={`w-12 h-12 ${item.color}`}
                  />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-zinc-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
