import db from '../config/storage.js';

class User {
  constructor({ id, username, email, password, created_at, updated_at }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }

  static getAll() {
    const stmt = db.prepare('SELECT * FROM users');
    const rows = stmt.all();
    return rows.map(row => new User(row));
  }

  static add(user) {
    const stmt = db.prepare(`
      INSERT INTO users (username, email, password, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(user.username, user.email, user.password, user.created_at, user.updated_at);
  }

  static findById(id) {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const row = stmt.get(id);
    return row ? new User(row) : null;
  }

  update() {
    const stmt = db.prepare(`
      UPDATE users SET username = ?, email = ?, password = ?, updated_at = ? WHERE id = ?
    `);
    stmt.run(this.username, this.email, this.password, new Date().toISOString(), this.id);
  }

  delete() {
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    stmt.run(this.id);
  }
}

export default User;
