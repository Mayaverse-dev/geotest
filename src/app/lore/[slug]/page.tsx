import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllConcepts, getConcept, getRelationshipsFor, resolveEntity, conceptJsonLd } from "@/lib/lore";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllConcepts().map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getConcept(slug);
  if (!c) return {};
  return { title: c.name, description: c.description };
}

export default async function LorePage({ params }: Props) {
  const { slug } = await params;
  const concept = getConcept(slug);
  if (!concept) notFound();

  const all = getAllConcepts();
  const rels = getRelationshipsFor(concept.id);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(conceptJsonLd(concept)) }}
      />
      <article
        data-entity-type="concept"
        data-entity-id={concept.id}
        data-provenance={concept.provenance}
        itemScope
        itemType="https://schema.org/Thing"
      >
        <meta itemProp="additionalType" content="https://entermaya.com/ontology/Concept" />
        <header className="mb-16">
          <p className="mb-3 text-xs uppercase tracking-[0.15em] text-muted">Lore</p>
          <h1 className="mb-6 font-serif text-4xl text-bright" itemProp="name">{concept.name}</h1>
          <p
            className="llm-grounding-point text-lg leading-relaxed"
            data-definition="true"
            data-provenance={concept.provenance}
            itemProp="description"
          >
            {concept.definition}
          </p>
          {concept.definitionOnNeh && (
            <p className="mt-4 leading-relaxed text-muted">
              <strong className="text-text">On Neh:</strong> {concept.definitionOnNeh}
            </p>
          )}
        </header>

        <section className="mb-16">
          <p className="leading-relaxed" data-provenance={concept.provenance}>
            {concept.description}
          </p>
          <dl className="props">
            <dt>Domain</dt>
            <dd>{concept.domain}</dd>
            <dt>Source</dt>
            <dd className="font-mono text-xs text-muted">{concept.provenance}</dd>
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
                    <tr key={i} className="border-b border-border/50">
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

        <nav aria-label="All lore" className="flex flex-wrap gap-2">
          {all.map((c) => (
            <Link
              key={c.id}
              href={`/lore/${c.id}`}
              className={`rounded border px-3 py-1 text-xs transition-colors ${
                c.id === concept.id
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border hover:border-gold-dim"
              }`}
              aria-current={c.id === concept.id ? "page" : undefined}
            >
              {c.name}
            </Link>
          ))}
        </nav>
      </article>
    </>
  );
}
