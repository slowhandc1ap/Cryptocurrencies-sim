import db from "../../config/storage.js";

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

    static findById(currencies_id) {
        return new Promise((resolve, reject) => {
            try {
                const stmt = db.prepare(
                    'SELECT * FROM currencies WHERE id = ?'
                )
                const row = stmt.get(currencies_id)
                resolve(row ? new Currencies(row) : null)
            } catch (error) {
                reject(error)
            }
        })
    }

    static update(currencies) {
        return new Promise((resolve, reject) => {
            try {
                const stmt = db.prepare(
                    `
                    UPDATE currencies
                    SET symbol =?, name =?, type =?, decimals =? ,updated_at =?
                        WHERE id = ?
                    `
                )
                const row = stmt.run(currencies.symbol,
                    currencies.name,
                    currencies.type,
                    currencies.decimals,
                    new Date().toISOString(),

                    currencies.id
                )
                resolve(row ? new Currencies(currencies) : null)
            } catch (error) {
                reject(error)
            }
        })
    }

    static delete(curencies_id) {
        return new Promise((resolve, reject) => {
            try {
                const stmt = db.prepare('DELETE FROM currencies WHERE id =?')
                const row = stmt.run(curencies_id)
                resolve(row.changes)
            } catch (error) {
                reject(error)
            }
        })
    }
}

export default Currencies;