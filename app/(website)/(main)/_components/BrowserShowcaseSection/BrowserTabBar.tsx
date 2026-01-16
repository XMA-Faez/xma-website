'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ShowcaseWebsiteCard } from '@/sanity/lib/types'
import Image from 'next/image'

interface BrowserTabBarProps {
  websites: ShowcaseWebsiteCard[]
  activeIndex: number
  onTabChange: (index: number) => void
}

const extractDomain = (url: string): string => {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch {
    return url
  }
}

const getFaviconUrl = (url: string): string => {
  const domain = extractDomain(url)
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
}

const truncateTitle = (title: string, maxLength: number = 18): string => {
  if (title.length <= maxLength) return title
  return `${title.slice(0, maxLength)}...`
}

const tabVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
}

const BrowserTabBar = ({ websites, activeIndex, onTabChange }: BrowserTabBarProps) => {
  const handleKeyDown = (event: React.KeyboardEvent, currentIndex: number) => {
    const lastIndex = websites.length - 1

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault()
        onTabChange(currentIndex === lastIndex ? 0 : currentIndex + 1)
        break
      case 'ArrowLeft':
        event.preventDefault()
        onTabChange(currentIndex === 0 ? lastIndex : currentIndex - 1)
        break
      case 'Home':
        event.preventDefault()
        onTabChange(0)
        break
      case 'End':
        event.preventDefault()
        onTabChange(lastIndex)
        break
    }
  }

  return (
    <div
      role="tablist"
      aria-label="Website showcase tabs"
      className="flex items-end gap-1 px-2 pt-2 bg-zinc-800/50 overflow-x-auto scrollbar-hide"
    >
      {websites.map((website, index) => {
        const isActive = index === activeIndex

        return (
          <motion.button
            key={website._id}
            role="tab"
            id={`tab-${website._id}`}
            aria-selected={isActive}
            aria-controls={`panel-${website._id}`}
            tabIndex={isActive ? 0 : -1}
            variants={tabVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: index * 0.05, duration: 0.3 }}
            onClick={() => onTabChange(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              'relative flex items-center gap-2 px-3 py-2 rounded-t-lg min-w-[120px] max-w-[180px]',
              'text-sm font-medium transition-colors duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900',
              isActive
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-800/70 text-neutral-400 hover:text-neutral-200 hover:bg-zinc-800'
            )}
          >
            <div className="relative w-4 h-4 flex-shrink-0">
              <Image
                src={getFaviconUrl(website.externalUrl)}
                alt=""
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <span className="truncate">{truncateTitle(website.title)}</span>
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}

export default BrowserTabBar
