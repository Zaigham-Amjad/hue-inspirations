/**
 * 🎨 Interactive color palette component
 * Displays colors with copy and download functionality
 */

import { useState } from 'react';
import { Copy, Download, Check, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { copyColorToClipboard, downloadSVGPalette, getColorName } from '@/lib/colors';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ColorPaletteProps {
  colors: string[];
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  showActions?: boolean;
  showNames?: boolean;
  className?: string;
  onColorClick?: (color: string) => void;
}

export function ColorPalette({
  colors,
  title = 'Color Palette',
  size = 'md',
  showActions = true,
  showNames = false,
  className,
  onColorClick
}: ColorPaletteProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const { toast } = useToast();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const handleColorCopy = async (color: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    try {
      await copyColorToClipboard(color);
      setCopiedColor(color);
      toast({
        title: "Color copied!",
        description: `${color} copied to clipboard`,
        duration: 2000,
      });

      // Reset copied state after animation
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy color to clipboard",
        variant: "destructive",
      });
    }
  };

  const handlePaletteDownload = () => {
    try {
      downloadSVGPalette(colors, title);
      toast({
        title: "Palette downloaded!",
        description: `${title}.svg saved to your downloads`,
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Unable to download palette",
        variant: "destructive",
      });
    }
  };

  const handleColorClick = (color: string) => {
    onColorClick?.(color);
  };

  if (!colors || colors.length === 0) {
    return (
      <div className={cn(
        'flex items-center justify-center p-8 text-muted-foreground',
        className
      )}>
        <div className="text-center">
          <Palette className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No colors available</p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className={cn('space-y-4', className)}>
        {/* Header */}
        {showActions && (
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">{title}</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePaletteDownload}
              className="text-xs"
            >
              <Download className="w-3 h-3 mr-1" />
              Download SVG
            </Button>
          </div>
        )}

        {/* Color Grid */}
        <div className="flex flex-wrap gap-2 justify-center">
          {colors.map((color, index) => (
            <Tooltip key={`${color}-${index}`}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleColorClick(color)}
                  className={cn(
                    sizeClasses[size],
                    'relative rounded-lg border-2 border-white shadow-md',
                    'hover:scale-110 transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-primary/50',
                    'group cursor-pointer'
                  )}
                  style={{ backgroundColor: color }}
                  aria-label={`Color ${color}, click to copy`}
                >
                  {/* Copy Overlay */}
                  <div 
                    className={cn(
                      'absolute inset-0 rounded-lg bg-black/0 hover:bg-black/20',
                      'flex items-center justify-center transition-all duration-200',
                      'opacity-0 group-hover:opacity-100'
                    )}
                    onClick={(e) => handleColorCopy(color, e)}
                  >
                    {copiedColor === color ? (
                      <Check className="w-3 h-3 text-white drop-shadow-sm" />
                    ) : (
                      <Copy className="w-3 h-3 text-white drop-shadow-sm" />
                    )}
                  </div>

                  {/* Copied Indicator */}
                  {copiedColor === color && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                      <Check className="w-2 h-2 text-success-foreground" />
                    </div>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-center">
                  <p className="font-mono text-xs">{color.toUpperCase()}</p>
                  {showNames && (
                    <p className="text-xs text-muted-foreground">
                      {getColorName(color)}
                    </p>
                  )}
                  <p className="text-xs opacity-75">Click to copy</p>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Color Details */}
        {showNames && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            {colors.map((color, index) => (
              <div key={`${color}-detail-${index}`} className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded border border-border flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                <div className="min-w-0 flex-1">
                  <p className="font-mono truncate">{color.toUpperCase()}</p>
                  <p className="text-muted-foreground truncate">
                    {getColorName(color)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Palette Stats */}
        {showActions && (
          <div className="text-xs text-muted-foreground text-center">
            {colors.length} colors extracted • Click any color to copy
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}