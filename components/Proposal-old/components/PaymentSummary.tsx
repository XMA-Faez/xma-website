"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { PackageType, AddonType } from "@/utils/stripe";
import { packages, addOns } from "@/data/proposalData";
import { ShieldCheck } from "lucide-react";

interface PaymentSummaryProps {
  selectedPackage: PackageType;
  selectedAddOns: AddonType[];
}

export default function PaymentSummary({
  selectedPackage,
  selectedAddOns,
}: PaymentSummaryProps) {
  const { createCheckoutSession, isLoading } = useStripeCheckout();

  const handlePayment = async () => {
    try {
      await createCheckoutSession(selectedPackage, selectedAddOns);
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  // Calculate total
  const packagePrice = parseInt(
    packages[selectedPackage].price.replace(/[^0-9]/g, ""),
  );
  const addOnsTotal = selectedAddOns.reduce((total, addonId) => {
    const addon = addOns.find((a) => a.id === addonId);
    return total + (addon ? addon.basePrice : 0);
  }, 0);
  const totalPrice = packagePrice + addOnsTotal;

  return (
    <Card className="bg-zinc-950 border-zinc-800">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl text-white">Payment Summary</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-6">
          <div className="bg-red-900/10 border border-red-500/20 p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white"> {packages[selectedPackage].name} Package</h3>
            <div className="text-2xl sm:text-3xl font-bold text-red-400">
              {packages[selectedPackage].price}
            </div>
            <div className="text-sm sm:text-base text-zinc-400">
              {packages[selectedPackage].usdPrice}
            </div>
          </div>

          {selectedAddOns.length > 0 && (
            <div className="border-t border-zinc-800 pt-4 space-y-2">
              <h4 className="text-sm font-medium text-zinc-400">
                Selected Add-ons
              </h4>
              {selectedAddOns.map((addonId) => {
                const addon = addOns.find((a) => a.id === addonId);
                return (
                  <div key={addonId} className="flex justify-between text-sm sm:text-base">
                    <span className="text-zinc-300">{addon?.feature}</span>
                    <span className="text-red-400">{addon?.price}</span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="border-t border-zinc-700 pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  Total Payment
                </h3>
                <p className="text-sm text-zinc-400">
                  Package {selectedAddOns.length > 0 ? "+ Add-ons" : ""}
                </p>
              </div>
              <button
                onClick={handlePayment}
                disabled={isLoading}
                className={`
                  w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-3 rounded-lg 
                  transition-colors duration-200 flex items-center justify-center sm:justify-start gap-3
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                <span className="font-semibold">
                  {isLoading
                    ? "Processing..."
                    : `Pay ${totalPrice.toLocaleString()} AED`}
                </span>
                {!isLoading && (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-2 text-sm text-zinc-400">
            <ShieldCheck />
            <span>Secure SSL encrypted payment</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
