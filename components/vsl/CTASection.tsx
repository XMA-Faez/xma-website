// components/CTASection.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import BookingIframe from "./BookingIframe";

const CTASection = ({ id }) => {
  return (
    <section id={id} className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-8 border border-zinc-800 text-center relative overflow-hidden"
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/10 rounded-full filter blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-zinc-300 mb-4 max-w-2xl mx-auto">
                Schedule a free strategy call and learn how our 4-step system
                can work for you.
              </p>

              <div className="flex items-center justify-center gap-2 text-lg text-zinc-300 mb-6">
                <ShieldCheck className="text-green-500" size={24} />
                <span>100% Money Back Guarantee</span>
              </div>

              <Card className="mx-auto bg-zinc-800/50 border-zinc-700">
                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6 text-red-500 mr-2" />
                    <h3 className="text-2xl font-bold">
                      Book Your Strategy Call
                    </h3>
                  </div>
                  <BookingIframe className="mt-4" />
                </div>
              </Card>

              <p className="text-zinc-500 mt-6 text-sm max-w-xl mx-auto">
                By booking a call, you'll speak with one of our lead generation
                specialists who will analyze your business needs and explain
                exactly how our system can help you grow.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
