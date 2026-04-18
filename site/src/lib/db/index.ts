import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import { serverConfig } from "@/lib/server-config";

let _db: ReturnType<typeof drizzle> | undefined;

export function getDb() {
  if (_db) return _db;

  const sqlite = new Database(serverConfig.databasePath);
  sqlite.pragma("journal_mode = WAL");
  _db = drizzle(sqlite, { schema });
  return _db;
}
