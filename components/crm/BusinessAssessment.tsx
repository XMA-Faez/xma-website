"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  X,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Users,
  BarChart3,
  Clock,
  Target,
  AlertTriangle,
  TrendingUp,
  Shield
} from "lucide-react";
import { ScanningButton } from "@/components/ui/ScanningButton";

interface Question {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    score: number;
    icon?: React.ReactNode;
  }[];
  category: 'leads' | 'process' | 'team' | 'technology';
}

interface AssessmentResult {
  score: number;
  maxScore: number;
  category: 'excellent' | 'good' | 'needs-improvement' | 'critical';
  title: string;
  description: string;
  recommendations: string[];
  urgency: 'low' | 'medium' | 'high';
}

const BusinessAssessment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const questions: Question[] = [
    {
      id: 'lead_volume',
      question: 'How many WhatsApp leads do you receive per month?',
      category: 'leads',
      options: [
        { value: 'low', label: 'Less than 20', score: 1, icon: <Users className="w-5 h-5" /> },
        { value: 'medium', label: '20-100', score: 2, icon: <Users className="w-5 h-5" /> },
        { value: 'high', label: '100-300', score: 3, icon: <Users className="w-5 h-5" /> },
        { value: 'very_high', label: 'More than 300', score: 4, icon: <Users className="w-5 h-5" /> }
      ]
    },
    {
      id: 'response_time',
      question: 'How quickly do you typically respond to WhatsApp inquiries?',
      category: 'process',
      options: [
        { value: 'instant', label: 'Within 5 minutes', score: 4, icon: <Clock className="w-5 h-5" /> },
        { value: 'fast', label: 'Within 1 hour', score: 3, icon: <Clock className="w-5 h-5" /> },
        { value: 'slow', label: '2-8 hours', score: 2, icon: <Clock className="w-5 h-5" /> },
        { value: 'very_slow', label: 'Next day or later', score: 1, icon: <Clock className="w-5 h-5" /> }
      ]
    },
    {
      id: 'lead_tracking',
      question: 'How do you currently track your WhatsApp leads?',
      category: 'technology',
      options: [
        { value: 'none', label: 'No tracking system', score: 1, icon: <X className="w-5 h-5" /> },
        { value: 'manual', label: 'Excel/Paper notes', score: 2, icon: <BarChart3 className="w-5 h-5" /> },
        { value: 'basic', label: 'Basic CRM system', score: 3, icon: <BarChart3 className="w-5 h-5" /> },
        { value: 'advanced', label: 'Integrated CRM with automation', score: 4, icon: <BarChart3 className="w-5 h-5" /> }
      ]
    },
    {
      id: 'conversion_rate',
      question: 'What percentage of WhatsApp leads convert to paying customers?',
      category: 'process',
      options: [
        { value: 'low', label: 'Less than 10%', score: 1, icon: <Target className="w-5 h-5" /> },
        { value: 'average', label: '10-20%', score: 2, icon: <Target className="w-5 h-5" /> },
        { value: 'good', label: '20-35%', score: 3, icon: <Target className="w-5 h-5" /> },
        { value: 'excellent', label: 'More than 35%', score: 4, icon: <Target className="w-5 h-5" /> }
      ]
    },
    {
      id: 'team_size',
      question: 'How many team members handle customer inquiries?',
      category: 'team',
      options: [
        { value: 'solo', label: 'Just me', score: 1, icon: <Users className="w-5 h-5" /> },
        { value: 'small', label: '2-3 people', score: 2, icon: <Users className="w-5 h-5" /> },
        { value: 'medium', label: '4-10 people', score: 3, icon: <Users className="w-5 h-5" /> },
        { value: 'large', label: 'More than 10', score: 4, icon: <Users className="w-5 h-5" /> }
      ]
    },
    {
      id: 'missed_leads',
      question: 'How often do you miss or lose track of potential customers?',
      category: 'process',
      options: [
        { value: 'never', label: 'Never', score: 4, icon: <CheckCircle className="w-5 h-5" /> },
        { value: 'rarely', label: 'Rarely (once a month)', score: 3, icon: <CheckCircle className="w-5 h-5" /> },
        { value: 'sometimes', label: 'Sometimes (weekly)', score: 2, icon: <AlertTriangle className="w-5 h-5" /> },
        { value: 'often', label: 'Often (daily)', score: 1, icon: <X className="w-5 h-5" /> }
      ]
    },
    {
      id: 'automation',
      question: 'Do you currently use any automation for customer communication?',
      category: 'technology',
      options: [
        { value: 'none', label: 'No automation at all', score: 1, icon: <X className="w-5 h-5" /> },
        { value: 'basic', label: 'Basic auto-responses', score: 2, icon: <MessageSquare className="w-5 h-5" /> },
        { value: 'moderate', label: 'Scheduled messages & templates', score: 3, icon: <MessageSquare className="w-5 h-5" /> },
        { value: 'advanced', label: 'AI chatbot with workflows', score: 4, icon: <MessageSquare className="w-5 h-5" /> }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
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
      const option = question.options.find(opt => opt.value === answer);
      return sum + (option?.score || 0);
    }, 0);

    const maxScore = questions.length * 4; // 4 is max score per question
    const percentage = (totalScore / maxScore) * 100;

    let category: AssessmentResult['category'];
    let title: string;
    let description: string;
    let urgency: AssessmentResult['urgency'];
    let recommendations: string[];

    if (percentage >= 85) {
      category = 'excellent';
      title = 'Excellent Lead Management';
      description = 'Your business has strong systems in place. Our CRM can help optimize and scale your already effective processes.';
      urgency = 'low';
      recommendations = [
        'Scale your operations with advanced AI automation',
        'Implement predictive analytics for lead scoring',
        'Add multi-channel integration for comprehensive coverage',
        'Enhance team collaboration with advanced workflows'
      ];
    } else if (percentage >= 65) {
      category = 'good';
      title = 'Good Foundation, Room for Growth';
      description = 'You have decent systems but significant opportunities for improvement. Our CRM could substantially boost your results.';
      urgency = 'medium';
      recommendations = [
        'Implement AI chatbot for instant responses',
        'Automate lead tracking and follow-ups',
        'Improve conversion rates with smarter workflows',
        'Reduce time spent on manual tasks'
      ];
    } else if (percentage >= 40) {
      category = 'needs-improvement';
      title = 'Significant Improvement Needed';
      description = 'Your current processes are losing you potential revenue. Our CRM could dramatically transform your lead management.';
      urgency = 'high';
      recommendations = [
        'Urgent need for automated lead tracking',
        'Implement instant WhatsApp responses',
        'Set up proper follow-up sequences',
        'Establish team collaboration systems',
        'Recover lost leads with better processes'
      ];
    } else {
      category = 'critical';
      title = 'Critical Issues Detected';
      description = 'Your lead management has serious gaps that are costing you significant revenue daily. Immediate action needed.';
      urgency = 'high';
      recommendations = [
        'URGENT: Stop losing leads with automated capture',
        'Implement instant response system immediately',
        'Set up basic tracking before you lose more revenue',
        'Get team organized with proper workflow systems',
        'Priority setup and training within 24 hours'
      ];
    }

    setResult({
      score: totalScore,
      maxScore,
      category,
      title,
      description,
      recommendations,
      urgency
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
      case 'excellent': return 'text-emerald-400';
      case 'good': return 'text-blue-400';
      case 'needs-improvement': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-zinc-400';
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case 'excellent': return 'from-emerald-500/20 to-green-400/10';
      case 'good': return 'from-blue-500/20 to-cyan-400/10';
      case 'needs-improvement': return 'from-yellow-500/20 to-orange-400/10';
      case 'critical': return 'from-red-500/20 to-pink-400/10';
      default: return 'from-zinc-500/20 to-zinc-400/10';
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Assessment Complete
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Your Business
              <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> Assessment Results</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`p-8 rounded-3xl bg-gradient-to-br ${getCategoryBg(result.category)} backdrop-blur-xl border border-emerald-500/20 mb-8`}
          >
            <div className="text-center mb-6">
              <div className="text-6xl font-bold mb-2">
                <span className={getCategoryColor(result.category)}>
                  {Math.round((result.score / result.maxScore) * 100)}%
                </span>
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${getCategoryColor(result.category)}`}>
                {result.title}
              </h3>
              <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
                {result.description}
              </p>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {['leads', 'process', 'team', 'technology'].map((category) => {
                const categoryQuestions = questions.filter(q => q.category === category);
                const categoryScore = categoryQuestions.reduce((sum, q) => {
                  const answer = answers[q.id];
                  const option = q.options.find(opt => opt.value === answer);
                  return sum + (option?.score || 0);
                }, 0);
                const categoryMax = categoryQuestions.length * 4;
                const categoryPercentage = (categoryScore / categoryMax) * 100;

                const categoryIcons = {
                  leads: <Users className="w-5 h-5" />,
                  process: <Target className="w-5 h-5" />,
                  team: <Users className="w-5 h-5" />,
                  technology: <BarChart3 className="w-5 h-5" />
                };

                return (
                  <div key={category} className="p-4 rounded-2xl glass-primary text-center">
                    <div className="text-emerald-400 mb-2 flex justify-center">
                      {categoryIcons[category as keyof typeof categoryIcons]}
                    </div>
                    <div className="text-2xl font-bold text-emerald-400 mb-1">
                      {Math.round(categoryPercentage)}%
                    </div>
                    <div className="text-sm text-zinc-400 capitalize">
                      {category}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recommendations */}
            <div className="mb-8">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Priority Recommendations
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
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full ${
                      result.urgency === 'high' ? 'bg-red-500' : 
                      result.urgency === 'medium' ? 'bg-yellow-500' : 'bg-emerald-500'
                    } flex items-center justify-center text-white text-sm font-bold`}>
                      {index + 1}
                    </div>
                    <span className="text-zinc-300">{rec}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ScanningButton color="emerald" size="lg">
                <div className="flex items-center gap-2">
                  Book Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </div>
              </ScanningButton>
              
              <button
                onClick={resetAssessment}
                className="px-8 py-4 rounded-2xl glass-primary hover:glass-secondary transition-all duration-300 hover:scale-105 font-medium"
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <BarChart3 className="w-4 h-4" />
            Business Assessment
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Assess Your
            <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> Lead Management</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Quick 7-question assessment to identify opportunities for improvement in your UAE business
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-zinc-400">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm text-emerald-400 font-medium">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-2 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full"
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
            <h3 className="text-2xl font-bold mb-8 text-center">
              {currentQuestion.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  className={`p-6 rounded-2xl text-left transition-all duration-300 hover:scale-[1.02] ${
                    answers[currentQuestion.id] === option.value
                      ? 'bg-gradient-to-br from-emerald-500/20 to-green-400/10 border border-emerald-500/30'
                      : 'glass-secondary hover:glass-primary'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 p-3 rounded-xl ${
                      answers[currentQuestion.id] === option.value
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${
                        answers[currentQuestion.id] === option.value
                          ? 'text-emerald-400'
                          : 'text-zinc-200'
                      }`}>
                        {option.label}
                      </div>
                    </div>
                    {answers[currentQuestion.id] === option.value && (
                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  currentStep === 0
                    ? 'opacity-50 cursor-not-allowed glass-primary'
                    : 'glass-primary hover:glass-secondary hover:scale-105'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </button>

              <ScanningButton
                color="emerald"
                onClick={nextStep}
                disabled={!canProceed}
                className={!canProceed ? 'opacity-50 cursor-not-allowed' : ''}
              >
                <div className="flex items-center gap-2">
                  {currentStep === questions.length - 1 ? 'Get Results' : 'Next Question'}
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

export default BusinessAssessment;