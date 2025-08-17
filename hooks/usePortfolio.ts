import { useQuery } from "@tanstack/react-query";
import { 
  fetchPortfolioData, 
  type GalleryResponse,
  type CloudinaryVideo,
  type CloudinaryGraphic
} from "@/lib/contentful-portfolio";

// Query key factory for portfolio queries
export const portfolioKeys = {
  all: ['portfolio'] as const,
  data: (tags?: string[]) => [...portfolioKeys.all, 'data', tags] as const,
  videos: (tags?: string[]) => [...portfolioKeys.all, 'videos', tags] as const,
  graphics: (tags?: string[]) => [...portfolioKeys.all, 'graphics', tags] as const,
};

// Main portfolio hook
export const usePortfolio = (tags?: string[]) => {
  return useQuery({
    queryKey: portfolioKeys.data(tags),
    queryFn: () => fetchPortfolioData(tags),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook for getting videos only
export const usePortfolioVideos = (tags?: string[]) => {
  const { data, isLoading, error } = usePortfolio(tags);
  
  return {
    videos: data?.videos || [],
    isLoading,
    error,
  };
};

// Hook for getting graphics only
export const usePortfolioGraphics = (tags?: string[]) => {
  const { data, isLoading, error } = usePortfolio(tags);
  
  return {
    graphics: data?.graphics || [],
    isLoading,
    error,
  };
};

// Hook for getting all portfolio items combined
export const usePortfolioItems = (tags?: string[]) => {
  const { data, isLoading, error } = usePortfolio(tags);
  
  const allItems: (CloudinaryVideo | CloudinaryGraphic)[] = [
    ...(data?.videos || []),
    ...(data?.graphics || [])
  ];
  
  return {
    items: allItems,
    videos: data?.videos || [],
    graphics: data?.graphics || [],
    meta: data?.meta,
    isLoading,
    error,
  };
};

// Hook for portfolio stats
export const usePortfolioStats = () => {
  const { data, isLoading } = usePortfolio();
  
  const stats = {
    totalProjects: data ? data.meta.totalVideos + data.meta.totalGraphics : 0,
    totalVideos: data?.meta.totalVideos || 0,
    totalGraphics: data?.meta.totalGraphics || 0,
    satisfaction: 98, // Static value
    awards: data ? Math.min(25, Math.floor((data.meta.totalVideos + data.meta.totalGraphics) / 6)) : 25,
  };
  
  return {
    stats,
    isLoading,
  };
};