import { desc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { customers } from "@/lib/db/schema";
import type { CustomerInput } from "@/lib/validators/admin.schema";

export async function listCustomers() {
  const db = getDb();
  return db.select().from(customers).orderBy(desc(customers.createdAt));
}

export async function getCustomer(id: string) {
  const db = getDb();
  return db.query.customers.findFirst({ where: eq(customers.id, id) });
}

export async function createCustomer(input: CustomerInput) {
  const db = getDb();
  const [row] = await db
    .insert(customers)
    .values({
      name: input.name,
      phone: input.phone,
      email: input.email || null,
      notes: input.notes || null,
    })
    .returning();
  return row;
}

export async function updateCustomer(id: string, input: CustomerInput) {
  const db = getDb();
  const [row] = await db
    .update(customers)
    .set({
      name: input.name,
      phone: input.phone,
      email: input.email || null,
      notes: input.notes || null,
      updatedAt: new Date(),
    })
    .where(eq(customers.id, id))
    .returning();
  return row;
}

export async function deleteCustomer(id: string) {
  const db = getDb();
  await db.delete(customers).where(eq(customers.id, id));
}
