"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Envelope } from "phosphor-react";
import { ScanningButton } from "@/components/ui/ScanningButton";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useTrackEvent } from "@/hooks/useTrackEvent";
import { POSTHOG_EVENTS } from "@/lib/posthog-events";

export default function ContactPage() {
  const [showThankYou, setShowThankYou] = useState(false);
  const [formStarted, setFormStarted] = useState(false);
  const trackEvent = useTrackEvent();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    const formValues = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      message: formData.get("message") as string,
    };
    
    // Track form submission
    trackEvent(POSTHOG_EVENTS.CONTACT_FORM_SUBMIT, {
      form_name: "contact_form",
      form_location: "contact_page",
      has_message: formValues.message?.length > 0,
      message_length: formValues.message?.length,
    });
    
    // Track lead captured
    trackEvent(POSTHOG_EVENTS.LEAD_CAPTURED, {
      lead_source: "contact_form",
      company_provided: formValues.company?.length > 0,
    });
    
    setShowThankYou(true);
  };
  
  const handleFormFocus = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackEvent(POSTHOG_EVENTS.FORM_START, {
        form_name: "contact_form",
        form_location: "contact_page",
      });
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-white dark:bg-black">
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
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-20">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-slate-600 dark:text-zinc-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Ready to transform your digital presence? Let's start a
            conversation.
          </motion.p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="glass-primary rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">
                  Send us a message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      className="bg-slate-100/50 dark:bg-zinc-800/50 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-400"
                      onFocus={handleFormFocus}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      className="bg-slate-100/50 dark:bg-zinc-800/50 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-400"
                      onFocus={handleFormFocus}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="company"
                      placeholder="Company Name"
                      className="bg-slate-100/50 dark:bg-zinc-800/50 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-400"
                      onFocus={handleFormFocus}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      className="bg-slate-100/50 dark:bg-zinc-800/50 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-400"
                      rows={5}
                      onFocus={handleFormFocus}
                      required
                    />
                  </div>
                  <ScanningButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    trackingLocation="contact_form"
                    trackingProps={{ form_name: "contact_form" }}
                  >
                    Send Message
                  </ScanningButton>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="glass-primary rounded-2xl p-8">
                {[
                  {
                    Icon: MapPin,
                    title: "Visit Us",
                    content: "Dubai, UAE",
                    color: "text-blue-400",
                    type: "address",
                    link: null,
                  },
                  {
                    Icon: Phone,
                    title: "Call Us",
                    content: "+971 50 363 6856",
                    color: "text-emerald-400",
                    type: "phone",
                    link: "tel:+971503636856",
                  },
                  {
                    Icon: Envelope,
                    title: "Email Us",
                    content: "admin@xmaagency.com",
                    color: "text-purple-400",
                    type: "email",
                    link: "mailto:admin@xmaagency.com",
                  },
                ].map((item, index) => {
                  const handleContactClick = () => {
                    if (item.link) {
                      trackEvent(POSTHOG_EVENTS.CONTACT_METHOD_CLICK, {
                        contact_method: item.type,
                        contact_value: item.content,
                        contact_location: "contact_page",
                      });
                    }
                  };
                  
                  const content = (
                    <>
                      <div className="w-12 h-12 rounded-full glass-secondary flex items-center justify-center">
                        <item.Icon
                          className={`w-6 h-6 ${item.color}`}
                          weight="duotone"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {item.title}
                        </div>
                        <div className="text-slate-600 dark:text-zinc-400">
                          {item.content}
                        </div>
                      </div>
                    </>
                  );
                  
                  return (
                    <motion.div
                      key={item.title}
                      className={`${index !== 2 ? "mb-8" : ""}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {item.link ? (
                        <a
                          href={item.link}
                          onClick={handleContactClick}
                          className="flex items-center gap-4 hover:opacity-80 transition-opacity"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4">
                          {content}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Schedule Meeting Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="glass-secondary rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                    Schedule a Meeting
                  </h3>
                  <p className="text-slate-600 dark:text-zinc-400 mb-6">
                    Book a consultation with our team to discuss your project in
                    detail.
                  </p>

                  <ScanningButton
                    variant="primary"
                    size="lg"
                    color="blue"
                  >
                    Book Now
                  </ScanningButton>
                </div>
              </motion.div>

              {/* Business Hours Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="glass-secondary rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                    Business Hours
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-zinc-400">
                        Monday - Friday
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        9:00 AM - 6:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-zinc-400">
                        Saturday
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        10:00 AM - 4:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-zinc-400">
                        Sunday
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        Closed
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Thank You Dialog */}
      <AlertDialog open={showThankYou} onOpenChange={setShowThankYou}>
        <AlertDialogContent className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-900 dark:text-white">
              Thank You!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600 dark:text-zinc-300">
              We've received your message and will get back to you within 24
              hours.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
