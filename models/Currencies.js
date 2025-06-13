import db from "../config/storage.js";
// id INTEGER PRIMARY KEY AUTOINCREMENT,
// symbol TEXT NOT NULL UNIQUE,
// name TEXT NOT NULL UNIQUE,
// type TEXT NOT NULL, -- 'crypto' or 'fiat'
// decimals INTEGER NOT NULL,
// created_at DATETIME DEFAULT CURRENT_TIMESTAMP
class Currencies {
    constructor({ id, symbol, name, type, decimals, create_at }) {


        if (typeof symbol !== 'string') throw new TypeError("symbol must be a string");
        if (typeof decimals !== 'number') throw new TypeError("decimals must be a number");
        if (!['fiat', 'crypto'].includes(type)) throw new TypeError("type must be 'fiat' or 'crypto'");

        this.id = id,
            this.symbol = symbol,
            this.name = name,
            this.type = type,
            this.decimals = decimals,
            this.create_at = create_at || new Date().toISOString()
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            try {
                const stmt = db.prepare('SELECT * FROM currencies');
                const rows = stmt.all();
                resolve(rows.map((row) => new Currencies(row)));
            } catch (error) {
                reject(error)
            }
        })

    }
    static add(currencies) {

        return new Promise((resolve, reject) => {
            try {
                const stmt = db.prepare(
                    'INSERT INTO currencies (id, symbol, name, type, decimals, created_at) VALUES (?,?,?,?,?,?)'

                );

                const result = stmt.run(currencies.id, currencies.symbol, currencies.name, currencies.type, currencies.decimals, currencies.create_at);
                resolve(
                    {
                        id: result.lastInsertRowid,
                        ...currencies
                    });
            } catch (error) {
                reject(error)
            }
        })

    }
}

export default Currencies;