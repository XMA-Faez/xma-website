'use client'

import React from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'phosphor-react'
import Link from 'next/link'
import Section from '@/components/ui/section'
import { PhotoGallerySkiper } from './VideoGallery'

const ProofSection = () => {
  return (
    <Section size="xl" className="!px-0">
      <div className="px-4 md:px-6 lg:px-8 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-sm uppercase tracking-wider text-blue-500 font-semibold mb-4 block">
            Our Work
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white mb-4 leading-[1.1]">
            Real Work. <span className="text-blue-500">Real Upgrades.</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-xl mx-auto">
            We don&apos;t hide behind reports. We show the work.
          </p>
        </motion.div>
      </div>

      <PhotoGallerySkiper />

      <div className="px-4 md:px-6 lg:px-8 mt-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-blue-500 font-medium hover:gap-3 transition-all duration-300"
          >
            View Full Portfolio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </Section>
  )
}

export default ProofSection
