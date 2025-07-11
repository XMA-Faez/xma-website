'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Filter, X } from 'lucide-react'

interface BlogFiltersProps {
  categories: string[]
  tags: string[]
  selectedCategory?: string
  selectedTag?: string
}

export function BlogFilters({ categories, tags, selectedCategory, selectedTag }: BlogFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilterChange = (type: 'category' | 'tag', value: string) => {
    const params = new URLSearchParams(searchParams)
    
    if (type === 'category') {
      if (value === selectedCategory) {
        params.delete('category')
      } else {
        params.set('category', value)
      }
    } else {
      if (value === selectedTag) {
        params.delete('tag')
      } else {
        params.set('tag', value)
      }
    }
    
    params.delete('page')
    router.push(`/blog?${params.toString()}`)
  }

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams)
    params.delete('category')
    params.delete('tag')
    params.delete('page')
    router.push(`/blog?${params.toString()}`)
  }

  const hasActiveFilters = selectedCategory || selectedTag

  return (
    <div className="flex flex-wrap gap-6 items-center justify-center">
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-gray-400" />
        <span className="text-sm font-medium text-gray-300">Filter by:</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-400">Categories:</span>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleFilterChange('category', category)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                : 'bg-zinc-800/50 text-gray-300 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-400">Tags:</span>
        {tags.slice(0, 10).map((tag) => (
          <button
            key={tag}
            onClick={() => handleFilterChange('tag', tag)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedTag === tag
                ? 'bg-red-600/80 text-white shadow-lg shadow-red-600/20'
                : 'bg-zinc-800/50 text-gray-300 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1 px-4 py-1.5 text-sm font-medium text-red-500 hover:text-red-400 transition-colors"
        >
          <X className="w-3 h-3" />
          Clear filters
        </button>
      )}
    </div>
  )
}