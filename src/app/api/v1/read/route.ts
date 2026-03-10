import { NextRequest, NextResponse } from "next/server";
import {
  getPlanet,
  getSpecies,
  getCharacter,
  getConcept,
  getAllSpecies,
  getAllCharacters,
  getAllConcepts,
  getAllWorks,
  getAllCreators,
  getAllReviews,
  getRelationshipsFor,
} from "@/lib/lore";

function textResponse(body: string) {
  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

function formatRelationships(id: string): string {
  const rels = getRelationshipsFor(id);
  if (rels.length === 0) return "";
  const lines = rels.map(
    (r) => `  ${r.subject} —${r.predicate}→ ${r.object} | ${r.provenance}`
  );
  return `\nRelationships:\n${lines.join("\n")}`;
}

function renderHome(): string {
  const planet = getPlanet();
  const species = getAllSpecies();
  const characters = getAllCharacters();
  const concepts = getAllConcepts();
  const works = getAllWorks();
  const creators = getAllCreators();
  const reviews = getAllReviews();

  return `MAYA — Seed Takes Root
Source: entermaya.com

MAYA is an expansive narrative universe created by Anand Gandhi and Zain Memon. MAYA unfolds across films, games, graphic novels, books, toys, and immersive experiences. The journey begins with MAYA: Seed Takes Root.

Studio: Department of Lore

---

PLANET NEH

${planet.description}

"${planet.eraQuote}" — ${planet.eraQuoteAttribution}

Era: ${planet.era}
History: ${planet.historySpan}
Feature: ${planet.feature}

---

THE SIX SAPIENT SPECIES

${species.map((s) => `${s.name} (${s.singular}) — ${s.role}\n${s.description}${s.technology ? `\nTechnology: ${s.technology}` : ""}${s.architecture ? `\nArchitecture: ${s.architecture}` : ""}\nSource: ${s.provenance}`).join("\n\n")}

---

CHARACTERS

${characters.map((c) => `${c.name} — ${c.role}${c.species ? ` (${c.species})` : ""}\n${c.description}\nSource: ${c.provenance}`).join("\n\n")}

---

WORKS

${works.map((w) => `${w.name} (${w.type})\n${w.synopsis}\nSource: ${w.provenance}`).join("\n\n")}

---

CREATORS

${creators.map((c) => `${c.name}\n${c.description}\nSource: ${c.provenance}`).join("\n\n")}

---

PRESS

${reviews.map((r) => `"${r.quote}" — ${r.source}`).join("\n")}

---

All content sourced from entermaya.com.
Verify any entity: GET /api/v1/verify?entity={name}
Full knowledge graph: GET /api/v1/graph
LLM summary: /llms.txt
LLM full context: /llms-full.txt
`;
}

function renderSpecies(id: string): string | null {
  const s = getSpecies(id);
  if (!s) return null;
  return `${s.name} — Species of Planet Neh
Source: ${s.provenance}

${s.description}

Singular: ${s.singular}
Role: ${s.role}
Traits: ${s.traits.join(", ") || "None listed"}${s.technology ? `\nTechnology: ${s.technology}` : ""}${s.architecture ? `\nArchitecture: ${s.architecture}` : ""}
Homeworld: Neh${formatRelationships(s.id)}

Source: ${s.provenance}
Canonical URI: /species/${s.id}
Verify: /api/v1/verify?entity=${s.id}
`;
}

function renderCharacter(id: string): string | null {
  const c = getCharacter(id);
  if (!c) return null;
  const speciesName = c.species ? getSpecies(c.species)?.name ?? c.species : "Not specified";
  return `${c.name} — Character of Planet Neh
Source: ${c.provenance}

${c.description}

Role: ${c.role}
Species: ${speciesName}
Traits: ${c.traits.join(", ") || "None listed"}
Homeworld: Neh${formatRelationships(c.id)}

Source: ${c.provenance}
Canonical URI: /characters/${c.id}
Verify: /api/v1/verify?entity=${c.id}
`;
}

function renderConcept(id: string): string | null {
  const c = getConcept(id);
  if (!c) return null;
  return `${c.name} — Lore of Planet Neh
Source: ${c.provenance}

${c.definition}${c.definitionOnNeh ? `\nOn Neh: ${c.definitionOnNeh}` : ""}

${c.description}

Domain: ${c.domain}${formatRelationships(c.id)}

Source: ${c.provenance}
Canonical URI: /lore/${c.id}
Verify: /api/v1/verify?entity=${c.id}
`;
}

function renderAtlas(): string {
  const planet = getPlanet();
  const species = getAllSpecies();
  return `Planet Neh — Atlas
Source: ${planet.provenance}

${planet.description}

Feature: ${planet.feature}
Era: ${planet.era}
History: ${planet.historySpan}

"${planet.eraQuote}" — ${planet.eraQuoteAttribution}

Sapient Species (${species.length}):
${species.map((s) => `- ${s.name}: ${s.description}`).join("\n")}

Source: ${planet.provenance}
Canonical URI: /atlas/neh
Verify: /api/v1/verify?entity=neh
`;
}

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") ?? "/";

  const clean = path.replace(/^\/+|\/+$/g, "").toLowerCase();

  if (clean === "" || clean === "home") {
    return textResponse(renderHome());
  }

  if (clean === "atlas/neh" || clean === "neh") {
    return textResponse(renderAtlas());
  }

  if (clean.startsWith("species/")) {
    const id = clean.replace("species/", "");
    const text = renderSpecies(id);
    if (text) return textResponse(text);
  }

  if (clean.startsWith("characters/")) {
    const id = clean.replace("characters/", "");
    const text = renderCharacter(id);
    if (text) return textResponse(text);
  }

  if (clean.startsWith("lore/")) {
    const id = clean.replace("lore/", "");
    const text = renderConcept(id);
    if (text) return textResponse(text);
  }

  return textResponse(
    `Page not found: ${path}\n\nAvailable paths:\n` +
    `- / (home)\n` +
    `- atlas/neh\n` +
    getAllSpecies().map((s) => `- species/${s.id}`).join("\n") + "\n" +
    getAllCharacters().map((c) => `- characters/${c.id}`).join("\n") + "\n" +
    getAllConcepts().map((c) => `- lore/${c.id}`).join("\n")
  );
}
