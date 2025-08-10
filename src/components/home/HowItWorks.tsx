import { Card, CardContent } from "@/components/ui/card";
import { Search, Eye, Download, ArrowRight, Sparkles } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      title: "Browse & Discover",
      text: "Search through thousands of masterpieces from the Art Institute of Chicago. Filter by artist, style, or historical period.",
      number: 1,
      Icon: Search,
      gradient: "bg-gradient-primary",
    },
    {
      title: "Analyze & Extract",
      text: "Our AI instantly analyzes the artwork and extracts a professionally curated color palette with perfect harmony.",
      number: 2,
      Icon: Eye,
      gradient: "bg-gradient-secondary",
    },
    {
      title: "Export & Create",
      text: "Download palettes as SVG, Adobe ASE files, or copy hex codes. Integrate seamlessly into your design workflow.",
      number: 3,
      Icon: Download,
      gradient: "bg-gradient-primary",
    },
  ];

  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-muted/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Simple Process</span>
          </div>
          <h2 id="how-heading" className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            From artwork to palette
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              in 3 simple steps
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            No accounts, no uploads, no complexity. Just pure, instant color inspiration 
            from the world's greatest masterpieces.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <div className="flex justify-between items-center">
              <div className="w-8 h-8" />
              <div className="flex-1 h-0.5 bg-gradient-primary mx-8" />
              <div className="w-8 h-8" />
              <div className="flex-1 h-0.5 bg-gradient-primary mx-8" />
              <div className="w-8 h-8" />
            </div>
          </div>

          <div className="grid gap-12 lg:gap-8 lg:grid-cols-3">
            {steps.map((step, index) => {
              const IconComponent = step.Icon;
              return (
                <div key={step.number} className="text-center group">
                  {/* Step Number & Icon */}
                  <div className="relative mb-8">
                    <div className={`inline-flex items-center justify-center w-20 h-20 ${step.gradient} rounded-3xl shadow-glow group-hover:shadow-soft transition-all duration-300 group-hover:scale-110`}>
                      <IconComponent className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{step.number}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                    {step.text}
                  </p>

                  {/* Arrow for mobile */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center mt-8 lg:hidden">
                      <ArrowRight className="w-6 h-6 text-primary" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-success/10 border border-success/20 rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span className="text-sm text-success-foreground font-medium">
              Completely free to use • No registration required
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}