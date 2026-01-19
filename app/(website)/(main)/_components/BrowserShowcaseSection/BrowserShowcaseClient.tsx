'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { ShowcaseWebsiteCard } from '@/sanity/lib/types'
import BrowserChrome from './BrowserChrome'
import BrowserTabBar from './BrowserTabBar'
import BrowserAddressBar from './BrowserAddressBar'
import BrowserContent from './BrowserContent'

interface BrowserShowcaseClientProps {
  websites: ShowcaseWebsiteCard[]
}

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

const BrowserShowcaseClient = ({ websites }: BrowserShowcaseClientProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const activeWebsite = websites[activeIndex]

  const handleTabChange = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const handleVisit = useCallback(() => {
    if (activeWebsite?.externalUrl) {
      window.open(activeWebsite.externalUrl, '_blank', 'noopener,noreferrer')
    }
  }, [activeWebsite])

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="w-full"
    >
      <div className="text-center mb-10">
        <span className="text-sm uppercase tracking-wider text-blue-500 font-semibold mb-4 block">
          Our Work
        </span>
        <h2 className="heading-section text-white mb-4">Websites We&apos;ve Built</h2>
        <p className="text-lg text-neutral-400 max-w-xl mx-auto">
          Premium web experiences designed and developed for our clients
        </p>
      </div>

      <BrowserChrome>
        <BrowserTabBar
          websites={websites}
          activeIndex={activeIndex}
          onTabChange={handleTabChange}
        />
        <BrowserAddressBar url={activeWebsite.externalUrl} />
        <BrowserContent
          websites={websites}
          activeIndex={activeIndex}
          onContentClick={handleVisit}
        />
      </BrowserChrome>
    </motion.div>
  )
}

export default BrowserShowcaseClient
