"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  BarChart3,
  Target,
  AlertTriangle,
  TrendingUp,
  Shield,
  DollarSign,
  Search,
  MousePointerClick,
  Layout,
  Settings,
} from "lucide-react";
import { ScanningButton } from "@/components/ui/ScanningButton";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

interface Question {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    score: number;
    icon?: React.ReactNode;
  }[];
  category: "budget" | "experience" | "tracking" | "optimization";
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

const LeadGenAssessment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const questions: Question[] = [
    {
      id: "ad_budget",
      question: "What is your monthly advertising budget?",
      category: "budget",
      options: [
        {
          value: "under_5k",
          label: "Less than 5,000 AED",
          score: 1,
          icon: <DollarSign className="w-5 h-5" />,
        },
        {
          value: "5k_15k",
          label: "5,000 - 15,000 AED",
          score: 2,
          icon: <DollarSign className="w-5 h-5" />,
        },
        {
          value: "15k_30k",
          label: "15,000 - 30,000 AED",
          score: 3,
          icon: <DollarSign className="w-5 h-5" />,
        },
        {
          value: "over_30k",
          label: "30,000+ AED",
          score: 4,
          icon: <DollarSign className="w-5 h-5" />,
        },
      ],
    },
    {
      id: "running_ads",
      question: "Are you currently running Google or Meta ads?",
      category: "experience",
      options: [
        {
          value: "no_ads",
          label: "No ads currently",
          score: 1,
          icon: <Search className="w-5 h-5" />,
        },
        {
          value: "just_started",
          label: "Just started",
          score: 2,
          icon: <Search className="w-5 h-5" />,
        },
        {
          value: "3_6_months",
          label: "Running 3-6 months",
          score: 3,
          icon: <Search className="w-5 h-5" />,
        },
        {
          value: "6_plus_months",
          label: "Running 6+ months",
          score: 4,
          icon: <Search className="w-5 h-5" />,
        },
      ],
    },
    {
      id: "conversion_tracking",
      question: "Do you have conversion tracking set up?",
      category: "tracking",
      options: [
        {
          value: "no_tracking",
          label: "No tracking",
          score: 1,
          icon: <MousePointerClick className="w-5 h-5" />,
        },
        {
          value: "basic_tracking",
          label: "Basic tracking",
          score: 2,
          icon: <MousePointerClick className="w-5 h-5" />,
        },
        {
          value: "advanced_tracking",
          label: "Advanced tracking",
          score: 3,
          icon: <MousePointerClick className="w-5 h-5" />,
        },
        {
          value: "full_attribution",
          label: "Full attribution",
          score: 4,
          icon: <MousePointerClick className="w-5 h-5" />,
        },
      ],
    },
    {
      id: "lead_handling",
      question: "How do you handle leads from your ads?",
      category: "optimization",
      options: [
        {
          value: "no_system",
          label: "No system",
          score: 1,
          icon: <Settings className="w-5 h-5" />,
        },
        {
          value: "manual_followup",
          label: "Manual follow-up",
          score: 2,
          icon: <Settings className="w-5 h-5" />,
        },
        {
          value: "basic_crm",
          label: "Basic CRM",
          score: 3,
          icon: <Settings className="w-5 h-5" />,
        },
        {
          value: "automated_crm",
          label: "Automated CRM",
          score: 4,
          icon: <Settings className="w-5 h-5" />,
        },
      ],
    },
    {
      id: "cpl_awareness",
      question: "Do you know your cost per lead?",
      category: "tracking",
      options: [
        {
          value: "no_idea",
          label: "No idea",
          score: 1,
          icon: <Target className="w-5 h-5" />,
        },
        {
          value: "rough_estimate",
          label: "Rough estimate",
          score: 2,
          icon: <Target className="w-5 h-5" />,
        },
        {
          value: "track_monthly",
          label: "Track monthly",
          score: 3,
          icon: <Target className="w-5 h-5" />,
        },
        {
          value: "track_realtime",
          label: "Track in real-time",
          score: 4,
          icon: <Target className="w-5 h-5" />,
        },
      ],
    },
    {
      id: "optimization_frequency",
      question: "How often do you optimize your campaigns?",
      category: "optimization",
      options: [
        {
          value: "never",
          label: "Never",
          score: 1,
          icon: <BarChart3 className="w-5 h-5" />,
        },
        {
          value: "monthly",
          label: "Monthly",
          score: 2,
          icon: <BarChart3 className="w-5 h-5" />,
        },
        {
          value: "weekly",
          label: "Weekly",
          score: 3,
          icon: <BarChart3 className="w-5 h-5" />,
        },
        {
          value: "daily_automated",
          label: "Daily with automation",
          score: 4,
          icon: <BarChart3 className="w-5 h-5" />,
        },
      ],
    },
    {
      id: "landing_pages",
      question: "Do you have landing pages for your ads?",
      category: "optimization",
      options: [
        {
          value: "homepage",
          label: "No, use homepage",
          score: 1,
          icon: <Layout className="w-5 h-5" />,
        },
        {
          value: "basic_pages",
          label: "Basic landing pages",
          score: 2,
          icon: <Layout className="w-5 h-5" />,
        },
        {
          value: "optimized_pages",
          label: "Optimized pages",
          score: 3,
          icon: <Layout className="w-5 h-5" />,
        },
        {
          value: "ab_tested",
          label: "A/B tested pages",
          score: 4,
          icon: <Layout className="w-5 h-5" />,
        },
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
      title = "Excellent Ad Readiness";
      description =
        "Your advertising operations are well-structured. Our team can help you scale and squeeze even more performance from your campaigns.";
      urgency = "low";
      recommendations = [
        "Scale winning campaigns with advanced bid strategies",
        "Implement cross-platform attribution modeling",
        "Explore new ad formats and placements",
        "Build predictive audience segments for expansion",
      ];
    } else if (percentage >= 65) {
      category = "good";
      title = "Good Foundation, Room for Growth";
      description =
        "You have a solid base but significant opportunities to improve ROAS and reduce cost per lead.";
      urgency = "medium";
      recommendations = [
        "Implement advanced conversion tracking and attribution",
        "Optimize campaign structure for better quality scores",
        "Build dedicated landing pages with A/B testing",
        "Set up automated bid adjustments and rules",
      ];
    } else if (percentage >= 40) {
      category = "needs-improvement";
      title = "Significant Improvement Needed";
      description =
        "Your current ad setup is likely wasting budget. Professional management could dramatically improve your results.";
      urgency = "high";
      recommendations = [
        "Urgent: Set up proper conversion tracking",
        "Restructure campaigns with focused ad groups",
        "Create targeted landing pages for each campaign",
        "Implement a lead management system",
        "Establish regular optimization cadence",
      ];
    } else {
      category = "critical";
      title = "Critical Issues Detected";
      description =
        "Your advertising has serious gaps that are burning budget daily. Immediate professional intervention is recommended.";
      urgency = "high";
      recommendations = [
        "URGENT: Pause underperforming campaigns to stop waste",
        "Install tracking pixels and conversion events immediately",
        "Get professional campaign audit before spending more",
        "Set up basic CRM to capture and follow up on leads",
        "Priority onboarding with dedicated account manager",
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
        return "text-amber-400";
      case "good":
        return "text-blue-400";
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
        return "from-amber-500/20 to-yellow-400/10";
      case "good":
        return "from-blue-500/20 to-cyan-400/10";
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
            <Badge variant="warning" className="mb-6">
              <Shield className="w-4 h-4" />
              Assessment Complete
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Your Ad Readiness
              <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                {" "}
                Assessment Results
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`p-8 rounded-3xl bg-gradient-to-br ${getCategoryBg(result.category)} backdrop-blur-xl border border-amber-500/20 mb-8`}
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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {(
                ["budget", "experience", "tracking", "optimization"] as const
              ).map((category) => {
                const categoryQuestions = questions.filter(
                  (q) => q.category === category
                );
                const categoryScore = categoryQuestions.reduce((sum, q) => {
                  const answer = answers[q.id];
                  const option = q.options.find(
                    (opt) => opt.value === answer
                  );
                  return sum + (option?.score || 0);
                }, 0);
                const categoryMax = categoryQuestions.length * 4;
                const categoryPercentage =
                  categoryMax > 0 ? (categoryScore / categoryMax) * 100 : 0;

                const categoryIcons = {
                  budget: <DollarSign className="w-5 h-5" />,
                  experience: <Search className="w-5 h-5" />,
                  tracking: <Target className="w-5 h-5" />,
                  optimization: <BarChart3 className="w-5 h-5" />,
                };

                return (
                  <div
                    key={category}
                    className="p-4 rounded-2xl glass-primary text-center"
                  >
                    <div className="text-amber-400 mb-2 flex justify-center">
                      {categoryIcons[category]}
                    </div>
                    <div className="text-2xl font-bold text-amber-400 mb-1">
                      {Math.round(categoryPercentage)}%
                    </div>
                    <div className="text-sm text-zinc-400 capitalize">
                      {category}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-400" />
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
                            : "bg-amber-500"
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
              <Link href="/book">
                <ScanningButton color="amber" size="lg">
                  <div className="flex items-center gap-2">
                    Book Free Ad Audit
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </ScanningButton>
              </Link>

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
          <Badge variant="warning" className="mb-6">
            <BarChart3 className="w-4 h-4" />
            Ad Readiness Assessment
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Assess Your
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              {" "}
              Ad Readiness
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Quick 7-question assessment to identify opportunities for improving
            your advertising performance
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-zinc-400">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm text-amber-400 font-medium">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-2 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
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
                      ? "bg-gradient-to-br from-amber-500/20 to-yellow-400/10 border border-amber-500/30"
                      : "glass-secondary hover:glass-primary"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex-shrink-0 p-3 rounded-xl ${
                        answers[currentQuestion.id] === option.value
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <div
                        className={`font-medium ${
                          answers[currentQuestion.id] === option.value
                            ? "text-amber-400"
                            : "text-zinc-200"
                        }`}
                      >
                        {option.label}
                      </div>
                    </div>
                    {answers[currentQuestion.id] === option.value && (
                      <CheckCircle className="w-6 h-6 text-amber-400" />
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
                color="amber"
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

export default LeadGenAssessment;
