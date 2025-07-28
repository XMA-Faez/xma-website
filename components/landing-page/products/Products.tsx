"use client";

import { motion } from "framer-motion";
import React from "react";

const products = [
  {
    title: "Lead Generation",
    description: "AI-powered lead generation that identifies and captures high-quality prospects for your business with precision targeting.",
    features: ["Smart targeting", "Real-time analytics", "CRM integration"],
    accentColor: "from-blue-400 to-cyan-300",
    glowColor: "shadow-blue-500/20",
    borderColor: "border-blue-400/30"
  },
  {
    title: "Campaign Management",
    description: "End-to-end campaign orchestration with automated optimization and performance tracking across all channels.",
    features: ["Multi-channel campaigns", "A/B testing", "ROI optimization"],
    accentColor: "from-emerald-400 to-green-300",
    glowColor: "shadow-emerald-500/20",
    borderColor: "border-emerald-400/30"
  },
  {
    title: "Message Marketing",
    description: "Personalized messaging at scale with advanced segmentation and behavioral triggers for maximum engagement.",
    features: ["Personalization", "Automation", "Behavioral triggers"],
    accentColor: "from-purple-400 to-violet-300",
    glowColor: "shadow-purple-500/20",
    borderColor: "border-purple-400/30"
  },
  {
    title: "SMART Ads",
    description: "Intelligent ad optimization using machine learning to maximize your ad spend efficiency and conversion rates.",
    features: ["ML optimization", "Budget allocation", "Performance insights"],
    accentColor: "from-orange-400 to-red-300",
    glowColor: "shadow-orange-500/20",
    borderColor: "border-orange-400/30"
  },
];

function Products() {
  return (
    <section className="relative min-h-screen py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
      
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Our Products
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Cutting-edge solutions designed to accelerate your business growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 border border-zinc-800 rounded-3xl overflow-hidden">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-12 bg-zinc-900/30 backdrop-blur-sm hover:${product.glowColor} hover:${product.borderColor} ${
                index === 0 ? 'border-r border-b border-zinc-800' : 
                index === 1 ? 'border-b border-zinc-800' :
                index === 2 ? 'border-r border-zinc-800' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-white">
                    {product.title}
                  </h3>
                  <div className={`w-12 h-0.5 bg-gradient-to-r ${product.accentColor}`}></div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                {product.description}
              </p>

              <div className="space-y-3">
                {product.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-gray-400">
                    <div className="w-1 h-1 bg-gray-600 rounded-full mr-3"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-400 mb-6">
            Ready to transform your business?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl"
          >
            Explore Our Solutions
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default Products;
