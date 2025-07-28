"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendUp, Users, Target, Trophy } from "phosphor-react";
import { ScanningButton } from "@/components/ui/ScanningButton";

const stats = [
  {
    IconComponent: TrendUp,
    value: "$1M+",
    label: "Ad Budget Managed",
    color: "text-blue-400"
  },
  {
    IconComponent: Users,
    value: "30K+",
    label: "Leads Generated",
    color: "text-emerald-400"
  },
  {
    IconComponent: Target,
    value: "95%",
    label: "Client Retention Rate",
    color: "text-purple-400"
  },
  {
    IconComponent: Trophy,
    value: "50+",
    label: "Success Stories",
    color: "text-orange-400"
  }
];

function About() {
  return (
    <section className="relative min-h-screen py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
      
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl/[1.3] font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Why Choose XMA?
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-3xl md:text-4xl leading-relaxed text-white mb-8">
              We noticed a critical gap in digital marketing: businesses struggle to achieve <span className="text-blue-400 font-semibold">high-impact, results-driven</span> growth that actually moves the needle.
            </p>
            
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              While others focus on vanity metrics, we obsess over what matters most: qualified leads, conversion rates, and sustainable growth that transforms your business.
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              <span className="text-sm text-gray-500 uppercase tracking-wide">
                Trusted by Industry Leaders
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="p-6 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl text-center group hover:border-zinc-700 transition-all duration-300"
              >
                <stat.IconComponent className={`w-8 h-8 ${stat.color} mx-auto mb-3`} weight="duotone" />
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Transform Your Growth?
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join the businesses that have already discovered the XMA difference. 
            Let's turn your marketing spend into measurable revenue.
          </p>
          <ScanningButton variant="primary" size="md">
            Start Your Growth Journey
          </ScanningButton>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
