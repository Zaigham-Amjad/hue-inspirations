import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useArtworkSearch } from "@/hooks/useArtworkSearch";
import { SearchBar } from "@/components/search/SearchBar";
import { SearchFilters } from "@/components/search/SearchFilters";
import { ArtworkGallery } from "@/components/gallery/ArtworkGallery";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") ?? "";
  const initialStyle = searchParams.get("style") ?? "all";
  const initialPeriod = searchParams.get("period") ?? "all";

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
    resetSearch,
  } = useArtworkSearch({ initialQuery, autoSearch: Boolean(initialQuery.trim()) });

  // Sync filters from URL only when a query exists to avoid disabling featured state in the hook
  useEffect(() => {
    if (initialQuery.trim()) {
      const patch: any = {};
      if (initialStyle && initialStyle !== "all") patch.style = initialStyle;
      if (initialPeriod && initialPeriod !== "all") patch.period = initialPeriod;
      if (Object.keys(patch).length) updateFilters(patch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep URL in sync with current filters
  useEffect(() => {
    const params: Record<string, string> = {};
    if (filters.query.trim()) params.q = filters.query;
    if (filters.style && filters.style !== "all") params.style = String(filters.style);
    if (filters.period && filters.period !== "all") params.period = String(filters.period);
    setSearchParams(params, { replace: true });
  }, [filters.query, filters.style, filters.period, setSearchParams]);

  // Basic SEO
  useEffect(() => {
    document.title = filters.query
      ? `Explore palettes for "${filters.query}" | Hue Inspirations`
      : "Explore Color Palettes | Hue Inspirations";
    const desc =
      "Search artworks and extract beautiful color palettes. Filter by style and period, copy HEX, and download SVG/ASE.";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }
    // Canonical
    const url = window.location.origin + "/explore" + (window.location.search || "");
    let link = document.querySelector("link[rel=canonical]");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);
  }, [filters.query]);

  const hasActiveFilters = useMemo(
    () => filters.style !== "all" || filters.period !== "all",
    [filters.style, filters.period]
  );

  const handleSearch = (q: string) => {
    search(q);
  };

  const handleFiltersChange = (patch: any) => {
    updateFilters(patch);
  };

  const handleReset = () => {
    resetSearch();
    setSearchParams({}, { replace: true });
  };

  const isSearching = Boolean(filters.query.trim());
  const hasResults = artworks.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Search header */}
      <section className="sticky top-16 z-30 bg-background/95 backdrop-blur border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 max-w-4xl w-full">
              <SearchBar
                value={filters.query}
                onChange={(value) => updateFilters({ query: value })}
                onSearch={handleSearch}
                placeholder="Search artworks, artists, styles..."
                hasActiveFilters={hasActiveFilters}
                onShowFilters={() => {}}
              />
            </div>

            <SearchFilters filters={filters} onFiltersChange={handleFiltersChange} />
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {(hasResults || isLoading) && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                  {isSearching ? "Search Results" : "Curated Collection"}
                </h1>
                {totalResults > 0 && (
                  <p className="text-lg text-muted-foreground">
                    {totalResults.toLocaleString()} beautiful artworks 
                    {isSearching && <span> matching "{filters.query}"</span>}
                  </p>
                )}
                {!isSearching && (
                  <p className="text-muted-foreground">
                    Discover extraordinary artworks and extract stunning color palettes
                  </p>
                )}
              </div>

              {(hasActiveFilters || isSearching) && (
                <Button 
                  variant="outline" 
                  onClick={handleReset} 
                  className="text-muted-foreground hover:text-foreground hover:border-primary/30"
                >
                  Clear all
                </Button>
              )}
            </div>
          </div>
        )}

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
    </div>
  );
};

export default Explore;
