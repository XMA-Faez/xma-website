"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MagnifyingGlass, ClipboardText, Lightning, TrendUp } from "phosphor-react";
import { ScanningButton } from "@/components/ui/ScanningButton";
import Link from "next/link";

const processSteps = [
  {
    id: 1,
    phase: "Discovery",
    title: "Understanding Your Vision",
    description: "We dive deep into your business goals, target audience, and unique challenges to create a tailored strategy.",
    duration: "1-2 weeks",
    activities: ["Stakeholder interviews", "Market research", "Competitor analysis", "Goal definition"],
    icon: MagnifyingGlass,
    iconColor: "text-emerald-400",
    badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    bulletColor: "bg-emerald-400",
    backgroundColor: "hover:bg-emerald-400/10",
    activeColors: {
      border: "border-emerald-500/50",
      shadow: "shadow-emerald-500/20",
      dot: "bg-emerald-500 border-emerald-400 shadow-lg shadow-emerald-500/50",
      background: "bg-gradient-to-r from-emerald-500/10 to-emerald-400/20"
    }
  },
  {
    id: 2,
    phase: "Strategy",
    title: "Crafting the Blueprint",
    description: "We develop a comprehensive roadmap that aligns with your objectives and sets clear success metrics.",
    duration: "1-2 weeks",
    activities: ["Strategic planning", "Technical architecture", "Resource allocation", "Timeline creation"],
    icon: ClipboardText,
    iconColor: "text-purple-400",
    badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    bulletColor: "bg-purple-400",
    backgroundColor: "hover:bg-purple-400/10",
    activeColors: {
      border: "border-purple-500/50",
      shadow: "shadow-purple-500/20",
      dot: "bg-purple-500 border-purple-400 shadow-lg shadow-purple-500/50",
      background: "bg-gradient-to-r from-purple-500/10 to-purple-400/20"
    }
  },
  {
    id: 3,
    phase: "Execution",
    title: "Bringing Ideas to Life",
    description: "Our expert team implements the strategy with precision, keeping you involved at every milestone.",
    duration: "4-8 weeks",
    activities: ["Design & development", "Regular check-ins", "Iterative improvements", "Quality assurance"],
    icon: Lightning,
    iconColor: "text-orange-400",
    badgeColor: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    bulletColor: "bg-orange-400",
    backgroundColor: "hover:bg-orange-400/10",
    activeColors: {
      border: "border-orange-500/50",
      shadow: "shadow-orange-500/20",
      dot: "bg-orange-500 border-orange-400 shadow-lg shadow-orange-500/50",
      background: "bg-gradient-to-r from-orange-500/10 to-orange-400/20"
    }
  },
  {
    id: 4,
    phase: "Results",
    title: "Measuring Success",
    description: "We deliver your project with comprehensive documentation and ongoing support to ensure lasting impact.",
    duration: "Ongoing",
    activities: ["Performance monitoring", "Optimization", "Training & handoff", "Continuous support"],
    icon: TrendUp,
    iconColor: "text-blue-400",
    badgeColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    bulletColor: "bg-blue-400",
    backgroundColor: "hover:bg-blue-400/10",
    activeColors: {
      border: "border-blue-500/50",
      shadow: "shadow-blue-500/20",
      dot: "bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/50",
      background: "bg-gradient-to-r from-blue-500/10 to-blue-400/20"
    }
  }
];

export default function Process() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen py-24 px-4 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            How We Work
          </h2>
          <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            A proven process that transforms your vision into reality with precision and creativity
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-gray-600 to-transparent hidden lg:block" />

          <div className="space-y-12 lg:space-y-0">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className="w-full lg:w-1/2 px-4">
                  <motion.div
                    onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                    className={`cursor-pointer relative p-8 rounded-3xl transition-all duration-300 ${step.backgroundColor} ${
                      activeStep === step.id
                        ? `glass-secondary shadow-lg ${step.activeColors.border} ${step.activeColors.shadow} ${step.activeColors.background}`
                        : "glass-primary hover:glass-secondary hover:electric-glow"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <step.icon className={`w-8 h-8 mb-2 ${step.iconColor}`} weight="duotone" />
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{step.phase}</h3>
                        <h4 className="text-lg text-slate-600 dark:text-gray-300">{step.title}</h4>
                      </div>
                      <span className={`text-sm glass-float px-4 py-2 rounded-2xl ${step.iconColor} font-semibold`}>
                        {step.duration}
                      </span>
                    </div>
                    
                    <p className="text-slate-700 dark:text-white/90 mb-4 drop-shadow-sm">{step.description}</p>
                    
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: activeStep === step.id ? "auto" : 0,
                        opacity: activeStep === step.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-white/10">
                        <h5 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Key Activities:</h5>
                        <ul className="space-y-2">
                          {step.activities.map((activity, i) => (
                            <li key={i} className="text-sm text-slate-700 dark:text-white/80 flex items-center rounded-xl p-2 hover:glass-secondary transition-all duration-300">
                              <span className={`w-2 h-2 ${step.bulletColor} rounded-full mr-3 electric-glow`} />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Timeline dot */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      activeStep === step.id
                        ? step.activeColors.dot
                        : "bg-zinc-800 border-zinc-600"
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-slate-600 dark:text-gray-400 mb-6">
            Ready to start your journey with us?
          </p>
          <Link href="#booking-widget" scroll={true}>
            <ScanningButton variant="primary" size="md">
              Get Started
            </ScanningButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
