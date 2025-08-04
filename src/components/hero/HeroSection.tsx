/**
 * 🎨 Inspiring hero section for color palette discovery
 * Sets the tone with beautiful design and clear value proposition
 */

import { useState } from 'react';
import { Palette, Sparkles, Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/search/SearchBar';
import { cn } from '@/lib/utils';
import { SEARCH_SUGGESTIONS } from '@/lib/constants';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  className?: string;
}

export function HeroSection({ onSearch, className }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    onSearch(query);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
  };

  const featuredSuggestions = SEARCH_SUGGESTIONS.slice(0, 6);

  return (
    <section className={cn(
      'relative py-20 px-6 bg-gradient-hero overflow-hidden',
      className
    )}>
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Hero Content */}
        <div className="max-w-3xl mx-auto mb-12">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 shadow-glow">
            <Palette className="w-8 h-8 text-primary-foreground" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Discover Colors from
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Great Artworks
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Extract beautiful color palettes from the world's finest artworks. 
            Find inspiration from the Art Institute of Chicago's collection 
            and create your next masterpiece.
          </p>

          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              placeholder="Search for artworks, artists, or styles..."
              className="max-w-2xl"
            />
          </div>

          {/* Quick Suggestions */}
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground font-medium">
              <Sparkles className="w-4 h-4 inline mr-2" />
              Popular searches:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {featuredSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={cn(
                    'text-xs bg-background/80 border-border/50 backdrop-blur-sm',
                    'hover:bg-primary hover:text-primary-foreground',
                    'hover:border-primary transition-all duration-200'
                  )}
                >
                  {suggestion}
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-secondary rounded-xl mx-auto mb-4 flex items-center justify-center">
              <Search className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Instant Search</h3>
            <p className="text-sm text-muted-foreground">
              Find artworks by keyword, artist, style, or historical period
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl mx-auto mb-4 flex items-center justify-center">
              <Palette className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Smart Extraction</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered color analysis extracts perfect palettes from any artwork
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-secondary rounded-xl mx-auto mb-4 flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Export Ready</h3>
            <p className="text-sm text-muted-foreground">
              Download palettes as SVG, Adobe ASE, or copy hex codes instantly
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}