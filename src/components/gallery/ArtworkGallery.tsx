/**
 * 🎨 Responsive artwork gallery with infinite scroll
 * Displays artwork cards in a beautiful masonry-style grid
 */

import { useEffect, useRef } from 'react';
import { ArtworkCard } from '@/components/artwork/ArtworkCard';
import { LoadingGrid, LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Artwork } from '@/types/artwork';
import { cn } from '@/lib/utils';
import { RefreshCw, ImageOff } from 'lucide-react';

interface ArtworkGalleryProps {
  artworks: Artwork[];
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  hasNextPage: boolean;
  onLoadMore: () => void;
  onRetry?: () => void;
  onArtworkClick?: (artwork: Artwork) => void;
  className?: string;
}

export function ArtworkGallery({
  artworks,
  isLoading,
  isError,
  error,
  hasNextPage,
  onLoadMore,
  onRetry,
  onArtworkClick,
  className
}: ArtworkGalleryProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!hasNextPage || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isLoading, onLoadMore]);

  // Error State
  if (isError && artworks.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-16', className)}>
        <div className="text-center max-w-md">
          <ImageOff className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Unable to Load Artworks
          </h3>
          <p className="text-muted-foreground mb-6">
            {error?.message || 'Something went wrong while fetching artworks. Please try again.'}
          </p>
          {onRetry && (
            <Button onClick={onRetry} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Empty State
  if (!isLoading && artworks.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-16', className)}>
        <div className="text-center max-w-md">
          <ImageOff className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No Artworks Found
          </h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search terms or filters to discover amazing artworks.
          </p>
          <Button variant="outline" onClick={onRetry}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-8', className)}>
      {/* Artwork Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            onViewDetails={onArtworkClick}
            showColorPalette={false}
            className="h-fit"
          />
        ))}
      </div>

      {/* Loading More Content */}
      {isLoading && artworks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <LoadingGrid count={8} />
        </div>
      )}

      {/* Initial Loading State */}
      {isLoading && artworks.length === 0 && (
        <LoadingGrid count={12} />
      )}

      {/* Load More Trigger */}
      <div ref={loadMoreRef} className="flex justify-center py-8">
        {hasNextPage && !isLoading && (
          <Button
            onClick={onLoadMore}
            variant="outline"
            className="bg-gradient-card hover:bg-gradient-primary hover:text-primary-foreground"
          >
            Load More Artworks
          </Button>
        )}

        {isLoading && artworks.length > 0 && (
          <LoadingSpinner text="Loading more artworks..." />
        )}

        {!hasNextPage && artworks.length > 0 && (
          <p className="text-sm text-muted-foreground">
            You've reached the end of the collection
          </p>
        )}
      </div>

      {/* Error During Load More */}
      {isError && artworks.length > 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground mb-2">
            Failed to load more artworks
          </p>
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RefreshCw className="w-4 h-4 mr-1" />
            Retry
          </Button>
        </div>
      )}
    </div>
  );
}