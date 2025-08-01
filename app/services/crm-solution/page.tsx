"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Users,
  BarChart3,
  Zap,
  Calendar,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Globe,
  CheckCircle,
  Star,
  Shield,
  TrendingUp,
  Clock,
  ChevronDown,
  Play,
  Smartphone,
  DollarSign,
  ArrowRight,
  Building2,
  Car,
  Scissors,
  Home,
  X,
  CheckSquare,
  FileText,
  Bell,
  Target,
  Layers,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ScanningButton } from "@/components/ui/ScanningButton";

const CRMSolutionsPage = () => {
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(null);

  const features = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "WhatsApp Business Integration",
      description: "Connect your WhatsApp Business account and automate responses to leads 24/7",
      highlights: [
        "Two-way WhatsApp messaging",
        "Automated welcome messages",
        "Quick reply templates",
        "Media sharing support",
      ],
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "AI-Powered Chatbot",
      description: "Advanced conversational AI that understands context and provides human-like responses",
      highlights: [
        "Multi-channel AI responses",
        "Custom training on your business",
        "Automatic appointment booking",
        "Smart handoff to human agents",
      ],
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Visual Sales Pipeline",
      description: "See exactly where each customer is in your sales process at a glance",
      highlights: [
        "Drag-and-drop pipeline",
        "AI-powered lead scoring",
        "Automated follow-ups",
        "Revenue forecasting",
      ],
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Smart Lead Management",
      description: "Never lose a lead again with AI-enhanced tracking and instant notifications",
      highlights: [
        "Automatic lead capture",
        "AI conversation analysis",
        "Custom tags & segments",
        "Real-time notifications",
      ],
    },
  ];

  const integrations = [
    { name: "WhatsApp Business", icon: <MessageSquare className="w-6 h-6" />, popular: true },
    { name: "Google Calendar", icon: <Calendar className="w-6 h-6" /> },
    { name: "Gmail", icon: <Mail className="w-6 h-6" /> },
    { name: "Facebook", icon: <Facebook className="w-6 h-6" /> },
    { name: "Instagram", icon: <Instagram className="w-6 h-6" /> },
    { name: "Zoom", icon: <Phone className="w-6 h-6" /> },
  ];

  const stats = [
    { number: "90%", label: "of UAE businesses use WhatsApp" },
    { number: "3x", label: "faster response time" },
    { number: "67%", label: "more leads converted" },
  ];

  const faqs = [
    {
      question: "How quickly can I set up WhatsApp integration?",
      answer: "WhatsApp Business integration takes just 5-10 minutes. Simply scan a QR code to connect your WhatsApp Business account, and you're ready to start receiving and managing leads directly in the CRM.",
    },
    {
      question: "Will this work with my existing WhatsApp Business number?",
      answer: "Yes! The CRM connects directly to your existing WhatsApp Business account. You keep your current number, and all your contacts remain intact. The system simply adds powerful automation and management features.",
    },
    {
      question: "What makes this different from regular WhatsApp Business?",
      answer: "While WhatsApp Business is great for basic messaging, our CRM adds lead tracking, automated responses, pipeline management, team collaboration, analytics, and integration with other marketing channels - all in one place.",
    },
    {
      question: "Is my customer data secure?",
      answer: "Absolutely. We use bank-level encryption and comply with UAE data protection regulations. Your data is stored securely and never shared with third parties. You have full control over data access and permissions.",
    },
    {
      question: "Can multiple team members use the system?",
      answer: "Yes! Add unlimited team members with different permission levels. Everyone can collaborate on leads, share notes, and track customer interactions while maintaining clear ownership and accountability.",
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer 24/7 support via WhatsApp, phone, and email. Plus, you get free onboarding, training videos in Arabic and English, and a dedicated success manager for the first month.",
    },
  ];

  const testimonials = [
    {
      name: "Ahmed Al Rashid",
      business: "Premium Auto Services",
      rating: 5,
      text: "The AI chatbot handles customer questions better than my staff. It never sleeps!",
    },
    {
      name: "Sarah Hassan",
      business: "Beauty & Wellness Spa",
      rating: 5,
      text: "AI books 95% of our appointments automatically. Customers love the instant responses.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-400/5 rounded-full blur-3xl animate-pulse animation-delay-4000" />
      </div>

      {/* Hero Section with Video Background */}
      <div className="relative pt-32 pb-20 px-4 min-h-[90vh] flex items-center">
        {/* Video Background Placeholder */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-900/60 to-zinc-950/80 z-10" />
          <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
            <p className="text-zinc-600 text-sm">VIDEO PLACEHOLDER: Add a background video showing WhatsApp notifications coming in and being managed in the CRM dashboard</p>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-20">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6"
          >
            <Shield className="w-4 h-4" />
            Trusted by 500+ UAE Businesses
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Stop Losing WhatsApp Leads to
            <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> Poor Follow-Up</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            The AI-powered CRM with advanced chatbot that connects WhatsApp, automates conversations, and turns more inquiries into paying customers for UAE service businesses
          </motion.p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/book">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-400 rounded-2xl font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105">
                <span className="relative z-10">Book Free Demo</span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>
            <a href="https://wa.me/971501234567" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold glass-primary hover:glass-secondary transition-all duration-300 hover:scale-105">
              <MessageSquare className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Hero Image/Screenshot */}
          <motion.div
            className="mt-12 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/20 border border-emerald-500/20">
              <div className="aspect-[16/9] bg-zinc-800 flex items-center justify-center">
                <p className="text-zinc-400 text-center p-8">
                  IMAGE PLACEHOLDER: CRM dashboard screenshot showing:<br/>
                  - WhatsApp conversation panel on the left<br/>
                  - Customer details in the center<br/>
                  - Sales pipeline on the right<br/>
                  - Clean, modern interface with emerald green accents
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Demo Section */}
      <div className="py-20 relative bg-gradient-to-b from-zinc-950 to-zinc-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              See It In
              <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> Action</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Watch our AI chatbot handle real customer conversations and book appointments automatically
            </p>
          </motion.div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/10 border border-emerald-500/20">
            <div className="aspect-[16/9] bg-zinc-900 flex items-center justify-center relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-center z-10">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-10 h-10 text-white ml-1" />
                </div>
                <p className="text-zinc-400">
                  VIDEO PLACEHOLDER: 2-3 minute AI chatbot demo showing:<br/>
                  - Customer asks question on WhatsApp<br/>
                  - AI chatbot provides intelligent response<br/>
                  - AI books appointment automatically<br/>
                  - Lead created with conversation context<br/>
                  - Smart handoff to human when needed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything You Need to
              <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> Manage Leads Better</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Built with advanced AI chatbot technology for UAE service businesses that rely on WhatsApp
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-8 rounded-3xl glass-primary hover:glass-secondary transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-400/20 text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-zinc-400 mb-6">{feature.description}</p>
                  
                  <ul className="space-y-2">
                    {feature.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-zinc-300">
                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Deep Dive: WhatsApp Integration */}
      <div className="py-20 relative bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                <MessageSquare className="w-4 h-4" />
                WhatsApp Integration
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Never Miss a WhatsApp Message
                <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> Again</span>
              </h2>
              <p className="text-xl text-zinc-300 mb-8">
                Connect your WhatsApp Business account in minutes and start managing all conversations from one powerful dashboard.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Two-Way Sync</h4>
                    <p className="text-zinc-400">Send and receive messages directly from the CRM. No need to switch between apps.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Auto-Create Contacts</h4>
                    <p className="text-zinc-400">Every new WhatsApp message automatically creates a lead in your CRM.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Team Inbox</h4>
                    <p className="text-zinc-400">Multiple team members can manage conversations without confusion.</p>
                  </div>
                </div>
              </div>

              <Link href="/book">
                <button className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-400 rounded-xl font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105">
                  See WhatsApp Features
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/20 border border-emerald-500/20">
                <div className="aspect-[4/5] bg-zinc-800 flex items-center justify-center">
                  <p className="text-zinc-400 text-center p-8">
                    IMAGE PLACEHOLDER: Mobile phone mockup showing:<br/>
                    - WhatsApp Business conversation<br/>
                    - CRM integration notifications<br/>
                    - Automated responses being sent<br/>
                    - Contact info synced with CRM<br/>
                    (Show iPhone with WhatsApp Business UI)
                  </p>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-semibold shadow-lg">
                Live Sync
              </div>
              <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-400 text-white rounded-full text-sm font-semibold shadow-lg">
                5 Min Setup
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* AI Chatbot Deep Dive */}
      <div className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                AI Chatbot
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Conversational AI That
                <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> Actually Understands</span>
              </h2>
              <p className="text-xl text-zinc-300 mb-8">
                Our advanced AI chatbot learns your business inside and out, providing human-like responses across WhatsApp, SMS, Facebook, Instagram, and live chat.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Smart Training System</h4>
                    <p className="text-zinc-400">Train the AI on your website, FAQs, and business documents for accurate responses.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Multi-Channel Intelligence</h4>
                    <p className="text-zinc-400">One AI brain that works across WhatsApp, SMS, Facebook, Instagram, and live chat.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Automatic Appointment Booking</h4>
                    <p className="text-zinc-400">AI books appointments directly from conversations and sends confirmations.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Smart Handoff to Humans</h4>
                    <p className="text-zinc-400">AI knows when to transfer complex queries to your team with full context.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/book">
                  <button className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-400 rounded-xl font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105">
                    See AI Chatbot Demo
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <div className="px-4 py-2 rounded-xl glass-primary text-sm text-zinc-300">
                  <span className="text-emerald-400 font-semibold">24/7 AI Support</span> • No breaks, no sick days
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/20 border border-emerald-500/20">
                <div className="aspect-[4/5] bg-zinc-800 flex items-center justify-center">
                  <p className="text-zinc-400 text-center p-8">
                    IMAGE PLACEHOLDER: AI chatbot interface showing:<br/>
                    - Multi-channel conversation view<br/>
                    - AI responses being generated<br/>
                    - Smart suggestions and training options<br/>
                    - Appointment booking in action<br/>
                    (Show modern chat interface with AI indicators)
                  </p>
                </div>
              </div>
              
              {/* AI Stats Floating Cards */}
              <div className="absolute -top-4 -right-4 px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-semibold shadow-lg">
                95% Accuracy
              </div>
              <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-400 text-white rounded-full text-sm font-semibold shadow-lg">
                Instant Response
              </div>
              <div className="absolute top-1/2 -left-6 px-3 py-2 bg-zinc-900 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-medium shadow-lg">
                Multi-Bot Support
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Dashboard Showcase */}
      <div className="py-20 relative bg-gradient-to-b from-zinc-950 to-zinc-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              A Dashboard That
              <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> Makes Sense</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Everything you need to see at a glance, nothing you don't
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* Main Dashboard View */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/10 border border-emerald-500/20"
            >
              <div className="aspect-[16/10] bg-zinc-800 flex items-center justify-center">
                <p className="text-zinc-400 text-center p-8">
                  IMAGE PLACEHOLDER: Full CRM dashboard showing:<br/>
                  - Left sidebar with navigation<br/>
                  - Central area with conversation list<br/>
                  - Right panel with contact details<br/>
                  - Top bar with search and notifications<br/>
                  - Clean, modern design with emerald accents<br/>
                  - Show actual metrics and charts
                </p>
              </div>
            </motion.div>

            {/* Feature Screenshots Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden border border-zinc-800 hover:border-emerald-500/30 transition-colors"
              >
                <div className="aspect-[4/3] bg-zinc-800 flex items-center justify-center">
                  <p className="text-zinc-400 text-center p-4 text-sm">
                    IMAGE: Pipeline view with<br/>drag-and-drop cards
                  </p>
                </div>
                <div className="p-4 bg-zinc-900/50">
                  <h4 className="font-semibold mb-1">Visual Pipeline</h4>
                  <p className="text-sm text-zinc-400">Drag contacts between stages</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden border border-zinc-800 hover:border-emerald-500/30 transition-colors"
              >
                <div className="aspect-[4/3] bg-zinc-800 flex items-center justify-center">
                  <p className="text-zinc-400 text-center p-4 text-sm">
                    IMAGE: Analytics dashboard<br/>with charts and metrics
                  </p>
                </div>
                <div className="p-4 bg-zinc-900/50">
                  <h4 className="font-semibold mb-1">Real-Time Analytics</h4>
                  <p className="text-sm text-zinc-400">Track performance instantly</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden border border-zinc-800 hover:border-emerald-500/30 transition-colors"
              >
                <div className="aspect-[4/3] bg-zinc-800 flex items-center justify-center">
                  <p className="text-zinc-400 text-center p-4 text-sm">
                    IMAGE: Team collaboration<br/>view with assignments
                  </p>
                </div>
                <div className="p-4 bg-zinc-900/50">
                  <h4 className="font-semibold mb-1">Team Collaboration</h4>
                  <p className="text-sm text-zinc-400">Work together seamlessly</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Perfect for
              <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> UAE Service Businesses</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              See how different businesses use our CRM to grow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Building2 className="w-8 h-8" />,
                title: "Real Estate Agencies",
                description: "Track property inquiries, schedule viewings, and nurture buyers through the entire journey",
                metric: "AI handles 80% of inquiries",
              },
              {
                icon: <Car className="w-8 h-8" />,
                title: "Auto Services",
                description: "Manage service bookings, send maintenance reminders, and build customer loyalty",
                metric: "AI books 90% of appointments",
              },
              {
                icon: <Scissors className="w-8 h-8" />,
                title: "Beauty & Wellness",
                description: "Handle appointment requests, send confirmations, and fill cancelled slots automatically",
                metric: "AI reduces no-shows by 60%",
              },
              {
                icon: <Home className="w-8 h-8" />,
                title: "Home Services",
                description: "Quote requests, job scheduling, and follow-up all managed from one platform",
                metric: "AI responds in under 10 seconds",
              },
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl glass-primary hover:glass-secondary transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-400/20 text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
                <p className="text-zinc-400 text-sm mb-4">{useCase.description}</p>
                <div className="pt-4 border-t border-zinc-800">
                  <p className="text-sm font-semibold text-emerald-400">{useCase.metric}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Before/After Comparison */}
      <div className="py-20 relative bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              The Difference Is
              <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> Clear</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-zinc-900/50 border border-red-500/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <X className="w-8 h-8 text-red-500" />
                <h3 className="text-2xl font-bold">Without Our CRM</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">Juggling between WhatsApp, Excel, and Email</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">Losing track of conversations and follow-ups</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">No idea which marketing campaigns work</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">Team confusion about who's handling what</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">Customers complaining about slow responses</span>
                </li>
              </ul>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-green-400/5 border border-emerald-500/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <CheckSquare className="w-8 h-8 text-emerald-400" />
                <h3 className="text-2xl font-bold">With Our CRM</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">All customer data in one searchable place</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">Automated follow-ups that never miss</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">Clear ROI tracking for every campaign</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">Team collaboration with zero confusion</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">5-star reviews for lightning-fast service</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Advanced Features Grid */}
      <div className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Powerful Features for
              <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> Growing Teams</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: "AI Conversation Analysis",
                description: "AI analyzes every conversation to identify hot leads and buying signals",
                image: "AI conversation analysis dashboard with sentiment indicators",
              },
              {
                icon: <Bell className="w-6 h-6" />,
                title: "Smart Reply Suggestions",
                description: "AI suggests contextual responses or lets you choose auto-pilot mode",
                image: "Smart reply interface with AI-generated suggestions",
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: "Multi-Bot Management",
                description: "Deploy specialized AI bots for different conversation types",
                image: "Multi-bot dashboard with different AI personalities",
              },
              {
                icon: <Layers className="w-6 h-6" />,
                title: "Custom AI Training",
                description: "Train AI bots on your specific business knowledge and FAQs",
                image: "AI training interface with knowledge base setup",
              },
              {
                icon: <RefreshCw className="w-6 h-6" />,
                title: "Workflow AI Integration",
                description: "AI bots trigger automated workflows based on conversation context",
                image: "Workflow builder with AI trigger points",
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: "AI-Powered Forms",
                description: "Dynamic forms that adapt based on AI conversation insights",
                image: "Smart form interface with AI-driven field population",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl glass-primary hover:glass-secondary transition-all duration-300"
              >
                <div className="aspect-[16/10] bg-zinc-800 flex items-center justify-center border-b border-zinc-700">
                  <p className="text-zinc-500 text-xs text-center p-4">
                    IMAGE: {feature.image}
                  </p>
                </div>
                <div className="p-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-400/20 text-emerald-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-zinc-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Integrations Section */}
      <div className="py-20 relative bg-gradient-to-b from-zinc-950 to-zinc-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Connects With All Your
              <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> Business Tools</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              One platform to manage all your customer communications
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="relative p-6 rounded-2xl glass-primary hover:glass-secondary transition-all duration-300 hover:scale-105 text-center">
                  {integration.popular && (
                    <span className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-emerald-500 to-green-400 text-white text-xs font-semibold rounded-full">
                      Popular
                    </span>
                  )}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-400/20 text-emerald-400 mb-3 mx-auto">
                    {integration.icon}
                  </div>
                  <p className="text-sm font-medium text-zinc-300">{integration.name}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-zinc-400 mb-4">Don't see your tool?</p>
            <Link href="/contact" className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-2 group">
              Request an integration
              <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Onboarding Process */}
      <div className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Get Started in
              <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> 24 Hours</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Our proven onboarding process gets you up and running fast
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-emerald-500 to-green-400 hidden lg:block" />
            
            <div className="space-y-12">
              {[
                {
                  day: "Day 1",
                  title: "Account Setup & WhatsApp Connection",
                  description: "We'll set up your account, connect WhatsApp Business, and import your existing contacts",
                  icon: <MessageSquare className="w-6 h-6" />,
                },
                {
                  day: "Day 2",
                  title: "Team Training & Customization",
                  description: "Your team learns the system while we customize pipelines for your business",
                  icon: <Users className="w-6 h-6" />,
                },
                {
                  day: "Day 3",
                  title: "Automation Setup",
                  description: "Configure automated responses, follow-ups, and workflows",
                  icon: <Zap className="w-6 h-6" />,
                },
                {
                  day: "Week 1",
                  title: "Go Live & Optimization",
                  description: "Start managing leads while we fine-tune based on your feedback",
                  icon: <Target className="w-6 h-6" />,
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <div className="flex-1 text-right hidden lg:block">
                    {index % 2 === 0 && (
                      <div>
                        <p className="text-emerald-400 font-semibold mb-2">{step.day}</p>
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-zinc-400">{step.description}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-400 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/25">
                      {step.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1 lg:hidden">
                    <p className="text-emerald-400 font-semibold mb-2">{step.day}</p>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-zinc-400">{step.description}</p>
                  </div>
                  
                  <div className="flex-1 hidden lg:block">
                    {index % 2 === 1 && (
                      <div>
                        <p className="text-emerald-400 font-semibold mb-2">{step.day}</p>
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-zinc-400">{step.description}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 relative bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Frequently Asked
              <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full p-6 rounded-2xl glass-primary hover:glass-secondary transition-all duration-300 text-left group"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                    <ChevronDown className={`w-5 h-5 text-emerald-400 transition-transform duration-300 flex-shrink-0 ${
                      openFAQ === index ? "rotate-180" : ""
                    }`} />
                  </div>
                  {openFAQ === index && (
                    <p className="mt-4 text-zinc-400 leading-relaxed">{faq.answer}</p>
                  )}
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-zinc-400 mb-4">Still have questions?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/971501234567" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-primary hover:glass-secondary transition-all duration-300">
                <MessageSquare className="w-5 h-5" />
                Ask on WhatsApp
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-primary hover:glass-secondary transition-all duration-300">
                <Mail className="w-5 h-5" />
                Email Support
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Success Stories from
              <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> UAE Businesses</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                business: "Dubai Auto Care",
                industry: "Auto Services",
                image: "Happy customer at auto service center",
                quote: "The AI chatbot changed everything. It handles 90% of our WhatsApp inquiries automatically and even books service appointments while we sleep. We've never missed a lead since.",
                name: "Mohammed Al Rashid",
                title: "Operations Manager",
                metrics: [
                  { label: "AI Response Rate", value: "100%", previous: "60%" },
                  { label: "Auto Bookings", value: "90%", previous: "20%" },
                  { label: "24/7 Coverage", value: "100%", previous: "40%" },
                ],
              },
              {
                business: "Glow Beauty Lounge",
                industry: "Beauty & Wellness",
                image: "Modern beauty salon interior",
                quote: "The AI chatbot books appointments 24/7 and sends automatic WhatsApp confirmations. Our customers are amazed by the instant, intelligent responses - they often think it's a real person!",
                name: "Sarah Hassan",
                title: "Founder",
                metrics: [
                  { label: "AI Accuracy", value: "95%", previous: "N/A" },
                  { label: "Instant Responses", value: "24/7", previous: "9-5" },
                  { label: "Customer Satisfaction", value: "4.8/5", previous: "3.2/5" },
                ],
              },
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="rounded-3xl overflow-hidden glass-primary hover:glass-secondary transition-all duration-300"
              >
                <div className="aspect-[16/9] bg-zinc-800 flex items-center justify-center">
                  <p className="text-zinc-400 text-center p-4">
                    IMAGE: {story.image}
                  </p>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-full">
                      {story.industry}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">{story.business}</h3>
                  
                  <p className="text-zinc-300 mb-6 italic">"{story.quote}"</p>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-zinc-700 rounded-full" />
                    <div>
                      <p className="font-semibold">{story.name}</p>
                      <p className="text-sm text-zinc-400">{story.title}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800">
                    {story.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <p className="text-2xl font-bold text-emerald-400">{metric.value}</p>
                        <p className="text-xs text-zinc-500">{metric.label}</p>
                        <p className="text-xs text-zinc-600">was {metric.previous}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-green-400/10 backdrop-blur-xl border border-emerald-500/20 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Never Miss
                <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> Another Lead?</span>
              </h2>
              
              <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
                Join 500+ UAE businesses already using our AI-powered CRM to automate conversations and grow faster
              </p>

              {/* Testimonials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="p-4 rounded-xl glass-primary text-left">
                    <div className="flex gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                      ))}
                    </div>
                    <p className="text-zinc-300 text-sm mb-2">"{testimonial.text}"</p>
                    <p className="text-xs text-zinc-500">
                      {testimonial.name}, {testimonial.business}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Link href="/book">
                  <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-400 rounded-2xl font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105">
                    <span className="relative z-10">Book Your Free Demo Now</span>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </Link>
                <a href="tel:+971501234567" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold glass-primary hover:glass-secondary transition-all duration-300 hover:scale-105">
                  <Phone className="w-5 h-5" />
                  Call +971 50 123 4567
                </a>
              </div>

              <div className="flex items-center justify-center gap-6 text-sm text-zinc-400">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Setup in 24 hours
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  14-day free trial
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CRMSolutionsPage;