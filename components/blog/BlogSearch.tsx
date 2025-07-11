'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'

interface BlogSearchProps {
  initialValue?: string
}

export function BlogSearch({ initialValue = '' }: BlogSearchProps) {
  const [search, setSearch] = useState(initialValue)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    setSearch(initialValue)
  }, [initialValue])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    
    if (search.trim()) {
      params.set('search', search.trim())
    } else {
      params.delete('search')
    }
    
    params.delete('page')
    
    router.push(`/blog?${params.toString()}`)
  }

  const clearSearch = () => {
    setSearch('')
    const params = new URLSearchParams(searchParams)
    params.delete('search')
    params.delete('page')
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-red-500 transition-colors" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search blog posts..."
          className="w-full pl-12 pr-12 py-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-gray-200 placeholder-gray-500 transition-all duration-300"
        />
        {search && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  )
}