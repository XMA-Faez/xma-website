// app/system/page.js
"use client";

import React, { useRef } from 'react';
import HeroSection from './HeroSection';
import AdsCarousel from './AdsCarousel';
import PainPoints from './PainPoints';
import Solutions from './Solutions';
import LogoMarquee from './LogoMarquee';
import Testimonials from './Testimonials';
import SocialProof from './SocialProof';
import FAQ from './FAQ';
import CTASection from './CTASection';
import { motion } from 'framer-motion';

export default function SystemPage() {
  const ctaRef = useRef(null);
  const solutionsRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen">
      <HeroSection onCtaClick={() => scrollToSection(ctaRef)} />
      
      {/* Ads Carousel */}
      <section className="py-16 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
              Our Work
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Check out the high-quality videos we create for our clients
            </p>
          </motion.div>
          
          <AdsCarousel />
        </div>
      </section>
      
      {/* Pain Points */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
              Challenges Dubai Businesses Face
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Are you struggling with any of these marketing challenges?
            </p>
          </motion.div>
          
          <PainPoints />
          
          {/* <motion.div */}
          {/*   initial={{ opacity: 0, y: 20 }} */}
          {/*   whileInView={{ opacity: 1, y: 0 }} */}
          {/*   transition={{ duration: 0.5, delay: 0.3 }} */}
          {/*   viewport={{ once: true }} */}
          {/*   className="text-center mt-10" */}
          {/* > */}
          {/*   <button  */}
          {/*     onClick={() => scrollToSection(solutionsRef)} */}
          {/*     className="border border-red-600 text-red-500 hover:bg-red-600/10 px-6 py-3 rounded-lg font-medium transition-colors duration-300 inline-flex items-center gap-2" */}
          {/*   > */}
          {/*     Discover the Solution */}
          {/*     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg> */}
          {/*   </button> */}
          {/* </motion.div> */}
        </div>
      </section>
      
      {/* Solutions */}
      <section ref={solutionsRef} className="py-16 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
              Our Proven 4-Step Solution
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              A streamlined system that delivers qualified leads on autopilot
            </p>
          </motion.div>
          
          <Solutions />
        </div>
      </section>
      
      {/* Logo Marquee */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
              Trusted by Dubai's Top Businesses
            </h2>
          </motion.div>
          
          <LogoMarquee />
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Success stories from businesses just like yours
            </p>
          </motion.div>
          
          <Testimonials />
        </div>
      </section>
      
      {/* Social Proof */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SocialProof />
        </div>
      </section>
      
      {/* Q&A */}
      <section className="py-16 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Everything you need to know about our marketing system
            </p>
          </motion.div>
          
          <FAQ />
        </div>
      </section>
      
      {/* Final CTA */}
      <CTASection id="book-call" ref={ctaRef} />
    </div>
  );
}
