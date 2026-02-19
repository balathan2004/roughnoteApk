import * as SQLite from "expo-sqlite";

import { Doc } from "../components/interfaces";

let db: SQLite.SQLiteDatabase;

export async function getDB() {
  if (!db) {
    db = await SQLite.openDatabaseAsync("notes");

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS notes (
        doc_id TEXT PRIMARY KEY NOT NULL,
        doc_text TEXT,
        doc_name TEXT,
        uid TEXT,
        doc_created INTEGER,
        lastUpdated INTEGER,
        deleted INTEGER DEFAULT 0
      );
    `);

    console.log("DB Ready");
  }

  return db;
}

async function addNote(doc: Doc) {
  const db = await getDB();

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

async function updateDoc(doc: Doc) {
  const db = await getDB();

  const data = (await db.getFirstAsync(`SELECT * FROM notes WHERE doc_id = ?`, [
    doc.doc_id,
  ])) as Doc;

  if (!data) return addNote(doc);

  if (data.lastUpdated < doc.lastUpdated) {
    await db.runAsync(
      `UPDATE notes SET doc_text = ?, doc_name = ?, lastUpdated = ?, deleted = ? WHERE doc_id = ?`,
      [
        doc.doc_text,
        doc.doc_name,
        doc.lastUpdated,
        doc.deleted ? 1 : 0,
        doc.doc_id,
      ],
    );
  } else {
    console.log("local data is newer than incoming data, skipping update");
    return;
  }
}

async function getAllNotes(): Promise<Doc[]> {
  const db = await getDB();

  const result = (await db.getAllAsync(
    `SELECT * FROM notes WHERE deleted = 0`,
  )) as any[];
  return (
    result.map((row) => ({
      doc_id: row.doc_id,
      doc_text: row.doc_text,
      doc_name: row.doc_name,
      uid: row.uid,
      doc_created: row.doc_created,
      lastUpdated: row.lastUpdated,
      deleted: row.deleted === 1,
    })) ?? []
  );
}

export { addNote, getAllNotes ,updateDoc};
