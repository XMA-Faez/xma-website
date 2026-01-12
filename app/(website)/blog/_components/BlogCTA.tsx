'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function BlogCTA() {
  return (
    <section className="mt-16 mb-8">
      <div className="bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-8 md:p-12 border border-zinc-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 via-transparent to-transparent" />
        
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            Ready to Transform Your Digital Marketing?
          </h2>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Let's discuss how XMA can help elevate your brand's digital presence and drive meaningful results for your business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact"
              className="group inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/20"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
