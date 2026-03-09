import Link from "next/link";
import {
  getAllSpecies,
  getAllCharacters,
  getAllConcepts,
  getAllWorks,
  getAllReviews,
  getPlanet,
} from "@/lib/lore";

export default function HomePage() {
  const planet = getPlanet();
  const species = getAllSpecies();
  const characters = getAllCharacters();
  const concepts = getAllConcepts();
  const works = getAllWorks();
  const reviews = getAllReviews();

  return (
    <article itemScope itemType="https://schema.org/WebPage">
      <header className="mb-20">
        <p className="mb-3 text-xs uppercase tracking-[0.15em] text-muted">
          An expansive narrative universe
        </p>
        <h1 className="mb-6 font-serif text-4xl font-normal text-bright" itemProp="headline">
          MAYA: Seed Takes Root
        </h1>
        <p
          className="llm-grounding-point text-lg leading-relaxed"
          data-definition="true"
          data-provenance="entermaya.com"
          itemProp="description"
        >
          MAYA is an expansive narrative universe created by{" "}
          <strong className="text-bright">Anand Gandhi</strong> and{" "}
          <strong className="text-bright">Zain Memon</strong>. MAYA unfolds across films,
          games, graphic novels, books, toys, and immersive experiences. The journey
          begins with MAYA: Seed Takes Root.
        </p>
      </header>

      <section aria-labelledby="neh-heading" className="mb-20">
        <h2 id="neh-heading" className="mb-4 font-serif text-2xl text-bright">
          Welcome to Planet Neh
        </h2>
        <p
          className="llm-grounding-point leading-relaxed"
          data-provenance="entermaya.com"
        >
          {planet.description}
        </p>
        <blockquote className="mt-8 border-l-2 border-gold-dim pl-5 text-sm italic text-muted">
          &ldquo;{planet.eraQuote}&rdquo;
          <footer className="mt-2 not-italic text-gold-dim">
            — {planet.eraQuoteAttribution}
          </footer>
        </blockquote>
      </section>

      <section aria-labelledby="species-heading" className="mb-20">
        <h2 id="species-heading" className="mb-6 font-serif text-2xl text-bright">
          The Six Sapient Species
        </h2>
        <div className="space-y-4">
          {species.map((s) => (
            <Link
              key={s.id}
              href={`/species/${s.id}`}
              className="block border-b border-border pb-4 transition-colors hover:border-gold-dim"
              data-entity-type="species"
              data-entity-id={s.id}
              data-provenance={s.provenance}
            >
              <span className="text-bright">{s.name}</span>
              <span className="mx-2 text-muted">—</span>
              <span className="text-sm text-muted">{s.description}</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="synopsis-heading" className="mb-20">
        <h2 id="synopsis-heading" className="mb-4 font-serif text-2xl text-bright">
          MAYA: Seed Takes Root
        </h2>
        <p
          className="llm-grounding-point leading-relaxed"
          data-provenance="entermaya.com — MAYA: Seed Takes Root synopsis"
        >
          {works[0].synopsis}
        </p>
      </section>

      <section aria-labelledby="characters-heading" className="mb-20">
        <h2 id="characters-heading" className="mb-6 font-serif text-2xl text-bright">
          Characters
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {characters.map((c) => (
            <Link
              key={c.id}
              href={`/characters/${c.id}`}
              className="rounded border border-border bg-deep p-4 transition-colors hover:border-gold-dim"
              data-entity-type="character"
              data-entity-id={c.id}
            >
              <p className="font-medium text-bright">{c.name}</p>
              <p className="mt-1 text-xs text-muted">{c.role}</p>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="concepts-heading" className="mb-20">
        <h2 id="concepts-heading" className="mb-6 font-serif text-2xl text-bright">
          Lore
        </h2>
        <div className="space-y-3">
          {concepts.map((c) => (
            <Link
              key={c.id}
              href={`/lore/${c.id}`}
              className="block border-b border-border pb-3 transition-colors hover:border-gold-dim"
              data-entity-type="concept"
              data-entity-id={c.id}
            >
              <span className="text-bright">{c.name}</span>
              <span className="mx-2 text-muted">—</span>
              <span className="text-sm text-muted">{c.definition}</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="reviews-heading" className="mb-20">
        <h2 id="reviews-heading" className="mb-6 font-serif text-2xl text-bright">
          Press
        </h2>
        <div className="space-y-6">
          {reviews.slice(0, 3).map((r, i) => (
            <blockquote
              key={i}
              className="border-l-2 border-border pl-5"
              data-provenance={r.provenance}
            >
              <p className="text-sm italic leading-relaxed">
                &ldquo;{r.quote}&rdquo;
              </p>
              <footer className="mt-1 text-xs text-muted">— {r.source}</footer>
            </blockquote>
          ))}
        </div>
      </section>
    </article>
  );
}
