// app/thank-you/page.js
import React from "react";
import Link from "next/link";
import { CheckCircle, Calendar, ArrowLeft, Clock, Phone } from "lucide-react";

export const metadata = {
  title: "Thank You - XMA Agency",
  description:
    "Thank you for scheduling a strategy call with XMA Agency. We look forward to helping your business grow with our lead generation system.",
};

export default function ThankYouPage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Thank you message */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600/20 mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
              Thank You!
            </h1>
            <p className="text-xl text-zinc-300 mb-2">
              Your strategy call has been scheduled successfully.
            </p>
            <p className="text-lg text-zinc-400">
              We look forward to discussing how our 4-step system can help grow
              your business.
            </p>
          </div>

          {/* Confirmation details */}
          <div className="bg-zinc-900/50 rounded-xl p-6 backdrop-blur-sm border border-zinc-800 mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-red-500" />
              Appointment Details
            </h2>
            <div className="space-y-3 text-zinc-300">
              <div className="flex items-start">
                <Clock className="w-5 h-5 mr-3 text-zinc-500 mt-0.5" />
                <div>
                  <p className="font-medium">
                    Check your email for appointment details
                  </p>
                  <p className="text-zinc-400 text-sm">
                    We've sent a calendar invitation to your email
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 mr-3 text-zinc-500 mt-0.5" />
                <div>
                  <p className="font-medium">Expect a confirmation call</p>
                  <p className="text-zinc-400 text-sm">
                    Our team will give you a quick call to confirm your
                    appointment
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Next steps */}
          <div className="bg-zinc-900/50 rounded-xl p-6 backdrop-blur-sm border border-zinc-800 mb-10">
            <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
            <ul className="space-y-4">
              <li className="flex">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-red-500 text-sm font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium text-zinc-300">
                    Prepare Your Questions
                  </p>
                  <p className="text-zinc-400 text-sm">
                    Think about specific goals and challenges you'd like to
                    discuss during our call
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-red-500 text-sm font-bold">2</span>
                </div>
                <div>
                  <p className="font-medium text-zinc-300">
                    Attend Your Strategy Call
                  </p>
                  <p className="text-zinc-400 text-sm">
                    Our specialist will walk you through our system and how it
                    can be customized for your business
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-red-500 text-sm font-bold">3</span>
                </div>
                <div>
                  <p className="font-medium text-zinc-300">
                    Review Your Customized Plan
                  </p>
                  <p className="text-zinc-400 text-sm">
                    Following our call, we'll send you a personalized proposal
                    tailored to your business needs
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Additional resources */}
          {/* <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-6 border border-zinc-800 mb-10"> */}
          {/*   <h2 className="text-xl font-semibold mb-4">While You Wait</h2> */}
          {/*   <p className="text-zinc-400 mb-4"> */}
          {/*     Check out these resources to learn more about our approach: */}
          {/*   </p> */}
          {/*   <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
          {/*     <Link */}
          {/*       href="/case-studies" */}
          {/*       className="flex items-center p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors" */}
          {/*     > */}
          {/*       <div className="mr-3 p-2 bg-zinc-700 rounded"> */}
          {/*         <Share2 className="w-5 h-5 text-red-500" /> */}
          {/*       </div> */}
          {/*       <div> */}
          {/*         <div className="font-medium text-zinc-300">Case Studies</div> */}
          {/*         <div className="text-sm text-zinc-400">See our results</div> */}
          {/*       </div> */}
          {/*       <ChevronRight className="ml-auto w-5 h-5 text-zinc-500" /> */}
          {/*     </Link> */}
          {/**/}
          {/*     <Link */}
          {/*       href="/faq" */}
          {/*       className="flex items-center p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors" */}
          {/*     > */}
          {/*       <div className="mr-3 p-2 bg-zinc-700 rounded"> */}
          {/*         <Share2 className="w-5 h-5 text-red-500" /> */}
          {/*       </div> */}
          {/*       <div> */}
          {/*         <div className="font-medium text-zinc-300">FAQ</div> */}
          {/*         <div className="text-sm text-zinc-400">Common questions</div> */}
          {/*       </div> */}
          {/*       <ChevronRight className="ml-auto w-5 h-5 text-zinc-500" /> */}
          {/*     </Link> */}
          {/*   </div> */}
          {/* </div> */}

          {/* Return to homepage */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Homepage
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
