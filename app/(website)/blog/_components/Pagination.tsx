'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
  searchParams: { [key: string]: string | undefined }
}

export function Pagination({ currentPage, totalPages, baseUrl, searchParams }: PaginationProps) {
  const generatePageUrl = (page: number) => {
    const params = new URLSearchParams()
    
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== 'page') {
        params.set(key, value)
      }
    })
    
    if (page > 1) {
      params.set('page', page.toString())
    }
    
    const queryString = params.toString()
    return `${baseUrl}${queryString ? `?${queryString}` : ''}`
  }

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  const visiblePages = getVisiblePages()

  return (
    <nav className="flex items-center justify-center gap-2">
      <Link
        href={generatePageUrl(currentPage - 1)}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          currentPage === 1
            ? 'text-gray-600 cursor-not-allowed opacity-50'
            : 'text-gray-300 hover:bg-zinc-800 hover:text-white'
        }`}
        {...(currentPage === 1 && { 'aria-disabled': true })}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Link>

      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-gray-400">...</span>
            ) : (
              <Link
                href={generatePageUrl(page as number)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === page
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                    : 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {page}
              </Link>
            )}
          </div>
        ))}
      </div>

      <Link
        href={generatePageUrl(currentPage + 1)}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          currentPage === totalPages
            ? 'text-gray-600 cursor-not-allowed opacity-50'
            : 'text-gray-300 hover:bg-zinc-800 hover:text-white'
        }`}
        {...(currentPage === totalPages && { 'aria-disabled': true })}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Link>
    </nav>
  )
}