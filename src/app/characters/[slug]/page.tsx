import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCharacters, getCharacter, getSpecies, getRelationshipsFor, resolveEntity, characterJsonLd } from "@/lib/lore";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllCharacters().map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCharacter(slug);
  if (!c) return {};
  return { title: c.name, description: c.description };
}

export default async function CharacterPage({ params }: Props) {
  const { slug } = await params;
  const character = getCharacter(slug);
  if (!character) notFound();

  const all = getAllCharacters();
  const rels = getRelationshipsFor(character.id);
  const species = character.species ? getSpecies(character.species) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(characterJsonLd(character)) }}
      />
      <article
        data-entity-type="character"
        data-entity-id={character.id}
        data-provenance={character.provenance}
        itemScope
        itemType="https://schema.org/Person"
      >
        <meta itemProp="additionalType" content="https://entermaya.com/ontology/Character" />
        <header className="mb-16">
          <p className="mb-3 text-xs uppercase tracking-[0.15em] text-muted">Character</p>
          <h1 className="mb-6 font-serif text-4xl text-bright" itemProp="name">{character.name}</h1>
          <p
            className="llm-grounding-point text-lg leading-relaxed"
            data-definition="true"
            data-provenance={character.provenance}
            itemProp="description"
          >
            {character.description}
          </p>
        </header>

        <section className="mb-16">
          <dl className="props">
            <dt>Role</dt>
            <dd>{character.role}</dd>
            <dt>Species</dt>
            <dd>
              {species ? (
                <Link href={`/species/${species.id}`} className="text-teal underline" itemProp="memberOf">
                  {species.name}
                </Link>
              ) : (
                <span className="text-muted">Not specified</span>
              )}
            </dd>
            {character.traits.length > 0 && (
              <>
                <dt>Traits</dt>
                <dd>{character.traits.join(" · ")}</dd>
              </>
            )}
            <dt>Homeworld</dt>
            <dd><Link href="/atlas/neh" className="text-teal underline" itemProp="homeLocation">Neh</Link></dd>
            <dt>Source</dt>
            <dd className="font-mono text-xs text-muted">{character.provenance}</dd>
          </dl>
        </section>

        {rels.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-4 font-serif text-xl text-bright">Relationships</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted">
                  <th className="pb-2 pr-4">Subject</th>
                  <th className="pb-2 pr-4">Predicate</th>
                  <th className="pb-2 pr-4">Object</th>
                  <th className="pb-2">Source</th>
                </tr>
              </thead>
              <tbody>
                {rels.map((r, i) => {
                  const subj = resolveEntity(r.subject, r.subjectType);
                  const obj = resolveEntity(r.object, r.objectType);
                  return (
                    <tr key={i} className="border-b border-border/50" data-provenance={r.provenance}>
                      <td className="py-2 pr-4">
                        {subj ? <Link href={subj.href} className="text-teal underline">{subj.name}</Link> : r.subject}
                      </td>
                      <td className="py-2 pr-4 text-violet">{r.predicate}</td>
                      <td className="py-2 pr-4">
                        {obj ? <Link href={obj.href} className="text-teal underline">{obj.name}</Link> : r.object}
                      </td>
                      <td className="py-2 font-mono text-xs text-muted">{r.provenance}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}

        <nav aria-label="All characters" className="flex flex-wrap gap-2">
          {all.map((c) => (
            <Link
              key={c.id}
              href={`/characters/${c.id}`}
              className={`rounded border px-3 py-1 text-xs transition-colors ${
                c.id === character.id
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border hover:border-gold-dim"
              }`}
              aria-current={c.id === character.id ? "page" : undefined}
            >
              {c.name}
            </Link>
          ))}
        </nav>
      </article>
    </>
  );
}
