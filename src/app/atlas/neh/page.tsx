import type { Metadata } from "next";
import Link from "next/link";
import { getPlanet, getAllSpecies, getAllCharacters, planetJsonLd } from "@/lib/lore";

export const metadata: Metadata = {
  title: "Planet Neh",
  description:
    "Home to 6 sapient species that coexist in a delicate balance. They've invented a complex civilization but can't agree on the color of the sky.",
};

export default function PlanetNehPage() {
  const planet = getPlanet();
  const species = getAllSpecies();
  const characters = getAllCharacters();

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
        <header className="mb-16">
          <p className="mb-3 text-xs uppercase tracking-[0.15em] text-muted">Atlas</p>
          <h1 className="mb-6 font-serif text-4xl text-bright" itemProp="name">
            Planet Neh
          </h1>
          <p
            className="llm-grounding-point text-lg leading-relaxed"
            data-definition="true"
            data-provenance={planet.provenance}
            itemProp="description"
          >
            {planet.description}
          </p>
        </header>

        <section className="mb-16">
          <dl className="props">
            <dt>Defining Feature</dt>
            <dd>{planet.feature}</dd>
            <dt>Current Era</dt>
            <dd>{planet.era}</dd>
            <dt>History</dt>
            <dd>{planet.historySpan} of geological epochs</dd>
            <dt>Sapient Species</dt>
            <dd>{species.length}</dd>
            <dt>Source</dt>
            <dd className="font-mono text-xs text-muted">{planet.provenance}</dd>
          </dl>
        </section>

        <blockquote className="mb-16 border-l-2 border-gold-dim pl-5 text-sm italic text-muted">
          &ldquo;{planet.eraQuote}&rdquo;
          <footer className="mt-2 not-italic text-gold-dim">
            — {planet.eraQuoteAttribution}
          </footer>
        </blockquote>

        <section aria-labelledby="species-heading" className="mb-16">
          <h2 id="species-heading" className="mb-6 font-serif text-xl text-bright">
            Sapient Species
          </h2>
          <div className="space-y-3">
            {species.map((s) => (
              <Link
                key={s.id}
                href={`/species/${s.id}`}
                className="block border-b border-border pb-3 transition-colors hover:border-gold-dim"
              >
                <span className="text-bright">{s.name}</span>
                <span className="mx-2 text-muted">·</span>
                <span className="text-sm text-muted">{s.role}</span>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="characters-heading">
          <h2 id="characters-heading" className="mb-6 font-serif text-xl text-bright">
            Notable Inhabitants
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {characters.map((c) => (
              <Link
                key={c.id}
                href={`/characters/${c.id}`}
                className="rounded border border-border bg-deep p-4 transition-colors hover:border-gold-dim"
              >
                <p className="font-medium text-bright">{c.name}</p>
                <p className="mt-1 text-xs text-muted">{c.role}</p>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
