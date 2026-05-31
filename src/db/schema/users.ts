import {
  pgTable,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: text("name"),

  email: text("email").notNull().unique(),

  emailVerified: timestamp("emailVerified"),

  image: text("image"),

  passwordHash: text("password_hash"),

  role: text("role").notNull().default("user"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});