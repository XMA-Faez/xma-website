'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Lock } from 'lucide-react'

interface BrowserAddressBarProps {
  url: string
}

const formatDisplayUrl = (url: string): string => {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname + urlObj.pathname.replace(/\/$/, '')
  } catch {
    return url
  }
}

const BrowserAddressBar = ({ url }: BrowserAddressBarProps) => {
  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-zinc-900 border-b border-white/5">
      <div className="flex items-center gap-2 flex-1 px-3 py-1.5 rounded-md bg-zinc-800/80 border border-white/5">
        <Lock className="w-3.5 h-3.5 text-success-600 flex-shrink-0" aria-hidden="true" />
        <AnimatePresence mode="wait">
          <motion.span
            key={url}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-neutral-400 truncate"
          >
            {formatDisplayUrl(url)}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default BrowserAddressBar
