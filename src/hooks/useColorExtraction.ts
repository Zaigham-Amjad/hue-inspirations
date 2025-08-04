/**
 * 🎨 Custom hook for color extraction from artwork images
 * Manages color palette extraction, caching, and error handling
 */

import React, { useState, useCallback, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  extractColorsFromImage, 
  getDominantColor, 
  createCorsImage 
} from '@/lib/colors';
import { Artwork, ColorPalette } from '@/types/artwork';
import { getImageUrl } from '@/lib/api';
import { APP_CONFIG } from '@/lib/constants';

interface UseColorExtractionProps {
  artwork: Artwork;
  colorCount?: number;
  quality?: number;
}

interface UseColorExtractionReturn {
  palette: ColorPalette | null;
  isExtracting: boolean;
  isError: boolean;
  error: Error | null;
  extractColors: () => Promise<void>;
  retryExtraction: () => void;
}

export function useColorExtraction({
  artwork,
  colorCount = APP_CONFIG.colorExtraction.defaultCount,
  quality = APP_CONFIG.colorExtraction.quality
}: UseColorExtractionProps): UseColorExtractionReturn {
  const [palette, setPalette] = useState<ColorPalette | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Create a stable query key
  const queryKey = ['colors', artwork.id, colorCount];

  const {
    data,
    isLoading: isExtracting,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey,
    queryFn: async (): Promise<ColorPalette> => {
      if (!artwork.image_id) {
        throw new Error('No image available for color extraction');
      }

      try {
        // Create CORS-enabled image
        const imageUrl = getImageUrl(artwork.image_id, 'medium');
        const img = await createCorsImage(imageUrl);
        
        // Store reference for potential reuse
        imageRef.current = img;

        // Extract colors and dominant color in parallel
        const [colors, dominantColor] = await Promise.all([
          extractColorsFromImage(img, colorCount),
          getDominantColor(img)
        ]);

        return {
          artwork,
          colors,
          dominantColor
        };
      } catch (error) {
        console.error('Color extraction failed:', error);
        throw new Error('Failed to extract colors from artwork');
      }
    },
    enabled: false, // Don't auto-fetch, wait for manual trigger
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - colors don't change
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  });

  // Update palette when query data changes
  React.useEffect(() => {
    if (data) {
      setPalette(data);
    }
  }, [data]);

  const extractColors = useCallback(async () => {
    try {
      await refetch();
    } catch (error) {
      console.error('Manual color extraction failed:', error);
    }
  }, [refetch]);

  const retryExtraction = useCallback(() => {
    setPalette(null);
    refetch();
  }, [refetch]);

  return {
    palette,
    isExtracting,
    isError,
    error: error as Error | null,
    extractColors,
    retryExtraction
  };
}

/**
 * Hook for extracting colors from multiple artworks
 */
interface UseBatchColorExtractionProps {
  artworks: Artwork[];
  colorCount?: number;
  maxConcurrent?: number;
}

interface UseBatchColorExtractionReturn {
  palettes: Map<number, ColorPalette>;
  isExtracting: boolean;
  progress: number;
  extractAllColors: () => Promise<void>;
  extractColorsForArtwork: (artwork: Artwork) => Promise<ColorPalette | null>;
}

export function useBatchColorExtraction({
  artworks,
  colorCount = APP_CONFIG.colorExtraction.defaultCount,
  maxConcurrent = 3
}: UseBatchColorExtractionProps): UseBatchColorExtractionReturn {
  const [palettes, setPalettes] = useState<Map<number, ColorPalette>>(new Map());
  const [isExtracting, setIsExtracting] = useState(false);
  const [progress, setProgress] = useState(0);

  const extractColorsForArtwork = useCallback(async (artwork: Artwork): Promise<ColorPalette | null> => {
    if (!artwork.image_id) return null;

    try {
      const imageUrl = getImageUrl(artwork.image_id, 'medium');
      const img = await createCorsImage(imageUrl);
      
      const [colors, dominantColor] = await Promise.all([
        extractColorsFromImage(img, colorCount),
        getDominantColor(img)
      ]);

      const palette: ColorPalette = {
        artwork,
        colors,
        dominantColor
      };

      setPalettes(prev => new Map(prev).set(artwork.id, palette));
      return palette;
    } catch (error) {
      console.error(`Color extraction failed for artwork ${artwork.id}:`, error);
      return null;
    }
  }, [colorCount]);

  const extractAllColors = useCallback(async () => {
    setIsExtracting(true);
    setProgress(0);

    try {
      const batches = [];
      for (let i = 0; i < artworks.length; i += maxConcurrent) {
        batches.push(artworks.slice(i, i + maxConcurrent));
      }

      let completed = 0;
      
      for (const batch of batches) {
        const promises = batch.map(extractColorsForArtwork);
        await Promise.allSettled(promises);
        
        completed += batch.length;
        setProgress((completed / artworks.length) * 100);
      }
    } finally {
      setIsExtracting(false);
    }
  }, [artworks, extractColorsForArtwork, maxConcurrent]);

  return {
    palettes,
    isExtracting,
    progress,
    extractAllColors,
    extractColorsForArtwork
  };
}