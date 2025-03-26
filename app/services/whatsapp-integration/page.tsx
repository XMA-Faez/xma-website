import React from "react";
import {
  MessageSquare,
  Bot,
  Zap,
  Users,
  Shield,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import CTAButton from "@/components/general/CTAButton";

const WhatsAppIntegrationPage = () => {
  const features = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI-Powered Chatbot",
      description: "Intelligent automated responses for 24/7 customer service",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Automated Messaging",
      description: "Scheduled and triggered message automation",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Lead Management",
      description: "Seamless integration with CRM for lead tracking",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Communication",
      description: "End-to-end encrypted business messaging",
    },
  ];

  const benefits = [
    {
      title: "Instant Response",
      description: "Never miss a customer inquiry",
      items: [
        "24/7 Availability",
        "Quick Response Time",
        "Automated Greetings",
        "Custom Welcome Messages",
      ],
    },
    {
      title: "Smart Automation",
      description: "Streamline your communication",
      items: [
        "Message Templates",
        "Scheduled Messages",
        "Auto-Reply Rules",
        "Custom Workflows",
      ],
    },
    {
      title: "Lead Generation",
      description: "Convert conversations into opportunities",
      items: [
        "Contact Collection",
        "Lead Qualification",
        "Integration with CRM",
        "Follow-up Automation",
      ],
    },
    {
      title: "Analytics & Insights",
      description: "Track and optimize performance",
      items: [
        "Message Analytics",
        "Response Metrics",
        "Conversion Tracking",
        "Performance Reports",
      ],
    },
  ];

  const packages = [
    {
      title: "Basic Integration",
      included: [
        "WhatsApp Business API Setup",
        "Basic Automated Responses",
        "CRM Integration",
        "Business Hour Messages",
      ],
    },
    {
      title: "Advanced Automation",
      included: [
        "AI Chatbot Configuration",
        "Custom Message Flows",
        "Lead Capture System",
        "Analytics Dashboard",
      ],
    },
    {
      title: "Premium Suite",
      included: [
        "Multi-Agent Support",
        "Advanced AI Capabilities",
        "Custom Integration",
        "Priority Support",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-0">
          <div className="w-full h-full bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center" />
        </div>
        <div className="relative z-20 text-center px-4">
          <h1 className="font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-6">
            WhatsApp Integration
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto">
            Automate your customer communication with intelligent WhatsApp
            solutions
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-sm border border-zinc-800/60 rounded-lg p-6 hover:border-red-600/50 transition-colors"
              >
                <div className="text-red-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800/60"
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-zinc-400 mb-4">{benefit.description}</p>
                <ul className="grid grid-cols-2 gap-2">
                  {benefit.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center gap-2 text-zinc-300"
                    >
                      <CheckCircle className="w-4 h-4 text-red-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div className="py-20 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Integration Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-sm border border-zinc-800/60 rounded-lg p-6 hover:border-red-600/50 transition-colors"
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  {pkg.title}
                </h3>
                <ul className="space-y-3">
                  {pkg.included.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center gap-2 text-zinc-300"
                    >
                      <Zap className="w-4 h-4 text-red-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Automate Your Communication?
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Transform your customer engagement with intelligent WhatsApp
            solutions
          </p>

          <CTAButton />
        </div>
      </div>
    </div>
  );
};

export default WhatsAppIntegrationPage;
