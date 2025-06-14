
# 🚀 Crypto Trading Platform API

# ระบบการซื้อขายสกุลเงินดิจิทัล API

เอกสารนี้สรุปฟีเจอร์และ API Endpoints สำหรับระบบการซื้อขายสกุลเงินดิจิทัล ซึ่งครอบคลุมการจัดการผู้ใช้ กระเป๋าเงิน การฝาก-ถอนเงิน การโอนเงิน การจัดการสกุลเงิน คำสั่งซื้อขาย และการบันทึกธุรกรรม
## ⚙️ วิธีติดตั้งและรันโปรเจค

### 1. Clone โปรเจค
ดาวน์โหลดโค้ดโปรเจคจาก repository และเข้าสู่โฟลเดอร์โปรเจค

```bash
git clone https://github.com/your-username/your-project-name.git
cd your-project-name
```

### 2. ติดตั้ง Dependencies
ติดตั้งแพ็คเกจที่จำเป็นสำหรับโปรเจค

```bash
npm install
```

### 3. รัน Seeder เพื่อสร้าง DB และเติมข้อมูลเริ่มต้น
Seeder จะสร้างตารางในฐานข้อมูลและเติมข้อมูลเริ่มต้น (Users, Currencies, Wallet, Balance ฯลฯ)



```bash
node seed.js
```

### 4. เริ่มต้นเซิร์ฟเวอร์
รันเซิร์ฟเวอร์เพื่อเริ่มใช้งานระบบ

```bash
npm run dev
```

## ฟีเจอร์

### 🧑‍💻 API การจัดการผู้ใช้
จัดการการสมัครสมาชิก การแก้ไข การลบ และการดูข้อมูลผู้ใช้

- **สมัครสมาชิก**  
  **Endpoint**: `POST /users`  
  **คำอธิบาย**: สร้างบัญชีผู้ใช้ใหม่ โดยมีการตรวจสอบข้อมูลผ่าน middleware  
  **Middleware**: `validateRegister`  
  **Controller**: `addUserController`

- **แก้ไขข้อมูลผู้ใช้**  
  **Endpoint**: `PUT /users/:user_id`  
  **คำอธิบาย**: แก้ไขข้อมูลผู้ใช้ตาม ID ที่ระบุ  
  **Controller**: `updateUserById`

- **ลบผู้ใช้**  
  **Endpoint**: `DELETE /users/:user_id`  
  **คำอธิบาย**: ลบบัญชีผู้ใช้ตาม ID  
  **Controller**: `deleteUserController`

- **ดูข้อมูลผู้ใช้ทั้งหมด**  
  **Endpoint**: `GET /users`  
  **คำอธิบาย**: ดึงรายชื่อผู้ใช้ทั้งหมด  
  **Controller**: `getAllUsers`

- **ดูข้อมูลผู้ใช้รายบุคคล**  
  **Endpoint**: `GET /users/:user_id`  
  **คำอธิบาย**: ดึงข้อมูลผู้ใช้ตาม ID  
  **Controller**: `getUserByIdController`

### 💼 API กระเป๋าเงิน
จัดการกระเป๋าเงินของผู้ใช้ รวมถึงการสร้างและลบกระเป๋าเงิน

- **ดูข้อมูลกระเป๋าเงินทั้งหมด**  
  **Endpoint**: `GET /wallets`  
  **คำอธิบาย**: ดึงข้อมูลกระเป๋าเงินทั้งหมด  
  **Controller**: `getAllwallets`

- **ดูข้อมูลกระเป๋าเงินตามผู้ใช้**  
  **Endpoint**: `GET /wallets/:userId`  
  **คำอธิบาย**: ดึงข้อมูลกระเป๋าเงินของผู้ใช้ตาม ID  
  **Controller**: `getAllwalletByUserId`

- **สร้างกระเป๋าเงิน**  
  **Endpoint**: `POST /wallets/add`  
  **คำอธิบาย**: สร้างกระเป๋าเงินสำหรับผู้ใช้  
  **Controller**: `createWallet`

- **ลบกระเป๋าเงิน**  
  **Endpoint**: `DELETE /wallets/:walletId`  
  **คำอธิบาย**: ลบกระเป๋าเงินตาม ID  
  **Controller**: `deleteWallet`

- **ลบกระเป๋าเงินทั้งหมดของผู้ใช้**  
  **Endpoint**: `DELETE /wallets/user/:userId`  
  **คำอธิบาย**: ลบกระเป๋าเงินทั้งหมดของผู้ใช้ตาม ID  
  **Controller**: `deleteWalletsByUser`

### 💱 API การจัดการสกุลเงิน
จัดการสกุลเงินที่รองรับในระบบ

- **ดูรายการสกุลเงินทั้งหมด**  
  **Endpoint**: `GET /currencies`  
  **คำอธิบาย**: ดึงรายชื่อสกุลเงินทั้งหมดที่รองรับ  
  **Controller**: `getAllCurrenciesController`

- **ดูข้อมูลสกุลเงินตาม ID**  
  **Endpoint**: `GET /currencies/:currencies_id`  
  **คำอธิบาย**: ดึงข้อมูลสกุลเงินตาม ID  
  **Controller**: `getCurrenciesByid`

- **สร้างสกุลเงินใหม่**  
  **Endpoint**: `POST /currencies/register`  
  **คำอธิบาย**: เพิ่มสกุลเงินใหม่ เช่น BTC, ETH, USD  
  **Middleware**: `validateCurrency`  
  **Controller**: `addCurrenciesController`

- **อัปเดตสกุลเงิน**  
  **Endpoint**: `PUT /currencies/update/:curencies_id`  
  **คำอธิบาย**: แก้ไขข้อมูลสกุลเงินตาม ID  
  **Middleware**: `validateCurrency`  
  **Controller**: `updateCurencies`

- **ลบสกุลเงิน**  
  **Endpoint**: `DELETE /currencies/delete/:currencies_id`  
  **คำอธิบาย**: ลบสกุลเงินตาม ID  
  **Controller**: `delteCurrenciesController`

### 💰 API ฝาก/ถอนเงิน
จัดการการฝากและถอนเงินสกุลเงินทั่วไป (Fiat)

- **ฝากเงิน (เฉพาะ Fiat)**  
  **Endpoint**: `POST /deposits`  
  **คำอธิบาย**: ผู้ใช้ฝากเงินสกุลทั่วไป เช่น USD, THB เข้ากระเป๋าเงิน  
  **บันทึก**: ใน `transaction_histories` ด้วยประเภท "deposit"  
  **Controller**: `depositsController`

- **ถอนเงิน (เฉพาะ Fiat)**  
  **Endpoint**: `POST /withdraws`  
  **คำอธิบาย**: ผู้ใช้ถอนเงินสกุลทั่วไปออกจากระบบ  
  **บันทึก**: ใน `transaction_histories` ด้วยประเภท "withdraw"  
  **Controller**: `withdrawController`

### 🔄 API โอนเงิน
จัดการการโอนเงินระหว่างผู้ใช้ภายในระบบ

- **โอนเงิน**  
  **Endpoint**: `POST /transfers`  
  **คำอธิบาย**: โอนเงินระหว่างผู้ใช้ (ทั้ง Fiat และ Crypto)  
  **บันทึก**: ใน `transaction_histories` ด้วยประเภท "transfer"  
  **Controller**: `transferCryptoController`

### 📈 API คำสั่งซื้อขาย
จัดการคำสั่งซื้อและขายสำหรับการซื้อขายสกุลเงินดิจิทัล

- **สร้างคำสั่งซื้อขาย**  
  **Endpoint**: `POST /trade-orders`  
  **คำอธิบาย**:  
    - สร้างคำสั่งซื้อ (type: "buy") หรือขาย (type: "sell")  
    - ซื้อ: ผู้ใช้ใช้เงิน Fiat เพื่อซื้อ Crypto, ตรวจสอบยอดเงิน Fiat, ล็อกยอด, บันทึกคำสั่ง, และเรียก `matchOrder`  
    - ขาย: ผู้ใช้ใช้ Crypto เพื่อขายแลกเป็น Fiat, ตรวจสอบยอด Crypto, ล็อกยอด, บันทึกคำสั่ง, และเรียก `matchOrder`  
  **Controller**: `createTradeOrder`

### 🤝 ตรรกะการจับคู่คำสั่ง
จับคู่คำสั่งซื้อและขายตามราคาและปริมาณ

- **กระบวนการ**:  
  - ค้นหาคำสั่งฝั่งตรงข้ามที่มีราคาตรงกัน  
  - จับคู่ปริมาณตามที่สามารถทำได้  
  - อัปเดตกระเป๋าเงิน:  
    - ผู้ซื้อ: หักเงิน Fiat, เพิ่ม Crypto  
    - ผู้ขาย: หัก Crypto, เพิ่ม Fiat  
  - ปลดล็อกยอดเงินที่เหลือ  
  - เปลี่ยนสถานะคำสั่งเป็น "matched"  
  - บันทึกการซื้อขายใน `TradeMatch` และ `transaction_histories` (ประเภท: "match")

### 🧾 API บันทึกธุรกรรม
บันทึกทุกการเคลื่อนไหวของเงินในระบบ

- **บันทึกธุรกรรม**  
  **Endpoint**: `POST /transactions`  
  **คำอธิบาย**: บันทึกธุรกรรมทั้งหมดในตาราง `transaction_histories`  
  **ประเภทธุรกรรม**:  
    - ฝากเงิน (deposit)  
    - ถอนเงิน (withdraw)  
    - โอนเงิน (transfer)  
    - การจับคู่ซื้อขาย (match)  
  **Controller**: `saveTransactionController`

### 💰 API การจัดการยอดเงินในกระเป๋า
จัดการยอดเงินในกระเป๋าเงินของผู้ใช้

- **ดูยอดเงินทั้งหมด**  
  **Endpoint**: `GET /wallet-balances`  
  **คำอธิบาย**: ดึงข้อมูลยอดเงินทั้งหมดในกระเป๋าเงิน  
  **Controller**: `getAllWalletBalanceController`

- **เพิ่มยอดเงินในกระเป๋า**  
  **Endpoint**: `POST /wallet-balances/addwb`  
  **คำอธิบาย**: เพิ่มยอดเงินในสกุลเงินที่ระบุในกระเป๋าเงิน  
  **Controller**: `addWalletBalanceController`

## หมายเหตุ
- API นี้ใช้ Express.js และมีการตรวจสอบข้อมูลผ่าน middleware เช่น `validateRegister` และ `validateCurrency`
- การจับคู่คำสั่งซื้อขาย (`matchOrder`) เป็นตรรกะภายในที่ไม่ได้ระบุใน router แต่ถูกเรียกใช้ใน `createTradeOrder`
- การบันทึกธุรกรรมทั้งหมดจะอยู่ในตาราง `transaction_histories` เพื่อให้สามารถติดตามการเคลื่อนไหวของเงินได้


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


