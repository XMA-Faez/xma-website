'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowSquareOut } from 'phosphor-react'
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
      className="relative aspect-[9/20] md:aspect-video bg-zinc-950 overflow-hidden rounded-b-xl md:cursor-none group"
    >
      <div className="hidden md:block">
        <PillCursor
          isVisible={!!onContentClick}
          containerRef={containerRef}
          label="Click to open in new tab"
        />
      </div>

      <motion.div
        className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10 pointer-events-none"
        aria-hidden="true"
      />

      {onContentClick && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onContentClick()
          }}
          className="absolute bottom-4 right-4 z-30 md:hidden flex items-center justify-center gap-2 py-3 px-5 bg-white hover:bg-neutral-100 active:bg-neutral-200 text-neutral-950 font-semibold rounded-full shadow-lg transition-colors"
        >
          <ArrowSquareOut weight="bold" className="w-5 h-5" />
          Preview
        </button>
      )}

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
                  src={website.mobileThumbnailUrl || website.thumbnailUrl}
                  alt={`Screenshot of ${website.title}`}
                  fill
                  className="object-cover object-top md:hidden"
                  sizes="100vw"
                  quality={95}
                  priority
                />
                <Image
                  src={website.thumbnailUrl}
                  alt={`Screenshot of ${website.title}`}
                  fill
                  className="object-cover object-top hidden md:block"
                  sizes="(max-width: 1024px) 90vw, 1280px"
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
