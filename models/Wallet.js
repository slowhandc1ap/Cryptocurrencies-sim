import db from "../config/storage.js";

class Wallet {
    constructor({id,user_id,create_at,update_at}){
        this.id = id,
        this.user_id = user_id,
        this.create_at = create_at || new Date().toISOString(),
        this.update_at = update_at || new Date().toISOString()
    }

    static getAll() {
        const stmt = db.prepare('SELECT * FROM wallets');
        const rows = stmt.all();
        return rows.map((row) => new Wallet(row))
    }

    static getByUserId(user_id) {
        const stmt = db.prepare('SELECT * FROM wallets WHERE user_id = ?');
        const row = stmt.get(user_id);
        return row ? new Wallet(row) : null ;
    }

    static add(wallet) {
        const stmt = db.prepare(
            'INSERT INTO wallets (user_id, created_at, updated_at) VALUES (?,?,?)'

        );

        const result = stmt.run(wallet.user_id, wallet.create_at, wallet.update_at);
        return result.lastInsertRowid;
    }
    static delete(id) {
        if (typeof id !== "number" && typeof id !== "string") {
            throw new TypeError("user_id must be a number or string");
        }
    
        const stmt = db.prepare('DELETE FROM wallets WHERE id = ?');
        const result = stmt.run(id);
        return result.changes;
    }
    
    

    
}

export default Wallet;