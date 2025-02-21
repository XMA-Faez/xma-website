"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent" />
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-5xl pt-40 font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-6 leading-[1.2]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About XMA Agency
          </motion.h1>
          <motion.p
            className="text-xl text-zinc-300 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Dubai's premier digital marketing agency, specializing in video
            production, performance marketing, and innovative CRM solutions.
          </motion.p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "50+", label: "Satisfied Clients" },
            { number: "15+", label: "Team Members" },
            { number: "3M+", label: "Ad Budget Managed" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm hover:border-red-600/50 transition duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-zinc-400">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-zinc-300 mb-4">
              At XMA Agency, we're committed to transforming businesses through
              innovative digital solutions. Our approach combines creativity
              with data-driven strategies to deliver exceptional results.
            </p>
            <p className="text-zinc-300">
              We believe in building lasting partnerships with our clients,
              understanding their unique needs, and delivering solutions that
              drive real business growth.
            </p>
          </motion.div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Innovation",
                  desc: "Pushing boundaries in digital marketing",
                },
                {
                  title: "Excellence",
                  desc: "Delivering outstanding results consistently",
                },
                {
                  title: "Partnership",
                  desc: "Building strong, lasting client relationships",
                },
                {
                  title: "Integrity",
                  desc: "Operating with transparency and honesty",
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  className="flex items-center gap-4 p-4 bg-zinc-800/30 rounded-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-red-600 rounded-full" />
                  <div>
                    <div className="font-medium">{value.title}</div>
                    <div className="text-sm text-zinc-400">{value.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Our Expert Team
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { role: "Videographers", icon: "video" },
            { role: "Video Editors", icon: "film" },
            { role: "Developers", icon: "code" },
            { role: "Graphic Designers", icon: "palette" },
          ].map((member, index) => (
            <motion.div
              key={member.role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm hover:border-red-600/50 transition duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center">
                      <User className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <div className="font-medium">{member.role}</div>
                      <div className="text-sm text-zinc-400">Expert Team</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
