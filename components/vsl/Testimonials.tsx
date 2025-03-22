// components/Testimonials.jsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "The Flower Guys",
    position: "Marketing Director",
    text: "XMA Agency transformed our business. We're getting 30+ qualified leads every month without any effort on our part. Their system just works.",
    stars: 5,
    image: "/testimonial1.jpg", // Replace with actual image path
  },
  {
    id: 2,
    name: "Mohammed Al-Farsi",
    company: "4Matic Rentals",
    position: "CEO",
    text: "After struggling with marketing for years, XMA's 4-step system has been a game-changer. Leads come in consistently, and the AI chatbot converts them efficiently.",
    stars: 5,
    image: "/testimonial2.jpg",
  },
  {
    id: 3,
    name: "Priya Sharma",
    company: "Hairology",
    position: "Owner",
    text: "The video content XMA produced for us gets incredible engagement. Combined with their CRM system, we've seen a 40% increase in bookings.",
    stars: 5,
    image: "/testimonial3.jpg",
  },
  {
    id: 4,
    name: "Thomas Reed",
    company: "The Fabrique",
    position: "Director",
    text: "What impressed me most is how hands-off the entire process is. Their team handles everything, and we just focus on serving the new customers they bring us.",
    stars: 5,
    image: "/testimonial4.jpg",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="relative">
      {/* Desktop Version - Grid for larger screens */}
      <div className="hidden md:grid grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 rounded-xl p-6 backdrop-blur-sm border border-zinc-800 hover:border-red-600/30 transition-colors duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="mr-3">
                  {/* If you have images */}
                  {/* <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  /> */}

                  {/* If you don't have images */}
                  <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center text-red-500 text-lg font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                  <p className="text-zinc-500">
                    {testimonial.position}, {testimonial.company}
                  </p>
                </div>
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

      {/* Mobile Version - Carousel for smaller screens */}
      <div className="md:hidden">
        <div className="relative">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0 }}
              animate={{
                opacity: currentIndex === index ? 1 : 0,
                x:
                  currentIndex === index
                    ? 0
                    : currentIndex > index
                      ? -100
                      : 100,
              }}
              transition={{ duration: 0.3 }}
              className={`bg-zinc-900/50 rounded-xl p-6 backdrop-blur-sm border border-zinc-800 absolute inset-0 ${
                currentIndex === index ? "relative" : "hidden"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="mr-3">
                    {/* If you have images */}
                    {/* <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover"
                    /> */}

                    {/* If you don't have images */}
                    <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center text-red-500 text-lg font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {testimonial.name}
                    </h3>
                    <p className="text-zinc-500">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>
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

        {/* Carousel Controls */}
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={prevTestimonial}
            className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-full"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex space-x-1 items-center">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  currentIndex === index ? "bg-red-500" : "bg-zinc-700"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
          <button
            onClick={nextTestimonial}
            className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-full"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
