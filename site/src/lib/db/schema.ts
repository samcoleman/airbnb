import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const guests = sqliteTable("guests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  mac: text("mac"),
  ip: text("ip"),
  ap: text("ap"),
  ssid: text("ssid"),
  authorizedAt: integer("authorized_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
