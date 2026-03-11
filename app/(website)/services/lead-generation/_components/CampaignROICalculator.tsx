"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  ArrowRight,
  Info,
  AlertTriangle,
} from "lucide-react";
import { ScanningButton } from "@/components/ui/ScanningButton";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

interface IndustryOption {
  value: string;
  label: string;
  avgCplReduction: number;
}

const industryOptions: IndustryOption[] = [
  { value: "real-estate", label: "Real Estate", avgCplReduction: 0.35 },
  { value: "ecommerce", label: "E-commerce", avgCplReduction: 0.30 },
  { value: "automotive", label: "Automotive", avgCplReduction: 0.32 },
  { value: "healthcare", label: "Healthcare", avgCplReduction: 0.38 },
  { value: "fnb", label: "F&B", avgCplReduction: 0.40 },
  { value: "other", label: "Other", avgCplReduction: 0.33 },
];

interface CampaignMetrics {
  monthlyBudget: number;
  industry: string;
  currentCPL: number;
  currentMonthlyLeads: number;
}

interface CampaignResults {
  projectedCPL: number;
  additionalLeads: number;
  estimatedROI: number;
  annualSavings: number;
}

const sanitizeNumericInput = (value: number, min: number, max: number): number => {
  if (isNaN(value) || !isFinite(value)) return min;
  return Math.max(min, Math.min(max, value));
};

const validateCampaignMetrics = (
  metrics: CampaignMetrics
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (metrics.monthlyBudget < 1000 || metrics.monthlyBudget > 50000) {
    errors.push("Monthly budget must be between 1,000 and 50,000 AED");
  }

  if (metrics.currentCPL < 50 || metrics.currentCPL > 1000) {
    errors.push("Cost per lead must be between 50 and 1,000 AED");
  }

  if (metrics.currentMonthlyLeads < 10 || metrics.currentMonthlyLeads > 500) {
    errors.push("Monthly leads must be between 10 and 500");
  }

  return { isValid: errors.length === 0, errors };
};

const CampaignROICalculator: React.FC = () => {
  const [metrics, setMetrics] = useState<CampaignMetrics>({
    monthlyBudget: 10000,
    industry: "real-estate",
    currentCPL: 200,
    currentMonthlyLeads: 50,
  });

  const [results, setResults] = useState<CampaignResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const validation = useMemo(
    () => validateCampaignMetrics(metrics),
    [metrics]
  );

  const calculateROI = useCallback(() => {
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors([]);
    setIsCalculating(true);

    setTimeout(() => {
      try {
        const sanitizedMetrics = {
          monthlyBudget: sanitizeNumericInput(metrics.monthlyBudget, 1000, 50000),
          currentCPL: sanitizeNumericInput(metrics.currentCPL, 50, 1000),
          currentMonthlyLeads: sanitizeNumericInput(metrics.currentMonthlyLeads, 10, 500),
          industry: metrics.industry,
        };

        const selectedIndustry = industryOptions.find(
          (opt) => opt.value === sanitizedMetrics.industry
        );
        const cplReduction = selectedIndustry?.avgCplReduction || 0.33;

        const projectedCPL = sanitizedMetrics.currentCPL * (1 - cplReduction);
        const currentTotalSpend = sanitizedMetrics.currentCPL * sanitizedMetrics.currentMonthlyLeads;
        const projectedLeads = Math.floor(sanitizedMetrics.monthlyBudget / projectedCPL);
        const additionalLeads = Math.max(0, projectedLeads - sanitizedMetrics.currentMonthlyLeads);

        const monthlySavings = currentTotalSpend - projectedCPL * sanitizedMetrics.currentMonthlyLeads;
        const annualSavings = Math.max(0, monthlySavings * 12);
        const estimatedROI = currentTotalSpend > 0
          ? Math.round(((projectedLeads * sanitizedMetrics.currentCPL - sanitizedMetrics.monthlyBudget) / sanitizedMetrics.monthlyBudget) * 100)
          : 0;

        setResults({
          projectedCPL: Math.round(projectedCPL),
          additionalLeads,
          estimatedROI: Math.max(0, estimatedROI),
          annualSavings: Math.round(annualSavings),
        });
      } catch (error) {
        console.error("ROI calculation error:", error);
        setValidationErrors([
          "An error occurred during calculation. Please try again.",
        ]);
      } finally {
        setIsCalculating(false);
      }
    }, 1500);
  }, [metrics, validation]);

  const handleInputChange = useCallback(
    (field: keyof CampaignMetrics, value: number | string) => {
      setMetrics((prev) => ({ ...prev, [field]: value }));
      setResults(null);
      setValidationErrors([]);
    },
    []
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "AED",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const sliderFields = [
    {
      label: "Monthly Ad Budget",
      field: "monthlyBudget" as keyof CampaignMetrics,
      min: 1000,
      max: 50000,
      step: 500,
      suffix: "AED",
      icon: <DollarSign className="w-4 h-4" />,
      tooltip: "Your total monthly spend across all ad platforms",
    },
    {
      label: "Current Cost Per Lead",
      field: "currentCPL" as keyof CampaignMetrics,
      min: 50,
      max: 1000,
      step: 25,
      suffix: "AED",
      icon: <Target className="w-4 h-4" />,
      tooltip:
        "Average cost you pay to acquire one lead from your current campaigns",
    },
    {
      label: "Current Monthly Leads",
      field: "currentMonthlyLeads" as keyof CampaignMetrics,
      min: 10,
      max: 500,
      step: 5,
      suffix: "leads",
      icon: <Users className="w-4 h-4" />,
      tooltip: "Total number of leads your campaigns generate per month",
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
          <Badge variant="warning" className="mb-6">
            <Calculator className="w-4 h-4" />
            ROI Calculator
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Calculate Your
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              {" "}
              Campaign ROI
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            See exactly how much more value our campaigns could deliver for your
            UAE business
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
              id="roi-inputs-heading"
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400" aria-hidden="true">
                    <TrendingUp className="w-4 h-4" />
                  </span>
                  <label
                    htmlFor="roi-industry-select"
                    className="font-medium text-zinc-200"
                  >
                    Industry
                  </label>
                </div>
              </div>
              <select
                id="roi-industry-select"
                value={metrics.industry}
                onChange={(e) => handleInputChange("industry", e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass-primary border border-zinc-700 focus:border-amber-500/50 focus:outline-none text-white bg-zinc-900/50 appearance-none cursor-pointer"
              >
                {industryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </motion.div>

            {sliderFields.map((field, index) => (
              <motion.div
                key={field.field}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (index + 1) * 0.1 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400" aria-hidden="true">
                      {field.icon}
                    </span>
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
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 w-64 z-10 shadow-lg"
                        role="tooltip"
                      >
                        {field.tooltip}
                      </div>
                    </div>
                  </div>
                  <span
                    className="text-amber-400 font-semibold"
                    aria-live="polite"
                  >
                    {metrics[field.field] as number}
                    {field.suffix === "AED" ? " AED" : ` ${field.suffix}`}
                  </span>
                </div>

                <div className="relative">
                  <input
                    id={`roi-input-${field.field}`}
                    type="range"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={metrics[field.field] as number}
                    onChange={(e) =>
                      handleInputChange(field.field, parseFloat(e.target.value))
                    }
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer slider focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-900 leadgen-roi-slider"
                    aria-valuemin={field.min}
                    aria-valuemax={field.max}
                    aria-valuenow={metrics[field.field] as number}
                    aria-valuetext={`${metrics[field.field]} ${field.suffix}`}
                    style={
                      {
                        "--progress": `${((((metrics[field.field] as number) - field.min) / (field.max - field.min)) * 100)}%`,
                      } as React.CSSProperties
                    }
                  />
                  <style jsx>{`
                    .leadgen-roi-slider {
                      background: linear-gradient(
                        to right,
                        oklch(0.75 0.16 65) 0%,
                        oklch(0.75 0.16 65) var(--progress),
                        oklch(0.21 0 0) var(--progress),
                        oklch(0.21 0 0) 100%
                      );
                    }

                    .slider::-webkit-slider-thumb {
                      appearance: none;
                      height: 20px;
                      width: 20px;
                      border-radius: 50%;
                      background: linear-gradient(
                        135deg,
                        oklch(0.75 0.16 65),
                        oklch(0.88 0.12 90)
                      );
                      border: 2px solid white;
                      cursor: pointer;
                      box-shadow: 0 4px 8px oklch(0.75 0.16 65 / 0.3);
                    }
                    .slider::-moz-range-thumb {
                      height: 20px;
                      width: 20px;
                      border-radius: 50%;
                      background: linear-gradient(
                        135deg,
                        oklch(0.75 0.16 65),
                        oklch(0.88 0.12 90)
                      );
                      border: 2px solid white;
                      cursor: pointer;
                      box-shadow: 0 4px 8px oklch(0.75 0.16 65 / 0.3);
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
                color="amber"
                onClick={calculateROI}
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

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="sticky top-8">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Your ROI Projection
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
                      Adjust your metrics and click &quot;Calculate My ROI&quot;
                      to see your potential campaign improvements
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
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/20 to-yellow-400/10 backdrop-blur-xl border border-amber-500/20">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-amber-400 mb-2">
                          {formatCurrency(results.projectedCPL)}
                        </div>
                        <div className="text-zinc-300 mb-4">
                          Projected Cost Per Lead
                        </div>
                        <div className="text-2xl font-semibold text-yellow-300">
                          {formatCurrency(results.annualSavings)} / year saved
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl glass-primary text-center">
                        <div className="text-2xl font-bold text-amber-400">
                          +{results.additionalLeads}
                        </div>
                        <div className="text-sm text-zinc-400">
                          Additional Leads/mo
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl glass-primary text-center">
                        <div className="text-2xl font-bold text-amber-400">
                          {results.estimatedROI}%
                        </div>
                        <div className="text-sm text-zinc-400">
                          Estimated ROI
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl glass-primary">
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-amber-400" />
                        <span className="text-white">
                          Cost Comparison
                        </span>
                      </h4>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-400">
                            Current CPL
                          </span>
                          <span className="font-semibold text-white">
                            {formatCurrency(metrics.currentCPL)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-400">
                            Projected CPL
                          </span>
                          <span className="font-semibold text-amber-400">
                            {formatCurrency(results.projectedCPL)}
                          </span>
                        </div>
                        <div className="h-px bg-zinc-700 my-2" />
                        <div className="flex justify-between items-center text-lg">
                          <span className="text-amber-400 font-semibold">
                            Reduction
                          </span>
                          <span className="font-bold text-amber-400">
                            -
                            {Math.round(
                              ((metrics.currentCPL - results.projectedCPL) /
                                metrics.currentCPL) *
                                100
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center pt-4">
                      <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="text-amber-400 hover:text-amber-300 text-sm mb-4 flex items-center gap-1 mx-auto"
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
                              &bull; 30-40% reduction in CPL based on industry
                              benchmarks
                            </p>
                            <p>
                              &bull; Optimized campaign structure and targeting
                            </p>
                            <p>
                              &bull; A/B tested ad creatives and landing pages
                            </p>
                            <p>
                              &bull; Based on average results for UAE businesses
                              in your industry
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Link href="/book">
                        <ScanningButton
                          color="amber"
                          size="lg"
                          className="w-full"
                        >
                          <div className="flex items-center gap-2">
                            Book Your Free Ad Audit
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </ScanningButton>
                      </Link>
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

export default CampaignROICalculator;
