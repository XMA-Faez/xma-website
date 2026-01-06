"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, XCircle } from "lucide-react";

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">Payment Cancelled</h1>
            <p className="text-zinc-400">
              Your payment was cancelled. No charges were made to your account.
            </p>
          </div>

          <div className="pt-6">
            <button
              onClick={() => router.push("/proposal")}
              className="inline-flex bg-white items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-800 hover:text-zinc-600 hover:bg-zinc-100 rounded-main"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to proposal
            </button>
          </div>

          <div className="text-sm text-zinc-500">
            If you have any questions, please contact our support team.
          </div>
        </div>
      </div>
    </div>
  );
}
