"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Users,
  MessageSquare,
  ArrowRight,
  Info,
  AlertTriangle
} from "lucide-react";
import { ScanningButton } from "@/components/ui/ScanningButton";

// Input validation utilities
const sanitizeNumericInput = (value: number, min: number, max: number): number => {
  if (isNaN(value) || !isFinite(value)) return min;
  return Math.max(min, Math.min(max, value));
};

const validateROIMetrics = (metrics: ROIMetrics): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (metrics.currentLeads < 5 || metrics.currentLeads > 500) {
    errors.push('Lead count must be between 5 and 500');
  }
  
  if (metrics.conversionRate < 5 || metrics.conversionRate > 50) {
    errors.push('Conversion rate must be between 5% and 50%');
  }
  
  if (metrics.averageValue < 100 || metrics.averageValue > 10000) {
    errors.push('Average value must be between 100 and 10,000 AED');
  }
  
  if (metrics.responseTime < 0.5 || metrics.responseTime > 24) {
    errors.push('Response time must be between 0.5 and 24 hours');
  }
  
  return { isValid: errors.length === 0, errors };
};

interface ROIMetrics {
  currentLeads: number;
  conversionRate: number;
  averageValue: number;
  responseTime: number;
}

interface ROIResults {
  monthlyRevenue: number;
  improvedRevenue: number;
  additionalRevenue: number;
  annualIncrease: number;
  timesSaved: number;
  leadsRecovered: number;
}

const ROICalculator: React.FC = () => {
  const [metrics, setMetrics] = useState<ROIMetrics>({
    currentLeads: 50,
    conversionRate: 15,
    averageValue: 500,
    responseTime: 4
  });

  const [results, setResults] = useState<ROIResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Validate metrics whenever they change
  const validation = useMemo(() => validateROIMetrics(metrics), [metrics]);

  // Calculate ROI based on current metrics with validation
  const calculateROI = useCallback(() => {
    // Validate inputs before calculation
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }
    
    setValidationErrors([]);
    setIsCalculating(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      try {
        // Sanitize inputs as additional safety measure
        const sanitizedMetrics = {
          currentLeads: sanitizeNumericInput(metrics.currentLeads, 5, 500),
          conversionRate: sanitizeNumericInput(metrics.conversionRate, 5, 50),
          averageValue: sanitizeNumericInput(metrics.averageValue, 100, 10000),
          responseTime: sanitizeNumericInput(metrics.responseTime, 0.5, 24)
        };
        
        const currentMonthlyRevenue = (sanitizedMetrics.currentLeads * (sanitizedMetrics.conversionRate / 100) * sanitizedMetrics.averageValue);
        
        // Improvement factors based on industry data
        const improvedConversionRate = Math.min(sanitizedMetrics.conversionRate * 1.6, 45); // Up to 60% improvement
        const additionalLeads = sanitizedMetrics.responseTime > 2 ? sanitizedMetrics.currentLeads * 0.25 : sanitizedMetrics.currentLeads * 0.15; // Faster response = more leads
        const totalImprovedLeads = sanitizedMetrics.currentLeads + additionalLeads;
        
        const improvedMonthlyRevenue = (totalImprovedLeads * (improvedConversionRate / 100) * sanitizedMetrics.averageValue);
        const additionalRevenue = improvedMonthlyRevenue - currentMonthlyRevenue;
        const annualIncrease = additionalRevenue * 12;
        
        // Time saved calculation (hours per month)
        const timesSaved = sanitizedMetrics.currentLeads * (sanitizedMetrics.responseTime * 0.5) * 4; // 50% time reduction on responses
        const leadsRecovered = Math.floor(additionalLeads);

        setResults({
          monthlyRevenue: currentMonthlyRevenue,
          improvedRevenue: improvedMonthlyRevenue,
          additionalRevenue,
          annualIncrease,
          timesSaved,
          leadsRecovered
        });
      } catch (error) {
        console.error('ROI calculation error:', error);
        setValidationErrors(['An error occurred during calculation. Please try again.']);
      } finally {
        setIsCalculating(false);
      }
    }, 1500);
  }, [metrics, validation]);

  const handleInputChange = useCallback((field: keyof ROIMetrics, value: number) => {
    setMetrics(prev => ({ ...prev, [field]: value }));
    setResults(null); // Reset results when inputs change
    setValidationErrors([]); // Clear validation errors when user updates inputs
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const inputFields = [
    {
      label: "WhatsApp Leads per Month",
      field: "currentLeads" as keyof ROIMetrics,
      min: 5,
      max: 500,
      step: 5,
      suffix: "leads",
      icon: <Users className="w-4 h-4" />,
      tooltip: "Average number of WhatsApp inquiries you receive monthly"
    },
    {
      label: "Current Conversion Rate",
      field: "conversionRate" as keyof ROIMetrics,
      min: 5,
      max: 50,
      step: 1,
      suffix: "%",
      icon: <TrendingUp className="w-4 h-4" />,
      tooltip: "Percentage of leads that become paying customers"
    },
    {
      label: "Average Customer Value",
      field: "averageValue" as keyof ROIMetrics,
      min: 100,
      max: 10000,
      step: 50,
      suffix: "AED",
      icon: <DollarSign className="w-4 h-4" />,
      tooltip: "Average revenue per customer or project"
    },
    {
      label: "Average Response Time",
      field: "responseTime" as keyof ROIMetrics,
      min: 0.5,
      max: 24,
      step: 0.5,
      suffix: "hours",
      icon: <MessageSquare className="w-4 h-4" />,
      tooltip: "How long it takes to respond to WhatsApp messages"
    }
  ];

  return (
    <div className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <Calculator className="w-4 h-4" />
            ROI Calculator
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Calculate Your
            <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> Revenue Impact</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            See exactly how much additional revenue our CRM could generate for your UAE business
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6" id="roi-inputs-heading">
              Your Current Metrics
            </h3>
            
            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                role="alert"
                aria-live="polite"
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <h4 className="text-red-400 font-semibold">Please fix the following issues:</h4>
                </div>
                <ul className="text-red-300 text-sm space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </motion.div>
            )}
            
            {inputFields.map((field, index) => (
              <motion.div
                key={field.field}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400" aria-hidden="true">{field.icon}</span>
                    <label 
                      htmlFor={`roi-input-${field.field}`}
                      className="font-medium text-zinc-200"
                    >
                      {field.label}
                    </label>
                    <div className="group relative">
                      <button
                        type="button"
                        className="text-zinc-500 hover:text-zinc-400 focus:outline-none focus:text-zinc-400"
                        aria-label={`More information about ${field.label}`}
                      >
                        <Info className="w-4 h-4" />
                      </button>
                      <div 
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 w-64 z-10"
                        role="tooltip"
                      >
                        {field.tooltip}
                      </div>
                    </div>
                  </div>
                  <span className="text-emerald-400 font-semibold" aria-live="polite">
                    {metrics[field.field]}{field.suffix}
                  </span>
                </div>
                
                <div className="relative">
                  <input
                    id={`roi-input-${field.field}`}
                    type="range"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={metrics[field.field]}
                    onChange={(e) => handleInputChange(field.field, parseFloat(e.target.value))}
                    onKeyDown={(e) => {
                      // Allow keyboard navigation with arrow keys
                      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                        e.preventDefault();
                        const increment = e.key === 'ArrowRight' ? field.step : -field.step;
                        const newValue = metrics[field.field] + increment;
                        handleInputChange(field.field, newValue);
                      }
                    }}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer slider focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                    aria-describedby={`roi-input-${field.field}-desc`}
                    aria-valuemin={field.min}
                    aria-valuemax={field.max}
                    aria-valuenow={metrics[field.field]}
                    aria-valuetext={`${metrics[field.field]} ${field.suffix}`}
                    style={{
                      background: `linear-gradient(to right, 
                        rgb(16 185 129) 0%, 
                        rgb(16 185 129) ${((metrics[field.field] - field.min) / (field.max - field.min)) * 100}%, 
                        rgb(39 39 42) ${((metrics[field.field] - field.min) / (field.max - field.min)) * 100}%, 
                        rgb(39 39 42) 100%)`
                    }}
                  />
                  <style jsx>{`
                    .slider::-webkit-slider-thumb {
                      appearance: none;
                      height: 20px;
                      width: 20px;
                      border-radius: 50%;
                      background: linear-gradient(135deg, rgb(16 185 129), rgb(34 197 94));
                      border: 2px solid white;
                      cursor: pointer;
                      box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
                    }
                    .slider::-moz-range-thumb {
                      height: 20px;
                      width: 20px;
                      border-radius: 50%;
                      background: linear-gradient(135deg, rgb(16 185 129), rgb(34 197 94));
                      border: 2px solid white;
                      cursor: pointer;
                      box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
                    }
                  `}</style>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="pt-6"
            >
              <ScanningButton
                color="emerald"
                onClick={calculateROI}
                disabled={isCalculating || !validation.isValid}
                className="w-full"
                size="lg"
                aria-describedby={validationErrors.length > 0 ? "validation-errors" : undefined}
              >
                {isCalculating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Calculating ROI...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Calculate My ROI
                  </div>
                )}
              </ScanningButton>
            </motion.div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="sticky top-8">
              <h3 className="text-2xl font-bold mb-6">Your ROI Projection</h3>
              
              <AnimatePresence mode="wait">
                {!results ? (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 rounded-3xl glass-primary border-2 border-dashed border-zinc-700 text-center"
                  >
                    <Calculator className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                    <p className="text-zinc-500">
                      Adjust your metrics and click &quot;Calculate My ROI&quot; to see your potential revenue increase
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Main ROI Card */}
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-green-400/10 backdrop-blur-xl border border-emerald-500/20">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-emerald-400 mb-2">
                          {formatCurrency(results.additionalRevenue)}
                        </div>
                        <div className="text-zinc-300 mb-4">Additional Monthly Revenue</div>
                        <div className="text-2xl font-semibold text-green-300">
                          {formatCurrency(results.annualIncrease)} / year
                        </div>
                      </div>
                    </div>

                    {/* Detailed Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl glass-primary text-center">
                        <div className="text-2xl font-bold text-emerald-400">
                          +{results.leadsRecovered}
                        </div>
                        <div className="text-sm text-zinc-400">Leads Recovered</div>
                      </div>
                      
                      <div className="p-4 rounded-2xl glass-primary text-center">
                        <div className="text-2xl font-bold text-emerald-400">
                          {Math.round(results.timesSaved)}h
                        </div>
                        <div className="text-sm text-zinc-400">Time Saved</div>
                      </div>
                    </div>

                    {/* Revenue Comparison */}
                    <div className="p-6 rounded-2xl glass-primary">
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                        Revenue Comparison
                      </h4>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-400">Current Revenue</span>
                          <span className="font-semibold">{formatCurrency(results.monthlyRevenue)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-400">With Our CRM</span>
                          <span className="font-semibold text-emerald-400">{formatCurrency(results.improvedRevenue)}</span>
                        </div>
                        <div className="h-px bg-zinc-700 my-2" />
                        <div className="flex justify-between items-center text-lg">
                          <span className="text-emerald-400 font-semibold">Increase</span>
                          <span className="font-bold text-emerald-400">
                            +{Math.round(((results.improvedRevenue - results.monthlyRevenue) / results.monthlyRevenue) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center pt-4">
                      <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="text-emerald-400 hover:text-emerald-300 text-sm mb-4 flex items-center gap-1 mx-auto"
                      >
                        {showDetails ? 'Hide' : 'Show'} calculation details
                        <ArrowRight className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-90' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {showDetails && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-xs text-zinc-500 bg-zinc-900/50 p-4 rounded-lg mb-4"
                          >
                            <p className="mb-2"><strong>Assumptions:</strong></p>
                            <p>• 60% improvement in conversion rate with AI chatbot</p>
                            <p>• 15-25% more leads captured with faster response times</p>
                            <p>• 50% reduction in manual response time</p>
                            <p>• Based on industry averages for UAE service businesses</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <ScanningButton color="emerald" size="lg" className="w-full">
                        <div className="flex items-center gap-2">
                          Get Started Now
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </ScanningButton>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;