"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import CTAButton from "@/components/general/CTAButton";

export default function ContactPage() {
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowThankYou(true);
  };

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent" />
        <div className="container pt-40 mx-auto px-4">
          <motion.h1
            className="font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p
            className="text-xl text-zinc-300 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Ready to transform your digital presence? Let's start a
            conversation.
          </motion.p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      placeholder="Your Name"
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Company Name"
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      rows={5}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
              <CardContent className="p-8">
                {[
                  { Icon: MapPin, title: "Visit Us", content: "Dubai, UAE" },
                  {
                    Icon: Phone,
                    title: "Call Us",
                    content: "+971 50 363 6856",
                  },
                  {
                    Icon: Mail,
                    title: "Email Us",
                    content: "admin@xmaagency.com",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className={`flex items-center gap-4 ${index !== 2 ? "mb-6" : ""}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center">
                      <item.Icon className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-zinc-400">{item.content}</div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Schedule Meeting Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm hover:border-red-600/50 transition duration-300">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Schedule a Meeting</h3>
                  <p className="text-zinc-400 mb-6">
                    Book a consultation with our team to discuss your project in
                    detail.
                  </p>
                  <CTAButton />
                </CardContent>
              </Card>
            </motion.div>

            {/* Business Hours Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Saturday</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Thank You Dialog */}
      <AlertDialog open={showThankYou} onOpenChange={setShowThankYou}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Thank You!</AlertDialogTitle>
            <AlertDialogDescription>
              We've received your message and will get back to you within 24
              hours.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
