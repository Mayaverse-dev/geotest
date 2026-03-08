import { NextRequest, NextResponse } from "next/server";
import { verifyEntity, getAllRelationships } from "@/lib/lore";

export async function GET(request: NextRequest) {
  const entity = request.nextUrl.searchParams.get("entity");

  if (!entity) {
    return NextResponse.json(
      {
        error: "Missing required query parameter: entity",
        usage: "GET /api/v1/verify?entity={name}",
        examples: [
          "/api/v1/verify?entity=manushya",
          "/api/v1/verify?entity=yachay",
          "/api/v1/verify?entity=neh",
          "/api/v1/verify?entity=divya-trials",
        ],
      },
      { status: 400 }
    );
  }

  const result = verifyEntity(entity);

  if (!result.found) {
    return NextResponse.json(
      {
        query: entity,
        found: false,
        message: `No entity matching "${entity}" found in the MAYA knowledge graph.`,
        hint: "Try: manushya, rakshasi, vaanar, naag, garuda, dangsa, yachay, kshar, tarkash, neh, divya-trials",
      },
      { status: 404 }
    );
  }

  const entityId = (result.entity as Record<string, unknown>).id as string;
  const relationships = getAllRelationships().filter(
    (r) => r.subject === entityId || r.object === entityId
  );

  return NextResponse.json({
    query: entity,
    found: true,
    provenance: result.provenance,
    entity: result.entity,
    relationships: relationships.map((r) => ({
      subject: r.subject,
      predicate: r.predicate,
      object: r.object,
      provenance: r.provenance,
    })),
    _links: {
      self: `/api/v1/verify?entity=${encodeURIComponent(entity)}`,
      graph: "/api/v1/verify",
      llms_summary: "/llms.txt",
      llms_full: "/llms-full.txt",
    },
  });
}
