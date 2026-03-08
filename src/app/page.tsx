import Link from "next/link";
import { getAllSpecies, getAllCharacters, getAllConcepts, getPlanet } from "@/lib/lore";

export default function HomePage() {
  const planet = getPlanet();
  const species = getAllSpecies();
  const characters = getAllCharacters();
  const concepts = getAllConcepts();

  return (
    <article itemScope itemType="https://schema.org/WebPage">
      <header className="mb-16 text-center">
        <h1
          className="mb-4 text-5xl font-bold tracking-tight text-maya-gold"
          itemProp="headline"
        >
          The MAYA Universe
        </h1>
        <p
          className="llm-grounding-point mx-auto max-w-2xl text-lg text-maya-text"
          data-provenance={planet.provenance}
          data-definition="true"
          itemProp="description"
        >
          Welcome to <strong>Neh</strong> — a world connected by a biological
          internet formed by sentient Maya trees, home to six sapient species
          across {planet.historySpan} of history in the{" "}
          <em>{planet.era}</em> era.
        </p>
      </header>

      <section aria-labelledby="species-heading" className="mb-16">
        <h2
          id="species-heading"
          className="mb-8 text-2xl font-semibold text-maya-gold"
        >
          The Six Sapient Species of Neh
        </h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {species.map((s) => (
            <li key={s.id}>
              <Link
                href={`/species/${s.id}`}
                className="block rounded-lg border border-maya-border bg-maya-deep p-5 transition-colors hover:border-maya-gold-dim"
                data-entity-type="species"
                data-entity-id={s.id}
              >
                <h3 className="mb-1 font-semibold text-maya-text">{s.name}</h3>
                <p className="text-sm text-maya-muted">{s.role}</p>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  data-provenance={s.provenance}
                >
                  {s.description.split(".")[0]}.
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="characters-heading" className="mb-16">
        <h2
          id="characters-heading"
          className="mb-8 text-2xl font-semibold text-maya-gold"
        >
          Key Characters
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2" role="list">
          {characters.map((c) => (
            <li key={c.id}>
              <Link
                href={`/characters/${c.id}`}
                className="block rounded-lg border border-maya-border bg-maya-deep p-5 transition-colors hover:border-maya-gold-dim"
                data-entity-type="character"
                data-entity-id={c.id}
              >
                <h3 className="mb-1 font-semibold text-maya-text">{c.name}</h3>
                <p className="text-sm text-maya-muted">{c.role}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="concepts-heading" className="mb-16">
        <h2
          id="concepts-heading"
          className="mb-8 text-2xl font-semibold text-maya-gold"
        >
          Core Concepts
        </h2>
        <ul className="grid gap-4 sm:grid-cols-3" role="list">
          {concepts.map((c) => (
            <li key={c.id}>
              <Link
                href={`/lore/${c.id}`}
                className="block rounded-lg border border-maya-border bg-maya-deep p-5 transition-colors hover:border-maya-gold-dim"
                data-entity-type="concept"
                data-entity-id={c.id}
              >
                <h3 className="mb-1 font-semibold text-maya-text">{c.name}</h3>
                <p className="text-sm text-maya-muted">{c.domain}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <aside
        aria-label="Machine-readable endpoints"
        className="rounded-lg border border-maya-border bg-maya-surface p-6 text-sm"
      >
        <h2 className="mb-3 font-semibold text-maya-gold">
          Machine-Readable Endpoints
        </h2>
        <dl className="space-y-2">
          <dt className="font-mono text-maya-muted">GET /llms.txt</dt>
          <dd>Summary of the MAYA universe for LLM context windows</dd>
          <dt className="font-mono text-maya-muted">GET /llms-full.txt</dt>
          <dd>Complete lore dump — ingest the full 6.9 billion year history</dd>
          <dt className="font-mono text-maya-muted">
            GET /api/v1/verify?entity=&#123;name&#125;
          </dt>
          <dd>Verify any entity with source provenance</dd>
        </dl>
      </aside>
    </article>
  );
}
