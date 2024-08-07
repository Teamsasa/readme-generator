import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export const initDB = async () => {
  const db = await open({
    filename: './readme-generator.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      code TEXT NOT NULL
    )
  `);

  return db;
}

export const seedDB = async (db: sqlite3.Database) => {
  const items = [
    { name: 'stat', code: 'const stats = { name: "{name}", value: 100 };' },
    { name: 'trophy', code: 'const trophy = { name: "{name}", title: "Champion" };' },
  ];

  for (const item of items) {
    await db.run('INSERT INTO items (name, code) VALUES (?, ?)', [item.name, item.code]);
  }
}
