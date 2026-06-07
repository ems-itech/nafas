import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { staffUsers } from "@/lib/db/schema";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import type { LoginInput } from "@/lib/validators/admin.schema";

export async function loginStaff(input: LoginInput) {
  const db = getDb();
  const user = await db.query.staffUsers.findFirst({
    where: eq(staffUsers.email, input.email.toLowerCase()),
  });

  if (!user) {
    return { ok: false as const, error: "Invalid email or password" };
  }

  const valid = await verifyPassword(input.password, user.passwordHash);
  if (!valid) {
    return { ok: false as const, error: "Invalid email or password" };
  }

  await createSession(user.id);
  return { ok: true as const, user };
}
