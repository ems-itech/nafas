import { asc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { availabilityRules } from "@/lib/db/schema";
import type { AvailabilityRuleInput } from "@/lib/validators/admin.schema";

export async function listAvailabilityRules() {
  const db = getDb();
  return db.select().from(availabilityRules).orderBy(asc(availabilityRules.dayOfWeek));
}

export async function upsertAvailabilityRule(input: AvailabilityRuleInput) {
  const db = getDb();
  const existing = await db.query.availabilityRules.findFirst({
    where: eq(availabilityRules.dayOfWeek, input.dayOfWeek),
  });

  if (existing) {
    const [row] = await db
      .update(availabilityRules)
      .set({
        startTime: input.startTime,
        endTime: input.endTime,
        isActive: input.isActive,
        updatedAt: new Date(),
      })
      .where(eq(availabilityRules.id, existing.id))
      .returning();
    return row;
  }

  const [row] = await db.insert(availabilityRules).values(input).returning();
  return row;
}

export async function updateAvailabilityRule(id: string, input: AvailabilityRuleInput) {
  const db = getDb();
  const [row] = await db
    .update(availabilityRules)
    .set({
      dayOfWeek: input.dayOfWeek,
      startTime: input.startTime,
      endTime: input.endTime,
      isActive: input.isActive,
      updatedAt: new Date(),
    })
    .where(eq(availabilityRules.id, id))
    .returning();
  return row;
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function dayName(dayOfWeek: number) {
  return DAY_NAMES[dayOfWeek] ?? `Day ${dayOfWeek}`;
}
