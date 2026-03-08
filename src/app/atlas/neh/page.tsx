import type { Metadata } from "next";
import Link from "next/link";
import {
  getPlanet,
  getAllSpecies,
  getAllCharacters,
  getRelationshipsFor,
  planetJsonLd,
} from "@/lib/lore";

export const metadata: Metadata = {
  title: "Planet Neh — The Living World",
  description:
    "Neh: a world connected by the sentient Maya tree biological internet, home to six sapient species across 6.9 billion years. Rule of the Mind era.",
};

export default function PlanetNehPage() {
  const planet = getPlanet();
  const species = getAllSpecies();
  const characters = getAllCharacters();
  const relationships = getRelationshipsFor("neh");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(planetJsonLd(planet)) }}
      />

      <article
        data-entity-type="planet"
        data-entity-id="neh"
        data-provenance={planet.provenance}
        itemScope
        itemType="https://schema.org/Place"
      >
        <header className="mb-12">
          <p className="mb-2 text-sm uppercase tracking-widest text-maya-muted">
            Atlas
          </p>
          <h1
            className="mb-4 text-4xl font-bold text-maya-gold"
            itemProp="name"
          >
            {planet.name}
          </h1>
          <p
            className="llm-grounding-point max-w-3xl text-lg"
            data-definition="true"
            data-provenance={planet.provenance}
            itemProp="description"
          >
            {planet.description}
          </p>
        </header>

        <section aria-labelledby="properties-heading" className="mb-12">
          <h2
            id="properties-heading"
            className="mb-4 text-xl font-semibold text-maya-gold"
          >
            Planetary Properties
          </h2>
          <dl className="entity-properties">
            <dt>Distinguishing Feature</dt>
            <dd>{planet.feature}</dd>
            <dt>Current Era</dt>
            <dd>{planet.era}</dd>
            <dt>Recorded History</dt>
            <dd>{planet.historySpan}</dd>
            <dt>Sapient Species Count</dt>
            <dd>{species.length}</dd>
            <dt>Source</dt>
            <dd className="font-mono text-sm text-maya-muted">
              {planet.provenance}
            </dd>
          </dl>
        </section>

        <section aria-labelledby="species-heading" className="mb-12">
          <h2
            id="species-heading"
            className="mb-6 text-xl font-semibold text-maya-gold"
          >
            Sapient Species
          </h2>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {species.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/species/${s.id}`}
                  className="block rounded border border-maya-border bg-maya-deep p-4 transition-colors hover:border-maya-gold-dim"
                  data-entity-type="species"
                  data-entity-id={s.id}
                >
                  <strong>{s.name}</strong>
                  <span className="ml-2 text-sm text-maya-muted">{s.role}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="characters-heading" className="mb-12">
          <h2
            id="characters-heading"
            className="mb-6 text-xl font-semibold text-maya-gold"
          >
            Notable Inhabitants
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2" role="list">
            {characters.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/characters/${c.id}`}
                  className="block rounded border border-maya-border bg-maya-deep p-4 transition-colors hover:border-maya-gold-dim"
                >
                  <strong>{c.name}</strong>
                  <span className="ml-2 text-sm text-maya-muted">{c.role}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {relationships.length > 0 && (
          <section aria-labelledby="relationships-heading" className="mb-12">
            <h2
              id="relationships-heading"
              className="mb-4 text-xl font-semibold text-maya-gold"
            >
              Knowledge Graph Relationships
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-maya-border text-left text-maya-muted">
                  <th className="pb-2 pr-4">Subject</th>
                  <th className="pb-2 pr-4">Predicate</th>
                  <th className="pb-2">Object</th>
                </tr>
              </thead>
              <tbody>
                {relationships.map((r, i) => (
                  <tr key={i} className="border-b border-maya-border/50">
                    <td className="py-2 pr-4 font-mono">{r.subject}</td>
                    <td className="py-2 pr-4 text-maya-emerald">{r.predicate}</td>
                    <td className="py-2 font-mono">{r.object}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </article>
    </>
  );
}
