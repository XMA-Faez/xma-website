"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowLeft, Mail, MessageSquare } from "lucide-react";

type SuccessType = "strategy" | "crm" | "lead";

interface SuccessConfig {
  title: string;
  description: string;
  nextSteps: string[];
}

const successConfigs: Record<SuccessType, SuccessConfig> = {
  lead: {
    title: "Thank You! We'll Be in Touch Soon",
    description:
      "We've received your message and our team will review it shortly. Expect to hear from us within 24 hours.",
    nextSteps: [
      "Our team will review your inquiry",
      "We'll reach out within 24 hours to discuss your needs",
      "You'll receive a customized proposal based on your requirements",
    ],
  },
  strategy: {
    title: "Payment Successful!",
    description:
      "Thank you for your purchase. We have received your payment and will process your order shortly.",
    nextSteps: [
      "You'll receive a confirmation email with your order details",
      "Our team will contact you within 24 hours",
      "We'll schedule a kickoff meeting to discuss your requirements",
    ],
  },
  crm: {
    title: "Payment Successful!",
    description:
      "Thank you for your purchase. We have received your payment and will process your order shortly.",
    nextSteps: [
      "You'll receive a confirmation email with your order details",
      "Our team will contact you within 24 hours",
      "We'll schedule a kickoff meeting to discuss your requirements",
    ],
  },
};

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const successType = (searchParams.get("type") as SuccessType) || "lead";
  const config = successConfigs[successType] || successConfigs.lead;
  const isLead = successType === "lead";

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
                <h1 className="text-2xl font-bold text-white">{config.title}</h1>
                <p className="text-zinc-400 text-sm">{config.description}</p>
              </div>

              <div className="space-y-4 border-t border-zinc-800 pt-6">
                <div className="space-y-2">
                  <h2 className="font-medium text-xl text-white">
                    {isLead ? "What happens next:" : "Next steps:"}
                  </h2>
                  <ul className="text-sm text-zinc-400 space-y-1">
                    {config.nextSteps.map((step, index) => (
                      <li key={index}>• {step}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {isLead && (
                <div className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                  <MessageSquare className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <p className="text-sm text-zinc-300">
                    Need immediate assistance? Email us directly at{" "}
                    <a
                      href="mailto:support@xmaagency.com"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      support@xmaagency.com
                    </a>
                  </p>
                </div>
              )}

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
                  className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-300"
                >
                  <Mail className="h-4 w-4" />
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

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
