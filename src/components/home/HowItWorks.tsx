import { Card, CardContent } from "@/components/ui/card";

export function HowItWorks() {
  const steps = [
    {
      title: "Search artworks",
      text: "Type a keyword like ‘sunset’ or ‘cats’ to explore the museum archive.",
      number: 1,
    },
    {
      title: "Open an artwork",
      text: "View the piece in high resolution and we’ll extract a clean color palette.",
      number: 2,
    },
    {
      title: "Copy or download",
      text: "Copy HEX codes instantly or download SVG/ASE to use in your tools.",
      number: 3,
    },
  ];

  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="py-8 md:py-10">
      <header className="mb-6 md:mb-8 text-center">
        <h2 id="how-heading" className="text-xl md:text-2xl font-semibold text-foreground">How it works</h2>
        <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          Fast, client‑side processing. No accounts, no uploads — just beautiful colors.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <Card key={s.number} className="bg-card border-border/60 hover:shadow transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold">
                  {s.number}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
