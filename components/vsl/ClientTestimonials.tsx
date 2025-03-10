// components/ClientTestimonials.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "The Flower Guys",
    text: "XMA Agency transformed our business. We're getting 30+ qualified leads every month without any effort on our part. Their system just works.",
    stars: 5,
  },
  {
    name: "Mohamed Al-Farsi",
    company: "4Matic Rentals",
    text: "After struggling with marketing for years, XMA's 4-step system has been a game-changer. Leads come in consistently, and the AI chatbot converts them efficiently.",
    stars: 5,
  },
  {
    name: "Priya Sharma",
    company: "Hairology",
    text: "The video content XMA produced for us gets incredible engagement. Combined with their CRM system, we've seen a 40% increase in bookings.",
    stars: 5,
  },
  {
    name: "Thomas Reed",
    company: "The Fabrique",
    text: "What impressed me most is how hands-off the entire process is. Their team handles everything, and we just focus on serving the new customers they bring us.",
    stars: 5,
  },
];

const ClientTestimonials = () => {
  return (
    <div className="py-16 bg-zinc-900/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Real results from businesses just like yours
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 rounded-xl p-6 backdrop-blur-sm border border-zinc-800 hover:border-red-600/50 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                  <p className="text-zinc-500">{testimonial.company}</p>
                </div>
                <div className="flex">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
              </div>
              <div className="relative">
                <Quote
                  size={24}
                  className="absolute top-0 left-0 text-red-600/20 -translate-x-2 -translate-y-2"
                />
                <p className="text-zinc-300 pl-2">{testimonial.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientTestimonials;
