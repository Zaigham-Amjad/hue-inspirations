/**
 * 🎨 Elegant search bar with suggestions and filters
 * Central component for artwork discovery
 */

import { useState, useRef, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { SEARCH_SUGGESTIONS } from '@/lib/constants';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  onShowFilters?: () => void;
  hasActiveFilters?: boolean;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  onSearch,
  onShowFilters,
  hasActiveFilters = false,
  placeholder = "Search artworks by keyword, artist, or style...",
  className
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter suggestions based on current input
  const suggestions = SEARCH_SUGGESTIONS.filter(suggestion =>
    suggestion.toLowerCase().includes(value.toLowerCase()) && 
    suggestion.toLowerCase() !== value.toLowerCase()
  ).slice(0, 6);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSearch(suggestion);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const clearSearch = () => {
    onChange('');
    inputRef.current?.focus();
  };

  // Handle keyboard navigation for suggestions
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('relative w-full max-w-2xl mx-auto', className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div 
          className={cn(
            'relative flex items-center bg-background border border-border rounded-xl',
            'shadow-soft hover:shadow-glow transition-all duration-300',
            isFocused && 'ring-2 ring-primary/20 border-primary/30'
          )}
        >
          {/* Search Icon */}
          <div className="absolute left-4 text-muted-foreground">
            <Search className="w-5 h-5" />
          </div>

          {/* Input Field */}
          <Input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              'flex-1 pl-12 pr-20 py-4 text-lg bg-transparent border-0',
              'focus-visible:ring-0 focus-visible:ring-offset-0',
              'placeholder:text-muted-foreground/60'
            )}
          />

          {/* Clear Button */}
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-14 p-1 h-auto text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          )}

          {/* Filters Button */}
          {onShowFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onShowFilters}
              className={cn(
                'absolute right-2 p-2 text-muted-foreground hover:text-foreground',
                hasActiveFilters && 'text-primary bg-primary/10'
              )}
            >
              <Filter className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover/95 backdrop-blur-sm border border-border/50 rounded-xl shadow-glow z-50 animate-fade-in">
            <div className="py-3">
              <div className="px-4 py-2 text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Popular Searches
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={cn(
                    'w-full px-4 py-3 text-left text-sm hover:bg-accent/80 hover:text-accent-foreground',
                    'transition-all duration-200 flex items-center gap-3 group'
                  )}
                >
                  <Search className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="font-medium">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Top Keyword Suggestions when empty */}
        {showSuggestions && !value && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover/95 backdrop-blur-sm border border-border/50 rounded-xl shadow-glow z-50 animate-fade-in">
            <div className="py-3">
              <div className="px-4 py-2 text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Trending Keywords
              </div>
              {SEARCH_SUGGESTIONS.slice(0, 8).map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={cn(
                    'w-full px-4 py-3 text-left text-sm hover:bg-accent/80 hover:text-accent-foreground',
                    'transition-all duration-200 flex items-center gap-3 group'
                  )}
                >
                  <Search className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="font-medium">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}