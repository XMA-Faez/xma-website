'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight } from 'phosphor-react'
import type { ShowcaseWebsiteCard } from '@/sanity/lib/types'
import { useTrackEvent } from '@/hooks/useTrackEvent'

interface WebsiteTiltCardProps {
  website: ShowcaseWebsiteCard
}

const ROTATION_RANGE = 15

const WebsiteTiltCard = ({ website }: WebsiteTiltCardProps) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const trackEvent = useTrackEvent()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [ROTATION_RANGE, -ROTATION_RANGE])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-ROTATION_RANGE, ROTATION_RANGE])

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    const xPercent = mouseX / width - 0.5
    const yPercent = mouseY / height - 0.5

    x.set(xPercent)
    y.set(yPercent)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovering(false)
  }

  const handleClick = () => {
    trackEvent('showcase_website_click', {
      website_title: website.title,
      website_url: website.externalUrl,
    })
  }

  return (
    <motion.a
      ref={ref}
      href={website.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="block relative rounded-2xl bg-zinc-900/80 border border-white/10
                 hover:border-primary-500/30 transition-colors duration-300
                 group cursor-pointer"
    >
      <div
        className="relative aspect-[4/3] rounded-t-2xl overflow-hidden"
        style={{ transform: 'translateZ(20px)' }}
      >
        <Image
          src={website.thumbnailUrl}
          alt={website.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          quality={95}
          priority
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-primary-600/20
                     flex items-center justify-center"
        >
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
            <ArrowUpRight weight="bold" className="w-6 h-6 text-zinc-900" />
          </div>
        </motion.div>
      </div>

      <div className="p-4" style={{ transform: 'translateZ(30px)' }}>
        <h3
          className="text-lg font-semibold text-white group-hover:text-primary-400
                       transition-colors duration-300 flex items-center gap-2"
        >
          {website.title}
          <ArrowUpRight
            weight="bold"
            className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </h3>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 0.5 : 0 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), oklch(0.65 0.08 60 / 0.15), transparent 50%)',
          transform: 'translateZ(10px)',
        }}
      />
    </motion.a>
  )
}

export default WebsiteTiltCard
