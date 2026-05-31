import bcrypt from "bcryptjs";
import { db } from "./index";
import { user } from "./schema/users";

async function seed() {
  try {
    const adminPassword = await bcrypt.hash("admin123", 10);

    const demoPassword = await bcrypt.hash("password123", 10);

    await db
      .insert(user)
      .values([
        {
          name: "Admin User",
          email: "admin@spa.local",
          passwordHash: adminPassword,
          role: "admin",
        },

        {
          name: "Demo User",
          email: "test@example.com",
          passwordHash: demoPassword,
          role: "user",
        },
      ])
      .onConflictDoNothing();

    console.log("✅ Seed completed successfully");
    console.log("Admin: admin@spa.local / admin123");
    console.log("Demo: test@example.com / password123");
  } catch (error) {
    console.error("❌ Seed failed:", error);
  }
}

seed();