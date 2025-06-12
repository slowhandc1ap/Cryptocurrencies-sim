// ./config/storage.js

import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👉 ตรวจสอบและสร้างโฟลเดอร์ db
const dbDir = path.join(__dirname, '../db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// เชื่อมต่อ SQLite DB
const db = new Database(path.join(dbDir, 'data.db'));

// เปิด foreign keys
db.pragma('foreign_keys = ON');

// สร้างตาราง users
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);
// สร้างตาราง currencies
db.exec(`
  CREATE TABLE IF NOT EXISTS currencies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL, -- 'crypto' or 'fiat'
    decimals INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// สร้างตาราง wallets
db.exec(`
  CREATE TABLE IF NOT EXISTS wallets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// สร้างตาราง wallet_balances
db.exec(`
  CREATE TABLE IF NOT EXISTS wallet_balances (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    wallet_id INTEGER NOT NULL,
    currency_id INTEGER NOT NULL,
    amount DECIMAL(20,8) DEFAULT 0,
    locked_amount DECIMAL(20,8) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wallet_id) REFERENCES wallets(id),
    FOREIGN KEY (currency_id) REFERENCES currencies(id)
  );
`);

// สร้างตาราง trade_orders
db.exec(`
  CREATE TABLE IF NOT EXISTS trade_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    currency_id INTEGER NOT NULL,
    type TEXT NOT NULL, -- 'buy' or 'sell'
    price_per_unit DECIMAL(18,2) NOT NULL, -- THB
    amount DECIMAL(20,8) NOT NULL,
    fee DECIMAL(20,8) NOT NULL,
    fee_currency_id INTEGER NOT NULL,
    status TEXT NOT NULL, -- 'open', 'filled', 'cancelled'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (currency_id) REFERENCES currencies(id),
    FOREIGN KEY (fee_currency_id) REFERENCES currencies(id)
  );
`);

// สร้างตาราง trade_matches
db.exec(`
  CREATE TABLE IF NOT EXISTS trade_matches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    buy_order_id INTEGER NOT NULL,
    sell_order_id INTEGER NOT NULL,
    price_per_unit DECIMAL(18,2) NOT NULL,
    amount DECIMAL(20,8) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (buy_order_id) REFERENCES trade_orders(id),
    FOREIGN KEY (sell_order_id) REFERENCES trade_orders(id)
  );
`);

// สร้างตาราง transaction_histories
db.exec(`
  CREATE TABLE IF NOT EXISTS transaction_histories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_user_id INTEGER,
    to_user_id INTEGER,
    currency_id INTEGER NOT NULL,
    amount DECIMAL(20,8) NOT NULL,
    type TEXT NOT NULL, -- 'trade', 'transfer'
    reference_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_user_id) REFERENCES users(id),
    FOREIGN KEY (to_user_id) REFERENCES users(id),
    FOREIGN KEY (currency_id) REFERENCES currencies(id)
  );
`);

// สร้างตาราง deposits
db.exec(`
  CREATE TABLE IF NOT EXISTS deposits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    currency_id INTEGER NOT NULL,
    amount DECIMAL(20,8) NOT NULL,
    tx_hash TEXT,
    status TEXT NOT NULL, -- 'pending', 'confirmed', 'failed'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (currency_id) REFERENCES currencies(id)
  );
`);

// สร้างตาราง withdrawals
db.exec(`
  CREATE TABLE IF NOT EXISTS withdrawals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    currency_id INTEGER NOT NULL,
    target_address TEXT NOT NULL,
    amount DECIMAL(20,8) NOT NULL,
    fee DECIMAL(20,8) NOT NULL,
    status TEXT NOT NULL, -- 'pending', 'completed', 'cancelled'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (currency_id) REFERENCES currencies(id)
  );
`);


export default db;
