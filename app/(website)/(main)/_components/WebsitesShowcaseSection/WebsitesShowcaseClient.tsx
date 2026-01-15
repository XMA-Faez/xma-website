'use client'

import { motion } from 'framer-motion'
import type { ShowcaseWebsiteCard } from '@/sanity/lib/types'
import WebsiteTiltCard from './WebsiteTiltCard'

interface WebsitesShowcaseClientProps {
  websites: ShowcaseWebsiteCard[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const WebsitesShowcaseClient = ({ websites }: WebsitesShowcaseClientProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-sm uppercase tracking-wider text-blue-500 font-semibold mb-4 block">
          Our Work
        </span>
        <h2 className="heading-section text-white mb-4">Websites We&apos;ve Built</h2>
        <p className="text-lg text-neutral-400 max-w-xl mx-auto">
          Premium web experiences designed and developed for our clients
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        style={{ perspective: '1000px' }}
      >
        {websites.map((website) => (
          <motion.div key={website._id} variants={itemVariants}>
            <WebsiteTiltCard website={website} />
          </motion.div>
        ))}
      </motion.div>
    </>
  )
}

export default WebsitesShowcaseClient
