"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  MessageSquare,
  Phone,
  PlayCircle,
  Clock,
  Shield,
  Star,
  Zap,
  Users,
  CheckCircle,
  Gift,
  TrendingUp,
} from "lucide-react";
import { ScanningButton } from "@/components/ui/ScanningButton";
import Link from "next/link";

interface CTAVariant {
  id: string;
  type: "primary" | "secondary" | "social_proof" | "urgency" | "value_prop";
  title: string;
  subtitle?: string;
  buttons: {
    text: string;
    href?: string;
    onClick?: () => void;
    variant: "primary" | "secondary";
    icon: React.ReactNode;
    color?: "blue" | "emerald" | "purple" | "amber";
  }[];
  socialProof?: {
    metric: string;
    label: string;
    icon: React.ReactNode;
  }[];
  urgency?: {
    text: string;
    timeLeft?: string;
  };
  benefits?: string[];
}

interface ProgressiveCTAProps {
  position: "hero" | "features" | "testimonials" | "pricing" | "final";
  scrollProgress?: number;
  userEngagement?: "low" | "medium" | "high";
}

const ProgressiveCTA: React.FC<ProgressiveCTAProps> = ({ position }) => {
  const [selectedVariant, setSelectedVariant] = useState<string>("default");
  const [isVisible] = useState(true);

  const ctaVariants: Record<string, CTAVariant[]> = {
    hero: [
      {
        id: "default",
        type: "primary",
        title: "Never Miss Another WhatsApp Lead",
        subtitle: "Join 500+ UAE businesses already using our AI-powered CRM",
        buttons: [
          {
            text: "Book Free Demo",
            href: "/book",
            variant: "primary",
            icon: <Calendar className="w-5 h-5" />,
          },
          {
            text: "Chat on WhatsApp",
            href: "https://wa.me/971501234567",
            variant: "secondary",
            icon: <MessageSquare className="w-5 h-5" />,
            color: "emerald",
          },
        ],
        socialProof: [
          {
            metric: "500+",
            label: "UAE Businesses",
            icon: <Users className="w-4 h-4" />,
          },
          {
            metric: "4.9/5",
            label: "Rating",
            icon: <Star className="w-4 h-4" />,
          },
          {
            metric: "24/7",
            label: "AI Support",
            icon: <Clock className="w-4 h-4" />,
          },
        ],
      },
    ],
    features: [
      {
        id: "value_focused",
        type: "value_prop",
        title: "Ready to Transform Your Lead Management?",
        subtitle: "See how these features can grow your business",
        buttons: [
          {
            text: "Calculate My ROI",
            onClick: () =>
              document
                .getElementById("roi-calculator")
                ?.scrollIntoView({ behavior: "smooth" }),
            variant: "primary",
            icon: <TrendingUp className="w-5 h-5" />,
            color: "purple",
          },
          {
            text: "Watch 2-Min Demo",
            onClick: () => {},
            variant: "secondary",
            icon: <PlayCircle className="w-5 h-5" />,
            color: "purple",
          },
        ],
        benefits: [
          "Setup in 24 hours",
          "14-day free trial",
          "No long-term contracts",
        ],
      },
    ],
    testimonials: [
      {
        id: "social_proof",
        type: "social_proof",
        title: "Join These Successful UAE Businesses",
        subtitle: "Get the same results they achieved",
        buttons: [
          {
            text: "Get Started Now",
            href: "/book",
            variant: "primary",
            icon: <ArrowRight className="w-5 h-5" />,
            color: "blue",
          },
          {
            text: "Call +971 50 123 4567",
            href: "tel:+971501234567",
            variant: "secondary",
            icon: <Phone className="w-5 h-5" />,
          },
        ],
        socialProof: [
          {
            metric: "150%",
            label: "Avg Lead Increase",
            icon: <TrendingUp className="w-4 h-4" />,
          },
          {
            metric: "67%",
            label: "More Conversions",
            icon: <CheckCircle className="w-4 h-4" />,
          },
          {
            metric: "3x",
            label: "Faster Response",
            icon: <Zap className="w-4 h-4" />,
          },
        ],
      },
    ],
    final: [
      {
        id: "comprehensive",
        type: "primary",
        title: "Ready to Never Miss Another Lead?",
        subtitle:
          "Join 500+ UAE businesses already growing with our AI-powered CRM",
        buttons: [
          {
            text: "Book Your Free Demo Now",
            href: "/book",
            variant: "primary",
            icon: <Calendar className="w-5 h-5" />,
          },
          {
            text: "Call +971 50 123 4567",
            href: "tel:+971501234567",
            variant: "secondary",
            icon: <Phone className="w-5 h-5" />,
            color: "emerald",
          },
        ],
        socialProof: [
          {
            metric: "24h",
            label: "Setup Time",
            icon: <Clock className="w-4 h-4" />,
          },
          {
            metric: "14 days",
            label: "Free Trial",
            icon: <Shield className="w-4 h-4" />,
          },
          {
            metric: "500+",
            label: "Happy Clients",
            icon: <Users className="w-4 h-4" />,
          },
        ],
        benefits: [
          "Setup in 24 hours or less",
          "14-day free trial with full features",
          "Dedicated UAE support team",
          "No long-term contracts required",
        ],
      },
    ],
  };

  const currentVariants = ctaVariants[position] || ctaVariants.hero;
  const activeVariant =
    currentVariants.find((v) => v.id === selectedVariant) || currentVariants[0];

  const getBackgroundStyle = (type: CTAVariant["type"]) => {
    switch (type) {
      case "urgency":
        return "bg-gradient-to-br from-red-500/20 to-orange-400/10 border-red-500/30";
      case "social_proof":
        return "bg-gradient-to-br from-blue-500/20 to-cyan-400/10 border-blue-500/30";
      case "value_prop":
        return "bg-gradient-to-br from-purple-500/20 to-pink-400/10 border-purple-500/30";
      default:
        return "bg-gradient-to-br from-emerald-500/20 to-teal-400/10 border-emerald-500/30";
    }
  };

  const getAccentColor = (type: CTAVariant["type"]) => {
    switch (type) {
      case "urgency":
        return "text-red-400";
      case "social_proof":
        return "text-blue-400";
      case "value_prop":
        return "text-purple-400";
      default:
        return "text-emerald-400";
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`relative p-8 md:p-12 rounded-3xl backdrop-blur-xl border overflow-hidden ${getBackgroundStyle(activeVariant.type)}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${activeVariant.type === "urgency" ? "rgb(239 68 68)" : "rgb(16 185 129)"} 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Urgency Timer */}
        {activeVariant.urgency && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-4 mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20"
          >
            <Clock className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-medium">
              {activeVariant.urgency.text}
            </span>
            <div className="font-mono text-xl font-bold text-red-400">
              {activeVariant.urgency.timeLeft}
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {activeVariant.title.split(" ").map((word, index) => {
              return <span key={index}>{word} </span>;
            })}
          </h2>

          {activeVariant.subtitle && (
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
              {activeVariant.subtitle}
            </p>
          )}
        </div>

        {/* Benefits List */}
        {activeVariant.benefits && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {activeVariant.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass-primary"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-zinc-300">{benefit}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          {activeVariant.buttons.map((button, index) => (
            <div key={index}>
              {button.href ? (
                <Link href={button.href}>
                  {button.variant === "primary" ? (
                    <ScanningButton
                      color={button.color || "emerald"}
                      size="md"
                      className="w-full sm:w-auto"
                    >
                      <div className="flex items-center gap-2">
                        {button.text}
                        {button.icon}
                      </div>
                    </ScanningButton>
                  ) : (
                    <ScanningButton
                      variant="secondary"
                      color={button.color || "blue"}
                      size="md"
                      className="w-full sm:w-auto"
                    >
                      {button.text}
                    </ScanningButton>
                  )}
                </Link>
              ) : button.variant === "primary" ? (
                <ScanningButton
                  color={button.color || "emerald"}
                  onClick={button.onClick}
                  className="w-full sm:w-auto"
                >
                  <div className="flex items-center gap-2">
                    {button.text}
                    {button.icon}
                  </div>
                </ScanningButton>
              ) : (
                <ScanningButton
                  variant="secondary"
                  color={button.color || "blue"}
                  className="w-full sm:w-auto"
                >
                  {button.text}
                </ScanningButton>
              )}
            </div>
          ))}
        </motion.div>

        {/* Social Proof */}
        {activeVariant.socialProof && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 text-center"
          >
            {activeVariant.socialProof.map((proof, index) => (
              <div key={index} className="flex gap-2">
                <span
                  className={`${getAccentColor(activeVariant.type)} mt-1.5`}
                >
                  {proof.icon}
                </span>
                <div className="text-left">
                  <div
                    className={`font-bold text-lg ${getAccentColor(activeVariant.type)}`}
                  >
                    {proof.metric}
                  </div>
                  <div className="text-xs text-zinc-400">{proof.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Variant Selector for Testing (only in development) */}
        {process.env.NODE_ENV === "development" &&
          currentVariants.length > 1 && (
            <div className="absolute top-4 right-4">
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="text-xs bg-zinc-800 border border-zinc-700 rounded px-2 py-1"
              >
                {currentVariants.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.type}
                  </option>
                ))}
              </select>
            </div>
          )}
      </div>
    </motion.div>
  );
};

export default ProgressiveCTA;
