import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export function WhoBenefits() {
  const personas = [
    {
      title: "Graphic Designers",
      points: [
        "Turn museum‑grade art into usable palettes",
        "Speed up moodboards and brand exploration",
      ],
    },
    {
      title: "UI/UX Designers",
      points: [
        "Quickly test palettes for interfaces",
        "Copy HEX instantly and iterate faster",
      ],
    },
    {
      title: "Product Teams",
      points: [
        "Align on visual direction with real art references",
        "Export SVG/ASE and share with devs",
      ],
    },
  ];

  return (
    <section id="who-benefits" aria-labelledby="benefits-heading" className="py-8 md:py-12">
      <header className="mb-6 md:mb-8 text-center">
        <h2 id="benefits-heading" className="text-xl md:text-2xl font-semibold text-foreground">Who benefits</h2>
        <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          Built for creative professionals who need reliable, beautiful color inspiration—fast.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {personas.map((p) => (
          <Card key={p.title} className="bg-card border-border/60 hover:shadow transition-shadow">
            <CardHeader>
              <CardTitle className="text-foreground text-lg">{p.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {p.points.map((pt) => (
                <div key={pt} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 text-success" size={18} />
                  <p className="text-sm text-muted-foreground">{pt}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
