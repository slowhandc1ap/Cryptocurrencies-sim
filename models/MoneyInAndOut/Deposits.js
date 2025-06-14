import db from "../../config/storage.js";
import Wallet from "../wallet/Wallet.js";
import WalletBalance from "../wallet/WalletBalance.js";
import { isFiatCurrency } from "../../middleware/isFiatCurrency.middleware.js";


class Deposits {
    constructor({ id, user_id, currency_id, amount, tx_hash, status, create_at }) {
        this.id = id,
            this.user_id = user_id,
            this.currency_id = currency_id,
            this.amount = amount,
            this.tx_hash = tx_hash,
            this.status = status || 'pending',
            this.created_at = create_at || new Date().toISOString()
    }

    static async moneyIn(depositObj) {
        try {
            const { user_id, currency_id, amount, tx_hash } = depositObj;
            // find user wallet
            const wallet = await Wallet.getByUserId(user_id);
            if (!wallet) throw new Error('Wallet not found')

            const wallet_id = wallet.id

            //check balance wallet 
            const balance = await WalletBalance.getByWalletAndCurrency(wallet_id, currency_id);



            if (!balance) {
                await WalletBalance.add({ wallet_id, currency_id })
            }


            // ตรวจสอบว่า currency เป็น fiat หรือไม่
            if (!isFiatCurrency(currency_id)) {
                throw new Error("Deposit Failed: Only fiat currencies are allowed.");
            }

            // save deposit
            const insertDeposit = db.prepare(`
                    INSERT INTO deposits (user_id, currency_id, amount, tx_hash, status) VALUES (?,?,?,?,?)
                `)
            const result = insertDeposit.run(user_id, currency_id, amount, tx_hash, 'confirmed');

            const row = result.lastInsertRowid
            const depositRow = db.prepare(`SELECT * FROM deposits WHERE id = ?`).get(row);
            const updateBalance = await WalletBalance.increaseAmount(wallet_id, currency_id, amount);


            return {
                depositRow,
                updateBalance
            };

        } catch (error) {
            throw new Error(`Deposit Filed : ${error.message}`)
        }
    }
}
export default Deposits