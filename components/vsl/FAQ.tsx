// components/FAQ.jsx
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How long does it take to see results?",
    answer: "Most clients begin seeing leads within the first week of campaign launch. However, the system becomes more effective over time as we optimize based on data. Expect significant results within 2-4 weeks."
  },
  {
    question: "Do I need to create my own content?",
    answer: "No. Our team handles everything from scripting to shooting and editing videos, as well as creating all graphic designs. You simply need to provide basic information about your business during the onboarding process."
  },
  {
    question: "How is this different from other marketing agencies?",
    answer: "Unlike traditional agencies that focus solely on content or ads, our system integrates content creation, ad management, CRM, and AI-powered lead nurturing into one seamless process. This comprehensive approach ensures no leads fall through the cracks."
  },
  {
    question: "Do I need technical knowledge to use the system?",
    answer: "Not at all. We handle all technical aspects from setup to management. You'll have access to a simple dashboard to view your leads and performance, but our team manages everything behind the scenes."
  },
  {
    question: "What if I'm not satisfied with the service?",
    answer: "We offer a full satisfaction guarantee. If you're not happy with our service for any reason, you can request a refund within the first 30 days, no questions asked."
  },
  {
    question: "Can this work for my specific business?",
    answer: "Our system has been successful across various industries, from service-based businesses to retail and professional services. During our initial strategy call, we'll discuss your specific business needs and customize our approach accordingly."
  },
  {
    question: "Do you offer monthly retainer services?",
    answer: "Yes, we offer ongoing management services after the initial setup. Our retainer packages include ad management, content updates, and continuous optimization to ensure your lead generation keeps improving month after month."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <div 
            className={`bg-zinc-900/50 rounded-lg border ${openIndex === index ? 'border-red-600/50' : 'border-zinc-800'} overflow-hidden transition-all duration-300`}
          >
            <button
              className="w-full p-4 text-left flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-medium">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="text-zinc-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="text-zinc-400 flex-shrink-0" />
              )}
            </button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 text-zinc-400 border-t border-zinc-800">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FAQ;
