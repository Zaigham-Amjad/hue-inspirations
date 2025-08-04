/**
 * 🎨 Advanced filters for artwork search
 * Allows filtering by art period, style, and other criteria
 */

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { ART_PERIODS, ART_STYLES } from '@/lib/constants';
import { SearchFilters as SearchFiltersType } from '@/types/artwork';
import { cn } from '@/lib/utils';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: Partial<SearchFiltersType>) => void;
  className?: string;
  trigger?: React.ReactNode;
}

export function SearchFilters({
  filters,
  onFiltersChange,
  className,
  trigger
}: SearchFiltersProps) {
  const [open, setOpen] = useState(false);

  const hasActiveFilters = filters.style !== 'all' || filters.period !== 'all';

  const clearFilters = () => {
    onFiltersChange({
      style: 'all',
      period: 'all'
    });
  };

  const activeFilterCount = [
    filters.style !== 'all' ? 1 : 0,
    filters.period !== 'all' ? 1 : 0
  ].reduce((sum, count) => sum + count, 0);

  const getFilterLabel = (type: 'style' | 'period', value: string) => {
    const options = type === 'style' ? ART_STYLES : ART_PERIODS;
    return options.find(option => option.value === value)?.label || value;
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 mr-2">
          {filters.style !== 'all' && (
            <Badge 
              variant="secondary" 
              className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
            >
              Style: {getFilterLabel('style', filters.style)}
              <button
                onClick={() => onFiltersChange({ style: 'all' })}
                className="ml-1 hover:text-primary-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.period !== 'all' && (
            <Badge 
              variant="secondary" 
              className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
            >
              Period: {getFilterLabel('period', filters.period)}
              <button
                onClick={() => onFiltersChange({ period: 'all' })}
                className="ml-1 hover:text-primary-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Filters Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          {trigger || (
            <Button
              variant="outline"
              size="sm"
              className={cn(
                'relative',
                hasActiveFilters && 'border-primary text-primary bg-primary/5'
              )}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <Badge 
                  variant="secondary" 
                  className="ml-2 text-xs min-w-[20px] h-5 bg-primary text-primary-foreground"
                >
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          )}
        </SheetTrigger>

        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Search Filters
            </SheetTitle>
            <SheetDescription>
              Refine your search to discover specific types of artworks
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Art Style Filter */}
            <div className="space-y-3">
              <Label htmlFor="style-filter" className="text-sm font-medium">
                Art Style
              </Label>
              <Select
                value={filters.style}
                onValueChange={(value) => onFiltersChange({ style: value })}
              >
                <SelectTrigger id="style-filter">
                  <SelectValue placeholder="Select art style" />
                </SelectTrigger>
                <SelectContent>
                  {ART_STYLES.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      <div className="flex flex-col">
                        <span className="font-medium">{style.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {style.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Art Period Filter */}
            <div className="space-y-3">
              <Label htmlFor="period-filter" className="text-sm font-medium">
                Historical Period
              </Label>
              <Select
                value={filters.period}
                onValueChange={(value) => onFiltersChange({ period: value })}
              >
                <SelectTrigger id="period-filter">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  {ART_PERIODS.map((period) => (
                    <SelectItem key={period.value} value={period.value}>
                      <div className="flex flex-col">
                        <span className="font-medium">{period.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {period.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Results Per Page */}
            <div className="space-y-3">
              <Label htmlFor="limit-filter" className="text-sm font-medium">
                Results Per Page
              </Label>
              <Select
                value={filters.limit.toString()}
                onValueChange={(value) => onFiltersChange({ limit: parseInt(value) })}
              >
                <SelectTrigger id="limit-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12 artworks</SelectItem>
                  <SelectItem value="20">20 artworks</SelectItem>
                  <SelectItem value="40">40 artworks</SelectItem>
                  <SelectItem value="60">60 artworks</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>

          {/* Apply Button */}
          <div className="mt-8">
            <Button
              onClick={() => setOpen(false)}
              className="w-full bg-gradient-primary hover:opacity-90"
            >
              Apply Filters
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}