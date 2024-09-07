// @ts-check
import sqlite3 from "sqlite3";
import fs from "fs/promises";

await fs.rm("test.db", { force: true });

const db = new sqlite3.Database(
  "test.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
);

/** @type {(sql: string) => Promise<void>} */
const exec = (sql) =>
  new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) reject(err);
      else resolve(undefined);
    });
  });

/** @type {(sql: string) => Promise<any[]>} */
const query = (sql) =>
  new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });

await exec(`CREATE TABLE IF NOT EXISTS Users (
    _id INTEGER PRIMARY KEY AUTOINCREMENT,
    id TEXT NOT NULL UNIQUE,         -- Discord ID stored as TEXT
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 0,
    balance REAL DEFAULT 0.00,
    market_items TEXT DEFAULT NULL,  -- JSON array of item IDs
    last_level_up TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);

await exec(
  `INSERT INTO Users (id, xp, level) VALUES (1248626823638552701, 0, 0)`
);

const rows = await query("SELECT * FROM Users");

console.log(rows);

const formattedRows = rows.map((row) => {
  if (typeof row === "object" && row !== null) {
    for (const key in row) {
      if (typeof row[key] === "string") {
        try {
          const parsed = JSON.parse(row[key]);
          row[key] = parsed;
        } catch (e) {
          // Leave it as a string if it's not JSON
        }
      }
    }
  }
  return row;
});

console.log(formattedRows);
