'use client'

import React from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'phosphor-react'
import Link from 'next/link'
import Section from '@/components/ui/section'
import { ScanningButton } from '@/components/ui/ScanningButton'
import { useTrackCTA } from '@/hooks/useTrackEvent'
import { PhotoGallerySkiper } from './VideoGallery'

const ProofSection = () => {
  const trackCTA = useTrackCTA()

  return (
    <Section size="xl" className="!px-0 sm:px-0">
      <div className="mb-6 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-sm uppercase tracking-wider text-blue-500 font-semibold mb-4 block">
            Our Work
          </span>
          <h2 className="heading-section text-slate-900 dark:text-white mb-4">
            Real Work. Real Upgrades.
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-xl mx-auto">
            We don&apos;t hide behind reports. We show the work.
          </p>
        </motion.div>
      </div>

      <PhotoGallerySkiper />

    </Section>
  )
}

export default ProofSection
