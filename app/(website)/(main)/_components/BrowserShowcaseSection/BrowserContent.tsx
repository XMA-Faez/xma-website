'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import type { ShowcaseWebsiteCard } from '@/sanity/lib/types'
import PillCursor from '@/components/ui/PillCursor'

interface BrowserContentProps {
  websites: ShowcaseWebsiteCard[]
  activeIndex: number
  onContentClick?: () => void
}

const BrowserContent = ({
  websites,
  activeIndex,
  onContentClick,
}: BrowserContentProps) => {
  const activeWebsite = websites[activeIndex]
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      role="tabpanel"
      id={`panel-${activeWebsite._id}`}
      aria-labelledby={`tab-${activeWebsite._id}`}
      onClick={onContentClick}
      className="relative aspect-video bg-zinc-950 overflow-hidden rounded-b-xl cursor-none group"
    >
      <PillCursor
        isVisible={!!onContentClick}
        containerRef={containerRef}
        label="Click to open in new tab"
      />

      <motion.div
        className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10 pointer-events-none"
        aria-hidden="true"
      />

      {websites.map((website, index) => {
        const isActive = index === activeIndex

        return (
          <motion.div
            key={website._id}
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 0.98,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0"
            aria-hidden={!isActive}
          >
            {website.thumbnailUrl ? (
              <motion.div
                className="relative w-full h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <Image
                  src={website.thumbnailUrl}
                  alt={`Screenshot of ${website.title}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
                  quality={95}
                  priority
                />
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-full text-neutral-500">
                No preview available
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

export default BrowserContent
