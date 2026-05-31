// schema/sessions.ts
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./users";

export const sessions = pgTable("sessions", {
  sessionToken: text("sessionToken").primaryKey(),

  userId: uuid("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  expires: timestamp("expires").notNull(),
});