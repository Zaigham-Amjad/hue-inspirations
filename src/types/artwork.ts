/**
 * 🎨 Type definitions for Art Institute of Chicago API
 * Provides type safety for artwork data and color palettes
 */

export interface Artwork {
  id: number;
  title: string;
  artist_display: string;
  date_display: string;
  medium_display: string;
  style_title: string;
  classification_title: string;
  image_id: string;
  thumbnail: {
    lqip: string;
    width: number;
    height: number;
    alt_text: string;
  };
}

export interface ApiResponse {
  data: Artwork[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  };
  config: {
    iiif_url: string;
    website_url: string;
  };
}

export interface ColorPalette {
  dominantColor: string;
  colors: string[];
  artwork: Artwork;
}

export interface SearchFilters {
  query: string;
  style?: string;
  period?: string;
  limit: number;
  page: number;
}

export interface ArtPeriod {
  value: string;
  label: string;
  description: string;
}

export interface ArtStyle {
  value: string;
  label: string;
  description: string;
}