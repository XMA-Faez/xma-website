import { useState, useEffect } from 'react';
import { ProcessedPortfolioItem, fetchPortfolioItems, fetchPortfolioCategories, PortfolioCategory } from '@/lib/contentful-portfolio';

interface UsePortfolioItemsReturn {
  items: ProcessedPortfolioItem[];
  categories: PortfolioCategory[];
  isLoading: boolean;
  error: Error | null;
  total: number;
  hasMore: boolean;
  refetch: (categorySlug?: string) => Promise<void>;
  loadMore: () => Promise<void>;
}

export function usePortfolioItems(initialCategorySlug?: string): UsePortfolioItemsReturn {
  const [items, setItems] = useState<ProcessedPortfolioItem[]>([]);
  const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | undefined>(initialCategorySlug);

  const fetchData = async (categorySlug?: string, reset = true) => {
    try {
      setIsLoading(true);
      setError(null);
      setCurrentCategory(categorySlug);
      
      const skip = reset ? 0 : items.length;
      const limit = 20; // Load 20 items at a time
      
      const [portfolioResult, portfolioCategories] = await Promise.all([
        fetchPortfolioItems(categorySlug, limit, skip),
        categories.length > 0 ? Promise.resolve(categories) : fetchPortfolioCategories(),
      ]);
      
      if (reset) {
        setItems(portfolioResult.items);
      } else {
        setItems(prev => [...prev, ...portfolioResult.items]);
      }
      
      setCategories(portfolioCategories.length ? portfolioCategories : await fetchPortfolioCategories());
      setTotal(portfolioResult.total);
      setHasMore(portfolioResult.hasMore);
    } catch (err) {
      console.error('Error fetching portfolio data:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch portfolio data'));
      if (reset) {
        setItems([]);
        setTotal(0);
        setHasMore(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(initialCategorySlug);
  }, [initialCategorySlug]);

  const refetch = async (categorySlug?: string) => {
    await fetchData(categorySlug, true);
  };

  const loadMore = async () => {
    if (!hasMore || isLoading) return;
    await fetchData(currentCategory, false);
  };

  return {
    items,
    categories,
    isLoading,
    error,
    total,
    hasMore,
    refetch,
    loadMore,
  };
}