import { TEMPLATES } from "@/components/templates/registry";

export const dynamic = "force-static";

/** Template list for scripts/export-templates.mts (the script cannot import TSX directly). */
export function GET() {
  return Response.json(TEMPLATES.map(({ id, kind, size }) => ({ id, kind, size })));
}
