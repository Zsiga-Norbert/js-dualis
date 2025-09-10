import Database from 'better-sqlite3'

const db = new Database('./data/database.sqlite');

db.prepare(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, emailAddress STRING UNIQUE, password STRING)`).run();

export const getUsers = () => db
    .prepare('SELECT * FROM users ').all();

export const saveUser = (emailAddress, password) => db
    .prepare('INSERT INTO users (emailAddress, password) VALUES (?,?)').run(emailAddress, password);