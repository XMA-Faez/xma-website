"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  TrendingUp,
  ArrowRight,
  Quote,
  Building2,
  Car,
  Scissors,
  Home,
  PlayCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { ScanningButton } from "@/components/ui/ScanningButton";
import { Badge } from "@/components/ui/Badge";

interface SuccessStory {
  id: string;
  businessName: string;
  industry: string;
  location: string;
  owner: {
    name: string;
    title: string;
    image: string;
  };
  businessImage: string;
  testimonial: {
    quote: string;
    rating: number;
    videoTestimonial?: string;
  };
  metrics: {
    label: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  story: {
    challenge: string;
    solution: string;
    results: string[];
  };
  keyFeature: string;
  industry_icon: React.ReactNode;
}

const UAESuccessStories: React.FC = () => {
  const [activeStory, setActiveStory] = useState(0);
  // Video functionality will be implemented when video content is added
  // const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [autoPlay, setAutoPlay] = useState(true);

  const successStories: SuccessStory[] = [
    {
      id: 'dubai-auto-care',
      businessName: 'Dubai Premium Auto Care',
      industry: 'Automotive Services',
      location: 'Dubai, UAE',
      owner: {
        name: 'Mohammed Al Rashid',
        title: 'Operations Manager',
        image: 'mohammed-al-rashid.jpg'
      },
      businessImage: 'dubai-auto-care-exterior.jpg',
      testimonial: {
        quote: "The AI chatbot transformed our business overnight. It handles 90% of our WhatsApp inquiries automatically and books service appointments while we sleep. We've never missed a lead since implementing it.",
        rating: 5,
        videoTestimonial: 'mohammed-testimonial.mp4'
      },
      metrics: [
        {
          label: 'Response Time',
          before: '4-6 hours',
          after: 'Instant',
          improvement: '100% faster'
        },
        {
          label: 'Lead Conversion',
          before: '15%',
          after: '38%',
          improvement: '+153%'
        },
        {
          label: 'Monthly Bookings',
          before: '120',
          after: '285',
          improvement: '+137%'
        },
        {
          label: 'Customer Satisfaction',
          before: '3.2/5',
          after: '4.8/5',
          improvement: '+50%'
        }
      ],
      story: {
        challenge: "We were drowning in WhatsApp messages. During peak hours, we'd miss important service requests, and customers would go to competitors who responded faster. Our team was spending hours just responding to basic questions.",
        solution: "XMA's AI chatbot was trained on our service offerings, pricing, and availability. It automatically responds to inquiries, books appointments, sends confirmations, and escalates complex issues to our team with full context.",
        results: [
          "Zero missed leads - AI responds instantly 24/7",
          "90% of routine inquiries handled automatically",
          "Service bookings increased by 137% in 3 months",
          "Team focuses on actual service delivery, not admin tasks",
          "Customer satisfaction scores improved dramatically"
        ]
      },
      keyFeature: 'AI Chatbot with Appointment Booking',
      industry_icon: <Car className="w-6 h-6" />
    },
    {
      id: 'glow-beauty-lounge',
      businessName: 'Glow Beauty Lounge',
      industry: 'Beauty & Wellness',
      location: 'Abu Dhabi, UAE',
      owner: {
        name: 'Sarah Hassan',
        title: 'Founder & CEO',
        image: 'sarah-hassan.jpg'
      },
      businessImage: 'glow-beauty-lounge-interior.jpg',
      testimonial: {
        quote: "The AI chatbot books appointments 24/7 and sends automatic confirmations. Our customers are amazed by the instant, intelligent responses - they often think it's a real person! Our no-show rate dropped to almost zero.",
        rating: 5,
        videoTestimonial: 'sarah-testimonial.mp4'
      },
      metrics: [
        {
          label: 'Appointment Bookings',
          before: '60/month',
          after: '180/month',
          improvement: '+200%'
        },
        {
          label: 'No-Show Rate',
          before: '25%',
          after: '3%',
          improvement: '-88%'
        },
        {
          label: 'After-Hours Bookings',
          before: '0',
          after: '45/month',
          improvement: 'New revenue'
        },
        {
          label: 'Customer Reviews',
          before: '4.1/5',
          after: '4.9/5',
          improvement: '+20%'
        }
      ],
      story: {
        challenge: "Most of our customers message us after business hours asking about availability and pricing. We were losing bookings because we couldn't respond until the next day, and by then they'd booked elsewhere.",
        solution: "The AI chatbot knows our service menu, pricing, and real-time availability. It books appointments instantly, sends confirmations, and even handles rescheduling requests automatically.",
        results: [
          "24/7 appointment booking without staff intervention",
          "Automatic confirmation and reminder messages",
          "45 additional bookings per month from after-hours inquiries",
          "No-show rate dropped from 25% to just 3%",
          "Staff can focus on delivering amazing treatments"
        ]
      },
      keyFeature: 'Automated Appointment Management',
      industry_icon: <Scissors className="w-6 h-6" />
    },
    {
      id: 'emirates-real-estate',
      businessName: 'Emirates Prime Properties',
      industry: 'Real Estate',
      location: 'Sharjah, UAE',
      owner: {
        name: 'Ahmed Al Mansoori',
        title: 'Senior Partner',
        image: 'ahmed-al-mansoori.jpg'
      },
      businessImage: 'emirates-real-estate-office.jpg',
      testimonial: {
        quote: "Property inquiries come in at all hours. The AI chatbot qualifies leads, schedules viewings, and provides property details instantly. Our conversion rate doubled because we never miss a serious buyer.",
        rating: 5,
        videoTestimonial: 'ahmed-testimonial.mp4'
      },
      metrics: [
        {
          label: 'Lead Response Time',
          before: '6-12 hours',
          after: '< 30 seconds',
          improvement: '1440x faster'
        },
        {
          label: 'Qualified Leads',
          before: '35/month',
          after: '95/month',
          improvement: '+171%'
        },
        {
          label: 'Viewing Appointments',
          before: '25/month',
          after: '68/month',
          improvement: '+172%'
        },
        {
          label: 'Sales Conversion',
          before: '8%',
          after: '18%',
          improvement: '+125%'
        }
      ],
      story: {
        challenge: "Real estate moves fast in UAE. By the time we responded to property inquiries, serious buyers had already connected with competitors. We needed to qualify leads quickly and schedule viewings instantly.",
        solution: "Our AI chatbot asks qualifying questions, provides property details, shows availability, and books viewing appointments. It even sends property brochures and location maps automatically.",
        results: [
          "Instant response to all property inquiries",
          "Automatic lead qualification saves agent time",
          "Viewing appointments booked 24/7",
          "95 qualified leads per month vs. 35 before",
          "Sales conversion rate more than doubled"
        ]
      },
      keyFeature: 'Lead Qualification & Scheduling',
      industry_icon: <Building2 className="w-6 h-6" />
    },
    {
      id: 'home-masters',
      businessName: 'Home Masters UAE',
      industry: 'Home Services',
      location: 'Dubai, UAE',
      owner: {
        name: 'Fatima Al Zahra',
        title: 'Operations Director',
        image: 'fatima-al-zahra.jpg'
      },
      businessImage: 'home-masters-team.jpg',
      testimonial: {
        quote: "From AC repair to plumbing, customers get instant quotes and can book services immediately. The AI handles multiple service types and even reschedules appointments. Our efficiency increased dramatically.",
        rating: 5,
        videoTestimonial: 'fatima-testimonial.mp4'
      },
      metrics: [
        {
          label: 'Service Requests',
          before: '80/month',
          after: '220/month',
          improvement: '+175%'
        },
        {
          label: 'Quote Response Time',
          before: '2-4 hours',
          after: 'Instant',
          improvement: '100% faster'
        },
        {
          label: 'Booking Completion',
          before: '45%',
          after: '78%',
          improvement: '+73%'
        },
        {
          label: 'Customer Retention',
          before: '60%',
          after: '89%',
          improvement: '+48%'
        }
      ],
      story: {
        challenge: "Home service requests come in for different trades - plumbing, AC, electrical, cleaning. Managing quotes, scheduling, and coordinating different technicians was chaotic. Customers often went elsewhere due to slow responses.",
        solution: "The AI chatbot understands all our services, provides instant quotes based on service type and location, checks technician availability, and books appointments. It even handles emergency requests with priority scheduling.",
        results: [
          "Instant quotes for all home services",
          "Automatic technician scheduling based on location",
          "Emergency requests handled with priority",
          "220 service requests per month vs. 80 before",
          "Customer retention improved to 89%"
        ]
      },
      keyFeature: 'Multi-Service Quote & Scheduling System',
      industry_icon: <Home className="w-6 h-6" />
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setActiveStory(prev => (prev + 1) % successStories.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [autoPlay, successStories.length]);

  const nextStory = () => {
    setActiveStory((prev) => (prev + 1) % successStories.length);
    setAutoPlay(false);
  };

  const prevStory = () => {
    setActiveStory((prev) => (prev - 1 + successStories.length) % successStories.length);
    setAutoPlay(false);
  };

  const currentStory = successStories[activeStory];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="success" className="mb-6">
            <Star className="w-4 h-4" />
            Success Stories
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            Real Results from
            <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> UAE Businesses</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-zinc-400 max-w-3xl mx-auto">
            See how local businesses transformed their lead management and grew their revenue with our AI-powered CRM
          </p>
        </motion.div>

        {/* Story Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Story Content */}
              <div className="space-y-8">
                {/* Business Header */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-400/20 text-emerald-400">
                    {currentStory.industry_icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{currentStory.businessName}</h3>
                      <Badge variant="success" size="sm">
                        {currentStory.industry}
                      </Badge>
                    </div>
                    <p className="text-slate-500 dark:text-zinc-400">{currentStory.location}</p>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-emerald-500/30" />
                  <blockquote className="pl-6 text-lg text-slate-700 dark:text-zinc-300 italic leading-relaxed">
                    &quot;{currentStory.testimonial.quote}&quot;
                  </blockquote>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-4 pl-6">
                    <div className="flex gap-1">
                      {[...Array(currentStory.testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                      ))}
                    </div>
                    <span className="text-emerald-400 font-semibold">
                      {currentStory.testimonial.rating}.0/5
                    </span>
                  </div>

                  {/* Owner Info */}
                  <div className="flex items-center gap-3 mt-6 pl-6">
                    <div className="w-12 h-12 bg-slate-200 dark:bg-zinc-700 rounded-full flex items-center justify-center">
                      <span className="text-slate-900 dark:text-white font-medium">
                        {currentStory.owner.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{currentStory.owner.name}</p>
                      <p className="text-sm text-slate-500 dark:text-zinc-400">{currentStory.owner.title}</p>
                    </div>
                    {currentStory.testimonial.videoTestimonial && (
                      <button
                        onClick={() => {/* Video functionality to be implemented */}}
                        className="ml-auto flex items-center gap-2 px-3 py-2 rounded-lg glass-primary hover:glass-secondary transition-all duration-300 text-sm text-slate-700 dark:text-white"
                      >
                        <PlayCircle className="w-4 h-4" />
                        Video
                      </button>
                    )}
                  </div>
                </div>

                {/* Key Feature */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-400/5 border border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    <span className="font-semibold text-emerald-400">Key Feature Used</span>
                  </div>
                  <p className="text-slate-900 dark:text-white font-medium">{currentStory.keyFeature}</p>
                </div>
              </div>

              {/* Metrics & Visuals */}
              <div className="space-y-6">
                {/* Business Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-300 dark:border-zinc-800">
                  <div className="aspect-[4/3] bg-slate-100 dark:bg-zinc-800 flex items-center justify-center">
                    <div className="text-center text-slate-500 dark:text-zinc-400 p-8">
                      <Building2 className="w-16 h-16 mx-auto mb-4 text-slate-400 dark:text-zinc-600" />
                      <p className="font-medium">BUSINESS IMAGE:</p>
                      <p className="text-sm">{currentStory.businessImage}</p>
                      <p className="text-xs mt-2">Professional photo of {currentStory.businessName}</p>
                    </div>
                  </div>
                  
                  {/* Industry Badge */}
                  <div className="absolute top-4 right-4 px-3 py-2 bg-emerald-500 text-white rounded-full text-sm font-semibold shadow-lg">
                    {currentStory.industry}
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {currentStory.metrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-2xl glass-primary"
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-400 mb-1">
                          {metric.after}
                        </div>
                        <div className="text-xs text-slate-400 dark:text-zinc-500 mb-2">
                          was {metric.before}
                        </div>
                        <div className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                          {metric.label}
                        </div>
                        <div className="text-xs text-emerald-400 font-medium mt-1">
                          {metric.improvement}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <ScanningButton color="emerald" className="w-full" size="lg">
                  <div className="flex items-center gap-2 justify-center">
                    Get Similar Results
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </ScanningButton>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevStory}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full glass-primary hover:glass-secondary transition-all duration-300 flex items-center justify-center group"
          >
            <ChevronLeft className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={nextStory}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full glass-primary hover:glass-secondary transition-all duration-300 flex items-center justify-center group"
          >
            <ChevronRight className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Story Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {successStories.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveStory(index);
                setAutoPlay(false);
              }}
              className={`transition-all duration-300 ${
                activeStory === index
                  ? 'w-8 h-3 bg-emerald-500 rounded-full'
                  : 'w-3 h-3 bg-slate-300 dark:bg-zinc-700 hover:bg-slate-400 dark:hover:bg-zinc-600 rounded-full'
              }`}
            />
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="text-center p-6 rounded-2xl glass-primary">
            <div className="text-3xl font-bold text-emerald-400 mb-2">500+</div>
            <div className="text-slate-500 dark:text-zinc-400">UAE Businesses</div>
          </div>
          
          <div className="text-center p-6 rounded-2xl glass-primary">
            <div className="text-3xl font-bold text-emerald-400 mb-2">150%</div>
            <div className="text-slate-500 dark:text-zinc-400">Avg. Lead Increase</div>
          </div>
          
          <div className="text-center p-6 rounded-2xl glass-primary">
            <div className="text-3xl font-bold text-emerald-400 mb-2">24/7</div>
            <div className="text-slate-500 dark:text-zinc-400">AI Response Time</div>
          </div>
          
          <div className="text-center p-6 rounded-2xl glass-primary">
            <div className="text-3xl font-bold text-emerald-400 mb-2">4.9/5</div>
            <div className="text-slate-500 dark:text-zinc-400">Customer Satisfaction</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UAESuccessStories;
