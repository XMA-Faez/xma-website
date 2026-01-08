"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  VideoCamera, 
  FilmStrip, 
  Code, 
  PaintBrush, 
  ChartLineUp, 
  Megaphone,
  Monitor,
  Globe,
  Robot,
  Users,
  TrendUp,
  Target,
  Lightbulb,
  Lightning
} from "phosphor-react";
import { ScanningButton } from "@/components/ui/ScanningButton";
import { LogoMarquee, type Logo } from "@/components/ui/LogoMarquee";
import Link from "next/link";

const clientLogos: Logo[] = [
  { src: "/logos/packman_Logo.png", alt: "Packman", width: 120 },
  { src: "/logos/Casapons.png", alt: "Casapons", width: 120 },
  { src: "/logos/DXtreme.svg", alt: "DXtreme", width: 110 },
  { src: "/logos/4Matic.jpg", alt: "4Matic", width: 100 },
  { src: "/logos/wyz-logo.png", alt: "WYZ", width: 100 },
  { src: "/logos/Tick.webp", alt: "Tick", width: 90 },
  { src: "/logos/ASUS.png", alt: "ASUS", width: 90 },
  { src: "/logos/TFG.png", alt: "TFG", width: 80 },
];

const AboutUsPage = () => {
  return (
    <div className="min-h-screen w-full relative bg-slate-50 dark:bg-black">
      {/* Cool Blue Glow Top - Light Mode */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          backgroundImage: `
            radial-gradient(
              circle at 50% -10%,
              rgba(70, 130, 180, 0.4),
              transparent 40%
            )
          `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Dark mode background */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59, 130, 246, 0.25), transparent 70%), #000000",
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-slate-900 dark:text-white">
              About XMA Agency
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-zinc-300 max-w-4xl mx-auto leading-relaxed">
              Premier digital marketing agency with <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent font-semibold">15 in-house professionals</span> specializing in video 
              production, performance marketing, and innovative CRM solutions that drive real results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Impact
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                number: "50+", 
                label: "Satisfied Clients",
                description: "Trusted by businesses worldwide",
                IconComponent: Users,
                color: "text-blue-400"
              },
              { 
                number: "30K+", 
                label: "Leads Generated",
                description: "Quality prospects delivered",
                IconComponent: TrendUp,
                color: "text-emerald-400"
              },
              { 
                number: "3M+", 
                label: "Ad Budget Managed",
                description: "AED in advertising spend optimized",
                IconComponent: Target,
                color: "text-purple-400"
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="p-8 glass-primary rounded-2xl text-center group hover:scale-105 transition-all duration-300">
                  <stat.IconComponent className={`w-8 h-8 ${stat.color} mx-auto mb-4`} weight="duotone" />
                  <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{stat.label}</div>
                  <div className="text-sm text-slate-500 dark:text-gray-400">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Who We Are
            </h2>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl lg:text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">15</span>
                <span className="text-slate-900 dark:text-white"> In-House</span>
                <br />
                <span className="text-slate-900 dark:text-white">Professionals</span>
              </div>
              <p className="text-xl text-slate-600 dark:text-zinc-300 leading-relaxed">
                Our diverse team of specialists brings together years of experience across video production, 
                development, design, and marketing to deliver comprehensive solutions for your business.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { role: "Videographers", IconComponent: VideoCamera, color: "text-blue-400" },
                { role: "Video Editors", IconComponent: FilmStrip, color: "text-emerald-400" },
                { role: "Developers", IconComponent: Code, color: "text-purple-400" },
                { role: "Graphic Designers", IconComponent: PaintBrush, color: "text-orange-400" },
                { role: "Marketing Managers", IconComponent: ChartLineUp, color: "text-pink-400" },
                { role: "Advertising Experts", IconComponent: Megaphone, color: "text-cyan-400" },
              ].map((member, index) => (
                <motion.div
                  key={member.role}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="p-4 glass-primary rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <member.IconComponent className={`w-6 h-6 ${member.color}`} weight="duotone" />
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {member.role}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Content Creation", 
                IconComponent: VideoCamera,
                description: "Professional video production and creative content that converts",
                color: "text-blue-400"
              },
              { 
                title: "Advertising", 
                IconComponent: Megaphone,
                description: "Strategic ad campaigns that drive results and maximize ROI",
                color: "text-emerald-400"
              },
              { 
                title: "CRM Solutions", 
                IconComponent: Monitor,
                description: "Custom CRM systems to manage and nurture your leads effectively",
                color: "text-purple-400"
              },
              { 
                title: "Website Development", 
                IconComponent: Globe,
                description: "Modern, responsive websites that engage and convert visitors",
                color: "text-orange-400"
              },
              { 
                title: "AI & Automation", 
                IconComponent: Robot,
                description: "Intelligent automation solutions to streamline your processes",
                color: "text-pink-400"
              },
              { 
                title: "And More...", 
                IconComponent: Lightning,
                description: "Custom solutions tailored to your unique business needs",
                color: "text-cyan-400"
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="p-6 glass-primary rounded-2xl hover:scale-105 transition-all duration-300 h-full">
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full glass-secondary mb-4">
                      <service.IconComponent className={`w-8 h-8 ${service.color}`} weight="duotone" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 dark:text-zinc-300 flex-grow">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-5xl md:text-6xl md:leading-[1.3] font-bold text-center mb-16 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Trusted by Leading Brands
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <LogoMarquee logos={clientLogos} speed="normal" />
          </motion.div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="p-8 glass-primary rounded-2xl h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full glass-secondary">
                    <Target className="w-6 h-6 text-blue-400" weight="duotone" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
                </div>
                <p className="text-slate-600 dark:text-zinc-300 mb-4 leading-relaxed">
                  At XMA Agency, we're committed to transforming businesses through
                  innovative digital solutions. Our approach combines creativity
                  with data-driven strategies to deliver exceptional results.
                </p>
                <p className="text-slate-600 dark:text-zinc-300 leading-relaxed">
                  We believe in building lasting partnerships with our clients,
                  understanding their unique needs, and delivering solutions that
                  drive real business growth.
                </p>
              </div>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="p-8 glass-primary rounded-2xl h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full glass-secondary">
                    <Lightbulb className="w-6 h-6 text-emerald-400" weight="duotone" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Values</h2>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      title: "Innovation",
                      desc: "Pushing boundaries in digital marketing",
                      IconComponent: Lightning,
                      color: "text-blue-400"
                    },
                    {
                      title: "Excellence",
                      desc: "Delivering outstanding results consistently",
                      IconComponent: Target,
                      color: "text-emerald-400"
                    },
                    {
                      title: "Partnership",
                      desc: "Building strong, lasting client relationships",
                      IconComponent: Users,
                      color: "text-purple-400"
                    },
                    {
                      title: "Integrity",
                      desc: "Operating with transparency and honesty",
                      IconComponent: Lightbulb,
                      color: "text-orange-400"
                    },
                  ].map((value, index) => (
                    <motion.div
                      key={value.title}
                      className="flex items-center gap-4 p-4 glass-secondary rounded-xl hover:scale-105"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full glass-tertiary flex-shrink-0">
                        <value.IconComponent className={`w-5 h-5 ${value.color}`} weight="duotone" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {value.title}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-zinc-400">
                          {value.desc}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to Transform Your Growth?
            </h3>
            <p className="text-xl text-slate-600 dark:text-zinc-300 mb-8 max-w-2xl mx-auto">
              Join the businesses that have already discovered the XMA difference. 
              Let's turn your marketing spend into measurable revenue.
            </p>
            <Link href="/book">
              <ScanningButton variant="primary" size="lg" color="blue">
                Start Your Growth Journey
              </ScanningButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
