'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { ArrowSquareOut } from 'phosphor-react'

interface PillCursorProps {
  isVisible: boolean
  containerRef: React.RefObject<HTMLElement | null>
  label?: string
}

const PillCursor = ({
  isVisible,
  containerRef,
  label = 'Click to open in new tab',
}: PillCursorProps) => {
  const [isInside, setIsInside] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const lastMousePosition = useRef({ clientX: 0, clientY: 0 })
  const rafRef = useRef<number | null>(null)

  const updateCursorPosition = useCallback(
    (clientX: number, clientY: number) => {
      const container = containerRef.current
      if (!container) return

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect()
        x.set(clientX - rect.left)
        y.set(clientY - rect.top)
      })
    },
    [containerRef, x, y]
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      lastMousePosition.current = { clientX: e.clientX, clientY: e.clientY }
      updateCursorPosition(e.clientX, e.clientY)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      lastMousePosition.current = { clientX: e.clientX, clientY: e.clientY }
      setIsInside(true)
    }

    const handleMouseLeave = () => setIsInside(false)

    const handleScroll = () => {
      if (isInside) {
        const { clientX, clientY } = lastMousePosition.current
        updateCursorPosition(clientX, clientY)
      }
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [containerRef, isInside, updateCursorPosition])

  const shouldShow = isVisible && isInside

  return (
    <motion.div
      className="pointer-events-none absolute z-50 flex items-center justify-center"
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: shouldShow ? 1 : 0,
        scale: shouldShow ? 1 : 0.8,
      }}
      transition={{ duration: 0.15 }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-lg">
          <ArrowSquareOut weight="bold" className="w-4 h-4" />
          <span>{label}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default PillCursor
