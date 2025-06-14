import db from "../../config/storage.js";

class TradeOrder {
  constructor({ id, user_id, currency_id, type, price_per_unit, amount, fee, fee_currency_id, status, created_at, updated_at }) {
    this.id = id,
      this.user_id = user_id,
      this.currency_id = currency_id,
      this.type = type,
      this.price_per_unit = price_per_unit,
      this.amount = amount,
      this.fee = fee,
      this.fee_currency_id = fee_currency_id,
      this.status = status,
      this.created_at = created_at || new Date().toISOString(),
      this.updated_at = updated_at || new Date().toISOString()
  }

  static createOrder(orderObj) {
    const stmt = db.prepare(`
          INSERT INTO trade_orders (
            user_id, currency_id, type, price_per_unit, amount,
            fee, fee_currency_id, status, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

    const now = new Date().toISOString();

    const result = stmt.run(
      orderObj.user_id,
      orderObj.currency_id,
      orderObj.type,
      orderObj.price_per_unit,
      orderObj.amount,
      orderObj.fee || 0,
      orderObj.fee_currency_id ,
      orderObj.status || 'open',
      now,
      now
    );

    return (result.lastInsertRowid)
  }
  static async getOpenOrders(currency_id, type, price) {
    const oppositeType = type === 'buy' ? 'sell' : 'buy';
    const operator = type === 'buy' ? '<=' : '>=';
    const orderDirection = type === 'buy' ? 'ASC' : 'DESC';
  
    const sql = `
      SELECT * FROM trade_orders
      WHERE currency_id = ? AND type = ? AND status = 'open'
      AND price_per_unit ${operator} ?
      ORDER BY price_per_unit ${orderDirection}, created_at ASC
    `;
  
    const stmt = db.prepare(sql);
   
    
    return stmt.all(currency_id, oppositeType, price);
  }
  
  static updateStatus(order_id, newStatus) {
    const stmt = db.prepare(`
          UPDATE trade_orders SET status = ?, updated_at = ?
          WHERE id = ?
        `);
    return stmt.run(newStatus, new Date().toISOString(), order_id);
  }
  static findById(id) {
    const stmt = db.prepare("SELECT * FROM trade_orders WHERE id = ?");
    const order = stmt.get(id);
    return order; // คืนเป็น object หรือ undefined ถ้าไม่เจอ
  }
  


}
export default TradeOrder