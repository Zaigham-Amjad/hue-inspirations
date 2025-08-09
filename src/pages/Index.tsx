/**
 * 🎨 Hue Inspirations - Home (Marketing) Page
 * Introduction, offering, and capabilities
 */

import { useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HeroSection } from "@/components/hero/HeroSection";
import { FeatureHighlights } from "@/components/home/FeatureHighlights";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhoBenefits } from "@/components/home/WhoBenefits";
import { HomeStructuredData } from "@/components/seo/HomeStructuredData";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  // SEO for Home
  useEffect(() => {
    document.title = "Hue Inspirations | Discover color palettes from artworks";
    const desc =
      "Learn what Hue Inspirations offers and how it helps creatives. Explore features, how it works, and who benefits.";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }
    // Canonical
    let link = document.querySelector("link[rel=canonical]");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", window.location.origin + "/");
  }, []);

  const handleSearch = useCallback((q: string) => {
    const query = q.trim();
    navigate(query ? `/explore?q=${encodeURIComponent(query)}` : "/explore");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <HeroSection onSearch={handleSearch} />

      {/* CTA to Explore */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center py-6">
          <Button asChild>
            <Link to="/explore">Explore color palettes</Link>
          </Button>
        </div>
      </section>

      {/* Marketing Sections */}
      <main role="main" className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <FeatureHighlights />
        <HowItWorks />
        <WhoBenefits />
        <HomeStructuredData />
      </main>

      {/* Footer - unchanged */}
      <footer className="border-t border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">H</span>
                </div>
                <span className="font-semibold text-foreground">Hue Inspirations</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Discover beautiful color palettes from the world's greatest artworks.
                Extract, copy, and download colors for your creative projects.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>AI-powered color extraction</li>
                <li>High-resolution artwork images</li>
                <li>Instant hex code copying</li>
                <li>SVG & Adobe ASE downloads</li>
                <li>Historical period filtering</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">About</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Powered by the Art Institute of Chicago's public API and
                advanced color analysis technology.
              </p>
              <p className="text-xs text-muted-foreground">Made by Zaigham Amjad</p>
            </div>
          </div>

          <div className="border-t border-border/50 mt-8 pt-8 text-center">
            <p className="text-xs text-muted-foreground">
              © 2024 Hue Inspirations. All artwork images courtesy of the Art Institute of Chicago.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
