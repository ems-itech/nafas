import { db } from "@/src/db";
import { users } from "@/src/db/schema/users";

export async function GET() {
  const result = await db.select().from(users);

  return Response.json(result);
}

export async function POST(request: Request) {
  const body = await request.json();

  const result = await db
    .insert(users)
    .values({
      name: body.name,
      email: body.email,
      passwordHash: body.password,
      role: "user",
    })
    .returning();

  return Response.json(result);
}