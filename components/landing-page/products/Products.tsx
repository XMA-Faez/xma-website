"use client";

import { motion } from "framer-motion";
import React from "react";
import { ScanningButton } from "@/components/ui/ScanningButton";
import Link from "next/link";

const products = [
  {
    title: "XMA CRM System",
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
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="max-w-7xl mx-auto rounded-3xl p-8 md:p-12 backdrop-blur-3xl">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
              Our Products
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-sm">
              Cutting-edge solutions designed to accelerate your business growth
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative p-12 glass-primary rounded-3xl hover:glass-secondary hover:electric-glow group"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-white">
                    {product.title}
                  </h3>
                  <div className={`w-12 h-0.5 bg-gradient-to-r ${product.accentColor}`}></div>
                </div>
                {product.badge && (
                  <span className={`px-4 py-2 text-xs font-semibold rounded-2xl glass-float ${
                    product.badge === 'Popular' ? 'text-blue-400' :
                    product.badge === 'Premium' ? 'text-purple-400' :
                    'text-emerald-400'
                  }`}>
                    {product.badge}
                  </span>
                )}
              </div>
              
              <p className="text-white/90 mb-8 leading-relaxed text-lg drop-shadow-sm">
                {product.description}
              </p>

              <div className="space-y-4">
                {product.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-white/80 rounded-xl hover:glass-secondary ">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-4 electric-glow"></div>
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

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
          <Link href="/book">
            <ScanningButton variant="primary" size="md">
              Explore Our Solutions
            </ScanningButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Products;
