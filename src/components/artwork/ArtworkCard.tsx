/**
 * 🎨 Elegant artwork card with color palette overlay
 * Core component for displaying artworks with extractable colors
 */

import { useState, useRef } from 'react';
import { Palette, Download, Copy, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useColorExtraction } from '@/hooks/useColorExtraction';
import { ColorPalette } from '@/components/colors/ColorPalette';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { getImageUrl } from '@/lib/api';
import { Artwork } from '@/types/artwork';
import { cn } from '@/lib/utils';

interface ArtworkCardProps {
  artwork: Artwork;
  onViewDetails?: (artwork: Artwork) => void;
  onExtractColors?: (artwork: Artwork) => void;
  showColorPalette?: boolean;
  className?: string;
}

export function ArtworkCard({
  artwork,
  onViewDetails,
  onExtractColors,
  showColorPalette = false,
  className
}: ArtworkCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const {
    palette,
    isExtracting,
    extractColors
  } = useColorExtraction({ artwork });

  const imageUrl = getImageUrl(artwork.image_id, 'medium');
  const thumbnailUrl = getImageUrl(artwork.image_id, 'thumbnail');

  const handleExtractColors = async () => {
    try {
      await extractColors();
      onExtractColors?.(artwork);
    } catch (error) {
      console.error('Failed to extract colors:', error);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  // Clean artist display name
  const cleanArtistName = artwork.artist_display
    ?.replace(/\n.*/, '') // Remove everything after first newline
    ?.trim() || 'Unknown Artist';

  const cleanTitle = artwork.title?.replace(/\s+/g, ' ').trim() || 'Untitled';

  return (
    <Card 
      className={cn(
        'group relative overflow-hidden bg-gradient-card border-border/50 shadow-card',
        'hover:shadow-glow transition-all duration-300',
        'transform hover:scale-[1.02]',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          {/* Loading State */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
              <LoadingSpinner size="md" />
            </div>
          )}

          {/* Error State */}
          {imageError && (
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Palette className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Image unavailable</p>
              </div>
            </div>
          )}

          {/* Artwork Image */}
          {!imageError && (
            <img
              ref={imageRef}
              src={imageUrl}
              alt={`${cleanTitle} by ${cleanArtistName}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={cn(
                'w-full h-full object-cover transition-all duration-300',
                imageLoaded ? 'opacity-100' : 'opacity-0',
                isHovered && 'scale-105'
              )}
              loading="lazy"
            />
          )}

          {/* Hover Overlay */}
          <div 
            className={cn(
              'absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent',
              'transition-opacity duration-300',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
          >
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={toggleFavorite}
                className={cn(
                  'w-9 h-9 p-0 bg-white/90 backdrop-blur-sm',
                  isFavorited && 'bg-red-500 text-white'
                )}
              >
                <Heart className={cn('w-4 h-4', isFavorited && 'fill-current')} />
              </Button>

              {onViewDetails && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onViewDetails(artwork)}
                  className="w-9 h-9 p-0 bg-white/90 backdrop-blur-sm"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Color Extract Button */}
            <div className="absolute bottom-4 left-4 right-4">
              <Button
                onClick={handleExtractColors}
                disabled={isExtracting || imageError}
                className={cn(
                  'w-full bg-white/90 text-black backdrop-blur-sm',
                  'hover:bg-white transition-all duration-200',
                  isExtracting && 'opacity-75'
                )}
              >
                {isExtracting ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <Palette className="w-4 h-4 mr-2" />
                    Extract Colors
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Art Period Badge */}
          {artwork.style_title && (
            <Badge 
              variant="secondary" 
              className="absolute top-4 left-4 bg-white/90 text-black backdrop-blur-sm"
            >
              {artwork.style_title}
            </Badge>
          )}
        </div>

        {/* Artwork Info */}
        <div className="p-4 space-y-3">
          {/* Title and Artist */}
          <div>
            <h3 className="font-semibold text-foreground line-clamp-2 text-sm leading-tight">
              {cleanTitle}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
              {cleanArtistName}
            </p>
            {artwork.date_display && (
              <p className="text-xs text-muted-foreground mt-1">
                {artwork.date_display}
              </p>
            )}
          </div>

          {/* Color Palette Display */}
          {(showColorPalette || palette) && (
            <div className="pt-2 border-t border-border/50">
              {palette ? (
                <ColorPalette
                  colors={palette.colors}
                  size="sm"
                  showActions={false}
                  className="justify-center"
                />
              ) : (
                <div className="flex items-center justify-center py-2 text-xs text-muted-foreground">
                  <Palette className="w-3 h-3 mr-1" />
                  Click "Extract Colors" to see palette
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}