"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Clock,
  Code,
  Gauge,
  Smartphone,
  FileEdit,
  Search,
  BarChart3,
  TrendingUp,
  Shield,
} from "lucide-react";
import { ScanningButton } from "@/components/ui/ScanningButton";
import { Badge } from "@/components/ui/Badge";

interface Question {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    score: number;
    icon?: React.ReactNode;
  }[];
  category: "age" | "platform" | "performance" | "content" | "seo" | "analytics" | "mobile";
}

interface AssessmentResult {
  score: number;
  maxScore: number;
  category: "excellent" | "good" | "needs-improvement" | "critical";
  title: string;
  description: string;
  recommendations: string[];
  urgency: "low" | "medium" | "high";
}

const WebCreationAssessment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const questions: Question[] = [
    {
      id: "website_age",
      question: "How old is your current website?",
      category: "age",
      options: [
        { value: "new", label: "Less than 1 year", score: 4, icon: <Clock className="w-5 h-5" /> },
        { value: "recent", label: "1-2 years", score: 3, icon: <Clock className="w-5 h-5" /> },
        { value: "aging", label: "2-4 years", score: 2, icon: <Clock className="w-5 h-5" /> },
        { value: "outdated", label: "4+ years", score: 1, icon: <Clock className="w-5 h-5" /> },
      ],
    },
    {
      id: "platform",
      question: "What platform is your website built on?",
      category: "platform",
      options: [
        { value: "wordpress", label: "WordPress", score: 2, icon: <Code className="w-5 h-5" /> },
        { value: "builder", label: "Wix / Squarespace", score: 1, icon: <Code className="w-5 h-5" /> },
        { value: "custom_html", label: "Custom HTML", score: 2, icon: <Code className="w-5 h-5" /> },
        { value: "modern", label: "Modern framework (React/Next.js)", score: 4, icon: <Code className="w-5 h-5" /> },
      ],
    },
    {
      id: "pagespeed",
      question: "What is your current PageSpeed score?",
      category: "performance",
      options: [
        { value: "poor", label: "Below 50", score: 1, icon: <Gauge className="w-5 h-5" /> },
        { value: "average", label: "50-70", score: 2, icon: <Gauge className="w-5 h-5" /> },
        { value: "good", label: "70-90", score: 3, icon: <Gauge className="w-5 h-5" /> },
        { value: "excellent", label: "90+", score: 4, icon: <Gauge className="w-5 h-5" /> },
      ],
    },
    {
      id: "mobile",
      question: "Is your website mobile-responsive?",
      category: "mobile",
      options: [
        { value: "none", label: "Not at all", score: 1, icon: <Smartphone className="w-5 h-5" /> },
        { value: "partial", label: "Partially", score: 2, icon: <Smartphone className="w-5 h-5" /> },
        { value: "mostly", label: "Mostly", score: 3, icon: <Smartphone className="w-5 h-5" /> },
        { value: "fully", label: "Fully optimized", score: 4, icon: <Smartphone className="w-5 h-5" /> },
      ],
    },
    {
      id: "content_management",
      question: "Can you update content without a developer?",
      category: "content",
      options: [
        { value: "no", label: "No, need developer", score: 1, icon: <FileEdit className="w-5 h-5" /> },
        { value: "limited", label: "Limited editing", score: 2, icon: <FileEdit className="w-5 h-5" /> },
        { value: "clunky", label: "CMS but clunky", score: 3, icon: <FileEdit className="w-5 h-5" /> },
        { value: "easy", label: "Easy self-service CMS", score: 4, icon: <FileEdit className="w-5 h-5" /> },
      ],
    },
    {
      id: "seo_strategy",
      question: "How does your website handle SEO?",
      category: "seo",
      options: [
        { value: "none", label: "No SEO", score: 1, icon: <Search className="w-5 h-5" /> },
        { value: "basic", label: "Basic meta tags", score: 2, icon: <Search className="w-5 h-5" /> },
        { value: "some", label: "Some optimization", score: 3, icon: <Search className="w-5 h-5" /> },
        { value: "comprehensive", label: "Comprehensive SEO strategy", score: 4, icon: <Search className="w-5 h-5" /> },
      ],
    },
    {
      id: "analytics",
      question: "Does your website have analytics tracking?",
      category: "analytics",
      options: [
        { value: "none", label: "No tracking", score: 1, icon: <BarChart3 className="w-5 h-5" /> },
        { value: "basic_ga", label: "Basic Google Analytics", score: 2, icon: <BarChart3 className="w-5 h-5" /> },
        { value: "ga_goals", label: "GA + Goals", score: 3, icon: <BarChart3 className="w-5 h-5" /> },
        { value: "full", label: "Full attribution + heatmaps", score: 4, icon: <BarChart3 className="w-5 h-5" /> },
      ],
    },
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateResult = () => {
    const totalScore = questions.reduce((sum, question) => {
      const answer = answers[question.id];
      const option = question.options.find((opt) => opt.value === answer);
      return sum + (option?.score || 0);
    }, 0);

    const maxScore = questions.length * 4;
    const percentage = (totalScore / maxScore) * 100;

    let category: AssessmentResult["category"];
    let title: string;
    let description: string;
    let urgency: AssessmentResult["urgency"];
    let recommendations: string[];

    if (percentage >= 85) {
      category = "excellent";
      title = "Your Website Is In Great Shape";
      description =
        "Your website has strong foundations. We can help push performance even further and add advanced features to maximize your conversions.";
      urgency = "low";
      recommendations = [
        "Implement advanced Core Web Vitals optimization",
        "Add A/B testing for conversion rate optimization",
        "Integrate heatmap analytics for UX insights",
        "Explore progressive web app capabilities",
      ];
    } else if (percentage >= 65) {
      category = "good";
      title = "Good Foundation, Clear Opportunities";
      description =
        "Your site works, but there are clear areas where modern tooling and optimization could significantly boost your results.";
      urgency = "medium";
      recommendations = [
        "Migrate to Next.js for better performance and SEO",
        "Implement a headless CMS for easier content management",
        "Optimize Core Web Vitals for better search rankings",
        "Add conversion tracking and analytics",
      ];
    } else if (percentage >= 40) {
      category = "needs-improvement";
      title = "Significant Upgrade Needed";
      description =
        "Your website is likely costing you customers. A modern rebuild could dramatically improve your performance, conversions, and brand perception.";
      urgency = "high";
      recommendations = [
        "Urgent: Rebuild on modern tech stack for speed",
        "Implement mobile-first responsive design",
        "Add proper SEO foundations and structured data",
        "Set up CMS for self-service content updates",
        "Install analytics to track and optimize conversions",
      ];
    } else {
      category = "critical";
      title = "Your Website Needs Immediate Attention";
      description =
        "Your website has critical issues that are actively driving customers away. Every day without action means lost revenue.";
      urgency = "high";
      recommendations = [
        "CRITICAL: Complete rebuild required immediately",
        "Your load times are losing you 53%+ of visitors",
        "Mobile users cannot use your site effectively",
        "No SEO means you are invisible to search engines",
        "No analytics means you are flying blind on performance",
      ];
    }

    setResult({
      score: totalScore,
      maxScore,
      category,
      title,
      description,
      recommendations,
      urgency,
    });

    setIsCompleted(true);
  };

  const resetAssessment = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
    setResult(null);
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const canProceed = answers[currentQuestion?.id];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "excellent":
        return "text-blue-400";
      case "good":
        return "text-sky-400";
      case "needs-improvement":
        return "text-yellow-400";
      case "critical":
        return "text-red-400";
      default:
        return "text-zinc-400";
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case "excellent":
        return "from-blue-500/20 to-sky-400/10";
      case "good":
        return "from-sky-500/20 to-cyan-400/10";
      case "needs-improvement":
        return "from-yellow-500/20 to-orange-400/10";
      case "critical":
        return "from-red-500/20 to-pink-400/10";
      default:
        return "from-zinc-500/20 to-zinc-400/10";
    }
  };

  if (isCompleted && result) {
    return (
      <div className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge variant="primary" className="mb-6">
              <Shield className="w-4 h-4" />
              Assessment Complete
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Your Website
              <span className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">
                {" "}
                Assessment Results
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`p-8 rounded-3xl bg-gradient-to-br ${getCategoryBg(result.category)} backdrop-blur-xl border border-blue-500/20 mb-8`}
          >
            <div className="text-center mb-6">
              <div className="text-6xl font-bold mb-2">
                <span className={getCategoryColor(result.category)}>
                  {Math.round((result.score / result.maxScore) * 100)}%
                </span>
              </div>
              <h3
                className={`text-2xl font-bold mb-2 ${getCategoryColor(result.category)}`}
              >
                {result.title}
              </h3>
              <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
                {result.description}
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-white">
                  Priority Recommendations
                </span>
              </h4>
              <div className="space-y-3">
                {result.recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl glass-primary"
                  >
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full ${
                        result.urgency === "high"
                          ? "bg-red-500"
                          : result.urgency === "medium"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      } flex items-center justify-center text-white text-sm font-bold`}
                    >
                      {index + 1}
                    </div>
                    <span className="text-zinc-300">
                      {rec}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ScanningButton color="blue" size="lg">
                <div className="flex items-center gap-2">
                  Book Free Strategy Call
                  <ArrowRight className="w-5 h-5" />
                </div>
              </ScanningButton>

              <button
                onClick={resetAssessment}
                className="px-8 py-4 rounded-2xl glass-primary hover:glass-secondary font-medium text-white"
              >
                Retake Assessment
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="primary" className="mb-6">
            <BarChart3 className="w-4 h-4" />
            Website Assessment
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Audit Your
            <span className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">
              {" "}
              Website Health
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Quick 7-question assessment to identify what your website is costing
            you
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-zinc-400">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm text-blue-400 font-medium">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-2 bg-gradient-to-r from-blue-500 to-sky-400 rounded-full"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-3xl glass-primary"
          >
            <h3 className="text-2xl font-bold mb-8 text-center text-white">
              {currentQuestion.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() =>
                    handleAnswer(currentQuestion.id, option.value)
                  }
                  className={`p-6 rounded-2xl text-left ${
                    answers[currentQuestion.id] === option.value
                      ? "bg-gradient-to-br from-blue-500/20 to-sky-400/10 border border-blue-500/30"
                      : "glass-secondary hover:glass-primary"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex-shrink-0 p-3 rounded-xl ${
                        answers[currentQuestion.id] === option.value
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <div
                        className={`font-medium ${
                          answers[currentQuestion.id] === option.value
                            ? "text-blue-400"
                            : "text-zinc-200"
                        }`}
                      >
                        {option.label}
                      </div>
                    </div>
                    {answers[currentQuestion.id] === option.value && (
                      <CheckCircle className="w-6 h-6 text-blue-400" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium ${
                  currentStep === 0
                    ? "opacity-50 cursor-not-allowed glass-primary text-zinc-500"
                    : "glass-primary hover:glass-secondary hover:scale-105 text-white"
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </button>

              <ScanningButton
                color="blue"
                onClick={nextStep}
                disabled={!canProceed}
                className={!canProceed ? "opacity-50 cursor-not-allowed" : ""}
              >
                <div className="flex items-center gap-2">
                  {currentStep === questions.length - 1
                    ? "Get Results"
                    : "Next Question"}
                  <ArrowRight className="w-5 h-5" />
                </div>
              </ScanningButton>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WebCreationAssessment;
