import type { MetadataRoute } from "next";
import { getAllSpecies, getAllCharacters, getAllConcepts } from "@/lib/lore";

const BASE = "https://test.entermaya.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages = [
    { url: BASE, lastModified: now, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE}/atlas/neh`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE}/llms.txt`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE}/llms-full.txt`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
  ];

  const speciesPages = getAllSpecies().map((s) => ({
    url: `${BASE}/species/${s.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const characterPages = getAllCharacters().map((c) => ({
    url: `${BASE}/characters/${c.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const lorePages = getAllConcepts().map((c) => ({
    url: `${BASE}/lore/${c.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...speciesPages, ...characterPages, ...lorePages];
}
