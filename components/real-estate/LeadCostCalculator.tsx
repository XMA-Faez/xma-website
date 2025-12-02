"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  TrendUp,
  CurrencyDollar,
  Buildings,
  House,
  Storefront,
  CaretDown,
  Info,
  Warning,
  ArrowRight,
  Target,
  ChartLine,
} from "phosphor-react";
import { ScanningButton } from "@/components/ui/ScanningButton";
import Link from "next/link";

// Types
interface CalculatorInputs {
  projectType: "off-plan" | "secondary";
  propertyType: "apartment" | "townhouse" | "villa" | "penthouse";
  propertyValue: number;
  monthlyBudget: number;
}

interface CalculatorResults {
  estimatedCPL: number;
  estimatedLeads: number;
  estimatedViewings: number;
  estimatedDeals: number;
  potentialCommission: number;
  costPerViewing: number;
  costPerDeal: number;
  roi: number;
}

// CPL multipliers based on research data
const CPL_BASE_RATES = {
  // Base CPL in AED - varies by project type
  "off-plan": 45, // Off-plan has higher intent, lower CPL
  secondary: 65, // Secondary market slightly higher CPL
};

const PROPERTY_TYPE_MULTIPLIERS = {
  apartment: 1.0, // Most common, base rate
  townhouse: 1.3, // Less inventory, slightly higher
  villa: 1.5, // Premium segment, higher CPL
  penthouse: 2.0, // Luxury segment, highest CPL
};

// Value tier multipliers (higher value = higher quality leads needed = higher CPL)
const getValueMultiplier = (value: number): number => {
  if (value < 1000000) return 0.8; // Under 1M - more volume, lower CPL
  if (value < 2500000) return 1.0; // 1M-2.5M - mid-market
  if (value < 5000000) return 1.3; // 2.5M-5M - upper mid
  if (value < 10000000) return 1.6; // 5M-10M - luxury
  return 2.0; // 10M+ ultra luxury
};

// Conversion rates based on industry benchmarks
const CONVERSION_RATES = {
  leadToViewing: 0.18, // 18% of leads convert to viewings
  viewingToDeal: 0.08, // 8% of viewings convert to deals
};

// Commission rates
const COMMISSION_RATES = {
  "off-plan": 0.05, // 5% for off-plan
  secondary: 0.02, // 2% for secondary
};

const LeadCostCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    projectType: "off-plan",
    propertyType: "apartment",
    propertyValue: 2000000,
    monthlyBudget: 10000,
  });

  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Property value presets
  const valuePresets = [
    { label: "Under 1M", value: 750000 },
    { label: "1M - 2.5M", value: 1750000 },
    { label: "2.5M - 5M", value: 3500000 },
    { label: "5M - 10M", value: 7500000 },
    { label: "10M+", value: 15000000 },
  ];

  // Calculate estimated CPL
  const estimatedCPL = useMemo(() => {
    const baseCPL = CPL_BASE_RATES[inputs.projectType];
    const propertyMultiplier = PROPERTY_TYPE_MULTIPLIERS[inputs.propertyType];
    const valueMultiplier = getValueMultiplier(inputs.propertyValue);

    return Math.round(baseCPL * propertyMultiplier * valueMultiplier);
  }, [inputs.projectType, inputs.propertyType, inputs.propertyValue]);

  const calculateResults = useCallback(() => {
    setIsCalculating(true);

    setTimeout(() => {
      const cpl = estimatedCPL;
      const estimatedLeads = Math.floor(inputs.monthlyBudget / cpl);
      const estimatedViewings = Math.floor(
        estimatedLeads * CONVERSION_RATES.leadToViewing,
      );
      const estimatedDeals = Math.max(
        1,
        Math.floor(estimatedViewings * CONVERSION_RATES.viewingToDeal),
      );

      const commissionRate = COMMISSION_RATES[inputs.projectType];
      const potentialCommission =
        estimatedDeals * inputs.propertyValue * commissionRate;

      const costPerViewing =
        estimatedViewings > 0
          ? Math.round(inputs.monthlyBudget / estimatedViewings)
          : 0;
      const costPerDeal =
        estimatedDeals > 0
          ? Math.round(inputs.monthlyBudget / estimatedDeals)
          : 0;

      const roi =
        inputs.monthlyBudget > 0
          ? Math.round(
              ((potentialCommission - inputs.monthlyBudget) /
                inputs.monthlyBudget) *
                100,
            )
          : 0;

      setResults({
        estimatedCPL: cpl,
        estimatedLeads,
        estimatedViewings,
        estimatedDeals,
        potentialCommission,
        costPerViewing,
        costPerDeal,
        roi,
      });

      setIsCalculating(false);
    }, 1200);
  }, [inputs, estimatedCPL]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "AED",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const propertyTypeOptions = [
    { value: "apartment", label: "Apartment", icon: Buildings },
    { value: "townhouse", label: "Townhouse", icon: Storefront },
    { value: "villa", label: "Villa", icon: House },
    { value: "penthouse", label: "Penthouse", icon: Buildings },
  ];

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-blue-500 font-semibold mb-4">
            <Calculator className="w-4 h-4" weight="duotone" />
            Lead Cost Calculator
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            Estimate Your <span className="text-blue-500">Cost Per Lead</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            See projected lead costs and ROI based on your property type and
            budget
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Your Property Details
            </h3>

            {/* Project Type */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 font-medium text-slate-700 dark:text-zinc-200">
                <Target className="w-4 h-4 text-blue-400" weight="duotone" />
                Project Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "off-plan", label: "Off-Plan" },
                  { value: "secondary", label: "Secondary/Ready" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      setInputs((prev) => ({
                        ...prev,
                        projectType: option.value as "off-plan" | "secondary",
                      }))
                    }
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      inputs.projectType === option.value
                        ? "border-blue-500 bg-blue-500/10 dark:bg-blue-500/20"
                        : "border-slate-200 dark:border-zinc-700 hover:border-blue-500/50 bg-white dark:bg-zinc-800/50"
                    }`}
                  >
                    <span
                      className={`font-semibold ${
                        inputs.projectType === option.value
                          ? "text-blue-500"
                          : "text-slate-700 dark:text-zinc-200"
                      }`}
                    >
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Property Type */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 font-medium text-slate-700 dark:text-zinc-200">
                <House className="w-4 h-4 text-blue-400" weight="duotone" />
                Property Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {propertyTypeOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() =>
                        setInputs((prev) => ({
                          ...prev,
                          propertyType:
                            option.value as CalculatorInputs["propertyType"],
                        }))
                      }
                      className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 ${
                        inputs.propertyType === option.value
                          ? "border-blue-500 bg-blue-500/10 dark:bg-blue-500/20"
                          : "border-slate-200 dark:border-zinc-700 hover:border-blue-500/50 bg-white dark:bg-zinc-800/50"
                      }`}
                    >
                      <IconComponent
                        className={`w-5 h-5 ${
                          inputs.propertyType === option.value
                            ? "text-blue-500"
                            : "text-slate-400 dark:text-zinc-500"
                        }`}
                        weight="duotone"
                      />
                      <span
                        className={`font-semibold ${
                          inputs.propertyType === option.value
                            ? "text-blue-500"
                            : "text-slate-700 dark:text-zinc-200"
                        }`}
                      >
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Property Value */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 font-medium text-slate-700 dark:text-zinc-200">
                  <CurrencyDollar
                    className="w-4 h-4 text-blue-400"
                    weight="duotone"
                  />
                  Property Value
                </label>
                <span className="text-blue-500 font-semibold">
                  {formatCurrency(inputs.propertyValue)}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {valuePresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() =>
                      setInputs((prev) => ({
                        ...prev,
                        propertyValue: preset.value,
                      }))
                    }
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      inputs.propertyValue === preset.value
                        ? "bg-blue-500 text-white"
                        : "bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:bg-blue-500/20"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Budget */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 font-medium text-slate-700 dark:text-zinc-200">
                  <ChartLine
                    className="w-4 h-4 text-blue-400"
                    weight="duotone"
                  />
                  Monthly Ad Budget
                </label>
                <span className="text-blue-500 font-semibold">
                  {formatCurrency(inputs.monthlyBudget)}
                </span>
              </div>
              <input
                type="range"
                min={3000}
                max={100000}
                step={1000}
                value={inputs.monthlyBudget}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    monthlyBudget: parseInt(e.target.value),
                  }))
                }
                className="w-full h-2 rounded-lg appearance-none cursor-pointer lead-calc-slider"
                style={
                  {
                    "--progress": `${
                      ((inputs.monthlyBudget - 3000) / (100000 - 3000)) * 100
                    }%`,
                  } as React.CSSProperties
                }
              />
              <style jsx>{`
                .lead-calc-slider {
                  background: linear-gradient(
                    to right,
                    oklch(0.6 0.15 250) 0%,
                    oklch(0.6 0.15 250) var(--progress),
                    oklch(0.9 0.01 250) var(--progress),
                    oklch(0.9 0.01 250) 100%
                  );
                }

                :global(.dark) .lead-calc-slider {
                  background: linear-gradient(
                    to right,
                    oklch(0.6 0.15 250) 0%,
                    oklch(0.6 0.15 250) var(--progress),
                    oklch(0.25 0.02 250) var(--progress),
                    oklch(0.25 0.02 250) 100%
                  );
                }

                .lead-calc-slider::-webkit-slider-thumb {
                  appearance: none;
                  height: 20px;
                  width: 20px;
                  border-radius: 50%;
                  background: linear-gradient(
                    135deg,
                    oklch(0.6 0.15 250),
                    oklch(0.5 0.18 250)
                  );
                  border: 2px solid white;
                  cursor: pointer;
                  box-shadow: 0 4px 8px oklch(0.5 0.15 250 / 0.3);
                }
                .lead-calc-slider::-moz-range-thumb {
                  height: 20px;
                  width: 20px;
                  border-radius: 50%;
                  background: linear-gradient(
                    135deg,
                    oklch(0.6 0.15 250),
                    oklch(0.5 0.18 250)
                  );
                  border: 2px solid white;
                  cursor: pointer;
                  box-shadow: 0 4px 8px oklch(0.5 0.15 250 / 0.3);
                }
              `}</style>
              <div className="flex justify-between text-sm text-slate-500 dark:text-zinc-500">
                <span>AED 3,000</span>
                <span>AED 100,000</span>
              </div>
            </div>

            {/* Estimated CPL Preview */}
            <div className="p-4 rounded-xl bg-blue-500/10 dark:bg-blue-500/5 border border-blue-500/20">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-zinc-300">
                  Estimated Cost Per Lead
                </span>
                <span className="text-2xl font-bold text-blue-500">
                  ~{formatCurrency(estimatedCPL)}
                </span>
              </div>
            </div>

            {/* Calculate Button */}
            <ScanningButton
              color="blue"
              onClick={calculateResults}
              disabled={isCalculating}
              className="w-full"
              size="lg"
            >
              {isCalculating ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Calculating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" weight="duotone" />
                  Calculate My ROI
                </div>
              )}
            </ScanningButton>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="lg:sticky lg:top-8">
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                Your Projections
              </h3>

              <AnimatePresence mode="wait">
                {!results ? (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 rounded-3xl bg-slate-50 dark:bg-zinc-900/50 border-2 border-dashed border-slate-300 dark:border-zinc-700 text-center"
                  >
                    <Calculator className="w-16 h-16 text-slate-400 dark:text-zinc-600 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-zinc-500">
                      Configure your property details and click &quot;Calculate
                      My ROI&quot; to see projections
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
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-500/20 to-indigo-400/10 backdrop-blur-xl border border-blue-500/20">
                      <div className="text-center">
                        <div className="text-sm text-slate-600 dark:text-zinc-400 mb-1">
                          Potential Monthly Commission
                        </div>
                        <div className="text-4xl font-bold text-blue-500 mb-2">
                          {formatCurrency(results.potentialCommission)}
                        </div>
                        <div className="text-slate-600 dark:text-zinc-300 mb-4">
                          Based on {results.estimatedDeals} deal
                          {results.estimatedDeals > 1 ? "s" : ""} per month
                        </div>
                        <div className="text-2xl font-semibold text-emerald-500">
                          {results.roi > 0 ? "+" : ""}
                          {results.roi}% ROI
                        </div>
                      </div>
                    </div>

                    {/* Lead Funnel */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-700">
                      <h4 className="font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                        <TrendUp
                          className="w-5 h-5 text-blue-400"
                          weight="duotone"
                        />
                        Monthly Lead Funnel
                      </h4>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 dark:text-zinc-400">
                            Estimated Leads
                          </span>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {results.estimatedLeads}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-zinc-700 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "100%" }}
                          />
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 dark:text-zinc-400">
                            Estimated Viewings
                          </span>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {results.estimatedViewings}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-zinc-700 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{
                              width: `${
                                (results.estimatedViewings /
                                  results.estimatedLeads) *
                                100
                              }%`,
                            }}
                          />
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 dark:text-zinc-400">
                            Estimated Deals
                          </span>
                          <span className="font-semibold text-emerald-500">
                            {results.estimatedDeals}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-zinc-700 rounded-full h-2">
                          <div
                            className="bg-emerald-500 h-2 rounded-full"
                            style={{
                              width: `${Math.max(
                                5,
                                (results.estimatedDeals /
                                  results.estimatedLeads) *
                                  100,
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Cost Metrics */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-700 text-center">
                        <div className="text-xl font-bold text-blue-500">
                          {formatCurrency(results.estimatedCPL)}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-zinc-400">
                          Cost/Lead
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-700 text-center">
                        <div className="text-xl font-bold text-purple-500">
                          {formatCurrency(results.costPerViewing)}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-zinc-400">
                          Cost/Viewing
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-700 text-center">
                        <div className="text-xl font-bold text-emerald-500">
                          {formatCurrency(results.costPerDeal)}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-zinc-400">
                          Cost/Deal
                        </div>
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="text-center pt-4">
                      <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="text-blue-500 hover:text-blue-400 text-sm mb-4 flex items-center gap-1 mx-auto"
                      >
                        {showDetails ? "Hide" : "Show"} assumptions
                        <CaretDown
                          className={`w-4 h-4 transition-transform ${
                            showDetails ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {showDetails && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-xs text-slate-600 dark:text-zinc-500 bg-slate-100 dark:bg-zinc-900/50 p-4 rounded-lg mb-4 text-left"
                          >
                            <p className="mb-2 flex items-center gap-1">
                              <Info className="w-3 h-3" />
                              <strong>Assumptions:</strong>
                            </p>
                            <p>
                              - Lead-to-viewing rate: 18% (industry benchmark)
                            </p>
                            <p>- Viewing-to-deal rate: 8% (conservative)</p>
                            <p>- Off-plan commission: 5% | Secondary: 2%</p>
                            <p>- CPL varies by property type and value tier</p>
                            <p className="mt-2 text-slate-500 dark:text-zinc-600">
                              Actual results may vary based on market
                              conditions, ad quality, and sales performance.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <ScanningButton color="blue" size="lg" className="w-full">
                        <Link href="/book" className="flex items-center gap-2">
                          Book Your Strategy Call
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </ScanningButton>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeadCostCalculator;
