"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  MessageCircle,
  Phone,
  Eye,
  CheckCircle,
  Zap,
  Clock,
  TrendingUp,
  Shield,
  Users,
} from "lucide-react";
import { ScanningButton } from "@/components/ui/ScanningButton";
import Link from "next/link";

interface CTAVariant {
  id: string;
  type: "primary";
  title: string;
  subtitle?: string;
  buttons: {
    text: string;
    href: string;
    variant: "primary" | "secondary";
    icon: React.ReactNode;
    color?: "blue" | "emerald" | "purple" | "amber";
  }[];
  socialProof?: {
    metric: string;
    label: string;
    icon: React.ReactNode;
  }[];
  benefits?: string[];
}

interface WebCreationCTAProps {
  position: "testimonials" | "final";
}

const WebCreationCTA: React.FC<WebCreationCTAProps> = ({ position }) => {
  const ctaVariants: Record<string, CTAVariant> = {
    testimonials: {
      id: "social_proof",
      type: "primary",
      title: "See What Premium Performance Looks Like",
      subtitle: "Our websites consistently outperform industry standards",
      buttons: [
        {
          text: "View Portfolio",
          href: "/portfolio",
          variant: "primary",
          icon: <Eye className="w-5 h-5" />,
          color: "blue",
        },
        {
          text: "Call +971 50 363 6856",
          href: "tel:+971503636856",
          variant: "secondary",
          icon: <Phone className="w-5 h-5" />,
        },
      ],
      socialProof: [
        {
          metric: "95+",
          label: "PageSpeed",
          icon: <Zap className="w-4 h-4" />,
        },
        {
          metric: "Sub-2s",
          label: "Load Time",
          icon: <Clock className="w-4 h-4" />,
        },
        {
          metric: "40%",
          label: "More Conversions",
          icon: <TrendingUp className="w-4 h-4" />,
        },
      ],
    },
    final: {
      id: "comprehensive",
      type: "primary",
      title: "Ready to Stop Losing Customers to a Slow Website?",
      subtitle:
        "Book a free strategy call and get a custom performance audit",
      buttons: [
        {
          text: "Book Your Free Strategy Call",
          href: "/book",
          variant: "primary",
          icon: <Calendar className="w-5 h-5" />,
          color: "blue",
        },
        {
          text: "Chat on WhatsApp",
          href: "https://wa.me/971503636856",
          variant: "secondary",
          icon: <MessageCircle className="w-5 h-5" />,
        },
      ],
      socialProof: [
        {
          metric: "Free",
          label: "Audit",
          icon: <Shield className="w-4 h-4" />,
        },
        {
          metric: "No",
          label: "Templates",
          icon: <CheckCircle className="w-4 h-4" />,
        },
        {
          metric: "Ongoing",
          label: "Support",
          icon: <Users className="w-4 h-4" />,
        },
      ],
      benefits: [
        "Free website performance audit",
        "Custom design mockup",
        "Dedicated project manager",
        "90+ PageSpeed guaranteed",
      ],
    },
  };

  const activeVariant = ctaVariants[position];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative p-8 md:p-12 rounded-3xl backdrop-blur-xl border overflow-hidden bg-gradient-to-br from-blue-500/20 to-sky-400/10 border-blue-500/30"
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, oklch(0.62 0.19 260) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
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
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-zinc-300">
                  {benefit}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          {activeVariant.buttons.map((button, index) => (
            <div key={index}>
              <Link href={button.href}>
                {button.variant === "primary" ? (
                  <ScanningButton
                    color={button.color || "blue"}
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
            </div>
          ))}
        </motion.div>

        {activeVariant.socialProof && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 text-center"
          >
            {activeVariant.socialProof.map((proof, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-blue-400 mt-1.5">{proof.icon}</span>
                <div className="text-left">
                  <div className="font-bold text-lg text-blue-400">
                    {proof.metric}
                  </div>
                  <div className="text-xs text-zinc-400">
                    {proof.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default WebCreationCTA;
