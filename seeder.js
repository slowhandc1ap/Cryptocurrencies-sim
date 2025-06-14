// ./config/seeder.js
import db from "./config/storage.js";

function now() {
  return new Date().toISOString();
}

//  USERS
const users = [
  { username: 'alice', email: 'alice@example.com', password: '123456' },
  { username: 'bob', email: 'bob@example.com', password: 'password' },
];
const insertUser = db.prepare(`
  INSERT OR IGNORE INTO users (username, email, password, created_at, updated_at)
  VALUES (@username, @email, @password, @created_at, @updated_at)
`);
for (const user of users) {
  insertUser.run({ ...user, created_at: now(), updated_at: now() });
}

//  CURRENCIES
const currencies = [
  { symbol: 'THB', name: 'Thai Baht', type: 'fiat', decimals: 2 },
  { symbol: 'USD', name: 'US Dollar', type: 'fiat', decimals: 2 },
  { symbol: 'BTC', name: 'Bitcoin', type: 'crypto', decimals: 8 },
  { symbol: 'ETH', name: 'Ethereum', type: 'crypto', decimals: 8 },
  { symbol: 'USDT', name: 'Tether', type: 'crypto', decimals: 6 },
  { symbol: 'BNB', name: 'Binance Coin', type: 'crypto', decimals: 8 },
  { symbol: 'DOGE', name: 'Dogecoin', type: 'crypto', decimals: 8 },
  { symbol: 'XRP', name: 'Ripple', type: 'crypto', decimals: 8 },
  { symbol: 'ADA', name: 'Cardano', type: 'crypto', decimals: 6 },
];
const insertCurrency = db.prepare(`
  INSERT OR IGNORE INTO currencies (symbol, name, type, decimals, created_at, updated_at)
  VALUES (@symbol, @name, @type, @decimals, @created_at, @updated_at)
`);
for (const c of currencies) {
  insertCurrency.run({ ...c, created_at: now(), updated_at: now() });
}

// WALLETS
const usersFromDB = db.prepare(`SELECT * FROM users`).all();
const insertWallet = db.prepare(`
  INSERT INTO wallets (user_id, created_at, updated_at)
  VALUES (?, ?, ?)
`);
for (const user of usersFromDB) {
  insertWallet.run(user.id, now(), now());
}

// WALLET BALANCES (ให้แต่ละคนมี BTC, THB)
const currencyMap = {};
for (const c of db.prepare(`SELECT * FROM currencies`).all()) {
  currencyMap[c.symbol] = c.id;
}

const wallets = db.prepare(`SELECT * FROM wallets`).all();
const insertBalance = db.prepare(`
  INSERT INTO wallet_balances (wallet_id, currency_id, amount, locked_amount, created_at, updated_at)
  VALUES (?, ?, ?, ?, ?, ?)
`);
for (const wallet of wallets) {
  insertBalance.run(wallet.id, currencyMap['BTC'], 0.5, 0, now(), now());
  insertBalance.run(wallet.id, currencyMap['THB'], 50000, 0, now(), now());
}

// DEPOSITS (สมมุติว่าใส่ fiat เข้ามา)
const insertDeposit = db.prepare(`
  INSERT INTO deposits (user_id, currency_id, amount, tx_hash, status, created_at)
  VALUES (?, ?, ?, ?, ?, ?)
`);
for (const user of usersFromDB) {
  insertDeposit.run(user.id, currencyMap['THB'], 50000, 'tx-' + Math.random().toString(36).slice(2, 10), 'confirmed', now());
}

console.log('✅ Seeder complete');
