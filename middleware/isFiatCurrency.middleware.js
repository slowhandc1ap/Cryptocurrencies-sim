import db from "../config/storage.js";

export function isFiatCurrency(currency_id) {
    const stmt = db.prepare("SELECT type FROM currencies WHERE id = ?");
    const row = stmt.get(currency_id);
    return row?.type === 'fiat';
}
