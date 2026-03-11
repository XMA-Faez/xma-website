"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Section from "@/components/ui/section";
import { ScanningButton } from "@/components/ui/ScanningButton";
import axios from "axios";

const industryOptions = [
  "E-Commerce",
  "SaaS / Technology",
  "Professional Services",
  "Real Estate",
  "Healthcare",
  "Finance",
  "Education",
  "Hospitality",
  "Other",
];

const revenueOptions = [
  "Under $10K/month",
  "$10K - $50K/month",
  "$50K - $200K/month",
  "$200K - $1M/month",
  "$1M+/month",
];

const budgetOptions = [
  "Under $2K/month",
  "$2K - $5K/month",
  "$5K - $15K/month",
  "$15K - $50K/month",
  "$50K+/month",
];

interface FormData {
  companyName: string;
  website: string;
  industry: string;
  monthlyRevenue: string;
  marketingBudget: string;
  growthGoals: string;
}

export default function ApplicationFormClient() {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    website: "",
    industry: "",
    monthlyRevenue: "",
    marketingBudget: "",
    growthGoals: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post("/api/leads", {
        ...formData,
        source: "application_form",
      });
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectClasses =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-colors appearance-none";

  const inputClasses =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-colors";

  return (
    <div className="relative min-h-svh">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 0%, oklch(0.2 0.08 250 / 0.4), transparent 60%),
            linear-gradient(180deg, oklch(0.07 0 0), oklch(0.05 0 0))
          `,
        }}
      />

      <Section size="md" padding="lg" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Book a Call
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto">
            Applications are reviewed to ensure alignment and partnership fit.
            We&apos;ll be in touch within 48 hours.
          </p>
        </motion.div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-primary rounded-2xl p-12 text-center max-w-lg mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Application Received
            </h2>
            <p className="text-zinc-400">
              We&apos;ll review your application and reach out within 48 hours
              to discuss next steps.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass-primary rounded-2xl p-8 md:p-10 max-w-2xl mx-auto space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Your company"
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://yourcompany.com"
                  className={inputClasses}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Industry
              </label>
              <select
                name="industry"
                required
                value={formData.industry}
                onChange={handleChange}
                className={selectClasses}
              >
                <option value="" disabled>
                  Select your industry
                </option>
                {industryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Monthly Revenue
                </label>
                <select
                  name="monthlyRevenue"
                  required
                  value={formData.monthlyRevenue}
                  onChange={handleChange}
                  className={selectClasses}
                >
                  <option value="" disabled>
                    Select range
                  </option>
                  {revenueOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Monthly Marketing Budget
                </label>
                <select
                  name="marketingBudget"
                  required
                  value={formData.marketingBudget}
                  onChange={handleChange}
                  className={selectClasses}
                >
                  <option value="" disabled>
                    Select range
                  </option>
                  {budgetOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Growth Goals
              </label>
              <textarea
                name="growthGoals"
                required
                rows={4}
                value={formData.growthGoals}
                onChange={handleChange}
                placeholder="Tell us about your growth objectives and what you're looking to achieve..."
                className={inputClasses}
              />
            </div>

            <ScanningButton
              variant="primary"
              size="lg"
              color="blue"
              className="w-full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </ScanningButton>
          </motion.form>
        )}
      </Section>
    </div>
  );
}
