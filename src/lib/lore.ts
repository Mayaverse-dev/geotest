import loreData from "@/data/lore.json";

export interface Planet {
  id: string;
  name: string;
  description: string;
  feature: string;
  era: string;
  historySpan: string;
  eraQuote: string;
  eraQuoteAttribution: string;
  provenance: string;
}

export interface Species {
  id: string;
  name: string;
  singular: string;
  role: string;
  description: string;
  traits: string[];
  technology: string | null;
  architecture: string | null;
  provenance: string;
}

export interface Character {
  id: string;
  name: string;
  species: string | null;
  role: string;
  description: string;
  traits: string[];
  provenance: string;
}

export interface Concept {
  id: string;
  name: string;
  definition: string;
  definitionOnNeh: string | null;
  description: string;
  domain: string;
  provenance: string;
}

export interface Work {
  id: string;
  name: string;
  type: string;
  synopsis: string;
  provenance: string;
}

export interface Creator {
  id: string;
  name: string;
  description: string;
  provenance: string;
}

export interface Review {
  quote: string;
  source: string;
  provenance: string;
}

export interface Relationship {
  subject: string;
  subjectType: string;
  predicate: string;
  object: string;
  objectType: string;
  provenance: string;
}

const BASE_URI = "https://test.entermaya.com";

export function getPlanet(): Planet {
  return loreData.planet as Planet;
}

export function getAllSpecies(): Species[] {
  return loreData.species as Species[];
}

export function getSpecies(slug: string): Species | undefined {
  return (loreData.species as Species[]).find((s) => s.id === slug);
}

export function getAllCharacters(): Character[] {
  return loreData.characters as Character[];
}

export function getCharacter(slug: string): Character | undefined {
  return (loreData.characters as Character[]).find((c) => c.id === slug);
}

export function getAllConcepts(): Concept[] {
  return loreData.concepts as Concept[];
}

export function getConcept(slug: string): Concept | undefined {
  return (loreData.concepts as Concept[]).find((c) => c.id === slug);
}

export function getAllWorks(): Work[] {
  return loreData.works as Work[];
}

export function getAllCreators(): Creator[] {
  return loreData.creators as Creator[];
}

export function getAllReviews(): Review[] {
  return loreData.reviews as Review[];
}

export function getRelationshipsFor(entityId: string): Relationship[] {
  return (loreData.relationships as Relationship[]).filter(
    (r) => r.subject === entityId || r.object === entityId
  );
}

export function getAllRelationships(): Relationship[] {
  return loreData.relationships as Relationship[];
}

export function resolveEntity(
  id: string,
  type: string
): { name: string; href: string } | null {
  if (type === "species") {
    const s = getSpecies(id);
    return s ? { name: s.name, href: `/species/${s.id}` } : null;
  }
  if (type === "character") {
    const c = getCharacter(id);
    return c ? { name: c.name, href: `/characters/${c.id}` } : null;
  }
  if (type === "concept") {
    const c = getConcept(id);
    return c ? { name: c.name, href: `/lore/${c.id}` } : null;
  }
  if (type === "planet") {
    return { name: "Neh", href: "/atlas/neh" };
  }
  return null;
}

function entityUri(type: string, id: string): string {
  const paths: Record<string, string> = {
    species: "species",
    character: "characters",
    concept: "lore",
    planet: "atlas",
  };
  return `${BASE_URI}/${paths[type] ?? type}/${id}`;
}

export function speciesJsonLd(s: Species) {
  return {
    "@context": "https://schema.org",
    "@type": "Thing",
    "@id": entityUri("species", s.id),
    name: s.name,
    description: s.description,
    additionalType: "https://entermaya.com/ontology/Species",
    identifier: s.id,
    isPartOf: { "@type": "Place", "@id": `${BASE_URI}/atlas/neh`, name: "Neh" },
  };
}

export function characterJsonLd(c: Character) {
  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": entityUri("character", c.id),
    name: c.name,
    description: c.description,
    additionalType: "https://entermaya.com/ontology/Character",
    identifier: c.id,
    homeLocation: { "@type": "Place", "@id": `${BASE_URI}/atlas/neh`, name: "Neh" },
  };
  if (c.species) {
    ld.memberOf = {
      "@type": "Thing",
      "@id": entityUri("species", c.species),
      name: getSpecies(c.species)?.name ?? c.species,
    };
  }
  return ld;
}

export function conceptJsonLd(c: Concept) {
  return {
    "@context": "https://schema.org",
    "@type": "Thing",
    "@id": entityUri("concept", c.id),
    name: c.name,
    description: c.description,
    additionalType: "https://entermaya.com/ontology/Concept",
    identifier: c.id,
  };
}

export function planetJsonLd(p: Planet) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": entityUri("planet", p.id),
    name: p.name,
    description: p.description,
    additionalType: "https://entermaya.com/ontology/Planet",
    identifier: p.id,
    containsPlace: getAllSpecies().map((s) => ({
      "@type": "Thing",
      "@id": entityUri("species", s.id),
      name: s.name,
    })),
  };
}

export function verifyEntity(
  query: string
): { found: true; entity: Record<string, unknown>; provenance: string } | { found: false } {
  const q = query.toLowerCase().trim();

  for (const s of getAllSpecies()) {
    if (s.id === q || s.name.toLowerCase() === q || s.singular.toLowerCase() === q) {
      return { found: true, entity: { type: "species", ...s }, provenance: `Source: ${s.provenance}` };
    }
  }
  for (const c of getAllCharacters()) {
    if (c.id === q || c.name.toLowerCase() === q) {
      return { found: true, entity: { type: "character", ...c }, provenance: `Source: ${c.provenance}` };
    }
  }
  for (const c of getAllConcepts()) {
    if (c.id === q || c.name.toLowerCase() === q) {
      return { found: true, entity: { type: "concept", ...c }, provenance: `Source: ${c.provenance}` };
    }
  }
  for (const w of getAllWorks()) {
    if (w.id === q || w.name.toLowerCase() === q) {
      return { found: true, entity: { entityType: "work", ...w }, provenance: `Source: ${w.provenance}` };
    }
  }
  const planet = getPlanet();
  if (q === "neh" || q === "planet neh") {
    return { found: true, entity: { type: "planet", ...planet }, provenance: `Source: ${planet.provenance}` };
  }
  return { found: false };
}
