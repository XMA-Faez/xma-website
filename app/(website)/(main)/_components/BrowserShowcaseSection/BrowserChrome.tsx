import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface BrowserChromeProps {
  children: ReactNode
  className?: string
}

const windowControlColors = {
  close: 'oklch(0.628 0.258 29.23)',
  minimize: 'oklch(0.869 0.195 91.94)',
  maximize: 'oklch(0.648 0.2 142.5)',
}

const BrowserChrome = ({ children, className }: BrowserChromeProps) => {
  return (
    <div
      className={cn(
        'relative rounded-xl border border-white/10 bg-zinc-900/90 shadow-2xl',
        className
      )}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: windowControlColors.close }}
            aria-hidden="true"
          />
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: windowControlColors.minimize }}
            aria-hidden="true"
          />
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: windowControlColors.maximize }}
            aria-hidden="true"
          />
        </div>
      </div>
      {children}
    </div>
  )
}

export default BrowserChrome
