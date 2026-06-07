import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { closeDb, getDb } from "./client";
import { availabilityRules, services, staffUsers } from "./schema";

const SAMPLE_SERVICES = [
  { name: "Classic Manicure", durationMinutes: 45, priceCents: 3500 },
  { name: "Gel Manicure", durationMinutes: 60, priceCents: 4500 },
  { name: "Classic Pedicure", durationMinutes: 60, priceCents: 4000 },
  { name: "Facial Treatment", durationMinutes: 75, priceCents: 5500 },
];

const DEFAULT_HOURS = [
  { dayOfWeek: 0, startTime: "10:00", endTime: "18:00" },
  { dayOfWeek: 1, startTime: "10:00", endTime: "20:00" },
  { dayOfWeek: 2, startTime: "10:00", endTime: "20:00" },
  { dayOfWeek: 3, startTime: "10:00", endTime: "20:00" },
  { dayOfWeek: 4, startTime: "10:00", endTime: "20:00" },
  { dayOfWeek: 5, startTime: "10:00", endTime: "20:00" },
  { dayOfWeek: 6, startTime: "10:00", endTime: "18:00" },
];

async function main() {
  const db = getDb();
  const email = process.env.SEED_ADMIN_EMAIL || "admin@nafas.beauty";
  const password = process.env.SEED_ADMIN_PASSWORD || "changeme123";
  const name = process.env.SEED_ADMIN_NAME || "Admin";

  const existing = await db.query.staffUsers.findFirst({
    where: eq(staffUsers.email, email),
  });

  if (!existing) {
    const passwordHash = await bcrypt.hash(password, 12);
    await db.insert(staffUsers).values({ email, passwordHash, name, role: "admin" });
    console.log(`Created admin user: ${email}`);
  } else {
    console.log(`Admin user already exists: ${email}`);
  }

  const serviceCount = await db.select().from(services);
  if (serviceCount.length === 0) {
    await db.insert(services).values(SAMPLE_SERVICES);
    console.log(`Seeded ${SAMPLE_SERVICES.length} services.`);
  }

  const ruleCount = await db.select().from(availabilityRules);
  if (ruleCount.length === 0) {
    await db.insert(availabilityRules).values(DEFAULT_HOURS);
    console.log("Seeded default availability rules.");
  }

  await closeDb();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
