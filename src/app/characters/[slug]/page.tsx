import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllCharacters,
  getCharacter,
  getSpecies,
  getRelationshipsFor,
  resolveEntity,
  characterJsonLd,
} from "@/lib/lore";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCharacters().map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const character = getCharacter(slug);
  if (!character) return {};
  return {
    title: `${character.name} — Character of Neh`,
    description: character.description,
  };
}

export default async function CharacterPage({ params }: Props) {
  const { slug } = await params;
  const character = getCharacter(slug);
  if (!character) notFound();

  const allCharacters = getAllCharacters();
  const relationships = getRelationshipsFor(character.id);
  const species = character.species ? getSpecies(character.species) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(characterJsonLd(character)),
        }}
      />

      <article
        data-entity-type="character"
        data-entity-id={character.id}
        data-provenance={character.provenance}
        itemScope
        itemType="https://schema.org/Person"
      >
        <meta
          itemProp="additionalType"
          content="https://entermaya.com/ontology/Character"
        />

        <header className="mb-12">
          <p className="mb-2 text-sm uppercase tracking-widest text-maya-muted">
            Character
          </p>
          <h1
            className="mb-4 text-4xl font-bold text-maya-gold"
            itemProp="name"
          >
            {character.name}
          </h1>
          <p
            className="llm-grounding-point max-w-3xl text-lg"
            data-definition="true"
            data-provenance={character.provenance}
            itemProp="description"
          >
            {character.description}
          </p>
        </header>

        <section aria-labelledby="props-heading" className="mb-12">
          <h2
            id="props-heading"
            className="mb-4 text-xl font-semibold text-maya-gold"
          >
            Properties
          </h2>
          <dl className="entity-properties">
            <dt>Role</dt>
            <dd>{character.role}</dd>
            <dt>Species</dt>
            <dd>
              {species ? (
                <Link
                  href={`/species/${species.id}`}
                  className="text-maya-emerald underline"
                  itemProp="memberOf"
                >
                  {species.name}
                </Link>
              ) : (
                <span className="text-maya-muted">Unknown</span>
              )}
            </dd>
            <dt>Traits</dt>
            <dd>
              <ul className="list-inside list-disc">
                {character.traits.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </dd>
            {character.anomaly && (
              <>
                <dt>Anomaly</dt>
                <dd className="text-maya-crimson">{character.anomaly}</dd>
              </>
            )}
            <dt>Homeworld</dt>
            <dd>
              <Link
                href="/atlas/neh"
                className="text-maya-emerald underline"
                itemProp="homeLocation"
              >
                Neh
              </Link>
            </dd>
            <dt>Source</dt>
            <dd className="font-mono text-sm text-maya-muted">
              {character.provenance}
            </dd>
          </dl>
        </section>

        {relationships.length > 0 && (
          <section aria-labelledby="rels-heading" className="mb-12">
            <h2
              id="rels-heading"
              className="mb-4 text-xl font-semibold text-maya-gold"
            >
              Relationships (Semantic Triples)
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-maya-border text-left text-maya-muted">
                  <th className="pb-2 pr-4">Subject</th>
                  <th className="pb-2 pr-4">Predicate</th>
                  <th className="pb-2 pr-4">Object</th>
                  <th className="pb-2">Source</th>
                </tr>
              </thead>
              <tbody>
                {relationships.map((r, i) => {
                  const objEntity = resolveEntity(r.object, r.objectType);
                  const subjEntity = resolveEntity(r.subject, r.subjectType);
                  return (
                    <tr
                      key={i}
                      className="border-b border-maya-border/50"
                      data-provenance={r.provenance}
                    >
                      <td className="py-2 pr-4">
                        {subjEntity ? (
                          <Link
                            href={subjEntity.href}
                            className="text-maya-emerald underline"
                          >
                            {subjEntity.name}
                          </Link>
                        ) : (
                          <span className="font-mono">{r.subject}</span>
                        )}
                      </td>
                      <td className="py-2 pr-4 text-maya-violet">
                        {r.predicate}
                      </td>
                      <td className="py-2 pr-4">
                        {objEntity ? (
                          <Link
                            href={objEntity.href}
                            className="text-maya-emerald underline"
                          >
                            {objEntity.name}
                          </Link>
                        ) : (
                          <span>{r.object}</span>
                        )}
                      </td>
                      <td className="py-2 font-mono text-xs text-maya-muted">
                        {r.provenance}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}

        <nav aria-label="All characters" className="mt-12">
          <h2 className="mb-4 text-lg font-semibold text-maya-gold">
            All Characters
          </h2>
          <ul className="flex flex-wrap gap-2" role="list">
            {allCharacters.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/characters/${c.id}`}
                  className={`rounded border px-3 py-1 text-sm transition-colors ${
                    c.id === character.id
                      ? "border-maya-gold bg-maya-gold/10 text-maya-gold"
                      : "border-maya-border hover:border-maya-gold-dim"
                  }`}
                  aria-current={c.id === character.id ? "page" : undefined}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>
    </>
  );
}
