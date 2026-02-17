import SQLite from "expo-sqlite";
import { Doc } from "../components/interfaces";
const db = await SQLite.openDatabaseAsync("notes");

async function createTable() {
  await db.runAsync(`CREATE TABLE IF NOT EXISTS notes (
  doc_id TEXT PRIMARY KEY NOT NULL,
  doc_text TEXT,
  doc_name TEXT,
  uid TEXT,
  doc_created INTEGER,
  lastUpdated INTEGER,
  deleted INTEGER DEFAULT 0
);`);
}

async function addNote(doc: Doc) {
  await db.runAsync(`INSERT INTO notes VALUES (?, ?, ?, ?, ?, ?, ?)`, [
    doc.doc_id,
    doc.doc_text,
    doc.doc_name,
    doc.uid,
    doc.doc_created,
    doc.lastUpdated,
    doc.deleted ? 1 : 0,
  ]);
}

export { db, createTable, addNote };
