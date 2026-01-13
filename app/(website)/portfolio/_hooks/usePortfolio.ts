import { useQuery } from '@tanstack/react-query'
import { fetchPortfolioData, type FetchPortfolioOptions } from '@/sanity/lib/portfolio'
import type { CloudinaryVideo, CloudinaryGraphic } from '@/sanity/lib/types'

const portfolioKeys = {
  all: ['portfolio'] as const,
  data: (gallerySlug?: string, tags?: string[]) =>
    [...portfolioKeys.all, 'data', gallerySlug, tags] as const,
}

const usePortfolio = (options?: FetchPortfolioOptions) => {
  return useQuery({
    queryKey: portfolioKeys.data(options?.gallerySlug, options?.tags),
    queryFn: () => fetchPortfolioData(options),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export const usePortfolioItems = (options?: FetchPortfolioOptions) => {
  const { data, isLoading, error } = usePortfolio(options)

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
