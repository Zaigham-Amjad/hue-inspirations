/**
 * 🎨 Hue Inspirations - Main Application Page
 * Beautiful color palette discovery from world-class artworks
 */

import { useState } from 'react';
import { HeroSection } from '@/components/hero/HeroSection';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchFilters } from '@/components/search/SearchFilters';
import { ArtworkGallery } from '@/components/gallery/ArtworkGallery';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useArtworkSearch } from '@/hooks/useArtworkSearch';
import { cn } from '@/lib/utils';

const Index = () => {
  const [showHero, setShowHero] = useState(true);
  
  const {
    artworks,
    isLoading,
    isError,
    error,
    filters,
    updateFilters,
    search,
    loadMore,
    hasNextPage,
    totalResults,
    resetSearch
  } = useArtworkSearch();

  const handleSearch = (query: string) => {
    search(query);
    setShowHero(false);
  };

  const handleFiltersChange = (newFilters: any) => {
    updateFilters(newFilters);
    setShowHero(false);
  };

  const handleReset = () => {
    resetSearch();
    setShowHero(true);
  };

  const hasActiveFilters = filters.style !== 'all' || filters.period !== 'all';
  const hasResults = artworks.length > 0;
  const isSearching = Boolean(filters.query.trim());

  return (
    <div className="min-h-screen bg-background">
      {/* Theme Toggle - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section - Show when no search is active */}
      {showHero && (
        <HeroSection onSearch={handleSearch} />
      )}

      {/* Search Interface - Show when search is active */}
      {!showHero && (
        <section className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Logo/Home Link */}
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">H</span>
                </div>
                <span className="font-semibold hidden sm:inline">Hue Inspirations</span>
              </button>

              {/* Search Bar */}
              <div className="flex-1 max-w-2xl">
                <SearchBar
                  value={filters.query}
                  onChange={(value) => updateFilters({ query: value })}
                  onSearch={handleSearch}
                  placeholder="Search artworks, artists, styles..."
                />
              </div>

              {/* Filters */}
              <SearchFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      {!showHero && (
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Results Header */}
          {(hasResults || isLoading) && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {isSearching ? `Search Results` : 'Featured Artworks'}
                  </h2>
                  {totalResults > 0 && (
                    <p className="text-muted-foreground">
                      {totalResults.toLocaleString()} artworks found
                      {isSearching && (
                        <span> for "{filters.query}"</span>
                      )}
                    </p>
                  )}
                </div>

                {/* Quick Actions */}
                {hasResults && (
                  <div className="flex items-center gap-2">
                    {(hasActiveFilters || isSearching) && (
                      <button
                        onClick={handleReset}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Gallery */}
          <ArtworkGallery
            artworks={artworks}
            isLoading={isLoading}
            isError={isError}
            error={error}
            hasNextPage={hasNextPage}
            onLoadMore={loadMore}
            onRetry={handleReset}
            className="mb-12"
          />
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">H</span>
                </div>
                <span className="font-semibold text-foreground">Hue Inspirations</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Discover beautiful color palettes from the world's greatest artworks. 
                Extract, copy, and download colors for your creative projects.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>AI-powered color extraction</li>
                <li>High-resolution artwork images</li>
                <li>Instant hex code copying</li>
                <li>SVG & Adobe ASE downloads</li>
                <li>Historical period filtering</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">About</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Powered by the Art Institute of Chicago's public API and 
                advanced color analysis technology.
              </p>
              <p className="text-xs text-muted-foreground">
                Made with ❤️ for designers and artists worldwide
              </p>
            </div>
          </div>

          <div className="border-t border-border/50 mt-8 pt-8 text-center">
            <p className="text-xs text-muted-foreground">
              © 2024 Hue Inspirations. All artwork images courtesy of the Art Institute of Chicago.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
