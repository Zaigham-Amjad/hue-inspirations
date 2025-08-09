import { Palette, Search, Download, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeatureHighlights() {
  const features = [
    {
      title: "Smart Artwork Search",
      description:
        "Find inspiring artworks by keyword and instantly explore visual results.",
      Icon: Search,
    },
    {
      title: "Instant Color Palettes",
      description:
        "Extract beautiful color palettes from any artwork using on-device analysis.",
      Icon: Palette,
    },
    {
      title: "Copy & Reuse Colors",
      description:
        "Copy HEX codes in one tap and apply them directly in your design tools.",
      Icon: Download,
    },
    {
      title: "Filter by Style & Period",
      description:
        "Narrow results by movement or era like Impressionism or Renaissance.",
      Icon: Filter,
    },
  ];

  return (
    <section id="features" aria-labelledby="features-heading" className="py-8 md:py-10">
      <header className="mb-6 md:mb-8 text-center">
        <h2 id="features-heading" className="text-xl md:text-2xl font-semibold text-foreground">
          What Hue Inspirations Does
        </h2>
        <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          Discover color palette inspiration from iconic artworks and turn them into
          production-ready palettes for your next project.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ title, description, Icon }) => (
          <Card key={title} className="bg-card shadow-sm border-border/60 hover:shadow transition-shadow">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Icon className="text-foreground/80" size={20} />
              </div>
              <CardTitle className="text-base md:text-lg text-foreground">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
