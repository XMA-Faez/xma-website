"use client";

import { motion } from "framer-motion";
import React from "react";
import { ScanningButton } from "@/components/ui/ScanningButton";

const products = [
  {
    title: "CRM System",
    description: "Complete customer relationship management system with unlimited users and contacts, designed to streamline your sales process.",
    features: ["Unlimited Users & Contacts", "Lead Management System", "Automated Workflows", "Reporting & Analytics"],
    accentColor: "from-emerald-400 to-green-300",
    glowColor: "shadow-emerald-500/20",
    borderColor: "border-emerald-400/30",
    badge: "Annual"
  },
  {
    title: "Lead Generator",
    description: "Complete lead generation package with professional ads, CRM setup, and campaign management to get you started.",
    features: ["20 Professional Ads (10 Static + 10 Video)", "CRM System Setup", "Ad Campaign Setup", "1 Month Management"],
    accentColor: "from-blue-400 to-indigo-400",
    glowColor: "shadow-blue-500/20",
    borderColor: "border-blue-400/30",
    badge: "Popular"
  }
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative p-12 bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-white">
                    {product.title}
                  </h3>
                  <div className={`w-12 h-0.5 bg-gradient-to-r ${product.accentColor}`}></div>
                </div>
                {product.badge && (
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    product.badge === 'Popular' ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30' :
                    product.badge === 'Premium' ? 'bg-purple-500/20 text-purple-400 border border-purple-400/30' :
                    'bg-emerald-500/20 text-emerald-400 border border-emerald-400/30'
                  }`}>
                    {product.badge}
                  </span>
                )}
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
          <ScanningButton variant="primary" size="md">
            Explore Our Solutions
          </ScanningButton>
        </motion.div>
      </div>
    </section>
  );
}

export default Products;
