import db from "../../config/storage.js"; // แนะนำใส่ .js เผื่อ error เรื่อง extension

class WalletBalance {
  constructor({
    id,
    wallet_id,
    currency_id,
    amount,
    locked_amount,
    created_at,
    updated_at
  }) {
    this.id = id;
    this.wallet_id = wallet_id;
    this.currency_id = currency_id;
    this.amount = amount;
    this.locked_amount = locked_amount || 0;  
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      try {
        const stmt = db.prepare("SELECT * FROM wallet_balances");
        const rows = stmt.all();
        resolve(rows.map((row) => new WalletBalance(row)));
      } catch (error) {
        reject(error);
      }
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      try {
        const stmt = db.prepare("SELECT * FROM wallet_balances WHERE id = ?");
        const row = stmt.get(id);
        resolve(row ? new WalletBalance(row) : null);
      } catch (error) {
        reject(error);
      }
    });
  }

  static getByWalletAndCurrency(wallet_id, currency_id) {
    return new Promise((resolve, reject) => {
      try {
        const stmt = db.prepare(`
          SELECT * FROM wallet_balances 
          WHERE wallet_id = ? AND currency_id = ?
        `);
        const row = stmt.get(wallet_id, currency_id);
        resolve(row ? new WalletBalance(row) : null);
      } catch (error) {
        reject(error);
      }
    });
  }
  

  static add(walletBalance) {
    return new Promise((resolve, reject) => {
        try {
            // validate ก่อนว่า wallet_id กับ currency_id ซ้ำไหม
            const exists = db.prepare(`
                SELECT id FROM wallet_balances 
                WHERE wallet_id = ? AND currency_id = ?
            `).get(walletBalance.wallet_id, walletBalance.currency_id);

            if (exists) {
                throw new Error('Wallet balance for this wallet and currency already exists');
            }

            // เสกค่า amount = 0 และ locked_amount = 0 เสมอ!
            const amount = 0;
            const locked_amount = 0;

            const created_at = new Date().toISOString();
            const updated_at = new Date().toISOString();

            const stmt = db.prepare(`
                INSERT INTO wallet_balances (wallet_id, currency_id, amount, locked_amount, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?)
            `);

            const result = stmt.run(
                walletBalance.wallet_id,
                walletBalance.currency_id,
                amount,
                locked_amount,
                created_at,
                updated_at
            );

            resolve(result.lastInsertRowid);
        } catch (error) {
            reject(error);
        }
    });
}


static increaseAmount(wallet_id, currency_id, amountToAdd) {
    return new Promise((resolve, reject) => {
      try {
        const stmt = db.prepare(`
          UPDATE wallet_balances
          SET amount = amount + ?, updated_at = ?
          WHERE wallet_id = ? AND currency_id = ?
        `);
        stmt.run(amountToAdd, new Date().toISOString(), wallet_id, currency_id);
        // ดึงข้อมูลแถวล่าสุดกลับมาอีกครั้งเพื่อใช้ใน response
        const selectStmt = db.prepare(`
          SELECT * FROM wallet_balances
          WHERE wallet_id = ? AND currency_id = ?
        `);
        const row = selectStmt.get(wallet_id, currency_id);
  
        resolve(row ? new WalletBalance(row) : null);
      } catch (error) {
        reject(error);
      }
    });
  }
  

  static delete(id) {
    return new Promise((resolve, reject) => {
      try {
        const stmt = db.prepare("DELETE FROM wallet_balances WHERE id = ?");
        const result = stmt.run(id);
        resolve(result.changes);
      } catch (error) {
        reject(error);
      }
    });

    // delete when delete wallet
  }
  static deleteByWalletId(wallet_id) {
    return new Promise((resolve, reject) => {
      try {
        const stmt = db.prepare("DELETE FROM wallet_balances WHERE wallet_id = ?");
        const result = stmt.run(wallet_id);
        resolve(result.changes);
      } catch (error) {
        reject(error);
      }
    });
  }
  
}

export default WalletBalance;
