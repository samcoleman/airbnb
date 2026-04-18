import Database from "better-sqlite3";
import { serverConfig } from "@/lib/server-config";

let initialized = false;

export function ensureDbInit() {
  if (initialized) return;

  const db = new Database(serverConfig.databasePath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS guests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      mac TEXT,
      ip TEXT,
      ap TEXT,
      ssid TEXT,
      authorized_at INTEGER NOT NULL DEFAULT (unixepoch())
    )
  `);
  db.close();

  initialized = true;
}
