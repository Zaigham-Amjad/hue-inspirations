/**
 * 🎨 Art Institute of Chicago API integration
 * Handles artwork search and image URL generation
 */

import { ApiResponse, SearchFilters } from '@/types/artwork';

const BASE_URL = 'https://api.artic.edu/api/v1';
const IIIF_URL = 'https://www.artic.edu/iiif/2';

/**
 * Search artworks with comprehensive filters
 * Ensures we only get artworks with images
 */
export async function searchArtworks(filters: SearchFilters): Promise<ApiResponse> {
  const { query, style, period, limit = 20, page = 1 } = filters;
  const offset = (page - 1) * limit;

  // Build search query with filters for artworks that have images
  let searchQuery = query || '*';
  
  // Add style filter if specified
  if (style && style !== 'all') {
    searchQuery += ` style:${style}`;
  }
  
  // Add period filter if specified (using date ranges)
  if (period && period !== 'all') {
    const periodQueries: Record<string, string> = {
      'renaissance': 'date_start:[1400 TO 1600]',
      'baroque': 'date_start:[1600 TO 1750]',
      'impressionism': 'date_start:[1860 TO 1886]',
      'modern': 'date_start:[1880 TO 1945]',
      'contemporary': 'date_start:[1945 TO *]'
    };
    
    if (periodQueries[period]) {
      searchQuery += ` ${periodQueries[period]}`;
    }
  }

  const params = new URLSearchParams({
    q: searchQuery,
    limit: limit.toString(),
    page: page.toString(),
    fields: 'id,title,artist_display,date_display,medium_display,style_title,classification_title,image_id,thumbnail',
    // Only return artworks that have images
    'boost': 'false',
    'query': JSON.stringify({
      bool: {
        must: [
          {
            exists: {
              field: 'image_id'
            }
          },
          {
            term: {
              'is_public_domain': true
            }
          }
        ]
      }
    })
  });

  try {
    const response = await fetch(`${BASE_URL}/artworks/search?${params}`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter out artworks without valid image_id
    data.data = data.data.filter((artwork: any) => artwork.image_id);
    
    return data;
  } catch (error) {
    console.error('Error fetching artworks:', error);
    throw new Error('Failed to fetch artworks. Please try again.');
  }
}

/**
 * Generate high-quality image URL from image_id
 * Uses IIIF Image API for optimal image delivery
 */
export function getImageUrl(imageId: string, size: 'thumbnail' | 'medium' | 'large' = 'medium'): string {
  if (!imageId) return '';
  
  const sizeMap = {
    thumbnail: '400,',
    medium: '800,',
    large: '1686,'
  };
  
  return `${IIIF_URL}/${imageId}/full/${sizeMap[size]}/0/default.jpg`;
}

/**
 * Get direct artwork details by ID
 */
export async function getArtworkById(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/artworks/${id}?fields=id,title,artist_display,date_display,medium_display,style_title,classification_title,image_id,thumbnail`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch artwork: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching artwork by ID:', error);
    throw error;
  }
}

/**
 * Get curated artworks for homepage inspiration
 */
export async function getFeaturedArtworks(): Promise<ApiResponse> {
  return searchArtworks({
    query: 'is_public_domain:true',
    limit: 24,
    page: 1
  });
}