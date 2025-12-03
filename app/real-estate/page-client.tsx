"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Sparkle,
  Handshake,
  CaretDown,
  TrendUp,
  CalendarCheck,
} from "phosphor-react";
import { optimizeCloudinaryVideoUrl } from "@/utils/cloudinary";
import realEstateCarouselData from "@/data/realEstateCarousel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { RealEstateFeaturesSection } from "@/components/real-estate/FeaturesSection";
import LeadCostCalculator from "@/components/real-estate/LeadCostCalculator";
import WhatsAppWidget from "@/components/real-estate/WhatsAppWidget";
import { ScanningButton } from "@/components/ui/ScanningButton";
import { LazyVideo } from "@/components/ui/LazyVideo";
import Link from "next/link";

const RealEstateClient = () => {
  const [openFAQ, setOpenFAQ] = useState<string[]>([]);

  const propertyVideos = realEstateCarouselData;

  const toggleFAQ = (id: string) => {
    setOpenFAQ((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const faqData = [
    {
      id: "1",
      q: "How quickly will I see leads?",
      a: "Most agents see their first qualified leads within 7-14 days of campaign launch. Lead quality typically improves over the first month as we optimize targeting based on performance data.",
    },
    {
      id: "2",
      q: "What if I've tried ads before and they didn't work?",
      a: "Most agents fail with ads because of poor targeting or generic creative. We specialize in real estate-specific campaigns that target serious buyers and tenants—not tourists browsing Dubizzle for fun.",
    },
    {
      id: "3",
      q: "Do you work with all property types?",
      a: "Yes! We've worked with residential sales, rentals, off-plan, commercial, and luxury properties. Our targeting adapts to your specific inventory and ideal client profile.",
    },
    {
      id: "4",
      q: "What's the investment?",
      a: "Management fees are customized based on your ad spend and goals. We recommend a minimum ad spend of AED 5,000/month. Book a free consultation to get a custom proposal.",
    },
    {
      id: "5",
      q: "How involved do I need to be?",
      a: "We handle everything from strategy to creative to optimization. You'll receive weekly reports and have regular strategy calls, but the day-to-day is completely hands-off for you.",
    },
    {
      id: "6",
      q: "Do you require long-term contracts?",
      a: "No. We work month-to-month because we believe in earning your business through results, not contracts. Most clients stay for years because the leads keep coming.",
    },
  ];

  return (
    <div className="min-h-screen w-full relative bg-white dark:bg-black">
      {/* Light mode background */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.6 0.15 250 / 0.15), transparent 70%), oklch(0.98 0.01 250)",
        }}
      />
      {/* Dark mode background */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background:
            "linear-gradient(35deg, oklch(0 0 0) 0%, oklch(0.15 0.05 250) 50%, oklch(0 0 0) 100%)",
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left Column - Content */}
            <div className="z-10">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl capitalize md:text-7xl text-center md:text-left font-bold mb-8 text-slate-900 dark:text-white"
              >
                Most property ads attract browsers{" "}
                <span className="text-blue-500">
                  Yours will attract buyers
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-slate-600 dark:text-gray-400 text-center md:text-left mb-8 leading-relaxed"
              >
                Qualified leads delivered to your inbox. Meta & Google ads built
                for UAE real estate. No tire-kickers. Just viewings.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mb-6"
              >
                {/* <button className="group relative px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 text-lg overflow-hidden"> */}
                {/*   Book Free Consultation */}
                {/* </button> */}
                <ScanningButton
                  variant="primary"
                  size="md"
                  color="blue"
                  trackingLocation="header"
                  trackingProps={{
                    is_crm_page: false,
                    destination: "/book-crm",
                  }}
                >
                  <Link href="/book">Book Your Strategy Call</Link>
                </ScanningButton>
              </motion.div>
            </div>

            {/* Right Column - Dual Video Marquee */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="z-10 relative"
            >
              <div className="grid grid-cols-2 gap-4 h-[800px] overflow-hidden">
                {/* First Column - Scrolling Up */}
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="flex flex-col gap-4 animate-marquee-up">
                    {[...propertyVideos, ...propertyVideos].map(
                      (video, index) => (
                        <div
                          key={`up-${index}`}
                          className="relative w-full flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10"
                          style={{ aspectRatio: "9/16" }}
                        >
                          <LazyVideo
                            src={optimizeCloudinaryVideoUrl(video.url)}
                            poster={video.thumbnail}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Second Column - Scrolling Down */}
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="flex flex-col gap-4 animate-marquee-down">
                    {[...propertyVideos, ...propertyVideos]
                      .slice()
                      .reverse()
                      .map((video, index) => (
                        <div
                          key={`down-${index}`}
                          className="relative w-full flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10"
                          style={{ aspectRatio: "9/16" }}
                        >
                          <LazyVideo
                            src={optimizeCloudinaryVideoUrl(video.url)}
                            poster={video.thumbnail}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Gradient overlays for smooth edges */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white dark:from-black to-transparent pointer-events-none z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none z-10"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section - ScrollReveal */}
      <section className="relative section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <span className="text-sm uppercase tracking-wider text-blue-500 font-semibold">
              About Us
            </span>
          </motion.div>

          <ScrollReveal
            containerClassName="text-center capitalize"
            textClassName="text-slate-900 dark:text-white"
            baseOpacity={0.1}
            baseRotation={0}
            enableBlur={false}
            rotationEnd="center center"
            wordAnimationEnd="center center"
          >
            We create a consistent flow of qualified leads for real estate
            professionals so they can focus on closing.
          </ScrollReveal>
        </div>
      </section>

      {/* Features Section */}
      <RealEstateFeaturesSection />

      {/* Lead Cost Calculator */}
      {/* <LeadCostCalculator /> */}

      {/* How We Work - Journey Timeline Section */}
      <section className="relative py-24 px-4 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-slate-900 dark:text-white">
              Your Journey to a{" "}
              <span className="text-blue-500">Full Pipeline</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-500 max-w-2xl mx-auto">
              A proven process that turns your ad budget into qualified property
              viewings
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-blue-500/50 dark:via-blue-500 to-transparent hidden lg:block" />

            <div className="space-y-12 lg:space-y-0">
              {[
                {
                  id: 1,
                  phase: "Free Consultation",
                  title: "Discovery Call",
                  description:
                    "We learn about your target properties, ideal clients, and current challenges to assess fit and map out your growth potential.",
                  icon: CalendarCheck,
                  color: "text-blue-400",
                  bgColor: "bg-blue-500/5 dark:bg-blue-500/5",
                  activeColors: {
                    dot: "bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/50",
                    background:
                      "bg-gradient-to-r from-blue-500/10 to-blue-400/20",
                  },
                },
                {
                  id: 2,
                  phase: "Strategy",
                  title: "Market Analysis",
                  description:
                    "Competitor ad research, audience profiling, and targeting strategy tailored to Dubai real estate buyers and tenants.",
                  icon: Target,
                  color: "text-purple-400",
                  bgColor: "bg-purple-500/5 dark:bg-purple-500/5",
                  activeColors: {
                    dot: "bg-purple-500 border-purple-400 shadow-lg shadow-purple-500/50",
                    background:
                      "bg-gradient-to-r from-purple-500/10 to-purple-400/20",
                  },
                },
                {
                  id: 3,
                  phase: "Setup",
                  title: "Campaign Build",
                  description:
                    "Ad account setup, pixel installation, audience creation, and lead capture integration with your preferred system.",
                  icon: Handshake,
                  color: "text-emerald-400",
                  bgColor: "bg-emerald-500/5 dark:bg-emerald-500/5",
                  activeColors: {
                    dot: "bg-emerald-500 border-emerald-400 shadow-lg shadow-emerald-500/50",
                    background:
                      "bg-gradient-to-r from-emerald-500/10 to-emerald-400/20",
                  },
                },
                {
                  id: 4,
                  phase: "Creative",
                  title: "Ad Production",
                  description:
                    "Property showcase ads, agent branding content, and scroll-stopping creative optimized for Meta and Google.",
                  icon: Sparkle,
                  color: "text-orange-400",
                  bgColor: "bg-orange-500/5 dark:bg-orange-500/5",
                  activeColors: {
                    dot: "bg-orange-500 border-orange-400 shadow-lg shadow-orange-500/50",
                    background:
                      "bg-gradient-to-r from-orange-500/10 to-orange-400/20",
                  },
                },
                {
                  id: 5,
                  phase: "Launch & Optimize",
                  title: "Scale & Refine",
                  description:
                    "Campaigns go live, we monitor daily, A/B test creative, and continuously optimize for lower cost per qualified lead.",
                  icon: TrendUp,
                  color: "text-cyan-400",
                  bgColor: "bg-cyan-500/5 dark:bg-cyan-500/5",
                  activeColors: {
                    dot: "bg-cyan-500 border-cyan-400 shadow-lg shadow-cyan-500/50",
                    background:
                      "bg-gradient-to-r from-cyan-500/10 to-cyan-400/20",
                  },
                },
              ].map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className="w-full lg:w-1/2 px-4">
                    <motion.div
                      className={`relative ${step.bgColor} backdrop-blur-sm border border-slate-200 dark:border-white/10 hover:border-blue-500/30 p-8 rounded-3xl transition-all duration-300`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <step.icon
                            className={`w-8 h-8 mb-2 ${step.color}`}
                            weight="duotone"
                          />
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                            {step.phase}
                          </h3>
                          <h4 className="text-lg text-slate-500 dark:text-gray-400">
                            {step.title}
                          </h4>
                        </div>
                        <span
                          className={`text-sm bg-white dark:bg-black/50 px-4 py-2 rounded-2xl ${step.color} font-semibold border border-slate-200 dark:border-white/10`}
                        >
                          Phase {step.id}
                        </span>
                      </div>

                      <p className="text-slate-600 dark:text-gray-300 mb-4">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={`w-4 h-4 rounded-full bg-white dark:bg-black border-slate-300 dark:border-white/20 border-2 transition-all duration-300`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Interactive Accordion */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-slate-900 dark:text-white">
              Frequently Asked <span className="text-blue-500">Questions</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-500">
              Everything you need to know about working with us
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqData.map((item, index) => {
              const isOpen = openFAQ.includes(item.id);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <motion.button
                    whileHover={{ opacity: 1, scale: 1.01 }}
                    onClick={() => toggleFAQ(item.id)}
                    className={`w-full text-left p-6 rounded-2xl ${
                      isOpen
                        ? "bg-slate-100 dark:bg-white/10 backdrop-blur-sm border-blue-500/50 shadow-lg opacity-100"
                        : "bg-slate-50 dark:bg-white/5 backdrop-blur-sm hover:bg-slate-100 dark:hover:bg-white/7 opacity-70 dark:opacity-50 hover:opacity-100"
                    } border border-slate-200 dark:border-white/10`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white pr-4">
                        {item.q}
                      </h3>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex-shrink-0 ${
                          isOpen
                            ? "text-blue-400"
                            : "text-slate-400 dark:text-gray-400"
                        }`}
                      >
                        <CaretDown className="w-5 h-5" />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-4 text-slate-600 dark:text-gray-300 leading-relaxed">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.45 0.15 250) 0%, oklch(0.35 0.18 280) 100%)",
              }}
            />

            {/* Subtle pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10 p-8 md:p-16 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold text-white mb-4"
              >
                Ready to Fill Your Pipeline?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
              >
                Book a free strategy call and discover how we can deliver
                qualified buyers and tenants to your inbox every week.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/book" className="">
                  <ScanningButton
                    variant="primary"
                    size="lg"
                    color="white"
                    className=""
                  >
                    <Link href="/book">Book Your Strategy Call</Link>
                  </ScanningButton>
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-white/60 text-sm mt-6"
              >
                No commitment required. See if we&apos;re a good fit.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Widget */}
      <WhatsAppWidget />
    </div>
  );
};

export default RealEstateClient;
