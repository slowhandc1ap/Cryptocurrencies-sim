
# 🚀 Crypto Trading Platform API

ระบบ API สำหรับแพลตฟอร์มซื้อขายคริปโต รองรับการเทรด, ฝาก-ถอน, จัดการวอลเล็ท และบันทึกธุรกรรม

## ✅ Features

- ลงทะเบียน / ล็อกอิน ผู้ใช้งาน
- รองรับหลายสกุลเงิน (Fiat / Crypto)
- สร้างและจัดการ Wallet อัตโนมัติ
- วางคำสั่งซื้อ-ขาย (Buy/Sell Orders)
- จับคู่คำสั่งซื้อขาย (Order Matching Engine)
- บันทึกประวัติธุรกรรม (Transaction History)
- ระบบฝาก (Deposit) และถอน (Withdrawal)
- ล็อกยอดเงินที่อยู่ในคำสั่งซื้อ-ขาย
- จัดเก็บค่าธรรมเนียมเทรด (สมมุติว่ามี)

## 🧰 Tech Stack

- **Language**: / Node.js / 
- **Database**: Json file for now
- **Authentication**: JWT / OAuth2 (เลือกตามโปรเจค)
- **Architecture**: RESTful API /


# 📘 Database Schema: Cryptocurrency Trading System

![Untitled (1)](https://github.com/user-attachments/assets/15776005-dd7e-4af6-b18d-de25f19a0a19)


## 📂 รายการตารางทั้งหมด

1. `users`
2. `currencies`
3. `wallets`
4. `wallet_balances`
5. `trade_orders`
6. `trade_matches`
7. `transaction_histories`
8. `deposits`
9. `withdrawals`

---

## 1. 🧑‍💼 `users`
**เก็บข้อมูลผู้ใช้งานของระบบ**

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer (PK) | รหัสผู้ใช้แบบอัตโนมัติ |
| `name` | string | ชื่อของผู้ใช้ |
| `email` | string (unique) | อีเมลผู้ใช้ ใช้สำหรับล็อกอิน |
| `password_hash` | string | รหัสผ่านแบบ hash แล้ว (ไม่เก็บ plain text) |
| `created_at` | timestamp | วันที่สร้างบัญชี |
| `updated_at` | timestamp | วันที่อัปเดตข้อมูลล่าสุด |

---

## 2. 💱 `currencies`
**เก็บข้อมูลสกุลเงินที่รองรับ ทั้ง crypto และ fiat**

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer (PK) | รหัสสกุลเงิน |
| `symbol` | string (unique) | ตัวย่อ เช่น BTC, ETH, THB |
| `name` | string (unique) | ชื่อเต็ม เช่น Bitcoin, Ethereum, Thai Baht |
| `type` | string | ประเภท: `'crypto'` หรือ `'fiat'` |
| `decimals` | integer | จำนวนตำแหน่งทศนิยมที่รองรับ |
| `created_at` | timestamp | วันที่เพิ่มสกุลเงินเข้าในระบบ |

---

## 3. 👛 `wallets`
**กระเป๋าหลักของผู้ใช้งานแต่ละคน**

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer (PK) | รหัสกระเป๋า |
| `user_id` | integer (FK) | เชื่อมกับผู้ใช้ในตาราง `users` |
| `created_at` | timestamp | วันที่สร้างกระเป๋า |
| `updated_at` | timestamp | วันที่อัปเดตข้อมูลล่าสุด |

---

## 4. 💰 `wallet_balances`
**ยอดเงินแต่ละสกุลที่อยู่ในกระเป๋า**

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer (PK) | รหัสบันทึกยอด |
| `wallet_id` | integer (FK) | เชื่อมกับ `wallets.id` |
| `currency_id` | integer (FK) | เชื่อมกับ `currencies.id` |
| `amount` | decimal(20,8) | ยอดคงเหลือทั้งหมด |
| `locked_amount` | decimal(20,8) | ยอดที่ล็อกไว้ เช่น ตอนวางออร์เดอร์ |
| `created_at` | timestamp | วันที่บันทึกยอด |
| `updated_at` | timestamp | วันที่อัปเดตยอดล่าสุด |

---

## 5. 📈 `trade_orders`
**รายการคำสั่งซื้อหรือขาย**

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer (PK) | รหัสออร์เดอร์ |
| `user_id` | integer (FK) | ผู้ที่สร้างออร์เดอร์ |
| `currency_id` | integer (FK) | สกุลที่ต้องการเทรด เช่น BTC |
| `type` | string | `'buy'` หรือ `'sell'` |
| `price_per_unit` | decimal(18,2) | ราคาต่อหน่วย (คิดเป็น THB) |
| `amount` | decimal(20,8) | ปริมาณที่ต้องการเทรด |
| `fee` | decimal(20,8) | ค่าธรรมเนียมของออร์เดอร์นี้ |
| `fee_currency_id` | integer (FK) | สกุลเงินของค่าธรรมเนียม |
| `status` | string | สถานะ: `'open'`, `'filled'`, `'cancelled'` |
| `created_at` | timestamp | วันที่สร้างออร์เดอร์ |
| `updated_at` | timestamp | วันที่อัปเดตล่าสุด |

---

## 6. ⚖️ `trade_matches`
**รายการที่จับคู่ซื้อขายสำเร็จ**

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer (PK) | รหัสแมทช์ |
| `buy_order_id` | integer (FK) | อ้างอิงออร์เดอร์ฝั่งซื้อ |
| `sell_order_id` | integer (FK) | อ้างอิงออร์เดอร์ฝั่งขาย |
| `price_per_unit` | decimal(18,2) | ราคาต่อหน่วยที่แมทช์กันได้ |
| `amount` | decimal(20,8) | ปริมาณที่ซื้อขายกันได้ |
| `created_at` | timestamp | วันที่จับคู่สำเร็จ |

---

## 7. 🔄 `transaction_histories`
**บันทึกธุรกรรมระหว่างผู้ใช้**

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer (PK) | รหัสธุรกรรม |
| `from_user_id` | integer (FK) | ผู้ส่ง |
| `to_user_id` | integer (FK) | ผู้รับ |
| `currency_id` | integer (FK) | สกุลเงินของธุรกรรม |
| `amount` | decimal(20,8) | จำนวนที่ทำรายการ |
| `type` | string | `'trade'` หรือ `'transfer'` |
| `reference_id` | integer | อ้างถึงออร์เดอร์ หรือ withdrawal |
| `created_at` | timestamp | วันที่เกิดธุรกรรม |

---

## 8. ➕ `deposits`
**การฝากเงินเข้า (Crypto หรือ Fiat)**

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer (PK) | รหัสการฝาก |
| `user_id` | integer (FK) | ผู้ฝาก |
| `currency_id` | integer (FK) | สกุลเงินที่ฝาก |
| `amount` | decimal(20,8) | จำนวนเงินฝาก |
| `tx_hash` | string | รหัสธุรกรรมบน blockchain |
| `status` | string | `'pending'`, `'confirmed'`, `'failed'` |
| `created_at` | timestamp | วันที่ฝาก |

---

## 9. ➖ `withdrawals`
**การถอนเงินออก (Crypto หรือ Fiat)**

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer (PK) | รหัสการถอน |
| `user_id` | integer (FK) | ผู้ถอน |
| `currency_id` | integer (FK) | สกุลเงินที่ถอน |
| `target_address` | string | ที่อยู่ปลายทาง (Wallet Address หรือบัญชีธนาคาร) |
| `amount` | decimal(20,8) | จำนวนที่ถอน |
| `fee` | decimal(20,8) | ค่าธรรมเนียมในการถอน |
| `status` | string | `'pending'`, `'completed'`, `'cancelled'` |
| `created_at` | timestamp | วันที่ทำรายการ |

---


