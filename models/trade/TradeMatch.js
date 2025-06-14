import db from "../../config/storage.js";

class TradeMatch {
  constructor({ id, buy_order_id, sell_order_id, price_per_unit, amount, created_at }) {
    this.id = id;
    this.buy_order_id = buy_order_id;
    this.sell_order_id = sell_order_id;
    this.price_per_unit = price_per_unit;
    this.amount = amount;
    this.created_at = created_at || new Date().toISOString();
  }

  static createMatch(matchObj) {
    const stmt = db.prepare(`
      INSERT INTO trade_matches (
        buy_order_id, sell_order_id, price_per_unit, amount, created_at
      ) VALUES (?, ?, ?, ?, ?)
    `);

    const createdAt = new Date().toISOString();

    const result = stmt.run(
      matchObj.buy_order_id,
      matchObj.sell_order_id,
      matchObj.price_per_unit,
      matchObj.amount,
      createdAt
    );

    return {
      id: result.lastInsertRowid,
      ...matchObj,
      created_at: createdAt
    };
  }

  static getByOrderId(orderId) {
    const stmt = db.prepare(`
      SELECT * FROM trade_matches
      WHERE buy_order_id = ? OR sell_order_id = ?
    `);
    return stmt.all(orderId, orderId);
  }
}
export default TradeMatch;
