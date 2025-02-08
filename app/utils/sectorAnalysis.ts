export function determineSector(mission: string, vision: string): string {
  const combinedText = (mission + " " + vision).toLowerCase();

  const sectorMappings = [
    {
      sector: "Technology & Innovation",
      keywords: [
        "technology",
        "innovation",
        "digital",
        "tech",
        "software",
        "platform",
      ],
    },
    {
      sector: "Renewable Energy",
      keywords: [
        "energy",
        "sustainable",
        "green",
        "renewable",
        "solar",
        "wind",
      ],
    },
    {
      sector: "Financial Services",
      keywords: ["finance", "investment", "banking", "capital", "economic"],
    },
    {
      sector: "Healthcare",
      keywords: ["health", "medical", "wellness", "care", "treatment"],
    },
    {
      sector: "Education",
      keywords: ["education", "learning", "knowledge", "skill", "training"],
    },
    {
      sector: "Manufacturing",
      keywords: ["manufacturing", "production", "industrial", "factory"],
    },
  ];

  for (const mapping of sectorMappings) {
    if (mapping.keywords.some((keyword) => combinedText.includes(keyword))) {
      return mapping.sector;
    }
  }

  return "Diversified Services";
}
