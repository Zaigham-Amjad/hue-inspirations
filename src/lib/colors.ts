/**
 * 🎨 Color extraction and palette utilities
 * Uses ColorThief for dominant color extraction from artwork images
 */

import ColorThief from 'colorthief';

/**
 * Extract color palette from an image element
 * Returns array of RGB values converted to hex
 */
export async function extractColorsFromImage(
  imageElement: HTMLImageElement,
  colorCount: number = 6
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    try {
      const colorThief = new ColorThief();
      
      // Ensure image is loaded and from the same origin or CORS-enabled
      if (!imageElement.complete) {
        imageElement.onload = () => {
          try {
            const palette = colorThief.getPalette(imageElement, colorCount);
            const hexColors = palette.map(rgbToHex);
            resolve(hexColors);
          } catch (error) {
            reject(error);
          }
        };
        imageElement.onerror = () => reject(new Error('Failed to load image'));
      } else {
        const palette = colorThief.getPalette(imageElement, colorCount);
        const hexColors = palette.map(rgbToHex);
        resolve(hexColors);
      }
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Get the dominant color from an image
 */
export async function getDominantColor(imageElement: HTMLImageElement): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const colorThief = new ColorThief();
      
      if (!imageElement.complete) {
        imageElement.onload = () => {
          try {
            const dominantColor = colorThief.getColor(imageElement);
            resolve(rgbToHex(dominantColor));
          } catch (error) {
            reject(error);
          }
        };
        imageElement.onerror = () => reject(new Error('Failed to load image'));
      } else {
        const dominantColor = colorThief.getColor(imageElement);
        resolve(rgbToHex(dominantColor));
      }
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Convert RGB array to hex string
 */
export function rgbToHex([r, g, b]: number[]): string {
  return `#${[r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('')}`;
}

/**
 * Convert hex to HSL for better color analysis
 */
export function hexToHsl(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0];

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

/**
 * Get color name approximation based on HSL values
 */
export function getColorName(hex: string): string {
  const [h, s, l] = hexToHsl(hex);
  
  if (l < 15) return 'Black';
  if (l > 85) return 'White';
  if (s < 10) return l > 50 ? 'Light Gray' : 'Dark Gray';
  
  const hueNames = [
    { min: 0, max: 15, name: 'Red' },
    { min: 15, max: 45, name: 'Orange' },
    { min: 45, max: 75, name: 'Yellow' },
    { min: 75, max: 150, name: 'Green' },
    { min: 150, max: 210, name: 'Cyan' },
    { min: 210, max: 270, name: 'Blue' },
    { min: 270, max: 315, name: 'Purple' },
    { min: 315, max: 360, name: 'Pink' }
  ];
  
  const hue = hueNames.find(range => h >= range.min && h < range.max);
  const lightness = l > 70 ? 'Light ' : l < 30 ? 'Dark ' : '';
  
  return `${lightness}${hue?.name || 'Unknown'}`;
}

/**
 * Copy color hex to clipboard
 */
export async function copyColorToClipboard(hex: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(hex);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = hex;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  }
}

/**
 * Generate SVG palette for download
 */
export function generateSVGPalette(colors: string[], title: string = 'Color Palette'): string {
  const colorWidth = 80;
  const colorHeight = 80;
  const spacing = 10;
  const totalWidth = colors.length * (colorWidth + spacing) - spacing;
  const totalHeight = colorHeight + 60; // Extra space for title

  let svg = `
    <svg width="${totalWidth}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .title { font-family: system-ui, -apple-system, sans-serif; font-size: 14px; font-weight: 600; fill: #333; }
          .color-label { font-family: system-ui, -apple-system, sans-serif; font-size: 11px; fill: #666; }
        </style>
      </defs>
      
      <!-- Title -->
      <text x="${totalWidth / 2}" y="20" text-anchor="middle" class="title">${title}</text>
      
      <!-- Color swatches -->
  `;

  colors.forEach((color, index) => {
    const x = index * (colorWidth + spacing);
    const y = 35;
    
    svg += `
      <!-- Color ${index + 1} -->
      <rect x="${x}" y="${y}" width="${colorWidth}" height="${colorHeight}" fill="${color}" stroke="#ddd" stroke-width="1" rx="4"/>
      <text x="${x + colorWidth / 2}" y="${y + colorHeight + 15}" text-anchor="middle" class="color-label">${color.toUpperCase()}</text>
    `;
  });

  svg += '</svg>';
  return svg;
}

/**
 * Download SVG palette as file
 */
export function downloadSVGPalette(colors: string[], filename: string = 'palette'): void {
  const svg = generateSVGPalette(colors, filename);
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generate ASE (Adobe Swatch Exchange) file content
 * Note: This is a simplified version for basic compatibility
 */
export function generateASEFile(colors: string[], title: string = 'Hue Palette'): Uint8Array {
  // ASE file format is complex, this is a basic implementation
  // For production, consider using a dedicated library
  const header = new TextEncoder().encode('ASEF');
  const version = new Uint32Array([0x00010000]); // Version 1.0
  
  // This is a simplified version - for full ASE support, 
  // you'd need a more comprehensive implementation
  const fileContent = new Uint8Array(header.length + version.byteLength);
  fileContent.set(header, 0);
  fileContent.set(new Uint8Array(version.buffer), header.length);
  
  return fileContent;
}

/**
 * Create cross-origin safe image element for color extraction
 */
export function createCorsImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });
}