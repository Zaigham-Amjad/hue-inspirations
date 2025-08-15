/**
 * 🎨 Custom hook for artwork search functionality
 * Manages search state, filters, and API interactions
 */

import { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchArtworks, getFeaturedArtworks } from '@/lib/api';
import { Artwork, SearchFilters } from '@/types/artwork';
import { APP_CONFIG } from '@/lib/constants';

interface UseArtworkSearchProps {
  initialQuery?: string;
  autoSearch?: boolean;
}

interface UseArtworkSearchReturn {
  artworks: Artwork[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  filters: SearchFilters;
  updateFilters: (newFilters: Partial<SearchFilters>) => void;
  search: (query: string) => void;
  loadMore: () => void;
  hasNextPage: boolean;
  totalResults: number;
  resetSearch: () => void;
}

export function useArtworkSearch({
  initialQuery = '',
  autoSearch = false
}: UseArtworkSearchProps = {}): UseArtworkSearchReturn {
  const [filters, setFilters] = useState<SearchFilters>({
    query: initialQuery,
    style: 'all',
    period: 'all',
    limit: APP_CONFIG.defaultSearchLimit,
    page: 1
  });

  const [allArtworks, setAllArtworks] = useState<Artwork[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [hasSearched, setHasSearched] = useState(!!initialQuery.trim() || autoSearch);

  // Determine if we should fetch featured artworks or search results
  const shouldFetchFeatured = !hasSearched && !filters.query.trim();
  
  // Query for search results
  const searchQuery = useQuery({
    queryKey: ['artworks', 'search', filters],
    queryFn: () => searchArtworks(filters),
    enabled: hasSearched && !!filters.query.trim(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });

  // Query for featured artworks - always loads on initial page visit
  const featuredQuery = useQuery({
    queryKey: ['artworks', 'featured'],
    queryFn: getFeaturedArtworks,
    enabled: shouldFetchFeatured,
    staleTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false
  });

  // Use the appropriate query based on search state
  const activeQuery = hasSearched ? searchQuery : featuredQuery;

  // Update artworks when query data changes
  useEffect(() => {
    if (activeQuery.data) {
      if (filters.page === 1) {
        // First page or new search - replace artworks
        setAllArtworks(activeQuery.data.data);
      } else {
        // Load more - append to existing artworks
        setAllArtworks(prev => [...prev, ...activeQuery.data.data]);
      }
      
      setTotalResults(activeQuery.data.pagination.total);
    }
  }, [activeQuery.data, filters.page]);

  // Auto-search if enabled and query provided
  useEffect(() => {
    if (autoSearch && initialQuery.trim()) {
      setHasSearched(true);
    }
  }, [autoSearch, initialQuery]);

  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: newFilters.query !== undefined || 
             newFilters.style !== undefined || 
             newFilters.period !== undefined ? 1 : prev.page
    }));

    // If updating search criteria, mark as searched
    if (newFilters.query !== undefined || 
        newFilters.style !== undefined || 
        newFilters.period !== undefined) {
      setHasSearched(true);
    }
  }, []);

  const search = useCallback((query: string) => {
    updateFilters({ query: query.trim(), page: 1 });
    setHasSearched(true);
  }, [updateFilters]);

  const loadMore = useCallback(() => {
    if (!activeQuery.isLoading && hasNextPage) {
      setFilters(prev => ({ ...prev, page: prev.page + 1 }));
    }
  }, [activeQuery.isLoading]);

  const resetSearch = useCallback(() => {
    setFilters({
      query: '',
      style: 'all',
      period: 'all',
      limit: APP_CONFIG.defaultSearchLimit,
      page: 1
    });
    setAllArtworks([]);
    setTotalResults(0);
    setHasSearched(false);
  }, []);

  const hasNextPage = activeQuery.data ? 
    filters.page < activeQuery.data.pagination.total_pages : 
    false;

  return {
    artworks: allArtworks,
    isLoading: activeQuery.isLoading,
    isError: activeQuery.isError,
    error: activeQuery.error,
    filters,
    updateFilters,
    search,
    loadMore,
    hasNextPage,
    totalResults,
    resetSearch
  };
}