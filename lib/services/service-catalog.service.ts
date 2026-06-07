import { asc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { services } from "@/lib/db/schema";
import type { ServiceInput } from "@/lib/validators/admin.schema";

export async function listServices(activeOnly = false) {
  const db = getDb();
  const rows = await db.select().from(services).orderBy(asc(services.name));
  return activeOnly ? rows.filter((s) => s.isActive) : rows;
}

export async function getService(id: string) {
  const db = getDb();
  return db.query.services.findFirst({ where: eq(services.id, id) });
}

export async function createService(input: ServiceInput) {
  const db = getDb();
  const [row] = await db
    .insert(services)
    .values({
      name: input.name,
      durationMinutes: input.durationMinutes,
      priceCents: input.priceCents ?? null,
      isActive: input.isActive,
    })
    .returning();
  return row;
}

export async function updateService(id: string, input: ServiceInput) {
  const db = getDb();
  const [row] = await db
    .update(services)
    .set({
      name: input.name,
      durationMinutes: input.durationMinutes,
      priceCents: input.priceCents ?? null,
      isActive: input.isActive,
      updatedAt: new Date(),
    })
    .where(eq(services.id, id))
    .returning();
  return row;
}

export async function deleteService(id: string) {
  const db = getDb();
  await db.delete(services).where(eq(services.id, id));
}
