import db from "../../config/storage.js";
import WalletBalance from "./WalletBalance.js";
class Wallet {
    constructor({ id, user_id, create_at, update_at }) {
        this.id = id,
            this.user_id = user_id,
            this.create_at = create_at || new Date().toISOString(),
            this.update_at = update_at || new Date().toISOString()
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            try {
                const stmt = db.prepare('SELECT * FROM wallets');
                const rows = stmt.all();
                return rows.map((row) => new Wallet(row));
                resolve();
            } catch (error) {
                reject(error);
            }
        })

    }

    static getByUserId(user_id) {
        return new Promise((resolve, reject) => {
            try {
                const stmt = db.prepare('SELECT * FROM wallets WHERE user_id = ?');
                const row = stmt.get(user_id);

                resolve(row ? new Wallet(row) : null);
            } catch (error) {
                reject(error)
            }
        })

    }

    static add(wallet) {
        return new Promise((resolve, reject) => {
            try {


                const stmt = db.prepare(
                    'INSERT INTO wallets (user_id, created_at, updated_at) VALUES (?,?,?)'

                );
                const result = stmt.run(wallet.user_id, wallet.create_at, wallet.update_at);
                resolve(result.lastInsertRowid);
            } catch (error) {
                reject(error)
            }
        })

    }


    static async delete(userId) {
        try {
            const stmt = db.prepare('SELECT * FROM wallets WHERE user_id = ?');
            const wallets = stmt.all(userId);
            
            for (const wallet of wallets) {
                await WalletBalance.deleteByWalletId(wallet.id);
              }
              
            const row = db.prepare('DELETE FROM wallets WHERE user_id = ?');
            return row.run(userId);
        } catch (error) {
            throw error;
        }
    }
    

}



export default Wallet;