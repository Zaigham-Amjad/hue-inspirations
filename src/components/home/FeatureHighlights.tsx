import { Card, CardContent } from "@/components/ui/card";
import { Palette, Search, Download, Zap, Star, Target } from "lucide-react";

export function FeatureHighlights() {
  const features = [
    {
      title: "AI-Powered Color Extraction",
      description: "Advanced algorithms analyze artworks and extract the most harmonious color palettes automatically.",
      Icon: Palette,
      gradient: "bg-gradient-primary",
    },
    {
      title: "Instant Search & Discovery", 
      description: "Search through thousands of artworks by keyword, artist, style, or historical period in milliseconds.",
      Icon: Search,
      gradient: "bg-gradient-secondary",
    },
    {
      title: "Professional Export Formats",
      description: "Download palettes as SVG, Adobe ASE files, or copy hex codes directly for immediate use in your projects.",
      Icon: Download,
      gradient: "bg-gradient-primary",
    },
    {
      title: "Lightning Fast Performance",
      description: "Client-side processing ensures instant results without uploads or waiting times.",
      Icon: Zap,
      gradient: "bg-gradient-secondary",
    },
  ];

  return (
    <section id="features" aria-labelledby="features-heading" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Core Features</span>
          </div>
          <h2 id="features-heading" className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            What makes Hue Inspirations
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              special
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Professional-grade color tools designed for creative professionals who demand 
            excellence in their design workflow.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const IconComponent = feature.Icon;
            return (
              <Card 
                key={feature.title} 
                className="group bg-gradient-card backdrop-blur-sm border border-border/60 hover:shadow-glow transition-all duration-500 hover:-translate-y-2"
              >
                <CardContent className="p-8 text-center">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.gradient} rounded-2xl mb-6 shadow-soft group-hover:shadow-glow transition-all duration-300`}>
                    <IconComponent className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="mt-6 w-12 h-1 bg-gradient-primary rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Target className="w-4 h-4 text-primary" />
            <span>Built for designers, by designers</span>
          </div>
        </div>
      </div>
    </section>
  );
}