// components/VSLPage.jsx
"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Target,
  FileVideo,
  Bot,
  BarChart3,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import FloatingCTA from "./FloatingCTA";
import SidebarCTA from "./SidebarCTA";
import ClientTestimonials from "./ClientTestimonials";
import BusinessBenefits from "./BusinessBenefits";
import PricingPackages from "./PricingPackages";
import FAQ from "./FAQ";
import BookingIframe from "./BookingIframe";
import { PackageProvider } from "@/context/PackageContext";

// Import lead tracking utility
import { submitLeadForm } from "@/lib/leadTracking";
import Link from "next/link";

const VSLPage = () => {
  // Add a state to track when the video has been watched
  const [hasWatchedVideo, setHasWatchedVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const [showCTA, setShowCTA] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    // BANT fields
    budget: "",
    authority: "",
    need: "",
    timeline: "",
  });

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);

      // Show CTA when video is 80% complete
      if (videoRef.current.currentTime > videoRef.current.duration * 0.8) {
        setShowCTA(true);
        setHasWatchedVideo(true);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Submit to tracking/CRM system
      const result = await submitLeadForm(formData, "vsl-main-cta");

      // Show success message
      alert("Thanks for your interest! Our team will contact you shortly.");

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        budget: "",
        authority: "",
        need: "",
        timeline: "",
      });

      // Hide CTA
      setShowCTA(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form. Please try again.");
    }
  };

  // Format time from seconds to MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <PackageProvider>
      <div className="bg-zinc-950 min-h-screen">
        {/* Sidebar CTA */}
        <SidebarCTA scrollThreshold={500} />

        {/* Hero Section with Video */}
        <div className="relative">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950 z-10"></div>

          {/* Video Header */}
          <div className="container mx-auto px-4 pt-24 pb-12 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
                Generate Qualified Leads On Autopilot
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Dubai's top businesses trust our 4-step system to grow
                consistently month after month
              </p>
              <Link href="#cta" className="transition duration-300">
                <button className="button--calypso mt-md inline-block relative button bg-red-500 px-8 py-3">
                  <span>Book Discovery Call</span>
                </button>
              </Link>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video bg-zinc-900 rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
                {/* Video Player */}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                  poster="/video-poster.jpg" // Replace with your poster image
                >
                  <source src="/vsl-video.mp4" type="video/mp4" />{" "}
                  {/* Replace with your actual video */}
                  Your browser does not support the video tag.
                </video>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handlePlayPause}
                      className="bg-red-600 hover:bg-red-700 rounded-full p-2 transition"
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>

                    <div className="text-sm text-zinc-300">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1 bg-zinc-700 mt-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-600"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step System Section */}
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
              Our Proven 4-Step Lead Flow System
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Guaranteed to grow your business month after month without you
              lifting a finger
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 rounded-xl p-6 backdrop-blur-sm border border-zinc-800 hover:border-red-600/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="bg-red-600/20 text-red-600 rounded-lg p-3">
                  <Target size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    1. Strategy Development
                  </h3>
                  <p className="text-zinc-400 mb-4">
                    We deep dive into your business, understand your ideal
                    customers, and craft a tailored marketing strategy that
                    guarantees results.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-zinc-300">
                      <Check size={16} className="text-green-500" />
                      In-depth business analysis
                    </li>
                    <li className="flex items-center gap-2 text-zinc-300">
                      <Check size={16} className="text-green-500" />
                      Customer research & targeting
                    </li>
                    <li className="flex items-center gap-2 text-zinc-300">
                      <Check size={16} className="text-green-500" />
                      Competitive analysis
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 rounded-xl p-6 backdrop-blur-sm border border-zinc-800 hover:border-red-600/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="bg-red-600/20 text-red-600 rounded-lg p-3">
                  <FileVideo size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    2. Content Creation
                  </h3>
                  <p className="text-zinc-400 mb-4">
                    Our in-house team creates eye-catching graphics and
                    high-quality videos that speak directly to your ideal
                    prospects.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-zinc-300">
                      <Check size={16} className="text-green-500" />
                      Professional video production
                    </li>
                    <li className="flex items-center gap-2 text-zinc-300">
                      <Check size={16} className="text-green-500" />
                      Custom graphic design
                    </li>
                    <li className="flex items-center gap-2 text-zinc-300">
                      <Check size={16} className="text-green-500" />
                      Conversion-focused scripting
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 rounded-xl p-6 backdrop-blur-sm border border-zinc-800 hover:border-red-600/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="bg-red-600/20 text-red-600 rounded-lg p-3">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    3. CRM & AI Integration
                  </h3>
                  <p className="text-zinc-400 mb-4">
                    We set up a custom CRM and AI WhatsApp chatbot to capture,
                    organize, and nurture leads automatically.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-zinc-300">
                      <Check size={16} className="text-green-500" />
                      Custom CRM setup
                    </li>
                    <li className="flex items-center gap-2 text-zinc-300">
                      <Check size={16} className="text-green-500" />
                      AI WhatsApp chatbot
                    </li>
                    <li className="flex items-center gap-2 text-zinc-300">
                      <Check size={16} className="text-green-500" />
                      Automated lead nurturing
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 rounded-xl p-6 backdrop-blur-sm border border-zinc-800 hover:border-red-600/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="bg-red-600/20 text-red-600 rounded-lg p-3">
                  <BarChart3 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    4. Campaign Management
                  </h3>
                  <p className="text-zinc-400 mb-4">
                    Our expert team handles everything from launching, managing,
                    and optimizing your ad campaigns for maximum results.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-zinc-300">
                      <Check size={16} className="text-green-500" />
                      Full campaign management
                    </li>
                    <li className="flex items-center gap-2 text-zinc-300">
                      <Check size={16} className="text-green-500" />
                      Data analysis & optimization
                    </li>
                    <li className="flex items-center gap-2 text-zinc-300">
                      <Check size={16} className="text-green-500" />
                      Regular performance reporting
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Benefits Section */}
        <BusinessBenefits />

        {/* Social Proof Section */}
        <div className="bg-zinc-900/30 py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
                Trusted by Dubai's Top Businesses
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Join the dozens of successful businesses already using our
                system
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {/* Client logos - replace with your actual client logos */}
              {[
                "Packman",
                "The Flower Guys",
                "Hairology",
                "The Fabrique",
                "4Matic Rentals",
                "Wavesound Studio",
              ].map((client, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-zinc-800/40 rounded-lg p-4 flex items-center justify-center h-24 border border-zinc-700"
                >
                  <span className="text-zinc-400 font-medium">{client}</span>
                  {/* Replace with actual logo: <img src={`/logos/${client.toLowerCase().replace(' ', '-')}.png`} alt={client} className="max-h-12" /> */}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Client Testimonials */}
        <ClientTestimonials />

        {/* FAQ Section */}
        <FAQ />

        {/* Guarantee & CTA Section */}
        <div id="cta" className="container scroll-mt-20 mx-auto px-4 py-16">
          <div className="max-w-8xl mx-auto">
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
                <h2 className="text-3xl font-bold mb-6">
                  Full Satisfaction Guarantee
                </h2>
                <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
                  If you're not satisfied with our service for whatever reason,
                  you can have your money back, no questions asked.
                </p>

                <BookingIframe />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating CTA */}
        <FloatingCTA
          hasWatchedVideo={hasWatchedVideo}
          onOpen={() => setShowCTA(true)}
        />
      </div>
    </PackageProvider>
  );
};

export default VSLPage;
