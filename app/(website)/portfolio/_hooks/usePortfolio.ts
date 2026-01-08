import { useQuery } from '@tanstack/react-query'
import { fetchPortfolioData } from '@/sanity/lib/portfolio'
import type { CloudinaryVideo, CloudinaryGraphic } from '@/sanity/lib/types'

const portfolioKeys = {
  all: ['portfolio'] as const,
  data: (tags?: string[]) => [...portfolioKeys.all, 'data', tags] as const,
}

const usePortfolio = (tags?: string[]) => {
  return useQuery({
    queryKey: portfolioKeys.data(tags),
    queryFn: () => fetchPortfolioData(tags),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export const usePortfolioItems = (tags?: string[]) => {
  const { data, isLoading, error } = usePortfolio(tags)

  const allItems: (CloudinaryVideo | CloudinaryGraphic)[] = [
    ...(data?.videos || []),
    ...(data?.graphics || []),
  ]

  return {
    items: allItems,
    videos: data?.videos || [],
    graphics: data?.graphics || [],
    meta: data?.meta,
    isLoading,
    error,
  }
}
