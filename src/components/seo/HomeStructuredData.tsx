export function HomeStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Hue Inspirations",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    description:
      "Discover color palettes from artworks using the Art Institute of Chicago API. Extract, copy HEX, and download SVG/ASE palettes.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Artwork search",
      "Color palette extraction",
      "Copy hex codes",
      "Download SVG/ASE",
      "Filters by style/period",
    ],
    audience: { "@type": "Audience", audienceType: "Designers and creative professionals" },
  } as const;

  return (
    <script
      type="application/ld+json"
      // It is safe to stringify here because content is static and controlled
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
