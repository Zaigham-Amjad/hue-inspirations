/**
 * 🎨 Application constants and configuration
 * Centralized configuration for art periods, styles, and app settings
 */

import { ArtPeriod, ArtStyle } from '@/types/artwork';

/**
 * Art historical periods for filtering
 */
export const ART_PERIODS: ArtPeriod[] = [
  {
    value: 'all',
    label: 'All Periods',
    description: 'Show artworks from all time periods'
  },
  {
    value: 'renaissance',
    label: 'Renaissance',
    description: 'European art from 1400-1600, featuring humanism and perspective'
  },
  {
    value: 'baroque',
    label: 'Baroque',
    description: 'Dramatic art from 1600-1750, known for movement and emotion'
  },
  {
    value: 'impressionism',
    label: 'Impressionism',
    description: 'Late 19th century movement focusing on light and color'
  },
  {
    value: 'modern',
    label: 'Modern Art',
    description: 'Revolutionary art from 1880-1945, breaking traditional rules'
  },
  {
    value: 'contemporary',
    label: 'Contemporary',
    description: 'Art from 1945 to present, diverse and experimental'
  }
];

/**
 * Art styles for filtering
 */
export const ART_STYLES: ArtStyle[] = [
  {
    value: 'all',
    label: 'All Styles',
    description: 'Show artworks in all artistic styles'
  },
  {
    value: 'painting',
    label: 'Paintings',
    description: 'Traditional and modern painted artworks'
  },
  {
    value: 'sculpture',
    label: 'Sculptures',
    description: 'Three-dimensional artistic works'
  },
  {
    value: 'photography',
    label: 'Photography',
    description: 'Photographic art and documentation'
  },
  {
    value: 'print',
    label: 'Prints',
    description: 'Woodcuts, etchings, lithographs, and screen prints'
  },
  {
    value: 'drawing',
    label: 'Drawings',
    description: 'Sketches, studies, and finished drawings'
  },
  {
    value: 'textile',
    label: 'Textiles',
    description: 'Fabric art, tapestries, and fiber works'
  }
];

/**
 * Search suggestions for inspiration
 */
export const SEARCH_SUGGESTIONS = [
  'Van Gogh sunflowers',
  'Monet water lilies',
  'Japanese woodblock prints',
  'Art nouveau posters',
  'Abstract expressionism',
  'Renaissance portraits',
  'Impressionist landscapes',
  'Modern still life',
  'Color field paintings',
  'Botanical illustrations',
  'Urban scenes',
  'Ocean and waves',
  'Mountain landscapes',
  'Flower arrangements',
  'Geometric patterns'
];

/**
 * Application configuration
 */
export const APP_CONFIG = {
  name: 'Hue Inspirations',
  description: 'Discover color palettes from the world\'s greatest artworks',
  version: '1.0.0',
  author: 'Creative Collective',
  
  // API configuration
  defaultSearchLimit: 20,
  maxSearchLimit: 100,
  defaultColorCount: 6,
  maxColorCount: 10,
  
  // Image configuration
  imageQuality: 'medium' as const,
  thumbnailSize: 400,
  previewSize: 800,
  fullSize: 1686,
  
  // Animation durations (ms)
  animations: {
    fast: 200,
    normal: 300,
    slow: 500,
    pageTransition: 400
  },
  
  // Color extraction settings
  colorExtraction: {
    defaultCount: 6,
    minCount: 3,
    maxCount: 10,
    quality: 10 // Lower is better quality but slower
  },
  
  // Social media and SEO
  social: {
    twitter: '@hueinspirations',
    instagram: '@hueinspirations',
    github: 'https://github.com/creative-collective/hue-inspirations'
  },
  
  // External links
  links: {
    artInstitute: 'https://www.artic.edu/',
    apiDocs: 'https://api.artic.edu/docs/',
    colorThief: 'https://lokeshdhakar.com/projects/color-thief/',
    support: 'mailto:support@hueinspirations.com'
  }
};

/**
 * Color palette export formats
 */
export const EXPORT_FORMATS = [
  {
    id: 'svg',
    name: 'SVG Palette',
    description: 'Vector format perfect for design software',
    extension: '.svg',
    mimeType: 'image/svg+xml'
  },
  {
    id: 'ase',
    name: 'Adobe Swatch (.ASE)',
    description: 'Adobe Creative Suite compatible format',
    extension: '.ase',
    mimeType: 'application/octet-stream'
  },
  {
    id: 'css',
    name: 'CSS Variables',
    description: 'CSS custom properties for web development',
    extension: '.css',
    mimeType: 'text/css'
  },
  {
    id: 'json',
    name: 'JSON Data',
    description: 'Machine-readable format for applications',
    extension: '.json',
    mimeType: 'application/json'
  }
];

/**
 * Keyboard shortcuts
 */
export const KEYBOARD_SHORTCUTS = {
  search: 'cmd+k',
  copy: 'cmd+c',
  download: 'cmd+d',
  newSearch: 'cmd+n',
  toggleTheme: 'cmd+shift+t'
};

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  noResults: 'No artworks found. Try adjusting your search terms or filters.',
  imageLoadError: 'Unable to load image. Please try again.',
  colorExtractionError: 'Unable to extract colors from this image.',
  networkError: 'Network error. Please check your connection and try again.',
  apiError: 'Service temporarily unavailable. Please try again later.',
  clipboardError: 'Unable to copy to clipboard. Please try selecting and copying manually.'
};

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  colorCopied: 'Color copied to clipboard!',
  paletteCopied: 'Palette copied to clipboard!',
  paletteDownloaded: 'Palette downloaded successfully!',
  imageLoaded: 'Image loaded successfully',
  colorsExtracted: 'Colors extracted successfully'
};

/**
 * Loading states
 */
export const LOADING_STATES = {
  searching: 'Searching artworks...',
  loadingImage: 'Loading image...',
  extractingColors: 'Analyzing colors...',
  downloadingPalette: 'Preparing download...',
  copying: 'Copying to clipboard...'
};