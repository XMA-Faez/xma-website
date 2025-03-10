// components/SocialProof.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const metrics = [
  {
    id: 1,
    value: 50,
    suffix: "+",
    label: "Total Clients",
    color: "from-red-600 to-red-500",
    startValue: 0,
  },
  {
    id: 2,
    value: 30,
    suffix: "K+",
    label: "Leads Generated",
    color: "from-blue-600 to-blue-500",
    startValue: 0,
  },
  {
    id: 3,
    value: 3,
    suffix: "M+",
    label: "Ad Budget Managed",
    prefix: "AED ",
    color: "from-green-600 to-green-500",
    startValue: 0,
  },
  {
    id: 4,
    value: 95,
    suffix: "%",
    label: "Client Satisfaction",
    color: "from-amber-600 to-amber-500",
    startValue: 0,
  },
];

const CountingNumber = ({
  value,
  startValue,
  duration = 2000,
  prefix = "",
  suffix = "",
}) => {
  const [displayValue, setDisplayValue] = useState(startValue);
  const counterRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          controls.start({ opacity: 1, y: 0 });

          // Start counting animation
          let startTime;
          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentValue = Math.floor(
              startValue + progress * (value - startValue),
            );
            setDisplayValue(currentValue);

            if (progress < 1) {
              counterRef.current = requestAnimationFrame(step);
            }
          };

          counterRef.current = requestAnimationFrame(step);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const currentElement = document.getElementById(`counter-${value}`);
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (counterRef.current) {
        cancelAnimationFrame(counterRef.current);
      }
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [value, startValue, duration, controls]);

  return (
    <motion.div
      id={`counter-${value}`}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      className="font-extrabold"
    >
      {prefix}
      {displayValue}
      {suffix}
    </motion.div>
  );
};

const SocialProof = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mx-auto max-w-6xl"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
          Our Impact By The Numbers
        </h2>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Measurable results that drive business growth
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: metric.id * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center px-4 py-8 bg-zinc-900/50 rounded-xl backdrop-blur-sm border border-zinc-800"
          >
            <div
              className={`text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}
            >
              <CountingNumber
                value={metric.value}
                startValue={metric.startValue}
                prefix={metric.prefix || ""}
                suffix={metric.suffix || ""}
              />
            </div>
            <div className="text-zinc-400">{metric.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SocialProof;
