"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { useConversionTracking } from "@/hooks/useConversionTracking";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { trackPaymentCompleted } = useConversionTracking();
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;
    hasTracked.current = true;

    const bookingType = searchParams.get("type") as "strategy" | "crm" | null;
    const value = searchParams.get("value");

    trackPaymentCompleted(value ? parseFloat(value) : undefined, "USD", {
      booking_type: bookingType || "strategy",
      source: "success_page",
    });
  }, [searchParams, trackPaymentCompleted]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-xl w-full mx-auto">
        <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>

            <div className="space-y-6 flex-1">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-white">
                  Payment Successful!
                </h1>
                <p className="text-zinc-400 text-sm">
                  Thank you for your purchase. We have received your payment and
                  will process your order shortly.
                </p>
              </div>

              <div className="space-y-4 border-t border-zinc-800 pt-6">
                <div className="space-y-2">
                  <h2 className="font-medium text-xl text-white">Next steps:</h2>
                  <ul className="text-sm text-zinc-400 space-y-1">
                    <li>
                      • You'll receive a confirmation email with your order
                      details
                    </li>
                    <li>• Our team will contact you within 24 hours</li>
                    <li>
                      • We'll schedule a kickoff meeting to discuss your
                      requirements
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => router.push("/")}
                  className="inline-flex bg-white items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-800 hover:text-zinc-600 hover:bg-zinc-100 rounded-main"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Return to home
                </button>

                <a
                  href="mailto:support@xmaagency.com"
                  className="text-sm text-red-400 hover:text-red-300"
                >
                support@xmaagency.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
