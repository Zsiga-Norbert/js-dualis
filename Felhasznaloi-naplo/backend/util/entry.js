import db from "./database.js"

db.prepare('CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, title STRING UNIQUE, content STRING, createdAt DATE)').run()

export const getEntryById = (id) =>
  db.prepare("SELECT * FROM entries WHERE id = ?").get(id);

export const getEntriesByUserId = (userId) => db.prepare("SELECT * FROM entries WHERE userId = ?").get(userId)

export const saveEntry = (userId, title, content, createdAt) => db.prepare("INSERT INTO entries(userId, title, content, createdAt) VALUES (?,?,?,?)").run(userId, title, content, createdAt)

export const updateEntry = (id, title, content) => db.prepare("UPDATE entries SET title = ?, content = ? WHERE id = ?").run(title, content,id)

export const deleteEntry = (id) => db.prepare("DELETE FROM entries WHERE id = ?").run(id)