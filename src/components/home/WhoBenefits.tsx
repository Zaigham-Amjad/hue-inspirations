import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Users, Palette, Monitor, Star } from "lucide-react";

export function WhoBenefits() {
  const personas = [
    {
      title: "Graphic Designers",
      subtitle: "Brand & Print Specialists",
      points: [
        "Extract sophisticated palettes from historical masterpieces",
        "Create compelling brand identities with art-inspired colors",
        "Speed up client presentations with proven color harmonies",
      ],
      Icon: Palette,
      gradient: "bg-gradient-primary",
    },
    {
      title: "UI/UX Designers",
      subtitle: "Digital Experience Creators",
      points: [
        "Build accessible interfaces with tested color combinations",
        "Copy hex codes instantly for rapid prototyping",
        "Discover unique palettes that stand out from competitors",
      ],
      Icon: Monitor,
      gradient: "bg-gradient-secondary",
    },
    {
      title: "Creative Teams",
      subtitle: "Collaborative Studios",
      points: [
        "Align on visual direction using shared art references",
        "Export standardized palettes for consistent workflows",
        "Bridge the gap between creative vision and technical implementation",
      ],
      Icon: Users,
      gradient: "bg-gradient-primary",
    },
  ];

  return (
    <section id="who-benefits" aria-labelledby="benefits-heading" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 mb-6">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">For Professionals</span>
          </div>
          <h2 id="benefits-heading" className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Trusted by creative
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              professionals worldwide
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Whether you're crafting brand identities, designing digital experiences, or leading creative teams, 
            Hue Inspirations provides the color intelligence you need.
          </p>
        </div>

        {/* Personas Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {personas.map((persona, index) => {
            const IconComponent = persona.Icon;
            return (
              <Card 
                key={persona.title} 
                className="group bg-gradient-card backdrop-blur-sm border border-border/60 hover:shadow-glow transition-all duration-500 hover:-translate-y-1"
              >
                <CardHeader className="pb-4">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${persona.gradient} rounded-2xl mb-4 shadow-soft group-hover:shadow-glow transition-all duration-300`}>
                    <IconComponent className="w-7 h-7 text-primary-foreground" />
                  </div>
                  
                  {/* Title */}
                  <CardTitle className="text-foreground text-xl mb-1 group-hover:text-primary transition-colors">
                    {persona.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{persona.subtitle}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {persona.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 text-success flex-shrink-0" size={18} />
                      <p className="text-sm text-muted-foreground leading-relaxed">{point}</p>
                    </div>
                  ))}

                  {/* Stats or Badge */}
                  <div className="pt-4 border-t border-border/50">
                    <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                      <Star className="w-3 h-3 text-primary" />
                      <span>Instant workflow integration</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Social Proof */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span>Used by 10,000+ designers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>50,000+ palettes extracted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Art Institute partnership</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
