"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Car,
  Globe,
  VideoCamera,
  ChartLineUp,
  WhatsappLogo,
  Database,
  CheckCircle,
  Target,
  Lightning,
  Clock,
  Crown,
  Gauge,
} from "phosphor-react";
import { ScanningButton } from "@/components/ui/ScanningButton";
import { LogoMarquee, type Logo } from "@/components/ui/LogoMarquee";
import Link from "next/link";

const clientLogos: Logo[] = [
  { src: "/logos/4MAticlogo.png", alt: "4Matic", height: 40 },
  { src: "/logos/ASUS-logo.png", alt: "ASUS", height: 30 },
  { src: "/logos/DXtreme.png", alt: "DXtreme", height: 40 },
  { src: "/logos/Tick.webp", alt: "Tick", height: 45 },
  { src: "/logos/packman_Logo.png", alt: "Packman", height: 60 },
  { src: "/logos/dreamdrives-logo.svg", alt: "Dream Drives", height: 50 },
  { src: "/logos/baggagetaxi.webp", alt: "Dream Drives", height: 50 },
  { src: "/logos/nbf-logo.png", alt: "Dream Drives", height: 50 },
];

const AboutUsPage = () => {
  return (
    <div className="min-h-screen w-full relative bg-slate-50 dark:bg-black">
      {/* Light mode background */}
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Car className="w-5 h-5 text-blue-500" weight="duotone" />
              <span className="text-sm font-medium text-blue-500">
                Luxury Car Rental Specialists
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-slate-900 dark:text-white">
              The Booking Optimization Agency
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
                for Luxury Car Rentals
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-zinc-300 max-w-4xl mx-auto leading-relaxed">
              We help UAE luxury car rental companies turn inquiries into
              confirmed bookings — through conversion-optimized websites,
              premium creatives, and WhatsApp automation that actually works.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why We're Different Section */}
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
              Why We&apos;re Different
            </h2>
            <p className="text-xl text-slate-600 dark:text-zinc-300 max-w-3xl mx-auto">
              We only work with car rental companies. That specialization
              changes everything.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl lg:text-4xl font-bold mb-8 text-slate-900 dark:text-white">
                We Only Work With
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
                  Car Rental Companies
                </span>
              </div>
              <p className="text-xl text-slate-600 dark:text-zinc-300 leading-relaxed mb-6">
                Not e-commerce. Not SaaS. Not &quot;one-size-fits-all&quot;
                marketing. This isn&apos;t theory — it&apos;s operational
                experience.
              </p>
              <p className="text-lg text-slate-500 dark:text-zinc-400 leading-relaxed">
                Most agencies stop at &quot;leads.&quot; We optimize for
                bookings — because that&apos;s what actually grows your
                business.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                {
                  text: "We understand short rental windows, urgency, and price sensitivity",
                  IconComponent: Clock,
                  hex: "#1F6BFF",
                },
                {
                  text: "We design for WhatsApp-first behavior",
                  IconComponent: WhatsappLogo,
                  hex: "#00FFB3",
                },
                {
                  text: "We build systems around booking flow — not vanity metrics",
                  IconComponent: Target,
                  hex: "#7A3EFF",
                },
                {
                  text: "We focus on confirmed bookings, not just leads",
                  IconComponent: CheckCircle,
                  hex: "#FFD400",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="p-4 glass-primary rounded-xl hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div
                        className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                        style={{ backgroundColor: `${item.hex}15` }}
                      >
                        <item.IconComponent
                          className="w-5 h-5"
                          style={{ color: item.hex }}
                          weight="duotone"
                        />
                      </div>
                      <span className="text-base font-medium text-slate-900 dark:text-white">
                        {item.text}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Luxury Booking System Section */}
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
              The Luxury Booking System
            </h2>
            <p className="text-xl text-slate-600 dark:text-zinc-300 max-w-3xl mx-auto">
              Everything we do is designed to increase your booking rate. This
              is not a list of services — it&apos;s one integrated system.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
          {[
            {
              title: "Conversion-Optimized Website",
              IconComponent: Globe,
              description:
                "Built to push visitors toward action, not just look good. Every element designed for bookings.",
              hex: "#1F6BFF",
            },
            {
              title: "High-End Ad Creatives",
              IconComponent: VideoCamera,
              description:
                "Video, graphics, and photography aligned with luxury perception. Premium content that converts.",
              hex: "#FF2E92",
            },
            {
              title: "Paid Ads That Qualify Leads",
              IconComponent: ChartLineUp,
              description:
                "No cheap clicks. No random traffic. Only qualified prospects ready to book luxury vehicles.",
              hex: "#FFD400",
            },
            {
              title: "WhatsApp Automation",
              IconComponent: WhatsappLogo,
              description:
                "Instant replies, follow-ups, and lead routing — without sounding robotic. Speed wins bookings.",
              hex: "#00FFB3",
            },
            {
              title: "Custom CRM for Rentals",
              IconComponent: Database,
              description:
                "Every inquiry tracked. Every opportunity followed. Nothing falls through the cracks.",
              hex: "#7A3EFF",
            },
          ].map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]"
            >
              <div
                className="p-6 rounded-2xl hover:scale-105 transition-all duration-300 h-full border border-slate-200/50 dark:border-white/10"
                style={{
                  background: `linear-gradient(135deg, ${service.hex}08 0%, transparent 100%)`,
                }}
              >
                <div className="flex flex-col h-full">
                  <div
                    className="flex items-center justify-center w-14 h-14 rounded-full mb-4"
                    style={{ backgroundColor: `${service.hex}15` }}
                  >
                    <service.IconComponent
                      className="w-7 h-7"
                      style={{ color: service.hex }}
                      weight="duotone"
                    />
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
                    <Target
                      className="w-6 h-6 text-blue-400"
                      weight="duotone"
                    />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Our Mission
                  </h2>
                </div>
                <p className="text-slate-600 dark:text-zinc-300 mb-4 leading-relaxed">
                  To be the definitive growth partner for luxury car rental
                  businesses in the UAE. We exist to turn your inquiries into
                  confirmed bookings — not just generate leads that go nowhere.
                </p>
                <p className="text-slate-600 dark:text-zinc-300 leading-relaxed">
                  We believe luxury car rental is a specialized business that
                  deserves specialized marketing. Generic agencies
                  don&apos;t understand your urgency, your customers, or your
                  booking flow. We do.
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
                    <Lightning
                      className="w-6 h-6 text-emerald-400"
                      weight="duotone"
                    />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Our Values
                  </h2>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      title: "Booking-Focused",
                      desc: "We optimize for confirmed bookings, not vanity metrics",
                      IconComponent: Target,
                      hex: "#1F6BFF",
                    },
                    {
                      title: "Speed Wins",
                      desc: "Response time matters — we build for instant engagement",
                      IconComponent: Clock,
                      hex: "#00FFB3",
                    },
                    {
                      title: "Premium Brand Alignment",
                      desc: "Your brand should feel as luxury as your fleet",
                      IconComponent: Crown,
                      hex: "#7A3EFF",
                    },
                    {
                      title: "Operational Efficiency",
                      desc: "Systems that work for your team, not against them",
                      IconComponent: Gauge,
                      hex: "#FFD400",
                    },
                  ].map((value, index) => (
                    <motion.div
                      key={value.title}
                      className="flex items-center gap-4 p-4 glass-secondary rounded-xl hover:scale-105 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div
                        className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                        style={{ backgroundColor: `${value.hex}15` }}
                      >
                        <value.IconComponent
                          className="w-5 h-5"
                          style={{ color: value.hex }}
                          weight="duotone"
                        />
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
              Ready to Turn Inquiries Into Bookings?
            </h3>
            <p className="text-xl text-slate-600 dark:text-zinc-300 mb-8 max-w-2xl mx-auto">
              Book a strategy call. We&apos;ll review your current setup and
              show you exactly where bookings are leaking.
            </p>
            <Link href="/book">
              <ScanningButton variant="primary" size="lg" color="blue">
                Book a Strategy Call
              </ScanningButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
