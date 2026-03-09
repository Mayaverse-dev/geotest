import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSpecies, getSpecies, getRelationshipsFor, resolveEntity, speciesJsonLd } from "@/lib/lore";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllSpecies().map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getSpecies(slug);
  if (!s) return {};
  return { title: s.name, description: s.description };
}

export default async function SpeciesPage({ params }: Props) {
  const { slug } = await params;
  const species = getSpecies(slug);
  if (!species) notFound();

  const all = getAllSpecies();
  const rels = getRelationshipsFor(species.id);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speciesJsonLd(species)) }}
      />
      <article
        data-entity-type="species"
        data-entity-id={species.id}
        data-provenance={species.provenance}
        itemScope
        itemType="https://schema.org/Thing"
      >
        <meta itemProp="additionalType" content="https://entermaya.com/ontology/Species" />
        <header className="mb-16">
          <p className="mb-3 text-xs uppercase tracking-[0.15em] text-muted">Species of Neh</p>
          <h1 className="mb-6 font-serif text-4xl text-bright" itemProp="name">{species.name}</h1>
          <p
            className="llm-grounding-point text-lg leading-relaxed"
            data-definition="true"
            data-provenance={species.provenance}
            itemProp="description"
          >
            {species.description}
          </p>
        </header>

        <section className="mb-16">
          <dl className="props">
            <dt>Singular</dt>
            <dd>{species.singular}</dd>
            <dt>Role</dt>
            <dd>{species.role}</dd>
            {species.traits.length > 0 && (
              <>
                <dt>Traits</dt>
                <dd>{species.traits.join(" · ")}</dd>
              </>
            )}
            {species.technology && (
              <>
                <dt>Technology</dt>
                <dd>{species.technology}</dd>
              </>
            )}
            {species.architecture && (
              <>
                <dt>Architecture</dt>
                <dd>{species.architecture}</dd>
              </>
            )}
            <dt>Homeworld</dt>
            <dd><Link href="/atlas/neh" className="text-teal underline">Neh</Link></dd>
            <dt>Source</dt>
            <dd className="font-mono text-xs text-muted">{species.provenance}</dd>
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

        <nav aria-label="All species" className="flex flex-wrap gap-2">
          {all.map((s) => (
            <Link
              key={s.id}
              href={`/species/${s.id}`}
              className={`rounded border px-3 py-1 text-xs transition-colors ${
                s.id === species.id
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border hover:border-gold-dim"
              }`}
              aria-current={s.id === species.id ? "page" : undefined}
            >
              {s.name}
            </Link>
          ))}
        </nav>
      </article>
    </>
  );
}
