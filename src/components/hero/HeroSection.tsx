/**
 * 🎨 Modern hero section for Hue Inspirations
 * Clean, inspiring design focused on brand storytelling
 */

import { Palette, Sparkles, Zap, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {

  return (
    <section className={cn(
      'relative min-h-screen flex items-center py-20 px-6 bg-gradient-hero overflow-hidden',
      className
    )}>
      {/* Modern Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-primary opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-secondary opacity-15 rounded-full blur-3xl" />
        
        {/* Abstract Shapes */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full opacity-40" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-accent rounded-full opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-secondary rounded-full opacity-50" />
        
        {/* Color Palette Preview - Abstract Representation */}
        <div className="absolute top-32 right-32 hidden lg:flex gap-1 opacity-30">
          <div className="w-4 h-12 bg-primary rounded-full" />
          <div className="w-4 h-8 bg-accent rounded-full" />
          <div className="w-4 h-16 bg-secondary rounded-full" />
          <div className="w-4 h-10 bg-primary-glow rounded-full" />
        </div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Hero Content */}
          <div className="text-left">
            {/* Brand Badge */}
            <div className="inline-flex items-center gap-3 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full px-6 py-3 mb-8 shadow-soft">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <Palette className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">Color Discovery Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Discover
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Inspiring Colors
              </span>
              <span className="block text-3xl lg:text-5xl text-muted-foreground font-normal mt-2">
                from Masterpieces
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
              Transform art history into your creative toolkit. Extract professional color palettes 
              from the world's greatest artworks and bring timeless beauty to your designs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button asChild size="lg" className="text-base px-8 py-6 shadow-glow">
                <Link to="/explore">
                  <Palette className="w-5 h-5 mr-2" />
                  Explore Palettes
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-base px-8 py-6">
                <Link to="/explore">
                  <Sparkles className="w-5 h-5 mr-2" />
                  See Examples
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Instant Extraction</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-primary" />
                <span>Export Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>AI Powered</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative hidden lg:block">
            {/* Mock Color Palette Cards */}
            <div className="space-y-6">
              {/* Featured Palette Card */}
              <div className="bg-gradient-card backdrop-blur-sm border border-border/60 rounded-2xl p-6 shadow-card transform rotate-3 hover:rotate-1 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl" />
                  <div>
                    <h3 className="font-semibold text-foreground">Starry Night</h3>
                    <p className="text-sm text-muted-foreground">Van Gogh, 1889</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-8 bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg" />
                  <div className="flex-1 h-8 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-lg" />
                  <div className="flex-1 h-8 bg-gradient-to-r from-gray-800 to-gray-600 rounded-lg" />
                  <div className="flex-1 h-8 bg-gradient-to-r from-cyan-400 to-cyan-200 rounded-lg" />
                </div>
              </div>

              {/* Second Palette Card */}
              <div className="bg-gradient-card backdrop-blur-sm border border-border/60 rounded-2xl p-6 shadow-card transform -rotate-2 hover:rotate-0 transition-transform duration-500 ml-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-secondary rounded-xl" />
                  <div>
                    <h3 className="font-semibold text-foreground">Water Lilies</h3>
                    <p className="text-sm text-muted-foreground">Monet, 1919</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-8 bg-gradient-to-r from-green-600 to-green-400 rounded-lg" />
                  <div className="flex-1 h-8 bg-gradient-to-r from-blue-300 to-blue-100 rounded-lg" />
                  <div className="flex-1 h-8 bg-gradient-to-r from-purple-400 to-purple-200 rounded-lg" />
                  <div className="flex-1 h-8 bg-gradient-to-r from-pink-300 to-pink-100 rounded-lg" />
                </div>
              </div>
            </div>

            {/* Floating Color Dots */}
            <div className="absolute -top-4 -left-4 w-6 h-6 bg-primary rounded-full opacity-60 animate-bounce" />
            <div className="absolute top-20 -right-8 w-4 h-4 bg-accent rounded-full opacity-40" />
            <div className="absolute -bottom-8 left-16 w-8 h-8 bg-secondary rounded-full opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
}