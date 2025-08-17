import { useQueryClient } from "@tanstack/react-query";
import { portfolioKeys } from "./usePortfolio";

// Hook for manually refreshing portfolio data
export const usePortfolioRefresh = () => {
  const queryClient = useQueryClient();

  const refreshPortfolio = async () => {
    // Invalidate all portfolio queries
    await queryClient.invalidateQueries({ 
      queryKey: portfolioKeys.all 
    });
  };

  const refreshWithTags = async (tags?: string[]) => {
    // Invalidate specific portfolio query with tags
    await queryClient.invalidateQueries({ 
      queryKey: portfolioKeys.data(tags) 
    });
  };

  const clearPortfolioCache = () => {
    // Remove all portfolio data from cache
    queryClient.removeQueries({ 
      queryKey: portfolioKeys.all 
    });
  };

  return {
    refreshPortfolio,
    refreshWithTags,
    clearPortfolioCache,
  };
};