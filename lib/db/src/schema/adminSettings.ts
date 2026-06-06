import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Generic key/value store for admin settings (e.g. the hashed admin password).
 * Single-owner admin, so a small settings table is sufficient.
 */
export const adminSettingsTable = pgTable("admin_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type AdminSetting = typeof adminSettingsTable.$inferSelect;
