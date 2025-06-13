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
    return new Promise((resolve, reject) => {
      try {
        const stmt = db.prepare('SELECT * FROM users');
        const rows = stmt.all();
        resolve(rows.map(row => new User(row)));
      } catch (error) {
        reject(error)
      }
    })

  }

  static add(user) {
    return new Promise((resolve, reject) => {
      try {
        const stmt = db.prepare(`
          INSERT INTO users (username, email, password, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?)
        `);

        const result = stmt.run(user.username, user.email, user.password, user.created_at, user.updated_at);
        resolve({
          id: result.lastInsertRowid,
          ...user
        });
      } catch (error) {
        reject(error)
      }
    })


  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      try {
        const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
        const row = stmt.get(id);
        resolve(row ? new User(row) : null);
      } catch (error) {
        reject(error)
      }
    })

  }

  static update(user) {
    return new Promise((resolve, reject) => {
      try {
        const stmt = db.prepare(`
          UPDATE users
          SET username = ?, email = ?, password = ?, updated_at = ?
          WHERE id = ?
        `);

        const result = stmt.run(
          user.username,
          user.email,
          user.password,
          new Date().toISOString(),
          user.id
        );

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }


  static delete(user_id) {
    return new Promise((resolve, reject) => {
      try {
        const stmt = db.prepare('DELETE FROM users WHERE id = ?');
        stmt.run(user_id);
        resolve()
      } catch (error) {
        reject(error)
      }

    })

  }
}

export default User;
