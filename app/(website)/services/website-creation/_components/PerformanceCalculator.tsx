"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Users,
  Clock,
  Target,
  ArrowRight,
  Info,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { ScanningButton } from "@/components/ui/ScanningButton";
import { Badge } from "@/components/ui/Badge";

const sanitizeNumericInput = (
  value: number,
  min: number,
  max: number,
): number => {
  if (isNaN(value) || !isFinite(value)) return min;
  return Math.max(min, Math.min(max, value));
};

interface PerformanceMetrics {
  currentLoadTime: number;
  monthlyVisitors: number;
  currentConversionRate: number;
  averageOrderValue: number;
}

interface PerformanceResults {
  projectedLoadTime: number;
  speedImprovementPercentage: number;
  additionalConversions: number;
  estimatedAdditionalRevenue: number;
  currentMonthlyRevenue: number;
  projectedMonthlyRevenue: number;
}

const validatePerformanceMetrics = (
  metrics: PerformanceMetrics,
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (metrics.currentLoadTime < 2 || metrics.currentLoadTime > 15) {
    errors.push("Load time must be between 2 and 15 seconds");
  }

  if (metrics.monthlyVisitors < 500 || metrics.monthlyVisitors > 50000) {
    errors.push("Monthly visitors must be between 500 and 50,000");
  }

  if (
    metrics.currentConversionRate < 0.5 ||
    metrics.currentConversionRate > 10
  ) {
    errors.push("Conversion rate must be between 0.5% and 10%");
  }

  if (metrics.averageOrderValue < 500 || metrics.averageOrderValue > 50000) {
    errors.push("Average order value must be between 500 and 50,000 AED");
  }

  return { isValid: errors.length === 0, errors };
};

const PerformanceCalculator: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    currentLoadTime: 6,
    monthlyVisitors: 5000,
    currentConversionRate: 2,
    averageOrderValue: 5000,
  });

  const [results, setResults] = useState<PerformanceResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const validation = useMemo(
    () => validatePerformanceMetrics(metrics),
    [metrics],
  );

  const calculatePerformance = useCallback(() => {
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors([]);
    setIsCalculating(true);

    setTimeout(() => {
      try {
        const sanitizedMetrics = {
          currentLoadTime: sanitizeNumericInput(
            metrics.currentLoadTime,
            2,
            15,
          ),
          monthlyVisitors: sanitizeNumericInput(
            metrics.monthlyVisitors,
            500,
            50000,
          ),
          currentConversionRate: sanitizeNumericInput(
            metrics.currentConversionRate,
            0.5,
            10,
          ),
          averageOrderValue: sanitizeNumericInput(
            metrics.averageOrderValue,
            500,
            50000,
          ),
        };

        const projectedLoadTime = 1.8;
        const speedImprovement =
          sanitizedMetrics.currentLoadTime - projectedLoadTime;
        const speedImprovementPercentage =
          (speedImprovement / sanitizedMetrics.currentLoadTime) * 100;

        const conversionBoostPerSecond = 0.07;
        const totalConversionBoost =
          speedImprovement * conversionBoostPerSecond;
        const improvedConversionRate =
          sanitizedMetrics.currentConversionRate * (1 + totalConversionBoost);

        const currentConversions =
          sanitizedMetrics.monthlyVisitors *
          (sanitizedMetrics.currentConversionRate / 100);
        const projectedConversions =
          sanitizedMetrics.monthlyVisitors * (improvedConversionRate / 100);
        const additionalConversions = projectedConversions - currentConversions;

        const currentMonthlyRevenue =
          currentConversions * sanitizedMetrics.averageOrderValue;
        const projectedMonthlyRevenue =
          projectedConversions * sanitizedMetrics.averageOrderValue;
        const estimatedAdditionalRevenue =
          projectedMonthlyRevenue - currentMonthlyRevenue;

        setResults({
          projectedLoadTime,
          speedImprovementPercentage,
          additionalConversions,
          estimatedAdditionalRevenue,
          currentMonthlyRevenue,
          projectedMonthlyRevenue,
        });
      } catch (error) {
        console.error("Performance calculation error:", error);
        setValidationErrors([
          "An error occurred during calculation. Please try again.",
        ]);
      } finally {
        setIsCalculating(false);
      }
    }, 1500);
  }, [metrics, validation]);

  const handleInputChange = useCallback(
    (field: keyof PerformanceMetrics, value: number) => {
      setMetrics((prev) => ({ ...prev, [field]: value }));
      setResults(null);
      setValidationErrors([]);
    },
    [],
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "AED",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const inputFields = [
    {
      label: "Current Load Time",
      field: "currentLoadTime" as keyof PerformanceMetrics,
      min: 2,
      max: 15,
      step: 0.5,
      suffix: "s",
      icon: <Clock className="w-4 h-4" />,
      tooltip: "How long your current website takes to fully load",
    },
    {
      label: "Monthly Visitors",
      field: "monthlyVisitors" as keyof PerformanceMetrics,
      min: 500,
      max: 50000,
      step: 500,
      suffix: "",
      icon: <Users className="w-4 h-4" />,
      tooltip: "Average number of unique visitors per month",
    },
    {
      label: "Current Conversion Rate",
      field: "currentConversionRate" as keyof PerformanceMetrics,
      min: 0.5,
      max: 10,
      step: 0.5,
      suffix: "%",
      icon: <Target className="w-4 h-4" />,
      tooltip: "Percentage of visitors who complete a booking or purchase",
    },
    {
      label: "Average Order Value",
      field: "averageOrderValue" as keyof PerformanceMetrics,
      min: 500,
      max: 50000,
      step: 500,
      suffix: " AED",
      icon: <DollarSign className="w-4 h-4" />,
      tooltip: "Average revenue per customer transaction",
    },
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
          <Badge variant="primary" className="mb-6">
            <Calculator className="w-4 h-4" />
            Performance Calculator
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Calculate Your
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Performance Impact
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            See exactly how a faster website translates to more conversions and
            revenue
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3
              className="text-2xl font-bold mb-6 text-white"
              id="perf-inputs-heading"
            >
              Your Current Metrics
            </h3>

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
                  <h4 className="text-red-400 font-semibold">
                    Please fix the following issues:
                  </h4>
                </div>
                <ul className="text-red-300 text-sm space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index}>&bull; {error}</li>
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
                    <span className="text-blue-400" aria-hidden="true">
                      {field.icon}
                    </span>
                    <label
                      htmlFor={`perf-input-${field.field}`}
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
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 w-64 z-10 shadow-lg"
                        role="tooltip"
                      >
                        {field.tooltip}
                      </div>
                    </div>
                  </div>
                  <span
                    className="text-blue-400 font-semibold"
                    aria-live="polite"
                  >
                    {metrics[field.field]}
                    {field.suffix}
                  </span>
                </div>

                <div className="relative">
                  <input
                    id={`perf-input-${field.field}`}
                    type="range"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={metrics[field.field]}
                    onChange={(e) =>
                      handleInputChange(field.field, parseFloat(e.target.value))
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "ArrowLeft" ||
                        e.key === "ArrowRight"
                      ) {
                        e.preventDefault();
                        const increment =
                          e.key === "ArrowRight" ? field.step : -field.step;
                        const newValue = metrics[field.field] + increment;
                        handleInputChange(field.field, newValue);
                      }
                    }}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer slider focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900 perf-slider"
                    aria-describedby={`perf-input-${field.field}-desc`}
                    aria-valuemin={field.min}
                    aria-valuemax={field.max}
                    aria-valuenow={metrics[field.field]}
                    aria-valuetext={`${metrics[field.field]}${field.suffix}`}
                    style={
                      {
                        "--progress": `${((metrics[field.field] - field.min) / (field.max - field.min)) * 100}%`,
                      } as React.CSSProperties
                    }
                  />
                  <style jsx>{`
                    .perf-slider {
                      background: linear-gradient(
                        to right,
                        oklch(0.62 0.19 260) 0%,
                        oklch(0.62 0.19 260) var(--progress),
                        oklch(0.27 0.01 260) var(--progress),
                        oklch(0.27 0.01 260) 100%
                      );
                    }

                    .slider::-webkit-slider-thumb {
                      appearance: none;
                      height: 20px;
                      width: 20px;
                      border-radius: 50%;
                      background: linear-gradient(
                        135deg,
                        oklch(0.62 0.19 260),
                        oklch(0.55 0.22 260)
                      );
                      border: 2px solid white;
                      cursor: pointer;
                      box-shadow: 0 4px 8px oklch(0.62 0.19 260 / 0.3);
                    }
                    .slider::-moz-range-thumb {
                      height: 20px;
                      width: 20px;
                      border-radius: 50%;
                      background: linear-gradient(
                        135deg,
                        oklch(0.62 0.19 260),
                        oklch(0.55 0.22 260)
                      );
                      border: 2px solid white;
                      cursor: pointer;
                      box-shadow: 0 4px 8px oklch(0.62 0.19 260 / 0.3);
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
                color="blue"
                onClick={calculatePerformance}
                disabled={isCalculating || !validation.isValid}
                className="w-full"
                size="lg"
                aria-describedby={
                  validationErrors.length > 0
                    ? "validation-errors"
                    : undefined
                }
              >
                {isCalculating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Calculating Impact...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Calculate My Impact
                  </div>
                )}
              </ScanningButton>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="sticky top-8">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Your Performance Projection
              </h3>

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
                      Adjust your metrics and click &quot;Calculate My
                      Impact&quot; to see your potential performance gains
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
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-500/20 to-sky-400/10 backdrop-blur-xl border border-blue-500/20">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-400 mb-2">
                          {formatCurrency(results.estimatedAdditionalRevenue)}
                        </div>
                        <div className="text-zinc-300 mb-4">
                          Additional Monthly Revenue
                        </div>
                        <div className="text-2xl font-semibold text-sky-300">
                          {formatCurrency(
                            results.estimatedAdditionalRevenue * 12,
                          )}{" "}
                          / year
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl glass-primary text-center">
                        <div className="text-2xl font-bold text-blue-400">
                          {results.projectedLoadTime}s
                        </div>
                        <div className="text-sm text-zinc-400">
                          Projected Load Time
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl glass-primary text-center">
                        <div className="text-2xl font-bold text-blue-400">
                          {Math.round(results.speedImprovementPercentage)}%
                        </div>
                        <div className="text-sm text-zinc-400">
                          Speed Improvement
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl glass-primary">
                      <h4 className="font-semibold mb-4 flex items-center gap-2 text-white">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                        Revenue Comparison
                      </h4>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-400">
                            Current Revenue
                          </span>
                          <span className="font-semibold text-white">
                            {formatCurrency(results.currentMonthlyRevenue)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-400">
                            With Faster Site
                          </span>
                          <span className="font-semibold text-blue-400">
                            {formatCurrency(results.projectedMonthlyRevenue)}
                          </span>
                        </div>
                        <div className="h-px bg-zinc-700 my-2" />
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-400">
                            Additional Conversions
                          </span>
                          <span className="font-bold text-blue-400">
                            +{Math.round(results.additionalConversions)}/mo
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-lg">
                          <span className="text-blue-400 font-semibold">
                            Revenue Increase
                          </span>
                          <span className="font-bold text-blue-400">
                            +
                            {Math.round(
                              ((results.projectedMonthlyRevenue -
                                results.currentMonthlyRevenue) /
                                results.currentMonthlyRevenue) *
                                100,
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center pt-4">
                      <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="text-blue-400 hover:text-blue-300 text-sm mb-4 flex items-center gap-1 mx-auto"
                      >
                        {showDetails ? "Hide" : "Show"} calculation details
                        <ArrowRight
                          className={`w-4 h-4 transition-transform ${showDetails ? "rotate-90" : ""}`}
                        />
                      </button>

                      <AnimatePresence>
                        {showDetails && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-xs text-zinc-500 bg-zinc-900/50 p-4 rounded-lg mb-4"
                          >
                            <p className="mb-2">
                              <strong>Assumptions:</strong>
                            </p>
                            <p>
                              &bull; Every 1-second speed improvement yields ~7%
                              more conversions
                            </p>
                            <p>
                              &bull; Target load time of 1.8s (sub-2-second
                              guarantee)
                            </p>
                            <p>
                              &bull; Based on Google/Deloitte research on page
                              speed impact
                            </p>
                            <p>
                              &bull; Actual results may vary based on industry
                              and traffic quality
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <ScanningButton
                        color="blue"
                        size="lg"
                        className="w-full"
                      >
                        <div className="flex items-center gap-2">
                          <Zap className="w-5 h-5" />
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

export default PerformanceCalculator;
