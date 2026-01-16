'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { ShowcaseWebsiteCard } from '@/sanity/lib/types'

interface BrowserContentProps {
  websites: ShowcaseWebsiteCard[]
  activeIndex: number
}

const BrowserContent = ({ websites, activeIndex }: BrowserContentProps) => {
  const activeWebsite = websites[activeIndex]

  return (
    <div
      role="tabpanel"
      id={`panel-${activeWebsite._id}`}
      aria-labelledby={`tab-${activeWebsite._id}`}
      className="relative aspect-video bg-zinc-950 overflow-hidden rounded-b-xl"
    >
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
              <Image
                src={website.thumbnailUrl}
                alt={`Screenshot of ${website.title}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
                quality={95}
                priority
              />
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
