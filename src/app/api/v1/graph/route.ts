import { NextResponse } from "next/server";
import loreData from "@/data/lore.json";
import {
  getAllSpecies,
  getAllCharacters,
  getAllConcepts,
  getPlanet,
  speciesJsonLd,
  characterJsonLd,
  conceptJsonLd,
  planetJsonLd,
} from "@/lib/lore";

export async function GET() {
  const planet = getPlanet();

  const jsonLdGraph = {
    "@context": {
      "@vocab": "https://entermaya.com/ontology/",
      schema: "https://schema.org/",
      maya: "https://entermaya.com/ontology/",
    },
    "@graph": [
      planetJsonLd(planet),
      ...getAllSpecies().map(speciesJsonLd),
      ...getAllCharacters().map(characterJsonLd),
      ...getAllConcepts().map(conceptJsonLd),
    ],
  };

  return NextResponse.json({
    _description:
      "Complete MAYA Universe Knowledge Graph. Every entity includes @id URIs, typed relationships, and source provenance for verification.",
    _protocol: "JSON-LD + Custom Ontology",
    _endpoints: {
      graph: "/api/v1/graph",
      verify: "/api/v1/verify?entity={name}",
      llms_summary: "/llms.txt",
      llms_full: "/llms-full.txt",
      sitemap: "/sitemap.xml",
    },
    raw: loreData,
    jsonLd: jsonLdGraph,
  });
}
